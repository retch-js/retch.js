import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';
import sassLint from 'gulp-sass-lint';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';

export default function css(browserSync) {
  gulp.task('clean-css', () =>
    gulp.src(['output/css/**/*'], { read: false })
      .pipe(plumber())
      .pipe(clean()));

  gulp.task('lint-sass', () =>
    gulp.src('source/sass/**/*.s+(a|c)ss')
      .pipe(plumber())
      .pipe(sassLint())
      .pipe(sassLint.format())
      .pipe(sassLint.failOnError()));

  gulp.task('build-css', ['clean-css', 'lint-sass'], () =>
    gulp.src('source/sass/**/*.s+(a|c)ss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(cleanCSS())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('output/css'))
      .pipe(browserSync.stream()));
}
