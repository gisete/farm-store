import { getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, remove, set } from "firebase/database";

const initFirebase = async () => {
	// This check prevents us from initializing more than one app.
	const firebaseConfig = {
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	};

	let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
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
