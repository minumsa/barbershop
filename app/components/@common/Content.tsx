import { Map } from "../map/Map";
import { MainTab } from "../tab/MainTab";
import { SubTab } from "../tab/SubTab";
import styles from "./Content.module.css";
import { BarberShop } from "../../model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Grid } from "./Grid";
import { useEffect } from "react";

interface ContentProps {
  price: number;
  barber: number;
  selectedBarbershop: BarberShop | null | undefined;
  barbershops: BarberShop[];
}

interface Content {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  keyword: string;
  totalDataCount: number;
  price: number;
  barber: number;
}

export const Content = ({ setCurrentPage, keyword, totalDataCount, price, barber }: Content) => {
  const { selectedBarbershop, barbershops } = useSelector(
    (state: ContentProps) => ({
      price: state.price,
      barber: state.barber,
      selectedBarbershop: state.selectedBarbershop,
      barbershops: state.barbershops,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const isLoading = barbershops.length === 0;
  const priceStatus = price === 50000 ? "전체 선택" : `${price.toLocaleString()}원 이하,`;
  const barberStatus = barber === 3 ? "전체 선택" : barber === 2 ? "2인 이상" : `${barber}인`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedBarbershop]);

  return (
    <div className={styles["container"]}>
      {/* 모바일 화면일 때 표시할 부분 */}
      <div className={styles["mobile-tab-container"]}>
        <div
          className={styles["mobile-map"]}
          style={
            selectedBarbershop
              ? {
                  height: 0,
                  minHeight: 0,
                }
              : undefined
          }
        >
          {isLoading ? <Grid /> : <Map />}
        </div>
        <div className={styles["tab"]}>
          {selectedBarbershop ? (
            <SubTab />
          ) : (
            <MainTab
              setCurrentPage={setCurrentPage}
              keyword={keyword}
              totalDataCount={totalDataCount}
              price={price}
              barber={barber}
            />
          )}
        </div>
      </div>
      {/* PC 화면일 때 표시할 부분 */}
      <div className={styles["tab-container"]}>
        <div className={styles["tab"]}>
          {selectedBarbershop ? (
            <SubTab />
          ) : (
            <MainTab
              setCurrentPage={setCurrentPage}
              keyword={keyword}
              totalDataCount={totalDataCount}
              price={price}
              barber={barber}
            />
          )}
        </div>
        {selectedBarbershop && (
          <div
            className={styles["bookmark"]}
            onClick={() => {
              dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: null });
            }}
          >
            <div className={styles["close-button"]}>×</div>
          </div>
        )}
      </div>
      <div className={styles["map-container"]}>
        <div className={styles["filter-wrapper"]}>
          <div className={styles["filter"]}>
            <span className={styles["filter-title"]}>{`시술비 :`}</span>
            <span className={styles["filter-item"]}>{priceStatus}</span>
          </div>
          <div className={styles["filter"]}>
            <span className={styles["filter-title"]}>{`바버 인원 :`}</span>
            <span className={styles["filter-item"]}>{barberStatus}</span>
          </div>
        </div>
        {isLoading ? <Grid /> : <Map />}
      </div>
    </div>
  );
};
