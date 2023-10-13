import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./page.module.css";
import { faMagnifyingGlass, faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { searchData } from "./lib/api";

interface Nav {
  keyword: string;
  isMobile: boolean;
  showFilterWindow: boolean;
}

export const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { keyword, isMobile, showFilterWindow } = useSelector(
    (state: Nav) => ({
      keyword: state.keyword,
      isMobile: state.isMobile,
      showFilterWindow: state.showFilterWindow,
    }),
    shallowEqual
  );

  const pathName = usePathname();
  const isAdmin = pathName.includes("admin");

  const handleSearch = async () => {
    try {
      const barbershops = await searchData(keyword);
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
        {/* <FontAwesomeIcon icon={faScissors} /> */}
        <div>
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <div>Barber</div>
              <div className={styles["title-circle"]}></div>
              <div>MR</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles["search-container"]}>
        <div className={styles["search"]}>
          <div className={styles["magnifying-glass"]}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            className={styles["search-input"]}
            placeholder="지역을 입력해주세요"
            value={keyword}
            onChange={e => {
              dispatch({ type: "SET_KEYWORD", payload: e.target.value });
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
