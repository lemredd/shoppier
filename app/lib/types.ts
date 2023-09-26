import { object, infer as extract, string, number, array } from "zod";

export const product_schema = object({
	"id": number(),
	"title": string(),
	"description": string(),
	"price": number(),
	"discountPercentage": number(),
	"rating": number(),
	"stock": number(),
	"brand": string(),
	"category": string(),
	"thumbnail": string().url(),
	"images": array(string().url())
});


const product_list_schema = object({
	"product": array(product_schema),
	"total": number(),
	"skip": number(),
	"limit": number()
});

export type Product = extract<typeof product_schema>;
export type ProductList = extract<typeof product_list_schema>;
