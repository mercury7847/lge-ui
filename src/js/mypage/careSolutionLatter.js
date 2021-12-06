(function() {
    var careSolutionLatterItemTemplate = '<li class="lists">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="title line2">' +

                    '{{#if typeof stateFlag !== "undefined"}}' +

                        '{{#if stateFlag == "Y"}}' +
                            '<em class="proceed">[진행중]</em> ' +
                            '{{title}}' +
                        '{{#else}}' +
                            '<em>[쿠폰종료]</em> ' +
                            '{{title}}' +
                        '{{/if}}' +

                    '{{#else}}' +

                        '{{title}}' +
                    '{{/if}}' +

                '</span>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="accord-cont ui_accord_content" style="display:none;">' +
            '<div class="latter-acrord_content">' +
                '<div class="latter-item">' +
                    '<p class="text">' +
                        '{{subTitle}}' +
                    '</p>' +
                    '<a href="/my-page/care-solution-letter/care-info-detail?letterId={{letterId}}" class="btn-link">자세히 보기</a>' +
                '</div>' +

                '{{#if imageServerNameM || imagePathM}}' +
                    '<p class="thumb">' +
                        '<img src="{{imagePathM}}{{imageServerNameM}}" alt="썸네일 이미지">' +
                    '</p>' +
                '{{/if}}' +
                
            '</div>' +
        '</div>' +
    '</li>';


    $(window).ready(function() {

        var coupon = {
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();

                /* 초기 데이터 출력 */
                self.requestCareLatterData('info', 1);
                self.requestCareLatterData('coupon', 1);

            },
            setting: function() {
                
                var self = this;
                self.listData = [];
                self.visibleCount = 12;
                // self.visibleCount = 1;
                self.$contents = $('div.lnb-contents');
                self.$tab = self.$contents.find('div.ui_tab');

                self.$tabInfo = self.$contents.find('#tab-info');
                self.$tabCoupon = self.$contents.find('#tab-coupon');

                self.$cl_detail_info = self.$contents.find('.cl_info_detail_bTn');
                self.$cl_detail_coupon = self.$contents.find('.cl_coupon_detail_bTn');

                self.$cl_info_OnList = self.$tabInfo.find('div.cl_list ul');
                self.$cl_coupon_OnList = self.$tabCoupon.find('div.cl_list ul');

                //self.$cl_firstList = self.$tab.find('.cl_list ul li'); //추가
                
                self.$cl_infoMore = self.$tabInfo.find('button.btn-moreview');
                self.$cl_infoMore.data("page", 2);
                self.$cl_infoMore.data("tabIndex", 0);

                self.$cl_couponMore = self.$tabCoupon.find('button.btn-moreview');
                self.$cl_couponMore.data("page", 2);
                self.$cl_couponMore.data("tabIndex", 1);


                self.currentTab = function() {
                    var el = self.$tab.find('.on > a');
                    return el.attr('aria-controls').replace('tab-', '');
                };

                // self.$cl_infoMore.hide();
                // self.$cl_couponMore.hide();
                //self.$couponOnNoData = self.$tabInfo.find('div.no-data'); //
                //self.$couponEndNoData = self.$tabCoupon.find('div.no-data'); //
                //self.$couponPopup = $('#couponPopup'); //
                

                //쿠폰 디테일 페이지에서 쿠폰 탭 클릭시 쿠폰탭 유지
                var tabName = lgkorUI.getParameterByName('tabName');
                var currentIndex = 0;
                if( tabName != "" && tabName != undefined && tabName == "coupon") {
                    currentIndex = 1;
                } 
                $('.lc-tabs').vcTab('select', currentIndex, false);

                //console.log("sssssss", self.$cl_firstList);
            },

            // removeParam: function(key, sourceURL) {
            //     var rtn = sourceURL.split("?")[0],
            //         param,
            //         params_arr = [],
            //         queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
            //     if (queryString !== "") {
            //         params_arr = queryString.split("&");
            //         for (var i = params_arr.length - 1; i >= 0; i -= 1) {
            //             param = params_arr[i].split("=")[0];
            //             if (param === key) {
            //                 params_arr.splice(i, 1);
            //             }
            //         }
            //         if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
            //     }
            //     return rtn;
            // },

            replaceParam: function(url, paramName, paramValue){
                if (paramValue == null) {
                    paramValue = '';
                }
                var pattern = new RegExp('\\b('+paramName+'=).*?(&|#|$)');
                if (url.search(pattern)>=0) {
                    return url.replace(pattern,'$1' + paramValue + '$2');
                }
                url = url.replace(/[?#]$/,'');
                return url + (url.indexOf('?')>0 ? '&' : '?') + paramName + '=' + paramValue;
            },

            //파라미터가 붙어있는가의 분기
            addParam: function(url, name, value){
                if(url.indexOf(name) > -1) {
                    return self.replaceParam(url, name, value);
                } else {
                    return url + (url.indexOf('?') > -1 ? "&" : "?") + name + "=" + value; 
                }
            },

            bindEvents: function() {
                var self = this;
                
                //쿠폰 리스트의 자세히 보기 파라미터 보내는 버튼
                self.$tabCoupon.on('click','.btn-link' ,function(e) {
                    //e.preventDefault();
                    var tPram = lgkorUI.getParameterByName("contractID");
                    var slocation = $(this).attr('href');
                    var urlVal = slocation + "&contractID=" + tPram;

                    self.$tabCoupon.find('.btn-link').attr('href',urlVal);
                });

                //정보 리스트의 자세히 보기 파라미터 보내는 버튼
                self.$tabInfo.on('click','.btn-link' ,function(e) {
                    //e.preventDefault();
                    var tPram = lgkorUI.getParameterByName("contractID");
                    var slocation = $(this).attr('href');
                    var urlVal = slocation + "&contractID=" + tPram;

                    self.$tabInfo.find('.btn-link').attr('href',urlVal);
                });

                self.$contents.find('button.btn-moreview').on('click', function(e) {
                    var page = $(this).data("page");
                    $(this).data('page', page + 1);
                    console.log(self.currentTab(), page);
                    self.requestCareLatterData(self.currentTab(), page);
                    // self.addCouponList(tabIndex, page+1);
                });


                //정보,쿠폰 탭 구분하여 url 경로 분기
                function tabParam(type, paramValue){
                    var tPram = lgkorUI.getParameterByName("contractID");
                    var hrefValue = "/my-page/care-solution-letter";
                    if( type == "coupon")  {
                        hrefValue = hrefValue + "?tabName=coupon";
                    }
                    //현재 경로의 addParam함수의 hrefValue, contractID, tPram 붙이기
                    location.href = self.addParam(hrefValue, "contractID", tPram);
                }

                //정보 디테일 페이지 탭버튼 클릭시 파라미터 가지고 리스트로 이동
                self.$cl_detail_info.on('click', function(e) {
                    e.preventDefault();
                    var tPram = lgkorUI.getParameterByName("contractID"); //가져온 파라미터

                    tabParam("info", tPram)
                });
                //쿠폰 디테일 페이지 탭버튼 클릭시 파라미터 가지고 리스트로 이동
                self.$cl_detail_coupon.on('click', function(e) {
                    e.preventDefault();
                    var tPram = lgkorUI.getParameterByName("contractID"); //가져온 파라미터

                    tabParam("coupon", tPram)
                });
            },
            

            requestCareLatterData: function( cate , page ) {
                var self = this;
                /* ajax 인디케이터 시작 */
                lgkorUI.showLoading();

                var ajaxUrl = self.$contents.attr('data-clatter-list');

                var pageParam = (cate === 'info') ? 'infoPage' : 'couponPage';
                var ajaxParams = JSON.parse( '{ "' +  pageParam + '" : ' + page + '}' );

                //console.log("tttt", cate);
                
                lgkorUI.requestAjaxData(ajaxUrl, ajaxParams , function(result) {

                    var elList = (cate === 'info') ? self.$cl_info_OnList : self.$cl_coupon_OnList;
                    var data = (cate === 'info') ? result.data.infoList : result.data.couponList;

                    //console.log("test", tetete);
                    //console.log("리절트", result.data.infoList.listData[1].title);
                    //console.log("data??", data);

                    /* 비동기 데이터 출력 */
                    self.putList( elList, data );

                    //console.log("dnjTm", elList)
                    //console.log("dnjTm", data)

                    
                    //최종
                    if( page == 1) {
                        var $cl_firstList = $('.cl_list ul li').eq(0); //추가
                        var $cl_firstLust_accordCont = $cl_firstList.find('.accord-cont');
            
                        $cl_firstList.addClass('on');
                        $cl_firstLust_accordCont.show();

                    }


                    /* ajax 인디케이터 종료 */
                    lgkorUI.hideLoading();
                });
            },

            putList: function(el, rows) {
                var self = this;
                var pagination = rows.pagination;
                var moreBtn = el.closest('.tab-contents').attr('aria-labelledby').replace('tab-', '') === 'info' ? self.$cl_infoMore : self.$cl_couponMore;

                var isLast = self.visibleCount * pagination.page >= rows.totalCount;

                //console.log("더 보기", isLast);
                //console.log("page", pagination.page);
                //console.log("totalCount", rows.totalCount);
                //console.log("el", el);

                //console.log("11111111111111111111", rows.infoList);

                /* 페이징  값이 null일 경우와 마지막 페이지 일 경우 버튼 감춤 처리 */
                if (pagination.page === null || isLast) {
                    moreBtn.hide();
                }
                var listHTML = "";
                
                // $.each(rows.listData, function(idx, item) { //원래 이거 : rows.listData
                    
                //     //어드민에서 br로 떨어지게 작업
                //     item.subTitle = item.subTitle.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');
                //     //console.log(item.subTitle)

                //     //어드민에서 br로 떨어지게 작업 : 템플릿 구조 html 형식으로
                //     listHTML += vcui.template(careSolutionLatterItemTemplate, item);

                //     //console.log("1111111",rows.listData);
                //     //console.log("1111111",data); //안됨
                //     //console.log("1111111",result); //안됨
                //     //console.log("rows???", rows);

                //     //each 돌고
                //     //console.log("rows???", rows.listData[0].stateFlag);
                // });

                // el.html(listHTML);

                $.each(rows.listData, function(idx, item) { //원래 이거 : rows.listData

                    item.subTitle = item.subTitle.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n');

                    el.append(vcui.template(careSolutionLatterItemTemplate, item));

                    //console.log("1111111",rows.listData);
                    //console.log("1111111",data);
                    //console.log("1111111",result);
                    //console.log("rows???", rows);

                    //each 돌고
                    //console.log("rows???", rows.listData[0].stateFlag);
                });
            }
        }
        coupon.init();
    });
})();