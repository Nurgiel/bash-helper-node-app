const { TableLogData } = require("./tools/tableLogData");
const chalk = require("chalk");

const texts = {
  ctrlC: chalk`Press {bold {rgb(0, 153, 255) Ctrl+C}} to Exit...`,
  enter: chalk`Press {bold {rgb(0, 153, 255) Enter}} for archive data...`,
  esc: chalk`Press {bold {rgb(0, 153, 255) ESC}} to Back...`,
};

const tableOfCitiesOptions = {
  rows: 8,
  theme: {
    shape: ["╔", "╦", "╗", "╠", "╬", "╣", "╚", "╩", "╝", "═", "║"],
  },
  keys: [
    { key: "stacja", displayedName: "city" },
    { key: "godzina_pomiaru", displayedName: "hour" },
    { key: "temperatura", displayedName: "temperature (°C)" },
    { key: "cisnienie", displayedName: "pressure (hPa)" },
  ],
};

const tableOfCityOptions = {
  rows: 8,
  theme: {
    colorHeader: { r: 65, g: 190, b: 65 },
    colorShape: { r: 122, g: 209, b: 122 },
    colorRowOdd: { r: 162, g: 221, b: 162 },
    colorRowEven: { r: 107, g: 199, b: 107 },
    colorRowActive: { r: 28, g: 74, b: 28 },
    colorRowActiveBg: { r: 122, g: 209, b: 122 },
  },
  keys: [
    { key: "data_pomiaru", displayedName: "date" },
    { key: "godzina_pomiaru", displayedName: "hour" },
    { key: "temperatura", displayedName: "temperature (°C)" },
    { key: "cisnienie", displayedName: "pressure (hPa)" },
    { key: "suma_opadu", displayedName: "rainfall (mm)" },
    { key: "wilgotnosc_wzgledna", displayedName: "humidity (%)" },
  ],
};

module.exports = { texts, tableOfCitiesOptions, tableOfCityOptions };
