'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const browsersync = require('browser-sync').create();

const options = {
  autoprefixer: { browsers: ['last 3 versions'] },
  babel: { presets: ['latest'] },
  browsersync: { proxy: 'localhost:8080' },
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
    file: 'styles.css',
    outputStyle: 'compressed',
    src: [
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
    .pipe(plugins.header(options.header.banner))
    .pipe(plugins.rename(options.scss.file))
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
