interface PageProps {
	params: Record<"id", number>
}

export default function Page({ params }: PageProps): React.ReactNode {
	const { id } = params;
	
	return (
		<main>
			page
		</main>
	);
}
