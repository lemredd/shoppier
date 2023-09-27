import { PrismaClient } from "@prisma/client";

import seed_users from "./user.js";

const prisma = new PrismaClient();

async function main(): Promise<void> {
	await seed_users(prisma);
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
