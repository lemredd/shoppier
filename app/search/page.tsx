"use client";

import { PageProps } from "@/.next/types/app/search/page";

export default function Page({ searchParams }: PageProps): React.ReactNode {
	function submit(): void {

	}

	console.log(searchParams)
	
	return (
		<form onSubmit={submit}>
			<input type="text" name="keyword" />
		</form>
	);
}
