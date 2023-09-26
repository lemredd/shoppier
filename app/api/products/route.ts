import { NextResponse } from "next/server";

import type { Product } from "@/app/lib/types";
import {
	product_creation_schema,
	type EndpointResponse,
	type ProductCreationFormEntries
} from "@api/lib/types";

import { API_URL } from "@api/lib/constants";

export async function POST(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as ProductCreationFormEntries;

	try {
		product_creation_schema.parse(entries);
	} catch(e) {
		return NextResponse.json(e, { "status": 422 });
	}

	const data = await fetch(`${API_URL}/products/add`, {
		"method": "POST",
		"headers": { "content-type": "application/json" },
		// TODO: allow inclusion of images. Before that, store these mock data in a real database
		"body": JSON.stringify({ ...entries })
	})
		.then(res => res.json())
		.then(data => data as Product)
		.catch(console.error);
	return NextResponse.json(data);
}
