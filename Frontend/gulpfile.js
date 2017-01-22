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

gulp.task('build', function () {
    return browserify({entries: './app/components/index.js', extensions: ['.js'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch(['app/components/*.js', 'app/stores/*.js', 'app/actions/*.js'], ['build']);
});

gulp.task('default', ['watch', 'serve']);