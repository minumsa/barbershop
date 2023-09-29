"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlus,
  faScissors,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import { FilterWindow } from "@/app/FilterWindow";
import { Upload } from "@/app/Upload";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";

export default function Page({ params }: any) {
  const id = params.barbershop;
  const [price, setPrice] = useState<number>(50000); // price원 이상
  const [barber, setBarber] = useState<number>(3); // barber명 이상
  const [showFilterWindow, setIsFilterActive] = useState<boolean>(false);
  const handleFilter = () => setIsFilterActive(!showFilterWindow);
  const router = useRouter();

  return (
    <div className={styles["container"]}>
      <div className={styles["nav-container"]}>
        <div
          className={styles["title"]}
          onClick={() => {
            router.push("/admin");
          }}
        >
          <div>
            <FontAwesomeIcon icon={faScissors} />
          </div>
          <div>Barber</div>
        </div>
      </div>
      <Upload id={id} />
    </div>
  );
}
