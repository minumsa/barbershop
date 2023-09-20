"use client";

import { useState } from "react";
import { FilterWindow } from "./FilterWindow";
import { Content } from "./Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faSliders } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

export default function Page() {
  const [price, setPrice] = useState<number>(50000); // price원 이상
  const [barber, setBarber] = useState<number>(4); // barber명 이상
  const [year, setYear] = useState<number>(5); // year년 이상
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);
  const [selectedBarbershop, setSelectedBarbershop] = useState<any | null>();

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
          year={year}
          setYear={setYear}
        />
      </div>
      <div className={styles["nav-container"]}>
        <div className={styles["title"]}>
          <div>
            <span style={{ color: "#4285F4" }}>B</span>
            <span style={{ color: "#DB4437" }}>a</span>
            <span style={{ color: "#F4B400" }}>r</span>
            <span style={{ color: "#4285F4" }}>g</span>
            <span style={{ color: "#0F9D58" }}>l</span>
            <span style={{ color: "#DB4437" }}>e</span>
          </div>
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
      />
    </div>
  );
}
