"use client";

import { useState, useEffect, useRef } from "react";
import { createProduct, uploadImage, getCategories } from "@/lib/firebase";
import toast from "react-hot-toast";
import Notification from "../../components/Notification";

export default function AddProduct() {
	const [categoryData, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		getCategories()
			.then(({ data }) => {
				if (!data) return;
				setData(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const [formValues, setFormValues] = useState({
		name: "",
		description: "",
		price: 0,
		unit: "kg",
		lowStock: false,
		image: "",
		slug: "",
	});

	const [imageURL, setImageURL] = useState("");

	const resetForm = () => {
		if (formRef.current) {
			formRef.current.reset();
		}
	};

	const getInputValue = (e) => {
		switch (e.target.type) {
			case "file":
				return e.target.files[0];
			case "checkbox":
				return e.target.checked;
			default:
				return e.target.value;
		}
	};

	const handleFormChange = (e) => {
		const id = e.target.id;
		const newValue = getInputValue(e);
		const productSlug = formValues.name.toLowerCase().replace(/\s+/g, "-");

		setFormValues({
			...formValues,
			[id]: newValue,
			slug: productSlug,
		});
	};

	const handleRadioButton = (e) => {
		setFormValues({
			...formValues,
			unit: e.target.id,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const url = await uploadImage(formValues.image);
		setImageURL(url);

		setFormValues({
			...formValues,
			image: url,
		});
	};

	useEffect(() => {
		if (imageURL) {
			createProduct(formValues)
				.then(() => {
					setIsLoading(false);
					toast.success("Product saved successfully!");
					resetForm();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [imageURL]);

	return (
		<section>
			<div className="mb-8">
				<h1 className="text-2xl">Add Product</h1>
			</div>

			<form className="bg-white mb-4 flex flex-col my-2" ref={formRef} onSubmit={handleFormSubmit}>
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
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="category">
							Category
						</label>
						<div className="relative">
							<select
								className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
								id="category"
								onChange={handleFormChange}
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

					<div className="md:w-1/3 px-3">
						<div className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Unit</div>
						<div className="">
							<div>
								<input
									type="radio"
									id="kg"
									name="unit"
									value="kg"
									checked={formValues.unit === "kg"}
									onChange={handleRadioButton}
								/>
								<label htmlFor="kg" className="pl-1 mr-4">
									kg
								</label>
							</div>

							<div>
								<input
									type="radio"
									id="un"
									name="unit"
									value="un"
									checked={formValues.unit === "un"}
									onChange={handleRadioButton}
								/>
								<label htmlFor="un" className="pl-1">
									un
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="-mx-3 md:flex mb-8">
					<div className="md:w-1/3 px-3 flex items-center">
						<input className="" id="lowStock" type="checkbox" name="lowStock" onChange={handleFormChange} />
						<label className="text-grey-darker pl-2" htmlFor="lowStock">
							Low Stock
						</label>
					</div>
				</div>

				<div className="-mx-3 md:flex mb-2">
					<div className="md:w-2/3 px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="image">
							Product Image
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
							id="image"
							name="image"
							type="file"
							placeholder=""
							accept="image/png, image/jpeg"
							onChange={handleFormChange}
						/>
					</div>
				</div>

				<button className="relative bg-violet-700 text-white p-4 mt-6 rounded" type="submit">
					<div className="flex items-center justify-center m-[10px]">
						{isLoading && (
							<div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div>
						)}

						<div className="ml-2"> {isLoading ? "Saving" : "Save Product"} </div>
					</div>
				</button>
			</form>

			<Notification />
		</section>
	);
}
