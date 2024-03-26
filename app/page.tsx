"use client";

import { useEffect, useState } from "react";
import { FilterWindow } from "./components/FilterWindow";
import { Content } from "./components/Content";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";
import { fetchData } from "./lib/api";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { NavBar } from "./components/NavBar";
import { barberType, priceType } from "./lib/types";

// state 다 없애기 ---> redux store만 사용
// TODO: 바버샵 클릭하면 바버샵 id로 path 이동
// TODO: /admin의 page.tsx와 중복되는 부분 많으니 나중에 리팩토링
export default function Page() {
  const [selectedBarbershop, setSelectedBarbershop] = useState<BarberShop | null>();
  const [keyword, setKeyword] = useState<string>("");
  const [selectedBarberCount, setSelectedBarberCount] = useState<barberType>(3);
  const [selectedPrice, setSelectedPrice] = useState<priceType>(50000);
  const [barbershops, setBarbershops] = useState<BarberShop[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showFilterWindow, setShowFilterWindow] = useState(false);
  const [totalBarbershopCount, setTotalBarbershopCount] = useState<number>(0);
  const itemsPerPage = 10;

  useEffect(() => {
    async function loadData() {
      const { barbershopData, barbershopDataCount } = await fetchData({
        itemsPerPage: itemsPerPage,
        currentPage: currentPage,
        barber: selectedBarberCount,
        price: selectedPrice,
      });

      const firstFetch = currentPage < 2;
      if (firstFetch) {
        setTotalBarbershopCount(barbershopDataCount);
      } else {
        setBarbershops(prevData => [...prevData, ...barbershopData]);
      }
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    async function loadData() {
      setTotalBarbershopCount(0);
      setBarbershops([]);

      const { barbershopData, barbershopDataCount } = await fetchData({
        itemsPerPage: itemsPerPage,
        currentPage: 0,
        barber: selectedBarberCount,
        price: selectedPrice,
      });

      setBarbershops(barbershopData);
      setTotalBarbershopCount(barbershopDataCount);
    }

    setCurrentPage(0);
    loadData();
  }, [selectedBarberCount, selectedPrice]);

  // TODO: currentState, action 타입 지정하기
  const reducer = (currentState: any, action: any) => {
    if (currentState === undefined) {
      return {
        barbershops: barbershops,
        price: selectedPrice,
        barber: selectedBarberCount,
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
        price={selectedPrice}
        setPrice={setSelectedPrice}
        barber={selectedBarberCount}
        setBarber={setSelectedBarberCount}
        showFilterWindow={showFilterWindow}
        setShowFilterWindow={setShowFilterWindow}
      />
      <div className={styles["container"]}>
        {/* TODO: 현재 위치 기능 추가 */}
        {/* TODO: 바버샵 데이터 - 업로드, 개점일 변수 추가 */}
        <NavBar
          setShowFilterWindow={setShowFilterWindow}
          setKeyword={setKeyword}
          setBarbershops={setBarbershops}
        />
        <Content
          setCurrentPage={setCurrentPage}
          keyword={keyword}
          totalDataCount={totalBarbershopCount}
          price={selectedPrice}
          barber={selectedBarberCount}
        />
      </div>
    </Provider>
  );
}

// export default function Page2() {
//   const reducer = ...;
//   const store = createStore(reducer);
//   return (
//     <Provider store={store}>
//       <PageImpl />
//     </Provider>
//   )
// }

// function PageImpl() {
//   // useEffect 들은 여기에
//   return (
//   <FilterWindow
//         price={selectedPrice}
//         setPrice={setPrice}
//         barber={selectedBarberCount}
//         setBarber={setBarber}
//         showFilterWindow={showFilterWindow}
//         setShowFilterWindow={setShowFilterWindow}
//       />
//       <div className={styles["container"]}>
//         {/* TODO: 현재 위치 기능 추가 */}
//         {/* TODO: 바버샵 데이터 - 업로드, 개점일 변수 추가 */}
//         <NavBar
//           setShowFilterWindow={setShowFilterWindow}
//           setKeyword={setKeyword}
//           setBarbershops={setBarbershops}
//         />
//         <Content
//           setCurrentPage={setCurrentPage}
//           keyword={keyword}
//           totalDataCount={totalBarbershopCount}
//           price={selectedPrice}
//           barber={selectedBarberCount}
//         />
//       </div>
//   )
// }

// Store = state 를 가지고 있는 객체
// useState <-> Store = 별개로 있어야 된다.

// Store
// selectedBarberCount, selectedPrice
// { selectedBarberCount : 1, selectedPrice : 4000 }
//
// store.state.selectedBarberCount
