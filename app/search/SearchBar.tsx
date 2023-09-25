"use client";

interface Props {
	keyword: string | string[] | undefined
}

export default function SearchBar({ keyword }: Props): React.ReactElement {
	return (
		<form>
			<input type="text" name="keyword" value={keyword} />
		</form>
	);
}
