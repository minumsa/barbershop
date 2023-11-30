import React, { useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import styles from "../page.module.css";
import { BarberShop } from "../model/BarberShop";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

interface MapProps {
  barbershops: BarberShop[];
  setSelectedBarbershop: React.Dispatch<React.SetStateAction<BarberShop | null | undefined>>;
  selectedBarbershop: BarberShop | null | undefined;
}

export const Map = () => {
  const { barbershops, selectedBarbershop } = useSelector(
    (state: MapProps) => ({
      barbershops: state.barbershops,
      selectedBarbershop: state.selectedBarbershop,
    }),
    shallowEqual
  );

  const mapElement = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const { naver } = window as any;
    if (!mapElement.current || !naver) return;

    const barbershop = selectedBarbershop
      ? new naver.maps.LatLng(selectedBarbershop.location.lat, selectedBarbershop.location.lng)
      : barbershops
      ? new naver.maps.LatLng(barbershops[0]?.location.lat, barbershops[0]?.location.lng)
      : new naver.maps.LatLng(37.56571603771177, 126.99485276474563);

    const mapOptions = {
      center: barbershop,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.RIGHT_BOTTOM,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    interface BarbershopItemProps {
      title: string;
      data: string | React.ReactNode[];
    }

    const BarbershopItem = ({ title, data }: BarbershopItemProps) => {
      return (
        <div className={styles["info-window-text"]}>
          <div className={styles["info-window-text-title"]}>{title}</div>
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
        <div className={styles["info-window"]}>
          <div className={styles["filter-button"]}>
            <span className={styles["x-span"]}>×</span>
          </div>
          <div className={styles["info-window-title"]} style={{ marginBottom: "5px" }}>
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
          <div className={styles["info-window-text"]} style={{ padding: 0 }}>
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
          <div className={styles["pin-circle"]}></div>
          <div className={styles["pin-name"]}>{name}</div>
        </div>
      );
    };

    barbershops &&
      barbershops.map(data => {
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
          infoWindow.open(map, barbershopMarker);
        });

        const tmp = infoWindow.contentElement as HTMLElement;

        tmp.getElementsByClassName(styles["button"])[0].addEventListener("click", function () {
          dispatch({ type: "SET_SELECTED_BARBERSHOP", payload: data });
        });

        tmp
          .getElementsByClassName(styles["filter-button"])[0]
          .addEventListener("click", function () {
            infoWindow.close();
          });
      }, []);
  }, [barbershops, selectedBarbershop]);

  return <div ref={mapElement} style={{ width: "100%", height: "100%" }} />;
};
