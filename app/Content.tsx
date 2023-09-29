import { Map } from "./Map";
import { MainTab } from "./MainTab";
import { SubTab } from "./SubTab";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { fetchData } from "./lib/api";
import { BarberShop } from "./model/BarberShop";

interface ContentProps {
  price: number;
  barber: number;
  selectedBarbershop: string;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<string>>;
}

export const Content = ({
  price,
  barber,
  selectedBarbershop,
  setSelectedBarbershop,
}: ContentProps) => {
  const [barbershops, setBarbershops] = useState<BarberShop[]>();

  useEffect(() => {
    async function loadData() {
      setBarbershops(await fetchData());
    }

    loadData();
  }, []);

  return (
    <div className={styles["content-container"]}>
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
            barbershops={barbershops ? barbershops : []}
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
          barbershops={barbershops ? barbershops : []}
        />
      </div>
    </div>
  );
};
