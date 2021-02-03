(function() {
    var listDataTmpl = 
        '<li>' +
            '<a href="#">' +
                '<div class="video-thumb">' +
                    '<img src="//img.youtube.com/vi/{{videoId}}/default.jpg" alt="">' +
                '</div>' +
                '<div class="video-cont">' +
                    '<div class="info-box">' +
                        '<span class="category">{{category}}</span>' +
                        '<span class="topic">{{topic}}</span>' +
                    '</div>' +
                    '<h4 class="tit">{{title}}</h4>' +
                '</div>' +
            '</a>' +
        '</li>';
    var topicTmpl = 
        '{{#each (item, index) in topicList}}' +
        '<option value="{{item.value}}">{{item.name}}</option>' +
        '{{/each}}';

    var videoGuide = {
        init: function() {
            var self = this;

            self.param = {
                category: $('#category').val(),
                categoryNm: $('#categoryNm').val(),
                subCategory: $('#subCategory').val(),
                subCategoryNm: $('#subCategoryNm').val(),
                modelCode: $('#modelCode').val(),
                productCode: $('#productCode').val(),
                page: 1
            };
            self.$cont = $('.contents');
            self.$productBar = self.$cont.find('.prod-selected-wrap');
            self.$myProductWarp = self.$cont.find('.my-product-wrap');
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

            self.bindEvent();

            self.$cont.commonModel({
                selected: self.param
            });
            self.$resultPagination.pagination();
            self.$searchTopic.vcSelectTarget({
                addParam: '.contents input[type=hidden]'
            });

            self.$keywordWrap.search({
                template: {
                    autocompleteList: '<ul>{{#each (item, index) in list}}<li><a href="#{{item.url}}" title="새창 열림" target="_blank"><div class="list-head"><strong class="list-category">{{item.subCategory}}</strong><span class="list-sub-category">{{item.subTopic}}</span></div><div class="list-desc">{{item.contTitle}}</div></a></li>{{/each}}</ul>',
                    recentlyList: '<li><a href="#">{{keyword}}</a><button type="button" class="btn-delete"><span class="blind">삭제</span></button></li>',
                    keywordList: '<li><a href="#">{{keyword}}</a></li>'
                }
            });
        },
        drawTopicList: function(data) {
            var self = this;
            var html = vcui.template(topicTmpl, data);

            self.$searchTopic.find('option:not(.placeholder)').remove();
            self.$searchTopic.append(html).prop('disabled', false);
            self.$searchTopic.vcSelectbox('update');
        },
        drawList: function(result) {
            var self = this;
            var $result, html='';
                data = result.data,
                param = result.param,    
                popular = data.popular;

            if (popular.listData.length) {
                for (var key in data) {
                    if (key == 'popular' || key == 'newest') {
                        $result = data[key].type == 'popular' ? self.$resultPopular : self.$resultNewest;
                        data[key].listData.forEach(function(item) {
                            html += vcui.template(listDataTmpl, item);
                        });

                        $result.find('.video-list').html(html);
                        $result.find('.pagination').pagination('update', data[key].listPage);
                        $result.find('.count').html(data[key].listPage.totalCount);   
                        html = '';
                    }
                }

                self.drawSummary(param);
                self.$noData.hide();
            } else {
                self.$resultCont.hide();
                self.$resultCont.find('.video-list').empty();
                self.$resultSummary.hide();
                self.$noData.show();
            }
        },
        drawSummary: function(data) {
            var self = this;

            if (data) {
                if (data.keyword) {
                    self.$resultSummary.find('.keyword').html(data.keyword);
                    self.$resultSummary.show();
                } else {
                    self.$resultSummary.hide();
                }
            }
        },
        setPopularKeyword: function(data) {
            var arr = data.popularKeyword instanceof Array ? data.popularKeyword : [];
            this.$keywordWrap.search('setPopularKeyword', arr);
        },
        requestData: function() {
            var self = this;
            var url = self.$stepInput.data('listUrl');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(url, self.param, function(result) {
                self.drawList(result);
                lgkorUI.hideLoading();
            }, 'POST', 'json', false);
        },
        bindEvent: function() {
            var self = this;

            self.$cont.on('complete', function(e, data, url) {
                var param = {
                    category: data.category,
                    subCategory: data.subCategory,
                    modelCode: data.modelCode
                };
                
                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, param, function(result) {
                    var resultData = result.data;
                    
                    self.drawList(result);
                    self.drawTopicList(resultData);
                    self.setPopularKeyword(resultData);
                    console.log(data);
                    self.$myProductWarp.hide();
                    self.$cont.commonModel('updateSummary', {
                        product: [data.categoryNm, data.subCategoryNm, data.modelCode],
                        reset: true
                    });
                    self.$cont.commonModel('next', self.$stepInput);
                    self.$cont.commonModel('focus', self.$productBar, function() {
                        self.$productBar.vcSticky();
                    });
                    lgkorUI.hideLoading();
                });
            });

            self.$searchTopic.on('change', function() {
                var param = { topic: self.$searchTopic.val() };
                self.param = $.extend(self.param, param);
            });

            self.$searchSubTopic.on('change', function() {
                var param = { page:1, subTopic: self.$searchSubTopic.val() };
                self.param = $.extend(self.param, param);
                self.requestData();
            });

            self.$searchKeyword.on('keydown', function(e) {
                var param;
                if (e.keyCode == 13) {
                    e.preventDefault();
                    param = { page:1, keyword: self.$searchKeyword.val(), page: 1 };
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

            $('.search-layer').on('click', '.keyword-box a', function(e) {
                e.preventDefault();
                self.$searchBtn.trigger('click', [$(this).text().trim()]);      
            });

            self.$searchBtn.on('click', function(e, keyword) {
                var param = { 
                    page:1, 
                    keyword: keyword || self.$searchKeyword.val() 
                };
                self.param = $.extend(self.param, param);
                self.requestData();
            });

            self.$resultPagination.on('pageClick', function(e) {
                var param = { page: e.page};
                self.$param = $.extend(self.param, param);
                self.requestData();
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