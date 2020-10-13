$(window).ready(function(){
    if(!document.querySelector('.KRP0010')) return false;

    $('.KRP0010').buildCommonUI();
    
    var maxThumbnailCount = 6;
    var product_quantity = 1;
    var product_price = 0;
    var pdp_visual_list = [];
    var pinchZoom = null;
    var isDragging = false;
    
    var KRP0010 = {
        init: function() {
            self.$pdpVisual = $('#desktop_summary_gallery div.pdp-visual');
            self.$pdpImage = self.$pdpVisual.find('div.pdp-visual-image');
            self.$pdpThumbnail = self.$pdpVisual.find('div.pdp-thumbnail-nav div.inner div.pdp-thumbnail-list ul.thumbnail-list');
            self.$pdpMobileVisual = $('#mobile_summary_gallery');
            self.$pdpMobileSlider = self.$pdpMobileVisual.find('div.ui_carousel_slider');
            self.$pdpMobileSliderTrack = self.$pdpMobileSlider.find('div.slide-content ul.slide-track');
            self.$pdpMoreInfo = self.$pdpVisual.find('div.pdp-more-info');

            self.$detailInfo =  $('div.pdp-wrap div.pdp-info-area div.product-detail-info').first();
            self.$detailOption = self.$detailInfo.find('div.product-detail-option').first();
            self.$additionalPurchase = self.$detailInfo.find('div.additional-purchase').first();
            self.$careshipTotalPayment = self.$detailInfo.find('div.careship-total-payment').first();
            self.$rentalOnlyInfo = self.$detailInfo.find('div.rental-only-info').first();
            self.$paymentAmountInfo = self.$detailInfo.find('div.payment-amount-info').first();
            self.$paymentAmountInfoQuantity = self.$paymentAmountInfo.find('div.quantity-wrap div.select-quantity div.inner input.quantity');
            self.$paymentAmountInfoPaymentPrice = self.$paymentAmountInfo.find('div.quantity-wrap div.payment span.price');
            self.$purchaseButton = self.$detailInfo.find('div.purchase-button.default');
            self.$preorderButton = self.$detailInfo.find('div.pre-order');
            self.$rentalButton = self.$detailInfo.find('div.rental');
            self.$displayProduct = self.$detailInfo.find('div.display-product');

            //PDP모달
            self.$popPdpVisual = $('#pop-pdp-visual');
            self.$popPdpVisualImage = self.$popPdpVisual.find('#modal_detail_target div.image');
            self.$popPdpVisualVideo = self.$popPdpVisual.find('#modal_detail_target div.video');
            self.$popPdpVisualAnimation = self.$popPdpVisual.find('#modal_detail_target div.animation');
            self.$popPdpThumbnail = self.$popPdpVisual.find('div.pop-pdp-thumbnail-nav ul.pop-thumbnail-list');

            vcui.require(['ui/pinchZoom'], function (PinchZoom) {
                pinchZoom = new PinchZoom('.zoom-area');

                self.$popPdpVisual.find('div.zoom-btn-area a.zoom-plus').on('click', function(){
                     var zoom = pinchZoom.getZoomFactor();
                     if(Math.round(zoom) >= 4) zoom = 0;
                     pinchZoom.runZoom(zoom+1, true); 
                });

                self.$popPdpVisual.find('div.zoom-btn-area a.zoom-minus').on('click', function(){
                     var zoom = pinchZoom.getZoomFactor();
                     pinchZoom.runZoom(zoom-1, true); 
                });

                self.$popPdpVisualImage.mousedown(function() {
                    isDragging = false;
                })
                .mousemove(function() {
                    isDragging = true;
                 })
                .mouseup(function() {
                    var wasDragging = isDragging;
                    isDragging = false;
                    if (!wasDragging) {
                        self.$popPdpVisual.find('div.zoom-btn-area a.zoom-plus').trigger('click');
                    }
                });
                
                pinchZoom.update(true);
            });
            
            this.bindEvents();
            
            this.requestDetailData();
        },

        bindEvents: function() {
            self.$pdpMobileSlider.on("click", function(e){ 
                e.preventDefault();
                var slideClicked = $(this).find(".ui_carousel_current").attr("data-idx");
                KRP0010.openVisualModal(slideClicked); 
            });

            //구매수량 버튼
            self.$paymentAmountInfo.find('div.quantity-wrap div.select-quantity div.inner button').on('click',function(e){
                //수량 감소
                if($(this).hasClass('minus')) {
                    --product_quantity;
                } else if($(this).hasClass('plus')) {
                    ++product_quantity;
                }
                if(product_quantity < 0) product_quantity = 0;
                KRP0010.reloadPaymentAmountInfoQuantity();
            });

            self.$purchaseButton.find('div.btn-group a.btn.pink').on('click',function(e){
                //구매
                e.preventDefault();
                if($(this).data('control') != 'modal') {
                    KRP0010.purchase($(this).data('url'));
                }
            });
            
            self.$purchaseButton.find('div.btn-group a.btn.cart').on('click',function(e){
                //카트
                e.preventDefault();
                KRP0010.cart($(this).data('url'));
            });

            self.$preorderButton.find('a.btn.black').on('click',function(e){
                //구매
                e.preventDefault();
                if($(this).data('control') != 'modal') {
                    KRP0010.preorder($(this).data('url'));
                }
            });

            self.$rentalButton.find('div.btn-group a.btn.pink').on('click',function(e){
                //구매
                e.preventDefault();
                if($(this).data('control') != 'modal') {
                    KRP0010.rental($(this).data('url'));
                }
            });
            self.$rentalButton.find('div.btn-group a.btn.cart').on('click',function(e){
                //카트
                e.preventDefault();
                KRP0010.cart($(this).data('url'));
            });

            self.$displayProduct.find('div.btn-group a.btn').on('click',function(e){
                //카트
                e.preventDefault();
                console.log('이동',$(this).data('url'));
            });

            self.$pdpImage.find('a').first().on('click',function(e){
                e.preventDefault();
                var slideClicked = $(this).attr("data-idx"); 
                KRP0010.openVisualModal(slideClicked);
            });
        },

        requestDetailData: function(param) {
            var ajaxUrl = self.$detailInfo.data('url-detail');
    
            $.ajax({
                url: ajaxUrl,
                data: param
            }).done(function (d) {
                if(d.status != 'success') {
                    alert(d.message ? d.message : '오류발생');
                    return;
                }
    
                var data = d.data;
                //console.log(data);
    
                //뱃지
                var contentHtml = "";
                var arr = data.product_badge;
                var target = self.$pdpVisual.find('div.pdp-visual-image div.badge');
                arr.forEach(function(item, index) {
                    contentHtml += ('<img src="' + item.image_url + '" alt="' + item.image_alt +'">');
                });
                target.html(contentHtml);
                target = self.$pdpMobileVisual.find('div.badge');
                target.html(contentHtml);
    
                //플래그
                contentHtml = "";
                arr = data.product_flag;
                target = self.$detailInfo.find('div.promotion-badge');
                arr.forEach(function(item, index) {
                    contentHtml += (' <span class="' + item.class + '">' + item.text +'</span>');
                });
                target.html(contentHtml);

                //이미지 슬라이드 데스크탑
                contentHtml = "";
                var template = '<li class="thumbnail" data-idx="{{index}}">' +
                    '<a href="#" data-link-area="product_summary-thumbnail" data-link-name="{{link_name}}">'+
                    '<img data-src="{{thumb_url}}" class="lazyloaded" alt="{{image_alt}}">' +
                    '</a></li>';
                pdp_visual_list = data.pdp_visual_list instanceof Array ? data.pdp_visual_list : [];
                pdp_visual_list.forEach(function(item, index) {
                    item.index = "" + index;
                    if(index < (maxThumbnailCount - 1)) {
                        contentHtml += vcui.template(template,item);
                    } else if(index == (maxThumbnailCount - 1)) {
                        if(pdp_visual_list.length > maxThumbnailCount) {
                            template = '<li class="thumbnail more" data-idx="{{index}}">' +
                                '<a href="#" data-link-area="product_summary-thumbnail" data-link-name="{{link_name}}">'+
                                '<img data-src="{{thumb_url}}" class="lazyloaded" alt="{{image_alt}}">' +
                                '<span class="count">+{{more_count}}</span>' +
                                '</a></li>';
                            item.more_count = "" + (pdp_visual_list.length - maxThumbnailCount);
                            contentHtml += vcui.template(template,item);
                        } else {
                            contentHtml += vcui.template(template,item);
                        }
                    } else {
                        //무시
                    }
                });
                self.$pdpThumbnail.html(contentHtml);
                var thumbItems = self.$pdpThumbnail.find('li.thumbnail');
                thumbItems.on('click', function (e){
                    var slideClicked = $(this).attr("data-idx");
                    if($(this).hasClass('more')) {
                        //more는 바로 모달뷰 뛰움
                        KRP0010.openVisualModal(slideClicked);
                    } else {
                        //썸네일 클릭
                        KRP0010.clickThumbnailSlide(slideClicked);
                    } 
                });

                //이미지 슬라이드 모바일
                contentHtml = "";
                pdp_visual_list.forEach(function(item, index) {
                    item.index = "" + index;
                    switch(item.type) {
                        case "image":
                            var template = '<li class="slide-conts ui_carousel_slide default thumbnail" data-idx="{{index}}">' +
                                '<a href="#" data-link-area="product_summary-thumbnail" data-link-name="{{link_name}}">'+
                                '<img data-src="{{image_url}}" class="lazyloaded" alt="{{image_alt}}">'
                                '<p class="hidden pc">{{image_desc}}</p><p class="hidden mobile">{{image_desc}}</p></a></li>';
                            contentHtml += vcui.template(template,item);
                            break;
                        case "video":
                        case "mp4":
                        case "webm":
                            var template = '<li class="slide-conts ui_carousel_slide default video" data-idx="{{index}}">' +
                                '<a href="#" data-link-area="product_summary-video" data-link-name="{{link_name}}">'+
                                '<img data-src="{{image_url}}" class="lazyloaded" alt="{{image_alt}}">'
                                '<p class="hidden pc">{{image_desc}}</p><p class="hidden mobile">{{image_desc}}</p></a></li>';
                            contentHtml += vcui.template(template,item);
                            break;
                        default:
                            break;
                    }
                });
                self.$pdpMobileSliderTrack.html(contentHtml);

                vcui.require(['ui/carousel'], function () {
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

                    var f = 0;
                    var found = pdp_visual_list.some(function(item, index) { f = index; return item.type == 'image'; });
                    var index = 0;
                    if(found) {
                        index = f;
                    };
                    KRP0010.clickThumbnailSlide(index);
                });

                //pdp모달뷰
                contentHtml = "";
                pdp_visual_list.forEach(function(item, index) {
                    item.index = "" + index;
                    switch(item.type) {
                        case "image":
                            var template = '<li class="pop-thumbnail" data-idx="{{index}}">' +
                                '<a href="#" data-link-area="product_summary-thumbnail" data-link-name="{{link_name}}">'+
                                '<img data-src="{{thumb_url}}" class="lazyloaded" alt="{{image_alt}}">'
                                '<p class="hidden pc">{{image_desc}}</p><p class="hidden mobile">{{image_desc}}</p></a></li>';
                            contentHtml += vcui.template(template,item);
                            break;
                        case "video":
                        case "mp4":
                        case "webm":
                            var template = '<li class="pop-thumbnail" data-idx="{{index}}">' +
                                '<a href="#" data-link-area="product_summary-video" data-link-name="{{link_name}}">'+
                                '<img data-src="{{thumb_url}}" class="lazyloaded" alt="{{image_alt}}">'
                                '<p class="hidden pc">{{image_desc}}</p><p class="hidden mobile">{{image_desc}}</p></a></li>';
                            contentHtml += vcui.template(template,item);
                            break;
                        default:
                            break;
                    }
                });
                self.$popPdpThumbnail.html(contentHtml);
                var popThumbItems = self.$popPdpThumbnail.find('li.pop-thumbnail');
                popThumbItems.on('click', function (e){
                    var modalClicked = $(this).attr("data-idx");
                    KRP0010.clickModalThumbnail(modalClicked);
                });

                //하단배너
                if(data.pdp_more_info.visible) {
                    self.$pdpMoreInfo.find('div.inner p.text-info span.text').html(data.pdp_more_info.text);
                    self.$pdpMoreInfo.find('div.inner p.text-info img.img-area').attr({src:data.pdp_more_info.image_url,alt:data.pdp_more_info.image_alt});
                    
                    var modalAtag = self.$pdpMoreInfo.find('div.inner a.view-more');
                    modalAtag.attr('href',data.pdp_more_info.modal_url);
                    modalAtag.contents().get(0).data = data.pdp_more_info.modal_text;
                    modalAtag.find('span.bt').text(data.pdp_more_info.modal_text + ' 팝업 열림');
                    self.$pdpMoreInfo.show();
                } else {
                    self.$pdpMoreInfo.hide();
                }

                //타이틀
                target = self.$detailInfo.find('div.product-name h2.name');
                target.text(data.product_title);
                
                //제품명
                target = self.$detailInfo.find('div.sku');
                target.text(data.product_name);

                //평점
                target = self.$detailInfo.find('div.review-info div.average-rating');
                target.html(target.children());
                target.append(data.product_ratio);

                //리뷰수
                target = self.$detailInfo.find('div.review-info div.star')
                if(data.product_review_count > 0) {
                    target.addClass('is-review');
                    target.find('span.blind').text('리뷰있음');
                } else {
                    target.removeClass('is-review');
                    target.find('span.blind').text('리뷰없음');
                }
                target = self.$detailInfo.find('div.review-info div.review-count');
                target.html(target.children());
                target.append("(" + vcui.number.addComma(data.product_review_count) + "개)");

                //탭 갯수 체크
                self.$detailOption.children('div:not(.option-tabs)').remove();
                var tabArr = data.product_tab instanceof Array ? data.product_tab : [(Object.keys(data.product_info)[0])];
                if(tabArr.length > 1) {
                    var tabs = self.$detailOption.find('.option-tabs').show();
                    //탭영역 만들기
                    contentHtml = '';
                    var optionContents = '';
                    tabArr.forEach(function(item, index) {               
                        var tabData = data.product_info[item];
                        contentHtml += '<li><a href="#' + item +'">' + tabData.text + '</a></li>';
                        optionContents +=  ('<div class="option-contents ' + (tabData.class?tabData.class:'') + '" id="' + item + '"></div>');
                    });
                    tabs.find('div.ui_tab ul.tabs').html(contentHtml);
                    tabs.after(optionContents);
                    
                    //탭콘텐츠
                    tabArr.forEach(function(item, index) {
                        //탭콘텐츠 세부영역 만들기
                        var tabContent = '';
                        var tabContentArea = self.$detailOption.find('#'+item);
                        var contentData = data.product_info[item].content_data;
                        var keys = Object.keys(contentData);
                        keys.forEach(function(key, index) {
                            tabContent += ('<div class="' + key + '"></div>');
                        });
                        tabContentArea.html(tabContent);

                        //탭콘텐츠내용 만들기
                        var contentsResult = '';
                        keys.forEach(function(key, index) {
                            contentsResult = KRP0010.makeContentOptionHtml(contentData[key], item+'_'+key+'_');
                            tabContentArea.find('div.'+ key).html(contentsResult);
                        });
                    });
                } else {
                    //1개일 경우에는 탭영역을 만들지 않는다
                    self.$detailOption.find('.option-tabs').hide();
                    self.$detailOption.find('.option-contents').remove();
                    
                    //탭콘텐츠
                    var item = tabArr[0];
                    //탭콘텐츠 세부영역 만들기
                    var tabContent = '';
                    var tabContentArea = self.$detailOption;
                    var contentData = data.product_info[item].content_data;
                    var keys = Object.keys(contentData);
                    keys.forEach(function(key, index) {
                        tabContent += ('<div class="' + key + '"></div>');
                    });
                    tabContentArea.html(tabContent);

                    //탭콘텐츠내용 만들기
                    var contentsResult = '';
                    keys.forEach(function(key, index) {
                        contentsResult = KRP0010.makeContentOptionHtml(contentData[key], item+'_'+key+'_');
                        tabContentArea.find('div.'+ key).html(contentsResult);
                    });
                }

                //soldout등 알리고 싶은 메세지
                if(data.product_notice_description) {
                    self.$detailOption.append('<div class="display-product desc"><span>' + data.product_notice_description + '</span></div>');
                }

                self.$detailOption.find('.ui_selectbox').vcSelectbox('update');
                vcui.require(["ui/tooltipTarget"], function () {
                    self.$detailOption.find('.ui_tooltip-target').vcTooltipTarget({"type":"click","tooltip":".tooltip-box"});
                });

                //액세사리소모품 추가구매 self.$additionalPurchase
                contentHtml = "";
                arr = data.additional_purchase instanceof Array ? data.additional_purchase : [];
                arr.forEach(function(item, index) {
                    var template = '<li><a href="#{{product_id}}">' +
                        '<span class="item-image"><img src="{{image_url}}" alt="{{image_alt}}"></span>' +
                        '<dl class="item-info"><dt>{{title}}</dt><dd>{{price}}</dd></dl>' +
                        '</a></li>';
                    item.price = vcui.number.addComma(item.price);
                    contentHtml += vcui.template(template,item);
                });
                self.$additionalPurchase.find('ul.select-list').html(contentHtml);
                if(arr.length > 1) {
                    self.$additionalPurchase.show();
                } else {
                    self.$additionalPurchase.hide();
                };

                //구매수량 별 금액 초기화
                product_quantity = 1;
                if(data.payment_amount_info.visible) {
                    product_price = data.payment_amount_info.product_price;
                    KRP0010.reloadPaymentAmountInfoQuantity();
                    self.$paymentAmountInfo.show();
                } else {
                    self.$paymentAmountInfo.hide();
                }

                //케어십 서비스 이용료 안내
                if(data.careship_total_payment) {
                    self.$careshipTotalPayment.find('span.price').text(vcui.number.addComma(data.careship_total_payment) + '원').show();
                } else {
                    self.$careshipTotalPayment.hide();
                };

                //바로구매
                if(data.purchase_button.visible) {
                    self.$purchaseButton.find('div.btn-group a.btn.cart').attr("data-url", data.purchase_button.cart_url);
                    var purchaseButtonTarget = self.$purchaseButton.find('div.btn-group a.btn.pink');
                    purchaseButtonTarget.attr("data-url", data.purchase_button.buy_url);
                    if(data.purchase_button.modal_url) {
                        $.ajax({
                            url: data.purchase_button.modal_url,
                            dataType : 'html',
                            success : function(html) {
                                self.$purchaseButton.find('#purchase-button-default-modal').html(html);
                                self.$purchaseButton.find('#purchase-button-default-modal #popup button.btn.bd-pink').on('click',function(e){
                                    //구매
                                    e.preventDefault();
                                    $('div.ui_modal_wrap #popup').vcModal('close');
                                    KRP0010.purchase(data.purchase_button.buy_url);
                                });
                            }
                        });
                        purchaseButtonTarget.attr('href', '#purchase-button-default-modal #popup');
                        purchaseButtonTarget.attr('data-control', 'modal');
                    } else {
                        purchaseButtonTarget.attr('href', '#');
                        purchaseButtonTarget.removeAttr('data-control');
                    }
                    self.$purchaseButton.show();
                } else {
                    self.$purchaseButton.hide();
                };

                //사전예약
                if(data.preorder_button.visible) {
                    var preorderButtonTarget = self.$preorderButton.find('a.btn.black');
                    preorderButtonTarget.attr("data-url", data.preorder_button.buy_url);
                    if(data.preorder_button.modal_url) {
                        $.ajax({
                            url: data.preorder_button.modal_url,
                            dataType : 'html',
                            success : function(html) {
                                self.$preorderButton.find('#purchase-button-preorder-modal').html(html);
                                self.$preorderButton.find('#purchase-button-preorder-modal #popup button.btn.bd-pink').on('click',function(e){
                                    //구매
                                    e.preventDefault();
                                    $('div.ui_modal_wrap #popup').vcModal('close');
                                    KRP0010.preorder(data.preorder_button.buy_url);
                                });
                            }
                        });
                        preorderButtonTarget.attr('href', '#purchase-button-preorder-modal #popup');
                        preorderButtonTarget.attr('data-control', 'modal');
                    } else {
                        preorderButtonTarget.attr('href', '#');
                        preorderButtonTarget.removeAttr('data-control');
                    }
                    self.$preorderButton.show();
                } else {
                    self.$preorderButton.hide();
                };

                //렌탈신청
                if(data.rental_button.visible) {
                    self.$rentalButton.find('div.btn-group a.btn.cart').attr("data-url", data.rental_button.cart_url);
                    var rentalButtonTarget = self.$rentalButton.find('div.btn-group a.btn.pink');
                    rentalButtonTarget.attr("data-url", data.rental_button.buy_url);
                    if(data.rental_button.modal_url) {
                        $.ajax({
                            url: data.rental_button.modal_url,
                            dataType : 'html',
                            success : function(html) {
                                self.$rentalButton.find('#purchase-button-rental-modal').html(html);
                                self.$rentalButton.find('#purchase-button-rental-modal #popup button.btn.bd-pink').on('click',function(e){
                                    //렌탈
                                    e.preventDefault();
                                    $('div.ui_modal_wrap #popup').vcModal('close');
                                    KRP0010.rental(data.rental_button.buy_url);
                                });
                            }
                        });
                        rentalButtonTarget.attr('href', '#purchase-button-rental-modal #popup');
                        rentalButtonTarget.attr('data-control', 'modal');
                    } else {
                        rentalButtonTarget.attr('href', '#');
                        rentalButtonTarget.removeAttr('data-control');
                    }
                    self.$rentalButton.show();
                } else {
                    self.$rentalButton.hide();
                };

                //전시매장
                if(data.display_product.visible) {
                    self.$displayProduct.find('#display-exhibition').attr("data-url", data.display_product.exhibition_url);
                    self.$displayProduct.find('#display-visit').attr("data-url", data.display_product.visit_url);
                    self.$displayProduct.show();
                } else {
                    self.$displayProduct.hide();
                }

                //렌탈전용 제품 안내
                if(data.rental_only_info) {
                    self.$rentalOnlyInfo.show();
                } else {
                    self.$rentalOnlyInfo.hide();
                };

            }).fail(function(d){
                alert(d.status + '\n' + d.statusText);
            });

        },

        reloadPaymentAmountInfoQuantity: function() {
            self.$paymentAmountInfoQuantity.val(product_quantity);
            self.$paymentAmountInfoPaymentPrice.text(vcui.number.addComma(product_price * product_quantity));
        },

        makeContentOptionHtml: function(dataArry, idPrefix) {
            var returnHtml = '', contentHtml = '';
            var itemArr;
            var arr = dataArry instanceof Array ? dataArry : [];
            arr.forEach(function(item, index) {
                item.id = (idPrefix + item.type);
                item.type_price = vcui.number.addComma(item.type_price);
                contentHtml = '';
                var type_option = item.type_option;
                itemArr = type_option instanceof Array ? item.type_option : [];
                switch(item.type) {
                    case "price-area":
                        var template = '<div class="price-area"><div class="product-price">' +
                            '<div class="discount-rate"><em class="blind">할인율</em><span class="price">{{discount_rate}}<em>%</em></span></div>' +
                            '<div class="purchase-price"><em class="blind">판매가격</em><span class="price">{{purchase_price}}<em>원</em></span></div></div>' +
                            '<div class="reduced-price"><em class="blind">최대 혜택가격</em><span class="price">{{reduced_price}}<em>원</em></span></div></div>';
                        contentHtml = vcui.template(template,{"purchase_price":vcui.number.addComma(type_option.purchase_price),
                            "reduced_price":vcui.number.addComma(type_option.reduced_price), "discount_rate":vcui.number.addComma(type_option.discount_rate)});
                        break;
                    case "monthly-payment":
                        var template = '<div class="inner"><div class="text"><span>{{type_popup_text}}</span>' + 
                            '<a href="{{type_popup_url}}" class="btn-modal" data-control="modal"><span class="blind">{{type_popup_text}} 팝업 열림</span></a></div>' +
                            '<div class="payment-info"><div class="price">{{type_price}}원<span>{{type_text}}</span></div>' +
                            '<ul class="info-list">{{#each item in type_option}}<li>{{item.text}}</li>{{/each}}</ul></div>' + 
                            '<a href="#" class="btn bd-pink btn-small">{{type_link_text}}</a></div>';
                        contentHtml = vcui.template(template,item);
                        break;
                    case "product-benefit-none":
                        var template = '<div class="product-benefit"><div class="title">{{type_text}}</div><ul>' +
                            '{{#each item in type_option}}' +
                            '<li>{{#raw item.text}}</li>' +
                            '{{/each}}</ul></div>'
                        contentHtml = vcui.template(template,item);
                        break;
                    case "product-benefit-popup":
                        var template = '<div class="product-benefit"><div class="title">{{type_text}}' +
                            '<a href="{{type_popup_url}}" class="btn-modal" data-control="modal"><span class="blind">{{type_popup_text}}</span></a></div><ul>' +
                            '{{#each item in type_option}}' +
                            '<li>{{#raw item.text}}</li>' +
                            '{{/each}}</ul></div>'
                       contentHtml = vcui.template(template,item);
                        break;
                    case "sibling-color":
                        var template = '<div class="sibling-color"><div class="text">{{type_text}}</div>' +
                            '<div class="select-option radio color"><div class="option-list" role="radiogroup">' +
                            '{{#each (item, index) in type_option}}' +
                            '<div role="radio" class="chk-wrap-colorchip {{item.class}}" title="{{item.text}}">' +
                            '<input type="radio" id="{{id}}{{index}}" name="{{id}}" value="{{item.value}}" {{#if item.checked}}checked{{/if}}>' +
                            '<label for="{{id}}{{index}}"><span class="blind">{{item.text}}</span></label></div>' +
                            '{{/each}}</div></div></div>'
                        contentHtml = vcui.template(template,item);
                        break;
                    case "sibling-size":
                        var template = '<div class="sibling-size"><div class="text">{{type_text}}</div>' +
                            '<div class="select-option select size"><div class="select-wrap"><select class="ui_selectbox" id="{{id}}" title="{{type_text}}">' +
                            '{{#each item in type_option}}' +
                            '<option value="{{item.value}}">{{item.text}}</option>' +
                            '{{/each}}</select></div></div></div>'
                        contentHtml = vcui.template(template,item);
                        //self.$sibilingInfo.find('.'+ item.type).vcSelectbox('update');
                        break;
                    case "sibling-service":
                        var template = '<div class="sibling-service"><div class="text"><span>{{type_text}}</span>' +
                            '<div class="tooltip-wrap"><span class="tooltip-icon ui_tooltip-target">자세히 보기</span>' +
                            '<span class="tooltip-box">{{#raw type_popup_html}}</span></div></div>' +
                            '<div class="select-option radio service"><div class="option-list" role="radiogroup">' +
                            '{{#each (item, index) in type_option}}' +
                            '<div role="radio" class="rdo-wrap">' +
                            '<input type="radio" id="{{id}}{{index}}" name="{{id}}" value="{{item.value}}" {{#if item.checked}}checked{{/if}}>' +
                            '<label for="{{id}}{{index}}">{{item.text}}</label></div>' +
                            '{{/each}}' +
                            '</div></div><div class="service-desc">{{type_popup_text}}</div></div>';
                        contentHtml = vcui.template(template,item);
                        break;
                    case "sibling-text":
                        var template = '<div class="sibling-text"><div class="text">{{type_text}}</div><div class="price">{{type_price}}원</div></div>';
                        //item.type_price = vcui.number.addComma(item.type_price);
                        contentHtml = vcui.template(template,item);
                        break;
                    case "sibling-membership":
                        var template = '<div class="sibling-select"><div class="text">{{type_text}}</div><div class="select-option select membership">' +
                            '<div class="select-wrap"><select class="ui_selectbox" id="{{id}}" title="{{type_link_text}}">' +
                            '{{#each item in type_option}}<option value="{{item.value}}">{{item.text}}</option>{{/each}}' +
                            '</select></div></div></div>';
                        contentHtml = vcui.template(template,item);
                        break;
                    case "sibling-card":
                        var template = '<div class="sibling-select"><div class="text">{{type_text}}</div><div class="select-option select card">' +
                            '<div class="select-wrap"><select class="ui_selectbox" id="{{id}}" title="{{type_link_text}}">' +
                            '{{#each item in type_option}}<option value="{{item.value}}">{{item.text}}</option>{{/each}}' +
                            '</select></div></div></div>';
                        contentHtml = vcui.template(template,item);
                        break;
                    case "sibling-period":
                        var template = '<div class="sibling-text"><div class="text">{{type_text}}</div>' +
                            '<div class="select-option radio use-period"><div class="option-list" role="radiogroup">' +
                            '{{#each (item, index) in type_option}}<div class="rdo-wrap"><input type="radio" id="{{id}}{{index}}" name="{{id}}" value="{{item.value}}" {{#if item.checked}}checked{{/if}}><label for="{{id}}{{index}}">{{item.text}}</label></div>{{/each}}' +
                            '</div></div></div>';
                        contentHtml = vcui.template(template,item);
                        break;
                    case "is-kit":
                        var template = '<div class="is-kit"><div class="text">{{type_text}}</div><ul class="kit-list">' + 
                            '{{#each item in type_option}}<li>{{item.text}}</li>{{/each}}</ul></div>';
                        contentHtml = vcui.template(template,item);
                        break;
                    default:
                        break;
                }
                
                returnHtml += contentHtml;
            });
            return returnHtml;
        },

        clickThumbnailSlide: function(index) {
            var item = pdp_visual_list[index];

            switch(item.type) {
                case "image":
                    var thumbItem = self.$pdpThumbnail.find('li.thumbnail:nth-child('+(parseInt(index)+1)+')');
                    if(self.$selectItemTarget) {
                        self.$selectItemTarget.removeClass('active');
                    }
                    self.$selectItemTarget = thumbItem;
                    self.$selectItemTarget.addClass('active');

                    self.$pdpImage.find('a').attr({'data-link-name':item.link_name,'data-idx':(""+index)});
                    self.$pdpImage.find('a img').attr({'data-src':item.image_url,'src':item.image_url,'alt':item.image_desc});
                    break;
                case "video":
                case "mp4":
                case "webm":
                    KRP0010.openVisualModal(index);
                    break;
                default:
                    break;
            }
        },

        openVisualModal: function(index) {
            KRP0010.clickModalThumbnail(index);
            $('#pop-pdp-visual').vcModal();
        },

        clickModalThumbnail: function(index) {
            var thumbItem = self.$popPdpThumbnail.find('li.pop-thumbnail:nth-child('+(parseInt(index)+1)+')');
            if(self.$selectModalItemTarget) {
                self.$selectModalItemTarget.removeClass('active');
            }
            self.$selectModalItemTarget = thumbItem;
            self.$selectModalItemTarget.addClass('active');

            var item = pdp_visual_list[index];

            pinchZoom.runZoom(1, false);
            self.$popPdpVisualVideo.html('');
            self.$popPdpVisualAnimation.find('div.animation-box').vcVideoBox('reset');

            switch(item.type) {
                case "image":
                    self.$popPdpVisualImage.find('div.zoom-area img').attr({'data-pc-src':item.image_url,'data-m-src':item.image_url});
                    vcui.require(['ui/imageSwitch'], function () {
                        self.$popPdpVisualImage.vcImageSwitch('reload');
                        self.$popPdpVisualImage.show();
                        self.$popPdpVisualVideo.hide();
                        self.$popPdpVisualAnimation.hide();
                        pinchZoom.update(true);
                    });
                    break;
                case "video":
                    var template = '<div class="visual-box"><div class="video-container video-box youtube-box">' +
                        '<div class="thumnail">' +
                            '<img data-pc-src="{{image_url}}" data-m-src="{{image_url}}" alt="{{image_alt}}">' +
                            '<a href="#none" data-src="{{ad_url}}" class="see-video acc-video-content" title="Opens in a new layer popup" role="button" data-video-content="acc-video" data-type="youtube" data-link-area="" data-link-name="{{link_name}}" aria-describedby="{{image_desc}}">plays audio description video</a>' +
                        '</div><div class="video-asset video-box-closeset">' +
                            '<iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{video_url}}"></iframe>' + 
                        '</div></div></div>'
                    self.$popPdpVisualVideo.html(vcui.template(template,item));
                    vcui.require(['ui/imageSwitch','ui/youtubeBox'], function () {
                        self.$popPdpVisualVideo.vcImageSwitch('reload');
                        self.$popPdpVisualVideo.find('.youtube-box').vcYoutubeBox();
                        self.$popPdpVisualImage.hide();
                        self.$popPdpVisualVideo.show();
                        self.$popPdpVisualAnimation.hide();
                    });
                    break;
                case "mp4":
                case "webm":
                    self.$popPdpVisualAnimation.find('div.visual-box div.visual-area a').attr({'data-src':item.ad_url,'aria-describedby':item.image_desc});
                    self.$popPdpVisualAnimation.find('div.visual-box div.visual-area p.hidden').text(item.image_desc);
                    self.$popPdpVisualAnimation.find('div.visual-box div.visual-area div.animation-area video source').attr({'src':item.video_url,'type':('video/'+item.type)});
                    self.$popPdpVisualAnimation.find('div.visual-box div.visual-area div.animation-area video').attr({'src':item.video_url});
                    self.$popPdpVisualAnimation.find('div.animation-box').vcVideoBox('play');
                    self.$popPdpVisualImage.hide();
                    self.$popPdpVisualVideo.hide();
                    self.$popPdpVisualAnimation.show();
                    break;
                default:
                    break;
            }
        },

        cart: function(url) {
            console.log('카트',url);
        },
        purchase: function(url) {
            console.log(url);
        },
        preorder: function(url) {
            console.log(url);
        },
        rental: function(url) {
            console.log('렌탈',url);
        },
    };

    KRP0010.init();
})