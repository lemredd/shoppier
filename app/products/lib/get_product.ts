import type { Product } from "@/app/lib/types";

import { SERVER_URL } from "@/app/lib/constants";

export default async function get_product<T extends Product>(id: number): Promise<T> {
	return await fetch(`${SERVER_URL}/api/products/${id}`)
		.then(res => res.json())
		.then(data => data as T);
}

