$(window).ready(function(){
    if(!document.querySelector('.KRP0017')) return false;

    $('.KRP0017').buildCommonUI();
    
    vcui.require(["ui/tab","ui/smoothScroll",'ui/pagination'], function () {
        var ajaxUrl = '/lg5-common/data-ajax/support/promotionList.json';
        var tabItemTemplate =
            '<li><a href="#{{categoryId}}" aria-controls="{{categoryId}}" class="btn-tab" role="tab" aria-selected="false">{{categoryName}}</a></li>';
        var listItemTemplate =
            '<li class="unit-box">'+
            '<div class="visual-area image">'+
            '<a href="{{promotionLinkUrl}}">'+
            '<img class="lazyloaded" data-src="{{thumbnailImageAddr}}" src="{{thumbnailImageAddr}}" alt="{{imageAltText}}"/>'+                   
            '<p class="hidden">graphic description : </p></a></div>'+
            '<p class="head-copy" id="title">{{title}}</p>'+
            '<p class="body-copy">{{promotionStartDate}} ~ {{promotionEndDate}}</p>'+
            '<div class="btn-box">'+
            '<span><a href="{{promotionLinkUrl}}" class="btn btn-primary" aria-describedby="title">자세히 보기</a></span>'+
            '</div></li>';

        $.ajax({
            url: ajaxUrl
        }).done(function (d) {
            console.log('ajax',d.data);

            var data = d.data;
            var arr = data.promoCategoryList instanceof Array ? data.promoCategoryList : [];
            var tabHtml = "";
            var contentHtml = "";
            arr.forEach(function(item) {
                tabHtml += vcui.template(tabItemTemplate, item);
                contentHtml += (
                    '<div id="' + item.categoryId + '" class="promo-area contents-area" aria-live="polite" role="tabpanel">' +
                    '<form action="' + ajaxUrl + '" novalidate>' +
                    '<input type="hidden" name="page" value="' + data.pageInfo.page +'">' +
                    '<input type="hidden" name="categoryId" value="' + item.categoryId +'">' +

                    '</form><div class="list-contents-wrap"><div class="list-wrap"><div class="unit-list"> </div><div class="pagination"></div></div></div></div>'
                )
            });
            $('.tab-wrap').find('.tabs-type-liner').html(tabHtml);
            $('.tab-wrap').after(contentHtml);
            $(".pagination").vcPagination().on('page_click', function(e, data) {
                console.log('page_click',e,data);
            });

            $('.ui_tab').vcTab('update').on('tabchange', function(e, data) {
                var id = $(data.button).attr('href');
                console.log(id);
                
                var tmpl ='';
                $.ajax({
                    url: ajaxUrl
                }).done(function (d) {
                    var data = d.data;
                    var arr = data.promotionList instanceof Array ? data.promotionList : [];
                    arr.forEach(function (item) {
                        tmpl += vcui.template(listItemTemplate, item);                            
                    })
                    $(id).find('.unit-list').html(tmpl);
                    $(id).find(".pagination").vcPagination('update');
                });   

            });

            $(".ui_tab").vcSmoothScroll({
                autoCenterScroll: true,
                center: true,
                scrollY: false,
                preventDefault: true
            });

            $('.ui_tab').vcTab('select', 9);
        });
    });
});