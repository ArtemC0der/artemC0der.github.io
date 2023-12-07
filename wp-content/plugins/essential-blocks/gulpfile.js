const { src, dest, series } = require("gulp");
const zip = require("gulp-zip");
const clean = require("gulp-clean");
const run = require("gulp-run");

const ignoreFiles = [
	"!bin/**",
	"!node_modules/**/*.*",
	"!tests/**",

	// // Ignore util except "update-category-icon"
	// "!util/dimensions-control/**",
	// "!util/gradient-color-controller/**",
	// "!util/image-avatar/**",
	// "!util/modal/**",
	// "!util/social-profiles/**",
	// "!util/static-icon/**",
	// "!util/typography-control/**",
	// "!util/unit-control/**",
	// "!util/add-export-icon.js",
	// "!util/cloud-export.js",
	// "!util/update-category-icon/update-category-icon.js",
	// "!util/custom-layouts.json",
	// "!util/faIcons.js",
	// "!util/icons.js",
	// "!util/injectEBLogo.js",
	// "!util/uuid.js",
	// "!util/color-control/",
	"!util/**",
	"!blocks/*/src/**",
	"!.gitignore",
	"!.git",
	"!.DS_Store",
	"!.eslintrc.json",
	"!package-lock.json",
	"!package.json",
	"!yarn.lock",
	"!README.md",
	"!gulpfile.js",
	"!Gruntfile.js",
	"!phpunit.xml.dist",
	"!webpack.config.js",
	"!webpack.dev.js",
];

function cleanBuild() {
	return src("./build", { read: false, allowEmpty: true }).pipe(clean());
}

function buildJS() {
	return run("npm run build").exec();
}

function makeBuild() {
	return src(["./**/*.*", ...ignoreFiles]).pipe(dest("build/essential-blocks"));
}

function makeZip() {
	return src("./build/**").pipe(zip("essential-blocks.zip")).pipe(dest("../"));
}

exports.default = series(cleanBuild, buildJS, makeBuild, makeZip, cleanBuild);
