export interface BarberShop {
  id?: string;
  name: string;
  location: {
    description: string;
    lat: number;
    lng: number;
  };
  description: string;
  contact: string;
  barbershopUrl: string;
  notice: string;
  price: number;
  barberList: string[];
  operatingTime: string;
  closedDays: string;
  reservationUrl: string;
  imgUrl: string;
  locationUrl: string;
}

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
