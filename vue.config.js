module.exports = {
    lintOnSave: false,

    devServer: {
        proxy: {
            '/api': {
                target: 'https://owaf.io',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/socket': {
                target: 'wss://owaf.io',
                ws: true,
                changeOrigin: true,
                headers: {
                    "host": "https://owaf.io",
                    "Origin": "https://owaf.io"
                }
            }
        },
    }
}
