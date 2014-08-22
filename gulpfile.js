var gulp        = require('gulp');

var concat      = require('gulp-concat');
var jslint      = require('gulp-jslint');
var uglify      = require('gulp-uglify');

var less        = require('gulp-less');
var csscomb     = require('gulp-csscomb');
var plumber     = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;

// Static server
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });
})

// gulp.task('browser-sync', function() {
//     browserSync({
//         proxy: "yourlocal.dev"
//     });
// });

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('less', function () {
  gulp.src(['./dev/theme.less', './dev/bootstrap.less', , './dev/slide-menu.less'])
    .pipe(plumber())
    .pipe(less())
    .pipe(csscomb())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream:true}));
});

gulp.task('script', function () {
  gulp.src(['./dev/js/*.js'])
    // .pipe(jslint({
    //   node: true,
    //   evil: true,
    //   nomen: true,
    //   reporter: 'default',
    //   errorsOnly: false
    // }))
    // .on('error', function (error) {
    //   console.error(String(error));
    // })
    
    // .pipe(uglify())
    .pipe(concat('slide-menu.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream:true}));
});

gulp.task('watch', function () {
  gulp.watch(['./dist/*.html'], ['bs-reload']);
  gulp.watch(['./dev/*.less'], ['less']);
  gulp.watch(['./dev/js/*.js'], ['script']);
});

gulp.task('default', ['browser-sync', 'less', 'script', 'watch']);