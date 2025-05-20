const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const browserSync = require("browser-sync").create();
const del = require("del");

const rollupStream = require("@rollup/stream");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const terser = require("gulp-terser");
const nodeResolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");

// Пути
const paths = {
  styles: {
    src: "source/less/style.less",
    dest: "build/css"
  },
  scripts: {
    input: "source/scripts/main.js",
    dest: "build/scripts"
  },
  html: {
    src: "source/*.html",
    dest: "build"
  }
};

// Стили: LESS → CSS + автопрефиксы + минификация
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// HTML: минификация
function html() {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// JS: Rollup + Terser + sourcemaps
function scripts() {
  return rollupStream({
    input: paths.scripts.input,
    output: {
      format: "iife",
      sourcemap: true,
      name: "app"
    },
    plugins: [
      nodeResolve(),
      commonjs()
    ]
  })
    .pipe(source("bundle.min.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Очистка папки сборки
function clean() {
  return del("build");
}

// Сервер и наблюдение
function server() {
  browserSync.init({
    server: "build",
    notify: false,
    cors: true,
    ui: false
  });
  gulp.watch("source/less/**/*.less", styles);
  gulp.watch("source/scripts/**/*.js", scripts);
  gulp.watch("source/*.html", html);
}

// Полная сборка
const build = gulp.series(clean, gulp.parallel(styles, html, scripts));
const dev = gulp.series(build, server);

exports.styles = styles;
exports.html = html;
exports.scripts = scripts;
exports.clean = clean;
exports.build = build;
exports.default = dev;
