(function() {
    var subTabItemTemplate = '<li><a href="#{{categoryId}}">{{categoryName}}</a></li>';
    var storyListItemTemplate = '<li class="items"><a href="{{storyUrl}}" class="item-inner">' +
        '<div class="thumb">' +
            '<img src="{{storyListThumbnailPath}}{{storyListThumbnailServerName}}" alt="{{storyListThumbnailAltText}}" aria-hidden="true">' +
            '<p class="hidden pc">{{storyListThumbnailAltText}}</p>' +
            '<p class="hidden mobile">{{storyListThumbnailAltText}}</p>' +
        '</div>' +
        '<div class="item-info">' +
            '<div class="flag-wrap bar-type"><span class="flag">{{storyTypeName}}</span></div>' +
            '<p class="tit">{{#raw storyTitle}}</p>' +
            '<p class="desc">{{#raw storyDesc}}</p>' +
            '{{#if tags.length > 0}}' +
            '<div class="hashtag-wrap">' +
                '{{#each item in tags}}' +
                    '<span class="hashtag"><span>#</span>{{item.tagName}}</span>' +
                '{{/each}}' +
            '</div>' +
            '{{/if}}' +
            '<p class="date">{{lastUpdateDate}}</p>' +
        '</div>' +
    '</a></li>';

    var KRP0026 = {
        init: function() {
            var self = this;
            self.$KRP0026 = $('.KRP0026').first(); // BTOCSITE-2117 모바일 웹/앱 GNB 개선
            vcui.require(['ui/pagination'], function () {
                self.setting();
                self.bindEvents();
            });
        },

        setting: function() {
            var self = this;

            self.$section = $('.KRP0026');
            var $pageHeader = self.$section.find('div.page-header');
            var $tabs = $pageHeader.find('div.ui_tab');
            self.$mainTab = $tabs.eq(0);
            self.$subTab = $tabs.eq(1);
            //var $sortList = self.$section.find('div.sort-list');
            //self.$selectOrder = $sortList.find('.ui_selectbox');
            self.$totalCounter = self.$section.find('#totalCount');
            self.$list = self.$section.find('ul.story-box');
            self.$pagination = self.$section.find('.pagination').vcPagination();

            // self.section.find('.ui_carousel_slider').vcCarousel({
            //     settings: "unslick",
            //     responsive: [
            //         {
            //             breakpoint: 10000,
            //             settings: "unslick"
            //         },
            //         {
            //             breakpoint: 768,
            //             settings: {
            //                 infinite: false,
            //                 dots: true,
            //                 slidesToShow: 1, 
            //                 slidesToScroll: 1
            //             }
            //         }
            //     ]
            // });
        },

        bindEvents: function() {
            var self = this;

            self.$mainTab.on('click','li a',function(e){
                var category1 = $(this).attr('href').replace("#","");
                self.requestData({"superCategoryId":category1,"categoryId":""/*,"sort":self.$selectOrder.vcSelectbox('value')*/,"page": 1}, true);
            });

            self.$subTab.on('click','li a',function(e){
                var category1 = self.selectedTabHref(self.$mainTab);
                var category2 = $(this).attr('href').replace("#","");
                self.requestData({"superCategoryId":category1,"categoryId":category2/*,"sort":self.$selectOrder.vcSelectbox('value')*/,"page": 1}, false);
            });

            /*
            self.$selectOrder.on('change', function(e){
                var category1 = self.selectedTabHref(self.$mainTab);
                var category2 = self.selectedTabHref(self.$subTab);
                self.requestData({"superCategoryId":category1,"categoryId":category2,"sort":self.$selectOrder.vcSelectbox('value')}, false);
            });
            */

            self.$pagination.on('page_click', function(e, data) {
                var category1 = self.selectedTabHref(self.$mainTab);
                var category2 = self.selectedTabHref(self.$subTab);
                self.requestData({"superCategoryId":category1,"categoryId":category2/*,"sort":self.$selectOrder.vcSelectbox('value')*/,"page": data}, false);

                /* BTOCSITE-5938-292 [모니터링] 임의의 페이시 진입 후 뒤로가기 선택시 리스트 페이징 오류 */
                var currentUrl = $(location).attr('href');
                var hashArr = currentUrl.split('&');
                var urlSet = hashArr[0] + '&' + data;

                history.replaceState(null, null, urlSet);
                /* //BTOCSITE-5938-292 [모니터링] 임의의 페이시 진입 후 뒤로가기 선택시 리스트 페이징 오류 */
            });

            // BTOCSITE-2117 모바일 웹/앱 GNB 개선 : 이벤트 추가
            self.$KRP0026.find('.accordion-button').on('click', function(e) {
                self.$KRP0026.find('.tabs-wrap').toggleClass('expanded');
                if (self.$KRP0026.find('.tabs-wrap').hasClass('expanded')) {
                    self.$KRP0026.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', false);
                } else {
                    self.$KRP0026.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', true);
                }
            });
            self.$KRP0026.find('.fixed-area .dimmed').on('click', function(e) {
                self.$KRP0026.find('.tabs-wrap').removeClass('expanded');
                self.$KRP0026.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', true);
            });

            /* BTOCSITE-5938-292 [모니터링] 임의의 페이시 진입 후 뒤로가기 선택시 리스트 페이징 오류 */
            var hash = window.location.hash;
            var hashArr = hash.split('&');
            var tabHash = hashArr[0]; 
            var tabNum = hashArr[0].split('#')[1];
            var pageNum = hashArr[1];
            var storyTab = $('.tabs-wrap .tabs li a[href="' + tabHash +'"]');
            
            if(!!window.location.hash){	
                self.$mainTab.vcTab('select', storyTab.parents('li').index());
                self.requestData({"superCategoryId":tabNum,"categoryId":"","page": pageNum}, true);
            } else {
                // BTOCSITE-2117 모바일 웹/앱 GNB 개선 : 탭 그려진 후에 아코디언버튼 세팅
                if($('.subRenewWrap').length > 0) {
                    self.$KRP0026.find('.tabs-wrap').removeClass('expanded');
                    self.setAccordionButton();
                    $(window).on('resize', function() {
                        self.setAccordionButton();
                    });
                    self.$KRP0026.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', true);
                    setTimeout(function() {
                        self.$KRP0026.find('.tabs-wrap').vcSmoothScroll('scrollToActive');
                    }, 500);
                }

                var currentUrl = $(location).attr('href');
                var urlSet = currentUrl + '#&1';
                
                history.replaceState(null, null, urlSet);
            }
            /* //BTOCSITE-5938-292 [모니터링] 임의의 페이시 진입 후 뒤로가기 선택시 리스트 페이징 오류 */
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
            var ajaxUrl = self.$section.data('listUrl');
            var storyType = self.$section.data('storyType');
            if(storyType) {
                param.storyType = storyType;
            }
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                var tempData = result.data;
                var data = (tempData && tempData instanceof Array && tempData.length > 0) ? tempData[0] : {};
                self.$pagination.vcPagination('setPageInfo',data.pagination);
                self.$totalCounter.text('총 '+ vcui.number.addComma(data.storyListTotalCount) +'개');

                if(isMainTabClick) {
                    var arr = (data.superCategoryList && data.superCategoryList instanceof Array) ? data.superCategoryList : [];
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

                    // BTOCSITE-2117 모바일 웹/앱 GNB 개선 : 탭 그려진 후에 아코디언버튼 세팅
                    if($('.subRenewWrap').length > 0) {
                        self.$KRP0026.find('.tabs-wrap').removeClass('expanded');
                        self.setAccordionButton();
                        $(window).on('resize', function() {
                            self.setAccordionButton();
                        });
                        self.$KRP0026.find('.tabs-wrap').vcSmoothScroll('toggleEnabled', true);
                        setTimeout(function() {
                            self.$KRP0026.find('.tabs-wrap').vcSmoothScroll('scrollToActive');
                        }, 500);
                    }

                    /* BTOCSITE-5938-292 [모니터링] 임의의 페이시 진입 후 뒤로가기 선택시 리스트 페이징 오류 */
                    var currentUrl = $(location).attr('href');
                    var superCategoryId = param.superCategoryId;
                    var url = currentUrl + '#' + superCategoryId;
                    var str = url.split('#')[0];
                    var urlSet = str + '#' + superCategoryId + '&' + param.page;                                
                    
                    history.replaceState(null, null, urlSet);
                    /* //BTOCSITE-5938-292 [모니터링] 임의의 페이시 진입 후 뒤로가기 선택시 리스트 페이징 오류 */
                }

                var arr = data.storyList instanceof Array ? data.storyList : [];
                self.$list.empty();

                

                arr.forEach(function(item, index) {
                    item.storyDesc = vcui.string.replaceAll(item.storyDesc, '\n', '<br>');
                    self.$list.append(vcui.template(storyListItemTemplate, item));
                });
            });
        },

        // BTOCSITE-2117 모바일 웹/앱 GNB 개선 : 탭 길이에 따라 아코디언버튼 노출 유무 세팅
        setAccordionButton: function() {
            var self = this;
            if(self.$KRP0026.find('.tabs').width() + 32 > window.innerWidth) {
                self.$KRP0026.find('.tabs-wrap').addClass('hasButton');
            } else {
                self.$KRP0026.find('.tabs-wrap').removeClass('expanded');
                self.$KRP0026.find('.tabs-wrap').removeClass('hasButton');
            }
        }
    };

    $(window).ready(function(){
        if(!document.querySelector('.KRP0026')) return false;
        $('.KRP0026').buildCommonUI();
        KRP0026.init();
    });
})();