(function() {
    var cardListTmpl = 
        '<li>' +
            '<a href="{{url}}" class="item">' +
                '<div class="item-image">' +
                    '<img src="{{img.src}}" alt="{{img.alt}}">' +
                '</div>' +
                '<div class="item-conts">' +
                    '<ul class="infos">' +
                        '<li>{{date}}</li>' +
                        '<li>조회 {{view}}</li>' +
                    '</ul>' +
                '</div>' +
            '</a>' +
        '</li>';

    var tipListTmpl =
        '<li>' +
            '<a href="{{url}}" class="item">' +
                '<div class="item-image">' +
                    '<img src="{{img.src}}" alt="{{img.alt}}">' +
                '</div>' +
                '<div class="item-conts">' +
                    '{{# if (typeof flag != "undefined") { #}}' +
                    '<div class="flag-wrap"><span class="flag">{{flag}}</span></div>' +
                    '{{# } #}}' +
                    '<p class="tit">{{title}}</p>' +
                    '<ul class="infos">' +
                        '<li>{{date}}</li>' +
                        '<li>조회 {{view}}</li>' +
                    '</ul>' +
                '</div>' +
            '</a>' +
        '</li>';

    var surveyValidation;
    var notice = {
        params: {},
        init: function() {
            var self = this;
            
            self.listSetting();
            self.detailSetting();
        },
        listSetting: function() {
            var self = this;

            if (!$('.result-wrap').length) return;

            self.$resultWrap = $('.result-wrap');
            self.$resultSort = self.$resultWrap.find('#orderType');
            self.$resultCount = self.$resultWrap.find('#count');
            self.$resultPagination = self.$resultWrap.find('.pagination');
            self.$resultList = self.$resultWrap.find('.card-list-wrap');

            self.params = {
                'orderType': self.$resultSort.vcSelectbox('value'),
                'page': 1
            };

            self.$resultWrap.find('.card-list').on('click', 'a', function() {
                lgkorUI.historyBack(this);
            });

            self.$resultPagination.pagination({
                pageCount: 12
            });

            self.$resultSort.on('change', function() {
                self.params = $.extend({}, self.params, {
                    'orderType': self.$resultSort.vcSelectbox('value'),
                    'page': 1
                });
                self.searchList();
            });

            self.$resultPagination.on('pageClick', function(e) {
                self.params = $.extend({}, self.params, {
                    'page': e.page
                });
                self.searchList();
            });

            
        },
        detailSetting: function() {
            var self = this;

            if (!$('.board-view-wrap').length) return;

            self.$boardWrap = $('.board-view-wrap');
                       
            self.$boardSurvey = self.$boardWrap.find('.survey-content');
            self.$boardSurveyBtn = self.$boardWrap.find('.btn-survey');

            if (self.$boardSurvey.length) {
                vcui.require(['ui/validation'], function () {
                    surveyValidation = new vcui.ui.CsValidation('.survey-content', {
                        register: {
                            rating: {
                                required: true,
                                msgTarget: '.err-msg'
                            }
                        }
                    });

                    self.$boardSurvey.find('#rating').on('starRatingChange', function(e, value){
                        var $curScore = self.$boardSurvey.find('.current_rating_score');
                        $curScore.html('(' + value.value + '점)');
                    })
    
                    self.$boardSurveyBtn.on('click', function(e) {
                        var result = surveyValidation.validate();
        
                        if (result.success) {
                            var score = self.$boardSurvey.find('#rating').vcStarRating('value'),
                                text = self.$boardSurvey.find('#ratingContent').val();
                                seq = self.$boardWrap.find('#seq').val();
        
                            self.reqeustSurvey({
                                score: score,
                                input: text,
                                seq: seq
                            });
                        }
                    });
                });
            }
        },
        searchList: function() {
            var self = this;
            var url = self.$resultWrap.data('ajax');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, self.params, function(result) {
                var data = result.data,
                    dataArr = data.listData instanceof Array ? data.listData : [],
                    page = data.listPage,
                    isCard = $('.card-news').length ? true : false,
                    html = '';
                 
                self.$resultList.find('ul').empty();
                if (dataArr.length) {
                    dataArr.forEach(function(item) {
                        html += vcui.template(isCard ? cardListTmpl : tipListTmpl, item);
                    });
                    
                    self.$resultCount.html(page.totalCount);
                    self.$resultList.find('ul').html(html);
                    self.$resultPagination.pagination('update', page);
                }
                lgkorUI.hideLoading();
            });
        },
        reqeustSurvey: function(param) {
            var self = this;
            var url = self.$boardSurvey.data('ajax');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(url, param, function(result) {
                var data = result.data;
                var obj = {
                    title:'평가해 주셔서 감사합니다.',
                    ok: function() {    
                        self.$boardSurvey.find('#rating').vcStarRating('selectedIndex', 0);
                        self.$boardSurvey.find('#ratingContent').val('');
                        $('.input-wrap.count .total em').text(0);
                        surveyValidation.reset();
                    }
                };
                var desc = '더 나은 콘텐츠를 제공해 드리기 위한 자료로 활용하겠습니다.';

                if (data.resultFlag == 'Y') {
                    $('#score').html(data.score);
                    $('#count').html(data.count);
                } else {
                    obj = $.extend(obj, {
                        title: data.resultMessage
                    });
                    desc = '';
                }

                lgkorUI.hideLoading();
                lgkorUI.alert(desc, obj);
            });
        }
    }

    $(window).ready(function() {
        notice.init();
    });
})();