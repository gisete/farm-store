import { database } from "@/lib/firebase-config";
import { ref, get as getFirebaseData, Query } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		let queryPath = "products";

		const productsRef: Query = ref(database, queryPath);
		const snapshot = await getFirebaseData(productsRef);

		if (snapshot.exists()) {
			const snapshotVal = snapshot.val();
			const finalData = [];
			for (var slug in snapshotVal) {
				const product = snapshotVal[slug];
				finalData.push(product);
			}

			return NextResponse.json(
				{
					data: finalData,
				},
				{
					status: 200,
				}
			);
		} else {
			return NextResponse.json(
				{
					data: "No data found",
				},
				{
					status: 404,
				}
			);
		}
	} catch (error: any) {
		return NextResponse.error();
	}
}
