import type { PrismaClient } from "@prisma/client";

const FAKE_API_URL = "https://dummyjson.com";

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

export default async function seed_products(prisma: PrismaClient, skip = 0): Promise<void> {
	if (skip > 100) return;
	const { "products": fake_products } = await fetch(`${FAKE_API_URL}/products?limit=10&skip=${skip}`)
		.then(res => res.json())
		.then(data => data as { products: FakeProduct[] });
	
	fake_products.forEach(product => {
		const product_to_create = product as Partial<FakeProduct>;
		delete product_to_create.id;
		prisma.products.create({
			"data": { ...product_to_create as typeof product, "images": product.images.join(",") }
		})
			.catch(console.error);
	});

	seed_products(prisma, skip + 10).catch(console.error);
	const all_products = await prisma.products.findMany();
	console.log(all_products);
}
