import React, { useEffect, useRef } from "react";
import { barbershops } from "./lib/data";
import { renderToString } from "react-dom/server";
import styles from "./page.module.css";

interface MapProps {
  setSubTab: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Map = ({ setSubTab }: MapProps) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window as any;

    if (!mapElement.current || !naver) return;

    // FIXME: 나중에 기본 장소 변경하기 - 현재 위치 or 종로구
    const barbershop = new naver.maps.LatLng(37.56571603771177, 126.99485276474563);

    const mapOptions = {
      center: barbershop,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_BOTTOM,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    // TODO: server에서 가져오기
    const shop = barbershops[0];

    const Barbershop = () => {
      return (
        <div className={styles["is-inner"]}>
          <div>{shop.name}</div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>주소</div>
            <div>{shop.location}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>운영시간</div>
            <div>{shop.operatingTime}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>휴무일</div>
            <div>{shop.closedDays}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>연락처</div>
            <div>{shop.contact}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>바버</div>
            <div>
              {shop.barber?.length}인 -{" "}
              {shop.barber
                ?.map(name => {
                  return name;
                })
                .join(", ")}
            </div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>시술비</div>
            <div>{shop.price?.toLocaleString()}원</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["more-button-container"]}>
              <div className={styles["more-button"]}>
                <div>더보기</div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const BarbershopIcon = () => {
      return (
        <div className={styles["pin-container"]}>
          <div>{`💇‍♂️${shop.name}`}</div>
        </div>
      );
    };

    const barbershopMarker = new naver.maps.Marker({
      position: barbershop,
      map: map,
      icon: {
        content: renderToString(BarbershopIcon()),
        size: new naver.maps.Size(50, 50),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(45, 10),
      },
    });

    const infoWindow = new naver.maps.InfoWindow({
      content: renderToString(Barbershop()),
    });

    const tmp = infoWindow.contentElement as HTMLElement;
    tmp.getElementsByClassName(styles["more-button"])[0].addEventListener("click", function (e) {
      setSubTab(true);
    });

    naver.maps.Event.addListener(barbershopMarker, "click", function (e) {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, barbershopMarker);
      }
    });
  }, []);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};
