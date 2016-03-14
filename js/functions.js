/**!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

!function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}(this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{},n=i[t]=i[t]||[];return n[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),n+=s?0:1,o=i[n]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){function i(t,e){for(var i in e)t[i]=e[i];return t}function n(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}function o(t,e,r){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=n(t),this.options=i({},this.options),"function"==typeof e?r=e:i(this.options,e),r&&this.on("always",r),this.getImages(),h&&(this.jqDeferred=new h.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,r)}function r(t){this.img=t}function s(t,e){this.url=t,this.element=e,this.img=new Image}var h=t.jQuery,a=t.console;o.prototype=Object.create(e.prototype),o.prototype.options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),this.options.background===!0&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&d[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var r=t.querySelectorAll(this.options.background);for(n=0;n<r.length;n++){var s=r[n];this.addElementBackgroundImages(s)}}}};var d={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new r(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var i=new s(t,e);this.images.push(i)},o.prototype.check=function(){function t(t,i,n){setTimeout(function(){e.progress(t,i,n)})}var e=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(e){e.once("progress",t),e.check()}):void this.complete()},o.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+i,t,e)},o.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},r.prototype=Object.create(e.prototype),r.prototype.check=function(){var t=this.getIsImageComplete();return t?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},r.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},r.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},r.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},r.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},r.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype=Object.create(r.prototype),s.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url;var t=this.getIsImageComplete();t&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},s.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},s.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},o.makeJQueryPlugin=function(e){e=e||t.jQuery,e&&(h=e,h.fn.imagesLoaded=function(t,e){var i=new o(this,t,e);return i.jqDeferred.promise(h(this))})},o.makeJQueryPlugin(),o});
/**--- imagesLoaded PACKAGED end ---*/

var md = new MobileDetect(window.navigator.userAgent);

/* placeholder */
function placeholderInit(){
	$('[placeholder]').placeholder();
}
/* placeholder end */

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
					var select = $(this);
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
		if(!md.mobile()){
			$produceFull.mCustomScrollbar({
				scrollbarPosition: "outside",
				autoExpandScrollbar:true
			});
		}
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
		if(!md.mobile()){
			$productBoxMenu.mCustomScrollbar({
				theme:"minimal-dark",
				scrollbarPosition: "inside",
				autoExpandScrollbar:true
			});
		}
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

/*main navigation*/
(function ($) {
	var MainNavigation = function (settings) {
		var options = $.extend({
			navMenuItem: 'li',
			overlayClass: '.overlay-page',
			overlayBoolean: false,
			animationSpeed: 300
		},settings || {});

		this.options = options;
		var container = $(options.navContainer);
		this.$navContainer = container;
		this.$buttonMenu = $(options.btnMenu);                     // Кнопка открытия/закрытия меню для моб. верси.
		this.$navMenu = $(options.navMenu, container);             // Список с пунктами навигации.
		this.$navMenuItem = $(options.navMenuItem, this.$navMenu); // Пункты навигации.
		this.$navDropMenu = $(options.navDropMenu);                // Дроп-меню всех уровней. Перечислять через запятую.
		this._animateSpeed = options.animationSpeed;

		this._overlayClass = options.overlayClass;                // Класс оверлея.
		this._overlayBoolean = options.overlayBoolean;            // Добавить оверлей (по-умолчанию == false). Если не true, то не будет работать по клику вне навигации.

		this.$getCustomScroll = $(options.getCustomScroll);

		this.modifiers = {
			active: 'active',
			opened: 'nav-opened',
			current: 'made-current'
		};

		this.addOverlayPage();
		this.dropNavigation();
		this.mainNavigationCustomScrollBehavior();
		this.mainNavigation();

		// очистка классов-модификаторов при ресайзе
		var self = this;
		$(window).on('debouncedresize', function () {
			self.clearDropNavigation();
		});
	};

	//добавить <div class="overlay-page"></div>
	MainNavigation.prototype.addOverlayPage = function () {
		var self = this,
			_overlayClass = self._overlayClass;

		if (self._overlayBoolean) {
			var overlayClassSubstring = _overlayClass.substring(1);
			$('.header').after('<div class="' + overlayClassSubstring + '"></div>');
		}
	};

	MainNavigation.prototype.dropNavigation = function () {
		var self = this,
			$buttonMenu = self.$buttonMenu,
			modifiers = self.modifiers,
			_active = modifiers.active,
			_opened = modifiers.opened;

		var $body = $('body');

		$buttonMenu.on('click', function (e) {
			// Если открыта форма поиска, закрываем ее
			var $searchForm = $('.search-form');
			if($searchForm.is(':visible')){
				$searchForm.find('.btn-search-close').trigger('click');
			}

			var currentBtnMenu = $(this);

			// Очищаем аттрибут "style" у всех развернутых дропов.
			// Нельзя использовать .hide или подобные методы,
			// т.к. необходимо, чтоб не было записи инлайновой style="display: none;"
			if (!currentBtnMenu.hasClass(_active)) {
				self.$navDropMenu.attr('style','');
			}

			// Удаляем с пунктов меню всех уровней активный класс
			self.$navMenuItem.removeClass(_active);

			// Переключаем на боди класс открывающий меню. Открытие через CSS3 translate
			$body.toggleClass(_opened);

			// Переключаем на кнопке меню активный класс
			currentBtnMenu.toggleClass(_active);

			e.preventDefault();
		});

		// По клику на область вне меню, закрываем меню
		// .overlay-page
		$body.on('click', self._overlayClass, function () {
			$body.toggleClass(_opened);
			$buttonMenu.toggleClass(_active);
		});
	};

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
	};

	MainNavigation.prototype.mainNavigationCustomScroll = function() {
		this.$getCustomScroll.mCustomScrollbar({
			theme:"minimal-dark",
			scrollbarPosition: "inside",
			autoExpandScrollbar:true,
			scrollInertia: 20
		});
	};

	MainNavigation.prototype.mainNavigationCustomScrollBehavior = function() {
		var self = this,
			$buttonMenu = self.$buttonMenu;

		var $body = $('body'),
			_classInit = 'nav-custom-scroll-initialized',
			_classDestroy = 'nav-custom-scroll-destroy';

		if($buttonMenu.is(':hidden')){
			self.mainNavigationCustomScroll();

			$body.addClass(_classInit);
		} else {
			$body.addClass(_classDestroy);
		}

		if(md.mobile()){
			self.$getCustomScroll.mCustomScrollbar("destroy");
		}

		$(window).on('debouncedresize', function () {
			if($buttonMenu.is(':hidden') && $body.hasClass(_classDestroy)){
				$body.removeClass(_classDestroy);
				$body.addClass(_classInit);

				self.mainNavigationCustomScroll();
				return;
			}

			if($buttonMenu.is(':visible') && $body.hasClass(_classInit)){
				$body.removeClass(_classInit);
				$body.addClass(_classDestroy);

				self.$getCustomScroll.mCustomScrollbar("destroy");
			}
		});
	};

	MainNavigation.prototype.mainNavigation = function() {
		var self = this,
			$btnMenu = self.$buttonMenu,
			$navigationList = self.$navMenu,
			dropDownMenu = self.$navDropMenu,
			modifiers = self.modifiers,
			_active = modifiers.active,
			_current = modifiers.current,
			dur = self._animateSpeed;

		// открываем дроп текущего пункта
		// не цсс, а скриптом, чтобы можно было плавно закрыть дроп
		$('.made-current>.nav-sub-drop').slideDown(0);

		$($navigationList).on('click', 'a', function (e) {
			var $currentLink = $(this);
			var $currentItem = $currentLink.closest(self.$navMenuItem);

			if($btnMenu.is(':visible') && $currentItem.has('ul').length){
				e.preventDefault();
				$currentItem.addClass(_active);

				//добавить кноку "< назад"
				var _templateBackTo = '<div class="nav-back"><i class="depict-angle fa fa-chevron-left"></i><span>Назад</span></div>';
				if($btnMenu.is(':visible')){
					if(!$currentLink.siblings('div').has('.nav-back').length){
						$currentLink.siblings('div').closest_child('ul').before(_templateBackTo);
					}
				}
				return;
			}

			if(!$currentItem.has('ul').length || $currentItem.has('.drop-side').length) { return; }

			var $siblingDrop = $currentItem.siblings('li:not(.has-drop-side)').find(dropDownMenu);
			var $currentItemDrop = $currentItem.find(dropDownMenu);

			e.preventDefault();

			if($currentItem.hasClass(_active) || $currentItem.hasClass(_current)){
				closeDrops($siblingDrop);
				closeDrops($currentItemDrop);
				return;
			}
			closeDrops($siblingDrop);
			closeDrops($currentItemDrop);

			$currentItem.toggleClass(_active);

			$currentItem.children(dropDownMenu).stop().slideDown(dur);
		});

		$($navigationList).on('click', '.nav-back', function () {
			$(this).closest('li').removeClass(_active);
		});

		/*close all drops*/
		function closeDrops(drop) {
			drop.closest('li').removeClass(_active);
			drop.closest('li').removeClass(_current);
			if ($btnMenu.is(':hidden')) {
				drop.slideUp(dur);
			}
		}
	};

	MainNavigation.prototype.clearDropNavigation = function() {
		var self = this,
			$buttonMenu = self.$buttonMenu,
			$navMenuItem = self.$navMenuItem,
			modifiers = self.modifiers,
			_active = modifiers.active,
			_opened = modifiers.opened;

		var $body = $('body');

		if ($buttonMenu.is(':hidden') && $buttonMenu.hasClass(_active)) {
			$body.removeClass(_opened);
			$buttonMenu.removeClass(_active);
			$navMenuItem.removeClass(_active);
		}

		var currentNavSubDrop = $('.made-current>.nav-sub-drop');
		if ($buttonMenu.is(':hidden') && currentNavSubDrop.is(':hidden')) {
			currentNavSubDrop.slideDown(300);
		}

		if (!md.mobile() && $buttonMenu.is(':visible') && $buttonMenu.hasClass(_active)) {
			$body.removeClass(_opened);
			$buttonMenu.removeClass(_active);
			$navMenuItem.removeClass(_active);
		}
	};

	window.MainNavigation = MainNavigation;

}(jQuery));

function mainNavigationInit(){
	var navigationContainer = $('.nav');
	if(!navigationContainer.length){ return; }
	new MainNavigation({
		navContainer: navigationContainer,
		btnMenu: '.btn-menu',
		navMenu: '.nav-list',
		navMenuItem: 'li',
		navDropMenu: '.nav-drop, .nav-sub-drop',
		getCustomScroll: '.panel-frame, .drop-side__holder',
		animationSpeed: 300,

		overlayBoolean: true
	});
}
/*main navigation end*/

/*breadcrumbs add hover class*/
function breadHover(){
	var $breadcrumbsItemHasDrop = $('.breadcrumbs__item_has-drop');
	if (md.mobile()) {

		for(var i = 0; i < $breadcrumbsItemHasDrop.length;i++){
			var $this = $breadcrumbsItemHasDrop.eq(i);
			$this.attr('data-text', $this.children('a').children('span').text());
		}

		$breadcrumbsItemHasDrop
			.not(':last-child')
			.children('a')
			.children('span')
			.text('...');

		$breadcrumbsItemHasDrop.on('click', function (e) {
			var $breadcrumbsItemCurrent = $(this);
			if ($breadcrumbsItemCurrent.hasClass('hover')){
				return;
			}
			e.stopPropagation();

			$breadcrumbsItemHasDrop
				.removeClass('hover breadcrumbs__item_long')
				.addClass('breadcrumbs__item_short');

			$breadcrumbsItemHasDrop.children('a').children('span').text('...');

			$breadcrumbsItemCurrent
				.addClass('hover breadcrumbs__item_long')
				.removeClass('breadcrumbs__item_short');

			$breadcrumbsItemCurrent.children('a').children('span').text($breadcrumbsItemCurrent.data('text'));

			e.preventDefault();
		});

		$('.breadcrumbs-drop').on('click', function (e) {
			e.stopPropagation();
		});

		$(document).on('click', function () {
			$('.breadcrumbs__item_has-drop').removeClass('hover');
		});

	} else {
		$breadcrumbsItemHasDrop.on('mouseenter', function () {
			$breadcrumbsItemHasDrop
				.removeClass('hover breadcrumbs__item_long')
				.addClass('breadcrumbs__item_short');

			$(this)
				.addClass('hover breadcrumbs__item_long')
				.removeClass('breadcrumbs__item_short');

		}).on('mouseleave', function () {
			$(this).removeClass('hover');
		});
	}
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

	var $gallery = $(".gallery");
	$gallery.owlCarousel({
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
		//var img = $(event.target).find('img').each(function () {
		//	var width = $(this).attr('width');
		//	$(this).closest('.gallery-item').css('width',width);
		//});
		console.log(this);
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

		/*set total width of slides*/
		var $owlItems = $(event.target).find('.owl-item');
		var countTotal = $owlItems.length;
		var totalWidthItems = 0;

		for(var i = 0; i < countTotal; i++){
			totalWidthItems += $owlItems.eq(i).outerWidth();
		}

		$(event.target).find('.owl-stage').css('width',totalWidthItems);
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
}
/*owl carousel init end*/

/*map init*/
var smallPinMap = 'img/map-pin.png',
		largePinMap = 'img/map-niva-pin.png';

var localObjects = [
	[
		{lat: 52.854244, lng: 27.465155}, //coordinates of marker
		{latBias: 0.2, lngBias: -2.5}, //bias coordinates for center map
		largePinMap, //image pin
		7,
		{
			title: 'Унитарное производственное предприятие "Нива"',
			address: '223710, Республика Беларусь, <br> Минская область, Солигорский район, <br> ул. Заводская, 4',
			phone: '<b>Приёмная:</b> +37517 426-98-03',
			email: '<b>Эл. почта:</b> <a href="mailto:info@niva.by">info@niva.by</a>'
		}
	],[
		{lat: 52.799394, lng: 27.558581},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'Филиал "Завод горно-шахтного оборудования"',
			address: 'Республика Беларусь, Метявичское шоссе 5/3, 223710 Солигорский р-н, Минская обл.',
			phone: '<b>Главный технолог:</b> +375 174 21 20 59',
			email: '<b>Эл. почта:</b> <a href="mailto:zgsho@niva.by">zgsho@niva.by</a>'
		}
	],[
		{lat: 52.809892, lng: 27.553314},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'Филиал «Нива-Сервис»',
			address: 'Республика Беларусь, 223710, 1 рудоуправление, № 1, Солигорский р-н, Минская обл.',
			phone: '<b>Приёмная:</b> +375 174 20 01 15',
			email: '<b>Эл. почта:</b> <a href="mailto:servis@niva.by">servis@niva.by</a>'
		}
	],[
		{lat: 53.812286, lng: 27.677591},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'Дочернее производственное унитарное предприятие "Белгидравлика"',
			address: 'Республика Беларусь, г.Минск, 220075, ул.Селицкого, д.9',
			phone: '<b>Приёмная:</b> +37517 426-98-03',
			email: '<b>Эл. почта:</b> <a href="mailto:infо.belhydraulica@niva.by">infо.belhydraulica@niva.by</a>'
		}
	],[
		{lat: 53.838345, lng: 30.391348},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'Частное производственное унитарное предприятие "Завод горного машиностроения"',
			address: 'Республика Беларусь, г.Могилев, 212030, Славгородское шоссе д.171',
			phone: '<b>Приёмная:</b> +375 222 78 88 82',
			email: '<b>Эл. почта:</b> <a href="mailto:zgm@niva.by">zgm@niva.by</a>'
		}
	],[
		{lat: 52.953266, lng: 27.892742},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'Дочернее частное производственное унитарное предприятие «Завод силовой гидравлики»',
			address: 'Республика Беларусь, 223881, Минская обл., Любанский р-н, г.п. Уречье, ул.Коммунальная д.9',
			phone: '<b>Приёмная:</b> +375 1794 56 999',
			email: '<b>Эл. почта:</b> <a href="zsg@niva.by">zsg@niva.by</a>'
		}
	],[
		{lat: 52.854309, lng: 27.475905},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'ОАО «ЛМЗ Универсал»',
			address: 'Республика Беларусь, 223710, г.Солигорск, Ул.Заводская д.4',
			phone: '<b>Приёмная:</b> +375 174 26 99 02',
			email: '<b>Эл. почта:</b> <a href="mailto:www.lmzuniversal.com">www.lmzuniversal.com</a>'
		}
	],
	[
		{lat: 47.9105, lng: 33.3918},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'ООО «НИВА - КРИВБАСС»',
			address: 'Украина, г. Кривой Рог, ул. Цины, 26-Г',
			phone: '<b>Приёмная:</b> + 380 564 90-84-16',
			email: '<b>Эл. почта:</b> <a href="mailto:sergey.kassir@niva.by">sergey.kassir@niva.by</a>'
		}
	],[
		{lat: 53.9327, lng: 86.6155},
		{latBias: 0.1, lngBias: -2.5},
		smallPinMap,
		7,
		{
			title: 'ООО «НИВА - СИБИРЬ»',
			address: 'Российская Федерация, 653213, Кемеровская обл., Прокопьевский р-он, с. Верх-Егос, ул. Центральная, 1А',
			phone: '<b>Приёмная:</b> + 7 3846 64 65 38',
			email: '<b>Эл. почта:</b> <a href="info@niva-sib.ru">info@niva-sib.ru</a>'
		}
	]
];

function contactsSwitcher(){
	$('.location-link>a').click( function(e) {
		var $currentItem = $(this);
		var index = $currentItem.data('location');
		contactsTpl($currentItem, index);

		e.preventDefault();
	});

	$('.location-head select').on('change', function() {
		var $currentItem = $(this);
		var index = $currentItem.find('option:selected').data('location');
		contactsTpl($currentItem, index);
	});

	function contactsTpl(currentItem, index){
		var object = localObjects[index];
		var tpl = '<h3>'+object[4].title+'</h3>' +
				'<ul class="location-info-list">' +
				'<li>'+object[4].address+'</li>' +
				'<li>'+object[4].phone+'</li>' +
				'<li>'+object[4].email+'</li>' +
				'</ul>';
		currentItem.closest('.location').find('.mCSB_container','.location-info__holder').html(tpl);
	}
}

var styleMap = [
	{
		// water
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#9ec0dd" }
		]
	},{
		"featureType": "transit",
		"stylers": [
			{ "color": "#808080" },
			{ "visibility": "off" }
		]
	},{
		// road small
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [
			{ "visibility": "on" },
			{ "color": "#b5cfe5" }
		]
	},{
		// road transit
		"featureType": "road.highway",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#86b0d5" }
		]
	},{
		//road local bg
		"featureType": "road.local",
		"elementType": "geometry.fill",
		"stylers": [
			{ "visibility": "on" },
			{ "color": "#87afd3" },
			{ "weight": 1.8 }
		]
	},{
		//road local border
		"featureType": "road.local",
		"elementType": "geometry.stroke",
		"stylers": [
			{ "color": "#87afd3" }
		]
	},{
		// road
		"featureType": "poi",
		"elementType": "geometry.fill",
		"stylers": [
			{ "visibility": "on" },
			{ "color": "#87afd3" }
		]
	},{
		// borders country
		"featureType": "administrative",
		"elementType": "geometry",
		"stylers": [
			{ "color": "#0059a6" }
		]
	},{
		"featureType": "road.arterial",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#87afd3" }
		]
	},{
		// land
		"featureType": "landscape",
		"elementType": "geometry.fill",
		"stylers": [
			{ "visibility": "on" },
			{ "color": "#f7fafc" }
		]
	},{
		"featureType": "road",
		"elementType": "labels.text.fill",
		"stylers": [
			{ "color": "#87afd3" }
		]
	},{
		//name administrative
		"featureType": "administrative",
		"elementType": "labels.text.fill",
		"stylers": [
			{ "visibility": "on" },
			{ "color": "#0059a6" }
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
		//smallest road
		"featureType": "road.arterial",
		"elementType": "geometry.stroke",
		"stylers": [
			{ "color": "#87afd3" }
		]
	},{
		"featureType": "road",
		"elementType": "labels.icon",
		"stylers": [
			{ "visibility": "off" }
		]
	},{
		// forest
		"featureType": "poi",
		"elementType": "geometry.fill",
		"stylers": [
			{ "color": "#d8e6f1" }
		]
	}
];

function mapInitNiva(){
	if (!$('#map-niva-holding').length) {return;}

	function mapCenter(index){
		var localObject = localObjects[index];

		var latLng = {
			lat: localObject[0].lat + localObject[1].latBias,
			lng: localObject[0].lng + localObject[1].lngBias
		};
		if($(window).width() < 640) {
			latLng = {
				lat: localObject[0].lat + 0.5,
				lng: localObject[0].lng
			}
		}
		return latLng;
	}

	var markers = [];

	var mapOptions = {
		zoom: 7,
		center: mapCenter(0),
		styles: styleMap,
		mapTypeControl: false,
		scaleControl: false,
		scrollwheel: false
	};

	var map = new google.maps.Map(document.getElementById('map-niva-holding'), mapOptions);

	addMarker(0);

	$('.location-link>a').click( function(e) {
		var index = $(this).data('location');
		deleteMarkers();
		moveToLocation( index );
		addMarker(index);
		e.preventDefault();
	});

	$('.location-head select').on('change', function(e) {
		var index = $(this).find('option:selected').data('location');
		deleteMarkers();
		moveToLocation( index );
		addMarker(index);
		e.preventDefault();
	});

	function moveToLocation(index){
		var object = localObjects[index];
		var center = new google.maps.LatLng(mapCenter(index));
		map.panTo(center);
		map.setZoom(object[3]);
	}



	function addMarker(index) {
		var object = localObjects[index];
		var marker = new google.maps.Marker({
			position: object[0],
			//animation: google.maps.Animation.DROP,
			map: map,
			icon: object[2],
			title: object[4].title
		});
		markers.push(marker);

		var infoWindow = new google.maps.InfoWindow({
			content: '<div class="location-marker"><h4>'+object[4].title+'</h4><ul class="location-marker-content"><li>'+object[4].address+'</li><li>'+object[4].phone+'</li><li>'+object[4].email+'</li></ul></div>',
			maxWidth: 300
		});

		marker.addListener('click', function() {
			infoWindow.open(map, marker);
		});
	}

	function setMapOnAll(map) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(map);
		}
	}

	function deleteMarkers() {
		setMapOnAll(null);
		//markers = [];
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
	var map;
	function init() {
		var mapOptions = {
			center: new google.maps.LatLng(53.154244, 27.465155),
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
			self.scrollPositionToTop(currentControl);
		});

		self.$controlRight.on('click', function () {
			var currentControl = $(this);
			if (currentControl.hasClass(modifiers.active)) {return;}

			clearClasses();
			$synopsisSection.addClass(modifiers.rt_active);
			$(this).addClass(modifiers.active);
			//self.$bgArea.animate({width: '100%'}, 1000, 'linear');
			//self.$itemFull.animate({left: '-100%'}, 1000, 'linear');
			self.scrollPositionToTop(currentControl);
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
			collapsibleElement: '.produce-small__list>li>ul, .produce-small__list>li>ul>li>ul, .produce-small__list>li>ul>li>ul>li>ul', //элемент, который сворачивается/разворачивается
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

			self.scrollPositionToTop(self.$synopsisControl);
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

	/*scroll synopsis to Top*/
	Synopsis.prototype.scrollPositionToTop = function (scrollElement) {
		if(scrollElement.is(':animated')){
			return;
		}
		$('html, body').stop().animate({ scrollTop: scrollElement.offset().top }, 500);
	};

	window.Synopsis = Synopsis;

}());

function synopsisInit() {
	var options = {
		synopsis_section: '.synopsis-section',
		synopsis_control: '.synopsis__controls>li',
		control_left: '.synopsis__controls_left',
		control_right: '.synopsis__controls_right',
		small_thumbs: '.produce-small__list>li',
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

/*scroll TO*/
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

function scrollAgents(){
	var $contactsAnchor = $('.agents-previews__list');
	if(!$contactsAnchor.length){return}
	$contactsAnchor.find('a').navScroller();
}

function scrollContacts(){
	var $contactsAnchor = $('.contacts__anchor');
	if(!$contactsAnchor.length){return}
	$contactsAnchor.find('a').navScroller();
}
/*scroll TO end*/

/*multi accordion*/
(function () {
	var MultiAccordion = function (settings) {
		var options = $.extend({
			collapsibleAll: false,
			animateSpeed: 300,
			resizeCollapsible: false
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
		this._resizeCollapsible = options.resizeCollapsible;//флаг, сворачивание всех открытых аккордеонов при ресайзе

		this.modifiers = {
			active: 'made-active'
		};

		this.bindEvents();
		this.totalCollapsible();
		this.totalCollapsibleOnResize();

	};

	MultiAccordion.prototype.totalCollapsible = function () {
		var self = this;
		self.$totalCollapsible.on('click', function () {
			self.$collapsibleElement.slideUp(self._animateSpeed);
			self.$accordionItem.removeClass(self.modifiers.active);
		})
	};

	MultiAccordion.prototype.totalCollapsibleOnResize = function () {
		var self = this;
		$(window).on('resize', function () {
			if(self._resizeCollapsible){
				self.$collapsibleElement.slideUp(self._animateSpeed);
				self.$accordionItem.removeClass(self.modifiers.active);
			}
		});
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
			animateSpeed: 200,
			resizeCollapsible: true
		});
	}

	if($('.prod-links__list').length){
		new MultiAccordion({
			accordionContainer: '.prod-links__list',
			accordionItem: 'li',
			accordionEvent: 'a',
			collapsibleElement: '.prod-links__list>li>ul, .prod-links__sub-sub',
			animateSpeed: 200,
			collapsibleAll: true
		});
	}
}
/*multi accordion end*/

/*equal height initial*/
function equalHeightInit(){
	var parentsList = $('.partners__list');
	if(parentsList.length){
		parentsList.find('.partners__img').equalHeight({
			//amount: 4,
			useParent: true,
			parent: parentsList,
			resize: true
		});
	}
}
/*equal height initial end*/

/*products gallery initial*/

function companyProductsInit() {
	if(!$('.prod').length){return;}

	var $productThumbsList = $('.prod-thumbs__list');
	$productThumbsList.on('init', function (event, slick) {
		if (slick.currentSlide == 0) {
			slick.$prevArrow.addClass('made-arrow-disable');
		}
	});
	$productThumbsList.slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		infinite:false,
		focusOnSelect: true,
		asNavFor: '.prod-container',
		responsive: [
			{
				breakpoint: 1500,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1060,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 980,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 640,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		]
	}).on('afterChange', function (event, slick, currentSlide) {
		var slidesLength = slick.$slides.length;
		var $prevArrow = slick.$prevArrow;
		var $nextArrow = slick.$nextArrow;
		if(currentSlide > 0 && currentSlide < slidesLength - 1){
			$prevArrow.removeClass('made-arrow-disable');
			$nextArrow.removeClass('made-arrow-disable');
			return;
		}
		if(currentSlide == 0){
			$prevArrow.addClass('made-arrow-disable');
			return;
		}
		if(currentSlide == slidesLength - 1){
			$nextArrow.addClass('made-arrow-disable');
		}
	});

	$('.prod-container').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		infinite:false,
		adaptiveHeight: true,
		asNavFor: '.prod-thumbs__list'
	});

	$('.prod-links__list').on('click', function () {
		$(this).closest('.slick-list').css('height','auto');
	})
}
/*products gallery initial end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	customSelect($('select.cselect'));
	showInput();
	mainNavigationInit();
	breadHover();
	slickSlidersInit();
	contactsSwitcher();
	mapInitNiva();
	mapInitLMZ();
	mapInitContacts();
	fancyboxInit();
	synopsisInit();
	openGallery();
	scrollAgents();
	scrollContacts();
	multiAccordionInit();
	companyProductsInit();
	$('.owl-carousel').imagesLoaded( function() {
		owlInit();
	});
});
$(window).load(function () {
	//owlInit();
	customScrollInit();
	masonryInit();
	accordionInit();
	tabsInit();
	equalHeightInit();
});