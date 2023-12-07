const fs = require("fs");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ESBuildPlugin } = require("esbuild-loader");

// Generates seperate entry points for blocks folder
const entries = {};

const isDir = (fileName) => fs.lstatSync(fileName).isDirectory();
const isFile = (fileName) => fs.lstatSync(fileName).isFile();

const blocksFolder = __dirname + "/blocks";

function getEntries(blocksFolder) {
	const isDirExists = fs.existsSync(blocksFolder) && isDir(blocksFolder);

	if (isDirExists) {
		let srcIndex = "/src/index.js";

		fs.readdirSync(blocksFolder).map((fileName) => {
			const validBlock =
				isDir(path.join(blocksFolder, fileName)) &&
				isFile(path.join(blocksFolder, fileName + srcIndex));

			if (validBlock) {
				let key = `blocks/${fileName}`;
				entries[key] = `./${key}${srcIndex}`;
			}
		});
		return entries;
	}
}

let blockEntries = getEntries(blocksFolder);
let allEntries = {
	...blockEntries,
	"lib/update-category-icon":
		"./lib/update-category-icon/update-category-icon.js",
	"admin/": "./admin/src/index.js",
	"admin/editor-css/": "./util/backend-css.js",
};

module.exports = {
	entry: allEntries,
	mode: "development",
	output: {
		path: path.resolve(__dirname),
		filename: "[name]/index.js",
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	plugins: [
		new ESBuildPlugin(),
		new MiniCssExtractPlugin({
			filename: "[name]/style.css",
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: "esbuild-loader",
				options: {
					loader: "jsx",
					target: "es2015",
				},
			},
			// {
			// 	test: /\.(js|jsx)$/,
			// 	exclude: /node_modules/,
			// 	use: {
			// 		loader: "babel-loader",
			// 		options: {
			// 			presets: [
			// 				"@babel/preset-env",
			// 				"@babel/react",
			// 				{
			// 					plugins: ["@babel/plugin-proposal-class-properties"],
			// 				},
			// 			],
			// 		},
			// 	},
			// },
			{
				test: /\.css$/i,
				use: ["css-loader"],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ["css-loader", "sass-loader"],
			},
			{
				test: /\.svg/,
				use: {
					loader: "svg-url-loader",
					options: {},
				},
			},
		],
	},
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
};
