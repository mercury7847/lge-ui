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
                    '<span class="flag"><span class="blind">최신 게시글</span>{{flag}}</span>' +
                '</div>' +
                '{{# } #}}' +
                '<p>{{title}}</p>' +
                '<span class="count">{{replyCount}}</span>' +
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
                self.$pagination = $contents.find('.pagination');
                self.$sortsWrap = $contents.find('.sorting-wrap');
                self.$sortTotal = $contents.find('#count');
                self.$sortSelectWrap = $contents.find('.sort-select-wrap');
                self.$sortSelect = $contents.find('.ui_selectbox');
                self.$listWrap = $contents.find('.tb_row');
                self.$noData = $contents.find('.empty-row');
                self.$download = $contents.find('.addfile-wrap');

                self.params = {
                    //'keyword': self.$searchWrap.find('input[type="text"]').val(),
                    //'category': self.$sortSelect.filter('#category').vcSelectbox('value'),
                    'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                    'page': 1
                };

                vcui.require(['ui/pagination'], function () {
                    self.$pagination.pagination();
                });





                self.bindEvent();

                
            },
            searchList: function() {
                var self = this,
                    url = self.$searchWrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                    var html = '',
                        data = d.data.listData,
                        page = d.data.listPage;

                    self.$searchWrap.find('input[type="text"]').val(self.params['keyword']);
                    self.$sortTotal.html(page.totalCount);                    
                    self.$pagination.pagination('update', page);
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
                
              /*  self.$searchWrap.find('input[type="text"]').on('input', function() {
                    var val = $(this).val().trim();

                    if (val.length > 1) {
                        $('.search-error').hide();
                    }
                });

                self.$searchWrap.find('input[type="text"]').on('keyup', function(e) {
                    if (e.keyCode == 13) { 
                        self.$searchWrap.find('.btn-search').trigger('click');
                    }
                });*/
                
                /*self.$searchWrap.find('.btn-search').on('click', function() {
                    var val = self.$searchWrap.find('input[type="text"]').val().trim();

                    if (val.length > 1) {
                        self.params = $.extend({}, self.params, {
                            'keyword': val,
                            'page': 1
                        });
                        
                        $('.search-error').hide();

                        self.searchList();
                    } else if (val.length == 1) {
                        $('.search-error').show();
                    } else {
                        self.params = $.extend({}, self.params, {
                            'keyword': '',
                            'page': 1
                        });

                        self.searchList();

                        $('.search-error').hide();
                    }
                });*/

                // self.$sortSelect.filter('#category').on('change', function() {
                //     self.$searchWrap.find('input[type="text"]').val('');
                //     self.$searchWrap.find('input[type="text"]').trigger('update');
                //
                //
                //     self.params = $.extend({}, self.params, {
                //         'keyword': '',
                //         'category': self.$sortSelect.filter('#category').vcSelectbox('value'),
                //         'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                //         'page': 1
                //     });
                //     self.searchList();
                // });

                self.$sortSelect.filter('#orderType').on('change', function() {
                    self.params = $.extend({}, self.params, {
                        'category': self.$sortSelect.filter('#category').vcSelectbox('value'),
                        'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                        'page': 1
                    });
                    self.searchList();
                });

                self.$pagination.on('pageClick', function(e) {
                    self.params = $.extend({}, self.params, {
                        'page': e.page
                    });
                    self.searchList();
                });

                self.$download.find('.download', function(e) {
                    
                });
            }
        }
        notice.init();

/*
        $(window).on('load', function(){
            $('.view-content img').rwdImageMaps();
        })
*/



        var $contSticky = $('.fn-scroll-notice');
        var $contTab = $contSticky.find('.tabs');
        var scrollFlag = true;
        var sectionArr = ["#sect_info", "#sect_install", "#sect_deliver"]

        function scrollTarget(targetId){
            scrollFlag = false;

            if( $(targetId).length ) {
                $('html, body').stop().animate({
                    scrollTop : $(targetId).offset().top - $contTab.outerHeight() + 1
                }, function(){
                    scrollFlag = true;
                })
            }
        }

        $contTab.find('a').on('click', function(e){
            var $this = $(this);
            var $li = $this.closest('li');
            var curIndex = $li.index();

            $li.addClass('on').siblings().removeClass('on');
            scrollTarget(sectionArr[curIndex]);
            e.preventDefault();
        });


        if( $contSticky.length ) {
            $(window).on('scroll', function(){
                var _top = $(this).scrollTop();

                if( _top >= $contSticky.offset().top &&  _top <= $('.contents.support').offset().top + $('.contents.support').outerHeight() - $contSticky.outerHeight() ) {
                    $contSticky.addClass('fixed');
                } else {
                    $contSticky.removeClass('fixed');
                }

                sectionArr.forEach(function(v, i){
                    if( _top >= $(v).offset().top - $contTab.outerHeight() && _top < $(v).offset().top + $(v).outerHeight() - $contTab.outerHeight()) {
                        if( scrollFlag ) {
                            $contTab.find('li').eq(i).addClass('on').siblings().removeClass('on');
                        }
                    }
                })
            });
        }
    });
})();
