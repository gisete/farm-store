"use client";
import { auth } from "@lib/firebaseAuth";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
	const router = useRouter();
	const logoutUser = async (e) => {
		e.preventDefault();

		await signOut(auth);
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
