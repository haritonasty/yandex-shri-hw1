const del = require('del');
const gulp = require('gulp');
const gulpIf = require('gulp-if');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglifyes = require('gulp-uglifyes');
const cleanCss = require('gulp-clean-css');
// const scsslint = require('gulp-scss-lint');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('styles', function () {
    return gulp.src('src/styles/**/*.scss')
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        // .pipe(scsslint())
        .pipe(sass())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(concat('style.css'))
        .pipe(cleanCss())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('docs'));
});

gulp.task('clean', function () { return del('docs'); });

gulp.task('assets', function () {
    return gulp.src('src/assets/**', { since: gulp.lastRun('assets') })
        .pipe(gulp.dest('docs'));
});

// gulp.task('scripts', function () {
//     return gulp.src('src/scripts/**/*.js')
//         .pipe(gulpIf(isDevelopment, sourcemaps.write()))
//         // .pipe(uglifyes({ compress:true, mangle: true, ecma: 6 }))
//         .pipe(concat('vendor.js'))
//         .pipe(gulp.dest('docs'));
// });

gulp.task('scripts-ts', function () {
    return gulp.src('src/scripts/**/*.ts')
        .pipe(tsProject())
        .js.pipe(gulp.dest('docs'))
    // .pipe(uglifyes({ compress:true, mangle: true, ecma: 6 }))
});

gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('docs'))
});

gulp.task('build', gulp.series('clean',gulp.parallel('styles', 'assets', 'scripts-ts', 'html')));

gulp.task('watch', function () {
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
    gulp.watch('src/scripts/**/*.ts', gulp.series('scripts-ts'));
    gulp.watch('src/assets/**/*.*', gulp.series('assets'));
});

gulp.task('serve', function () {
    browserSync.init({ server: 'docs' });
    browserSync.watch('docs/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));