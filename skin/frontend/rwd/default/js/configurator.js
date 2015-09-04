javascript:(function(){var s=document.createElement('script');s.setAttribute('src','https://code.jquery.com/jquery-2.1.1.min.js');s.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(s);jQuery.noConflict();})();
jQuery('head').append('<link rel="stylesheet" type="text/css" href="http://mbs-hanging-systems.com/skin/frontend/rwd/hanging/css/mana_core.css" media="all">');
function simClick(element) {
	jQuery(element).click();
}

	jQuery('.cd-slider-nav li').on('click', function(event){
		event.preventDefault();
		var selectedItem = jQuery(this);
		if(!selectedItem.hasClass('selected')) {
			// if it's not already selected
			var selectedPosition = selectedItem.index(),
				activePosition = jQuery('.cd-hero-slider .selected').index();
			if( activePosition < selectedPosition) {
				nextSlide(jQuery('.cd-hero-slider'), jQuery('.cd-slider-nav'), selectedPosition);
			} else {
				prevSlide(jQuery('.cd-hero-slider'), jQuery('.cd-slider-nav'), selectedPosition);
			}
			
			updateNavigationMarker(selectedPosition+1);
		}
	});

	jQuery(document).ready(function(){
		var slidesWrapper = jQuery('.cd-hero-slider');

		//check if a .cd-hero-slider exists in the DOM 
		if ( slidesWrapper.length > 0 ) {
			var primaryNav = jQuery('.cd-primary-nav'),
				sliderNav = jQuery('.cd-slider-nav'),
				navigationMarker = jQuery('.cd-marker'),
				slidesNumber = slidesWrapper.children('li').length,
				visibleSlidePosition = 0,
				autoPlayId,
				autoPlayDelay = 5000;

			//upload videos (if not on mobile devices)
			uploadVideo(slidesWrapper);

			//autoplay slider
			setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

			//on mobile - open/close primary navigation clicking/tapping the menu icon
			primaryNav.on('click', function(event){
				if(jQuery(event.target).is('.cd-primary-nav')) jQuery(this).children('ul').toggleClass('is-visible');
			});
			
			//change visible slide
			sliderNav.on('click', 'li', function(event){
				event.preventDefault();
				var selectedItem = jQuery(this);
				if(!selectedItem.hasClass('selected')) {
					// if it's not already selected
					var selectedPosition = selectedItem.index(),
						activePosition = slidesWrapper.find('li.selected').index();
					
					if( activePosition < selectedPosition) {
						nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
					} else {
						prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
					}

					//this is used for the autoplay
					visibleSlidePosition = selectedPosition;

					updateSliderNavigation(sliderNav, selectedPosition);
					updateNavigationMarker(navigationMarker, selectedPosition+1);
					//reset autoplay
					setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
				}
			});
		}

		function nextSlide(visibleSlide, container, pagination, n){
			visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				visibleSlide.removeClass('is-moving');
			});

			container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
			checkVideo(visibleSlide, container, n);
		}

		function prevSlide(visibleSlide, container, pagination, n){
			visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				visibleSlide.removeClass('is-moving');
			});

			container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
			checkVideo(visibleSlide, container, n);
		}

		function updateSliderNavigation(pagination, n) {
			var navigationDot = pagination.find('.selected');
			navigationDot.removeClass('selected');
			pagination.find('li').eq(n).addClass('selected');
		}

		function setAutoplay(wrapper, length, delay) {
			if(wrapper.hasClass('autoplay')) {
				clearInterval(autoPlayId);
				autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
			}
		}

		function autoplaySlider(length) {
			if( visibleSlidePosition < length - 1) {
				nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
				visibleSlidePosition +=1;
			} else {
				prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
				visibleSlidePosition = 0;
			}
			updateNavigationMarker(navigationMarker, visibleSlidePosition+1);
			updateSliderNavigation(sliderNav, visibleSlidePosition);
		}

		function uploadVideo(container) {
			container.find('.cd-bg-video-wrapper').each(function(){
				var videoWrapper = jQuery(this);
				if( videoWrapper.is(':visible') ) {
					// if visible - we are not on a mobile device 
					var	videoUrl = videoWrapper.data('video'),
						video = jQuery('<video loop><source src="'+videoUrl+'.mp4" type="video/mp4" /><source src="'+videoUrl+'.webm" type="video/webm" /></video>');
					video.appendTo(videoWrapper);
					// play video if first slide
					if(videoWrapper.parent('.cd-bg-video.selected').length > 0) video.get(0).play();
				}
			});
		}

		function checkVideo(hiddenSlide, container, n) {
			//check if a video outside the viewport is playing - if yes, pause it
			var hiddenVideo = hiddenSlide.find('video');
			if( hiddenVideo.length > 0 ) hiddenVideo.get(0).pause();

			//check if the select slide contains a video element - if yes, play the video
			var visibleVideo = container.children('li').eq(n).find('video');
			if( visibleVideo.length > 0 ) visibleVideo.get(0).play();
		}

		function updateNavigationMarker(marker, n) {
			// marker.removeClassPrefix('item').addClass('item-'+n);
		}

		$.fn.removeClassPrefix = function(prefix) {
			//remove all classes starting with 'prefix'
		    this.each(function(i, el) {
		        var classes = el.className.split(" ").filter(function(c) {
		            return c.lastIndexOf(prefix, 0) !== 0;
		        });
		        el.className = jQuery.trim(classes.join(" "));
		    });
		    return this;
		};
	});

function changeQty(qtySpan, checkSpan) {
	var qty = jQuery(qtySpan).children("input");
	var checkbox = jQuery(checkSpan).children("input");
	if(jQuery(qty).val() > 0) {
		checkbox.prop("checked", true );
		jQuery('#no-products').hide();
	} else {
		checkbox.prop("checked", false);
	}
}

function getChoice(sel, change) {
	checkboxSpanId = 'span'.concat(change);
	quantitySpanId = 'p'.concat(change);

	findSpan = '#'.concat(checkboxSpanId);
	findQty  = '#'.concat(quantitySpanId);

	var inputSelect = jQuery(findSpan).children('input');
	var quantitySelect = jQuery(findQty).children('input');

	var selected  = jQuery(sel).children('option:selected').attr('id');
	var basePrice = parseFloat(jQuery(sel).attr('data-id'));
	var priceDiff = parseFloat(jQuery(sel).children('option:selected').attr('data-id'));
	var newPrice  = parseFloat(((basePrice + priceDiff) * 100)/100).toFixed(2);
	newPrice = '$'.concat(newPrice);

	console.log(newPrice);

	priceField = '#price'.concat(change);
	priceAfter = jQuery(priceField).html(newPrice);
	console.log(priceField);
	console.log(priceAfter);

	inputSelect.attr('id',selected);
	selectedQty = 'qty'.concat(selected);
	quantitySelect.attr('id',selectedQty);

	var choiceElement = "#choice".concat(change);
	var newImage = jQuery(choiceElement.concat(" option:selected")).attr('data-image');
	jQuery(choiceElement).prev().prev().children('img').attr("src", newImage);
}

jQuery('input[type="checkbox"]').change(function() {
	console.log(this.id);
	if(this.checked) {
		findQty = '#qty'.concat(this.id);
		qtyVal = jQuery(findQty).val();
	}
});

jQuery('#finalize').on('click',function(event) {
	var products = [];
	var quantities = [];
	var products = jQuery('input:checkbox:checked').map(function () {
		// alert(this.id);
		findQty = '#qty'.concat(this.id);
		qtyVal = jQuery(findQty).val();
		quantities.push(qtyVal);
    	return this.id;
	}).get();

	quantitiesGreaterThanZero = true;
	jQuery.each(quantities, function(index,value) {
		if(value == 0) {
			quantitiesGreaterThanZero = false;
		}
	});
	if(products.length > 0 && quantitiesGreaterThanZero) {
		jQuery('#m-wait').show();
		jQuery.ajax({
			type: "POST",
			data: { productsArray   : products,
					quantitiesArray : quantities },
			url: "/configurator-addtocart",
			success: function(data) { 
	            window.location.href = '/checkout/cart/'
	        }
		});
	} else {
		if(products.length == 0) {
			jQuery('#no-products').show();
		}
	}
});