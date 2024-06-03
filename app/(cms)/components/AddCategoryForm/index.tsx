"use client";
import { useState, useEffect } from "react";
import { createCategory } from "@/lib/firebase";

const AddCategoryForm = () => {
	const [formValues, setFormValues] = useState({
		name: "",
		slug: "",
	});

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id;
		// removes empty space and accents and other characters
		const categorySlug = formValues.name
			.toLowerCase()
			.replace(/\s+/g, "-")
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "");

		setFormValues({
			...formValues,
			[id]: e.target.value,
			slug: categorySlug,
		});
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createCategory(formValues)
			.then(() => {
				console.log("success!");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<form className="bg-white mb-4 flex flex-col my-2" onSubmit={handleFormSubmit}>
				<div className="-mx-3 md:flex mb-6">
					<div className="md:w-1/3 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
							Name
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-3 mb-3"
							id="name"
							type="text"
							placeholder=""
							onChange={handleFormChange}
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
