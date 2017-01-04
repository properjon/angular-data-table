/* eslint-disable import/no-extraneous-dependencies */

import nPath from 'path';
import gulp from 'gulp';
import protractorAngular from 'gulp-angular-protractor';
import plumber from 'gulp-plumber';
import babel from 'gulp-babel';
import less from 'gulp-less';
import changed from 'gulp-changed';
import ngAnnotate from 'gulp-ng-annotate';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import vinylPaths from 'vinyl-paths';
import del from 'del';
import { Server as KarmaServer } from 'karma';

const rollup = require('rollup');

const path = {
  source: 'src/**/*.js',
  less: 'src/**/*.less',
  output: 'dist/',
  release: 'release/',
  outputCss: 'dist/**/*.css',
};

const pkg = require('./package.json');

const banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

//
// Compile Tasks
// ------------------------------------------------------------
gulp.task('es6', () => gulp.src(path.source)
    .pipe(plumber())
    .pipe(changed(path.output, { extension: '.js' }))
    .pipe(babel())
    .pipe(ngAnnotate({
      gulpWarnings: true,
    }))
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true })));

gulp.task('less', () => gulp.src(path.less)
    .pipe(changed(path.output, { extension: '.css' }))
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest(path.output))
    .pipe(browserSync.reload({ stream: true })));

gulp.task('clean', () => gulp.src([path.output, path.release])
    .pipe(vinylPaths(del)));

gulp.task('compile', callback => runSequence(
    ['less', 'es6'],
    callback,
  ));

//
// Dev Mode Tasks
// ------------------------------------------------------------
gulp.task('serve', ['compile'], (callback) => {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      },
    },
  }, callback);
});

gulp.task('watch', ['serve'], () => {
  const watcher = gulp.watch([path.source, path.less, '*.html'], ['compile']);
  watcher.on('change', (event) => {
    gutil.log(`File ${event.path} was ${event.type}, running tasks...`);
  });
});

//
// Release Tasks
// ------------------------------------------------------------

gulp.task('release', callback => runSequence(
    'clean',
    ['release-less', 'release-build'],
    'release-umd',
    'release-common',
    'release-es6-min',
    callback,
    ));

gulp.task('release-less', () => gulp.src(['src/themes/*.less', 'src/dataTable.less'])
    .pipe(less())
    .pipe(gulp.dest(path.release)));

gulp.task('release-build', () => rollup.rollup({
  entry: 'src/dataTable.js',
  external: ['angular'],
}).then(bundle => bundle.write({
  dest: 'release/dataTable.es6.js',
  format: 'es',
  moduleName: 'DataTable',
})));

const RELEASE = {
  UMD: {
    EXTENSION: '',
    PLUGINS: ['transform-es2015-modules-umd'],
  },
  COMMON: {
    EXTENSION: '.cjs',
    PLUGINS: ['transform-es2015-modules-commonjs'],
  },
  MIN: {
    EXTENSION: '.min',
    PLUGINS: ['transform-es2015-modules-umd'],
  },
};

function releaser(RELEASE_TYPE) {
  return gulp.src('release/dataTable.es6.js')
    .pipe(babel({
      plugins: RELEASE_TYPE.PLUGINS,
      moduleId: 'DataTable',
    }))
    .pipe(ngAnnotate({
      gulpWarnings: false,
    }))
    .pipe(uglify())
    .pipe(header(banner, { pkg }))
    .pipe(rename(`dataTable${RELEASE_TYPE.EXTENSION}.js`))
    .pipe(gulp.dest('release/'));
}

gulp.task('release-umd', () => releaser(RELEASE.UMD));

gulp.task('release-common', () => releaser(RELEASE.COMMON));

gulp.task('release-es6-min', () => releaser(RELEASE.MIN));

//
// Test Tasks
// ------------------------------------------------------------
function startKarma(callback, singleRun) {
  new KarmaServer({
    configFile: nPath.join(__dirname, 'test/karma.conf.js'),
    singleRun,
  }, (errors) => {
    if (errors === 0) {
      callback();
    } else {
      callback(new gutil.PluginError('karma', {
        message: 'Unit test(s) failed.',
      }));
    }
  }).start();
}

gulp.task('unit', (callback) => {
  startKarma(callback, true);
});

gulp.task('unit:watch', (callback) => {
  startKarma(callback, false);
});

gulp.task('e2e', ['serve'], (callback) => {
  gulp.src(['src/**/*e2e.js'])
    .pipe(protractorAngular({
      configFile: 'test/protractor.conf.js',
      debug: true,
      autoStartStopServer: true,
    }))
    .on('error', (e) => {
      callback(new gutil.PluginError('protractor', {
        message: e,
      }));
    })
    .on('end', callback);
});

gulp.task('test', ['unit', 'e2e']);
