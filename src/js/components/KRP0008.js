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
        '<span class="image"><img data-src="{{storyPdpThumbnailPath}}{{storyPdpThumbnailServerName}}" alt="{{storyPdpThumbnailAltText}}"></span>' +
        '<span class="text">{{storyTitle}}</span>' +
    '</li>';

    $(window).ready(function(){
        if(!document.querySelector('.KRP0008')) return false;

        $('.KRP0008').buildCommonUI();
        
        var KRP0008 = {
            init: function() {
                var self = this;
                self.isDragging = false;

                self.setting();
                self.popUpDataSetting();

                if(self.$component.data('consumables')) {
                    vcui.require(['support/consumables.min'], function () {
                        self.prepare();
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

                self.bindProductEvents();
                self.bindPopupEvents();
                self.bindSideEvents();

                //비교하기 체크
                self.setCompares();
            },

            setting: function() {
                var self = this;
                //pdp데이타
                self.$pdpData = $('#pdp-data');

                //콤포넌트
                self.$component = $('section.component');

                //데스크탑용 갤러리
                self.$pdpVisual = $('#desktop_summary_gallery div.pdp-visual');
                //데스크탑용 갤러리 이미지
                self.$pdpImage = self.$pdpVisual.find('div.pdp-visual-image');
                //데스크탑용 갤러리 썸네일리스트
                self.$pdpThumbnail = self.$pdpVisual.find('div.pdp-thumbnail-nav div.inner div.pdp-thumbnail-list ul.thumbnail-list');
                //선택된 데스크탑 썸네일
                self.$selectItemTarget = self.$pdpThumbnail.find('li.active');

                //모바일용 갤러리
                self.$pdpMobileVisual = $('#mobile_summary_gallery');
                self.$pdpMobileVisual.hide();
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
                self.$pdpInfoProductDetailInfo = self.$pdpInfo.find('.product-detail-info');
                self.$pdpInfoSiblingOption = self.$pdpInfo.find('.sibling-option');
                
                //가격정보
                self.$pdpInfoPaymentAmount = self.$pdpInfo.find('.payment-amount');
                if(typeof productPrice !== 'undefined') {
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
                self.$pdpInfoAllCareshipService = self.$pdpInfo.find('.careship-service');
                self.$pdpInfoCareshipService = self.$pdpInfo.find('div.option-contents .careship-service');
                self.$pdpInfoCareSiblingOption = self.$pdpInfo.find('div.option-contents .care-sibling-option');
                
                //렌탈 가격 정보 정리
                self.rentalInfoData = null;
                if(typeof rentalInfo !== 'undefined' && rentalInfo.length > 0) {
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
                    });
                    self.rentalInfoData = rentalPriceData;
                }

                //렌탈 케어솔루션 계약기간
                self.$caresolutionRentalInfoSelectBox = self.$pdpInfoCareSiblingOption.find('div.info-accordion-wrap .ui_selectbox');
                if(self.rentalInfoData && self.$caresolutionRentalInfoSelectBox.length > 0) {
                    //가입비 세팅
                    self.rentalInfoSelectBoxUpdate(0,self.rentalInfoData,0,false);

                    //의무사용기간 세팅
                    var firstKey = Object.keys(rentalPriceData)[0];
                    var dutyTermData = rentalPriceData[firstKey];
                    if(dutyTermData) {
                        self.rentalInfoSelectBoxUpdate(1,dutyTermData,0,false);

                        //방문주기
                        firstKey = Object.keys(dutyTermData)[0];
                        var visitPerData = dutyTermData[firstKey]
                        if(visitPerData) {
                            self.updateRentalInfoPrice(visitPerData[0]);
                            self.rentalInfoSelectBoxUpdate(2,visitPerData,0,true);
                        }
                    }
                }

                //케어십 가격 정보 정리
                self.careshipInfoData = null;
                if(typeof careshipInfo !== 'undefined' && careshipInfo.length > 0) {
                    self.careshipInfoData = careshipInfo;
                }

                //케어십 계약기간
                self.$careshipInfoSelectBox = self.$pdpInfoCareshipService.find('.ui_selectbox:eq(0)');
                if(self.careshipInfoData && self.$careshipInfoSelectBox.length > 0) {
                    self.updateCareshipInfoPrice(self.careshipInfoData[0]);
                    self.careshipInfoSelectBoxUpdate(self.$careshipInfoSelectBox,self.careshipInfoData,0,true);
                }

                //렌탈 케어솔루션 제휴카드 리스트 정리
                self.rentalCardList = [];
                if(typeof rentalAssociatedCardList !== 'undefined' && rentalAssociatedCardList.length > 0) {
                    self.rentalCardList = self.makeAssociatedCardListData(rentalAssociatedCardList);
                }

                self.$rentalCardList = self.$pdpInfoCareSiblingOption.find('.select-box:eq(3)');
                if(self.$rentalCardList.length > 0) {
                    self.updateAssociatedCardList(self.$rentalCardList, self.rentalCardList);
                }

                //케어십 제휴카드 리스트 정리
                self.careCardList = [];
                if(typeof careshipAssociatedCardList !== 'undefined' && careshipAssociatedCardList.length > 0) {
                    self.careCardList = self.makeAssociatedCardListData(careshipAssociatedCardList);
                }

                self.$careshipCardList = self.$pdpInfoCareshipService.find('.select-box:eq(1)');
                if(self.$careshipCardList.length > 0) {
                    self.updateAssociatedCardList(self.$careshipCardList, self.careCardList);
                }


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
                    focusOnChange: false
                });
                self.$pdpMobileVisual.show();
            },

            popUpDataSetting: function() {
                var self = this;
                self.$awardPopup = $('#awardPopup');
                if(typeof awards !== 'undefined' && awards.length > 0) {
                    var arr = awards instanceof Array ? awards : [];
                    var $list_ul = self.$awardPopup.find('ul.awards-list');
                    $list_ul.empty();
                    arr.forEach(function(item, index) {
                        $list_ul.append(vcui.template(awardPopupItemTemplate, item));
                    });
                }

                self.$benefitInfoPopup = $('#benefitInfoPopup');
                self.$careshipInfoPopup = $('#careshipInfoPopup');
                self.$caresolutionInfoPopup = $('#caresolutionInfoPopup');
            },

            bindProductEvents: function() {
                var self = this;

                //핀치줌
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
                    self.openVisualModal(index);
                });

                //데스크탑용 썸네일리스트 클릭
                self.$pdpThumbnail.on('click','li a',function(e) {
                    e.preventDefault();
                    var $li = $(this).parent();
                    var index = $(this).parents('li').index();
                    if($li.hasClass('more')) {
                        //더보기 버튼은 바로 pdp모달 뛰움
                        self.openVisualModal(index);
                    } else {
                        //썸네일 클릭
                        self.clickThumbnailSlide(index);
                    }
                });

                //모바일용 갤러리 클릭
                self.$pdpMobileSlider.on('click', 'a', function(e){
                    e.preventDefault();
                    var index = $(this).parents(".ui_carousel_current").attr("data-ui_carousel_index");
                    self.openVisualModal(index); 
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
                    self.$awardPopup.vcModal();
                });
            },

            bindSideEvents: function() {
                var self = this;

                //비교하기
                self.$pdpInfo.find('.product-compare input[type=checkbox]').on('click', function(e) {
                   var checked = $(this).is(':checked');
                   self.requestCompareItem(sendData, checked, $(this));
                });

                //비교하기 컴포넌트 변화 체크
                $(window).on("changeStorageData", function(){
                    self.setCompares();
                })

                //찜하기
                self.$pdpInfo.find('.chk-wish-wrap input[type=checkbox]').on('click', function(e) {
                    var ajaxUrl = self.$pdpInfo.attr('data-wish-url');
                    var checked = $(this).is(':checked');
                    var success = function(data) {
                    };
                    var fail = function(data) {
                        $dm.find('span.chk-wish-wrap input').prop("checked",!checked);
                    };

                    var param = JSON.parse(JSON.stringify(sendData));
                    param.wish = checked;

                    lgkorUI.requestWish(
                        param,
                        checked,
                        success,
                        fail,
                        ajaxUrl
                    );
                });

                //장바구니
                self.$pdpInfo.find('div.purchase-button a.cart').on('click', function(e) {
                    e.preventDefault();
                    var ajaxUrl = self.$pdpInfo.attr('data-cart-url');
                    lgkorUI.requestCart(ajaxUrl, sendData);
                });

                //구매/예약/렌탈
                self.$pdpInfo.find('div.purchase-button a:not(.cart)').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    if(preOrderFlag) {
                         //사전예약 일경우
                        if(loginFlag) {
                            //사전예약 안내창 뛰우고 구매진행
                            $('#preOrderPopup').find('div.btn-group button').off('click');
                            $('#preOrderPopup').find('div.btn-group button').on('click',function(e){
                                self.productBuy($this);
                            });
                            $('#preOrderPopup').vcModal();
                        } else {
                            //로그인 체크후 로그인 안내창 뛰움
                            $('#loginPopup').vcModal();
                        }
                    } else {
                        //사전예약 구매진행
                        self.productBuy($this);
                    }
                });

                //링크
                self.$pdpInfo.on('click','a.btn-link:not(.popup)', function(e) {
                    e.preventDefault();
                    var url = $(this).attr('href').replace("#","");
                    if(url) {
                        location.href = url;
                    }
                });

                //구매혜택 팝업
                self.$pdpInfo.on('click','li.lists.benefit a.btn-link.popup', function(e) {
                    e.preventDefault();
                    self.$benefitInfoPopup.vcModal();
                });

                //인포 옵션 변경 (링크로 바뀜)
                self.$pdpInfoSiblingOption.on('click','input', function(e){
                    var val = $(this).val();
                    if(val) {
                        location.href = val;
                    }
                    /*
                    var $optionList = $(this).parents('.option-list').siblings('div').find('span');
                    if($optionList.length > 0) {
                        $optionList.first().text($(this).siblings('label').find('span').text());
                    }
                    var $siblingOption = $(this).parents('.sibling-option');
                    var $findData = $siblingOption.find('input:checked');
                    var param = {};
                    $findData.each(function (i, o) {
                        var $o = $(o);
                        param[$o.attr('name')] = $o.attr('value');
                    });
                    self.requestSelectOption(param);
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
                    } else if($(this).hasClass('plus')) {
                        ++quantity;

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
                self.$pdpInfoAllCareshipService.on('change','input[type=radio]', function(e){
                    //케어쉽필수 제품인지 체크해서 알림창 뛰움
                    var val = $(this).val();
                    var $careshipService = $(this).parents('.careship-service');
                    if(!lgkorUI.stringToBool(val)) {
                        if(waterCareRequire) {
                            $(this).parents('ul').find('input[type=radio][value="Y"]').trigger('click');
                            $('#waterCareRequirePopup').vcModal();
                        } else if(careRequire) {
                            $(this).parents('ul').find('input[type=radio][value="Y"]').trigger('click');
                            $('#careRequirePopup').vcModal();
                        } else {
                            //제품 가격 정보에 케어십 관련 숨김
                            if($careshipService.length > 0) {
                                var $paymentAmount = $careshipService.siblings('div.payment-amount');
                                var $careshipPriceInfo = $paymentAmount.find('li.careship-price-info');
                                if($careshipPriceInfo.length > 0) {
                                    $careshipPriceInfo.hide();
                                }
                                self.updatePaymentAmountPrice($paymentAmount);
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
                        }
                    }
                });

                //케어십 이용요금
                self.$pdpInfoCareshipService.on('click','dl.price-info a.btn-link.popup', function(e) {
                    e.preventDefault();
                    self.$careshipInfoPopup.vcModal();
                });

                //케어솔루션 이용요금 
                self.$pdpInfoCareSiblingOption.on('click','dl.price-info a.btn-link.popup', function(e) {
                    e.preventDefault();
                    self.$caresolutionInfoPopup.vcModal();
                });

                //렌탈 케어솔루션 계약기간
                if(self.$caresolutionRentalInfoSelectBox.length > 0) {
                    //가입비 선택
                    self.$caresolutionRentalInfoSelectBox.eq(0).on('change', function(e,data){
                        var value = $(this).vcSelectbox('selectedOption').value;
                        self.rentalInfoSelectBoxUpdate(1,self.rentalInfoData[value],0, true);
                    });
                    //의무사용기간 선택
                    self.$caresolutionRentalInfoSelectBox.eq(1).on('change', function(e,data){
                        var selectOption = $(this).vcSelectbox('selectedOption');
                        var itemData = $(selectOption).data('item');
                        self.rentalInfoSelectBoxUpdate(2,itemData,0, true);
                    });
                    //방문주기 선택 - 화면 가격 정보 갱신
                    self.$caresolutionRentalInfoSelectBox.eq(2).on('change', function(e,data){
                        var selectOption = $(this).vcSelectbox('selectedOption');
                        var itemData = $(selectOption).data('item');
                        var $li =  $(this).parents('li');
                        $li.find('dl.text-box:eq(0) dd.content').text(itemData.contractTerm+'년');
                        self.updateRentalInfoPrice(itemData);
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
                self.$pdpInfo.on('click','div.option-contents div.ui_dropdown_list li a', function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var $dropDown = $this.parents('.ui_dropdown');
                    $dropDown.find('a.ui_dropdown_toggle').text($this.attr('data-card-title'));
                    $dropDown.vcDropdown("close");

                    var cardData = {};
                    var cardId = $this.attr('href').replace("#","");
                    if(cardId) {
                        cardData.cardId = cardId;
                    }
                    var cardSale = $this.data('cardSale');
                    if(cardSale) {
                        cardData.cardSale = cardSale;
                    }

                    var isRental = false;
                    var $careshipService = $this.parents('.careship-service');
                    if($careshipService.length < 1) {
                        isRental = true;
                        $careshipService = $this.parents('.care-sibling-option');
                    }
                    var $paymentAmount = $careshipService.siblings('.payment-amount');

                    $paymentAmount.data('cardData',cardData);
                    if(isRental){
                        self.updateRentalInfoPrice(self.selectRentalInfoData);
                    } else {
                        self.updateCareshipInfoPrice(self.selectCareshipInfoData);
                    }
                });

                var cardDropdown = self.$pdpInfo.find('div.option-contents div.ui_dropdown_list');
                var firstRow = cardDropdown.find('li a:eq(0)');
                if(firstRow.length > 0) {
                    firstRow.trigger('click');
                }
            },

            //팝업 버튼 이벤트
            bindPopupEvents: function() {
                //var self = this;
                $('article').on('click', 'button', function(e) {
                    var buttonLinkUrl = $(this).attr('data-link-url');
                    console.log('popup link',buttonLinkUrl);
                    if(buttonLinkUrl) {
                        location.href = buttonLinkUrl;
                    }
                });
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
                            "cardId":null,
                            "title":"이용시 최대 " + vcui.number.addComma(max) + "원 할인",
                            "maxSalePrice":0
                        }
                    ]
                });

                //간편 신청 카드
                if(simpleCardData.length > 0) {
                    arr.push({
                        "groupTitle":"----------------------------------- 간편 신청 가능 카드",
                        "listItem":simpleCardData
                    });
                }

                //개별 신청 카드
                if(individualCardData.length > 0) {
                    arr.push({
                        "groupTitle":"----------------------------------- 개별 신청 필요 카드",
                        "listItem":individualCardData
                    });
                }
                return arr;
            },

            //제휴카드리스트 갱신
            updateAssociatedCardList: function ($cardInfo, cardData) {
                if(cardData) {
                    //카드데이타
                    var selectList = $cardInfo.find('ul.select-list');
                    selectList.empty();
                    var groupItemTemplate = '<li class="divide"><span class="inner"><em>{{groupTitle}}</em></span></li>';
                    var cardItemTemplate = '<li><a href="#{{cardId}}" data-card-sale="{{maxSalePrice}}" data-card-title="{{title}}">{{label}}</a></li>';
                    cardData.forEach(function(obj, idx) {
                        if(obj.groupTitle) {
                            selectList.append(vcui.template(groupItemTemplate,obj));
                        }
                        if(obj.listItem) {
                            obj.listItem.forEach(function(item, index) {
                                item.label = item.title;
                                if(!item.cardId) {
                                    item.label = "선택취소"
                                }
                                selectList.append(vcui.template(cardItemTemplate, item));
                            });
                        }
                    });
                    $cardInfo.show();
                } else {
                    $cardInfo.hide();
                }
            },

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
                }
            },

            //렌탈 케어솔루션 계약기간 선택에 따른 가격정보 변경
            updateRentalInfoPrice: function(selectRentalInfoData) {
                var self = this;
                self.selectRentalInfoData = selectRentalInfoData;
                var carePrice = selectRentalInfoData.years1TotAmt;
                var $paymentAmount = self.$pdpInfoCareSiblingOption.siblings('.payment-amount');
  
                //선택된 카드 데이타
                var cardData = $paymentAmount.data('cardData');
                var monthPrice = carePrice;
                if(cardData && cardData.cardSale) {
                    monthPrice -= cardData.cardSale;
                }
                //월 이용요금
                var $priceInfo = self.$pdpInfoCareSiblingOption.find('dl.price-info span.price');
                $priceInfo.html('<span class="sub-text">(1년차 월 요금 기준)</span>' + vcui.number.addComma(monthPrice) + '원' + (selectRentalInfoData.freeMonth ? ('<em class="desc">무상할인(' + selectRentalInfoData.freeMonth + '개월)</em>') : ''));

                //가격정보
                var careData = {
                    "rtModelSeq":selectRentalInfoData.rtModelSeq,
                    "caresolutionSalesCodeSuffix":selectRentalInfoData.caresolutionSalesCodeSuffix
                }
                $paymentAmount.data({"careData":careData,"carePrice":carePrice,"price":0});
                self.updatePaymentAmountPrice($paymentAmount);
            },

            //케어십 계약기간 선택에 따른 가격정보 변경
            updateCareshipInfoPrice: function(selectCareshipInfoData) {
                var self = this;
                self.selectCareshipInfoData = selectCareshipInfoData;
                var carePrice = selectCareshipInfoData.years1TotAmt;
                var $paymentAmount = self.$pdpInfoCareshipService.siblings('.payment-amount');

                //선택된 카드 데이타
                var cardData = $paymentAmount.data('cardData');
                var monthPrice = carePrice;
                if(cardData && cardData.cardSale) {
                    monthPrice -= cardData.cardSale;
                }
                //월 이용요금
                var $priceInfo = self.$pdpInfoCareshipService.find('dl.price-info span.price');
                $priceInfo.html(vcui.number.addComma(monthPrice) + '원' + (selectCareshipInfoData.freeMonth ? ('<em class="desc">무상할인(' + selectCareshipInfoData.freeMonth + '개월)</em>') : ''));

                //가격정보
                var careData = {
                    "rtModelSeq":selectCareshipInfoData.rtModelSeq,
                    "caresolutionSalesCodeSuffix":selectCareshipInfoData.caresolutionSalesCodeSuffix
                }
                $paymentAmount.data({"careData":careData,"carePrice":carePrice});
                self.updatePaymentAmountPrice($paymentAmount);
            },

            //구매 가격정보 갱신
            updatePaymentAmountPrice: function($paymentAmount) {
                var self = this;

                var quantity = $paymentAmount.data('quantity');
                var price = $paymentAmount.data('price');
                var carePrice = $paymentAmount.data('carePrice');
                var cardData = $paymentAmount.data('cardData');
                var prefix = $paymentAmount.data('prefix');
                prefix = !prefix ? "" : prefix + " ";

                if(cardData && cardData.cardSale) {
                    carePrice -= cardData.cardSale;
                }
                var totalPrice = price + (carePrice ? carePrice : 0);

                var $careLi = $paymentAmount.find('li.careship-price-info');
                if($careLi.length > 0) {
                    if(!carePrice || parseInt(carePrice) == 0) {
                        $careLi.hide();
                        totalPrice = price;
                    } else {
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
                var $additionalPurchase = $paymentAmount.siblings('.additional-purchase');
                if($additionalPurchase.length > 0) {
                    var totalAdditional = 0;
                    $additionalPurchase.find('ul.additional-list li').each(function(idx, item){
                        var quantity = $(item).data('quantity');
                        var price = $(item).data('price');
                        if(quantity && price) {
                            totalAdditional += (quantity * price);
                        }
                    });
                    totalPrice += totalAdditional;
                }

                var $total = $paymentAmount.find('dl.total-payment span.price');
                $total.text(prefix + vcui.number.addComma(totalPrice * quantity) + '원');
            },

            //구매진행
            productBuy: function($dm) {
                var param = JSON.parse(JSON.stringify(sendData));
                var $paymentAmount = $dm.parents('.payment-amount')
                //소모품이 있는가
                var $additionalPurchase = $paymentAmount.siblings('.additional-purchase');
                if($additionalPurchase.length > 0) {
                    var additional = [];
                    $additionalPurchase.find('ul.additional-list li').each(function(idx, item){
                        additional.push({
                            "id":$(item).data('id'),
                            "quantity":$(item).data('quantity')
                        })
                    })
                    param.additional = additional;
                }

                //케어십 선택
                var $careshipService = $paymentAmount.siblings('.careship-service');
                var checkinput = $careshipService.find('input[type=radio]:checked');
                if(checkinput.length > 0) {
                    param.careship = checkinput.val();
                } else {
                    var $careSiblingOption = $paymentAmount.siblings('.care-sibling-option');
                    //케어쉽필수 제품인지 체크해서 알림창 뛰움
                    if($careSiblingOption.length < 1) {
                        if(careRequire) {
                            $('#careRequireBuyPopup').vcModal();
                        }
                    }
                }

                //선택 수량
                var quantity = $paymentAmount.find('div.select-quantity input.quantity');
                if(quantity.length > 0) {
                    param.quantity = quantity.val();
                }

                var careData = $paymentAmount.data('careData');
                if(careData) {
                    param.rtModelSeq = careData.rtModelSeq;
                    param.caresolutionSalesCodeSuffix = careData.caresolutionSalesCodeSuffix;
                }
                var cardData = $paymentAmount.data('cardData');
                if(cardData && cardData.cardId) {
                    param.cardId = cardData.cardId;
                }

                var ajaxUrl = $dm.data('ajaxUrl');
                if(ajaxUrl) {
                    lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                        console.log(result);
                    });
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
            clickThumbnailSlide: function(index) {
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
                        }
                        self.$selectItemTarget = thumbItem;
                        self.$selectItemTarget.addClass('active');

                        self.$pdpImage.find('a').attr({'data-link-name':item.linkName,'data-idx':(""+index)});
                        self.$pdpImage.find('a img').attr({'src':item.imagePdp,'alt':item.alt});
                        break;
                    case "video":
                    case "animation":
                        self.openVisualModal(index);
                        break;
                    default:
                        break;
                }
            },

            //PDP모달 오픈
            openVisualModal: function(index) {
                var self = this;
                self.clickModalThumbnail(index);
                $('#pop-pdp-visual').vcModal();
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
    
                self.pinchZoom.runZoom(1, false);
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
                        self.$popPdpVisualImage.find('div.zoom-area img').attr({'data-pc-src':item.imagePC,'data-m-src':item.imageMobile});
                        self.$popPdpVisualImage.vcImageSwitch('reload');
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
                        //self.$popPdpVisualVideo.vcImageSwitch('reload');
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
                if(compare){
                    var isAdd = lgkorUI.addCompareProd(categoryId, compareData);
                    if(!isAdd) $dm.prop('checked', false);
                } else{
                    lgkorUI.removeCompareProd(categoryId, compareData.id);
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
                    if(vcui.isEmpty(storageCompare[categoryId]))
                    for(var i in storageCompare[categoryId]){
                        if(sendData['id'] == storageCompare[categoryId][i]['id']) chk = true;
                    }
                }
                self.$pdpInfo.find('.product-compare input[type=checkbox]').prop('checked', chk)
            }
        };

        KRP0008.init();
    });
})();