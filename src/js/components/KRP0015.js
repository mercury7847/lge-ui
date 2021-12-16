$(window).ready(function(){
    if(!document.querySelector('.KRP0015')) return false;

    $('.KRP0015').buildCommonUI();
    ;(function($, _$){      
        var compareSelect = 
            '<div class="select-wrap">'+
            ' <select class="ui_selectbox" id="compareSelect" name="compareSelect" title="비교하기 카테고리 선택">'+
            '{{#each item in list}}'+
            '<option value="{{item.value}}" {{item.selected}}>{{item.label}}</option> '+
            '{{/each}}'+
            '</select>'+
            '</div>';

        var itemTemplate =             
            '<div class="item-inner" data-id="{{id}}" data-b2bcatemapping="{{b2bcatemapping}}">'+
            '   <span class="img-area">'+
            '       <img src="{{productImg}}" alt="{{productAlt}}">'+
            '       <p class="blind">{{productAlt}}</p>'+
            '   </span>'+
            '   <div class="item-text">'+
            '       <p class="product-name">{{#raw productName}}</p>'+
            '       <p class="modal-name">{{productID}}</p>'+
            '   </div>'+
            '</div>'+
            '<button type="button" class="btn-close"><span class="blind">제품 비교하기에서 제거</span></button>';

        var isInitChecked = false;

        var compareIds = "";

        var isFirstOpen = true;
        function init(){
            self.willRemoveForCompare = false;

            //초기화
            $('.btn-init').on('click', function(e){
                setClearCompare();
            });

            //결과보기 버튼
            $('.btn-compare').on('click', function(e){
                e.preventDefault();

                var categoryId = $('.ui_selectbox').length === 0 ? lgkorUI.getHiddenInputData().categoryId : $('.ui_selectbox').vcSelectbox('value');
                lgkorUI.setCompapreCookie(categoryId);

                //비교하기 비우기
                //2021-03-16
                self.willRemoveForCompare = true;
                lgkorUI.removeCompareProd(categoryId);

                var url = $(this).data('url');
                if(url) {
                    location.href = url;
                }
            });

            $('.sticy-compare .list-inner li').on('click', '.btn-close', function(e){
                e.preventDefault();
                var $uiSelectbox = $('.ui_selectbox');
                var categoryId = $uiSelectbox.length === 0 ? lgkorUI.getHiddenInputData().categoryId : $uiSelectbox.vcSelectbox('value');
                var id = $(this).siblings('.item-inner').data("id");
                lgkorUI.removeCompareProd(categoryId, id);
            });

            $('.right-cont .more-arrow').on('click', function(e){
                e.preventDefault();
                if($(this).hasClass('close')) openCompareBox();
                else closeCompareBox();
            });

            var compareCate = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
            // 세션스토리지에 이전 데이터 형식이면 초기화 한다.
            for(var i in compareCate) {   
                if(vcui.isArray(compareCate[i]) || !compareCate[i].categoryName) {
                    lgkorUI.removeStorage(lgkorUI.COMPARE_KEY);
                    break;
                }
            }

            setCompares();
            setCompareStatus();
            _$(window).on("changeStorageData", function(e){
                setCompares(e.name || null);
                setCompareStatus(e.name || null);
            }).on("excessiveCompareStorage", function(){
                console.log("excessiveCompareStorage");
                addToastAlert('excessive');
                updateCompareButton();
            });
        }
        function setCompares(id){         
            if(id) {
                var categoryId = id 
            } else {
                var categoryId = lgkorUI.getHiddenInputData().categoryId;
            }
 
            var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY, categoryId);
            var isCompare = vcui.isEmpty(storageCompare);
            var compareCate = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);

            // 카테고리가 1개이상이면 selectbox 붙힌다
            if (Object.keys(compareCate).length > 1) {
                var selectData = {
                    'list': []
                }
                Object.keys(compareCate).map(function (key) {
                    var selected = '';
                    if (categoryId == key) selected = 'selected';
                    selectData['list'].push({
                        'label': compareCate[key].categoryName,
                        'value': key,
                        'selected': selected
                    });
                });

                if ($('.sticy-compare .select-wrap').length > 0) {
                    $('.sticy-compare .select-wrap').remove();
                }

                $('.sticy-compare .compare-title').after(vcui.template(compareSelect, selectData))
                $('.sticy-compare').addClass('cate-select');
                $('.ui_selectbox').vcSelectbox().on('change', function () {

                    var categoryId = $(this).val();
                    setCompares(categoryId);
                    setCompareStatus(categoryId);
                })
            }

            if(!isCompare){
                //console.log("### storageCompare ###", storageCompare)
                if(!vcui.isEmpty(storageCompare)){
                    var ids = vcui.array.map(storageCompare['data'], function(item){
                        return item.id;
                    }).join('|');
                    
                    if(compareIds != ids){
                        compareIds = ids;
                        //console.log("### setCompares render ###", compareIds)

                        console.log(storageCompare['data'].length);
                        $('.sticy-compare .list-inner li').empty();
                        storageCompare['data'].forEach(function(item,i){ 
                            console.log("item:",item)
                            list = $('.sticy-compare .list-inner li').eq(i);                    
                            listItem = vcui.template(itemTemplate, item);
                            list.html(listItem);
                        });


                    }
                }
            }

            var leng = isCompare ? "0" : storageCompare.data.length;
            var $count = $('div.compare-title div.count');
            $count.text(leng + "/" + lgkorUI.getCompareLimit());
            updateCompareButton();
        }

        function setCompareStatus(id){
            var $uiSelectbox = $('.ui_selectbox');

            if(id) {
                var categoryId = id 
            } else {
                var categoryId = lgkorUI.getHiddenInputData().categoryId;
            }

            var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY, categoryId);
            var isCompare = vcui.isEmpty(storageCompare);

            var leng = isCompare ? 0 : storageCompare.data.length;
            if(leng){
                //0329 1개 이상이면 열기로 바뀜
                var limit = 1;
                //var limit = window.breakpoint.name == "mobile" ? 2 : 3;                
                if(_$('.KRP0015').css('display') == 'none'){
                    var height = _$('.KRP0015').outerHeight(true);
                    _$('.KRP0015').css({display:'block', y:height});
                    if(leng < limit) closeCompareBox();
                    else{
                        if(isFirstOpen){
                            //2021-03-16 리밋에 도달하는 갯수가 되면 매번 열려야 한다고 해서 수정
                            //isFirstOpen = false;
                            openCompareBox();
                        } 
                    }
                } else{
                    var isOpen = $('.right-cont .more-arrow').hasClass('open');
                    if(!isOpen){
                        if(leng >= limit && isFirstOpen){
                            //isFirstOpen = false;
                            openCompareBox();
                        } 
                    }
                }

                isInitChecked = true;
            } else{
                var removeOption = $uiSelectbox.find('option').filter("[value="+categoryId+"]");

                if(removeOption.length > 0) removeOption.remove();
                if( $uiSelectbox.find('option').length === 1) {
                    $('.sticy-compare').removeClass('cate-select');
                    $uiSelectbox.parent().remove();
                }

                if(lgkorUI.getHiddenInputData().categoryId === categoryId) {
                    hideCompareBox();
                } else {
                    setCompares();
                }

                if(isInitChecked){
                    isInitChecked = false;
                    if(!self.willRemoveForCompare) {
                        addToastAlert();
                    } else {
                        self.willRemoveForCompare = false;
                    }
                }
            }
        }

        function openCompareBox(){
            $('.right-cont .more-arrow').removeClass('close').addClass('open');
            $('.right-cont .more-arrow').attr('aira-expanded', true);
            $('.right-cont .more-arrow span.blind').text('제품 비교하기 닫기');


            _$('.KRP0015').stop().transition({y:0}, 550, "easeInOutCubic");
        }

        function closeCompareBox(){
            $('.right-cont .more-arrow').removeClass('open').addClass('close');
            $('.right-cont .more-arrow').attr('aira-expanded', false);
            $('.right-cont .more-arrow span.blind').text('제품 비교하기 펼치기');

            var height = _$('.KRP0015').outerHeight(true) - $('.sticy-compare .compare-title').outerHeight(true);
            _$('.KRP0015').stop().transition({y:height}, 350, "easeInOutCubic");
            _$('body').addClass('open-compare');
        }

        function hideCompareBox(){
            $('.right-cont .more-arrow').removeClass('open').addClass('close');
            $('.right-cont .more-arrow').attr('aira-expanded', false);
            $('.right-cont .more-arrow span.blind').text('제품 비교하기 펼치기');

            var height = _$('.KRP0015').outerHeight(true);
            _$('.KRP0015').stop().transition({y:height}, 350, "easeInOutCubic", function(){
                _$('.KRP0015').css({display:'none', y:0});
            });
            _$('body').removeClass('open-compare');
        }

        function addToastAlert(mode){
            var msg;
            if(mode == "excessive"){
                msg = lgkorUI.getCompareLimit() + "개까지 비교가능합니다.";
            } else{
                msg = "비교하기 기능이 초기화되었습니다.";
            }

            _$(window).trigger("toastshow", msg);
        }

        function setClearCompare(){
            var $uiSelectbox = $('.ui_selectbox');
            var categoryId = $uiSelectbox.length === 0 ? lgkorUI.getHiddenInputData().categoryId : $uiSelectbox.vcSelectbox('value');
            var removeOption = $uiSelectbox.find('option').filter("[value="+categoryId+"]");

            if(removeOption.length > 0) removeOption.remove();
            if( $uiSelectbox.find('option').length === 1) {
                $('.sticy-compare').removeClass('cate-select');
                $uiSelectbox.parent().remove();
            }

            lgkorUI.removeCompareProd(categoryId);

        }

        function updateCompareButton() {
            var count = $('.compare-list .list-inner li>.item-inner').length;
            if(count > 1) {
                $('.btn-compare').prop('disabled',false);
            } else {
                $('.btn-compare').prop('disabled',true);
            }
        }

        // BTOCSITE-3547 [컴포넌트오류]WCMS에서 KRC0025 컴포넌트 케러셀 적용 시 미리보기에서 하단으로 펼쳐짐오류
        if(location.host.indexOf('cms') === -1) {
            init();
        }
        
    })(
        function (selector){
            return $('.KRP0015').find(selector); 
        }, $
    );
});
