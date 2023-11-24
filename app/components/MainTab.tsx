import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { BarberShop } from "../model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LoadingItems } from "./LoadingItems";
import { useInView } from "react-intersection-observer";

interface MainTabProps {
  barbershops: BarberShop[];
  barber: number;
  price: number;
  keyword: string;
  currentPage: number;
}

export const MainTab = () => {
  const [orderType, setOrderType] = useState<string>("name");
  const { barbershops, barber, price, keyword, currentPage } = useSelector(
    (state: MainTabProps) => ({
      barbershops: state.barbershops,
      barber: state.barber,
      price: state.price,
      keyword: state.keyword,
      currentPage: state.currentPage,
    }),
    shallowEqual
  );

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    switch (orderType) {
      case "name":
        barbershops &&
          dispatch({
            type: "SET_FILTERED_BARBERSHOPS",
            payload: [...barbershops].sort((a, b) => a.name.localeCompare(b.name)),
          });
        break;
    }
  }, [orderType]);

  useEffect(() => {
    if (inView) {
      dispatch({
        type: "SET_CURRENT_PAGE",
        payload: currentPage + 1,
      });
    }
  }, [inView]);

  useEffect(() => {
    barbershops &&
      dispatch({
        type: "SET_FILTERED_BARBERSHOPS",
        payload: [...barbershops]
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(data => {
            if (data.barberList) {
              if (barber === 1) {
                return data.barberList.length === barber;
              } else if (barber === 2) {
                return data.barberList.length >= barber;
              } else {
                return true;
              }
            }
          })
          .filter(data => {
            if (data.price) return price >= data.price;
          }),
      });
  }, [barber, price, barbershops]);

  return (
    <div className={styles["tab"]}>
      <div className={`${styles["tab-title"]} ${styles["pc"]}`}>바버샵 리스트</div>
      <div className={styles["tab-filter"]}>
        <div className={styles["tab-result-data"]}>
          {/* 검색 시 표시할 문구 */}
          {keyword.length > 1 && (
            <div className={styles["filter-box-title"]}>
              <span className={styles["filter-box-content"]}> {keyword}</span>
              <span>에 대한</span>
            </div>
          )}
          <div className={styles["filter-box-title"]}>총</div>
          <div className={styles["filter-box-content"]}>{`${
            barbershops?.length ? barbershops?.length : 0
          }개`}</div>
          <div>의 검색 결과</div>
        </div>
        {/* 바버샵 데이터 정렬 */}
        <div className={styles["tab-order"]}>
          <ul className={styles["tab-ul"]}>
            <li className={styles["tab-li"]}>
              <button
                className={styles["tab-button"]}
                onClick={() => {
                  setOrderType("name");
                  dispatch({
                    type: "SET_CURRENT_PAGE",
                    payload: currentPage + 1,
                  });
                }}
                style={orderType === "name" ? { color: "#000" } : { color: "#666" }}
              >
                이름순
              </button>
            </li>
            <li className={styles["tab-li"]}>
              <button className={styles["tab-button"]}>업로드순</button>
            </li>
            <li>
              <button className={styles["tab-button"]}>개점일순</button>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles["tab-bottom"]}>
        {barbershops.length > 0 ? (
          barbershops.map((data: any, index: number) => {
            // 뒤에서 세 번째 데이터에 도달하면 무한 스크롤을 실행하기 위한 변수
            const isSecondLastData = index === barbershops.length - 2;
            return (
              <div
                ref={isSecondLastData ? ref : undefined}
                className={styles["list-container"]}
                key={index}
                onClick={() => {
                  dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: data });
                }}
              >
                <div
                  className={styles["barbershop-image-container"]}
                  style={{ backgroundImage: `url("${data.imgUrl}")` }}
                ></div>
                <div className={styles["list-information"]}>
                  <div className={styles["list-name"]}>
                    <div className={styles["list-name-text"]}>{`${data.name}`}</div>
                  </div>
                  <div className={styles["list-location"]}>{data.location.description}</div>
                </div>
              </div>
            );
          })
        ) : keyword && barbershops.length === 0 ? (
          <div className={`${styles["list-container"]} ${styles["list-no-data"]}`}>
            <div className={styles["mobile-keyword-result"]}>
              <div style={{ fontWeight: 550 }}>{keyword}</div>
              <div>에 대한</div>
            </div>
            <div>검색 결과가 없습니다</div>
          </div>
        ) : (
          <LoadingItems />
        )}
      </div>
    </div>
  );
};
