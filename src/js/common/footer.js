
vcui.define('common/footer', ['jquery', 'vcui', 'ui/dropdown' ], function ($, core) {
    "use strict";

    var Footer = core.ui('Footer', {
        bindjQuery: true,
        defaults: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.$mobileLinks = null;
            // self.$pcLinkes = self.$el.find('.cont-area .link-wrap');
            self.$pcLinkes = self.$el.find('.cont-area .pc-dropdown-wrap');

            self.$el.find('.menu-opener').on('click', function(e){
                self.$pcLinkes.toggleClass('open');

                var openerName = self.$pcLinkes.hasClass('open') ? "메뉴 접기" : "메뉴 전체보기";
                $(this).find('span').text(openerName);
            });
            
            $(window).on('resizeend', function(e){
                self._resize();
            });
            self._resize();
            //$(window).trigger('addResizeCallback', self._resize.bind(self));
        },

        _addMobileLinks: function(){
            var self = this;

            if(self.$mobileLinks == null){
                var toggleList = [];
                var itemList = {};
                self.$el.find('.link-wrap .link-section div.dep1').each(function(idx, item){
                    if(!$(item).hasClass('hidden')){
                        toggleList.push($(item).clone());

                        var id = $(item).attr("id");
                        itemList[id] = [];
                    }
                });

                self.$el.find('.link-wrap .link-section .dep2-wrap').each(function(idx, item){
                    var id = $(item).data('groupId');
                    //console.log(id)
                    $(item).find('> li').each(function(cdx, child){
                        if (itemList[id] instanceof Array) {
                            itemList[id].push($(child).clone());
                        }
                    });
                });


                var elements = "";
                elements += '<ul class="link-wrap ui_footer_accordion">';

                for(var i=0;i<toggleList.length;i++){
                    elements += '   <li class="link-section">';
                    elements += '       <ul role="tree" class="dep2-wrap ui_accord_content" aria-labelledby="depth1-' + (i+1) + '-1">';
                    elements += '       </ul>';
                    elements += '   </li>';
                }

                elements += '</ul>';

                $('.cont-area').prepend(elements);

                $('.link-wrap.ui_footer_accordion > li').each(function(idx, item){
                    $(toggleList[idx]).addClass('ui_accord_toggle');
                    $(item).prepend($(toggleList[idx]));
                    
                    var id = $(toggleList[idx]).attr("id");

                    var itemListId = itemList[id] ? itemList[id] : {}; 
                    var itemlistleng = $(itemListId[0]).find('ul').length;
                    if(itemlistleng) $(item).find('> ul').addClass('ui_footer_accordion');

                    for(var cdx in itemList[id]){
                        if(itemlistleng){
                            $(itemListId[cdx]).find('> .dep2').addClass('ui_accord_toggle');
                            $(itemListId[cdx]).find('> ul').addClass('ui_accord_content');
                        }

                        $(item).find('> ul').append($(itemListId[cdx]));
                    }

                    if(!itemListId.length){
                        $(item).find('> ul').remove();
                        $(toggleList[idx]).removeClass('ui_accord_toggle');
                    }
                });

                self.$mobileLinks = self.$el.find('.link-wrap.ui_footer_accordion');

                $('.ui_footer_accordion').vcAccordion({
                    singleOpen: true,
                    itemSelector: "> li",
                    toggleSelector: "> .ui_accord_toggle"
                });

                $('.ui_footer_accordion .ui_accord_toggle').each(function(idx, item){
                    $(item).find('> a').on('click', function(e){
                        console.log($(e.currentTarget).closest('.btn_open').length)
                        if(!$(e.currentTarget).closest('.btn_open').length){
                            console.log(this)
                            var href = $(e.currentTarget).attr('href');
                            location.href =href;
                        }
                    })
                });
            }
        },

        _resize: function(){
            var self = this,
                winwidth;

            winwidth = $(window).outerWidth(true);
            if(winwidth > 767){
                if(self.$mobileLinks != null){
                    $('.ui_footer_accordion').vcAccordion('collapseAll');
                    self.$mobileLinks.hide();
                }

                self.$pcLinkes.show();
            } else{
                self.$pcLinkes.hide();

                self._addMobileLinks();
                self.$mobileLinks.show();
            }
        }
    });

    return Footer;
});