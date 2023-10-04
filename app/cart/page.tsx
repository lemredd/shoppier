import get_user_cart from "@app/lib/get_user_cart";
import Cart from "./Cart";

export default async function Page(): Promise<React.ReactElement> {
	const cart = await get_user_cart();
	return <Cart cart={cart} />;
}
