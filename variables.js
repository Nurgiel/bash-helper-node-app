const { TableLogData } = require("./tools/tableLogData");
const chalk = require("chalk");

const mainTableOptions = {
  rows: 30,
  theme: {
    shape: ["╔", "╦", "╗", "╠", "╬", "╣", "╚", "╩", "╝", "═", "║"],
    colorHeader: { r: 65, g: 190, b: 65 },
    colorShape: { r: 122, g: 209, b: 122 },
    colorRowOdd: { r: 162, g: 221, b: 162 },
    colorRowEven: { r: 107, g: 199, b: 107 },
    colorRowActive: { r: 28, g: 74, b: 28 },
    colorRowActiveBg: { r: 122, g: 209, b: 122 }
  },
  keys: [
    { key: "title", displayedName: "Title" },
    { key: "description", displayedName: "Description" }
  ],
};

const texts = {
  ctrlC: chalk`Press {bold {rgb(0, 153, 255) Ctrl+C}} or {bold {rgb(0, 153, 255) ESC}} to Exit`,
  ctrlS: chalk`Press {bold {rgb(0, 153, 255) Ctrl+S}} to Show Command`,
};

module.exports = { texts, mainTableOptions };
