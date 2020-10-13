(function() {
    var modelListTemplate = 
        '<li>' +
            '<strong class="tit">{{modelName}}</strong>' +
            '<p class="desc>{{categoryName}}</p>' +
            '<ul class="infos>' +
                '<li></li>' +
                '<li></li>' +
            '</ul>' +
            '<div class="btns-wrap>' +
                '<button type="button" class="btn bd-pink btn-small" data-model="{{modelName}}"><span>선택하기</span></button>' +
            '</div>' +
        '</li>';

    $(window).ready(function() {
        var downloadResources = {
            initialize: function() {
                var self = this;

                self.$stepCategory = $('#stepCategory');
                self.$stepModel = $('#stepModel');
                self.$stepResult = $('#stepResult');

                self._setEventListener();
                // self.searchModelList(); //삭제예정
                // self.searchFileList(); //삭제예정
            },
            searchModelList: function(formData) {
                var self = this;

                $.ajax({
                    url: '/lg5-common/data-ajax/support/modelList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: formData,
                    beforeSend: function(xhr) {
                        // loading bar start
                    },
                    success: function(d) {
                        if (d.status) {
                            var data = d.data,
                                html = "";
                            
                            data.modelList.forEach(function(item) {
                                html += vcui.template(modelListTemplate, item);
                            });

                            $('#modelContent').html(html);
                            //$('.pagination').data('plugin_pagination').update(data.pageInfo);
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
            searchFileList: function(formData) {
                $.ajax({
                    url: '/lg5-common/data-ajax/support/downloadList.json',
                    method: 'POST',
                    dataType: 'json',
                    data: formData,
                    beforeSend: function(xhr) {
                        // loading bar start
                    },
                    success: function(d) {
                        var data = d.data;
    
                        var manualArr = data.manualList instanceof Array ? data.manualList : [];
                        var manualList = "";
                        manualArr.forEach(function(item) {
                            manualList += vcui.template(manualListTemplate, item);
                        });
                        $('#fileContent').html(manualList);
    
    
                        var driverArr = data.driverList instanceof Array ? data.driverList : [];
                        var driverList = "";
                        driverArr.forEach(function(item) {
                            driverList += vcui.template(driverListTemplate, item);
                        });
                        $('.accordion-list').html(driverList);
    
                        $('.accordion-list li').each(function(index) {
                            var driverArr = data.driverList[index].list instanceof Array ? data.driverList[index].list : [];
                            var driverList = "";
                            driverArr.forEach(function(item) {
                                driverList += vcui.template(driverListTemplate02, item);
                            });
                            $(this).find('ul').html(driverList);
                        });
    
                        $('#stepResult').show();
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete: function() {
                        // loading bar end
                        var test = $('#stepResult').get(0).offsetTop - 48  - $('.product-nav-wrap').outerHeight();
                        $('html, body').animate({scrollTop: test}, 500);
                    }
                });
            },
            _reset: function() {

            },
            _setEventListener: function() {
                var self = this;

                $('.category-carousel').find('button').on('click', function() {
                    var data = $(this).data();

                    $('#superCategory').text(data.superCategory);
                    $('#category').text(data.category);

                    $('#stepModel').show();
                    $('#stepCategory').hide();

                    $('.pagination').pagination();
                    self.searchModelList(data);
                   
                    var offsetTop = $('.contents').get(0).offsetTop;
                        
                    $(window).scrollTop(offsetTop);
                    $('.product-nav-wrap').addClass('show');
                });

                $('#modelContent').on('click', 'button', function() {
                    var $el = $(this),
                        $item = $el.closest('tr'),
                        data = $el.data('model');

                    $item.addClass('is-active').siblings().removeClass('is-active');
                    $('#btnSearch').data('model', data);
                    $('#modelName').text(data);
                    $('#modelName').css('display','inline-block');
                    $('.guide').hide();

                    var offsetTop = $('.btn-group').offset().top + $('.btn-group').outerHeight(true) - $(window).height();
                        
                    $('html, body').animate({
                        scrollTop: offsetTop
                    }, 500);
                });

                self.$stepModel.find('.pagination').on('click', 'a', function(e) {
                    e.preventDefault();
                    self.searchModelList();
                });

                $('#btnSearch').on('click', function() {
                    var data = $(this).data();
                    
                    self.searchFileList(data);
                });

                $('#btnReset').on('click', function() {
                    $('#modelContent').html('');
                    $('#superCategory').text('');
                    $('#category').text('');
                    $('#modelName').css('display', 'none').text('');
                    $('.guide').show();

                    $('#stepResult').hide();
                    $('#stepModel').hide();
                    $('#stepCategory').show();

                    $('.category-carousel').vcCarousel('setPosition');
                    
                    $('.product-nav-wrap').removeClass('show');

                    var offsetTop = $('.contents').get(0).offsetTop;
                    $(window).scrollTop(offsetTop);
                });
            }
        }

        downloadResources.initialize();
    });
})();