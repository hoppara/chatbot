
/*--------------------------------------------------------------
	
	Script Name : Overlay Zoom Box
	Author : FIRSTSTEP - Motohiro Tani
	Author URL : https://www.1-firststep.com
	Create Date : 2014/02/05
	Version : 1.0
	Last Update : 2018/11/14
	
--------------------------------------------------------------*/


(function( $ ) {
	
	// function zoom_click
	function zoom_click() {
		
		if ( navigator.userAgent.indexOf( 'iPhone' ) !== -1 || navigator.userAgent.indexOf( 'iPad' ) !== -1 || navigator.userAgent.indexOf( 'iPod' ) !== -1 || navigator.userAgent.indexOf( 'Android' )!== -1 ){
			return;
		}
		
		
		var element = $( this );
		
		if ( ! element.find( 'img' ).width() ) {
			return;
		}
		
		
		var screen_w    = $( window ).width();
		var screen_h    = $( window ).height();
		var thumbnail_w = element.find( 'img' ).width();
		var thumbnail_h = element.find( 'img' ).height();
		var thumbnail_x = element.find( 'img' ).offset().left;
		var thumbnail_y = element.find( 'img' ).offset().top;
		
		
		if ( element.css( 'position' ) !== 'absolute' || element.css( 'position' ) !== 'fixed' ) {
			element.css( 'position', 'relative' );
		}
		
		//element.css( 'display', 'inline-block' );
		
		$( '<span></span>' )
			.appendTo( element )
			.attr( 'class', 'loading-bg' )
			.css({
				'display': 'block',
				'width': thumbnail_w + 'px',
				'height': thumbnail_h + 'px',
				'position': 'absolute',
				'top': '0px',
				'left': '0px',
				'z-index': '10',
				'background': 'rgba( 255, 255, 255, 0.5 )'
			})
			.html( '<span class="loading"></span>' );
		
		$( '<img />' )
			.appendTo( 'body' )
			.attr( 'class', 'big-image' )
			.attr( 'src', element.attr( 'href' ) )
			.css( 'display', 'none' )
			.load(function() {
				
				var big_w    = $( this ).width();
				var big_h    = $( this ).height();
				var scroll_y = $( window ).scrollTop();
				
				if ( big_w > screen_w * 0.8 || big_h > screen_h * 0.8 ) {
					var ratio_w = screen_w / big_w;
					var ratio_h = screen_h / big_h;
					var ratio   = Math.min( ratio_w, ratio_h );
					big_w       = Math.floor( big_w * ratio * 0.9 );
					big_h       = Math.floor( big_h * ratio * 0.9 );
				}
				
				$( this )
					.css({
						'display': 'block',
						'width': thumbnail_w + 'px',
						'height': thumbnail_h + 'px',
						'position': 'fixed',
						'top': thumbnail_y - scroll_y + 'px',
						'left': thumbnail_x + 'px',
						'z-index': '100'
					})
					.animate({
						'width': big_w + 'px',
						'height': big_h + 'px',
						'top': '50%',
						'left': '50%',
						'marginTop': - big_h / 2 + 'px',
						'marginLeft': - big_w / 2 + 'px'
					}, 400 )
					.before( '<div class="gray-layer"></div>' );
				
				$( '.gray-layer' )
					.css({
						'width': '100%',
						'height': screen_h + 'px',
						'background': '#000000',
						'opacity': '0',
						'position': 'fixed',
						'top': '0px',
						'left': '0px',
						'z-index': '99'
					})
					.animate({
						'opacity': '0.75'
					}, 400 )
					.on( 'click', function() {
						var re_thumbnail_x = element.find( 'img' ).offset().left;
						var re_thumbnail_y = element.find( 'img' ).offset().top;
						var re_scroll_y    = $( window ).scrollTop();
						
						$( '.big-image' )
							.animate({
								'width': thumbnail_w + 'px',
								'height': thumbnail_h + 'px',
								'top': re_thumbnail_y - re_scroll_y + 'px',
								'left': re_thumbnail_x + 'px',
								'marginTop': '0px',
								'marginLeft': '0px'
							}, 400, '', function() {
								$( '.gray-layer, .big-image' ).fadeOut( 500, function() {
									$( this ).remove();
								});
							});
					});
					
				$( '.loading-bg' ).remove();
				
			});
		
		return false;
		
	}
	
	$( 'a.overlay-zoombox' ).on( 'click', zoom_click );
	
})( jQuery );