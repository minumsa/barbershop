import styles from "./page.module.css";

export const MainTabLoadingContents = () => {
  const LoadingContents = () => {
    return (
      <div className={styles["list-container"]}>
        <div
          className={styles["barbershop-image-container"]}
          style={{ border: "none", backgroundColor: "#dbdbdb" }}
        ></div>
        <div className={styles["list-information"]}>
          <div
            className={styles["list-name"]}
            style={{
              backgroundColor: "#e6e6e6",
              width: "85px",
              height: "20px",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <div className={styles["list-name-text"]}></div>
          </div>
          <div
            className={styles["list-location"]}
            style={{
              backgroundColor: "#e6e6e6",
              width: "230px",
              height: "20px",
              borderRadius: "5px",
            }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <LoadingContents />
      <LoadingContents />
      <LoadingContents />
      <LoadingContents />
      <LoadingContents />
      <LoadingContents />
      <LoadingContents />
    </div>
  );
};
