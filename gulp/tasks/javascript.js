import gulp from 'gulp';
import clean from 'gulp-clean';
import eslint from 'gulp-eslint';
import plumber from 'gulp-plumber';
import webpack2 from 'webpack';
import webpackStream from 'webpack-stream';

import webpackConfig from '../../webpack.config';

export default function javascript(browserSync) {
  gulp.task('clean-js', () =>
    gulp.src(['output/js'], { read: false })
      .pipe(plumber())
      .pipe(clean()));

  gulp.task('lint-js', () =>
    gulp.src('source/js')
      .pipe(plumber())
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError()));

  gulp.task('build-js', ['clean-js', 'lint-js'], () =>
    gulp.src('source/js/**/*.js')
      .pipe(plumber())
      .pipe(webpackStream({ config: webpackConfig }, webpack2))
      .pipe(gulp.dest('output/js'))
      .pipe(browserSync.stream()));
}
