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
                    vcui.require(['ui/pagination'], function () {
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
                self.$pdpInfoPaymentAmount = self.$pdpInfo.find('.payment-amount');
                self.$pdpInfoAdditionalPurchase = self.$pdpInfo.find('.additional-purchase');
                self.$pdpInfoCareshipService = self.$pdpInfo.find('.careship-service');
                self.$pdpInfoCareSiblingOption = self.$pdpInfo.find('.care-sibling-option');

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
                if(awards) {
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
                   self.requestCompareItem(sendData.modelId, checked, $(this));
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
                    console.log('goto buy');
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
                    var price = $this.attr('data-price');
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
                    $li.attr('data-quantity',quantity);
                    var $total = $li.find('span.price').contents()[1];
                    var price = $li.attr('data-price');
                    $total.textContent = (vcui.number.addComma(price*quantity) + '원');
                });

                //추가구매 삭제
                self.$pdpInfoAdditionalPurchase.on('click','button.btn-delete', function(e){
                    var $li = $(this).parents('li');
                    $li.remove();
                });

                //수량 선택
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
                    var $total = $paymentAmount.find('dl.total-payment span.price');
                    var price = self.$pdpInfo.attr('data-price');
                    $total.text(vcui.number.addComma(price*quantity) + '원');
                });

                //케어쉽 서비스 선택 관련
                self.$pdpInfoCareshipService.on('change','input[type=radio]', function(e){
                    //케어쉽필수 제품인지 체크해서 알림창 뛰움
                    var val = $(this).val();
                    if(!lgkorUI.stringToBool(val)) {
                        if(waterCareRequire) {
                            $(this).parents('ul').find('input[type=radio][value="Y"]').trigger('click');
                            $('#waterCareRequirePopup').vcModal();
                        } else if(careRequire) {
                            $(this).parents('ul').find('input[type=radio][value="Y"]').trigger('click');
                            $('#careRequirePopup').vcModal();
                        }
                    }
                });

                ///아마도 다르게
                /*
                self.$pdpInfoCareshipService.on('click','div.selectbox-list a', function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var _id = $this.attr('href').replace("#","");
                    var $dropDown = $this.parents('.ui_dropdown');
                    $dropDown.find('input').val(_id);
                    $dropDown.find('a.ui_dropdown_toggle').text($this.text());
                    $dropDown.vcDropdown("close");
                    self.requestSelectCareOption($this.parents('.careship-service'));
                });

                self.$pdpInfoCareshipService.on('change','.ui_selectbox', function(e, data){
                    var value = e.target.value;
                    $(this).siblings('input').val(value);
                    self.requestSelectCareOption($(this).parents('.careship-service'));
                });

                //케어쉽(렌탈) 서비스 선택 관련
                self.$pdpInfoCareSiblingOption.on('change','.ui_selectbox', function(e, data){
                    var value = e.target.value;
                    var $this = $(this);
                    var $parent = $this.parents('.care-sibling-option');
                    $this.siblings('input').val(value);
                    
                    var text = $($this.vcSelectbox('selectedOption')).text();
                    var index = $parent.find('.ui_selectbox').index($this);
                    var $articleBox = $parent.find('.article-box');
                    $articleBox.find('li:eq('+(index+1)+')').contents()[1].textContent = text;

                    self.requestSelectCareSiblingOption($parent);
                });

                self.$pdpInfoCareSiblingOption.on('click','div.selectbox-list a', function(e){
                    e.preventDefault();
                    var $this = $(this);
                    var _id = $this.attr('href').replace("#","");
                    var $dropDown = $this.parents('.ui_dropdown');
                    $dropDown.find('input').val(_id);
                    $dropDown.find('a.ui_dropdown_toggle').text($this.text());
                    $dropDown.vcDropdown("close");
                    self.requestSelectCareSiblingOption($this.parents('.care-sibling-option'));
                });
                */

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

                //렌탈 가격 정보
                var rentalPriceData = {};
                
                rentalInfo.forEach(function(item, index) {
                    //가입비
                    var rtRgstFeePre = ("" + item.rtRgstFeePre);
                    //의무사용 기간
                    var dutyTerm = item.dutyTerm;
                    //방문
                    var visitPer = item.visitPer;

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

                console.log(rentalPriceData);
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

            //구매진행
            productBuy: function($dm) {
                var $paymentAmount = $dm.parents('.payment-amount')
                console.log($paymentAmount);
                    var param = {};
                    //소모품이 있는가
                    var $additionalPurchase = $paymentAmount.siblings('.additional-purchase');
                    if($additionalPurchase.length > 0) {
                        var additional = [];
                        $additionalPurchase.find('ul.additional-list li').each(function(idx, item){
                            additional.push({
                                "id":$(item).attr('data-id'),
                                "quantity":$(item).attr('data-quantity')
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
                    console.log(param);
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
            requestCompareItem: function(itemID, compare, $dm) {
                var self = this;

                if(compare){
                    var isAdd = lgkorUI.addCompareProd(sendData);
                    if(!isAdd) $dm.prop('checked', false);
                } else{
                    lgkorUI.removeCompareProd(itemID);
                }
            },

            //비교하기 저장 유무 체크...
            setCompares:function(){
                var self = this;
                var chk = false;
                var storageCompare = lgkorUI.getStorage(lgkorUI.COMPARE_KEY);
                var isCompare = vcui.isEmpty(storageCompare);
                if(!isCompare){
                    for(var i in storageCompare[lgkorUI.COMPARE_ID]){
                        if(sendData['id'] == storageCompare[lgkorUI.COMPARE_ID][i]['id']) chk = true;
                    }
                }
                self.$pdpInfo.find('.product-compare input[type=checkbox]').prop('checked', chk)
            }
        };

        KRP0008.init();
    });
})();