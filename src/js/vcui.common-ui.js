
define('common/footer', ['jquery', 'vcui', 'ui/dropdown' ], function ($, core) {
    "use strict";

    var Footer = core.ui('Footer', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.$comInfo = self.$el.find('.comp-link');
            var winwidth = $(window).outerWidth(true);
            if(winwidth <= 768){
                self.$comInfo.data('mode', 'normal');
            } else{
                self.$comInfo.data('mode', 'accordion');
            }
            
            if(self.$comInfo.hasClass('open')) self.$comInfo.removeClass('open');

            self.$el.find('.comp-link').vcDropdown();
            self.$comInfoAcc = self.$el.find('.comp-link').vcDropdown('instance');
            

            self._resize();
            $(window).on('resize', function(){
                self._resize();
            });
        },

        _resize: function(){
            var self = this,
            winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth <= 768){

            }
        }
    });

    return Footer;
});

define('common/header', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var Header = core.ui('Header', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.isTrans = false;

            self.isHover = false;
            self.outTimer = null;

            self.isCategoryHover = false;
            self.categoryOutTimer = null;

            self.gnbMode = "pc";

            self.prodWidth = 0;
            
            self._setting();
            self._bindEvents();
            self._resize();
        },

        _setting: function(){
            var self = this;

            console.log("ddddd")

            self.$naviWrapper = self.$el.find(".header-bottom");
            self.$prodWrapper = self.$naviWrapper.find('.nav-category-product');
            self.$product = self.$prodWrapper.find('.nav-item');
            self.$categoryWrapper = self.$prodWrapper.find('.nav-category-container');
            self.$category = self.$categoryWrapper.find('> ul');
            self.$categoryItems = self.$category.children();

            self.$menuOpener = self.$el.find('.mobile-nav-button');

            self.prodWidth = self.$categoryWrapper.width();
        },

        _resize: function(){
            var self = this;
            var winwidth = $(window).outerWidth(true);
            if(winwidth > 1130){
                self._menuToggleDisabled();
                self.gnbMode = "pc";
            } else{
                self._gnbInit();
                self.gnbMode = "m"; 
            }
        },

        _bindEvents: function(){
            var self = this;

            self.$el.on('mouseover', function(){
                if(self.isHover){
                    self._setOver();
                }
            }).on('mouseout', function(){
                if(self.isHover){
                    self._setOutTimer();
                }
            });

            self.$prodWrapper.on('mouseover', function(){
                self._setOver();
            });

            self.$product.on('click', function(e){
                if(self.gnbMode == "m"){
                    e.preventDefault();

                    self._setProductActiveToggle(!self.$product.hasClass('active'));
                }
            });

            self.$categoryItems.each(function(idx, item){
                $(item).on('mouseover', function(){
                    if(!self.isCategoryHover) self._setCategoryOver(idx);
                }).on('mouseout', function(){
                    if(self.isCategoryHover) self._setCategoryOut(idx);
                });
            });

            self.$menuOpener.on('click', function(e){
                e.preventDefault();

                self._menuToggle();
            });

            $(window).on('resize', function(){
                self._resize();
            });
        },

        _menuToggle: function(){
            var self = this,
            active, replaceText;

            replaceText = self.$menuOpener.find('.blind');
            active = self.$menuOpener.hasClass('active');

            if(active){
                self.$menuOpener.removeClass('active');
                replaceText.text("메뉴 열기");

                if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
            } else{
                self.$menuOpener.addClass('active');
                replaceText.text("메뉴 닫기");

                if(!$('html').hasClass('scroll-fixed')) $('html').addClass('scroll-fixed');
            }
        },

        _menuToggleDisabled: function(){
            var self = this;

            var replaceText = self.$menuOpener.find('.blind');
            replaceText.text("메뉴 열기");

            self.$menuOpener.removeClass('active');

            if($('html').hasClass('scroll-fixed')) $('html').removeClass('scroll-fixed');
        },

        _menuToggleTansition: function(){

        },

        _gnbInit: function(){
            var self = this;

            self._removeOutTimer();
            self._setOut();
            
            self._setRemoveCategoryOutTimer();
            self._setCategoryOut();
        },

        _setCategoryOver: function(idx){
            var self = this;

            if(self.gnbMode == "pc"){
                self.isCategoryHover = true;
    
                var categoryItem = self.$categoryItems.eq(idx);
                var categoryAtag = categoryItem.find('.super-category-item');
                if(!categoryAtag.hasClass('active')) categoryAtag.addClass('active');
            }
        },

        _setCategoryOutTimer: function(idx){
            var self = this;

            if(self.gnbMode == "pc"){
                self.categoryOutTimer = setTimeout(function(){
                    self._setCategoryOut(idx);
                }, 128);
            }
        },

        _setRemoveCategoryOutTimer: function(){
            var self = this;

            if(self.categoryOutTimer != null){
                clearTimeout(self.categoryOutTimer);

                self.categoryOutTimer = null;
            }
        },

        _setCategoryOut: function(idx){
            var self = this;

            self.isCategoryHover = false;

            if(self.gnbMode == "pc"){
                var categoryItem = self.$categoryItems.eq(idx);
                var categoryAtag = categoryItem.find('.super-category-item');
                if(categoryAtag.hasClass('active')) categoryAtag.removeClass('active');
            }
        },

        _setOver: function(){
            var self = this,
            navItem;

            if(self.gnbMode == "pc"){
                self._removeOutTimer();
    
                self.isHover = true;
    
                self._setProductActiveToggle(true);
            }
        },

        _setOutTimer: function(){
            var self = this;

            if(self.gnbMode == "pc"){
                self.outTimer = setTimeout(function(){
                    self._setOut();
                }, 128);
            }
        },

        _removeOutTimer: function(){
            var self = this;

            if(self.gnbMode == "pc" && self.outTimer != null){
                clearTimeout(self.outTimer);

                self.outTimer = null;
            }
        },

        _setOut: function(){
            var self = this;
            
            self.isHover = false;

            if(self.gnbMode == "pc"){
                self._setProductActiveToggle(false);
            }
        },

        _setProductActiveToggle: function(active){
            var self = this;

            var replaceText = self.$product.find('.blind');
            if(active){
                if(!self.$product.hasClass('active')) self.$product.addClass('active');
                replaceText.text('제품 메뉴 닫기');
            } else{
                if(self.$product.hasClass('active')) self.$product.removeClass('active');
                replaceText.text('제품 메뉴 열기');
            }
        }
    });

    return Header;
});
/*!
 * @module vcui.ui.Accordion
 * @license MIT License
 * @description 아코디온 컴포넌트
 * @copyright VinylC UID Group
 */
define('ui/accordion', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var ui = core.ui,
        name = 'accordion',
        eventBeforeCollapse = name + 'beforecollapse',
        eventCollapse = name + 'collapse',
        eventBeforeExpand = name + 'beforeexpand',
        eventExpand = name + 'expand';

    /**
     * @class
     * @description 아코디언 컴포넌트
     * @name vcui.ui.Accordion
     * @extends vcui.ui.View
     */
    var Accordion = ui('Accordion', /**@lends vcui.ui.Accordion# */{
        $statics: {
            ON_BEFORE_COLLAPSE: eventBeforeCollapse,
            ON_COLLAPSE: eventCollapse,
            ON_BEFORE_EXPAND: eventBeforeExpand,
            ON_EXPAND: eventExpand
        },
        bindjQuery: name,
        defaults: {
            singleOpen: true,
            duration: 300,
            autoScroll: false,
            scrollTopOffset: 0,
            openIndex: -1,
            bindFullarea: true,
            openText: '닫기',
            closeText: '열기',
            selectedClass: 'active',
            itemSelector: '.ui_accord_item',
            headSelector: ".ui_accord_head",
            toggleSelector: ".ui_accord_toggle",
            contentSelector: ".ui_accord_content"
        },

        /**
         * 생성자
         * @param el 모듈 요소
         * @param {object} [options] 옵션(기본값: defaults 속성 참조)
         * @param {boolean} [options.singleOpen = false] 단일열림 / 다중열림 여부
         * @param {number} [options.duration = 200] 펼쳐지거나 닫혀지거나 할 때 애니메이션 속도
         * @param {string} [options.selectedClass = 'on'] 버튼이 토글될 때 추가할 css 클래스명
         * @param {string} [options.itemSelector = '.ui_accord_item'] 리스트 아이템
         * @param {string} [options.toggleSelector = '.ui_accord_toggle'] 토글버튼
         * @param {string} [options.contentSelector = '.ui_accord_content'] 컨텐츠
         */
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._buildARIA();
            self._bindEvent();

            self.collapseAll();

            var openIndex = self.options.openIndex;
            if (openIndex !== undefined) {
                if (openIndex === 'all') {
                    self.expandAll();
                } else {
                    var indexes = [].concat(openIndex);
                    if (self.options.singleOpen) {
                        self.expand(indexes[0], false);
                    } else {
                        core.each(indexes, function (index) {
                            self.expand(index, false);
                        });
                    }
                }
            }
        },

        _buildARIA: function _buildARA() {
            var self = this;
            var o = self.options;

            self._updateSelectors();

            self.$el.attr('role', 'presentation');            


            self.$items.each(function () {
                var $btn = $(this).find(o.toggleSelector);               
                var $content = $(this).find(o.contentSelector);
                var id = core.string.random(10);

                $btn.attr({
                    'id': 'accrod_toggle_' + id,
                    'aria-controls': 'accord_content_' + id,
                    'aria-expanded': $btn.attr('aria-expanded') === 'true'
                }).parent().attr('role', 'heading');

                $content.attr({
                    'id': 'accord_content_' + id,
                    'role': 'region',
                    'aria-labelledby': 'accord_toggle_' + id
                });
            });
        },

        update: function update() {
            this._buildARIA();
        },

        _updateSelectors: function _updateSelectors() {
            var self = this;
            var o = self.options;

            self.$items = self.$(o.itemSelector);


        },

        /**
         * 이벤트 바인딩
         * @private
         */
        _bindEvent: function _bindEvent() {
            var self = this,
                o = self.options;

            // 토글버튼 클릭됐을 때
            self.$el.find(o.itemSelector).each(function(idx, item){
                var bindelem = o.bindFullarea ? o.headSelector : o.toggleSelector;

                $(item).find(bindelem).on('click', function(e){
                    e.preventDefault();

                    if ($(item).hasClass(o.selectedClass)) {
                        self.collapse(idx, true);
                    } else {
                        self.expand(idx, true);
                    }
                });
            });

            if (o.accordGroup && o.singleOpen) {
                // 아코디언 요소가 따로 떨어져 있는 것을 data-accord-group속성을 묶고,
                // 하나가 열리면 그룹으로 묶여진 다른 아코디언에 열려진게 있으면 닫아준다.
                self.on(eventBeforeExpand, function (e) {
                    $('.ui_accordion[data-accord-group=' + o.accordGroup + '], ' + '.ui_accordion_list[data-accord-group=' + o.accordGroup + ']')
                    .not(self.$el).vcAccordion('collapse').find(o.itemSelector).removeClass(o.selectedClass);
                });
            }
        },

        _findSelected: function _findSelected() {
            return this.$items.filter('.' + self.options.selectedClass);
        },

        // 재정의
        _findItems: function _findItems() {
            var self = this,
                o = self.options,
                $items;

            if (o.accordType === 'detailview') {
                $items = self.$el;
            } else {
                $items = o.itemSelector ? self.$(o.itemSelector) : self.$el;
            }
            return $items;
        },

        _postCollapse: function _postCollapse(data) {
            var self = this;
        },
        _postExpand: function _postExpand(data) {
            var self = this,
                o = self.options;

            self._autoScroll(data);
        },

        _autoScroll: function _autoScroll(data) {
            var self = this,
                o = self.options;

            if (o.autoScroll) {
                var scrolltop, accordtop, headheight, contheight;
                if (typeof o.scrollTopOffset === 'function') {
                    scrolltop = o.scrollTopOffset();
                } else{
                    scrolltop = $(window).scrollTop();
                    accordtop = self.$el.offset().top;
                    self.$el.find(o.itemSelector).each(function(idx, item){
                        if(idx < data.index){
                            accordtop += $(item).find(o.headSelector).outerHeight(true);
    
                            if(!o.singleOpen && $(item).hasClass(o.selectedClass)) accordtop += $(item).find(o.contentSelector).outerHeight(true);
                        }
                    });

                    headheight = $(data.header).find(o.headSelector).outerHeight(true);
                    contheight = $(data.header).find(o.contentSelector).outerHeight(true);
                    if(accordtop + headheight + contheight - scrolltop > $(window).height()){
                        scrolltop = accordtop - o.scrollTopOffset;
                    } 
                }
                $('html, body').animate({
                    scrollTop: scrolltop
                }, 'fast');
            }
        },
        
        /**
         * @param {number} index 인댁스
         * @param {boolean} isAni 애니메이션 여부
         * @param {function} callback 콜백함수
         * @fires vcui.ui,Accordion#accordion:beforeCollapse
         * @fires vcui.ui,Accordion#accordion:collapse
         */
        collapse: function collapse(index, isAni, cb) {
            var self = this,
                opts = self.options,
                data = {},
                // 애니메이션 시간
            $items = self._findItems();

            if (arguments.length === 0 || index === null) {
                // index가 안넘어보면 현재 활성화된 패널의 index를 갖고 온다.
                index = $items.filter('.' + opts.selectedClass).index();
            }

            if (index < 0) {
                return;
            }

            data.index = index;
            data.header = $items.eq(index);
            data.content = data.header.find(opts.contentSelector);

            /**
             * 닫히기 전에 발생하는 이벤트
             * @event vcui.ui.Accordion#accordionbeforecollapse
             * @type {object}
             * @property {number} index 접혀질 인덱스번호
             */
            var ev = $.Event(eventBeforeCollapse);
            
            self.$el.triggerHandler(ev, index);
            if (ev.isDefaultPrevented()) {
                return;
            }

            /**
             * 닫힌 후에 발생하는 이벤트
             * @event vcui.ui.Accordion#accordioncollapse
             * @type {object}
             * @property {number} index 닫힌 인덱스 번호
             */
            if (isAni !== false) {
                // 애니메이션 모드
                //if(this.isAnimate) { return; }
                data.header.removeClass(opts.selectedClass);
                data.content.slideUp(opts.duration, function () {
                    // 닫혀진 후에 이벤트 발생
                    self.trigger(eventCollapse, index);
                    self._updateButton(index, false);
                    self._postCollapse(data);
                    cb && cb();
                });
            } else {
                // 일반 모드
                data.header.removeClass(opts.selectedClass);
                data.content.hide();
                // 닫혀진 후에 이벤트 발생
                self.trigger(eventCollapse, index);
                self._updateButton(index, false);
                self._postCollapse(data);
                cb && cb();
            }
        },

        /**
         * 확장시키기
         * @param {number} index 인댁스
         * @param {boolean} isAni 애니메이션 여부
         * @param {function} callback 콜백함수
         * @fires vcui.ui,Accordion#accordion:beforeExpand
         * @fires vcui.ui,Accordion#accordion:expand
         */
        expand: function expand(index, isAni, callback) {
            var self = this,
                opts = self.options,
                $items,
                oldItem,
                oldIndex,
                newItem,
                data;

            if (arguments.length === 0) {
                return;
            }

            $items = self._findItems();
            newItem = $items.eq(index);
            oldItem = $items.filter('.' + opts.selectedClass);
            oldIndex = oldItem.index();
            data = {
                index: index,
                header: newItem,
                oldIndex: oldIndex,
                oldHeader: oldIndex < 0 ? null : oldItem
            };

            if (data.index === data.oldIndex) {
                return;
            }

            data.content = newItem.find(opts.contentSelector);
            data.oldContent = oldIndex < 0 ? null : oldItem.find(opts.contentSelector);

            /**
             * 열리기 전에 이벤트 발생
             * @event vcui.ui.Accordion#accordionbeforeexpand
             * @type {object}
             * @property {number} index 열린 인덱스
             */
            var ev = $.Event(eventBeforeExpand);
            self.triggerHandler(ev, index);
            if (ev.isDefaultPrevented()) {
                return;
            }
            /**
             * @event vcui.ui.Accordion#accordionexpand
             * @type {object}
             * @property {number} index 열린 인덱스.
             */
            if (isAni !== false) {
                // 애니메이션 사용
                self.isAnimate = true;
                if (opts.singleOpen && data.oldHeader) {
                    // 하나만 열리는 모드
                    data.oldHeader.removeClass(opts.selectedClass);
                    data.oldContent.slideUp(opts.duration, function () {
                        self._updateButton(data.oldIndex, false);
                        callback && callback();
                    });
                }
                data.header.addClass(opts.selectedClass);
                data.content.slideDown(opts.duration, function () {
                    self.isAnimate = false;
                    // 열려진 후에 이벤트 발생
                    self.trigger(eventExpand, index);
                    self._updateButton(index, true);
                    self._postExpand(data);
                    callback && callback();
                });
            } else {
                // 에니메이션 미사용
                if (opts.singleOpen && data.oldHeader) {
                    // 하나만 열리는 모드
                    data.oldHeader.removeClass(opts.selectedClass);
                    data.oldContent.hide();
                }
                data.header.addClass(opts.selectedClass);
                data.content.show();

                // 열려진 후에 이벤트 발생
                self.trigger(eventExpand, index);
                self._updateButton(index, true);
                self._postExpand(data);
                callback && callback();
            }
        },

        getActivate: function getActivate() {
            var self = this,
                o = self.options,
                item = self._findItems().filter('.' + o.selectedClass);

            if (item.length === 0) {
                return {
                    index: -1,
                    header: null,
                    content: null
                };
            } else {
                return {
                    index: item.index(),
                    header: item,
                    content: item.find(o.contentSelector)
                };
            }
        },

        _updateButton: function _updateButton(index, toggle) {
            var self = this,
                changetxt,
                options = self.options,
                $item = self._findItems().eq(index);
                
            if(toggle){
                changetxt = typeof options.openText === 'string' ? options.openText : options.openText[index];
            } else{
                changetxt = typeof options.closeText === 'string' ? options.closeText : options.closeText[index];
            }
            $item.find('.ui_accord_text').text(changetxt);
        },

        collapseAll: function collapseAll(useAni) {
            var self = this,
                count = self._findItems().length,
                isAni = useAni || false;

            self.collapseMode = 'all';
            for (var i = 0; i < count; i++) {
                self.collapse(i, isAni);
                self._updateButton(i, false);
            }
            self.collapseMode = null;
        },

        expandAll: function expandAll(useAni) {
            if (this.options.singleOpen) {
                return;
            }
            var self = this,
                count = self._findItems().length,
                isAni = useAni || false;

            self.expandMode = 'all';
            for (var i = 0; i < count; i++) {
                self.expand(i, isAni);
                self._updateButton(i, true);
            }
            self.expandMode = null;
        }
    });

    return Accordion;
});
var _typeof3 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @module vcui.ui.Carousel
 * @license MIT License
 * @description 캐로우셀 컴포넌트
 * @copyright VinylC UID Group.
 */
define('ui/carousel', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    /*!
    Version: 1.7.1
    Author: Ken Wheeler
    Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
    Issues: http://github.com/kenwheeler/slick/issues
    */
    /* global window, document, define, jQuery, setInterval, clearInterval */

    var _typeof2 = typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof3(obj);
    };

    var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
    };

    var prefixModule = 'ui_carousel_';
    var _N = 'carousel';
    var _V = {
        INDEX: prefixModule + 'index',
        ACTIVE: 'on', //'slick-active',
        ARROW: prefixModule + 'arrow',
        PLAY: prefixModule + 'play',
        HIDDEN: prefixModule + 'hidden',
        DISABLED: 'disabled',
        DOTS: prefixModule + 'dots',
        SLIDE: prefixModule + 'slide',
        SLIDER: prefixModule + 'slider',
        CLONED: prefixModule + 'cloned',
        TRACK: prefixModule + 'track',
        LIST: prefixModule + 'list',
        LOADING: prefixModule + 'loading',
        CENTER: prefixModule + 'center',
        VISIBLE: prefixModule + 'visible',
        CURRENT: prefixModule + 'current',
        SRONLY: 'hide',
        PREV: prefixModule + 'prev',
        NEXT: prefixModule + 'next',

        UNBUILD: 'unbuild'
    };

    function addEventNS(str) {
        var pairs = str.split(' ');
        for (var i = -1, item; item = pairs[++i];) {
            pairs[i] = item + '.' + _N;
        }
        return pairs.join(' ');
    }

    var REGEX_HTML = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
    var instanceUid = 0;
    var componentInitials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        $playButton: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unbuilded: false
    };

    var Carousel = core.ui('Carousel', {
        bindjQuery: _N,
        defaults: {
            activeClass: _V.ACTIVE,
            dotsSelector: '.' + _V.DOTS,
            playSelector: '.' + _V.PLAY,
            carouselTitle: '',

            accessibility: true,
            adaptiveHeight: false,
            appendArrows: '.' + _V.ARROW,
            appendDots: '.' + _V.DOTS,
            arrows: true,
            asNavFor: null,
            prevArrow: '.' + _V.PREV,
            nextArrow: '.' + _V.NEXT,
            autoplay: false,
            autoplaySpeed: 3000,
            centerMode: false,
            centerPadding: '50px',
            cssEase: 'ease',
            customPaging: function customPaging(carousel, i) {
                return $('<button type="button" />').text(i + 1);
            },
            dots: true,
            dotsClass: _V.DOTS,
            draggable: true,
            easing: 'linear',
            edgeFriction: 0.35,
            fade: false,
            focusOnSelect: false,
            focusOnChange: false,
            infinite: true,
            initialSlide: 0,
            lazyLoad: 'ondemand',
            mobileFirst: false,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnDotsHover: false,
            respondTo: 'window',
            responsive: null,
            rows: 1,
            rtl: false,
            slide: '.' + _V.TRACK + '>*',
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: true,
            swipeToSlide: false,
            touchMove: true,
            touchThreshold: 5,
            useCSS: true,
            useTransform: true,
            variableWidth: false,
            vertical: false,
            verticalSwiping: false,
            preventVertical: false,
            waitForAnimate: true,
            zIndex: 1000
        },
        initialize: function initialize(element, options) {

            var self = this;

            if (self.supr(element, options) === false) {
                return;
            }

            core.extend(self, componentInitials);

            self.activeBreakpoint = null;
            self.animType = null;
            self.animProp = null;
            self.breakpoints = [];
            self.breakpointSettings = [];
            self.cssTransitions = false;
            self.focussed = false;
            self.interrupted = false;
            self.paused = true;
            self.positionProp = null;
            self.respondTo = null;
            self.rowCount = 1;
            self.shouldClick = true;
            self.$slidesCache = null;
            self.transformType = null;
            self.transitionType = null;
            self.hidden = 'hidden';
            self.visibilityChange = 'visibilitychange';
            self.windowWidth = 0;
            self.windowTimer = null;
            self.currentSlide = self.options.initialSlide;
            self.originalSettings = self.options;

            self.$slider = $(element);
            console.log(element)

            if (typeof document.mozHidden !== 'undefined') {
                self.hidden = 'mozHidden';
                self.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                self.hidden = 'webkitHidden';
                self.visibilityChange = 'webkitvisibilitychange';
            }

            self.autoPlay = self.autoPlay.bind(self);
            self.autoPlayClear = self.autoPlayClear.bind(self);
            self.autoPlayIterator = self.autoPlayIterator.bind(self);
            self.changeSlide = self.changeSlide.bind(self);
            self.clickHandler = self.clickHandler.bind(self);
            self.selectHandler = self.selectHandler.bind(self);
            self.setPosition = self.setPosition.bind(self);
            self.swipeHandler = self.swipeHandler.bind(self);
            self.keyHandler = self.keyHandler.bind(self);

            self.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            self.htmlExpr = REGEX_HTML;

            self.registerBreakpoints();
            self.init(true);
        },
        activateADA: function activateADA(flag) {
            var self = this;
            var opt = self.options;

            self.$slideTrack.find('.' + opt.active).attr({
                'aria-hidden': !flag ? 'false' : 'true'
            }).find('a, input, button, select').attr({
                'tabindex': !flag ? '0' : '-1'
            });
        },
        addSlide: function addSlide(markup, index, addBefore) {

            var self = this;
            var opt = self.options;
            var count = self.$slides.length;
            var regex = /\{\{no\}\}/gi;

            if (typeof index === 'boolean') {
                addBefore = index;
                index = null;
            } else if (index < 0 || index >= self.slideCount) {
                return false;
            }

            self.unload();

            if (typeof index === 'number') {
                var $slide = self.$slides.eq(index);
                if (index === 0 && count === 0) {
                    $(markup.replace(regex, index + 1)).appendTo(self.$slideTrack);
                } else if (addBefore) {
                    $(markup.replace(regex, index)).insertBefore($slide);
                } else {
                    $(markup.replace(regex, index + 1)).insertAfter($slide);
                }
            } else {
                if (addBefore === true) {
                    $(markup.replace(regex, 0)).prependTo(self.$slideTrack);
                } else {
                    $(markup.replace(regex, count + 1)).appendTo(self.$slideTrack);
                }
            }

            self.$slides = self.$slideTrack.children(opt.slide);

            // comahead
            self.$slides.css('float', 'left');

            self.$slideTrack.children().detach();

            self.$slideTrack.append(self.$slides);

            self.$slides.each(function (index, element) {
                $(element).attr('data-' + _V.INDEX, index);
            });

            self.$slidesCache = self.$slides;

            self.reinit();
        },
        animateHeight: function animateHeight() {
            var self = this;
            var opt = self.options;

            if (opt.slidesToShow === 1 && opt.adaptiveHeight === true && opt.vertical === false) {
                var targetHeight = self.$slides.eq(self.currentSlide).outerHeight(true);
                self.$list.animate({
                    height: targetHeight
                }, opt.speed);
            }
        },
        animateSlide: function animateSlide(targetLeft, callback) {

            var animProps = {},
                self = this,
                opt = self.options;

            self.animateHeight();

            if (opt.rtl === true && opt.vertical === false) {
                targetLeft = -targetLeft;
            }
            if (self.transformsEnabled === false) {
                if (opt.vertical === false) {
                    self.$slideTrack.animate({
                        left: targetLeft
                    }, opt.speed, opt.easing, callback);
                } else {
                    self.$slideTrack.animate({
                        top: targetLeft
                    }, opt.speed, opt.easing, callback);
                }
            } else {

                if (self.cssTransitions === false) {
                    if (opt.rtl === true) {
                        self.currentLeft = -self.currentLeft;
                    }
                    $({
                        animStart: self.currentLeft
                    }).animate({
                        animStart: targetLeft
                    }, {
                        duration: opt.speed,
                        easing: opt.easing,
                        step: function step(now) {
                            now = Math.ceil(now);
                            if (opt.vertical === false) {
                                animProps[self.animType] = 'translate(' + now + 'px, 0px)';
                                self.$slideTrack.css(animProps);
                            } else {
                                animProps[self.animType] = 'translate(0px,' + now + 'px)';
                                self.$slideTrack.css(animProps);
                            }
                        },
                        complete: function complete() {
                            if (callback) {
                                callback.call();
                            }
                        }
                    });
                } else {

                    self.applyTransition();
                    targetLeft = Math.ceil(targetLeft);

                    if (opt.vertical === false) {
                        animProps[self.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                    } else {
                        animProps[self.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                    }
                    self.$slideTrack.css(animProps);

                    if (callback) {
                        setTimeout(function () {

                            self.disableTransition();

                            callback.call();
                        }, opt.speed);
                    }
                }
            }
        },
        getNavTarget: function getNavTarget() {

            var self = this,
                opt = self.options,
                asNavFor = opt.asNavFor;

            if (asNavFor && asNavFor !== null) {
                asNavFor = $(asNavFor).not(self.$slider);
            }

            return asNavFor;
        },
        asNavFor: function asNavFor(index) {

            var self = this,
                asNavFor = self.getNavTarget();

            if (asNavFor !== null && (typeof asNavFor === 'undefined' ? 'undefined' : _typeof(asNavFor)) === 'object') {
                asNavFor.each(function () {
                    var target = $(this).vcCarousel('getCarousel');
                    if (!target.unbuilded) {
                        target.slideHandler(index, true);
                    }
                });
            }
        },
        applyTransition: function applyTransition(slide) {

            var self = this,
                transition = {},
                opt = self.options;

            if (opt.fade === false) {
                transition[self.transitionType] = self.transformType + ' ' + opt.speed + 'ms ' + opt.cssEase;
            } else {
                transition[self.transitionType] = 'opacity ' + opt.speed + 'ms ' + opt.cssEase;
            }

            if (opt.fade === false) {
                self.$slideTrack.css(transition);
            } else {
                self.$slides.eq(slide).css(transition);
            }
        },
        autoPlay: function autoPlay() {

            var self = this;
            var opt = self.options;

            self.autoPlayClear();

            if (self.slideCount > opt.slidesToShow) {
                self.autoPlayTimer = setInterval(self.autoPlayIterator, opt.autoplaySpeed);
            }
        },
        autoPlayClear: function autoPlayClear() {

            var self = this;

            if (self.autoPlayTimer) {
                clearInterval(self.autoPlayTimer);
            }
        },
        autoPlayIterator: function autoPlayIterator() {

            var self = this,
                opt = self.options,
                slideTo = self.currentSlide + opt.slidesToScroll;

            if (!self.paused && !self.interrupted && !self.focussed) {

                if (opt.infinite === false) {

                    if (self.direction === 1 && self.currentSlide + 1 === self.slideCount - 1) {
                        self.direction = 0;
                    } else if (self.direction === 0) {

                        slideTo = self.currentSlide - opt.slidesToScroll;

                        if (self.currentSlide - 1 === 0) {
                            self.direction = 1;
                        }
                    }
                }

                self.slideHandler(slideTo);
            }
        },
        buildArrows: function buildArrows() {

            var self = this,
                opt = self.options,
                $p,
                $n;

            if (opt.arrows === true) {
                $p = self.$prevArrow = self.$el.find(opt.prevArrow).addClass(_V.ARROW);
                $n = self.$nextArrow = self.$el.find(opt.nextArrow).addClass(_V.ARROW);

                if (self.slideCount > opt.slidesToShow) {

                    $p.removeClass(_V.HIDDEN).removeAttr('aria-hidden tabindex');
                    $n.removeClass(_V.HIDDEN).removeAttr('aria-hidden tabindex');

                    if (self.htmlExpr.test(opt.prevArrow)) {
                        $p.prependTo(opt.appendArrows);
                    }

                    if (self.htmlExpr.test(opt.nextArrow)) {
                        $n.appendTo(opt.appendArrows);
                    }

                    if (opt.infinite !== true) {
                        $p.addClass(_V.DISABLED).prop('disabled', true).attr('aria-disabled', 'true');
                    }
                } else {

                    $p.add(self.$nextArrow).addClass(_V.HIDDEN).attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });
                }
            }
        },
        buildDots: function buildDots() {

            var self = this,
                opt = self.options,
                i,
                dots,
                dot,
                cloned;

            if (opt.dots === true) {

                self.$slider.addClass(_V.DOTS);

                if (opt.dotsSelector) {
                    dots = self.$slider.find(opt.dotsSelector).show().addClass('ui_static');

                    if (dots.children().length || self.staticDot) {
                        if (self.staticDot) {
                            dot = self.staticDot;
                        } else {
                            dot = dots.children().first();
                            self.staticDot = dot;
                        }
                        dots.empty();
                        if (!opt.carouselTitle) {
                            opt.carouselTitle = dot.find('.' + _V.SRONLY).text();
                        }
                        for (i = 0; i <= self.getDotCount(); i += 1) {
                            dots.append(cloned = dot.clone().removeClass(opt.activeClass));
                            cloned.find('.' + _V.SRONLY).text(opt.carouselTitle.replace(/{{no}}/, i + 1));
                        }
                        dot = null;
                    } else {
                        for (i = 0; i <= self.getDotCount(); i += 1) {
                            dots.append($('<li />').append(opt.customPaging.call(this, self, i)));
                        }
                    }
                } else {
                    dots = $('<ul />');
                    dots.addClass(opt.dotsClass);
                    dots.appendTo(opt.appendDots);
                    for (i = 0; i <= self.getDotCount(); i += 1) {
                        dots.append($('<li />').append(opt.customPaging.call(this, self, i)));
                    }
                }
            }
            self.$dots = dots;
            dots.find('li').first().addClass(_V.ACTIVE);
        },
        buildOut: function buildOut() {

            var self = this,
                opt = self.options;

            self.$slides = self.$slider.find(opt.slide + ':not(' + _V.CLONED + ')').addClass(_V.SLIDE);
            // comahead
            self.$slides.css('float', 'left');

            self.slideCount = self.$slides.length;

            self.$slides.each(function (index, element) {
                $(element).attr('data-' + _V.INDEX, index).data('originalStyling', $(element).attr('style') || '');
            });

            self.$slider.addClass(_V.SLIDER);

            if ((self.$slideTrack = self.$slider.find('.' + _V.TRACK)).length === 0) {
                self.$slideTrack = self.slideCount === 0 ? $('<div class="' + _V.TRACK + '"/>').appendTo(self.$slider) : self.$slides.wrapAll('<div class="' + _V.TRACK + '"/>').parent();
            } else {
                self.$slideTrack.addClass('ui_static');
            }

            if ((self.$list = self.$slider.find('.' + _V.LIST)).length === 0) {
                self.$list = self.$slideTrack.wrap('<div class="' + _V.LIST + '"/>').parent();
            } else {
                self.$list.addClass('ui_static');
            }

            //self.$list.css('overflow', 'hidden');
            self.$slideTrack.css('opacity', 0);

            if (opt.centerMode === true || opt.swipeToSlide === true) {
                opt.slidesToScroll = 1;
            }

            $('img[data-lazy]', self.$slider).not('[src]').addClass(_V.LOADING);

            self.setupInfinite();

            self.buildArrows();

            self.buildDots();

            self.updateDots();

            self.setSlideClasses(typeof self.currentSlide === 'number' ? self.currentSlide : 0);

            if (opt.draggable === true) {
                self.$list.addClass('draggable');
            }
        },
        buildRows: function buildRows() {

            var self = this,
                opt = self.options,
                a,
                b,
                c,
                newSlides,
                numOfSlides,
                originalSlides,
                slidesPerSection;

            newSlides = document.createDocumentFragment();
            originalSlides = self.$slider.children();

            if (opt.rows > 1) {

                slidesPerSection = opt.slidesPerRow * opt.rows;
                numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

                for (a = 0; a < numOfSlides; a++) {
                    var slide = document.createElement('div');
                    for (b = 0; b < opt.rows; b++) {
                        var row = document.createElement('div');
                        for (c = 0; c < opt.slidesPerRow; c++) {
                            var target = a * slidesPerSection + (b * opt.slidesPerRow + c);
                            if (originalSlides.get(target)) {
                                row.appendChild(originalSlides.get(target));
                            }
                        }
                        slide.appendChild(row);
                    }
                    newSlides.appendChild(slide);
                }

                self.$slider.empty().append(newSlides);
                self.$slider.children().children().children().css({
                    'width': 100 / opt.slidesPerRow + '%',
                    'display': 'inline-block'
                });
            }
        },

        _getTargetBreakpoint: function _getTargetBreakpoint() {
            var self = this,
                b = self.breakpoints,
                breakpoint,
                respondToWidth,
                targetBreakpoint = null;

            switch (self.responseTo) {
                case 'carousel':
                    respondToWidth = self.$slider.width();
                    break;
                case 'min':
                    respondToWidth = Math.min(window.innerWidth || $(window).width(), self.$slider.width());
                    break;
                default:
                    respondToWidth = window.innerWidth || $(window).width();
                    break;
            }

            for (breakpoint in b) {
                if (b.hasOwnProperty(breakpoint)) {
                    if (self.originalSettings.mobileFirst === false) {
                        if (respondToWidth < b[breakpoint]) {
                            targetBreakpoint = b[breakpoint];
                        }
                    } else {
                        if (respondToWidth > b[breakpoint]) {
                            targetBreakpoint = b[breakpoint];
                        }
                    }
                }
            }
            return targetBreakpoint;
        },

        checkResponsive: function checkResponsive(initial, forceUpdate) {

            var self = this,
                opt = self.options,
                bs = self.breakpointSettings,
                targetBreakpoint,
                triggerBreakpoint = false;

            if (opt.responsive && opt.responsive.length) {

                targetBreakpoint = self._getTargetBreakpoint();

                if (targetBreakpoint !== null) {
                    if (self.activeBreakpoint !== null) {
                        if (targetBreakpoint !== self.activeBreakpoint || forceUpdate) {
                            self.activeBreakpoint = targetBreakpoint;
                            if (bs[targetBreakpoint] === _V.UNBUILD) {
                                self.unbuild(targetBreakpoint);
                            } else {
                                self.options = opt = $.extend({}, self.originalSettings, bs[targetBreakpoint]);
                                if (initial === true) {
                                    self.currentSlide = opt.initialSlide;
                                }

                                self.refresh(initial);
                            }
                            triggerBreakpoint = targetBreakpoint;
                        }
                    } else {
                        self.activeBreakpoint = targetBreakpoint;
                        if (bs[targetBreakpoint] === _V.UNBUILD) {
                            self.unbuild(targetBreakpoint);
                        } else {
                            self.options = $.extend({}, self.originalSettings, bs[targetBreakpoint]);
                            if (initial === true) {
                                self.currentSlide = opt.initialSlide;
                            }
                            self.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    if (self.activeBreakpoint !== null) {
                        self.activeBreakpoint = null;
                        self.options = opt = self.originalSettings;
                        if (initial === true) {
                            self.currentSlide = opt.initialSlide;
                        }
                        self.refresh(initial);
                        triggerBreakpoint = targetBreakpoint;
                    }
                }

                // only trigger breakpoints during an actual break. not on initialize.
                if (!initial && triggerBreakpoint !== false) {
                    self.triggerHandler(_N + 'breakpoint', [self, triggerBreakpoint]);
                }
            }
        },
        changeSlide: function changeSlide(event, dontAnimate) {

            var self = this,
                opt = self.options,
                $target = $(event.currentTarget),
                indexOffset,
                slideOffset,
                unevenOffset;

            // If target is a link, prevent default action.
            if ($target.is('a')) {
                event.preventDefault();
            }

            // If target is not the <li> element (ie: a child), find the <li>.
            if (!$target.is('li')) {
                $target = $target.closest('li');
            }

            unevenOffset = self.slideCount % opt.slidesToScroll !== 0;
            indexOffset = unevenOffset ? 0 : (self.slideCount - self.currentSlide) % opt.slidesToScroll;

            switch (event.data.message) {

                case 'previous':
                    slideOffset = indexOffset === 0 ? opt.slidesToScroll : opt.slidesToShow - indexOffset;
                    if (self.slideCount > opt.slidesToShow) {
                        self.slideHandler(self.currentSlide - slideOffset, false, dontAnimate);
                    }
                    break;

                case 'next':
                    slideOffset = indexOffset === 0 ? opt.slidesToScroll : indexOffset;
                    if (self.slideCount > opt.slidesToShow) {
                        self.slideHandler(self.currentSlide + slideOffset, false, dontAnimate);
                    }
                    break;

                case 'index':
                    var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * opt.slidesToScroll;

                    self.slideHandler(self.checkNavigable(index), false, dontAnimate);
                    $target.children().trigger('focus');
                    break;

                default:
                    return;
            }
        },
        checkNavigable: function checkNavigable(index) {

            var self = this,
                opt = self.options,
                navigables,
                prevNavigable;

            navigables = self.getNavigableIndexes();
            prevNavigable = 0;
            if (index > navigables[navigables.length - 1]) {
                index = navigables[navigables.length - 1];
            } else {
                for (var n in navigables) {
                    if (index < navigables[n]) {
                        index = prevNavigable;
                        break;
                    }
                    prevNavigable = navigables[n];
                }
            }

            return index;
        },
        cleanUpEvents: function cleanUpEvents() {

            var self = this,
                opt = self.options;

            if (opt.dots && self.$dots !== null) {

                $('li', self.$dots).off('click.' + _N, self.changeSlide).off('mouseenter.' + _N).off('mouseleave.' + _N);

                if (opt.accessibility === true) {
                    self.$dots.off('keydown.' + _N, self.keyHandler);
                }
            }

            self.$slider.off('focus.' + _N + ' blur.' + _N);

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {
                self.$prevArrow && self.$prevArrow.off('click.' + _N, self.changeSlide);
                self.$nextArrow && self.$nextArrow.off('click.' + _N, self.changeSlide);
            }

            self.$list.off('touchstart.' + _N + ' mousedown.' + _N, self.swipeHandler);
            self.$list.off('touchmove.' + _N + ' mousemove.' + _N, self.swipeHandler);
            self.$list.off('touchend.' + _N + ' mouseup.' + _N, self.swipeHandler);
            self.$list.off('touchcancel.' + _N + ' mouseleave.' + _N, self.swipeHandler);

            self.$list.off('click.' + _N, self.clickHandler);

            $(document).off(self.visibilityChange, self.visibility);

            self.cleanUpSlideEvents();

            if (opt.accessibility === true) {
                self.$list.off('keydown.' + _N, self.keyHandler);
            }

            if (opt.focusOnSelect === true) {
                $(self.$slideTrack).children().off('click.' + _N, self.selectHandler);
            }

            $(window).off('orientationchange.' + _N + '-' + self.instanceUid, self.orientationChange);

            $(window).off('resize.' + _N + '-' + self.instanceUid, self.resize);

            $('[draggable!=true]', self.$slideTrack).off('dragstart', self.preventDefault);

            $(window).off('load.' + _N + '-' + self.instanceUid, self.setPosition);
            $(document).off('ready.' + _N + '-' + self.instanceUid, self.setPosition);
        },
        cleanUpSlideEvents: function cleanUpSlideEvents() {

            var self = this,
                opt = self.options;

            self.$list.off('mouseenter.' + _N);
            self.$list.off('mouseleave.' + _N);
        },
        cleanUpRows: function cleanUpRows() {

            var self = this,
                opt = self.options,
                originalSlides;

            if (opt.rows > 1) {
                originalSlides = self.$slides.children().children();
                originalSlides.removeAttr('style');
                self.$slider.empty().append(originalSlides);
            }
        },
        clickHandler: function clickHandler(event) {

            var self = this,
                opt = self.options;

            if (self.shouldClick === false) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
            }
        },
        destroy: function destroy(refresh) {

            var self = this,
                opt = self.options;

            self.autoPlayClear();

            self.touchObject = {};

            self.cleanUpEvents();

            $(_V.CLONED, self.$slider).detach();

            if (self.$dots) {
                if (self.$dots.hasClass('ui_static')) {
                    self.$dots.empty().removeClass('ui_static');
                } else {
                    self.$dots.remove();
                }
            }

            if (self.$prevArrow && self.$prevArrow.length) {

                self.$prevArrow.removeClass(_V.DISABLED + ' ' + _V.ARROW + ' ' + _V.HIDDEN).prop('disabled', false).removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

                if (self.htmlExpr.test(opt.prevArrow)) {
                    self.$prevArrow.remove();
                }
            }

            if (self.$nextArrow && self.$nextArrow.length) {

                self.$nextArrow.removeClass(_V.DISABLED + ' ' + _V.ARROW + ' ' + _V.HIDDEN).prop('disabled', false).removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

                if (self.htmlExpr.test(opt.nextArrow)) {
                    self.$nextArrow.remove();
                }
            }

            if (self.$slides) {

                var isMarkuped = self.$slideTrack.hasClass('ui_static');
                // comahead
                self.$slides.css('float', '');

                self.$slides.removeClass(_V.SLIDE + ' ' + opt.activeClass + ' ' + _V.CENTER + ' ' + _V.VISIBLE + ' ' + _V.CURRENT).removeAttr('aria-hidden data-' + _V.INDEX + ' tabindex role').each(function () {
                    $(this).attr('style', $(this).data('originalStyling'));
                });

                if (isMarkuped) {
                    self.$list.off().removeClass('ui_static');
                    self.$slideTrack.attr('style', '').off().removeClass('ui_static');
                    self.$slideTrack.empty().append(self.$slides);
                } else {
                    self.$slideTrack.children(this.options.slide).detach();
                    self.$slideTrack.detach();
                    self.$list.detach();
                    self.$slider.append(self.$slides);
                }
            }

            self.cleanUpRows();

            self.$slider.removeClass(_V.SLIDER);
            self.$slider.removeClass(_N + '-initialized');
            self.$slider.removeClass(_V.DOTS);

            self.unbuilded = true;

            if (!refresh) {
                self.triggerHandler('destroy', [self]);
            }
        },
        disableTransition: function disableTransition(slide) {

            var self = this,
                opt = self.options,
                transition = {};

            transition[self.transitionType] = '';

            if (opt.fade === false) {
                self.$slideTrack.css(transition);
            } else {
                self.$slides.eq(slide).css(transition);
            }
        },
        fadeSlide: function fadeSlide(slideIndex, callback) {

            var self = this,
                opt = self.options;

            if (self.cssTransitions === false) {

                self.$slides.eq(slideIndex).css({
                    zIndex: opt.zIndex
                });

                self.$slides.eq(slideIndex).animate({
                    opacity: 1
                }, opt.speed, opt.easing, callback);
            } else {

                self.applyTransition(slideIndex);

                self.$slides.eq(slideIndex).css({
                    opacity: 1,
                    zIndex: opt.zIndex
                });

                if (callback) {
                    setTimeout(function () {

                        self.disableTransition(slideIndex);

                        callback.call();
                    }, opt.speed);
                }
            }
        },
        fadeSlideOut: function fadeSlideOut(slideIndex) {

            var self = this,
                opt = self.options;

            if (self.cssTransitions === false) {

                self.$slides.eq(slideIndex).animate({
                    opacity: 0,
                    zIndex: opt.zIndex - 2
                }, opt.speed, opt.easing);
            } else {

                self.applyTransition(slideIndex);

                self.$slides.eq(slideIndex).css({
                    opacity: 0,
                    zIndex: opt.zIndex - 2
                });
            }
        },
        filterSlides: function filterSlides(filter) {

            var self = this,
                opt = self.options;

            if (filter !== null) {

                self.$slidesCache = self.$slides;

                self.unload();

                self.$slideTrack.children(this.options.slide).detach();

                self.$slidesCache.filter(filter).appendTo(self.$slideTrack);

                self.reinit();
            }
        },
        focusHandler: function focusHandler() {

            var self = this,
                opt = self.options;

            self.$slider.off('focus.' + _N + ' blur.' + _N).on('focus.' + _N + ' blur.' + _N, '*', function (event) {

                event.stopImmediatePropagation();
                var $sf = $(this);

                setTimeout(function () {

                    if (opt.pauseOnFocus) {
                        self.focussed = $sf.is(':focus');
                        self.autoPlay();
                    }
                }, 0);
            });
        },
        getCurrent: function getCurrent() {

            var self = this,
                opt = self.options;
            return self.currentSlide;
        },
        getDotCount: function getDotCount() {

            var self = this,
                opt = self.options;

            var breakPoint = 0;
            var counter = 0;
            var pagerQty = 0;

            if (opt.infinite === true) {
                if (self.slideCount <= opt.slidesToShow) {
                    ++pagerQty;
                } else {
                    while (breakPoint < self.slideCount) {
                        ++pagerQty;
                        breakPoint = counter + opt.slidesToScroll;
                        counter += opt.slidesToScroll <= opt.slidesToShow ? opt.slidesToScroll : opt.slidesToShow;
                    }
                }
            } else if (opt.centerMode === true) {
                pagerQty = self.slideCount;
            } else if (!opt.asNavFor) {
                pagerQty = 1 + Math.ceil((self.slideCount - opt.slidesToShow) / opt.slidesToScroll);
            } else {
                while (breakPoint < self.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + opt.slidesToScroll;
                    counter += opt.slidesToScroll <= opt.slidesToShow ? opt.slidesToScroll : opt.slidesToShow;
                }
            }

            return pagerQty - 1;
        },
        getLeft: function getLeft(slideIndex) {

            var self = this,
                opt = self.options,
                targetLeft,
                verticalHeight,
                verticalOffset = 0,
                targetSlide,
                coef;

            self.slideOffset = 0;
            verticalHeight = self.$slides.first().outerHeight(true);

            if (opt.infinite === true) {
                if (self.slideCount > opt.slidesToShow) {
                    self.slideOffset = self.slideWidth * opt.slidesToShow * -1;
                    coef = -1;

                    if (opt.vertical === true && opt.centerMode === true) {
                        if (opt.slidesToShow === 2) {
                            coef = -1.5;
                        } else if (opt.slidesToShow === 1) {
                            coef = -2;
                        }
                    }
                    verticalOffset = verticalHeight * opt.slidesToShow * coef;
                }
                if (self.slideCount % opt.slidesToScroll !== 0) {
                    if (slideIndex + opt.slidesToScroll > self.slideCount && self.slideCount > opt.slidesToShow) {
                        if (slideIndex > self.slideCount) {
                            self.slideOffset = (opt.slidesToShow - (slideIndex - self.slideCount)) * self.slideWidth * -1;
                            verticalOffset = (opt.slidesToShow - (slideIndex - self.slideCount)) * verticalHeight * -1;
                        } else {
                            self.slideOffset = self.slideCount % opt.slidesToScroll * self.slideWidth * -1;
                            verticalOffset = self.slideCount % opt.slidesToScroll * verticalHeight * -1;
                        }
                    }
                }
            } else {
                if (slideIndex + opt.slidesToShow > self.slideCount) {
                    self.slideOffset = (slideIndex + opt.slidesToShow - self.slideCount) * self.slideWidth;
                    verticalOffset = (slideIndex + opt.slidesToShow - self.slideCount) * verticalHeight;
                }
            }

            if (self.slideCount <= opt.slidesToShow) {
                self.slideOffset = 0;
                verticalOffset = 0;
            }

            if (opt.centerMode === true && self.slideCount <= opt.slidesToShow) {
                self.slideOffset = self.slideWidth * Math.floor(opt.slidesToShow) / 2 - self.slideWidth * self.slideCount / 2;
            } else if (opt.centerMode === true && opt.infinite === true) {
                self.slideOffset += self.slideWidth * Math.floor(opt.slidesToShow / 2) - self.slideWidth;
            } else if (opt.centerMode === true) {
                self.slideOffset = 0;
                self.slideOffset += self.slideWidth * Math.floor(opt.slidesToShow / 2);
            }

            if (opt.vertical === false) {
                targetLeft = slideIndex * self.slideWidth * -1 + self.slideOffset;
            } else {
                targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
            }

            if (opt.variableWidth === true) {

                if (self.slideCount <= opt.slidesToShow || opt.infinite === false) {
                    targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex);
                } else {
                    targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex + opt.slidesToShow);
                }

                if (opt.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (self.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft = 0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                if (opt.centerMode === true) {
                    if (self.slideCount <= opt.slidesToShow || opt.infinite === false) {
                        targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex);
                    } else {
                        targetSlide = self.$slideTrack.children('.' + _V.SLIDE).eq(slideIndex + opt.slidesToShow + 1);
                    }

                    if (opt.rtl === true) {
                        if (targetSlide[0]) {
                            targetLeft = (self.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                        } else {
                            targetLeft = 0;
                        }
                    } else {
                        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                    }

                    targetLeft += (self.$list.width() - targetSlide.outerWidth()) / 2;
                }
            }

            return targetLeft;
        },
        getOption: function getOption(option) {

            var self = this,
                opt = self.options;

            return opt[option];
        },
        getNavigableIndexes: function getNavigableIndexes() {

            var self = this,
                opt = self.options,
                breakPoint = 0,
                counter = 0,
                indexes = [],
                max;

            if (opt.infinite === false) {
                max = self.slideCount;
            } else {
                breakPoint = opt.slidesToScroll * -1;
                counter = opt.slidesToScroll * -1;
                max = self.slideCount * 2;
            }

            while (breakPoint < max) {
                indexes.push(breakPoint);
                breakPoint = counter + opt.slidesToScroll;
                counter += opt.slidesToScroll <= opt.slidesToShow ? opt.slidesToScroll : opt.slidesToShow;
            }

            return indexes;
        },
        getCarousel: function getCarousel() {

            return this;
        },
        getSlideCount: function getSlideCount() {

            var self = this,
                opt = self.options,
                slidesTraversed,
                swipedSlide,
                centerOffset;

            centerOffset = opt.centerMode === true ? self.slideWidth * Math.floor(opt.slidesToShow / 2) : 0;

            if (opt.swipeToSlide === true) {
                self.$slideTrack.find('.' + _V.SLIDE).each(function (index, slide) {
                    if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > self.swipeLeft * -1) {
                        swipedSlide = slide;
                        return false;
                    }
                });

                slidesTraversed = Math.abs($(swipedSlide).attr('data-' + _V.INDEX) - self.currentSlide) || 1;

                return slidesTraversed;
            } else {
                return opt.slidesToScroll;
            }
        },
        goTo: function goTo(slide, dontAnimate) {

            var self = this,
                opt = self.options;

            self.changeSlide({
                data: {
                    message: 'index',
                    index: parseInt(slide)
                }
            }, dontAnimate);
        },
        init: function init(creation) {
            var self = this,
                opt = self.options;

            if (!$(self.$slider).hasClass(_N + '-initialized')) {

                $(self.$slider).addClass(_N + '-initialized');

                self.buildRows();
                self.buildOut();
                self.setProps();
                self.startLoad();
                self.loadSlider();
                self.initializeEvents();
                self.updateArrows();
                self.updateDots();
                self.checkResponsive(true);
                self.focusHandler();

                self.buildPlayButton();
                self.buildAccessbility();
            }

            if (creation) {
                self.triggerHandler(_N + 'init', [self]);
            }

            if (opt.accessibility === true) {
                self.initADA();
            }

            if (opt.autoplay) {

                self.paused = false;
                self.autoPlay();
                self.triggerHandler(_N + 'play', [self]);
            }
        },
        buildPlayButton: function buildPlayButton() {
            var self = this,
                opt = self.options;

            self.$playButon = $('.' + _V.PLAY);
            if (self.$playButon.length) {
                opt.pauseOnHover = true;

                self.$playButon.on('click', function (e) {
                    if (self.paused === false) {
                        self.pause();
                    } else {
                        self.play();
                    }
                });
            }
        },
        buildAccessbility: function buildAccessbility() {
            var self = this;

            if (self.$playButon.length) {
                self.$slider.on(_N + 'play ' + _N + 'stop destory', function (e) {
                    var $items = self.$playButon.find('[data-bind-text]');
                    var state = e.type === _N + 'play' ? 'stop' : 'play';

                    self.$playButon.removeClass('play stop').addClass(state);
                    $items.each(function () {
                        var $this = $(this),
                            data = $this.data('bindText');

                        $this.text(data[state]);
                    }); //
                });
            }

            if (self.$dots.length) {
                self.$slider.on(_N + 'afterchange', function (e, carousel, index) {
                    self.$dots.find('[data-bind-text]').text('');
                    self.$dots.eq(index).find('[data-bind-text]').text(function () {
                        return this.getAttribute('data-bind-text') || '';
                    });
                });
            }
        },
        initADA: function initADA() {
            var self = this,
                opt = self.options,
                numDotGroups = Math.ceil(self.slideCount / opt.slidesToShow),
                tabControlIndexes = self.getNavigableIndexes().filter(function (val) {
                return val >= 0 && val < self.slideCount;
            });

            self.$slides.add(self.$slideTrack.find('.' + _V.CLONED)).attr({
                'aria-hidden': 'true',
                'tabindex': '-1'
            }).find('a, input, button, select').attr({
                'tabindex': '-1'
            });

            if (self.$dots !== null) {
                self.$slides.not(self.$slideTrack.find('.' + _V.CLONED)).each(function (i) {
                    var slideControlIndex = tabControlIndexes.indexOf(i);

                    $(this).attr({
                        'role': 'tabpanel',
                        'id': _V.SLIDE + self.instanceUid + i,
                        'tabindex': -1
                    });

                    if (slideControlIndex !== -1) {
                        $(this).attr({
                            'aria-describedby': _V.SLIDE + '-control' + self.instanceUid + slideControlIndex
                        });
                    }
                });

                self.$dots.attr('role', 'tablist').find('li').each(function (i) {
                    var mappedSlideIndex = tabControlIndexes[i];

                    $(this).attr({
                        'role': 'presentation'
                    });

                    $(this).find('button').first().attr({
                        'role': 'tab',
                        'id': _V.SLIDE + '-control' + self.instanceUid + i,
                        'aria-controls': _V.SLIDE + self.instanceUid + mappedSlideIndex,
                        'aria-label': i + 1 + ' of ' + numDotGroups,
                        'aria-selected': null //,
                        //'tabindex': '-1'
                    });
                }).eq(self.currentSlide).find('button').attr({
                    'aria-selected': 'true',
                    'tabindex': '0'
                }).end();
            }

            for (var i = self.currentSlide, max = i + opt.slidesToShow; i < max; i++) {
                self.$slides.eq(i).attr('tabindex', 0);
            }

            self.activateADA();
        },
        initArrowEvents: function initArrowEvents() {

            var self = this,
                opt = self.options;

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {
                self.$prevArrow.off('click.' + _N).on('click.' + _N, {
                    message: 'previous'
                }, self.changeSlide);
                self.$nextArrow.off('click.' + _N).on('click.' + _N, {
                    message: 'next'
                }, self.changeSlide);

                if (opt.accessibility === true) {
                    self.$prevArrow.on('keydown.' + _N, self.keyHandler);
                    self.$nextArrow.on('keydown.' + _N, self.keyHandler);
                }
            }
        },
        initDotEvents: function initDotEvents() {

            var self = this,
                opt = self.options;

            if (opt.dots === true) {
                $('li', self.$dots).on('click.' + _N, {
                    message: 'index'
                }, self.changeSlide);

                if (opt.accessibility === true) {
                    self.$dots.on('keydown.' + _N, self.keyHandler);
                }
            }

            if (opt.dots === true && opt.pauseOnDotsHover === true) {

                $('li', self.$dots).on('mouseenter.' + _N, $.proxy(self.interrupt, self, true)).on('mouseleave.' + _N, $.proxy(self.interrupt, self, false));
            }
        },
        initSlideEvents: function initSlideEvents() {

            var self = this,
                opt = self.options;

            if (opt.pauseOnHover) {

                self.$list.on('mouseenter.' + _N, $.proxy(self.interrupt, self, true));
                self.$list.on('mouseleave.' + _N, $.proxy(self.interrupt, self, false));
            }
        },
        initializeEvents: function initializeEvents() {

            var self = this,
                opt = self.options;

            self.initArrowEvents();

            self.initDotEvents();
            self.initSlideEvents();

            self.$list.on(addEventNS('touchstart mousedown'), {
                action: 'start'
            }, self.swipeHandler);
            self.$list.on(addEventNS('touchmove mousemove'), {
                action: 'move'
            }, self.swipeHandler);
            self.$list.on(addEventNS('touchend mouseup'), {
                action: 'end'
            }, self.swipeHandler);
            self.$list.on(addEventNS('touchcancel mouseleave'), {
                action: 'end'
            }, self.swipeHandler);

            self.$list.on(addEventNS('click'), self.clickHandler);

            $(document).on(self.visibilityChange, $.proxy(self.visibility, self));

            if (opt.accessibility === true) {
                self.$list.on(addEventNS('keydown'), self.keyHandler);
            }

            if (opt.focusOnSelect === true) {
                $(self.$slideTrack).children().on(addEventNS('click'), self.selectHandler);
            }

            $(window).on(addEventNS('orientationchange') + '-' + self.instanceUid, $.proxy(self.orientationChange, self));

            $(window).on(addEventNS('resize') + '-' + self.instanceUid, $.proxy(self.resize, self));

            $('[draggable!=true]', self.$slideTrack).on('dragstart', self.preventDefault);

            $(window).on(addEventNS('load') + '-' + self.instanceUid, self.setPosition);
            $(document).on(addEventNS('ready') + '-' + self.instanceUid, self.setPosition);
        },
        initUI: function initUI() {

            var self = this,
                opt = self.options;

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {

                self.$prevArrow.show();
                self.$nextArrow.show();
            }

            if (opt.dots === true && self.slideCount > opt.slidesToShow) {

                self.$dots.show();
            }
        },
        keyHandler: function keyHandler(event) {

            var self = this,
                opt = self.options;
            //Dont slide if the cursor is inside the form fields and arrow keys are pressed
            if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
                if (event.keyCode === 37 && opt.accessibility === true) {
                    self.changeSlide({
                        data: {
                            message: opt.rtl === true ? 'next' : 'previous'
                        }
                    });
                } else if (event.keyCode === 39 && opt.accessibility === true) {
                    self.changeSlide({
                        data: {
                            message: opt.rtl === true ? 'previous' : 'next'
                        }
                    });
                }
            }
        },
        lazyLoad: function lazyLoad() {

            var self = this,
                opt = self.options,
                loadRange,
                cloneRange,
                rangeStart,
                rangeEnd;

            function loadImages(imagesScope) {

                $('img[data-lazy]', imagesScope).each(function () {

                    var image = $(this),
                        imageSource = $(this).attr('data-lazy'),
                        imageSrcSet = $(this).attr('data-srcset'),
                        imageSizes = $(this).attr('data-sizes') || self.$slider.attr('data-sizes'),
                        imageToLoad = document.createElement('img');

                    imageToLoad.onload = function () {

                        image.animate({ opacity: 0 }, 100, function () {

                            if (imageSrcSet) {
                                image.attr('srcset', imageSrcSet);

                                if (imageSizes) {
                                    image.attr('sizes', imageSizes);
                                }
                            }

                            image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
                                image.removeAttr('data-lazy data-srcset data-sizes').removeClass(_V.LOADING);
                            });
                            self.triggerHandler(_N + 'lazyloaded', [self, image, imageSource]);
                        });
                    };

                    imageToLoad.onerror = function () {

                        image.removeAttr('data-lazy').removeClass(_V.LOADING).addClass(_N + '-lazyload-error');

                        self.triggerHandler(_N + 'lazyloadrrror', [self, image, imageSource]);
                    };

                    imageToLoad.src = imageSource;
                });
            }

            if (opt.centerMode === true) {
                if (opt.infinite === true) {
                    rangeStart = self.currentSlide + (opt.slidesToShow / 2 + 1);
                    rangeEnd = rangeStart + opt.slidesToShow + 2;
                } else {
                    rangeStart = Math.max(0, self.currentSlide - (opt.slidesToShow / 2 + 1));
                    rangeEnd = 2 + (opt.slidesToShow / 2 + 1) + self.currentSlide;
                }
            } else {
                rangeStart = opt.infinite ? opt.slidesToShow + self.currentSlide : self.currentSlide;
                rangeEnd = Math.ceil(rangeStart + opt.slidesToShow);
                if (opt.fade === true) {
                    if (rangeStart > 0) rangeStart--;
                    if (rangeEnd <= self.slideCount) rangeEnd++;
                }
            }

            loadRange = self.$slider.find('.' + _V.SLIDE).slice(rangeStart, rangeEnd);

            if (opt.lazyLoad === 'anticipated') {
                var prevSlide = rangeStart - 1,
                    nextSlide = rangeEnd,
                    $slides = self.$slider.find('.' + _N);

                for (var i = 0; i < opt.slidesToScroll; i++) {
                    if (prevSlide < 0) prevSlide = self.slideCount - 1;
                    loadRange = loadRange.add($slides.eq(prevSlide));
                    loadRange = loadRange.add($slides.eq(nextSlide));
                    prevSlide--;
                    nextSlide++;
                }
            }

            loadImages(loadRange);

            if (self.slideCount <= opt.slidesToShow) {
                cloneRange = self.$slider.find('.' + _V.SLIDE);
                loadImages(cloneRange);
            } else if (self.currentSlide >= self.slideCount - opt.slidesToShow) {
                cloneRange = self.$slider.find('.' + _V.CLONED).slice(0, opt.slidesToShow);
                loadImages(cloneRange);
            } else if (self.currentSlide === 0) {
                cloneRange = self.$slider.find('.' + _V.CLONED).slice(opt.slidesToShow * -1);
                loadImages(cloneRange);
            }
        },
        loadSlider: function loadSlider() {

            var self = this,
                opt = self.options;

            self.setPosition();

            self.$slideTrack.css({
                opacity: 1
            });

            self.$slider.removeClass(_V.LOADING);

            self.initUI();

            if (opt.lazyLoad === 'progressive') {
                self.progressiveLazyLoad();
            }
        },
        next: function next() {

            var self = this,
                opt = self.options;

            self.changeSlide({
                data: {
                    message: 'next'
                }
            });
        },
        orientationChange: function orientationChange() {

            var self = this,
                opt = self.options;

            self.checkResponsive();
            self.setPosition();
        },
        pause: function pause() {

            var self = this,
                opt = self.options;

            self.autoPlayClear();
            self.triggerHandler(_N + 'stop', [self]);
            self.paused = true;
        },
        play: function play() {

            var self = this,
                opt = self.options;

            self.autoPlay();
            self.triggerHandler(_N + 'play', [self]);
            opt.autoplay = true;
            self.paused = false;
            self.focussed = false;
            self.interrupted = false;
        },
        postSlide: function postSlide(index) {

            var self = this,
                opt = self.options;

            if (!self.unbuilded) {

                self.triggerHandler(_N + 'afterchange', [self, index]);

                self.animating = false;

                if (self.slideCount > opt.slidesToShow) {
                    self.setPosition();
                }

                self.swipeLeft = null;

                if (opt.autoplay) {
                    self.autoPlay();
                }

                if (opt.accessibility === true) {
                    self.initADA();

                    if (opt.focusOnChange) {
                        var $currentSlide = $(self.$slides.get(self.currentSlide));
                        $currentSlide.attr('tabindex', 0).focus();
                    }
                }

                ////self.$slider.find('.' + _V.SLIDE).not('.' + _V.CURRENT).css('visibility', 'hidden');
            }
        },
        prev: function prev() {

            var self = this,
                opt = self.options;

            self.changeSlide({
                data: {
                    message: 'previous'
                }
            });
        },
        preventDefault: function preventDefault(event) {

            event.preventDefault();
        },
        progressiveLazyLoad: function progressiveLazyLoad(tryCount) {

            tryCount = tryCount || 1;

            var self = this,
                opt = self.options,
                $imgsToLoad = $('img[data-lazy]', self.$slider),
                image,
                imageSource,
                imageSrcSet,
                imageSizes,
                imageToLoad;

            if ($imgsToLoad.length) {

                image = $imgsToLoad.first();
                imageSource = image.attr('data-lazy');
                imageSrcSet = image.attr('data-srcset');
                imageSizes = image.attr('data-sizes') || self.$slider.attr('data-sizes');
                imageToLoad = document.createElement('img');

                imageToLoad.onload = function () {

                    if (imageSrcSet) {
                        image.attr('srcset', imageSrcSet);

                        if (imageSizes) {
                            image.attr('sizes', imageSizes);
                        }
                    }

                    image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass(_V.LOADING);

                    if (opt.adaptiveHeight === true) {
                        self.setPosition();
                    }

                    self.triggerHandler(_N + 'lazyloaded', [self, image, imageSource]);
                    self.progressiveLazyLoad();
                };

                imageToLoad.onerror = function () {

                    if (tryCount < 3) {

                        /**
                         * try to load the image 3 times,
                         * leave a slight delay so we don't get
                         * servers blocking the request.
                         */
                        setTimeout(function () {
                            self.progressiveLazyLoad(tryCount + 1);
                        }, 500);
                    } else {

                        image.removeAttr('data-lazy').removeClass(_V.LOADING).addClass(_N + '-lazyload-error');

                        self.triggerHandler(_N + 'lazyloaderror', [self, image, imageSource]);

                        self.progressiveLazyLoad();
                    }
                };

                imageToLoad.src = imageSource;
            } else {

                self.triggerHandler(_N + 'allimagesloaded', [self]);
            }
        },
        refresh: function refresh(initializing) {

            var self = this,
                opt = self.options,
                currentSlide,
                lastVisibleIndex;

            lastVisibleIndex = self.slideCount - opt.slidesToShow;

            // in non-infinite sliders, we don't want to go past the
            // last visible index.
            if (!opt.infinite && self.currentSlide > lastVisibleIndex) {
                self.currentSlide = lastVisibleIndex;
            }

            // if less slides than to show, go to start.
            if (self.slideCount <= opt.slidesToShow) {
                self.currentSlide = 0;
            }

            currentSlide = self.currentSlide;

            self.destroy(true);

            $.extend(self, componentInitials, { currentSlide: currentSlide });

            self.init();

            if (!initializing) {

                self.changeSlide({
                    data: {
                        message: 'index',
                        index: currentSlide
                    }
                }, false);
            }
        },
        registerBreakpoints: function registerBreakpoints() {

            var self = this,
                opt = self.options,
                breakpoint,
                currentBreakpoint,
                l,
                responsiveSettings = opt.responsive || null;

            if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

                self.respondTo = opt.respondTo || 'window';

                for (breakpoint in responsiveSettings) {

                    l = self.breakpoints.length - 1;

                    if (responsiveSettings.hasOwnProperty(breakpoint)) {
                        currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                        // loop through the breakpoints and cut out any existing
                        // ones with the same breakpoint number, we don't want dupes.
                        while (l >= 0) {
                            if (self.breakpoints[l] && self.breakpoints[l] === currentBreakpoint) {
                                self.breakpoints.splice(l, 1);
                            }
                            l--;
                        }

                        self.breakpoints.push(currentBreakpoint);
                        self.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                    }
                }

                self.breakpoints.sort(function (a, b) {
                    return opt.mobileFirst ? a - b : b - a;
                });

                var r = self._getTargetBreakpoint();
                if (r) {
                    self.options.slidesToScroll = self.breakpointSettings[r].slidesToScroll;
                    self.options.slidesToShow = self.breakpointSettings[r].slidesToScroll;
                }
            }
        },
        reinit: function reinit() {

            var self = this,
                opt = self.options;

            self.$slides = self.$slideTrack.children().addClass(_V.SLIDE);

            self.slideCount = self.$slides.length;

            if (self.currentSlide >= self.slideCount && self.currentSlide !== 0) {
                self.currentSlide = self.currentSlide - opt.slidesToScroll;
            }

            if (self.slideCount <= opt.slidesToShow) {
                self.currentSlide = 0;
            }

            self.registerBreakpoints();

            self.setProps();
            self.setupInfinite();
            self.buildArrows();
            self.updateArrows();
            self.initArrowEvents();
            self.buildDots();
            self.updateDots();
            self.initDotEvents();
            self.cleanUpSlideEvents();
            self.initSlideEvents();

            self.checkResponsive(false, true);

            if (opt.focusOnSelect === true) {
                $(self.$slideTrack).children().on(addEventNS('click'), self.selectHandler);
            }

            self.setSlideClasses(typeof self.currentSlide === 'number' ? self.currentSlide : 0);

            self.setPosition();
            self.focusHandler();

            self.paused = !opt.autoplay;
            self.autoPlay();

            self.triggerHandler(_N + 'reinit', [self]);
        },
        resize: function resize() {

            var self = this,
                opt = self.options;

            if ($(window).width() !== self.windowWidth) {
                clearTimeout(self.windowDelay);
                self.windowDelay = window.setTimeout(function () {
                    self.windowWidth = $(window).width();
                    self.checkResponsive();
                    if (!self.unbuilded) {
                        self.setPosition();
                    }
                }, 50);
            }
        },
        removeSlide: function removeSlide(index, removeBefore, removeAll) {

            var self = this,
                opt = self.options;

            if (typeof index === 'boolean') {
                removeBefore = index;
                index = removeBefore === true ? 0 : self.slideCount - 1;
            } else {
                index = removeBefore === true ? --index : index;
            }

            if (self.slideCount < 1 || index < 0 || index > self.slideCount - 1) {
                return false;
            }

            self.unload();

            if (removeAll === true) {
                self.$slideTrack.children().remove();
            } else {
                self.$slideTrack.children(opt.slide).eq(index).remove();
            }

            self.$slides = self.$slideTrack.children(opts.slide);

            self.$slideTrack.children(opt.slide).detach();

            self.$slideTrack.append(self.$slides);

            self.$slidesCache = self.$slides;

            self.reinit();
        },
        setCSS: function setCSS(position) {

            var self = this,
                opt = self.options,
                positionProps = {},
                x,
                y;

            if (opt.rtl === true) {
                position = -position;
            }
            x = self.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
            y = self.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

            positionProps[self.positionProp] = position;

            if (self.transformsEnabled === false) {
                self.$slideTrack.css(positionProps);
            } else {
                positionProps = {};
                if (self.cssTransitions === false) {
                    positionProps[self.animType] = 'translate(' + x + ', ' + y + ')';
                    self.$slideTrack.css(positionProps);
                } else {
                    positionProps[self.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                    self.$slideTrack.css(positionProps);
                }
            }
        },
        setDimensions: function setDimensions() {

            var self = this,
                opt = self.options;

            if (opt.vertical === false) {
                if (opt.centerMode === true) {
                    self.$list.css({
                        padding: '0px ' + opt.centerPadding
                    });
                }
            } else {
                self.$list.height(self.$slides.first().outerHeight(true) * opt.slidesToShow);
                if (opt.centerMode === true) {
                    self.$list.css({
                        padding: opt.centerPadding + ' 0px'
                    });
                }
            }

            self.$slideTrack.css('width', '');
            self.listWidth = self.$list.width();
            self.listHeight = self.$list.height();

            if (opt.vertical === false && opt.variableWidth === false) {
                self.slideWidth = Math.ceil(self.listWidth / opt.slidesToShow);
                self.$slideTrack.width(Math.ceil(self.slideWidth * self.$slideTrack.children('.' + _V.SLIDE).length));
            } else if (opt.variableWidth === true) {
                self.$slideTrack.width(5000 * self.slideCount);
            } else {
                self.slideWidth = Math.ceil(self.listWidth);
                self.$slideTrack.height(Math.ceil(self.$slides.first().outerHeight(true) * self.$slideTrack.children('.' + _V.SLIDE).length));
            }

            var offset = self.$slides.first().outerWidth(true) - self.$slides.first().width();
            if (opt.variableWidth === false) {
                self.$slideTrack.children('.' + _V.SLIDE).width(self.slideWidth - offset);
            }
        },
        setFade: function setFade() {

            var self = this,
                opt = self.options,
                targetLeft;

            self.$slides.each(function (index, element) {
                targetLeft = self.slideWidth * index * -1;
                if (opt.rtl === true) {
                    $(element).css({
                        position: 'relative',
                        right: targetLeft,
                        top: 0,
                        zIndex: opt.zIndex - 2,
                        opacity: 0
                    });
                } else {
                    $(element).css({
                        position: 'relative',
                        left: targetLeft,
                        top: 0,
                        zIndex: opt.zIndex - 2,
                        opacity: 0
                    });
                }
            });

            self.$slides.eq(self.currentSlide).css({
                zIndex: opt.zIndex - 1,
                opacity: 1
            });
        },
        setHeight: function setHeight() {

            var self = this,
                opt = self.options;

            if (opt.slidesToShow === 1 && opt.adaptiveHeight === true && opt.vertical === false) {
                var targetHeight = self.$slides.eq(self.currentSlide).outerHeight(true);
                self.$list.css('height', targetHeight);
            }
        },
        setOption: function setOption() {

            /**
             * accepts arguments in format of:
             *
             *  - for changing a single option's value:
             *     .slick("setOption", option, value, refresh )
             *
             *  - for changing a set of responsive options:
             *     .slick("setOption", 'responsive', [{}, ...], refresh )
             *
             *  - for updating multiple values at once (not responsive)
             *     .slick("setOption", { 'option': value, ... }, refresh )
             */

            var self = this,
                opt = self.options,
                l,
                item,
                option,
                value,
                refresh = false,
                type;

            if ($.type(arguments[0]) === 'object') {

                option = arguments[0];
                refresh = arguments[1];
                type = 'multiple';
            } else if ($.type(arguments[0]) === 'string') {

                option = arguments[0];
                value = arguments[1];
                refresh = arguments[2];

                if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

                    type = 'responsive';
                } else if (typeof arguments[1] !== 'undefined') {

                    type = 'single';
                }
            }

            if (type === 'single') {

                opt[option] = value;
            } else if (type === 'multiple') {

                $.each(option, function (opt, val) {

                    opt[opt] = val;
                });
            } else if (type === 'responsive') {

                for (item in value) {

                    if ($.type(opt.responsive) !== 'array') {

                        opt.responsive = [value[item]];
                    } else {

                        l = opt.responsive.length - 1;

                        // loop through the responsive object and splice out duplicates.
                        while (l >= 0) {

                            if (opt.responsive[l].breakpoint === value[item].breakpoint) {

                                opt.responsive.splice(l, 1);
                            }

                            l--;
                        }

                        opt.responsive.push(value[item]);
                    }
                }
            }

            if (refresh) {

                self.unload();
                self.reinit();
            }
        },
        setPosition: function setPosition() {

            var self = this,
                opt = self.options;

            self.setDimensions();

            self.setHeight();

            if (opt.fade === false) {
                self.setCSS(self.getLeft(self.currentSlide));
            } else {
                self.setFade();
            }

            self.triggerHandler(_N + 'setposition', [self]);
        },
        setProps: function setProps() {

            var self = this,
                opt = self.options,
                bodyStyle = document.body.style;

            self.positionProp = opt.vertical === true ? 'top' : 'left';

            if (self.positionProp === 'top') {
                self.$slider.addClass(_N + '-vertical');
            } else {
                self.$slider.removeClass(_N + '-vertical');
            }

            if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
                if (opt.useCSS === true) {
                    self.cssTransitions = true;
                }
            }

            if (opt.fade) {
                if (typeof opt.zIndex === 'number') {
                    if (opt.zIndex < 3) {
                        opt.zIndex = 3;
                    }
                } else {
                    opt.zIndex = self.defaults.zIndex;
                }
            }

            if (bodyStyle.OTransform !== undefined) {
                self.animType = 'OTransform';
                self.transformType = '-o-transform';
                self.transitionType = 'OTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) self.animType = false;
            }
            if (bodyStyle.MozTransform !== undefined) {
                self.animType = 'MozTransform';
                self.transformType = '-moz-transform';
                self.transitionType = 'MozTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) self.animType = false;
            }
            if (bodyStyle.webkitTransform !== undefined) {
                self.animType = 'webkitTransform';
                self.transformType = '-webkit-transform';
                self.transitionType = 'webkitTransition';
                if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) self.animType = false;
            }
            if (bodyStyle.msTransform !== undefined) {
                self.animType = 'msTransform';
                self.transformType = '-ms-transform';
                self.transitionType = 'msTransition';
                if (bodyStyle.msTransform === undefined) self.animType = false;
            }
            if (bodyStyle.transform !== undefined && self.animType !== false) {
                self.animType = 'transform';
                self.transformType = 'transform';
                self.transitionType = 'transition';
            }
            self.transformsEnabled = opt.useTransform && self.animType !== null && self.animType !== false;
        },
        setSlideClasses: function setSlideClasses(index) {

            var self = this,
                opt = self.options,
                centerOffset,
                allSlides,
                indexOffset,
                remainder;

            allSlides = self.$slider.find('.' + _V.SLIDE).removeClass(opt.activeClass + ' ' + _V.CENTER + ' ' + _V.CURRENT).attr('aria-hidden', 'true');

            self.$slides.eq(index).addClass(_V.CURRENT);

            if (opt.centerMode === true) {

                var evenCoef = opt.slidesToShow % 2 === 0 ? 1 : 0;

                centerOffset = Math.floor(opt.slidesToShow / 2);

                if (opt.infinite === true) {

                    if (index >= centerOffset && index <= self.slideCount - 1 - centerOffset) {
                        self.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    } else {

                        indexOffset = opt.slidesToShow + index;
                        allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    }

                    if (index === 0) {

                        allSlides.eq(allSlides.length - 1 - opt.slidesToShow).addClass(_V.CENTER);
                    } else if (index === self.slideCount - 1) {

                        allSlides.eq(opt.slidesToShow).addClass(_V.CENTER);
                    }
                }

                self.$slides.eq(index).addClass(_V.CENTER);
            } else {

                if (index >= 0 && index <= self.slideCount - opt.slidesToShow) {

                    self.$slides.slice(index, index + opt.slidesToShow).addClass(opt.activeClass).attr('aria-hidden', 'false');
                } else if (allSlides.length <= opt.slidesToShow) {

                    allSlides.addClass(opt.activeClass).attr('aria-hidden', 'false');
                } else {

                    remainder = self.slideCount % opt.slidesToShow;
                    indexOffset = opt.infinite === true ? opt.slidesToShow + index : index;

                    if (opt.slidesToShow == opt.slidesToScroll && self.slideCount - index < opt.slidesToShow) {

                        allSlides.slice(indexOffset - (opt.slidesToShow - remainder), indexOffset + remainder).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    } else {

                        allSlides.slice(indexOffset, indexOffset + opt.slidesToShow).addClass(opt.activeClass).attr('aria-hidden', 'false');
                    }
                }
            }

            if (opt.lazyLoad === 'ondemand' || opt.lazyLoad === 'anticipated') {
                self.lazyLoad();
            }
        },
        setupInfinite: function setupInfinite() {

            var self = this,
                opt = self.options,
                i,
                slideIndex,
                infiniteCount;

            if (opt.fade === true) {
                opt.centerMode = false;
            }

            if (opt.infinite === true && opt.fade === false) {

                slideIndex = null;

                if (self.slideCount > opt.slidesToShow) {

                    if (opt.centerMode === true) {
                        infiniteCount = opt.slidesToShow + 1;
                    } else {
                        infiniteCount = opt.slidesToShow;
                    }

                    for (i = self.slideCount; i > self.slideCount - infiniteCount; i -= 1) {
                        slideIndex = i - 1;
                        $(self.$slides[slideIndex]).clone(true).attr('id', '').attr('data-' + _V.INDEX, slideIndex - self.slideCount).prependTo(self.$slideTrack).addClass(_V.CLONED);
                    }
                    for (i = 0; i < infiniteCount + self.slideCount; i += 1) {
                        slideIndex = i;
                        $(self.$slides[slideIndex]).clone(true).attr('id', '').attr('data-' + _V.INDEX, slideIndex + self.slideCount).appendTo(self.$slideTrack).addClass(_V.CLONED);
                    }
                    self.$slideTrack.find('.' + _V.CLONED).find('[id]').each(function () {
                        $(this).attr('id', '');
                    });
                }
            }
        },
        interrupt: function interrupt(toggle) {

            var self = this,
                opt = self.options;

            if (!toggle) {
                self.autoPlay();
            }
            self.interrupted = toggle;
        },
        selectHandler: function selectHandler(event) {

            var self = this,
                opt = self.options;

            var targetElement = $(event.target).is('.' + _V.SLIDE) ? $(event.target) : $(event.target).parents('.' + _V.SLIDE);

            var index = parseInt(targetElement.attr('data-' + _V.INDEX));

            if (!index) index = 0;

            if (self.slideCount <= opt.slidesToShow) {

                self.slideHandler(index, false, true);
                return;
            }

            self.slideHandler(index);
        },
        slideHandler: function slideHandler(index, sync, dontAnimate) {

            var targetSlide,
                animSlide,
                oldSlide,
                slideLeft,
                targetLeft = null,
                self = this,
                opt = self.options,
                navTarget;

            sync = sync || false;

            if (self.animating === true && opt.waitForAnimate === true) {
                return;
            }

            if (opt.fade === true && self.currentSlide === index) {
                return;
            }

            if (sync === false) {
                self.asNavFor(index);
            }

            targetSlide = index;
            targetLeft = self.getLeft(targetSlide);
            slideLeft = self.getLeft(self.currentSlide);

            self.currentLeft = self.swipeLeft === null ? slideLeft : self.swipeLeft;

            if (opt.infinite === false && opt.centerMode === false && (index < 0 || index > self.getDotCount() * opt.slidesToScroll)) {
                if (opt.fade === false) {
                    targetSlide = self.currentSlide;
                    if (dontAnimate !== true) {
                        self.animateSlide(slideLeft, function () {
                            self.postSlide(targetSlide);
                        });
                    } else {
                        self.postSlide(targetSlide);
                    }
                }
                return;
            } else if (opt.infinite === false && opt.centerMode === true && (index < 0 || index > self.slideCount - opt.slidesToScroll)) {
                if (opt.fade === false) {
                    targetSlide = self.currentSlide;
                    if (dontAnimate !== true) {
                        self.animateSlide(slideLeft, function () {
                            self.postSlide(targetSlide);
                        });
                    } else {
                        self.postSlide(targetSlide);
                    }
                }
                return;
            }

            if (opt.autoplay) {
                clearInterval(self.autoPlayTimer);
            }

            if (targetSlide < 0) {
                if (self.slideCount % opt.slidesToScroll !== 0) {
                    animSlide = self.slideCount - self.slideCount % opt.slidesToScroll;
                } else {
                    animSlide = self.slideCount + targetSlide;
                }
            } else if (targetSlide >= self.slideCount) {
                if (self.slideCount % opt.slidesToScroll !== 0) {
                    animSlide = 0;
                } else {
                    animSlide = targetSlide - self.slideCount;
                }
            } else {
                animSlide = targetSlide;
            }

            self.animating = true;

            self.triggerHandler(_N + 'beforechange', [self, self.currentSlide, animSlide]);

            oldSlide = self.currentSlide;
            self.currentSlide = animSlide;

            self.setSlideClasses(self.currentSlide);

            if (opt.asNavFor) {

                navTarget = self.getNavTarget();
                navTarget = navTarget.vcCarousel('get' + _N.substr(0, 1).toUpperCase() + _N.substr(1));

                if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                    navTarget.setSlideClasses(self.currentSlide);
                }
            }

            self.updateDots();
            self.updateArrows();

            if (opt.fade === true) {
                if (dontAnimate !== true) {

                    self.fadeSlideOut(oldSlide);

                    self.fadeSlide(animSlide, function () {
                        self.postSlide(animSlide);
                    });
                } else {
                    self.postSlide(animSlide);
                }
                self.animateHeight();
                return;
            }

            if (dontAnimate !== true) {
                self.animateSlide(targetLeft, function () {
                    self.postSlide(animSlide);
                });
            } else {
                self.postSlide(animSlide);
            }
        },
        startLoad: function startLoad() {

            var self = this,
                opt = self.options;

            if (opt.arrows === true && self.slideCount > opt.slidesToShow) {

                self.$prevArrow.hide();
                self.$nextArrow.hide();
            }

            if (opt.dots === true && self.slideCount > opt.slidesToShow) {

                self.$dots.hide();
            }

            self.$slider.addClass(_V.LOADING);
        },
        swipeDirection: function swipeDirection() {

            var xDist,
                yDist,
                r,
                swipeAngle,
                self = this,
                opt = self.options;

            xDist = self.touchObject.startX - self.touchObject.curX;
            yDist = self.touchObject.startY - self.touchObject.curY;
            r = Math.atan2(yDist, xDist);

            swipeAngle = Math.round(r * 180 / Math.PI);
            if (swipeAngle < 0) {
                swipeAngle = 360 - Math.abs(swipeAngle);
            }

            if (swipeAngle <= 45 && swipeAngle >= 0) {
                return opt.rtl === false ? 'left' : 'right';
            }
            if (swipeAngle <= 360 && swipeAngle >= 315) {
                return opt.rtl === false ? 'left' : 'right';
            }
            if (swipeAngle >= 135 && swipeAngle <= 225) {
                return opt.rtl === false ? 'right' : 'left';
            }
            if (opt.verticalSwiping === true) {
                if (swipeAngle >= 35 && swipeAngle <= 135) {
                    return 'down';
                } else {
                    return 'up';
                }
            }

            if (self.options.preventVertical) {
                return xDist < 0 ? 'right' : 'left';
            }

            return 'vertical';
        },
        swipeEnd: function swipeEnd(event) {

            var self = this,
                opt = self.options,
                slideCount,
                direction;

            self.dragging = false;
            self.swiping = false;

            if (self.scrolling) {
                self.scrolling = false;
                return false;
            }

            self.interrupted = false;
            self.shouldClick = self.touchObject.swipeLength > 10 ? false : true;

            if (self.touchObject.curX === undefined) {
                return false;
            }

            if (self.touchObject.edgeHit === true) {
                self.triggerHandler(_N + 'edge', [self, self.swipeDirection()]);
            }

            if (self.touchObject.swipeLength >= self.touchObject.minSwipe) {

                direction = self.swipeDirection();

                switch (direction) {

                    case 'left':
                    case 'down':

                        slideCount = opt.swipeToSlide ? self.checkNavigable(self.currentSlide + self.getSlideCount()) : self.currentSlide + self.getSlideCount();

                        self.currentDirection = 0;

                        break;

                    case 'right':
                    case 'up':

                        slideCount = opt.swipeToSlide ? self.checkNavigable(self.currentSlide - self.getSlideCount()) : self.currentSlide - self.getSlideCount();

                        self.currentDirection = 1;

                        break;

                    default:

                }

                if (direction != 'vertical') {

                    self.slideHandler(slideCount);
                    self.touchObject = {};
                    self.triggerHandler(_N + 'swipe', [self, direction]);
                }
            } else {

                if (self.touchObject.startX !== self.touchObject.curX) {

                    self.slideHandler(self.currentSlide);
                    self.touchObject = {};
                }
            }
        },
        swipeHandler: function swipeHandler(event) {

            var self = this,
                opt = self.options;

            if (opt.swipe === false || 'ontouchend' in document && opt.swipe === false) {
                return;
            } else if (opt.draggable === false && event.type.indexOf('mouse') !== -1) {
                return;
            }

            self.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

            self.touchObject.minSwipe = self.listWidth / opt.touchThreshold;

            if (opt.verticalSwiping === true) {
                self.touchObject.minSwipe = self.listHeight / opt.touchThreshold;
            }

            switch (event.data.action) {

                case 'start':
                    self.swipeStart(event);
                    break;

                case 'move':
                    self.swipeMove(event);
                    break;

                case 'end':
                    self.swipeEnd(event);
                    break;

            }
        },
        swipeMove: function swipeMove(event) {

            var self = this,
                opt = self.options,
                edgeWasHit = false,
                curLeft,
                swipeDirection,
                swipeLength,
                positionOffset,
                touches,
                verticalSwipeLength;

            touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

            if (!self.dragging || self.scrolling || touches && touches.length !== 1) {
                return false;
            }

            curLeft = self.getLeft(self.currentSlide);

            self.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
            self.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

            self.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(self.touchObject.curX - self.touchObject.startX, 2)));

            verticalSwipeLength = Math.round(Math.sqrt(Math.pow(self.touchObject.curY - self.touchObject.startY, 2)));

            if (!opt.verticalSwiping && !self.swiping && verticalSwipeLength > 4) {
                self.scrolling = true;
                return false;
            }

            if (opt.verticalSwiping === true) {
                self.touchObject.swipeLength = verticalSwipeLength;
            }

            swipeDirection = self.swipeDirection();

            if (opt.preventVertical && self.swiping) {
                event.stopPropagation();
                event.preventDefault();
            }

            if (event.originalEvent !== undefined && self.touchObject.swipeLength > 4) {
                self.swiping = true;
                event.preventDefault();
            }

            positionOffset = (opt.rtl === false ? 1 : -1) * (self.touchObject.curX > self.touchObject.startX ? 1 : -1);
            if (opt.verticalSwiping === true) {
                positionOffset = self.touchObject.curY > self.touchObject.startY ? 1 : -1;
            }

            swipeLength = self.touchObject.swipeLength;

            self.touchObject.edgeHit = false;

            if (opt.infinite === false) {
                if (self.currentSlide === 0 && swipeDirection === 'right' || self.currentSlide >= self.getDotCount() && swipeDirection === 'left') {
                    swipeLength = self.touchObject.swipeLength * opt.edgeFriction;
                    self.touchObject.edgeHit = true;
                }
            }

            if (opt.vertical === false) {
                self.swipeLeft = curLeft + swipeLength * positionOffset;
            } else {
                self.swipeLeft = curLeft + swipeLength * (self.$list.height() / self.listWidth) * positionOffset;
            }
            if (opt.verticalSwiping === true) {
                self.swipeLeft = curLeft + swipeLength * positionOffset;
            }
            self.triggerHandler(_N + 'swipestart', [self]);

            if (opt.fade === true || opt.touchMove === false) {
                return false;
            }

            if (self.animating === true) {
                self.swipeLeft = null;
                return false;
            }

            self.setCSS(self.swipeLeft);
        },
        swipeStart: function swipeStart(event) {

            var self = this,
                opt = self.options,
                touches;

            self.interrupted = true;

            if (self.touchObject.fingerCount !== 1 || self.slideCount <= opt.slidesToShow) {
                self.touchObject = {};
                return false;
            }

            if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
                touches = event.originalEvent.touches[0];
            }

            self.touchObject.startX = self.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
            self.touchObject.startY = self.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

            self.dragging = true;

            /////self.$slider.find('.' + _V.SLIDE).css('visibility', '');
        },
        unfilterSlides: function unfilterSlides() {

            var self = this,
                opt = self.options;

            if (self.$slidesCache !== null) {

                self.unload();

                self.$slideTrack.children(opt.slide).detach();

                self.$slidesCache.appendTo(self.$slideTrack);

                self.reinit();
            }
        },
        unload: function unload() {

            var self = this,
                opt = self.options;

            $('.' + _V.CLONED, self.$slider).remove();

            if (self.$dots) {
                if (self.$dots.hasClass('ui_static')) {
                    var dot = self.$dots.first().off().clone();
                    self.$dots.empty().append(dot);
                } else {
                    self.$dots.remove();
                }
            }

            if (self.$prevArrow && self.htmlExpr.test(opt.prevArrow)) {
                self.$prevArrow.remove();
            }

            if (self.$nextArrow && self.htmlExpr.test(opt.nextArrow)) {
                self.$nextArrow.remove();
            }

            self.$slides.removeClass(_V.SLIDE + ' ' + opt.activeClass + ' ' + _V.VISIBLE + ' ' + _V.CURRENT).attr('aria-hidden', 'true').css('width', '');
        },
        unbuild: function unbuild(fromBreakpoint) {

            var self = this,
                opt = self.options;
            self.triggerHandler(_V.UNBUILD, [self, fromBreakpoint]);
            self.destroy();
        },
        updateArrows: function updateArrows() {

            var self = this,
                opt = self.options,
                centerOffset;

            centerOffset = Math.floor(opt.slidesToShow / 2);

            if (opt.arrows === true && self.slideCount > opt.slidesToShow && !opt.infinite) {

                self.$prevArrow.removeClass(_V.DISABLED).prop('disabled', false).attr('aria-disabled', 'false');
                self.$nextArrow.removeClass(_V.DISABLED).prop('disabled', false).attr('aria-disabled', 'false');

                if (self.currentSlide === 0) {

                    self.$prevArrow.addClass(_V.DISABLED).prop('disabled', true).attr('aria-disabled', 'true');
                } else if (self.currentSlide >= self.slideCount - opt.slidesToShow && opt.centerMode === false) {

                    self.$nextArrow.addClass(_V.DISABLED).prop('disabled', true).attr('aria-disabled', 'true');
                } else if (self.currentSlide >= self.slideCount - 1 && opt.centerMode === true) {

                    self.$nextArrow.addClass(_V.DISABLED).prop('disabled', true).attr('aria-disabled', 'true');
                }
            }
        },
        updateDots: function updateDots() {

            var self = this,
                opt = self.options;

            if (self.$dots.length) {

                self.$dots.find('li').removeClass(opt.activeClass).eq(Math.floor(self.currentSlide / opt.slidesToScroll)).addClass(opt.activeClass);
            }
        },
        visibility: function visibility() {

            var self = this,
                opt = self.options;

            if (opt.autoplay) {
                self.interrupted = !!document[self.hidden];
            }
        }
    });

    return Carousel;
});
/*!
 * @module vcui.ui.Dropdown
 * @license MIT License
 * @description 드롭다운 컴포넌트
 * @copyright VinylC UID Group
 */
define('ui/dropdown', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $doc = $(document);
    var prefixClass = '.ui_dropdown_';

    var Dropdown = core.ui('Dropdown', {
        bindjQuery: 'dropdown',
        defaults: {
            appendToBody: false,
            disabled: false,
            autoHideClicked: true,
            autoHideFocusout: true,
            toggleSelector: '.ui_dropdown_toggle',
            listSelector: '.ui_dropdown_list'
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.$list = self.$(self.options.listSelector);
            if (self.options.appendToBody) {
                self.$list.after(self.$holder = $('<span style="display:none"></span>'));
            }
            
            self._bindEvents();
        },
        _bindEvents: function _bindEvents() {
            var self = this;
            var opt = self.options;

            self.on('click', prefixClass + 'toggle', function (e) {
                e.stopPropagation();
                e.preventDefault();

                if (opt.disabled) {
                    return self.close();
                }

                self[self.$el.hasClass('open') ? 'close' : 'open']();
            });
        },
        _bindEventsByOpen: function _bindEventsByOpen() {
            var self = this;
            var opt = self.options;

            self.on('keydown', self._unhandleKeydown = function (e) {
                if (27 == e.keyCode) {
                    e.stopPropagation();
                    self.close();
                    self.$(':focusable:first').focus();
                }
            });

            self.on('click', prefixClass + 'list', self._unhandleClick = function (e) {
                if (!opt.autoHideFocusout) {
                    return;
                }
                if (opt.autoHideClicked) {
                    self.close();
                }
            });

            self.winOne('resize', self._unhandleResize = function () {
                self.close();
            });

            setTimeout(function () {
                // click 이벤트와 겹치지 않도록 한타임 늦게 바인딩한다.
                self.docOn("mousedown keydown", self._unhandleDocEvents = function (e) {
                    if (e.type === 'mousedown') {
                        var $list = self.$(prefixClass + 'list');
                        if (core.dom.contains(self.el, e.target, true) || core.dom.contains($list[0], e.target)) {
                            e.stopPropagation();
                        } else {
                            self.close();
                        }
                    } else {
                        var $toggle = self.$(prefixClass + 'toggle');
                        if (27 === e.keyCode) {
                            self.close(), $toggle.focus();
                        }
                    }
                });
            }, 10);

            self.docOn("focusin focusout", '.ui_dropdown_list', self._unhandleFocus = function (e) {
                clearTimeout(self.focusTimer), self.focusTimer = null;

                if ("focusout" === e.type && self.$el.hasClass("open")) {
                    self.focusTimer = setTimeout(function () {
                        self.close();
                    }, 10);
                }
            });
        },
        _unbindEventsByClose: function _unbindEventsByClose() {
            var self = this;
            var opt = self.options;

            self.off('keydown', self._unhandleKeydown);
            self.off('click', self._unhandleClick);
            self.winOff('resize', self._unhandleResize);
            self.docOff("focusin focusout", self._unhandleFocus);
            self.docOff('mousedown keydown', self._unhandleDocEvents);
        },
        open: function open() {
            var self = this;
            var opt = self.options;

            if (opt.appendToBody) {
                var $toggle = self.$(prefixClass + 'toggle');
                var offset = $toggle.offset();

                $('body').append(self.$list.css({
                    position: 'absolute',
                    left: offset.left,
                    top: offset.top + $toggle.outerHeight()
                }).show());
            }

            self._bindEventsByOpen();
            self.$el.addClass('open');
        },
        close: function close() {
            var self = this;
            var opt = self.options;

            if (opt.appendToBody) {
                self.$holder.before(self.$list.css({ position: '', left: '', top: '' }).hide());
            }

            self.$el.removeClass('open');
            clearTimeout(self.focusTimer);
            self._unbindEventsByClose();
        },
        disenabled: function(){

        },
        enabled: function(){
            
        }
    });

    return Dropdown;
});
/*!
 * @module vcui.ui.Modal
 * @license MIT License
 * @description 모달 컴포넌트
 * @copyright VinylC UID Group
 */
define('ui/modal', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $doc = $(document),
        $win = $(window),
        detect = core.detect,
        ui = core.ui,
        isTouch = detect.isTouch,
        _zIndex = 9000;

    var ModalManager = {
        templates: {
            wrap: '<div class="ui_modal_wrap" style="position:fixed;top:0;left:0;right:0;bottom:0;overflow:auto;"></div>',
            dim: '<div class="ui_modal_dim" style="position:fixed;top:0;left:0;bottom:0;right:0;background:#000;"></div>',
            modal: '<div class="ui_modal ui_modal_ajax" style="display:none"></div>'
        },
        options: {
            opacity: 0.2
        },
        init: function init(options) {
            var self = this;

            self.options = core.extend(self.options, options);
            self.stack = [];
            self.active = null;

            self._bind();
        },

        _bind: function _bind() {
            var self = this;

            $win.on('resizeend.modalmanager', function () {
                for (var i = -1, modal; modal = self.stack[++i];) {
                    modal.isShown && modal.center();
                }
            });

            $doc.on('modalshow.modalmanager', '.ui_modal_container', self._handleModalShow.bind(self)).on('modalhidden.modalmanager', '.ui_modal_container', self._handleModalHidden.bind(self)).on('modalhide.modalmanager', '.ui_modal_container', self._handleModalHide.bind(self)).on('focusin.modalmanager', self._handleFocusin.bind(self)).on('click.modalmanager', '[data-control=modal]', self._handleClick.bind(self)).on('click.modalmanager', '.ui_modal_dim', self._handleDimClick.bind(self));
        },
        _handleModalHide: function _handleModalHide(e) {
            var self = this,
                $modal = $(e.currentTarget),
                modal = $modal.vcModal('instance');

            // 모달이 전부 닫힐 때 document에 알린다.
            if (self.stack.length === 1) {
                $(document).triggerHandler('modallastbeforeclose');
            }
        },
        _handleModalShow: function _handleModalShow(e) {
            var self = this,
                $modal = $(e.currentTarget),
                modal = $modal.vcModal('instance'),
                zIndex = self.nextZIndex();

            if (!modal.$el.parent().hasClass('ui_modal_wrap')) {
                modal.$el.wrap(self.templates.wrap);
                modal.$el.before($(self.templates.dim).css('opacity', self.options.opacity));
            }
            modal.$el && modal.$el.parent().css('zIndex', zIndex++);

            self.active = modal;
            self.add(modal);
            if (self.stack.length === 1) {
                $(document).triggerHandler('modalfirstopen');
            }
        },
        _handleModalHidden: function _handleModalHidden(e) {
            var self = this,
                $modal = $(e.currentTarget),
                modal = $modal.vcModal('instance');

            modal.$el.siblings('.ui_modal_dim').remove();
            modal.$el.unwrap();
            self.revertZIndex();
            self.remove(modal);

            if (self.stack.length) {
                self.active = self.stack[self.stack.length - 1];
            } else {
                self.active = null;
                $(document).triggerHandler('modallastclose');
            }
        },
        _handleFocusin: function _handleFocusin(e) {
            var self = this;

            if (!self.active) {
                return;
            }
            if (self.active.$el[0] !== e.target && !$.contains(self.active.$el[0], e.target)) {
                self.active.$el.find(':focusable').first().focus();
                e.stopPropagation();
            }
        },
        _handleClick: function _handleClick(e) {
            e.preventDefault();

            var self = this,
                $el = $(e.currentTarget),
                target = $el.attr('href') || $el.attr('data-href'),
                $modal;

            if (target) {
                // ajax형 모달인 경우
                if (!/^#/.test(target)) {
                    $.ajax({
                        url: target
                    }).done(function (html) {
                        $modal = ModalManager.getRealModal(html);

                        $modal.addClass('ui_modal_ajax').hide().appendTo('body').vcModal(core.extend({
                            removeOnClose: true,
                            opener: $el[0]
                        }, $el.data())).on('modalhidden', function (e) {
                            $el[0].focus();
                            $modal.off('modalhidden');
                        });
                    });
                } else {
                    // 인페이지 모달인 경우
                    $(target).vcModal(core.extend({
                        opener: $el[0]
                    }, $el.data())).on('modalhidden', function (e) {
                        $el[0].focus();
                        $(this).off('modalhidden');
                    });
                }
            }
        },
        _handleDimClick: function _handleDimClick(e) {
            var $dim = $(e.currentTarget);
            if ($dim.hasClass('ui_modal_dim')) {
                var modal = $dim.siblings('.ui_modal_container').vcModal('instance');
                if (modal.getOption('closeByDimmed') === true) {
                    modal.close();
                }
            }
        },
        add: function add(modal) {
            this.stack.push(modal);
        },
        remove: function remove(modal) {
            this.stack = core.array.remove(this.stack, modal);
        },
        nextZIndex: function nextZIndex() {
            var zi = _zIndex;
            _zIndex += 2;
            return zi;
        },
        revertZIndex: function revertZIndex() {
            _zIndex -= 2;
        },
        getRealModal: function getRealModal(html) {
            var $tmp = $(html),
                $modal;
            if ($tmp.length > 1) {
                for (var i = 0, len = $tmp.length; i < len; i++) {
                    if ($tmp[i].nodeType === Node.ELEMENT_NODE) {
                        return $tmp.eq(i);
                    }
                }
            }
            return $tmp;
        }
    };
    ModalManager.init();

    // Modal ////////////////////////////////////////////////////////////////////////////
    /**
     * 모달 클래스
     * @class
     * @name vcui.ui.Modal
     * @extends vcui.ui.View
     */
    var Modal = ui('Modal', /** @lends vcui.ui.Modal# */{
        bindjQuery: 'modal',
        defaults: {
            overlay: true,
            clone: true,
            closeByEscape: true,
            removeOnClose: false,
            closeByDimmed: false,
            draggable: true,
            dragHandle: 'header h1',
            show: true,
            effect: 'fade', // slide | fade
            cssTitle: '.ui_modal_title',
            useTransformAlign: true,
            variableWidth: true,
            variableHeight: true
        },

        events: {
            'click button[data-role], a[data-role]': function clickButtonDataRole(e) {
                var self = this,
                    $btn = $(e.currentTarget),
                    role = $btn.attr('data-role') || '',
                    ev;

                if (role) {
                    self.triggerHandler(ev = $.Event('modal' + role), [self]);
                    if (ev.isDefaultPrevented()) {
                        return;
                    }
                }

                this.close();
            },
            'click .ui_modal_close': function clickUi_modal_closeui_modal_close(e) {
                e.preventDefault();
                e.stopPropagation();

                this.close();
            }
        },
        /**
         * 생성자
         * @param {String|Element|jQuery} el
         * @param {Object} options
         * @param {Boolean}  options.overlay:true 오버레이를 깔것인가
         * @param {Boolean}  options.clone: true    복제해서 띄울 것인가
         * @param {Boolean}  options.closeByEscape: true    // esc키를 눌렀을 때 닫히게 할 것인가
         * @param {Boolean}  options.removeOnClose: false   // 닫을 때 dom를 삭제할것인가
         * @param {Boolean}  options.draggable: true                // 드래그를 적용할 것인가
         * @param {Boolean}  options.dragHandle: 'h1.title'     // 드래그대상 요소
         * @param {Boolean}  options.show: true                 // 호출할 때 바로 표시할 것인가...
         */
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            // 열릴때 body로 옮겼다가, 닫힐 때 다시 원복하기 위해 임시요소를 넣어놓는다.
            self._createHolder();
            if (self.options.overlay !== false) {
                self._overlay(); // 오버레이 생성
            }
            self.$el.addClass('ui_modal_container');

            self.isShown = false;
            self._originalDisplay = self.$el.css('display');

            if (/[0-9]+px/.test(self.$el.css('left'))) {
                self.options.variableWidth = false;
            }

            if (/[0-9]+px/.test(self.$el.css('top'))) {
                self.options.variableHeight = false;
            }

            if (self.options.show) {
                setTimeout(function () {
                    core.util.waitImageLoad(self.$('img')).done(function () {
                        self.show();
                    });
                });
            }

            self._bindAria(); // aria 셋팅
        },

        _bindAria: function _bindAria() {
            var self = this;
            // TODO
            self.$el.attr({
                'role': 'dialog',
                'aria-hidden': 'false',
                'aria-describedby': self.$('section').attr('id') || self.$('section').attr('id', self.cid + '_content').attr('id'),
                'aria-labelledby': self.$('h1').attr('id') || self.$('h1').attr('id', self.cid + '_title').attr('id')
            });
        },
        /**
         * zindex때문에 모달을 body바로 위로 옮긴 후에 띄우는데, 닫을 때 원래 위치로 복구시켜야 하므로,
         * 원래 위치에 임시 홀더를 만들어 놓는다.
         * @private
         */
        _createHolder: function _createHolder() {
            var self = this;

            if (self.$el.parent().is('body')) {
                return;
            }

            self.$holder = $('<span class="ui_modal_holder" style="display:none;"></span>').insertAfter(self.$el);
            self.$el.appendTo('body');
        },
        /**
         * 원래 위치로 복구시키고 홀더는 제거
         * @private
         */
        _replaceHolder: function _replaceHolder() {
            var self = this;

            if (self.$holder) {
                self.$el.insertBefore(self.$holder);
                self.$holder.remove();
            }
        },

        getOpener: function getOpener() {
            return $(this.options.opener);
        },

        /**
         * 토글
         */
        toggle: function toggle() {
            var self = this;

            self[self.isShown ? 'hide' : 'show']();
        },

        /**
         * 표시
         */
        show: function show() {
            if (this.isShown) {
                return;
            }

            var self = this,
                opts = self.options,
                showEvent = $.Event('modalshow');

            self.trigger(showEvent);
            if (showEvent.isDefaultPrevented()) {
                return;
            }

            self.isShown = true;

            if (opts.title) {
                self.$(opts.cssTitle).html(opts.title || '알림');
            }

            self.layout();
            var defer = $.Deferred();
            if (opts.effect === 'fade') {
                self.$el.hide().fadeIn('slow', function () {
                    defer.resolve();
                });
            } else if (opts.effect === 'slide') {
                self.$el.css('top', -self.$el.height()).animate({ top: '50%' }, function () {
                    defer.resolve();
                });
            } else {
                self.$el.show();
                defer.resolve();
            }

            defer.done(function () {
                self.trigger('modalshown', {
                    module: self
                });

                //////$('body').attr('aria-hidden', 'true');    // body를 비활성화(aria)
                self._draggabled(); // 드래그 기능 빌드
                self._escape(); // esc키이벤트 바인딩
                self.$el.css('min-height', self.$el.css('min-height', '').prop('scrollHeight'));
                ///////////me._enforceFocus();   // 탭키로 포커스를 이동시킬 때 포커스가 레이어팝업 안에서만 돌도록 빌드

                self.on('mousewheel', function (e) {
                    e.stopPropagation();
                });

                var $focusEl = self.$el.find('[data-autofocus=true]');

                // 레이어내에 data-autofocus를 가진 엘리먼트에 포커스를 준다.
                if ($focusEl.length > 0) {
                    $focusEl.eq(0).focus();
                } else {
                    // 레이어에 포커싱
                    self.$el.attr('tabindex', 0).focus();
                }

                var $focusEl = self.$('[data-autofocus=true]');
                if ($focusEl.length > 0) {
                    $focusEl.eq(0).focus();
                } else {
                    self.$el.attr('tabindex', 0).focus();
                }

                // 버튼
                /**************if (me.options.opener) {
                    var modalid;
                    if (!(modalid = me.$el.attr('id'))) {
                        modalid = 'modal_' + core.getUniqId(16);
                        me.$el.attr('id', modalid);
                    }
                    $(me.options.opener).attr('aria-controls', modalid);
                }**********/
            });
        },

        /**
         * 숨김
         */
        hide: function hide(e) {
            if (e) {
                e.preventDefault();
            }

            var self = this;
            e = $.Event('modalhide');
            self.trigger(e);
            if (!self.isShown || e.isDefaultPrevented()) {
                return;
            }

            var defer = $.Deferred();
            self.isShown = false;
            if (self.options.effect === 'fade') {
                self.$el.fadeOut('slow', function () {
                    defer.resolve();
                });
            } else if (self.options.effect === 'slide') {
                self.$el.animate({
                    top: -self.$el.outerHeight()
                }, function () {
                    defer.resolve();
                });
            } else {
                self.$el.hide();
                defer.resolve();
            }

            defer.done(function () {
                self.trigger('modalhidden');

                self.$el.removeClass('ui_modal_container'); // dom에 추가된 것들 제거
                self._escape(); // esc 키이벤트 제거
                self._replaceHolder(); // body밑으로 뺀 el를 다시 원래 위치로 되돌린다.

                if (self.options.removeOnClose) {
                    self.$el.remove(); // 닫힐 때 dom에서 삭제하도록 옵션이 지정돼있으면, dom에서 삭제한다.
                }
                /*if (me.options.opener) {
                 $(me.options.opener).removeAttr('aria-controls').focus();    // 레이어팝업을 띄운 버튼에 포커스를 준다.
                 }*/
                //:if (self.$overlay) {
                //:    self.$overlay.remove(), self.$overlay = null;    // 오버레이를 제거
                //:}
                ////// $('body').removeAttr('aria-hidden');    // 비활성화를 푼다.

                self.destroy();
            });
        },

        /**
         * 도큐먼트의 가운데에 위치하도록 지정
         */
        layout: function layout() {
            var self = this,
                width,
                height,
                css,
                isOverHeight,
                isOverWidth,
                top,
                left,
                winHeight = core.dom.getWinHeight(),
                winWidth = core.dom.getWinWidth(),
                scrollHeight = self.$el.css('min-height', '').prop('scrollHeight');

            if (!self.isShown) {
                self.$el.css({
                    'display': 'inline'
                });
            }
            width = self.$el.outerWidth();
            height = self.$el.outerHeight();
            isOverHeight = height > winHeight;
            isOverWidth = width > winWidth;
            css = {
                display: 'block',
                position: 'absolute',
                //backgroundColor: '#ffffff',
                outline: 'none',
                minHeight: scrollHeight,
                backgroundClip: 'padding-box' //,
                //top: top = isOverHeight ? '0%' : '50%'//,
                //left: left = isOverWidth ? '0%' : '50%'
            };

            css.transform = '';
            if (self.options.variableWidth !== false) {
                css.left = isOverWidth ? '0%' : '50%';
                if (self.options.useTransformAlign) {
                    css.transform += 'translateX(-' + css.left + ') ';
                } else {
                    css.marginLeft = isOverWidth ? '' : Math.ceil(width / 2) * -1;
                }
            }

            if (self.options.variableHeight !== false) {
                css.top = isOverHeight ? '0%' : '50%';
                if (self.options.useTransformAlign) {
                    css.transform += 'translateY(-' + css.top + ') ';
                } else {
                    css.marginTop = isOverHeight ? '' : Math.ceil(height / 2) * -1;
                }
            }

            self.$el.stop().css(css);
        },

        /**
         * 타이틀 영역을 드래그기능 빌드
         * @private
         */
        _draggabled: function _draggabled() {
            var self = this,
                options = self.options;

            if (!options.draggable || self.bindedDraggable) {
                return;
            }
            self.bindedDraggable = true;

            if (options.dragHandle) {
                self.$el.css('position', 'absolute');
                core.css3.prefix('user-select') && self.$(options.dragHandle).css(core.css3.prefix('user-select'), 'none');
                self.on('mousedown touchstart', options.dragHandle, function (e) {
                    e.preventDefault();

                    var isMouseDown = true,
                        pos = self.$el.position(),
                        oriPos = {
                        left: e.pageX - pos.left,
                        top: e.pageY - pos.top
                    },
                        _handler;

                    $doc.on(self.makeEventNS('mousemove mouseup touchmove touchend touchcancel'), _handler = function handler(e) {
                        switch (e.type) {
                            case 'mousemove':
                            case 'touchmove':
                                if (!isMouseDown) {
                                    return;
                                }
                                self.$el.css({
                                    left: e.pageX - oriPos.left,
                                    top: e.pageY - oriPos.top
                                });
                                break;
                            case 'mouseup':
                            case 'touchend':
                            case 'touccancel':
                                isMouseDown = false;
                                $doc.off(self.getEventNS(), _handler);
                                break;
                        }
                    });
                });

                self.$(options.dragHandle).css('cursor', 'move');
            }
        },

        /**
         * 모달이 띄워진 상태에서 탭키를 누를 때, 모달안에서만 포커스가 움직이게
         * @private
         */
        _enforceFocus: function _enforceFocus() {
            if (!isTouch) {
                return;
            }
            var self = this;
            var $focusEl = self.$el.find('[data-autofocus=true]');

            // 레이어내에 data-autofocus를 가진 엘리먼트에 포커스를 준다.
            if ($focusEl.length > 0) {
                $focusEl.eq(0).focus();
            } else {
                // 레이어에 포커싱
                self.$el.attr('tabindex', 0).focus();
            }

            $doc.off('focusin' + self.getEventNS()).on('focusin' + self.getEventNS(), self.proxy(function (e) {
                if (self.$el[0] !== e.target && !$.contains(self.$el[0], e.target)) {
                    self.$el.find(':focusable').first().focus();
                    e.stopPropagation();
                }
            }));
        },

        /**
         * esc키를 누를 때 닫히도록
         * @private
         */
        _escape: function _escape() {
            if (isTouch) {
                return;
            }
            var self = this;

            if (self.isShown && self.options.closeByEscape) {
                self.docOff('keyup');
                self.docOn('keyup', function (e) {
                    e.which === 27 && self.hide();
                });
            } else {
                self.docOff('keyup');
            }
        },

        /**
         * 오버레이 생성
         * @private
         */
        _overlay: function _overlay() {
            return;

            var self = this;
            if (!self.options.overlay || self.$overlay) {
                return false;
            } //140123_추가

            self.$overlay = $('<div class="ui_modal_overlay" />');
            self.$overlay.css({
                'backgroundColor': '#ffffff',
                'opacity': 0.6,
                'position': 'fixed',
                'top': 0,
                'left': 0,
                'right': 0,
                'bottom': 0
            }).appendTo('body');

            self.$overlay.off('click.modal').on('click.modal', function (e) {
                if (e.target != e.currentTarget) {
                    return;
                }
                self.$overlay.off('click.modal');
                self.hide();
            });
        },

        /**
         * 모달의 사이즈가 변경되었을 때 가운데위치를 재조절
         * @example
         * $('...').modal(); // 모달을 띄운다.
         * $('...').find('.content').html( '...');  // 모달내부의 컨텐츠를 변경
         * $('...').modal('center');    // 컨텐츠의 변경으로 인해 사이즈가 변경되었으로, 사이즈에 따라 화면가운데로 강제 이동
         */
        center: function center() {
            this.layout();
        },

        /**
         * 열기
         */
        open: function open() {
            this.show();
        },

        /**
         * 닫기
         */
        close: function close() {
            this.hide();
        },

        /**
         *
         */
        destroy: function destroy() {
            var self = this;

            self.supr();
        }
    });

    /**
     * 열려 있는 레이어팝업을 가운데에 위치시키는 글로벌이벤트
     * @example
     * vcui.PubSub.trigger('resize:modal')
     */
    /*core.PubSub.on('resize:modal', function() {
     if(Modal.active){
     Modal.active.center();
     }
     });*/

    //윈도우가 리사이징 될때 가운데에 자동으로 위치시킴
    /*$(window).on('resize.modal', function() {
     if(Modal.active){
     Modal.active.center();
     }
     });*/

    core.modal = function (el, options) {
        $(el).vcModal(options);
    };

    /**
     * @class
     * @name vcui.ui.AjaxModal
     * @description ajax로 불러들인 컨텐츠를 모달로 띄워주는 모듈
     * @extends vcui.ui.View
     */
    core.ui.ajaxModal = function (ajaxOptions, options) {
        if (typeof ajaxOptions === 'string') {
            ajaxOptions = {
                url: ajaxOptions
            };
        }
        return $.ajax(ajaxOptions).then(function (html) {
            var $modal = ModalManager.getRealModal(html).appendTo('body').data('removeOnClose', true);
            return $modal.vcModal(core.extend(options, {
                removeOnClose: true,
                events: {
                    modalhidden: function modalhidden() {
                        $(options.opener).focus();
                    }
                }
            }));
        });
    };

    core.ui.alert = function () {
        /**
         * 얼럿레이어
         * @memberOf vcui.ui
         * @name alert
         * @function
         * @param {string} msg 얼럿 메세지
         * @param {Object} options 모달 옵션
         * @example
         * vcui.ui.alert('안녕하세요');
         */
        return function (msg, options) {
            if (typeof msg !== 'string' && arguments.length === 0) {
                options = msg;
                msg = '';
            }
            var el = $(core.ui.alert.tmpl).appendTo('body').find('div.ui_modal_content').html(msg).end();
            var modal = $(el).vcModal(core.extend({ removeOnClose: true }, options)).vcModal('instance');
            modal.getElement().buildUIControls();
            modal.on('modalhidden', function () {
                el = null;
                modal = null;
            });
            return modal;
        };
    }();
    core.ui.alert.tmpl = ['<div class="layer_popup small ui_alert" role="alert" style="display:none">', '<h1 class="title ui_modal_title">알림창</h1>', '<div class="cntt">', '<div class="ui_modal_content">&nbsp;</div>', '<div class="wrap_btn_c">', '<button type="button" class="btn_emphs_small" data-role="ok"><span><span>확인</span></span></button>', '</div>', '</div>', '<button type="button" class="ui_modal_close"><span>닫기</span></button>', '<span class="shadow"></span>', '</div>'].join('');
    ///////////////////////////////////////////////////////////////////////////////////////

    return Modal;
});
/*!
 * @module vcui.ui.Selectbox
 * @license MIT License
 * @description 모달 컴포넌트
 * @copyright VinylC UID Group
 */
define('ui/selectbox', ['jquery', 'vcui', 'helper/gesture'], function ($, core, Gesture) {
    "use strict";

    var $doc = $(document),
        $win = $(window),
        isTouch = core.detect.isTouch;

    var BaseSelectbox = core.ui.View.extend({
        name: 'Selectbox',
        templates: {
            notextOption: '<span class="ui-select-text"></span><span class="hide"></span><span class="ico"></span>',
            labelOption: '<span class="ui-select-text" _style="text-overflow: ellipsis;' + 'width: 100%;display: inline-block;overflow: hidden;">{{text}}</span><span class="hide">선택됨</span><span class="ico"></span>'
        },
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            if (self.$el.attr('data-class') && self.$el.attr('data-class').indexOf('read') > -1) {
                self.$el.prop('readonly', true);
            }
        },
        _options: function _options(cb) {
            core.each(core.toArray(this.el.options), cb);
        },

        _isDeactive: function _isDeactive() {
            var self = this;
            return self.$el.prop('disabled') || self.$el.prop('readonly') === true;
        },

        /**
         * @param option
         * @param type
         * @returns {*}
         * @private
         */

        _itemHTML: function _itemHTML(option, type) {
            var self = this;

            if (!option) {
                return self.tmpl('notextOption');
            }
            if (type === 'label') {
                return self.tmpl('labelOption', option);
            } else {
                return option.text;
            }
        },

        selectedIndex: function selectedIndex(index, trigger) {
            if (arguments.length === 0) {
                return this.el.selectedIndex;
            } else {
                if (this.el.options.length === 0) {
                    return;
                }

                var e = $.Event('beforechange');
                this.$el.trigger(e);
                if (e.isDefaultPrevented()) {
                    return;
                }

                this.el.selectedIndex = index;
                if (trigger !== false) {
                    this.$el.trigger('change', { selectedIndex: this.el.selectedIndex });
                } else {
                    this._updateLabel();
                }
            }
        },
        value: function value(val, trigger) {
            var self = this;
            if (arguments.length === 0) {
                return self.el.value;
            } else {
                if ( /*self._isDeactive() ||*/self.el.options.length === 0) {
                    return;
                }
                this._options(function (option, i) {
                    if (option.value === val + "") {
                        self.selectedIndex(i, trigger);
                        return false;
                    }
                });
            }
        },
        text: function text(txt, trigger) {
            var self = this;
            if (arguments.length === 0) {
                return this.el.value;
            } else {
                if ( /*self._isDeactive() || */self.el.options.length === 0) {
                    return;
                }
                this._options(function (option, i) {
                    if (option.text === txt + "") {
                        self.selectedIndex(i, trigger);
                        return false;
                    }
                });
            }
        },
        selectedOption: function selectedOption() {
            return this.el.options[this.el.selectedIndex];
        },

        /**
         * 레이블 갱신
         * @param index
         * @private
         */
        _updateLabel: function _updateLabel(index) {
            var self = this,
                isActive = !self._isDeactive(),
                $label = self.$label.children(),
                isReadonly = self.$el.hasClass('read') || self.$el.prop('readonly') === true,
                isDisabled = self.$el.prop('disabled');

            index = typeof index === 'undefined' ? self.el.selectedIndex : index;
            if (index < 0 && self.el.options.length > 0) {
                self.el.selectedIndex = index = 0;
            }
            self.attrTitle = self.$el.attr('title') || self.$el.attr('data-title');

            self.$selectbox.toggleClass('read', isReadonly && !isDisabled).toggleClass('disabled', isDisabled).toggleClass('warn', self.$el.is('[data-class*=warn]'));

            $label.attr('title', self.attrTitle + ' 열기').find('.hide').text(isActive ? '선택됨' : '선택불가');

            $label.html(self._itemHTML(index < 0 ? null : self.el.options[index], 'label'));
            if (isActive) {
                $label.removeAttr('tabindex');
            } else {
                if (self.$el.prop('disabled')) {
                    $label.attr('tabindex', -1);
                }
            }
        },

        update: function update(list, selectedValue) {
            var self = this;

            if ( /*self._isDeactive() ||*/!list) {
                return;
            }
            if (core.is(list, 'array')) {
                // list 값이 있으면 select를 갱신시킨다.
                self.el.options.length = 0;
                core.each(list, function (item, i) {
                    if ('text' in item) {
                        self.el.options.add(new Option(item.text || item.value, item.value));
                    } else {
                        core.each(item, function (txt, val) {
                            self.el.options.add(new Option(txt, val));
                            return false;
                        });
                    }
                });
            } else if (core.is(list, 'json')) {
                self.el.options.length = 0;
                core.each(list, function (key, value) {
                    self.el.options.add(new Option(key, value));
                });
            }

            if (selectedValue) {
                self.el.value = selectedValue;
            }
        },

        /**
         * 셀렉트박스 UI 표시
         */
        show: function show() {
            this.display = true;
            this.$selectbox.toggle(this.display);
        },

        /**
         * 셀렉트박스 UI 숨김
         */
        hide: function hide() {
            this.display = false;
            this.$selectbox.toggle(this.display);
        },

        /**
         * 셀렉트박스 UI 토글링
         * @param {Boolean} flag 표시 여부
         */
        toggle: function toggle(flag) {
            if (arguments.length === 0) {
                flag = !this.display;
            }
            this.display = flag;
            this.$selectbox.toggle(this.display);
        },

        readonly: function readonly(flag) {
            this.$el.toggleClass('read', flag).prop('readonly', flag);
            this.update();
        },
        disabled: function disabled(flag) {
            this.$el.toggleClass('disabled', flag).prop('disabled', flag);
            this.update();
        }
    });

    //Selectbox////////////////////////////////////////////////////////////////////////////
    /**
     * 커스텀 셀렉트박스<br />
     *
     * @class
     * @name vcui.ui.Selectbox
     * @extends vcui.ui.View
     */
    var CustomSelectbox = core.ui('CusomtSelectbox', BaseSelectbox, {
        //bindjQuery: 'selectbox',
        $statics: {
            ON_CHANGED: 'selectboxchanged'
        },
        defaults: {
            classSort: ['sup', 'cnum', 'cname'],
            allowScrollbar: true,
            containerMargin: 2,
            where: 'inline',
            wrapClasses: '',
            disabledClass: 'disabled'
        },

        templates: {
            label: '<div class="ui-selectbox-view"><a href="#0" class="ui-select-button" title="">{{#raw html}}</a></div>',
            list: '<div class="ui-selectbox-list" id="{{cid}}_menu"><div class="ui-select-scrollarea"></div></div>',
            scrollbar: '<div class="ui-select-scroll" style="top: 0px;">' + '<span class="bg_top"></span><span class="bg_mid" style=""></span>' + '<span class="bg_btm"></span></div>',
            option: '<li><a href="#{{num}}" data-value="{{value}}" data-text="{{text}}" title="{{attrTitle}}">{{#raw html}}</a></li>'
        },
        /**
         * 생성자
         * @param {string|Element|jQuery} el 해당 엘리먼트(노드, id, jQuery 어떤 형식이든 상관없다)
         * @param {Object} [options] 옵션값
         * @param {string} [options.wrapClasses = ''] wrap 클래스명
         * @param {string} [options.disabledClass = 'disabled'] disabled 클래스명
         */
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.display = self.$el.css('display') !== 'none';
            self.$el.hide();

            self._create();
            self.update();
        },

        /**
         * select 컨트롤을 기반으로 UI DOM 생성
         * @private
         */
        _create: function _create() {
            var self = this,
                cls = self.$el.attr('data-class') || 'ui-selectbox-wrap',
                elId = !self.options.id ? '' : ' id="' + self.options.id + '"';

            self.originalWidth = parseInt(self.$el.css('width'), 10) + 22;
            self.attrTitle = self.options.title || self.$el.attr('title') || '셀렉트박스';
            if (self.options.wrapClasses) {
                cls = cls + ' ' + self.options.wrapClasses;
            }

            // 셀렉트박스
            self.$selectbox = $('<div class="' + cls + '" ' + elId + '></div>');
            if (!self.options.widthClass) {
                self.$selectbox.css('width', self.originalWidth);
            } else {
                self.$selectbox.addClass(self.options.widthClass);
            }
            self.$selectbox.insertAfter(self.$el);

            self._createLabel();
            self._createList();
            self._bindEvents();
        },

        /**
         * 이벤트 바인딩
         * @private
         */
        _bindEvents: function _bindEvents() {
            var self = this;
            var timer;
            //
            self.on('selectboxopen selectboxclose', function (e) {
                if (self._isDeactive()) {
                    return;
                }

                var isOpen = e.type === 'selectboxopen';

                self.$selectbox.toggleClass('on', isOpen);
                self.$el.closest('div.select_wrap').toggleClass('on', isOpen);

                if (isOpen) {
                    self._reposition();
                    self.$list.show();

                    self._refreshScroll();
                    self._scrollToItem();

                    $doc.on('touchstart.selectbox' + self.cid + ' mousedown.selectbox' + self.cid, function (e) {
                        if (!$.contains(self.$selectbox[0], e.target)) {
                            clearTimeout(timer), timer = null;
                            self.close();
                        }
                    });

                    Selectbox.active = self;
                } else {
                    self.$list.hide();
                    Selectbox.active = null;
                    clearTimeout(timer), timer = null;
                    $doc.off('.selectbox' + self.cid);
                }
                self.isShown = isOpen;
                self.$label.find('.ui-select-button').attr('title', self.attrTitle + (isOpen ? ' 닫기' : ' 열기'));
            });

            self.$el.on('change', function () {
                self._updateLabel(this.selectedIndex);
            });

            // 비터치 기반일 때에 대한 이벤트 처리
            if (!isTouch) {
                // 셀렉트박스에서 포커스가 벗어날 경우 자동으로 닫히게
                self.$selectbox.on('mouseenter.selectbox mouseleave.selectbox ' + 'focusin.selectbox focusout.selectbox', function (e) {
                    clearTimeout(timer), timer = null;
                    if (self.$el.prop('disabled')) {
                        return;
                    }
                    if (e.type === 'mouseenter' || e.type === 'focusin') {
                        self.$selectbox.addClass('active');
                    } else if (e.type === 'mouseleave' || e.type === 'focusout') {
                        self.$selectbox.removeClass('active');
                        if (e.type === 'focusout' && self.$selectbox.hasClass('on')) {
                            timer = setTimeout(function () {
                                self.close();
                            }, 200);
                        }
                    }
                }).on('keydown', function (e) {
                    if (!self.isShown) {
                        return;
                    }
                    switch (e.keyCode) {
                        case core.keyCode.ESCAPE:
                            self.close();
                            self.$label.find('a').focus();
                            break;
                    }
                });
            }

            var changemediasizeCallback;
            $(window).on('changemediasize.' + self.cid, changemediasizeCallback = function changemediasizeCallback(e, data) {
                if (self.isShown) {
                    self._refreshScroll();
                }
                self._updateLabel();
            });
            changemediasizeCallback();

            $(self.el.form).on('reset', function () {
                setTimeout(function () {
                    self.update();
                });
            });
        },

        /**
         * 레이블 생성
         * @private
         */
        _createLabel: function _createLabel() {
            var self = this;

            self.$label = $(self.tmpl('label', {
                html: self._itemHTML(self.el.selectedIndex >= 0 ? self.el.options[self.el.selectedIndex] : null, 'label')
            }));

            self.$label.attr({
                'id': self.cid + '_button'
            }).on('click', '.ui-select-button', function (e) {
                e.preventDefault();
                if (self === Selectbox.active) {
                    self.close();
                    return;
                }

                // 현재 셀렉트박스가 열려있으면 닫고, 닫혀있으면 열어준다.
                if (self.$selectbox.hasClass('on')) {
                    self.close();
                } else {
                    if (self._isDeactive()) {
                        return;
                    }
                    self.open();
                }
            });
            !isTouch && self.$selectbox.on('keydown', '.item_view a', function (e) {
                if (self._isDeactive()) {
                    return;
                }
                if (e.keyCode === 40) {
                    // down
                    if (!self.isShown) {
                        self.open();
                    }
                    self.$list.find('li>a:eq(0)').focus();
                    e.preventDefault();
                }
            });

            self.$selectbox.append(self.$label);
        },

        /**
         * 리스트 생성
         * @private
         */
        _createList: function _createList() {
            var self = this;

            self.$list = $(self.tmpl('list', { cid: self.cid }));
            self.$selectbox.append(self.$list);
            self.$listWrapper = self.$list.children();

            self.$selectbox.on('click', '.ui-selectbox-list', function (e) {
                self.$list.focus();
            }).on('click', '.ui-selectbox-list li>a', function (e) {
                // 아이템을 클릭했을 때
                e.preventDefault();
                e.stopPropagation();

                self.selectedIndex($(this).parent().index());
                self.close();
                self.$label.find('a').focus();
            });

            !isTouch && self.$selectbox.on('mousedown', '.ui-selectbox-list li>a', function () {
                this.focus();
            }).on('keydown', '.ui-selectbox-list a', function (e) {
                if (e.keyCode != 38 && e.keyCode != 40) {
                    return;
                }
                if (!self.isShown) {
                    return;
                }
                e.preventDefault();

                // 키보드의 위/아래 키로 이동
                var $links = self.$selectbox.find('a'),
                    index = $links.index(this),
                    count = $links.length;

                switch (e.keyCode) {
                    case 38:
                        // up
                        $links.eq(Math.max(0, index - 1)).focus();
                        break;
                    case 40:
                        // down
                        $links.eq(Math.min(count, index + 1)).focus();
                        break;
                }
            });
            self.maxHeight = parseInt(self.$listWrapper.css('max-height'), 10);

            self.$scrollbar = $(self.tmpl('scrollbar'));
            self.$list.append(self.$scrollbar);
            if (!isTouch) {
                self.$list.on('mouseenter mouseleave', function (e) {
                    self.isScrollbarActive = e.type === 'mouseenter';
                    self.$scrollbar.toggleClass('active', self.isScrollbarDown || self.isScrollbarActive);
                });
            }
            /* TODO
             if (!core.detect.isTouch) {
             self.$list.on('mouseenter mouseleave', function (e){
             self.isScrollbarActive = e.type === 'mouseenter';
             self.$scrollbar.toggleClass('active', self.isMouseDown || self.isScrollbarActive);
             });
             }
             */
        },

        /**
         * 스크롤박스를 버튼 위에 놓을지 아래에 놓을지 결정
         * @private
         */
        _reposition: function _reposition() {
            var self = this,
                $scrollarea,
                scrollTop,
                offset,
                listHeight,
                selectHeight,
                scrollHeight;

            $scrollarea = self.$selectbox.parentsUntil('body').filter(function () {
                var overflow = $(this).css('overflowY');
                return overflow === 'hidden' || overflow === 'auto';
            });
            if ($scrollarea.length === 0) {
                return;
            }

            scrollTop = $scrollarea.scrollTop();
            scrollHeight = $scrollarea.prop('scrollHeight');
            selectHeight = self.$selectbox.innerHeight();
            offset = self.$selectbox.offset().top - $scrollarea.offset().top + scrollTop;
            self.$list.css('visibility', 'hidden').show();
            listHeight = self.$listWrapper.innerHeight();
            self.$list.css('visibility', '').hide();

            if (offset + listHeight + selectHeight > scrollHeight && offset - scrollTop > listHeight) {
                self.$selectbox.addClass('up');
                self.$list.css('marginTop', (listHeight + selectHeight + 3) * -1);
            } else {
                self.$selectbox.removeClass('up');
                self.$list.css('marginTop', '');
            }
        },

        /**
         * 리스트 표시
         * @fires vcui.ui.Selectbox#selectboxopen
         */
        open: function open() {
            var self = this;
            Selectbox.active && Selectbox.active.close();

            if (self.options.where === 'body') {
                self.$list.css({
                    position: 'absolute',
                    zIndex: 9000,
                    top: self.$label.offset().top + self.$label.height(),
                    left: self.$label.offset().left
                }).appendTo('body');
            }

            /**
             * 셀렉트박스가 열릴 때 발생
             * @event vcui.ui.Selectbox#selectboxopen
             */ //self.$selectbox.triggerHandler('selectboxopen');
            self.triggerHandler('selectboxopen');
        },

        /**
         * 리스트 닫기
         * @fires vcui.ui.Selectbox#selectboxclose
         */
        close: function close() {
            var self = this;

            /**
             * 셀렉트박스가 닫힐 때 발생
             * @event vcui.ui.Selectbox#selectboxclose
             */
            self.triggerHandler('selectboxclose');

            if (self.options.where === 'body') {
                self.$label.after(self.$list.css({
                    position: '',
                    zIndex: '',
                    top: '',
                    left: ''
                }));
            }
        },

        /**
         * index에 해당하는 option항목을 선택
         *
         * @param {number} index 선택하고자 하는 option의 인덱스
         * @param {boolean} trigger change이벤트를 발생시킬 것인지 여부
         */
        selectedIndex: function selectedIndex(index, trigger) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.selectedIndex;
            }
            //if (self._isDeactive()) { return; }
            self.supr.apply(self, core.toArray(arguments));
            self.$list.find('li').removeClass('on').eq(self.el.selectedIndex).addClass('on');
        },

        /**
         * value 에 해당하는 option항목을 선택, 인자가 없을땐 현재 선택되어진 value를 반환
         *
         * @param {string} index 선택하고자 하는 option의 인덱스
         * @param {boolean} trigger change이벤트를 발생시킬 것인지 여부
         * @return {string}
         * @example
         * &lt;select id="sel">&lt;option value="1">1&lt;/option>&lt;option value="2">2&lt;/option>&lt;/select>
         *
         * $('#sel').vcSelectbox('value', 2);
         * value = $('#sel').vcSelectbox('value'); // = $('#sel')[0].value 와 동일
         */
        value: function value(_value, trigger) {
            var self = this;

            if (arguments.length === 0) {
                return self.el.options[self.el.selectedIndex].value;
            } else {
                //if (self._isDeactive()) { return; }
                self.supr.apply(self, core.toArray(arguments));
            }
        },

        /**
         * 동적으로 select의 항목들이 변경되었을 때, UI에 반영
         *
         * @param {json} (optional) list 만약 option들을 새로 갱신하고자 할 경우
         * @example
         * &lt;select id="sel">&lt;option value="1">1&lt;/option>&lt;option value="2">2&lt;/option>&lt;/select>
         *
         * $('#sel')[0].options[2] = new Option(3, 3);
         * $('#sel')[0].options[3] = new Option(4, 4);
         * $('#sel').vcSelectbox('update');
         */
        update: function update(list, selectedValue) {
            var self = this,
                html = '',
                text = '',
                num = 1;

            var isDisabled = self.$el.prop('disabled');
            var isReadonly = self.$el.prop('readonly') === true;

            self.close();
            if (list) {
                self.supr(list, selectedValue);
            }

            self._updateLabel();
            if (isReadonly || isDisabled) {
                return;
            }

            // select에 있는 options를 바탕으로 UI를 새로 생성한다.
            self._options(function (item, i) {
                html += self.tmpl('option', {
                    num: num++,
                    value: item.value,
                    text: item.text,
                    attrTitle: self.attrTitle,
                    html: self._itemHTML(item)
                });
            });

            self.$listWrapper.empty().html('<ul>' + html + '</ul>').find('li:eq(' + self.el.selectedIndex + ')').addClass('on');

            self.$selectbox.toggle(self.display);
        },

        setTitle: function setTitle(title) {
            this.$listWrapper.find('a').attr('title', this.attrTitle = title);
        },

        /**
         * readonly 모드로 변경
         * @param flag
         */
        readonly: function readonly(flag) {
            var self = this;

            self.supr(flag);
            self.close();
            self.update();
        },

        /**
         * disabled 모드로 변경
         * @param flag
         */
        disabled: function disabled(flag) {
            var self = this;

            self.supr(flag);
            self.close();
            self.update();
        },

        /**
         * 스크롤바 이벤트 바인딩
         * @private
         */
        _bindScrollEvent: function _bindScrollEvent() {
            var self = this;
            var $listChild = self.$listWrapper;

            $listChild.on('scroll', function () {
                if (!self.isScrollbarDown) {
                    self._scrollUpdate();
                }
            });

            if (!isTouch) {
                if (self.options.allowScrollbar) {
                    // 스크롤바 드래그 바인딩

                    self.$scrollbar.vcGesture({
                        direction: 'vertical',
                        gesture: function () {
                            var currY, top, rate, scrollbarHeight, wrapperHeight, scrollHeight;
                            return function (type, data) {
                                if (!self.isVisibleScrollbar) {
                                    return false;
                                }
                                switch (type) {
                                    case 'start':
                                        self.isScrollbarDown = true;
                                        currY = parseInt(self.$scrollbar.css('top'), 10);
                                        scrollbarHeight = self.$scrollbar.height();
                                        wrapperHeight = self.$listWrapper.height();
                                        scrollHeight = self.$listWrapper.prop('scrollHeight');
                                        break;
                                    case 'move':
                                        if (!self.isScrollbarDown) {
                                            return;
                                        }
                                        top = self._scrollbarMove(currY + data.diff.y);
                                        rate = top / (wrapperHeight - scrollbarHeight);
                                        self.$listWrapper.scrollTop(rate * (scrollHeight - wrapperHeight));
                                        break;
                                    default:
                                        self.isScrollbarDown = false;
                                        !self.isScrollbarActive && self.$scrollbar.removeClass('active');
                                        break;
                                }
                            };
                        }()
                    });
                }

                // 휠스크롤 바인딩
                self.$selectbox.on('mousewheel DOMMouseScroll wheel', function (event) {
                    if (!self.isVisibleScrollbar) {
                        return;
                    }
                    //event.preventDefault();
                    var e = event.originalEvent,
                        delta = core.dom.getDeltaY(e) * 40,
                        scrollTop = $listChild.scrollTop();

                    $listChild.scrollTop(scrollTop - delta);
                    //if ($listChild.scrollTop() == scrollTop) {
                    event.preventDefault();
                    event.stopPropagation();
                    //}
                });
            } else {
                // 리스트 드래그 바인딩

                self.$list.vcGesture({
                    direction: 'vertical',
                    gesture: function () {
                        var currY = 0;
                        return function (type, data) {
                            if (!self.isVisibleScrollbar) {
                                return false;
                            }
                            switch (type) {
                                case 'start':
                                    currY = $listChild.scrollTop();
                                    break;
                                case 'move':
                                    $listChild.scrollTop(currY - data.diff.y);
                                    break;
                            }
                        };
                    }()
                });
            }
            // ScrollBar Event Bind End
        },

        /**
         * 스크롤바 삭제
         * @private
         */
        _hideScroll: function _hideScroll() {
            var self = this;

            self.isVisibleScrollbar = false;
            self.$scrollbar.hide().css({ 'height': 0, 'top': 0 }).find('span.bg_mid').css('height', 0);
        },

        /**
         * 스크롤바 갱신
         * @private
         */
        _scrollUpdate: function _scrollUpdate() {
            var self = this;
            if (!self.isVisibleScrollbar) {
                return;
            }
            var rate = (self.wrapperHeight - self.scrollBarHeight) / (self.scrollerHeight - self.wrapperHeight);
            self._scrollbarMove(self.$listWrapper.scrollTop() * rate);
        },

        /**
         * 스크롤바 이동
         * @param top
         * @returns {number|*}
         * @private
         */
        _scrollbarMove: function _scrollbarMove(top) {
            var self = this;

            if (!self.isVisibleScrollbar) {
                return;
            }
            top = Math.min(self.scrollHeight, Math.max(0, top));
            self.$scrollbar.css({
                'height': Math.ceil(self.scrollBarHeight),
                'top': top
            }).find('span.bg_mid').css('height', Math.ceil(self.scrollBarHeight) - 24);
            return top;
        },

        // 스크롤링
        _scrollTop: function _scrollTop(top) {
            var self = this;

            self.$listWrapper.scrollTop(top * self.scrollRate);
            self._scrollUpdate();
        },

        /**
         * 활성화된 아이템을 가시영역에 보이도록 강제 스크롤
         * @private
         */
        _scrollToItem: function _scrollToItem() {
            var self = this,
                selIndex = self.el.selectedIndex;

            if (selIndex > 0) {
                var $option = self.$list.find('li').eq(selIndex),
                    scrollTop = self.$listWrapper.scrollTop(),
                    optionTop = $option.position().top + scrollTop,
                    wrapperHeight = self.$list.height(),
                    optionHeight,
                    listHeight;

                if (optionTop < scrollTop || optionTop >= wrapperHeight + scrollTop) {
                    optionHeight = $option.height();
                    listHeight = self.$listWrapper.height();
                    self.$listWrapper.scrollTop(optionTop - listHeight / 2 + optionHeight / 2);
                }
            } else {
                self.$listWrapper.scrollTop(0);
            }
        },

        /**
         * 스크롤바 재배치(꼭 해야되는 상황일 때만 갱신함)
         * @private
         */
        _refreshScroll: function _refreshScroll() {
            var self = this;

            self.scrollerHeight = self.$list.find('ul').height();
            if (self.maxHeight > self.scrollerHeight) {
                self._hideScroll();
                return;
            }

            self.wrapperHeight = self.$listWrapper.height(); // - (self.options.containerMargin * 2);
            if (self.scrollerHeight <= self.wrapperHeight) {
                self._hideScroll();
                return;
            } else if (self.$selectbox.hasClass('on')) {
                self.$scrollbar.show();
                self.isVisibleScrollbar = true;
            }
            if (!self._bindedOverEvents) {
                self._bindedOverEvents = true;
                self._bindScrollEvent();
            }
            self.scrollRate = self.wrapperHeight / self.scrollerHeight;
            self.scrollBarHeight = Math.max(30, self.wrapperHeight * self.scrollRate);
            self.scrollHeight = self.wrapperHeight - self.scrollBarHeight;
            self.isScrollbarDown = false;
            self.moveY = 0;

            self._scrollUpdate();
        },

        /**
         * 소멸자
         */
        release: function release() {
            var self = this;

            $doc.off('.selectbox' + self.cid);
            $win.off('.' + self.cid);
            self.$scrollbar.off();
            self.$label.off().remove();
            self.$list.off().remove();
            self.$selectbox.off().remove();
            self.$el.off('change.selectbox').show().unwrap('<div></div>');
            self.supr();
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    var PickerSelectbox = core.ui('PickerSelectbox', BaseSelectbox, {
        templates: {
            label: '<div class="ui-selectbox-view"><a href="#0" class="ui-select-button" title="">{{#raw html}}</a></div>'
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self._create();
            self._bindEvents();
        },

        _create: function _create() {
            var self = this,
                cls = self.$el.attr('data-class') || 'ui-selectbox-wrap',
                elId = !self.options.id ? '' : ' id="' + self.options.id + '"';

            self.originalWidth = parseInt(self.$el.css('width'), 10) + 22;
            self.attrTitle = self.options.title || self.$el.attr('title') || '셀렉트박스';
            if (self.options.wrapClasses) {
                cls = cls + ' ' + self.options.wrapClasses;
            }

            // 셀렉트박스
            self.$selectbox = $('<div class="' + cls + '" ' + elId + '></div>');
            if (!self.options.widthClass) {
                self.$selectbox.css('width', self.originalWidth);
            } else {
                self.$selectbox.addClass(self.options.widthClass);
            }

            self.$el.css({
                '-webkit-appearance': 'none',
                '-moz-appearance': 'none',
                'border-radius': 0,
                'opacity': 0,
                'position': 'absolute',
                'top': 0,
                'left': 0,
                'bottom': 0,
                'width': '100%'
            });
            self.$selectbox.insertBefore(self.$el);
            self.$label = $(self.templated.label({
                html: self._itemHTML(self.el.options[self.el.selectedIndex], 'label')
            })).appendTo(self.$selectbox);

            self.$selectbox.prepend(self.$el);
            self.display = self.$el.css('display') !== 'none';
            self.$selectbox.toggle(self.display);
            self._updateLabel();
        },

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on('change', function () {
                self._updateLabel(self.el.selectedIndex);
            }).on('focusin focusout', function (e) {
                self.$selectbox.toggleClass('active', e.type === 'focusin');
            });
        },

        _updateLabel: function _updateLabel() {
            this.supr();
            if (this.$el.prop('readonly') === true) {
                this.$el.hide();
            }
        },

        update: function update(list, selectedValue) {
            list && this.supr(list, selectedValue);
            this._updateLabel();
        }
    });

    var Selectbox = core.ui('Selectbox', /** @lends vcui.ui.Selectbox# */{
        bindjQuery: 'Selectbox',
        defaults: {
            allowPicker: true
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }
            delete self.options.on;
            delete self.options.events;

            // 모바일에서 픽커가 아닌 커스텀셀렉트박스를 띄워야하는지 체크
            if (self.$el.attr('data-width-class') === 'f_wd_one') {
                self.options.allowPicker = false;
            }
            if (core.detect.isTouch && core.detect.isMobile && self.options.allowPicker !== false) {
                // picker
                self.sel = new PickerSelectbox(el, self.options);
            } else {
                // custom (dom ui)
                self.sel = new CustomSelectbox(el, self.options);
            }

            // puiblic 메소드를 외부에서 호출할 수 있도록 현재인스턴스에 추가
            self.$selectbox = self.sel.$selectbox;
            core.each(['selectedIndex', 'value', 'text', 'selectedOption', 'update', 'hide', 'show', 'toggle', 'readonly', 'disabled'], function (name) {
                self[name] = function () {
                    return this.sel[name].apply(this.sel, [].slice.call(arguments, 0));
                };
            });
        }
    });

    core.ui.setDefaults('Selectbox', {
        events: {
            'selectboxopen': function selectboxopen(e) {
                if (this.options.preventZindex) {
                    return;
                }
                this.$el.parentsUntil('#wrap').filter(function (i) {
                    return $(this).css('position') === 'relative';
                }).addClass('zindex');
            },
            'selectboxclose': function selectboxclose(e) {
                if (this.options.preventZindex) {
                    return;
                }
                this.$el.parents('.zindex').removeClass('zindex');
            }
        }
    });

    return Selectbox;
});
/*!
 * @module vcui.ui.SmoothScroll
 * @license MIT License
 * @description SmoothScroll 컴포넌트
 * @copyright VinylC UID Group
 */
define('ui/smoothScroll', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    /*! iScroll v5.1.2 ~ (c) 2008-2014 Matteo Spinelli ~ http://cubiq.org/license */

    var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
    var _elementStyle = document.createElement('div').style;
    var _vendor = function () {
        var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
            transform,
            i = 0,
            l = vendors.length;

        for (; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    }();

    function _prefixStyle(style) {
        if (_vendor === false) return false;
        if (_vendor === '') return style;
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    }

    var _transform = _prefixStyle('transform');

    var getTime = Date.now || function getTime() {
        return new Date().getTime();
    };

    var momentum = function momentum(current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
            speed = Math.abs(distance) / time,
            destination,
            duration;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }

        return {
            destination: Math.round(destination),
            duration: duration
        };
    };

    var browser = {
        hasTransform: _transform !== false,
        hasPerspective: _prefixStyle('perspective') in _elementStyle,
        hasTouch: 'ontouchstart' in window,
        hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
        hasTransition: _prefixStyle('transition') in _elementStyle
    };

    var easingType = {
        quadratic: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function fn(k) {
                return k * (2 - k);
            }
        },
        circular: {
            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
            fn: function fn(k) {
                return Math.sqrt(1 - --k * k);
            }
        },
        back: {
            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fn: function fn(k) {
                var b = 4;
                return (k = k - 1) * k * ((b + 1) * k + b) + 1;
            }
        },
        bounce: {
            style: '',
            fn: function fn(k) {
                if ((k /= 1) < 1 / 2.75) {
                    return 7.5625 * k * k;
                } else if (k < 2 / 2.75) {
                    return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
                } else if (k < 2.5 / 2.75) {
                    return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
                } else {
                    return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
                }
            }
        },
        elastic: {
            style: '',
            fn: function fn(k) {
                var f = 0.22,
                    e = 0.4;

                if (k === 0) {
                    return 0;
                }
                if (k == 1) {
                    return 1;
                }

                return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
            }
        }
    };

    var eventType = {
        touchstart: 1,
        touchmove: 1,
        touchend: 1,

        mousedown: 2,
        mousemove: 2,
        mouseup: 2,

        pointerdown: 3,
        pointermove: 3,
        pointerup: 3,

        MSPointerDown: 3,
        MSPointerMove: 3,
        MSPointerUp: 3
    };

    var style = {
        transform: _transform,
        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
        transitionDuration: _prefixStyle('transitionDuration'),
        transitionDelay: _prefixStyle('transitionDelay'),
        transformOrigin: _prefixStyle('transformOrigin')
    };

    var SmoothScroll = core.ui('SmoothScroll', {
        bindjQuery: 'smoothScroll',
        defaults: {
            startX: 0,
            startY: 0,
            scrollX: true,
            scrollY: true,
            directionLockThreshold: 5,
            mouseWheelSpeed: 20,
            momentum: true,
            prevButton: '',
            nextButton: '',

            bounce: true,
            bounceTime: 600,
            bounceEasing: '',

            preventDefault: false,
            preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/i },

            HWCompositing: true,
            useTransition: true,
            useTransform: true,
            resizeRefresh: true
        },
        selectors: {
            scroller: '>*:first'
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            var opts = self.options;

            self.$wrapper = self.$el.css('user-select', 'none');
            self.isBadAndroid = /Android /.test(window.navigator.appVersion) && !/Chrome\/\d/.test(window.navigator.appVersion);
            self.translateZ = self.options.HWCompositing && browser.hasPerspective ? ' translateZ(0)' : '';
            self.options.useTransition = browser.hasTransition && self.options.useTransition;
            self.options.useTransform = browser.hasTransform && self.options.useTransform;
            self.options.eventPassthrough = self.options.eventPassthrough === true ? 'vertical' : self.options.eventPassthrough;
            self.options.preventDefault = !self.options.eventPassthrough && self.options.preventDefault;
            self.options.scrollY = self.options.eventPassthrough == 'vertical' ? false : self.options.scrollY;
            self.options.scrollX = self.options.eventPassthrough == 'horizontal' ? false : self.options.scrollX;
            self.options.freeScroll = self.options.freeScroll && !self.options.eventPassthrough;
            self.options.directionLockThreshold = self.options.eventPassthrough ? 0 : self.options.directionLockThreshold;
            self.options.bounceEasing = typeof self.options.bounceEasing == 'string' ? easingType[self.options.bounceEasing] || easingType.circular : self.options.bounceEasing;
            self.options.resizePolling = self.options.resizePolling === undefined ? 60 : self.options.resizePolling;
            self.options.invertWheelDirection = self.options.invertWheelDirection ? -1 : 1;

            self.x = 0;
            self.y = 0;
            self.directionX = 0;
            self.directionY = 0;

            this.scrollerStyle = this.$scroller[0].style;

            self._initEvents();
            self.refresh();
            self._activateButtons();
            self.scrollTo(self.options.startX, self.options.startY);
            self.enable();
        },

        _calcScrollerWidth: function _calcScrollerWidth() {
            var self = this,
                opts = self.options,
                width = 0,
                paddingWidth = self.$scroller.outerWidth() - self.$scroller.width();

            if (!self.$items) {
                self.$items = self.$scroller.children(); // 캐싱
            }
            self.$items.each(function () {
                width += $(this).outerWidth(true);
            });
            self.$scroller.css('width', width + paddingWidth + 3);
        },

        _activateButtons: function _activateButtons() {
            var self = this;

            if (self.$prevButton) {
                self.$prevButton.prop('disabled', self.x === 0);
            }

            if (self.$nextButton) {
                self.$nextButton.prop('disabled', self.x === self.maxScrollX);
            }
        },

        enable: function enable() {
            this.enabled = true;
        },

        _initEvents: function _initEvents() {
            var self = this;
            var opt = self.options;

            if (opt.prevButton && opt.nextButton) {
                (self.$prevButton = $(opt.prevButton)).on('click' + self.eventNS, function (e) {
                    self.prevPage();
                });

                (self.$nextButton = $(opt.nextButton)).on('click' + self.eventNS, function (e) {
                    self.nextPage();
                });

                self.on('smoothscrollend', function (e, data) {
                    self._activateButtons();
                });
            }

            self._handle(self.$wrapper, 'mousedown');
            self._handle(self.$wrapper, 'touchstart');
            self._handle(self.$wrapper, 'selectstart');
            self._handle(self.$wrapper, 'click');

            if (self.options.useTransition) {
                self._handle(self.$scroller, 'transitionend');
                self._handle(self.$scroller, 'webkitTransitionEnd');
                self._handle(self.$scroller, 'oTransitionEnd');
                self._handle(self.$scroller, 'MSTransitionEnd');
            }

            self._initWheel();

            if (self.options.resizeRefresh) {
                $(window).on('resize', core.delayRun(function () {
                    self.refresh();
                }, self.options.resizePolling));
            }
        },
        _initWheel: function _initWheel() {
            var self = this;

            self._handle(self.$wrapper, 'wheel');
            self._handle(self.$wrapper, 'mousewheel');
            self._handle(self.$wrapper, 'DOMMouseScroll');
        },

        _wheel: function _wheel(e) {
            var self = this;
            if (!self.enabled) {
                return;
            }

            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            e.stopPropagation ? e.stopPropagation() : e.cancalBubble = true;

            var wheelDeltaX, wheelDeltaY, newX, newY;

            if (self.wheelTimeout === undefined) {
                self.triggerHandler('smoothscrollstart', { x: self.x, y: self.y });
            }

            // Execute the scrollEnd event after 400ms the wheel stopped scrolling
            clearTimeout(self.wheelTimeout);
            self.wheelTimeout = setTimeout(function () {
                self.triggerHandler('smoothscrollend', {
                    x: self.x,
                    y: self.y,
                    isStart: self.x === 0,
                    isEnd: self.x === self.maxScrollX
                });
                self.wheelTimeout = undefined;
            }, 400);

            e = e.originalEvent || e;
            if ('deltaX' in e) {
                if (e.deltaMode === 1) {
                    wheelDeltaX = -e.deltaX * self.options.mouseWheelSpeed;
                    wheelDeltaY = -e.deltaY * self.options.mouseWheelSpeed;
                } else {
                    wheelDeltaX = -e.deltaX;
                    wheelDeltaY = -e.deltaY;
                }
            } else if ('wheelDeltaX' in e) {
                wheelDeltaX = e.wheelDeltaX / 120 * self.options.mouseWheelSpeed;
                wheelDeltaY = e.wheelDeltaY / 120 * self.options.mouseWheelSpeed;
            } else if ('wheelDelta' in e) {
                wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * self.options.mouseWheelSpeed;
            } else if ('detail' in e) {
                wheelDeltaX = wheelDeltaY = -e.detail / 3 * self.options.mouseWheelSpeed;
            } else {
                return;
            }

            wheelDeltaX *= self.options.invertWheelDirection;
            wheelDeltaY *= self.options.invertWheelDirection;

            if (!self.hasVerticalScroll) {
                wheelDeltaX = wheelDeltaY;
                wheelDeltaY = 0;
            }

            newX = self.x + Math.round(self.hasHorizontalScroll ? wheelDeltaX : 0);
            newY = self.y + Math.round(self.hasVerticalScroll ? wheelDeltaY : 0);

            if (newX > 0) {
                newX = 0;
            } else if (newX < self.maxScrollX) {
                newX = self.maxScrollX;
            }

            if (newY > 0) {
                newY = 0;
            } else if (newY < self.maxScrollY) {
                newY = self.maxScrollY;
            }

            self.scrollTo(newX, newY, 0);
        },

        _handle: function _handle($el, eventName, isBind) {
            var self = this;
            if (isBind !== false) {
                $el.on(eventName + '.' + self.cid, self.handleEvent.bind(self));
            } else {
                $el.off(eventName + '.' + self.cid);
            }
        },

        handleEvent: function handleEvent(e) {
            var self = this;

            switch (e.type) {
                case 'mousedown':
                case 'touchstart':
                    self._start(e);
                    break;
                case 'selectstart':
                    e.preventDefault ? e.preventDefault : e.returnValue = false;
                    break;
                case 'mousemove':
                case 'touchmove':
                    self._move(e);
                    break;
                case 'mouseup':
                case 'mousecancel':
                case 'touchend':
                case 'touchcancel':
                    self._end(e);
                    break;
                case 'transitionend':
                case 'webkitTransitionEnd':
                case 'oTransitionEnd':
                case 'MSTransitionEnd':
                    self._transitionEnd(e);
                    break;
                case 'wheel':
                case 'mousewheel':
                case 'DOMMouseScroll':
                    self._wheel(e);
                    break;
                //case 'click':
                //    me._click(e);
                //    break;
            }
        },

        prevPage: function prevPage() {
            var self = this;

            self.scrollTo(Math.min(0, self.x + self.wrapperWidth), 0, 100);
        },

        nextPage: function nextPage() {
            var self = this;

            self.scrollTo(Math.max(self.maxScrollX, self.x - self.wrapperWidth), 0, 100);
        },

        getPosition: function getPosition() {
            var matrix = this.scrollerStyle,
                x,
                y;

            if (this.options.useTransform) {
                matrix = matrix[style.transform].match(/-?[0-9]+/g);
                x = +matrix[0];
                y = +matrix[1];
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }

            return { x: x, y: y };
        },

        _animate: function _animate(destX, destY, duration, easingFn) {
            var self = this,
                startX = this.x,
                startY = this.y,
                startTime = getTime(),
                destTime = startTime + duration;

            function step() {
                var now = getTime(),
                    newX,
                    newY,
                    easing;

                if (now >= destTime) {
                    self.isAnimating = false;
                    self._translate(destX, destY);

                    if (!self.resetPosition(self.options.bounceTime)) {
                        self.triggerHandler('smoothscrollend', {
                            x: self.x,
                            y: self.y,
                            isStart: self.x === 0,
                            isEnd: self.x === self.maxScrollX
                        });
                    }

                    return;
                }

                now = (now - startTime) / duration;
                easing = easingFn(now);
                newX = (destX - startX) * easing + startX;
                newY = (destY - startY) * easing + startY;
                self._translate(newX, newY);

                if (self.isAnimating) {
                    rAF(step);
                }
            }

            this.isAnimating = true;
            step();
        },

        _transitionTime: function _transitionTime(time) {
            time = time || 0;

            this.scrollerStyle[style.transitionDuration] = time + 'ms';

            /*if ( !time && utils.isBadAndroid ) {
             this.scrollerStyle[style.transitionDuration] = '0.001s';
             }*/
        },

        _transitionTimingFunction: function _transitionTimingFunction(easing) {
            this.scrollerStyle[style.transitionTimingFunction] = easing;
        },

        _translate: function _translate(x, y) {
            var self = this;

            if (self.options.useTransform) {
                self.scrollerStyle[style.transform] = 'translate(' + x + 'px,' + y + 'px)' + self.translateZ;
            } else {
                x = Math.round(x);
                y = Math.round(y);
                self.scrollerStyle.left = x + 'px';
                self.scrollerStyle.top = y + 'px';
            }

            self.x = x;
            self.y = y;
            self.triggerHandler('smoothscrollmove', { x: self.x, y: self.y });
        },

        resetPosition: function resetPosition(time) {
            var self = this,
                x = self.x,
                y = self.y;

            time = time || 0;

            if (!self.hasHorizontalScroll || self.x > 0) {
                x = 0;
            } else if (self.x < self.maxScrollX) {
                x = self.maxScrollX;
            }

            if (!self.hasVerticalScroll || self.y > 0) {
                y = 0;
            } else if (self.y < self.maxScrollY) {
                y = self.maxScrollY;
            }

            if (x == self.x && y == self.y) {
                return false;
            }

            self.scrollTo(x, y, time, self.options.bounceEasing);
            return true;
        },

        scrollTo: function scrollTo(x, y, time, easing) {
            var self = this;
            easing = easing || easingType.circular;

            self.isInTransition = self.options.useTransition && time > 0;

            if (!time || self.options.useTransition && easing.style) {
                self._transitionTimingFunction(easing.style);
                self._transitionTime(time);
                self._translate(x, y);
                self.triggerHandler('smoothscrollend', { x: self.x, y: self.y, isStart: self.x === 0, isEnd: self.x === self.maxScrollX });
            } else {
                self._animate(x, y, time, easing.fn);
            }
        },

        scrollToElement: function scrollToElement(el, time, offsetX, offsetY, easing) {
            var self = this;
            el = el.nodeType ? el : self.$scroller.querySelector(el);

            if (!el) {
                return;
            }

            var $el = $(el);
            var pos = $el.position();
            var maxX = Math.abs(self.maxScrollX);
            var maxY = Math.abs(self.maxScrollY);
            var width = $el.outerWidth();
            var itemLeft = pos.left;

            if (itemLeft >= Math.abs(self.x) && itemLeft + width < Math.abs(self.x) + self.wrapperWidth) {
                return;
            }

            pos.left -= parseInt($el.parent().css('paddingLeft'), 10);
            pos.top -= parseInt($el.parent().css('paddingTop'), 10);

            if (offsetX === true) {
                offsetX = Math.round(el.offsetWidth / 2 - self.$wrapper.offsetWidth / 2);
            }
            if (offsetY === true) {
                offsetY = Math.round(el.offsetHeight / 2 - self.$wrapper.offsetHeight / 2);
            }

            pos.left -= offsetX || 0;
            pos.top -= offsetY || 0;
            pos.left = Math.min(maxX, pos.left < 0 ? 0 : pos.left);
            pos.top = Math.min(maxY, pos.top < 0 ? 0 : pos.top);

            time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(self.x - pos.left), Math.abs(self.y - pos.top)) : time;

            self.scrollTo(-pos.left, -pos.top, time, easing);
        },

        preventDefaultException: function preventDefaultException(el) {
            var self = this;

            if (el && el.tagName && self.options.preventDefaultException.tagName.test(el.tagName)) {
                return true;
            } else {
                return false;
            }
        },

        /***
         _isDownable: function(el){
            if(el && el.tagName && this.options.preventDefaultException.tagName.test(el.tagName)){
                return true;
            } else {
                return false;
            }
        },
         _click: function(e) {
            var me = this,
                point = e.touches ? e.touches[0] : e;
              if(!(me.downX === point.pageX && me.downY === point.pageY)) {
                console.log('prevent click', me.downX, me.downY, e.pageX, e.pageY);
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
            }
        },
         ***/
        _start: function _start(ev) {
            var self = this;
            var opt = self.options;
            var e = ev.originalEvent || ev;

            if (eventType[e.type] != 1) {
                if (e.button !== 0) {
                    return;
                }
            }

            if (!self.enabled || self.initiated && eventType[e.type] !== self.initiated) {
                return;
            }

            if (opt.preventDefault && !self.isBadAndroid && !self.preventDefaultException(e.target)) {
                e.preventDefault();
            }

            var $doc = $(document),
                point = e.touches ? e.touches[0] : e,
                pos;

            /***if(!me._isDownable($(e.target).closest(':focusable').get(0))) {
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
            }***/
            self._handle($doc, 'mousemove');
            self._handle($doc, 'touchmove');
            self._handle($doc, 'touchend');
            self._handle($doc, 'mouseup');
            self._handle($doc, 'mousecancel');
            self._handle($doc, 'tocuchcancel');

            self.initiated = eventType[e.type];
            self.moved = false;
            self.distX = 0;
            self.distY = 0;
            self.directionX = 0;
            self.directionY = 0;
            self.directionLocked = 0;

            self._transitionTime();

            self.startTime = getTime();
            if (opt.useTransition && self.isInTransition) {
                self.isInTransition = false;
                pos = self.getPosition();
                self._translate(Math.round(pos.x), Math.round(pos.y));
                self.triggerHandler('smoothscrollend', {
                    x: self.x,
                    y: self.y,
                    isStart: self.x === 0,
                    isEnd: self.x === self.maxScrollX
                });
            } else if (!opt.useTransition && self.isAnimating) {
                self.isAnimating = false;
                self.triggerHandler('smoothscrollend', {
                    x: self.x,
                    y: self.y,
                    isStart: self.x === 0,
                    isEnd: self.x === self.maxScrollX
                });
            }

            self.startX = self.x;
            self.startY = self.y;
            self.absStartX = self.x;
            self.absStartY = self.y;
            self.pointX = self.downX = point.pageX;
            self.pointY = self.downY = point.pageY;
        },

        _move: function _move(ev) {
            var self = this;
            var opt = self.options;
            var e = ev.originalEvent || ev;

            if (!self.enabled || eventType[e.type] !== self.initiated) {
                return;
            }

            if (opt.preventDefault) {
                // increases performance on Android? TODO: check!
                e.preventDefault ? e.preventDefault() : e.defaultValue = false;
            }

            var point = e.touches ? e.touches[0] : e,
                deltaX = point.pageX - self.pointX,
                deltaY = point.pageY - self.pointY,
                timestamp = getTime(),
                newX,
                newY,
                absDistX,
                absDistY;

            self.pointX = point.pageX;
            self.pointY = point.pageY;

            self.distX += deltaX;
            self.distY += deltaY;
            absDistX = Math.abs(self.distX);
            absDistY = Math.abs(self.distY);

            // We need to move at least 10 pixels for the scrolling to initiate
            if (timestamp - self.endTime > 300 && absDistX < 10 && absDistY < 10) {
                return;
            }

            // If you are scrolling in one direction lock the other
            if (!self.directionLocked && !opt.freeScroll) {
                if (absDistX > absDistY + opt.directionLockThreshold) {
                    self.directionLocked = 'h'; // lock horizontally
                } else if (absDistY >= absDistX + opt.directionLockThreshold) {
                    self.directionLocked = 'v'; // lock vertically
                } else {
                    self.directionLocked = 'n'; // no lock
                }
            }

            if (self.directionLocked == 'h') {
                if (opt.eventPassthrough == 'vertical') {
                    e.preventDefault ? e.preventDefault() : e.defaultValue = false;
                } else if (opt.eventPassthrough == 'horizontal') {
                    self.initiated = false;
                    return;
                }

                deltaY = 0;
            } else if (self.directionLocked == 'v') {
                if (opt.eventPassthrough == 'horizontal') {
                    e.preventDefault ? e.preventDefault() : e.defaultValue = false;
                } else if (opt.eventPassthrough == 'vertical') {
                    self.initiated = false;
                    return;
                }

                deltaX = 0;
            }

            deltaX = self.hasHorizontalScroll ? deltaX : 0;
            deltaY = self.hasVerticalScroll ? deltaY : 0;

            newX = self.x + deltaX;
            newY = self.y + deltaY;

            // Slow down if outside of the boundaries
            if (newX > 0 || newX < self.maxScrollX) {
                newX = opt.bounce ? self.x + deltaX / 3 : newX > 0 ? 0 : self.maxScrollX;
            }
            if (newY > 0 || newY < self.maxScrollY) {
                newY = opt.bounce ? self.y + deltaY / 3 : newY > 0 ? 0 : self.maxScrollY;
            }

            self.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            self.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

            if (!self.moved) {
                self.triggerHandler('smoothscrollstart', { x: self.x, y: self.y });
            }
            self.moved = true;
            self._translate(newX, newY);

            if (timestamp - self.startTime > 300) {
                self.startTime = timestamp;
                self.startX = self.x;
                self.startY = self.y;
            }
        },

        _end: function _end(e) {
            var self = this;

            if (!self.enabled || eventType[e.type] !== self.initiated) {
                return;
            }

            var $doc = $(document),
                opt = self.options,


            //point = e.changedTouches ? e.changedTouches[0] : e,
            momentumX,
                momentumY,
                duration = getTime() - self.startTime,
                newX = Math.round(self.x),
                newY = Math.round(self.y),


            //distanceX = Math.abs(newX - me.startX),
            //distanceY = Math.abs(newY - me.startY),
            time = 0,
                easing = '';

            $doc.off('.' + self.cid);

            self.isInTransition = 0;
            self.initiated = 0;
            self.endTime = getTime();

            // reset if we are outside of the boundaries
            if (self.resetPosition(self.options.bounceTime)) {
                return;
            }

            self.scrollTo(newX, newY); // ensures that the last position is rounded

            if (!self.moved) {
                return;
            }

            // start momentum animation if needed
            if (opt.momentum && duration < 300) {
                momentumX = self.hasHorizontalScroll ? momentum(self.x, self.startX, duration, self.maxScrollX, opt.bounce ? self.wrapperWidth : 0, opt.deceleration) : {
                    destination: newX,
                    duration: 0
                };
                momentumY = self.hasVerticalScroll ? momentum(self.y, self.startY, duration, self.maxScrollY, opt.bounce ? self.wrapperHeight : 0, opt.deceleration) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                self.isInTransition = 1;
            }

            if (newX != self.x || newY != self.y) {
                // change easing function when scroller goes out of the boundaries
                if (newX > 0 || newX < self.maxScrollX || newY > 0 || newY < self.maxScrollY) {
                    easing = easingType.quadratic;
                }

                self.scrollTo(newX, newY, time, easing);
                return;
            }

            self.triggerHandler('smoothscrollend', {
                x: self.x,
                y: self.y,
                isStart: self.x === 0,
                isEnd: self.x === self.maxScrollX
            });
        },

        refresh: function refresh() {
            //var rf = this.$wrapper[0].offsetHeight;           // Force reflow
            var self = this;

            self.update();
            self.triggerHandler('smoothscrollrefresh', self);
        },

        update: function update() {
            var self = this;
            var opt = self.options;

            self._calcScrollerWidth();

            self.wrapperWidth = opt.getWrapperWidth ? opt.getWrapperWidth.call(self) : self.$wrapper.innerWidth();
            self.wrapperHeight = opt.getWrapperHeight ? opt.getWrapperHeight.call(self) : self.$wrapper.innerHeight();

            var style = window.getComputedStyle ? getComputedStyle(self.$wrapper[0], null) : self.$wrapper[0].currentStyle;
            self.wrapperWidth -= (parseInt(style.paddingLeft) || 0) + (parseInt(style.paddingRight) || 0);
            self.wrapperHeight -= (parseInt(style.paddingTop) || 0) + (parseInt(style.paddingBottom) || 0);
            self.wrapperOffset = self.$wrapper.offset();

            self.scrollerWidth = opt.getScrollerWidth ? opt.getScrollerWidth.call(self) : self.$scroller.innerWidth();
            self.scrollerHeight = opt.getScrollerHeight ? opt.getScrollerHeight.call(self) : self.$scroller.innerHeight();

            self.maxScrollX = self.wrapperWidth - self.scrollerWidth;
            self.maxScrollY = self.wrapperHeight - self.scrollerHeight;

            self.hasHorizontalScroll = opt.scrollX && self.maxScrollX < 0;
            self.hasVerticalScroll = opt.scrollY && self.maxScrollY < 0;

            if (!self.hasHorizontalScroll) {
                self.maxScrollX = 0;
                self.scrollerWidth = self.wrapperWidth;
            }

            if (!self.hasVerticalScroll) {
                self.maxScrollY = 0;
                self.scrollerHeight = self.wrapperHeight;
            }

            self.endTime = 0;
            self.directionX = 0;
            self.directionY = 0;

            self.resetPosition();
        },

        _transitionEnd: function _transitionEnd(e) {
            if (e.target != this.$scroller[0] || !this.isInTransition) {
                return;
            }

            this._transitionTime();
            if (!this.resetPosition(this.options.bounceTime)) {
                this.isInTransition = false;
                this.triggerHandler('smoothscrollend', {
                    x: this.x,
                    y: this.y,
                    isStart: this.x === 0,
                    isEnd: this.x === this.maxScrollX
                });
            }
        },

        getMaxScrollX: function getMaxScrollX() {
            return this.maxScrollX;
        },
        getMaxScrollY: function getMaxScrollY() {
            return this.maxScrollY;
        },
        destroy: function destroy() {
            var self = this;

            if (self.$prevButton) {
                self.$prevButton.off(self.eventNS);
            }
            if (self.$nextButton) {
                self.$nextButton.off(self.eventNS);
            }
            this.supr();
        }
    });

    return SmoothScroll;
});
/*!
 * @module vcui.ui.Tab
 * @license MIT License
 * @description 탭 컴포넌트
 * @copyright VinylC UID Group
 */
define('ui/tab', ['jquery', 'vcui', 'ui/smoothScroll'], function ($, core) {
    "use strict";

    var name = 'tab',
        eventBeforeChange = name + 'beforechange',
        eventChanged = name + 'change',
        selectedClass = 'on';

    var prefixClass = '.ui_tab_';
    /**
     * @class
     * @name vcui.ui.Tab
     * @description 페이징모듈
     * @extends vcui.ui.View
     */
    var Tab = core.ui('Tab', /** @lends vcui.ui.Tab# */{
        bindjQuery: 'tab',
        $statics: /** @lends vcui.ui.Tab */{
            ON_CHANGE: eventBeforeChange,
            ON_CHANGED: eventChanged
        },
        defaults: {
            selectedIndex: 0,
            selectedClass: selectedClass,
            allowHScroll: false,
            selectedText: '선택됨',
            tabsSelector: '>ul>li'
        },

        selectors: {},
        /**
         * 생성자
         * @param {string|Element|jQuery} el 해당 엘리먼트(노드, id, jQuery 어떤 형식이든 상관없다)
         * @param {object} [options] 옵션값
         * @param {number} [options.selectedIndex = 0]  초기선택값
         * @param {string} [options.selectedClass = 'on'] 활성 css클래스명
         * @param {string} [options.tabType = 'inner'] 탭형식(inner | outer)
         */
        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self.$srText = $('<em class="blind">' + self.options.selectedText + '</em>');

            if (self.options.allowHScroll) {
                var $child = self.$el.children().first();
                self.options.tabsSelector = '>' + $child[0].tagName.toLowerCase() + self.options.tabsSelector;
                if ($child.css('overflow') === 'hidden') {
                    $child.vcSmoothScroll();
                }
            }

            self.update();
            self._bindEvents();

            var index = self.$tabs.filter('.' + selectedClass).index();
            if (index >= 0) {
                self.options.selectedIndex = index;
            }
            self.select(self.options.selectedIndex);
        },

        update: function update() {
            var self = this;

            self._findControls();
            self._buildARIA();
        },

        _findControls: function _findControls() {
            var self = this;
            var selectors = [];

            self.$tabs = self.$(self.options.tabsSelector);
            self.$contents = $();

            // 탭버튼의 href에 있는 #아이디 를 가져와서 컨텐츠를 조회
            self.$tabs.each(function () {
                var $tab = $(this),
                    $panel,
                    href = $tab.find('a').attr('href');

                if (href && /^(#|\.)\w+/.test(href)) {
                    if (($panel = $tab.find('>div')).length) {
                        self.$contents = self.$contents.add($panel);
                    } else {
                        self.$contents = self.$contents.add($(href));
                    }
                }
            });

            if (!self.$contents.length) {
                self.$contents = self.$('>' + prefixClass + 'panel');
            }
        },

        /**
         * @private
         */
        _bindEvents: function _bindEvents() {
            var self = this;

            self.on('click keydown', self.options.tabsSelector + '>a, ' + self.options.tabsSelector + '>button', function (e) {

                switch (e.type) {
                    case 'click':
                        e.preventDefault();

                        self.select($(e.currentTarget).parent().index());
                        break;
                    case 'keydown':
                        var index = $(e.currentTarget).parent().index(),
                            newIndex;

                        switch (e.which) {
                            case core.keyCode.RIGHT:
                                e.preventDefault();
                                newIndex = Math.min(self.$tabs.length - 1, index + 1);
                                break;
                            case core.keyCode.LEFT:
                                e.preventDefault();
                                newIndex = Math.max(0, index - 1);
                                break;
                            default:
                                return;
                        }
                        self.select(newIndex);
                        self.$tabs.eq(self.selectedIndex).find('>a, >button').focus();
                        break;
                }
            });
        },

        /**
         * aria 속성 빌드
         * @private
         */
        _buildARIA: function _buildARIA() {
            var self = this,
                tablistid = self.cid,
                tabid;

            self.$el.attr('role', 'tablist');
            self.$tabs.each(function (i) {
                tabid = tablistid + '_' + i;

                $(this).attr({
                    'id': tabid,
                    'role': 'tab',
                    'aria-selected': 'false',
                    'aria-controls': tabid
                });

                if (!self.$contents.eq(i).attr('id')) {
                    self.$contents.eq(i).attr('id', tabid);
                }

                self.$contents.eq(i).attr({
                    'aria-labelledby': tabid,
                    'role': 'tabpanel',
                    'aria-hidden': 'true'
                });
            });
        },

        /**
         * index에 해당하는 탭을 활성화
         * @param {number} index 탭버튼 인덱스
         * @fires vcui.ui.Tab#tabbeforechange
         * @fires vcui.ui.Tab#tabchange
         * @example
         * $('#tab').tab('select', 1);
         * // or
         * $('#tab').tab('instance').select(1);
         */
        select: function select(index) {
            var self = this,
                e;
            if (index < 0 || self.$tabs.length && index >= self.$tabs.length) {
                throw new Error('index 가 범위를 벗어났습니다.');
            }

            /**
             * 탭이 바뀌기 직전에 발생. e.preventDefault()를 호출함으로써 탭변환을 취소할 수 있다.
             * @event vcui.ui.Tab#tabbeforechange
             * @type {object}
             * @property {number} selectedIndex 선택된 탭버튼의 인덱스
             */
            self.triggerHandler(e = $.Event(eventBeforeChange), {
                selectedIndex: index,
                relatedTarget: self.$tabs.get(index),
                button: self.$tabs.eq(self.selectedIndex).find('>a'),
                content: self.$contents.eq(self.selectedIndex)

            });
            if (e.isDefaultPrevented()) {
                return;
            }

            self.selectedIndex = index;

            var $a, $hide;
            $a = self.$tabs.removeClass(selectedClass).attr('aria-selected', false).eq(index).addClass(selectedClass).attr('aria-selected', true).find('>a');

            if (($hide = $a.find('.blind')).length) {
                self.$tabs.not(self.$tabs.eq(index)).find('>a .blind').text("");
                $hide.text(self.options.selectedText);
            } else {
                $a.append(self.$srText);
            }

            // 컨텐츠가 li바깥에 위치한 탭인 경우
            self.$contents.hide().eq(index).show();

            /**
             * 탭이 바뀌기 직전에 발생. e.preventDefault()를 호출함으로써 탭변환을 취소할 수 있다.
             * @event vcui.ui.Tab#tabchange
             * @type {object}
             * @property {number} selectedIndex 선택된 탭버튼의 인덱스
             */
            self.triggerHandler(eventChanged, {
                selectedIndex: index,
                button: self.$tabs.eq(index).find('>a'),
                content: self.$contents.eq(index)
            });
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return Tab;
});