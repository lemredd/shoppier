import { NextResponse } from "next/server";

import { API_URL } from "@api/lib/constants";

export async function POST(request: Request): Promise<ReturnType<typeof NextResponse["json"]> | Response> {
	const reader = request.body?.getReader();
	const { value } = await reader!.read();
	const data = JSON.parse(new TextDecoder().decode(value)) as Record<string, any>;
	return NextResponse.json(data);
}
