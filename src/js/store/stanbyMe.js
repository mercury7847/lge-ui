/*
;(function($) {
	$.fn.rwdImageMaps = function() {
		var $img = this;

		var rwdImageMap = function() {
			$img.each(function() {
				if (typeof($(this).attr('usemap')) == 'undefined')
					return;

				var that = this,
					$that = $(that);

				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
				$('<img />').on('load', function() {
					var w = $that.get(0).naturalWidth,
						h = $that.get(0).naturalHeight;

                        var temp = new Image();
						temp.src = $that.attr('src');

					if (!w || !h) {
						var temp = new Image();
						temp.src = $that.attr('src');
						if (!w)
							w = temp.width;
						if (!h)
							h = temp.height;
					}

					var wPercent = $that.width()/100,
						hPercent = $that.height()/100,
						map = $that.attr('usemap').replace('#', ''),
						c = 'coords';

					$('map[name="' + map + '"]').find('area').each(function() {
						var $this = $(this);
						if (!$this.data(c))
							$this.data(c, $this.attr(c));

						var coords = $this.data(c).split(','),
							coordsPercent = new Array(coords.length);

						for (var i = 0; i < coordsPercent.length; ++i) {
							if (i % 2 === 0)
								coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
							else
								coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
						}
						$this.attr(c, coordsPercent.toString());
					});
				}).attr('src', $that.attr('src'));
			});
		};
		$(window).resize(rwdImageMap).trigger('resize');

		return this;
	};
})(jQuery);
*/


(function() {
    var listTmpl = 
    '<tr>' +
        '<td class="board-tit">' +
            '<a href="{{url}}">' +
                '{{# if (typeof flag != "undefined") { #}}' +
                '<div class="flag-wrap bar-type">' +
                    '<span class="flag"><span class="blind">최신 게시글</span>{{newFlag}}</span>' +
                '</div>' +
                '{{# } #}}' +
                '<p>{{title}}</p>' +
                '<span class="count">{{clubDCount}}</span>' +
            '</a>' +
        '</td>' +
        '<td>{{creationUserName}}</td>' +
        '<td>{{creationDate}}</td>' +
        '<td><span class="txt-cnt">조회수</span>{{hitCnt}}</td>' +
    '</tr>';




    $(window).ready(function() {
        var notice = {
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.stanbyme');
                
                //self.$searchWrap = $contents.find('.search-wrap');
                self.$qnaTab = $contents.find('#prod1');
                self.$pagination = $contents.find('.pagination');
                self.$sortsWrap = $contents.find('.sorting-wrap');
                self.$sortTotal = self.$sortsWrap.find('#count');
                self.$sortSelectWrap = $contents.find('.sort-select-wrap');
                self.$sortSelect = $contents.find('.ui_selectbox');
                self.$listWrap = $contents.find('.tb_row');
                self.$noData = $contents.find('.empty-row');
                //self.$download = $contents.find('.addfile-wrap');

                self.params = {
                    'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                    'page': 2
                };

                vcui.require(['ui/pagination'], function () {
                    self.bindEvent();
                    self.$pagination.vcPagination('initialize');
                });

            },
            settingList: function() {
                var self = this,
                    url = self.$qnaTab.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                    var html = '',
                        data = d.data,
                        page = d.pagination;

                    self.$sortTotal.html(page.totalCount);

                    self.$pagination.vcPagination('update', page);
                    self.$listWrap.find('tbody').find('tr').not( self.$noData).remove();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(listTmpl, item);
                        });
                        self.$listWrap.find('tbody').prepend(html);
                        self.$noData.hide();
                        //self.$sortSelectWrap.show();
                        //self.$pagination.show();
                    } else {
                        self.$noData.show();
                        //self.$sortSelectWrap.hide();
                        //self.$pagination.hide();
                    }

                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var self = this;

                self.$listWrap.on('click', '.board-tit a', function() {
                    lgkorUI.historyBack(this);
                });

                self.$sortSelect.filter('#orderType').on('change', function() {
                    self.params = $.extend({}, self.params, {
                        'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                        'page': 1
                    });
                    self.settingList();
                });

                self.$pagination.on('page_click', function(e) {
                    console.log(2);
                    self.params = $.extend({}, self.params, {
                        'page': e.page
                    });
                    self.settingList();
                });
            }
        }
        notice.init();
    });
})();
