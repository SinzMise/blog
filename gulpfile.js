var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');

// 若使用babel压缩js，则取消下方注释，并注释terser的代码
// var uglify = require('gulp-uglify');
// var babel = require('gulp-babel');

// 若使用terser压缩js
var terser = require('gulp-terser');

//minify js babel
// 若使用babel压缩js，则取消下方注释，并注释terser的代码
// gulp.task('compress', () =>
//   gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
// 		.pipe(babel({
// 			presets: ['@babel/preset-env']
// 		}))
//     .pipe(uglify().on('error', function(e){
//       console.log(e);
//     }))
// 		.pipe(gulp.dest('./public'))
// );

// minify js - gulp-tester
// 若使用terser压缩js
gulp.task('compress', () =>
    gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
        .pipe(terser())
        .pipe(gulp.dest('./public'))
)
//css
gulp.task('minify-css', () => {
    return gulp.src('./public/**/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie11'
        }))
        .pipe(gulp.dest('./public'));
});


// 壓縮 public 目錄內 html
gulp.task('minify-html', () => {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true, //清除 HTML 註釋
            collapseWhitespace: true, //壓縮 HTML
            collapseBooleanAttributes: true, //省略布爾屬性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true, //刪除所有空格作屬性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true, //刪除 <script> 的 type="text/javascript"
            removeStyleLinkTypeAttributes: true, //刪除 <style> 和 <link> 的 type="text/css"
            minifyJS: true, //壓縮頁面 JS
            minifyCSS: true, //壓縮頁面 CSS
            minifyURLs: true
        }))
        .pipe(gulp.dest('./public'))
});

// 執行 gulp 命令時執行的任務
gulp.task("default", gulp.parallel(
    'compress','minify-html', 'minify-css'
));