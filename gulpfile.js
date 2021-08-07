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
    del = require('del'),
    terser = require('gulp-terser'),
    fs = require('fs');

var src = "./src";
var dist = './dist';
var sourceFolder = "/lg5-common";

// Loads BrowserSync
gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: dist
        },
        port: 3010,
        startPath: "./",
        middleware: [
            function(req, res, next) {
                if (/\.json|\.txt|\.html/.test(req.url) && req.method.toUpperCase() == 'POST') {
                    // console.log('[POST => GET] : ' + req.url);
                    req.method = 'GET';
                }
                next();
            },
            // BTOCSITE-27 swipe 테스트용 
            function(req, res, next){
                let lastseq = req.url == '/' ? '/' : req.url.split('/').pop();
                
                switch(lastseq) {
                    case '/' :
                    case 'story' :
                    case 'store' :
                    case 'support' :
                    case 'care-solutions' :
                    case 'membership-event' : // BTOCSITE-1814 이벤트탭 추가
                        if (req.url !== '/guide' && req.url !== '/guide/'){
                            //res.setHeader('Content-Type', 'text/html');
                            res.end(fs.readFileSync(dist + '/html/MA/MKTF1000_TEST.html'));
                        }
                    break;
                }
                next();
            }
        ]
    });
});


// html 파일 생성...
gulp.task('html', () => gulp
    .src([src + '/pages/**/*', "!" + src + "/pages/common", "!" + src + '/pages/common/**'], { base: src + '/pages/' })
    .pipe(fileinclude({
        prefix: '@@',
        basepath: src + '/pages/'
    }))
    .pipe(gulp.dest(dist + '/html/'))
    .pipe(browserSync.reload({ stream : true }))

);

//guide page 파일생성...
gulp.task('guide', ["guide:html", "guide:images", "guide:css", "guide:js", "guide:data-js"]);
gulp.task('guide:html', () => gulp
    .src(src + '/guide/**/*.html', { base: src + '/guide/' })
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(gulp.dest(dist + '/guide/'))
    .pipe(browserSync.reload({ stream : true }))
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
    outputStyle: "expanded",
    indentType: "tab",
    indentWidth: 1,
    precision: 6,
    sourceComments: false
};
// Compile Sass
gulp.task("styles", () => gulp
    .src(src + "/scss/**/*.scss")
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(dist + sourceFolder + "/css/"))
    .pipe(browserSync.reload({ stream: true }))
);
gulp.task("styles:server", () => gulp
    .src(src + "/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/css/"))
);


//자주 쓰는 vcui모듈 vcui.common-ui.js로 병합...
const concatNames = [
    src + "/js/common/footer.js",
    src + "/js/common/header.js",
    src + "/js/helper/gesture.js",
    src + "/js/helper/breakpointDispatcher.js",
    src + "/js/helper/sharer.js",
    src + "/js/ui/accordion.js",
    src + "/js/ui/carousel.js",
    src + "/js/ui/toggleCarousel.js",
    src + "/js/ui/dropdown.js",
    src + "/js/ui/modal.js",
    src + "/js/ui/selectbox.js",
    src + "/js/ui/tab.js",
    src + "/js/ui/scrollNavi.js",
    src + "/js/ui/smoothScroll.js",
    src + "/js/ui/smoothScrollTab.js",
    src + "/js/ui/lazyLoader.js",
    src + "/js/ui/imageSwitch.js",
    src + "/js/ui/lazyLoaderSwitch.js",
    src + "/js/ui/pinchZoom.js",
    src + "/js/ui/calendar.js",
    src + "/js/ui/videoBox.js",
    src + "/js/ui/youtubeBox.js",
    src + "/js/ui/textControl.js",
    src + "/js/ui/fileInput.js",
    src + "/js/ui/radioShowHide.js",
    src + "/js/ui/inputClearButton.js",
    src + "/js/ui/starRating.js",
    src + "/js/ui/tooltipTarget.js",
    src + "/js/ui/sticky.js",
    src + "/js/ui/formatter.js",
    src + "/js/ui/toast.js",
    src + "/js/ui/spinner.js",
    src + "/js/ui/imageFileInput.js",
    src + "/js/ui/checkboxAllChecker.js"
];
gulp.task("concat-js", () => gulp
    .src(concatNames)
    .pipe(concat("vcui.common-ui.js"))
    .pipe(gulp.dest(src + "/js"))
);

// Compile JS
gulp.task("scripts", () => {
    gulp.start(["jsCompile",
        "jsCompile:common",
        "jsCompile:components",
        "jsCompile:support",
        "jsCompile:helper",
        "jsCompile:libs",
        "jsCompile:ui",
        "jsCompile:mypage",
        "jsCompile:cart",
        "jsCompile:customer",
        "jsCompile:search",
        "jsCompile:caresolution",
        "jsCompile:store",
        "jsCompile:membership",
        "jsCompile:homebrew",
        "jsCompile:event",
        "jsCompile:home",
        "jsCompile:objet"
    ]);
});
gulp.task("jsCompile", () => gulp
    .src(src + "/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/"))
);
gulp.task("jsCompile:common", () => gulp
    .src(src + "/js/common/*")
    //.pipe(sourcemaps.init())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    //.pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/common/"))
);
gulp.task("jsCompile:components", () => gulp
    .src(src + "/js/components/*")
    .pipe(sourcemaps.init())
    .pipe(terser())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/components/"))
);
gulp.task("jsCompile:support", () => gulp
    .src(src + "/js/support/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["**/*.js", "**/!*.min.js"], uglify()))
    .pipe(gulpif(["**/*.js", "**/!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/support/"))
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
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
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
gulp.task("jsCompile:mypage", () => gulp
    .src(src + "/js/mypage/**/*")
    .pipe(sourcemaps.init())
    .pipe(terser())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/mypage/"))
);
gulp.task("jsCompile:cart", () => gulp
    .src(src + "/js/cart/**/*")
    //.pipe(sourcemaps.init())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    //.pipe(gulpif(["*.js", "!*.min.js"], rename({suffix: ".min"})))
    //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/cart/"))
);
gulp.task("jsCompile:customer", () => gulp
    .src(src + "/js/customer/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/customer/"))
);
gulp.task("jsCompile:search", () => gulp
    .src(src + "/js/search/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/search/"))
);
gulp.task("jsCompile:caresolution", () => gulp
    .src(src + "/js/caresolution/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/caresolution/"))
);
gulp.task("jsCompile:store", () => gulp
    .src(src + "/js/store/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/store/"))
);
gulp.task("jsCompile:membership", () => gulp
    .src(src + "/js/membership/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/membership/"))
);
gulp.task("jsCompile:homebrew", () => gulp
    .src(src + "/js/homebrew/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/homebrew/"))
);
gulp.task("jsCompile:event", () => gulp
    .src(src + "/js/event/**/*")
    .pipe(sourcemaps.init())
    .pipe(terser())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/event/"))
);
gulp.task("jsCompile:home", () => gulp
    .src(src + "/js/home/**/*")
    .pipe(sourcemaps.init())
    .pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/home/"))
);
gulp.task("jsCompile:objet", () => gulp
    .src(src + "/js/objet/**/*")
    .pipe(sourcemaps.init())
    .pipe(terser())
    //.pipe(gulpif(["*.js", "!*.min.js"], uglify()))
    .pipe(gulpif(["*.js", "!*.min.js"], rename({ suffix: ".min" })))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist + sourceFolder + "/js/objet/"))
);

// fonts, images
gulp.task("static", () => {
    gulp.start(["static:data-ajax", "static:fonts", "static:images", "static:template", "static:videos", "static:pcsvc", "static:temp_OBJ", "static:event", "static:front"]);
});
gulp.task("static:data-ajax", () => gulp
    .src("./lg5-common/data-ajax/**")
    .pipe(gulp.dest(dist + sourceFolder + "/data-ajax/"))
);
gulp.task("static:fonts", () => gulp
    .src("./lg5-common/fonts/**")
    .pipe(gulp.dest(dist + sourceFolder + "/fonts/"))
);
gulp.task("static:images", () => gulp
    .src("./lg5-common/images/**")
    .pipe(gulp.dest(dist + sourceFolder + "/images/"))
);
gulp.task("static:template", () => gulp
    .src("./lg5-common/template/**")
    .pipe(gulp.dest(dist + sourceFolder + "/template/"))
);
gulp.task("static:videos", () => gulp
    .src("./lg5-common/videos/**")
    .pipe(gulp.dest(dist + sourceFolder + "/videos/"))
);
gulp.task("static:pcsvc", () => gulp
    .src("./lg5-common/pcsvc/**")
    .pipe(gulp.dest(dist + sourceFolder + "/pcsvc/"))
);
gulp.task("static:temp_OBJ", () => gulp
    .src("./lg5-common/temp_OBJ/**")
    .pipe(gulp.dest(dist + sourceFolder + "/temp_OBJ/"))
);
gulp.task("static:event", () => gulp
    .src("./lg5-common/event/**")
    .pipe(gulp.dest(dist + sourceFolder + "/event/"))
);
gulp.task("static:front", () => gulp
    .src("./lg5-common/front/**")
    .pipe(gulp.dest(dist + sourceFolder + "/front/"))
);



// dist 폴더 비움
gulp.task('clean', function() {
    return del.sync("./dist");
});




// Gulp tasks
gulp.task("watch", ["browser-sync"], () => {

    // Watch html files
    gulp.watch(src + "/pages/**/*.html", ["html"]);
    gulp.watch(src + "/pages/**/**/*.html", ["html"]);

    // Watch guide files
    gulp.watch(src + '/guide/**/*.html', ["guide:html"]);
    gulp.watch(src + "/guide/guide/images/**", ["guide:images"]).on('change', browserSync.reload);
    gulp.watch(src + "/guide/guide/css/**", ["guide:css"]).on('change', browserSync.reload);
    gulp.watch(src + "/guide/guide/js/**", ["guide:js"]).on('change', browserSync.reload);
    gulp.watch(src + "/guide/data.js", ["guide:data-js"]).on('change', browserSync.reload);

    // Watch sass files
    gulp.watch(src + "/scss/**", ["styles"]);

    // Watch js files
    gulp.watch(src + "/js/*.js", ["jsCompile"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/common/**", ["jsCompile:common"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/components/**", ["jsCompile:components"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/support/**/*", ["jsCompile:support"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/helper/**", ["jsCompile:helper"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/libs/**", ["jsCompile:libs"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/ui/**", ["jsCompile:ui"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/mypage/**", ["jsCompile:mypage"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/cart/**", ["jsCompile:cart"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/customer/**", ["jsCompile:customer"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/search/**", ["jsCompile:search"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/caresolution/**", ["jsCompile:caresolution"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/store/**", ["jsCompile:store"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/membership/**", ["jsCompile:membership"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/homebrew/**", ["jsCompile:homebrew"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/event/**", ["jsCompile:event"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/home/**", ["jsCompile:home"]).on('change', browserSync.reload);
    gulp.watch(src + "/js/objet/**", ["jsCompile:objet"]).on('change', browserSync.reload);

    //static
    gulp.watch("./lg5-common/data-ajax/**", ["static:data-ajax"]).on('change', browserSync.reload);
    gulp.watch("./lg5-common/fonts/**", ["static:fonts"]).on('change', browserSync.reload);
    //gulp.watch("./lg5-common/images/**", ["static:images"]).on('change', browserSync.reload);
    gulp.watch("./lg5-common/template/**", ["static:template"]).on('change', browserSync.reload);
    gulp.watch("./lg5-common/videos/**", ["static:videos"]).on('change', browserSync.reload);
});

// Compile sass, concat and minify css + js
gulp.task("build", ["clean", "static"], () => {
    gulp.start(["styles", "scripts", "guide", "html"]);
});
gulp.task("build:server", ["clean", "static"], () => {
    gulp.start(["styles:server", "scripts", "guide", "html"]);
});

gulp.task('server-build', ["concat-js"], function() {
    git.revParse({ args: 'HEAD' }, function(err, hash) {
        dist += ("/" + hash);
        gulp.start('build:server');
    });
});


gulp.task("default", ["watch"]); // Default gulp task