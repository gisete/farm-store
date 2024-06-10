import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

function createSingleSheetName(name: string) {
	return name.replace(/\s/g, "_").toLowerCase();
}

export default async function updateGoogleSpreadsheet(formValues) {
	const SCOPES = [
		"https://www.googleapis.com/auth/spreadsheets",
		"https://www.googleapis.com/auth/drive.file",
		"https://www.googleapis.com/auth/drive",
	];

	try {
		const jwt = new JWT({
			email: "hortdadopedescalco@horta-412711.iam.gserviceaccount.com",
			key: process.env.NEXT_PUBLIC_HORTA_GOOGLEAPP_PRIVATE_KEY,
			scopes: SCOPES,
		});

		const sheetName = createSingleSheetName(formValues.name);

		const doc = new GoogleSpreadsheet("1Q5aJsPBrmsjcTQDf1lKiC6TYZADiQg-Vq0STruy8z2U", jwt);
		await doc.loadInfo();

		const newSheet = await doc.addSheet({
			title: sheetName,
			headerValues: ["NOME", "DATA", "CONTACTO", "COMENTÁRIO", "PRODUTO", "PREÇO", "QUANTIDADE", "UNIDADE", "SUBTOTAL"],
		});

		await newSheet.addRow({
			TOTAL: formValues.total,
			NOME: formValues.name,
			CONTACTO: formValues.phone,
			COMENTÁRIO: formValues.comment,
			DATA: formValues.date,
		});

		// Add Products
		const formatedProducts = formValues.products.map((product) => {
			return {
				PRODUTO: product.name,
				PREÇO: product.price.toLocaleString("pt-PT", { style: "currency", currency: "EUR" }),
				QUANTIDADE: product.quantity.replace(/\./g, ","),
				UNIDADE: product.unit,
				SUBTOTAL: product.subTotal.replace(/\./g, ","),
			};
		});

		await newSheet.addRows(formatedProducts);
	} catch (error) {
		throw new Error(error);
	}
}
