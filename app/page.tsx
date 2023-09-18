"use client";

import { useState } from "react";
import { barbers, openDate, priceRange } from "./lib/data";
import { FilterWindow } from "./FilterWindow";
import { Content } from "./Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMagnifyingGlass, faSliders } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";

export default function Page() {
  const [showSubTab, setShowSubTab] = useState<boolean>(false);
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);

  return (
    <div className={styles["container"]}>
      <div
        className={styles["filter-content"]}
        style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
      >
        <FilterWindow setIsFilterActive={setIsFilterActive} />
      </div>
      <div className={styles["nav-container"]}>
        <div className={styles["title"]}>
          <div
            onClick={() => {
              setShowSubTab(false);
            }}
          >
            {/* Barber */}
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
          {/* <div className={styles["gear"]}>지도 ▾</div> */}
          <div
            className={styles["filter-icon"]}
            onClick={() => {
              handleFilter();
            }}
          >
            {/* 톱니바퀴 모양 */}
            {/* <FontAwesomeIcon icon={faGear} /> */}
            {/* 슬라이더 모양 */}
            <FontAwesomeIcon icon={faSliders} />
          </div>
        </div>
      </div>
      <Content showSubTab={showSubTab} setSubTab={setShowSubTab} />
    </div>
  );
}
