$(window).ready(function(){
    if(!document.querySelector('.KRP0009')) return false;
    
    // vcui.require(['ui/sticky'], function () {
    //     var firstmargin = $('.KRC0040').outerHeight(true);
    //     $('.KRP0009').vcSticky({usedAnchor:true, anchorClass:".tab-menu > a", isContainerAbled:false, firstMarginTop:firstmargin}).on('changeanchor', function(e, data){
    //         console.log("data.selectIdx:", data.selectIdx)
    //         if(data.selectIdx < 1){
    //             $('.KRC0040').slideDown(150);
    //         } else{
    //             $('.KRC0040').slideUp(150);
    //         }
    //     });   
    // });

    ;(function(){
        var $component;
        var $items;
        var $subSticky;

        var selectIdx;

        function init(){
            setting();
            bindEvents();
        }

        function setting(){
            $component = $('.KRP0009');
            $items = $component.find('.tab-menu-belt li');
            $items.removeClass('active');

            $subSticky = $('.KRC0040');
            setSubStickyStatus();

            $component.parent().height($component.height());

            selectIdx = 0;
        }

        function bindEvents(){
    
            $component.on('click', '.tab-menu-belt li a', function(e){
                e.preventDefault();
        
                var id = $(this).attr('href');
                scrollMoved(id);
            })
        
            $(window).on('scroll.KRP0009', function(e){
                var scrolltop = $(window).scrollTop(); 

                var comptop = $component.parent().offset().top;        
                var dist = -scrolltop + comptop;
                if(dist <= 0){
                    $component.addClass('fixed').css({
                        position:"fixed",
                        top:0,
                        zIndex:90
                    });

                    var leng = $items.children().length;
                    var lastId = $items.eq(leng-1).find('a').attr('href');
                    if($(lastId).length){
                        var bottom = $(lastId).offset().top + $(lastId).outerHeight(true);
                        if(-scrolltop + bottom < 0){
                            if(!$component.data("isShow")){
                                $component.data('isShow', true);
                                $component.transition({y:-$component.height()}, 300, "easeInOutCubic");
                            } 
                        } else{
                            if($component.data("isShow")){
                                $component.data('isShow', false);
                                $component.transition({y:0}, 300, "easeInOutCubic");
                            } 
                        }
                    }
                } else{
                    $component.removeClass('fixed').removeAttr('style');
                }

                var currentIdx = -1;
                $items.each(function(idx, item){
                    var id = $(item).find('a').attr('href');
                    if($(id).length){
                        var contop = $(id).offset().top;
                        if(-scrolltop + contop < $component.height()){
                            currentIdx = idx;
                        }
                    }
                });

                if(currentIdx != selectIdx) selectIndex(currentIdx);
            });
        }

        function selectIndex(idx){            
            $items.removeClass('active');

            selectIdx = idx;

            if(selectIdx > -1) $items.eq(selectIdx).addClass('active');

            setSubStickyStatus();
        }

        function setSubStickyStatus(){
            var isShow = $subSticky.data('isShow')
            if(selectIdx == 0){
                if(!isShow){
                    $subSticky.data('isShow', true);
                    $subSticky.slideDown(150);
                }
            } else{
                if(isShow){
                    $subSticky.data('isShow', false);
                    $subSticky.slideUp(150);
                }
            }
        }

        function scrollMoved(id){
            if($(id).length){
                var movtop = $(id).offset().top - $component.height();

                var firstId = $items.eq(0).find('a').attr('href');
                if(id == firstId) movtop += 2;
    
                $('html, body').stop().animate({scrollTop:movtop}, 200);
            }
        }
    
        init();
    })();
})