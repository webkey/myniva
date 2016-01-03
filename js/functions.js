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
	$(".panel-frame, .drop-visible__holder").mCustomScrollbar({
		//axis:"x",
		theme:"minimal-dark",
		scrollbarPosition: "inside",
		autoExpandScrollbar:true
		//advanced:{autoExpandHorizontalScroll:true}
	});
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

/*breadcrumbs drop*/
function breadDrop(){
	$('bread-has-drop').on('click', function (e) {

		var $currentItem = $(this);
		$('bread-has-drop').removeClass('opened');
		$currentItem.addClass('opened');
	})
}
/*breadcrumbs drop end*/

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
			speed: 500,
			infinite: true,
			//autoplay: true,
			//autoplaySpeed: 3000,
			dots: true,
			cssEase: 'ease-in-out',
			arrow: false
		});
	}
	/*promo slider end*/
}
/*slick sliders init end*/

/*main tabs*/
function mainTab(){

}
/*main tabs end*/

/** ready/load/resize document **/

$(document).ready(function(){

	placeholderInit();
	customSelect($('select.cselect'));
	showInput();
	navAccordion();
	//breadDrop();
	breadHover();
	slickSlidersInit();
	mainTab();
});
$(window).load(function () {
	customScrollInit();
});