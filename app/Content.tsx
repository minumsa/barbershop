import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { fetchData } from "./lib/api";
import { BarberShop } from "./model/BarberShop";

interface ContentProps {
  price: number;
  barber: number;
  selectedBarbershop: BarberShop | null | undefined;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<BarberShop | null | undefined>>;
  searchKeyword: string;
  isMobile: boolean;
}

export const Content = ({
  price,
  barber,
  selectedBarbershop,
  setSelectedBarbershop,
  searchKeyword,
  isMobile,
}: ContentProps) => {
  const [originBarbershops, setOriginBarbershops] = useState<BarberShop[]>([]);
  const [barbershops, setBarbershops] = useState<BarberShop[]>([]);

  useEffect(() => {
    async function loadData() {
      setOriginBarbershops(await fetchData());
    }

    loadData();
  }, []);

  useEffect(() => {
    setBarbershops(
      [...originBarbershops].filter(barbershop =>
        barbershop.location.description.includes(searchKeyword)
      )
    );
  }, [searchKeyword]);

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
                barbershops={searchKeyword === "" ? originBarbershops : barbershops}
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
              barbershops={searchKeyword === "" ? originBarbershops : barbershops}
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
              barbershops={searchKeyword === "" ? originBarbershops : barbershops}
              isMobile={isMobile}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
};
