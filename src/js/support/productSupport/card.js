(function() {
    var cardListTmpl = 
        '<li>' +
            '<a href="{{url}}">' +
                '<div class="image">' +
                    '<img src="{{imgUrl}}" alt="{{title}}">' +
                '</div>' +
                '<div class="summary">' +
                    '<ul class="infos">' +
                        '<li>{{date}}</li>' +
                        '<li><span class="view"><span class="blind">조회수</span>{{view}}</span></li>' +
                    '</ul>' +
                '</div>' +
            '</a>' +
        '</li>';

    var productTipListTmpl =
        '<li>' +
            '<a href="{{url}}">' +
                '<div class="image">' +
                    '<img src="{{imgUrl}}" alt="{{title}}">' +
                '</div>' +
                '<div class="summary">' +
                    '{{# if (typeof flag != "undefined") { #}}' +
                    '<div class="flag-wrap"><span class="flag">{{flag}}</span></div>' +
                    '{{# } #}}' +
                    '<ul class="infos">' +
                        '<li>{{date}}</li>' +
                        '<li><span class="view"><span class="blind">조회수</span>{{view}}</span></li>' +
                    '</ul>' +
                '</div>' +
                '<p class="tit">{{title}}</p>'
            '</a>' +
        '</li>';

    function suveyContent(param) {
        var url = CS.UI.$surveyWrap.data('ajax');

        lgkorUI.showLoading();
        $.ajax({
            url: url,
            data: param
        }).done(function (d) {
            if(d.status != 'success'){
                alert(d.message ? d.message : '오류발생');
                return;
            }

            var content = 
                '<p>평가해 주신 내용은 더 나은 콘텐츠를 제공해 드리기 위한 자료로 활용합니다.</p>' +
                '<p><span class="star-rating-wrap">';
                
            for (var i = 0; i < 5; i++) {
                if (i < d.data.score) {
                    content += '<span class="star on"></span>';
                } else {
                    content += '<span class="star"></span>';
                }
            }
            content += '</span></p><p>' + '평가결과 ' + d.data.score + ' / ' + d.data.headCount + '명 참여</p>';

            $('#surveyPop .lay-conts').html(content);
            $('#surveyPop').vcModal();

            lgkorUI.hideLoading();
        }).fail(function(err){
            alert(err.message);
        });;
    }

    $(window).ready(function() {
        var notice = {
            params: {},
            init: function() {
                var _self = this,
                    $contents = $('.contents.card');
                
                CS.UI.$resultWrap = $contents.find('.result-wrap');
                CS.UI.$pagination = $contents.find('.pagination');
                CS.UI.$sortsWrap = $contents.find('.sorting-wrap');
                CS.UI.$sortTotal = $contents.find('#count');
                CS.UI.$sortSelect = $contents.find('.ui_selectbox');
                CS.UI.$listWrap = $contents.find('.card-list-wrap');
                CS.UI.$surveyWrap = $contents.find('.board-survey');

                _self.params = {
                    'orderType': CS.UI.$sortSelect.vcSelectbox('value'),
                    'page': 1
                };

                CS.UI.$pagination.pagination();
            
                _self.bindEvent();
            },
            searchList: function(param) {
                var url = CS.UI.$resultWrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(url, this.params, function(d) {
                    var html = '',
                        data = d.data.listData,
                        page = d.data.listPage;

                    CS.UI.$sortTotal.html(page.totalCount);                    
                    CS.UI.$listWrap.find('ul').empty();

                    if (data.length) {
                        if (!CS.UI.$listWrap.hasClass('title-type')) {
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
                    var score = CS.UI.$surveyWrap.find('.ui_star_rating').vcStarRating('value'),
                        text = CS.UI.$surveyWrap.find('#input-content').val();
                        
                    if (score) {
                        suveyContent({
                            'score': score,
                            'input': text
                        });
                    } else {
                        CS.UI.$surveyWrap.addClass('error');
                    }
                });
            }
        }
        
        notice.init();
    });
})();