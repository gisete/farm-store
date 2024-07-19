import { useContext } from "react";
import { createClient } from "@lib/supabase/client";
import { CartContext } from "../(shop)/providers/CartProvider";

export default function () {
	const supabaseClient = createClient();
	const { order } = useContext(CartContext);

	async function sendOrder() {
		const { data, error } = await supabaseClient.from("orders").insert(order).select();

		if (error) {
			return error;
		}
	}

	return sendOrder;
}
