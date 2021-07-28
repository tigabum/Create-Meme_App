const webpack = require('webpack');
const path = require('path');


module.exports = {
    context:__dirname,
    entry:{
        complete:'./src/js/complete.js',
        memes:'./src/js/memes.js'
    },
    output:{
        path:__dirname + "/dist",
        filename:'[name].js',
    },
    devServer:{
            compress:true,
            port:8080,
            hot:true,
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env', 'es2015'],
                    }
                }
            },
            {
                test:/\.(less|css)$/,
                use:[
                    {
                    loader:"style-loader"
                    },
                    {
                        loader:"css-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"less-loader",
                        options:{
                            sourceMap:true
                        }
                    }
            ]
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                limit: 10000,
                name: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                rules: [
                {
                loader: 'url-loader',
                options: {
                limit: 10000,
                name: 'images/[name].[ext]'
                }
                },
                ],
            }
        ]
    },
    devtool:'source-map',
    plugins:[
        new webpack.ProvidePlugin({
            jQuery:'jquery',
            $:'jquery',
            jquery:'jquery'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
  
}