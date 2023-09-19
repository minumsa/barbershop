import Carousel from "./Carousel";
import ImageSlider from "./Carousel";
import { barbershops } from "./lib/data";
import styles from "./page.module.css";

interface ContentProps {
  showSubTab: boolean;
  setSubTab: any;
}

export const SubTab = ({ showSubTab, setSubTab }: ContentProps) => {
  return (
    showSubTab && (
      <div className={styles["tab"]}>
        <div className={styles["sub-title-container"]}>
          <div
            className={styles["tab-title"]}
            style={showSubTab ? { marginBottom: "15px" } : undefined}
          >
            <div style={{ fontWeight: "500" }}>{barbershops[0].name}</div>
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
            <div className={styles["sub-information"]}>{barbershops[0].description}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>바버</div>
            {/* TODO: 2인 이상일 때 쉼표 넣기 */}
            <div className={styles["sub-information"]}>{`${
              barbershops[0].barber?.length
            }인 - ${barbershops[0].barber?.map((data, index) => {
              return data;
            })}`}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>주소</div>
            <div className={styles["sub-information"]}>{barbershops[0].location}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>운영시간</div>
            <div className={styles["sub-information"]}>{barbershops[0].operatingTime}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>휴무일</div>
            <div className={styles["sub-information"]}>{barbershops[0].closedDays}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>연락처</div>
            <div className={styles["sub-information"]}>{barbershops[0].contact}</div>
          </div>
          <div className={styles["sub-flexbox"]}>
            <div className={styles["sub-title"]}>인스타그램</div>
            <div className={styles["sub-information"]}>
              <a href={barbershops[0].instagram} target="_blank">
                {barbershops[0].instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
