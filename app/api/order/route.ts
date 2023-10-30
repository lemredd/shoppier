import { array, string, type output } from "zod";
import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { auth_token_operator, order_operator } from "@api/lib/operator";

export async function GET(request: NextRequest): Promise<EndpointResponse> {
	const auth_token = request.cookies.get("auth");
	if (!auth_token) return NextResponse.json(null, { "status": 401 });

	const found_user_or_error = await auth_token_operator.findUniqueOrThrow({
		"where": { "value": auth_token.value },
		"include": { "user": true }
	}).then(
		token => token.user
	).catch(
		(error: Error) => error
	);

	if (found_user_or_error instanceof Error) return NextResponse.json(
		found_user_or_error,
		{ "status": 401 }
	);

	const response = order_operator.findMany({
		"where": { "user_id": found_user_or_error.id }
	}).then(orders => NextResponse.json(orders));

	return response;
}

export async function POST(request: NextRequest): Promise<EndpointResponse> {
	const auth_token = request.cookies.get("auth");
	if (!auth_token) return NextResponse.json(null, { "status": 401 });
	const product_properties_selections = {
		"quantity": true,
		"product_id": true
	};
	const cart_inclusions = { "products": {
		"select": product_properties_selections
	} };
	const user_inclusions = {
		"cart": { "include": cart_inclusions },
		"addresses": true
	};
	const auth_token_inclusions = { "user": {
		"include": user_inclusions
	} };
	const found_user_or_error = await auth_token_operator.findUniqueOrThrow({
		"where": { "value": auth_token.value },
		"include": auth_token_inclusions
	}).then(
		token => token.user
	).catch(
		(error: Error) => error
	);
	if (found_user_or_error instanceof Error) return NextResponse.json(
		found_user_or_error,
		{ "status": 401 }
	);

	const address_id_validator = string().refine(
		value => !isNaN(Number(value)),
		"Please select an option from your saved addresses."
	);
	const item_ids_validator = array(string().refine(
		value => !isNaN(Number(value)),
		"Please select an item from your cart."
	));const form_data = await request.formData();
	const address_id = form_data.get("address_id") as output<typeof address_id_validator>;
	const item_ids = form_data.getAll("item_ids") as output<typeof item_ids_validator>;
	
	try {
		address_id_validator.parse(address_id);
		item_ids_validator.parse(item_ids);
	} catch (e) {
		return NextResponse.json(e, { "status": 422 });
	}

	// TODO: validate if `form_data.address_id` is found in `Addresses`

	const order_items = found_user_or_error.cart?.products;
	const response = await order_operator.create({ "data": {
		"arrival": new Date(), // TODO: this is temporary.
		"shipping_fee": 50, // TODO: this is temporary.
		"subtotal": 50, // TODO: this is temporary.
		"user_id": found_user_or_error.id,
		"address_id": Number(address_id),
		"statuses": { "create": { "type": "PENDING", "details": "" } },
		"order_items": { "create": [...order_items!] }
	} }).then(
		order => NextResponse.json(order)
	).catch(
		error => NextResponse.json(error, { "status": 500 })
	);

	return response;
}
