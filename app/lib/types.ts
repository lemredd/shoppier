import { object, infer as extract, string, number, array } from "zod";

import type { Cart, CartProduct } from "@prisma/client";

import { NO_AUTH_TOKEN_PROVIDED_MESSAGE as ANONYMOUS_CART_MESSAGE } from "@api/lib/constants";

// TODO: separate schemas into `@app/lib/schema.ts`
/* Schemas */
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

export const cart_item_form_data_schema = object({
	"cart_id": string().optional().refine(value => !isNaN(Number(value)), ANONYMOUS_CART_MESSAGE),
	"product_id": string().refine(value => !isNaN(Number(value))),
	"quantity": string().refine(value => !isNaN(Number(value)))
});

export type Product = extract<typeof product_schema>;
export type ProductsList = extract<typeof products_list_schema>;

/* cart types */
export type AnonymousCartProduct = Omit<CartProduct, "cartId">
export interface AnonymousCart {
	products: AnonymousCartProduct[]
}

interface AuthenticatedUserCart extends Cart {
	products: CartProduct[]
}

export type UserCart = AuthenticatedUserCart | AnonymousCart;

