import styles from "../page.module.css";
import { barberType, priceType } from "../lib/data";

interface FilterWindowProps {
  price: priceType;
  setPrice: React.Dispatch<React.SetStateAction<priceType>>;
  barber: barberType;
  setBarber: React.Dispatch<React.SetStateAction<barberType>>;
  showFilterWindow: boolean;
  setShowFilterWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FilterWindow = ({
  price,
  setPrice,
  barber,
  setBarber,
  showFilterWindow,
  setShowFilterWindow,
}: FilterWindowProps) => {
  const filterReset = () => {
    setPrice(50000);
    setBarber(3);
  };

  //FIXME: barber, price 바뀌면 fetchData 실행되게
  return (
    <div
      className={styles["filter-content"]}
      style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
    >
      <div
        className={styles["filter-button"]}
        onClick={() => {
          setShowFilterWindow(false);
        }}
      >
        ×
      </div>
      <div className={styles["filter-container"]}>
        <div className={styles["filter-close"]}>
          <div className={styles["string-center-border"]}>지도 옵션</div>
        </div>
        <div className={styles["filter-item"]}>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <div style={{ width: "80px", height: "22px" }}>시술비</div>
            <div>{price === 50000 ? "전체 선택" : `${price.toLocaleString()}원 이하`}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ paddingTop: "10px" }}>
              <input
                className="filter-input"
                type="range"
                id="price"
                name="price"
                list="price-markers"
                min={30000}
                max={50000}
                step={5000}
                value={price}
                onChange={e => {
                  const newPrice = Number(e.target.value);
                  setPrice(newPrice);
                }}
              />
              <datalist id="price-markers">
                <option value="30000"></option>
                <option value="35000"></option>
                <option value="40000"></option>
                <option value="45000"></option>
                <option value="50000"></option>
              </datalist>
            </div>
          </div>
        </div>
        <div className={styles["filter-item"]}>
          <div style={{ display: "flex" }}>
            <div style={{ width: "80px" }}>바버 인원</div>
            <div>{barber === 1 ? "1인" : barber === 2 ? "2인 이상" : "전체 선택"}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ paddingTop: "10px" }}>
              <input
                className="filter-input"
                type="range"
                id="barber"
                name="barber"
                min={1}
                max={3}
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
              </datalist>
            </div>
          </div>
        </div>
        <div className={styles["more-button-container"]} onClick={filterReset}>
          <div className={styles["button"]}>
            <div>초기화</div>
          </div>
        </div>
      </div>
    </div>
  );
};
