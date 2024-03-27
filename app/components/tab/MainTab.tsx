import { useEffect, useState } from "react";
import styles from "./MainTab.module.css";
import { BarberShop } from "../../model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { LoadingItems } from "../loading/LoadingItems";
import { useInView } from "react-intersection-observer";

interface MainTabProps {
  barbershops: BarberShop[];
}

interface MainTab {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  keyword: string;
  totalDataCount: number;
  price: number;
  barber: number;
}

export const MainTab = ({ setCurrentPage, keyword, totalDataCount, price, barber }: MainTab) => {
  const [orderType, setOrderType] = useState<string>("name");
  const { barbershops } = useSelector(
    (state: MainTabProps) => ({
      barbershops: state.barbershops,
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
            type: "SET_BARBERSHOPS",
            payload: [...barbershops].sort((a, b) => a.name.localeCompare(b.name)),
          });
        break;
    }
  }, [orderType]);

  useEffect(() => {
    if (inView) setCurrentPage(prevPage => prevPage + 1);
  }, [inView]);

  return (
    <div className={styles["tab"]}>
      <div className={styles["tab-title"]}>바버샵 리스트</div>
      <div className={styles["tab-filter"]}>
        <div className={styles["tab-result-data"]}>
          {/* 검색 시 표시할 문구 */}
          {keyword && (
            <div className={styles["filter-box-title"]}>
              <span className={styles["filter-box-content"]}> {keyword}</span>
              <span>에 대한</span>
            </div>
          )}
          <div className={styles["filter-box-content"]}>{`${totalDataCount}개`}</div>
          <div>{`의${keyword ? " 검색" : ""} 결과`}</div>
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
              {/* TODO: 나중에 블로그에 정리: 문자열에 영어 포함되는지 체크 */}
              <span
                style={{
                  fontWeight: 500,
                  paddingTop: keyword.match(/[a-zA-Z]/) !== null ? "2.5px" : undefined,
                }}
              >
                {keyword}
              </span>
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
