import { GetRequest } from "@/app/model/api/barbershop/GET";
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

  // const searchParams = (() => {
  //   const tmp = new URL(request.url).searchParams;
  //   const data: any = {};
  //   tmp.forEach((value, key) => {
  //     data[key] = value;
  //   });
  //   return data as GetRequest;
  // })();

  let query = {};
  // if (searchParams.priceRangeMin != null || searchParams.priceRangeMax != null) {
  //   query = {
  //     ...query,
  //     price: {
  //       $gte: searchParams.priceRangeMin ?? -1,
  //       $lte: searchParams.priceRangeMax ?? Number.MAX_VALUE,
  //     },
  //   };
  // }

  try {
    await connectMongoDB();

    let data = undefined;

    if (price == 50000) {
      // 바버 1인만
      if (barber == 1) {
        data = await BarberShopModel.find(query)
          .sort({ name: 1 })
          .find({ barber: 1 })
          .skip(startIndex)
          .limit(itemsPerPage);
        // console.log("barber 1");
        // console.log("barber 1 data: ", data);
        // 바버 2인 이하
      } else if (barber == 2) {
        data = await BarberShopModel.find(query)
          .sort({ name: 1 })
          .find({ barber: { $lte: 2 } })
          .skip(startIndex)
          .limit(itemsPerPage);
        // console.log("barber 2");
        // console.log("barber 2 data: ", data);
        // 바버 전체 선택
      } else if (barber == 3) {
        data = await BarberShopModel.find(query)
          .sort({ name: 1 })
          .skip(startIndex)
          .limit(itemsPerPage);
        // console.log("barber 3");
        // console.log("barber 3 data: ", data);
      }
    } else {
      if (barber === 1) {
        data = await BarberShopModel.find(query)
          .sort({ name: 1 })
          .find({ barber: 1 })
          .find({ price: { $lte: price } })
          .skip(startIndex)
          .limit(itemsPerPage);
      } else if (barber === 2) {
        data = await BarberShopModel.find(query)
          .sort({ name: 1 })
          .find({ barber: { $lte: 2 } })
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

    // if (searchParams.barberCntRangeMin != null || searchParams.barberCntRangeMax != null) {
    //   data = data?.filter(v => {
    //     const cnt = v.barberList?.length ?? 0;
    //     return (
    //       cnt <= (searchParams.barberCntRangeMax ?? Number.MAX_VALUE) &&
    //       cnt >= (searchParams.barberCntRangeMin ?? -1)
    //     );
    //   });
    // }

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
