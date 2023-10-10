import { useState } from "react";

export default function Counter({ "count": count_prop = 0 }): React.ReactElement {
	const [count, set_count] = useState(count_prop);
	return <button onClick={(): void => set_count(prev => prev + 1)}>Count: {count}</button>;
}
