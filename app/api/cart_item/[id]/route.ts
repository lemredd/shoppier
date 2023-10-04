import { cookies } from "next/headers";
import { object, output, string } from "zod";
import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { cart_item_operator } from "@api/lib/operator";
import { NO_AUTH_TOKEN_PROVIDED_MESSAGE } from "@/app/lib/constants";

interface Context {
	params: { id: string }
}

const respond_if_invalid_id = (): EndpointResponse => NextResponse.json(
	"Please provide a valid id.",
	{ "status": 422 }
);

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

	const response = cart_item_operator.update({
		"where": { id },
		"data": {
			"quantity": Number(entries.quantity)
		}
	}).then(
		cart_item => NextResponse.json(cart_item)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);
	
	return response;
}

export async function DELETE(_request: Request, context: Context): Promise<EndpointResponse> {
	const auth = cookies().get("auth")?.value;
	try {
		authorization_schema.parse(auth);
	} catch(e) {
		return NextResponse.json(e, { "status": 401 });
	}

	const id = Number(context.params.id);
	if (isNaN(id)) return respond_if_invalid_id();

	const response = await cart_item_operator.delete({
		"where": { id }
	}).then(
		cart_item => NextResponse.json(cart_item)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);
	
	return response;
}
