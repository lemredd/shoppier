import { NextResponse } from "next/server";
import { infer as extract, string } from "zod";

import { product_schema } from "@/app/lib/types";

export type EndpointResponse = ReturnType<typeof NextResponse["json"]> | Response

export const product_creation_schema = product_schema.pick({
	"title": true,
	"brand": true,
	"price": true,
	"stock": true,
	"description": true
}).extend({
	"price": string().refine(value => !isNaN(Number(value)), "Please enter a number for this field."),
	"stock": string().refine(value => !isNaN(Number(value)), "Please enter a number for this field.")
});

export type ProductCreationFormEntries = extract<typeof product_creation_schema>;
