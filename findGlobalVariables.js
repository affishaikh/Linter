const { execSync } = require('child_process');

const isVariableBetweenLexicalScopeOfAFunction = function(
  rangesOfAllFunctions,
  variable
) {
  return !rangesOfAllFunctions.some(
    range =>
      variable['lineNumber'] > range['start'] &&
      variable['lineNumber'] < range['end']
  );
};

const findGlobalVariables = function(allVariables, rangesOfAllFunctions) {
  const isVariableBetweenScopeOfAFunction = isVariableBetweenLexicalScopeOfAFunction.bind(
    null,
    rangesOfAllFunctions
  );
  return allVariables.filter(isVariableBetweenScopeOfAFunction);
};

const findRangesOfAllFunctions = function(fileName) {
  return JSON.parse(
    execSync(
      "grasp -j 'func-exp' " +
        fileName +
        "| jq '[.[] | {'start':.loc.start.line, 'end':.loc.end.line}]'"
    ).toString('utf8')
  );
};

const findAllVariablesAndTheirLineNumbers = function(fileName) {
  return JSON.parse(
    execSync(
      "grasp -j 'var-dec' " +
        fileName +
        "| jq '[.[] | {'name':.id.name, 'type':.init.type, 'lineNumber':.init.loc.start.line}]'" +
        "| jq 'map(select(.type == \"Literal\" or .type == \"ObjectExpression\" or .type == \"ArrayExpression\" or .type == \"ObjectPattern\"))'"
    ).toString('utf8')
  );
};

const mapper = function(fileName) {
  let allVariables = findAllVariablesAndTheirLineNumbers(fileName);
  let rangesOfAllFunctions = findRangesOfAllFunctions(fileName);
  let allGlobalVariables = findGlobalVariables(allVariables, rangesOfAllFunctions);
  return allGlobalVariables;
}

const main = function() {
  const files = process.argv.slice(2);
  let allGlobalVariablesInAllFiles = files.map(mapper);
  console.log(allGlobalVariablesInAllFiles);
};

main();
