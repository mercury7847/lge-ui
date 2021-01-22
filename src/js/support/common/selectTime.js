vcui.define('support/common/SelectTime', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var dateUtil = vcui.date;
    var detect = vcui.detect;

    var dateRegex = /[0-9]{2}:?[0-9]{2}/;

    var SelectTime = core.ui('SelectTime', /** @lends vcui.ui.ReserveDate# */{
        bindjQuery: 'SelectTime',
        defaults: {
            timeName: ['09', '10', '11', '12', '13', '14', '15', '16', '17'],
            titleFormat: 'hh시 mm분',
            template: {
                button: '<button type="button" class="{{disabled?"disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}><span>{{time}}분</span></button>'
            },
            caption: '시간 캘린더입니다. 글은 9시, 10시, 11시, 12시, 13시, 14시, 15시, 16시, 17시 순으로 나옵니다',
            colWidth: 'calc(85% / 6)', // 셀 너비
            format: 'hh:mm'
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            }

            self.timeArr = self.options.timeArr instanceof Array ? self.options.timeArr : [];

            if (self.options.inputTarget) {
                self.$input = $(self.options.inputTarget);
            }

            self._render();
        },
        _render: function _render() {
            var self = this,
                tmpl;

            tmpl = '<div class="box-table"></div>';

            self._remove();
            self.$calendar = $(tmpl);
            
            self.$el.find('>*:not(.box-desc)').remove()
            self.$el.append(self.$calendar);
            
            self.$calendar.off('.vcSelectTime').on('click.vcSelectTime', 'button:not(.disabled)', function (e) {
                // 날짜 클릭
                e.preventDefault();
                
                var $this = $(this).closest('td'),
                    data = $this.data(),
                    time = data.hour + '' + data.min;

                self.$calendar.find('.choice').removeClass('choice');
                self.activeTime = time;
                $this.addClass('choice');
                $this.siblings('th').addClass('choice');

                if (self.options.inputTarget) self.$input.val(time);

                self.$el.trigger('timeselected');
            });
            
            self._renderTime();

            return self;
        },
        /**
         * 시간 그리기
         * @returns {Calendar}
         * @private
         */
        _renderTime: function _renderTime() {
            var self = this,
                opts = self.options,
                html = '',
                tmpl = vcui.template(opts.template.button),
                isDisabled = false,
                i, j, time, nowd, hour, min;

            //time = self._getTimeList();

            html += '<table class="tb-timetable"><caption>' + opts.caption + '</caption>';
            html += '<colgroup>';
            for (i = 0; i < 7; i++) {
                if (i == 0) {
                    html += '<col width="' + '15%' + '" />';
                } else {
                    html += '<col width="' + opts.colWidth + '" />';
                }
            }
            html += '</colgroup><tbody>';
            for (i = 0; i < opts.timeName.length; i++) {
                html += '<tr>';

                html += '<th scope="row">'+ opts.timeName[i] +'시</th>';
                for (j = 0; j < 6; j++) {
                    
                    hour = opts.timeName[i];
                    min = j + '0';

                    nowd = hour + min;

                    isDisabled = !self._compareDate(nowd);
                    
                    html += '<td class="' + (isDisabled ? "disabled" : "");
                    html += '" data-hour="' + hour + '" data-min="' + min + '">';
                    
                    html += tmpl({
                        title: dateUtil.format(nowd, opts.titleFormat) + (isDisabled ? " 선택할 수 없음" : ""),
                        time: min,
                        disabled: isDisabled
                    });

                    html += '</td>';
                } // for
                html += '</tr>';
            } // for
            html += '</tbody></table>';

            self.$el.find('.box-table').html(html);

            if (self.timeArr.length) {
                self.$el.find('.box-desc').hide();
                self.$el.find('.box-table').show();
            }

            return self;
        },
        /**
         * 주어진 날짜가 유효한 범위에 있는가 체크
         * @param date
         * @returns {*}
         * @private
         */
        _compareDate: function _compareDate(time) {
            var self = this,
                flag = false;
            
            if (!time || isNaN(time)) {
                return null;
            }

            self.timeArr.forEach(function(item) {
                if (time == item) {
                    flag = true;
                    return false;
                }
            });

            return flag;
        },
        _remove: function _remove() {
            var self = this;

            if (self.$calendar) {
                self.$calendar.off();
                self.$calendar.remove();
                self.$calendar = null;
            }

            return self;
        },
        update: function update(timeArr) {
            var self = this;
            
            self.timeArr = timeArr;
            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        },
        reset: function reset() {
            var self = this;

            self.timeArr = [];
            self.$el.find('.box-desc').show();
            self.$el.find('.box-table').hide();
            self.$el.find('.choice').removeClass('choice');

            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        }
    });

    return SelectTime;
});