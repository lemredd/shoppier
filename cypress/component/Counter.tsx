import { useState } from "react";

export default function Counter(): React.ReactElement {
	const [count, set_count] = useState(0);
	return <button onClick={(): void => set_count(prev => prev + 1)}>Count: {count}</button>;
}
