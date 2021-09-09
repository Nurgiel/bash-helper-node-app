const { readFile, writeFile } = require("fs").promises;

const updateData = async data => {
  for (const city of data) {
    try {
      const fileData = await readFile("./data/" + city.stacja + ".txt", "utf8");
      const newData = JSON.stringify(city);
      if (!fileData.includes(newData)) {
        const dataToAdd = fileData.slice(0, -1) + "," + newData + "]";
        await writeFile("./data/" + city.stacja + ".txt", dataToAdd, "utf8");
      }
    } catch (error) {
      if (error.code === "ENOENT") {
        const text = "[" + JSON.stringify(city) + "]";
        await writeFile("./data/" + city.stacja + ".txt", text, "utf8");
      }
    }
  }
  console.log("Data saved");
};

module.exports = { updateData };
