(function() {
    var storyListItemTemplate = '<li class="items"><a href="{{storyUrl}}" class="item-inner">' +
        '<div class="thumb">' +
            '<img src="{{storyListThumbnailPath}}{{storyListThumbnailServerName}}" alt="{{storyListThumbnailAltText}}" aria-hidden="true">' +
            '<p class="hidden pc">{{storyListThumbnailAltText}}</p>' +
            '<p class="hidden mobile">{{storyListThumbnailAltText}}</p>' +
        '</div>' +
        '<div class="item-info">' +
            '<div class="flag-wrap bar-type"><span class="flag">{{storyTypeNm}}</span></div>' +
            '<p class="tit">{{#raw storyTitle}}</p>' +
            '<p class="desc">{{#raw storyDesc}}</p>' +
            '{{#if tagList.length > 0}}' +
            '<div class="hashtag-wrap">' +
                '{{#each item in tagList}}' +
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
            self.modelId = self.$section.data('modelId');
            self.$list = self.$section.find('ul.story-box');
            self.$pagination = self.$section.find('.pagination').vcPagination((vcui.detect.isMobileDevice)?{scrollTarget:self.$section}:{scrollTop:'noUse'});
            self.requestData({"modelId":self.modelId, 'page': 1});
        },

        bindEvents: function() {
            var self = this;

            self.$pagination.on('page_click', function(e, data) {
                //기존에 입력된 데이타와 변경된 페이지로 검색
                var param = {"modelId":self.modelId, 'page':data}
                self.requestData(param);
            });

        },

        requestData: function(param) {
            var self = this;
            var ajaxUrl = self.$section.data('responseUrl');
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                var tempData = result.data;
                var data = (tempData && tempData instanceof Array && tempData.length > 0) ? tempData[0] : {};
                self.$pagination.vcPagination('setPageInfo',data.pagination);
                // self.$section.find('#totalCount').text('총 '+ vcui.number.addComma(data.storyListTotalCount) +'개');

                var arr = data.storyList instanceof Array ? data.storyList : [];
                self.$list.empty();
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