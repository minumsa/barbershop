import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

export default function DetailImageSlider() {
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
    <Slider {...settings}>
      {/* <Image src={"/harf1.jpeg"} width={390} height={280} alt="some"></Image> */}
      <div>
        <div className="test-detail">
          <Image src={"/harf1.jpeg"} alt="some" fill={true}></Image>
        </div>
      </div>
      {/* <div style={{ display: "flex", position: "absolute", objectFit: "cover" }}></div> */}
      {/* <Image src={"/harf2.jpeg"} width={500} height={400} alt="some"></Image>
      <Image src={"/harf3.jpeg"} width={500} height={400} alt="some"></Image>
      <Image src={"/harf4.jpeg"} width={500} height={400} alt="some"></Image> */}
    </Slider>
  );
}
