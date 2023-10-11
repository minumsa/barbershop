"use client";

import { useEffect, useState } from "react";
import { FilterWindow } from "./FilterWindow";
import { Content } from "./Content";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { BarberShop } from "./model/BarberShop";
import { fetchData } from "./lib/api";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { Nav } from "./Nav";

export default function Page() {
  const [showFilterWindow, setShowFilterWindow] = useState<boolean>(false);
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
        keyword: keyword,
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
      case "SET_IS_MOBILE":
        newState.isMobile = action.payload;
        return newState;
      case "SET_SELECTED_BARBERSHOP":
        newState.selectedBarbershop = action.payload;
        return newState;
      case "SET_KEYWORD":
        newState.keyword = action.payload;
        return newState;
      default:
        return currentState;
    }
  };

  const store = createStore(reducer);

  return (
    <Provider store={store}>
      <div className={styles["container"]}>
        <FilterWindow />
        {/* TODO: Nav 컴포넌트로 분리하기 */}
        {/* TODO: 홈페이지 아이콘 수정 */}
        {/* TODO: MainTab 너비 더 크게 */}
        <Nav />
        <Content />
      </div>
    </Provider>
  );
}
