/* placeholder */
function placeholderInit(){
	$('[placeholder]').placeholder();
}
/* placeholder end */

var md = new MobileDetect(window.navigator.userAgent);

/* multiselect init */
// add ui position add class
function addPositionClass(position, feedback, obj){
	removePositionClass(obj);
	obj.css( position );
	obj
		.addClass( feedback.vertical )
		.addClass( feedback.horizontal );
}
// add ui position remove class
function removePositionClass(obj){
	obj.removeClass('top');
	obj.removeClass('bottom');
	obj.removeClass('center');
	obj.removeClass('left');
	obj.removeClass('right');
}
function customSelect(select){
	if ( select.length ) {
		selectArray = new Array();
		select.each(function(selectIndex, selectItem){
			var placeholderText = $(selectItem).attr('data-placeholder');
			var flag = true;
			if ( placeholderText === undefined ) {
				placeholderText = $(selectItem).find(':selected').html();
				flag = false;
			}
			var classes = $(selectItem).attr('class');
			selectArray[selectIndex] = $(selectItem).multiselect({
				header: false,
				height: 'auto',
				minWidth: 50,
				selectedList: 1,
				classes: classes,
				multiple: false,
				noneSelectedText: placeholderText,
				show: ['fade', 100],
				hide: ['fade', 100],
				create: function(event){
					var button = $(this).multiselect('getButton');
					var widget = $(this).multiselect('widget');
					button.wrapInner('<span class="select-inner"></span>');
					button.find('.ui-icon').append('<i class="arrow-select"></i>')
						.siblings('span').addClass('select-text');
					widget.find('.ui-multiselect-checkboxes li:last')
						.addClass('last')
						.siblings().removeClass('last');
					if ( flag ) {
						$(selectItem).multiselect('uncheckAll');
						$(selectItem)
							.multiselect('widget')
							.find('.ui-state-active')
							.removeClass('ui-state-active')
							.find('input')
							.removeAttr('checked');
					}
				},
				selectedText: function(number, total, checked){
					var checkedText = checked[0].title;
					return checkedText;
				},
				position: {
					my: 'left top',
					at: 'left bottom',
					using: function( position, feedback ) {
						addPositionClass(position, feedback, $(this));
					}
				}
			});
		});
		$(window).resize(selectResize);
	}
}
function selectResize(){
	if ( selectArray.length ) {
		$.each(selectArray, function(i, el){
			var checked = $(el).multiselect('getChecked');
			var flag = true;
			if ( !checked.length ) {
				flag = false
			}
			$(el).multiselect('refresh');
			if ( !flag ) {
				$(el).multiselect('uncheckAll');
				$(el)
					.multiselect('widget')
					.find('.ui-state-active')
					.removeClass('ui-state-active')
					.find('input')
					.removeAttr('checked');
			}
			$(el).multiselect('close');
		});
	}
}
/* multiselect init end */

/*showInput */
function showInput(){
	var searchForm = $('.search-form__header');
	if(!searchForm.length){ return; }
	$('body').on('click', '.switcher-form-js', function(e){
		var $currentBtnOpen = $(this);
		var $currentWrap = $currentBtnOpen.closest('.header');
		var $searchForm = $currentWrap.find('.search-form__header');
		if ($searchForm.is(':visible')) {
			closeSearchForm($searchForm);
			return;
		}

		var dur = 300;
		$searchForm
			.stop()
			.slideDown(dur, function(){
				$searchForm.find('input[type="search"], input[type="text"]').val('');
				$searchForm.find('input[type="search"], input[type="text"]').trigger('focus');
				$currentWrap.addClass('form-opened')
			});
		function closeSearchForm(form){
			form.stop().slideUp(dur);
			form.closest('.header').removeClass('form-opened')
		}
	});
}
/*showInput end*/

/*custom scroll init*/
function customScrollInit(){
	/*main navigation*/
	if($('.panel-frame').length){
		$('.panel-frame, .drop-visible__holder').mCustomScrollbar({
			//axis:"x",
			theme:"minimal-dark",
			scrollbarPosition: "inside",
			autoExpandScrollbar:true
		});
	}
	/*main navigation end*/

	/*produce thumbs*/
	/*var $produceThumbs = $(".produce-thumbs");
	if($produceThumbs.length){
		$produceThumbs.mCustomScrollbar({
			axis:"x",
			//theme:"dark",
			scrollbarPosition: "inside",
			//autoExpandScrollbar:true,
			advanced:{autoExpandHorizontalScroll:true},
			snapAmount:156,
			keyboard:{scrollAmount:156},
			mouseWheel:{ deltaFactor:156},
			scrollInertia:400
		});
	}*/
	/*produce thumbs end*/

	/*products thumbs*/
	var $prodThumbs = $(".prod-thumbs");
	if($prodThumbs.length){
		$prodThumbs.mCustomScrollbar({
			axis:"x",
			scrollbarPosition: "inside",
			advanced:{autoExpandHorizontalScroll:true},
			mouseWheel:{
				enable: false
			},
			scrollInertia:500
		});
	}
	/*products thumbs end*/

	/*produce minimal*/
	var $produceMinimal = $(".produce-minimal");
	if($produceMinimal.length){
		$produceMinimal.mCustomScrollbar({
			theme:"minimal-dark",
			scrollbarPosition: "inside",
			autoExpandScrollbar:true
		});
	}
	/*produce minimal end*/

	/*produce full*/
	var $produceFull = $('.location-info__holder, .produce-full-holder');
	if($produceFull.length){
		$produceFull.mCustomScrollbar({
			//axis:"x",
			theme:"minimal-dark",
			scrollbarPosition: "inside",
			autoExpandScrollbar:true,
			callbacks:{
				onInit:function(){
					console.log("Scrollbars initialized", $(this));
					$(this).addClass('scrollbar-style-alt');
				}
			}
			//advanced:{autoExpandHorizontalScroll:true}
		});
	}
	/*produce full end*/

	/*product custom scroll*/
	var $productMenu = $('.product-box__menu');
	if($productMenu.length){
		$productMenu.mCustomScrollbar({
			theme:"minimal-dark",
			scrollbarPosition: "inside",
			autoExpandScrollbar:true
		});
	}
	/*product custom scroll end*/
}
/*custom scroll init end*/

/*navigation accordion*/
function navAccordion() {
	var dur = 200;
	var $navigationList = $('.nav-list');
	if (!$navigationList.length) {
		return;
	}

	//$('.btn-nav').on('click', function (e) {
	//	var current = $(this);
	//
	//	var headerHeight = current.closest('.wrapper').find('.header').outerHeight();
	//	var windowHeight = $(window).height();
	//	current
	//			.addClass('active')
	//			.closest('.header')
	//			.find('.nav-holder')
	//			.height(windowHeight - headerHeight)
	//			.stop().slideToggle(dur, function () {
	//		$(this)
	//				.closest('.header')
	//				.find('.btn-nav').toggleClass('active', $(this).is(':visible'));
	//	});
	//
	//	e.preventDefault();
	//});
	$($navigationList).on('click', 'a', function (e) {
		var $currentLink = $(this);
		var $currentItem = $currentLink.closest('li');
		if(!$currentItem.has('ul').length || $currentItem.has('.drop-visible').length) { return; }

		var $siblingDrop = $currentItem.siblings('li:not(.has-drop-visible, .has-drop-hidden)').find('.nav-drop, .nav-sub-drop');
		var $currentItemDrop = $currentItem.find('.nav-drop, .nav-sub-drop');

		e.preventDefault();
		if($currentItem.hasClass('active')){
			closeDrops($siblingDrop);
			closeDrops($currentItemDrop);
			return;
		}
		closeDrops($siblingDrop);
		closeDrops($currentItemDrop);
		$currentItem
				.children('.nav-drop, .nav-sub-drop')
				.stop().slideDown(dur);
		$currentItem.addClass('active');
	});
	/*close all drops*/
	function closeDrops(drop) {
		drop.slideUp(dur);
		drop.closest('li').removeClass('active');
	}
}
/*navigation accordion end*/

/*breadcrumbs add hover class*/
function breadHover(){
	var $breadcrumbsItemHasDrop = $('.breadcrumbs__item_has-drop');
	if (md.mobile()) {
		$breadcrumbsItemHasDrop.on('click', function (e) {
			if ($(this).hasClass('hover')){
				return;
			}
			e.stopPropagation();
			$breadcrumbsItemHasDrop.removeClass('hover');
			$(this).toggleClass('hover');
			e.preventDefault();
		});

		$('.breadcrumbs-drop').on('click', function (e) {
			e.stopPropagation();
		});

		$(document).on('click', function () {
			$('.breadcrumbs__item_has-drop').removeClass('hover');
		});
		return;
	}
	$breadcrumbsItemHasDrop.on('mouseenter', function () {
		$breadcrumbsItemHasDrop.removeClass('hover');
		$(this).addClass('hover');
	}).on('mouseleave', function () {
		$(this).removeClass('hover');
	});
}
/*breadcrumbs add hover class end*/

/*slick sliders init*/
function slickSlidersInit(){
	/*promo slider*/
	var sliderPromoContainer = $('.promo-slider');
	if(sliderPromoContainer.length){
		//sliderPromoContainer.on('init', function () {
		//	$(this).find('.slick-current').addClass('slick-animate');
		//});
		sliderPromoContainer.slick({
			fade: true,
			swipe: false,
			speed: 500,
			infinite: true,
			//autoplay: true,
			//autoplaySpeed: 3000,
			dots: true,
			cssEase: 'ease-in-out',
			arrows: false
		});
	}
	/*promo slider end*/

	/*promo slider*/
	//var sliderproduceFull = $('.produce-full');
	//if(sliderproduceFull.length){
	//	sliderproduceFull.slick({
	//		fade: true,
	//		//swipe: false,
	//		speed: 500,
	//		infinite: true,
	//		dots: false,
	//		arrows: false
	//	});
	//}
	/*promo slider end*/

	/*departments slider*/
	var sliderDepartments = $('.departments-slider');
	if(sliderDepartments.length){
		sliderDepartments.slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			speed: 300,
			infinite: false,
			dots: true
		});
	}
	/*departments slider end*/

	/*clients slider*/
	var sliderClient = $('.clients-list');
	if(sliderClient.length){
		sliderClient.slick({
			slidesToShow: 8,
			slidesToScroll: 8,
			slide: 'li',
			speed: 300,
			arrows: true,
			infinite: false,
			dots: false,
			responsive: [{
				breakpoint: 1400,
				settings: {
					slidesToShow: 7,
					slidesToScroll: 7
				}
			}]
		});}
	/*clients slider end*/
}
/*slick sliders init end*/

/*owl carousel init*/
function owlInit(){

	$(".gallery").owlCarousel({
		margin:0,
		loop:true,
		autoWidth:true,
		items:4,
		nav: true,
		dots: false,
		onInitialize: setWidth,
		onInitialized: callback1,
		onChanged: callback2
	});

	function setWidth (event){
		var img = $(event.target).find('img').each(function () {
			var width = $(this).attr('width');
			$(this).closest('.gallery-item').css('width',width);
		});
	}

	function callback1(event) {
		var item = event.item.index;
		var cloned = $(event.target).find('.cloned').length;
		var currentItem = (item ? item - cloned/2 : 0) + 1;
		var items = event.item.count;
		$(event.target).find('.owl-prev').after('<div class="slide-counter">' + currentItem + '/' +items+ '</div>');
	}

	function callback2(event) {
		var items = event.item.count;
		var item = event.item.index;
		var cloned = $(event.target).find('.cloned').length;
		//var currentItem = (item ? item - cloned/2 : 0) + 1;
		var currentItem;
		if(item < cloned/2){
			currentItem = items - (cloned/2 - item) + 1;
		} else if (item) {
			currentItem = (item - cloned/2) + 1;
		} else {
			currentItem = 1;
		}
		console.log('item ', item);
		console.log('cloned ', cloned/2);
		console.log('currentItem ', currentItem);
		$(event.target).find('.slide-counter').text(currentItem + '/' +items)
	}


	//$('.num').html(''+currentIndex+'/'+totalItems+'');
}
/*owl carousel init end*/

/*map init*/
function mapInitNiva(){
	google.maps.event.addDomListener(window, 'load', init);
	var map;
	function init() {
		var mapOptions = {
			center: new google.maps.LatLng(54.03666787309223,22.594093177112136),
			zoom: 6,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.DEFAULT,
			},
			disableDoubleClickZoom: true,
			mapTypeControl: false,
			scaleControl: false,
			scrollwheel: false,
			panControl: true,
			streetViewControl: false,
			draggable : true,
			overviewMapControl: true,
			overviewMapControlOptions: {
				opened: false,
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [
				{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#c6d0dd" },
						//{ saturation: 0 },
						//{ lightness: 0 },
						//{ gamma: 1.51 }
					]
				},{
					"featureType": "transit",
					"stylers": [
						{ "color": "#808080" },
						{ "visibility": "off" }
					]
				},{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#b4c2d3" }
					]
				},{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#A2B3C8" }
					]
				},{
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#A2B3C8" },
						{ "weight": 1.8 }
					]
				},{
					"featureType": "road.local",
					"elementType": "geometry.stroke",
					"stylers": [
						{ "color": "#d7d7d7" }
					]
				},{
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#ebebeb" }
					]
				},{
					"featureType": "administrative",
					"elementType": "geometry",
					"stylers": [
						{ "color": "#2e5484" }
					]
				},{
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#A2B3C8" }
					]
				},{
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#A2B3C8" }
					]
				},{
					"featureType": "landscape",
					"elementType": "geometry.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#f9fafb" }
					]
				},{
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [
						{ "color": "#696969" }
					]
				},{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#224a7d" }
					]
				},{
					"featureType": "poi",
					"elementType": "labels.icon",
					"stylers": [
						{ "visibility": "off" }
					]
				},{
					"featureType": "poi",
					"elementType": "labels",
					"stylers": [
						{ "visibility": "off" }
					]
				},{
					"featureType": "road.arterial",
					"elementType": "geometry.stroke",
					"stylers": [
						{ "color": "#d6d6d6" }
					]
				},{
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [
						{ "visibility": "off" }
					]
				},{
				},{
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#d5dde6" }
					]
				}
			],
		}
		var mapElement = document.getElementById('map-niva-holding');
		var map = new google.maps.Map(mapElement, mapOptions);
		var locations = [
			['ул. Заводская, 4', 'Республика Беларусь, Минская область, Солигорский район', 'undefined', 'undefined', 'undefined', 52.66995207146201, 27.48641749999999, 'img/map-niva-pin.png']
		];
		for (i = 0; i < locations.length; i++) {
			if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
			if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
			if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
			if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
			marker = new google.maps.Marker({
				icon: markericon,
				position: new google.maps.LatLng(locations[i][5], locations[i][6]),
				map: map,
				title: locations[i][0],
				desc: description,
				tel: telephone,
				email: email,
				web: web
			});
			link = '';            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
		}
		function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
			var infoWindowVisible = (function () {
				var currentlyVisible = false;
				return function (visible) {
					if (visible !== undefined) {
						currentlyVisible = visible;
					}
					return currentlyVisible;
				};
			}());
			iw = new google.maps.InfoWindow();
			google.maps.event.addListener(marker, 'click', function() {
				if (infoWindowVisible()) {
					iw.close();
					infoWindowVisible(false);
				} else {
					var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p></div>";
					iw = new google.maps.InfoWindow({content:html});
					iw.open(map,marker);
					infoWindowVisible(true);
				}
			});
			google.maps.event.addListener(iw, 'closeclick', function () {
				infoWindowVisible(false);
			});
		}
	}
}
/*map init end*/
function mapInitLMZ(){
	google.maps.event.addDomListener(window, 'load', init);
	var map;
	function init() {
		var mapOptions = {
			center: new google.maps.LatLng(53.8113,27.6823),
			zoom: 6,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.DEFAULT,
			},
			disableDoubleClickZoom: false,
			mapTypeControl: false,
			scaleControl: false,
			scrollwheel: false,
			panControl: true,
			streetViewControl: false,
			draggable : true,
			overviewMapControl: true,
			overviewMapControlOptions: {
				opened: false,
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [
				{
					"featureType": "water",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#c6d0dd" },
						//{ saturation: 0 },
						//{ lightness: 0 },
						//{ gamma: 1.51 }
					]
				},{
					"featureType": "transit",
					"stylers": [
						{ "color": "#808080" },
						{ "visibility": "off" }
					]
				},{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#b4c2d3" }
					]
				},{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#A2B3C8" }
					]
				},{
					"featureType": "road.local",
					"elementType": "geometry.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#A2B3C8" },
						{ "weight": 1.8 }
					]
				},{
					"featureType": "road.local",
					"elementType": "geometry.stroke",
					"stylers": [
						{ "color": "#d7d7d7" }
					]
				},{
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#ebebeb" }
					]
				},{
					"featureType": "administrative",
					"elementType": "geometry",
					"stylers": [
						{ "color": "#2e5484" }
					]
				},{
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#A2B3C8" }
					]
				},{
					"featureType": "road.arterial",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#A2B3C8" }
					]
				},{
					"featureType": "landscape",
					"elementType": "geometry.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#f9fafb" }
					]
				},{
					"featureType": "road",
					"elementType": "labels.text.fill",
					"stylers": [
						{ "color": "#696969" }
					]
				},{
					"featureType": "administrative",
					"elementType": "labels.text.fill",
					"stylers": [
						{ "visibility": "on" },
						{ "color": "#224a7d" }
					]
				},{
					"featureType": "poi",
					"elementType": "labels.icon",
					"stylers": [
						{ "visibility": "off" }
					]
				},{
					"featureType": "poi",
					"elementType": "labels",
					"stylers": [
						{ "visibility": "off" }
					]
				},{
					"featureType": "road.arterial",
					"elementType": "geometry.stroke",
					"stylers": [
						{ "color": "#d6d6d6" }
					]
				},{
					"featureType": "road",
					"elementType": "labels.icon",
					"stylers": [
						{ "visibility": "off" }
					]
				},{
				},{
					"featureType": "poi",
					"elementType": "geometry.fill",
					"stylers": [
						{ "color": "#d5dde6" }
					]
				}
			],
		}
		var mapElement = document.getElementById('map-lmz');
		var map = new google.maps.Map(mapElement, mapOptions);
		var locations = [
			['ул. Селицкого, д. 9', 'Республика Беларусь, г. Минск', 'info@niva.by', 'undefined', 'undefined', 53.8113, 27.6823, 'img/map-pin.png']
		];
		for (i = 0; i < locations.length; i++) {
			if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
			if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
			if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
			if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
			if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
			marker = new google.maps.Marker({
				icon: markericon,
				position: new google.maps.LatLng(locations[i][5], locations[i][6]),
				map: map,
				title: locations[i][0],
				desc: description,
				tel: telephone,
				email: email,
				web: web
			});
			link = '';            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
		}
		function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
			var infoWindowVisible = (function () {
				var currentlyVisible = false;
				return function (visible) {
					if (visible !== undefined) {
						currentlyVisible = visible;
					}
					return currentlyVisible;
				};
			}());
			iw = new google.maps.InfoWindow();
			google.maps.event.addListener(marker, 'click', function() {
				if (infoWindowVisible()) {
					iw.close();
					infoWindowVisible(false);
				} else {
					var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p></div>";
					iw = new google.maps.InfoWindow({content:html});
					iw.open(map,marker);
					infoWindowVisible(true);
				}
			});
			google.maps.event.addListener(iw, 'closeclick', function () {
				infoWindowVisible(false);
			});
		}
	}
}
/*map init end*/

/* fancybox initial */
function fancyboxInit(){
	/*example popups*/
	var popup = $('.fancybox-open');
	if (popup.length) {
		popup.fancybox({
			wrapCSS: 'fancybox-callback',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none'
		});
	}

	/*fancybox gallery*/
	if ($('.fancybox-gallery').length) {
		$('.fancybox-gallery')
				//.attr('data-fancybox-group', 'photo-gallery')
				.fancybox({
					wrapCSS: 'fancybox-gallery-popup',
					openEffect: 'none',
					closeEffect: 'none',
					padding: 0,
					margin: [10,50,10,50]
				});
	}
}
/* fancybox initial */

/*products gallery initial*/
function productGalleryInit() {
	var options = {
		container: '.produce',
		thumbs: '.produce-thumbs__item',
		thumbs_container: '.produce-thumbs',
		full_container: '.produce-full'
	};

	new ProductGallery(options);
}
/*products gallery initial end*/

/*synopsis initial*/
function synopsisInit() {
	var options = {
		synopsis_section: '.synopsis-section',
		synopsis_controls: '.synopsis__controls',
		controls_left: '.synopsis__controls_left',
		controls_right: '.synopsis__controls_right',
		synopsis_content: '.synopsis-content'
	};

	var syns = new Synopsys(options);

	console.log(syns);
}
/*synopsis initial end*/

/** ready/load/resize document **/

$(document).ready(function(){

	placeholderInit();
	customSelect($('select.cselect'));
	showInput();
	navAccordion();
	//breadDrop();
	breadHover();
	slickSlidersInit();
	mapInitNiva();
	mapInitLMZ();
	fancyboxInit();
	productGalleryInit();
	synopsisInit();
});
$(window).load(function () {
	owlInit();
	customScrollInit();
});