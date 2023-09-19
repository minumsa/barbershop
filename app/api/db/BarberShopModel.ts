import { BarberShop } from "@/app/model/BarberShop";
import mongoose, { Schema, Document, Model } from "mongoose";

interface IBarberShop {
	name: string,
	location: {
		description?: string,
		lat: number,
		lng: number,
	},
	notice?: string,
}

const barberShopSchema = new mongoose.Schema<IBarberShop>({
	name: { type: String, required: true },
	location: {
		description: String,
		lat: { type: Number, required: true },
		lng: { type: Number, required: true }
	},
	notice: String,
});

mongoose.set('bufferCommands', false);

const BarberShopModel: Model<BarberShop> =
	mongoose.models.BarberShop || mongoose.model<IBarberShop>("BarberShop", barberShopSchema);

export default BarberShopModel;
