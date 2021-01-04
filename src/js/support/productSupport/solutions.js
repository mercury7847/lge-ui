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

    var optionTemplate =
        '{{#each (item, index) in filterList}}' +
        '<option value="{{item.code}}">' +
        '{{item.name}}' +
        '</option>' +
        '{{/each}}';

    $(window).ready(function() {
        var solutions = {
            initialize: function() {
                // this.param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                this.$wrap = $('.solutions-wrap');
                this.$filter = this.$wrap.find('.filter-box');
                this.$filterM = this.$wrap.find('.mobile-filter-box');
                this.$result = this.$wrap.find('.result-box');

                this.$symptom = this.$wrap.find('#symptom');
                this.$subSymptom = this.$wrap.find('#subSymptom');

                this.$topic = this.$wrap.find('#topic');
                this.$subTopic = this.$wrap.find('#subTopic');
                this.$keyword = this.$wrap.find('#keyword');
                this.$orderBy = this.$wrap.find('#orderBy');

                this.param = $('#submitForm').serializeObject();
                this.param.orderBy = $('#selectOrder').val();

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

                if (code !== 'All') {
                    self.$filter.find('.filter-link[data-code="'+ code +'"]').closest('.filter-list').addClass('open');
                    self.$subSymptom.prop('disabled', false);
                } else {
                    self.$filter.find('.filter-link[data-code="'+ code +'"]').closest('.filter-list').removeClass('open');
                    self.$filter.find('.sub-depth').remove();

                    self.$subSymptom.prop('disabled', true);
                    self.$subSymptom.html('<option class="placeholder">증상을 선택해주세요.</option>');
                }

                self.$symptom.vcSelectbox('update');
                self.$subSymptom.vcSelectbox('update');
            },
            selectSubFilter: function(code) {
                var self = this;
            
                self.$filter.find('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').removeClass('on');
                self.$subSymptom.val(code);
                self.$subSymptom.vcSelectbox('update');
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

                    self.$symptom.html(mHtml);
                    self.$symptom.vcSelectbox('update');
                }
            },
            setSubFilter: function(code, target) {
                var self = this,
                    $target = target ? $(target) : null,
                    url = self.$wrap.data('subFilterAjax'),
                    param = {
                        topic: code,
                        productCode: $('#submitForm').find('#productCode').val()
                    };

                if ($target) {
                    param.topicNm = $target.data('name');
                }

                lgkorUI.requestAjaxDataPost(url, param, function(result){
                    var listArr = result.data.filterList instanceof Array ? result.data.filterList : [],
                        pcHtml = '',
                        mHtml = '';
                
                    if (listArr.length) {
                        pcHtml = vcui.template(subFilterTemplate, result.data);
                        mHtml = vcui.template(optionTemplate, result.data);
    
                        $target && $target.after(pcHtml);
    
                        self.$subSymptom.html(mHtml);
                        self.$subSymptom.vcSelectbox('update');
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

                self.$symptom.vcSelectbox('selectedIndex', 0);

                self.$topic.val('All');
                self.$subTopic.val('');
            },
            bindEvent: function() {
                var self = this;

                // filter
                self.$filter.on('click', '.filter-list > li > .filter-link', function() {
                    var $this = $(this),
                        code = $this.data('code'),
                        param = {
                            page: 1,
                            topic: code,
                            subTopic: 'All'
                        };
                    
                    self.$topic.val(code);
                    if (!$(this).siblings('.sub-depth').length) {
                        self.$subTopic.val('All');
                    }
                    
                    // param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    // self.param = $.extend(param, {
                    //     page: 1
                    // });

                    self.param = $.extend(self.param, param);

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
                        param = {
                            page:1,
                            subTopic: code,
                            subTopicNm: $(this).data('name')
                        };
                    
                    self.$subTopic.val(code);
                    // param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    // self.param = $.extend(param, {
                    //     page: 1
                    // });

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
                self.$symptom.on('change', function() {
                    var value = $(this).val(),
                        param = {
                            page: 1,
                            topic: value,
                            subTopic: 'All'
                        };

                    self.$topic.val(value);
                    self.$subTopic.val('All');
                    // param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    // self.param = $.extend(param, {
                    //     page: 1
                    // });

                    self.param = $.extend(self.param, param);

                    self.selectFilter(value);
                    self.setSubFilter(value, this)
                    self.requestData();
                });

                // mobile sub filter
                self.$subSymptom.on('change', function() {
                    var value = $(this).val(),
                        param = {
                            page: 1,
                            subTopic: value
                        };

                    self.$subTopic.val(value);
                    // param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    // self.param = $.extend(param, {
                    //     page: 1
                    // });

                    self.param = $.extend(self.param, param);

                    
                    self.selectSubFilter(value);
                    self.requestData();
                });

                // keyword search
                self.$result.find('.btn-search').on('click', function() {
                    var value = self.$result.find('#inputKeyword').val(),
                        resultFlag = self.$result.find('#research').is(':checked'),
                        param = {
                            page:1,
                        };
                        
                    if (!resultFlag) {
                        self.reset();
                        param['topic'] = 'All';
                        param['subTopic'] = '';
                    }

                    self.$keyword.val(value);
                    param['keyword'] = value;
                    // param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    // self.param = $.extend(param, {
                    //     page: 1
                    // });

                    self.param = $.extend(self.param, param);

                    self.requestData();
                });

                // list order by
                self.$result.find('#selectOrder').on('change', function() {
                    var value = $(this).val(),
                        param = {
                            page: 1,
                            orderBy: value
                        };
                        
                    self.$orderBy.val(value);
                    // param = lgkorUI.getHiddenInputData('', 'solutions-wrap');
                    // self.param = $.extend(param, {
                    //     page: 1
                    // });

                    self.param = $.extend(self.param, param);
                    
                    self.requestData();
                });

                // pagination
                self.$result.find('.pagination').on('pageClick', function(e) {
                    var param = {
                        page: e.page
                    }
                    // var param = lgkorUI.getHiddenInputData('', 'solutions-wrap');

                    // self.param = $.extend(param, {
                    //     page: e.page
                    // })

                    self.param = $.extend(self.param, param);

                    self.requestData();
                });
            }
        }
        
        solutions.initialize();
    });
})();