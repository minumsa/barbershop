export interface BarberShop {
	id: string,
	name: string,
	location: {
		description?: string,
		lat: number,
		lng: number,
	},
	notice?: string,
	normalPrice: number,
	barberCnt: number,
}