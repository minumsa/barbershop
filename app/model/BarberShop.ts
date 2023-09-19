export interface BarberShop {
	id: string,
	name: string,
	location: {
		description: string,
		lat: number,
		lng: number,
	},
	description?: string,
	contact?: string,
	barbershopUrl?: string,
	notice?: string,
	price?: number,
	barberList?: string[],
	operatingTime?: string,
	closedDays?: string,
	reservationUrl?: string,
	imgUrl?: string,
}