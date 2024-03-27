import { BarberShop } from "./types";

export const initialBarberShop: BarberShop = {
  name: "",
  location: {
    description: "",
    lat: 0,
    lng: 0,
  },
  description: "",
  contact: "",
  barbershopUrl: "",
  notice: "",
  price: 0,
  barberList: [],
  operatingTime: "",
  closedDays: "",
  reservationUrl: "",
  imgUrl: "",
  locationUrl: "",
};

export const OFF_DAYS = "휴무일";
export const OPERATING_HOURS = "운영시간";
export const COST = "시술비";
export const ABOUT = "소개";
export const ADDRESS = "주소";
export const WEBSITE = "웹사이트";
export const PASSWORD = "관리자 비밀번호";
export const RESERVATION = "예약";
export const BARBER = "바버";
