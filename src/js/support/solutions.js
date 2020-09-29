(function() {
    var filterTemplate = 
        '{{#each (item, index) in filterList}}' +
        '{{# if (index == 0) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<a href="#" class="filter-link">{{item.topic}}</a>' +
        '<div class="sub-depth">' +
        '</div>' +
        '</li>' +
        '{{/each}}';

    var subFilterTemplate = 
        '<div class="filter-head">' +
        '<button type="button" class="btn-back"><span class="blind">뒤로 가기</span></button>' +
        '<strong class="tit">{{title}}</strong>' +
        '</div>' +
        '<ul>' +
        '{{#each item in filterList}}' +
        '<li>' +
        '<a href="#" class="filter-link">{{item.topic}}</a>' +
        '</li>' +
        '{{/each}}' +
        '</ul>';

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
            init: function() {
                vcui.require(['ui/carousel'], function () {
                    $('.my-products-wrap .slide-wrap').vcCarousel({
                        slidesToShow: 3,
                        arrows: true,
                        responsive: [{
                            breakpoint:768,
                            settings: {
                                slidesToShow: 1
                            }
                        }]
                    });

                    $('.supplies-wrap .slide-wrap').vcCarousel({
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

                this.setEventListener();
                this.filterList(); //삭제 예정
                this.solutionsList(); //삭제 예정
            },
            solutionsList: function(el, param) {
                $.ajax({
                    url: '/lg5-common/data-ajax/support/solutionsList.json',
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
                            
                            data.solutionsList.forEach(function(item) {
                                html += vcui.template(solutionsTemplate, item);
                            });

                            $('#count').html(data.pageInfo.totalCount);
                            $('#solutionsContent').html(html);
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
            filterList: function(param) {
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
            subFilterList: function(el, param) {
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

                $('.sort-select-layer button').on('click', function() {
                    var $this = $(this);

                    $this.closest('.sort-select').vcDropdown('close');
                    $this.closest('.sort-select').find('.sort-select-link span:first-child').html($this.text());
                    $this.parent().addClass('active');
                    $this.parent().siblings().removeClass('active');
                
                    self.solutionsList();
                });
                $('#filterContent').on('click', '.filter-link', function() {
                    var $this = $(this),
                        $subDepth = $(this).siblings('.sub-depth'),
                        param = {};

                    if (!$subDepth.length) {
                        param = {
                            
                        };

                        self.solutionsList(this, param);
                        $this.parent('li').addClass('on');
                        $subDepth.parent('li').addClass('on');
                    } else {
                        param = {
                            
                        };

                        self.subFilterList(this, param);
                        $subDepth.show();
                        $this.closest('.filter-list').addClass('open');
                    }
                });
                $('#filterContent').on('click', '.btn-back', function() {
                    $(this).parent('.sub-depth').hide();
                    $(this).closest('.filter-list').removeClass('on');
                });
            }
        }
        
        solutions.init();
    });
})();