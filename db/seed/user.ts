import type { PrismaClient } from "@prisma/client";

const { FAKE_USERS_API_URL } = process.env;

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

export default async function seed_users(prisma: PrismaClient): Promise<void> {
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
		const address_to_use: Partial<typeof address> = address;
		delete address_to_use.geo;
		const user = {
			email,
			username,
			name,
			phone,
			"password": "password"
		};
		const address_creation = {
			"create": { ...address_to_use as typeof address, "country": "PH" }
		};

		prisma.user.create({
			"data": { ...user,"address": address_creation }
		}).catch(console.error);
	});

	const all_users = await prisma.user.findMany({ "include": { "address": true } });
	console.log(all_users);
}
