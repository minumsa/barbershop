import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import styles from "./page.module.css";
import { BarberShop } from "./model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

interface MapProps {
  filteredBarbershops: BarberShop[];
  isMobile: boolean;
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<BarberShop | null | undefined>>;
}

export const Map = () => {
  const { isMobile, filteredBarbershops } = useSelector(
    (state: MapProps) => ({
      isMobile: state.isMobile,
      filteredBarbershops: state.filteredBarbershops,
    }),
    shallowEqual
  );

  const mapElement = useRef(null);
  const dispatch = useDispatch();
  const [activeMarkerId, setActiveMarkerId] = useState<string>();
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

  useEffect(() => {
    const { naver } = window as any;
    if (!mapElement.current || !naver) return;

    const barbershop = filteredBarbershops
      ? new naver.maps.LatLng(
          filteredBarbershops[0]?.location.lat,
          filteredBarbershops[0]?.location.lng
        )
      : new naver.maps.LatLng(37.56571603771177, 126.99485276474563);

    const mapOptions = {
      center: barbershop,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: isMobile ? naver.maps.Position.RIGHT_TOP : naver.maps.Position.RIGHT_BOTTOM,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    interface BarbershopItemProps {
      title: string;
      data: string | React.ReactNode[];
    }

    const BarbershopItem = ({ title, data }: BarbershopItemProps) => {
      return (
        <div className={styles["overlay-detail"]}>
          <div className={styles["overlay-detail-title"]}>{title}</div>
          <div>{data}</div>
        </div>
      );
    };

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
          <button className={styles["filter-button"]}>×</button>
          <div className={styles["flexbox-row-center"]} style={{ marginBottom: "5px" }}>
            <div className={styles["string-center-border"]}>{name}</div>
          </div>
          <BarbershopItem title={"주소"} data={location} />
          <BarbershopItem title={"운영시간"} data={operatingTime} />
          <BarbershopItem title={"휴무일"} data={closedDays.length < 5 ? "없음" : closedDays} />
          <BarbershopItem title={"연락처"} data={contact} />
          <BarbershopItem
            title={"바버"}
            data={barberList.map((barber, index) => {
              return (
                <span key={index}>{index < barberList.length - 1 ? `${barber}, ` : barber}</span>
              );
            })}
          />
          <BarbershopItem title={"시술비"} data={`${price?.toLocaleString()}원`} />
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
      id: string;
    }

    const BarbershopIcon = ({ name, id }: BarbershopIconProps) => {
      return (
        <div className={styles["pin-container"]}>
          <div className={styles["pin-circle"]}></div>
          <div className={styles["pin-name"]}>{name}</div>
        </div>
      );
    };

    filteredBarbershops &&
      filteredBarbershops.map(data => {
        const barbershopMarker = new naver.maps.Marker({
          position: new naver.maps.LatLng(data.location.lat, data.location.lng),
          map: map,
          icon: {
            content: renderToString(<BarbershopIcon name={data.name} id={data.id} />),
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
          if (isMobile) {
            dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: data });
          } else {
            if (infoWindow.getMap()) {
              infoWindow.close();
            } else {
              setShowInfoWindow(true);
              infoWindow.open(map, barbershopMarker);
            }
          }
        });

        naver.maps.Event.addListener(barbershopMarker, "mouseover", function () {
          if (showInfoWindow === false) setActiveMarkerId(data.id);
        });

        naver.maps.Event.addListener(barbershopMarker, "mouseout", function () {
          if (showInfoWindow === false) setActiveMarkerId(undefined);
        });

        const tmp = infoWindow.contentElement as HTMLElement;

        tmp.getElementsByClassName(styles["button"])[0].addEventListener("click", function () {
          dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: data });
        });

        tmp
          .getElementsByClassName(styles["filter-button"])[0]
          .addEventListener("click", function () {
            setActiveMarkerId(undefined);
            setShowInfoWindow(false);
            infoWindow.close();
          });
      }, []);
  }, [filteredBarbershops]);

  return <div ref={mapElement} className={styles["map-container"]} />;
};
