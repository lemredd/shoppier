"use client";

import { PageProps } from "@/.next/types/app/search/page";

async function search_products<T extends Record<string, any>>(keyword: string): Promise<T> {
	const products = await fetch(`/api/products/search?keyword=${keyword}`)
		.then(res => res.json())
		.then(data => data as T)
		.catch(console.error);

	return products as T;
}

export default function Page({ searchParams }: PageProps): React.ReactNode {
	const keyword = searchParams.get("keyword");
	function submit(): void {
		
	}
	
	return (
		<form onSubmit={submit}>
			<input type="text" name="keyword" />
		</form>
	);
}
