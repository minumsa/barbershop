import Image from "next/image";
import React from "react";

export default function MainImage() {
  return (
    <React.Fragment>
      <Image src={"/harf1.jpeg"} alt="some" fill={true}></Image>
    </React.Fragment>
  );
}
