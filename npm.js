const axios = require("axios");
const cheerio = require("cheerio");
const readline = require("readline");

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
});

rl.question("Enter the package name: ", async (packageName) => {
const url = `https://www.npmjs.com/package/${packageName}`;
console.log(`The URL is: ${url}`);

const response = await axios.get(url);
const $ = cheerio.load(response.data);

// Get all h2 tags on the page
const h2Tags = $("h2");

console.log("All Options:");
h2Tags.each((i, h2) => console.log(`${i + 1}. ${$(h2).text()}`));

// Prompt the user to select an h2 tag
rl.question("Select one of the options from above: ", (answer) => {
const selectedTag = h2Tags.get(answer - 1);

// Get all elements under the selected h2 tag
const elementsUnderSelectedTag = $(selectedTag).nextUntil("h2");

console.log("\nElements under selected tag:");
elementsUnderSelectedTag.each((i, element) => {
  console.log(`\n${$(element).text().trim()}`);
});

rl.close();

});
});