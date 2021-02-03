(function() {
    var filterTemplate = 
        '{{# if (active == true) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<button type="button" class="filter-link" data-code="{{code}}" data-name="{{name}}">{{name}}</button>' +
        '</li>';
    var subFilterHeadTemplate = 
        '<div class="sub-depth">' +
            '<div class="tit-wrap">' +
                '<button type="button" class="btn-back"><span class="blind">뒤로 가기</span></button>' +
                '<strong class="tit">{{subTopicName}}</strong>' +
            '</div>' +
            '<ul>' +
            '</ul>' +
        '</div>';
    var subFilterTemplate = 
        '{{# if (active == true) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
            '<button type="button" class="filter-link" data-code="{{code}}" data-name="{{name}}">{{name}}</button>' +
        '</li>';

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
        '<p class="tit">{{title}}</p>' +
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

    var recommProductItemTemplate =         
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="item">' +
                '<div class="item-inner">' +
                    '<div class="product-image">' +
                        '<img src="{{imgUrl}}" alt="">' +
                    '</div>' +
                    '<div class="product-info">' +
                        '<div class="product-name">' +
                            '<p class="name"><a href="#" class="name">{{name}}</a></p>' +
                            '<p class="model">{{modelName}}</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
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
            '<a href="{{item.url}}" class="btn dark-gray size"><span>{{item.name}}</span></a>' +
            '{{/each}}' +
        '</div>';
        

    $(window).ready(function() {
        var solutions = {
            options: {
                keywords: [],
                topic: '',
                topicNm: 'All',
                subTopic: '',
                subTopicNm: 'All',
                sort: 'new',
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

                self.$bannerCenter = self.$cont.find('#centerFind');
                self.$bannerProduct = self.$cont.find('#recommProduct');
                self.$bannerMenu = self.$cont.find('#serviceMenu');

                self.setting();
                self.bindEvent();

                self.$cont.commonModel({
                    register: {},
                    selected: self.param
                });
                self.$keywordWrap.search({
                    template: {
                        autocompleteList: '<ul>{{#each (item, index) in list}}<li><a href="#{{item.url}}" title="새창 열림" target="_blank"><div class="list-head"><strong class="list-category">{{item.subCategory}}</strong><span class="list-sub-category">{{item.subTopic}}</span></div><div class="list-desc">{{item.contTitle}}</div></a></li>{{/each}}</ul>',
                        recentlyList: '<li><a href="#">{{keyword}}</a><button type="button" class="btn-delete"><span class="blind">삭제</span></button></li>',
                        keywordList: '<li><a href="#">{{keyword}}</a></li>'
                    }
                });
                
                self.$solutionsPagination.pagination();                
            },
            setting: function() {
                var self = this;
                var url = location.search;

                // 옵션
                self.resultUrl = self.$searchModelWrap.data('resultUrl');
                self.solutionsUrl = self.$solutionsWrap.data('solutionsUrl');
                self.keywords = [];
                self.param = self.options;
                
                if (url.indexOf("?") > -1) {
                    var search = url.substring(1);
                    var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

                    for (var key in searchObj) {
                        if (key in self.param) {
                            self.param[key] = decodeURIComponent(searchObj[key]);
                        }
                        
                        if (key == 'mktModelCd') self.param['modelCode'] = searchObj.mktModelCd;
                        if (key == 'sort') $('#sort').val(searchObj.sort), $('#sort').vcSelectbox('update');
                        if (key == 'keyword') $('#keyword').val(decodeURIComponent(searchObj.keyword)), self.keywords.push(keyword);
                    }

                    self.param.categoryNm = $('#category').val();
                    self.param.subCategoryNm = $('#subCategory').val();
                }
            },
            completeModel: function() {
                var self = this;
                var model = self.param;

                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(self.resultUrl, model, function(result) {
                    var data = result.data,
                        param = result.param;

                    self.$cont.commonModel('updateSummary', {
                        product: [model.categoryNm, model.subCategoryNm, model.modelCode],
                        reset: 'product'
                    });

                    self.setBanner(data);
                    self.setPopularKeyword(data);
                    self.setFilter(data);
                    self.setSolutionsList(data);
                    self.setKeyword(param);

                    self.$myModelArea.hide();  
                    
                    self.$cont.commonModel('next', self.$stepInput, function() {
                        self.$selectedModelBar.vcSticky();
                    }); 
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

                if (updateArr.length) {
                    var html = '';
                    html = vcui.template(updateBannerTemplate, data);
                    self.$solutionsWrap.prepend(html);
                }

                self.$bannerCenter.show();
            },
            setPopularKeyword: function(data) {
                var arr = data.popularKeyword instanceof Array ? data.popularKeyword : [];
                this.$keywordWrap.search('setPopularKeyword', arr);
            },
            setKeyword: function(data) {
                var self = this;
                var keywords = data.keywords instanceof Array ? data.keywords : [], 
                    html = '';
                
                if (keywords.length) {
                    keywords.forEach(function(item) {
                        if (item != 'undefined' || item != '') {
                            html += vcui.template('“<span class="point">{{item}}</span>”  ', {item:item});
                        }
                    });
                    
                    html += '검색 결과';
                    self.$solutionsResult.find('.tit-wrap h3.tit').html(html);
                }
            },
            setFilter: function(data) {
                var self = this;
                var param = self.param,
                    filterArr = data.filterList instanceof Array ? data.filterList : [],
                    htmlPC = htmlM = '';

                self.$solutionsFilter.find('.filter-list').empty();

                if (filterArr.length) {
                    filterArr.forEach(function(item) {
                        if (item.name == param.topicNm) {
                            item.active = true;
                        } else {
                            item.active = false;
                        }
                        htmlPC += vcui.template(filterTemplate, item);
                        htmlM += vcui.template(filterOptionTemplate, item);
                    });
                    self.$solutionsFilter.find('.filter-list').html(htmlPC);
                    self.$selectTopic.html(htmlM);
                    self.$selectTopic.vcSelectbox('update');
                }
            },
            setSubFilter: function(data) {
                var self = this;
                var param = self.param;
                var $target = self.$solutionsFilter.find('.filter-link[data-code="'+ param.topic +'"]'),
                    subFilterArr = data.subFilterList instanceof Array ? data.subFilterList : [],
                    htmlPC = htmlM = '';
                
                if (subFilterArr.length) {
                    $target.after(vcui.template(subFilterHeadTemplate, {
                        subTopicName: param.topicNm
                    }));

                    subFilterArr.forEach(function(item) {
                        if (item.name == param.subTopicNm) {
                            item.active = true;
                        } else {
                            item.active = false;
                        }
                        htmlPC += vcui.template(subFilterTemplate, item);
                        htmlM += vcui.template(filterOptionTemplate, item);
                    });

                    $target.siblings('.sub-depth').find('ul').html(htmlPC);
                    self.$selectSubTopic.html(htmlM);
                    self.$selectSubTopic.prop('disabled', false);
                    self.$selectSubTopic.vcSelectbox('update');
                }
            },
            setSolutionsList: function(data) {
                var self = this;
                var arr = data.listData instanceof Array ? data.listData : [],
                    html = '';
                
                self.$solutionsResult.find('.list-wrap .list').empty();

                if (arr.length) {
                    arr.forEach(function(item) {
                        html += vcui.template(solutionsTemplate, item);
                    });

                    self.$solutionsResult.find('.list-wrap .list').html(html);
                    self.$solutionsResult.find('.pagination').pagination('update', data.listPage);
                
                    self.$solutionsResult.find('.list-wrap').show();
                    self.$solutionsResult.find('.pagination').show();
                    self.$solutionsResult.find('.no-data').hide();
                } else {
                    self.$solutionsResult.find('.list-wrap').hide();
                    self.$solutionsResult.find('.pagination').hide();
                    self.$solutionsResult.find('.no-data').show();
                }

                self.$solutionsResult.find('#solutionsCount').html(data.listPage.totalCount);
            },
            selectFilter: function(code) {
                var self = this;
                var flag = code ? true : false,
                    $target = self.$solutionsFilter.find('.filter-link[data-code="'+ code +'"]');

                // pc
                $target.parent('li').addClass('on').siblings('li').removeClass('on');
                $target.closest('.filter-list')[flag ? 'addClass' : 'removeClass']('open');
            },
            selectSubFilter: function(code) {
                var self = this;
                var $target = self.$solutionsFilter.find('.filter-link[data-code="'+ code +'"]');
            
                $target.parent('li').addClass('on').siblings('li').removeClass('on');
            },
            selectFilterMobile: function(code) {
                var self = this;

                // mobile
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

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(self.solutionsUrl, self.param, function(result) {
                    var data = result.data,
                        param = result.param;

                    self.setSubFilter(data);
                    self.setSolutionsList(data);
                    self.setKeyword(param);
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
                var self = this;

                self.keywords = [];
                self.param = self.options;

                self.$solutionsFilter.find('.open, .on').removeClass('open on');
                self.$solutionsFilter.find('.sub-depth').remove();

                self.$selectTopic.vcSelectbox('selectedIndex', 0);
                $('#recommProduct').hide();
                $('#serviceMenu').hide();
                $('#centerFind').hide();

                $('.info-banner').remove();

                self.$cont.commonModel('next', self.$stepModel);
            },
            bindEvent: function() {
                var self = this;

                self.$cont.on('complete', function(e, data) { 
                    var param = {
                        category: data.category,
                        categoryNm: data.categoryName,
                        subCategory: data.subCategory,
                        subCategoryNm: data.subCategoryName,
                        modelCode: data.modelCode,
                        productCode: data.productCode,
                        page: 1
                    };
                    
                    self.param = $.extend(self.param, param); 
                    self.completeModel();
                }).on('reset', function(e) {
                    self.reset();
                });

                // filter
                self.$solutionsFilter.on('click', '.filter-list > li > .filter-link', function() {
                    var $this = $(this),
                        code = $this.data('code'), name = $this.data('name'),
                        param = {
                            page: 1,
                            topic: code,
                            topicNm: name,
                            subTopic: '',
                            subTopicNm: 'All'
                        };

                    self.param = $.extend(self.param, param);
    
                    if ($this.siblings('.sub-depth').length < 1) {
                        self.resetSubFilter();
                        self.requestData(this);
                    }

                    self.selectFilter(code);
                    self.selectFilterMobile(code);
                });

                // sub filter
                self.$solutionsFilter.on('click', '.sub-depth .filter-link', function() {
                    var code = $(this).data('code'), name = $(this).data('name'),
                        param = {
                            page:1,
                            subTopic: code,
                            subTopicNm: name
                        };
                    
                    self.param = $.extend(self.param, param);

                    self.requestData();
                    self.selectSubFilter(code);
                    self.selectSubFilterMobile(code);
                });

                // 증상선택 돌아가기
                self.$solutionsFilter.on('click', '.btn-back', function() {
                    $(this).closest('.filter-list').removeClass('open');
                });

                // mobile filter
                self.$selectTopic.on('change', function() {
                    var code = $(this).val(), name = $(this).find('option:selected').text(),
                        param = {
                            page: 1,
                            topic: code,
                            topicNm: name,
                            subTopic: '',
                            subTopicNm: 'All'
                        };

                    self.param = $.extend(self.param, param);

                    self.resetSubFilter();
                    self.requestData();
                    self.selectFilter(code);
                });

                // mobile sub filter
                self.$selectSubTopic.on('change', function() {
                    var code = $(this).val(), name = $(this).find('option:selected').text(),
                        param = {
                            page: 1,
                            subTopic: code,
                            subTopicNm: name
                        };

                    self.param = $.extend(self.param, param);
                    
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
                        
                    self.param = $.extend(self.param, param);
                    self.requestData();
                });

                // pagination
                self.$solutionsResult.find('.pagination').on('pageClick', function(e) {
                    var param = {
                        page: e.page
                    }

                    self.param = $.extend(self.param, param);
                    self.requestData();
                });

                self.$keywordWrap.on('autocomplete', function(e, param, url, callback) {
                    var param =  $.extend(self.param, param);
                    lgkorUI.requestAjaxData(url, param, function(result) {
                        callback(result.data);
                    });
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
                    var value = keyword || self.$keywordInput.val(),
                        isChecked = self.param.research,
                        param = {
                            page:1
                        };
                        
                    if (!isChecked) {
                        self.resetFilter();
                        param['topic'] = '';
                        param['topicNm'] = 'All';
                        param['subTopic'] = '';
                        param['subTopicNm'] = 'All';
                        self.keywords = [];
                        self.keywords.push(value);
                    } else {
                        if (self.keywords.indexOf(value) != -1) {
                            self.keywords.splice(self.keywords.indexOf(value), 1);
                        }
                        self.keywords.unshift(value);
                    }

                    param['keywords'] = self.keywords;

                    self.param = $.extend(self.param, param);

                    self.requestData();
                });

                $('.search-layer').on('click', '.keyword-box a', function(e) {
                    e.preventDefault();
                    self.$keywordBtn.trigger('click', [$(this).text().trim()]);      
                });
            }
        }
        
        solutions.initialize();
    });
})();