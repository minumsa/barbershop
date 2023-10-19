import { NextResponse } from "next/server";
import BarberShopModel from "../../db/BarberShopModel";
import connectMongoDB from "../../db/mongodb";
import { handleError, notFoundError } from "../../errors";

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams.get("query");
    if (query == null) {
      throw notFoundError();
    }

    await connectMongoDB();
    let dataArr = await BarberShopModel.find({
      $or: [
        {
          name: { $regex: query },
        },
        {
          "location.description": { $regex: query },
        },
      ],
    });
    return NextResponse.json(dataArr.map(data => data.toJSON()));
  } catch (error) {
    return handleError(error);
  }
}
