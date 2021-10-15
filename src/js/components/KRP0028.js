(function() {
    var subTabItemTemplate = '<li><a href="#{{categoryId}}">{{categoryName}}</a></li>';
    var awardsListItemTemplate = '<li class="items" data-id="{{storyId}}" data-award-list="{{awardList}}" data-category-url="{{sitemapLinkPath}}"><div class="inner">' +
        '<div class="thumb">' +
            '<img src="{{storyListThumbnailPath}}" alt="{{storyListThumbnailAltText}}" onError="lgkorUI.addImgErrorEvent(this);">' +
            '<p class="hidden pc">{{storyListThumbnailAltText}}</p>' +
            '<p class="hidden mobile">{{storyListThumbnailAltText}}</p>' +
        '</div>' +
        '<div class="award-info">' + 
            '<div class="flag-wrap bar-type">' +
                '<span class="flag">{{categoryName}}</span>' +
            '</div>' +
            '<p class="tit">{{#raw storyTitle}}</p>' +
            '<div class="desc-wrap">' +
                '<span class="desc">{{#raw storyDesc}}</span>' +
            '</div>' +
        '</div>' +
        '<div class="btn-area">' +
        '{{#if modelInfo&&modelInfo.length > 0}}' +
            '<div class="btn-wrap">' +
                '{{#if modelInfo.length == 1}}' +
                    '<a href="{{#if modelInfo[0].url}}{{modelInfo[0].url}}{{/if}}" class="btn-text">{{#raw modelInfo[0].name}}</a>' +
                '{{/if}}' +
                '{{#if modelInfo.length > 1}}' +
                    '<a href="#more" class="btn-text">{{#raw modelInfo[0].name}}</a>' +
                    '<button type="button" class="btn-more"><span class="hidden">수상내역 더보기</span></button>' +
                '{{/if}}' +
            '</div>' +
        '{{/if}}' +
        '</div>' + 
    '</div></li>';
    var awardsPopupListItemTemplage = '{{#each item in list}}<li><a href="{{#if item.url}}{{item.url}}{{/if}}">{{#raw item.name}}</a></li>{{/each}}';

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
            self.$sortList = self.$section.find('div.sort-list');
            self.$selectOrder = self.$sortList.find('.ui_selectbox');
            self.$totalCounter = self.$section.find('#totalCount');
            self.$list = self.$section.find('ul.award-list');
            self.$noData = self.$section.find('div.no-data');
            self.$pagination = self.$section.find('.pagination').vcPagination();

            // 뒤로가기시
            self.storageName = 'storeHistory';

            console.log("main %o",self.$mainTab);
            console.log("subTab %o",self.$subTab);
            console.log("selectOrder %o",self.$selectOrder);

            // BTOCSITE-5938-21 [모니터링] 뒤로가기 
            self.storageData = lgkorUI.getStorage(self.storageName);
            if(!(vcui.isEmpty(self.storageData)) && self.storageData.data) {
                console.log("캐시 storageData %o",self.storageData)
                self.updateList(self.storageData.data,true,true);
            } else {
                self.checkNoData();
            }

            // self.checkNoData();
        },

        bindEvents: function() {
            var self = this;
            
            $('#awardsPopup').on('click','.com-pop-list a',function(e){
                e.preventDefault();
                var url = $(this).attr('href').replace("#","");
                if(url) {
                    location.href = url;
                }
            });

            self.$mainTab.on('click','li a',function(e){
                var category1 = $(this).attr('href').replace("#","");

                console.log("메인 클릭")
                self.requestData({"superCategoryId":category1,"categoryId":"","sort":self.$selectOrder.vcSelectbox('value')}, true);
            });

            self.$subTab.on('click','li a',function(e){
                var category1 = self.selectedTabHref(self.$mainTab);
                var category2 = $(this).attr('href').replace("#","");

                console.log("sub %o %o",category1,category2)
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
                var categoryUrl = $li.data('categoryUrl');
                self.openAwardsPopup(categoryName,categoryUrl,awardList,this);
            });

            self.$pagination.on('page_click', function(e, data) {
                var category1 = self.selectedTabHref(self.$mainTab);
                var category2 = self.selectedTabHref(self.$subTab);
                self.requestData({"superCategoryId":category1,"categoryId":category2,"sort":self.$selectOrder.vcSelectbox('value'),"page": data}, false);
            });
        },

        selectedTabHref: function($tabs) {
            console.log("selectedTabHref %o",$tabs);
            if($tabs.length > 0) {
                var index = $tabs.vcTab('getSelectIdx');

                console.log("index %o",index);
                var selectTab = $tabs.find('li:eq('+index+') a');
                if(selectTab.length > 0) {
                    return selectTab.attr('href').replace("#","");
                }
            }
            return "";
        },

        requestData: function(param, isMainTabClick) {

            console.log("requestData");
            var self = this;
            var ajaxUrl = self.$section.attr('data-list-url');
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                var tempData = result.data;
                var data = (tempData && tempData instanceof Array && tempData.length > 0) ? tempData[0] : tempData;

                // BTOCSITE-5938-21 [모니터링] 뒤로가기 

                console.log("self.storageName set %o",self.storageName,)
                lgkorUI.setStorage(self.storageName, { param : param, data : data }, false);
                self.updateList(data,isMainTabClick,false);

            });
        },

        updateList: function(data,isMainTabClick,store){
            var self = this;
            console.log("updateList  %o%o",data,isMainTabClick);
                //뒤로가기 복원
                if(store && self.storageData.param) {
                    console.log("updateList cache %o%o",data,isMainTabClick);
                    // mainTab 뒤로가기 복원
                    var mainIdx = self.$mainTab.find('a[href="#'+self.storageData.param.superCategoryId+'"]').closest('li').index();
                    self.$mainTab.vcTab('select',mainIdx);

                    // selectOrder 뒤로가기 복원
                    self.$selectOrder.vcSelectbox('value',self.storageData.param.sort)

                }

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
                        console.log("서브 카테고리 탭 %o %o",self.storageData,self.$subTab);
                        self.$subTab.vcTab('update');

                        // 뒤로가기 복원
                        if(store && self.storageData.param) {
                            var subIdx = self.$subTab.find('a[href="#'+self.storageData.param.categoryId+'"]').closest('li').index();
                            self.$subTab.vcTab('select',subIdx);             
                        } else {
                            self.$subTab.vcTab('select',0);
                        }
                      
                        self.$subTab.parents('.tabs-bg').show();
                        self.$subTab.vcSmoothScroll('refresh');
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
                            if(tempArr.length > 3) {
                                var url = (tempArr[3] == "SUSPENDED") ? null : tempArr[2]; 
                                array.push({
                                    "name":tempArr[1],
                                    "url":url
                                });
                            }
                        });
                    }
                    item.modelInfo = array;
                    item.awardList = modelInfo ? modelInfo.join(',') : "";
                    self.$list.append(vcui.template(awardsListItemTemplate, item));
                });

                self.checkNoData();
        },
        
        checkNoData: function() {
            var self = this;
            if(self.$list.find('li').length > 0) {
                self.$noData.hide();
                self.$pagination.show();
                self.$totalCounter.show();
            } else {
                self.$noData.show();
                self.$pagination.hide();
                self.$totalCounter.hide();
            }
        },

        openAwardsPopup: function(categoryName, categotyUrl, awardList, eventTarget) {
            var self = this;
            
            var $popup = $('#awardsPopup');
            //$popup.find('h1.tit span').text(data.title);
            $popup.find('p.com-pop-tit').text(categoryName);
            if(categotyUrl) {
                $popup.find('a.category').attr('href',categotyUrl);
            } else {
                $popup.find('a.category').attr('href','#');
            }
            var array = [];
            var modelInfo = awardList.split(',');
            if(modelInfo) {
                modelInfo.forEach(function(item, index) {
                    var tempArr = item.split('|');
                    if(tempArr.length > 3) {
                        var url = (tempArr[3] == "SUSPENDED") ? null : tempArr[2]; 
                        array.push({
                            "name":tempArr[1],
                            "url":url
                        });
                    }
                });
            }

            $popup.find('ul.com-pop-list').html(vcui.template(awardsPopupListItemTemplage, {"list":array}));
            if(eventTarget) {
                $popup.vcModal({opener:eventTarget});
            } else {
                $popup.vcModal();
            }
        }
    };
        
    $(window).ready(function() {
        if(!document.querySelector('.KRP0028')) return false;
        $('.KRP0028').buildCommonUI();
        KRP0028.init();
    });
})();