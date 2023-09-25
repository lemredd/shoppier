"use client";

import { PageProps } from "@/.next/types/app/search/page";

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
