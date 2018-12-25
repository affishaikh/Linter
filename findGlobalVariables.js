const { execSync } = require('child_process');

const isVariable = function(declaration) {
  return (
    declaration['id']['type'] === 'Identifier' &&
    declaration['init']['type'] === 'Literal'
  );
};

const reducer = function(result, declaration) {
  if (isVariable(declaration)) {
    let name = declaration['id']['name'];
    let lineNumber = declaration['id']['loc']['start']['line'];
    result.push({
      name,
      lineNumber
    });
  }
  return result;
};

const findAllVariablesAndTheirLineNumbers = function(JSONOfDeclarations) {
  return JSONOfDeclarations.reduce(reducer, []);
};

const mapper = function(functionDeclaration) {
  return {
    start: functionDeclaration['loc']['start']['line'],
    end: functionDeclaration['loc']['end']['line']
  };
};

const findRangesOfAllFunctions = function(JSONOfFunctions) {
  return JSONOfFunctions.map(mapper);
};

const generateJSONOfOfVariables = function(fileName) {
  return JSON.parse(
    execSync("grasp -j 'var-dec' " + fileName).toString('utf8')
  );
};

const generateJSONOfOfFunctions = function(fileName) {
  return JSON.parse(
    execSync("grasp -j 'func-exp' " + fileName).toString('utf8')
  );
};

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

const main = function() {
  const fileName = process.argv[2];
  let JSONOfDeclarations = generateJSONOfOfVariables(fileName);
  let allVariables = findAllVariablesAndTheirLineNumbers(JSONOfDeclarations);
  let JSONOfFunctions = generateJSONOfOfFunctions(fileName);
  let rangesOfAllFunctions = findRangesOfAllFunctions(JSONOfFunctions);
  let allGlobalVariables = findGlobalVariables(
    allVariables,
    rangesOfAllFunctions
  );
  console.log(allGlobalVariables);
};

main();
