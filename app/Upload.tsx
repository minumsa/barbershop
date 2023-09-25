import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { fetchData, fetchModifyData, modifyData, uploadData } from "./lib/api";
import { IBarberShop } from "./lib/data";
import { usePathname } from "next/navigation";

type Location = {
  description: string;
  lat: number;
  lng: number;
};

export const Upload = () => {
  const [name, setName] = useState<string | undefined>("");
  const [barberList, setBarberList] = useState<any>([]);
  const [location, setLocation] = useState<Location>({ description: "", lat: 0, lng: 0 });
  const [operatingTime, setOperatingTime] = useState<string | undefined>("");
  const [closedDays, setClosedDays] = useState<string | undefined>("");
  const [contact, setContact] = useState<string | undefined>("");
  const [description, setDescription] = useState<string | undefined>("");
  const [price, setPrice] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<string | undefined>("");
  const [barbershopUrl, setBarbershopUrl] = useState<string | undefined>("");
  const [reservationUrl, setReservationUrl] = useState<string | undefined>("");
  const [locationUrl, setLocationUrl] = useState<string | undefined>("");
  const [notice, setNotice] = useState<string | undefined>("");
  const [password, setPassword] = useState<string>("");
  const [barbershops, setBarbershops] = useState<IBarberShop>();
  const pathName = decodeURIComponent(usePathname());
  const newBarbershopData: IBarberShop = {
    name: name,
    barberList: Array.from(barberList).join("").split(", "),
    location: location,
    operatingTime: operatingTime,
    closedDays: closedDays,
    contact: contact,
    description: description,
    price: price,
    imgUrl: imgUrl,
    barbershopUrl: barbershopUrl,
    reservationUrl: reservationUrl,
    locationUrl: locationUrl,
    notice: notice,
  };

  console.log("newBarbershopData", newBarbershopData);

  const handleUpload = () => {
    uploadData(newBarbershopData, password);
  };

  const handleModify = () => {
    modifyData(newBarbershopData, password);
  };

  useEffect(() => {
    async function loadData() {
      setBarbershops(await fetchModifyData(pathName));
    }

    loadData();
  }, []);

  useEffect(() => {
    setName(barbershops?.name);
    setBarberList(prevBarberList => [
      ...prevBarberList?.join(""),
      barbershops?.barberList?.join(", "),
    ]);
    setLocation(prevLocation => ({
      ...prevLocation,
      description: barbershops?.location.description,
      lat: barbershops?.location.lat,
      lng: barbershops?.location.lng,
    }));
    setOperatingTime(barbershops?.operatingTime);
    setClosedDays(barbershops?.closedDays);
    setDescription(barbershops?.description);
    setPrice(barbershops?.price);
    setImgUrl(barbershops?.imgUrl);
    setLocationUrl(barbershops?.locationUrl);
    setBarbershopUrl(barbershops?.barbershopUrl);
    setReservationUrl(barbershops?.reservationUrl);
    setContact(barbershops?.contact);
  }, [barbershops]);

  // onChange={e => {
  //   setLocation(prevLocation => ({
  //     ...prevLocation,
  //     description: e.target.value,
  //   }));
  // }}

  return (
    <div className={styles["content-container"]} style={{ overflow: "auto", marginBottom: "50px" }}>
      <div className={styles["upload-container"]}>
        <div
          className={styles["upload-item"]}
          style={{ justifyContent: "center", padding: "30px 0 50px 0" }}
        >
          <div>{pathName.includes("upload") ? "업로드" : "수정"} 페이지</div>
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>바버샵 이름</div>
          <input
            className={styles["upload-input"]}
            value={name || ""}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>바버 이름</div>
          <input
            className={styles["upload-input"]}
            value={barberList}
            onChange={e => {
              setBarberList(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>주소</div>
          <input
            className={styles["upload-input"]}
            value={location?.description || ""}
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
            value={location?.lat || ""}
            type="number"
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
            value={location?.lng || ""}
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
            value={operatingTime || ""}
            onChange={e => {
              setOperatingTime(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>휴무일</div>
          <input
            className={styles["upload-input"]}
            value={closedDays || ""}
            onChange={e => {
              setClosedDays(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>연락처</div>
          <input
            className={styles["upload-input"]}
            value={contact || ""}
            onChange={e => {
              setContact(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>소개</div>
          <input
            className={styles["upload-input"]}
            value={description || ""}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>시술비</div>
          <input
            className={styles["upload-input"]}
            value={price || ""}
            onChange={e => {
              setPrice(Number(e.target.value));
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>이미지 링크</div>
          <input
            className={styles["upload-input"]}
            value={imgUrl || ""}
            onChange={e => {
              setImgUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>위치 링크</div>
          <input
            className={styles["upload-input"]}
            value={locationUrl || ""}
            onChange={e => {
              setLocationUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>홈페이지 링크</div>
          <input
            className={styles["upload-input"]}
            value={barbershopUrl || ""}
            onChange={e => {
              setBarbershopUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>예약 페이지 링크</div>
          <input
            className={styles["upload-input"]}
            value={reservationUrl || ""}
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
          />
        </div>
        <div
          className={styles["button"]}
          style={{ padding: "5px 20px", marginTop: "30px" }}
          onClick={() => {
            pathName.includes("upload") ? handleUpload() : handleModify();
          }}
        >
          {pathName.includes("upload") ? "제출하기" : "수정하기"}
        </div>
      </div>
    </div>
  );
};
