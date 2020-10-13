$(window).ready(function(){
    if(!document.querySelector('.KRP0018')) return false;

    $('.KRP0018').buildCommonUI();
    
    ;(function($, _$){      
        var itemTemplate =             
            '<div class="item-inner" data-id={{id}}>'+
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

            $('.sticy-compare .list-inner li').on('click', '.btn-close', function(e){
                e.preventDefault();

                var id = $(this).siblings('.item-inner').data("id");
                lgkorUI.removeCompareProd(id);
            });

            $('.right-cont .more-arrow').on('click', function(e){
                e.preventDefault();

                if($(this).hasClass('close')) openCompareBox();
                else closeCompareBox();
            })

            setCompares();
            setCompareStatus();
            _$(window).on("changeStorageData", function(){
                setCompares();
                setCompareStatus();
            });
        }
        function setCompares(){
            $('.sticy-compare .list-inner li').empty();

            var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
            var isCompare = vcui.isEmpty(storageCompare);
            if(!isCompare){
                for(var i in storageCompare[lgkorUI.COMPARE_ID]){
                    var name = "compare-" + storageCompare[lgkorUI.COMPARE_ID][i]['id'];
                    
                    var list = $('.sticy-compare .list-inner li').eq(i);                    
                    var listItem = vcui.template(itemTemplate, storageCompare[lgkorUI.COMPARE_ID][i]);
                    list.html(listItem);
                }
            }

            var leng = storageCompare[lgkorUI.COMPARE_ID] == undefined ? "0" : storageCompare[lgkorUI.COMPARE_ID].length;
            $('.right-cont .count').text(leng + "/3");
        }

        function setCompareStatus(){
            var leng = $('.sticy-compare .list-inner li').children().length;
            if(leng){
                if(_$('.KRP0018').css('display') == 'none'){
                    var height = _$('.KRP0018').outerHeight(true);
                    _$('.KRP0018').css({display:'block', y:height});
                    openCompareBox();
                } 
            } else{
                hideCompareBox();
            }
        }

        function openCompareBox(){
            $('.right-cont .more-arrow').removeClass('close').addClass('open');

            _$('.KRP0018').stop().transition({y:0}, 550, "easeInOutCubic");
        }

        function closeCompareBox(){
            $('.right-cont .more-arrow').removeClass('open').addClass('close');

            var height = _$('.KRP0018').outerHeight(true) - $('.sticy-compare .compare-title').outerHeight(true);
            _$('.KRP0018').stop().transition({y:height}, 350, "easeInOutCubic");
        }

        function hideCompareBox(){
            $('.right-cont .more-arrow').removeClass('open').addClass('close');

            var height = _$('.KRP0018').outerHeight(true);
            _$('.KRP0018').stop().transition({y:height}, 350, "easeInOutCubic", function(){
                _$('.KRP0018').css({display:'none', y:0});
            });
        }

        function setClearCompare(){
            console.log("setClearCompare");
            lgkorUI.initCompareProd();
        }

        init();
    })(
        function (selector){
            return $('.KRP0018').find(selector); 
        }, $
    );
});
