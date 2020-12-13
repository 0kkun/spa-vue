const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css');

mix.browserSync('spa-vue.test')
    .js('resources/js/app.js', 'public/js')
    .version()

// BrowserSync というツールを組み合わせて、JavaScript や PHP ファイルが変更されたときに自動的にブラウザがリロードされるようになります。
mix.browserSync({
    proxy: '0.0.0.0:8000', // アプリの起動アドレス
    open: false // ブラウザを自動で開かない
})