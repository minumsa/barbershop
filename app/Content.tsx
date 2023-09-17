import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";
import styles from "./page.module.css";

interface ContentProps {
  showSubTab: boolean;
  setSubTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Content = ({ showSubTab, setSubTab }: ContentProps) => {
  return (
    <div className={styles["content-container"]}>
      <div className={styles["tab-container"]}>
        <MainTab showSubTab={showSubTab} />
        <SubTab showSubTab={showSubTab} setSubTab={setSubTab} />
      </div>
      <div className={styles["map-container"]}>
        <Map setSubTab={setSubTab} />
      </div>
    </div>
  );
};
