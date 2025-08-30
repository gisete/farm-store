"use client";
import { useState, useRef, useEffect } from "react";
import { createCategory } from "@/lib/supabase/actions";
import toast from "react-hot-toast";

const AddCategoryForm = () => {
	const [name, setName] = useState("");
	const formRef = useRef<HTMLFormElement>(null);

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = async (formData: FormData) => {
		const slug = name
			.toLowerCase()
			.replace(/\s+/g, "-")
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "");

		formData.set("slug", slug);

		try {
			await createCategory(formData);
			toast.success("Category added successfully!");
			formRef.current?.reset();
			setName("");
		} catch (error) {
			toast.error("Failed to add category.");
			console.error(error);
		}
	};

	return (
		<div>
			<form ref={formRef} action={handleSubmit} className="bg-white mb-4 flex flex-col my-2">
				<div className="-mx-3 md:flex mb-6">
					<div className="md:w-1/3 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
							Name
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-3 mb-3"
							id="name"
							name="name"
							type="text"
							placeholder=""
							value={name}
							onChange={handleFormChange}
							required
						/>
					</div>
					<div className="md:w-2/3 px-3">
						<button className="relative bg-green-500 text-white p-3 mt-6 rounded" type="submit">
							Add Category
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddCategoryForm;
