import styles from "./SubTab.module.css";
import React, { useState } from "react";
import { deleteData } from "../../lib/api";
import { usePathname, useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";

interface SubTabProps {
  selectedBarbershop: any | null;
}

export const SubTab = () => {
  const router = useRouter();
  const pathName = usePathname();
  const isAdminPage = pathName.includes("admin");
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

  const SubTabItemBlock = ({ title, data }: ItemBlockProps) => {
    return (
      <div className={styles["subtab-flexbox"]}>
        <div className={styles["subtab-title"]}>{title}</div>
        <div className={styles["subtab-information"]}>{data}</div>
      </div>
    );
  };

  // TODO: 모바일에서 컴포넌트 이동 시 스크롤 맨 위로 (메인탭 스크롤 상태가 유지되고 있음..)
  return (
    selectedBarbershop && (
      <div className={styles["tab"]}>
        <div className={styles["subtab-title-container"]}>
          <div className={styles["tab-title"]}>
            <div className={styles["tab-title-name"]}>{selectedBarbershop.name}</div>
            <div
              className={styles["close-mobile"]}
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
            <img
              src={selectedBarbershop.imgUrl}
              alt="test"
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
              }}
              loading="lazy"
            />
          </div>
        </div>
        <div className={styles["subtab-information-container"]}>
          <SubTabItemBlock
            title={"소개"}
            data={selectedBarbershop.description.split("  ").map((text: string, index: number) => {
              return <p key={index}>{text}</p>;
            })}
          />
          <SubTabItemBlock
            title={"바버"}
            data={`${selectedBarbershop.barberList
              .map((barber: string, index: number) => {
                return index < selectedBarbershop.barberList.length - 1 ? `${barber}, ` : barber;
              })
              .join("")}`}
          />
          <div className={styles["subtab-flexbox"]}>
            <div className={styles["subtab-title"]}>주소</div>
            <div className={`${styles["subtab-information"]} ${styles["barbershop-url"]}`}>
              <a
                href={selectedBarbershop.locationUrl}
                target="_blank"
                style={{ textDecoration: "underline", color: "#000" }}
              >
                {selectedBarbershop.location.description}
              </a>
            </div>
          </div>
          <SubTabItemBlock
            title={"시술비"}
            data={`${selectedBarbershop.price.toLocaleString()}원`}
          />
          <SubTabItemBlock title={"운영시간"} data={selectedBarbershop.operatingTime} />
          <SubTabItemBlock
            title={"휴무일"}
            data={
              selectedBarbershop.closedDays === "" || !selectedBarbershop.closedDays
                ? "없음"
                : selectedBarbershop.closedDays
            }
          />
          <SubTabItemBlock title={"연락처"} data={selectedBarbershop.contact} />
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
            {isAdminPage ? (
              <div>
                <div className={styles["flex-row-center"]}>
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
                </div>
                <div className={styles["password-container"]}>
                  <div className={styles["password"]}>
                    <div style={{ marginRight: "5px" }}>
                      <FontAwesomeIcon icon={faKey} />
                    </div>
                    <div>관리자 비밀번호</div>
                  </div>
                  <input
                    className={styles["subtab-password-input"]}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`${styles["button"]} ${styles["subtab-button"]}`}
                onClick={() => {
                  window.open(selectedBarbershop.reservationUrl);
                }}
              >
                <div>예약</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};
