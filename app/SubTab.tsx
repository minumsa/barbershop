import Carousel from "./Carousel";
import { barbershops } from "./lib/data";
import styles from "./page.module.css";

interface ContentProps {
  showSubTab: boolean;
  setSubTab: any;
  selectedBarbershop: any;
}

export const SubTab = ({ showSubTab, setSubTab, selectedBarbershop }: ContentProps) => {
  return (
    showSubTab && (
      <div className={styles["tab"]}>
        <div className={styles["sub-title-container"]}>
          <div
            className={styles["tab-title"]}
            style={showSubTab ? { marginBottom: "15px" } : undefined}
          >
            <div style={{ fontWeight: "500" }}>{selectedBarbershop.name}</div>
            <div
              className={styles["close"]}
              onClick={() => {
                setSubTab(false);
              }}
            >
              ×
            </div>
          </div>
        </div>
        <div className={styles["sub-carousel-container"]}>
          <Carousel />
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
            <div className={styles["sub-information"]}>
              {selectedBarbershop.location.description}
            </div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>운영시간</div>
            <div className={styles["sub-information"]}>{selectedBarbershop.operatingTime}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>휴무일</div>
            <div className={styles["sub-information"]}>{selectedBarbershop.closedDays}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>연락처</div>
            <div className={styles["sub-information"]}>{selectedBarbershop.contact}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>웹사이트</div>
            <div className={`${styles["sub-information"]} ${styles["barbershop-url"]}`}>
              <a href={selectedBarbershop.barbershopUrl} target="_blank">
                {selectedBarbershop.barbershopUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
