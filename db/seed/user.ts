import encryptor from "bcrypt";
import type { PrismaClient } from "@prisma/client";

const FAKE_API_URL = "https://jsonplaceholder.typicode.com";
const { PASSWORD_SALT_ROUNDS } = process.env;

interface FakeUser {
	id: number, // not included in seed
	name: string,
	username: string,
	email: string,
	address: {
		street: string, // not included/renamed to `address_1`
		suite: string, // not included/renamed to `address_2`
		city: string,
		zipcode: string,
		geo: object // not included in seed
	},
	phone: string,
	website: string, // not included in seed
	company: object
}

export default async function seed_users(prisma: PrismaClient): Promise<void> {
	const fake_users = await fetch(`${FAKE_API_URL}/users`)
		.then(res => res.json())
		.then(data => data as FakeUser[]);

	const password = await encryptor.hash("password", Number(PASSWORD_SALT_ROUNDS));
	if (process.env.NODE_ENV !== "test") fake_users.forEach(({
		username,
		name,
		phone,
		email,
		address
	}) => {
		const address_to_use: Partial<typeof address> = address;
		const user = {
			email,
			username,
			name,
			phone,
			password
		};

		delete address_to_use.geo;
		delete address_to_use.street;
		delete address_to_use.suite;
		const address_creation = { "create": {
			...address_to_use as typeof address,
			"name": `${username}'s address`,
			"address_1": address_to_use.street ?? "foo",
			"address_2": address_to_use.suite ?? "bar",
			"country": "PH"
		} };
		const auth_token_creation = { "create": {
			"value": `${email}_${Date.now()}`
		} };

		// I implemented this seed while using SQLite as `datasource.provider`
		// See first remark on `https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
		prisma.users.create({ "data": {
			...user,
			"addresses": address_creation,
			"auth_tokens": auth_token_creation
		} }).catch(console.error);
	});

	if (process.env.NODE_ENV === "test") prisma.users.create({ "data": {
		"username": "TEST_DATA_username",
		"email": "TEST_DATA@email.com",
		"password": await encryptor.hash("TEST_DATA_password", Number(PASSWORD_SALT_ROUNDS)),
		"auth_tokens": { "create": { "value": "TEST_DATA_auth_token" } }
	} }).catch(console.error);

	const all_users = await prisma.users.findMany({ "include": { "addresses": true } });
	console.log(all_users);
}
