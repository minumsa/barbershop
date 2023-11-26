"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { FilterWindow } from "../components/FilterWindow";
import { Content } from "../components/Content";
import { BarberShop } from "../model/BarberShop";
import { fetchData } from "../lib/api";
import { Provider } from "react-redux";
import { NavBar } from "../components/NavBar";
import { legacy_createStore as createStore } from "redux";
import { barberType, priceType } from "../lib/data";

export default function Page() {
  const [selectedBarbershop, setSelectedBarbershop] = useState<BarberShop | null>();
  const [keyword, setKeyword] = useState<string>("");
  const [barber, setBarber] = useState<barberType>(3);
  const [price, setPrice] = useState<priceType>(50000);
  const [barbershops, setBarbershops] = useState<BarberShop[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  const [totalDataCount, setTotalDataCount] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      const result = await fetchData({
        itemsPerPage: itemsPerPage,
        currentPage: currentPage,
        barber: barber,
        price: price,
      });

      setTotalDataCount(result?.totalDataCount);

      if (currentPage > 0 && barbershops.length > 1) {
        setBarbershops(prevBarbershops => [...prevBarbershops, ...result?.data]);
      } else {
        setBarbershops(result?.data);
      }
    }

    loadData();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);

    async function loadData() {
      const result = await fetchData({
        itemsPerPage: itemsPerPage,
        currentPage: 0,
        barber: barber,
        price: price,
      });

      // barber나 price가 바뀌면 아예 모든 데이터 지우고 다시 가져오기
      setBarbershops(result?.data);
    }

    loadData();
  }, [barber, price]);

  // TODO: currentState, action 타입 지정하기
  const reducer = (currentState: any, action: any) => {
    if (currentState === undefined) {
      return {
        barbershops: barbershops,
        price: price,
        barber: barber,
        showFilterWindow: showFilterWindow,
        selectedBarbershop: selectedBarbershop,
        keyword: keyword,
        currentPage: currentPage,
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
        price={price}
        setPrice={setPrice}
        barber={barber}
        setBarber={setBarber}
        showFilterWindow={showFilterWindow}
        setShowFilterWindow={setShowFilterWindow}
      />
      <div className={styles["container"]}>
        {/* TODO: 현재 위치 기능 추가 */}
        {/* TODO: 바버샵 데이터 - 업로드, 개점일 변수 추가 */}
        <NavBar
          showFilterWindow={showFilterWindow}
          setShowFilterWindow={setShowFilterWindow}
          setKeyword={setKeyword}
          setBarbershops={setBarbershops}
        />
        <Content
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          keyword={keyword}
          totalDataCount={totalDataCount}
          price={price}
          barber={barber}
        />
      </div>
    </Provider>
  );
}
