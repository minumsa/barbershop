import Image from "next/image";
import styles from "./page.module.css";
import React, { useMemo, useState } from "react";
import { deleteData } from "./lib/api";
import { usePathname, useRouter } from "next/navigation";
import { BarberShop } from "./model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

interface SubTabProps {
  selectedBarbershop: any | null;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<BarberShop | null | undefined>>;
}

export const SubTab = () => {
  const router = useRouter();
  const pathName = usePathname();
  const isAdmin = pathName.includes("admin");
  const [password, setPassword] = useState<string>("");
  const { selectedBarbershop } = useSelector(
    (state: SubTabProps) => ({
      selectedBarbershop: state.selectedBarbershop,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  interface ItemBlockProps {
    title: string;
    data: string | React.ReactNode;
  }

  const ItemBlock = ({ title, data }: ItemBlockProps) => {
    return (
      <div className={styles["subtab-flexbox"]}>
        <div className={styles["subtab-title"]}>{title}</div>
        <div className={styles["subtab-information"]}>{data}</div>
      </div>
    );
  };

  return (
    selectedBarbershop && (
      <div className={styles["tab"]}>
        <div className={styles["subtab-title-container"]}>
          <div className={styles["tab-title"]}>
            <div>{selectedBarbershop.name}</div>
            <div
              className={styles["close"]}
              onClick={() => {
                dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: null });
              }}
            >
              ×
            </div>
          </div>
        </div>
        <div className={styles["subtab-image-container"]}>
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
        <div className={styles["subtab-information-container"]}>
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
                <div
                  className={styles["subtab-information"]}
                  style={{ textDecoration: "underline" }}
                >
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
          <div className={styles["subtab-flexbox"]}>
            <div className={styles["subtab-title"]}>웹사이트</div>
            <div className={`${styles["subtab-information"]} ${styles["barbershop-url"]}`}>
              <a
                href={selectedBarbershop.barbershopUrl}
                target="_blank"
                style={{ textDecoration: "underline", color: "#000" }}
              >
                {selectedBarbershop.barbershopUrl}
              </a>
            </div>
          </div>
          <div className={styles["subtab-button-container"]}>
            {!isAdmin && (
              <div
                className={`${styles["button"]} ${styles["subtab-button"]}`}
                onClick={() => {
                  window.open(selectedBarbershop.reservationUrl);
                }}
              >
                <div>예약</div>
              </div>
            )}
            {isAdmin && (
              <React.Fragment>
                <div
                  className={`${styles["button"]} ${styles["subtab-button"]}`}
                  onClick={() => {
                    router.push(`/admin/${selectedBarbershop.id}`);
                  }}
                >
                  <div>수정</div>
                </div>
                <div className={`${styles["button"]} ${styles["subtab-button"]}`}>
                  <div
                    onClick={async () => {
                      deleteData(selectedBarbershop.id, password);
                      dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: null });
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
            <div className={styles["password-container"]}>
              <div className={styles["password"]}>관리자 비밀번호</div>
              <input
                className={styles["subtab-input"]}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
    )
  );
};
