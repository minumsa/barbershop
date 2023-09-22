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
        <div className={styles["sub-barbershop-image-container"]}>
          {/* 중요 : width를 100%로 하고 height를 auto로*/}
          <div className={styles["image-container"]}>
            <Image
              src={selectedBarbershop.imgUrl}
              alt="test"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1rem",
              marginTop: "15px",
            }}
          >
            <div className={styles["button"]} style={{ padding: "2px 30px" }}>
              <div>예약</div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
