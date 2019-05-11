const { execSync } = require('child_process');

const functionExtractor = function(functionsExtractedSofar, declaration) {
  if (declaration.init.type === 'FunctionExpression') {
    functionsExtractedSofar.push({
      name: declaration.id.name,
      lineNumber: declaration.init.loc.start.line
    });
  }
  return functionsExtractedSofar;
};

const calleeExtractor = function(calleeExtractedSofar, functionCall) {
  if (!calleeExtractedSofar.includes(functionCall.callee.name)) {
    calleeExtractedSofar.push(functionCall.callee.name);
  }
  return calleeExtractedSofar;
};

const extractAllFunctions = function(JSONOfAllVaraibleDeclarations) {
  const keys = Object.keys(JSONOfAllVaraibleDeclarations);
  const allFunctions = {};
  for (key of keys) {
    allFunctions[key] = JSONOfAllVaraibleDeclarations[key].reduce(
      functionExtractor,
      []
    );
  }
  return allFunctions;
};

const extractAllCallee = function(JSONOfAllFunctionCalls) {
  const keys = Object.keys(JSONOfAllFunctionCalls);
  let allCallee = [];
  for (key of keys) {
    let calls = JSONOfAllFunctionCalls[key].reduce(calleeExtractor, []);
    allCallee = allCallee.concat(calls);
  }
  return allCallee;
};

const getAllUntestedFunctions = function(allFunctions, allCallee) {
  const keys = Object.keys(allFunctions);
  let allUntestedFunctions = {};
  for(key of keys) {
   allUntestedFunctions[key] = allFunctions[key].filter(x => !allCallee.includes(x.name));
  }
  return allUntestedFunctions;
};

const findMissingTests = function(fileNames) {
  const JSONOfAllVaraibleDeclarations = JSON.parse(
    execSync("grasp -j 'var-dec' src/**/*.js")
  );
  const allFunctions = extractAllFunctions(JSONOfAllVaraibleDeclarations);
  const JSONOfAllFunctionCalls = JSON.parse(
    execSync("grasp -j 'call' test/**/*.js")
  );
  const allCallee = extractAllCallee(JSONOfAllFunctionCalls);
  const allUntestedFunctions = getAllUntestedFunctions(allFunctions, allCallee);
  return allUntestedFunctions;
};

console.log(findMissingTests());
