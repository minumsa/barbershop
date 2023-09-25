import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { uploadData } from "./lib/api";
import { IBarberShop } from "./lib/data";

type Location = {
  description: string;
  lat: number;
  lng: number;
};

interface UploadProps {
  pathName: string;
  barbershops: IBarberShop;
}

export const Upload = ({ pathName, barbershops }: UploadProps) => {
  const [name, setName] = useState<string>("");
  const [barberList, setBarberList] = useState<string[]>([""]);
  const [location, setLocation] = useState<Location>({ description: "", lat: 0, lng: 0 });
  const [operatingTime, setOperatingTime] = useState<string>("");
  const [closedDays, setClosedDays] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [barbershopUrl, setBarbershopUrl] = useState<string>("");
  const [reservationUrl, setReservationUrl] = useState<string>("");
  const [locationUrl, setLocationUrl] = useState<string>("");
  const [notice, setNotice] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleUpload = () => {
    const newBarbershopData = {
      name: name,
      barberList: barberList,
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

    uploadData(newBarbershopData, password);
  };

  useEffect(() => {
    barbershops != null && setName(barbershops.name);
  }, [pathName]);

  return (
    <div className={styles["content-container"]} style={{ overflow: "auto", marginBottom: "50px" }}>
      <div className={styles["upload-container"]}>
        <div
          className={styles["upload-item"]}
          style={{ justifyContent: "center", padding: "30px 0 50px 0" }}
        >
          <div>업로드 페이지</div>
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
          <div className={styles["upload-title"]}>바버 이름</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setBarberList(e.target.value.split(", "));
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>주소</div>
          <input
            className={styles["upload-input"]}
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
            onChange={e => {
              setOperatingTime(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>휴무일</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setClosedDays(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>연락처</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setContact(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>소개</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>시술비</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setPrice(Number(e.target.value));
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>이미지 링크</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setImgUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>위치 링크</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setLocationUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>홈페이지 링크</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setBarbershopUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>예약 페이지 링크</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setReservationUrl(e.target.value);
            }}
          />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>비밀번호</div>
          <input
            className={styles["upload-input"]}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div
          className={styles["button"]}
          style={{ padding: "5px 20px", marginTop: "30px" }}
          onClick={() => {
            handleUpload();
          }}
        >
          제출하기
        </div>
      </div>
    </div>
  );
};
