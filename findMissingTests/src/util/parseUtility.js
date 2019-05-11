const optionExtractor = function(option) {
  let extractedOption = '-n';
  if (option.match(/^-c/)) {
    extractedOption = '-c';
  }
  return extractedOption;
};

module.exports = { optionExtractor };
