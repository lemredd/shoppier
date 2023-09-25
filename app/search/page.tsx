export default function Page(): React.ReactNode {
	function submit(): void {

	}

	console.log(searchParams)
	
	return (
		<form onSubmit={submit}>
			<input type="text" name="keyword" />
		</form>
	);
}
