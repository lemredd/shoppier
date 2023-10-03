import { cookies } from "next/headers";
import { object, output, string } from "zod";
import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { cart_item_operator } from "@api/lib/operator";

interface Context {
	params: { id: string }
}

const respond_if_invalid_id = (): EndpointResponse => NextResponse.json(
	"Please provide a valid id.",
	{ "status": 422 }
);

// TODO: centralize error message
const NO_AUTH_TOKEN_PROVIDED_MESSAGE = "You are not currently logged in. Items you add in your cart will be stored in the browser.";
const authorization_schema = string().refine(value => Boolean(value), NO_AUTH_TOKEN_PROVIDED_MESSAGE);
const cart_item_modification_entries_schema = object({
	"quantity": string().refine(value => !isNaN(Number(value)), "Quantity must be a number.")
});
type CartItemModificationEntries = output<typeof cart_item_modification_entries_schema>;

export async function PATCH(request: Request, context: Context): Promise<EndpointResponse> {
	const auth = cookies().get("auth")?.value;
	try {
		authorization_schema.parse(auth);
	} catch(e) {
		return NextResponse.json(e, { "status": 401 });
	}

	const id = Number(context.params.id);
	if (isNaN(id)) return respond_if_invalid_id();

	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as CartItemModificationEntries;

	try {
		cart_item_modification_entries_schema.parse(entries);
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
