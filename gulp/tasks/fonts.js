import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';


export default function fonts(browserSync) {
  gulp.task('clean-fonts', () =>
    gulp.src(['output/fonts/*'], { read: false })
      .pipe(plumber())
      .pipe(clean()));

  gulp.task('build-fonts', ['clean-fonts'], () =>
    gulp.src(['source/fonts/*', 'node_modules/font-awesome/fonts/*'])
      .pipe(plumber())
      .pipe(gulp.dest('output/fonts'))
      .pipe(browserSync.stream()));
}
