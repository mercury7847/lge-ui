(function() {
    var subTabItemTemplate = '<li><a href="#{{value}}">{{title}}</a></li>';
    var awardsListItemTemplate = '<li class="items"><div class="inner">' +
        '<div class="thumb">' +
            '<img src="{{imageUrl}}" alt="{{imageAlt}}">' +
            '<p class="hidden pc">{{imageAlt}}</p>' +
            '<p class="hidden mobile">{{imageAlt}}</p>' +
        '</div>' +
        '<div class="award-info">' + 
            '<div class="flag-wrap bar-type">' +
                '{{#each item in flag}}<span class="flag">{{item}}</span>{{/each}}' +
            '</div>' +
            '<p class="tit">{{title}}</p>' +
            '<div class="desc-wrap">' +
                '<span class="desc">{{desc}}</span>' +
            '</div>' +
        '</div>' +
        '<div class="btn-area">' +
            '<div class="btn-wrap">' +
                '<a href="#n" class="btn-text">{{name}}</a>' +
                '<button type="button" class="btn-more"><span class="hidden">수상내역 더보기</span></button>' +
            '</div>' +
        '</div>' + 
    '</div><article style="display:none;">{{popupData}}</article></li>';
    var awardsPopupListItemTemplage = '{{#each item in list}}<li><a href="{{item.url}}">{{item.title}}</a></li>{{/each}}';

    $(window).ready(function() {
        $('.KRP0028').buildCommonUI();
        var KRP0028 = {         
            init: function() {
                var self = this;
                vcui.require(['ui/pagination'], function () {
                    self.setting();
                    self.bindEvents();
                });
            },

            setting: function() {
                var self = this;
                self.$section = $('.KRP0028');
                var $pageHeader = self.$section.find('div.page-header');
                var $tabs = $pageHeader.find('div.ui_tab');
                self.$mainTab = $tabs.eq(0);
                self.$subTab = $tabs.eq(1);
                var $sortList = self.$section.find('div.sort-list');
                self.$selectOrder = $sortList.find('.ui_selectbox');
                self.$totalCounter = self.$section.find('#totalCount');
                self.$list = self.$section.find('ul.award-list');
                self.$pagination = self.$section.find('.pagination');
            },

            bindEvents: function() {
                var self = this;
                
                self.$mainTab.on('click','li a',function(e){
                    var category1 = $(this).attr('href').replace("#","");
                    self.requestData({"category1":category1,"category2":"all","order":self.$selectOrder.vcSelectbox('value')}, true);
                });

                self.$subTab.on('click','li a',function(e){
                    var category1 = self.selectedTabHref(self.$mainTab);
                    var category2 = $(this).attr('href').replace("#","");
                    self.requestData({"category1":category1,"category2":category2,"order":self.$selectOrder.vcSelectbox('value')}, false);
                });

                self.$selectOrder.on('change', function(e){
                    var category1 = self.selectedTabHref(self.$mainTab);
                    var category2 = self.selectedTabHref(self.$subTab);
                    self.requestData({"category1":category1,"category2":category2,"order":self.$selectOrder.vcSelectbox('value')}, false);
                });

                self.$list.on('click', 'li div.btn-area a', function(e){
                    e.preventDefault();
                    var popupData = JSON.parse($(this).parents('li').find('article').text());
                    self.openAwardsPopup(popupData);
                });

                self.$list.on('click', 'li div.btn-area button', function(e){
                    var popupData = JSON.parse($(this).parents('li').find('article').text());
                    self.openAwardsPopup(popupData);
                });

                self.$pagination.vcPagination().on('page_click', function(e, data) {
                    var category1 = self.selectedTabHref(self.$mainTab);
                    var category2 = self.selectedTabHref(self.$subTab);
                    self.requestData({"category1":category1,"category2":category2,"order":self.$selectOrder.vcSelectbox('value'),"page": data}, false);
                });
            },

            selectedTabHref: function($tabs) {
                var index = $tabs.vcTab('getSelectIdx');
                var selectTab = $tabs.find('li:eq('+index+') a');
                return selectTab.attr('href').replace("#","");
            },

            requestData: function(param, isMainTabClick) {
                var self = this;
                var ajaxUrl = self.$section.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    var param = result.param;
                    
                    self.$pagination.vcPagination('setPageInfo',param.pagination);

                    self.$totalCounter.text('총 '+ vcui.number.addComma(data.totalCount) +'개');

                    if(isMainTabClick) {
                        var arr = data.category instanceof Array ? data.category : [];
                        if(arr.length > 0) {
                            var $ul = self.$subTab.find('ul');
                            $ul.empty();
                            arr.forEach(function(item, index) {
                                $ul.append(vcui.template(subTabItemTemplate, item));
                            });
                            self.$subTab.vcTab('update');
                            self.$subTab.vcTab('select',0);
                        }
                    }

                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        item.popupData = JSON.stringify(item.popupData);
                        self.$list.append(vcui.template(awardsListItemTemplate, item));
                    });
                });
            },
            
            openAwardsPopup: function(data) {
                if(data) {
                    var $popup = $('#awardsPopup');
                    $popup.find('h1.tit span').text(data.title);
                    $popup.find('p.com-pop-tit').text(data.subTitle);
                    $popup.find('ul.com-pop-list').html(vcui.template(awardsPopupListItemTemplage, data));
                    $popup.vcModal();
                }
            }
        }
        
        KRP0028.init();
    });
})();