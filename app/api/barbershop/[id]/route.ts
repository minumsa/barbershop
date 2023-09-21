import { NextResponse } from "next/server";
import BarberShopModel from "../../db/BarberShopModel";
import connectMongoDB from "../../db/mongodb";
import { ensureId, ensurePassword, handleError, notFoundError } from "../../errors";


export async function GET(
	request: Request,
	{ params: { id } }: { params: { id: string } }
) {
	try {
		await connectMongoDB();
		ensureId(id)

		let data = await BarberShopModel.findById(id)
		if (data == null) {
			throw notFoundError()
		}
		return NextResponse.json(data);
	} catch (error) {
		return handleError(error)
	}
}

export async function PUT(
	request: Request,
	{ params: { id } }: { params: { id: string } }
) {
	try {
		await connectMongoDB();

		const {
			password,
			...reqJson
		} = await request.json();

		ensurePassword(password)
		ensureId(id)

		const result = await BarberShopModel.updateOne({_id: id}, {$set: reqJson}).exec()

		let data = await BarberShopModel.findById(id)

		if (data == null) {
			throw notFoundError()
		}

		return NextResponse.json(data.toJSON());
	} catch (error) {
		return handleError(error)
	}
}


export async function DELETE(
	request: Request,
	{ params: { id } }: { params: { id: string } }
) {
	try {
		await connectMongoDB();

		const { password } = await request.json();

		ensurePassword(password)
		ensureId(id)

		let data = await BarberShopModel.findById(id)

		if (data == null) {
			throw notFoundError()
		}

		await data.deleteOne();

		return NextResponse.json({ message: "Data deleted successfully" });
	} catch (error) {
		return handleError(error)
	}
}
