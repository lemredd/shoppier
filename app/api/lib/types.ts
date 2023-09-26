import type { NextResponse } from "next/server";

import type { Product } from "@/app/lib/types";

export type EndpointResponse = ReturnType<typeof NextResponse["json"]> | Response

export interface RequiredProductCreationProps extends Partial<Product> {
	title: string
	brand: string
	price: number
	stock: number
	description: string
}
