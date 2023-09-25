import { NextResponse } from "next/server";

import type { ProductsList } from "@/app/lib/types";
import type { EndpointResponse } from "@api/lib/types";

import { API_URL } from "@api/lib/constants";

export async function GET(request: Request): Promise<EndpointResponse> {
	const url = new URL(request.url);
	const keyword = url.searchParams.get("keyword");

	if (!keyword) return NextResponse.json({ "products": [] });

	const response = await fetch(`${API_URL}/products/search?q=${keyword}`)
		.then(res => res.json())
		.then(data => data as ProductsList);
	return NextResponse.json(response);
}
