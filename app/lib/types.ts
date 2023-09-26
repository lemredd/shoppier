export interface Product extends Record<string, any> {
	id: number
	title: string
	description: string
	price: number
	discountPercentage: number
	rating: number
	stock: number
	brand: string
	category: string
	thumbnail: string
	images: Array<string>
}
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

export interface ProductsList extends Record<string, any> {
	products: Product[]
	total: number
	skip: number
	limit: number
}

const product_list_schema = object({
	"product": array(product_schema),
	"total": number(),
	"skip": number(),
	"limit": number()
});
