import { NextResponse } from "next/server";

import type { Product } from "@/app/lib/types";
import type { EndpointResponse } from "@api/lib/types";

import { API_URL } from "@api/lib/constants";

interface RequiredProductCreationProps extends Partial<Product> {
	title: string
	brand: string
	price: number
	stock: number
	description: string
}

export async function POST(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as RequiredProductCreationProps; // TODO: validate!!!;

	const data = await fetch(`${API_URL}/products/add`, {
		"method": "POST",
		"headers": { "content-type": "application/json" },
		"body": JSON.stringify({ ...entries } satisfies RequiredProductCreationProps)
	})
		.then(res => res.json())
		.then(data => data as Product)
		.catch(console.error);
	return NextResponse.json(data);
}
