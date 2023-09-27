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
	const fake_users = await fetch(`${FAKE_USERS_API_URL}/users`)
		.then(res => res.json())
		.then(data => data as FakeUser[]);
	fake_users.forEach(({
		username,
		name,
		phone,
		email,
		address
	}) => {
		prisma.user.create({
			"data": {
				email,
				username,
				name,
				phone,
				"address": { "create": {
					...address,
					"country": "PH"
				} },
				"password": "password"
			}
		}).catch(console.error);
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
