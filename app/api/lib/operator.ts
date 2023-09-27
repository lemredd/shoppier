import { PrismaClient } from "@prisma/client";

const client_connector = new PrismaClient();

export const {
	"user": user_operator,
	"product": product_operator
} = client_connector;

