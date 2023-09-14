import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function MainCarousel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    // cssEase: "liner",
  };
  return (
    // TODO: 이미지 깨지지 않게 상위 div의 width에 사이즈 맞추기, 캐로셀 화살표 보이게
    <Slider {...settings}>
      <Image src={"/harf1.jpeg"} alt="some" fill={true}></Image>
      {/* <Image src={"/harf2.jpeg"} alt="some" fill={true}></Image>
        <Image src={"/harf3.jpeg"} alt="some" fill={true}></Image>
        <Image src={"/harf4.jpeg"} alt="some" fill={true}></Image> */}
    </Slider>
  );
}
