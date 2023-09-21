import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import styles from "./page.module.css";

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 3000,
    // cssEase: "liner",
  };
  return (
    <div>
      <Slider {...settings}>
        {/* 
          <Image src={"/harf1.jpeg"} alt="some" fill={true}></Image>
        </div>
      </div> */}

        <div className={styles["test-detail"]}>
          <div>
            <Image src={"/harf1.jpeg"} alt="some" fill={true}></Image>
          </div>
          <div>
            <Image src={"/harf1.jpeg"} alt="some" fill={true}></Image>
          </div>
        </div>
      </Slider>
    </div>
  );
}
