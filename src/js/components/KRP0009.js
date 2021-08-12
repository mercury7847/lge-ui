$(window).ready(function(){
    if(!document.querySelector('.KRP0009')) return false;
    
    // vcui.require(['ui/sticky'], function () {
    //     var firstmargin = $('.KRC0040').outerHeight(true);
    //     $('.KRP0009').vcSticky({usedAnchor:true, anchorClass:".tab-menu > a", isContainerAbled:false, firstMarginTop:firstmargin}).on('changeanchor', function(e, data){
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
        var prevIdx;

        var checkHeight = 72;

        function init(){
            setting();
            bindEvents();

            //0329 정승우 기본적으로 제일 처음 아이템 1개를 선택해 달라고 해서 작업
            $items.eq(0).addClass('active');

            //BTOCSITE-1997 dpType, kisok 파라미터 chk용 - 210812
            var param = getUrlParams();
            var dpTypeChk = param.dpType;
            var kisokChk = param.kisok;

            if(dpTypeChk || kisokChk) {
                //dpTypeChk 파라미터가 있을 때
                $component.find("#extraBtn").show();
            }else{
                //dpTypeChk 파라미터가 없을 때
                $component.find("#extraBtn").hide();
            }
            //BTOCSITE-1997 dpType, kisok 파라미터 chk용 - 210812
        }

        function setting(){
            selectIdx = prevIdx = -1;

            $component = $('.KRP0009');
            $items = $component.find('.tab-menu-belt li');
            $items.removeClass('active');

            $subSticky = $('.KRC0040');
            setSubStickyStatus();
            

            $component.parent().height($component.height());
        }

        function bindEvents(){
    
            $component.on('click', '.tab-menu-belt li a', function(e){
                e.preventDefault();
        
                var id = $(this).attr('href');
                scrollMoved(id);
            });

            $(window).on('changeCategory.KRP0009', function(e,data){
                if(data){
                    var $li = $component.find('.tab-menu-belt li a[data-link-name="'+data.linkName+'"]' );
                    if($li.length > 0) {
                        $li.text(data.title);
                    }
                }
            });

            //jsw
            //$(window).trigger("changeButton.KRP0009",{"title":btnTitle,"disabled":false});
            // BTOCSITE-1997 렌탈 PDP페이지 탭영역 버튼 노출 수정 - 210812
             $(window).on('changeButton.KRP0009', function(e,data){
                //var btn = $component.find("a.extra-menu");
                var btn = $component.find("#extraBtn");
                if(data && data.title != "" && data.title != undefined) {
                    btn.find('span').text(data.title);
                    if(data.disabled) {
                        btn.addClass('disabled');
                    } else {
                        btn.removeClass('disabled')
                    }
                    btn.show();
                }else{
                    btn.hide(); // BTOCSITE-1997 210810 추가
                }
            });
            // BTOCSITE-1997 렌탈 PDP페이지 탭영역 버튼 노출 수정 - 210812

            //$component.find("a.extra-menu").on('click', function(e){
            $component.find("#extraBtn").on('click', function(e){
                e.preventDefault();

                if(!$(this).hasClass("disabled")) $(window).trigger("sendExtraAction.KRP0009");
            })
        
            $(window).on('scroll.KRP0009', function(e){
                var scrolltop = $(window).scrollTop(); 

                var paddingtop = parseInt($component.parent().css('padding-top'));
                var comptop = $component.parent().offset().top + paddingtop;

                var dist = -scrolltop + comptop;
                if(dist <= 0){
                    $component.addClass('fixed').css({
                        position:"fixed",
                        top:0,
                        zIndex:90
                    });

                    $subSticky.show();

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
                    $subSticky.hide();
                    $component.removeClass('fixed').removeAttr('style');
                }

                var currentIdx = -1;
                $items.each(function(idx, item){
                    var id = $(item).find('a').attr('href');
                    if($(id).length){
                        var contop = $(id).offset().top;
                        var compheight = checkHeight; /*$component.find('.product-simple-info').height();*/
                        if(-scrolltop + contop <= compheight/*$component.height()*/){
                            currentIdx = idx;
                        }
                    }
                });

                if(currentIdx == -1 && selectIdx == -1) {
                    //0329 정승우 기본적으로 제일 처음 아이템 1개를 선택해 달라고 해서 작업
                    $items.removeClass('active');
                    $items.eq(0).addClass('active');
                } else {
                    if(currentIdx != selectIdx) selectIndex(currentIdx);
                }
            });
        }

        function selectIndex(idx){          
            $items.removeClass('active');

            prevIdx = selectIdx;
            selectIdx = idx;

            if(selectIdx > -1) $items.eq(selectIdx).addClass('active');

            setSubStickyStatus();
        }

        function setSubStickyStatus(){
            var chk = false;
            if(selectIdx < 0){
                if(prevIdx < 1) chk = true;
            } else if(selectIdx == 0) chk = true;

            //if(selectIdx < 1) chk = true;

            if(chk) $subSticky.show().find('.inner').slideDown(150);
            else $subSticky.find('.inner').slideUp(150, function(){$subSticky.hide()});;
        }

        function scrollMoved(id){
            if($(id).length){
                var compheight = $items.eq(0).height();
                if(compheight < checkHeight) {
                    compheight = checkHeight;
                } else {
                    checkHeight = compheight;
                }
                //var firstId = $items.eq(0).find('a').attr('href');
                //if(id == firstId) compheight = 72;
                
                var movtop = $(id).offset().top - compheight+2;
    
                $('html, body').stop().animate({scrollTop:movtop}, 200);
            }
        }

        // BTOCSITE-1997 getParameter 처리 - 210812
        function getUrlParams() {
            var params = {};
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
            return params;
        };
        // BTOCSITE-1997 getParameter 처리 - 210812
    
        init();
    })();
})