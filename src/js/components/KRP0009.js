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
        var comptop;

        function init(){
            setting();
            bindEvents();
        }

        function setting(){
            $component = $('.KRP0009');
            $items = $component.find('.tab-menu-belt li');

            $subSticky = $('.KRC0040');

            selectIdx = 0;

            comptop = $component.offset().top;
        }

        function bindEvents(){
    
            $component.on('click', '.tab-menu-belt li a', function(e){
                e.preventDefault();
        
                var id = $(this).attr('href');
                scrollMoved(id);
            })
        
            $(window).on('scroll.KRP0009', function(e){
                var scrolltop = $(window).scrollTop();                
                var compheight = $component.height();
                
                if(-scrolltop + comptop < 0){
                    $component.addClass('fixed').css({
                        position:"fixed",
                        top:0,
                        zIndex:90
                    })
                } else{
                    $component.removeClass('fixed').removeAttr('style');
                }

                var currentIdx = -1;
                $items.each(function(idx, item){
                    var id = $(item).find('a').attr('href');
                    if($(id).length){
                        var contop = $(id).offset().top;
                        if(-scrolltop + contop < compheight){
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
        }

        function scrollMoved(id){
            if($(id).length){
                var movtop = $(id).offset().top - $component.height();
    
                $('html, body').stop().animate({scrollTop:movtop}, 200);
            }
        }
    
        init();
    })();
})