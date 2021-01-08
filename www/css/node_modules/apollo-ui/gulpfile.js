///
/// Dependencies
///

var gulp          = require( 'gulp' );
var del           = require( 'del' );
var rename        = require( 'gulp-rename' );
var insert        = require( 'gulp-insert' );
var browserSync   = require( 'browser-sync' );
var webpack       = require( 'webpack-stream' );
var uglify        = require( 'gulp-uglify' );
var sass          = require( 'gulp-sass' );
var postcss       = require( 'gulp-postcss' );
var autoprefixer  = require( 'autoprefixer' );
var cssnano       = require( 'cssnano' );
var theo          = require( 'theo' );


///
/// Local variables
///

var strings = {
  VERSION: '/*! Apollo JS v0.3.0 */'
};

var path = {
  SCSS_SRC_ALL: 'scss/**/*.scss',
  SCSS_SRC_MAIN: 'scss/apollo.scss',
  DOCS_SCSS_SRC_ALL: 'docs/_scss/**/*.scss',
  DOCS_SCSS_SRC_MAIN: 'docs/_scss/docs.scss',
  CSS_DEST: 'dist/css/',
  JS_SRC_ALL: 'js/**/*.js',
  JS_SRC_MAIN: 'js/apollo.js',
  JS_DEST: 'dist/js/',
  DOCS_PAGE_SRC_ALL: 'docs/**/*.html'
};


///
/// Development server
///

gulp.task( 'server', function() {
  browserSync.init({
    server: 'dist',
    ghostMode: false
  });
});


///
/// Watch files
///

gulp.task( 'watch', function() {
  gulp.watch( path.SCSS_SRC_ALL, [ 'apollo-styles' ]);
  gulp.watch( path.JS_SRC_ALL, [ 'apollo-scripts' ]);
  gulp.watch( path.DOCS_PAGE_SRC_ALL, [ 'docs' ] );
  gulp.watch( path.DOCS_SCSS_SRC_ALL, [ 'docs-styles' ]);
})


///
/// JS bundler
///

///
/// TODO: Figure out what to do with webpack [hash]
/// for bundle
///

gulp.task( 'apollo-scripts', function() {
  gulp.src( path.JS_SRC_MAIN )
    .pipe( webpack({
      output: {
        filename: 'apollo.js'
      }
    }))
    .pipe( gulp.dest( path.JS_DEST ))
    .pipe( uglify() )
    .pipe( insert.prepend( strings.VERSION ))
    .pipe( rename({
      suffix: '.min'
    }))
    .pipe( gulp.dest( path.JS_DEST ))
    .pipe( browserSync.stream() );
});

///
/// SCSS compilation
///

gulp.task( 'apollo-styles', function () {
  gulp.src( path.SCSS_SRC_MAIN )
    .pipe( sass({
        includePaths: [ 'node_modules' ],
        outputStyle: 'expanded'  // expanded for development
      })
      .on( 'error', sass.logError ))
    .pipe( postcss([
      autoprefixer({
        browsers: [ 'last 2 versions' ]
      })
    ]))
    .pipe( gulp.dest( path.CSS_DEST ))
    .pipe( browserSync.stream() )
    .pipe( postcss([ cssnano() ]))
    .pipe( rename({
      suffix: '.min'
    }))
    .pipe( gulp.dest( path.CSS_DEST ))
    .pipe( browserSync.stream() );
});

gulp.task( 'docs-styles', function () {
  gulp.src( path.DOCS_SCSS_SRC_MAIN )
    .pipe( sass({
        includePaths: [ 'node_modules' ],
        outputStyle: 'expanded'  // expanded for development
      })
      .on( 'error', sass.logError ))
    .pipe( postcss([
      autoprefixer({
        browsers: [ 'last 2 versions' ]
      })
    ]))
    .pipe( gulp.dest( path.CSS_DEST ))
    .pipe( browserSync.stream() );
});


///
/// Documentation static site generator
///

gulp.task( 'docs', [ 'jekyll' ], function() {
  gulp.src( 'docs-temp/**/*.html' )
    .pipe( gulp.dest( 'dist' ) )
    .pipe( browserSync.stream() );
});


gulp.task( 'jekyll', function ( gulpCallBack ) {
  var exec = require( 'child_process' ).exec;

  exec( 'jekyll build', function( err, stdout, stderr ) {
    console.log( stdout );
    console.error( stderr );
    gulpCallBack( err );
  });
});


///
/// Theo transformations
///

gulp.task( 'clean:theo', function() {
  return del([
    'scss/_props/*.scss',
    'docs/_data/*.json'
  ]);
});

gulp.task( 'theo-colors-scss', [ 'clean:theo' ], function() {
  gulp.src( 'theo/_palette.json')
    .pipe( theo.plugins.transform( 'web' ))
    .pipe( theo.plugins.format( 'scss' ))
    .pipe( gulp.dest( 'scss/_props' ));
});

gulp.task( 'theo-colors-scss-map', [ 'clean:theo' ], function() {
  gulp.src( 'theo/_palette.json')
    .pipe( theo.plugins.transform( 'web' ))
    .pipe( theo.plugins.format( 'map.scss' ))
    .pipe( gulp.dest( 'scss/_props' ));
});

gulp.task( 'theo-colors-json', [ 'clean:theo' ], function() {
  gulp.src( 'theo/_palette.json')
    .pipe( theo.plugins.transform( 'web' ))
    .pipe( theo.plugins.format( 'json' ))
    .pipe( gulp.dest( 'docs/_data' ));
});

gulp.task( 'theo-icons-scss', [ 'clean:theo' ], function() {
  gulp.src( 'theo/_icons.json')
    .pipe( theo.plugins.transform( 'raw' ))
    .pipe( theo.plugins.format( 'map.scss' ))
    .pipe( gulp.dest( 'scss/_props' ));
});

gulp.task( 'theo-icons-json', [ 'clean:theo' ], function() {
  gulp.src( 'theo/_icons.json')
    .pipe( theo.plugins.transform( 'raw' ))
    .pipe( theo.plugins.format( 'json' ))
    .pipe( gulp.dest( 'docs/_data' ));
});


///
/// Conglomerate tasks
///

gulp.task( 'theo', [ 'clean:theo', 'theo-colors-scss', 'theo-colors-scss-map', 'theo-colors-json', 'theo-icons-scss', 'theo-icons-json' ]);
gulp.task( 'default', [ 'apollo-styles', 'apollo-scripts', 'docs-styles', 'docs' ]);
gulp.task( 'serve', [ 'default', 'server', 'watch' ]);
