import MainCarousel from "./MainCarousel";
import { barbershops } from "./lib/data";
import styles from "./page.module.css";

interface MainTabProps {
  showSubTab: boolean;
}

export const MainTab = ({ showSubTab }: MainTabProps) => {
  return (
    !showSubTab && (
      <div className={styles["tab"]}>
        <div className={styles["tab-title"]}>바버샵 리스트</div>
        <div className={styles["tab-filter"]}>
          <div>{`총 ${barbershops.length}개의 검색 결과`}</div>
          <select className={styles["tab-select"]}>
            <option value={styles["name-asc"]}>이름 오름차순</option>
            <option value={styles["name-desc"]}>이름 내림차순</option>
            <option value={styles["open-asc"]}>개점일 오름차순</option>
            <option value={styles["open-desc"]}>개점일 내림차순</option>
          </select>
        </div>
        {barbershops.map((data, index) => {
          return (
            <div className={styles["list-container"]} key={index}>
              <div className={styles["carousel-container"]}>
                <MainCarousel />
              </div>
              <div className={styles["list-information"]}>
                <div className={styles["list-name"]}>{data.name}</div>
                <div className={styles["list-location"]}>{data.location}</div>
                <div className={styles["list-description"]}>{data.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
};
