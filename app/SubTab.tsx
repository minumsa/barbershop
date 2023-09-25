import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import { deleteData } from "./lib/api";
import { usePathname, useRouter } from "next/navigation";

interface SubTabProps {
  selectedBarbershop: any | null;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<any | null>>;
}

export const SubTab = ({ selectedBarbershop, setSelectedBarbershop }: SubTabProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [password, setPassword] = useState<string>("");

  console.log(pathName);

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
            <div className={styles["sub-information"]}>{`${selectedBarbershop.barberList
              .map((barber: string, index: number) => {
                return index < selectedBarbershop.barberList.length - 1 ? `${barber}, ` : barber;
              })
              .join("")}`}</div>
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
            {!pathName.includes("admin") && (
              <div
                className={`${styles["button"]} ${styles["sub-tab-button"]}`}
                onClick={() => {
                  window.open(selectedBarbershop.reservationUrl);
                }}
              >
                <div>예약</div>
              </div>
            )}
            {pathName.includes("admin") && (
              <React.Fragment>
                <div
                  className={`${styles["button"]} ${styles["sub-tab-button"]}`}
                  onClick={() => {
                    router.push(`/admin/${selectedBarbershop.name}`);
                  }}
                >
                  <div>수정</div>
                </div>
                <div className={`${styles["button"]} ${styles["sub-tab-button"]}`}>
                  <div
                    onClick={async () => {
                      console.log(selectedBarbershop.name);
                      deleteData(selectedBarbershop.name, password);
                    }}
                  >
                    삭제
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          <div
            style={{
              height: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1rem",
              marginTop: "10px",
            }}
          >
            <div style={{ margin: "10px" }}>관리자 비밀번호</div>
            <input
              className={styles["sub-tab-input"]}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
    )
  );
};
