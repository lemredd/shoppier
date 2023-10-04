import { UserCart } from "@app/lib/get_user_cart";

import CartItem from "./CartItem";

interface Props {
	cart: UserCart
}
export default function Cart({ cart }: Props): React.ReactElement {
	return (
		<>
			{cart.products.length && cart.products.map(product => (
				<CartItem key={product.id} item={product} />
			)) || "You have no items in your cart yet."}
		</>
	);
}
