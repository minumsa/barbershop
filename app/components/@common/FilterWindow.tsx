import styles from "./FilterWindow.module.css";
import { barberType, priceType } from "../../lib/types";

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

  const formattedPrice = price.toLocaleString();
  const priceStatus = price === 50000 ? "전체 선택" : `${formattedPrice}원 이하`;
  const barberStatus = barber === 1 ? "1인" : barber === 2 ? "2인 이상" : "전체 선택";

  return (
    <div
      className={styles["container"]}
      style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
    >
      <div
        className={styles["filter-button"]}
        onClick={() => {
          setShowFilterWindow(false);
        }}
      >
        <span className={styles["filter-button-text"]}>×</span>
      </div>
      <div className={styles["filter-container"]}>
        <div className={styles["filter-title-wrapper"]}>
          <div className={styles["filter-title"]}>지도 옵션</div>
        </div>
        <div className={styles["filter-item"]}>
          <div className={styles["filter-item-title-wrapper"]}>
            <div className={styles["filter-item-title"]}>시술비</div>
            <div>{priceStatus}</div>
          </div>
          <div className={styles["range-wrapper"]}>
            <div className={styles["range"]}>
              <input
                className="range-input"
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
          <div className={styles["filter-item-title-wrapper"]}>
            <div className={styles["filter-item-title"]}>바버 인원</div>
            <div>{barberStatus}</div>
          </div>
          <div className={styles["range-wrapper"]}>
            <div className={styles["range"]}>
              <input
                className="range-input"
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
        <div className={styles["reset-button-wrapper"]} onClick={filterReset}>
          <div className={styles["reset-button"]}>
            <div>초기화</div>
          </div>
        </div>
      </div>
    </div>
  );
};
