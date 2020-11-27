(function() {
    var manualListTemplate = 
        '<li>' +
            '<p class="tit">{{type}}</p>' +
            '<p class="desc">{{title}}</p>' +
            '<div class="info-wrap">' +
                '<ul class="options">' +
                    '<li>{{date}}</li>' +
                    '<li>{{language}}</li>' +
                    '{{# if (typeof petName != "undefined") { #}}' +
                    '<li>{{petName}}</li>' +
                    '{{# } #}}' +
                    '{{# if (typeof os != "undefined") { #}}' +
                    '<li>{{os}}</li>' +
                    '{{# } #}}' +
                ' </ul>' +
                '<div class="btns-area">' +
                    '{{# for (var i = 0; i < file.length; i++) #}}'
                    '<a href="{{file[i].src}}" class="btn border size"><span>{{file[i].type}}</span></a>' +
                    '{{# } #}}' +
                '</div>' +
            '</div>' +
        '</li>';
    var fileListTemplate = 
        '<li>' +
            '<div class="head">' +
                '<div class="file-box">' +
                    '<p class="tit"><button type="button" class="" data-href="#fileDetailPopup" data-control="modal">{{os}} {{title}}</button></p>' +
                    '<ul class="options">' +
                        '<li>{{version}}  {{category}}</li>' +
                        '<li>{{driver}}</li>' +
                        '<li>{{date}}</li>' +
                    '</ul>' +
                    '<div class="btn-area">' +
                        '<a href="{{file.src}}" class="btn border size"><span>다운로드 {{file.size}}</span></a>' +
                        '{{# if (typeof prevVersion != "undefined") { #}}' +
                        '<a href="#" class="accord-btn ui_accord_toggle" data-open-text="이전 버전 보기" data-close-text="이전 버전 닫기"><span class="ui_accord_text">이전 버전 보기</span></a>' +
                        '{{# } #}}' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '{{# if (typeof prevVersion != "undefined" && prevVersion.length) { #}}' +
            '<div class="accord-cont ui_accord_content">' +
                '<ul class="file-list">' +
                    '{{# for (var i = 0; i < prevVersion.length; i++) #}}'
                    '<li>' +
                        '<div class="file-box">' +
                            '<p class="tit"><button type="button" class="" data-href="#fileDetailPopup" data-control="modal">{{os}} {{title}}</button></p>' +
                            '<ul class="options">' +
                                '<li>{{version}}  {{category}}</li>' +
                                '<li>{{driver}}</li>' +
                                '<li>{{date}}</li>' +
                            '</ul>' +
                            '<div class="btn-area">' +
                                '<a href="{{file.src}}" class="btn border size"><span>다운로드 {{file.size}}</span></a>' +
                            '</div>' +
                        '</div>' +
                    '</li>' +
                    '{{# } #}}' +
                '</ul>' +
            '</div>' +
            '{{# } #}}' +
        '</li>';


    $(window).ready(function() {
        var downloadResources = {
            initialize: function() {
                var self = this;

                

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
                var ajaxUrl = 

                lgkorUI.requestAjaxDataPost(ajaxUrl, formData, function(result){
                    _self.updateList(result.data);
                    _self.requestInfo();
                    $(window).trigger("toastshow", "선택한 제품이 삭제되었습니다.");
                });

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
            _setEventListener: function() {
                var self = this;

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
                    
                    $('.product-nav-wrap').removeClass('show');

                    var offsetTop = $('.contents').get(0).offsetTop;
                    $(window).scrollTop(offsetTop);
                });
            }
        }

        downloadResources.initialize();
    });
})();