const fs = require("fs");
const path = require("path");
const argv = require("yargs").argv;
const chalk = require("chalk");

(() => {
  if (!argv.filename) {
    console.log(`${chalk.yellow(
      `Provide a filename for an svg to convert, like this:`
    )}
        ${chalk.bold.cyan(`node svg2component --filename ./logo.svg`)}
      `);
    return;
  }

  const filename = argv.filename;

  fs.readFile(path.join(__dirname, filename), "ascii", (err, svgData) => {
    if (err) {
      return console.error(chalk.red(err));
    }

    const toWrite = `import React from 'react';
const svg = (props) => (${svgData})
export default svg;`;
    const jsFilename = `${filename}.js`;

    fs.writeFile(path.join(__dirname, jsFilename), toWrite, err => {
      if (err) {
        return console.error(chalk.red(err));
      }
      console.log(
        chalk.green(
          `Success converting ${chalk.bold(filename)} to ${chalk.bold(
            jsFilename
          )}`
        )
      );
    });
  });
})();
