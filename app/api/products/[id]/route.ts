import { NextResponse } from "next/server";

import type { Product } from "@/app/lib/types";
import type { EndpointResponse } from "@api/lib/types";
import {
	product_creation_schema as product_modification_schema,
	type ProductCreationFormEntries as ProductModificationFormEntries
} from "@api/lib/types";

import { product_operator } from "@api/lib/operator";

interface Context {
	params: { id: string }
}

const respond_if_invalid_id = (): EndpointResponse => NextResponse.json(
	"Please provide a valid id.",
	{ "status": 422 }
);

export async function GET(_request: Request, context: Context): Promise<EndpointResponse> {
	const id = Number(context.params.id);
	if (isNaN(id)) return respond_if_invalid_id();

	const response = await product_operator.findUnique({
		"where": { id }
	}).then(
		product => NextResponse.json(product)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);

	return response;
}

export async function PATCH(request: Request, context: Context): Promise<EndpointResponse> {
	const id = Number(context.params.id);
	if (isNaN(id)) return respond_if_invalid_id();

	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as ProductModificationFormEntries;

	try {
		product_modification_schema.parse(entries);
	} catch (e) {
		return NextResponse.json(e, { "status": 422 });
	}

	const data = await fetch(`${SERVER_URL}/products/${id}`, {
		"method": "PATCH",
		"headers": { "content-type": "application/json" },
		"body": JSON.stringify({
			// TODO: allow inclusion of images. Before that, store these mock data in a real database
			...entries,
			// Despite not being type restricted, the fake API has both properties below set as `number` initially.
			"price": Number(entries.price),
			"stock": Number(entries.stock)
		})
	})
		.then(res => res.json())
		.then(data => data as Product)
		.catch(console.error);
	
	return NextResponse.json(data);
}

export async function DELETE(_request: Request, context: Context): Promise<EndpointResponse> {
	const id = Number(context.params.id);
	if (isNaN(id)) return respond_if_invalid_id();

	const data = await fetch(`${SERVER_URL}/products/${id}`, { "method": "DELETE" })
		.then(res => res.json())
		.then(data => data as Product)
		.catch(console.error);
	
	return NextResponse.json(data);
}
