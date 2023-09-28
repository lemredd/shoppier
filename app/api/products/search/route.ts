import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { product_operator } from "@api/lib/operator";

export async function GET(request: Request): Promise<EndpointResponse> {
	const url = new URL(request.url);
	const keyword = url.searchParams.get("keyword");

	if (!keyword) return NextResponse.json({ "products": [] });

	// TODO: paginate and include count
	const response = product_operator.findMany({ "where": {
		"OR": [
			{ "title": { "contains": keyword } },
			{ "brand": { "contains": keyword } },
			{ "description": { "contains": keyword } },
			{ "category": { "contains": keyword } }
		]
	} }).then(
		products => NextResponse.json(products)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);
	return await response;
}
