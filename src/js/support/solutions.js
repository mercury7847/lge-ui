(function() {
    var filterTemplate = 
        '{{#each (item, index) in filterList}}' +
        '{{# if (index == 0) { #}}' +
        '<li class="on">' +
        '{{# } else { #}}' +
        '<li>' +
        '{{# } #}}' +
        '<a href="#" class="filter-link">{{item.topic}}</a>' +
        '{{# if (typeof item.subFilterList != "undefined") { #}}' +
        '<div class="sub-depth">' +
        '<a href="#" class="sub-tit">{{item.topic}}</a>' +
        '<ul>' +
        '{{#each subItem in item.subFilterList}}' +
        '<li>' +
        '<a href="#" class="filter-link">{{subItem.subTopic}}</a>' +
        '</li>' +
        '{{/each}}' +
        '</ul>' +
        '</div>' +
        '{{# } #}}' +
        '</li>' +
        '{{/each}}';

    var subFilterTemplate = 
        '';

    var solutionsTemplate = 
        '<li>' +
        '<a href="#">' +
        '<strong class="tit">{{title}}</strong>' +
        '<p class="topic">{{topic}}</p>' +
        '<ul class="info">' +
        '<li>{{date}}</li>' +
        '<li>' +
        '<span class="info-view">{{view}}</span>' +
        '</li>' +
        '</ul>' +
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
            solutionsList: function() {
                $.ajax({
                    url: '/lg5-common/data-ajax/support/solutionsList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: '',
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
            filterList: function() {
                $.ajax({
                    url: '/lg5-common/data-ajax/support/filterList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: '',
                    beforeSend: function(xhr) {
                        // loading bar start
                    },
                    success: function(d) {
                        if (d.status) {
                            var data = d.data,
                                html = "";
                            
                            // data.filterList.forEach(function(item) {
                            //     html += vcui.template(filterTemplate, item);
                            // });

                            html += vcui.template(filterTemplate, data);

                            $('#filterContent').html(html);
                            //$('#filterContent').find('>li:first-child').addClass('on');
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
            subFilterList: function() {
                $.ajax({
                    url: '/lg5-common/data-ajax/support/subFilterList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: '',
                    beforeSend: function(xhr) {
                        // loading bar start
                    },
                    success: function(d) {
                        if (d.status) {
                            var data = d.data,
                                html = "";
                            
                            data.subFilterList.forEach(function(item) {
                                html += vcui.template(subFilterTemplate, item);
                            });

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
                $('#filterContent').on('click', '.filter-link', function(e) {
                    e.preventDefault();
                    $(this).parent().addClass('on');
                    $(this).parent().siblings().removeClass('on');

                    if (!$(this).siblings('.sub-depth').length) {
                        self.solutionsList();
                    } else {
                        $(this).siblings('.sub-depth').show();
                        $(this).closest('.filter-list').addClass('on');
                    }
                });
                $('#filterContent').on('click', '.sub-tit', function(e) {
                    e.preventDefault();
                    $(this).parent('.sub-depth').hide();
                    $(this).closest('.filter-list').removeClass('on');
                });
            }
        }
        
        solutions.init();
    });
})();