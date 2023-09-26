import type { NextResponse } from "next/server";
import { infer as extract } from "zod";

import { product_schema } from "@/app/lib/types";

export type EndpointResponse = ReturnType<typeof NextResponse["json"]> | Response

const product_creation_schema = product_schema.pick({
	"title": true,
	"brand": true,
	"price": true,
	"stock": true,
	"description": true
});

export type ProductCreationFormEntries = extract<typeof product_creation_schema>;
