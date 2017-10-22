import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';


export default function images(browserSync) {
  gulp.task('clean-images', () =>
    gulp.src(['output/images/*'], { read: false })
      .pipe(plumber())
      .pipe(clean()));

  gulp.task('build-images', ['clean-images'], () =>
    gulp.src(['source/images/**/*'])
      .pipe(plumber())
      .pipe(gulp.dest('output/images'))
      .pipe(browserSync.stream()));
}
