import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavBar.module.css";
import { faMagnifyingGlass, faPlus, faSliders } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { searchData } from "../../lib/api";
import { useState } from "react";
import { BarberShop } from "../../model/BarberShop";

interface NavBar {
  setShowFilterWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  setBarbershops: React.Dispatch<React.SetStateAction<BarberShop[]>>;
}

export const NavBar = ({ setShowFilterWindow, setKeyword, setBarbershops }: NavBar) => {
  const router = useRouter();
  const [currentKeyword, setCurrentKeyword] = useState<string>("");
  const pathName = usePathname();
  const isAdmin = pathName.includes("admin");

  const handleSearch = async () => {
    try {
      const barbershops = await searchData(currentKeyword);
      setKeyword(currentKeyword);
      setBarbershops(barbershops);
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
      <div className={styles["title"]}>
        <div
          onClick={() => {
            setBarbershops([]);
            router.push("/");
          }}
        >
          Barbershop
        </div>
      </div>
      <div className={styles["search-container"]}>
        <div className={styles["search"]}>
          <div className={styles["magnifying-glass"]}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            className={styles["search-input"]}
            placeholder="키워드를 입력해주세요"
            value={currentKeyword}
            onChange={e => {
              setCurrentKeyword(e.target.value);
            }}
            onKeyDown={handleSearchEnter}
          />
          {currentKeyword && (
            <div
              className={`${styles["search-button"]} ${styles["x-button"]}`}
              onClick={() => {
                setCurrentKeyword("");
              }}
            >
              <div className={styles["clear-span"]}></div>
            </div>
          )}
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
            setShowFilterWindow(true);
          }}
        >
          <FontAwesomeIcon icon={faSliders} />
        </div>
      </div>
    </div>
  );
};
