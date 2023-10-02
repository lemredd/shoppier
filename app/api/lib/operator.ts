import { PrismaClient } from "@prisma/client";

// Each recompilation in `next dev` (HMR) seems to reconstruct this.
// TODO: find a way to never let HMR reconstruct. Might also come in handy in production.
const client_connector = new PrismaClient();

export const {
	"user": user_operator,
	"product": product_operator,
	"cart": cart_operator,
	"cartProduct": cart_item_operator
} = client_connector;

