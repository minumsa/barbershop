import styles from "../page.module.css";

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
