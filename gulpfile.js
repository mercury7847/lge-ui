// gulp...
const gulp = require("gulp"),
        sass = require('gulp-sass'),
        sourcemaps = require('gulp-sourcemaps'),
        rename = require('gulp-rename'),
        browserSync = require('browser-sync'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        cleanCSS = require('gulp-clean-css'),
        gulpif = require('gulp-if'),
        fileinclude = require('gulp-file-include'),
        git = require('gulp-git'),
        del = require('del');

const src = "./src";
const dist = './dist';
const sourceFolder = "/lg5-common";

// Loads BrowserSync
gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 3010,
        startPath: "./guide/"
    });
});

// html 파일 생성...
gulp.task('html', () => gulp
    .src(src + '/pages/**', {base:src + '/pages/'})
    .pipe(fileinclude({
        prefix: '@@',
        basepath: src + '/pages/'
    }))
    .pipe(gulp.dest(dist + '/html/'))
);

//guide page 파일생성...
gulp.task('guide', ["guide:html", "guide:images", "guide:css", "guide:js", "guide:data-js"]);
gulp.task('guide:html', () => gulp
    .src(src + '/guide/**/*.html', {base:src + '/guide/'})
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(dist + '/guide/'))
);
gulp.task("guide:images", () => gulp
    .src(src + "/guide/guide/images/**")
    .pipe(gulp.dest(dist + "/guide/guide/images/"))
);
gulp.task("guide:css", () => gulp
    .src(src + "/guide/guide/css/**")
    .pipe(gulp.dest(dist + "/guide/guide/css/"))
);
gulp.task("guide:js", () => gulp
    .src(src + "/guide/guide/js/**")
    .pipe(gulp.dest(dist + "/guide/guide/js/"))
);
gulp.task("guide:data-js", () => gulp
    .src(src + "/guide/data.js")
    .pipe(gulp.dest(dist + "/guide/"))
);



var scssOptions = {
    outputStyle : "expanded",
    indentType : "tab",
    indentWidth : 1,
    precision: 6,
    sourceComments: true
};
// Compile Sass
gulp.task("styles", () => gulp
    .src(src + "/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie9'}))
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/css/"))
);

//자주 쓰는 vcui모듈 vcui.common-ui.js로 병합...
const concatNames = [
    src + "/js/common/footer.js",
    src + "/js/common/header.js",
    src + "/js/ui/accordion.js",
    src + "/js/ui/carousel.js",
    src + "/js/ui/dropdown.js",
    src + "/js/ui/modal.js",
    src + "/js/ui/selectbox.js",
    src + "/js/ui/smoothScroll.js",
    src + "/js/ui/tab.js",
    src + "/js/ui/selectbox.js",
    src + "/js/ui/lazyLoader.js"
];
gulp.task("concat-js", () => gulp
    .src(concatNames)
    .pipe(concat("vcui.common-ui.js"))
    .pipe(gulp.dest(src + "/js"))
);

// Compile JS
gulp.task("scripts", () => {
    gulp.start(["jsCompile", "jsCompile:common", "jsCompile:components", "jsCompile:helper", "jsCompile:libs", "jsCompile:ui"]);
});
gulp.task("jsCompile", () => gulp
    .src(src + "/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/"))
);
gulp.task("jsCompile:common", () => gulp
    .src(src + "/js/common/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/common/"))
);
gulp.task("jsCompile:components", () => gulp
    .src(src + "/js/components/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/components/"))
);
gulp.task("jsCompile:helper", () => gulp
    .src(src + "/js/helper/*")
    //.pipe(sourcemaps.init())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    //.pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/helper/"))
);
gulp.task("jsCompile:libs", () => gulp
    .src(src + "/js/libs/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/libs/"))
);
gulp.task("jsCompile:ui", () => gulp
    .src(src + "/js/ui/*")
    //.pipe(sourcemaps.init())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    //.pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/ui/"))
);

// fonts, images
gulp.task("static", () => gulp
    .src("./lg5-common/**/*")
    .pipe(gulp.dest(dist + sourceFolder))
);



// dist 폴더 비움
gulp.task('clean', function() {
	return del.sync(dist);
});


// Gulp tasks
gulp.task("watch", ["browser-sync"], () => {

    // Watch html files
    gulp.watch(src + "/pages/**/*.html", ["html"]).on('change', browserSync.reload);
    
    // Watch guide files
    gulp.watch(src + '/guide/**/*.html', ["guide:html"]).on('change', browserSync.reload);
    gulp.watch(src + "/guide/guide/images/**", ["guide:images"]).on('change', browserSync.reload);
    gulp.watch(src + "/guide/guide/css/**", ["guide:css"]).on('change', browserSync.reload);
    gulp.watch(src + "/guide/guide/js/**", ["guide:js"]).on('change', browserSync.reload);
    gulp.watch(src + "/guide/data.js", ["guide:data-js"]).on('change', browserSync.reload);

    // Watch sass files
    gulp.watch(src + "/scss/**/*.scss", ["styles"]).on('change', browserSync.reload);

    // Watch js files
    gulp.watch(src + "/js/*.js", ["jsCompile"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/common/*", ["jsCompile:common"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/components/*", ["jsCompile:components"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/helper/*", ["jsCompile:helper"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/libs/*", ["jsCompile:libs"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/ui/*", ["jsCompile:ui"]).on('change', browserSync.reload);
});

// Compile sass, concat and minify css + js
gulp.task("serverBuild", ["clean", "static", "concat-js"], () =>{
    gulp.start(["styles", "scripts", "guide", "html"]);
});

gulp.task('build', function() {
    git.revParse({args:'HEAD'}, function (err, hash) {
        dist += hash;
        gulp.start('serverBuild');
    });
});




gulp.task("default", ["watch"]); // Default gulp task