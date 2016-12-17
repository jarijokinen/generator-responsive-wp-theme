'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browsersync = require('browser-sync').create();

const options = {
  autoprefixer: { browsers: ['last 3 versions'] },
  babel: { presets: ['latest'] },
  browsersync: { proxy: 'localhost:8080' },
  cssnano: {},
  fonts: {
    dest: 'dist/fonts',
    src: [
      'src/fonts/*'
    ]
  },
  header: { banner:  "/*\n * Theme Name: <%= theme_name %>\n */\n" },
  img: {
    dest: 'dist/img',
    src: [
      'src/img/*'
    ]
  },
  js: {
    dest: 'dist/js',
    file: '<%= theme_slug %>.js',
    src: [
      'node_modules/responsive-boilerplate/src/js/*.js',
      'src/js/*.js'
    ]
  },
  php: {
    dest: 'dist',
    src: [
      'src/php/*.php'
    ]
  },
  scss: { 
    dest: 'dist',
    file: 'style.css',
    outputStyle: 'compressed',
    src: [
      'node_modules/responsive-boilerplate/src/scss/base.scss',
      'node_modules/responsive-boilerplate/src/scss/buttons.scss',
      'node_modules/responsive-boilerplate/src/scss/container.scss',
      'node_modules/responsive-boilerplate/src/scss/grid.scss',
      'node_modules/responsive-boilerplate/src/scss/header.scss',
      'node_modules/responsive-boilerplate/src/scss/sections.scss',
      'src/scss/*.scss'
    ]
  }
};

gulp.task('browsersync', function () {
  browsersync.init(['dist/*.php'], options.browsersync);
});

gulp.task('fonts', function () {
  return gulp.src(options.fonts.src)
    .pipe(gulp.dest(options.fonts.dest));
});

gulp.task('img', function () {
  return gulp.src(options.img.src)
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(options.img.dest));
});

gulp.task('js', function () {
  return gulp.src(options.js.src)
    .pipe(plugins.babel(options.babel))
    .pipe(plugins.concat(options.js.file))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(options.js.dest));
});

gulp.task('php', function () {
  return gulp.src(options.php.src)
    .pipe(gulp.dest(options.php.dest));
});

gulp.task('scss', function () {
  return gulp.src(options.scss.src)
    .pipe(plugins.sass(options.scss))
    .pipe(plugins.autoprefixer(options.autoprefixer))
    .pipe(plugins.concat(options.scss.file))
    .pipe(plugins.cssnano(options.cssnano))
    .pipe(plugins.header(options.header.banner))
    .pipe(gulp.dest(options.scss.dest))
    .pipe(browsersync.stream());
});

gulp.task('watch', function() {
  gulp.watch('src/img/*', ['img']);
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/php/*.php', ['php']);
  gulp.watch('src/scss/**/*.scss', ['scss']);
});

gulp.task('dist', ['fonts', 'img', 'js', 'php', 'scss']);
gulp.task('default', ['browsersync', 'dist', 'watch']);
