var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('serve', function() {
    gulpConnect.server({
        root: 'app',
        port: 9000
    });
});

gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('app/'));
});

gulp.task('compile-js', function () {
    return browserify({entries: './app/components/index.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['html', 'compile-js'], function () {
    gulp.watch(['app/components/**/*.js', 'app/stores/**/*.js', 'app/actions/**/*.js'], ['compile-js']);
    gulp.watch('app/**/*.html', ['html']);
});

gulp.task('default', ['watch', 'serve']);
