import { GetRequest } from "@/app/model/api/barbershop/GET";
import { NextResponse } from "next/server";
import BarberShopModel from "../db/BarberShopModel";
import connectMongoDB from "../db/mongodb";
import { ensureId, ensurePassword, handleError } from "../errors";

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
    return handleError(error)
  }
}

export async function POST(
  request: Request
) {
  try {
    await connectMongoDB();

    const {
      password,
      ...reqJson
    } = await request.json();

    ensurePassword(password)

    const newBarbershop = await BarberShopModel.create(reqJson)

    return NextResponse.json(newBarbershop.toJSON());
  } catch (error) {
    return handleError(error)
  }
}