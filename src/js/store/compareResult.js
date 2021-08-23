
;(function(){
    var resultTabs;

    function init(){
        vcui.require(['ui/sticky', 'ui/smoothScrollTab'], function () {
            setting();
            bindEvents();
        });
    }

    function setting(){
        var self = this;

        self.tabClones = [];
        $('.tabs-scroll-wrap .tabs li').each(function(idx, item){
            self.tabClones.push($(item).clone())
        });

        // BTOCSITE-3276 비교하기 > 스펙 항목 라인 안맞음
        var $li = [];
        $('#SP00014695 .list').each(function(idx,item){
            $li[idx] =  $(this).find('li:eq(3) dd')
            
            if(idx === 1) {
                if($li[0].height() !=  $li[1].height() ) {
                    var height =  Math.max($li[0].height(), $li[1].height())
                    $li[0].height(height);
                    $li[1].height(height);
                }
            }
        });


    }

    function bindEvents(){
        $('.result-tabs').on('change', 'input[name=differentCompare]', function(e){
            var chker = $(this).prop('checked');
            if(chker) setDifferentView();
            else setAllView();
        });

        $('div.compare-result').on('click','div.product-button a.buycart',function(e){
            e.preventDefault();
            var $li = $(this).parents('li');
            if($(this).hasClass("buycart")) {
                //구매
                if(lgkorUI.stringToBool($li.attr('data-requireCare'))) {
                    var obj = {
                        title:'해당 제품은 케어십이 필요한 제품입니다.<br>렌탈 장바구니에서 케어십 청약신청 후<br>구매하실 수 있습니다.',
                        ok: function (){
                            requestCart($li,"C");
                        }
                    };
                    lgkorUI.alert(null, obj);
                } else {
                    requestCart($li,"P");
                }
            } else {
                //렌탈
                requestCart($li,"C");
            }
        });
    }

    function requestCart($dm,cartType) {
        var ajaxUrl = $dm.attr('data-cart-url');
        
        var param = {
            "id":$dm.attr('data-id'),
            "sku":$dm.attr('data-sku'),
            "rtSeq":$dm.attr('data-rtSeq'),
            "typeFlag":cartType,
        }

        //var categoryId = $dm.attr('data-categoryId');
        //param.categoryId = categoryId ? categoryId : null;
        //var rtSeq = $dm.attr('data-rtSeq');
        //param.rtSeq = rtSeq ? rtSeq : null;
        //var requireCare = $dm.attr('data-requireCare');
        //param.requireCare = requireCare ? lgkorUI.stringToBool(requireCare) :null;

        lgkorUI.requestCart(ajaxUrl, param, true);
    }

    function setDifferentView(){
        var differentIDs = [];
        $('.compare-result-contents .section').each(function(idx, item){
            var lists = $(item).find('.lists .list');
            var leng = lists.length;
            var cleng = lists.eq(0).children().length;

            var differents = [];
            for(var j=0;j<cleng;j++){
                var diff = 0;
                var matchValue = "";
                for(var i=0;i<leng;i++){
                    var value = lists.eq(i).children().eq(j).find('dl dd').text();                    
                    if(matchValue != value){
                        diff++;
                        matchValue = value;
                    }
                }
                
                if(diff < 2) differents.push(j);
            }

            differentIDs.push(differents);
        });

        leng = differentIDs.length;
        for(i=0;i<leng;i++){
            var section = $('.compare-result-contents .section').eq(i);

            cleng = differentIDs[i].length;
            for(j=0;j<cleng;j++){
                var idx = differentIDs[i][j]+1;
                section.find('.lists > .list > li:nth-child(' + idx + ')').hide();
            }

            if(cleng == section.find('.lists > .list:first-child > li').length){
                section.hide();

                $('.tabs-scroll-wrap .tabs li').eq(i).addClass("delete");
            }
        }

        $('.tabs-scroll-wrap .tabs li.delete').remove();

        //$('.tabs-scroll-wrap .tabs li').removeClass('on');
        //$('.tabs-scroll-wrap .tabs li').eq(0).addClass('on');

        $('.compare-result.ui_sticky').vcSticky('update');
    }

    function setAllView(){
        var self = this;

        $('.tabs-scroll-wrap .tabs li').remove();
        for(var idx in self.tabClones) $('.tabs-scroll-wrap .tabs').append(self.tabClones[idx]);


        //$('.tabs-scroll-wrap .tabs li').eq(0).addClass('on');

        $('.compare-result-contents .section').show();
        $('.compare-result-contents .section .lists > .list > lI').show();
        $('.compare-result.ui_sticky').vcSticky('update');
    }

    $(document).ready(function(){
    //$(window).load(function(){
        init();
    })
})();