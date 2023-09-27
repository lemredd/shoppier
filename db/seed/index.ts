import { PrismaClient } from "@prisma/client";

const { FAKE_USERS_API_URL } = process.env;

const prisma = new PrismaClient();

interface FakeUser {
	// Keys to delete:
	// - `id`
	// - `website`
	// - keys with value type `object`
	id: number,
	name: string,
	username: string,
	email: string,
	address: {
		street: string,
		suite: string,
		city: string,
		zipcode: string,
		geo: object
	},
	phone: string,
	website: string,
	company: object
}

async function main(): Promise<void> {
	// TODO: fetch from `FAKE_API_URL` and seed!
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
