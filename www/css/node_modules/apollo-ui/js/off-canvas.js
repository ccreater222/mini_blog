var $ = window.jQuery;

var STRINGS = require( './util/strings' ).strings;
var CLASSES = require( './util/strings' ).classes;
var SELECTORS = require( './util/strings' ).selectors;

/**
 * Binds a click handler to the given jQuery object
 * @param  { Object }   $el   jQuery object which represents the element(s)
 *                            that should be bound to toggle the off-canvas menu.
 */
function bindOffCanvasToggle( $el ) {
  $el.click( function() {
    var targetString = $( this ).data( STRINGS.target );
    var $target = $( targetString );

    $target.toggleClass( CLASSES.open );

    return false;
  });
}

module.exports.init = function() {
  var $offCanvasToggle = $( SELECTORS.offCanvasToggle );

  bindOffCanvasToggle( $offCanvasToggle );
};
