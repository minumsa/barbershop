import React, { useEffect, useRef } from "react";
import NoSSR from "./lib/NoSSR";
import { barbershopArray } from "./lib/data";
import ImageSlider from "./ImageSlider";
import { renderToString } from "react-dom/server";

interface MapProps {
  setShowDetailBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Map = ({ setShowDetailBar }: MapProps) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window as any;

    if (!mapElement.current || !naver) return;

    // 로케이션표시 Google Maps에서 원하는 장소 찾은 후 주변검색을 누르면 좌표를 찾을 수 있음
    // FIXME: 나중에 기본 장소 변경하기 - 현재 위치? 고민해보기!
    const harfbarbershop = new naver.maps.LatLng(37.56571603771177, 126.99485276474563);

    // 네이버 지도 옵션 선택
    const mapOptions = {
      center: harfbarbershop,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    const shop = barbershopArray[0]; // TODO: server 에서 가져오기

    //   <div className="barbershop-image">
    //   <ImageSlider />
    // </div>
    const harfbarbershopString = [
      `<div class="is_inner">`,
      `<div>${shop.name}</div>`,
      // `<div class='barbershop-image'>`,
      // `${renderToString(ImageSlider())}`,
      // `</div>`,
      `<div class='overlay_detail'>`,
      `   <div class='overlay_detail_title'>주소</div>`,
      `   <div>${shop.location}</div>`,
      `</div>`,
      `<div class='overlay_detail'>`,
      `   <div class='overlay_detail_title'>운영시간</div>`,
      `   <div>${shop.operatingTime}</div>`,
      `</div>`,
      `<div class='overlay_detail'>`,
      `   <div class='overlay_detail_title'>휴무일</div>`,
      `   <div>${shop.closedDays}</div>`,
      `</div>`,
      `<div class='overlay_detail'>`,
      `   <div class='overlay_detail_title'>연락처</div>`,
      `   <div>${shop.contact}</div>`,
      `</div>`,
      `<div class='overlay_detail'>`,
      `   <div class='overlay_detail_title'>바버</div>`,
      `   <div>${shop.barber?.length}인 - ${shop.barber
        ?.map(name => {
          return name;
        })
        .join(", ")}</div>`,
      `</div>`,
      `<div class='overlay_detail'>`,
      `   <div class='overlay_detail_title'>시술비</div>`,
      `   <div>${shop.price?.toLocaleString()}원</div>`,
      `</div>`,
      `<div class='overlay_detail overlay_detail_more'>`,
      `<div class='more-button'><div>더보기</div></div>`,
      `</div>`,
      `</div>`,
    ].join("");

    // 지도상에 핀 표시 할 부분
    const harfbarbershopMarker = new naver.maps.Marker({
      position: harfbarbershop,
      map: map,
      icon: {
        content: [`<div class='pin-container'><div>💇‍♂️${shop.name}</div></div>`].join(""),
        size: new naver.maps.Size(50, 50),
        // origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(45, 10),
      },
    });
    // new naver.maps.Marker({
    //   position: harfbarbershop,
    //   map: map,
    // });

    const infowindow = new naver.maps.InfoWindow({
      content: harfbarbershopString,
    });

    const tmp = infowindow.contentElement as HTMLElement;
    tmp.getElementsByClassName("more-button")[0].addEventListener("click", function (e) {
      setShowDetailBar(true);
    });

    naver.maps.Event.addListener(harfbarbershopMarker, "click", function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, harfbarbershopMarker);
      }
    });
  }, []);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};
