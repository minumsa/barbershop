import { NextResponse } from "next/server";
import BarberShopModel from "../../db/BarberShopModel";
import connectMongoDB from "../../db/mongodb";

export async function GET(request: Request) {

	const query = (new URL(request.url)).searchParams.get('query')
	if (query == null) {
		return NextResponse.json({}, { status: 404 })
	}

	try {
		await connectMongoDB();
		let dataArr = await BarberShopModel.find({
			$or: [
				{
					name: { $regex: query },
				},
				{
					"location.description": { $regex: query },
				}
			]
		});
		return NextResponse.json(dataArr.map(data => data.toJSON()));
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: "Server Error" }, { status: 500 });
	}
}