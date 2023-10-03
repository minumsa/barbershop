"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faScissors,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../page.module.css";
import { FilterWindow } from "../FilterWindow";
import { Content } from "../Content";
import { useRouter } from "next/navigation";
import { BarberShop } from "../model/BarberShop";
import { fetchData, searchData } from "../lib/api";

export default function Page() {
  const [price, setPrice] = useState<number>(50000);
  const [barber, setBarber] = useState<number>(3);
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);
  const [selectedBarbershop, setSelectedBarbershop] = useState<BarberShop | null>();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [barbershops, setBarbershops] = useState<BarberShop[]>([]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 500);

    async function loadAllData() {
      setBarbershops(await fetchData());
    }

    loadAllData();
  }, []);

  const handleSearch = async () => {
    try {
      const barbershops = await searchData(keyword);
      setBarbershops(barbershops);
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  };

  return (
    <div className={styles["container"]}>
      <div
        className={styles["filter-content"]}
        style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
      >
        <FilterWindow
          setIsFilterActive={setIsFilterActive}
          price={price}
          setPrice={setPrice}
          barber={barber}
          setBarber={setBarber}
        />
      </div>
      <div className={styles["nav-container"]}>
        <div
          className={styles["title"]}
          onClick={() => {
            setSelectedBarbershop(null);
            router.push("/admin");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faScissors} />
          </div>
          <div>Barber</div>
        </div>
        <div className={styles["search-container"]}>
          <div className={styles["search"]}>
            <div className={styles["magnifying-glass"]}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              className={styles["search-input"]}
              placeholder="지역을 입력해주세요"
              style={{ paddingLeft: "35px" }}
              value={keyword}
              onChange={e => {
                setKeyword(e.target.value);
              }}
            />
            <div className={styles["search-button"]}>
              <div
                onClick={() => {
                  handleSearch();
                }}
              >
                검색
              </div>
            </div>
          </div>
        </div>
        <div className={styles["category"]}>
          <div
            className={styles["filter-icon"]}
            style={{ marginRight: "15px" }}
            onClick={() => {
              router.push("/admin/upload");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
          <div
            className={styles["filter-icon"]}
            onClick={() => {
              handleFilter();
            }}
          >
            <FontAwesomeIcon icon={faSliders} />
          </div>
        </div>
      </div>
      <Content
        selectedBarbershop={selectedBarbershop}
        setSelectedBarbershop={setSelectedBarbershop}
        price={price}
        barber={barber}
        isMobile={isMobile}
        barbershops={barbershops}
      />
    </div>
  );
}
