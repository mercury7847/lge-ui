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
            init: function() {
                vcui.require(['ui/carousel'], function () {
                    $('.recommand-wrap .slide-wrap').vcCarousel({
                        slidesToShow: 3,
                        arrows: true,
                        responsive: [{
                            breakpoint:1024,
                            settings: {
                                slidesToShow: 2
                            }
                        },{
                            breakpoint:767,
                            settings: {
                                slidesToShow: 1
                            }
                        }]
                    });
                });

                this.$form = $(this.form);

                this.setEventListener();
                this.filterList(); //삭제 예정
                this.solutionsList(); //삭제 예정
                $('.pagination').pagination();
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

                $.ajax({
                    url: '/lg5-common/data-ajax/support/solutionsList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: param,
                    beforeSend: function(xhr) {
                        lgkorUI.showLoading();
                    },
                    success: function(d) {
                        if (d.status) {
                            var data = d.data,
                                html = "";
                            
                            data.solutionsList.forEach(function(item) {
                                html += vcui.template(solutionsTemplate, item);
                            });

                            $('#count').html(data.pageInfo.totalCount);
                            $('#solutionsContent').html(html);
                            $('.pagination').pagination('update', data.pageInfo);
                        }
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete: function() {
                        lgkorUI.hideLoading();
                    }
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

            setEventListener: function() {
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
        
        solutions.init();
    });
})();