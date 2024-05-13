const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const ssi = require('browsersync-ssi');

// Функция для компиляции Sass
function sassCompilation() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
}

// Функция для минификации CSS
// Функция для минификации CSS
function cssMinification() {
    return gulp.src('css/*.css') // Исходные CSS файлы
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' })) // добавляем суффикс .min к именам файлов
        .pipe(gulp.dest('css/dist')) // сохраняем минифицированные файлы в папку dist/css
        .pipe(browserSync.stream()); // передаем их в поток для обновления браузера
}

// Функция для запуска сервера BrowserSync и поддержки SSI
function startServer() {
    browserSync.init({
        server: {
            baseDir: './',
            middleware: ssi({ baseDir: __dirname + '/', ext: '.html' })
        }
    });

    gulp.watch('scss/**/*.scss', sassCompilation);
    gulp.watch('css/*.css', cssMinification); // только минификация CSS при изменении
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Экспорт функции startServer как задачи по умолчанию для Gulp
exports.default = startServer;
