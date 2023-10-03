import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";
import React from "react";

interface ContentProps {
  price: number;
  barber: number;
  selectedBarbershop: BarberShop | null | undefined;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<BarberShop | null | undefined>>;
  isMobile: boolean;
  barbershops: BarberShop[];
}

export const Content = ({
  price,
  barber,
  selectedBarbershop,
  setSelectedBarbershop,
  isMobile,
  barbershops,
}: ContentProps) => {
  return (
    <div className={styles["content-container"]}>
      {!isMobile && (
        <React.Fragment>
          <div className={styles["tab-container"]}>
            {selectedBarbershop ? (
              <SubTab
                selectedBarbershop={selectedBarbershop}
                setSelectedBarbershop={setSelectedBarbershop}
              />
            ) : (
              <MainTab
                setSelectedBarbershop={setSelectedBarbershop}
                barber={barber}
                barbershops={barbershops}
              />
            )}
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
            <Map
              setSelectedBarbershop={setSelectedBarbershop}
              barbershops={barbershops}
              isMobile={isMobile}
            />
          </div>
        </React.Fragment>
      )}
      {isMobile && (
        <React.Fragment>
          {selectedBarbershop ? (
            <SubTab
              selectedBarbershop={selectedBarbershop}
              setSelectedBarbershop={setSelectedBarbershop}
            />
          ) : (
            <Map
              setSelectedBarbershop={setSelectedBarbershop}
              barbershops={barbershops}
              isMobile={isMobile}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};
