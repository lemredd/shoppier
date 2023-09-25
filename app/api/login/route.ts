import { NextResponse } from "next/server";

import { API_URL } from "@api/lib/constants";

export async function POST(request: Request): Promise<ReturnType<typeof NextResponse["json"]> | Response> {
	const data = await request.formData();
	return NextResponse.json(Object.fromEntries(data));
}
