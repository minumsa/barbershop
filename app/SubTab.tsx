import Image from "next/image";
import styles from "./page.module.css";

interface SubTabProps {
  selectedBarbershop: any | null;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<any | null>>;
}

export const SubTab = ({ selectedBarbershop, setSelectedBarbershop }: SubTabProps) => {
  return (
    selectedBarbershop && (
      <div className={styles["tab"]}>
        <div className={styles["sub-title-container"]}>
          <div className={styles["tab-title"]}>
            <div>{selectedBarbershop.name}</div>
            <div
              className={styles["close"]}
              onClick={() => {
                setSelectedBarbershop(null);
              }}
            >
              ×
            </div>
          </div>
        </div>
        <div className={styles["sub-carousel-container"]}>
          {/* 중요 : fill을 "true"로, objectFit을 "contain"으로 설정해야 width에 따라 height가 원본 크기에 맞게 변경됨 */}
          <div className={styles["image-container"]}>
            <Image src={"/harf1.jpeg"} alt="test" fill={true} objectFit="contain" />
            {/* <Carousel /> */}
          </div>
        </div>
        <div className={styles["sub-information-container"]}>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>소개</div>
            <div className={styles["sub-information"]}>{selectedBarbershop.description}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>바버</div>
            {/* TODO: 2인 이상일 때 쉼표 넣기 */}
            <div className={styles["sub-information"]}>{`${selectedBarbershop.barberList.map(
              (barber: string) => barber
            )}`}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>주소</div>
            <a
              href={selectedBarbershop.locationUrl}
              target="_blank"
              style={{ textDecoration: "underline", color: "#000", cursor: "pointer" }}
            >
              <div className={styles["sub-information"]} style={{ textDecoration: "underline" }}>
                {selectedBarbershop.location.description}
              </div>
            </a>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>운영시간</div>
            <div className={styles["sub-information"]}>{selectedBarbershop.operatingTime}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>휴무일</div>
            <div className={styles["sub-information"]}>
              {selectedBarbershop.closedDays === "" ? "없음" : selectedBarbershop.closedDays}
            </div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>연락처</div>
            <div className={styles["sub-information"]}>{selectedBarbershop.contact}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>웹사이트</div>
            <div className={`${styles["sub-information"]} ${styles["barbershop-url"]}`}>
              <a
                href={selectedBarbershop.barbershopUrl}
                target="_blank"
                style={{ textDecoration: "underline", color: "#000" }}
              >
                {selectedBarbershop.barbershopUrl}
              </a>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: "1rem", marginTop: "8px" }}>
            <div className={styles["button"]}>
              <div>예약</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
