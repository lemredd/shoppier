import { NextResponse } from "next/server";

export async function GET(): Promise<ReturnType<typeof NextResponse["json"]> | Response> {
	const data = await fetch(`${process.env.API_URL}/users`)
		.then(res => res.json())
		.then(data => data as Record<string, any>)
		.catch(console.error);
	return NextResponse.json(data);
}
