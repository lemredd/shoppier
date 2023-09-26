interface PageProps {
	params: Record<string, string>
}

export default function Page({ params }: PageProps): React.ReactNode {
	const { id } = params;
	
	return (
		<main>
			page
		</main>
	);
}
