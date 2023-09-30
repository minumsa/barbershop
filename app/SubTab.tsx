import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { deleteData } from "./lib/api";
import { usePathname, useRouter } from "next/navigation";

interface SubTabProps {
  selectedBarbershop: any | null;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<any | null>>;
  isMobile: boolean;
}

export const SubTab = ({ selectedBarbershop, setSelectedBarbershop, isMobile }: SubTabProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const isAdmin = pathName.includes("admin");
  const [password, setPassword] = useState<string>("");

  interface ItemBlockProps {
    title: string;
    data: string | React.ReactNode;
  }

  const ItemBlock = ({ title, data }: ItemBlockProps) => {
    return (
      <div className={styles["sub-flexbox"]} style={isMobile ? { padding: "0 15px" } : undefined}>
        <div className={styles["sub-title"]}>{title}</div>
        <div className={styles["sub-information"]}>{data}</div>
      </div>
    );
  };

  return (
    selectedBarbershop && (
      <div className={styles["tab"]}>
        <div className={styles["sub-title-container"]}>
          <div
            className={styles["tab-title"]}
            style={isMobile ? { padding: "10px 20px 0 20px", fontSize: "1rem" } : undefined}
          >
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
          <ItemBlock
            title={"소개"}
            data={selectedBarbershop.description.split("  ").map((text: string, index: number) => {
              return <p key={index}>{text}</p>;
            })}
          />
          <ItemBlock
            title={"바버"}
            data={`${selectedBarbershop.barberList
              .map((barber: string, index: number) => {
                return index < selectedBarbershop.barberList.length - 1 ? `${barber}, ` : barber;
              })
              .join("")}`}
          />
          <ItemBlock
            title={"바버"}
            data={
              <a
                href={selectedBarbershop.locationUrl}
                target="_blank"
                style={{ textDecoration: "underline", color: "#000", cursor: "pointer" }}
              >
                <div className={styles["sub-information"]} style={{ textDecoration: "underline" }}>
                  {selectedBarbershop.location.description}
                </div>
              </a>
            }
          />
          <ItemBlock title={"시술비"} data={`${selectedBarbershop.price.toLocaleString()}원`} />
          <ItemBlock title={"운영시간"} data={selectedBarbershop.operatingTime} />
          <ItemBlock
            title={"휴무일"}
            data={
              selectedBarbershop.closedDays === "" || !selectedBarbershop.closedDays
                ? "없음"
                : selectedBarbershop.closedDays
            }
          />
          <ItemBlock title={"연락처"} data={selectedBarbershop.contact} />
          <div
            className={styles["sub-flexbox"]}
            style={isMobile ? { padding: "0 15px" } : undefined}
          >
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
            {!isAdmin && (
              <div
                className={`${styles["button"]} ${styles["sub-tab-button"]}`}
                onClick={() => {
                  window.open(selectedBarbershop.reservationUrl);
                }}
                style={isMobile ? { marginBottom: "50px" } : undefined}
              >
                <div>예약</div>
              </div>
            )}
            {isAdmin && (
              <React.Fragment>
                <div
                  className={`${styles["button"]} ${styles["sub-tab-button"]}`}
                  onClick={() => {
                    router.push(`/admin/${selectedBarbershop.id}`);
                  }}
                >
                  <div>수정</div>
                </div>
                <div className={`${styles["button"]} ${styles["sub-tab-button"]}`}>
                  <div
                    onClick={async () => {
                      deleteData(selectedBarbershop.id, password);
                      setSelectedBarbershop(null);
                      router.push("/admin");
                    }}
                  >
                    삭제
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
          {isAdmin && (
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
          )}
        </div>
      </div>
    )
  );
};
