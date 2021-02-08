$(window).ready(function(){
    if(!document.querySelector('.KRP0015')) return false;

    $('.KRP0015').buildCommonUI();
    ;(function($, _$){      
        var itemTemplate =             
            '<div class="item-inner" data-id="{{id}}">'+
            '   <span class="img-area">'+
            '       <img src="{{productImg}}" alt="{{productAlt}}">'+
            '       <p class="blind">{{productAlt}}</p>'+
            '   </span>'+
            '   <div class="item-text">'+
            '       <p class="product-name">{{productName}}</p>'+
            '       <p class="modal-name">{{productID}}</p>'+
            '   </div>'+
            '</div>'+
            '<button type="button" class="btn-close"><span class="blind">닫기</span></button>';

        var isInitChecked = false;

        function init(){
            //초기화
            $('.btn-init').on('click', function(e){
                setClearCompare();
            });

            //결과보기 버튼
            $('.btn-compare').on('click', function(e){
                var url = $(this).data('linkUrl');
                if(url) {
                    location.href = url;
                }
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
            });

            setCompares();
            setCompareStatus();
            _$(window).on("changeStorageData", function(){
                setCompares();
                setCompareStatus();
            }).on("excessiveCompareStorage", function(){
                addToastAlert('excessive');
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

            var compare = storageCompare[lgkorUI.COMPARE_ID]; 
            var leng = !compare ? "0" : compare.length;
            var $count = $('div.compare-title div.count');
            var countContent = $count.contents();
            countContent[3].textContent = lgkorUI.COMPARE_LIMIT;
            ($count.find('strong').contents()[1]).textContent = leng;
        }

        function setCompareStatus(){
            console.log("setCompareStatus~~");
            var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
            var compare = storageCompare[lgkorUI.COMPARE_ID]; 
            var leng = !compare ? "0" : compare.length;
            //var leng = storageCompare[lgkorUI.COMPARE_ID] == undefined ? 0 : storageCompare[lgkorUI.COMPARE_ID].length;
            console.log("leng:",leng)
            if(leng){
                var limit = window.breakpoint.name == "mobile" ? 2 : 3;
                if(_$('.KRP0015').css('display') == 'none'){
                    var height = _$('.KRP0015').outerHeight(true);
                    _$('.KRP0015').css({display:'block', y:height});

                    if(leng < limit) closeCompareBox();
                    else openCompareBox();
                } else{
                    var isOpen = $('.right-cont .more-arrow').hasClass('open');
                    if(!isOpen){
                        if(leng >= limit) openCompareBox();
                    }
                }

                isInitChecked = true;
            } else{
                hideCompareBox();

                if(isInitChecked){
                    isInitChecked = false;
                    addToastAlert();
                }
            }
        }

        function openCompareBox(){
            $('.right-cont .more-arrow').removeClass('close').addClass('open');

            _$('.KRP0015').stop().transition({y:0}, 550, "easeInOutCubic");
        }

        function closeCompareBox(){
            $('.right-cont .more-arrow').removeClass('open').addClass('close');

            var height = _$('.KRP0015').outerHeight(true) - $('.sticy-compare .compare-title').outerHeight(true);
            _$('.KRP0015').stop().transition({y:height}, 350, "easeInOutCubic");
        }

        function hideCompareBox(){
            $('.right-cont .more-arrow').removeClass('open').addClass('close');

            var height = _$('.KRP0015').outerHeight(true);
            _$('.KRP0015').stop().transition({y:height}, 350, "easeInOutCubic", function(){
                _$('.KRP0015').css({display:'none', y:0});
            });
        }

        function addToastAlert(mode){
            var msg;
            if(mode == "excessive"){
                msg = lgkorUI.COMPARE_LIMIT + "개까지 비교가능합니다.";
            } else{
                msg = "비교하기 기능이 초기화되었습니다.";
            }

            _$(window).trigger("toastshow", msg);
        }

        function setClearCompare(){
            lgkorUI.initCompareProd();
        }

        init();
    })(
        function (selector){
            return $('.KRP0015').find(selector); 
        }, $
    );
});
