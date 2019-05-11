const { getContents, getContentsSlicer } = require('../../src/lib/lib.js');
const { sliceByLine, sliceByCharacter } = require('../../src/util/stringUtility.js');
const { createReader, createExistsSync } = require('../../src/util/mockUtils.js');
const assert = require('assert');

describe('getContents', function() {
  const fs = {};
  describe('by lines', function() {
    it('should return string of 10 line for single file', function() {
      let prerequisites = {
        filePaths: ['file1'],
        optionValue: 10,
        option: '-n',
        action: 'head'
      };
      let expectedOutput = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
      let expectedFiles = {};
      expectedFiles['file1'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['file1']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });

    it('should return string of two for single file', function() {
      let prerequisites = {
        filePaths: ['file2'],
        optionValue: 2,
        option: '-n',
        action: 'head'
      };
      let expectedOutput = 'Optimus Prime\nBumble Bee';
      let expectedFiles = {};
      expectedFiles['file2'] = 'Optimus Prime\nBumble Bee\nBulkhead';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['file2']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });

    it('should return a string for multiple files', function() {
      let prerequisites = {
        filePaths: ['file1', 'file2'],
        optionValue: 10,
        option: '-n',
        action: 'head'
      };
      let expectedOutput =
        '==> file1 <==\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n==> file2 <==\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20';
      let expectedFiles = {};
      expectedFiles['file1'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13';
      expectedFiles['file2'] =
        '11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['file1', 'file2']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });
  });

  describe('by characters', function() {
    it('should return a string for single file', function() {
      let prerequisites = {
        filePaths: ['file1'],
        optionValue: 5,
        option: '-c',
        action: 'head'
      };
      let expectedOutput = 'Optim';
      let expectedFiles = {};
      expectedFiles['file1'] = 'Optimus Prime';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['file1']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });

    it('should return a string of 10 characters for single file', function() {
      let prerequisites = {
        filePaths: ['file1'],
        optionValue: 10,
        option: '-c',
        action: 'head'
      };
      let expectedOutput = 'Optimus Pr';
      let expectedFiles = {};
      expectedFiles['file1'] = 'Optimus Prime';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['file1']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });

    it('should return a string for multiple files', function() {
      let prerequisites = {
        filePaths: ['file1', 'file2'],
        optionValue: 5,
        option: '-c',
        action: 'head'
      };
      let expectedOutput = '==> file1 <==\nHello\n==> file2 <==\nOptim';
      let expectedFiles = {};
      expectedFiles['file1'] = 'Hello Aftab';
      expectedFiles['file2'] = 'Optimus Prime';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['file1', 'file2']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });
  });

  describe('handling errors', function() {
    describe('missing file error', function() {
      it('for lines', function() {
        let prerequisites = {
          filePaths: ['file1'],
          optionValue: 5,
          option: '-n',
          action: 'head'
        };
        let expectedOutput = 'head: file1: No such file or directory';
        let expectedFiles = {};
        fs.readFileSync = createReader(expectedFiles, 'utf8');
        fs.existsSync = createExistsSync([]);
        let actualOutput = getContents(fs, prerequisites);
        assert.equal(actualOutput, expectedOutput);
      });

      it('for characters', function() {
        let prerequisites = {
          filePaths: ['file1'],
          optionValue: 5,
          option: '-c',
          action: 'head'
        };
        let expectedOutput = 'head: file1: No such file or directory';
        let expectedFiles = {};
        fs.readFileSync = createReader(expectedFiles, 'utf8');
        fs.existsSync = createExistsSync([]);
        let actualOutput = getContents(fs, prerequisites);
        assert.equal(actualOutput, expectedOutput);
      });

      it('for multiple files', function() {
        let prerequisites = {
          filePaths: ['file1', 'file2'],
          optionValue: 5,
          option: '-n',
          action: 'head'
        };
        let expectedOutput =
          'head: file1: No such file or directory\n==> file2 <==\n1\n2\n3\n4\n5';
        let expectedFiles = {};
        expectedFiles['file2'] = '1\n2\n3\n4\n5\n6\n7';
        fs.readFileSync = createReader(expectedFiles, 'utf8');
        fs.existsSync = createExistsSync(['file2']);
        let actualOutput = getContents(fs, prerequisites);
        assert.equal(actualOutput, expectedOutput);
      });
    });

    describe('illegal count error', function() {
      it('for any number which is not natural', function() {
        let prerequisites = {
          filePaths: ['file1'],
          optionValue: -5,
          option: '-n',
          action: 'head'
        };
        let expectedOutput = 'head: illegal line count -- -5';
        let expectedFiles = {};
        fs.readFileSync = createReader(expectedFiles, 'utf8');
        fs.existsSync = createExistsSync([]);
        let actualOutput = getContents(fs, prerequisites);
        assert.equal(actualOutput, expectedOutput);
      });
    });
  });

  describe('for tail', function() {
    it('for lines', function() {
      let prerequisites = {
        filePaths: ['data.txt'],
        optionValue: 2,
        option: '-n',
        action: 'tail'
      };
      let expectedOutput = '9\n10';
      let expectedFiles = {};
      expectedFiles['data.txt'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['data.txt']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });
    it('for characters', function() {
      let prerequisites = {
        filePaths: ['data.txt'],
        optionValue: 10,
        option: '-c',
        action: 'tail'
      };
      let expectedOutput = '6\n7\n8\n9\n10';
      let expectedFiles = {};
      expectedFiles['data.txt'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['data.txt']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });
    it('should return an empty string for lines', function() {
      let prerequisites = {
        filePaths: ['data.txt'],
        optionValue: 0,
        option: '-n',
        action: 'tail'
      };
      let expectedOutput = '';
      let expectedFiles = {};
      expectedFiles['data.txt'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['data.txt']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });
    it('should return an empty string for characters', function() {
      let prerequisites = {
        filePaths: ['data.txt'],
        optionValue: 0,
        option: '-c',
        action: 'tail'
      };
      let expectedOutput = '';
      let expectedFiles = {};
      expectedFiles['data.txt'] = '1\n2\n3\n4\n5\n6\n7\n8\n9\n10';
      fs.readFileSync = createReader(expectedFiles, 'utf8');
      fs.existsSync = createExistsSync(['data.txt']);
      let actualOutput = getContents(fs, prerequisites);
      assert.equal(actualOutput, expectedOutput);
    });
  });
});

describe('getContentsSlicer', function() {
  it('should return function sliceByLine when given -n option', function() {
    let expectedOutput = sliceByLine;
    let actualOutput = getContentsSlicer('-n');
    assert.deepEqual(actualOutput, expectedOutput);
  });

  it('should return function sliceByCharacter when given -c option', function() {
    let expectedOutput = sliceByCharacter;
    let actualOutput = getContentsSlicer('-c');
    assert.deepEqual(actualOutput, expectedOutput);
  });
});