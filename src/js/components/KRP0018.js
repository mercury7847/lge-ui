$(window).ready(function(){
    if(!document.querySelector('.KRP0018')) return false;

    $('.KRP0018').buildCommonUI();
    
    ;(function($, _$){      
        var itemTemplate =             
            '<div class="item-inner" data-modelId={{id}}>'+
            '   <span class="img-area">'+
            '       <img src="{{productImg}}" alt="{{productAlt}}">'+
            '       <p class="hidden">{{productAlt}}</p>'+
            '   </span>'+
            '   <div class="item-text">'+
            '       <p class="product-name">{{productName}}</p>'+
            '       <p class="modal-name">{{productID}}</p>'+
            '   </div>'+
            '</div>'+
            '<button type="button" class="btn-close"><span class="blind">닫기</span></button>';

        function init(){
            $('.btn-init').on('click', function(e){
                setClearCompare();
            });

            $('.sticy-compare .list-inner li').on('click', function(){

            });

            setCompares();
        }
        function setCompares(){
            $('.sticy-compare .list-inner li').empty();

            var isAppend = false;
            var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
            var isCompare = vcui.isEmpty(storageCompare);
            if(!isCompare){
                for(var i in storageCompare[lgkorUI.COMPARE_ID]){
                    var name = "compare-" + storageCompare[lgkorUI.COMPARE_ID][i]['id'];
                    
                    var list = $('.sticy-compare .list-inner li').eq(i);                    
                    var listItem = vcui.template(itemTemplate, storageCompare[lgkorUI.COMPARE_ID][i]);
                    list.html(listItem);
                }

                isAppend = true;
            }

            if(isAppend){
                $('.right-cont .count').text(storageCompare[lgkorUI.COMPARE_ID].length + "/3");
                $('.right-cont .more-arrow').removeClass('close').addClass('open');

                var height = _$('.KRP0018').outerHeight(true);
                _$('.KRP0018').css({display:'block', y:height}).transition({y:0}, 550, "easeInOutCubic");
            }
        }

        function setClearCompare(){
            console.log("setClearCompare")
        }

        init();
    })(
        function (selector){
            return $('.KRP0018').find(selector); 
        }, $
    );
});
