"use client";

import { useState } from "react";
import { createProduct } from "@/lib/firebase";

const AddProduct = () => {
	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		price: 0,
		unit: "kg",
		lowStock: false,
		image: "",
		slug: "",
	});

	const handleFormChange = (e) => {
		const id = e.target.id;
		const newValue = e.target.type === "checkbox" ? e.target.checked : e.target.value;
		const productSlug = formValues.name.toLowerCase().replace(/\s+/g, "-");

		setFormValues({
			...formValues,
			[id]: newValue,
			slug: productSlug,
		});
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();

		createProduct(formValues)
			.then(() => {
				console.log("success!");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<section className="p-10">
			<div className="mb-8">
				<h1 className="text-2xl">Add Product</h1>
			</div>

			<form className="bg-white mb-4 flex flex-col my-2" onSubmit={handleFormSubmit}>
				<div className="-mx-3 md:flex mb-6">
					<div className="md:w-1/3 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
							Name
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
							id="name"
							type="text"
							placeholder=""
							onChange={handleFormChange}
						/>
					</div>
					<div className="md:w-2/3 px-3">
						<label
							className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
							htmlFor="description"
						>
							Description
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
							id="description"
							type="text"
							placeholder=""
							onChange={handleFormChange}
						/>
					</div>
				</div>

				<div className="-mx-3 md:flex mb-6">
					<div className="md:w-1/3 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="price">
							Price
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
							id="price"
							type="text"
							placeholder=""
							onChange={handleFormChange}
						/>
					</div>
					<div className="md:w-1/3 px-3">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="unit">
							Unit
						</label>
						<div className="relative">
							<select
								className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
								id="unit"
								onChange={handleFormChange}
							>
								<option value="kg">kg</option>
								<option value="un">un</option>
							</select>
							<div className="pointer-events-none absolute top-0 bottom-0 right-0 flex items-center px-2 text-grey-darker">
								<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
									<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
								</svg>
							</div>
						</div>
					</div>
					<div className="md:w-1/3 px-3 flex items-center mt-4">
						<input className="" id="lowStock" type="checkbox" name="lowStock" onChange={handleFormChange} />
						<label className="text-grey-darker pl-2" htmlFor="lowStock">
							Low Stock
						</label>
					</div>
				</div>

				<div className="-mx-3 md:flex mb-2">
					<div className="md:w-2/3 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="image">
							Image URL
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
							id="imag"
							type="text"
							placeholder=""
							onChange={handleFormChange}
						/>
					</div>
				</div>

				<button className="relative bg-violet-700 text-white p-4 mt-6 rounded" type="submit">
					Save Product
				</button>
			</form>
		</section>
	);
};

export default AddProduct;
