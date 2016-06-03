"use strict";
var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");

process.env.FORCE_COLOR = true;

gulp.task("js", function() {
  return gulp.src("src/**/*.js")
    .pipe(babel({
      plugins: ["transform-es2015-modules-umd"]
    }))
//   .pipe(uglify({
//     mangle: true
//   }))
    .pipe(gulp.dest("dist"));
});

gulp.task("default", function () {
  gulp.start(["js"]);
});
