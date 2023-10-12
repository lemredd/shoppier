import { infer as extract } from "zod";
import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";
import { cart_item_form_data_schema as form_data_schema } from "@/app/lib/types";

import { cart_item_operator } from "@api/lib/operator";

type FormDataEntries = extract<typeof form_data_schema>;

export async function POST(request: NextRequest): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as FormDataEntries;

	try {
		form_data_schema.parse(entries);
	} catch (e) {
		return NextResponse.json(e, { "status": 422 });
	}

	const response = cart_item_operator.create({ "data": {
		"cartId": Number(entries.cart_id),
		"productId": Number(entries.product_id),
		"quantity": Number(entries.quantity)
	} }).then(
		cart_item => NextResponse.json(cart_item)
	).catch(
		e => NextResponse.json(e, { "status": 422 })
	);
	return response;
}
