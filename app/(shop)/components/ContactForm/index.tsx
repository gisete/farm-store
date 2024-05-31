"use client";

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { createOrder, createProductsTotal } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { set } from "firebase/database";
import updateGoogleSpreadsheet from "@/lib/googleSpreadsheet";

const ContactForm = ({ formValues, setFormValues }) => {
	const { cart, cartTotal, clearCart, showContactForm, setShowContactForm, setOrderSent, hasError, setHasError } =
		useContext(CartContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleFormChange = (e) => {
		const id = e.target.id;
		const newValue = e.target.value;
		const dateInPortugal = getDate();

		setFormValues({
			...formValues,
			[id]: newValue,
			date: dateInPortugal,
		});
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

	async function sendOrder() {
		// createOrder(formValues);
		// createProductsTotal(cart);

		updateGoogleSpreadsheet(formValues)
			.then(() => {
				console.log("Success");
				createProductsTotal(cart);
				setIsLoading(false);
				setShowContactForm(false);
				setOrderSent(true);
				clearCart();
			})
			.catch((error) => {
				console.error(error);
				setHasError(true);
				setIsLoading(false);
			});
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		sendOrder();
	};

	return (
		<div>
			<div className="mb-4 mt-8">
				<h2 className="text-lg text-center">Contacto</h2>
			</div>

			<form className="bg-white mb-4 flex flex-col my-2" onSubmit={handleFormSubmit}>
				<div className="-mx-3 md:flex mb-4">
					<div className="md:w-full px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
							Nome
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
							id="name"
							type="text"
							placeholder=""
							onChange={handleFormChange}
							required
						/>
					</div>
				</div>

				<div className="-mx-3 md:flex">
					<div className="md:w-full px-3 mb-6 md:mb-0">
						<label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="phone">
							Telefone
						</label>
						<input
							className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
							id="phone"
							type="text"
							placeholder=""
							onChange={handleFormChange}
							required
						/>
					</div>
				</div>

				<button
					className={`px-6 py-4 text-white rounded font-body mt-4 text-base flex justify-center ${
						isLoading ? "bg-zinc-400" : "bg-zinc-800"
					}`}
					disabled={isLoading}
					type="submit"
				>
					{isLoading && (
						<div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4 mr-4 "></div>
					)}
					{isLoading ? "Enviando..." : "Enviar encomenda"}
				</button>

				{hasError && <p className="text-red-500 text-center mt-4">Ocorreu um erro, por favor tente novamente</p>}
			</form>
		</div>
	);
};

export default ContactForm;
