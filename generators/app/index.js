'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

var templateName = '';

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to ' + chalk.red('Sass-Heroku') + ' generator!'
    ));

    const prompts = [
      {
        type: 'list',
        name: 'frontend_framework',
        choices: ['Foundation', 'Bootstrap'],
        message: 'Which frontend framework dude?',
        default: 'Foundation'
      },
      {
        type: 'list',
        name: 'javascript_language',
        choices: ['CoffeeScript', 'Javascript'],
        message: 'Which JS flavor?',
        default: 'Javascript'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    templateName += this.props.frontend_framework.toLowerCase();
    templateName += '_' + this.props.javascript_language.toLowerCase();

    this.fs.copyTpl(
      this.templatePath(this.props.frontend_framework),
      this.destinationPath(templateName)
    );
  }

  // Change working directory to 'gulp' for dependency install
    process.chdir('/' + templateName);

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    });
  }
};
