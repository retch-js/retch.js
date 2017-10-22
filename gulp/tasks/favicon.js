import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';


export default function favicon(browserSync) {
  gulp.task('clean-favicon', () =>
    gulp.src(['output/favicon.ico'], { read: false })
      .pipe(plumber())
      .pipe(clean()));

  gulp.task('build-favicon', ['clean-favicon'], () =>
    gulp.src(['source/favicon/favicon.ico'])
      .pipe(plumber())
      .pipe(gulp.dest('output/'))
      .pipe(browserSync.stream()));
}
