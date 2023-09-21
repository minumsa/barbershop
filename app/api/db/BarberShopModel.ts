import mongoose, { Model } from "mongoose";

interface IBarberShop {
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
	locationUrl?: string,
}

const barberShopSchema = new mongoose.Schema<IBarberShop>({
	name: { type: String, required: true },
	location: {
		description: { type: String, required: true },
		lat: { type: Number, required: true },
		lng: { type: Number, required: true }
	},
	description: String,
	contact: String,
	barbershopUrl: String,
	notice: String,
	price: Number,
	barberList: [String],
	operatingTime: String,
	closedDays: String,
	reservationUrl: String,
	imgUrl: String,
	locationUrl: String,
});

barberShopSchema.set('toJSON', {
	virtuals: true,
	transform: (doc, ret, options) => {
		delete ret.__v;
		ret.id = ret._id.toString();
		delete ret._id;
	},
});

const BarberShopModel: Model<IBarberShop> =
	mongoose.models.BarberShop || mongoose.model<IBarberShop>("BarberShop", barberShopSchema);

export default BarberShopModel;
