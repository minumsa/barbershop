import styles from "./LoadingItems.module.css";

export const LoadingItems = () => {
  const LoadingItem = () => {
    return (
      <div className={styles["container"]}>
        <div className={styles["image-wrapper"]}></div>
        <div className={styles["text-items-wrapper"]}>
          <div className={styles["barbershop-name-wrapper"]}>
            <div className={styles["barbershop-name"]}></div>
          </div>
          <div className={styles["barbershop-location"]}></div>
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
