import { SetStateAction, useEffect, useState } from "react";
import styles from "../page.module.css";
import { fetchForEdit, editData, uploadData, uploadImage } from "../lib/api";
import { BarberShop } from "../lib/data";
import { usePathname, useRouter } from "next/navigation";

type Location = {
  description: string;
  lat: number;
  lng: number;
};

interface UploadProps {
  id: string;
}

export const Upload = ({ id }: UploadProps) => {
  const [file, setFile] = useState<any>();
  const [name, setName] = useState<string | undefined>("");
  const [barberListToStr, setBarberListToStr] = useState<string>();
  const [location, setLocation] = useState<Location>({ description: "", lat: 0, lng: 0 });
  const [operatingTime, setOperatingTime] = useState<string | undefined>("");
  const [nonOperatingDates, setNonOperatingDates] = useState<string | undefined>("");
  const [contact, setContact] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [price, setPrice] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<string | undefined>("");
  const [barbershopUrl, setBarbershopUrl] = useState<string | undefined>("");
  const [reservationUrl, setReservationUrl] = useState<string | undefined>("");
  const [locationUrl, setLocationUrl] = useState<string | undefined>("");
  const [notice, setNotice] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [barbershops, setBarbershops] = useState<BarberShop>();
  const pathName = decodeURIComponent(usePathname());
  const isUploadPage = pathName.includes("upload");
  const router = useRouter();

  const newBarbershopData: BarberShop = {
    name: name,
    barberList: barberListToStr?.split(", "),
    location: location,
    operatingTime: operatingTime,
    closedDays: nonOperatingDates,
    contact: contact,
    description: description,
    price: price,
    imgUrl: imgUrl,
    barbershopUrl: barbershopUrl,
    reservationUrl: reservationUrl,
    locationUrl: locationUrl,
    notice: notice,
  };

  useEffect(() => {
    async function loadData() {
      setBarbershops(await fetchForEdit(id));
    }

    if (!isUploadPage) loadData();
  }, []);

  useEffect(() => {
    setName(barbershops?.name);
    setBarberListToStr(barbershops?.barberList?.join(", "));
    setLocation({
      description: barbershops?.location.description ?? "",
      lat: barbershops?.location.lat ?? 0,
      lng: barbershops?.location.lng ?? 0,
    });
    setOperatingTime(barbershops?.operatingTime);
    setNonOperatingDates(barbershops?.closedDays);
    setDescription(barbershops?.description);
    setPrice(barbershops?.price ?? 0);
    setImgUrl(barbershops?.imgUrl);
    setLocationUrl(barbershops?.locationUrl);
    setBarbershopUrl(barbershops?.barbershopUrl);
    setReservationUrl(barbershops?.reservationUrl);
    setContact(barbershops?.contact);
  }, [barbershops]);

  // 먼저 데이터를 업로드(uploadData)하고 나서 이미지를 업로드(uploadImage)함
  // 이미지의 경우 cdn을 통해 따로 path를 만드는 방식을 택했기 때문
  const handleUpload = async () => {
    try {
      const dataResponse = await uploadData(newBarbershopData, password);
      const id = dataResponse.id;
      await uploadImage(file, id, password);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // 이미지 API(uploadImage)는 수정 방식(PUT)이므로 업로드, 수정 시 모두 이를 사용
  const handleEdit = async () => {
    try {
      await editData(newBarbershopData, id, password);
      if (file) await uploadImage(file, id, password);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      isUploadPage ? handleUpload() : handleEdit();
    }
  };

  interface UploadItemProps {
    title: string;
    value: any;
    onChange: any;
  }

  type NormalEvent = {
    target: { value: SetStateAction<string | undefined> };
  };

  type ObjectEvent = {
    target: { value: any };
  };

  // FIXME: input 포함된 코드를 컴포넌트화시키니 한 글자 한 글자 입력할 때마다 멈추는 이슈 발생
  const UploadItem = ({ title, value, onChange }: UploadItemProps) => {
    return (
      <div className={styles["upload-item"]}>
        <div className={styles["upload-title"]}>{title}</div>
        <input className={styles["upload-input"]} value={value} onChange={onChange} />
      </div>
    );
  };

  return (
    <div className={styles["content-container"]} style={{ overflow: "auto", marginBottom: "50px" }}>
      <div className={styles["upload-container"]}>
        <div
          className={styles["upload-item"]}
          style={{ justifyContent: "center", padding: "30px 0 50px 0" }}
        >
          <div>{isUploadPage ? "업로드" : "수정"} 페이지</div>
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>바버샵 이름</div>
          <input
            className={styles["upload-input"]}
            value={name ?? ""}
            onChange={(e: NormalEvent) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>바버 이름</div>
          <input
            className={styles["upload-input"]}
            value={barberListToStr ?? ""}
            onChange={(e: NormalEvent) => {
              setBarberListToStr(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>주소</div>
          <input
            className={styles["upload-input"]}
            value={location?.description ?? ""}
            onChange={(e: ObjectEvent) => {
              setLocation(prevLocation => ({
                ...prevLocation,
                description: e.target.value,
              }));
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>위도(lat)</div>
          <input
            className={styles["upload-input"]}
            value={location?.lat}
            onChange={(e: ObjectEvent) => {
              setLocation(prevLocation => ({
                ...prevLocation,
                lat: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>경도(lng)</div>
          <input
            className={styles["upload-input"]}
            value={location?.lng}
            onChange={e => {
              setLocation(prevLocation => ({
                ...prevLocation,
                lng: Number(e.target.value),
              }));
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>영업 시간</div>
          <input
            className={styles["upload-input"]}
            value={operatingTime ?? ""}
            onChange={e => {
              setOperatingTime(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>휴무일</div>
          <input
            className={styles["upload-input"]}
            value={nonOperatingDates ?? ""}
            onChange={e => {
              setNonOperatingDates(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>연락처</div>
          <input
            className={styles["upload-input"]}
            value={contact ?? ""}
            onChange={e => {
              setContact(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>소개</div>
          <input
            className={styles["upload-input"]}
            value={description ?? ""}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>시술비</div>
          <input
            className={styles["upload-input"]}
            value={price}
            onChange={e => {
              setPrice(Number(e.target.value));
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>이미지</div>
          <input
            type="file"
            className={styles["upload-input"]}
            onChange={e => {
              setFile(e.target.files![0]);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>위치 링크</div>
          <input
            className={styles["upload-input"]}
            value={locationUrl ?? ""}
            onChange={e => {
              setLocationUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>홈페이지 링크</div>
          <input
            className={styles["upload-input"]}
            value={barbershopUrl ?? ""}
            onChange={e => {
              setBarbershopUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>예약 페이지 링크</div>
          <input
            className={styles["upload-input"]}
            value={reservationUrl ?? ""}
            onChange={e => {
              setReservationUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>비밀번호</div>
          <input
            className={styles["upload-input"]}
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            onKeyDown={handleEnter}
          />
        </div>
        <div
          className={styles["button"]}
          style={{ padding: "5px 20px", marginTop: "30px" }}
          onClick={async () => {
            isUploadPage ? await handleUpload() : await handleEdit();
            router.push("/admin");
          }}
        >
          {isUploadPage ? "제출하기" : "수정하기"}
        </div>
      </div>
    </div>
  );
};
