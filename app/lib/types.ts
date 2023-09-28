import { object, infer as extract, string, number, array } from "zod";

export const product_schema = object({
	"id": number(),
	"title": string(),
	"description": string(),
	"price": number(),
	"stock": number(),
	"brand": string(),
	"discountPercentage": number().nullable(),
	"rating": number().nullable(),
	"category": string().nullable(),// TODO: make required
	"thumbnail": string().url().nullable(),// TODO: make required
	"images": array(string().url()).nullable()// TODO: make required
});

const products_list_schema = object({
	"products": array(product_schema),
	"total": number(),
	"skip": number(),
	"limit": number()
});

export type Product = extract<typeof product_schema>;
export type ProductsList = extract<typeof products_list_schema>;
