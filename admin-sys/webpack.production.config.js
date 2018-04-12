const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = {
	
	devtool:"null",
	entry:__dirname + "/app/main.js",
	output:{
		
		path:__dirname+ "/build",
		filename:"bundle-[hash].js"
		
	},
	devServer:{
		
		contentBase:'./public',
		historyApiFallback:true,
		inline:true
		
	},
	module:{
		
		rules:[
			{
				test: /(\.jsx|\.js)$/,
				use:{
					loader:"babel-loader"
				},
				exclude:/node_modules/
			
			},
			{
				test: /(\.css)$/,
				use:[
					{
						loader:"style-loader"						
					},{						
						loader:"css-loader",
						options:{
							modules:true,
							localIdentName:'[name]__[local]--[hash:base64:5]'
						}
					},{
						
						loader:"postcss-loader"
						
					}
				]
			}
		
		]
		
	},
	plugins:[
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({			
			template:__dirname + "/app/index.tmpl.html"
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new UglifyJsPlugin(),
		new CleanWebpackPlugin('build/*.*', {
			root: __dirname,
			verbose: true,
			dry: false
		})
		
	]
	
}