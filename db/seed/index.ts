import { PrismaClient } from "@prisma/client";

import seed_users from "./user.js";
import seed_products from "./product.js";

const prisma = new PrismaClient();

async function main(): Promise<void> {
	// TODO: use `faker.js` instead of Fake API
	await seed_users(prisma);
	await seed_products(prisma);
}

main()
	.then(async() => {
		await prisma.$disconnect();
	})
	.catch(async(e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
