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
    if(!calleeExtractedSofar.includes(functionCall.callee.name)){
        calleeExtractedSofar.push(functionCall.callee.name);
    }
    return calleeExtractedSofar;
}

const extractAllFunctions = function(JSONOfAllVaraibleDeclarations) {
  return JSONOfAllVaraibleDeclarations.reduce(functionExtractor, []);
};

const extractAllCallee = function(JSONOfAllFunctionCalls) {
    return JSONOfAllFunctionCalls.reduce(calleeExtractor, []);
}

const getAllUntestedFunctions = function(allFunctions, allCallee) {
    return allFunctions.filter(x => !allCallee.includes(x.name))
}

const findMissingTests = function(fileNames) {
  const srcFile = fileNames[0];
  const testFile = fileNames[1];
  const JSONOfAllVaraibleDeclarations = JSON.parse(
    execSync("grasp -j 'var-dec' " + srcFile)
  );
  const allFunctions = extractAllFunctions(JSONOfAllVaraibleDeclarations);
  const JSONOfAllFunctionCalls = JSON.parse(
    execSync("grasp -j 'call' " + testFile)
  );
  const allCallee = extractAllCallee(JSONOfAllFunctionCalls);
  const allUntestedFunctions = getAllUntestedFunctions(allFunctions, allCallee);
  return allUntestedFunctions;
};

console.log(findMissingTests(process.argv.slice(2)));
