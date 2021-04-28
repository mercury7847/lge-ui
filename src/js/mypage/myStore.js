
(function(){

    var listItemTemplate = '<li data-id="{{id}}">' +
        '<div class="item">' +
            '<span class="branch">{{title}}</span>' +
            '<a href="{{url}}" class="title"><strong>{{address}}</strong></a>' +
            '<span class="phone">{{tel}}</span>' +
            '<span class="detail"><a href="{{url}}" class="btn-link">상세보기</a></span>'+
            '<div class="bookmark">' +
                '<span class="chk-bookmark-wrap">' +
                    '<input type="checkbox" id="mark-shop-{{index}}" name="mark-shop" {{#if bookmark}}checked{{/if}}>' +
                    '<label for="mark-shop-{{index}}"><span class="blind">단골매장 {{#if bookmark}}설정됨{{#else}}설정하기{{/if}}</span></label>' +
                '</span>' +
            '</div>' +
            '<div class="share-area">' +
                '<div class="tooltip-wrap share">' +
                    '<a href="#n" class="tooltip-icon ui_tooltip-target" data-fixed="fixed-right" ui-modules="TooltipTarget"><span class="blind">제품 공유하기</span></a>' +
                    '<div class="tooltip-box">' +
                        '<span class="title">공유하기</span>' +
                        '<div class="sns-wrap">' +
                            '<ul class="sns-list">' +
                                '{{#if facebook}}<li><a href="#none" data-url="{{facebook}}" class="ico-btn fb" title="페이스북에 공유하기, 새창열림" data-link-name="facebook">페이스북<span class="blind">으로 페이지 공유하기</span></a></li>{{/if}}' +
                                '{{#if twitter}}<li><a href="#none" data-url="{{twitter}}" class="ico-btn tw" title="트위터에 공유하기, 새창열림" data-link-name="twitter">트위터<span class="blind">로 페이지 공유하기</span></a></li>{{/if}}' +
                                '{{#if kakao}}<li><a href="#none" data-url="{{kakao}}" class="ico-btn kk" title="카카오톡에 공유하기, 새창열림" data-link-name="kakaotalk">카카오톡<span class="blind">으로 페이지 공유하기</span></a></li>{{/if}}' +
                                '{{#if urlCopy}}<li><a href="#none" data-url="{{urlCopy}}" class="ico-btn url" data-link-name="copy_url">URL복사<span class="blind">하기</span></a></li>{{/if}}' +
                            '</ul>' +
                        '</div>' +
                        '<button type="button" class="btn-close"><span class="blind">닫기</span></button>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="btn-area">' +
                '<a href="{{requestUrl}}" class="btn border size"><span>매장 방문 예약</span></a>' +
            '</div>' +
        '</div>' +
    '</li>'

    $(window).ready(function() {

        var myStore = {         
            init: function() {
                var self = this;
                vcui.require(['ui/pagination'], function () {             
                    self.setting();
                    self.bindEvents();
                    self.requestData(1);
                });
            },

            setting: function() {
                var self = this;  
                self.$contents = $('div.lnb-contents');
                //매장리스트
                self.$storeList = self.$contents.find('ul.bookmark-store-list');
                self.$customerInfo = self.$contents.find('div.my-contract-info p.tit');
                //self.$totalCount = self.$contents.find('div.my-contract-info p em');
                self.$pagination = self.$contents.find('.pagination').vcPagination();                
                self.$noData = self.$contents.find('div.no-data');

                self.checkNoData();
            },

            bindEvents: function() {
                var self = this;

                //스토어 즐겨찾기
                self.$storeList.on('click','li div.bookmark input', function(e) {
                    e.preventDefault();
                    var _id = $(this).parents('li').attr('data-id');
                    //var checked = $(this).is(':checked');
                    //self.requestBookmark(_id, checked);
                    self.requestBookmark(_id, false);
                });

                //페이지 클릭
                self.$pagination.on('page_click', function(e, data) {
                    self.requestData(data);
                });
            },

            requestData: function(page) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, {"page":page}, function(result) {
                    var data = result.data;
                    var param = result.param;
                    
                    self.$pagination.vcPagination('setPageInfo',param.pagination);

                    var name = data.customerName;
                    var count = vcui.number.addComma(data.totalCount);
                    self.$customerInfo.html(name + ' 고객님의 단골매장은 총 <em>'+ count + '</em>개 입니다.');

                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$storeList.empty();

                    arr.forEach(function(item, index) {
                        item.index = index;
                        self.$storeList.append(vcui.template(listItemTemplate, item));
                    });
                    self.checkNoData();
                    self.$storeList.find('.ui_tooltip-target').vcTooltipTarget();
                });
            },

            requestBookmark: function(_id, bookmark) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-bookmark-url');
                var postData = {"id":_id, "bookmark":bookmark};
                
                if(bookmark) {
                    /*
                    lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                        var data = result.data;
                        if(lgkorUI.stringToBool(data.success)) {
                            $(window).trigger("toastshow","단골매장이 등록되었습니다.");
                            self.$storeList.find('li[data-id="'+_id+'"] span.chk-bookmark-wrap input').prop("checked",bookmark);
                        } else {
                            self.$storeList.find('li[data-id="'+_id+'"] span.chk-bookmark-wrap input').prop("checked",!bookmark);
                        }
                    });
                    */
                } else {
                    var obj = {title:'', cancelBtnName:'아니오', okBtnName:'네',
                        ok: function (){
                            lgkorUI.requestAjaxDataPost(ajaxUrl, postData, function(result){
                                var data = result.data;
                                if(lgkorUI.stringToBool(data.success)) {
                                    $(window).trigger("toastshow","단골매장이 해제되었습니다.");
                                    self.$storeList.find('li[data-id="'+_id+'"] span.chk-bookmark-wrap input').prop("checked",bookmark);
                                    //reloadPage
                                    var page = self.$pagination.attr('data-page');
                                    self.requestData(page);
                                } else {
                                    self.$storeList.find('li[data-id="'+_id+'"] span.chk-bookmark-wrap input').prop("checked",!bookmark);
                                }
                            });
                        }
                    };
                    var desc = '단골매장을 해제하시겠습니까?';
                    lgkorUI.confirm(desc, obj);
                }
            },

            checkNoData: function() {
                var self = this;
                var $list = self.$storeList.find('li');
                if($list.length > 0) {
                    self.$pagination.show();
                    self.$noData.hide();
                } else {
                    self.$pagination.hide();
                    self.$noData.show();
                }
            },
        }
        
        myStore.init();
    });
})();