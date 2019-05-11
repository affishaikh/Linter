const { extractUserInput } = require('../../src/lib/handleUserInput.js');
const assert = require('assert');

describe('extractUserInput', function() {
  it('should handle default case', function() {
    let expectedOutput = {
      filePaths: ['file1'],
      optionValue: 10,
      option: '-n'
    };
    let actualOutput = extractUserInput(['file1']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('for single file and -n5', function() {
    let expectedOutput = { filePaths: ['file1'], optionValue: 5, option: '-n' };
    let actualOutput = extractUserInput(['-n5', 'file1']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('for multiple files and -n10', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 10,
      option: '-n'
    };
    let actualOutput = extractUserInput(['-n10', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('for multiple files and -n 2', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 2,
      option: '-n'
    };
    let actualOutput = extractUserInput(['-n', '2', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('for multiple files and -5', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 5,
      option: '-n'
    };
    let actualOutput = extractUserInput(['-5', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('default case for multiple files', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 10,
      option: '-n'
    };
    let actualOutput = extractUserInput(['file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('for single file and -c5', function() {
    let expectedOutput = { filePaths: ['file1'], optionValue: 5, option: '-c' };
    let actualOutput = extractUserInput(['-c5', 'file1']);
    assert.deepEqual(expectedOutput, actualOutput);
  });

  it('for multiple files and -c 5', function() {
    let expectedOutput = {
      filePaths: ['file1', 'file2'],
      optionValue: 5,
      option: '-c'
    };
    let actualOutput = extractUserInput(['-c', '5', 'file1', 'file2']);
    assert.deepEqual(expectedOutput, actualOutput);
  });
});
