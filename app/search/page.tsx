import Results from "./Results";
import SearchBar from "./SearchBar";

interface PageProps {
	searchParams: Record<string, string | string[] | undefined>
}

export default function Page({ searchParams }: PageProps): React.ReactElement {
	const { keyword } = searchParams;

	return (
		<>
			<SearchBar keyword={keyword} />
			{/* TODO: Suspense `Results` */}
			<Results keyword={String(keyword)}/>
		</>
	);
}
