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
  selectedBarbershop: string;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<BarberShop>>;
  searchKeyword: string;
}

export const Content = ({
  price,
  barber,
  selectedBarbershop,
  setSelectedBarbershop,
  searchKeyword,
}: ContentProps) => {
  const [originBarbershops, setOriginBarbershops] = useState<BarberShop[]>([]);
  const [barbershops, setBarbershops] = useState<BarberShop[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 500);
  }, []);

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
                price={price}
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
            />
          </div>
        </React.Fragment>
      )}
      <Map
        setSelectedBarbershop={setSelectedBarbershop}
        barbershops={searchKeyword === "" ? originBarbershops : barbershops}
      />
    </div>
  );
};
