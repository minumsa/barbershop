export interface BarberShop {
  name: string;
  barberList: string[];
  location: {
    description: string;
    lat: number;
    lng: number;
  };
  operatingTime: string;
  closedDays: string;
  contact: string;
  description: string;
  price: number;
  imgUrl: string;
  barbershopUrl: string;
  reservationUrl: string;
  locationUrl: string;
  notice: string;
}

export type barberType = number;
export type priceType = number;
