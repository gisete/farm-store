import { sheets } from "@googleapis/sheets";
import { drive } from "@googleapis/drive";
import { JWT } from "google-auth-library";

const SCOPES = [
	"https://www.googleapis.com/auth/spreadsheets",
	"https://www.googleapis.com/auth/drive.file",
	"https://www.googleapis.com/auth/drive",
];

const mockData = {
	name: "Gisete Kindahl",
	phone: "2222222",
	comment: "Boop boop boop",
	total: 100,
	date: "2022-01-01",
	products: [
		{ name: "Product 1", price: 10, quantity: 1, unit: "kg", subTotal: 10 },
		{ name: "Product 2", price: 20, quantity: 2, unit: "kg", subTotal: 40 },
		{ name: "Product 3", price: 30, quantity: 3, unit: "kg", subTotal: 90 },
		{ name: "Product 4", price: 40, quantity: 4, unit: "kg", subTotal: 160 },
		{ name: "Product 5", price: 50, quantity: 5, unit: "kg", subTotal: 250 },
		{ name: "Product 6", price: 60, quantity: 6, unit: "kg", subTotal: 360 },
		{ name: "Product 7", price: 70, quantity: 7, unit: "kg", subTotal: 490 },
		{ name: "Product 8", price: 80, quantity: 8, unit: "kg", subTotal: 640 },
		{ name: "Product 9", price: 90, quantity: 9, unit: "kg", subTotal: 810 },
		{ name: "Product 10", price: 100, quantity: 10, unit: "kg", subTotal: 1000 },
		{ name: "Product 11", price: 110, quantity: 11, unit: "kg", subTotal: 1210 },
		{ name: "Product 12", price: 120, quantity: 12, unit: "kg", subTotal: 1440 },
		{ name: "Product 13", price: 130, quantity: 13, unit: "kg", subTotal: 1690 },
		{ name: "Product 14", price: 140, quantity: 14, unit: "kg", subTotal: 1960 },
		{ name: "Product 15", price: 150, quantity: 15, unit: "kg", subTotal: 2250 },
		{ name: "Product 16", price: 160, quantity: 16, unit: "kg", subTotal: 2560 },
		{ name: "Product 17", price: 170, quantity: 17, unit: "kg", subTotal: 2890 },
		{ name: "Product 18", price: 180, quantity: 18, unit: "kg", subTotal: 3240 },
		{ name: "Product 19", price: 190, quantity: 19, unit: "kg", subTotal: 3610 },
		{ name: "Product 20", price: 200, quantity: 20, unit: "kg", subTotal: 4000 },
	],
};

const jwt = new JWT({
	email: "hortdadopedescalco@horta-412711.iam.gserviceaccount.com",
	key: process.env.NEXT_PUBLIC_HORTA_GOOGLEAPP_PRIVATE_KEY,
	scopes: SCOPES,
});

export default async function createGoogleSheet() {
	const driveservice = drive({ version: "v3", auth: jwt });

	const orderTemplateID = "1EZ7JyWK_u2n1j8y3ejWtqquWCG9Db7SsBuJEFDbrDPo";
	const orderName = "Gisete_Kindahl-00000";

	// ***************
	// copy file from template
	// ***************
	try {
		const file = await driveservice.files.copy({
			fileId: orderTemplateID,
		});

		// ***************
		// update file name to order name
		// ***************
		try {
			await driveservice.files.update({
				fileId: file.data.id,
				resource: { name: orderName },
			});

			await updateOrderSheet(file.data.id, mockData);
		} catch (err) {
			// TODO(developer) - Handle error
			console.log(err);
		}

		return file.data.id;
	} catch (err) {
		// TODO(developer) - Handle error
		throw err;
	}
}

async function updateOrderSheet(spreadsheetId, orderData) {
	const googlesheets = sheets({ version: "v4", auth: jwt });

	const productsData = orderData.products.map((product, index) => {
		const startingRangeNumber = 15 + index;
		return {
			range: `Sheet1!C${startingRangeNumber}:G${startingRangeNumber}`,
			values: [[product.name, product.price, product.quantity, product.unit, product.subTotal]],
		};
	});

	const contatcData = [
		{
			range: "Sheet1!B12",
			values: [[`Nome: ${orderData.name}`]],
		},
		{
			range: "Sheet1!D12",
			values: [[`N Telefone: ${orderData.phone}`]],
		},
		{
			range: "Sheet1!D13",
			values: [[`Comentário: ${orderData.comment}`]],
		},
	];

	const data = [...contatcData, ...productsData];
	// Additional ranges to update ...
	const resource = {
		data,
		valueInputOption: "USER_ENTERED",
	};

	try {
		await googlesheets.spreadsheets.values.batchUpdate({
			spreadsheetId,
			resource,
		});
	} catch (err) {
		console.log(err);
	}
}
