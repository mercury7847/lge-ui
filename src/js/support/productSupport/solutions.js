(function() {
    var filterTemplate = 
        '{{#each (item, index) in filterList}}' +
        '{{# if (index == 0) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<button type="button" class="filter-link" data-code="{{item.code}}" data-name="{{item.topic}}">{{item.topic}}</button>' +
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
        '<button type="button" class="filter-link" data-code="{{item.code}}" data-name="{{item.topic}}">{{item.topic}}</button>' +
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
            form: document.getElementById('submitForm'),
            initialize: function() {
                this.$form = $(this.form);

                $('.ui_anchor_sticky').vcSticky({
                    usedAnchor: "true"
                });

                this.bindEvent();
            },
            filterSelect: function(code) {
                var self = this;

                self.$form.find('#topic').val(code);
                self.$form.find('#subTopic').val('');

                $('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').removeClass('on');

                $('#select-symptom').val(code);

                if (code !== 'ALL') {
                    $('#select-symptom2').prop('disabled', false);

                    self.subFilterList(code);
                } else {
                    $('.filter-link[data-code="'+ code +'"]').closest('.filter-list').removeClass('open');
                    $('.sub-depth').remove();

                    $('#select-symptom2').prop('disabled', true);
                    $('#select-symptom2').html('<option class="placeholder">증상을 선택해주세요.</option>');
                }

                $('#select-symptom').vcSelectbox('update');
                $('#select-symptom2').vcSelectbox('update');
            },
            subFilterSelect: function(code) {
                var self = this;

                self.$form.find('#subTopic').val(code);
            
                $('.filter-link[data-code="'+ code +'"]').parent('li').addClass('on').siblings('li').removeClass('on');
                $('#select-symptom2').val(code);
                $('#select-symptom2').vcSelectbox('update');
            },
            solutionsList: function() {
                var self = this,
                    param = self.$form.serialize();

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost('/lg5-common/data-ajax/support/solutionsList.json', param, function(result){
                    var data = result.data,
                        html = '';
                            
                    data.listData.forEach(function(item) {
                        html += vcui.template(solutionsTemplate, item);
                    });

                    $('#count').html(data.pageInfo.totalCount);
                    $('#solutionsContent').html(html);
                    $('.pagination').pagination('update', data.listPage);

                    lgkorUI.hideLoading();
                });
            },
            filterList: function() {
                var self = this,
                    param = self.$form.serialize();

                $.ajax({
                    url: '/lg5-common/data-ajax/support/filterList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: param,
                    beforeSend: function(xhr) {
                        // loading bar start
                    },
                    success: function(d) {
                        if (d.status) {
                            var data = d.data,
                                html = "";
                            
                            html += vcui.template(filterTemplate, data);

                            $('#filterContent').html(html);
                            $('#filterContent').find('.filter-link').on('click', function() {
                                var _this = this,
                                    $this = $(_this);
                                
                                self.filterSelect($this.data('code'));
                                self.solutionsList();
                            });

                            $('#select-symptom').html(vcui.template(optionTemplate, data));
                            $('#select-symptom').vcSelectbox('update');
                        }
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete: function() {
                        // loading bar end
                    }
                });
            },
            subFilterList: function(code) {
                var self = this,
                    $el = $('.filter-link[data-code="'+ code +'"]');
                    param = self.$form.serialize();

                $.ajax({
                    url: '/lg5-common/data-ajax/support/subFilterList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: param,
                    beforeSend: function(xhr) {
                        // loading bar start
                    },
                    success: function(d) {
                        if (d.status) {
                            var data = d.data,
                                html = "";
                            
                            html += vcui.template(subFilterTemplate, data);

                            $el.parent().append(html);
                            $el.closest('.filter-list').addClass('open');
                            $el.parent().find('.sub-depth .filter-link').on('click', function() {
                                var _this = this,
                                    $this = $(_this);
                                
                                self.subFilterSelect($this.data('code'));
                                self.solutionsList();
                            });

                            $('#select-symptom2').html(vcui.template(optionTemplate, data));
                            $('#select-symptom2').vcSelectbox('update');
                        }
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete: function() {
                        // loading bar end
                    }
                });
            },

            bindEvent: function() {
                var self = this;

                $('#selectCount').on('change', function() {
                    var value = $(this).val();

                    self.$form.find('#viewCount').val(value);
                    self.solutionsList();
                });
                $('#selectOrder').on('change', function() {
                    var value = $(this).val();
                    
                    self.$form.find('#orderBy').val(value);
                    self.solutionsList();
                });

                $('#select-symptom').on('change', function() {
                    var $this = $(this),
                        value = $this.val();

                    self.filterSelect(value);
                    self.solutionsList();
                });
                $('#select-symptom2').on('change', function() {
                    var $this = $(this),
                        value = $this.val();
                    
                    self.subFilterSelect(value);
                    self.solutionsList();
                });

                $('.filter-list').on('click', '.btn-back', function() {
                    $(this).closest('.filter-list').removeClass('open');
                    $(this).closest('.sub-depth').remove();
                });

                $('.pagination').on('page_click', 'button', function(e, page) {
                    self.$form.find('#page').val(page);

                    self.solutionsList();
                });
            }
        }
        
        solutions.initialize();
    });
})();