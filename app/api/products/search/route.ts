import { NextResponse } from "next/server";

import type { ProductsList } from "@/app/lib/types";
import type { EndpointResponse } from "@api/lib/types";

import { product_operator } from "@api/lib/operator";

// TODO: paginate
export async function GET(request: Request): Promise<EndpointResponse> {
	// TODO: require `skip` and `limit` search params
	const url = new URL(request.url);
	const keyword = url.searchParams.get("keyword");

	if (!keyword) return NextResponse.json({ "products": [] });

	// TODO: `skip` and `offset`
	const response = product_operator.findMany({ "where": {
		"OR": [
			{ "title": { "contains": keyword } },
			{ "brand": { "contains": keyword } },
			{ "description": { "contains": keyword } },
			{ "category": { "contains": keyword } }
		]
	} }).then(
		products => NextResponse.json({
			"products": products.map(product => ({ ...product, "images": product.images?.split(",") ?? [] })),
			"skip": 0, // TODO: `skip` and `offset`
			"limit": 10, // TODO: `skip` and `offset`
			"total": products.length
		} satisfies ProductsList)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);
	return await response;
}
