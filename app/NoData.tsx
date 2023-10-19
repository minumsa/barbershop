import styles from "./page.module.css";

// TODO: 데이터를 불러올 때, 데이터가 없을 때 화면 표시하는 부분
export const NoData = () => {
  return <div className={styles["map-container"]}>{/* <div>데이터가 없습니다</div> */}</div>;
};
