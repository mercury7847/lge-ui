$(window).ready(function(){
    if(!document.querySelector('.KRP0017')) return false;

    var KRP0017 = {
        init: function(){
            var self = KRP0017;

            vcui.require(['ui/smoothScroll'], function () {
                /*
                self.tabmenu = $('.KRP0017').find(".ui_tab > ul");
                self.tabmenu.vcSmoothScroll({
                    autoCenterScroll: true,
                    center: true,
                    scrollY: false,
                    preventDefault: true
                });
                */

               $(".ui_tab").vcSmoothScroll({
                autoCenterScroll: true,
                center: true,
                scrollY: false,
                preventDefault: true
            });
            
                self.initDataLoaded = false;
                self.templateLoaded = false;
                lgkorUI.getTemplate("tmpl-promotion-contents", self.completeTemplate.bind(self));

                $.ajax({
                    url: "/lg5-common/data-ajax/support/promotionList.json"
                }).done(function (d) {
                    var data = d.data;
                    var arr = data.promoCategoryList instanceof Array ? data.promoCategoryList : [];
                    var tabHtml = "";
                    var contentHtml = "";
                    arr.forEach(function(item) {
                        if(item.categoryId == data.categoryId) {
                            tabHtml += ('<li class="on"><a href="#' + item.categoryId + '" aria-controls="' + item.categoryId + '" class="btn-tab" role="tab" aria-selected="true">' + item.categoryName + '</a></li>');
                            contentHtml += (
                                '<div id="' + item.categoryId + '" class="promo-area contents-area" aria-live="polite" role="tabpanel">' +
                                '<form action="/data-ajax/mkt/promotionList.json" novalidate>' +
                                '<input type="hidden" name="page" value="' + data.pageInfo.page +'">' +
                                '<input type="hidden" name="categoryId" value="' + item.categoryId +'">' +
                                '</form><div class="list-contents-wrap initialized"><div class="list-wrap"><div class="unit-list"></div></div></div></div>'
                            )
                        } else {
                            tabHtml += ('<li class="off"><a href="#' + item.categoryId + '" aria-controls="' + item.categoryId + '" class="btn-tab" role="tab" aria-selected="false">' + item.categoryName + '</a></li>');
                            contentHtml += (
                                '<div id="' + item.categoryId + '" class="promo-area contents-area" aria-live="polite" role="tabpanel">' +
                                '<form action="/data-ajax/mkt/promotionList.json" novalidate>' +
                                '<input type="hidden" name="page" value="' + data.pageInfo.page +'">' +
                                '<input type="hidden" name="categoryId" value="' + item.categoryId +'">' +
                                '</form><div class="list-contents-wrap"><div class="list-wrap"><div class="unit-list"></div></div></div></div>'
                            )
                        }
                    });
                    $(".ui_tab > ul").html(tabHtml);
                    $('.tab-wrap').after(contentHtml);   
                    
                    //var scroll = $(".ui_tab");
                    /*
                    $(".ui_tab").vcSmoothScroll({
                        autoCenterScroll: true,
                        center: true,
                        scrollY: false,
                        preventDefault: true
                    });
                    */

                    $(".ui_tab > ul li a").bind('click', function (e) {
                        $($(this).attr('href')).find('form').trigger('submit', [true]);
                    });

                    $("form").on("submit", function(e, isTabEvent){
                        e.preventDefault();
                        self.getListData({page:$(this).find('[name=page]').val(),categoryId:$(this).find('[name=categoryId]').val()},isTabEvent);
                        return false;
                    });

                    self.initDataLoaded = true;
                    self.listData = data.promotionList;
                    self.categoryId = data.categoryId;
                    self.createProductList();
                });
            });
        },
        completeTemplate: function() {
            var self = KRP0017;
            self.templateLoaded = true;
            self.createProductList();
        },
        createProductItem: function(data) {
            var html = "";
            data.forEach(function(item) {
                html += vcui.template($('#tmpl-promotion-contents').html(),item);
            });
            return html;
        },
        createProductList: function() {
            var self = KRP0017;
            if(self.templateLoaded && self.initDataLoaded) {
                $('#'+self.categoryId).find(".unit-list").html(self.createProductItem(self.listData));
            }
        },
        getListData:function(param,isTabEvent) {
            var self = KRP0017;
            $('#'+param.categoryId).find(".unit-list").empty();
            $.ajax({
                url: "/lg5-common/data-ajax/support/promotionList.json",
                param:param
            }).done(function (d) {
                var data = d.data;
                var arr = data.promotionList instanceof Array ? data.promotionList : [];

                //$('#'+param.categoryId).find(".unit-list").empty();
                $('#'+param.categoryId).find(".unit-list").html(self.createProductItem(arr));
                $('#'+param.categoryId).find('form > input[name="page"]').val(data.pageInfo.page);

                if(!isTabEvent) {
                    $('html, body').animate({
                        scrollTop: $('#'+param.categoryId).closest('.component').offset().top
                    });
                }
            });
        }
    }
    KRP0017.init();
});