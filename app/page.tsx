"use client";

import { useEffect, useState } from "react";
import { FilterWindow } from "./FilterWindow";
import { Content } from "./Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faScissors, faSliders } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { BarberShop } from "./model/BarberShop";
import { fetchData, searchData } from "./lib/api";

export default function Page() {
  const [price, setPrice] = useState<number>(50000);
  const [barber, setBarber] = useState<number>(3);
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);
  const [selectedBarbershop, setSelectedBarbershop] = useState<BarberShop | null>();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  // TODO: 모바일 상태를 체크하는 방식이 이게 최선일까? 더 좋은 방식이 있을 것 같다
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
            router.push("/");
          }}
        >
          <FontAwesomeIcon icon={faScissors} />
          <div>{!isMobile && "Barber"}</div>
        </div>
        <div className={styles["search-container"]}>
          <div className={styles["search"]}>
            <div className={styles["magnifying-glass"]}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              className={styles["search-input"]}
              placeholder="지역을 입력해주세요"
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
