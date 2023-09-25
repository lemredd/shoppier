"use client";

import { useRouter } from "next/navigation";

import type { FormEvent } from "react";

interface Props {
	keyword: string | string[] | undefined
}

export default function SearchBar({ keyword }: Props): React.ReactElement {
	const router = useRouter();

	function handle_submit(event: FormEvent): void {
	}
	return (
		<form onSubmit={handle_submit}>
			<input type="text" name="keyword" defaultValue={keyword} />
		</form>
	);
}
