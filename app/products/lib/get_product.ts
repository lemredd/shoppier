import { Product } from "@/app/lib/types";

export default async function get_product<T extends Product>(id: number): Promise<T> {
	return await fetch(`/api/products/${id}`)
		.then(res => res.json())
		.then(data => data as T);
}

