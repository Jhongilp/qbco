var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./app/index.js",
    output: {
        path: __dirname,
        filename: "./dist/bundle.js"
    },
    resolve: {
        alias: {
            Inventario: path.resolve(__dirname, 'app/components/inventario.js'),
            HandleOrder: path.resolve(__dirname, 'app/components/handleOrder.js'),
            _HTML: path.resolve(__dirname, 'app/components/_HTML.js'),
            ResumenPedido: path.resolve(__dirname, 'app/components/resumenPedido.js'),
            Calcular: path.resolve(__dirname, 'app/components/calcular.js'),
            Menu: path.resolve(__dirname, 'app/components/Menu.js'),
            Qbco: path.resolve(__dirname, 'app/components/Qbco.js'),
            Bar: path.resolve(__dirname, 'app/components/Bar.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    }
};