import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";
import { useSelector } from "react-redux";

interface MainTabProps {
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<any | null>>;
  barber: number;
}

export const MainTab = ({ setSelectedBarbershop, barber }: MainTabProps) => {
  const [orderType, setOrderType] = useState<string>("name");
  const [filteredBarbershops, setFilteredBarbershops] = useState<BarberShop[]>();
  const barbershops = useSelector(state => state.barbershops);

  useEffect(() => {
    switch (orderType) {
      case "name":
        barbershops &&
          setFilteredBarbershops([...barbershops].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      // case "open":
      //   barbershops &&
      //     setFilteredBarbershops([...barbershops].sort((a, b) => b.name.localeCompare(a.name)));
      //   break;
      // case "upload":
      //   barbershops &&
      //     setFilteredBarbershops([...barbershops].sort((a, b) => b.name.localeCompare(a.name)));
      //   break;
    }
  }, [orderType]);

  useEffect(() => {
    barbershops &&
      setFilteredBarbershops(
        [...barbershops]
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(data => {
            // null이나 undefined가 아니면
            if (data.barberList != null) {
              if (barber === 1) return data.barberList.length === 1;
              if (barber === 2) return data.barberList.length >= 2;
              if (barber === 3) return data.barberList.length > 0;
            }
          })
      );
  }, [barber, barbershops]);

  return (
    <div className={styles["tab"]}>
      <div className={styles["tab-title"]}>바버샵 리스트</div>
      <div className={styles["tab-filter"]}>
        <div>{`총 ${
          filteredBarbershops?.length ? filteredBarbershops?.length : 0
        }개의 검색 결과`}</div>
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
        {/* <select className={styles["tab-select"]} onChange={e => setOrderType(e.target.value)}>
          <option value="name-asc">이름 오름차순</option>
          <option value="name-desc">이름 내림차순</option>
          <option value="upload-asc">업로드 오름차순</option>
          <option value="upload-desc">업로드 내림차순</option>
        </select> */}
      </div>
      {filteredBarbershops?.map((data: any, index: number) => {
        return (
          <div
            className={styles["list-container"]}
            key={index}
            onClick={() => {
              setSelectedBarbershop(data);
            }}
          >
            <div
              className={styles["barbershop-image-container"]}
              style={{ backgroundImage: `url("${data.imgUrl}")` }}
            ></div>
            <div className={styles["list-information"]}>
              <div className={styles["list-name"]}>{data.name}</div>
              <div className={styles["list-location"]}>{data.location.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
