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

    var productTipListTmpl =
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

    function suveyContent(param) {
        var url = CS.UI.$surveyWrap.data('ajax');

        lgkorUI.showLoading();
        lgkorUI.requestAjaxDataPost(url, param, function(d) {
            var obj = $.extend(obj,{typeClass:'type2', title:'평가해 주셔서 감사합니다.'});
            var desc = '더 나은 콘텐츠를 제공해 드리기 위한 자료로 활용합니다.';

            // var content =    
            //     '<p>평가해 주신 내용은 더 나은 콘텐츠를 제공해 드리기 위한 자료로 활용합니다.</p>' +
            //     '<p><span class="star-rating-wrap">';
                
            // for (var i = 0; i < 5; i++) {
            //     if (i < data.score) {
            //         content += '<span class="star on"></span>';
            //     } else {
            //         content += '<span class="star"></span>';
            //     }
            // }
            // content += '</span></p><p>' + '평가결과 ' + data.score + ' / ' + data.count + '명 참여</p>';

            // $('#surveyPop .lay-conts').html(content);
            // $('#surveyPop').vcModal();

            lgkorUI.hideLoading();
            lgkorUI.alert(desc, obj);
        });
    }

    $(window).ready(function() {
        var notice = {
            params: {},
            init: function() {
                var _self = this,
                    $contents = $('.contents.support');
                
                CS.UI.$resultWrap = $contents.find('.result-wrap');
                CS.UI.$pagination = $contents.find('.pagination');
                CS.UI.$sortsWrap = $contents.find('.sorting-wrap');
                CS.UI.$sortTotal = $contents.find('#count');
                CS.UI.$sortSelect = $contents.find('.ui_selectbox');
                CS.UI.$listWrap = $contents.find('.card-list-wrap');
                CS.UI.$surveyWrap = $contents.find('.survey-content');

                _self.params = {
                    'orderType': CS.UI.$sortSelect.vcSelectbox('value'),
                    'page': 1
                };

                CS.UI.$pagination.pagination({
                    pageCount: 12
                });

                if (CS.UI.$surveyWrap.length) {
                    vcui.require(['ui/validation'], function () {             
                        surveyValidation = new vcui.ui.CsValidation('.survey-content', {
                            register: {
                                rating: {
                                    required: true,
                                    msgTarget: '.err-msg'
                                }
                            }
                        });
                    });
                }
            
                _self.bindEvent();
            },
            searchList: function() {
                var url = CS.UI.$resultWrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, this.params, function(d) {
                    var html = '',
                        data = d.data.listData,
                        page = d.data.listPage;

                    CS.UI.$sortTotal.html(page.totalCount);                    
                    CS.UI.$listWrap.find('ul').empty();

                    if (data.length) {
                        if (!$('.product-tips').length) {
                            data.forEach(function(item) {
                                html += vcui.template(cardListTmpl, item);
                            });
                        } else {
                            data.forEach(function(item) {
                                html += vcui.template(productTipListTmpl, item);
                            });
                        }
                        CS.UI.$listWrap.find('ul').html(html);

                        CS.UI.$pagination.pagination('update', page);
                    }

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var _self = this;
            
                CS.UI.$sortSelect.on('change', function() {
                    _self.params = $.extend({}, _self.params, {
                        'orderType': CS.UI.$sortSelect.vcSelectbox('value'),
                        'page': 1
                    });
                    _self.searchList();
                });

                CS.UI.$pagination.on('pageClick', function(e) {
                    _self.params = $.extend({}, _self.params, {
                        'page': e.page
                    });
                    _self.searchList();
                });

                CS.UI.$surveyWrap.find('.btn-survey').on('click', function(e) {
                    var result = surveyValidation.validate();

                    if (result.success) {
                        var score = CS.UI.$surveyWrap.find('#rating').vcStarRating('value'),
                            text = CS.UI.$surveyWrap.find('#ratingContent').val();

                        suveyContent({
                            'score': score,
                            'input': text
                        });
                    }
                });
            }
        }
        
        notice.init();
    });
})();