const {
  texts,
  mainTableOptions
} = require("./variables")
const { TableLogData } = require("./tools/tableLogData")
const { readFile } = require("fs").promises
const readline = require("readline")
const path = require('path')
const { exit, cwd } = require("process")
const { resolve } = require("path")
const { exec } = require('child_process')

let mainTable = null

// keys listener
const initKeyEvents = () => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on("keypress", (str, key) => {
    if (key.name === "up") {
      mainTable.moveUp()
      updateConsole()
    }
    if (key.name === "down") {
      mainTable.moveDn()
      updateConsole()
    }
    if (key.ctrl && key.name === "c" || key.name === "escape") {
      exit()
    }
    if (key.ctrl && key.name === "s") {
      console.log(mainTable.data[mainTable.active].command)
    }
    if (key.name === "return") {
      bash(mainTable.data[mainTable.active].command)
    }
  })
}

const updateConsole = () => {
  console.clear()
  console.log("\n" + cwd() + "\n" + texts.ctrlC + "\n" + texts.ctrlS + "\n")
  mainTable.renderTable()
}

const bash = (command) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
    return stdout
  })
}

async function loadConfig() {
  const data = await readFile(path.resolve(__dirname, "helper.json"), "utf8", (err, data) => {
    if (err) {
      console.log("Error loading file: ", err)
    }
  })
  return JSON.parse(data)
}

const init = async () => {
  data = await loadConfig()
  mainTable = new TableLogData(data, mainTableOptions)
  updateConsole()
  initKeyEvents()
}

console.log("Loading data...")
init()
