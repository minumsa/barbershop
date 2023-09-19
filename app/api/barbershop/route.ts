import { GetRequest } from "@/app/model/api/barbershop/GET";
import { NextResponse } from "next/server";
import BarberShopModel from "../db/BarberShopModel";
import connectMongoDB from "../db/mongodb";

export async function GET(request: Request) {

	const searchParams = (() => {
		const tmp = (new URL(request.url)).searchParams
		const data: any = {}
		tmp.forEach((value, key) => {
			data[key] = value
		})
		return data as GetRequest
	})()

	let query = {}
	if (searchParams.priceRangeMin != null || searchParams.priceRangeMax != null) {
		query = {
			...query,
			price: { $gte: searchParams.priceRangeMin ?? -1, $lte: searchParams.priceRangeMax ?? Number.MAX_VALUE }
		}
	}

	try {
		await connectMongoDB();
		let dataArr = await BarberShopModel.find(query);
		if (searchParams.barberCntRangeMin != null || searchParams.barberCntRangeMax != null) {
			dataArr = dataArr.filter(v => {
				const cnt = (v.barberList?.length ?? 0)
				return cnt <= (searchParams.barberCntRangeMax ?? Number.MAX_VALUE) && cnt >= (searchParams.barberCntRangeMin ?? -1)
			})
		}
		return NextResponse.json(dataArr.map(data => data.toJSON()));
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}