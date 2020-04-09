/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Menu
4. Init Favs
5. Init SVG
6. Init Gallery
7. Init Google Map


******************************/

$(document).ready(function()
{
	"use strict";

	/* 

	1. Vars and Inits

	*/

	var map;

	setHeader();
	initMenu();
	initFavs();
	initSvg();
	initGallery();
	initGoogleMap();

	$(window).on('resize', function()
	{
		setHeader();

		setTimeout(function()
		{
			$(window).trigger('resize.px.parallax');
		}, 375);
	});

	$(document).on('scroll', function()
	{
		setHeader();
	});

	/* 

	2. Set Header

	*/

	function setHeader()
	{
		var header = $('.header');

		if($(window).scrollTop() > 91)
		{
			header.addClass('scrolled');
		}
		else
		{
			header.removeClass('scrolled');
		}
	}

	/* 

	3. Init Menu

	*/

	function initMenu()
	{
		if($('.menu').length)
		{
			var menu = $('.menu');
			var hamburger = $('.hamburger');
			var close = $('.menu_close');

			hamburger.on('click', function()
			{
				menu.toggleClass('active');
			});

			close.on('click', function()
			{
				menu.toggleClass('active');
			});
		}
	}

	/* 

	4. Init Favs

	*/

	function initFavs()
	{
		if($('.show_fav_icon').length)
		{
			var icons = $('.show_fav_icon');
			icons.each(function()
			{
				var icon = $(this);
				icon.on('click', function()
				{
					if(icon.hasClass('active'))
					{
						icon.removeClass('active');
					}
					else
					{
						icon.addClass('active');
					}
				});
			});
		}
	}

	/* 

	5. Init SVG

	*/

	function initSvg()
	{
		if($('img.svg').length)
		{
			jQuery('img.svg').each(function()
			{
				var $img = jQuery(this);
				var imgID = $img.attr('id');
				var imgClass = $img.attr('class');
				var imgURL = $img.attr('src');

				jQuery.get(imgURL, function(data)
				{
					// Get the SVG tag, ignore the rest
					var $svg = jQuery(data).find('svg');

					// Add replaced image's ID to the new SVG
					if(typeof imgID !== 'undefined') {
					$svg = $svg.attr('id', imgID);
					}
					// Add replaced image's classes to the new SVG
					if(typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass+' replaced-svg');
					}

					// Remove any invalid XML tags as per http://validator.w3.org
					$svg = $svg.removeAttr('xmlns:a');

					// Replace image with new SVG
					$img.replaceWith($svg);
				}, 'xml');
			});
		}	
	}

	/* 

	6. Init Gallery

	*/

	function initGallery()
	{
		if($('.gallery_item').length)
		{
			$('.colorbox').colorbox(
			{
				rel:'colorbox',
				photo: true,
				maxWidth:'95%',
				maxHeight:'95%'
			});
		}
	}

	/* 

	7. Init Google Map

	*/

	function initGoogleMap()
	{
		var myLatlng = new google.maps.LatLng(47.495962, 19.050966);
    	var mapOptions = 
    	{
    		center: myLatlng,
	       	zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			draggable: true,
			scrollwheel: false,
			zoomControl: true,
			zoomControlOptions:
			{
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			mapTypeControl: false,
			scaleControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: true,
			styles:
			[
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry.fill",
			    "stylers": [
			      {
			        "color": "#ffeba1"
			      }
			    ]
			  }
			]
    	}

    	// Initialize a map with options
    	map = new google.maps.Map(document.getElementById('map'), mapOptions);

		// Re-center map after window resize
		google.maps.event.addDomListener(window, 'resize', function()
		{
			setTimeout(function()
			{
				google.maps.event.trigger(map, "resize");
				map.setCenter(myLatlng);
			}, 1400);
		});
	}

});