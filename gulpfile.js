var gulp         = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var browserify   = require('browserify');
var babel        = require('babelify');
var concat       = require('gulp-concat');
var reload       = browserSync.reload;
var sass         = require('gulp-sass');
var uglify       = require('gulp-uglify');
var useref       = require('gulp-useref');
var gulpIf       = require('gulp-if');
var cssnano      = require('gulp-cssnano');
var source       = require('vinyl-source-stream');
var del          = require('del');

var sass_files = ['src/stylesheet/**/*.sass'];
var html_files = ['src/*.html'];
var js_files = ['src/**/*.js'];


// Cleaning build/ folder
gulp.task('clean:build', function() {
  return del.sync('build');
})

// Running server
gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  })
})

// Watch file changes
gulp.task('watch', ['browserSync'], function (){
  gulp.watch(sass_files, ['sass']);
  gulp.watch(html_files, browserSync.reload);
  gulp.watch(js_files, ['concat_js', 'build']);
})

// Sass compilation
gulp.task('sass', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  return gulp.src(sass_files)
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Minified sass compilation
gulp.task('sass:min', function() {
  var autoprefixerOptions = {
    browsers: ['last 2 versions'],
  };

  return gulp.src(sass_files)
    .pipe(sass())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(concat('style.css'))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('build/stylesheet'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('build', function() {
 return browserify('./build/index.js')
 .transform(babel)
 .bundle()
 .pipe(source('index.js'))
 .pipe(gulp.dest('build'));
})

gulp.task('concat_js', function() {
  return gulp.src(js_files)
             .pipe(concat('index.js'))
             .pipe(gulp.dest('build'))
})


gulp.task('development', ['clean:build',
                          'sass',
                          'concat_js',
                          'build',
                          'server'
                         ], function() {
  return gulp.watch()
})

gulp.task('production', ['clean:build',
                         'sass:min',
                         'concat_js',
                         'build',
                         'server'
                        ], function() {
  return gulp.watch()
});
