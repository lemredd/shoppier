import { infer as extract, object, string } from "zod";
import { NextRequest, NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { cart_operator } from "@api/lib/operator";

const form_data_schema = object({
	"id": string().refine(value => !isNaN(Number(value))),
	"product_id": string().refine(value => !isNaN(Number(value))),
	"quantity": string().refine(value => !isNaN(Number(value)))
});

type FormDataEntries = extract<typeof form_data_schema>;

export async function POST(request: NextRequest): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as FormDataEntries;

	try {
		form_data_schema.parse(entries);
	} catch (e) {
		return NextResponse.json(e, { "status": 422 });
	}

	// TODO: handle error if `create` fails
	// TODO: consider anonymous carts
	async function create_cart(): Promise<EndpointResponse> {
		return NextResponse.json(await cart_operator.create({ "data": {
			"user_id": decoded_body.user_id,
		} }));
	}
	const response = cart_operator.findUniqueOrThrow({ "where": { "user_id": decoded_body.user_id } })
		.then(cart =>  NextResponse.json(cart))
		.catch(create_cart);
	return response;
}
