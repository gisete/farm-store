import { getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, remove, set, update, onValue } from "firebase/database";

const initFirebase = async () => {
	const firebaseConfig = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	};

	// This check prevents from initializing more than one app.
	if (getApps().length === 0) {
		initializeApp(firebaseConfig);
	}
};

// Gets all posts from the database in reverse chronological order.
export const getProducts = async () => {
	// Because our exported functions can be called at any time from
	// any place in our app, we need to make sure we've initialized
	// a Firebase app every time these functions are invoked.
	initFirebase();
	const dbRef = ref(getDatabase());

	let data = null;
	let error = null;

	try {
		data = await get(child(dbRef, `products`)).then((snapshot) => {
			if (snapshot.exists()) {
				const snapshotVal = snapshot.val();

				const result = [];
				for (var slug in snapshotVal) {
					const product = snapshotVal[slug];
					result.push(product);
				}
				return result;
			} else {
				console.log("No data available");
			}
		});
	} catch (e) {
		error = e;
	}

	return { data, error };
};

export const createProduct = async (product) => {
	initFirebase();

	const db = getDatabase();

	const productRef = ref(db, `products/${product.slug}`);

	return set(productRef, product);
};

export const getProductBySlug = async (slug) => {
	initFirebase();
	const dbRef = ref(getDatabase());

	let data = null;
	let error = null;

	try {
		data = await get(child(dbRef, `products/${slug}`)).then((snapshot) => {
			console.log("heyhey");
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				console.log("No data available");
			}
		});
	} catch (e) {
		error = e;
	}

	return data;
};

export const deleteProduct = async (slug) => {
	initFirebase();

	// initialise database
	const db = getDatabase();

	// reference to the users/tasks/* path
	const productRef = ref(db, "products/" + slug);

	remove(productRef).then(() => {
		console.log("Remove succeeded.");
	});
};

export const updateProduct = async (slug) => {
	initFirebase();

	// initialise database
	const db = getDatabase();
	let data = null;

	const productRef = ref(db, "products/" + slug);

	onValue(productRef, (snapshot) => {
		const data = snapshot.val();
		updateStarCount(postElement, data);
	});

	return data;
};

export const createCategory = async (category) => {
	initFirebase();

	const db = getDatabase();

	const categoryRef = ref(db, `categories/${category.slug}`);

	return set(categoryRef, category);
};

export const getCategories = async () => {
	initFirebase();

	const dbRef = ref(getDatabase());

	let data = null;
	let error = null;

	try {
		data = await get(child(dbRef, `categories`)).then((snapshot) => {
			if (snapshot.exists()) {
				const snapshotVal = snapshot.val();

				const result = [];
				for (var slug in snapshotVal) {
					const categories = snapshotVal[slug];
					result.push(categories);
				}
				return result;
			} else {
				return null;
			}
		});
	} catch (e) {
		error = e;
	}

	return { data, error };
};

export const createOrder = async (order) => {
	initFirebase();

	const db = getDatabase();

	const orderRef = ref(db, `orders/${order.id}`);

	return set(orderRef, order);
};

export const getOrders = async () => {
	initFirebase();

	const dbRef = ref(getDatabase());

	let data = null;
	let error = null;

	try {
		data = await get(child(dbRef, `orders`)).then((snapshot) => {
			if (snapshot.exists()) {
				const snapshotVal = snapshot.val();

				const result = [];
				for (var slug in snapshotVal) {
					const orders = snapshotVal[slug];
					result.push(orders);
				}
				return result;
			} else {
				console.log("No data available");
			}
		});
	} catch (e) {
		error = e;
	}

	return { data, error };
};

export const getOrderById = async (orderId) => {
	initFirebase();

	const dbRef = ref(getDatabase());

	let data = null;
	let error = null;

	try {
		data = await get(child(dbRef, `orders/${orderId}`)).then((snapshot) => {
			if (snapshot.exists()) {
				return snapshot.val();
			} else {
				console.log("No data available");
			}
		});
	} catch (e) {
		error = e;
	}

	return { data, error };
};

// export const uploadImage = async (uploadedImage) => {
// 	initFirebase();
// 	const storage = getStorage();
// 	if (uploadedImage == null) return;

// 	let data = null;
// 	let error = null;

// 	const dateCreated = new Date().getTime();
// 	const imageRef = storageRef(storage, `images/${uploadedImage.name}`);
// 	const uploadTask = uploadBytesResumable(imageRef, uploadedImage);

// 	uploadTask.on(
// 		"state_changed",
// 		(snapshot) => {},
// 		(err) => {
// 			error = err;
// 		},
// 		() => {
// 			console.log("hey");
// 			getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
// 				return downloadURL;
// 			});
// 		}
// 	);
// };

export const deleteCategory = async (slug) => {
	initFirebase();

	const db = getDatabase();

	const categoryRef = ref(db, "categories/" + slug);

	remove(categoryRef).then(() => {
		console.log("Deleted successfully");
	});
};

// Create order name based on date
function getWeeklyOrdersID() {
	const d = new Date();
	const month = d.getMonth() + 1;
	const year = d.getFullYear().toString().slice(-2);
	const day = d.getDay();
	const diff = d.getDate() - day;

	return `produtos_encomendas_${diff}_${month}_${year}`;
}

export const createProductsTotal = async (order) => {
	initFirebase();

	const db = getDatabase();
	const dbRef = ref(db);
	const weekOrderSummaryID = getWeeklyOrdersID();
	const totalsRef = ref(db, `productsTotal/${weekOrderSummaryID}`);
	let productsFromOrder = {};
	let data = {};
	let error = null;

	for (let i = 0; i < order.length; i++) {
		productsFromOrder[order[i].id] = {
			name: order[i].name,
			id: order[i].id,
			quantity_kg: order[i].unit === "kg" ? order[i].quantity : 0,
			quantity_un: order[i].unit === "un" ? order[i].quantity : 0,
		};
	}

	try {
		data = await get(child(dbRef, `productsTotal/${weekOrderSummaryID}`)).then((snapshot) => {
			if (snapshot.exists()) {
				//if order for the week already exists then
				//get current value of the products and add to it
				const existingProducts = snapshot.val();
				let productsUpdated = existingProducts;

				for (var slug in productsFromOrder) {
					const productFromOrder = productsFromOrder[slug];

					//if product doesnt already exist in existing products totals add to it
					if (!productsUpdated[productFromOrder.id]) {
						productsUpdated[productFromOrder.id] = productFromOrder;
					} else {
						//if slug exists in productsUpdated update it
						productsUpdated[productFromOrder.id].quantity_kg += productFromOrder.quantity_kg;
						productsUpdated[productFromOrder.id].quantity_un += productFromOrder.quantity_un;
					}
				}
				update(totalsRef, productsUpdated);
				return productsUpdated;
			} else {
				set(totalsRef, productsFromOrder);
			}
		});
	} catch (e) {
		error = e;
	}

	return { data, error };
};
