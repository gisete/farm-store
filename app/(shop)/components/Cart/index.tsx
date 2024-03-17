"use client";

import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../providers/CartProvider";
import CartItem from "./CartItem";
import ContactForm from "../ContactForm";

type CartProps = {
	hideButton: boolean;
};

const Cart = ({ hideButton }: CartProps) => {
	const { cart, cartTotal, showContactForm, setShowContactForm, orderSent } = useContext(CartContext);

	const [formValues, setFormValues] = useState({
		id: "",
		name: "",
		phone: "",
		comment: "",
		products: cart,
		total: cartTotal,
		date: "",
	});

	// for when the cart updates after getting localstorage values
	useEffect(() => {
		setFormValues({
			...formValues,
			products: cart,
		});
	}, [cart]);

	return (
		<div className="w-100">
			<div className="p-6 flex flex-col">
				<h2 className="text-center text-lg mb-6">Cabaz</h2>
				<ul>
					{cart.map((item, index) => (
						<CartItem item={item} key={`cartitem-${index}`} />
					))}
				</ul>

				{orderSent && <p className="text-center">Encomenda enviada com sucesso</p>}

				{cart.length === 0 && !orderSent && <p className="text-center">O cabaz está vazio</p>}

				{cart.length > 0 && !orderSent && (
					<>
						<div className="mt-6">
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
								onChange={(e) => setFormValues({ ...formValues, comment: e.target.value })}
							></textarea>
						</div>

						{showContactForm && <ContactForm formValues={formValues} setFormValues={setFormValues} />}

						{showContactForm ? null : (
							<div className="text-center mt-8">
								<button
									className="px-6 py-3 bg-zinc-100 text-black border border-zinc-500 font-body hover:bg-zinc-200 transition"
									onClick={() => setShowContactForm(true)}
								>
									Confirmar encomenda
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default Cart;
