/*
 * grunt-max-filesize
 * https://github.com/aecorre/grunt-max-filesize
 *
 * Copyright (c) 2014 Alex Corre
 * Licensed under the MIT license.
 */

'use strict';

var SizeVerifier = require('./lib/SizeVerifier');

module.exports = function(grunt) {

  grunt.registerMultiTask('maxFilesize', 'Throws an error if files are over a certain size.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options();
    var maxBytes = options.maxBytes;

    if (maxBytes) {
      grunt.log.oklns('Verifying files are no larger than [' + maxBytes + '] bytes');

      // iterate through file groups
      this.files.forEach(function(f) {
        // ensure files exist
        var existingFiles = f.src.filter(function(filePath) {
          if (!grunt.file.exists(filePath)) {
            grunt.log.warn('Source file ' + filePath + ' not found.');
            return false;
          } else {
            return true;
          }
        });

        SizeVerifier.verifyFiles(maxBytes, existingFiles);
      });

    } else {
      // Must specify a maxBytes value
      grunt.fail.warn('No maxBytes option specified. Nothing to verify.');
    }

  });

};
