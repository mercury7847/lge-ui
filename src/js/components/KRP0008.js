(function() {
    var additionalItemTemplate = '<li data-id="{{id}}" data-quantity="1" data-price="{{price}}">' +
        '<dl class="price-info">' +
            '<dt class="text">{{title}}</dt>' +
            '<dd class="content">' +
                '<div class="quantity-wrap">' +
                    '<div class="select-quantity"><div class="inner">' +
                        '<button type="button" class="minus" disabled><span class="blind">빼기</span></button>' +
                        '<input type="number" class="quantity" title="수량 입력" value="1" readonly>' +
                        '<button type="button" class="plus"><span class="blind">더하기</span></button>' +
                    '</div></div>' +
                '</div><span class="price"><em class="blind">판매가</em>{{priceString}}</span>' +
            '</dd>' +
        '</dl>' +
        '<button type="button" class="btn-delete"><span class="blind">삭제</span></button>' +
    '</li>';

    var awardPopupItemTemplate = '<li>' +
        '<a href="#" class="award-item">' + 
        '<span class="image"><img src="{{storyPdpThumbnailPath}}{{storyPdpThumbnailServerName}}" alt="{{storyPdpThumbnailAltText}}" onError="lgkorUI.addImgErrorEvent(this);"></span>' +
        '<span class="text">{{storyTitle}}</span>' +
        '</a>' +
    '</li>';

    //$(window).ready(function(){
        //if(!document.querySelector('.KRP0008')) return false;

        //$('.KRP0008').buildCommonUI();
        
        var KRP0008 = {
            init: function() {
                var self = this;
                //처음 로그인 체크를 하는 ajax 호출 여부
                self.processProductBuy = null;
                self.loginCheckEnd = false;

                self.isDragging = false;

                self.setting();
                self.popUpDataSetting();

                //최근본 제품 쿠키에 넣기
                if(typeof lgePdpSendData !== 'undefined' && lgePdpSendData.modelId) {
                    lgkorUI.addCookieArrayValue(lgkorUI.RECENT_PROD_COOKIE_NAME,lgePdpSendData.modelId,lgkorUI.MAX_SAVE_RECENT_PRODUCT);

                    //최근본 제품 서버에 등록
                    var ajaxUrl = self.$pdpInfo.attr('data-recent-url');
                    if(ajaxUrl) {
                        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ajaxUrl, {"requestId":lgePdpSendData.modelId}, null);
                    }
                }

                if(self.$component.data('consumables')) {
                    vcui.require(['support/consumables.min'], function (consumables) {
                        self.prepare();
                        self.consumables = consumables;
                    });
                } else {
                    self.prepare();
                }
            },

            prepare: function() {
                var self = this;

                if(!Array.indexOf){
                    Array.prototype.indexOf = function(obj){
                        for(var i=0; i<this.length; i++){
                            if(this[i]==obj){
                                return i;
                            }
                        }
                        return -1;
                    }
                };

                //핀치줌
                vcui.require(['ui/pinchZoom'], function (PinchZoom) {
                    self.pinchZoom = new PinchZoom('.zoom-area');
    
                    self.$popPdpVisual.find('div.zoom-btn-area a.zoom-plus').on('click', function(e){
                        e.preventDefault();
                        var zoom =self. pinchZoom.getZoomFactor();
                        if(Math.round(zoom) >= 4) zoom = 0;
                        self.pinchZoom.runZoom(zoom+1, true); 
                    });
    
                    self.$popPdpVisual.find('div.zoom-btn-area a.zoom-minus').on('click', function(e){
                        e.preventDefault();
                        var zoom =self.pinchZoom.getZoomFactor();
                        self.pinchZoom.runZoom(zoom-1, true); 
                    });
    
                    self.$popPdpVisualImage.mousedown(function() {
                        self.isDragging = false;
                    })
                    .mousemove(function() {
                        self.isDragging = true;
                     })
                    .mouseup(function() {
                        var wasDragging = self.isDragging;
                        self.isDragging = false;
                        if (!wasDragging) {
                            self.$popPdpVisual.find('div.zoom-btn-area a.zoom-plus').trigger('click');
                        }
                    });
                    
                    //pinchZoom.update(true);

                    self.bindProductEvents();
                    self.bindPopupEvents();
                    self.bindSideEvents();
                });

                //로그인,찜하기 관련 데이타 가져오기
                self.getRewardInfo();
                //비교하기 체크
                self.setCompares();

                //찜하기 체크
                var ajaxUrl = self.$pdpInfo.attr('data-wish-url');
                lgkorUI.checkWishItem(ajaxUrl);

                //전달받은 리뷰카운트를 krp0009 컴퍼넌트에 넘김
                if(typeof reviewsCount !== 'undefined' && reviewsCount != "") {
                    if(parseInt(reviewsCount) > 0) {
                        $(window).trigger("changeCategory.KRP0009",{"title":"리뷰(" + reviewsCount + ")","linkName":"review"});
                    }
                }
            },

            setting: function() {
                var self = this;
                //pdp데이타
                self.$pdpData = $('#pdp-data');

                //콤포넌트
                self.$component = $('section.component.KRP0008');

                //데스크탑용 갤러리
                self.$pdpVisual = $('#desktop_summary_gallery div.pdp-visual');
                //데스크탑용 갤러리 이미지
                self.$pdpImage = self.$pdpVisual.find('div.pdp-visual-image');
                //데스크탑용 갤러리 썸네일리스트
                self.$pdpThumbnail = self.$pdpVisual.find('div.pdp-thumbnail-nav div.inner div.pdp-thumbnail-list ul.thumbnail-list');
                self.$pdpThumbnail.find('li > a').append('<span class="blind">선택안됨</span>');
                //선택된 데스크탑 썸네일
                self.$selectItemTarget = self.$pdpThumbnail.find('li.active');
                self.$selectItemTarget.find('.blind').text("선택됨");

                //모바일용 갤러리
                self.$pdpMobileVisual = $('#mobile_summary_gallery');
                //self.$pdpMobileVisual.hide();
                //모바일용 갤러리 슬라이더
                self.$pdpMobileSlider = self.$pdpMobileVisual.find('div.ui_carousel_slider');
                //모바일용 갤러리 썸네일 슬라이더
                self.$pdpMobileSliderTrack = self.$pdpMobileSlider.find('div.slide-content ul.slide-track');
                //모바일용 갤러리 인덱스
                self.$slideNumber = self.$pdpMobileVisual.find('div.slide-number .current');

                //PDP 더보기
                self.$pdpMoreInfo = self.$component.find('div.pdp-visual-wrap div.pdp-more-info');
                
                //PDP모달
                self.$popPdpVisual = $('#pop-pdp-visual');
                //PDP모달 360
                self.$popPdpVisual360 = self.$popPdpVisual.find('#modal_detail_target div.item.r360');
                //PDP모달 이미지타입
                self.$popPdpVisualImage = self.$popPdpVisual.find('#modal_detail_target div.item.image');
                //PDP모달 비디오타입
                self.$popPdpVisualVideo = self.$popPdpVisual.find('#modal_detail_target div.item.video');
                //PDP모달 애니메이션타입
                self.$popPdpVisualAnimation = self.$popPdpVisual.find('#modal_detail_target div.item.animation');
                //PDP모달 썸네일 리스트
                self.$popPdpThumbnail = self.$popPdpVisual.find('div.pop-pdp-thumbnail-nav ul.pop-thumbnail-list');
                //선택된 PDP모달 썸네일
                self.$selectModalItemTarget = self.$popPdpThumbnail.find('li.active');
                //PDP모달 확대축소 버튼영역
                self.$popPdpZoomArea = self.$popPdpVisual.find('div.zoom-btn-area');
                //PDP모달 item-number
                self.$itemNumber = self.$popPdpVisual.find('div.item-number .current');

                //PDP 인포
                self.$pdpInfo = $('div.pdp-info-area');
                self.$mobilePdpInfo = $('div.mobile-pdp-info');
                self.$pdpInfoProductDetailInfo = self.$pdpInfo.find('.product-detail-info');
                self.$productBuyOptionTab = self.$pdpInfoProductDetailInfo.find('.ui_tab:eq(0)');
                self.$pdpInfoSiblingOption = self.$pdpInfo.find('.sibling-option');
                
                //PDP 제품구매/렌탈 선택 탭
                self.$pdpInfoTab = self.$pdpInfo.find('.product-detail-info .ui_tab:eq(0)');

                //가격정보
                self.$pdpInfoPaymentAmount = self.$pdpInfo.find('.payment-amount');
                self.$pdpInfoPaymentAmount.data('quantity',1); //기본수량 1 세팅
                if(typeof productPrice !== 'undefined' && productPrice != "") {
                    self.$pdpInfoPaymentAmount.data('price',productPrice);
                } else {
                    self.$pdpInfoPaymentAmount.data('price',0);
                }
                
                var $paymentInput = self.$pdpInfoPaymentAmount.find('input.quantity');
                $paymentInput.each(function(index, item){
                    var $paymentAmount = $(item).parents('.payment-amount');
                    $paymentAmount.data('quantity',item.value);
                });
                self.$pdpInfoPaymentAmount.each(function(index,item){
                    self.updatePaymentAmountPrice($(item));
                });

                //
                self.$pdpInfoAdditionalPurchase = self.$pdpInfo.find('.additional-purchase');
                //
                //self.$pdpInfoAllCareshipService = self.$pdpInfo.find('.careship-service');
                self.$pdpInfoCareshipService = self.$pdpInfo.find('div.careship-service');

                self.$pdpInfoCareSiblingOption = self.$pdpInfo.find('div.care-sibling-option');
                
                //렌탈 가격 정보 정리
                self.rentalInfoData = null;
                var selectRtModelSeq = null;
                var selectRtRgstFeePre = null
                var selectDutyTerm = null;

                var rentalSelectBoxIndex1 = 0;
                var rentalSelectBoxIndex2 = 0;
                var rentalSelectBoxIndex3 = 0;

                if(typeof rentalInfo !== 'undefined' && rentalInfo.length > 0) {
                    //test data
                    //rentalInfo = [{"years3TotAmt":36900,"visitPer":"3","rtRgstFeePre":0,"freeMonthDisplayYn":"Y","rentalCareType":"R","years1TotAmt":36900,"caresolutionSalesCodeSuffix":"WD503AS.AKOR","years2TotAmt":36900,"years6TotAmt":0,"rtFreePeriod":"13,25,37","rtModelSeq":"1543180","dutyTerm":"3","representChargeFlag":"N","contractTerm":"5","years5TotAmt":31900,"years4TotAmt":31900,"freeMonth":3},{"years3TotAmt":36900,"visitPer":"3","rtRgstFeePre":0,"freeMonthDisplayYn":"Y","rentalCareType":"R","years1TotAmt":36900,"caresolutionSalesCodeSuffix":"WD503AS.AKOR","years2TotAmt":36900,"years6TotAmt":0,"rtFreePeriod":"13,25,37","rtModelSeq":"1543181","dutyTerm":"4","representChargeFlag":"Y","contractTerm":"5","years5TotAmt":31900,"years4TotAmt":31900,"freeMonth":3},{"years3TotAmt":36900,"visitPer":"3","rtRgstFeePre":0,"freeMonthDisplayYn":"Y","rentalCareType":"R","years1TotAmt":36900,"caresolutionSalesCodeSuffix":"WD503AS.AKOR","years2TotAmt":36900,"years6TotAmt":0,"rtFreePeriod":"13,25,37","rtModelSeq":"1543182","dutyTerm":"3","representChargeFlag":"N","contractTerm":"5","years5TotAmt":31900,"years4TotAmt":31900,"freeMonth":3}];
                    var rentalPriceData = {};
                    rentalInfo.forEach(function(item, index) {
                        //가입비
                        var rtRgstFeePre = ("" + item.rtRgstFeePre);
                        //의무사용 기간
                        var dutyTerm = item.dutyTerm;
                        //방문
                        //var visitPer = item.visitPer;

                        var dataByFee = rentalPriceData[rtRgstFeePre];
                        if(!dataByFee) {
                            dataByFee = {};
                        }

                        var dataByDuty = dataByFee[dutyTerm];
                        if(!dataByDuty) {
                            dataByDuty = [];
                        }
                        dataByDuty.push(item);

                        dataByFee[dutyTerm] = dataByDuty;
                        rentalPriceData[rtRgstFeePre] = dataByFee;

                        if(item.representChargeFlag == "Y") {
                            selectRtModelSeq = item.rtModelSeq;
                            selectRtRgstFeePre = rtRgstFeePre;
                            selectDutyTerm = dutyTerm;
                        }
                    });
                    self.rentalInfoData = rentalPriceData;
                }

                //최초 기본값 찾기
                if(selectRtModelSeq) {
                    var array = Object.keys(self.rentalInfoData);
                    for (var i = 0, len = array.length; i < len; i++) {
                        if(array[i] == selectRtRgstFeePre) {
                            rentalSelectBoxIndex1 = i;
                            break;
                        }
                    }

                    var dataByFee = self.rentalInfoData[selectRtRgstFeePre];
                    var array = Object.keys(dataByFee);
                    for (var i = 0, len = array.length; i < len; i++) {
                        if(array[i] == selectDutyTerm) {
                            rentalSelectBoxIndex2 = i;
                            break;
                        }
                    }

                    var array = dataByFee[selectDutyTerm];
                    for (var i = 0, len = array.length; i < len; i++) {
                        if(array[i].representChargeFlag == "Y") {
                            rentalSelectBoxIndex3 = i;
                            break;
                        }
                    }
                }


                //렌탈 케어솔루션 계약기간
                self.$caresolutionRentalInfoSelectBox = self.$pdpInfoCareSiblingOption.find('div.info-accordion-wrap .ui_selectbox');
                if(self.rentalInfoData && self.$caresolutionRentalInfoSelectBox.length > 0) {
                    //가입비 세팅
                    self.rentalInfoSelectBoxUpdate(0,self.rentalInfoData,rentalSelectBoxIndex1,false);

                    //의무사용기간 세팅
                    var firstKey = Object.keys(self.rentalInfoData)[rentalSelectBoxIndex1];
                    var dutyTermData = self.rentalInfoData[firstKey];
                    if(dutyTermData) {
                        self.rentalInfoSelectBoxUpdate(1,dutyTermData,rentalSelectBoxIndex2,false);

                        //방문주기
                        firstKey = Object.keys(dutyTermData)[rentalSelectBoxIndex2];
                        var visitPerData = dutyTermData[firstKey]
                        if(visitPerData) {
                            self.updateRentalInfoPrice(visitPerData[rentalSelectBoxIndex3]);
                            self.rentalInfoSelectBoxUpdate(2,visitPerData,rentalSelectBoxIndex3,true);
                        }
                    }
                }

                //케어십 가격 정보 정리
                var careSelectIndex = 0;

                self.careshipInfoData = null;
                if(typeof careShipInfo !== 'undefined' && careShipInfo.length > 0) {
                    self.careshipInfoData = careShipInfo;
                    for (var i = 0, len = careShipInfo.length; i < len; i++) {
                        if(careShipInfo[i].representChargeFlag == "Y") {
                            careSelectIndex = i;
                            break;
                        }
                    }
                }

                //케어십 계약기간
                self.$careshipInfoSelectBox = self.$pdpInfoCareshipService.find('.ui_selectbox:eq(0)');
                if(self.careshipInfoData && self.$careshipInfoSelectBox.length > 0) {
                    self.updateCareshipInfoPrice(self.careshipInfoData[careSelectIndex]);
                    self.careshipInfoSelectBoxUpdate(self.$careshipInfoSelectBox,self.careshipInfoData,careSelectIndex,true);
                }

                //렌탈 케어솔루션 제휴카드 리스트 정리
                var isTab = false;

                self.rentalCardList = [];
                if(typeof rentalAssociatedCardList !== 'undefined' && rentalAssociatedCardList.length > 0) {
                    self.rentalCardList = self.makeAssociatedCardListData(rentalAssociatedCardList);
                }

                self.$rentalCardList = self.$pdpInfoCareSiblingOption.find('.select-box:eq(3)');
                if(self.$rentalCardList.length > 0) {
                    isTab = true;
                    self.updateAssociatedCardList(self.$rentalCardList, self.rentalCardList);
                }

                //케어십 제휴카드 리스트 정리
                self.careCardList = [];
                if(typeof careshipAssociatedCardList !== 'undefined' && careshipAssociatedCardList.length > 0) {
                    self.careCardList = self.makeAssociatedCardListData(careshipAssociatedCardList);
                }

                self.$careshipCardList = self.$pdpInfoCareshipService.find('.select-box:eq(1)');
                if(self.$careshipCardList.length > 0) {
                    isTab = true;
                    self.updateAssociatedCardList(self.$careshipCardList, self.careCardList);
                }

                if(!isTab) {
                    var $paymentAmount = self.$pdpInfoProductDetailInfo.find('.payment-amount');
                    var $cardList = self.$pdpInfoProductDetailInfo.find('div.care-sibling-option > .select-box');
                    var $careshipService = $paymentAmount.siblings('.careship-service');
                    var checkinput = $careshipService.find('input[type=radio]:checked');
                    if(checkinput.length > 0) {
                        //케어쉽 선택 버튼이 있으므로 케어타입
                        self.updateAssociatedCardList($cardList, self.careCardList);
                    } else {
                        //렌탈타입
                        self.updateAssociatedCardList($cardList, self.rentalCardList);
                    }
                }

                //최초 케어쉽 체크 여부
                var checkinput = self.$pdpInfoCareshipService.find('input[type=radio]:checked');
                if(checkinput.length > 0) {
                    var check = lgkorUI.stringToBool(checkinput.val());
                    var $paymentAmount = self.$pdpInfoCareshipService.siblings('div.payment-amount');
                    self.updatePaymentAmountState($paymentAmount, check);
                }

                //리뷰 클릭하기
                self.$pdpInfoProductDetailInfo.on('click','.star-rating-wrap a', function(e) {
                    e.preventDefault();
                    var href = $(this).attr('href');
                    self.scrollMovedById(href);
                });

                //
                self.$pdpMobileSlider.vcCarousel({
                    infinite: false,
                    autoplay: false,
                    swipeToSlide: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow:'.btn-arrow.prev',
                    nextArrow:'.btn-arrow.next',
                    focusOnSelect: false,
                    focusOnChange: false,
                    dots: false,
                    buildDots: false
                });
                //self.$pdpMobileVisual.show();
            },

            popUpDataSetting: function() {
                var self = this;
                self.$awardPopup = $('#awardPopup');
                self.$benefitInfoPopup = $('#benefitInfoPopup');
                self.$careshipInfoPopup = $('#careshipInfoPopup');
                self.$caresolutionInfoPopup = $('#caresolutionInfoPopup');
            },

            bindProductEvents: function() {
                var self = this;

                //핀치줌
                //위치이동
                /*
                vcui.require(['ui/pinchZoom'], function (PinchZoom) {
                    self.pinchZoom = new PinchZoom('.zoom-area');
    
                    self.$popPdpVisual.find('div.zoom-btn-area a.zoom-plus').on('click', function(){
                        var zoom =self. pinchZoom.getZoomFactor();
                        if(Math.round(zoom) >= 4) zoom = 0;
                        self.pinchZoom.runZoom(zoom+1, true); 
                    });
    
                    self.$popPdpVisual.find('div.zoom-btn-area a.zoom-minus').on('click', function(){
                        var zoom =self.pinchZoom.getZoomFactor();
                        self.pinchZoom.runZoom(zoom-1, true); 
                    });
    
                    self.$popPdpVisualImage.mousedown(function() {
                        self.isDragging = false;
                    })
                    .mousemove(function() {
                        self.isDragging = true;
                     })
                    .mouseup(function() {
                        var wasDragging = self.isDragging;
                        self.isDragging = false;
                        if (!wasDragging) {
                            self.$popPdpVisual.find('div.zoom-btn-area a.zoom-plus').trigger('click');
                        }
                    });
                    
                    //pinchZoom.update(true);
                });
                */
                                
                //팝업 모달뷰 버튼
                /*
                self.$component.find('a.view-more').on('click', function(e) {
                    e.preventDefault();
                    self.requestModal(this);
                });
                self.$component.find('a.btn-modal').on('click', function(e) {
                    e.preventDefault();
                    self.requestModal(this);
                });
                */

                //데스크탑용 갤러리 이미지 클릭
                self.$pdpImage.find('a').first().on('click',function(e){
                    e.preventDefault();
                    var index = $(this).attr("data-idx"); 
                    self.openVisualModal(index, this);
                });

                //데스크탑용 썸네일리스트 클릭
                self.$pdpThumbnail.on('click','li a',function(e) {
                    e.preventDefault();
                    var $li = $(this).parent();
                    var index = $(this).parents('li').index();
                    if($li.hasClass('more')) {
                        //더보기 버튼은 바로 pdp모달 뛰움
                        self.openVisualModal(index, this);
                    } else {
                        //썸네일 클릭
                        self.clickThumbnailSlide(index, this);
                    }
                });

                //모바일용 갤러리 클릭
                self.$pdpMobileSlider.on('click', 'a', function(e){
                    e.preventDefault();
                    var index = $(this).parents(".ui_carousel_current").attr("data-ui_carousel_index");
                    self.openVisualModal(index, this); 
                });

                //pdp모달 썸네일 리스트 클릭
                self.$popPdpThumbnail.on('click','li a',function(e) {
                    e.preventDefault();
                    var index = $(this).parents('li').index();
                    self.clickModalThumbnail(index);
                });

                //모바일 갤러리 슬라이드시 인덱스 넘버 표시
                self.$pdpMobileSlider.on('carouselafterchange', function(e,target,index){
                    self.$slideNumber.text(index + 1);
                });


                //팝업 열기
                //PDP 갤러리 더보기(수상내역등)
                self.$pdpMoreInfo.on('click','a.btn-link.popup', function(e) {
                    e.preventDefault();
                    var arr = [];
                    var loaded = self.$awardPopup.data('loaded');
                    if(!loaded) {
                        self.$awardPopup.data('loaded', true);
                        if(typeof awards !== 'undefined' && awards.length > 0) {
                            arr = awards instanceof Array ? awards.slice(0,4) : [];
                            var $list_ul = self.$awardPopup.find('ul.awards-list');
                            $list_ul.empty();

                            var $frag = $(document.createDocumentFragment());
                            arr.forEach(function(item) {
                                $frag.append(vcui.template(awardPopupItemTemplate, item));
                            });
                            $list_ul.append($frag);
                        }
                    }

                    if(arr.length == 1) {
                        self.$awardPopup.find('.btn-group button[data-link-url]').trigger('click');
                    } else {
                        self.$awardPopup.vcModal({opener: this});
                    }
                });

                //수상내역 아이템 클릭
                self.$awardPopup.on('click','li a.award-item', function(e) {
                    self.$awardPopup.find('.btn-group button[data-link-url]').trigger('click');
                });

                //AR체험하기 클릭
                self.$component.on('click','div.pdp-ar-area a.btn-ar', function (e){
                    e.preventDefault();
                    var modelId = this.dataset.arModelId;
                    if(!lgkorUI.openAR(modelId)) {
                        $('#arPlayPop').vcModal({opener: this});
                    }
                });
                
                //BTOCSITE-1376 사용설명서 팝업 열기
                $('.item-manual.package').on('click', function(e){
                    e.preventDefault();
                    $('#modal-15').vcModal({opener: this});
                })
                
                //BTOCSITE-1376 사용설명서 팝업 푸터 닫기버튼
                $('#modal-15').on('.pop-footer .btn').on('click', function(e){
                    var _self = this;
                    var $modal = $('#modal-15');
                    var $radio = $modal.find('.model-list input:radio');

                    if( !$radio.filter(':checked').length ) {
                        var msgTxt = '제품을 선택해주세요';
                        lgkorUI.alert("", {title: msgTxt}, _self);
                    } else {
                        location.href = $radio.filter(':checked').data('model-path');
                    }
                })

                $(window).on('appNotInstall', function(e){
                    $('#arPlayPop').vcModal({opener: e.currentTarget});
                });
            },

            bindSideEvents: function() {
                var self = this;

                //구매/렌탈 탭 변경에 따른 url 변경
                self.$pdpInfoTab.on("tabbeforechange", function(e, data){
                    var index = data.selectedIndex;
                    var url = location.pathname;
                    var param = vcui.uri.parseQuery(location.search);
                    var n = 0;
                    for(key in param) {
                        if(key != "dpType") {
                            url += (n==0) ? ("?"+key+"="+param[key]) : ("&"+key+"="+param[key]);
                            n++;
                        }
                    }
                    if(index == 0) {
                        //구매
                        //$('.cardDiscount').removeClass('retalCareOn');
                        $('.cardDiscount').show();
                        /* 20210528 추가 */
                        $('.care-solution-info').hide();
                    } else {
                        //렌탈 dpType=careTab추가
                        url += (n==0) ? "?dpType=careTab" : "&dpType=careTab";
                        //$('.cardDiscount').addClass('retalCareOn');
                        $('.cardDiscount').hide();
                        /* 20210528 추가 */
                        $('.care-solution-info').show();
                    }
                    history.replaceState({},"",url);
                });

                //모바일 수상내역 버튼
                self.$mobilePdpInfo.on('click','div.inner a.btn-link.popup', function (e) {
                    e.preventDefault();
                    self.$pdpMoreInfo.find('a.btn-link.popup').trigger('click');
                });

                //비교하기
                self.$pdpInfo.find('.product-compare input[type=checkbox]').on('click', function(e) {
                    var checked = !$(this).hasClass('compare-select');
                    if(checked) {
                        $(this).addClass('compare-select');
                    } else {
                        $(this).removeClass('compare-select');
                    }
                    //$(this).prop('checked',!checked);
                    self.requestCompareItem(lgePdpSendData, checked, $(this));
                });

                //비교하기 컴포넌트 변화 체크
                $(window).on("changeStorageData", function(){
                    self.setCompares();
                })

                //찜하기
                self.$pdpInfo.find('.chk-wish-wrap input[type=checkbox]').on('click', function(e) {
                    var $this = $(this);
                    var _id = lgePdpSendData.modelId;
                    var sku = lgePdpSendData.sku;
                    var wishListId = $this.data("wishListId");
                    var wishItemId = $this.data("wishItemId");
                    var wish = $this.is(':checked');
                    var param = {
                        "id":_id,
                        "sku":sku,
                        "wishListId": wishListId,
                        "wishItemId": wishItemId
                    }
                    if(wish){
                        param.type = "add";
                    } else{
                        param.type = "remove";
                    }

                    var ajaxUrl = self.$pdpInfo.attr('data-wish-url');

                    var success = function(data) {
                        $this.data("wishItemId",data.wishItemId);
                        $this.prop("checked",wish);
                    };
                    var fail = function(data) {
                        $this.prop("checked",!wish);
                    };
                    
                    lgkorUI.requestWish(
                        param,
                        wish,
                        success,
                        fail,
                        ajaxUrl
                    );
                });

                //장바구니
                self.$pdpInfo.find('div.purchase-button a.cart').on('click', function(e) {
                    e.preventDefault();

                    var param = {
                        "id":lgePdpSendData.id,
                        "sku":lgePdpSendData.sku,
                        "rtSeq":lgePdpSendData.rtSeq,
                    }

                    var $paymentAmount = $(this).parents('.payment-amount');

                    //렌탈케어 제품인가(일반구매의 케어십과 틀림)
                    var isRentalCareTab = $paymentAmount.find('div.purchase-button').hasClass('rental');

                    //소모품이 있는가
                    var cart = [];
                    var $additionalPurchase = $paymentAmount.siblings('.additional-purchase');
                    if($additionalPurchase.length > 0) {
                        $additionalPurchase.find('ul.additional-list li').each(function(idx, item){
                            cart.push($(item).data('id')+"|"+$(item).data('quantity'));
                        });
                    }

                    //선택 수량
                    var quantity = $paymentAmount.find('div.select-quantity input.quantity');
                    if(quantity.length > 0) {
                        cart.push(lgePdpSendData.sku+"|"+quantity.val());
                    } else {
                        cart.push(lgePdpSendData.sku+"|1");
                    }

                    param.sku = cart.join(',');

                    //var $purchaseButton = $(this).parents('.purchase-button');
                    //if($purchaseButton.hasClass('rental')) {
                        //렌탈타입
                     //   param.typeFlag = "C";
                    //} else {
                        //제품타입
                        param.typeFlag = "P";
                        //케어십 선택
                        var $careshipService = $paymentAmount.siblings('.careship-service');
                        var checkinput = $careshipService.find('input[type=radio]:checked');
                        if(checkinput.length > 0) {
                            var checkCareSelect = lgkorUI.stringToBool(checkinput.val());
                            if(checkCareSelect) {
                                //케어쉽 선택
                                param.typeFlag = "C";
                            }
                        } else {
                            var $careSiblingOption = $paymentAmount.siblings('.care-sibling-option');
                            //케어쉽필수 제품인지 체크해서 알림창 뛰움
                            if($careSiblingOption.length < 1) {
                                if(careRequire) {
                                    param.typeFlag = "C";
                                }
                            } else {
                                param.typeFlag = "C";
                            }
                        }
                    //}

                    if(param.typeFlag == "C") {
                        if(typeof careshipOnlyFlag !== 'undefined') {
                            param.requireCare = lgkorUI.stringToBool(careshipOnlyFlag) ? true : false;
                        }

                        var careData = $paymentAmount.data('careData');
                        if(careData) {
                            param.rtSeq = careData.rtModelSeq;
                        }

                        var cardData = $paymentAmount.data('cardData');
                        if(cardData) {
                            if(lgkorUI.stringToBool(cardData.simpleReqFlag)) {
                                //간편신청카드
                                param.easyRequestCard = cardData.cardNameCode + "|" + cardData.cardSubName;
                            }
                        }
                    }

                    var ajaxUrl = self.$pdpInfo.attr('data-cart-url');

                    if(!isRentalCareTab && param.typeFlag == "C") {
                        lgkorUI.confirm('', {
                            title: "케어십 서비스를 신청하시는 경우<br>1개의 제품만 장바구니에 담을 수 있습니다.<br>해당 제품을 장바구니에 담으시겠어요?",
                            okBtnName: '네',
                            cancelBtnName: '아니오',
                            ok:function(){
                                lgkorUI.requestCart(ajaxUrl, param, true);
                            }
                        });
                    } else {
                        lgkorUI.requestCart(ajaxUrl, param, true);
                    }
                });

                //매장방문예약 (모바일pc구분)
                /*
                self.$pdpInfo.find('div.info-bottom li.reservation a').on('click', function(e) {
                    //e.preventDefault();
                });
                */

                //전시매장 찾기
                self.$pdpInfo.find('div.info-bottom li.find-store a').on('click', function(e) {
                    e.preventDefault();
                    var url = $(this).attr('href').replace("#","");
                    if(url) {
                        if(typeof outletStockFlag !== 'undefined' && lgkorUI.stringToBool(outletStockFlag)){
                            location.href = url;
                        } else {
                            lgkorUI.confirm('', {
                                title:'해당 제품을 전시하는 매장은 없습니다.<br>하지만 매장에서 제품 상담을 받으실 수는 있습니다.<span>가까운 매장을 찾아 상담을 진행하시겠어요?</span>',
                                okBtnName: '네',
                                cancelBtnName: '아니오',
                                ok: function() {
                                    location.href = url;
                                }
                            });
                        }
                    }
                });

                //구매/예약/렌탈
                self.$pdpInfo.find('div.purchase-button a:not(.cart)').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    if(preOrderFlag) {
                         //사전예약 일경우
                        if(lgkorUI.stringToBool(loginFlag)) {
                            //사전예약 안내창 뛰우고 구매진행
                            $('#preOrderPopup').find('div.btn-group button').off('click');
                            $('#preOrderPopup').find('div.btn-group button').on('click',function(e){
                                self.productBuy($this, this);
                            });
                            $('#preOrderPopup').vcModal({opener: this});
                        } else {
                            //로그인 체크후 로그인 안내창 뛰움
                            $('#loginPopup').vcModal({opener: this});
                        }
                    } else {
                        //사전예약 구매진행
                        self.productBuy($this, this);
                    }
                });

                //상단 스티키 구매버튼
                $(window).on('sendExtraAction.KRP0009', function(e){
                    var $buyButton =  self.$pdpInfo.find('div.purchase-button a:not(.cart)');
                    if($buyButton.length > 1) {
                        $buyButton.each(function(idx,item){
                            var $item = $(item);
                            var optionParent = $item.parents('div.option-contents');
                            if(optionParent.css('display') == "block") {
                                $item.trigger('click');
                                return false;
                            }
                        });
                    } else {
                        //한개
                        $buyButton.trigger('click');
                    } 
                });

                self.$productBuyOptionTab.on("tabbeforechange", function(e, data){
                    var index = data.selectedIndex;
                    var optionParent = self.$pdpInfoProductDetailInfo.find('div.option-contents:eq('+index+')');
                    var btnTitle = optionParent.find('.payment-amount div.purchase-button a:not(.cart) span').text();
                    $(window).trigger("changeButton.KRP0009",{"title":btnTitle,"disabled":false});
                });

                //링크
                self.$pdpInfo.on('click','a.btn-link:not(.popup)', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    if(!$this.attr('data-control')) {
                        var url = $this.attr('href').replace("#","");
                        var addS = $this.data('add');
                        if(url) {
                            if(addS) {
                                url += addS;
                            }
                            location.href = url;
                        }
                    }
                });

                //구매혜택 팝업
                self.$pdpInfo.on('click','li.lists.benefit a.btn-link.popup', function(e) {
                    e.preventDefault();
                    self.$benefitInfoPopup.vcModal({opener: this});
                });

                //인포 옵션 변경 (링크로 바뀜)
                self.$pdpInfoSiblingOption.on('click','div.option-list input', function(e){
                    var ajaxUrl = self.$pdpInfo.attr('data-sibling-url');
                    if(ajaxUrl) {
                        var siblingCode = [];
                        var siblingGroupCode = [];
                        var $findInput = self.$pdpInfoSiblingOption.find('input:checked');
                        $findInput.each(function (index, item) {
                            var itemSiblingCode = item.dataset.siblingCode;
                            var itemSiblingGroupCode = item.dataset.siblingGroupCode;
                            siblingCode.push(itemSiblingCode ? itemSiblingCode : "");
                            siblingGroupCode.push(itemSiblingGroupCode ? itemSiblingGroupCode : "");
                        });
                        if(siblingGroupCode.length > 0) {
                            lgkorUI.requestAjaxData(ajaxUrl,{"siblingCode":siblingCode.join(","),"siblingGroupCode":siblingGroupCode.join(","),"groupCount":siblingGroupCode.length}, function (result) {
                                var data = result.data;
                                if(data.modelUrlPath) {
                                    location.href = data.modelUrlPath;
                                }
                            });
                        }
                    }

                    /*
                    var siblingCode = this.dataset.siblingCode;
                    var siblingGroupCode = this.dataset.siblingGroupCode;
                    if(typeof siblingList !== 'undefined' && siblingList && siblingList.length > 0) {
                        var arr = siblingList[0].siblingModels;
                        var count = arr.length;
                        var selectOne = null;
                        for(var n=0;n<count;n++) {
                            selectOne = arr[n];
                            if(selectOne.siblingCode == siblingCode && selectOne.siblingGroupCode == siblingGroupCode) {
                                break;
                            }
                        }
                        var url = selectOne.modelUrlPath;
                        if(url) {
                            location.href = url;
                        }
                    }
                    */
                    /*
                    var url = e.target.value;
                    if(url) {
                        location.href = url;
                    }
                    */
                });

                //소모품 추가구매
                self.$pdpInfoAdditionalPurchase.on('click','div.selectbox-list a', function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var _id = $this.attr('href').replace("#","");
                    var price = $this.data('price');
                    var $itemInfo = $this.find('.item-info');
                    var data = {
                        "id": _id,
                        "title":$itemInfo.find('dt').text(),
                        "price":price,
                        "priceString":(vcui.number.addComma(price) + "원")
                    }
                    $this.parents('.ui_dropdown').vcDropdown("close");
                    var $ul = self.$pdpInfoAdditionalPurchase.find('div.additional-payment ul');
                    var $find = $ul.find('li[data-id="' + _id + '"]');
                    if($find.length < 1) {
                        self.$pdpInfoAdditionalPurchase.find('div.additional-payment ul').append(vcui.template(additionalItemTemplate, data));
                    }

                    var $paymentAmount = self.$pdpInfoAdditionalPurchase.siblings('.payment-amount');
                    self.updatePaymentAmountPrice($paymentAmount);
                });

                //소모품 추가구매 수량선택
                self.$pdpInfoAdditionalPurchase.on('click','button.minus,button.plus', function(e){
                    var $this = $(this);
                    var $input = $this.siblings('input');
                    var quantity = $input.val();
                    if($this.hasClass('minus')) {
                        --quantity;
                        if(quantity < 1) {
                            quantity = 1;
                        }
                        
                        if(quantity == 1) {
                            $this.attr('disabled',true);
                        } else {
                            $this.removeAttr('disabled');
                        }
                    } else if($this.hasClass('plus')) {
                        ++quantity;

                        if(quantity > 1) {
                            $this.siblings('button.minus').removeAttr('disabled');
                        }
                    }
                    $input.val(quantity);
                    var $li = $this.parents('li');
                    $li.data('quantity',quantity);
                    var $total = $li.find('span.price').contents()[1];
                    var price = $li.data('price');
                    price = price ? vcui.string.replaceAll(price,",","") : "0"; 
                    $total.textContent = (vcui.number.addComma(price*quantity) + '원');

                    var $paymentAmount = self.$pdpInfoAdditionalPurchase.siblings('.payment-amount');
                    self.updatePaymentAmountPrice($paymentAmount);
                });

                //소모품 추가구매 삭제
                self.$pdpInfoAdditionalPurchase.on('click','button.btn-delete', function(e){
                    var $li = $(this).parents('li');
                    $li.remove();

                    var $paymentAmount = self.$pdpInfoAdditionalPurchase.siblings('.payment-amount');
                    self.updatePaymentAmountPrice($paymentAmount);
                });

                //구매 수량 선택
                self.$pdpInfoPaymentAmount.on('click', 'button.minus,button.plus',function (e) {
                    var $input = $(this).siblings('input');
                    var quantity = $input.val();
                    if($(this).hasClass('minus')) {
                        --quantity;
                        if(quantity < 1) {
                            quantity = 1;
                        }
                        
                        if(quantity == 1) {
                            $(this).attr('disabled',true);
                        } else {
                            $(this).removeAttr('disabled');
                        }

                        $(this).siblings('button.plus').removeAttr('disabled');
                    } else if($(this).hasClass('plus')) {
                        var max = $(this).data('max');  
                        ++quantity;
                        if (max && quantity >= max) {
                            quantity = max;
                            $(this).attr('disabled',true);
                        }

                        if(quantity > 1) {
                            $(this).siblings('button.minus').removeAttr('disabled');
                        }
                    }
                    $input.val(quantity);

                    var $paymentAmount = $input.parents('.payment-amount');
                    $paymentAmount.data('quantity',quantity);
                    self.updatePaymentAmountPrice($paymentAmount);
                });

                //케어쉽 서비스 선택 관련
                self.$pdpInfoCareshipService.on('change','input[type=radio]', function(e){
                    //케어쉽필수 제품인지 체크해서 알림창 뛰움
                    var val = $(this).val();
                    var $careshipService = $(this).parents('.careship-service');
                    if(!lgkorUI.stringToBool(val)) {
                        if(waterCareRequire) {
                            $(this).parents('ul').find('input[type=radio][value="Y"]').trigger('click');
                            $('#waterCareRequirePopup').vcModal({opener: this});
                        } else if(careRequire) {
                            $(this).parents('ul').find('input[type=radio][value="Y"]').trigger('click');
                            $('#careRequirePopup').vcModal({opener: this});
                        } else {
                            //제품 가격 정보에 케어십 관련 숨김
                            if($careshipService.length > 0) {
                                var $paymentAmount = $careshipService.siblings('div.payment-amount');
                                var $careshipPriceInfo = $paymentAmount.find('li.careship-price-info');
                                if($careshipPriceInfo.length > 0) {
                                    $careshipPriceInfo.hide();
                                }
                                self.updatePaymentAmountPrice($paymentAmount);

                                //수량체크버튼 활성
                                self.updatePaymentAmountState($paymentAmount, false);
                            }
                        }
                    } else {
                        $(window).trigger("toastshow", "구매시 케어십이 신청됩니다.");
                        if($careshipService.length > 0) {
                            var $paymentAmount = $careshipService.siblings('div.payment-amount');
                            var $careshipPriceInfo = $paymentAmount.find('li.careship-price-info');
                            if($careshipPriceInfo.length > 0) {
                                $careshipPriceInfo.show();
                            }
                            self.updatePaymentAmountPrice($paymentAmount);

                            //케어십 신청됬으므로 수량체크버튼 비활성
                            self.updatePaymentAmountState($paymentAmount, true);
                        }
                    }
                });

                //케어십 이용요금
                self.$pdpInfoCareshipService.on('click','dl.price-info a.btn-link.popup', function(e) {
                    e.preventDefault();

                    var $paymentAmount = self.$pdpInfoCareshipService.siblings('.payment-amount');
                    var cardData = $paymentAmount.data('cardData');
                    var carePrice = parseInt($paymentAmount.data('carePrice'));

                    var $careLi = self.$careshipInfoPopup.find('.fee-info-wrap dl:eq(0)');
                    if(carePrice && $careLi.length > 0) {
                        $careLi.find('dd').text("월 " + vcui.number.addComma(carePrice) + "원")
                    }

                    var $cardLi = self.$careshipInfoPopup.find('.fee-info-wrap dl:eq(1)');
                    if(cardData && cardData.cardSale && $cardLi.length > 0) {
                        $cardLi.find('dt').text(cardData.cardSubName);
                        var cardSale = parseInt(cardData.cardSale);
                        if(cardSale > 0) {
                            cardSale = "-" + vcui.number.addComma(cardSale) + "원";
                        }
                        $cardLi.find('dd.minus').text(cardSale);
                        $cardLi.show();
                    } else {
                        $cardLi.hide();
                    }

                    var $total = self.$careshipInfoPopup.find('.fee-info-wrap dl.total');
                    if(carePrice && $total.length > 0) {
                        var total = carePrice;
                        if(cardData && cardData.cardSale) {
                            total -= parseInt(cardData.cardSale);
                        }
                        if(total < 0) total = 0;
                        $total.find('dd').text("월 " + vcui.number.addComma(total) + "원");
                    }

                    //연차별 월요금
                    var popupData = $paymentAmount.data('popupData');
                    if(popupData) {
                        var $btmInfo = self.$careshipInfoPopup.find('dl.fee-txt');
                        var find = $btmInfo.find('ul.bullet-list');
                        var $bulletList = null;
                        if(find.length > 0) {
                            $bulletList = find.clone();
                        }
                        find = $btmInfo.find('a.btn-link');
                        var $btn = null;
                        if(find.length > 0) {
                            var $btn = find.clone();
                        }
                        $btmInfo.empty();
                        if(popupData.rtFreePeriodCount > 0) {
                            $btmInfo.append('<dt>무상할인 적용 회차 ('+popupData.rtFreePeriodCount+'회)</dt>');
                            $btmInfo.append('<dd>납부 월 회차 :<em>' + popupData.rtFreePeriod + ' 회차</em> 월납부금액 할인(0원)</dd>');
                        } else {
                            $btmInfo.append('<dd></dd>');
                        }
                        $btmInfo.find('dd').append($bulletList);
                        $btmInfo.find('dd').append($btn);

                        var $table = self.$careshipInfoPopup.find('div.tb_row table tbody tr');

                        $table.each(function(idx,obj){
                            var key = (idx+1)+"";
                            var data = popupData[key];
                            var $tr = $(obj);
                            $tr.find('td:eq(1)').text(vcui.number.addComma(data.price) + "원");
                            if(data.free.length > 0) {
                                $tr.find('td:eq(2)').text(data.free.join(",") + " 무상할인");
                            } else {
                                $tr.find('td:eq(2)').text("");
                            }
                        });
                    }

                    self.$careshipInfoPopup.vcModal({opener: this});
                });

                //케어솔루션 이용요금 
                self.$pdpInfoCareSiblingOption.on('click','dl.price-info a.btn-link.popup', function(e) {
                    e.preventDefault();
                    
                    var $paymentAmount = self.$pdpInfoCareSiblingOption.siblings('.payment-amount');
                    var cardData = $paymentAmount.data('cardData');
                    var carePrice = parseInt($paymentAmount.data('carePrice'));
                    var careData = $paymentAmount.data('careData');

                    var $title = self.$caresolutionInfoPopup.find('.tit-wrap.type2:eq(0)');
                    if(careData && careData.dutyTerm && $title.length > 0) {
                        $title.find('.h2-tit').text('의무사용기간 ' + careData.dutyTerm + '년/계약기간 5년')
                    }

                    var $careLi = self.$caresolutionInfoPopup.find('.fee-info-wrap dl:eq(0)');
                    if(carePrice && $careLi.length > 0) {
                        $careLi.find('dd').text("월 " + vcui.number.addComma(carePrice) + "원")
                    }

                    var $cardLi = self.$caresolutionInfoPopup.find('.fee-info-wrap dl:eq(1)');
                    if(cardData && cardData.cardSale && $cardLi.length > 0) {
                        $cardLi.find('dt').text(cardData.cardSubName);
                        var cardSale = parseInt(cardData.cardSale);
                        if(cardSale > 0) {
                            cardSale = "-" + vcui.number.addComma(cardSale) + "원";
                        }
                        $cardLi.find('dd.minus').text(cardSale);
                        $cardLi.show();
                    } else {
                        $cardLi.hide();
                    }

                    var $total = self.$caresolutionInfoPopup.find('.fee-info-wrap dl.total');
                    if(carePrice && $total.length > 0) {
                        var total = carePrice;
                        if(cardData && cardData.cardSale) {
                            total -= parseInt(cardData.cardSale);
                        }
                        if(total < 0) total = 0;
                        $total.find('dd').text("월 " + vcui.number.addComma(total) + "원");
                    }

                    //연차별 월요금
                    var popupData = $paymentAmount.data('popupData');
                    if(popupData) {
                        var $btmInfo = self.$caresolutionInfoPopup.find('dl.fee-txt');
                        var find = $btmInfo.find('ul.bullet-list');
                        var $bulletList = null;
                        if(find.length > 0) {
                            $bulletList = find.clone();
                        }
                        find = $btmInfo.find('a.btn-link');
                        var $btn = null;
                        if(find.length > 0) {
                            var $btn = find.clone();
                        }
                        $btmInfo.empty();
                        if(popupData.rtFreePeriodCount > 0) {
                            $btmInfo.append('<dt>무상할인 적용 회차 ('+popupData.rtFreePeriodCount+'회)</dt>');
                            $btmInfo.append('<dd>납부 월 회차 :<em>' + popupData.rtFreePeriod + ' 회차</em> 월납부금액 할인(0원)</dd>');
                        } else {
                            $btmInfo.append('<dd></dd>');
                        }
                        $btmInfo.find('dd').append($bulletList);
                        $btmInfo.find('dd').append($btn);
                        
                        var $table = self.$caresolutionInfoPopup.find('div.tb_row table tbody tr');

                        $table.each(function(idx,obj){
                            var key = (idx+1)+"";
                            var data = popupData[key];
                            var $tr = $(obj);
                            $tr.find('td:eq(1)').text(vcui.number.addComma(data.price) + "원");
                            if(data.free.length > 0) {
                                $tr.find('td:eq(2)').text(data.free.join(",") + " 무상할인");
                            } else {
                                $tr.find('td:eq(2)').text("");
                            }
                        });
                    }

                    self.$caresolutionInfoPopup.vcModal({opener: this});
                });

                //렌탈 케어솔루션 계약기간
                if(self.$caresolutionRentalInfoSelectBox.length > 0) {
                    //가입비 선택
                    self.$caresolutionRentalInfoSelectBox.eq(0).on('change', function(e,data){
                        var value = $(this).vcSelectbox('selectedOption').value;
                        self.rentalInfoBoxUpdate(0, $(this));
                        self.rentalInfoSelectBoxUpdate(1,self.rentalInfoData[value],0, true);
                    });
                    //의무사용기간 선택
                    self.$caresolutionRentalInfoSelectBox.eq(1).on('change', function(e,data){
                        var selectOption = $(this).vcSelectbox('selectedOption');
                        var itemData = $(selectOption).data('item');
                        self.rentalInfoBoxUpdate(1, $(this));
                        self.rentalInfoSelectBoxUpdate(2,itemData,0, true);
                    });
                    //방문주기 선택 - 화면 가격 정보 갱신
                    self.$caresolutionRentalInfoSelectBox.eq(2).on('change', function(e,data){
                        var selectOption = $(this).vcSelectbox('selectedOption');
                        var itemData = $(selectOption).data('item');
                        var $li =  $(this).parents('li');
                        $li.find('dl.text-box:eq(0) dd.content').text(itemData.contractTerm+'년');
                        self.updateRentalInfoPrice(itemData);
                        self.rentalInfoBoxUpdate(2, $(this));
                    });
                };

                //케어십 계약기간
                if(self.$careshipInfoSelectBox.length > 0) {
                    self.$careshipInfoSelectBox.on('change', function(e,data){
                        var selectOption = $(this).vcSelectbox('selectedOption');
                        var itemData = $(selectOption).data('item');
                        self.updateCareshipInfoPrice(itemData);
                    });
                };

                //제휴카드 할인 드롭다운 선택
                //div.option-contents
                self.$pdpInfo.on('click','.rental-card-list div.ui_dropdown_list li a, .careship-card-list div.ui_dropdown_list li a', function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var $dropDown = $this.parents('.ui_dropdown');
                    $dropDown.find('a.ui_dropdown_toggle').text($this.attr('data-card-title'));
                    $dropDown.vcDropdown("close");

                    var cardData = {};
                    var cardNameCode = $this.attr('href').replace("#","");
                    if(cardNameCode) {
                        cardData.cardNameCode = cardNameCode;
                    }
                    var cardSale = $this.data('cardSale');
                    if(cardSale) {
                        cardData.cardSale = cardSale;
                    }
                    var cardSubName = $this.data('cardSubName');
                    if(cardSubName) {
                        cardData.cardSubName = cardSubName;
                    }
                    var simpleReqFlag = $this.data('simpleReqFlag');
                    if(simpleReqFlag) {
                        cardData.simpleReqFlag = simpleReqFlag;
                    }

                    var isRental = false;
                    var $careshipService = $this.parents('.careship-service');
                    if($careshipService.length < 1) {
                        $careshipService = $this.parents('.care-sibling-option');
                        if($careshipService.length > 0) {
                            isRental = true;
                        }
                    }
                    var $paymentAmount = $careshipService.siblings('.payment-amount');

                    $paymentAmount.data('cardData',cardData);
                    if(isRental){
                        self.updateRentalInfoPrice(self.selectRentalInfoData);
                    } else {
                        self.updateCareshipInfoPrice(self.selectCareshipInfoData);
                    }
                });

                //div.option-contents
                var cardDropdown = self.$pdpInfo.find('.rental-card-list div.ui_dropdown_list, .careship-card-list div.ui_dropdown_list');
                var firstRow = cardDropdown.find('li a:eq(0)');
                if(firstRow.length > 0) {
                    firstRow.trigger('click',firstRow);
                }
            },

            //팝업 버튼 이벤트
            bindPopupEvents: function() {
                var self = this;
                
                $('#careRequireBuyPopup').on('click','.btn-group button',function(e){
                    setTimeout(function(e){
                        lgkorUI.showLoading();
                        location.href = $('#careRequireBuyPopup').data('sendUrl');
                    },30);
                });

                $('article').on('click', 'button[data-link-url]', function(e) {
                    var buttonLinkUrl = $(this).attr('data-link-url');
                    var isNew = $(this).attr('data-open-new');
                    if(buttonLinkUrl) {
                        if(isNew == "Y") {
                            setTimeout(function () {
                                window.open(buttonLinkUrl);
                            },250);
                        } else {
                            setTimeout(function () {
                                location.href = buttonLinkUrl;
                            },250);
                        }
                    }
                });

                $('#pop-pdp-visual').on('modalshown',function(e){
                    var index = $(this).data('selectIndex');
                    self.clickModalThumbnail(index);
                });

                self.$popPdpVisualImage.find('div.zoom-area img').on('load',function(e) {
                    self.pinchZoom.update(true);
                });
            },

            scrollMovedById: function(id){
                var $id = $(id);
                if($id.length){
                    var compheight = 50;//$component.height();
                    var movtop = $id.offset().top - compheight+2;
                    $('html, body').stop().animate({scrollTop:movtop}, 150);
                }
            },

            //PDP SIDE 관련

            //제휴카드 리스트 정리 펑션
            makeAssociatedCardListData: function(cardListData) {
                var arr = [];
                var simpleCardData = [];
                var individualCardData = [];
                var max = 0;
                cardListData.forEach(function(item, index) {
                    if(item.maxSalePrice > max) {
                        max = item.maxSalePrice;
                    }
                    item.title = "[" + item.cardName.replace("카드","")+ "] " + item.cardSubName;
                    lgkorUI.stringToBool(item.simpleReqFlag) ? simpleCardData.push(item) : individualCardData.push(item);
                });

                //최상단 카드취소
                arr.push({
                    "groupTitle":null,
                    "listItem":[
                        {
                            "cardNameCode":null,
                            "simpleReqFlag":null,
                            "cardSubName":null,
                            "title":"월 최대 " + vcui.number.addComma(max) + "원 할인",
                            "maxSalePrice":0
                        }
                    ]
                });

                //간편 신청 카드
                if(simpleCardData.length > 0) {
                    arr.push({
                        "groupTitle":"간편 신청 가능 카드",
                        "listItem":simpleCardData
                    });
                }

                //개별 신청 카드
                /* 20210513 텍스트 수정 */
                if(individualCardData.length > 0) {
                    arr.push({
                        "groupTitle":"개별 신청 가능 카드",
                        "listItem":individualCardData
                    });
                }
                /* //20210513 수정 */
                return arr;
            },

            //제휴카드리스트 갱신
            /* 20210513 수정 */
            updateAssociatedCardList: function ($cardInfo, cardData) {
                if(cardData && cardData.length > 0) {
                    //카드데이타
                    var selectList = $cardInfo.find('ul.select-list');
                    selectList.empty();
                    var groupItemTemplate = '<li class="divide"><span class="inner"><em>{{groupTitle}}</em></span></li>';
                    var cardItemTemplate = '<li><a href="#{{cardNameCode}}" data-card-sub-name="{{cardSubName}}" data-simple-req-flag="{{simpleReqFlag}}" data-card-sale="{{maxSalePrice}}" data-card-title="{{title}}"><p class="card-name">{{label}}</p><p class="card-discount">월 최대 -{{maxSalePriceComma}}원</p></a></li>';
                    cardData.forEach(function(obj, idx) {
                        if(obj.groupTitle) {
                            selectList.append(vcui.template(groupItemTemplate,obj));
                        }
                        if(obj.listItem) {
                            obj.listItem.forEach(function(item, index) {
                                item.label = item.title;
                                item.maxSalePriceComma = vcui.number.addComma(item.maxSalePrice);
                                if(!item.cardNameCode) {
                                    item.label = "선택취소"
                                    cardItemTemplate = '<li><a href="#{{cardNameCode}}" data-card-sub-name="{{cardSubName}}" data-simple-req-flag="{{simpleReqFlag}}" data-card-sale="{{maxSalePrice}}" data-card-title="{{title}}"><p class="card-name">{{label}}</p></a></li>';
                                }else{
                                    cardItemTemplate = '<li><a href="#{{cardNameCode}}" data-card-sub-name="{{cardSubName}}" data-simple-req-flag="{{simpleReqFlag}}" data-card-sale="{{maxSalePrice}}" data-card-title="{{title}}"><p class="card-name">{{label}}</p><p class="card-discount">월 최대 -{{maxSalePriceComma}}원</p></a></li>';
                                }
                                //item.maxSaleString = item.maxSalePrice ? vcui.number.addComma(item.maxSalePrice) : null;
                                selectList.append(vcui.template(cardItemTemplate, item));
                            });
                        }
                    });
                    $cardInfo.show();
                } else {
                    $cardInfo.hide();
                }
            },
            /* //20210513 수정 */

            //케어십 계약기간 셀렉트박스 갱신 펑션
            careshipInfoSelectBoxUpdate: function($selectBox, selectData, selectIndex, changeEvent) {
                var optionTemplate = '<option value="{{value}}" {{#if json}}data-item="{{json}}"{{/if}}>{{title}}</option>';
                if($selectBox.length > 0) {
                    $selectBox.empty();
                    if(selectData instanceof Array) {
                        selectData.forEach(function(item, index){
                            $selectBox.append(vcui.template(optionTemplate,{"value":item.rtModelSeq,"title":"1회 / "+ item.visitPer + "개월", "json":JSON.stringify(item)}));
                        });
                    }
                    $selectBox.vcSelectbox('update');
                    $selectBox.vcSelectbox('selectedIndex', selectIndex, changeEvent);
                }
            },

            //렌탈 케어솔루션 계약기간 셀렉트박스 갱신 펑션
            rentalInfoSelectBoxUpdate: function(selectBoxIndex, selectData, selectIndex, changeEvent) {
                var self = this;
                var optionTemplate = '<option value="{{value}}" {{#if json}}data-item="{{json}}"{{/if}}>{{title}}</option>';
                var $selectBox = self.$caresolutionRentalInfoSelectBox.eq(selectBoxIndex);
                if($selectBox.length > 0) {
                    $selectBox.empty();
                    if(selectData instanceof Array) {
                        selectData.forEach(function(item, index){
                            $selectBox.append(vcui.template(optionTemplate,{"value":item.rtModelSeq,"title":"1회 / "+ item.visitPer + "개월", "json":JSON.stringify(item)}));
                        });
                    } else {
                        for(key in selectData) {
                            if(selectBoxIndex == 0) {
                                $selectBox.append(vcui.template(optionTemplate,{"value":key,"title":vcui.number.addComma(key)+"원","json":null}));
                            } else {
                                $selectBox.append(vcui.template(optionTemplate,{"value":key,"title":key+"년","json":JSON.stringify(selectData[key])}));
                            }
                        }
                    }
                    $selectBox.vcSelectbox('update');
                    $selectBox.vcSelectbox('selectedIndex', selectIndex, changeEvent);

                    self.rentalInfoBoxUpdate(selectBoxIndex, $selectBox);
                }
            },

            //렌탈 케어솔루션 셀렉트 박스 선택에 따른 메세지 수정
            rentalInfoBoxUpdate: function(index, $selectBox) {
                var selectedValue = $selectBox.vcSelectbox('selectedOption');
                var parent = $selectBox.parents('li.lists');
                var findLi = parent.find('.article-box li:eq('+ (index+1) + ') span');
                findLi.text(selectedValue.text);
            },

            //렌탈 케어솔루션 계약기간 선택에 따른 가격정보 변경
            updateRentalInfoPrice: function(selectRentalInfoData) {
                var self = this;
                self.selectRentalInfoData = selectRentalInfoData;
                var carePrice = parseInt(selectRentalInfoData.years1TotAmt);
                var $paymentAmount = self.$pdpInfoCareSiblingOption.siblings('.payment-amount');
  
                //선택된 카드 데이타
                var cardData = $paymentAmount.data('cardData');
                var monthPrice = carePrice;
                if(cardData && cardData.cardSale) {
                    monthPrice -= cardData.cardSale;
                }
                if(monthPrice < 0) {
                    monthPrice = 0;
                }
                //월 이용요금
                var $priceInfo = self.$pdpInfoCareSiblingOption.find('dl.price-info span.price');
                $priceInfo.html('<span class="sub-text">(1년차 월 요금 기준)</span>' + vcui.number.addComma(monthPrice) + '원' + (selectRentalInfoData.freeMonth ? ('<em class="desc">무상할인(' + selectRentalInfoData.freeMonth + '개월)</em>') : ''));

                //가격정보
                var careData = {
                    "rtModelSeq":selectRentalInfoData.rtModelSeq,
                    "caresolutionSalesCodeSuffix":selectRentalInfoData.caresolutionSalesCodeSuffix,
                    "dutyTerm":selectRentalInfoData.dutyTerm
                }
                //결헙하여 할인받기 링크용 값 추가
                $('#rentalCarePlanerSale').data('add',selectRentalInfoData.rtModelSeq);

                $paymentAmount.data({"careData":careData,"carePrice":carePrice,"price":0});
                $paymentAmount.data('prefix', '월');
                self.updatePaymentAmountPrice($paymentAmount);
                //
                //꼭 확인하세요 부분 케어솔루션 총요금 업데이트
                var selectInfoData = selectRentalInfoData;

                var rtFreePeriod = selectInfoData.rtFreePeriod ? selectInfoData.rtFreePeriod.split(',') : [];
                
                var infoTotal = 0;
                var popupData = {
                    "rtFreePeriod":selectInfoData.rtFreePeriod,
                    "rtFreePeriodCount":rtFreePeriod.length,
                    "1":{},
                    "2":{},
                    "3":{},
                    "4":{},
                    "5":{}
                };

                for(var y=1;y<6;y++){
                    var price = 0;
                    switch(y) {
                        case 1:
                            price = selectInfoData.years1TotAmt;
                            break;
                        case 2:
                            price = selectInfoData.years2TotAmt;
                            break;
                        case 3:
                            price = selectInfoData.years3TotAmt;
                            break;
                        case 4:
                            price = selectInfoData.years4TotAmt;
                            break;
                        case 5:
                            price = selectInfoData.years5TotAmt;
                            break;
                        default:
                            break;
                    }

                    if(price) {
                        var key = y+"";
                        popupData[key].price = price;
                        popupData[key].free = [];
                        infoTotal += (price * 12);
                    }
                }
                
                //2021-04-06 할인계산 제거
                rtFreePeriod.forEach(function(item, index){
                    if(item <= 12 && selectInfoData.years1TotAmt) {
                        //infoTotal -= selectInfoData.years1TotAmt;
                        popupData["1"].free.push(item);
                    } else if(item <= 24 && selectInfoData.years2TotAmt) {
                        //infoTotal -= selectInfoData.years2TotAmt;
                        popupData["2"].free.push(item);
                    } else if(item <= 36 && selectInfoData.years3TotAmt) {
                        //infoTotal -= selectInfoData.years3TotAmt;
                        popupData["3"].free.push(item);
                    } else if(item <= 48 && selectInfoData.years4TotAmt) {
                        //infoTotal -= selectInfoData.years4TotAmt;
                        popupData["4"].free.push(item);
                    } else if(item <= 60 && selectInfoData.years5TotAmt) {
                        //infoTotal -= selectInfoData.years5TotAmt;
                        popupData["5"].free.push(item);
                    }
                });

                var $infoBox = self.$pdpInfoCareSiblingOption.find('.info-box');
                $infoBox.find('p.text:eq(0)').text('케어솔루션 총요금 : ' + vcui.number.addComma(infoTotal) + (selectInfoData.visitPer ? ('원('+selectInfoData.visitPer+'개월 방문 기준)') : '원(대표요금제 기준)'));

                $paymentAmount.data('popupData',popupData);
            },

            //케어십 계약기간 선택에 따른 가격정보 변경
            updateCareshipInfoPrice: function(selectCareshipInfoData) {
                var self = this;
                if(!selectCareshipInfoData) return;
                self.selectCareshipInfoData = selectCareshipInfoData;
                var carePrice = parseInt(selectCareshipInfoData.years1TotAmt);
                var $paymentAmount = self.$pdpInfoCareshipService.siblings('.payment-amount');

                //선택된 카드 데이타
                var cardData = $paymentAmount.data('cardData');
                var monthPrice = carePrice;
                if(cardData && cardData.cardSale) {
                    monthPrice -= cardData.cardSale;
                }
                if(monthPrice < 0) {
                    monthPrice = 0;
                }
                //월 이용요금
                var $priceInfo = self.$pdpInfoCareshipService.find('dl.price-info span.price');
                $priceInfo.html(vcui.number.addComma(monthPrice) + '원' + (selectCareshipInfoData.freeMonth ? ('<em class="desc">무상할인(' + selectCareshipInfoData.freeMonth + '개월)</em>') : ''));

                //가격정보
                var careData = {
                    "rtModelSeq":selectCareshipInfoData.rtModelSeq,
                    "caresolutionSalesCodeSuffix":selectCareshipInfoData.caresolutionSalesCodeSuffix,
                    "dutyTerm":selectCareshipInfoData.dutyTerm
                }
                $paymentAmount.data({"careData":careData,"carePrice":carePrice});
                self.updatePaymentAmountPrice($paymentAmount);

                //케어십 할인 혜택 이용요금 팝업용 데이타
                var selectInfoData = selectCareshipInfoData;

                var rtFreePeriod = selectInfoData.rtFreePeriod ? selectInfoData.rtFreePeriod.split(',') : [];
                
                var infoTotal = 0;
                var popupData = {
                    "rtFreePeriod":selectInfoData.rtFreePeriod,
                    "rtFreePeriodCount":rtFreePeriod.length,
                    "1":{},
                    "2":{},
                    "3":{},
                    "4":{},
                    "5":{},
                    "6":{}
                };

                for(var y=1;y<7;y++){
                    var price = 0;
                    switch(y) {
                        case 1:
                            price = selectInfoData.years1TotAmt;
                            break;
                        case 2:
                            price = selectInfoData.years2TotAmt;
                            break;
                        case 3:
                            price = selectInfoData.years3TotAmt;
                            break;
                        case 4:
                            price = selectInfoData.years4TotAmt;
                            break;
                        case 5:
                            price = selectInfoData.years5TotAmt;
                            break;
                        case 6:
                            price = selectInfoData.years6TotAmt;
                            break;
                        default:
                            break;
                    }

                    if(price) {
                        var key = y+"";
                        popupData[key].price = price;
                        popupData[key].free = [];
                    }
                }

                rtFreePeriod.forEach(function(item, index){
                    if(item <= 12) {
                        popupData["1"].free.push(item);
                    } else if(item <= 24) {
                        popupData["2"].free.push(item);
                    } else if(item <= 36) {
                        popupData["3"].free.push(item);
                    } else if(item <= 48) {
                        popupData["4"].free.push(item);
                    } else if(item <= 60) {
                        popupData["5"].free.push(item);
                    } else if(item <= 70) {
                        popupData["6"].free.push(item);
                    }
                });

                $paymentAmount.data('popupData',popupData);
            },

            //구매 가격정보 갱신
            updatePaymentAmountPrice: function($paymentAmount) {
                var self = this;

                //렌탈케어 제품인가(일반구매의 케어십과 틀림)
                var isRentalCareTab = $paymentAmount.find('div.purchase-button').hasClass('rental');
                
                var quantity = $paymentAmount.data('quantity');
                var price = parseInt($paymentAmount.data('price'));
                var carePrice = parseInt($paymentAmount.data('carePrice'));
                var cardData = $paymentAmount.data('cardData');
                //cardData = cardData ? cardData : {};
                var prefix = $paymentAmount.data('prefix');
                prefix = !prefix ? "" : prefix + " ";

                //2021-03-17
                //구매의 케어십은 카드세일을 적용하여 표시하지 않는다 (렌탈케어만 적용해서 표시)
                if(cardData && cardData.cardSale) {
                    carePrice -= parseInt(cardData.cardSale);
                }

                var totalPrice = price;
                if(isRentalCareTab) {
                    totalPrice = (carePrice ? carePrice : 0);
                }
                //var totalPrice = price + (isRentalCareTab ? (carePrice ? carePrice : 0) : 0);

                var $careLi = $paymentAmount.find('li.careship-price-info');
                if($careLi.length > 0 && self.$pdpInfoCareshipService && self.$pdpInfoCareshipService.length > 0) {

                    //케어쉽 체크 여부
                    var checkinput = self.$pdpInfoCareshipService.find('input[type=radio]:checked');
                    if(checkinput.length > 0) {
                        var check = lgkorUI.stringToBool(checkinput.val());
                    }

                    //if(!carePrice || parseInt(carePrice) <= 0) {
                    //케어십 미신청 일경우 케어십 이용요금 숨김
                    if(!check) {
                        $careLi.hide();
                        //totalPrice = price;
                    } else {
                        if(carePrice < 0) {
                            carePrice = 0;
                        }

                        $careLi.find('span.price').text("월 " + vcui.number.addComma(carePrice) +"원");
                        
                        var $careshipService = $paymentAmount.siblings('.careship-service');
                        var checkinput = $careshipService.find('input[type=radio]:checked');
                        if(checkinput.length > 0) {
                            if(lgkorUI.stringToBool(checkinput.val())) {
                                $careLi.show();
                            } else {
                                $careLi.hide();
                                totalPrice = price;
                            }
                        } 
                    }
                }

                //소모품이 있는가
                var totalAdditional = 0;
                var $additionalPurchase = $paymentAmount.siblings('.additional-purchase');
                if($additionalPurchase.length > 0) {
                    $additionalPurchase.find('ul.additional-list li').each(function(idx, item){
                        var quantity = $(item).data('quantity');
                        var price = $(item).data('price');
                        price = price ? vcui.string.replaceAll(price,",","") : "0"; 
                        if(quantity && price) {
                            totalAdditional += (quantity * price);
                        }
                    });
                    //totalPrice += totalAdditional;
                }

                var $total = $paymentAmount.find('dl.total-payment span.price');
                $total.text(prefix + vcui.number.addComma((totalPrice * quantity) + totalAdditional) + '원');
            },

            //케어솔루션 선택 여부에 따른 구매수량 버튼 활성/비활성
            updatePaymentAmountState: function($paymentAmount, isCare) {
                var self = this;
                if(isCare) {
                    //케어십 신청됬으므로 수량체크버튼 비활성
                    $paymentAmount.find('button.minus').attr('disabled',true);
                    $paymentAmount.find('button.plus').attr('disabled',true);
                    $paymentAmount.find('input.quantity').val(1);
                    $paymentAmount.data('quantity',1);
                    $paymentAmount.find('>.info-text').show();                
                } else {
                    //수량체크버튼 활성
                    var $input = $paymentAmount.find('input.quantity');
                    if(parseInt($input.val()) == 1) {
                        $paymentAmount.find('button.minus').attr('disabled',true);
                        $paymentAmount.find('button.plus').attr('disabled',false);
                    } else {
                        $paymentAmount.find('button.minus').attr('disabled',false);
                        $paymentAmount.find('button.plus').attr('disabled',false);
                    }
                    $paymentAmount.find('>.info-text').hide();
                }

                self.updatePaymentAmountPrice($paymentAmount);
            },

            //구매진행
            productBuy: function($dm, eventTarget) {
                var self = this;

                //홈브류 제품 로그인 안내 뛰우기
                if (location.href.indexOf("lg-homebrew") > -1 && !lgkorUI.stringToBool(loginFlag)) {
                    if(eventTarget) {
                        $('#memberBuyGuide').vcModal({opener: eventTarget});
                    } else {
                        $('#memberBuyGuide').vcModal();
                    }
                    return;
                };

                self.processProductBuy = null;

                var tempSendData = JSON.parse(JSON.stringify(lgePdpSendData));
                var $paymentAmount = $dm.parents('.payment-amount');

                //렌탈케어 제품인가(일반구매의 케어십과 틀림)
                //var isRentalCareTab = $paymentAmount.find('div.purchase-button').hasClass('rental');
                
                //구매타입
                var isRental = false;
                var param = {};
                if(typeof modelGubun !== 'undefined') {
                    if(modelGubun == "1" || modelGubun == "2") {
                        param.order_type = "NB";
                    } else if(modelGubun == "3") {
                        param.order_type = "SM";
                    }
                }

                //소모품이 있는가
                var cart = [];
                var $additionalPurchase = $paymentAmount.siblings('.additional-purchase');
                if($additionalPurchase.length > 0) {
                    $additionalPurchase.find('ul.additional-list li').each(function(idx, item){
                        cart.push({
                            "sku":$(item).data('id'),
                            "quantity":$(item).data('quantity')
                        });
                        if(param.order_type == "NB") {
                            param.order_type = "NS";
                        }
                    });
                }

                //케어십 선택
                //오더타입 교체할것
                var $careshipService = $paymentAmount.siblings('.careship-service');
                var checkinput = $careshipService.find('input[type=radio]:checked');
                if(checkinput.length > 0) {
                    isRental = lgkorUI.stringToBool(checkinput.val());
                } else {
                    var $careSiblingOption = $paymentAmount.siblings('.care-sibling-option');
                    //케어쉽필수 제품인지 체크해서 알림창 뛰움
                    if($careSiblingOption.length < 1) {
                        if(careRequire) {
                            //$('#careRequireBuyPopup').vcModal();
                            isRental = true;
                        }
                    } else {
                        isRental = true;
                    }
                }

                //선택 수량
                var quantity = $paymentAmount.find('div.select-quantity input.quantity');
                if(quantity.length > 0) {
                    cart.push({
                        "sku":tempSendData.sku,
                        "quantity":quantity.val()
                    });
                }

                //렌탈타입
                var careData = $paymentAmount.data('careData');
                if(careData) {
                    param.rtModelSeq = careData.rtModelSeq;
                }

                var cardData = $paymentAmount.data('cardData');
                if(cardData) {
                    if(lgkorUI.stringToBool(cardData.simpleReqFlag)) {
                        //간편신청카드
                        param.easyRequestCard = cardData.cardNameCode + "|" + cardData.cardSubName;
                    }
                }

                /*
                //선택된 케어쉽
                var careData = $paymentAmount.data('careData');
                if(careData) {
                    param.rtModelSeq = careData.rtModelSeq;
                    param.caresolutionSalesCodeSuffix = careData.caresolutionSalesCodeSuffix;
                }
                //선택된 카드
                var cardData = $paymentAmount.data('cardData');
                if(cardData && cardData.cardNameCode) {
                    console.log(cardData);
                    param.cardNameCode = cardData.cardNameCode;
                }
                */
                if(cart.length > 0) {
                    var cart_items = [];
                    cart.forEach(function(obj,idx){
                        cart_items.push({"data":obj});
                    });
                    param.cart_items = cart_items;
                    param.order_item_qty = cart_items.length;
                }

                var ajaxUrl;
                if(isRental) {
                    var isDirectBuy = !$paymentAmount.find('.purchase-button').hasClass('rental');

                    if(self.loginCheckEnd) {
                        if(lgkorUI.stringToBool(loginFlag)) {
                            ajaxUrl = self.$pdpInfo.attr('data-rental-url');
                            var url = ajaxUrl + "?rtModelSeq=" + param.rtModelSeq + (param.easyRequestCard ? ("&easyRequestCard=" + param.easyRequestCard) : "");
                            if(ajaxUrl) {
                                if(isDirectBuy) {
                                    $('#careRequireBuyPopup').data('sendUrl',url);
                                    /*
                                    $('#careRequireBuyPopup').find('.btn-group button').removeAttr('data-link-url');
                                    $('#careRequireBuyPopup').off('.goto').on('click.goto','.btn-group button',function(e){
                                        console.log($('#careRequireBuyPopup').data('sendUrl'));
                                        location.href = $('#careRequireBuyPopup').data('sendUrl');
                                    });
                                    */
                                    if(eventTarget) {
                                        $('#careRequireBuyPopup').vcModal({opener: eventTarget});
                                    } else {
                                        $('#careRequireBuyPopup').vcModal();
                                    }
                                } else {
                                    location.href = url;
                                }
                            }
                        } else {
                            ajaxUrl = self.$pdpInfo.attr('data-rental-url-notlogin');
                            //스테이지 세팅후 제거 코드
                            ajaxUrl = ajaxUrl ? ajaxUrl : "/mkt/rental-care-solution.lgajax";
                            var sendParam = {
                                "rtModelSeq":param.rtModelSeq
                            };
                            if(sendParam.easyRequestCard) {
                                sendParam.easyRequestCard = param.easyRequestCard
                            }

                            sendParam.modelUrlPath = location.pathname + location.search;
                            /*
                            if(typeof modelUrlPath !== 'undefined') {
                                var queryString = location.search;
                                sendParam.modelUrlPath = modelUrlPath + queryString;
                            }
                            */

                            if(isDirectBuy) {
                                lgkorUI.showLoading();
                                lgkorUI.requestAjaxDataPost(ajaxUrl, sendParam, function(result){
                                    //console.log(result);
                                });
                            } else {
                                lgkorUI.showLoading();
                                lgkorUI.requestAjaxDataPost(ajaxUrl, sendParam, function(result){
                                    //console.log(result);
                                });
                            }
                        }
                    } else {
                        self.processProductBuy = $dm;
                    }
                } else {
                    ajaxUrl = self.$pdpInfo.attr('data-buy-url');
                    //ajaxUrl = "https://wwwdev50.lge.co.kr/mkt/product/addCartDirectPurchase.lgajax"
                    if(ajaxUrl) {
                        lgkorUI.showLoading();
                        lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                            //console.log(result);
                            var data = result.data;
                            var obsDirectPurchaseUrl = data.obsDirectPurchaseUrl;
                            if(obsDirectPurchaseUrl){
                                location.href = obsDirectPurchaseUrl;
                            }
                        });
                    }
                }
            },

            //로그인 데이타 정보 가져오기
            getRewardInfo: function() {
                if(typeof lgePdpSendData !== 'undefined') {
                    var self = this;
                    var ajaxUrl = self.$pdpInfo.attr('data-reward-url');
                    var param = {
                        modelId: lgePdpSendData.modelId,
                        modelUrlPath: location.pathname
                    }
                    /*
                    if(!ajaxUrl) {
                        //스테이지 서버에 페이지가 제대로 배포되면 제거할 예정
                        ajaxUrl = "/mkt/ajax/product/retrieveModelRewardInfo";
                    }
                    */
                    if(ajaxUrl) {
                        lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                            var data = result.data[0];
                            //로그인
                            loginFlag = data.loginFlag;
                            
                            //보유멤버쉽 포인트
                            var myMembershipPoint = data.myMembershipPoint;
                            if(lgkorUI.stringToBool(loginFlag)) {
                                //로그인
                                self.$benefitInfoPopup.find('.price-info.point').hide();
                                var $pointMember = self.$benefitInfoPopup.find('.price-info.point.member');
                                $pointMember.find('.point-confirm input').val(vcui.number.addComma(myMembershipPoint));
                                $pointMember.show();
                                //구매혜택 가격 갱신
                                if(typeof obsOriginalPrice !== 'undefined' && obsOriginalPrice != "") {
                                    var memberPoint = parseInt(myMembershipPoint);
                                    var originalPrice = parseInt(obsOriginalPrice);
                                    var totalDiscountPrice = (typeof obsTotalDiscountPrice  !== 'undefined'  && totalDiscountPrice != "") ? parseInt(obsTotalDiscountPrice) : 0;
                                    var addRewardAmt = (typeof rewardAmt !== 'undefined' && rewardAmt != "") ? parseInt(rewardAmt) : 0;
                                    
                                    var totalSale = totalDiscountPrice + addRewardAmt + memberPoint;
                                    if(totalSale > originalPrice) totalSale = originalPrice;
                                    
                                    var total = originalPrice - totalSale;
                                    if(total < 0) total = 0;
                                    
                                    var percent = Math.floor(totalSale/originalPrice*100.0);

                                    var $discountRate = self.$benefitInfoPopup.find('.discount-rate');
                                    $discountRate.text(percent+"%");
                                    $discountRate.siblings('.price').text(vcui.number.addComma(totalSale)+"원");
                                    self.$benefitInfoPopup.find('.price-info.total-payment .price').text(vcui.number.addComma(total)+"원");
                                } 
                            } else {
                                //로그인 아님
                                self.$benefitInfoPopup.find('.price-info.point').show();
                                self.$benefitInfoPopup.find('.price-info.point.member').hide();
                            }
                            
                            if(self.$component.data('consumables')) {
                                self.consumables.init(data);
                            }

                            self.loginCheckEnd = true;
                            if(self.processProductBuy) {
                                self.productBuy(self.processProductBuy);
                            }
                        }, true);
                    }
                }
            },

            //PDP 이미지 관련

            //페이지에 저장된 pdp 데이타 가져오기
            findPdpData: function(index) {
                var self = this;
                var inputs = self.$pdpData.find('div:eq(' + index +') input');
                var item = {};
                inputs.each(function (i, o) {
                    item[$(o).attr('name')] = $(o).val();
                });
                return item;
            },

            //썸네일 리스트 클릭
            clickThumbnailSlide: function(index, eventTarget) {
                var self = this;
                var item = self.findPdpData(index);
                switch(item.type) {
                    case "360":
                        break;
                    case "image":
                        //이전에 선택되었던 썸네일 활성화 제거 및 새로운 썸네일 활성화
                        var thumbItem = self.$pdpThumbnail.find('li:eq('+index+')');
                        if(self.$selectItemTarget) {
                            self.$selectItemTarget.removeClass('active');
                            self.$selectItemTarget.find('.blind').text("선택안됨");
                        }
                        self.$selectItemTarget = thumbItem;
                        self.$selectItemTarget.addClass('active');
                        self.$selectItemTarget.find('.blind').text("선택됨");

                        self.$pdpImage.find('a').attr({'data-link-name':item.linkName,'data-idx':(""+index)});
                        self.$pdpImage.find('a img').attr({'src':item.imagePdp,'alt':item.alt});
                        break;
                    case "video":
                    case "animation":
                        self.openVisualModal(index, eventTarget);
                        break;
                    default:
                        break;
                }
            },

            //PDP모달 오픈
            openVisualModal: function(index, eventTarget) {
                var self = this;
                //self.clickModalThumbnail(index);
                var popPdp = $('#pop-pdp-visual');
                popPdp.data('selectIndex',index);
                self.$popPdpVisualImage.hide();
                if(eventTarget) {
                    $('#pop-pdp-visual').vcModal({opener: eventTarget});
                } else {
                    $('#pop-pdp-visual').vcModal();
                }
            },

            clickModalThumbnail: function(index) {
                var self = this;
                index = parseInt(index);
                var item = self.findPdpData(index);

                self.$itemNumber.text(index + 1);

                //이전에 선택되었던 썸네일 활성화 제거 및 새로운 썸네일 활성화
                var thumbItem = self.$popPdpThumbnail.find('li:eq('+index+')');
                if(self.$selectModalItemTarget) {
                    self.$selectModalItemTarget.removeClass('active');
                }
                self.$selectModalItemTarget = thumbItem;
                self.$selectModalItemTarget.addClass('active');
    
                //self.pinchZoom.runZoom(1, false);
                //self.$popPdpVisualVideo.html('');
                self.$popPdpVisualAnimation.find('div.animation-box').vcVideoBox('reset');
    
                switch(item.type) {
                    case "360":
                        self.$popPdpVisualImage.hide();
                        self.$popPdpVisualVideo.hide();
                        self.$popPdpVisualAnimation.hide();
                        self.$popPdpVisual360.show();
                        break;
                    case "image":
                        self.pinchZoom.runZoom(1, false);
                        self.$popPdpVisualImage.find('div.zoom-area img').attr({'data-pc-src':item.imagePC,'data-m-src':item.imageMobile});
                        //self.$popPdpVisualImage.vcImageSwitch('reload');
                        $('body').vcLazyLoaderSwitch('reload',self.$popPdpVisualImage);
                        self.$popPdpVisualImage.show();
                        self.$popPdpVisualVideo.hide();
                        self.$popPdpVisualAnimation.hide();
                        self.$popPdpVisual360.hide();
                        self.$popPdpZoomArea.show();
                        self.pinchZoom.update(true);
                        break;
                    case "video":
                        /*
                        self.$popPdpVisualVideo.find('div.thumnail img').attr({
                            'data-pc-src':item.imagePC,
                            'data-m-src':item.imageMobile,
                            'alt':item.alt
                        });
                        */
                        self.$popPdpVisualVideo.find('div.thumnail a').attr({
                            'data-src':item.adUrl,
                            'data-link-name':item.linkName,
                            'aria-describedby':item.alt
                        });
                        self.$popPdpVisualVideo.find('iframe').attr('src',item.videoUrl);
                        self.$popPdpVisualImage.hide();
                        self.$popPdpVisualVideo.show();
                        self.$popPdpVisualAnimation.hide();
                        self.$popPdpVisual360.hide();
                        self.$popPdpZoomArea.hide();
                        break;
                    case "animation":
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area a').attr({'data-src':item.adUrl,'aria-describedby':item.alt});
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area p.hidden').text(item.alt);
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area div.animation-area video source').attr({'src':item.videoUrl,'type':('video/'+item.videoType)});
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area div.animation-area video').attr({'src':item.videoUrl});
                        self.$popPdpVisualImage.hide();
                        self.$popPdpVisualVideo.hide();
                        self.$popPdpVisualAnimation.show();
                        self.$popPdpVisual360.hide();
                        self.$popPdpZoomArea.hide();
                        break;
                    default:
                        break;
                }
            },

            //ajax 팝업뷰 뛰우기
            requestModal: function(dm) {
                var self = this;
                var ajaxUrl = $(dm).attr('href');
                lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
                    self.openModalFromHtml(result);
                }, null, "html");
            },

            openModalFromHtml: function(html) {
                $('#pdp-modal').html(html).vcModal();
            },


            //선택된 옵션으로 모델 데이타 가져오기
            //링크로 바뀌어서 안씀
            /*
            requestSelectOption: function(param) {
                var self = this;
                var ajaxUrl = self.$pdpInfo.attr('data-select-url');
                param.id = self.$pdpInfo.attr('data-id');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                    var data = result.data;
                    self.$pdpInfo.attr('data-pid',data.productId);
                    self.$pdpInfo.attr('data-price',data.price);
                    self.$pdpInfoProductDetailInfo.find('.sku').text(data.sku);
                });
            },
            */

            //선택된 옵션으로 케어쉽 가격 가져오기
            requestSelectCareOption: function($dom) {
                var self = this;
                var ajaxUrl = self.$pdpInfo.attr('data-care-select-url');
                var $checkedinputs = $dom.find('input:checked');
                var $hiddenInputs = $dom.find('input[type=hidden]');
                var param = {};
                $checkedinputs.each(function (i, o) {
                    var $o = $(o);
                    param[$o.attr('name')] = $o.attr('value');
                });
                $hiddenInputs.each(function (i, o) {
                    var $o = $(o);
                    param[$o.attr('name')] = $o.attr('value');
                });

                lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                    var data = result.data;
                    $dom.find('span.price').contents()[0].textContent = data.price;
                });
            },

            //선택된 옵션으로 케어쉽 렌탈 가격 가져오기
            requestSelectCareSiblingOption: function($dom) {
                var self = this;
                var ajaxUrl = self.$pdpInfo.attr('data-care-select-url');
                var $checkedinputs = $dom.find('input:checked');
                var $hiddenInputs = $dom.find('input[type=hidden]');
                var param = {};
                $checkedinputs.each(function (i, o) {
                    var $o = $(o);
                    param[$o.attr('name')] = $o.attr('value');
                });
                $hiddenInputs.each(function (i, o) {
                    var $o = $(o);
                    param[$o.attr('name')] = $o.attr('value');
                });

                lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                    var data = result.data;
                    $dom.find('span.price').contents()[2].textContent = data.price;
                });
            },

            //아이템 비교하기
            requestCompareItem: function(compareData, compare, $dm) {
                var categoryId = lgkorUI.getHiddenInputData().categoryId;

                var compareId = compareData.sku.split(".");
                if(typeof modelName !== 'undefined') {
                    compareId = modelName;
                }
                
                if(compare){
                    var compareObj = {
                        "id": compareData.id,
                        "productName": compareData.productName,
                        "productID": compareId,
                        "productImg": compareData.productImg,
                        "productAlt": compareData.productAlt
                    }
                    var isAdd = lgkorUI.addCompareProd(categoryId, compareObj);
                    if(!isAdd) {
                        $dm.prop('checked', false);
                        $dm.removeClass('compare-select');
                    }
                } else{
                    lgkorUI.removeCompareProd(categoryId, compareId);
                }
            },

            //비교하기 저장 유무 체크...
            setCompares:function(){
                var self = this;
                var chk = false;
                var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
                var isCompare = vcui.isEmpty(storageCompare);
                var categoryId = lgkorUI.getHiddenInputData().categoryId;

                if(!isCompare){
                    for(var i in storageCompare[categoryId]){
                        if(lgePdpSendData['id'] == storageCompare[categoryId][i]['id']) chk = true;
                    }
                }
                
                var $dm = self.$pdpInfo.find('.product-compare input[type=checkbox]');
                $dm.prop('checked', chk)
                if(chk) {
                    $dm.addClass('compare-select');
                } else {
                    $dm.removeClass('compare-select');
                }
            },
        };

    $(document).ready(function(){
        if(!document.querySelector('.KRP0008')) return false;
        $('.KRP0008').buildCommonUI();
        KRP0008.init();
    });

    $(window).load(function(){
        var hash = location.hash;
        if(hash) {
            var findEl = $(hash);
            if(findEl.length > 0) {
                var target_top = findEl.offset().top;
                $('html, body').animate({scrollTop:target_top}, 0);
            }
        }
    });
})();