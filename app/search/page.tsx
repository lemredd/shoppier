import { PageProps } from "@/.next/types/app/search/page";

interface SearchPageProps extends PageProps {
	params: Record<"slug", string>
	searchParams: Record<string, string | string[] | undefined>
}

async function search_products<T extends Record<string, any>>(keyword: string): Promise<T>{
	// TODO: handle possible errors!
	// i.e. example in https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-fetch
	return await fetch(`${process.env.API_URL}/products/search?q=${keyword}`)
		.then(res => res.json())
		.then(data => data as T);
}

export default async function Page({ searchParams }: SearchPageProps): Promise<React.ReactElement> {
	const { keyword } = searchParams;
	const { products } = await search_products(String(keyword));
	
	return (
		<>
			<form>
				<input type="text" name="keyword" value={keyword} />
			</form>
			<ul className="results">
				{products.map((product: Record<string, any>) => (
					<li key={product.id}>{product.title}</li>
				))}
			</ul>
		</>
	);
}
