"use client";

import type React from "react";

type FormValuesType = {
	name: string;
	description: string;
	price: number | string;
	unit: string;
	priceUnit: number | string;
	lowStock: boolean;
	is_active: boolean;
	slug: string;
	position: number;
	category: string;
};

type ProductFormProps = {
	formValues: FormValuesType;
	setFormValues: React.Dispatch<React.SetStateAction<FormValuesType>>;
	handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleFormSubmit: React.FormEventHandler<HTMLFormElement>;
	isLoading: boolean;
	categoryData: object[];
};

export default function ProductForm({
	handleFormSubmit,
	handleFormChange,
	categoryData,
	formValues,
	isLoading,
}: ProductFormProps) {
	return (
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
						value={formValues.name}
						required
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
						value={formValues.description}
					/>
				</div>
			</div>

			<div className="-mx-3 md:flex mb-6">
				<div className="md:w-1/3 px-3">
					<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="category">
						Category
					</label>
					<div className="relative">
						<select
							className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
							id="category"
							onChange={handleFormChange}
							defaultValue={formValues.category}
						>
							<option value="All">All</option>
							{categoryData &&
								categoryData.map((category) => {
									return (
										<option key={category.slug} value={category.name}>
											{category.name}
										</option>
									);
								})}
						</select>
						<div className="pointer-events-none absolute top-0 bottom-0 right-0 flex items-center px-2 text-grey-darker">
							<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
								<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
							</svg>
						</div>
					</div>
				</div>

				<div className="md:w-1/2 flex">
					<div className="px-3">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="price">
							Price (kg)
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
							id="price"
							type="text"
							lang="pt-br"
							placeholder=""
							onChange={handleFormChange}
							value={formValues.price}
						/>
					</div>

					<div className="px-3">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="price">
							Price (unit)
						</label>
						<input
							lang="pt-br"
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
							id="priceUnit"
							type="text"
							placeholder=""
							onChange={handleFormChange}
							value={formValues.priceUnit}
						/>
					</div>
				</div>
			</div>

			<div className="-mx-3 md:flex mb-4">
				<div className="px-3 pr-4">
					<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="category">
						Status
					</label>
					<input
						className=""
						id="is_active"
						type="checkbox"
						name="is_active"
						onChange={handleFormChange}
						checked={formValues.is_active}
					/>
					<label className="text-grey-darker pl-2" htmlFor="is_active">
						Active
					</label>
				</div>
				<div className="px-3">
					<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="category">
						Stock
					</label>
					<input
						className=""
						id="lowStock"
						type="checkbox"
						name="lowStock"
						onChange={handleFormChange}
						checked={formValues.lowStock}
					/>
					<label className="text-grey-darker pl-2" htmlFor="lowStock">
						Low Stock
					</label>
				</div>
			</div>

			<div className="flex justify-end">
				<button className="relative bg-green-500 text-white p-2 mt-2 rounded" type="submit">
					<div className="flex items-center justify-center m-[10px]">
						{isLoading && (
							<div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
						)}

						<div className="ml-2"> {isLoading ? "Saving" : "Save Product"} </div>
					</div>
				</button>
			</div>
		</form>
	);
}
