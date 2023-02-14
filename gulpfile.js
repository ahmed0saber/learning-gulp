const { src, dest, watch, series } = require('gulp')
const compileSass = require('gulp-sass')(require('sass'))
const addPrefix = require('gulp-autoprefixer')
const minifyCss = require('gulp-clean-css')
const terseJs = require('gulp-terser')
const concatIntoSingleFile = require('gulp-concat')

const prepareCss = () => {
    return src('src/**/*.{css,scss,sass}', {
        allowEmpty: true
    })
        .pipe(compileSass())
        .pipe(addPrefix())
        .pipe(minifyCss())
        .pipe(concatIntoSingleFile('style.min.css'))
        .pipe(minifyCss())
        .pipe(dest('dist/'))
}

const prepareJs = () => {
    return src('src/**/*.js', {
        allowEmpty: true
    })
        .pipe(terseJs())
        .pipe(concatIntoSingleFile('script.min.js'))
        .pipe(terseJs())
        .pipe(dest('dist/'))
}

const watchTasks = () => {
    watch('src/**/*.{css,scss,sass}', prepareCss)
    watch('src/**/*.js', prepareJs)
}

exports.default = series(
    prepareCss,
    prepareJs,
    watchTasks
)
