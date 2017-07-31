'use strict';
var path = require('path'),
    assert = require('yeoman-assert'),
    helpers = require('yeoman-test'),
    fs = require('fs-extra');

describe('Sass-Heroku generator', function () {
  beforeEach(function () {
    this.app = helpers.run(path.join(__dirname, '../generators/app')).inDir(path.join(__dirname, 'temp'));
  });

  afterEach(function () {
    fs.removeSync('../foundation_javascript');
    fs.removeSync('../bootstrap_javascript');
  });

  it('should generate Foundation expected files', function (done) {
    this.app.withPrompts({}).on('end', function () {
      assert.file(['../foundation_javascript/src/index.html']);
      assert.file(['../foundation_javascript/Gulpfile.js']);
      done();
    });
  });

  it('should generate Bootstrap expected files', function (done) {
    this.app.withPrompts({frontend_framework: 'Bootstrap', javascript_language: 'Javascript'}).on('end', function () {
      assert.file(['../bootstrap_javascript/src/index.html']);
      assert.file(['../bootstrap_javascript/Gulpfile.js']);
      done();
    });
  });
});
