'use strict';

var grunt = require('grunt');
var sinon = require('sinon');
var SizeVerifier = require('../tasks/lib/SizeVerifier');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var file100kb = 'test/fixtures/100kb';
var file200kb = 'test/fixtures/200kb';

exports.fileOverBytes = {

  returnsTrueForFileOverLimit: function(test) {
    test.expect(1);
    test.ok(SizeVerifier.fileOverBytes(100, file100kb), 'Returns true file over limit.');
    test.done();
  },

  returnsFalseForFileUnderLimit: function(test) {
    test.expect(1);
    test.notEqual(SizeVerifier.fileOverBytes(200000, file100kb), 'Returns false for under limit.');
    test.done();
  },

  returnsFalseForFileExactlyLimit: function(test) {
    test.expect(1);
    test.notEqual(SizeVerifier.fileOverBytes(100000, file100kb), 'Returns false for exactly limit.');
    test.done();
  }

};

exports.verifyFiles = {

  setUp: function(done) {
    sinon.stub(console, 'log');
    sinon.stub(grunt.log, 'writeln');
    sinon.stub(grunt.log, 'error');
    sinon.stub(grunt.log, 'oklns');
    sinon.stub(grunt.fail, 'fatal');
    done();
  },

  tearDown: function(done) {
    console.log.restore();
    grunt.log.writeln.restore();
    grunt.log.error.restore();
    grunt.log.oklns.restore();
    grunt.fail.fatal.restore();
    done();
  },

  logsOkWhenAllFilesUnderLimit: function(test) {
    test.expect(2);

    SizeVerifier.verifyFiles(300000, [file100kb, file200kb]);
    test.strictEqual(grunt.log.oklns.calledWith('All files ok.'), true, 'Should log All files ok.');
    test.strictEqual(grunt.fail.fatal.notCalled, true, 'Should not fatal.');

    test.done();
  },

  logsALineForFilesOverLimit: function(test) {
    test.expect(1);

    SizeVerifier.verifyFiles(150000, [file100kb, file200kb]);
    test.strictEqual(grunt.log.writeln.calledWith(file200kb), true, 'Should log the file over the limit.');

    test.done();
  },

  gruntFatalsWhenAnyFilesOverLimit: function(test) {
    test.expect(1);

    SizeVerifier.verifyFiles(100, [file100kb, file200kb]);
    test.strictEqual(grunt.fail.fatal.calledOnce, true, 'Should fatal.');

    test.done();
  }

};
