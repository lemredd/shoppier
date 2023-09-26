import { NextResponse } from "next/server";

import type { EndpointResponse } from "@api/lib/types";

import { API_URL } from "@api/lib/constants";

export async function POST(request: Request): Promise<EndpointResponse> {
	const form_data = await request.formData();

	const data = await fetch(`${API_URL}/users`)
		.then(res => res.json())
		.then(data => data as Record<string, any>)
		.catch(console.error);
	return NextResponse.json(data);
}
