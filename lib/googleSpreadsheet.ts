import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

function createSingleSheetName(name: string) {
	return name.replace(/\s/g, "_").toLowerCase();
}

const SCOPES = [
	"https://www.googleapis.com/auth/spreadsheets",
	"https://www.googleapis.com/auth/drive.file",
	"https://www.googleapis.com/auth/drive",
];

const jwt = new JWT({
	email: "hortdadopedescalco@horta-412711.iam.gserviceaccount.com",
	key: process.env.NEXT_PUBLIC_HORTA_GOOGLEAPP_PRIVATE_KEY,
	scopes: SCOPES,
});

// Creates single sheet with order details
export default async function sendOrderToSpreadsheet(formValues) {
	try {
		const sheetName = createSingleSheetName(formValues.name);

		const doc = new GoogleSpreadsheet("1Q5aJsPBrmsjcTQDf1lKiC6TYZADiQg-Vq0STruy8z2U", jwt);
		await doc.loadInfo();

		const newSheet = await doc.addSheet({
			title: sheetName,
			headerValues: ["NOME", "DATA", "CONTACTO", "COMENTÁRIO", "PRODUTO", "QUANTIDADE", "UNIDADE", "PREÇO", "SUBTOTAL"],
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
				QUANTIDADE: product.quantity.toLocaleString("PT-pt"),
				UNIDADE: product.unit,
				SUBTOTAL: product.subTotal === 0 ? "" : product.subTotal.toLocaleString("PT-pt"),
			};
		});

		await newSheet.addRows(formatedProducts);
	} catch (error) {
		throw new Error(error);
	}
}

export async function updateTotalSheet(totalData) {
	try {
		const doc = new GoogleSpreadsheet("1Q5aJsPBrmsjcTQDf1lKiC6TYZADiQg-Vq0STruy8z2U", jwt);
		await doc.loadInfo();

		const firstSheet = doc.sheetsByIndex[0];

		let totalDataArray = Object.keys(totalData.data).map((key) => totalData.data[key]);

		await firstSheet.clearRows();

		const formatedProducts = totalDataArray.map((product) => {
			return {
				PRODUTO: product.name,
				QUANTIDADE_KG: product.quantity_kg === 0 ? "" : product.quantity_kg.toLocaleString("PT-pt"),
				QUANTIDADE_UN: product.quantity_un === 0 ? "" : product.quantity_un.toLocaleString("PT-pt"),
			};
		});

		await firstSheet.addRows(formatedProducts);
	} catch (error) {
		throw new Error(error);
	}
}
