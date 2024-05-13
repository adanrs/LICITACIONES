const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    target: 'node',  // Importante: compila para uso en entornos Node.js
    entry: './server.js',  // Punto de entrada de tu aplicación, asegúrate de que la ruta es correcta
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.bundle.js'
    },
    externals: [nodeExternals()],  // Excluye node_modules
    module: {
        rules: [
            {
                test: /\.js$/,  // Transpila archivos .js
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',  // Usa Babel para transpilar
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    
    optimization: {
        minimize: true,  // Habilita la minimización
        minimizer: [new TerserPlugin()]  // Usa Terser para optimizar el output
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
};
