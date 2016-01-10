(function () {

	var ProductGallery = function (options) {
		this.options = options;
		var $container = $(options.container);

		this.$synopsisSection = $container;
		this.$thumbs = $(options.thumbs, $container);
		this.$thumbsContainer = $(options.thumbs_container, $container);
		this.$fullContainer = $(options.full_container, $container);

		this.modifiers = {
			hover: 'made-hover',
			active: 'made-active',
			open: 'made-opened'
		};

		this.slick = this.initSlick();

		this.initScrollbar();
		this.bindEvents();
	};

	ProductGallery.prototype.initSlick = function () {
		var $slickSlider = this.$fullContainer.slick({
			fade: true,
			speed: 250,
			infinite: false,
			dots: false,
			arrows: false
		});

		return $slickSlider;
	};

	ProductGallery.prototype.initScrollbar = function () {
		this.$thumbsContainer.mCustomScrollbar({
			axis:"x",
			scrollbarPosition: "inside",
			advanced:{autoExpandHorizontalScroll:true},
			//snapAmount:156,
			keyboard:{
				//scrollAmount:156,
				enable: false
			},
			mouseWheel:{
				//deltaFactor:156
				enable: false
			},
			scrollInertia:500
		});
	};

	ProductGallery.prototype.scrollToActiveThumb = function () {
		var left = this.$thumbs.eq(this.slick.slick('slickCurrentSlide')).position().left,
			width = this.$thumbsContainer.width(),
			scrollOffset = (left - width / 2 < 0) ? 0 : left - width / 2;

		this.$thumbsContainer.mCustomScrollbar('scrollTo', scrollOffset);
	};

	ProductGallery.prototype.bindEvents = function () {
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


	};

	window.ProductGallery = ProductGallery;

}());

(function () {
	var Synopsis = function (options) {
		this.options = options;
		var $synopsisSection = $(options.container);

		this.$synopsis_section = $synopsisSection;
		this.$synopsis_controls = $(options.synopsis_controls, $synopsisSection);
		this.$controls_left = $(options.controls_left, $synopsisSection);
		this.$controls_right = $(options.controls_right, $synopsisSection);
		this.$main_container = $(options.main_container, $synopsisSection);
	};

	window.Synopsys = Synopsis;
}());