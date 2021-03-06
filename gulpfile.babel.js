import path from 'path';
import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
// import concat from 'gulp-concat';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import minifycss from 'gulp-minify-css';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import ngannotate from 'browserify-ngannotate';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';
import html from 'html-browserify';
import { exec } from 'child_process';
import pkg from './package.json';

const {
  OUTPUT_DIR,
  SOURCE_DIR,
  // DEPLOY_DIR,
  ENTRY_POINT,
} = pkg.buildConfig;
const STYLES_DIR = 'styles';
// const TEMPLATES_DIR = 'templates';
const HTML_FILES = path.join(SOURCE_DIR, '**/*.html');
const STYLES_FILES = path.join(SOURCE_DIR, STYLES_DIR, '**/*.scss');
const SCRIPTS_FILES = path.join(SOURCE_DIR, '**/*.js');

const cwd = process.cwd();
const isProd = process.env.NODE_ENV === 'production';

gulp.task('backend', (cb) => {
  exec('./bin/www', {
    cwd,
  }, (err, stdout, stderr) => {
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  });
  cb();
});

gulp.task('browser-sync', ['backend', 'build'], () => {
  browserSync({
    proxy: 'http://localhost:3000',
    // port: '4000',
    // server: {
    //   baseDir: OUTPUT_DIR,
    // },
  });
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});


gulp.task('styles', () => {
  gulp.src(STYLES_FILES)
    .pipe(plumber({
      errorHandler(error) {
        console.log(error.message);
        this.emit('end');
      } }))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest(OUTPUT_DIR))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest(OUTPUT_DIR))
    // .pipe(browserSync.reload({ stream: true }))
    .pipe(browserSync.stream());
});

// Eslint
gulp.task('lint', () =>
  gulp.src(SCRIPTS_FILES)
    .pipe(eslint())
    .pipe(eslint.format())
);

// Browserify
gulp.task('browserify', ['lint'], () => {
  let browserifyPipe = browserify({
    debug: true,
    entries: [path.join(SOURCE_DIR, ENTRY_POINT)],
    extensions: ['.js'],
  })
  .transform(html)
  .transform(babelify)
  .transform(ngannotate)
  .bundle()
  .on('error', function (error) {
    console.log(error.message);
    this.emit('end');
  })
  .pipe(source(ENTRY_POINT))
  .pipe(plumber({
    errorHandler(error) {
      console.log(error.message);
      this.emit('end');
    },
  }))
  .pipe(gulp.dest(OUTPUT_DIR));

  if (isProd) {
    browserifyPipe = browserifyPipe
    .pipe(rename({ suffix: '.min' }))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(OUTPUT_DIR));
  }

  return browserifyPipe
  // .pipe(browserSync.reload({ stream: true }))
  .pipe(browserSync.stream());
});

// Html
gulp.task('html', () =>
  gulp.src(HTML_FILES)
    .pipe(gulp.dest(OUTPUT_DIR))
    // .pipe(browserSync.reload({ stream: true }))
    .pipe(browserSync.stream())
);

gulp.task('clean', () =>
  gulp.src(OUTPUT_DIR)
    .pipe(clean())
);

gulp.task('build', ['styles', 'browserify', 'html']);

gulp.task('dev', ['browser-sync'], () => {
  gulp.watch(STYLES_FILES, ['styles']);
  gulp.watch([SCRIPTS_FILES, HTML_FILES], ['browserify']);
  gulp.watch(HTML_FILES, ['html']);
});
