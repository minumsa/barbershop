export const filterData = {
  priceRange: {},
};

export interface BarberShop {
  name: string;
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

// export type barberType = 1 | 2 | 3;
// export type priceType = 30000 | 35000 | 40000 | 45000 | 50000;

export type barberType = number;
export type priceType = number;
