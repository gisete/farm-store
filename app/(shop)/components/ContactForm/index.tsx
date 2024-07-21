"use client";

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { createOrder, createProductsTotal } from "@/lib/firebase";
import useSendOrder from "@/app/hooks/useSendOrder";

const ContactForm = () => {
	const {
		cart,
		clearCart,
		isOrderSending,
		setIsOrderSending,
		order,
		setOrder,
		showContactForm,
		setShowContactForm,
		setOrderSent,
		hasError,
		setHasError,
	} = useContext(CartContext);
	const sendOrder = useSendOrder();

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id;
		const newValue = e.target.value;

		setOrder({
			...order,
			[id]: newValue,
		});
	};

	useEffect(() => {
		// to account for when the cart updates after the page loads

		//need to move this to another component
		setOrder({
			...order,
			products: cart,
		});
	}, [cart]);

	async function handleSendOrder() {
		console.log(cart);
		// sendOrder()
		// 	.then(() => {
		// 		setIsOrderSending(false);
		// 		setShowContactForm(false);
		// 		setOrderSent(true);
		// 		clearCart();
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 		setHasError(true);
		// 		setIsOrderSending(false);
		// 	});
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsOrderSending(true);
		handleSendOrder();
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
						isOrderSending ? "bg-zinc-400" : "bg-zinc-800"
					}`}
					disabled={isOrderSending}
					type="submit"
				>
					{isOrderSending && (
						<div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4 mr-4 "></div>
					)}
					{isOrderSending ? "Enviando..." : "Enviar encomenda"}
				</button>

				{hasError && <p className="text-red-500 text-center mt-4">Ocorreu um erro, por favor tente novamente</p>}
			</form>
		</div>
	);
};

export default ContactForm;
