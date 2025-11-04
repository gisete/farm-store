import { useContext } from "react";
import { createClient } from "@lib/supabase/client";
import { CartContext } from "../(shop)/providers/CartProvider";

export default function useSendOrder() {
	const supabaseClient = createClient();
	const { order } = useContext(CartContext);

	async function sendOrder() {
		const { data, error } = await supabaseClient.from("orders").insert(order).select();

		if (error) {
			console.error("Supabase insert error detected:", error);
			throw error;
		}

		// Optional: return data on success if needed by the .then() block
		return data;
	}

	return sendOrder;
}
