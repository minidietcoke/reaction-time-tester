export const requestBody = {
	jsonrpc: '2.0',
	method: 'generateIntegers',
	params: {
		apiKey: '93ff549e-52f3-4a09-bef0-653210839a63',
		n: 20,
		min: 2000,
		max: 7000
	},
	id: 42
};

export const fetchRandomNumbers = fetch(
	'https://api.random.org/json-rpc/1/invoke',
	{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	}
).then(response => {
	return response.json();
});
