"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { Upload } from "@/app/Upload";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";

export default function Page({ params }: any) {
  const id = params.barbershop;
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
