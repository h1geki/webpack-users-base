import  path from "path";
import  webpack from "webpack";
import  HtmlWebpackPlugin from "html-webpack-plugin";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
const config: webpack.Configuration = {
    mode:'development',
    entry: path.resolve(__dirname,'src','index.tsx'),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[contenthash].js",
        clean:true
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname,'public','index.html') }),
      new webpack.ProgressPlugin(),
    ],
    devtool:'inline-source-map',
    devServer:{
      port:3000,
      open:true
    }
    
  
}


export default config