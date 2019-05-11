const isActionHead = action => action === 'head';

const handleErrors = function(prerequisites) {
  let { optionValue, option, action } = prerequisites;
  if (isActionHead(action)) {
    return handleHeadIllegalCount(optionValue, option);
  }
  return handleTailIllegalOffset(optionValue);
};

const isZeroOrNegative = optionValue => optionValue <= 0;
const isOptionValueIllegal = optionValue =>
  isZeroOrNegative(optionValue) || isNaN(optionValue);

const handleHeadIllegalCount = function(optionValue, option) {
  let error = { occured: false };
  let errorOptions = { '-n': 'line', '-c': 'byte' };

  if (isOptionValueIllegal(optionValue)) {
    error.occured = true;
    error.message =
      'head: illegal ' + errorOptions[option] + ' count -- ' + optionValue;
  }
  return error;
};

const handleTailIllegalOffset = function(optionValue) {
  let error = { occured: false };

  if (isNaN(optionValue)) {
    error.occured = true;
    error.message = 'tail: illegal offset -- ' + optionValue;
  }
  return error;
};

const handleMissingFile = function(existsSync, fileName, action) {
  let doesExist = existsSync(fileName);
  let error = { occured: false };
  if (!doesExist) {
    error.occured = true;
    error.message = action + ': ' + fileName + ': No such file or directory';
  }
  return error;
};

module.exports = {
  handleErrors,
  handleHeadIllegalCount,
  handleMissingFile,
  handleTailIllegalOffset
};
