import createSpreadSheet from "@/lib/createSpreadSheet";

const RunScript = () => {
	createSpreadSheet()
		.then(() => {
			console.log("hey");
		})
		.catch((error) => {
			console.error(error);
		});

	return <h1>Its running</h1>;
};

export default RunScript;
