const { optionExtractor } = require('../util/parseUtility.js');

const isOptionAttachedWithValue = (unextractedOption, regex) => unextractedOption.match(regex);

const getIndexOfOptionValue = function(unextractedOption, option) {
  let regex = '^' + option + '[0-9]';
  regex = new RegExp(regex);
  if (isOptionAttachedWithValue(unextractedOption, regex)) {
    return 2;
  }
  return 1;
};

const isOptionValueProvided = unextractedOption => unextractedOption.match(/^-/);
const isOptionSeparateFromValue = (unextractedOption, option) =>
  unextractedOption === option;

const getOptionValue = function(unextractedOption, option) {
  let indexOfOptionValue = getIndexOfOptionValue(unextractedOption[0], option);
  let optionValue = 10;
  if (isOptionValueProvided(unextractedOption[0])) {
    optionValue = unextractedOption[0].substr(indexOfOptionValue);
  }
  if (isOptionSeparateFromValue(unextractedOption[0], option)) {
    optionValue = unextractedOption[1];
  }
  return optionValue;
};

const getIndexOfFirstFile = function(unextractedOption, option) {
  let indexOfFirstFile = 0;
  if (isOptionValueProvided(unextractedOption)) {
    indexOfFirstFile = 1;
  }
  if (isOptionSeparateFromValue(unextractedOption, option)) {
    indexOfFirstFile = 2;
  }
  return indexOfFirstFile;
};

const extractUserInput = function(userInput) {
  let prerequisites = {};
  let filePaths = [];
  let option = optionExtractor(userInput[0]);
  let optionValue = getOptionValue(userInput.slice(0, 2), option);
  let indexOfFirstFile = getIndexOfFirstFile(userInput[0], option);
  filePaths = userInput.slice(indexOfFirstFile);
  prerequisites = { filePaths, optionValue, option };
  return prerequisites;
};

module.exports = { extractUserInput };
