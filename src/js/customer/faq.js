(function() {
    var listItemTemplate =
        '<li class="lists">' +
            '<div class="head"><a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="flag">{{flag}}</span>' +
                '<span class="title line2">{{title}}</span>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a></div>' +
            '<div class="accord-cont ui_accord_content" style="display:none;"><p>{{#raw desc}}</p></div>' +
        '</li>';
    var params = {};

    $(window).ready(function() {
        var faq = {
            init: function() {
                self.$searchWrap = $('div.contents.faq div.cont-wrap div.search-wrap');
                self.$selectbox = self.$searchWrap.find('select.ui_selectbox');
                var result_wrap = $('div.contents.faq div.cont-wrap div.result-wrap');
                self.$tab = result_wrap.find('div.ui_tab');
                self.$faqList = result_wrap.find('div.ui_accordion');
                self.$pagination = result_wrap.find('div.pagination');
                self.$nodata = result_wrap.find('div.no-data');

                var _self = this;
                vcui.require(['ui/pagination'], function () {
                    _self.bindEvents();
                });

                //_self.searchNewData();
            },

            bindEvents: function() {
                var _self = this;

                //검색창
                self.$searchWrap.find('button.btn-search').on("click", function(e){ 
                    _self.searchNewData();
                });

                //카테고리탭
                self.$tab.vcTab().on('tabchange', function(e, data) {
                    var href = $(data.button).attr('href').replace("#", "");
                    _self.searchDataFromTab(href);
                });

                //페이지
                self.$pagination.vcPagination().on('page_click', function(e, data) {
                    //기존에 입력된 데이타와 변경된 페이지로 검색
                    var param = {'input':params.input, 'type':params.type, 'category':params.category, 'page':data}
                    _self.requestData(param);
                });
            },

            searchNewData: function() {
                //첫번째 카테고리와 새로 입력된 값들로 검색
                var searchInput = self.$searchWrap.find('input').val();
                var searchType = self.$selectbox.vcSelectbox('selectedOption').value;
                var searchCategory = self.$tab.find('li:nth-child(1) a').attr('href').replace("#", "");
                this.requestData({'input':searchInput, 'type':searchType, 'category':searchCategory, 'page':'1', pagePosition: ""});
            },

            searchDataFromTab: function(tabValue) {
                //선택된 카테고리 외에 기존 입력된 데이타로 검색
                var searchInput = params.input;
                var searchType = params.type;
                var searchCategory = tabValue;
                this.requestData({'input':searchInput, 'type':searchType, 'category':searchCategory, 'page':'1', pagePosition: ""});
            },

            requestData:function(param) {
                var ajaxUrl = self.$searchWrap.attr('data-url');
                //console.log(ajaxUrl, param);

                $.ajax({
                    url: ajaxUrl,
                    data: param
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    var param = d.param ? d.param : {};
                    params = param;
                    params.page = param.pagination.page;

                    //검색어
                    self.$searchWrap.find('input').val(param.input);
                    //검색타입
                    self.$selectbox.vcSelectbox('value',param.type,false);
                    //검색카테고리
                    var selectTab = self.$tab.find('li a[href="#' + param.category + '"]');
                    var tabIndex = self.$tab.find('li a').index(selectTab);
                    self.$tab.vcTab('select',tabIndex,true);
                    //페이지
                    self.$pagination.vcPagination('setPageInfo',param.pagination);

                    var data = d.data;
                    //console.log(data);

                    //전체 검색수
                    self.$tab.find('li:nth-child(1) a').text('전체('+ data.listCount +'건)');

                    var arr = data.listData instanceof Array ? data.listData : [];
                    var listbody = self.$faqList.find('ul');
                    listbody.empty();
                    if(arr.length > 0) {
                        self.$nodata.hide();
                        self.$tab.show();
                        self.$pagination.show();
                        arr.forEach(function(item, index) {
                            listbody.append(vcui.template(listItemTemplate, item));
                        });
                        self.$faqList.show();
                        self.$nodata.hide();
                    } else {
                        self.$tab.hide();
                        self.$faqList.hide();
                        self.$pagination.hide();
                        self.$nodata.show();
                    }
                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            }
        };

        faq.init();                
    });
})();