import { NextResponse } from "next/server";
import BarberShopModel from "../db/BarberShopModel";
import connectMongoDB from "../db/mongodb";
import { handleError } from "../errors";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const itemsPerPage = Number(url.searchParams.get("itemsPerPage")) || 10;
  const currentPage = Number(url.searchParams.get("currentPage")) || 0;
  const barber = Number(url.searchParams.get("barber")) || 3;
  const price = Number(url.searchParams.get("price")) || 50000;
  const startIndex = itemsPerPage * currentPage;

  try {
    await connectMongoDB();

    const query = {};

    // expr: 여러 개의 표현식을 결합하여 하나의 표현식으로 만들 때 사용
    let dataQuery: any = { $expr: {} };
    let totalDataCountQuery: any = {};

    // lte: 주어진 값보다 작거나 같은 값을 가진 문서를 찾을 때 사용
    if (price !== 50000) {
      dataQuery.price = { $lte: price };
      totalDataCountQuery.price = { $lte: price };
    }

    // size: 배열 크기를 확인하는 연산자
    if (barber === 1) {
      dataQuery.barberList = { $exists: true, $size: 1 };
      totalDataCountQuery = { barberList: { $exists: true, $size: 1 } };
      // gte: 특정 값보다 크거나 같은 값을 가진 문서를 찾을 때 사용
    } else if (barber === 2) {
      dataQuery.$expr.$gte = [{ $size: { $ifNull: ["$barberList", []] } }, 2];
      totalDataCountQuery = dataQuery;
    }

    const data = await BarberShopModel.find({ ...query, ...dataQuery })
      .sort({ name: 1 })
      .skip(startIndex)
      .limit(itemsPerPage);

    const totalDataCount = await BarberShopModel.find(totalDataCountQuery).count();

    const result = NextResponse.json({ data, totalDataCount });
    return result;
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();

    const { password, ...reqJson } = await request.json();

    if (password !== process.env.UPLOAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const newBarbershop = await BarberShopModel.create(reqJson);

    return NextResponse.json(newBarbershop.toJSON());
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request) {
  try {
    await connectMongoDB();

    const { password, id } = await request.json();

    if (password !== process.env.UPLOAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const prevData = await BarberShopModel.findOne({ id });

    if (!prevData) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }

    await prevData.deleteOne();

    return NextResponse.json({ message: "Data deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectMongoDB();

    const { data, password } = await request.json();
    const { id } = data.id;

    if (password !== process.env.UPLOAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const prevData = await BarberShopModel.findOne({ id });

    if (!prevData) {
      return NextResponse.json({ message: "Data not found. Cannot update." }, { status: 404 });
    }

    prevData.name = data.name;
    prevData.location.description = data.location.description;
    prevData.location.lat = data.location.lat;
    prevData.location.lng = data.location.lng;
    prevData.description = data.description;
    prevData.contact = data.contact;
    prevData.barbershopUrl = data.barbershopUrl;
    prevData.price = data.price;
    prevData.barberList = data.barberList;
    prevData.operatingTime = data.operatingTime;
    prevData.closedDays = data.closedDays;
    prevData.reservationUrl = data.reservationUrl;
    prevData.imgUrl = data.imgUrl;
    prevData.locationUrl = data.locationUrl;
    prevData.notice = data.notice;

    await prevData.save();
    return NextResponse.json(prevData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
