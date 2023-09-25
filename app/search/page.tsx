import { PageProps } from "@/.next/types/app/search/page";

async function search_products<T extends Record<string, any>>(keyword: string): Promise<T> {
	const products = await fetch(`/api/products/search?keyword=${keyword}`)
		.then(res => res.json())
		.then(data => data as T)
		.catch(console.error);

	return products as T;
}

interface SearchPageProps extends PageProps {
	params: Record<"slug", string>
	searchParams: Record<string, string | string[] | undefined>
}

export default async function Page({ searchParams }: SearchPageProps): Promise<React.ReactElement> {
	
	return (
		<form>
			<input type="text" name="keyword" />
		</form>
	);
}
