export interface GetRequest {
	priceRange?: {
		min?: number,
		max?: number,
	},
	barberCntRange?: {
		min?: number,
		max?: number,
	},
}
