import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { NoData } from "./NoData";

interface ContentProps {
  price: number;
  barber: number;
  isMobile: boolean;
  selectedBarbershop: BarberShop | null | undefined;
  filteredBarbershops: BarberShop[];
}

export const Content = () => {
  const { price, barber, isMobile, selectedBarbershop, filteredBarbershops } = useSelector(
    (state: ContentProps) => ({
      price: state.price,
      barber: state.barber,
      isMobile: state.isMobile,
      selectedBarbershop: state.selectedBarbershop,
      filteredBarbershops: state.filteredBarbershops,
    }),
    shallowEqual
  );

  return (
    <div className={styles["content-container"]}>
      {!isMobile && (
        <React.Fragment>
          <div className={styles["tab-container"]}>
            {selectedBarbershop ? <SubTab /> : <MainTab />}
          </div>
          <div className={styles["map-container"]}>
            <div className={styles["filter-box"]}>
              <div className={styles["filter-box-content"]}>
                시술비 : {price === 50000 ? "전체 선택" : `${price.toLocaleString()}원 이하,`}
              </div>
              <div className={styles["filter-box-content"]}>
                바버 인원 : {barber === 3 ? "전체 선택" : barber === 2 ? "2인 이상" : `${barber}인`}
              </div>
            </div>
            {filteredBarbershops.length === 0 ? <NoData /> : <Map />}
          </div>
        </React.Fragment>
      )}
      {isMobile && <React.Fragment>{selectedBarbershop ? <SubTab /> : <Map />}</React.Fragment>}
    </div>
  );
};
