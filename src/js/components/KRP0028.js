(function() {
    var subTabItemTemplate = '<li><a href="#{{categoryId}}">{{categoryName}}</a></li>';
    var awardsListItemTemplate = '<li class="items" data-id="{{storyId}}" data-award-list="{{awardList}}"><div class="inner">' +
        '<div class="thumb">' +
            '<img src="{{storyListThumbnailPath}}" alt="{{storyListThumbnailAltText}}" onError="lgkorUI.addImgErrorEvent(this);">' +
            '<p class="hidden pc">{{storyListThumbnailAltText}}</p>' +
            '<p class="hidden mobile">{{storyListThumbnailAltText}}</p>' +
        '</div>' +
        '<div class="award-info">' + 
            '<div class="flag-wrap bar-type">' +
                '<span class="flag">{{categoryName}}</span>' +
            '</div>' +
            '<p class="tit">{{storyTitle}}</p>' +
            '<div class="desc-wrap">' +
                '<span class="desc">{{storyDesc}}</span>' +
            '</div>' +
        '</div>' +
        '<div class="btn-area">' +
        '{{#if modelInfo&&modelInfo.length > 0}}' +
            '<div class="btn-wrap">' +
                '{{#if modelInfo.length == 1}}' +
                    '<a href="{{modelInfo[0].url}}" class="btn-text">{{#raw modelInfo[0].name}}</a>' +
                '{{/if}}' +
                '{{#if modelInfo.length > 1}}' +
                    '<a href="#more" class="btn-text">{{#raw modelInfo[0].name}}</a>' +
                    '<button type="button" class="btn-more"><span class="hidden">수상내역 더보기</span></button>' +
                '{{/if}}' +
            '</div>' +
        '{{/if}}' +
        '</div>' + 
    '</div></li>';
    var awardsPopupListItemTemplage = '{{#each item in list}}<li><a href="{{item.url}}">{{#raw item.name}}</a></li>{{/each}}';

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
                self.$pagination = self.$section.find('.pagination').vcPagination();
            },

            bindEvents: function() {
                var self = this;
                
                self.$mainTab.on('click','li a',function(e){
                    var category1 = $(this).attr('href').replace("#","");
                    self.requestData({"superCategoryId":category1,"categoryId":"","sort":self.$selectOrder.vcSelectbox('value')}, true);
                });

                self.$subTab.on('click','li a',function(e){
                    var category1 = self.selectedTabHref(self.$mainTab);
                    var category2 = $(this).attr('href').replace("#","");
                    self.requestData({"superCategoryId":category1,"categoryId":category2,"sort":self.$selectOrder.vcSelectbox('value')}, false);
                });

                self.$selectOrder.on('change', function(e){
                    var category1 = self.selectedTabHref(self.$mainTab);
                    var category2 = self.selectedTabHref(self.$subTab);
                    self.requestData({"superCategoryId":category1,"categoryId":category2,"sort":self.$selectOrder.vcSelectbox('value')}, false);
                });

                self.$list.on('click', 'li div.btn-area a', function(e){
                    e.preventDefault();
                    var url = $(this).attr('href').replace("#","");
                    if(url) {
                        if(url == "more") {
                            $(this).siblings('button').trigger('click');

                        } else {
                            location.href = url;
                        }
                    }
                });

                self.$list.on('click', 'li div.btn-area button', function(e){
                    var $li = $(this).parents('li');
                    var awardList = $li.data('awardList');
                    var categoryName = $li.find('div.flag-wrap span.flag').text();
                    self.openAwardsPopup(categoryName,awardList);
                });

                self.$pagination.on('page_click', function(e, data) {
                    var category1 = self.selectedTabHref(self.$mainTab);
                    var category2 = self.selectedTabHref(self.$subTab);
                    self.requestData({"superCategoryId":category1,"categoryId":category2,"sort":self.$selectOrder.vcSelectbox('value'),"page": data}, false);
                });
            },

            selectedTabHref: function($tabs) {
                if($tabs.length > 0) {
                    var index = $tabs.vcTab('getSelectIdx');
                    var selectTab = $tabs.find('li:eq('+index+') a');
                    if(selectTab.length > 0) {
                        return selectTab.attr('href').replace("#","");
                    }
                }
                return "";
            },

            requestData: function(param, isMainTabClick) {
                var self = this;
                var ajaxUrl = self.$section.attr('data-list-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                    var tempData = result.data;
                    var data = (tempData && tempData instanceof Array && tempData.length > 0) ? tempData[0] : {};
                    //var param = result.param;
                    self.$pagination.vcPagination('setPageInfo',data.pagination);
                    self.$totalCounter.text('총 '+ vcui.number.addComma(data.totalCnt) +'개');

                    if(isMainTabClick) {
                        var arr = (data.categoryList && data.categoryList instanceof Array) ? data.categoryList : [];
                        var $ul = self.$subTab.find('ul');
                        $ul.empty();
                        $ul.removeAttr("style");
                        if(arr.length > 0) {
                            //전체를 넣어준다
                            arr.unshift({
                                "categoryName":"전체",
                                "categoryId":""
                            })
                        }
                        arr.forEach(function(item, index) {
                            $ul.append(vcui.template(subTabItemTemplate, item));
                        });
                        if(arr.length > 0) {
                            self.$subTab.find()
                            self.$subTab.vcTab('update');
                            self.$subTab.vcTab('select',0);
                            self.$subTab.parents('.tabs-bg').show();
                        } else {
                            self.$subTab.parents('.tabs-bg').hide();
                        }
                    }

                    var arr = data.awardList instanceof Array ? data.awardList : [];
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        var array = [];
                        var modelInfo = item.modelInfo;
                        if(modelInfo) {
                            modelInfo.forEach(function(item, index) {
                                var tempArr = item.split('|');
                                if(tempArr.length > 2) {
                                    array.push({
                                        "name":tempArr[1],
                                        "url":tempArr[2]
                                    });
                                }
                            });
                        }
                        item.modelInfo = array;
                        item.awardList = modelInfo ? modelInfo.join(',') : "";
                        self.$list.append(vcui.template(awardsListItemTemplate, item));
                    });
                });
            },
            
            /*
            requestAwardPopupData: function(_id) {
                var self = this;
                var ajaxUrl = self.$section.attr('data-popup-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"id":_id}, function(result) {
                    var popupData = result.data;
                    if(popupData) {
                        self.openAwardsPopup(popupData);
                    }
                });
            },
            */

            openAwardsPopup: function(categoryName, awardList) {
                var $popup = $('#awardsPopup');
                //$popup.find('h1.tit span').text(data.title);
                $popup.find('p.com-pop-tit').text(categoryName);
                
                var array = [];
                var modelInfo = awardList.split(',');
                if(modelInfo) {
                    modelInfo.forEach(function(item, index) {
                        var tempArr = item.split('|');
                        if(tempArr.length > 2) {
                            array.push({
                                "name":tempArr[1],
                                "url":tempArr[2]
                            });
                        }
                    });
                }

                $popup.find('ul.com-pop-list').html(vcui.template(awardsPopupListItemTemplage, {"list":array}));
                $popup.vcModal();
            }
        }
        
        KRP0028.init();
    });
})();