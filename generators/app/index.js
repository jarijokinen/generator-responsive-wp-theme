'use strict';

const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.answers = {};
  },

  prompting: function () {
    this.log(yosay('Welcome to the Responsive WordPress Theme Generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'theme_name',
        message: 'Theme Name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'theme_slug',
        message: 'Theme Slug',
        default: this.appname
      }
    ];

    return this.prompt(prompts).then(function (answers) {
      this.answers = answers;
    }.bind(this));
  },

  writing: {
    gulpfile_js: function () {
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        this.answers
      );
    },

    gitignore: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    },
    
    main_scss: function () {
      this.fs.copyTpl(
        this.templatePath('src/scss/main.scss'),
        this.destinationPath('src/scss/main.scss'),
        this.answers
      );
    },
    
    main_js: function () {
      this.fs.copyTpl(
        this.templatePath('src/js/main.js'),
        this.destinationPath('src/js/main.js'),
        this.answers
      );
    },

    functions_php: function () {
      this.fs.copyTpl(
        this.templatePath('src/php/functions.php'),
        this.destinationPath('src/php/functions.php'),
        this.answers
      );
    },

    index_php: function () {
      this.fs.copyTpl(
        this.templatePath('src/php/index.php'),
        this.destinationPath('src/php/index.php'),
        this.answers
      );
    },
    
    header_php: function () {
      this.fs.copyTpl(
        this.templatePath('src/php/header.php'),
        this.destinationPath('src/php/header.php'),
        this.answers
      );
    },
    
    footer_php: function () {
      this.fs.copyTpl(
        this.templatePath('src/php/footer.php'),
        this.destinationPath('src/php/footer.php'),
        this.answers
      );
    },
    
    page_php: function () {
      this.fs.copyTpl(
        this.templatePath('src/php/page.php'),
        this.destinationPath('src/php/page.php'),
        this.answers
      );
    },
    
    notfound_php: function () {
      this.fs.copyTpl(
        this.templatePath('src/php/404.php'),
        this.destinationPath('src/php/404.php'),
        this.answers
      );
    }
  },

  install: function () {
    const packages = [
      'babel-preset-latest',
      'browser-sync',
      'gulp',
      'gulp-autoprefixer',
      'gulp-babel',
      'gulp-concat',
      'gulp-cssnano',
      'gulp-header',
      'gulp-imagemin',
      'gulp-load-plugins',
      'gulp-sass',
      'gulp-uglify',
      'https://github.com/jarijokinen/responsive-boilerplate.git'
    ];
    this.npmInstall(packages, { 'saveDev': true });
  }
});
