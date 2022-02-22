(function() {
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

    var KRP0044 = {
        init: function() {
            var self = this;
            self.$KRP0044 = $('.KRP0044').first(); // BTOCSITE-2117 모바일 웹/앱 GNB 개선
            vcui.require(['ui/pagination'], function () {
                self.setting();
                self.bindEvents();
            });
        },

        setting: function() {
            var self = this;

            self.$section = $('.KRP0044');
            self.$totalCounter = self.$section.find('#totalCount');
            self.$list = self.$section.find('ul.story-box');
            self.$pagination = self.$section.find('.pagination').vcPagination();
            self.requestData({"categoryId":lgePdpSendData.categoryId, 'page': 1});
        },

        bindEvents: function() {
            var self = this;

            self.$pagination.on('page_click', function(e, data) {
                //기존에 입력된 데이타와 변경된 페이지로 검색
                var param = {"categoryId":lgePdpSendData.categoryId, 'page':data}
                self.requestData(param);
            });

        },

        requestData: function(param) {
            var self = this;
            var ajaxUrl = self.$section.data('listUrl');
            var storyType = self.$section.data('storyType');
            if(storyType) {
                param.storyType = storyType;
            }
            if(location.pathname == '/html/components/KRP0044.html' && param.page == '2') {
                ajaxUrl = '/lg5-common/data-ajax/KRP0044/KRP0044_pg2.json'
            }
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                console.log(">>", result)
                var tempData = result.data;
                var data = (tempData && tempData instanceof Array && tempData.length > 0) ? tempData[0] : {};
                self.$pagination.vcPagination('setPageInfo',data.pagination);
                self.$totalCounter.text('총 '+ vcui.number.addComma(data.storyListTotalCount) +'개');

                var arr = data.storyList instanceof Array ? data.storyList : [];
                self.$list.empty();
                
                /* arr.sort(function(a,b){
                    return new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate);
                }); */
                arr.forEach(function(item, index) {
                    item.storyDesc = vcui.string.replaceAll(item.storyDesc, '\n', '<br>');
                    self.$list.append(vcui.template(storyListItemTemplate, item));
                });
            });
        },

    };

    $(window).ready(function(){
        if(!document.querySelector('.KRP0044')) return false;
        $('.KRP0044').buildCommonUI();
        KRP0044.init();
    });
})();