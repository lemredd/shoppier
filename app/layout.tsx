export default function RootLayout({ children, }: Record<string, React.ReactNode>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
