"use client";

import { useRouter } from "next/navigation";

import type { FormEvent } from "react";

interface Props {
	keyword: string | string[] | undefined
}

export default function SearchBar({ keyword }: Props): React.ReactElement {
	const router = useRouter();

	function handle_submit(event: FormEvent): void {
		event.preventDefault();

		const form_data = new FormData(event.target as HTMLFormElement);
		const new_keyword = form_data.get("keyword");

		router.push(`/search?keyword=${String(new_keyword)}`);
	}

	return (
		<form onSubmit={handle_submit}>
			<input type="text" name="keyword" defaultValue={keyword} />
		</form>
	);
}
