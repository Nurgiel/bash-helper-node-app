const { TableLogData } = require("./tools/tableLogData");
const { updateData } = require("./tools/updateData");
const {
  texts,
  tableOfCitiesOptions,
  tableOfCityOptions,
} = require("./variables");
const { drawChart } = require("./tools/chart");
const { readFile } = require("fs").promises;
const chalk = require("chalk");
const readline = require("readline");
const fetch = require("node-fetch");

const API_URL = "https://danepubliczne.imgw.pl/api/data/synop/station/";
let tableOfCities = null;
let tableOfCity = null;
let currentActiveWindow = null;

// keys listener
const initKeyEvents = () => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on("keypress", (str, key) => {
    if (key.ctrl && key.name === "c") process.exit();
    if (key.name === "up" && currentActiveWindow === "cities") {
      tableOfCities.moveUp();
      updateConsoleOfCities();
    }
    if (key.name === "down" && currentActiveWindow === "cities") {
      tableOfCities.moveDn();
      updateConsoleOfCities();
    }
    if (key.name === "return" && currentActiveWindow === "cities") {
      loadConsoleOfCity();
    }
    if (key.name === "escape" && currentActiveWindow === "city") {
      updateConsoleOfCities();
    }
    if (key.name === "up" && currentActiveWindow === "city") {
      tableOfCity.moveUp();
      updateConsoleOfCity();
    }
    if (key.name === "down" && currentActiveWindow === "city") {
      tableOfCity.moveDn();
      updateConsoleOfCity();
    }
  });
};

const updateConsoleOfCities = () => {
  currentActiveWindow = "cities";
  console.clear();
  console.log(texts.ctrlC);
  console.log(texts.enter);
  console.log("");
  tableOfCities.renderTable();
};

updateConsoleOfCity = () => {
  console.clear();
  const city = tableOfCities.data[tableOfCities.active].stacja + ":";
  console.log(texts.ctrlC);
  console.log(texts.esc);
  console.log("");
  console.log("  " + chalk`{bold {rgb(144, 213, 144) ${city}}}`);
  tableOfCity.renderTable();
  drawChart(tableOfCity.data);
};

const loadConsoleOfCity = async () => {
  currentActiveWindow = "city";
  const city = tableOfCities.data[tableOfCities.active].stacja;
  console.clear();
  console.log(texts.ctrlC);
  console.log(texts.esc);
  console.log("Loading data...");
  try {
    const data = await readFile("./data/" + city + ".txt", "utf8");
    tableOfCity = new TableLogData(JSON.parse(data), tableOfCityOptions);
    updateConsoleOfCity(city);
  } catch (error) {
    console.log("Failed to load archive data!");
  }
};

const init = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    await updateData(data);
    tableOfCities = new TableLogData(data, tableOfCitiesOptions);
    updateConsoleOfCities();
    initKeyEvents();
  } catch (error) {
    console.log("Error: ", error);
    console.log("Something went wrong. Try again.")
  }
};

console.log("Loading data...");
init();
