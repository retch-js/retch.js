import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';
import BrowserSync from 'browser-sync';

import html from './tasks/html';
import fonts from './tasks/fonts';
import images from './tasks/images';
import favicon from './tasks/favicon';
import css from './tasks/css';
import javascript from './tasks/javascript';

const browserSync = BrowserSync.create();

// register tasks.
html(browserSync);
fonts(browserSync);
images(browserSync);
favicon(browserSync);
css(browserSync);
javascript(browserSync);

gulp.task('clean', () =>
  gulp.src(['output/**/*'], { read: false })
    .pipe(plumber())
    .pipe(clean()));

gulp.task('build-all', ['build-css', 'build-js', 'build-html', 'build-fonts', 'build-favicon', 'build-images']);

gulp.task('serve', ['build-all'], () => {
  browserSync.init({
    server: {
      baseDir: 'output/',
    },
  });
  gulp.watch('source/sass/**/*', ['build-css']);
  gulp.watch('source/hbs/**/*', ['build-html']);
  gulp.watch('source/js/**/*', ['build-js']);
  gulp.watch('source/fonts/**/*', ['build-fonts']);
  gulp.watch('source/favicon/favicon.ico', ['build-favicon']);
  gulp.watch('source/images/**/*', ['build-images']);
});

gulp.task('default', ['build-all']);
