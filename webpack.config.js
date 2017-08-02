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
            Inventario: path.resolve(__dirname, 'app/components/main/inventario.js'),
            HandleOrder: path.resolve(__dirname, 'app/components/qbco/handleOrder.js'),
            _HTML: path.resolve(__dirname, 'app/components/main/_HTML.js'),
            ResumenPedido: path.resolve(__dirname, 'app/components/qbco/resumenPedido.js'),
            Calcular: path.resolve(__dirname, 'app/components/qbco/calcular.js'),
            Menu: path.resolve(__dirname, 'app/components/main/Menu.js'),
            Qbco: path.resolve(__dirname, 'app/components/qbco/Qbco.js'),
            Product: path.resolve(__dirname, 'app/components/producto/Products.js'),
            Bar: path.resolve(__dirname, 'app/components/main/Bar.js')
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