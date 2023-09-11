import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function ImageSlider() {
  const settings = {
    width: "100px",
    height: "100px",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // cssEase: "liner",
  };
  return (
    <Slider {...settings}>
      <Image src={"/harf1.jpeg"} width={500} height={400} alt="some"></Image>
      <Image src={"/harf2.jpeg"} width={500} height={400} alt="some"></Image>
      <Image src={"/harf3.jpeg"} width={500} height={400} alt="some"></Image>
      <Image src={"/harf4.jpeg"} width={500} height={400} alt="some"></Image>
    </Slider>
  );
}
