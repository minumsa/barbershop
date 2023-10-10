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
import { legacy_createStore as createStore } from "redux";
import { Provider, useSelector } from "react-redux";

export default function Page() {
  const [showFilterWindow, setShowFilterWindow] = useState<boolean>(false);
  const handleFilter = () => setShowFilterWindow(!showFilterWindow);
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

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log("Enter!");
      handleSearch();
    }
  };

  // TODO: currentState, action 타입 지정하기
  const reducer = (currentState, action) => {
    if (currentState === undefined) {
      return {
        barbershops: barbershops,
        price: 50000,
        barber: 3,
        showFilterWindow: false,
        isMobile: isMobile,
        selectedBarbershop: selectedBarbershop,
      };
    }

    const newState = { ...currentState };

    switch (action.type) {
      case "SET_PRICE":
        newState.price = action.payload;
        return newState;
      case "SET_BARBER":
        newState.barber = action.payload;
        return newState;
      case "SET_SHOW_FILTER_WINDOW":
        newState.showFilterWindow = action.payload;
        return newState;
      case "SET_IS_MOBILE":
        newState.isMobile = action.payload;
        return newState;
      case "SET_SELECTED_BARBERSHOP":
        newState.selectedBarbershop = action.payload;
        return newState;
      default:
        return currentState;
    }
  };

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <div className={styles["container"]}>
        <div
          className={styles["filter-content"]}
          style={showFilterWindow ? { position: "fixed" } : { display: "none" }}
        >
          <FilterWindow />
        </div>
        {/* TODO: Nav 컴포넌트로 분리하기 */}
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
                onKeyDown={handleSearchEnter}
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
        <Content />
      </div>
    </Provider>
  );
}
