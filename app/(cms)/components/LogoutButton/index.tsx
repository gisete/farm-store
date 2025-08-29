"use client";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/supabase/actions";

const LogoutButton = () => {
	const router = useRouter();
	const logoutUser = async (e) => {
		e.preventDefault();
		await signOut();
		router.push("/login");
	};

	return (
		<div className="pt-6 pb-4 pr-9 text-right ">
			<button className="text-zinc-500" type="submit" onClick={(e) => logoutUser(e)}>
				Logout
			</button>
		</div>
	);
};

export default LogoutButton;
