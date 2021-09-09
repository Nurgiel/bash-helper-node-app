const chalk = require("chalk");

class TableLogData {
  constructor(data, options) {
    this.data = data;
    this.options = {
      rows: 4,
      start: 0,
      active: 0,
      ...options,
      theme: {
        shape: ["┌", "┬", "┐", "├", "┼", "┤", "└", "┴", "┘", "─", "│"],
        colorHeader: { r: 230, g: 230, b: 230 },
        colorShape: { r: 217, g: 217, b: 217 },
        colorRowOdd: { r: 255, g: 255, b: 255 },
        colorRowEven: { r: 200, g: 200, b: 200 },
        colorRowActive: { r: 0, g: 0, b: 0 },
        colorRowActiveBg: { r: 217, g: 217, b: 217 },
        ...options.theme,
      },
    };
    this.orderedData = this.addOrders(this.data);
    this.lengths = this.calculateLengths(this.data);
    this.keys = this.checkKeys(this.lengths);
    this.rows = this.options.rows;
    this.min = 0;
    this.max = this.data.length - 1;
    this.active = this.options.active;
    this.start = this.options.start;
    this.end = this.start + this.rows - 1;
    this.currentData = this.collectCurrentData();
  }
  copyData(data) {
    return data.map(a => {
      return { ...a };
    });
  }
  calculateLengths(data) {
    const { keys } = this.options;
    const lengths = data.reduce((obj, item) => {
      const maxes = obj;
      for (const key in item) {
        const keyIndex = keys && keys.findIndex(item => item.key === key);
        const keyName =
          keyIndex && keyIndex >= 0 ? keys[keyIndex].displayedName : key;
        maxes[key] = maxes[key]
          ? Math.max(maxes[key], item[key] ? item[key].toString().length : 1)
          : Math.max(
              item[key] ? item[key].toString().length : 1,
              keyName.toString().length
            );
      }
      return maxes;
    }, {});
    return lengths;
  }
  checkKeys(obj) {
    const keys = [];
    for (const key in obj) keys.push({ key, displayedName: key });
    return keys;
  }
  addOrders(data) {
    return this.copyData(data).map((item, i) => {
      const result = item;
      result._order = i;
      return result;
    });
  }
  collectCurrentData() {
    return this.orderedData.filter(
      item => item._order >= this.start && item._order <= this.end
    );
  }
  moveUp() {
    if (this.active <= this.min) return;
    this.active--;
    if (this.active < this.start) {
      this.start = this.active;
      this.end = this.start + this.rows - 1;
    }
    this.currentData = this.collectCurrentData();
  }
  moveDn() {
    if (this.active >= this.max) return;
    this.active++;
    if (this.active > this.end) {
      this.end = this.active;
      this.start = this.end - this.rows + 1;
    }
    this.currentData = this.collectCurrentData();
  }
  convertRgb(color) {
    const { r, g, b } = color;
    return [r, g, b];
  }
  renderTable() {
    const {
      shape,
      colorHeader,
      colorShape,
      colorRowOdd,
      colorRowEven,
      colorRowActive,
      colorRowActiveBg,
    } = this.options.theme;
    const { convertRgb } = this;
    // top
    const keys = this.options.keys || this.keys;
    const topTable = keys
      .map(item => shape[9].repeat(this.lengths[item.key]))
      .join(`${shape[9]}${shape[1]}${shape[9]}`);
    console.log(
      chalk.rgb(
        ...convertRgb(colorShape)
      )`${shape[0]}${shape[9]}${topTable}${shape[9]}${shape[2]}`
    );
    //header
    const tableHeader = keys
      .map(item =>
        chalk
          .rgb(...convertRgb(colorHeader))
          .bold(
            " " + item.displayedName.padEnd(this.lengths[item.key], " ") + " "
          )
      )
      .join(`${shape[10]}`);
    console.log(
      chalk.rgb(
        ...convertRgb(colorShape)
      )`${shape[10]}${tableHeader}${shape[10]}`
    );
    // mid
    const midTable = keys
      .map(item => shape[9].repeat(this.lengths[item.key]))
      .join(`${shape[9]}${shape[4]}${shape[9]}`);
    console.log(
      chalk.rgb(
        ...convertRgb(colorShape)
      )`${shape[3]}${shape[9]}${midTable}${shape[9]}${shape[5]}`
    );
    // rows
    this.currentData.forEach(item => {
      const row = keys
        .map(key => {
          let color = chalk.rgb(...convertRgb(colorRowOdd));
          if (item._order % 2 == 1)
            color = chalk.rgb(...convertRgb(colorRowEven));
          if (item._order === this.active)
            color = chalk
              .bgRgb(...convertRgb(colorRowActiveBg))
              .rgb(...convertRgb(colorRowActive));
          return item[key.key] !== undefined && item[key.key] !== null
            ? color(
                " " +
                  item[key.key].toString().padEnd(this.lengths[key.key], " ") +
                  " "
              )
            : color(" " + " ".repeat(this.lengths[key.key]) + " ");
        })
        .join(`${shape[10]}`);
      // section
      if (item.type == "section") {
        console.log(
          chalk.rgb(
            ...convertRgb(colorShape)
          )`${shape[3]}${shape[9]}${midTable}${shape[9]}${shape[5]}`
        );
      } else {
        console.log(
          chalk.rgb(...convertRgb(colorShape))`${shape[10]}${row}${shape[10]}`
        );
      }
    });
    // bot
    const botTable = keys
      .map(item => shape[9].repeat(this.lengths[item.key]))
      .join(`${shape[9]}${shape[7]}${shape[9]}`);
    console.log(
      chalk.rgb(
        ...convertRgb(colorShape)
      )`${shape[6]}${shape[9]}${botTable}${shape[9]}${shape[8]}`
    );
  }
}

module.exports = { TableLogData };
