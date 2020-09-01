/*!
 * @module vcui.ui.RangeSlider
 * @license MIT License
 * @description 랜지슬라이더 컴포넌트
 * @copyright VinylC UID Group
 * 
 * 
 $(function () {
    vcui.require(['ui/rangeSlider'], function () {
        $('.ui_slider').vcRangeSlider({priceUnit:'$', roundUnit:10}).on('rangesliderchanged', function (e, data) {
            console.log(data);
        });
    });
});
                            
 */
vcui.define('ui/rangeSlider', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var detect = core.detect,
        isTouch = detect.isTouch;
        
    /**
     * @class
     * @description 랜지슬라이더
     * @name vcui.ui.RangeSlider
     * @extends vcui.ui.View
     */
    var RangeSlider = core.ui('RangeSlider', /** @lends vcui.ui.RangeSlider# */{
        bindjQuery: 'rangeSlider',
        defaults: {
            values: '[]',
            separator: ',',
            input: '0',
            range: '0,100',
            priceUnit : '',
            roundUnit : 1,
            minLabel:'price range minimum',
            maxLabel:'price range maximum'

        },
        selectors: {
            bg: '.ui-range-slider-bg',
            btnMin: '.ui-range-slider-min',
            btnMax: '.ui-range-slider-max',
            rangeBar: '.ui-range-slider-range',
            values: '.ui-range-slider-value'
        },

        templates: {
            contents: 
            '<div class="ui-range-slider-bg"></div>' + 
            '<div class="ui-range-slider-range"></div>' + 
            '{{#if list.length > 0}}<ul class="ui-range-slider-value">' + 
            '{{#each item in list}}<li data-value="{{item.value}}" data-title="{{item.title}}"></li>{{/each}}' + 
            '</ul>{{/if}}' + 
            '{{#if isMin}}<span class="ui-range-slider-min ui-range-slider-handler" role="slider" aria-label={{minLabel}} tabindex="0"></span>{{/if}}' + 
            '<span class="ui-range-slider-max ui-range-slider-handler" role="slider" aria-label={{maxLabel}} tabindex="0"></span>'
        },
        initialize: function initialize(el, options) {

            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }

            self._build();
            self._resize();
            self._syncInput();
            self._bindEvents();            
        },

        _build: function _build() {

            var self = this;
            self.isMouseDown = false;
            self.originValue = null;
            var opts = self.options;

            try {
                if (core.isString(opts.values)) {
                    self.valuesArr = core.util.parse(opts.values);
                } else {
                    self.valuesArr = opts.values || [];
                }
            } catch (e) {
                self.valuesArr = [];
            }


            var separator = opts.separator;
            var rangeArr = opts.range.toString().split(separator);

            if (self.valuesArr.length > 0) {
                self.minValue = self.valuesArr[0].value;
                self.maxValue = self.valuesArr[self.valuesArr.length - 1].value;
            } else {
                self.minValue = rangeArr[0] != undefined ? parseInt(rangeArr[0]) : 0;
                self.maxValue = rangeArr[1] != undefined ? parseInt(rangeArr[1]) : 100;
            }

            var inputArr = opts.input ? opts.input.toString().split(separator) : [];
            self.startValue = inputArr[0] != undefined ? inputArr[0] : self.minValue;
            self.endValue = inputArr[1] != undefined ? inputArr[1] : self.maxValue;            


            var isOne = inputArr.length < 2 ? true : false;
            if (isOne) self.endValue = self.startValue;

            if (!core.isNumber(parseFloat(self.startValue)) && !core.isNumber(parseFloat(self.endValue))) {
                self.$minInput = $(self.startValue);
                self.startValue = self.$minInput.val();
                self.$maxInput = $(self.endValue);
                self.endValue = self.$maxInput.val();
                if (self.startValue && self.endValue) {
                    isOne = false;
                } else {
                    if (self.startValue) {
                        self.endValue = self.startValue;
                        self.$maxInput = self.$minInput;
                    }
                    isOne = true;
                }
            }

            if (self.endValue - self.startValue < 0) self.endValue = self.maxValue;
            self.$el.addClass('ui-range-slider');

            var minLabel = self.options.minLabel;
            var maxLabel = self.options.maxLabel;

            self.$el.append(self.tmpl('contents', { list: self.valuesArr, isMin: !isOne, minLabel:minLabel, maxLabel:maxLabel }));
            self.updateSelectors();

            self.$el.css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');            

            if(self.$btnMin[0]){
                self.$btnMin.attr('aria-valuemin', self.minValue);
                self.$btnMin.attr('aria-valuemax', self.maxValue);
            }

            if(self.$btnMax[0]){
                self.$btnMax.attr('aria-valuemin', self.minValue);
                self.$btnMax.attr('aria-valuemax', self.maxValue);
                var labelledby = self.$el.attr('aria-labelledby');
                if(labelledby) {
                    self.$btnMax.attr('aria-labelledby', labelledby);
                    self.$el.removeAttr('aria-labelledby');
                }                
            }

            
        },

        setValue: function setValue(start, end, isTrigger) {
            var self = this;
            
            var minVal = start;
            var maxVal = end;
            var trigger = isTrigger;
            if (typeof end === 'boolean') {
                trigger = end;
            }

            if (maxVal == undefined) {
                minVal = self.minValue;
                maxVal = start;
            }
            self._setValue(minVal, maxVal);
            self._syncInput();
            if (trigger) self.triggerHandler('rangesliderchanged', [self.getValue()]);

        },
        _setValue: function _setValue(start, end) {

            var self = this;
            var idx, sIdx, eIdx;
            var sMin = self._getDistance(start);
            var sMax = self._getDistance(end);

            sIdx = self._getSnapIndex(start);
            eIdx = self._getSnapIndex(end);

            if (self.valuesArr.length > 0 && sIdx == eIdx) {

                if (self.valuesArr.length - 1 > sIdx && sIdx > 0) {
                    sMin = self._getDistance(self.valuesArr[sIdx - 1].value);
                    sMax = self._getDistance(self.valuesArr[sIdx].value);
                } else {
                    sMin = self._getDistance(self.valuesArr[0].value);
                    sMax = self._getDistance(self.valuesArr[0].value);
                }
            }

            if (self.$btnMin[0]) {
                self.$btnMin.css('left', sMin);                   
            } else {
                sMin = 0;
            }

            if (self.$btnMax[0]) {
                self.$btnMax.css('left', sMax);
            } else {
                sMax = self.rangeWidth;
            }

            self.$rangeBar.css({ left: sMin + self.btnSize / 2, width: sMax - sMin });            
            self._snapMove();
            
        },

        /**
         * 이벤트 바인딩
         * @private
         */
        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on('click','.ui-range-slider-bg, .ui-range-slider-range, .ui-range-slider-value', function (e) {

                e.preventDefault();
                if (isTouch) e.stopPropagation();
                self._move(self._getX(e));
                self._snapMove();
                self._syncInput();
                self.triggerHandler('rangesliderchanged', [self.getValue()]);
            });
            

            self.winOn('resizeend', function (e) {
                self.originValue = self.getValue();
                self._resize();
            });

            var prevValue = void 0,
                newValue = void 0;
            self.on('mousedown touchstart', '.ui-range-slider-handler', function (e) {

                e.preventDefault();
                if (isTouch) e.stopPropagation();

                var $activeBtn = $(e.currentTarget);
                self.isMouseDown = true;

                self.docOff().docOn('mouseup touchend mousemove touchmove', function (e) {
                    if (!self.isMouseDown) {
                        self.docOff();
                        return;
                    }

                    switch (e.type) {
                        case 'mouseup':
                        case 'touchend':
                            
                            self.isMouseDown = false;
                            self._snapMove($activeBtn);                            
                            self._syncInput();
                            self.triggerHandler('rangesliderchanged', [self.getValue()]);
                            self.docOff();

                            break;
                        case 'mousemove':
                        case 'touchmove':
                            prevValue = self.getValue();
                            self._move(self._getX(e), $activeBtn);
                            newValue = self.getValue();
                            if (newValue.minValue !== prevValue.minValue || newValue.maxValue !== prevValue.maxValue) {
                                self.triggerHandler('rangesliderchange', [newValue]);
                            }
                            e.preventDefault();
                            break;
                    }
                });

                return false;
            }).on('keydown', '.ui-range-slider-handler', function (e) {

                var $btn = $(e.currentTarget);
                var idx;
                var arrLen = self.valuesArr.length;

                if (arrLen > 0) {
                    idx = self._getSnapIndex(self._convertValue($btn.position().left + self.elLeft + self.btnSize / 2));
                } else {
                    idx = $btn.position().left + self.elLeft + self.btnSize / 2;
                }

                switch (e.keyCode) {
                    case 37:
                        // left
                        idx -= self.distance;
                        e.stopPropagation();
                        e.preventDefault();
                        break;
                    case 39:
                        // right
                        idx += self.distance;
                        //idx = Math.max()
                        e.stopPropagation();
                        e.preventDefault();
                        break;
                }
                
                if(arrLen > 0 && !self.valuesArr[idx]) return;
                self._move(arrLen > 0 ? self._getDistance(self.valuesArr[idx].value) : idx, $btn);                
                self._snapMove($btn);                
                self._syncInput();
                self.triggerHandler('rangesliderchanged', [self.getValue()]);
            });
        },


        /**
         * 변경된 값을 연결된 히든인풋에 동기화 해준다
         * @private
         */
        _syncInput: function _syncInput() {
            var self = this;
            var val = self.getValue();
            var minIdx = self._getSnapIndex(val.minValue);
            var maxIdx = self._getSnapIndex(val.maxValue);

            var minStr = minIdx > -1 ? self.$values.children().eq(minIdx).data('title') : val.minValue;
            var maxStr = maxIdx > -1 ? self.$values.children().eq(maxIdx).data('title') : val.maxValue;

            /*
            if (self.$btnMin[0] && self.$btnMax[0]) {
                self.$btnMin.find('span.hide').text(minStr + "에서");
                self.$btnMax.find('span.hide').text(maxStr + "까지");
            } else if (self.$btnMin[0]) {
                self.$btnMin.find('span.hide').text(minStr + "에서" + maxStr + "까지");
            } else {
                self.$btnMax.find('span.hide').text(maxStr);
            }
            */

            if (self.$minInput) {
                self.$minInput.val(minStr);
            }
            if (self.$maxInput) {
                self.$maxInput.val(maxStr);
            }

            var priceUnit = self.options.priceUnit;

            if(self.$btnMin[0]){
                self.$btnMin.attr('aria-valuetext', priceUnit==='원'? minStr+priceUnit : priceUnit+minStr);
                self.$btnMin.attr('aria-valuenow', minStr);
            }
            if(self.$btnMax[0]){
                self.$btnMax.attr('aria-valuetext', priceUnit==='원'? maxStr+priceUnit : priceUnit+maxStr);
                self.$btnMax.attr('aria-valuenow', maxStr);
            }


            // 설정된 버튼 위치의 li에 on 클래스 추가
            self.$values.children().removeClass('on').eq(minIdx).addClass('on').end().eq(maxIdx).addClass('on');
            //console.log(self.$values.children().eq(minIdx).data('title'), self.$values.children().eq(maxIdx).data('title'));

        },


        /**
         * x 좌표 반환
         * @param e
         * @returns {*}
         * @private
         */
        _getX: function _getX(e) {
            if (isTouch && e.originalEvent.touches) {
                e = e.originalEvent.touches[0];
            }
            return e.pageX;
        },


        // 가장 가까운 배열 인텍스를 구함.
        _getSnapIndex: function _getSnapIndex(value) {
            var self = this;
            var near = Infinity;
            var np = Infinity;
            var idx = -1;

            for (var i = 0; i < self.valuesArr.length; i++) {
                np = Math.abs(parseFloat(self.valuesArr[i].value) - parseFloat(value));
                if (near >= np) {
                    near = np;
                    idx = i;
                }
            }
            return idx;
        },


        // 실제 거리로 계산
        _getDistance: function _getDistance(value) {
            var self = this;
            return (value - self.minValue) / ((self.maxValue - self.minValue) / self.rangeWidth);
        },

        // value 값으로 변환
        _convertValue: function _convertValue(distance) {
            var self = this;
            return (self.maxValue - self.minValue) / self.rangeWidth * distance + self.minValue;
        },
        _getSnapDistance: function _getSnapDistance(value) {
            var self = this;
            var idx = self._getSnapIndex(value);
            var output = self.valuesArr[idx].value;
            return idx < 0 ? 0 : self._getDistance(output);
        },

        _snapMove: function _snapMove(target) {
            var self = this;
            var obj = self.getValue();        
            var minX = obj.minValue;
            var maxX = obj.maxValue;
            var sMin;
            var sMax;

            if(self.valuesArr.length > 0){
                sMin = self._getSnapDistance(minX);
                sMax = self._getSnapDistance(maxX);

                // 중복영역 막기 
                if (target) {
                    if (sMin == sMax && self.isRangeSlider) {
                        if (target[0] == self.$btnMax[0]) {
                            sMax = self._getDistance(self.valuesArr[self._getSnapIndex(maxX) + 1].value);
                        } else {
                            sMin = self._getDistance(self.valuesArr[self._getSnapIndex(minX) - 1].value);
                        }
                    }
                } else {
                    if (sMin == sMax && self.isRangeSlider) return;
                }

            }else{
                var roundUnit = parseInt(self.options.roundUnit);
                sMin = Math.round(minX/roundUnit)*roundUnit;
                sMax = Math.round(maxX/roundUnit)*roundUnit;  
                
                if(self.maxValue<sMax) sMax = self.maxValue;
                if(sMin - self.minValue < roundUnit) sMin = self.minValue;        
                sMin = self._getDistance(sMin);
                sMax = self._getDistance(sMax);                  
            }            

            if (self.$btnMin[0]) {
                self.$btnMin.css('left', sMin);
            }
            if (self.$btnMax[0]) {
                self.$btnMax.css('left', sMax);
            }
            self.$rangeBar.css({ left: sMin + self.btnSize / 2, width: sMax - sMin });
        },


        /**
         * 버튼을 실제 움직여 준다
         * @param distance, target
         * @private
         */
        _move: function _move(distance, target) {

            var self = this;
            var xpos = distance - self.elLeft - self.btnSize / 2;

            if (xpos > self.rangeWidth) xpos = self.rangeWidth;
            if (xpos < 0) xpos = 0;

            var minX = self.$btnMin[0] ? self.$btnMin.position().left : 0;
            var maxX = self.$btnMax[0] ? self.$btnMax.position().left : self.rangeWidth;

            if (target) {

                if (target[0] == self.$btnMax[0]) {
                    if (xpos <= minX) {
                        xpos = minX;
                    }
                    if (self.$btnMax[0]) {
                        self.$btnMax.css("left", xpos);
                    }
                } else if (target[0] == self.$btnMin[0]) {
                    if (xpos >= maxX) {
                        xpos = maxX;
                    }
                    if (self.$btnMin[0]) {
                        self.$btnMin.css("left", xpos);
                    }
                }
            } else {

                if (Math.abs(minX - xpos) < Math.abs(maxX - xpos)) {
                    if (self.$btnMin[0]) { 
                        self.$btnMin.css("left", xpos);
                    } else if (self.$btnMax[0]) {
                        self.$btnMax.css("left", xpos);
                    }                    
                } else {

                    if(minX === maxX){
                        if(xpos > maxX){
                            if (self.$btnMax[0]) self.$btnMax.css("left", xpos);
                        }else{
                            if (self.$btnMin[0]) self.$btnMin.css("left", xpos);
                        }                      

                    }else{
                        if (self.$btnMax[0]) {
                            self.$btnMax.css("left", xpos);
                        } else if (self.$btnMin[0]) {
                            self.$btnMin.css("left", xpos);
                        }
                    }
                }
            }

            var bm = self.$btnMin[0] ? self.$btnMin.position().left : 0;
            var bx = self.$btnMax[0] ? self.$btnMax.position().left : self.rangeWidth;
            self.$rangeBar.css({ left: bm + self.btnSize / 2, width: bx - bm });
        },
        _resize: function _resize() {

            var self = this;
            var wd,
                ht,
                bh,
                dt,
                st = self.$el.height() / 2;

            self.isRangeSlider = self.$btnMin[0] && self.$btnMax[0] ? true : false;
            if (self.$btnMax[0]) {
                self.btnSize = self.$btnMax.width();
            } else if (self.$btnMin[0]) {
                self.btnSize = self.$btnMin.width();
            } else {
                self.btnSize = 20;
            }

            self.rangeWidth = self.$el.width() - self.btnSize;
            self.elLeft = self.$el.offset().left;
            //self.distance = self.valuesArr.length > 0 ? 1 : Math.round(self.rangeWidth / 10);
            self.distance = 1;

            self.$values.css({ 'position': 'absolute', 'left': self.btnSize / 2 });

            bh = self.$bg.height() / 2;


            self.$bg.css({ 'width': self.rangeWidth, 'left': self.btnSize / 2, 'top': st - bh });
            self.$rangeBar.css({ 'top': st - bh });

            ht = self.$btnMin.height() / 2;
            self.$btnMin.css({ 'top': st - ht }); //self.$btnMin.css({ 'top': st - ht + bh }); 

            ht = self.$btnMax.height() / 2;
            self.$btnMax.css({ 'top': st - ht }); //self.$btnMax.css({ 'top': st - ht + bh });

            //console.log(st - ht + bh);

            self.$values.children().each(function (idx, item) {
                wd = $(item).width() / 2;
                ht = $(item).height() / 2;
                dt = self._getDistance(self.valuesArr[idx].value);
                $(item).css({ 'position': 'absolute', 'left': dt - wd });
            });

            if (self.originValue) self._setValue(self.originValue.minValue, self.originValue.maxValue);else self._setValue(self.startValue, self.endValue);
        },
        getValue: function getValue() {
            var self = this;
            var minX = self.$btnMin[0] ? self.$btnMin.position().left : 0;
            var maxX = self.$btnMax[0] ? self.$btnMax.position().left : self.rangeWidth;
            var minVal = Math.round((self.maxValue - self.minValue) / self.rangeWidth * minX + parseFloat(self.minValue));
            var maxVal = Math.round((self.maxValue - self.minValue) / self.rangeWidth * maxX + parseFloat(self.minValue));
            return { 'minValue': minVal, 'maxValue': maxVal };
        },
        update: function update(dontTrigger) {
            var self = this;
            self._build();
            self._resize();
            self._syncInput();
            if (!dontTrigger) {
                self.triggerHandler('rangesliderchanged', [self.getValue()]);
            }
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    return RangeSlider;
});