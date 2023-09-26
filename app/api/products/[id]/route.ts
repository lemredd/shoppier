import { NextResponse } from "next/server";

import type { Product } from "@/app/lib/types";
import type { EndpointResponse } from "@api/lib/types";
import type { RequiredProductCreationProps as RequiredProductModificationProps } from "@api/lib/types";

import { API_URL } from "@api/lib/constants";

interface Context {
	params: { id: number }
}

export async function GET(_request: Request, context: Context): Promise<EndpointResponse> {
	const id = context.params.id;

	if (isNaN(id)) return new Response("Please provide a valid id.");

	const data = await fetch(`${API_URL}/products/${id}`)
		.then(res => res.json())
		.then(data => data as Product)
		.catch(console.error);

	return NextResponse.json(data);
}

export async function PATCH(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();
	const entries = Object.fromEntries(form_data) as RequiredProductModificationProps;// TODO: validate!!!;

	const data = await fetch(`${API_URL}/products/${entries.id}`, {
		"method": "PATCH",
		"headers": { "content-type": "application/json" },
		// TODO: allow inclusion of images. Before that, store these mock data in a real database
		"body": JSON.stringify({ ...entries } satisfies RequiredProductModificationProps)
	})
		.then(res => res.json())
		.then(data => data as Product)
		.catch(console.error);
	return NextResponse.json(data);
}
