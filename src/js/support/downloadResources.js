$(window).ready(function() {
    var modelListTemplate = 
        '<tr>' +
            '<td>' +
                '<span class="color-black">{{modelName}}</span>' +
            '</td>' +
            '<td>{{categoryName}}</td>' +
            '<td class="right">' +
                '<button type="button" class="btn pink btn-small btn-border"><span>선택하기</span></button>' +
            '</td>' +
        '</tr>';
    var manualListTemplate = 
        '<tr>' +
            '<td>' +
                '<span class="color-black">{{manualType}}</span>' +
            '</td>' +
            '<td>{{manualInfo}}</td>' +
            '<td>{{date}}</td>' +
            '<td class="right middle">' +
                '<button type="button" class="btn pink btn-small btn-border"><span>{{fileType}}</span></button>' +
            '</td>' +
        '</tr>';

    var driverListTemplate = 
        '<li class="ui_accord_item">' +
            '<div class="accordion-head ui_accord_head">' +
                '<button type="button" class="accordion-head-anchor ui_accord_toggle">{{driverType}} (<em class="count">{{count}}</em>건)</button>   ' +
                '<span class="blind ui_accord_text">열기</span>' +
            '</div>' +
            '<div class="accordion-panel ui_accord_content">' +
                '<ul>' +
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

    var optionTemplate =  '<option value="{{}}">{{}}</option>'; 

    var $modelSection =$('.step02'),
        $modelContent = $('#modelContent'),
        $stickyNav = $('.sticky-nav'),
        $button = $('button[type=submit]');

    function searchModelHandler() {
        $.ajax({
            url: '/lg5-common/data-ajax/support/modelList.json',
            method: 'POST',
            dataType: 'json',
            data: '',
            beforeSend: function(xhr) {
                // loading bar start
            },
            success: function(d) {
                var data = d.data;
                var arr = data.modelList instanceof Array ? data.modelList : [];
                var modelListHtml = "";
                arr.forEach(function(item) {
                    modelListHtml += vcui.template(modelListTemplate, item);
                });
                $modelContent.html(modelListHtml);
            },
            error: function(err){
                console.log(err);
            },
            complete: function() {
                // loading bar end
                var test = $modelSection.get(0).offsetTop - $modelSection.css('margin-top').replace(/[^-\d\.]/g, '')  - $stickyNav.outerHeight(true);
                $stickyNav.addClass('sticky');
                $('html, body').animate({scrollTop: test}, 500);
            }
        });
    }

    function clickModelHandler() {
        var $this = $(this);
            $row = $this.closest('tr');

        $row.addClass('is-active');
        $row.siblings().removeClass('is-active');
    }

    function searchFileHandler(e) {
        $.ajax({
            url: '/lg5-common/data-ajax/support/downloadList.json',
            method: 'POST',
            dataType: 'json',
            data: '',
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
                $('.download-list tbody').html(manualList);


                var driverArr = data.driverList instanceof Array ? data.driverList : [];
                var driverList = "";
                driverArr.forEach(function(item) {
                    driverList += vcui.template(driverListTemplate, item);
                });
                $('.accordion-list').html(driverList);
            },
            error: function(err){
                console.log(err);
            },
            complete: function() {
                // loading bar end
                var test = $modelSection.get(0).offsetTop - $modelSection.css('margin-top').replace(/[^-\d\.]/g, '')  - $stickyNav.outerHeight(true);
                $stickyNav.addClass('sticky');
                $('html, body').animate({scrollTop: test}, 500);
            }
        });

        e.preventDefault();
    }

    function setEventListener() {
        $('.category-carousel').find('button').on('click', searchModelHandler);
        $modelContent.on('click', 'button', clickModelHandler);
        $button.on('click', searchFileHandler);
    }

    setEventListener();
});