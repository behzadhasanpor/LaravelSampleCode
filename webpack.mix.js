let mix = require('laravel-mix');

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

mix.scripts([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/dropzone/dist/dropzone.js'
    ], 'public/metroJs/app.js')
    .sass('resources/assets/sass/app.scss', 'public/metroCss')
    .scripts([
        'node_modules/dropzone/dist/basic.css',
        'node_modules/dropzone/dist/dropzone.css'
    ],'public/metroCss/dropzone.css');
