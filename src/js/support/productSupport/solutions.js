(function() {
    var filterTemplate = 
        '{{# if (active == true) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '{{# if (typeof subType == "undefined") { #}}' +
        '<button type="button" class="filter-link" data-code="{{code}}" data-name="{{name}}">{{name}}</button>' +
        '{{# } else { #}}' +
        '<button type="button" class="sub-filter-link" data-code="{{code}}" data-name="{{name}}">{{name}}</button>' +
        '{{# } #}}' +
        '</li>';
    var filterHeadTemplate = 
        '<div class="title">' +
            '{{# if (typeof back != "undefined") { #}}' +
            '<button type="button" class="btn-back"><span class="blind">뒤로 가기</span></button>' +
            '<h2 class="tit">{{name}}</h2>' +
            '{{# } else { #}}' +
            '<h2 class="tit">증상 선택</h2>' +
            '{{# } #}}' +
        '</div>' +
        '<ul class="filter-list">' +
        '</ul>';

    var filterOptionTemplate =
        '{{# if (active == true) { #}}' +
        '<option value="{{code}}" selected>{{name}}</option>' +
        '{{# } else { #}}' +
        '<option value="{{code}}">{{name}}</option>' +
        '{{# } #}}';

    var solutionsTemplate = 
        '{{# if (typeof video != "undefined" && video === true) { #}}' +
        '<li class="video-type">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<a href="{{url}}" class="item">' +
        '<p class="tit">{{#raw title}}</p>' +
        '<p class="desc">{{topic}}</p>' +
        '<ul class="options">' +
        '<li>{{date}}</li>' +
        '<li>조회 {{view}}</li>' +
        '</ul>' +
        '{{# if (typeof video != "undefined" && video === true) { #}}' +
        '<span class="icon-movie"><span class="blind">동영상 컨텐츠</span></span>' +
        '{{# } #}}' +
        '</a>' +
        '</li>';

    var keywordsTemplate = 
        '{{# if (typeof topic != "undefined" && topic != "") { #}}' +
            '{{# if (typeof subTopic != "undefined" && subTopic != "" && topic != "전체") { #}}' +
            '“<span class="point">{{topic}} &gt; {{subTopic}}</span>”' +
            '{{# } else { #}}' +
            '“<span class="point">{{topic}}</span>”' +
            '{{# } #}}' +
        '{{# } #}}' +
        '{{# if (typeof keyword != "undefined" && keyword != "") { #}}' +
        ' “<span class="point">{{keyword}}<button type="button" class="btn-delete"><span class="blind">검색어 삭제</span></button></span>”' +
        '{{# } #}}';

    var recommProductItemTemplate =         
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="item">' +
                '<a href="{{modelUrlPath}}" class="item-inner">' +
                    '<div class="product-image">' +
                        '<img src="{{mediumImageAddr}}" alt="">' +
                    '</div>' +
                    '<div class="product-info">' +
                        '{{# if(bestFlag == "Y" || newFlag == "Y") { #}}' +
                        '<div class="flag-wrap bar-type">' +
                            '{{# if(newFlag == "Y") { #}}' +
                            '<span class="flag">신제품</span>' +    
                            '{{# } #}}' +
                            '{{# if(bestFlag == "Y") { #}}' +
                            '<span class="flag">베스트</span>' +    
                            '{{# } #}}' +                
                        '</div>' +
                        '{{# } #}}' +
                        '<div class="product-name">' +
                            '<p class="name">{{modelDisplayName}}</p>' +
                            '<p class="model">{{modelName}}</p>' +
                        '</div>' +
                    '</div>' +
                '</a>' +
            '</div>' +
        '</div>';
    var serviceMenuTemplate = 
        '<li>' +
            '<a href="{{url}}">' +
                '<div class="icon"><img src="{{imgUrl}}" alt="" aria-hidden="true"></div>' +     
                '<strong class="tit">{{name}}</strong>' +
            '</a>' +
        '</li>';
    var updateBannerTemplate = 
        '<div class="info-banner">' +
            '{{#each (item, index) in updateBanner}}' +
            '<a href="{{item.url}}" class="btn dark-gray size" target="_blank"><span>{{item.name}}</span></a>' +
            '{{/each}}' +
        '</div>';
    var detect = vcui.detect;
        

    $(window).ready(function() {
        var solutions = {
            options: {
                keywords: [],
                topic: '',
                topicNm: '전체',
                subTopic: '',
                subTopicNm: '전체',
                sort: 'update',
                page: 1,
                research: false,
                category: '',
                categoryNm: '',
                subCategory: '',
                subCategoryNm: '', 
                modelCode: '', 
                productCode: ''
            },
            initialize: function() {
                var self = this;

                self.$cont = $('.contents');
                self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
                self.$myModelArea = self.$cont.find('.my-product-wrap');
                self.$searchModelWrap = self.$cont.find('.prod-search-wrap');

                self.$stepArea = self.$cont.find('.step-area');
                self.$stepModel = self.$cont.find('#stepModel');
                self.$stepInput = self.$cont.find('#stepInput');

                self.$solutionsWrap = $('.solutions-wrap');
                self.$solutionsFilter = self.$solutionsWrap.find('.filter-box');
                self.$solutionsFilterM = self.$solutionsWrap.find('.mobile-filter-box');
                self.$solutionsResult = self.$solutionsWrap.find('.result-box');
                self.$solutionsPagination = self.$solutionsWrap.find('.pagination');
                self.$solutionsSort = self.$solutionsWrap.find('#sort');

                self.$selectTopic = self.$solutionsWrap.find('#topic');
                self.$selectSubTopic = self.$solutionsWrap.find('#subTopic');
                self.$keywordWrap = self.$solutionsWrap.find('.ui_search');
                self.$keywordInput = self.$solutionsWrap.find('#keyword');
                self.$keywordBtn = self.$solutionsWrap.find('.keyword-search .btn-search');

                self.$bannerProduct = self.$cont.find('#recommProduct');
                self.$bannerMenu = self.$cont.find('#serviceMenu');

                self.setting();
                self.bindEvent();

                if (!self.isPSP) {
                    vcui.require(['support/common/searchModel.min'], function () {
                        self.$cont.vcSearchModel({model:self.param});
                    });
                } else {
                    $.extend(self.param, {
                        category:      $('#category').val(),
                        categoryNm:    $('#categoryNm').val(), 
                        subCategory:   $('#subCategory').val(),
                        subCategoryNm: $('#subCategoryNm').val(), 
                        modelCode:     $('#modelCode').val(),
                        productCode:   $('#productCode').val()
                    });
                }
                
                self.$keywordWrap.search({
                    template: {
                        autocompleteList: '<ul>{{#each (item, index) in list}}<li><a href="{{item.url}}"><div class="list-head"><strong class="list-category">{{item.subCategory}}</strong><span class="list-sub-category">{{item.subTopic}}</span></div><div class="list-desc">{{item.contTitle}}</div></a></li>{{/each}}</ul>',
                        recentlyList: '<li><a href="#">{{keyword}}</a><button type="button" class="btn-delete"><span class="blind">삭제</span></button></li>',
                        keywordList: '<li><a href="#">{{keyword}}</a></li>'
                    }
                });
                
                self.$solutionsPagination.pagination();            
            },
            setting: function() {
                var self = this;
                var url = location.search;
                var data = $.extend({}, self.options);

                // 옵션
                self.resultUrl = self.$searchModelWrap.data('resultUrl');
                self.solutionsUrl = self.$solutionsWrap.data('solutionsUrl');
                self.isPSP = self.$cont.hasClass('psp');
                
                if (url.indexOf("?") > -1) {
                    var search = url.substring(1);
                    var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

                    for (var key in searchObj) {
                        if (key == 'keyword') {
                            data['keywords'].push(decodeURIComponent(searchObj.keyword));
                            self.$keywordInput.val(decodeURIComponent(searchObj.keyword));
                            self.$keywordWrap.find('.search-more').show();
                        } else if (key == 'searchKeyword') {
                            var temp = decodeURIComponent(searchObj.searchKeyword).split('+');
                            if (temp.length) {
                                data['keywords'] = [];
                                temp.forEach(function(item) {
                                    data['keywords'].push(item);
                                });
                                self.$keywordInput.val(decodeURIComponent(temp[0]));
                                self.$keywordWrap.find('.search-more').show();
                            }
                        } else {
                            data[key] = decodeURIComponent(searchObj[key]);
                        }
                        
                        if (key == 'mktModelCd') data['modelCode'] = searchObj.mktModelCd;
                        if (key == 'sort') self.$solutionsSort.val(searchObj.sort).vcSelectbox('update');
                        if (key == 'research') self.$solutionsWrap.find('#research').prop('checked', searchObj.research);
                    }
                }

                self.param = data;
            },
            completeModel: function() {
                var self = this;
                var model = self.param;

                console.log('parameter : ');
                console.log(self.param);
                
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(self.resultUrl, model, function(result) {
                    var data = result.data,
                        param = result.param;
                    
                    self.$cont.vcSearchModel('updateSummary', {
                        product: [model.categoryNm, model.subCategoryNm, model.modelCode],
                        reset: 'product'
                    });

                    self.setBanner(data);
                    self.setPopularKeyword(data);
                    self.setFilter(data);
                    self.setSubFilter(data);
                    self.setSolutionsList(data);
                    self.setKeyword(param);

                    lgkorUI.hideLoading();
                }, 'POST');
            },
            setBanner: function(data) {
                var self = this;
                var productArr = data.recommProduct instanceof Array ? data.recommProduct : [];
                var menuArr = data.serviceMenu instanceof Array ? data.serviceMenu : [];
                var updateArr = data.updateBanner instanceof Array ? data.updateBanner : [];
                var $productSlider = self.$bannerProduct.find('.product-slider'),
                    $menuList = self.$bannerMenu.find('.service-list');

                if (productArr.length) {
                    var html = '';
                    productArr.forEach(function(item) {
                        html += vcui.template(recommProductItemTemplate, item);
                    });

                    $productSlider.find('.slide-track').html(html);
                    if (!$productSlider.hasClass('ui_carousel_initialized')) {
                        lgkorUI.initProductSlider();
                    } else {
                        $productSlider.vcCarousel('reinit');
                    }
                    self.$bannerProduct.show();
                    html = '';
                }

                if (menuArr.length) {
                    var html = '';
                    menuArr.forEach(function(item) {
                        html += vcui.template(serviceMenuTemplate, item);
                    });

                    $menuList.html(html);
                    self.$bannerMenu.show();
                }

                if (updateArr.length && !detect.isMobile) {
                    var html = '';
                    html = vcui.template(updateBannerTemplate, data);
                    self.$solutionsWrap.prepend(html);
                }
            },
            setPopularKeyword: function(data) {
                var arr = data.popularKeyword instanceof Array ? data.popularKeyword : [];
                this.$keywordWrap.search('setPopularKeyword', arr);
            },
            setKeyword: function() {
                var self = this;
                var html = '';
                
                html = vcui.template(keywordsTemplate, {
                    topic: self.param.topicNm,
                    subTopic: self.param.subTopicNm,
                    keyword: self.param.keywords[0]
                });
                html += ' 검색 결과';
                self.$solutionsResult.find('.title .tit').html(html);
            },
            setFilter: function(data) {
                var self = this;
                var param = self.param,
                    filterArr = data.filterList instanceof Array ? data.filterList : [],
                    htmlPC = htmlM = '';

                if (filterArr.length) {
                    self.$solutionsFilter.empty();
                    self.$solutionsFilter.html(vcui.template(filterHeadTemplate, {}));

                    filterArr.forEach(function(item) {
                        item.active = item.name == param.topicNm ? true : false; 
                        htmlPC += vcui.template(filterTemplate, item);
                        htmlM += vcui.template(filterOptionTemplate, item);
                    });
                    self.$solutionsFilter.find('.filter-list').html(htmlPC);
                    self.$selectTopic.html(htmlM);
                    self.$selectTopic.prop('disabled', false);
                    self.$selectTopic.vcSelectbox('update');
                } else {
                    self.$solutionsFilter.empty();
                    self.$selectTopic.html('<option value="" class="placeholder">증상 선택</option>');
                    self.$selectTopic.prop('disabled', true);
                    self.$selectTopic.vcSelectbox('update');
                }
            },
            setSubFilter: function(data) {
                var self = this;
                var param = self.param;
                var subFilterArr = data.subFilterList instanceof Array ? data.subFilterList : [],
                    htmlPC = htmlM = '';
                
                if (subFilterArr.length && self.param.topicNm != '전체') {
                    self.$solutionsFilter.empty();  
                    self.$solutionsFilter.html(vcui.template(filterHeadTemplate, {
                        back: true,
                        name: param.topicNm
                    }));

                    subFilterArr.forEach(function(item) {
                        item.subType = true;
                        item.active = item.name == param.subTopicNm ? true : false; 
                        htmlPC += vcui.template(filterTemplate, item);
                        htmlM += vcui.template(filterOptionTemplate, item);
                    });

                    self.$solutionsFilter.find('.filter-list').html(htmlPC);
                    self.$selectSubTopic.html(htmlM);
                    self.$selectSubTopic.prop('disabled', false);
                    self.$selectSubTopic.vcSelectbox('update');
                } else {
                    self.$selectSubTopic.html('<option value="" class="placeholder">세부증상 선택</option>');
                    self.$selectSubTopic.prop('disabled', true);
                    self.$selectSubTopic.vcSelectbox('update');
                }
            },
            setSolutionsList: function(data) {
                var self = this;
                var $listWrap = self.$solutionsResult.find('.list-wrap'),
                    $pagination = self.$solutionsResult.find('.pagination'),
                    $noData = self.$solutionsResult.find('.no-data'),
                    $searchMore = self.$keywordWrap.find('.search-more');
                var arr = data.listData instanceof Array ? data.listData : [],
                    html = '';
                
                $listWrap.find('.list').empty();

                if (arr.length) {
                    arr.forEach(function(item) {
                        item.title = item.title.replace(/¶HS¶/g, '<span class="keyword">');
                        item.title = item.title.replace(/¶HE¶/g, '</span>');
                        html += vcui.template(solutionsTemplate, item);
                    });

                    $listWrap.find('.list').html(html);
                    $pagination.pagination('update', data.listPage);
                
                    $listWrap.show();
                    $pagination.show();
                    $noData.hide();
                } else {
                    $listWrap.hide();
                    $pagination.hide();
                    $noData.show();
                    $searchMore.hide();
                    $searchMore.find('input[type=checkbox]').prop('checked', false);
                }

                self.$solutionsResult.find('#solutionsCount').html(data.listPage.totalCount);
            },
            selectFilterMobile: function(code) {
                var self = this;

                self.$selectTopic.val(code);
                self.$selectSubTopic.find('option:not(.placeholder)').remove();
                self.$selectSubTopic.prop('disabled', false);
                self.$selectTopic.vcSelectbox('update');
                self.$selectSubTopic.vcSelectbox('update');
            },
            selectSubFilterMobile: function(code) {
                var self = this;

                self.$selectSubTopic.val(code);
                self.$selectSubTopic.vcSelectbox('update');
            },
            requestData: function() {
                var self = this;

                console.log('parameter : ');
                console.log(self.param);

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(self.solutionsUrl, self.param, function(result) {
                    var data = result.data;

                    self.setFilter(data);
                    self.setSubFilter(data);
                    self.setSolutionsList(data);
                    self.setKeyword();

                    if (self.param.keywords.length) {
                        self.$keywordInput.val(self.param.keywords[0]);
                    }
                    
                    lgkorUI.hideLoading();
                });
            },
            resetFilter: function() {
                var self = this;

                self.resetSubFilter();
                self.$solutionsFilter.find('.filter-list > li:first-child').addClass('on');
            },
            resetSubFilter: function() {
                var self = this;

                self.$solutionsFilter.find('.open, .on').removeClass('open on');
                self.$solutionsFilter.find('.sub-depth').remove();
            },
            reset: function() {
                var self = this,
                    data = $.extend({}, self.options);

                self.param = data;

                console.log('parameter : ');
                console.log(self.param);

                self.$solutionsFilter.empty();
                self.$solutionsFilterM.find('select').val('').vcSelectbox('update');
                self.$solutionsSort.val(data.sort).vcSelectbox('update');
                self.$keywordWrap.search('reset');

                $('#recommProduct').hide();
                $('#serviceMenu').hide();
                $('.info-banner').remove();
            },
            bindEvent: function() {
                var self = this;

                self.$bannerProduct.on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/solutionsPartsClick.do', '/acecount/solutionsPartsClickm.do');
                });

                self.$cont.find('.result-box').on('click', '.item', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/solutionsListClick.do', '/acecount/solutionsListClickm.do');
                    lgkorUI.historyBack(this);
                });

                self.$cont.on('complete', function(e, data) { 
                    $.extend(self.param, data); 
                    self.completeModel();
                }).on('reset', function(e) {
                    self.reset();
                });

                // 키워드 삭제
                self.$solutionsResult.find('.title .tit').on('click', '.btn-delete', function() {
                    self.$keywordInput.val('').trigger('update');
                    self.param.keywords = [];
                    self.param.keyword = '';
                    self.requestData();
                });

                // 증상 선택 (pc)
                self.$solutionsFilter.on('click', '.filter-link', function() {
                    var $this = $(this),
                        code = $this.data('code'), name = $this.data('name'),
                        param = {
                            page: 1,
                            topic: code,
                            topicNm: name,
                            subTopic: '',
                            subTopicNm: '전체'
                        };

                    $.extend(self.param, param);
    
                    self.requestData();
                    self.selectFilterMobile(code);
                });

                // 세부 증상 선택 (pc)
                self.$solutionsFilter.on('click', '.sub-filter-link', function() {
                    var code = $(this).data('code'), name = $(this).data('name'),
                        param = {
                            page:1,
                            subTopic: code,
                            subTopicNm: name
                        };
                    
                    $.extend(self.param, param);

                    self.requestData();
                    self.selectSubFilterMobile(code);
                });

                // 증상 선택 돌아가기
                self.$solutionsFilter.on('click', '.btn-back', function() {
                    var data = self.param;
                    var param = {
                        keywords: data.keywords,
                        category: data.category,
                        categoryNm: data.categoryNm,
                        subCategory: data.subCategory,
                        subCategoryNm: data.subCategoryNm,
                        modelCode: data.modelCode,
                        productCode: data.productCode,
                        keywords: self.param.keywords,
                        keyword: self.param.keyword
                    };

                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxDataPost(self.solutionsUrl, param, function(result) {
                        var data = result.data;

                        self.setFilter(data);
                        lgkorUI.hideLoading();
                    });
                });

                // 증상 선택 (mo)
                self.$selectTopic.on('change', function() {
                    var code = $(this).val(), name = $(this).find('option:selected').text(),
                        param = {
                            page: 1,
                            topic: code,
                            topicNm: name,
                            subTopic: '',
                            subTopicNm: '전체'
                        };

                    $.extend(self.param, param);

                    self.resetSubFilter();
                    self.requestData();
                });

                // 세부 증상 선택 (mo)
                self.$selectSubTopic.on('change', function() {
                    var code = $(this).val(), name = $(this).find('option:selected').text(),
                        param = {
                            page: 1,
                            subTopic: code,
                            subTopicNm: name
                        };

                    $.extend(self.param, param);
                    
                    self.requestData();
                    self.selectSubFilter(code);
                });

                // list sort
                self.$solutionsSort.on('change', function() {
                    var value = $(this).val(),
                        param = {
                            page: 1,
                            sort: value
                        };
                        
                    $.extend(self.param, param);
                    self.requestData();
                });

                // pagination
                self.$solutionsResult.find('.pagination').on('pageClick', function(e) {
                    var param = {
                        page: e.page
                    }

                    $.extend(self.param, param);
                    self.requestData();
                });

                self.$keywordWrap.on('autocomplete', function(e, param, url, callback) {
                    $.extend(self.param, param);
                    lgkorUI.requestAjaxData(url, self.param, function(result) {
                        callback(result.data);
                    });
                });

                self.$keywordWrap.find('.btn-list-all').on('click', function() {
                    self.$keywordBtn.trigger('click');
                });

                self.$solutionsWrap.find('#research').on('change', function() {
                    self.param.research = self.$solutionsWrap.find('#research').is(':checked');
                });

                // keyword input keypress enter
                self.$keywordInput.on('keyup', function(e){
                    if (e.keyCode == 13){
                        self.$keywordBtn.trigger('click');        
                    }
                });

                // keyword search
                self.$keywordBtn.on('click', function(e, keyword) {
                    var value = keyword || self.$keywordInput.val();
                    
                    if (value.trim().length > 1) {
                        var data = $.extend({}, self.param),
                            isChecked = data.research;

                        data['page'] = 1;

                        if (!isChecked) {
                            self.resetFilter();
                            data['topic'] = '';
                            data['topicNm'] = '전체';
                            data['subTopic'] = '';
                            data['subTopicNm'] = '전체';
                            data['keywords'] = [];
                            data['keywords'].push(value);
                        } else {
                            if (data['keywords'].indexOf(value) != -1) {
                                data['keywords'].splice(data['keywords'].indexOf(value), 1);
                            }
                            data['keywords'].unshift(value);
                        }
                        lgkorUI.setAcecounter('www.lge.co.kr/acecount/solutionsSearchClick.do', '/acecount/solutionsSearchClickm.do');
                        
                        self.param = data;
                        self.$keywordWrap.find('.search-more').show();
                        self.requestData();
                    }
                });

                self.$keywordWrap.on('keywordClick', function() {
                    self.$keywordBtn.trigger('click', [self.$keywordInput.val().trim()]);
                });

                self.$keywordWrap.find('.autocomplete-box').on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/solutionsAutoClick.do', '/acecount/solutionsAutoClickm.do');
                });

                self.$keywordWrap.find('.recently-keyword').on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/solutionsRecentClick.do', '/acecount/solutionsRecentClickm.do');
                });

                self.$keywordWrap.find('.popular-keyword').on('click', 'a', function() {
                    lgkorUI.setAcecounter('www.lge.co.kr/acecount/solutionsPopularClick.do', '/acecount/solutionsPopularClickm.do');
                });
            }
        }
        
        solutions.initialize();
    });
})();