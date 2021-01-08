/*!
 * Apollo JS v0.3.0
 */

///
/// Bootstrap jQuery Plugins
///

require( '../node_modules/bootstrap/dist/js/umd/util' );
require( '../node_modules/bootstrap/dist/js/umd/alert' );
require( '../node_modules/bootstrap/dist/js/umd/carousel' );
require( '../node_modules/bootstrap/dist/js/umd/collapse' );
require( '../node_modules/bootstrap/dist/js/umd/dropdown' );
require( '../node_modules/bootstrap/dist/js/umd/modal' );
require( '../node_modules/bootstrap/dist/js/umd/tab' );


///
/// Custom scripts
///

var offCanvas = require( './off-canvas' );

$( document ).ready( function() {
  offCanvas.init();
});