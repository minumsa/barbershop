export const filterData = {
  priceRange: {},
};

export interface BarberShop {
  name?: string;
  barberList?: string[];
  location: {
    description: string;
    lat: number;
    lng: number;
  };
  operatingTime?: string;
  closedDays?: string;
  contact?: string;
  description?: string;
  price?: number;
  imgUrl?: string;
  barbershopUrl?: string;
  reservationUrl?: string;
  locationUrl?: string;
  notice?: string;
}
