vcui.define('ui/pagination', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    var Pagination = core.ui('Pagination', {
        bindjQuery: 'pagination',
        defaults: {
            page: 7,
            visibleCount: 5,
            totalCount: 59
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.$el.attr("role","navigation");
            self.$el.attr("aria-label","Pagination");
            self.$el.attr("data-aria-pattern","Page #");
            self.$el.append('<a href="#L" class="prev"><span class="blind">이전 페이지 보기</span></a><span class="page_num"></span><a href="#R" class="next"><span class="blind">다음 페이지 보기</span></a>');

            self._bindEvents();
        },

        setPageInfo: function setPageInfo(data) {
            console.log('pageInfo',data);
            var self = this;
            if(!!data) {
                if(!!data.page) {
                    self.options.page = data.page;
                }
                if(!!data.visibleCount) {
                    self.options.visibleCount = data.visibleCount;
                }
                if(!!data.totalCount) {
                    self.options.visibleCount = data.totalCount;
                }
            }
            self.update();
        },

        update: function update() {
            var self = this;
            const totalCount = self.options.totalCount;
            const visibleCount = self.options.visibleCount;
            var page = self.options.page;
            if(page < 1) {
                page = 1;
            }
            if(page > totalCount) {
                page = totalCount;
            }

            var startPage = Math.floor((page-1)/visibleCount) * visibleCount + 1;
            var endPage = startPage + visibleCount - 1;
            if(endPage > totalCount) {
                endPage = totalCount;
            }
    
            let leftPage = (startPage > visibleCount);
            let rightPage = ((startPage + visibleCount - 1) < totalCount);
            if(leftPage) {
                self.$el.find("a.prev").show();
            } else {
                self.$el.find("a.prev").hide();
            }
            if(rightPage) {
                self.$el.find("a.next").show();
            } else {
                self.$el.find("a.next").hide();
            }

            var pageHtml = "";
            for (var n = startPage; n <= endPage; n++) {
                if(n == page) {
                    pageHtml += ('<strong><span class="blind">현재 페이지</span>' + n + '</strong>');
                } else {
                    pageHtml += ('<a href="#' + n +'" title="' + n + '페이지 보기">' + n + '</a>');
                }
            }
            self.$el.find("span.page_num").html(pageHtml);
        },

        _bindEvents: function _bindEvents() {
            var self = this;
            self.$el.on("click","a",function(e) {
                switch (e.type) {
                    case 'click':
                        e.preventDefault();
                        let value = $(e.currentTarget).attr('href').replace("#", "");
                        console.log(value);
                        if($(e.currentTarget).hasClass("prev") || $(e.currentTarget).hasClass("next")) {
                            self.triggerHandler("page_click", {
                                pagePosition: value,
                                page: ""
                            });
                        } else {
                            self.triggerHandler("page_click", {
                                pagePosition: "",
                                page: value
                            });
                        }
                        break;
                }
            })
        },
    });

    return Pagination;
});