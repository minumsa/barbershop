"use client";

import { useState } from "react";
import { barbers, openDate, priceRange } from "./lib/data";
import { FilterWindow } from "./FilterWindow";
import { Content } from "./Content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMagnifyingGlass, faSliders } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
  const [showSubTab, setShowSubTab] = useState<boolean>(false);
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);

  return (
    <div className="container">
      <div
        className="filter-content"
        style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
      >
        <FilterWindow title={"시술비"} data={priceRange} />
        <FilterWindow title={"바버 인원"} data={barbers} />
        <FilterWindow title={"개점일"} data={openDate} />
        <div
          className="close filter-close"
          style={showFilterWindow ? { position: "absolute" } : { display: "none" }}
          onClick={() => {
            handleFilter();
          }}
        >
          ×
        </div>
      </div>
      <div className="nav-container">
        <div className="title">
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
        <div className="search-container">
          <div className="search">
            <div className="magnifying-glass">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
            <input
              className="search-input"
              placeholder="지역을 입력해주세요"
              style={{ paddingLeft: "35px" }}
            />
            <div className="search-button">
              <div>검색</div>
            </div>
          </div>
        </div>
        <div className="category">
          {/* <div className="gear">지도 ▾</div> */}
          <div
            className="gear"
            onClick={() => {
              handleFilter();
            }}
          >
            <FontAwesomeIcon icon={faGear} />
          </div>
        </div>
      </div>
      <Content showSubTab={showSubTab} setSubTab={setShowSubTab} />
    </div>
  );
}
