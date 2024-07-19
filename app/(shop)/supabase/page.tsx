import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(
	"https://wkslqzmdpqmvvwodkdpg.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrc2xxem1kcHFtdnZ3b2RrZHBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwMzg2MTcsImV4cCI6MjAzNjYxNDYxN30.gVf2iPTw-C6KKcdcd7ia_h1GuU0OV1NZDZTIA2baLrw"
);

const mockData = {
	name: "Gisete Kindahl",
	phone: "2222222",
	comment: "Boop boop boop",
	products: [
		{
			name: "Apple",
			price: 0.5,
			quantity: 10,
			unit: "kg",
			subtotal: 5.0,
		},
		{
			name: "Banana",
			price: 0.3,
			quantity: 15,
			unit: "kg",
			subtotal: 4.5,
		},
		{
			name: "Orange",
			price: 0.8,
			quantity: 8,
			unit: "kg",
			subtotal: 6.4,
		},
	],
};

const Supabase = async () => {
	const { data, error } = await supabaseClient.from("orders").insert(mockData).select();

	if (error) {
		console.log("error", error);
	} else {
		console.log("Data: ", data);
	}
	return (
		<div>
			<h1>Supabase</h1>

			<p>data: {JSON.stringify(data)}</p>
		</div>
	);
};

export default Supabase;
