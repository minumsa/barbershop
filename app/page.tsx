"use client";

import { useEffect, useState } from "react";
import { FilterWindow } from "./FilterWindow";
import { Content } from "./Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faScissors, faSliders } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const [price, setPrice] = useState<number>(50000);
  const [barber, setBarber] = useState<number>(3);
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);
  const [selectedBarbershop, setSelectedBarbershop] = useState<any | null>();
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 500);
  }, []);

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
      <div className={styles["nav-container"]} style={isMobile ? { padding: "0 20px" } : {}}>
        <div
          className={styles["title"]}
          onClick={() => {
            setSelectedBarbershop(null);
            router.push("/admin");
          }}
        >
          <FontAwesomeIcon icon={faScissors} />
          <div>{!isMobile && "Barber"}</div>
        </div>
        <div className={styles["search-container"]}>
          <div
            className={styles["search"]}
            style={isMobile ? { width: "85%", fontSize: "0.9rem" } : {}}
          >
            <div className={styles["magnifying-glass"]}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              className={styles["search-input"]}
              placeholder="지역을 입력해주세요"
              style={isMobile ? { fontSize: "0.9rem" } : {}}
              value={searchKeyword}
              onChange={e => {
                setSearchKeyword(e.target.value);
              }}
            />
            <div className={styles["search-button"]}>
              <div>검색</div>
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
        searchKeyword={searchKeyword}
        isMobile={isMobile}
      />
    </div>
  );
}
