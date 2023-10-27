import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import RegisterForm from "./components/RegisterForm";

export default function Page(): React.ReactNode {
	const auth_token = cookies().get("auth")?.value;
	if (auth_token) redirect("/");

	return (
		<RegisterForm />
	);
}
