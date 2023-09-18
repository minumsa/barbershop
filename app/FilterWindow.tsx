import { useState } from "react";
import styles from "./page.module.css";

interface FilterWindowProps {
  setIsFilterActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterWindow = ({ setIsFilterActive }: FilterWindowProps) => {
  const [price, setPrice] = useState<number>(50000); // price원 이상
  const [barber, setBarber] = useState<number>(4); // barber명 이상
  const [year, setYear] = useState<number>(5); // year년 이상

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-close"]}>
        <div>지도 옵션</div>
        <div className={styles["close"]}>×</div>
      </div>
      <div style={{ display: "flex", marginTop: "15px" }}>
        <div>시술비</div>
        <div style={{ paddingLeft: "30px" }}>
          {price === 50000 ? "제한 없음" : `${price}원 이하`}
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
      <div style={{ display: "flex", marginTop: "50px" }}>
        <div>개업일</div>
        <div style={{ paddingLeft: "30px" }}>{year === 5 ? "제한 없음" : `${year}년 이상`}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ paddingTop: "20px" }}>
          <input
            className="filter-input"
            type="range"
            id="year"
            name="year"
            min={0}
            max={5}
            step={1}
            value={year}
            list="year-markers"
            onChange={e => {
              const newYear = Number(e.target.value);
              setYear(newYear);
            }}
          />
          <datalist id="year-markers">
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
