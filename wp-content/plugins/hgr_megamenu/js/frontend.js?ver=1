/**
 * HGR MegaHeader: front end JS
 */
( function( $ ) {
	"use strict";
	$("li.hasmegamenu")
	  .mouseenter(function() {
		$( this ).find( "div.megamenu" ).fadeToggle( "fast", "swing" );
		// if map exists
		if (typeof initialize == 'function') { 
		  initialize(); 
		}
	  })
	  .mouseleave(function() {
		$( this ).find( "div.megamenu" ).fadeToggle( "fast", "swing" );
	  });
		
} )( jQuery );