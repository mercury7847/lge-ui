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
        '<div class="filter-head">' +
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
        '<li class="video-item">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<a href="#">' +
        '<strong class="tit">{{title}}</strong>' +
        '<p class="topic">{{topic}}</p>' +
        '<ul class="infos">' +
        '<li>{{date}}</li>' +
        '<li>' +
        '<span class="info-view">{{view}}</span>' +
        '</li>' +
        '</ul>' +
        '{{# if (typeof video != "undefined" && video === true) { #}}' +
        '<span class="icon-movie"><span class="blind">동영상 가이드 컨텐츠</span></span>' +
        '{{# } #}}' +
        '</a>' +
        '</li>';

    $(window).ready(function() {
        var solutions = {
            form: document.getElementById('submitForm'),
            init: function() {
                vcui.require(['ui/carousel'], function () {
                    $('.recommand-wrap .slide-wrap').vcCarousel({
                        slidesToShow: 3,
                        arrows: true,
                        responsive: [{
                            breakpoint:768,
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
            solutionsList: function() {
                var self = this,
                    param = self.$form.serialize();

                $.ajax({
                    url: '/lg5-common/data-ajax/support/solutionsList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: param,
                    beforeSend: function(xhr) {
                        CS.UI.elem.$body.ajaxLoad('start');
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
                        CS.UI.elem.$body.ajaxLoad('end');
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
                                
                                self.$form.find('#topic').val($this.data('code'));
                                self.$form.find('#subTopic').val('');
            
                                $this.parent('li').addClass('on').siblings('li').removeClass('on');
                                
                                if ($this.data('name') !== 'ALL') {
                                    self.subFilterList(_this);
                                }
                                self.solutionsList();
                            });
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
            subFilterList: function(el) {
                var self = this,
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

                            $(el).parent().append(html);
                            $(el).closest('.filter-list').addClass('open');
                            $(el).parent().find('.sub-depth .filter-link').on('click', function() {
                                var _this = this,
                                    $this = $(_this);
            
                                self.$form.find('#subTopic').val($this.data('code'));
            
                                $this.parent('li').addClass('on').siblings('li').removeClass('on');
                                
                                self.solutionsList();
                            });
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