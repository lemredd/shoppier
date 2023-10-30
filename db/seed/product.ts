import type { PrismaClient } from "@prisma/client";

const FAKE_API_URL = "https://dummyjson.com";

interface FakeProduct {
	id: number // not included in seed
	title: string
	description: string
	brand: string
	stock: number
	price: number
	discountPercentage: number // renamed to `discount_percentage`
	rating: number
	category: string
	thumbnail: string
	images: Array<string>
}

export default async function seed_products(prisma: PrismaClient, skip = 0): Promise<void> {
	if (process.env.NODE_ENV === "test") {
		const product_1 = {
			"title": "TEST_DATA_product1",
			"description": "TEST_DATA_product1",
			"brand": "TEST_DATA_product1",
			"stock": 10,
			"price": 10,
		};
		const product_2 = {
			"title": "TEST_DATA_product1",
			"description": "TEST_DATA_product1",
			"brand": "TEST_DATA_product1",
			"stock": 10,
			"price": 10,
		};
		const products = [product_1, product_2];
		for (const product of products) {
			await prisma.products.create({ "data": product }).catch(console.error);
		}

		const all_products = await prisma.products.findMany();
		console.log(all_products);
		return;
	}

	if (skip > 100) return;
	const { "products": fake_products } = await fetch(`${FAKE_API_URL}/products?limit=10&skip=${skip}`)
		.then(res => res.json())
		.then(data => data as { products: FakeProduct[] });
	
	fake_products.forEach(product => {
		const product_to_create = product as Partial<FakeProduct> & { discount_percentage: number };
		delete product_to_create.id;
		product_to_create.discount_percentage = product_to_create.discountPercentage ?? 0;
		delete product_to_create.discountPercentage;
		prisma.products.create({ "data": {
			...product_to_create as typeof product,
			"images": product.images.join(",")
		} }).catch(console.error);
	});

	seed_products(prisma, skip + 10).catch(console.error);
	const all_products = await prisma.products.findMany();
	console.log(all_products);
}
