import { useEffect, useState } from "react";
import { barbershops } from "./lib/data";
import styles from "./page.module.css";

interface MainTabProps {
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<any | null>>;
}

export const MainTab = ({ setSelectedBarbershop }: MainTabProps) => {
  const [orderType, setOrderType] = useState<string>("name-asc");
  const [newBarbershops, setNewBarbershops] = useState<any | null>(barbershops);

  // TODO: 처음에는 백엔드에 저장되어 있는 모든 바버샵 정보를 목록으로 보여주기
  // TODO: 검색창에 지역을 검색하면 해당 지역의 바버샵 정보만 필터링해서 목록으로 보여주기

  useEffect(() => {
    switch (orderType) {
      case "name-asc":
        setNewBarbershops([...barbershops].sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "name-desc":
        setNewBarbershops([...barbershops].sort((a, b) => b.name.localeCompare(a.name)));
        break;
      // TODO: 업로드 오름차순/내림차순은 추후에 몽고DB 데이터 연결되면 넣기
    }
  }, [orderType]);

  return (
    <div className={styles["tab"]}>
      <div className={styles["tab-title"]}>바버샵 리스트</div>
      <div className={styles["tab-filter"]}>
        <div>{`총 ${newBarbershops.length}개의 검색 결과`}</div>
        <select className={styles["tab-select"]} onChange={e => setOrderType(e.target.value)}>
          <option value="name-asc">이름 오름차순</option>
          <option value="name-desc">이름 내림차순</option>
          <option value="upload-asc">업로드 오름차순</option>
          <option value="upload-desc">업로드 내림차순</option>
        </select>
      </div>
      {newBarbershops.map((data, index: number) => {
        return (
          <div
            className={styles["list-container"]}
            key={index}
            onClick={() => {
              setSelectedBarbershop(data);
            }}
          >
            <div
              className={styles["carousel-container"]}
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
