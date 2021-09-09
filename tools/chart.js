const asciichart = require("asciichart");
const chalk = require("chalk");

const options = {
  height: 9,
  padding: "       ",
  colors: [asciichart.blue],
};

const drawChart = data => {
  console.log("");
  console.log(chalk.rgb(144, 213, 144).bold("  t (°C)"));
  const array = [];
  for (const item of data) array.push(+item.temperatura);
  console.log(asciichart.plot(array, options));
};

module.exports = { drawChart };
