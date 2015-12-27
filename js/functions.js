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

/*breadcrumbs drop*/
function breadDrop(){
	$('bread-has-drop').on('click', function (e) {
		e.stopPropagation();
		var $currentItem = $(this);
		$('bread-has-drop').removeClass('opened');
		$currentItem.addClass('opened');
		e.preventDefault();
	})
}
/*breadcrumbs drop end*/

/*showInput */
function showInput(){
	var searchForm = $('.search-form');
	if(!searchForm.length){ return; }
	searchForm.on('click', '.btn-search', function(e){
		var currentSearchBtn = $(this);
		var currentForm = currentSearchBtn.closest('.search-form');
		var searchWrapper = currentForm.find('.input-wrapper');
		var searchField = searchWrapper.find('input');
		var dur = 200;
		if ( currentSearchBtn.closest('form').find('input').val().length && currentSearchBtn.parents('.search-form').find('.input-wrapper').is(':visible') ){
			currentSearchBtn.closest('form').submit();
		} else {
			var maxWidth = searchWrapper.data('max-width');
			var minWidth = searchWrapper.data('min-width');
			currentForm.addClass('search-init');
			searchWrapper
				.stop()
				.animate({
					width: maxWidth
				}, dur, function(){
					searchWrapper.find('input').val('');
					searchWrapper.find('input').trigger('focus');
				});
			searchField.stop().fadeIn(dur);
			var yourClick = true;
			$(document).on('click.EventSearch', function (e) {
				if ( !yourClick && $(e.target).closest($('.input-wrapper')).length  == 0 ) {
					currentForm.removeClass('search-init');
					searchWrapper
						.stop()
						.animate({
							width:minWidth
						});
					searchField.stop().fadeOut(dur);
					$(document).unbind('click.EventSearch');
				}
				yourClick = false;
			});
			e.preventDefault();
		}
	});
}
/*showInput end*/

/*custom scroll init*/
function customScrollInit(){
	$(".panel-frame").mCustomScrollbar({
		//axis:"x",
		theme:"minimal-dark",
		scrollbarPosition: "inside",
		autoExpandScrollbar:true
		//advanced:{autoExpandHorizontalScroll:true}
	});
}
/*custom scroll init end*/

/** ready/load/resize document **/

$(document).ready(function(){
	placeholderInit();
	customSelect($('select.cselect'));
	//breadDrop();
	showInput();
});
$(window).load(function () {
	customScrollInit();
});