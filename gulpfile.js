"use strict";
var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var ghPages = require("gulp-gh-pages");
var replace = require('gulp-replace');

process.env.FORCE_COLOR = true;

gulp.task("js", function() {
  return gulp.src("src/**/*.js")
    .pipe(babel({
      plugins: ["transform-es2015-modules-umd"]
    }))
//   .pipe(uglify({
//     mangle: true
//   }))
    .pipe(gulp.dest("dist"))
    .pipe(gulp.dest("test/dist"));
});

gulp.task("default", function () {
  gulp.start(["js"]);
});

gulp.task("deploy", function() {
  return gulp.src(["**/dist/*", "!**/node_modules/**/dist/*", "test/**/*"])
             .pipe(replace("../dist/", "./dist/"))
             .pipe(ghPages());
});
