async function fetchData(owner) {
	try {
		const response = await fetch(`http://localhost:5000/api/getfinances/${owner}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((el) => console.log(el));
		const data = await response.json();
		console.log("Data:", data.data);
		return data.data;

		// fetch(`http://localhost:5000/api/getFinances/${owner}`, {
		// 	method: "GET",
		// 	headers: {
		// 		"Content-Type": "application-json",
		// 	},
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log("Data:", data.data);
		// 		const myData = data.data;
		// 		return myData;
		// });
	} catch (err) {
		return Error("Failed to fetch transactions", err);
	}
}

export default fetchData;
