import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";

interface MapProps {
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<BarberShop>>;
  barbershops: BarberShop[];
}

export const Map = ({ setSelectedBarbershop, barbershops }: MapProps) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const { naver } = window as any;
    if (!mapElement.current || !naver) return;

    // FIXME: 나중에 기본 장소 변경하기 - 현재 위치 or 종로구
    // const barbershop = new naver.maps.LatLng(37.56571603771177, 126.99485276474563);
    const barbershop = new naver.maps.LatLng(
      barbershops[0]?.location.lat ?? 37.56571603771177,
      barbershops[0]?.location.lng ?? 126.99485276474563
    );

    const mapOptions = {
      center: barbershop,
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_BOTTOM,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    interface BarbershopProps {
      name: string;
      location: string;
      operatingTime: string;
      closedDays: string;
      contact: string;
      barberList: string[];
      price: number;
    }

    const Barbershop = ({
      name,
      location,
      operatingTime,
      closedDays,
      contact,
      barberList,
      price,
    }: BarbershopProps) => {
      return (
        <div className={styles["is-inner"]}>
          <div>{name}</div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>주소</div>
            <div>{location}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>운영시간</div>
            <div>{operatingTime}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>휴무일</div>
            <div>{closedDays.length < 5 ? "없음" : closedDays}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>연락처</div>
            <div>{contact}</div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>바버</div>
            <div>
              {barberList.map((barber, index) => {
                return (
                  <span key={index}>{index < barberList.length - 1 ? `${barber}, ` : barber}</span>
                );
              })}
            </div>
          </div>
          <div className={styles["overlay-detail"]}>
            <div className={styles["overlay-detail-title"]}>시술비</div>
            <div>{price?.toLocaleString()}원</div>
          </div>
          <div className={styles["overlay-detail"]} style={{ padding: 0 }}>
            <div className={styles["more-button-container"]}>
              <div className={styles["button"]}>
                <div>더보기</div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    interface BarbershopIconProps {
      name: string;
    }

    const BarbershopIcon = ({ name }: BarbershopIconProps) => {
      return (
        <div className={styles["pin-container"]}>
          <div>{`💇‍♂️${name}`}</div>
        </div>
      );
    };

    barbershops &&
      barbershops.map((data, index) => {
        const barbershopMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(data.location.lat, data.location.lng),
          map: map,
          icon: {
            content: renderToString(<BarbershopIcon name={data.name} />),
            size: new naver.maps.Size(50, 50),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(45, 10),
          },
        });

        const infoWindow = new naver.maps.InfoWindow({
          content: renderToString(
            <Barbershop
              name={data.name}
              location={data.location.description}
              operatingTime={data.operatingTime ?? ""}
              closedDays={data.closedDays ?? ""}
              contact={data.contact ?? ""}
              barberList={data.barberList ?? []}
              price={data.price ?? 0}
            />
          ),
        });

        naver.maps.Event.addListener(barbershopMarker, "click", function () {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, barbershopMarker);
          }
        });

        const tmp = infoWindow.contentElement as HTMLElement;
        tmp.getElementsByClassName(styles["button"])[0].addEventListener("click", function () {
          setSelectedBarbershop(data);
        });
      }, []);
  }, [barbershops]);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};
