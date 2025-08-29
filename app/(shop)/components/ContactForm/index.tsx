"use client";

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import useSendOrder from "@/app/hooks/useSendOrder";

const ContactForm = () => {
	// --- Add _clearCartData to destructured context ---
	const {
		cart,
		// clearCart, // No longer called directly on success
		_clearCartData,
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
	// --- End Add ---

	const sendOrder = useSendOrder();

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.id;
		const newValue = e.target.value;
		setOrder({ ...order, [id]: newValue });
	};

	async function handleSendOrder() {
		setIsOrderSending(true);
		sendOrder()
			.then((data) => {
				// Changed to receive potential data on success
				// --- Success Path ---
				setIsOrderSending(false);
				setShowContactForm(false); // Hide the form part
				setOrderSent(true); // Show ConfirmationWindow
				setHasError(false); // Ensure error flag is false
				_clearCartData(); // <<< Only clear data, DO NOT reset orderSent flag

				console.log("Order successful, state updated, cart data cleared.");
			})
			.catch((error) => {
				console.error("Order submission error:", error);
				setIsOrderSending(false);
				// setShowContactForm(false); // Decide UX for hiding form on error
				setOrderSent(true); // Show ConfirmationWindow
				setHasError(true); // Show error state in ConfirmationWindow
				console.log("Order failed, state updated for error display.");
			});
	}

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSendOrder();
	};

	// --- JSX remains the same ---
	return (
		<div>
			<div className="mb-4 mt-8">
				<h2 className="text-lg text-center">Contacto</h2>
			</div>
			<form className="bg-white mb-4 flex flex-col my-2" onSubmit={handleFormSubmit}>
				{/* ... form inputs ... */}
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
				{/* ... end form inputs ... */}
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
				{/* Keep inline error message for form validation perhaps, but ConfirmationWindow handles main error */}
				{hasError && (
					<p className="text-red-500 text-center mt-4">
						Ocorreu um erro. Verifique a mensagem acima ou tente novamente.
					</p>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
