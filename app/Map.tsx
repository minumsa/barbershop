import { useEffect, useRef } from "react";
import NoSSR from "./lib/NoSSR";

export const Map = () => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window as any;

    if (!mapElement.current || !naver) return;

    // 로케이션표시 Google Maps에서 원하는 장소 찾은 후 주변검색을 누르면 좌표를 찾을 수 있음
    // FIXME: 나중에 기본 장소 변경하기 - 현재 위치? 고민해보기!
    const location = new naver.maps.LatLng(37.5663, 126.9779);
    // const harfBarberShop = new naver.maps.LatLng(37.56571603771177, 126.99485276474563);

    // 네이버 지도 옵션 선택
    const mapOptions = {
      center: location,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    // 지도상에 핀 표시 할 부분
    new naver.maps.Marker({
      position: location,
      map: map,
    });
    // new naver.maps.Marker({
    //   position: harfBarberShop,
    //   map: map,
    // });
  }, []);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};
