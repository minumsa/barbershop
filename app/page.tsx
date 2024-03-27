"use client";

import { useEffect, useState } from "react";
import { FilterWindow } from "./components/@common/FilterWindow";
import { Content } from "./components/@common/Content";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";
import { fetchData } from "./lib/api";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { NavBar } from "./components/nav/NavBar";
import { barberType, priceType } from "./lib/types";

export default function Page() {
  const [selectedBarbershop, setSelectedBarbershop] = useState<BarberShop | null>();
  const [keyword, setKeyword] = useState<string>("");
  const [selectedBarberCount, setSelectedBarberCount] = useState<barberType>(3);
  const [selectedPrice, setSelectedPrice] = useState<priceType>(50000);
  const [barbershops, setBarbershops] = useState<BarberShop[]>([]);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  const [totalBarbershopCount, setTotalBarbershopCount] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    async function loadData() {
      const { barbershopData, barbershopDataCount } = await fetchData({
        itemsPerPage: itemsPerPage,
        currentScroll: currentScroll,
        barber: selectedBarberCount,
        price: selectedPrice,
      });

      const firstFetch = currentScroll < 2;
      if (firstFetch) {
        setTotalBarbershopCount(barbershopDataCount);
      } else {
        setBarbershops(prevData => [...prevData, ...barbershopData]);
      }
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScroll]);

  useEffect(() => {
    async function loadData() {
      setCurrentScroll(0);
      setTotalBarbershopCount(0);
      setBarbershops([]);

      const { barbershopData, barbershopDataCount } = await fetchData({
        itemsPerPage: itemsPerPage,
        currentScroll: 0,
        barber: selectedBarberCount,
        price: selectedPrice,
      });

      setBarbershops(barbershopData);
      setTotalBarbershopCount(barbershopDataCount);
    }

    loadData();
  }, [selectedBarberCount, selectedPrice]);

  const reducer = (currentState: any, action: any) => {
    if (currentState === undefined) {
      return {
        barbershops: barbershops,
        price: selectedPrice,
        barber: selectedBarberCount,
        showFilterWindow: showFilterWindow,
        selectedBarbershop: selectedBarbershop,
        keyword: keyword,
        currentPage: currentScroll,
        itemsPerPage: itemsPerPage,
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
      case "SET_BARBERSHOPS":
        newState.barbershops = action.payload;
        return newState;
      case "SET_SHOW_FILTER_WINDOW":
        newState.showFilterWindow = action.payload;
        return newState;
      case "SET_SELECTED_BARBERSHOP":
        newState.selectedBarbershop = action.payload;
        return newState;
      case "SET_KEYWORD":
        newState.keyword = action.payload;
        return newState;
      case "SET_CURRENT_PAGE":
        newState.currentPage = action.payload;
        return newState;
      case "SET_ITEMS_PER_PAGE":
        newState.itemsPerPage = action.payload;
        return newState;
      default:
        return currentState;
    }
  };

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <FilterWindow
        price={selectedPrice}
        setPrice={setSelectedPrice}
        barber={selectedBarberCount}
        setBarber={setSelectedBarberCount}
        showFilterWindow={showFilterWindow}
        setShowFilterWindow={setShowFilterWindow}
      />
      <div className={styles["container"]}>
        <NavBar
          setShowFilterWindow={setShowFilterWindow}
          setKeyword={setKeyword}
          setBarbershops={setBarbershops}
        />
        <Content
          setCurrentPage={setCurrentScroll}
          keyword={keyword}
          totalDataCount={totalBarbershopCount}
          price={selectedPrice}
          barber={selectedBarberCount}
        />
      </div>
    </Provider>
  );
}
