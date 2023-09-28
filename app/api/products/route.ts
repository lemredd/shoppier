import { NextResponse } from "next/server";

import type { Product } from "@/app/lib/types";
import {
	product_creation_schema,
	type EndpointResponse,
	type ProductCreationFormEntries
} from "@api/lib/types";

import { product_operator } from "@api/lib/operator";

export async function POST(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as ProductCreationFormEntries;

	try {
		product_creation_schema.parse(entries);
	} catch(e) {
		return NextResponse.json(e, { "status": 422 });
	}

	const response = product_operator.create({
		"data": {
			// TODO: require images and thumbnail
			...entries,
			"price": Number(entries.price),
			"stock": Number(entries.stock)
		}
	}).then(
		product => NextResponse.json(product)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);

	return response;
}
