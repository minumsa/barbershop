import { NextResponse } from "next/server";
import BarberShopModel from "../db/BarberShopModel";
import connectMongoDB from "../db/mongodb";
import { handleError } from "../errors";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const itemsPerPage = Number(url.searchParams.get("itemsPerPage")); // 10
  const currentPage = Number(url.searchParams.get("currentPage")); // 0부터 시작
  const barber = Number(url.searchParams.get("barber")); // 3
  const price = Number(url.searchParams.get("price")); // 50000
  const startIndex = itemsPerPage * currentPage;
  const query = {};

  try {
    await connectMongoDB();

    let data = undefined;

    if (price === 50000) {
      if (barber === 1) {
        data = await BarberShopModel.find({ barberList: { $exists: true, $size: 1 } })
          .sort({ name: 1 })
          .skip(startIndex)
          .limit(itemsPerPage);
      } else if (barber === 2) {
        data = await BarberShopModel.find({
          $expr: { $gte: [{ $size: { $ifNull: ["$barberList", []] } }, 2] },
        })
          .sort({ name: 1 })
          .skip(startIndex)
          .limit(itemsPerPage);
      } else if (barber === 3) {
        data = await BarberShopModel.find(query)
          .sort({ name: 1 })
          .skip(startIndex)
          .limit(itemsPerPage);
      }
    } else {
      if (barber === 1) {
        data = await BarberShopModel.find({ barberList: { $exists: true, $size: 1 } })
          .sort({ name: 1 })
          .find({ price: { $lte: price } })
          .skip(startIndex)
          .limit(itemsPerPage);
      } else if (barber === 2) {
        data = await BarberShopModel.find({
          $expr: { $gte: [{ $size: { $ifNull: ["$barberList", []] } }, 2] },
        })
          .sort({ name: 1 })
          .find({ price: { $lte: price } })
          .skip(startIndex)
          .limit(itemsPerPage);
      } else if (barber === 3) {
        data = await BarberShopModel.find(query)
          .sort({ name: 1 })
          .find({ price: { $lte: price } })
          .skip(startIndex)
          .limit(itemsPerPage);
      }
    }

    const result = NextResponse.json(data);
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
