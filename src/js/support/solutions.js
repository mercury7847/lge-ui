(function() {
    var filterTemplate = '';
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
                        arrows:true,
                        responsive: [{
                            breakpoint:768,
                            settings: {
                                slidesToShow: 1
                            }
                        }]
                    });
                });

                this.setEventListener();
                this.solutionsList();
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
                            // $('.pagination').data('plugin_pagination').update(data.pageInfo);
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
            }
        }
        
        solutions.init();
    });
})();