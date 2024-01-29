"use client";
import { useState, useContext, useEffect } from "react";
import { createOrder } from "@/lib/firebase";
import Cart from "../components/Cart";
import { CartContext } from "../providers/CartProvider";

const Carrinho = () => {
	const { cart, cartTotal, clearCart } = useContext(CartContext);
	const [orderDate, setOrderDate] = useState("");
	const [formValues, setFormValues] = useState({
		id: "",
		name: "",
		phone: "",
		comment: "",
		products: cart,
		total: cartTotal,
		date: "",
	});

	const handleFormChange = (e) => {
		const id = e.target.id;
		const newValue = e.target.value;

		setFormValues({
			...formValues,
			[id]: newValue,
		});
	};

	const createOrderNumber = () => {
		const typedArray = new Uint8Array(2);
		const randomValues = window.crypto.getRandomValues(typedArray);
		return randomValues.join("").toString();
	};

	const getDate = () => {
		const date = new Date();
		return date.toLocaleString("pt", {
			month: "2-digit",
			day: "2-digit",
			year: "numeric",
			timeZone: "Europe/Lisbon",
		});
	};

	useEffect(() => {
		// to account for when the cart updates after the page loads
		setFormValues({
			...formValues,
			products: cart,
		});
	}, [cart]);

	useEffect(() => {
		setFormValues({
			...formValues,
			total: cartTotal,
		});
	}, [cartTotal]);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		// const orderNumber = createOrderNumber();
		const dateInPortugal = getDate();

		setFormValues({
			...formValues,
			date: dateInPortugal,
		});

		console.log({ formValues });

		// wait for orderDate to be set then create order in useEffect
		// setOrderDate(dateInPortugal);
	};

	// useEffect(() => {
	// 	// wait for orderDate to be set then create order
	// 	if (!orderDate) return;

	// 	createOrder(formValues)
	// 		.then(() => {
	// 			console.log("success!");
	// 			clearCart();
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, [orderDate]);

	return (
		<div className="flex flex-row">
			<div className="max-w-5xl justify-center text-sm lg:flex flex-1">
				<section className="p-10 md:w-[500px]">
					<div className="mb-8">
						<h1 className="text-2xl">Contacto</h1>
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
								></textarea>
							</div>
						</div>

						<button className="px-6 py-4 bg-zinc-800 text-white rounded font-body mt-4 text-base" type="submit">
							Enviar pedido
						</button>
					</form>
				</section>
			</div>

			<div className="flex items-center justify-between">
				<Cart hideButton={true} />
			</div>
		</div>
	);
};

export default Carrinho;
