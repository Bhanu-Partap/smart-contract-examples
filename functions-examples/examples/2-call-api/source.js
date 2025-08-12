
// Imports ABI coder for encoding the array into bytes
const ethers = await import("npm:ethers@6.10.0");

// make HTTP request
const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=visibility`;
console.log(`HTTP GET Request to ${url}`);

const { data, error } = await Functions.makeHttpRequest({ url });
if (error) {
  console.error(error);
  throw Error("Request failed");
}

// visibility is nested under hourly
const visibilityArray = data?.hourly?.visibility;
if (!Array.isArray(visibilityArray)) {
  throw Error("Visibility array not found in response");
}

// Take only the first 10 values and round to integers
const top10 = visibilityArray.slice(0, 5).map((v) => Math.round(v));
console.log("Visibility top10:", top10);

// Return as a compact JSON string (well under 256 bytes)
return Functions.encodeString(JSON.stringify(top10));
