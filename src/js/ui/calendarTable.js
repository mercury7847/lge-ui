vcui.define('ui/calendarTable', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $doc = $(document),
        ui = core.ui,
        dateUtil = core.date,
        detect = core.detect;

   
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dateRegex = /[0-9]{4}.?[0-9]{2}.?[0-9]{2}/;

    
    var CalendarTable = ui('CalendarTable', {
        bindjQuery: 'calendarTable',

        defaults: {
            weekNames: ['일', '월', '화', '수', '목', '금', '토'],
            titleFormat: 'yyyy년 MM월 dd일',
            inputTarget: '', // 날짜를 선택했을 때, 날짜가 들어갈 인풋박스의 셀렉터
            date: new Date(), // 처음에 표시할 기본 날짜
            today: new Date(), // 오늘 날짜
            template: {
                header: '<div class="month-wrap">' + '<button type="button" class="arrow pre"><span class="blind">이전</span></button>' + '<span class="month"></span>' + '<button type="button" class="arrow next"><span class="blind">다음</span></button>' + '</div>',
                button: '<button type="button" class="day {{disabled?" disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}"><span>{{day}}</span></button>',
                timeButton: '<button type="button" class="{{disabled?" disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}"><span>{{time}}</span></button>'
            },
            caption: '캘린더입니다. 글은 일요일, 월요일, 화요일, 수요일, 목요일, 금요일, 토요일 순으로 나옵니다',
            colWidth: 'calc(100% / 7)', // 셀 너비
            format: 'yyyy.MM.dd',
            paramFormat: 'yyyyMMdd'
        },
        events: {},

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return self.release();
            }

            if (self.options.inputTarget) {
                self.$input = $(self.options.inputTarget);
            }

            var arr = self.options.dateArr instanceof Array ? self.options.dateArr : [];

            if (arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    arr.push(vcui.date.parse(arr[i]));
                }
                self.currDate = arr[0];
            } else {
                self.currDate = self.options.today;
            }

            self.dateArr = arr;

            self._render();
        },

        _render: function _render() {
            var self = this,
                opts = self.options,
                tmpl;

            tmpl = opts.template.header/* + '<div class="box-table"></div>'*/;

            self._remove();
            self.$calendar = $(tmpl);
            self.$el.empty().append(self.$calendar);

            self.$el.off('.calendar').on('click.calendar', '.arrow', function (e) {
                var $el = $(e.currentTarget),
                    isPrev = $el.hasClass('pre')

                if ($el.hasClass('disabled')) {
                    return;
                }

                self[isPrev ? 'prev' : 'next']();
                self.$calendar.find('.' + (isPrev ? 'pre' : 'next')).focus();
            }).on('click.calendar', '.day:not(.disabled)', function (e) {
                // 날짜 클릭
                e.preventDefault();
                if ($(e.currentTarget).hasClass('disabled')) {
                    return;
                }

                var $this = $(this).closest('td'),
                    data = $this.data(),
                    date = new Date(data.year, data.month -1, data.day),
                    format = dateUtil.format(date, opts.paramFormat || '');

                self.$el.find('.choice').removeClass('choice');
                self.activeDate = date;
                $this.addClass('choice');
                if (opts.inputTarget) {
                    self.$input.val(format);
                }

                self.$el.trigger('dateselected', [format]);
            });

            self._renderHeader();
            self._renderDate();

            return self;
        },
        /**
         * 달력 그리기
         * @returns {Calendar}
         * @private
         */
        _renderDate: function _renderDate() {
            var self = this,
                opts = self.options,
                date = self._getDateList(self.currDate),
                html = '',
                tmpl = vcui.template(opts.template[opts.type] || opts.template.button),
                isToday = false,
                isSelectDay = false,
                isOtherMonth = false,
                isDisabled = false,
                i, j, y, m, d, week, len, nowd;

            html += '<table class="box-table tb-calendar"><caption>' + opts.caption + '</caption>';
            html += '<colgroup>';
            for (i = 0; i < 7; i++) {
                html += '<col width="' + opts.colWidth + '" />';
            }
            html += '</colgroup><thead>';
            for (i = 0; i < 7; i++) {
                html += '<th class="' + (i === 0 ? ' sun' : i === 6 ? ' ui-calendar-saturday' : '') + '" scope="col">';
                html += opts.weekNames[i];
                html += '</th>';
            }
            html += '</thead><tbody>';
            for (i = 0, len = date.length; i < len; i++) {
                week = date[i];
                html += '<tr>';
                for (j = 0; j < 7; j++) {
                    y = week[j].year, m = week[j].month, d = week[j].day;
                    nowd = new Date(y, m - 1, d);

                    if (self.activeDate) {
                        isSelectDay = self.activeDate.getFullYear() === y && self.activeDate.getMonth() + 1 === m && self.activeDate.getDate() === d;
                    }
                    isToday = opts.today.getFullYear() === y && opts.today.getMonth() + 1 === m && opts.today.getDate() === d;
                    isOtherMonth = self.currDate.getMonth() + 1 != m;
                    isDisabled = !self._compareDate(nowd);

                    html += '<td class="' + (isDisabled ? " disabled" : "");
                    
                    html += (j === 0 ? ' ui-calendar-sunday' : j === 6 ? ' ui-calendar-saturday' : '') + (isToday ? ' ui-calendar-today' : '') + (!isDisabled && isSelectDay ? ' choice' : '');
                    
                    html += '" data-year="' + y + '" data-month="' + m + '" data-day="' + d + '" data-date="' + vcui.date.format(nowd, "yyyyMMdd") + '">';

                    if (!isOtherMonth) {
                        html += tmpl({
                            title: dateUtil.format(nowd, opts.titleFormat) + (isToday ? ' 오늘' : '') + (isDisabled ? " 선택할 수 없음" : isSelectDay ? ' 선택일' : ''),
                            isToday: isToday,
                            isOtherMonth: isOtherMonth,
                            isSunday: j === 0,
                            isSaturday: j === 6,
                            day: d,
                            date: nowd,
                            disabled: isDisabled
                        });
                    } else {
                        html += '&nbsp;';
                    }

                    html += '</td>';
                } // for
                html += '</tr>';
            } // for
            html += '</tbody></table>';

            //self.$el.find('.box-table').html(html);
            self.$el.find('.box-table').remove();
            self.$el.append(html);

            return self;
        },
        /**
         * 헤더에 현재 날짜에 대한 정보 표시
         * @private
         */
        _renderHeader: function _renderHeader() {
            var self = this;

            var currDate = new Date(self.currDate.getTime()),
                minDate = vcui.date.parse(self.dateArr[0]),
                maxDate = vcui.date.parse(self.dateArr[self.dateArr.length - 1]),
                html,
                $second = self.$el.find('.month-wrap'),
                isFirst = currDate.getFullYear() === minDate.getFullYear() && currDate.getMonth() === minDate.getMonth(),
                isLast = currDate.getFullYear() === maxDate.getFullYear() && currDate.getMonth() === maxDate.getMonth();
            
            html = currDate.getFullYear() + '<span class="blind">년</span>.' + (currDate.getMonth() + 1)+ '<span class="blind">월</span>';
            $second.find('.month').html(html);
            
            $second.find('.pre').toggleClass('disabled', isFirst).prop('disabled', isFirst).attr('tabindex', isFirst ? '-1' : '0');
            $second.find('.next').toggleClass('disabled', isLast).prop('disabled', isLast).attr('tabindex', isLast ? '-1' : '0');
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
        /**
         * 주어진 날짜가 유효한 범위에 있는가 체크
         * @param date
         * @returns {*}
         * @private
         */
        _compareDate: function _compareDate(date) {
            var self = this,
                flag = false;
            if (!(date instanceof Date)) {
                date = dateUtil.parse(date);
            }
            if (!date || isNaN(date)) {
                return null;
            }
            date.setHours(0, 0, 0, 0);

            self.dateArr.forEach(function(item) {
                item = vcui.date.parse(item);

                if (date.getTime() === item.getTime()) {
                    flag = true;
                    return false;
                }
            });

            return flag;
        },
        /**
         * 날짜 데이타 계산
         * @param {Date} date 렌더링할 날짜 데이타 생성
         * @return {Array}
         */
        _getDateList: function _getDateList(date) {
            date.setDate(1);

            var self = this,
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                startOnWeek = date.getDay() + 1,
                last = daysInMonth[date.getMonth()],
                // 마지막날
            prevLast = daysInMonth[date.getMonth() === 0 ? 11 : date.getMonth() - 1],
                // 이전달의 마지막날
            startPrevMonth = prevLast - startOnWeek,
                // 이전달의 시작일
            y = year,
                m = month;

            if (month > 12) {
                month -= 12, year += 1;
            } else {
                if (month == 2 && self._isLeapYear(year)) {
                    last = 29;
                }
            }

            var data = [],
                week = [];

            if (startOnWeek > 0) {
                if (month == 3 && self._isLeapYear(year)) {
                    startPrevMonth += 1;
                }
                if ((m = month - 1) < 1) {
                    m = 12, y = year - 1;
                }
                for (var i = 1; i < startOnWeek; i++) {
                    week.push({ year: y, month: m, day: startPrevMonth + i + 1 }); // ***** +1
                }
                if (week.length > 6) {
                    data.push(week), week = [];
                }
            }

            for (var i = 1; i <= last; i++) {
                week.push({ year: year, month: month, day: i });
                if (week.length > 6) {
                    data.push(week), week = [];
                }
            }

            if (week.length > 0 && week.length < 7) {
                if ((m = month + 1) > 12) {
                    m -= 12, y = year + 1;
                }
                for (var i = week.length, d = 1; i < 7; i++, d++) {
                    week.push({ year: y, month: m, day: d });
                }
            }
            week.length && data.push(week);
            return data;
        },
        update: function update(dateArr) {
            var self = this,
                arr = [];

            self.activeDate = null;
            self.dateArr = dateArr;

            for (var i = 0; i < self.dateArr.length; i++) {
                arr.push(vcui.date.parse(self.dateArr[i]));
            }

            self.currDate = arr[0];

            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        },
        reset: function reset() {
            var self = this;

            self.activeDate = null;
            self.currDate = self.options.today;
            self.dateArr = [];

            self.$el.find('.choice').removeClass('choice');

            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        },
        /**
         * 이전달
         * @returns {Calendar}
         */
        prev: function prev() {
            var self = this,
                currDate = vcui.date.add(self.currDate, 'M', -1);
            if (self.options.header && self._compareMonth(currDate) !== 0) {
                return this;
            }
            self.currDate = currDate;
            self._renderHeader();
            self._renderDate();

            return this;
        },

        /**
         * 다음달
         * @returns {Calendar}
         */
        next: function next() {
            var self = this,
                currDate = vcui.date.add(self.currDate, 'M', 1);
            if (self.options.header && self._compareMonth(currDate) !== 0) {
                return this;
            }
            self.currDate = currDate;
            self._renderHeader();
            self._renderDate();

            return this;
        },
        /**
         * 윤년 여부
         * @param {Date} date 렌더링할 날짜 데이타 생성
         * @return {boolean} 윤년 여부
         */
        _isLeapYear: function _isLeapYear(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        }
    });

    return CalendarTable;
});