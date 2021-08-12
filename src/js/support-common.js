;(function(global){
    if(!global['lgkorUI']) global['lgkorUI'] = {};

    function getLoginFlag(){
        return $('html').data('login') == 'Y' || $('.support-home').data('login') == 'Y' ? true : false;
    }
    
    var csUI = {
        isLogin: getLoginFlag(),
        cookie: {
            setCookie: function(cookieName, value, expire, deleteCookie) {
                var cookieText;
                var cookieExpire = new Date();

                if (deleteCookie) {
                    cookieExpire = new Date(1);
                } else {
                    cookieExpire.setDate(cookieExpire.getDate() + expire);
                }
                cookieText = cookieName + '=' + escape(value) + ((expire == null) ? '' : '; EXPIRES=' + cookieExpire.toUTCString()) + '; PATH=/';

                document.cookie = cookieText;
            },
            getCookie: function(cookieName) {
                var cookieValue = null;

                if (document.cookie) {
                    var cookieKey = escape(cookieName) + "="; 
                    var cookieArr = document.cookie.split(";");

                    for (var i = 0; i < cookieArr.length; i++) {
                        if(cookieArr[i][0] === " ") {
                            cookieArr[i] = unescape(cookieArr[i].substring(1));
                        }
                        if(cookieArr[i].indexOf(cookieKey) === 0) {
                            cookieValue = unescape(cookieArr[i].slice(cookieKey.length, cookieArr[i].length));
                        }
                    }
                }

                return cookieValue;
            },
            deleteCookie: function(cookieName, value) {
                var cookie = csUI.cookie;
                var cookies = cookie.getCookie(cookieName);

                if (cookies) {
                    var cookieArr = cookies.split(',');
                    
                    if (cookieArr.indexOf(value.toString()) != -1) {
                        var index = -1;
                        for (var i = 0; i < cookieArr.length; i++) {
                            if (value == cookieArr[i]) {
                                index = i;
                                break;
                            }
                        }
                        
                        if (index != -1) {
                            cookieArr.splice(index, 1);
                            cookies = cookieArr.join(',');
                            cookie.setCookie(cookieName, cookies, 365);
                        }
                    }
                }
            },
            deleteAllCookie: function(cookieName) {
                var cookieValue = this.getCookie(cookieName);
                if (cookieValue) {
                    this.setCookie(cookieName, cookieValue, '', true);
                }
            }
        },
        recentlySearch: {
            cookieName: 'LG_SupportSearch',
            maxNum: 10,
            expire: 30,
            addCookie: function(value) {
                var self = this;
                var cookie = csUI.cookie;
                var cookies = cookie.getCookie(self.cookieName);

                if (cookies) {
                    var cookieArr = cookies.split(',');

                    if (cookieArr.indexOf(value) != -1) {
                        cookie.deleteCookie(self.cookieName, value);
                        cookieArr.splice(cookieArr.indexOf(value), 1);
                        cookieArr.unshift(value);
                    } else {
                        cookieArr.unshift(value);
                        if (cookieArr.length > self.maxNum) cookieArr.length = self.maxNum;
                    }
                    cookies = cookieArr.join(',');
                    cookie.setCookie(self.cookieName, cookies, self.expire);
                } else {
                    cookie.setCookie(self.cookieName, value, self.expire);
                }
            }
        },
        recentlyKeyword: {
            cookieName: 'LG_SupportKeyword',
            maxNum: 5,
            expire: 30,
            addCookie: function(value) {
                var self = this;
                var cookie = csUI.cookie;
                var cookies = cookie.getCookie(self.cookieName);

                if (cookies) {
                    var cookieArr = cookies.split(',');

                    if (cookieArr.indexOf(value) != -1) {
                        cookie.deleteCookie(self.cookieName, value);
                        cookieArr.splice(cookieArr.indexOf(value), 1);
                        cookieArr.unshift(value);
                    } else {
                        cookieArr.unshift(value);
                        if (cookieArr.length > self.maxNum) cookieArr.length = self.maxNum;
                    }
                    cookies = cookieArr.join(',');
                    cookie.setCookie(self.cookieName, cookies, self.expire);
                } else {
                    cookie.setCookie(self.cookieName, value, self.expire);
                }
            }
        },
        initProductSlider: function() {
            // 관련 소모품이 필요하신가요?
            $('.product-slider').vcCarousel({
                infinite: false,
                autoplay: false,
                slidesToScroll: 4,
                slidesToShow: 4,
                cssEase: 'cubic-bezier(0.33, 1, 0.68, 1)',
                speed: 150,
                touchThreshold: 100,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToScroll: 3,
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: 768,
                        settings: {
                            arrows: false,
                            slidesToScroll: 1,
                            slidesToShow: 1,
                            variableWidth: true
                        }
                    },
                    {
                        breakpoint: 20000,
                        settings: {
                            slidesToScroll: 4,
                            slidesToShow: 4
                        }
                    }
                ]
            });
        },
        searchParamsToObject: function(key) {
            var params = location.search.substr(location.search.indexOf("?") + 1);
            var temp, valueObject = {};

            params = params.split("&");
            
            for (var i = 0; i < params.length; i++) {
                temp = params[i].split("=");
                valueObject[temp[0]] = temp[1];
            }

            if (key) {
                return valueObject[key] || null;
            } else {
                return valueObject;
            }
        },
        historyBack: function(item) {
            var url;
            if (item.constructor == Object) {
                url = $.param(item);
            } else {
                url = $(item).attr('href');
                url = url.substr(url.indexOf('?') + 1);
            }
            history.replaceState(null, '', '?'+url);
        },
        scrollTo: function($target, margin) {
            if ($target.length) {
                $('html,body').stop().animate({scrollTop:$target.offset().top - (margin ? margin : 0)}, function() {
                    $target.focus();
                    if (!$target.is(':focus')) {
                        $target.attr('tabindex', -1).focus().removeAttr('tabindex');
                    }
                    return false;
                });
            }
        },
        setAcecounter: function(pcUrl, moUrl) {
            try {
                if (vcui.detect.isMobileDevice) {
                    AM_PL(moUrl);
                } else {
                    _PL(pcUrl);
                }
            } catch(e) {}
        }
    }

    lgkorUI = $.extend({}, lgkorUI, csUI);
})(window);

var CS = CS || {};
CS.MD = CS.MD || {};

CS.MD.plugin = function(pluginName, Plugin) {
    $.fn[pluginName] = function(options) {
        var arg = arguments; 

        return this.each(function() {
            var _this = this,
                $this = $(_this),
                plugin = $this.data('plugin_' + pluginName);

            if (!plugin) {
                $this.data('plugin_' + pluginName, new Plugin(this, options));
            } else {
                if (typeof options === 'string' && typeof plugin[options] === 'function') {
                    plugin[options].apply(plugin, [].slice.call(arg, 1));
                }
            }
        });
    }
}

CS.MD.search = function() {
    var pluginName = 'search';
    var cookie = lgkorUI.cookie;
    var cookieKeyword = lgkorUI.recentlyKeyword

    function Plugin(el, opt) {
        var self = this;
        var defaults = {
            data: {},
            template: {
                autocompleteList: '<li><a href="#">{{keyword}}</a></li>',
                recentlyList: '<li><a href="#">{{keyword}}</a><button type="button" class="btn-delete"><span class="blind">삭제</span></button></li>',
                keywordList: '<li><a href="#">{{keyword}}</a></li>'
            }
        };

        self.$el = $(el);
        self.options = $.extend({}, defaults, opt);
        
        self._initialize();
        self._bindEvent();  
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this;
            
            self.autoUrl = self.$el.data('autocompleteUrl');
            self.keyword;
            self.isKeyword = self.$el.find('.keyword-box').length ? true : false;

            self.isKeyword && self._setRecently();
        },
        _setRecently: function() {
            var self = this;
            var $recentlyKeyword = self.$el.find('.recently-keyword');
            var tmpl = self.options.template,
                keywordCookie = cookie.getCookie('LG_SupportKeyword'),
                arr = [];
            
            $recentlyKeyword.find('ul').empty();

            if (keywordCookie && keywordCookie.length > 0) {
                arr = keywordCookie.split(',');
                if (arr.length) {
                    arr.forEach(function(item) {
                        var html = tmpl.recentlyList.replace('{{keyword}}', item.toString());
                        $recentlyKeyword.find('ul').append(html);
                    });
                    $recentlyKeyword.find('ul').show();
                    $recentlyKeyword.find('.no-keyword').hide();
                } else {    
                    $recentlyKeyword.find('ul').hide();
                    $recentlyKeyword.find('.no-keyword').show();
                }
            } else {
                $recentlyKeyword.find('ul').hide();
                $recentlyKeyword.find('.no-keyword').show();
            }            
        },
        setPopularKeyword: function(data) {
            var self = this;
            var $popularKeyword = self.$el.find('.popular-keyword');
            var tmpl = self.options.template,
                arr = data instanceof Array ? data : [],
                html = '';

            $popularKeyword.find('ul').empty();

            if (arr.length) {
                arr.forEach(function(item) {
                    html += tmpl.keywordList.replace('{{keyword}}', item);
                });

                $popularKeyword.find('ul').html(html);
                $popularKeyword.find('ul').show();
                $popularKeyword.find('.no-keyword').hide();
            } else {
                $popularKeyword.find('ul').hide();
                $popularKeyword.find('.no-keyword').show();
            }
        },
        reset: function() {
            var self = this;

            self.$el.find('input[type=text]').val('');
            self.$el.find('input[type=text]').trigger('update');
            self.$el.find('.search-more').hide();
            self.$el.find('.search-error').hide();
            self.$el.find('input[type=checkbox]').prop('checked', false);
        },
        _setAutoComplete: function(data) {
            var self = this;
            var tmpl = self.options.template,
                arr = data instanceof Array ? data : [];

            self.$el.find('.autocomplete-box').find('ul').remove();

            if (arr.length) {
                var html = vcui.template(tmpl.autocompleteList, {
                    list: arr
                });
                self.$el.find('.autocomplete-box').find('.keyword-list').prepend(html);
                self.$el.find('.autocomplete-box').find('ul').show();
                self.$el.find('.autocomplete-box').find('.no-keyword').hide();
            } else {
                self.$el.find('.autocomplete-box').find('ul').hide();
                self.$el.find('.autocomplete-box').find('.no-keyword').show();
            }
        },
        _search: function() {
            var self = this;
            var val = self.$el.find('input[type=text]').val().trim();
            
            if (val.length > 1) {
                if (self.$el.find('.recently-keyword').length) {
                    cookieKeyword.addCookie(val);
                    self._setRecently();
                }
                self.$el.find('.search-error').hide();
            } else {
                self.$el.find('.search-error').show();   
            }

            self.$el.removeClass('on');
            self.$el.trigger('searchafter');

        },
        _bindEvent: function() {
            var self = this;
           
            self.$el.on('click', '.search-layer .btn-delete', function() {
                var $box = $(this).closest('li');
                cookie.deleteCookie('LG_SupportKeyword', $box.find('a').text())
                self._setRecently();
            });

            self.$el.on('click', '.search-layer .btn-close', function() {
                self.$el.removeClass('on');
            });

            self.$el.on('click', '.search-layer .autocomplete-box a', function() {
                self.$el.trigger('autocompleteClick', [this]);
            });

            self.$el.on('click', '.search-layer .keyword-box a', function(e) {
                e.preventDefault();

                var val = $(this).text().trim();
                self.$el.find('input[type=text]').val(val);
                self.$el.removeClass('on');
                self.$el.trigger('keywordClick');
            });

            self.$el.find('input[type=text]').on('focus', function() {
                self.isKeyword && self.$el.addClass('on');
            }).on('input', function(e) {
                var val = $(this).val();

                if (self.keyword == val) return;

                if (val.length > 1) {
                    var param = {
                        keyword: val
                    };  

                    self.$el.trigger('autocomplete', [param, self.autoUrl, function(result) {
                        self._setAutoComplete(result.searchList)
                        
                        self.$el.find('.autocomplete-box').show();
                        self.$el.find('.keyword-box').hide();

                        self.$el.addClass('on');
                    }]);

                    self.$el.find('.search-error').hide();
                } else {
                    self.$el.find('.autocomplete-box').find('ul').empty();
                    self.$el.find('.autocomplete-box').hide();
                    self.$el.find('.keyword-box').show();
                    !self.isKeyword && self.$el.removeClass('on');
                }

                self.keyword = val;
            }).on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self._search();
                }
            });

            self.$el.find('.btn-search').on('click', function() {
                self._search();
            });

            self.$el.find('.btn-list-all').on('click', function() {
                self._search();
            }); 

            $('body').on('click', function (e) {
                if (!$(e.target).parents('.keyword-search')[0]) {
                    self.$el.removeClass('on');
                }
            });
        }
    };

    CS.MD.plugin(pluginName, Plugin);
}();

CS.MD.calendar = function() {
    var dateUtil = vcui.date;
    var detect = vcui.detect;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var dateRegex = /[0-9]{4}.?[0-9]{2}.?[0-9]{2}/;

    var pluginName = 'calendar';

    function Plugin(el, opt) {
        var self = this;
        self.$el = $(el),
        self.el = el;

        var defaults = {
            weekNames: ['일', '월', '화', '수', '목', '금', '토'],
            titleFormat: 'yyyy년 MM월 dd일',
            inputTarget: '', // 날짜를 선택했을 때, 날짜가 들어갈 인풋박스의 셀렉터
            date: new Date(), // 처음에 표시할 기본 날짜
            today: new Date(), // 오늘 날짜
            template: {
                header: '<div class="month-wrap">' + '<button type="button" class="arrow prev"><span class="blind">이전</span></button>' + '<span class="month"></span>' + '<button type="button" class="arrow next"><span class="blind">다음</span></button>' + '</div>',
                button: '<button type="button" class="day {{disabled?" disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}><span>{{day}}</span></button>',
                timeButton: '<button type="button" class="{{disabled?" disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}><span>{{time}}</span></button>'
            },
            caption: '캘린더입니다. 글은 일요일, 월요일, 화요일, 수요일, 목요일, 금요일, 토요일 순으로 나옵니다',
            colWidth: 'calc(100% / 7)', // 셀 너비
            format: 'yyyy.MM.dd',
            paramFormat: 'yyyyMMdd'
        };

        self.options = $.extend({}, defaults, opt);
        
        self._initialize();
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this,
                arr = self.options.dateArr instanceof Array ? self.options.dateArr : [];


            if (arr.length) {
                for (var i = 0; i < arr.length; i++) {
                    arr.push(vcui.date.parse(arr[i]));
                }
                self.currDate = arr[0];
            } else {
                self.currDate = self.options.today;
            }

            if (self.options.inputTarget) {
                self.$input = $(self.options.inputTarget);
            }

            self.dateArr = arr;

            self._render();
        },
        _render: function _render() {
            var self = this,
                opts = self.options,
                tmpl;

            tmpl = opts.template.header + '<div class="box-table"></div>';

            self._remove();
            self.$calendar = $(tmpl);
            self.$el.empty().append(self.$calendar);

            self.$el.find(self.$calendar).off('.calendar').on('click.calendar', '.arrow', function (e) {
                var $el = $(e.currentTarget),
                    isPrev = $el.hasClass('prev')

                if ($el.hasClass('disabled')) {
                    return;
                }

                self[isPrev ? 'prev' : 'next']();
                self.$calendar.find('.' + (isPrev ? 'prev' : 'next')).focus();
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

                self.$calendar.find('.choice').removeClass('choice');
                self.activeDate = date;
                $this.addClass('choice');
                $this.closest('tbody').find('td').find('button span.blind').remove();
                $this.find('button').append('<span class="blind">선택됨</span>');
                if (opts.inputTarget) {
                    self.$input.val(format);
                }

                self.$el.trigger('dateselected', [format]);
            })

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

            html += '<table class="tb-calendar"><caption>' + opts.caption + '</caption>';
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
                    
                    html += '" data-year="' + y + '" data-month="' + m + '" data-day="' + d + '">';

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

            self.$el.find('.box-table').html(html);

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
                $second = self.$el.find('.month-wrap');
                isFirst = currDate.getFullYear() === minDate.getFullYear() && currDate.getMonth() === minDate.getMonth(),
                isLast = currDate.getFullYear() === maxDate.getFullYear() && currDate.getMonth() === maxDate.getMonth();
            
            html = currDate.getFullYear() + '<span class="blind">년</span>.' + (currDate.getMonth() + 1)+ '<span class="blind">월</span>';
            $second.find('.month').html(html);
            
            $second.find('.prev').toggleClass('disabled', isFirst).prop('disabled', isFirst).attr('tabindex', isFirst ? '-1' : '0');
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
    }

    CS.MD.plugin(pluginName, Plugin);
}();

CS.MD.timeCalendar = function() {
    var dateUtil = vcui.date;
    var detect = vcui.detect;

    var dateRegex = /[0-9]{2}:?[0-9]{2}/;

    var pluginName = 'timeCalendar';

    function Plugin(el, opt) {
        var self = this;
        self.$el = $(el),
        self.el = el;

        var defaults = {
            timeName: ['09', '10', '11', '12', '13', '14', '15', '16', '17'],
            titleFormat: 'hh시 mm분',
            template: {
                button: '<button type="button" class="{{disabled?"disabled":""}}" title="{{title}}" {{disabled?"disabled":""}}><span>{{time}}분</span></button>'
            },
            caption: '시간 캘린더입니다. 글은 9시, 10시, 11시, 12시, 13시, 14시, 15시, 16시, 17시 순으로 나옵니다',
            colWidth: 'calc(85% / 6)', // 셀 너비
            format: 'hh:mm'
        };

        self.options = $.extend({}, defaults, opt);
        
        self._initialize();
    }

    Plugin.prototype = {
        _initialize: function() {
            var self = this;

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
            
            self.$el.find('>*').remove()
            self.$el.append(self.$calendar);
            
            self.$calendar.off('.timecalendar').on('click.timecalendar', 'button:not(.disabled)', function (e) {
                // 날짜 클릭
                e.preventDefault();
                
                var $this = $(this).closest('td'),
                    data = $this.data(),
                    time = data.hour + '' + data.min;

                self.$calendar.find('.choice').removeClass('choice');
                self.activeTime = time;
                $this.addClass('choice');
                $this.siblings('th').addClass('choice');
                $this.closest('tbody').find('td').find('button span.blind').remove();
                $this.find('button').append('<span class="blind">선택됨</span>');

                if (self.options.inputTarget) self.$input.val(time);

                self.$el.trigger('timeselected', [time]);
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
                        title: hour + "시" + min + "분" + (isDisabled ? " 선택할 수 없음" : ""),
                        time: min,
                        disabled: isDisabled
                    });

                    html += '</td>';
                } // for
                html += '</tr>';
            } // for
            html += '</tbody></table>';

            self.$el.find('.box-table').html(html);

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
            self.$el.find('.choice').removeClass('choice');

            if (self.options.inputTarget) {
                self.$input.val('');
            }

            self._render();
        }
    }

    CS.MD.plugin(pluginName, Plugin);
}();

CS.MD.pagination = function() {
    var pluginName = 'pagination';

    function Plugin(el, opt) {
        var self = this,
            el = self.el = el,
            $el = self.$el = $(el);

        var defaults = {
            page: 1,
            totalCount: 1,
            pageCount:10,
            pageView: 5,
            prevClass: 'prev',
            nextClass: 'next',
            disabledClass: 'disabled',
            lastView: false
        };

        self.options = $.extend({}, defaults, self.$el.data(), opt);

        function _initialize() {
            $el.attr("role","navigation");
            $el.attr("aria-label","Pagination");

            self.$pageList = $el.find('.page_num');
            self.$prev = $el.find('.' + self.options.prevClass);
            self.$next = $el.find('.' + self.options.nextClass);

            self.pageTotal = Math.floor((self.options.totalCount - 1)  / self.options.pageCount + 1);

            self._setEvent();
            self._update();
        }

        _initialize();
    }

    Plugin.prototype = {
        _update: function(page) {
            var self = this,
                page = page || self.options.page,
                pageView = self.options.pageView,
                pageTotal = self.pageTotal,
                html = '';

            var startPage = parseInt((page - 1) / pageView) * pageView + 1; 
            var endPage = startPage + pageView - 1;
            if (endPage > pageTotal) {
                endPage = pageTotal;
            }

            for (var i = startPage; i <= endPage; i++) {
                if (self.options.page == i) {
                    html += '<strong><span class="blind">현재 페이지</span>' + i + '</strong>';
                } else {
                    html += '<a href="#" data-page="' + i + '" title="' + i + '페이지 보기">' + i + '</a>';
                }
            }

            if (self.options.lastView && (startPage + pageView <= pageTotal)) {
                html += '<span class="dot">...</span>';
                html += '<a href="#" data-page="' + pageTotal + '" title="' + pageTotal + '페이지 보기">' + pageTotal + '</a>';
            }

            if (page > pageView) {
                self.$prev
                    .attr('aria-disabled', false)
                    .removeClass(self.options.disabledClass)
                    .data('page', startPage - 1);
            } else {
                self.$prev
                    .attr('aria-disabled', true)
                    .addClass(self.options.disabledClass)
                    .data('page', '');
            }

            if (startPage + pageView <= pageTotal) {
                self.$next
                    .attr('aria-disabled', false)
                    .removeClass(self.options.disabledClass)
                    .data('page', endPage + 1);
            } else {
                self.$next
                    .attr('aria-disabled', true)
                    .addClass(self.options.disabledClass)
                    .data('page', '');
            }
            
            self.$el.data('pageTotal', pageTotal);
            self.$el.data('totalCount', self.options.totalCount);
            self.$el.data('page', page);

            self.$pageList.html(html);
        },
        update: function(data) {
            var self = this;

            self.options.page = data.page;
            self.options.totalCount = data.totalCount;
            self.pageTotal = Math.floor(self.options.totalCount == 0 ? 1 : (self.options.totalCount - 1)  / self.options.pageCount + 1);

            self._update();
        },
        _setEvent: function() {
            var self = this;
            
            self.$el.on('click', 'a', function(e) {
                e.preventDefault();
                
                var $this = $(this),
                    page = $this.data('page');

                if ($this.hasClass(self.options.disabledClass) || $this.attr('aria-disabled') == true) return;

                if (self.options.lastView && ($this.hasClass(self.options.prevClass) || $this.hasClass(self.options.nextClass))) {
                    self._update(page);
                } else {    
                    self.$el.trigger({
                        type: 'pageClick',
                        page: page
                    });
                }
            });
        }
    }

    CS.MD.plugin(pluginName, Plugin);
}();

var AuthManager = function() {
    var SENDTEXT = '인증번호 발송';
    var RESENDTEXT = '인증번호 재발송';
    var COMPLETETEXT = '휴대전화 인증 완료';
    
    function AuthManager(options) {
        var self = this;
        var defaults = {
            elem: {
                form: '',
                popup: '',
                name: '',
                phone: '',
                number: ''
            },
            // },
            // target: {
            //     name: '',
            //     phone: ''
            // },
            register: {},
            pass: true
        };

        self.options = options = $.extend({}, defaults, options);
        self.nameName = $(options.elem.name)[0].name;
        self.phoneName = $(options.elem.phone)[0].name;
        self.numberName = $(options.elem.number)[0].name;
        self.popFlag = options.elem.popup ? true : false;

        self.smsUrl = self.popFlag ? $(options.elem.popup).data('smsUrl') : $(options.elem.form).data('smsUrl');
        self.authUrl = self.popFlag ? $(options.elem.popup).data('authUrl') : $(options.elem.form).data('authUrl');

        var register = options.register || {};

        self.validation = new vcui.ui.CsValidation(self.popFlag ? options.elem.popup : options.elem.form, {
            register: register
        });

        $(options.elem.popup).on('modalhide', function(){
            $(this).find('.btn-send').html(SENDTEXT);
            $(options.elem.number).attr('disabled', 'disabled').val('');

            if( options.target ) {
                $(options.elem.name).val('');
                $(options.elem.phone).val('');
            }
            self.validation.reset();
        });

    }

    AuthManager.prototype = {
        send: function(el) {
            var self = this;
            var elem = self.options.elem,
                result = self.validation.validate([self.nameName, self.phoneName]),
                data, url;

            if (result.success) {
                url = self.smsUrl;
                data = self.validation.getValues([self.nameName, self.phoneName]);

                lgkorUI.requestAjaxDataPost(url, data, function(result) {
                    var resultData = result.data;

                    if (resultData.resultFlag == 'Y') {
                        $(el).html(RESENDTEXT);
                        $(elem.number).prop('disabled', false);
                    }

                    lgkorUI.alert("", {
                        title: resultData.resultMessage
                    }, el);
                });
            }
        },
        open: function(completeCallback) {
            var self = this;
            var elem = self.options.elem;

            completeCallback && completeCallback();

            $(elem.popup).vcModal();
        },
        confirm: function(el, callback) {
            var self = this;
            var $button = $(el),
                elem = self.options.elem,
                target = self.options.target,
                result = self.validation.validate(),
                url, data, success = false;

            if (result.success == true) {
                url = self.authUrl;
                data = self.validation.getValues([self.nameName, self.phoneName, self.numberName]);

                if ($(elem.number).prop('disabled')) {
                    lgkorUI.alert("", {title: '인증번호 발송 버튼을 선택해 주세요.'}, el);
                    return false;
                }

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, data, function(result) {
                    var resultData = result.data;

                    if (resultData.resultFlag == 'Y') {
                        success = true;

                        if (target) {
                            $button.prop('disabled', true);
                            $button.html(COMPLETETEXT);
                            $(target.name).val(data.authName);
                            $(target.phone).val(data.authPhoneNo);
                            $(elem.popup).vcModal('hide');
                        }

                        if (resultData.resultMessage) {
                            lgkorUI.alert("", {
                                //title: '휴대전화 인증이 완료되었습니다.',
                                title: resultData.resultMessage,
                                ok: function(el) {
                                    if (resultData.url) {
                                        $(self.options.elem.form).attr('action', resultData.url);
                                        $(self.options.elem.form).submit();
                                    } else {
                                        $(el).vcModal('hide');
                                        callback && callback(success, result);
                                    }
                                }
                            }, el);
                        } else if (resultData.url) {
                            callback && callback(success, result);

                            $(self.options.elem.form).attr('action', resultData.url);
                            $(self.options.elem.form).submit();
                        } else {
                            callback && callback(success, result);
                        }
                    } else {
                        success = false;
                        
                        lgkorUI.alert("", {
                            title: resultData.resultMessage,
                            ok: function(el) {
                                if (resultData.url) {
                                    location.href = resultData.url;
                                } else {
                                    $(el).vcModal('hide');
                                    callback && callback(success, result);
                                }
                            }
                        }, el);
                    }

                    lgkorUI.hideLoading();
                });
            }
        }
    };

    return AuthManager;
}();

// 휴대폰 유효성 검사
function validatePhone(value){
    var _pattern = new RegExp(/^(010|016|011|017|018|019)\d{3,4}\d{4}$/);
            
    if( _pattern.test(value) == true) {
        var _length = value.length;
        var firstVal = value.substr(0,3);
        var num4th = value.substr(3,1);
        var num3 = value.substr(3,3);
        var num4 = value.substr(3,4);

        function validateNum10(){
            if( 200<= num3 && num3 <= 899) {
                return true;
            } else {
                return false;
            }
        }
        function rangeFlag(minNum, maxNum){
            if( minNum <= num4 && num4 <= maxNum)  {
                return true;
            } else {
                return false;
            }
        }

        switch(firstVal){
            case "010":
                if( num4th == 0 || num4th == 1) {
                    return false;
                }

                if( value.length != 11) {
                    return false;
                }
            break;
            case "011":
                if( _length == 10) {
                    return validateNum10();
                }
                if( _length == 11) {
                    //BTOCSITE-1613: 11자리일때 중간4자리 유효범위 수정 9500 -> 9000
                    if(rangeFlag(9000, 9999) || rangeFlag(1700, 1799)) {
                        return true;
                    } else {
                        return false;
                    }
                }
            break;
            case "016":case "019":
                if( _length == 10) {
                    return validateNum10();
                }
                if( _length == 11) {
                    return rangeFlag(9000, 9999);
                }
            break;
            case "017": case "018":
                if( _length == 10) {
                    return validateNum10();
                } else {
                    return false;
                }
            break;
        }
    } else {
        return false;
    }
}

(function($){
    vcui.require(['support/common/quickMenu.min'], function() {
        var isSwipe = !!$('#sw_con').length;

        if (isSwipe && $('#floatBox').length == 0){
            $('.swiper-container').after('<div id="floatBox"></div>');
        }
        
        if (isSwipe && $('#floatBox').find('#quickMenu').length < 1){
            var quickMenu = $('#quickMenu').remove();
            // preload 대응 현재 슬라이드가 고객지원이 아닐때는 숨김처리
            if ($('.swiper-slide-active').data().hash !== 'support'){
                $(quickMenu).hide();
            }
            $('#floatBox').append(quickMenu);
            $('#quickMenu').vcQuickMenu();
        }

        if (isSwipe == false){
            $('#quickMenu').vcQuickMenu();
        }
        
    });

    function commonInit(){
        //input type number 숫자키패드
        $('input[type="number"]').attr('inputmode', 'numeric');
        //$('input[type="number"]').attr('oninput', 'this.value = this.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")');
        
        $('[data-format=koreng]').on('input', function() {
            var $this = $(this),
                value = $this.val();
            
            //var regex = /(^[^가-힣ㄱ-ㅎㅏ-ㅣㄱ-ㅎ가-힣ㅏ-ㅣㆍ ᆢa-zA-Z])|[^가-힣ㄱ-ㅎㅏ-ㅣㄱ-ㅎ가-힣ㅏ-ㅣㆍ ᆢa-zA-Z]|([^가-힣ㄱ-ㅎㅏ-ㅣㄱ-ㅎ가-힣ㅏ-ㅣㆍ ᆢa-zA-Z]$)/g;
            var regex = /[0-9]/g;
            
            if (regex.test(value)) {
                $this.val(value.replace(regex, ''));
                return;
            }
        });

        $('[data-format=email]').on('input', function() {
            var $this = $(this),
                value = $this.val();
            
            var regex = /[가-힣ㄱ-ㅎㅏ-ㅣㆍ ᆢ\s]/g;
            
            if (regex.test(value)) {
                $this.val(value.replace(regex, ''));
                return;
            }
        });

        $('[data-format=alnum]').on('input', function() {
            var $this = $(this),
                value = $this.val();
            
            var regex = /[^a-zA-Z0-9]/g;
            
            if (regex.test(value)) {
                $this.val(value.replace(regex, ''));
                return;
            }
        });


        if( $('#surveyPopup').length) {
            vcui.require(['ui/selectbox', 'ui/satisfactionModal']);
        }

        if ($('.ui_common_scroll').length && !vcui.detect.isMobileDevice) {
            $('.ui_common_scroll').mCustomScrollbar();
        }

        $(document).on('input', 'input[type="text"]', function(){
            if (this.maxLength > 0 && this.value.length > this.maxLength){
                this.value = this.value.slice(0, this.maxLength);
            }  
        });

        $(document).on('input', 'input[type="number"]', function(){
            if (this.maxLength > 0 && this.value.length > this.maxLength){
                this.value = this.value.slice(0, this.maxLength);
            }  
        });

        $(document).on('focus', 'input[type="number"]', function(e){
            $(this).on('mousewheel',function(e){
                e.preventDefault();
            });
        });

        $(document).on('keydown', 'input[type="number"]', function(e){
            if( e.keyCode == 189 || e.keyCode == 187 || e.keyCode == 107 || e.keyCode == 109 || e.keyCode == 110 || e.keyCode == 190) {
                e.preventDefault();
            }
        });

        $(document).on('click', '.btn-add-pd', function(e){
            if( !lgkorUI.isLogin ) {
                var _url = $(this).attr('href');
                e.preventDefault();
                
                lgkorUI.confirm('로그인을 하셔야 이용하실 수 있습니다. <br>로그인 하시겠습니까?',{
                    typeClass:'type2',
                    title:'',
                    okBtnName: '네',
                    cancelBtnName: '아니요',
                    ok: function() {
                        location.href = _url;
                    },
                    cancel: function() {
                        
                    }
                });
            }
        });

        $(document).on('keyup', 'input[type="number"]', function(e){
            var $this = $(this);
            var v = $this.val();

            if( e.keyCode != 8 && e.keyCode != 46) {
                if( v != null && v != "") {
                    $this.data('oldValue', v);
                }
            } else {
                $this.data('oldValue', v);
            }
            
        });

        $(document).on('blur', 'input[type="number"]', function(e){
            var $this = $(this);
            var v = $this.val();
            var oldVal = $this.data('oldValue');
            
            if( v == null || v == "") {
                $this.val(oldVal);
            }
        });

        $(document).on('change', '.agree-wrap input:checkbox', function(){
            var $this = $(this);
            var $wrap = $this.closest('.agree-wrap');

            if ($wrap.find('input:checkbox').filter(':checked').length == $wrap.find('input:checkbox').length) {
                var $this = $(this);
                var $curSection = $this.closest('.section').nextAll('.section:visible').eq(0);
                
                lgkorUI.scrollTo($curSection, $('.prod-selected-wrap').outerHeight());
            }
        });
        
        $(document).on('ajaxComplete', function() {
            $('img').not('[data-pc-src], #modelNamePopup img').on('error', function() {
                lgkorUI.addImgErrorEvent(this);
            });
            $('#modelNamePopup img').on('error', function() {
                lgkorUI.addModelNameImgErrorEvent(this);
            });
        });

        $('.agree-wrap .agree-cont-box').attr('tabindex', 0);

        if ($('.pay-warranty').length) {
            $('.ui_tab-notice').on('tabchange', function(e, info) {
                var index = info.selectedIndex;
                switch(index) {
                    case 0:
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/ratesInfo1.do', '/acecount/ratesInfo1m.do');
                        break;
                    case 1:
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/ratesInfo3.do', '/acecount/ratesInfo3m.do');
                        break;
                    case 2:
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/ratesInfo4.do', '/acecount/ratesInfo4m.do');
                        break;
                }
            });
        }
    }

    document.addEventListener('DOMContentLoaded', commonInit);

    $('[data-control="modal"]').each(function() {
        var target = $(this).data('href') || $(this).attr('href');
        
        $(target).on('modalshow', function(e, modal) {
            $(target).removeAttr('style');
        });
    });
})(jQuery);

if (!vcui.detect.isMobileDevice) {
    var _AceGID=(function(){var Inf=['gtp20.acecounter.com','8080','AH5A40639666759','AW','0','NaPm,Ncisy','ALL','0']; var _CI=(!_AceGID)?[]:_AceGID.val;var _N=0;var _T=new Image(0,0);if(_CI.join('.').indexOf(Inf[3])<0){ _T.src ="https://"+ Inf[0] +'/?cookie'; _CI.push(Inf);  _N=_CI.length; } return {o: _N,val:_CI}; })();
    var _AceCounter=(function(){var G=_AceGID;var _sc=document.createElement('script');var _sm=document.getElementsByTagName('script')[0];if(G.o!=0){var _A=G.val[G.o-1];var _G=(_A[0]).substr(0,_A[0].indexOf('.'));var _C=(_A[7]!='0')?(_A[2]):_A[3];var _U=(_A[5]).replace(/\,/g,'_');_sc.src='https:'+'//cr.acecounter.com/Web/AceCounter_'+_C+'.js?gc='+_A[2]+'&py='+_A[4]+'&gd='+_G+'&gp='+_A[1]+'&up='+_U+'&rd='+(new Date().getTime());_sm.parentNode.insertBefore(_sc,_sm);return _sc.src;}})();
} else {
    var _AceGID=(function(){var Inf=['co.kr','www.lgservice.co.kr,lgservice.co.kr,m.lgservice.co.kr,lge.co.kr,m.lge.co.kr,www.lge.co.kr','AZ3A66760','AM','0','NaPm,Ncisy','ALL','0']; var _CI=(!_AceGID)?[]:_AceGID.val;var _N=0;if(_CI.join('.').indexOf(Inf[3])<0){ _CI.push(Inf);  _N=_CI.length; } return {o: _N,val:_CI}; })();
    var _AceCounter=(function(){var G=_AceGID;var _sc=document.createElement('script');var _sm=document.getElementsByTagName('script')[0];if(G.o!=0){var _A=G.val[G.o-1];var _G=(_A[0]).substr(0,_A[0].indexOf('.'));var _C=(_A[7]!='0')?(_A[2]):_A[3];var _U=(_A[5]).replace(/\,/g,'_');_sc.src='https:'+'//cr.acecounter.com/Mobile/AceCounter_'+_C+'.js?gc='+_A[2]+'&py='+_A[1]+'&up='+_U+'&rd='+(new Date().getTime());_sm.parentNode.insertBefore(_sc,_sm);return _sc.src;}})();    
}
// BTOCSITE-1198 챗봇 상담 팝업
$(document).on('click', '.btn-target-link', function(e){
    var target = this.getAttribute('href'),
        popupWidth = parseInt(this.getAttribute('data-width')),
        popupHeight = parseInt(this.getAttribute('data-height')),
        screenWidth = parseInt(screen.width),
        screenHeight = parseInt(screen.height),
        intLeft = Math.floor((screenWidth - popupWidth) / 2),
        intTop = Math.floor((screenHeight - popupHeight) / 2);

    if (intLeft < 0) intLeft = 0;
    if (intTop < 0) intTop = 0;

    e.preventDefault();

    if( isApp()) {
        var appUrl = $(this).attr('href');
        if(vcui.detect.isIOS){
            var jsonString = JSON.stringify({'command':'openInAppBrowser', 'url': appUrl, 'titlebar_show': 'Y'});
            // , 'titlebar_show': 'Y'
            webkit.messageHandlers.callbackHandler.postMessage(jsonString);
        } else {
            android.openNewWebview(appUrl);
        }
    } else {
        window.open(target, '_blank', 'width=' + popupWidth + ',height=' + popupHeight + ',left=' + intLeft + ',top=' + intTop + ',history=no,resizable=no,status=no,scrollbars=yes,menubar=no');
    }
})
