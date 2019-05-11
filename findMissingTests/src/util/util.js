const { handleMissingFile } = require('../lib/handleErrors.js');

const readFile = function(fs, filePath, action) {
  let { readFileSync, existsSync } = fs;

  let error = handleMissingFile(existsSync, filePath, action);
  if (error.occured) {
    return error.message;
  }

  let result = readFileSync(filePath, 'utf8');
  return result;
};

const createReducer = function(fs, sliceContents, prerequisites) {
  let delimeter = '';
  return function(result, filePath) {
    let { action } = prerequisites;
    let fileExists = true;
    let heading = '==> ' + filePath + ' <==\n';
    let fileData = readFile(fs, filePath, action);
    if (fileData === action + ': ' + filePath + ': No such file or directory') {
      fileExists = false;
      heading = '';
    }
    let slicedData = fileData;
    if (fileExists) {
      slicedData = sliceContents(fileData, prerequisites.range);
    }
    result = result + delimeter + heading;
    result = result + slicedData;
    delimeter = '\n';
    return result;
  };
};

module.exports = {
  createReducer,
  readFile
};
