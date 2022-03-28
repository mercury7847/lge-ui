(function() {
    var listDataTmpl = 
        '<li>' +
            '<a href="{{url}}">' +
                '<div class="video-thumb">' +
                    '<img src="//img.youtube.com/vi/{{videoId}}/default.jpg" alt="">' +
                '</div>' +
                '<div class="video-cont">' +
                    '<div class="info-box">' +
                        '<span class="category">{{category}}</span>' +
                        '<span class="topic">{{topic}}</span>' +
                    '</div>' +
                    '<h4 class="tit">{{#raw title}}</h4>' +
                '</div>' +
            '</a>' +
        '</li>';
    var topicTmpl = 
        '{{#each (item, index) in list}}' +
        '<option value="{{item.code}}" data-name="{{item.name}}">{{item.name}}</option>' +
        '{{/each}}';
    var detect = vcui.detect;

    var videoGuide = {
        init: function() {
            var self = this;
            var param = {};

            self.options = {
                category: '',
                categoryNm: '',
                subCategory: '',
                subCategoryNm: '',
                modelCode: '',
                productCode: '',
                page: 1
            };

            param = {
                category: $('#category').val(),
                categoryNm: $('#categoryNm').val(),
                subCategory: $('#subCategory').val(),
                subCategoryNm: $('#subCategoryNm').val(),
                modelCode: $('#modelCode').val(),
                productCode: $('#productCode').val(),
                topicNm: $('#topicNm').val(),
                subTopicNm: $('#subTopicNm').val(),
                keyword: $('#keyword').val(),
                page: 1
            };

            self.$cont = $('.contents');
            self.$productBar = self.$cont.find('.prod-selected-wrap');
            self.$myProductWarp = self.$cont.find('.my-product-wrap');
            self.$searchModelWrap = self.$cont.find('.prod-search-wrap');

            self.$stepModel = self.$cont.find('#stepModel');
            self.$stepInput = self.$cont.find('#stepInput');

            self.$searchWarp = self.$cont.find('.search-wrap');
            self.$keywordWrap = self.$cont.find('.ui_search');
            self.$searchKeyword = self.$searchWarp.find('#searchKeyword');
            self.$searchBtn = self.$searchWarp.find('.btn-search');
            self.$searchTopic = self.$searchWarp.find('#topic');
            self.$searchSubTopic = self.$searchWarp.find('#subTopic');

            self.$resultWrap = self.$cont.find('.result-wrap');
            self.$resultSummary = self.$resultWrap.find('.search-summary');
            self.$resultCont = self.$resultWrap.find('.search-result');
            self.$resultPopular = self.$resultCont.find('#popular');
            self.$resultNewest = self.$resultCont.find('#newest');
            self.$resultPagination = self.$resultWrap.find('.pagination');
            self.$noData = self.$resultWrap.find('.no-data');

            self.param = param;
            self.resultUrl = self.$searchModelWrap.data('resultUrl');
            self.subTopicUrl = self.$stepInput.data('subTopicUrl');
            self.listUrl = self.$stepInput.data('listUrl');

            self.bindEvent();

            self.$keywordWrap.search({
                template: {
                    autocompleteList: '<ul>{{#each (item, index) in list}}<li><a href="{{item.url}}"><div class="list-head"><strong class="list-category">{{item.subCategory}}</strong><span class="list-sub-category">{{item.subTopic}}</span></div><div class="list-desc">{{item.contTitle}}</div></a></li>{{/each}}</ul>',
                    recentlyList: '<li><a href="#">{{keyword}}</a><button type="button" class="btn-delete"><span class="blind">삭제</span></button></li>',
                    keywordList: '<li><a href="#">{{keyword}}</a></li>'
                }
            });
            self.$resultPagination.pagination({
                pageCount: 5
            });

            vcui.require(['support/common/searchModel.min'], function () {
                self.$cont.vcSearchModel();

                if (!self.param.subCategory) {
                    self.$cont.vcSearchModel('complete', param);
                }
            });
        },
        setPopularKeyword: function(data) {
            var arr = data.popularKeyword instanceof Array ? data.popularKeyword : [];
            this.$keywordWrap.search('setPopularKeyword', arr);
        },
        drawTopicList: function(data) {
            var self = this;
            var listArr = data.topicList instanceof Array ? data.topicList : [],
                html = '';

            self.$searchTopic.find('option:not(.placeholder)').remove();
            if (listArr.length) {
                html = vcui.template(topicTmpl, {list: listArr});
                self.$searchTopic.append(html).prop('disabled', false);
                self.$searchTopic.find('option[data-name="'+self.param.topicNm+'"]').prop('selected', true);
            } else {
                self.$searchTopic.prop('disabled', true);
            }
            self.$searchTopic.vcSelectbox('update');
        },
        drawSubTopicList: function(data) {
            var self = this;
            var listArr = data.subTopicList instanceof Array ? data.subTopicList : [],
                html = '';

            self.$searchSubTopic.find('option:not(.placeholder)').remove();
            if (self.param.topicNm && listArr.length) {
                html = vcui.template(topicTmpl, {list: listArr});
                self.$searchSubTopic.append(html).prop('disabled', false);
                self.$searchSubTopic.find('option[data-name="'+self.param.subTopicNm+'"]').prop('selected', true);
            } else {
                self.$searchSubTopic.prop('disabled', true);
            }
            self.$searchSubTopic.vcSelectbox('update');
        },
        drawList: function(result) {
            var self = this;
            var $result, html='';
                data = result.data,
                param = result.param,    
                popular = data.popular,
                newest = data.newest;
            var isNotEmpty = false;

            self.drawSummary(param);

            self.$searchKeyword.val(self.param.keyword);
            self.$searchKeyword.trigger('update'); 

            for (var key in data) {
                if (key == 'popular' || key == 'newest') {
                    var arr = data[key].listData instanceof Array ? data[key].listData : [];
                    
                    $result = data[key].type == 'popular' ? self.$resultPopular : self.$resultNewest;
                    $result.find('.video-list').empty();
                    $result.find('.count').html(data[key].listPage.totalCount);
                    $result.find('.pagination').pagination('update', data[key].listPage);   

                    if (arr.length) {
                        arr.forEach(function(item) {
                            item.title = item.title.replace(/¶HS¶/g, '<span class="keyword">');
                            item.title = item.title.replace(/¶HE¶/g, '</span>');
                            
                            html += vcui.template(listDataTmpl, item);
                        });

                        $result.find('.video-list').html(html);
                        html = '';

                        isNotEmpty = true;
                    } else {
                        isNotEmpty = false;
                    }
                }
            }

            if (isNotEmpty) {
                self.$resultCont.show();
                self.$noData.hide();
            } else {
                self.$resultCont.hide();
                self.$resultCont.find('.video-list').empty();
                console.log(self.param.keyword)
                self.$noData.show();
            }
        },
        drawSummary: function() {
            var self = this;
            var $keyword = self.$resultSummary.find('.keyword'),
                keyword = self.param.keyword;

            if (keyword) {
                $keyword.html(keyword);
                self.$resultSummary.show();
            } else {
                self.$resultSummary.hide();
                $keyword.empty();
            }

            self.$searchKeyword.val(keyword);
            self.$searchKeyword.trigger('update');
        },
        requestComplete: function() {
            var self = this;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.resultUrl, self.param, function(result) {
                lgkorUI.hideLoading();
                
                var data = result.data;
                
                self.setPopularKeyword(data);
                self.drawList(result);

                if (self.param.subCategory) {
                    self.drawTopicList(data);
                    self.drawSubTopicList(data);

                    self.$cont.vcSearchModel('updateSummary', {
                        product: [self.param.categoryNm, self.param.subCategoryNm, self.param.modelCode],
                        reset: 'product'
                    });
                } else {
                    self.$cont.vcSearchModel('updateSummary', {
                        tit: '서비스이용을 위해 제품을 선택해 주세요.',
                        reset: 'noProduct'
                    });
                }
            
            });
        },
        requestSubTopic: function() {
            var self = this;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.listUrl, self.param, function(result) {
                lgkorUI.hideLoading();
                self.drawSubTopicList(result.data);
                self.drawList(result);
            });
        },
        requestData: function(type) {
            var self = this;
            var param = $.extend(true, {}, self.param);

            param['type'] = type;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.listUrl, param, function(result) {
                lgkorUI.hideLoading();
                self.drawList(result);
            });
        },
        bindEvent: function() {
            var self = this;

            self.$resultCont.find('.video-list').on('click', 'a', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/videotutorialsListClick.do', '/acecount/videotutorialsListClickm.do');
            });

            self.$cont.on('reset', function(e) {
                self.param = $.extend(true, {}, self.options);

                self.$resultSummary.hide();

                self.$searchTopic.find('option:not(.placeholder)').remove();
                self.$searchSubTopic.find('option:not(.placeholder)').remove();
                self.$searchTopic.find('option.placeholder').prop('selected', true);
                self.$searchSubTopic.find('option.placeholder').prop('selected', true);
                self.$searchTopic.prop('disabled', true).vcSelectbox('update');
                self.$searchSubTopic.prop('disabled', true).vcSelectbox('update');
                self.$stepInput.find('#searchKeyword').val('');   
            });
            self.$cont.on('complete', function(e, data) {
                var param = {
                    category: data.category,
                    categoryNm: data.categoryNm,
                    subCategory: data.subCategory,
                    subCategoryNm: data.subCategoryNm,
                    modelCode: data.modelCode,
                    productCode: data.productCode,
                    page: data.page || 1
                };
                $.extend(self.param, param);

                self.requestComplete();
            });

            self.$searchTopic.on('change', function() {
                var topicCode = self.$searchTopic.val(),
                    topicName = topicCode ? self.$searchTopic.find('option:selected').text() : '';
                var param = { 
                    topic: topicCode,
                    topicNm: topicName,
                    subTopic: '',
                    subTopicNm: '',
                    page:1
                };
                $.extend(self.param, param);

                if (!topicCode) {
                    self.param.keyword = '';
                    self.$searchKeyword.val('');
                    self.drawSummary();    
                } 
                self.requestSubTopic();
            });

            self.$searchSubTopic.on('change', function() {
                var subTopicCode = self.$searchSubTopic.val(),
                    subTopicName = subTopicCode ? self.$searchSubTopic.find('option:selected').text() : '';
                var param = {  
                    subTopic: subTopicCode,
                    subTopicNm: subTopicName,
                    page:1
                };
                $.extend(self.param, param);
                self.requestData(); 
            });

            self.$searchBtn.on('click', function(e, keyword) {
                var value = keyword || self.$searchKeyword.val();

                if (value.trim().length > 1) {
                    var param = { 
                        keyword: value,
                        page:1 
                    };
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/videotutorialsSearchClick.do', '/acecount/videotutorialsSearchClickm.do');

                    $.extend(self.param, param);
                    self.requestData();
                }
            });

            self.$searchKeyword.on('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$searchBtn.trigger('click');
                }
            });

            // self.$keywordWrap.on('keywordClick', function() {
            //     self.$searchBtn.trigger('click', [self.$searchKeyword.val().trim()]);
            // });

            self.$keywordWrap.on('autocomplete', function(e, param, url, callback) {
                var param =  $.extend(true, self.param, param);
                lgkorUI.requestAjaxData(url, param, function(result) {
                    callback(result.data);
                });
            });

            self.$keywordWrap.find('.btn-list-all').on('click', function() {
                self.$searchBtn.trigger('click');
            });

            self.$keywordWrap.find('.autocomplete-box').on('click', 'a', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/videotutorialsAutoClick.do', '/acecount/videotutorialsAutoClickm.do');
            });
            self.$keywordWrap.find('.recently-keyword').on('click', 'a', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/videotutorialsRecentClick.do', '/acecount/videotutorialsRecentClickm.do');
            });
            self.$keywordWrap.find('.popular-keyword').on('click', 'a', function() {
                lgkorUI.setAcecounter('www.lge.co.kr/acecount/videotutorialsPopularClick.do', '/acecount/videotutorialsPopularClickm.do');
            });

            self.$resultPagination.on('pageClick', function(e) {
                var type = $(e.currentTarget).closest('.tabs-contents').attr('id');
                var param = {page: e.page};

                $.extend(self.param, param);
                self.requestData(type);
            });

            self.$resultSummary.on('click', '.btn-delete', function() {
                var param = {keyword: '', page: 1};
                $.extend(self.param, param);
                self.requestData();
            });

            // BTOCSITE-13601 모델명 확인 방법 > 이미지 확대 추가
            var $imgView = $('.btn-img-view');
            $('#select2').on('change', function(){
    
                // 이미지가 없는 경우 no-img 삭제
                if(!(lgkorUI.NO_IMAGE_MODEL_NAME != $imgView.find('img').attr('src'))) {
                    $imgView.find('img').removeClass('no-img');
                }
            });

            // BTOCSITE-13601 모델명 확인 방법 > 이미지 확대 추가
            $imgView.on('click', function(e) {
                e.preventDefault();
            
                if($(this).find('img').hasClass('no-img')) return;
    
                var domain=location.origin;
                var agent = navigator.userAgent;
                var imgUrl=domain + $(this).attr('href');
                var imgAlt = $(this).find('img').attr('alt');
                if(!vcui.detect.isMobileDevice){
                    window.open(imgUrl, '', '');
                    return
                }

                var currOption = $('#select2 option:selected');
                var popTitle = currOption.hasClass('placeholder') ? '모델명 확인 방법' : currOption.text();
                var $zoomPopup = $('#imgZoomPopup');
                var $zoomImg = $('#imgZoomPopup img');
                $zoomImg.attr('src', imgUrl);
                $zoomImg.attr('alt', imgAlt);

                $zoomPopup.find('.tit').html('<span>'+popTitle+'</span>');
                $zoomPopup.vcModal('open');
            });
        }
    }

    $(window).ready(function() {
        videoGuide.init();
    });
})();