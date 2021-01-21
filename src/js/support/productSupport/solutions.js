(function() {
    var filterTemplate = 
        '{{#each (item, index) in filterList}}' +
        '{{# if (index == 0) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<button type="button" class="filter-link" data-code="{{item.code}}" data-name="{{item.name}}">{{item.name}}</button>' +
        '</li>' +
        '{{/each}}';

    var subFilterTemplate = 
        '<div class="sub-depth">' +
        '<div class="tit-wrap">' +
        '<button type="button" class="btn-back"><span class="blind">뒤로 가기</span></button>' +
        '<strong class="tit">{{param.topic.name}}</strong>' +
        '</div>' +
        '<ul>' +
        '{{#each (item, index) in data.subFilterList}}' +
        '{{# if (index == 0) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<button type="button" class="filter-link" data-code="{{item.code}}" data-name="{{item.name}}">{{item.name}}</button>' +
        '</li>' +
        '{{/each}}' +
        '</ul>' +
        '</div>';

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

    var filterOptionTemplate =
        '{{#each (item, index) in filterList}}' +
        '<option value="{{item.code}}">' +
        '{{item.name}}' +
        '</option>' +
        '{{/each}}';

    var subFilterOptionTemplate =
        '{{#each (item, index) in subFilterList}}' +
        '<option value="{{item.code}}">' +
        '{{item.name}}' +
        '</option>' +
        '{{/each}}';

    var keywordsTemplate = 
        '{{#each item in keywords}}' +
        '“<span class="point">{{item}}</span>” ' +
        '{{/each}}' +
        '검색 결과';

    var recommProductItemTemplate =         
        '<div class="slide-conts ui_carousel_slide">' +
            '<div class="item">' +
                '<div class="item-inner">' +
                    '<div class="product-image">' +
                        '<img src="{{imgUrl}}" alt="">' +
                    '</div>' +
                    '<div class="product-info">' +
                        // '<div class="flag-wrap bar-type">' +
                        //     '{{#each item in flags}}' +
                        //     '<span class="flag">{{item}}</span>' +
                        //     '{{/each}}' +
                        // '</div>' +
                        '<div class="product-name">' +
                            '<p class="name"><a href="#" class="name">{{name}}</a></p>' +
                            '<p class="model">{{modelName}}</p>' +
                        '</div>' +
                        // '<div class="product-price">' +
                        //     '<div class="discount">' +
                        //         '<span class="blind">할인가격</span>' +
                        //         '<span class="price">{{discountPrice}}원</span>' +
                        //     '</div>' +
                        //     '<div class="original">' +
                        //         '<span class="blind">원가</span>' +
                        //         '<span class="price">{{price}}원</span>' +
                        //     '</div>' +
                        // '</div>' +
                    '</div>' +
                    // '<div class="product-button">' +
                    //     '<button type="button" class="btn border"><span>장바구니에 담기</span></button>' + 
                    // '</div>' +
                '</div>' +
            '</div>' +
        '</div>';
    var serviceMenuTemplate = 
        '<li>' +
            '<a href="{{url}}">' +
                '<strong class="tit">{{name}}</strong>' +
            '</a>' +
        '</li>';
        

    $(window).ready(function() {
        var solutions = {
            initialize: function() {
                var self = this;

                self.$cont = $('.contents');
                self.$selectedModelBar = self.$cont.find('.prod-selected-wrap');
                self.$myModelArea = self.$cont.find('.my-product-wrap');

                self.$stepArea = self.$cont.find('.step-area');
                self.$stepModel = self.$cont.find('#stepModel');
                self.$stepInput = self.$cont.find('#stepInput');

                self.$wrap = $('.solutions-wrap');
                self.$filter = self.$wrap.find('.filter-box');
                self.$filterM = self.$wrap.find('.mobile-filter-box');
                self.$result = self.$wrap.find('.result-box');

                self.$topic = self.$wrap.find('#topic');
                self.$subTopic = self.$wrap.find('#subTopic');
                self.$keyword = self.$wrap.find('#keyword');
                self.$searchBtn = self.$wrap.find('.keyword-search .btn-search');
                self.$pagination = self.$wrap.find('.pagination');
                self.$orderBy = self.$wrap.find('#orderBy');

                self.param = {};
                self.param['keyword'] = '';
                self.param['topic'] = 'All';
                self.param['subTopic'] = 'All';
                self.param['orderBy'] = $('#orderBy').val();
                self.param['page'] = 1;
                self.solutionsUrl = self.$wrap.data('solutionsUrl');

                self.$pagination.pagination();
                $('.ui_search').search();
                self.$cont.commonModel({
                    register: {}
                });

                self.bindEvent();                
            },
            setRecommProduct: function(data){
                var $productslider = $('.product-slider');
                var html = '';
                
                data.recommProduct.map(function(obj){
                    html += vcui.template(recommProductItemTemplate, obj);
                });

                $productslider.find('.slide-track').html($(html));

                lgkorUI.initProductSlider();
                $('#recommProduct').show();
            },
            setServiceMenu: function(data) {
                var html = '';

                data.serviceMenu.map(function(obj){
                    html += vcui.template(serviceMenuTemplate, obj);
                });

                $('.service-list').html(html);
                $('#serviceMenu').show();
            },
            selectFilter: function(code) {
                var self = this;

                self.$filter.find('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').removeClass('on');
                self.$filter.find('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').each(function() {
                    if ($(this).find('.sub-depth').length) {
                        $(this).find('.sub-depth').remove();
                    }
                });

                if (code !== 'All') {
                    self.$filter.find('.filter-link[data-code="'+ code +'"]').closest('.filter-list').addClass('open');
                    self.$subTopic.prop('disabled', false);
                } else {
                    self.$filter.find('.filter-link[data-code="'+ code +'"]').closest('.filter-list').removeClass('open');
                    self.$filter.find('.sub-depth').remove();

                    self.$subTopic.prop('disabled', true);
                    self.$subTopic.html('<option class="placeholder">증상을 선택해주세요.</option>');
                }

                self.$topic.vcSelectbox('update');
                self.$subTopic.vcSelectbox('update');
            },
            selectSubFilter: function(code) {
                var self = this;
            
                self.$filter.find('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').removeClass('on');
                self.$subTopic.val(code);
                self.$subTopic.vcSelectbox('update');
            },
            setFilter: function(data) {
                var self = this,
                    listArr = data instanceof Array ? data : [],
                    pcHtml = '',
                    mHtml = '';

                if (listArr.length) {
                    pcHtml = vcui.template(filterTemplate, data);
                    mHtml = vcui.template(filterOptionTemplate, data);

                    self.$filter.find('.filter-list').eq(0).html(pcHtml);

                    self.$topic.html(mHtml);
                    self.$topic.vcSelectbox('update');
                }
            },
            requestData: function(target) {
                var self = this;

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(self.solutionsUrl, self.param, function(result){
                    var data = result.data,
                        $target = target ? $(target) : null,
                        arr = data.listData instanceof Array ? data.listData : [],
                        keywordArr = result.param.keywords instanceof Array ? result.param.keywords : [],
                        subfilterArr = (data.subFilterList && data.subFilterList instanceof Array) ? data.subFilterList : [],
                        html = '', keywordsHtml = '', pcHtml = '', mHtml = '';
                    
                    self.$result.find('.list-wrap .list').empty();

                    if (arr.length) {
                        arr.forEach(function(item) {
                            html += vcui.template(solutionsTemplate, item);
                        });

                        self.$result.find('.list-wrap .list').html(html);
                        self.$result.find('.pagination').pagination('update', data.listPage);
                    
                        self.$result.find('.list-wrap').show();
                        self.$result.find('.pagination').show();
                    } else {
                        self.$result.find('.list-wrap').hide();
                        self.$result.find('.pagination').hide();
                    }

                    if (keywordArr.length) {
                        keywordsHtml = vcui.template(keywordsTemplate, result.param);
                        self.$result.find('.tit-wrap h3.tit').html(keywordsHtml);
                    }

                    if (subfilterArr.length) {
                        pcHtml = vcui.template(subFilterTemplate, result);
                        mHtml = vcui.template(subFilterOptionTemplate, result.data);
    
                        $target && $target.after(pcHtml);
    
                        self.$subTopic.html(mHtml);
                        self.$subTopic.vcSelectbox('update');
                    }
                    
                    self.$result.find('#solutionsCount').html(data.listPage.totalCount);
                    
                    lgkorUI.hideLoading();
                });
            },
            resetFilter: function() {
                var self = this;

                self.$filter.find('.open, .on').removeClass('open on');
                self.$filter.find('.sub-depth').remove();
                self.$filter.find('.filter-list > li:first-child').addClass('on');
            },
            reset: function() {
                var self = this;

                self.$filter.find('.open, .on').removeClass('open on');
                self.$filter.find('.sub-depth').remove();

                self.$topic.vcSelectbox('selectedIndex', 0);
                $('#recommProduct').hide();
                $('#serviceMenu').hide();
                $('#centerFind').hide();

                self.$cont.commonModel('next', self.$stepModel);
            },
            bindEvent: function() {
                var self = this;

                self.$cont.on('reset', function(e) {
                    self.reset();
                });

                self.$cont.on('complete', function(e, data, url) { 
                    var param = {
                        modelCode: data.modelCode,
                        category: data.category,
                        subCategory: data.subCategory
                    };
                    
                    lgkorUI.requestAjaxDataPost(url, param, function(result) {
                        var resultData = result.data;
    
                        self.$cont.commonModel('updateSummary', {
                            product: [data.categoryName, data.subCategoryName, data.modelCode],
                            reset: 'product'
                        });

                        self.setRecommProduct(resultData);
                        self.setServiceMenu(resultData);
                        $('#centerFind').show();
                    });

                    if (data.subCategory == 'C000136') {
                        $('#windowUpdate').show();
                    } else {
                        $('#windowUpdate').hide();
                    }

                    if (data.subCategory == '1011' || data.subCategory == '1012') {
                        $('#mobileUpdate').show();
                    } else {
                        $('#mobileUpdate').hide();
                    }

                    self.$myModelArea.hide();

                    self.$cont.commonModel('next', self.$stepInput);
                    self.$cont.commonModel('focus', self.$selectedModelBar, function() {
                        self.$selectedModelBar.vcSticky();
                    });
                }).on('reset', function(e) {

                });

                // filter
                self.$filter.on('click', '.filter-list > li > .filter-link', function() {
                    var $this = $(this),
                        code = $this.data('code'),
                        param = {
                            page: 1,
                            topic: code,
                            topicNm: $this.data('name'),
                            subTopic: 'All',
                            subTopicNm: 'All'
                        };

                    self.param = $.extend(self.param, param);

                    self.selectFilter(code, this);
                    if ($(this).siblings('.sub-depth').length < 1) {
                        //self.setSubFilter(code, this);
                        self.requestData(this);
                    } else {
                        $(this).siblings('.sub-depth').show();
                    }
                });

                // sub filter
                self.$filter.on('click', '.sub-depth .filter-link', function() {
                    var code = $(this).data('code'),
                        param = {
                            page:1,
                            subTopic: code,
                            subTopicNm: $(this).data('name')
                        };
                    
                    self.param = $.extend(self.param, param);

                    self.selectSubFilter(code);
                    self.requestData();
                });

                // 증상선택 돌아가기
                self.$filter.on('click', '.btn-back', function() {
                    $(this).closest('.filter-list').removeClass('open');
                    $(this).closest('.sub-depth').hide();
                });

                // mobile filter
                self.$topic.on('change', function() {
                    var value = $(this).val(),
                        param = {
                            page: 1,
                            topic: value,
                            topicNm: $(this).data('name'),
                            subTopic: 'All',
                            subTopicNm: 'All'
                        };

                    self.param = $.extend(self.param, param);

                    self.selectFilter(value);
                    // self.setSubFilter(value, this)
                    self.requestData();
                });

                // mobile sub filter
                self.$subTopic.on('change', function() {
                    var value = $(this).val(),
                        param = {
                            page: 1,
                            subTopic: value,
                            subTopic: $(this).data('name')
                        };

                    self.param = $.extend(self.param, param);
                    
                    self.selectSubFilter(value);
                    self.requestData();
                });


                // keyword input keypress enter
                self.$keyword.on('keyup', function(e){
                    if (e.keyCode == 13){
                        self.$searchBtn.trigger('click');        
                    }
                });

                // keyword search
                self.$searchBtn.on('click', function() {
                    var value = self.$keyword.val(),
                        isChecked = self.$result.find('#research').is(':checked'),
                        param = {
                            page:1,
                        };
                        
                    if (!isChecked) {
                        self.resetFilter();
                        param['topic'] = 'All';
                        param['topicNm'] = 'All';
                        param['subTopic'] = 'All';
                        param['subTopicNm'] = 'All';
                    }

                    param['keyword'] = value;

                    self.param = $.extend(self.param, param);

                    self.requestData();
                });

                // list order by
                self.$orderBy.on('change', function() {
                    var value = $(this).val(),
                        param = {
                            page: 1,
                            orderBy: value
                        };
                        
                    self.$orderBy.val(value);

                    self.param = $.extend(self.param, param);
                    
                    self.requestData();
                });

                // pagination
                self.$result.find('.pagination').on('pageClick', function(e) {
                    var param = {
                        page: e.page
                    }

                    self.param = $.extend(self.param, param);

                    self.requestData();
                });
            }
        }
        
        solutions.initialize();
    });
})();