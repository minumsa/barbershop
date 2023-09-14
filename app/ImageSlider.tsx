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
      <div className="testimagecontainer">
        <Image src={"/harf3.jpeg"} alt="some" fill={true}></Image>
      </div>
      {/* <Image src={"/harf2.jpeg"} width={400} height={300} alt="some"></Image>
      <Image src={"/harf3.jpeg"} width={400} height={300} alt="some"></Image> */}
      {/* <Image src={"/harf4.jpeg"} width={500} height={200} alt="some"></Image> */}
    </Slider>
  );
}
