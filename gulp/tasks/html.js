import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';
import hb from 'gulp-hb';
import layouts from 'handlebars-layouts';
import extReplace from 'gulp-ext-replace';

export default function html(browserSync){
  gulp.task('clean-html', () =>
    gulp.src(['output/**/*.html'], { read: false })
      .pipe(plumber())
      .pipe(clean()));

  gulp.task('build-html', ['clean-html'], () => {
    const hbStream = hb()
      .partials('source/hbs/partials/**/*.hbs')
      .partials('source/hbs/layouts/**/*.hbs')
      .helpers(layouts)
      .helpers('source/hbs/helpers/**/*.js')
      .data('source/hbs/data/*.json');
    return gulp.src('source/hbs/pages/*.hbs')
      .pipe(plumber())
      .pipe(hbStream)
      .pipe(extReplace('.html'))
      .pipe(gulp.dest('output'))
      .pipe(browserSync.stream());
  });
};
