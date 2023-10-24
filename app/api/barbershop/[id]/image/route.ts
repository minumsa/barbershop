import BarberShopModel from "@/app/api/db/BarberShopModel";
import connectMongoDB from "@/app/api/db/mongodb";
import { ensureId, ensurePassword, handleError, notFoundError } from "@/app/api/errors";
import { s3, s3BucketName, s3BucketPublicEndpoint } from "@/app/api/lib/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const maxFileSizeKB = 1024;

export async function PUT(request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    await connectMongoDB();

    const formData = await request.formData();
    const password = formData.get("password") as string;
    if (password == null || typeof password !== "string") {
      ensurePassword("");
    }

    ensurePassword(password);
    ensureId(id);

    if ((await BarberShopModel.findById(id)) == null) {
      throw notFoundError();
    }

    const file = formData.get("image") as File;
    if (!file || typeof file === "string") {
      throw NextResponse.json({ message: "no file" }, { status: 400 });
    }
    if (file.size > maxFileSizeKB * 1024 * 8) {
      throw NextResponse.json({ message: `no more than ${maxFileSizeKB} KB` }, { status: 400 });
    }
    // TODO: try optimize memory for large file.
    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const fileName = `${Date.now()}-${file.name}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: s3BucketName,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
      })
    );
    const s3ObjectUrl = s3BucketPublicEndpoint + "/" + fileName;

    const result = await BarberShopModel.updateOne(
      { _id: id },
      { $set: { imgUrl: s3ObjectUrl } }
    ).exec();

    let data = await BarberShopModel.findById(id);

    if (data == null) {
      throw notFoundError();
    }

    return NextResponse.json(data.toJSON());
  } catch (error) {
    return handleError(error);
  }
}
