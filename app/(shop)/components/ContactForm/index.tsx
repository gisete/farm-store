"use client";

import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import { createOrder } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { set } from "firebase/database";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const ContactForm = () => {
	const { cart, cartTotal, clearCart, showContactForm, setShowContactForm, setOrderSent } = useContext(CartContext);
	const [formValues, setFormValues] = useState({
		id: "",
		name: "",
		phone: "",
		comment: "",
		products: cart,
		total: cartTotal,
		date: "",
	});

	const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive.file"];

	const appendRow = async () => {
		try {
			const jwt = new JWT({
				email: "hortdadopedescalco@horta-412711.iam.gserviceaccount.com",
				key: process.env.NEXT_PUBLIC_HORTA_GOOGLEAPP_PRIVATE_KEY,
				scopes: SCOPES,
			});
			const orderName = formValues.name.replace(/\s/g, "_").toLowerCase();

			const doc = new GoogleSpreadsheet("1Q5aJsPBrmsjcTQDf1lKiC6TYZADiQg-Vq0STruy8z2U", jwt);
			await doc.loadInfo();
			const newSheet = await doc.addSheet({
				title: orderName,
				headerValues: ["PRODUTO", "QUANTIDADE", "UNIDADE", "SUBTOTAL"],
			});

			// Products
			const formatedProducts = formValues.products.map((product) => {
				return {
					PRODUTO: product.name,
					QUANTIDADE: product.quantity,
					UNIDADE: product.unit,
					SUBTOTAL: product.subTotal,
				};
			});

			await newSheet.addRows(formatedProducts);

			// Contact information
			await newSheet.addRow(["-"]);
			await newSheet.addRow(["NOME", formValues.name]);
			await newSheet.addRow(["CONTACTO", formValues.phone]);
			await newSheet.addRow(["DATA", formValues.date]);
			await newSheet.addRow(["COMENTÁRIO", formValues.comment]);
		} catch (error) {
			console.log("Error: ", error);
		}
	};

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

	function sendOrder() {
		// createOrder(formValues);
		console.log(formValues);
		appendRow();
		// setShowContactForm(false);
		// setOrderSent(true);
		// clearCart();
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault();
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

				<button className="px-6 py-4 bg-zinc-800 text-white rounded font-body mt-4 text-base" type="submit">
					Enviar encomenda
				</button>
			</form>
		</div>
	);
};

export default ContactForm;
