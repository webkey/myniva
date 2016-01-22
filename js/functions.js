(function($) {
	$.fn.closest_child = function(filter) {
		var $found = $(),
				$currentSet = this; // Current place
		while ($currentSet.length) {
			$found = $currentSet.filter(filter);
			if ($found.length) break;  // At least one match: break loop
			// Get all children of the current set
			$currentSet = $currentSet.children();
		}
		return $found.first(); // Return first match of the collection
	}
})(jQuery);

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

	var dur = 300;

	$('body').on('click', '.btn-search-open', function(e){
		var $currentBtnOpen = $(this);
		var $currentWrap = $currentBtnOpen.closest('.header');
		var $searchFormContainer = $currentWrap.find('.search-form__header');

		var $searchForm = $searchFormContainer.find('form');
		if ( $searchForm.find('input:not(:submit)').val().length && $searchFormContainer.is(':visible') ){
			$searchForm.submit();
			return;
		}

		if ($searchFormContainer.is(':visible')){
			closeSearchForm($searchFormContainer);
			return;
		}

		$searchFormContainer
			.stop()
			.slideDown(dur, function(){
				//$searchFormContainer.find('input[type="search"], input[type="text"]').val('');
				$searchFormContainer.find('input[type="search"], input[type="text"]').trigger('focus');
				$currentWrap.addClass('form-opened')
			});
	});

	$('body').on('click', '.js-btn-search-close', function(e){
		var $searchFormContainer = $(this).closest('.search-form__header');
		$searchFormContainer.find('input:not(:submit)').val('');

		closeSearchForm($searchFormContainer);
	});

	function closeSearchForm(form){
		form.stop().slideUp(dur);
		form.closest('.header').removeClass('form-opened')
	}
}
/*showInput end*/

/*custom scroll init*/
function customScrollInit(){
	/*scroll produce-minimal*/
	var $produceMinimal = $(".produce-minimal");
	if($produceMinimal.length){
		$produceMinimal.mCustomScrollbar({
			theme:"minimal-dark",
			scrollbarPosition: "inside",
			autoExpandScrollbar:true
		});
	}
	/*scroll produce-minimal end*/

	/*scroll location-info, produce-small*/
	var $produceFull = $('.location-info__holder, .produce-small__holder');
	if($produceFull.length){
		$produceFull.mCustomScrollbar({
			scrollbarPosition: "outside",
			autoExpandScrollbar:true
		});
	}
	/*scroll location-info, produce-small end*/

	/*scroll produce-full*/
	var $produceFullHolder = $('.produce-full-holder');
	if($produceFullHolder.length){
		$produceFullHolder.mCustomScrollbar({
			scrollbarPosition: "outside",
			autoExpandScrollbar:true,
			callbacks:{
				onTotalScroll:function(){
					$(this).addClass('mCustomScrollFull');
				},
				onScroll:function(){
					$(this).removeClass('mCustomScrollFull');
				}
			}
		});
	}
	/*scroll produce-full end*/

	/*scroll product-custom*/
	var $productBoxMenu = $('.product-box__menu');
	if($productBoxMenu.length){
		$productBoxMenu.mCustomScrollbar({
			theme:"minimal-dark",
			scrollbarPosition: "inside",
			autoExpandScrollbar:true
		});
	}
	var productMenu = $('.product-menu');
	productMenu.find('.product-box__menu').equalHeight({
		amount: 3,
		useParent: true,
		parent: productMenu,
		resize: true
	});

	/*scroll product-custom end*/
}
/*custom scroll init end*/

/*drop navigation*/

// при загрузке страницы, добавляем <div class="overlay-page"></div>
$(window).load(function () {
	if(!$('.overlay-page').length){
		$('.header').after('<div class="overlay-page" />');
	}
});

function dropNavigation() {
	$('.header').on('click', '.btn-menu, .overlay-page', function (e) {
		// Если открыта форма поиска, закрываем ее
		var $searchForm = $('.search-form');
		if($searchForm.is(':visible')){
			$searchForm.find('.btn-search-close').trigger('click');
		}

		var btn = $(this);

		// Очищаем аттрибут "style" у всех развернутых дропов.
		// Нельзя использовать .hide или подобные методы,
		// т.к. необходимо, чтоб не было записи инлайновой style="display: none;"
		var dropDownMenu = $('.panel .nav-drop, .panel .nav-sub-drop');
		if (!btn.hasClass('active')) {
			dropDownMenu.attr('style','');
		}

		// Удаляем с пунктов меню всех уровней классы-модификаторы
		$('.nav-list li').removeClass('active made-current:not(.has-drop-side)');

		// Добавляем на боди класс открывающий меню. Открытие через CSS3 translate
		$('body').toggleClass('nav-opened');

		// Добавляем на кнопку меню активный класс
		btn.toggleClass('active');

		e.preventDefault();
	});

	// По клику на область вне меню, закрываем меню
	// .overlay-page
	$('.wrapper').on('click', '.overlay-page', function (e) {
		$('body').toggleClass('nav-opened');
		$('.btn-menu').toggleClass('active');
	});

	//
	/*main navigation scroll*/
	if($('.nav-list').length){
		var $body = $('body'),
			$btnMenu = $('.btn-menu'),
			_classInit = 'nav-custom-scroll-initialized',
			_classDestroy = 'nav-custom-scroll-destroy';

		if($btnMenu.is(':hidden')){
			$('.panel-frame, .drop-side__holder').mCustomScrollbar({
				//axis:"x",
				theme:"minimal-dark",
				scrollbarPosition: "inside",
				autoExpandScrollbar:true
			});

			$body.addClass(_classInit);
		} else {
			$body.addClass(_classDestroy);
		}

		$(window).on('debouncedresize', function () {
			if($btnMenu.is(':hidden') && $body.hasClass(_classDestroy)){
				$body.removeClass(_classDestroy);
				$body.addClass(_classInit);

				$('.panel-frame, .drop-side__holder').mCustomScrollbar({
					//axis:"x",
					theme:"minimal-dark",
					scrollbarPosition: "inside",
					autoExpandScrollbar:true
				});

				return;
			}

			if($btnMenu.is(':visible') && $body.hasClass(_classInit)){
				$body.removeClass(_classInit);
				$body.addClass(_classDestroy);

				$('.panel-frame, .drop-side__holder').mCustomScrollbar("destroy");
			}
		});
	}
	/*main navigation scroll end*/
}
function clearDropNavigation() {
	var panel = $('.panel'),
		btn = $('.btn-menu');

	if (panel.is(':visible') && btn.is(':hidden') && btn.hasClass('active')) {
		$('body').removeClass('nav-opened');
		btn.removeClass('active');
	}

	if (!md.mobile() && btn.is(':visible') && btn.hasClass('active')) {
		console.log(1);
		$('body').removeClass('nav-opened');
		btn.removeClass('active');
		panel.find('li').removeClass('active');
	}
}
/*drop navigation end*/

/*main navigation*/
function mainNavigation() {
	// скорость анимации
	var dur = 300;

	var $navigationList = $('.nav-list');
	if (!$navigationList.length) {
		return;
	}

	// открываем дроп текущего пункта
	// не цсс, а скриптом, чтобы можно было плано закрыть дроп
	$('.made-current>.nav-sub-drop').slideDown(0);

	$($navigationList).on('click', 'a', function (e) {
		var $currentLink = $(this);
		var $currentItem = $currentLink.closest('li');

		var flag;
		var $btnMenu = $('.btn-menu');

		if($btnMenu.is(':visible') && $currentItem.has('ul').length){
			e.preventDefault();
			$currentItem.addClass('active');

			$('.panel').addClass('level-overlay');

			//добавить кноку "< назад"
			var _templateBackTo = '<div class="nav-back"><i class="depict-angle fa fa-chevron-left"></i><span>Назад</span></div>';
			if($btnMenu.is(':visible')){
				if(!$currentLink.siblings('div').has('.nav-back').length){
					$currentLink.siblings('div').closest_child('ul').before(_templateBackTo);
				}
			}
			return;
		}

		if(!$currentItem.has('ul').length || $currentItem.has('.drop-side').length) {
			return;
		}



		var dropDownMenu = $('.nav-drop, .nav-sub-drop');
		var $siblingDrop = $currentItem.siblings('li:not(.has-drop-side)').find(dropDownMenu);
		var $currentItemDrop = $currentItem.find(dropDownMenu);

		e.preventDefault();

		if($currentItem.hasClass('active') || $currentItem.hasClass('made-current')){
			closeDrops($siblingDrop);
			closeDrops($currentItemDrop);
			return;
		}
		closeDrops($siblingDrop);
		closeDrops($currentItemDrop);

		$currentItem.toggleClass('active');

		$currentItem.children(dropDownMenu).stop().slideDown(dur);
	});

	$($navigationList).on('click', '.nav-back', function (e) {
		$(this).closest('li').removeClass('active');
	});

	$('.nav-drop>.nav-back').on('click', function (e) {
		$('.panel').removeClass('level-overlay');
	});

	/*close all drops*/
	function closeDrops(drop) {
		drop.closest('li').removeClass('active made-current');
		if ($('.btn-menu').is(':hidden')) {
			drop.slideUp(dur);
		}
	}
}
/*main navigation end*/

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

	/*departments slider*/
	var sliderDepartments = $('.departments-slider');
	if(sliderDepartments.length){
		sliderDepartments.slick({
			slidesToShow: 4,
			slidesToScroll: 4,
			speed: 300,
			infinite: false,
			dots: true, responsive: [{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},{
				breakpoint: 1000,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			},{
				breakpoint: 980,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},{
				breakpoint: 840,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			},{
				breakpoint: 640,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}, {
				breakpoint: 500,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false
				}
			}]
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
				breakpoint: 1290,
				settings: {
					slidesToShow: 7,
					slidesToScroll: 7
				}
			},{
				breakpoint: 1080,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 6
				}
			},{
				breakpoint: 940,
				settings: {
					slidesToShow: 7,
					slidesToScroll: 7
				}
			},{
				breakpoint: 840,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 6
				}
			},{
				breakpoint: 740,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5
				}
			},{
				breakpoint: 640,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			},{
				breakpoint: 520,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},{
				breakpoint: 420,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}]
		});
	}
	/*clients slider end*/

	/*news slider*/
	var sliderNews= $('.news-slider');
	if(sliderNews.length){
		sliderNews.on('init', function (slick) {
			var curSlider = $(this);
			setTimeout(function () {
				curSlider.addClass('after-initialized');
			},50)
		});
		sliderNews.slick({
			speed: 300,
			infinite: true,
			//autoplay: true,
			//autoplaySpeed: 3000,
			dots: true,
			cssEase: 'ease-in-out',
			arrows: false
		});
	}
	/*news slider end*/
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
		if ($('.product-info__main').length){
			$(event.target).closest('.product-info__main').find('.product-visual__count').text(items);
		}
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
		$(event.target).find('.slide-counter').text(currentItem + '/' +items)
	}


	//$('.num').html(''+currentIndex+'/'+totalItems+'');
}
/*owl carousel init end*/

/*map init*/
var styleMap = [
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
];

function mapInitNiva(){
	if (!$('#map-niva-holding').length) {return;}

	google.maps.event.addDomListener(window, 'load', init);
	var map,
			centerMapL = "54.03666787309223",
			centerMapR = "22.594093177112136";

	if($(window).width() < 640) {
		centerMapL = "53.16995207146201";
		centerMapR = "27.48641749999999";
	}

	function init() {
		var mapOptions = {
			center: new google.maps.LatLng(centerMapL, centerMapR),
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
			styles: styleMap
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

function mapInitLMZ(){
	if (!$('#map-lmz').length) {return;}

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
			styles: styleMap,
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
			link = '';
			bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
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
					var html= "<div style='color:#000;background-color:#fff;padding:5px;width:170px;'><h4>"+title+"</h4><p>"+desc+"<p></div>";
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

function mapInitContacts(){
	if (!$('#map-niva-contacts').length) {return;}

	google.maps.event.addDomListener(window, 'load', init);
	var map,
		centerMapL = "54.03666787309223",
		centerMapR = "22.594093177112136";

	if($(window).width() < 980) {
		centerMapL = "53.16995207146201";
		centerMapR = "27.48641749999999";
	}
	function init() {
		var mapOptions = {
			center: new google.maps.LatLng(centerMapL, centerMapR),
			zoom: 7,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.DEFAULT,
			},
			disableDoubleClickZoom: false,
			mapTypeControl: false,
			scaleControl: false,
			scrollwheel: false,
			panControl: true,
			streetViewControl: true,
			draggable : true,
			overviewMapControl: true,
			overviewMapControlOptions: {
				opened: false,
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: styleMap
		};
		var mapElement = document.getElementById('map-niva-contacts');
		var map = new google.maps.Map(mapElement, mapOptions);
		var locations = [
			['ул. Селицкого, д. 9', 'г. Минск, Беларусь', 'undefined', 'undefined', 'undefined', 52.854244, 27.465155, 'img/map-niva-pin.png']
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
					var html= "<div style='color:#000;background-color:#fff;padding:5px;width:170px;'><h4>"+title+"</h4><p>"+desc+"<p></div>";
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
	/*modal window*/
	var popup = $('.fancybox-open');
	if (popup.length) {
		popup.fancybox({
			wrapCSS: 'fancybox-modal',
			padding: 0,
			openEffect: 'none',
			closeEffect: 'none'
		});
	}

	/*fancybox gallery*/
	var $fancyboxGallery = $('.fancybox-gallery');
	if ($fancyboxGallery.length) {
		$fancyboxGallery
				//.attr('data-fancybox-group', 'photo-gallery')
				.fancybox({
					wrapCSS: 'fancybox-gallery-popup',
					openEffect: 'none',
					closeEffect: 'none',
					padding: 0,
					margin: 50
				});
	}
}
/* fancybox initial */

/*products gallery initial*/
(function () {
	var Synopsis = function (options) {
		this.options = options;
		var $synopsis_section = $(options.synopsis_section);
		this.$synopsisSection = $synopsis_section;
		this.$synopsisControl = $(options.synopsis_control, $synopsis_section);
		this.$controlLeft = $(options.control_left, $synopsis_section);
		this.$controlRight = $(options.control_right, $synopsis_section);
		this.$smallThumbs = $(options.small_thumbs, $synopsis_section);
		this.$smallThumbsDrop = $(options.small_thumbs_drop, $synopsis_section);
		this.$mask = $(options.mask, $synopsis_section);
		this.$bgArea = $(options.bg_area, $synopsis_section);
		this.$itemFull = $(options.item_full, $synopsis_section);

		var $container = $(options.produce_container);
		this.$container = $container;
		this.$thumbs = $(options.thumbs, $container);
		this.$thumbsContainer = $(options.thumbs_container, $container);
		this.$panel = $(options.full_container, $container);

		this.modifiers = {
			hover: 'made-hover',
			active: 'made-active',
			open: 'made-opened',
			lt_active: 'lt-active',
			rt_active: 'rt-active'
		};

		this.slick = this.initSlick();

		this.switchControls();
		this.initScrollbar();
		this.bindEvents();
		this.initAccordion();
	};

	Synopsis.prototype.switchControls = function () {
		var self = this,
			modifiers = this.modifiers,
			synopsisControl = self.$synopsisControl;

		var $synopsisSection = self.$synopsisSection;

		self.$controlLeft.on('click', function () {
			var currentControl = $(this);
			if (currentControl.hasClass(modifiers.active)) {return;}

			clearClasses();
			$synopsisSection.addClass(modifiers.lt_active);
			$(this).addClass(modifiers.active);
			//self.$bgArea.animate({width: '20%'}, 1000, 'linear');
			//self.$itemFull.animate({left: '0'}, 1000, 'linear');
		});

		self.$controlRight.on('click', function () {
			var currentControl = $(this);
			if (currentControl.hasClass(modifiers.active)) {return;}

			clearClasses();
			$synopsisSection.addClass(modifiers.rt_active);
			$(this).addClass(modifiers.active);
			//self.$bgArea.animate({width: '100%'}, 1000, 'linear');
			//self.$itemFull.animate({left: '-100%'}, 1000, 'linear');
		});

		var clearClasses = function () {
			$synopsisSection.removeClass(modifiers.lt_active);
			$synopsisSection.removeClass(modifiers.rt_active);
			synopsisControl.removeClass(modifiers.active);
		};
	};

	Synopsis.prototype.initSlick = function () {
		var $slickSlider = this.$panel.slick({
			fade: true,
			speed: 250,
			infinite: false,
			dots: false,
			arrows: false
		});

		return $slickSlider;
	};

	Synopsis.prototype.initScrollbar = function () {
		this.$thumbsContainer.mCustomScrollbar({
			axis:"x",
			scrollbarPosition: "inside",
			advanced:{autoExpandHorizontalScroll:true},
			//snapAmount:156,
			keyboard:{
				//scrollAmount:156,
				enable: true
			},
			mouseWheel:{
				//deltaFactor:156
				enable: true
			},
			scrollInertia:500
		});
	};

	Synopsis.prototype.scrollToActiveThumb = function () {
		var left = this.$thumbs.eq(this.slick.slick('slickCurrentSlide')).position().left,
			width = this.$thumbsContainer.width(),
			scrollOffset = (left - width / 2 < 0) ? 0 : left - width / 2;

		this.$thumbsContainer.mCustomScrollbar('scrollTo', scrollOffset);
	};

	Synopsis.prototype.initAccordion = function () {
		new MultiAccordion({
			accordionContainer: '.produce-small__list',
			accordionItem: 'li', //непосредственный родитель сворачиваемого элемента
			accordionEvent: 'a', //элемент, по которому производим клик
			collapsibleElement: '.produce-small__s-list-wrap, .produce-small__ss-list-wrap, .produce-small__sss-list-wrap', //элемент, который сворачивается/разворачивается
			animateSpeed: 200,
			collapsibleAll: true,
			totalCollapsible: this.$controlRight
		});
	};

	Synopsis.prototype.bindEvents = function () {
		var self = this,
			modifiers = this.modifiers;

		this.$thumbs.on('click', function () {
			var $activeThumb = $(this).parent(),
				activeIndex = $activeThumb.index();

			self.$thumbs.parent().removeClass(modifiers.active);
			$activeThumb.addClass(modifiers.active);

			self.slick.slick('slickGoTo',activeIndex);
		});

		self.slick.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			self.$thumbs.parent().removeClass(modifiers.active);

			self.$thumbs.parent().eq(nextSlide).addClass(modifiers.active);
		});

		self.slick.on('afterChange', function () {
			self.scrollToActiveThumb();
		});

		self.$smallThumbs.on('click', function (event) {
			var current = $(this);
			self.$controlLeft.trigger('click');
			setTimeout(function () {
				self.$thumbs.eq(current.index()).trigger('click');
			}, 400);
			event.preventDefault();
		});

		self.$mask.on('click', function () {
			self.$controlRight.trigger('click');
		})
	};

	window.Synopsis = Synopsis;

}());

function synopsisInit() {
	var options = {
		synopsis_section: '.synopsis-section',
		synopsis_control: '.synopsis__controls>li',
		control_left: '.synopsis__controls_left',
		control_right: '.synopsis__controls_right',
		small_thumbs: '.produce-small__item',
		small_thumbs_drop: '.produce-small__s-list-wrap',
		mask: '.rubric-visual-mask',
		bg_area: '.rubric-visual-bg',
		item_full: '.synopsis-item__full',

		produce_container: '.produce',
		thumbs: '.produce-thumbs__item',
		thumbs_container: '.produce-thumbs',
		full_container: '.produce-full'
	};

	new Synopsis(options);
}
/*products gallery initial end*/

/*ui accordion initial*/
function accordionInit(){
	$('.accordion').accordion({
		heightStyle: 'content',
		collapsible: true,
		animate: 'easeInOutQuint'
	});
}
/*ui accordion initial end*/

/*ui tabs initial*/
function tabsInit(){
	$('.tabs').tabs({
		animate: 'easeInOutQuint'
	});
}
/*ui tabs initial end*/

/*open gallery*/
function openGallery(){
	var productPreview = $('.product-visual');
	if(!productPreview.length){return}
	productPreview.on('click', function (e) {
		$(this).closest('.product-info__main').addClass('open-gallery');
	});
	$('.btn-close').on('click', function () {
		$(this).closest('.product-info__main').removeClass('open-gallery');
	});
}
/*open gallery end*/

/*masonry initial*/
function masonryInit(){
	$('.news__list').masonry({
		itemSelector: '.news__item',
		percentPosition: true
	})
}
/*masonry initial end*/

/*scroll navigation*/
$.extend($.easing, {
		def: 'easeOutQuad', easeInOutExpo: function (x, t, b, c, d) {
			if (t == 0) return b;
			if (t == d) return b + c;
			if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	});

(function( $ ) {

	var settings;
	var disableScrollFn = false;
	var navItems;
	var navs = {}, sections = {};

	$.fn.navScroller = function(options) {
		settings = $.extend({
			scrollToOffset: 30,
			scrollSpeed: 800,
			activateParentNode: true
		}, options );
		navItems = this;

		//attatch click listeners
		navItems.on('click', function(event){
			event.preventDefault();
			var navID = $(this).attr("href").substring(1);
			disableScrollFn = true;
			activateNav(navID);
			populateDestinations(); //recalculate these!
			$('html,body').animate({scrollTop: sections[navID] - settings.scrollToOffset},
				settings.scrollSpeed, "easeInOutExpo", function(){
					disableScrollFn = false;
				}
			);
		});

		//populate lookup of clicable elements and destination sections
		populateDestinations(); //should also be run on browser resize, btw

		// setup scroll listener
		$(document).scroll(function(){
			if (disableScrollFn) { return; }
			var page_height = $(window).height();
			var pos = $(this).scrollTop();
			for (i in sections) {
				if ((pos + settings.scrollToOffset >= sections[i]) && sections[i] < pos + page_height){
					activateNav(i);
				}
			}
		});
	};

	function populateDestinations() {
		navItems.each(function(){
			var scrollID = $(this).attr('href').substring(1);
			navs[scrollID] = (settings.activateParentNode)? this.parentNode : this;
			sections[scrollID] = $(document.getElementById(scrollID)).offset().top;
		});
	}

	function activateNav(navID) {
		for (nav in navs) { $(navs[nav]).removeClass('active'); }
		$(navs[navID]).addClass('active');
	}
})( jQuery );

function scrollNavInit(){
	$('.agents-previews__item a').navScroller();
}
/*scroll navigation end*/

/*multi accordion*/
(function () {
	var MultiAccordion = function (settings) {
		var options = $.extend({
			collapsibleAll: false,
			animateSpeed: 300
		}, settings || {});

		this.options = options;
		var container = $(options.accordionContainer);
		this.$accordionContainer = container; //блок с аккордеоном
		this.$accordionItem = $(options.accordionItem, container); //непосредственный родитель сворачиваемого элемента
		this.$accordionEvent = $(options.accordionEvent, container); //элемент, по которому производим клик
		this.$collapsibleElement = $(options.collapsibleElement); //элемент, который сворачивается/разворачивается
		this._collapsibleAll = options.collapsibleAll;
		this._animateSpeed = options.animateSpeed;
		this.$totalCollapsible = $(options.totalCollapsible);//элемент, по клику на который сворачиваются все аккордены в наборе

		this.modifiers = {
			active: 'made-active'
		};

		this.bindEvents();
		this.totalCollapsible();
	};

	MultiAccordion.prototype.totalCollapsible = function () {
		var self = this;
		self.$totalCollapsible.on('click', function () {
			console.log($(this));
			self.$collapsibleElement.slideUp(self._animateSpeed);
			self.$accordionItem.removeClass(self.modifiers.active);
		})
	};

	MultiAccordion.prototype.bindEvents = function () {
		var self = this,
			modifiers = this.modifiers,
			animateSpeed = this._animateSpeed,
			accordionContainer = this.$accordionContainer,
			anyAccordionItem = this.$accordionItem,
			collapsibleElement = this.$collapsibleElement;

		self.$accordionEvent.on('click', function (e) {
			var current = $(this);
			var currentAccordionItem = current.closest(anyAccordionItem);

			if (!currentAccordionItem.has(collapsibleElement).length){
				return;
			}

			e.preventDefault();

			if (current.parent().prop("tagName") != currentAccordionItem.prop("tagName")) {
				current = current.parent();
			}

			if (current.siblings(collapsibleElement).is(':visible')){
				currentAccordionItem.removeClass(modifiers.active).find(collapsibleElement).slideUp(animateSpeed);
				currentAccordionItem.find(anyAccordionItem).removeClass(modifiers.active);
				return;
			}

			if (self._collapsibleAll){
				var siblingContainers = $(accordionContainer).not(current.closest(accordionContainer));
				siblingContainers.find(collapsibleElement).slideUp(animateSpeed);
				siblingContainers.find(anyAccordionItem).removeClass(modifiers.active);
			}

			currentAccordionItem.siblings().removeClass(modifiers.active).find(collapsibleElement).slideUp(animateSpeed);
			currentAccordionItem.siblings().find(anyAccordionItem).removeClass(modifiers.active);

			currentAccordionItem.addClass(modifiers.active);
			current.siblings(collapsibleElement).slideDown(animateSpeed);
		})
	};

	window.MultiAccordion = MultiAccordion;
}());

function multiAccordionInit() {
	if($('.product-box__list').length){
		new MultiAccordion({
			accordionContainer: '.product-box__list',
			accordionItem: 'li',
			accordionEvent: 'a',
			collapsibleElement: '.product-box__list>li>ul, .product-box__sub-sub',
			animateSpeed: 200
		});
	}

	//if($('.category__list').length){
	//	new MultiAccordion({
	//		accordionContainer: '.category__list',
	//		accordionItem: 'li',
	//		accordionEvent: 'a',
	//		collapsibleElement: '.category__list>li>ul',
	//		animateSpeed: 200
	//	});
	//}

	//if($('.produce-full-menu').length){
	//	new MultiAccordion({
	//		accordionContainer: '.produce-full-menu__col>ul',
	//		accordionItem: 'li',
	//		accordionEvent: 'a',
	//		collapsibleElement: '.produce-full-menu__col>ul>li>ul, .product-box__sub-sub',
	//		animateSpeed: 200,
	//		collapsibleAll: true
	//	});
	//}
}
/*multi accordion end*/

/*products gallery initial*/
(function () {
	var CompanyProducts = function (settings) {
		var options = $.extend({
			scrollBtnPrev: '',
			scrollBtnNext: ''
		}, settings || {});

		this.options = options;

		var $container = $(options.container);
		this.$container = $container;
		this.$thumbs = $(options.thumbs, $container);
		this.$thumbsContainer = $(options.thumbsContainer, $container);
		this.$panel = $(options.panel, $container);
		this.$tabPanel = $(options.tabPanel, $container);
		this._scrollBtnPrev = options.scrollBtnPrev;
		this._scrollBtnNext = options.scrollBtnNext;
		this.$scrollBtnPrev = $(this._scrollBtnPrev);
		this.$scrollBtnNext = $(this._scrollBtnNext);

		this.modifiers = {
			active: 'made-active',
			openedTab: 'opened-tab',
			closedTab: 'closed-tab',
			disabledThumbs: 'prod-disabled-thumb'
		};

		this.initScrollbar();
		this.bindEvents();
		this.initAccordion();
		this.prevNextThumb();
	};

	CompanyProducts.prototype.thumbPosition = function (currentThumb) {
		var left = currentThumb.position().left,
			width = this.$thumbsContainer.width(),
			widthThumb = currentThumb.width(),
			scrollOffset = (left - width / 2 < 0) ? 0 : left - width / 2 + widthThumb / 2;

		this.$thumbsContainer.mCustomScrollbar('scrollTo', scrollOffset);
	};

	CompanyProducts.prototype.initScrollbar = function () {
		var self = this;
		self.$thumbsContainer.mCustomScrollbar({
			axis:"x",
			scrollbarPosition: "inside",
			advanced:{autoExpandHorizontalScroll:true},
			keyboard:{
				enable: false
			},
			mouseWheel:{
				//enable: false
			},
			scrollInertia:500,
			callbacks:{
				onInit:function(){
					$(this).prepend('<span class="mCustomScrollBtn mCustomScrollBtnPrev '+self._scrollBtnPrev+'"><i></i></span>').append('<span class="mCustomScrollBtn mCustomScrollBtnNext '+self._scrollBtnNext+'"><i></i></span>');
				}
			}
		});
	};

	CompanyProducts.prototype.initAccordion = function () {
		new MultiAccordion({
			accordionContainer: '.prod-links__list',
			accordionItem: 'li', //непосредственный родитель сворачиваемого элемента
			accordionEvent: 'a', //элемент, по которому производим клик
			collapsibleElement: '.prod-links__list>li>ul, .prod-links__sub-sub', //элемент, который сворачивается/разворачивается
			animateSpeed: 200,
			collapsibleAll: true //сворачивать элементы в соседних аккордеонах
		});
	};

	CompanyProducts.prototype.bindEvents = function () {
		var self = this,
			modifiers = this.modifiers,
			tabPanel = this.$tabPanel;

		tabPanel.addClass(modifiers.closedTab);

		this.$thumbs.on('click', function (e) {
			var $currentThumb = $(this).parent();
			if ($currentThumb.hasClass(modifiers.disabledThumbs)) { return; }

			var activeIndex = $currentThumb.index();

			self.thumbPosition($currentThumb);

			self.$thumbs.parent().removeClass(modifiers.active);
			$currentThumb.addClass(modifiers.active);

			tabPanel.removeClass(modifiers.active);
			tabPanel.removeClass(modifiers.openedTab);
			tabPanel.eq(activeIndex).addClass(modifiers.active);

			e.preventDefault();
		});
	};

	CompanyProducts.prototype.prevNextThumb = function () {
		var self = this,
			modifiers = this.modifiers,
			tabPanel = this.$tabPanel;

		this.$container.on('click', self.$scrollBtnPrev, function () {
			console.log('prev!click');

			var currentBtn = $(this),
				activeThumb = self.$thumbs;
			console.log(activeThumb);

			currentBtn.closest();
		});

		this.$container.on('click', self.$scrollBtnNext, function () {
			console.log('next!click');

			var currentBtn = $(this);
		})
	};

	window.CompanyProducts = CompanyProducts;

}());

function companyProductsInit() {
	if(!$('.prod').length){return;}
	new CompanyProducts({
		container: '.prod',
		thumbs: '.prod-thumbs__item',
		thumbsContainer: '.prod-thumbs',
		panel: '.prod-container',
		tabPanel: '.prod-tab'
	});
}
/*products gallery initial end*/

/*equal height initial*/
function equalHeightInit(){
	var parentsList = $('.partners__list');
	parentsList.find('.partners__img').equalHeight({
		//amount: 4,
		useParent: true,
		parent: parentsList,
		resize: true
	});
}
/*equal height initial end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	customSelect($('select.cselect'));
	showInput();
	dropNavigation();
	mainNavigation();
	//breadDrop();
	breadHover();
	slickSlidersInit();
	mapInitNiva();
	mapInitLMZ();
	mapInitContacts();
	fancyboxInit();
	synopsisInit();
	openGallery();
	scrollNavInit();
	multiAccordionInit();
	companyProductsInit();
});
$(window).load(function () {
	owlInit();
	customScrollInit();
	masonryInit();
	accordionInit();
	tabsInit();
	equalHeightInit();
});
$(window).on('debouncedresize', function () {
	clearDropNavigation();
});