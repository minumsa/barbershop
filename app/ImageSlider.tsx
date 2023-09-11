import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function ImageSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    // cssEase: "liner",
  };
  return (
    // TODO: CSS 수정 - 이미지 flexbox에 넣기, 넘치는 부분은 안 보이게 처리, 화살표 보이게
    <Slider {...settings}>
      <div style={{ display: "flex", position: "absolute", objectFit: "cover" }}>
        <Image src={"/harf1.jpeg"} alt="some" width={500} height={200}></Image>
      </div>
      <Image src={"/harf2.jpeg"} width={500} height={200} alt="some"></Image>
      <Image src={"/harf3.jpeg"} width={500} height={200} alt="some"></Image>
      {/* <Image src={"/harf4.jpeg"} width={500} height={200} alt="some"></Image> */}
    </Slider>
  );
}
