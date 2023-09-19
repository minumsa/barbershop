import { NextResponse } from "next/server";
import BarberShopModel from "../db/BarberShopModel";
import connectMongoDB from "../db/mongodb";
import { GetRequest } from "@/app/model/api/barbershop/GET";

export async function GET(request: Request) {
	const searchParams = (new URL(request.url)).searchParams as GetRequest
	let query = {}
	if (searchParams.priceRange != null) {
		query = {
			...query,
			price: { $gte: searchParams.priceRange.min ?? -1, $lt: searchParams.priceRange.max ?? Number.MAX_VALUE }
		}
	}
	if (searchParams.barberCntRange != null) {
		query = {
			...query,
			barberCnt: { $gte: searchParams.barberCntRange.min ?? -1, $lt: searchParams.barberCntRange.max ?? Number.MAX_VALUE }
		}
	}
	try {
		await connectMongoDB();
		const dataArr = await BarberShopModel.find(query);
		return NextResponse.json(dataArr.map(data => data.toJSON()));
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}
