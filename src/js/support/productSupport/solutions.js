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
        '<strong class="tit">{{title}}</strong>' +
        '</div>' +
        '<ul>' +
        '{{#each (item, index) in filterList}}' +
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
        '<a href="#" class="item">' +
        '<p class="tit">{{title}}</p>' +
        '<p class="desc">{{topic}}</p>' +
        '<ul class="options">' +
        '<li>{{date}}</li>' +
        '<li>조회 {{view}}</li>' +
        '</ul>' +
        '{{# if (typeof video != "undefined" && video === true) { #}}' +
        '<span class="icon-movie"><span class="blind">동영상 가이드 컨텐츠</span></span>' +
        '{{# } #}}' +
        '</a>' +
        '</li>';

    var optionTemplate =
        '{{#each (item, index) in filterList}}' +
        '<option value="{{item.code}}">' +
        '{{item.topic}}' +
        '</option>' +
        '{{/each}}';

    $(window).ready(function() {
        var solutions = {
            initialize: function() {
                this.param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                this.$wrap = $('.solutions-wrap');
                this.$filter = this.$wrap.find('.filter-box');
                this.$mFilter = this.$wrap.find('.mobile-filter-box');
                this.$result = this.$wrap.find('.result-box');

                $('.ui_anchor_sticky').vcSticky({
                    usedAnchor: "true",
                    actClass: "on"
                });

                this.bindEvent();
            },
            selectFilter: function(code) {
                var self = this;

                self.$filter.find('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').removeClass('on');
                
                self.$filter.find('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').each(function() {
                    if ($(this).find('.sub-depth').length) {
                        $(this).find('.sub-depth').remove();
                    }
                });

                self.$mFilter.find('#symptom').val(code);

                if (code !== 'All') {
                    self.$filter.find('.filter-link[data-code="'+ code +'"]').closest('.filter-list').addClass('open');
                    self.$mFilter.find('#subSymptom').prop('disabled', false);
                } else {
                    self.$filter.find('.filter-link[data-code="'+ code +'"]').closest('.filter-list').removeClass('open');
                    self.$filter.find('.sub-depth').remove();

                    self.$mFilter.find('#subSymptom').prop('disabled', true);
                    self.$mFilter.find('#subSymptom').html('<option class="placeholder">증상을 선택해주세요.</option>');
                }

                self.$mFilter.find('#symptom').vcSelectbox('update');
                self.$mFilter.find('#subSymptom').vcSelectbox('update');
            },
            selectSubFilter: function(code) {
                var self = this;
            
                self.$filter.find('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').removeClass('on');
                self.$mFilter.find('#subSymptom').val(code);
                self.$mFilter.find('#subSymptom').vcSelectbox('update');
            },
            setFilter: function(data) {
                var self = this,
                    listArr = data instanceof Array ? data : [],
                    pcHtml = '',
                    mHtml = '';

                if (listArr.length) {
                    pcHtml = vcui.template(filterTemplate, data);
                    mHtml = vcui.template(optionTemplate, data);

                    self.$filter.find('.filter-list').eq(0).html(pcHtml);

                    self.$mFilter.find('#symptom').html(mHtml);
                    self.$mFilter.find('#symptom').vcSelectbox('update');
                }
            },
            setSubFilter: function(code, target) {
                var self = this,
                    $target = $(target),
                    url = self.$wrap.data('subFilterAjax'),
                    param = {
                        topic: code,
                        productCode: $('#submitForm').find('#productCode').val()
                    };

                lgkorUI.requestAjaxDataPost(url, param, function(result){
                    var listArr = result.data.filterList instanceof Array ? result.data.filterList : [],
                        pcHtml = '',
                        mHtml = '';
                
                    if (listArr.length) {
                        pcHtml = vcui.template(subFilterTemplate, result.data);
                        mHtml = vcui.template(optionTemplate, result.data);
    
                        $target.after(pcHtml);
    
                        self.$mFilter.find('#subSymptom').html(mHtml);
                        self.$mFilter.find('#subSymptom').vcSelectbox('update');
                    }
                });
            },
            requestData: function() {
                var self = this,
                    url = self.$wrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, self.param, function(result){
                    var data = result.data,
                        html = '';
                            
                    data.listData.forEach(function(item) {
                        html += vcui.template(solutionsTemplate, item);
                    });

                    self.$result.find('#solutionsCount').html(data.listPage.totalCount);
                    self.$result.find('.list-wrap .list').html(html);
                    self.$result.find('.pagination').pagination('update', data.listPage);

                    lgkorUI.hideLoading();
                });
            },
            reset: function() {
                var self = this;

                self.$filter.find('.open, .on').removeClass('open on');
                self.$filter.find('.sub-depth').remove();

                self.$wrap.find('#topic').val('All');
                self.$wrap.find('#subTopic').val('');
            },
            bindEvent: function() {
                var self = this;

                // keyword search
                self.$result.find('.btn-search').on('click', function() {
                    var value = self.$result.find('#inputKeyword').val(),
                        resultFlag = self.$result.find('#research').is(':checked'),
                        param = {};
                        
                    if (!resultFlag) {
                        self.reset();
                    }

                    self.$wrap.find('#keyword').val(value);

                    param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    self.param = $.extend(param, {
                        page: 1
                    });
                    self.requestData();
                });

                // list order by
                self.$result.find('#selectOrder').on('change', function() {
                    var value = $(this).val(),
                        param = {};
                        
                    self.$wrap.find('#orderBy').val(value);
                    param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    self.param = $.extend(param, {
                        page: 1
                    });
                    
                    self.requestData();
                });

                // pagination
                self.$result.find('.pagination').on('pageClick', function(e) {
                    var param = lgkorUI.getHiddenInputData('', 'solutions-wrap');

                    self.param = $.extend(param, {
                        page: e.page
                    })

                    self.requestData();
                });

                // filter
                self.$filter.on('click', '.filter-list > li > .filter-link', function() {
                    var code = $(this).data('code'),
                        param = {};
                    
                    self.$wrap.find('#topic').val(code);
                    if (!$(this).siblings('.sub-depth').length) {
                        self.$wrap.find('#subTopic').val('');
                    }
                    param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    self.param = $.extend(param, {
                        page: 1
                    });

                    self.selectFilter(code, this);
                    if ($(this).siblings('.sub-depth').length < 1) {
                        self.setSubFilter(code, this);
                        self.requestData();
                    } else {
                        $(this).siblings('.sub-depth').show();
                    }
                });

                // sub filter
                self.$filter.on('click', '.sub-depth .filter-link', function() {
                    var code = $(this).data('code'),
                        param = {};
                    
                    self.$wrap.find('#subTopic').val(code);
                    param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    self.param = $.extend(param, {
                        page: 1
                    });

                    self.selectSubFilter(code);
                    self.requestData();
                });

                // 증상선택 돌아가기
                self.$filter.on('click', '.btn-back', function() {
                    $(this).closest('.filter-list').removeClass('open');
                    $(this).closest('.sub-depth').hide();
                });

                // mobile filter
                self.$result.find('#symptom').on('change', function() {
                    var value = $(this).val(),
                        param = {};

                    self.$wrap.find('#topic').val(value);
                    self.$wrap.find('#subTopic').val('');
                    param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    self.param = $.extend(param, {
                        page: 1
                    });

                    self.selectFilter(value);
                    self.requestData();
                });
                self.$result.find('#subSymptom').on('change', function() {
                    var value = $(this).val(),
                        param = {};

                    self.$wrap.find('#subTopic').val(value);
                    param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    self.param = $.extend(param, {
                        page: 1
                    });
                    
                    self.selectSubFilter(value);
                    self.requestData();
                });
            }
        }
        
        solutions.initialize();
    });
})();