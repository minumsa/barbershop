import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../page.module.css";
import { faMagnifyingGlass, faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { searchData } from "../lib/api";
import { useState } from "react";

interface Nav {
  keyword: string;
  showFilterWindow: boolean;
}

export const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { showFilterWindow } = useSelector(
    (state: Nav) => ({
      showFilterWindow: state.showFilterWindow,
    }),
    shallowEqual
  );
  const [currentKeyword, setCurrentKeyword] = useState<string>("");

  const pathName = usePathname();
  const isAdmin = pathName.includes("admin");

  const handleSearch = async () => {
    try {
      const barbershops = await searchData(currentKeyword);
      dispatch({ type: "SET_KEYWORD", payload: currentKeyword });
      dispatch({ type: "SET_BARBERSHOPS", payload: barbershops });
    } catch (error) {
      console.error("Error in handleSearch:", error);
    }
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles["nav-container"]}>
      <div
        className={styles["title"]}
        onClick={() => {
          dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: null });
          router.push("/");
        }}
      >
        <div>Barbershop</div>
        {/* <div style={{ display: "flex" }}>
          <div className={styles["title-circle"]}>d</div>
          <div>MR</div>
        </div> */}
      </div>
      <div className={styles["search-container"]}>
        <div className={styles["search"]}>
          <div className={styles["magnifying-glass"]}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            className={styles["search-input"]}
            placeholder="지역을 입력해주세요"
            value={currentKeyword}
            onChange={e => {
              setCurrentKeyword(e.target.value);
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
        {isAdmin && (
          <div
            className={styles["filter-icon"]}
            style={{ marginRight: "15px" }}
            onClick={() => {
              router.push("/admin/upload");
            }}
          >
            <div>
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        )}
        <div
          className={styles["filter-icon"]}
          onClick={() => {
            dispatch({ type: "SET_SHOW_FILTER_WINDOW", payload: !showFilterWindow });
          }}
        >
          <FontAwesomeIcon icon={faSliders} />
        </div>
      </div>
    </div>
  );
};
