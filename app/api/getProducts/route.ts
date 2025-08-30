// File: app/api/getProducts/route.ts
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const supabase = await createClient();

	try {
		const { data, error } = await supabase.from("products").select("*");

		if (error) {
			throw error;
		}

		return NextResponse.json(
			{
				data: data,
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
		console.error("Error fetching products:", error);
		return NextResponse.json(
			{
				data: "No data found",
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
}
