import { NextResponse } from "next/server";

export default function GET(): ReturnType<typeof NextResponse["json"]> | Response {
	return NextResponse.json({})
}
