const path = require('path');

module.exports = {
    entry: {
        "boa-common": "./src/index.ts",
        "boa-common.min": "./src/index.ts",
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        library: "common",
        umdNamedDefine: true,
    },
    node: {fs: "empty"}
};
