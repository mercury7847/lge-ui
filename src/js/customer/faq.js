(function() {
    var listItemTemplate =
        '<li class="lists">' +
            '<div class="head"><a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="flag">{{flag}}</span>' +
                '<span class="title line2">{{title}}</span>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a></div>' +
            '<div class="accord-cont ui_accord_content" style="display:none;"><p>{{desc}}</p></div>' +
        '</li>';

    $(window).ready(function() {
        var faq = {
            init: function() {
                self.$searchWrap = $('div.contents.faq div.cont-wrap div.search-wrap');
                self.$selectbox = self.$searchWrap.find('select.ui_selectbox');
                self.$tab = $('div.contents.faq div.cont-wrap div.result-wrap div.ui_tab');
                self.$faqList = $('div.contents.faq div.cont-wrap div.result-wrap div.ui_accordion');
                self.$pagination = $('div.contents.faq div.cont-wrap div.result-wrap div.pagination');

                vcui.require(['ui/pagination'], function () {
                    self.$pagination.vcPagination().on('page_click', function(e, data) {
                        console.log('page_click',e,data);
                    });
                });

                this.bindEvents();

                //this.searchNewData();
            },

            bindEvents: function() {
                var _self = this;
                self.$searchWrap.find('button.btn-search').on("click", function(e){ 
                    _self.searchNewData();
                });

                self.$tab.vcTab().on('tabchange', function(e, data) {
                    var href = $(data.button).attr('href').replace("#", "");
                    _self.searchDataFromTab(href);
                });
            },

            searchNewData: function() {
                var searchInput = self.$searchWrap.find('input').val();
                var searchType = self.$selectbox.vcSelectbox('selectedOption').value;
                var searchCategory = self.$tab.find('li:nth-child(1) a').attr('href').replace("#", "");
                this.requestData({'input':searchInput, 'type':searchType, 'category':searchCategory});
            },

            searchDataFromTab: function(tabValue) {
                var searchInput = self.$searchWrap.find('input').val();
                var searchType = self.$selectbox.vcSelectbox('selectedOption').value;
                var searchCategory = tabValue;
                this.requestData({'input':searchInput, 'type':searchType, 'category':searchCategory});
            },

            requestData:function(param) {
                var ajaxUrl = self.$searchWrap.attr('data-url');
                console.log(ajaxUrl, param);

                $.ajax({
                    url: ajaxUrl,
                    data: param
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
                    /*
                    var param = d.param;
                    self.$dateFilterStartDate.vcCalendar('setDate', new Date(vcui.date.format(param.startDate,'yyyy.MM.dd')));
                    self.$dateFilterEndDate.vcCalendar('setDate', new Date(vcui.date.format(param.endDate,'yyyy.MM.dd')));
                    self.$dateFilter.find('input[name="rdo1"][value="'+param.purchaseType+'"]').prop('checked', true);
                    */
        
                    var contentHtml = "";
        
                    var param = d.param;
                    self.$selectbox.vcSelectbox('value',param.type,false);
                    var tabIndex = self.$tab.find('"li a[href="#' + param.category + '"]"');
                    console.log(tabIndex);
                    self.$tab.vcTab('select',tabIndex);

                    var data = d.data;
                    console.log(data);

                    var arr = data.purchaseItems instanceof Array ? data.purchaseItems : [];
                    if(arr.length > 0) {
                        /*
                        self.$dateFilter.siblings('div.no-data').hide();
                        arr.forEach(function(item, index) {
                            contentHtml += vcui.template(listItemTemplate, {
                                ...item,
                                "liClass": "prod" + ((index < 10 ? '0' : '') + index),
                                "purchaseDate": vcui.date.format(item.purchaseDate,'yyyy. MM. dd'),
                                "purchaseType": item.purchaseType == 'buy'?'구매':(item.purchaseType == 'cancel'?'취소':'')
                            });
                        });
                        */
                    } else {
                        //self.$dateFilter.siblings('div.no-data').show();
                    }
                    //self.$productList.html(contentHtml);
                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            }
        };

        faq.init();                
    });
})();