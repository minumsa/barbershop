import { useEffect, useState } from "react";
import styles from "./Upload.module.css";
import { fetchForEdit, editData, uploadData, uploadImage } from "../../lib/api";
import { usePathname, useRouter } from "next/navigation";
import { BarberShop } from "../../model/BarberShop";
import { ABOUT, ADDRESS, BARBER, COST, initialBarberShop } from "../../lib/constants";

type Location = {
  description: string;
  lat: number;
  lng: number;
};

interface UploadProps {
  barbershopId: string;
}

export const Upload = ({ barbershopId }: UploadProps) => {
  const [file, setFile] = useState<any>();
  const [name, setName] = useState<string>("");
  const [barberListToStr, setBarberListToStr] = useState<string>("");
  const [location, setLocation] = useState<Location>({ description: "", lat: 0, lng: 0 });
  const [operatingTime, setOperatingTime] = useState<string>("");
  const [nonOperatingDates, setNonOperatingDates] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [barbershopUrl, setBarbershopUrl] = useState<string>("");
  const [reservationUrl, setReservationUrl] = useState<string>("");
  const [locationUrl, setLocationUrl] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [barbershop, setBarbershop] = useState<BarberShop>(initialBarberShop);
  const pathName = decodeURIComponent(usePathname());
  const isUploadPage = pathName.includes("upload");
  const router = useRouter();

  const newBarbershopData: BarberShop = {
    name: name,
    barberList: barberListToStr.split(", "),
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
      setBarbershop(await fetchForEdit(barbershopId));
    }

    if (!isUploadPage) loadData();
  }, []);

  useEffect(() => {
    const {
      name,
      barberList,
      location,
      operatingTime,
      closedDays,
      description,
      price,
      imgUrl,
      locationUrl,
      barbershopUrl,
      reservationUrl,
      contact,
    } = barbershop;
    setName(name);
    setBarberListToStr(barberList.join(", "));
    setLocation({
      description: location.description,
      lat: location.lat,
      lng: location.lng,
    });
    setOperatingTime(operatingTime);
    setNonOperatingDates(closedDays);
    setDescription(description);
    setPrice(price);
    setImgUrl(imgUrl);
    setLocationUrl(locationUrl);
    setBarbershopUrl(barbershopUrl);
    setReservationUrl(reservationUrl);
    setContact(contact);
  }, [barbershop]);

  // 먼저 데이터를 업로드(uploadData)하고 나서 이미지를 업로드(uploadImage)함
  // 이미지의 경우 cdn을 통해 따로 path를 만드는 방식을 택했기 때문
  const handleUpload = async () => {
    try {
      const result = await uploadData(newBarbershopData, password);
      const { id } = result;
      await uploadImage(file, id, password);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // 이미지 API(uploadImage)는 수정 방식(PUT)이므로 업로드, 수정 시 모두 이를 사용
  const handleEdit = async () => {
    try {
      await editData(newBarbershopData, barbershopId, password);
      if (file) await uploadImage(file, barbershopId, password);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      isUploadPage ? handleUpload() : handleEdit();
    }
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
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>{BARBER}</div>
          <input
            className={styles["upload-input"]}
            value={barberListToStr}
            onChange={e => {
              setBarberListToStr(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>{ADDRESS}</div>
          <input
            className={styles["upload-input"]}
            value={location.description}
            onChange={e => {
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
            value={location.lat}
            onChange={e => {
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
            value={location.lng}
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
            value={operatingTime}
            onChange={e => {
              setOperatingTime(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>휴무일</div>
          <input
            className={styles["upload-input"]}
            value={nonOperatingDates}
            onChange={e => {
              setNonOperatingDates(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>연락처</div>
          <input
            className={styles["upload-input"]}
            value={contact}
            onChange={e => {
              setContact(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>{ABOUT}</div>
          <input
            className={styles["upload-input"]}
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>{COST}</div>
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
            value={locationUrl}
            onChange={e => {
              setLocationUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>홈페이지 링크</div>
          <input
            className={styles["upload-input"]}
            value={barbershopUrl}
            onChange={e => {
              setBarbershopUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>예약 페이지 링크</div>
          <input
            className={styles["upload-input"]}
            value={reservationUrl}
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
