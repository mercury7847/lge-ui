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
        '{{# if (item.code) { #}}' +
        '<option value="{{item.code}}">{{item.name}}</option>' +
        '{{# } else { #}}' +
        '<option value="{{item.value}}">{{item.name}}</option>' +
        '{{# } #}}' +
        '{{/each}}';

    var videoGuide = {
        init: function() {
            var self = this;

            self.options = {
                category: $('#category').val(),
                categoryNm: $('#categoryNm').val(),
                subCategory: $('#subCategory').val(),
                subCategoryNm: $('#subCategoryNm').val(),
                modelCode: $('#modelCode').val(),
                productCode: $('#productCode').val(),
                page: 1
            };

            self.param = $.extend({}, self.options);

            self.$cont = $('.contents');
            self.$productBar = self.$cont.find('.prod-selected-wrap');
            self.$myProductWarp = self.$cont.find('.my-product-wrap');
            self.$searchModelWrap = self.$cont.find('.prod-search-wrap');

            self.$stepModel = self.$cont.find('#stepModel');
            self.$stepInput = self.$cont.find('#stepInput');

            self.$searchWarp = self.$cont.find('.search-wrap');
            self.$keywordWrap = self.$cont.find('.ui_search');
            self.$searchKeyword = self.$searchWarp.find('#keyword');
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
            self.$cont.commonModel({
                selected: self.param
            });
            self.$resultPagination.pagination({
                pageCount: 5
            });
            self.$productBar.vcSticky();
        
            if (!self.param.subCategory) {
                self.$cont.commonModel('complete');
            }
        },
        drawTopicList: function(data) {
            var self = this;
            var listArr = data.topicList instanceof Array ? data.topicList : [],
                html = '';

            if (listArr.length) {
                html = vcui.template(topicTmpl, {
                    list: listArr
                });

                self.$searchTopic.find('option:not(.placeholder)').remove();
                self.$searchTopic.append(html).prop('disabled', false);
                self.$searchTopic.vcSelectbox('update');
            }
        },
        drawSubTopicList: function(data) {
            var self = this;
            var arr = data instanceof Array ? data : [],
                html = '';

            self.$searchSubTopic.find('option:not(.placeholder)').remove();

            if (arr.length) {
                html = vcui.template(topicTmpl, {
                    list: arr
                });
                self.$searchSubTopic.append(html).prop('disabled', false);
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
            // self.$searchKeyword.vcInputClearButton('changeVal', self.param.keyword);
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

            // self.$searchKeyword.vcInputClearButton('changeVal', keyword);
            self.$searchKeyword.val(keyword);
            self.$searchKeyword.trigger('update');
        },
        setPopularKeyword: function(data) {
            var arr = data.popularKeyword instanceof Array ? data.popularKeyword : [];
            this.$keywordWrap.search('setPopularKeyword', arr);
        },
        requestSubTopic: function() {
            var self = this;

            var param = {
                topic: self.param.topic,
                topicNm: self.param.topicNm,
                category: self.param.category,
                categoryNm: self.param.categoryNm,
                subCategory: self.param.subCategory,
                subCategoryNm: self.param.subCategoryNm,
                productCode: self.param.productCode
            }

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.subTopicUrl, param, function(result) {
                var data = result.data.optionData || result.data;

                self.drawSubTopicList(data);
                lgkorUI.hideLoading();
            });
        },
        requestData: function(type) {
            var self = this;
            var param = $.extend({}, self.param);

            param['type'] = type;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.listUrl, param, function(result) {
                self.drawList(result);
                lgkorUI.hideLoading();
            }, 'POST', 'json', false);
        },
        bindEvent: function() {
            var self = this;

            self.$cont.on('reset', function(e) {
                self.param = $.extend({}, self.options);

                self.$cont.commonModel('next', self.$stepModel);

                self.$stepInput.find('#keyword').val('');

                self.$searchTopic.find('option:not(.placeholder)').remove();
                self.$searchSubTopic.find('option:not(.placeholder)').remove();
                self.$searchTopic.find('option.placeholder').prop('selected', true);
                self.$searchSubTopic.find('option.placeholder').prop('selected', true);
                self.$searchTopic.prop('disabled', true).vcSelectbox('update');
                self.$searchSubTopic.prop('disabled', true).vcSelectbox('update');

                $('.search-summary').hide();

                if (self.isLogin) self.$myProductWarp.show();   
            });

            self.$cont.on('complete', function(e, data, url) {
                var param = {
                    category: data.category,
                    categoryNm: data.categoryNm || data.categoryName,
                    subCategory: data.subCategory,
                    subCategoryNm: data.subCategoryNm || data.subCategoryName,
                    modelCode: data.modelCode,
                    productCode: data.productCode,
                    page: data.page || 1
                };

                self.param = $.extend(self.param, param);

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var resultData = result.data;
                    
                    self.drawList(result);
                    self.setPopularKeyword(resultData);

                    self.$myProductWarp.hide();

                    if (param.subCategory) {
                        self.drawTopicList(resultData);

                        self.$cont.commonModel('updateSummary', {
                            product: [param.categoryNm, param.subCategoryNm, param.modelCode],
                            reset: 'product'
                        });

                        self.$cont.commonModel('next', self.$stepInput);
                        self.$cont.commonModel('focus', self.$productBar, function() {
                            self.$productBar.vcSticky();
                        });
                    } else {
                        self.$cont.commonModel('updateSummary', {
                            tit: '서비스이용을 위해 제품을 선택해 주세요.',
                            reset: 'noProduct'
                        });
                        self.$productBar.vcSticky();
                    }
                    
                    lgkorUI.hideLoading();
                });
            });

            self.$searchTopic.on('change', function() {
                var val = self.$searchTopic.val();

                if (val) {
                    var param = { 
                        topic: val,
                        topicNm: val ? self.$searchTopic.find('option:selected').text() : '',
                        subTopic: '',
                        subTopicNm: '',
                        page:1
                    };
                    self.param = $.extend(self.param, param);
                    self.requestSubTopic();
                } else {
                    var param = { 
                        topic: '',
                        topicNm: '',
                        subTopic: '',
                        subTopicNm: '',
                        keyword: '',
                        page:1
                    };
                    self.param = $.extend(self.param, param);

                    self.$stepInput.find('#keyword').val('');
                    self.drawSummary();
                    self.drawSubTopicList();
                    self.requestData();
                }
            });

            self.$searchSubTopic.on('change', function() {
                var val = self.$searchSubTopic.val();

                if (val) {
                    var param = { 
                        page:1, 
                        subTopic: self.$searchSubTopic.val(),
                        subTopicNm: self.$searchSubTopic.find('option:selected').text()
                    };
                    self.param = $.extend(self.param, param);
                    self.requestData();
                } 
            });

            self.$searchKeyword.on('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$searchBtn.trigger('click');
                }
            });

            self.$keywordWrap.on('keywordClick', function() {
                self.$searchBtn.trigger('click', [self.$searchKeyword.val().trim()]);
            });

            self.$searchBtn.on('click', function(e, keyword) {
                var value = keyword || self.$searchKeyword.val();

                if (value.trim().length > 1) {
                    var param = { 
                        page:1, 
                        keyword: value 
                    };
                    self.param = $.extend(self.param, param);
                    self.requestData();
                }
            });

            self.$keywordWrap.on('autocomplete', function(e, param, url, callback) {
                var param =  $.extend(self.param, param);
                lgkorUI.requestAjaxData(url, param, function(result) {
                    callback(result.data);
                });
            });

            self.$resultPagination.on('pageClick', function(e) {
                var type = $(e.currentTarget).closest('.tabs-contents').attr('id');
                
                var param = {page: e.page};
                self.$param = $.extend(self.param, param);
                self.requestData(type);
            });

            self.$resultSummary.on('click', '.btn-delete', function() {
                var param = { keyword: '', page: 1 };
                self.param = $.extend(self.param, param);
                self.requestData();
            });
        }
    }

    $(window).ready(function() {
        videoGuide.init();
    });
})();