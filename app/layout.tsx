export default function RootLayout({ children, }: Record<string, React.ReactNode>): React.ReactElement {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
