import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LoadingItems } from "./LoadingItems";

interface MainTabProps {
  barbershops: BarberShop[];
  barber: number;
  price: number;
  filteredBarbershops: BarberShop[];
  keyword: string;
  isMobile: boolean;
}

export const MainTab = () => {
  const [orderType, setOrderType] = useState<string>("name");
  const { barbershops, barber, price, filteredBarbershops, keyword, isMobile } = useSelector(
    (state: MainTabProps) => ({
      barbershops: state.barbershops,
      barber: state.barber,
      price: state.price,
      filteredBarbershops: state.filteredBarbershops,
      keyword: state.keyword,
      isMobile: state.isMobile,
    }),
    shallowEqual
  );

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
      {!isMobile && <div className={styles["tab-title"]}>바버샵 리스트</div>}
      <div className={styles["tab-filter"]}>
        <div className={styles["tab-result-data"]}>
          {keyword.length > 1 && (
            <div className={styles["filter-box-title"]}>
              <span className={styles["filter-box-content"]}> {keyword}</span>
              <span>에 대한</span>
            </div>
          )}
          <div className={styles["filter-box-title"]}>총</div>
          <div className={styles["filter-box-content"]}>{`${
            filteredBarbershops?.length ? filteredBarbershops?.length : 0
          }개`}</div>
          <div>의 검색 결과</div>
        </div>
        {/* TODO: 나중에 바버샵 변수에 업로드일, 개점일 추가 */}
        <div className={styles["tab-order"]}>
          <ul className={styles["tab-ul"]}>
            <li className={styles["tab-li"]}>
              <button
                className={styles["tab-button"]}
                onClick={() => {
                  setOrderType("name");
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

      {filteredBarbershops.length > 0 ? (
        filteredBarbershops.map((data: any, index: number) => {
          return (
            <div
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
                <div className={styles["list-location"]}>
                  {isMobile
                    ? data.location.description.split(" ").map((text: string, index: number) => {
                        return index < 5 && `${text} `;
                      })
                    : data.location.description}
                </div>
              </div>
            </div>
          );
        })
      ) : filteredBarbershops.length === 0 ? (
        <div>검색 결과가 없습니다</div>
      ) : (
        <LoadingItems />
      )}
    </div>
  );
};
