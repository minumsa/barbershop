import { GetRequest } from "@/app/model/api/barbershop/GET";
import { NextResponse } from "next/server";
import BarberShopModel from "../db/BarberShopModel";
import connectMongoDB from "../db/mongodb";
import { ensureId, ensurePassword, handleError } from "../errors";

export async function GET(request: Request) {
  const searchParams = (() => {
    const tmp = new URL(request.url).searchParams;
    const data: any = {};
    tmp.forEach((value, key) => {
      data[key] = value;
    });
    return data as GetRequest;
  })();

  let query = {};
  if (searchParams.priceRangeMin != null || searchParams.priceRangeMax != null) {
    query = {
      ...query,
      price: {
        $gte: searchParams.priceRangeMin ?? -1,
        $lte: searchParams.priceRangeMax ?? Number.MAX_VALUE,
      },
    };
  }

  try {
    let dataArr = await BarberShopModel.find(query);
    if (searchParams.barberCntRangeMin != null || searchParams.barberCntRangeMax != null) {
      dataArr = dataArr.filter(v => {
        const cnt = v.barberList?.length ?? 0;
        return (
          cnt <= (searchParams.barberCntRangeMax ?? Number.MAX_VALUE) &&
          cnt >= (searchParams.barberCntRangeMin ?? -1)
        );
      });
    }
    return NextResponse.json(dataArr.map(data => data.toJSON()));
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

    // ensurePassword(password);

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

    const existingData = await BarberShopModel.findOne({ id });

    if (!existingData) {
      return NextResponse.json({ message: "Data not found" }, { status: 404 });
    }

    await existingData.deleteOne();

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
    const { name } = data.name;

    if (password !== process.env.UPLOAD_PASSWORD)
      return NextResponse.json({ message: "password is not correct" }, { status: 401 });

    const existingData = await BarberShopModel.findOne({ name });

    if (!existingData) {
      return NextResponse.json({ message: "Data not found. Cannot update." }, { status: 404 });
    }

    existingData.name = data.name;
    existingData.location.description = data.location.description;
    existingData.location.lat = data.location.lat;
    existingData.location.lng = data.location.lng;
    existingData.description = data.description;
    existingData.contact = data.contact;
    existingData.barbershopUrl = data.barbershopUrl;
    existingData.price = data.price;
    existingData.barberList = data.barberList;
    existingData.operatingTime = data.operatingTime;
    existingData.closedDays = data.closedDays;
    existingData.reservationUrl = data.reservationUrl;
    existingData.imgUrl = data.imgUrl;
    existingData.locationUrl = data.locationUrl;
    existingData.notice = data.notice;

    await existingData.save();
    return NextResponse.json(existingData.toJSON());
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// export async function PUT(request: Request) {
//   try {
//     require("dotenv").config();
//     await connectMongoDB();

//     const { data, password } = await request.json();
//     const {
//       id,
//       imgUrl,
//       artist,
//       album,
//       label,
//       releaseDate,
//       genre,
//       link,
//       text,
//       uploadDate,
//       duration,
//       tracks,
//     } = data;

//     if (password !== process.env.UPROAD_PASSWORD)
//       return NextResponse.json({ message: "password is not correct" }, { status: 401 });

//     const existingData = await Music.findOne({ id });

//     if (!existingData) {
//       return NextResponse.json({ message: "Data not found. Cannot update." }, { status: 404 });
//     }

//     existingData.id = id;
//     existingData.imgUrl = imgUrl;
//     existingData.artist = artist;
//     existingData.album = album;
//     existingData.label = label;
//     existingData.releaseDate = releaseDate;
//     existingData.genre = genre;
//     existingData.link = link;
//     existingData.text = text;
//     existingData.uploadDate = uploadDate;
//     existingData.duration = duration;
//     existingData.tracks = tracks;

//     await existingData.save();
//     return NextResponse.json(existingData.toJSON());
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Server Error" }, { status: 500 });
//   }
// }
