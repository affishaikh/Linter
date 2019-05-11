const fs = require('fs');

const copyFile = function(fileName) {
    const destinationFileName = fileName + '.copy';
    fs.copyFileSync()
};

const writeInTheFile = function() {
  const fileName = process.argv[2];
  const mainFunctionInStringFormat =
    '\n\nconst getGlobalVariables = function() {' +
    '\n\tconst allKeys = Object.keys(this);' +
    "\n\treturn allKeys.slice(allKeys.indexOf('setTimeout') + 1);\n};" +
    '\n\nmodule.exports = {getGlobalVariables};';
  fs.appendFileSync(fileName, mainFunctionInStringFormat);
  const { getGlobalVariables } = require('./' + fileName);
  console.log(getGlobalVariables());
};

writeInTheFile();
