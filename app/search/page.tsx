import { PageProps } from "@/.next/types/app/search/page";

import Results from "./Results";
import SearchBar from "./SearchBar";

interface SearchPageProps extends PageProps {
	params: Record<"slug", string>
	searchParams: Record<string, string | string[] | undefined>
}

export default function Page({ searchParams }: SearchPageProps): React.ReactElement {
	const { keyword } = searchParams;

	return (
		<>
			<SearchBar keyword={keyword} />
			{/* TODO: Suspense `Results` */}
			<Results keyword={String(keyword)}/>
		</>
	);
}
