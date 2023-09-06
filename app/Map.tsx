import { useEffect, useRef } from "react";
import NoSSR from "./lib/NoSSR";

export const Map = () => {
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
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    var harfbarbershopString = [
      '<div class="is_inner">',
      "   <div>하프바버샵</div>",
      "<div class='overlay_detail'>",
      "   <div class='overlay_detail_title'>주소</div>",
      "   <div>서울 중구 을지로18길 15 2층 205호</div>",
      "</div>",
      "<div class='overlay_detail'>",
      "   <div class='overlay_detail_title'>운영시간</div>",
      "   <div>월~토 11:00~20:00</div>",
      "</div>",
      "<div class='overlay_detail'>",
      "   <div class='overlay_detail_title'>휴무일</div>",
      "   <div>매주 일요일</div>",
      "</div>",
      "<div class='overlay_detail'>",
      "   <div class='overlay_detail_title'>연락처</div>",
      "   <div>0507-1329-2972</div>",
      "</div>",
      "<div class='overlay_detail overlay_detail_more'>",
      "<div class='more-button'><div>더보기</div></div>",
      "</div>",
      "</div>",
    ].join("");

    // 지도상에 핀 표시 할 부분
    var harfbarbershopMarker = new naver.maps.Marker({
      position: harfbarbershop,
      map: map,
    });
    // new naver.maps.Marker({
    //   position: harfbarbershop,
    //   map: map,
    // });

    var infowindow = new naver.maps.InfoWindow({
      content: harfbarbershopString,
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
