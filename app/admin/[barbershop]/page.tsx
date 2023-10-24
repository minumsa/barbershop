"use client";

import { Upload } from "@/app/Upload";
import styles from "@/app/page.module.css";

export default function Page({ params }: any) {
  const id = params.barbershop;

  return (
    <div className={styles["container"]}>
      <Upload id={id} />
    </div>
  );
}
