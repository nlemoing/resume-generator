const path = require('path');

module.exports = {
    entry: {
        bike: "./src/biking/nyc-bike.js",
    },
    output: {
        path: path.resolve(__dirname, "static/scripts"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};