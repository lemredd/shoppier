import { NextResponse } from "next/server";

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

	const response = await product_operator.findUniqueOrThrow({ "where": { id } })
		.then(product => NextResponse.json(product))
		// TODO: make error shape similar to `ZodError`
		// TODO: make error status identifier
		.catch(e => NextResponse.json(e, { "status": 422 }));

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

	const response = product_operator.update({
		"where": { id },
		"data": {
			...entries,
			"stock": Number(entries.stock),
			"price": Number(entries.price)
		}
	}).then(
		product => NextResponse.json(product)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);
	
	return response;
}

export async function DELETE(_request: Request, context: Context): Promise<EndpointResponse> {
	const id = Number(context.params.id);
	if (isNaN(id)) return respond_if_invalid_id();

	const response = await product_operator.delete({
		"where": { id }
	}).then(
		product => NextResponse.json(product)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);
	
	return response;
}
