import { getApps, initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, remove, set } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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

export async function uploadImage(uploadedImage) {
	return new Promise((resolve, reject) => {
		initFirebase();
		const storage = getStorage();
		if (uploadedImage == null) return;

		const dateCreated = new Date().getTime();
		const imageRef = storageRef(storage, `images/${uploadedImage.name}`);
		const uploadTask = uploadBytesResumable(imageRef, uploadedImage);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				switch (error.code) {
					case "storage/unauthorized":
						// User doesn't have permission to access the object
						break;
					case "storage/canceled":
						// User canceled the upload
						break;

					// ...

					case "storage/unknown":
						// Unknown error occurred, inspect error.serverResponse
						break;
				}
				reject(error);
			},
			async () => {
				const imgURL = await getDownloadURL(uploadTask.snapshot.ref);
				resolve(imgURL);
			}
		);
	});
}

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
