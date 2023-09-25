"use client";

import type { FormEvent } from "react";

interface Props {
	keyword: string | string[] | undefined
}

export default function SearchBar({ keyword }: Props): React.ReactElement {
	function handle_submit(event: FormEvent): void {
	}
	return (
		<form onSubmit={handle_submit}>
			<input type="text" name="keyword" defaultValue={keyword} />
		</form>
	);
}
