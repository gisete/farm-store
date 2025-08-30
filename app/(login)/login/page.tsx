"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/supabase/actions";

const Login = () => {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		const formData = new FormData(event.currentTarget);

		try {
			await signIn(formData);
			router.push("/admin");
		} catch (err) {
			setError("Could not authenticate user. Please check your credentials.");
			console.log(err);
		}
	}

	return (
		<section>
			<div className="min-h-screen bg-[#fbf8f3] flex flex-col justify-center sm:py-12">
				<div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
					<h1 className="font-bold text-center text-2xl mb-5">Horta do Pé Descalço</h1>

					<form
						id="loginForm"
						onSubmit={handleSubmit}
						className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
					>
						<div className="px-5 py-7">
							<label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
							<input type="email" name="email" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
							<label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
							<input type="password" name="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
							{error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
							<button
								type="submit"
								className="transition duration-200 bg-green-500 hover:bg-green-600 focus:bg-green-700 focus:shadow-sm focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
							>
								<span className="inline-block mr-2">Login</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									className="w-4 h-4 inline-block"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
								</svg>
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Login;
