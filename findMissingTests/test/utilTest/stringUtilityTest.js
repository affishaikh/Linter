const {
  sliceByLine,
  sliceByCharacter
} = require('../../src/util/stringUtility.js');
const assert = require('assert');

describe('sliceByLine', function() {
  it('should return 5 sliced lines of given string when given string and prerequisites', function() {
    let data = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    let prerequisites = {};
    prerequisites.range = [0, 5];
    let expectedOutput = '1\n2\n3\n4\n5';
    let actualOutput = sliceByLine(data, prerequisites.range);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
describe('sliceByCharacter', function() {
  it('should return 5 sliced characters of given string when given string and prerequisites', function() {
    let data = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
    let prerequisites = {};
    prerequisites.range = [0, 5];
    let expectedOutput = '1\n2\n3';
    let actualOutput = sliceByCharacter(data, prerequisites.range);
    assert.deepEqual(actualOutput, expectedOutput);
  });
});
