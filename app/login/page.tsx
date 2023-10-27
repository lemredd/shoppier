import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginForm from "./components/LoginForm";

// TODO: redirect to homepage if `auth` cookie is set
export default function Page(): React.ReactNode {
	const auth_token = cookies().get("auth")?.value;
	if (auth_token) redirect("/");

	return (
		<LoginForm />
	);
}
