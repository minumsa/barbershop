import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";
import styles from "./page.module.css";

interface ContentProps {
  showSubTab: boolean;
  setSubTab: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  barber: number;
  year: number;
}

export const Content = ({ showSubTab, setSubTab, price, barber, year }: ContentProps) => {
  return (
    <div className={styles["content-container"]}>
      <div className={styles["tab-container"]}>
        <MainTab showSubTab={showSubTab} />
        <SubTab showSubTab={showSubTab} setSubTab={setSubTab} />
      </div>
      <div className={styles["map-container"]}>
        <div className={styles["filter-box"]}>
          <div className={styles["filter-box-content"]}>
            시술비 : {price.toLocaleString()}원 이하,
          </div>
          <div className={styles["filter-box-content"]}>바버 인원 : {barber}인 이상,</div>
          <div className={styles["filter-box-content"]}>개업일 : {year}년 이상</div>
        </div>
        <Map setSubTab={setSubTab} />
      </div>
    </div>
  );
};
