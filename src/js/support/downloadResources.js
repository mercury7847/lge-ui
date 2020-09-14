(function() {
    var modelListTemplate = 
        '<tr>' +
            '<td>' +
                '<span class="color-black">{{modelName}}</span>' +
            '</td>' +
            '<td>{{categoryName}}</td>' +
            '<td class="right">' +
                '<button type="button" class="btn pink btn-small btn-border" data-model="{{modelName}}"><span>선택하기</span></button>' +
            '</td>' +
        '</tr>';
    var manualListTemplate = 
        '<tr>' +
            '<td>' +
                '<span class="color-black">{{manualType}}</span>' +
            '</td>' +
            '<td>{{manualInfo}}</td>' +
            '<td>{{date}}</td>' +
            '<td class="right">' +
                '<button type="button" class="btn pink btn-small btn-border"><span>{{fileType}}</span></button>' +
            '</td>' +
        '</tr>';
    var driverListTemplate = 
        '<li class="ui_accord_item">' +
            '<div class="accordion-head head">' +
                '<button type="button" class="accordion-head-anchor ui_accord_toggle">{{driverType}} (<em class="count">{{count}}</em>건)</button>   ' +
                '<span class="blind ui_accord_text">열기</span>' +
            '</div>' +
            '<div class="accordion-panel ui_accord_content">' +
                '<ul class="driver-list">' +
                '</ul>' +
            '</div>' +
        '</li>';
    var driverListTemplate02 = 
        '<li>' +
            '<div class="file-info">' +
                '<strong class="tit"><a href="#">{{dirverName}}</a></strong>' +
                '<p class="sub">{{productName}}</p>' +
                '<ul class="sub-list">' +
                    '<li>{{driverVersion}}</li>' +
                    '<li>{{date}}</li>' +
                    '<li>{{size}}</li>' +
                '</ul>' +
                '<a href="#" class="btn pink btn-small btn-border"><span>다운로드</span></a>' +
            '</div>' +
        '</li>';
    var optionTemplate =  '<option value="{{value}}">{{option}}</option>'; 

    $(window).ready(function() {
        var downloadResources = {
            initialize: function() {
                var self = this;

                self.$stepCategory = $('#stepCategory');
                self.$stepModel = $('#stepModel');
                self.$stepResult = $('#stepResult');

                self._setEventListener();
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
                            $('#superCategory').text(formData.superCategory);
                            $('#category').text(formData.category);

                            $('#stepModel').show();
                            $('#stepCategory').hide();
                        }
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete: function() {
                        // loading bar end
                        var offsetTop = $('.contents').get(0).offsetTop;
                        
                        $(window).scrollTop(offsetTop);
                        $('.model-nav').addClass('show');
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
                        $('.result-table.download tbody').html(manualList);
    
    
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
                                
                        var osArr = data.osOption instanceof Array ? data.osOption : [];
                        var osOption = "";
                        osArr.forEach(function(item) {
                            osOption += vcui.template(optionTemplate, item);
                        });
                        $('#osSelect').html(osOption);
                        $('#osSelect').vcSelectbox('update');
    
                        var driverArr = data.driverOption instanceof Array ? data.driverOption : [];
                        var driverOption = "";
                        driverArr.forEach(function(item) {
                            driverOption += vcui.template(optionTemplate, item);
                        });
                        $('#driverSelect').html(driverOption);
                        $('#driverSelect').vcSelectbox('update');
    
                        $('#stepResult').show();
    
                        $('.accordion').vcAccordion();
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete: function() {
                        // loading bar end
                        var test = $('#stepResult').get(0).offsetTop - 48  - $('.model-nav').outerHeight();
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
                    self.searchModelList(data);
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
                    
                    $('.model-nav').removeClass('show');

                    var offsetTop = $('.contents').get(0).offsetTop;
                    $(window).scrollTop(offsetTop);
                });

                $(window).on('scroll resize', function () {
                    _scrollTop = $(window).scrollTop();
            
                    if (_scrollTop >= $('.model-nav').get(0).offsetTop) {
                        $('.model-nav').addClass('sticky')
                    } else {
                        $('.model-nav').removeClass('sticky')
                    }
                });
            }
        }

        downloadResources.initialize();
    });
})();