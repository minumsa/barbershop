import { isObjectIdOrHexString } from "mongoose";
import { NextResponse } from "next/server";

// errors

export function notFoundError() {
  return NextResponse.json({ message: "Data not found" }, { status: 404 });
}

export function serverError() {
  return NextResponse.json({ message: "Server Error" }, { status: 500 });
}

export function wrongPasswordError() {
  return NextResponse.json({ message: "password is not correct" }, { status: 401 });
}

// ensure 

export function ensurePassword(password: string) {
  if (password !== process.env.UPLOAD_PASSWORD)
    throw wrongPasswordError()
}

export function ensureId(id: string) {
  if (!isObjectIdOrHexString(id)) {
    throw notFoundError()
  }
}

// etc

export function handleError(error: any) {
  if (error instanceof NextResponse) {
    return error
  } else {
    console.error(error);
    return serverError()
  }
}