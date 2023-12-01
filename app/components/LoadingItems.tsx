import styles from "../page.module.css";

// FIXME: 더 나은 방식으로 로딩 아이템 처리하기
export const LoadingItems = () => {
  const LoadingItem = () => {
    return (
      <div className={styles["list-container"]}>
        <div className={styles["barbershop-image-container"]}></div>
        <div className={styles["list-information"]}>
          <div className={`${styles["list-name"]} ${styles["list-name-loading"]}`}>
            <div className={styles["list-name-text"]}></div>
          </div>
          <div className={`${styles["list-location"]} ${styles["list-location-loading"]}`}></div>
        </div>
      </div>
    );
  };

  return (
    <>
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
      <LoadingItem />
    </>
  );
};
