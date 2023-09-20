import styles from "./page.module.css";

export const Upload = () => {
  return (
    <div className={styles["content-container"]}>
      <div className={styles["upload-container"]}>
        <div
          className={styles["upload-item"]}
          style={{ justifyContent: "center", padding: "30px 0 50px 0" }}
        >
          <div>업로드 페이지</div>
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>바버샵 이름</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>바버 이름</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>주소</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>위도(lat)</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>경도(lng)</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>영업 시간</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>휴무일</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>연락처</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>소개</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>시술비</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>이미지 링크</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>홈페이지 링크</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["upload-item"]}>
          <div className={styles["upload-title"]}>예약 페이지 링크</div>
          <input className={styles["upload-input"]} />
        </div>
        <div className={styles["button"]} style={{ padding: "5px 20px", marginTop: "30px" }}>
          제출하기
        </div>
      </div>
    </div>
  );
};
