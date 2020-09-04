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
            self.$el.append('<button type="button" value="L" class="prev" aria-label="Previous page">Prev</button><ul></ul><button type="button" value="R" class="next" aria-label="Next page">Next</button>');

            self._bindEvents();
        },

        setPageInfo: function setPageInfo(data) {
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
                self.$el.find(".prev:button").show();
            } else {
                self.$el.find(".prev:button").hide();
            }
            if(rightPage) {
                self.$el.find(".next:button").show();
            } else {
                self.$el.find(".next:button").hide();
            }

            self.$el.find(".prev:button").next("ul").find("li").remove();
            for (var n = startPage; n <= endPage; n++) {
                if(n == page) {
                    self.$el.find(".prev:button").next("ul").append('<li><button type="button" value="' + n +'" aria-label="Page ' + n + '" class="active">' + n + '</button></li>');
                } else {
                    self.$el.find(".prev:button").next("ul").append('<li><button type="button" value="' + n +'" aria-label="Page ' + n + '">' + n + '</button></li>');
                }
            }
        },

        _bindEvents: function _bindEvents() {
            var self = this;
            self.$el.on("click","button",function(e) {
                switch (e.type) {
                    case 'click':
                        e.preventDefault();
                        let value = $(e.currentTarget).val();
                        if($(e.currentTarget).hasClass("prev") || $(e.currentTarget).hasClass("next")) {
                            self.triggerHandler("page_click", {
                                pagePosition: value,
                                page: ""
                            });
                        } else {
                            self.$el.find(".prev:button").next("ul").find("li>button").removeClass("active");
                            console.log(e);
                            $(e.currentTarget).addClass("active");
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