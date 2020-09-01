/*!
 * @module vcui.ui.Accordion
 * @license MIT License
 * @description 아코디온 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('ui/accordion', ['jquery', 'vcui'], function ($, core) {
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