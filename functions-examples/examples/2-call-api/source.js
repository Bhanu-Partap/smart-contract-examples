
// const NFTMainId = args[0];
// const NFTSubId = args[1];

// make HTTP request
const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=visibility`;
console.log(`HTTP GET Request to ${url}`);

const request = Functions.makeHttpRequest({ url });

// Execute the API request (Promise)
const response = await request;
if (response.error) {
  console.error(response.error);
  throw Error("Request failed");
}

const data = response.data;

// visibility is nested under hourly
const visibilityArray = data?.hourly?.visibility;
if (!Array.isArray(visibilityArray)) {
  throw Error("Visibility array not found in response");
}

console.log("Visibility array:", visibilityArray);

// Return something (e.g., first value) as uint256
const firstVisibility = Math.round(visibilityArray[0] || 0);
return Functions.encodeUint256(firstVisibility);

// JSON.parse(await cryptoCompareRequest.hourly.visibility)
// Execute the API request (Promise)
const cryptoCompareResponse = await cryptoCompareRequest;
if (cryptoCompareResponse.error) {
  console.error(cryptoCompareResponse.error);
  throw Error("Request failed");
}

const data1 = cryptoCompareResponse["data"];
if (data.Response === "Error") {
  console.error(data.Message);
  throw Error(`Functional error. Read message: ${data.Message}`);
}

// extract the price
const price = data1.visibility[0]; 
console.log("🚀 ~ source.js:45 ~ price:", price)

// const price = data["RAW"][fromSymbol][toSymbol]["PRICE"];
// console.log(`price is: ${price.toFixed(2)} ${toSymbol}`);

// Solidity doesn't support decimals so multiply by 100 and round to the nearest integer
// Use Functions.encodeUint256 to encode an unsigned integer to a Buffer
return Functions.encodeUint256(Math.round(price * 100));
