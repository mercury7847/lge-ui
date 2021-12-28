
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

        //20210924 BTOCSITE-5872
        if($('.compare-result-contents .section').length == 0) {
            $('.compare-result').vcSticky('destroy');
            $('.compare-result').removeClass('ui_sticky');
        }      
        
        // BTOCSITE-8348 [사용자행태분석 개선사항] ‘선택한 제품 비교하기’ 페이지에 제휴 혜택 내용 제공 (테스트할때 주석처리 해야함, local 테스트시 오류뜸)
        setDifferentBenefit();
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

        // BTOCSITE-8348 [사용자행태분석 개선사항] ‘선택한 제품 비교하기’ 페이지에 제휴 혜택 내용 제공
        $('.ui_selectbox').on('click', function(){
            alert('test')
            var selTxt = $(this).siblings('.ui-selectbox-view').find('.ui-select-text').text();
            
            $(this).parents('.card-selec-box').find('strong').addClass('mo-sel');
            
            if( !selTxt ){
                $(this).parents('.card-selec-box').find('strong').removeClass('mo-sel');
            }
        })
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

    // BTOCSITE-3276
    function setDifferentView(){
        var differentIDs = [];
        $('.compare-result-contents .section').each(function(idx, item){
            var lists = $(item).find('.compare-result-list tr');
            var leng = lists.length;
            var cleng = lists.eq(0).children().length;

            var differents = [];
            for(var j=0;j<leng;j++){
                var diff = 0;
                var matchValue = "";
                for(var i=0;i<cleng;i++){
                    var value = lists.eq(j).children().eq(i).find('dl dd').text();      
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
        console.log(leng);
        for(i=0;i<leng;i++){
            var section = $('.compare-result-contents .section').eq(i);

            cleng = differentIDs[i].length;
            for(j=0;j<cleng;j++){
                var idx = differentIDs[i][j]+1;
                section.find('.compare-result-list tr:nth-child(' + idx + ')').hide();
            }

            if(cleng == section.find('.compare-result-list tr').length){
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
        $('.compare-result-contents .section .lists .compare-result-list tr').show();
        $('.compare-result.ui_sticky').vcSticky('update');
    }

    //BTOCSITE-8348 [사용자행태분석 개선사항] ‘선택한 제품 비교하기’ 페이지에 제휴 혜택 내용 제공 (테스트할때 주석처리 해야함, local 테스트시 오류뜸)
    function setDifferentBenefit(){
        var memInp = $('.mem-point .input-wrap');
        var memBtn = $('.mem-point .btn-box');
        var memPoint = parseInt($('.mem-point .input-wrap').text());
        
        loginFlag = digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.unifyId ? "Y" : "N";
        if(lgkorUI.stringToBool(loginFlag)) {
            memInp.css('display', 'block');
            memBtn.css('display', 'none');
            if( memPoint == 0 ) {
                memInp.addClass('p-none');
            }
        } else{
            memBtn.css('display', 'block');
        }    
    }

    

    $(document).ready(function(){
    //$(window).load(function(){
        init();
    })
})();