const { optionExtractor } = require('../../src/util/parseUtility.js');
const assert = require('assert');

describe('optionExtractor', function() {
  it('should return -n when given -n5', function() {
    let expectedOutput = '-n';
    assert.deepEqual(optionExtractor('-n5'), expectedOutput);
  });

  it('should return -n when given a file name', function() {
    let expectedOutput = '-n';
    assert.deepEqual(optionExtractor('file1'), expectedOutput);
  });

  it('should return -n when given -56', function() {
    let expectedOutput = '-n';
    assert.deepEqual(optionExtractor('-56'), expectedOutput);
  });

  it('should return -c when given a -c5', function() {
    let expectedOutput = '-c';
    assert.deepEqual(optionExtractor('-c5'), expectedOutput);
  });
});
