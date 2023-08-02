"use client";
import { useState, useContext } from "react";
import { createOrder } from "@/lib/firebase";
import Cart from "../components/Cart";
import { CartContext } from "../providers/CartProvider";

const Carrinho = () => {
	const { cart, cartTotal } = useContext(CartContext);
	const [formValues, setFormValues] = useState({
		name: "",
		phone: "",
		comments: "",
		products: cart,
		total: cartTotal,
		data: "",
	});

	const handleFormChange = (e) => {
		const id = e.target.id;
		const newValue = e.target.value;

		setFormValues({
			...formValues,
			[id]: newValue,
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		setFormValues({
			...formValues,
			date: new Date(),
		});

		createOrder(formValues)
			.then(() => {
				console.log("success!");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="flex flex-row">
			<div className="flex flex-col z-10 max-w-5xl items-center text-sm lg:flex">
				<section className="p-10">
					<div className="mb-8">
						<h1 className="text-2xl">Add Product</h1>
					</div>

					<form className="bg-white mb-4 flex flex-col my-2" onSubmit={handleFormSubmit}>
						<div className="-mx-3 md:flex mb-6">
							<div className="md:w-full px-3 mb-6 md:mb-0">
								<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
									Nome Completo
								</label>
								<input
									className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
									id="name"
									type="text"
									placeholder=""
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="-mx-3 md:flex mb-6">
							<div className="md:w-full px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
									htmlFor="phone"
								>
									Telefone
								</label>
								<input
									className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
									id="phone"
									type="text"
									placeholder=""
									onChange={handleFormChange}
								/>
							</div>
						</div>

						<div className="-mx-3 md:flex mb-6">
							<div className="md:w-full px-3 mb-6 md:mb-0">
								<label
									className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
									htmlFor="comment"
								>
									Comentário
								</label>
								<textarea
									name="comment"
									className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
									form="usrform"
									id="comment"
									onChange={handleFormChange}
								>
									Alguma nota sobre o pedido
								</textarea>
							</div>
						</div>

						<div className="-mx-3 md:flex mb-2">
							<div className="md:w-full px-3">
								<span className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
									Novo Cliente?
								</span>
								<input className="" id="lowStock" type="checkbox" name="lowStock" />
								<label className="text-grey-darker pl-2" htmlFor="lowStock">
									Sim
								</label>
							</div>
						</div>

						<button className="relative bg-violet-700 text-white p-4 mt-6 rounded" type="submit">
							Enviar pedido
						</button>
					</form>
				</section>
			</div>

			<div className="flex items-center justify-between">
				<Cart />
			</div>
		</div>
	);
};

export default Carrinho;
