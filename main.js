// const { investing } = require("investing-com-api");

// async function main() {
//   console.log("begin");
//   const response = await investing("currencies/eur-usd");
//   console.log(`response is ${response}`);
//   // response = [ { date: Timestamp, value: Number }, {...}, ... ]
// }

// main();

const { investing } = require('investing-com-api')

async function main () {
  try {
    const response = await investing('currencies/eur-usd')
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

main()