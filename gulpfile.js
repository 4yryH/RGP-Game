const gulp = require("gulp");
const less = require("gulp-less");
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();
const del = require("del");

// Стили
const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(browserSync.stream());
};

// HTML
const html = () => {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(browserSync.stream());
};

// Скрипты
const scripts = () => {
  return gulp.src("source/scripts/*.js")
    .pipe(gulp.dest("build/scripts"))
    .pipe(browserSync.stream());
};

// Очистка
const clean = () => {
  return del("build");
};

// Сервер
const server = (done) => {
  browserSync.init({
    server: {
      baseDir: "build"
    },
    notify: false,
    cors: true,
    ui: false
  });
  done();
};

// Наблюдение
const watcher = () => {
  gulp.watch("source/less/**/*.less", styles);
  gulp.watch("source/*.html", html);
  gulp.watch("source/scripts/*.js", scripts);
};

// Основная задача
exports.default = gulp.series(
  clean,
  gulp.parallel(styles, html, scripts),
  gulp.series(server, watcher)
);
