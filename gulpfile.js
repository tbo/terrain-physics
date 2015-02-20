'use strict';

var gulp = require('gulp');
var gutil = require('gutil');
var es6ify = require('es6ify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

// load plugins
var $ = require('gulp-load-plugins')();

var errLog = function (err) {
  if (err) {
    gutil.log(err.toString());
  }
};

gulp.task('scripts', function () {
    return gulp.src('app/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')));
});

gulp.task('browserify', function () {
    return browserify('./app/main.js')
            .transform(es6ify)
            .bundle({debug: true}, errLog)
            .pipe(source('main.js'))
            .pipe(gulp.dest('.tmp/scripts'));
});


gulp.task('html', ['browserify'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

// gulp.task('images', function () {
//     return gulp.src('app/assets/images/**/*')
//         .pipe($.cache($.imagemin({
//             optimizationLevel: 3,
//             progressive: true,
//             interlaced: true
//         })))
//         .pipe(gulp.dest('dist/images'))
//         .pipe($.size());
// });

gulp.task('extras', function () {
    return gulp.src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('.tmp'))
        .use(connect.static('app'))
        .use(connect.directory('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect'], function () {
});

gulp.task('watch', ['browserify', 'connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/assets/**/*.*',
        '.tmp/**/*.js'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/**/*.js', ['scripts', 'browserify']);
});
