vcui.define('ui/pagination', ['jquery', 'vcui'], function ($, core) {
    "use strict";
    var Pagination = core.ui('Pagination', {
        bindjQuery: 'pagination',
        defaults: {
            page: 1,
            visibleCount: 5,
            totalCount: 1,
            scrollTop : 0,
            scrollTarget : null
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

            var page = self.$el.attr("data-page");
            if(!!page) {
                self.options.page = page;
            }
            var visibleCount = self.$el.attr("data-visible-count");
            if(!!visibleCount) {
                self.options.visibleCount = visibleCount;
            }
            var totalCount = self.$el.attr("data-total-count");
            if(!!totalCount) {
                self.options.totalCount = totalCount;
            }

            self.update();
        },

        setPageInfo: function setPageInfo(data) {
            var self = this;
            if(!!data) {
                if(!!data.page) {
                    self.options.page = data.page;
                }
                //2021-03-05 visibleCount 5 고정
                self.options.visibleCount = 5;
                /*
                if(!!data.visibleCount) {
                    self.options.visibleCount = data.visibleCount;
                }
                */
                if(!!data.totalCount) {
                    self.options.totalCount = data.totalCount;
                }
            }
            self.update();
        },

        update: function update() {
            var self = this;

            const totalCount = parseInt(self.options.totalCount);
            const visibleCount = parseInt(self.options.visibleCount);
            var page = parseInt(self.options.page);
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
    
            const leftPage = (startPage > visibleCount);
            const rightPage = ((startPage + visibleCount - 1) < totalCount);

            if(leftPage) {
                self.$el.find("a.prev").attr("href","#"+(startPage-1));
                //self.$el.find("a.prev").show();
                self.$el.find("a.prev").removeClass('disabled');
            } else {
                //self.$el.find("a.prev").hide();
                self.$el.find("a.prev").addClass('disabled');
            }
            if(rightPage) {
                self.$el.find("a.next").attr("href","#"+(endPage+1));
                //self.$el.find("a.next").show();
                self.$el.find("a.next").removeClass('disabled');
            } else {
                //self.$el.find("a.next").hide();
                self.$el.find("a.next").addClass('disabled');
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

            self.$el.attr("data-page", page);
            self.$el.attr("data-visible-count", visibleCount);
            self.$el.attr("data-total-count", totalCount);
        },

        _bindEvents: function _bindEvents() {
            var self = this;
            self.$el.on("click","a",function(e) {
                e.preventDefault();
                if($(e.currentTarget).hasClass('disabled')) return;
                let value = $(e.currentTarget).attr('href').replace("#", "");
                self.triggerHandler("page_click", value);
                if(self.options.scrollTarget) {
                    $('html, body').animate({"scrollTop": self.options.scrollTarget.offset().top}, 0);
                } else {
                    if(self.options.scrollTop !== 'noUse') $('html, body').animate({"scrollTop": self.options.scrollTop }, 0);
                }
                /*
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
                */
            });
        },
    });

    return Pagination;
});
