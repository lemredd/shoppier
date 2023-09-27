import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(): Promise<void> {
	await prisma.user.create({
		"data": {
			"email": "foo@email.com",
			"username": "user",
			"password": "password",
			"address": {
				"create": {
					"address": "Foo Bar Baz St",
					"city": "Foo City",
					"postal_code": 123,
					"country": "Foo",
				}
			}
		}
	});
	const all_users = await prisma.user.findMany({ "include": { "address": true } });
	console.log(all_users);
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
