"use client";

import { useState } from "react";
import { barbers, openDate, priceRange } from "./lib/data";

export default function Page() {
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

  const handleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };

  interface FilterProps {
    title: string;
    data: any;
  }

  const FilterContent = ({ title, data }: FilterProps) => {
    return (
      <div style={{ marginBottom: "50px" }}>
        <div style={{ display: "flex" }}>
          <div>{title}</div>
          <div style={{ paddingLeft: "30px" }}>선택 안 함</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {data.map((text: string, index: number) => {
            return (
              <div key={index} style={{ paddingTop: "20px" }}>
                <input type="checkbox"></input>
                <label style={{ paddingLeft: "10px" }}>{text}</label>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div
        className="filter-content"
        style={isFilterActive ? { position: "fixed" } : { display: "none" }}
      >
        <FilterContent title={"시술비"} data={priceRange} />
        <FilterContent title={"바버 인원"} data={barbers} />
        <FilterContent title={"개점일"} data={openDate} />
      </div>
      <div
        className="close"
        style={isFilterActive ? { position: "absolute" } : { display: "none" }}
        onClick={() => {
          handleFilter();
        }}
      >
        ×
      </div>
      <div className="nav-container">
        <div className="title">
          <div>마이바버샵</div>
        </div>
        <div className="search-container">
          <div className="search">
            <div className="search-button">
              <div style={{ paddingRight: "10px" }}>🔍</div>
            </div>
            <input className="search-input" placeholder="지역을 입력해주세요" />
            <div className="search-button">
              <div style={{ paddingLeft: "10px" }}>검색</div>
            </div>
          </div>
        </div>
        <div className="category">
          <div className="category-content">지도 ▾</div>
          <div
            className="category-content"
            onClick={() => {
              handleFilter();
            }}
          >
            필터 ▾
          </div>
        </div>
      </div>
      <div className="content-container"></div>
    </div>
  );
}
