/*!
 * @module vcui.ui.Selectbox
 * @license MIT License
 * @description 모달 컴포넌트
 * @copyright VinylC UID Group
 * ver 1.1
 * placeholder 추가
 */
vcui.define('ui/selectbox', ['jquery', 'vcui', 'helper/gesture'], function ($, core, Gesture) {
    "use strict";

    var $doc = $(document),
        $win = $(window),
        isTouch = core.detect.isTouch;

    var BaseSelectbox = core.ui.View.extend({
        name: 'Selectbox',
        templates: {
            notextOption: '<span class="ui-select-text"></span><span class="blind"></span><span class="ico"></span>',
            labelOption: '<span class="ui-select-text">{{text}}</span><span class="blind">선택됨</span><span class="ico"></span>'
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

            if($(self.el.options[index]).hasClass('placeholder')){
                $label.addClass('placeholder');
            }else{
                $label.removeClass('placeholder');
            }

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
            disabledClass: 'disabled',
            widthClass: ' '
        },

        templates: {
            label: '<div class="ui-selectbox-view"><a href="#0" class="ui-select-button" title="">{{#raw html}}</a></div>',
            list: '<div class="ui-selectbox-list" id="{{cid}}_menu"><div class="ui-select-scrollarea"></div></div>',
            scrollbar: '<div class="ui-select-scroll" style="top: 0px;">' + 
            '<span class="bg_top"></span><span class="bg_mid" style=""></span>' + 
            '<span class="bg_btm"></span></div>',
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

                self.triggerHandler('selectboxtoggle');
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
                //var margintop = (listHeight + selectHeight + 3) * -1;
                var margintop = (listHeight + selectHeight) * -1;
                self.$list.css('marginTop', margintop);
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
            self.triggerHandler('selectboxopen', [self.$el]);
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
            self.triggerHandler('selectboxclose', [self.$el]);

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
        defaults: {
            widthClass:' '
        },
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
            
            self.$label = $(self.tmpl('label', {
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