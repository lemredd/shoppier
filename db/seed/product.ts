import type { PrismaClient } from "@prisma/client";

// TODO: rename as `FAKE_PRODUCTS_API_URL`
const { FAKE_API_URL } = process.env;

interface FakeProduct {
	id: number
	title: string
	description: string
	brand: string
	stock: number
	price: number
	discountPercentage: number
	rating: number
	category: string
	thumbnail: string
	images: Array<string>
}

export default async function seed_products(prisma: PrismaClient): Promise<void> {
	const fake_products = await fetch(`${FAKE_API_URL}/users`)
		.then(res => res.json())
		.then(data => data as FakeProduct[]);
		
	fake_products.forEach(product => {
		const product_to_create = product as Partial<FakeProduct>;
		delete product_to_create.id;
		prisma.product.create({
			"data": { ...product_to_create as typeof product, "images": product.images.join(",") }
		}).catch(console.error);
	});

	const all_users = await prisma.user.findMany({ "include": { "address": true } });
	console.log(all_users);
}
