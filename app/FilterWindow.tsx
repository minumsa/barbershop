import { useState } from "react";
import styles from "./page.module.css";

interface FilterWindowProps {
  setIsFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
  barber: number;
  setBarber: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
}

export const FilterWindow = ({
  setIsFilterActive,
  price,
  setPrice,
  barber,
  setBarber,
  year,
  setYear,
}: FilterWindowProps) => {
  return (
    <div className={styles["filter-container"]}>
      <div
        className={styles["filter-close"]}
        onClick={() => {
          setIsFilterActive(false);
        }}
      >
        <div>지도 옵션</div>
        <div className={styles["close"]}>×</div>
      </div>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <div>시술비</div>
        <div style={{ paddingLeft: "30px" }}>
          {price === 50000 ? "제한 없음" : `${price.toLocaleString()}원 이하`}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ paddingTop: "20px" }}>
          <input
            className="filter-input"
            type="range"
            id="price"
            name="price"
            list="price-markers"
            min={20000}
            max={50000}
            step={5000}
            value={price}
            onChange={e => {
              // 이벤트 객체에서 숫자 값을 추출
              const newPrice = Number(e.target.value);
              setPrice(newPrice);
            }}
          />
          <datalist id="price-markers">
            <option value="20000"></option>
            <option value="25000"></option>
            <option value="30000"></option>
            <option value="35000"></option>
            <option value="40000"></option>
            <option value="45000"></option>
            <option value="50000"></option>
          </datalist>
        </div>
      </div>
      <div style={{ display: "flex", marginTop: "50px" }}>
        <div>바버 인원</div>
        <div style={{ paddingLeft: "30px" }}>
          {barber === 1 ? "1인" : barber === 4 ? "제한 없음" : `${barber}인 이상`}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ paddingTop: "20px" }}>
          <input
            className="filter-input"
            type="range"
            id="barber"
            name="barber"
            min={1}
            max={4}
            step={1}
            value={barber}
            list="barber-markers"
            onChange={e => {
              const newBarber = Number(e.target.value);
              setBarber(newBarber);
            }}
          />
          <datalist id="barber-markers">
            <option value="0"></option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
          </datalist>
        </div>
      </div>
    </div>
  );
};

{
  /* <div
className={`${styles["close"]} ${styles["close-filter"]}`}
style={showFilterWindow ? { position: "absolute" } : { display: "none" }}
onClick={() => {
  handleFilter();
}}
>
×
</div> */
}
