(function() {
    $(window).ready(function(){
        if(!document.querySelector('.KRP0008')) return false;

        $('.KRP0008').buildCommonUI();
        
        var KRP0008 = {
            init: function() {
                var self = this;
                self.isDragging = false;

                self.setting();
                self.bindEvents();
                self.bindPopupEvents();
            },

            setting: function() {
                var self = this;
                //pdp데이타
                self.$pdpData = $('#pdp-data');

                //콤포넌트
                self.$component = $('div.component-wrap');

                //데스크탑용 갤러리
                self.$pdpVisual = $('#desktop_summary_gallery div.pdp-visual');
                //데스크탑용 갤러리 이미지
                self.$pdpImage = self.$pdpVisual.find('div.pdp-visual-image');
                //데스크탑용 갤러리 썸네일리스트
                self.$pdpThumbnail = self.$pdpVisual.find('div.pdp-thumbnail-nav div.inner div.pdp-thumbnail-list ul.thumbnail-list');
                //PDP 더보기
                //self.$pdpMoreInfo = self.$pdpVisual.find('div.pdp-more-info');
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


                //vcui.require(['ui/carousel'], function () {
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
                //});

            },

            bindEvents: function() {
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

                /*
                //PDP 갤러리 더보기
                self.$pdpMoreInfo.on('click','a',function(e) {
                    e.preventDefault();
                    self.requestModal(this);
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


                //즐겨찾기
                self.$pdpInfo.find('#wish-chk').on('click', function(e) {
                    var itemID = self.$pdpInfo.attr('data-id');
                    var checked = $(this).is(':checked');
                    self.requestWishItem(itemID, checked);
                });

                //인포 옵션 변경
                self.$pdpInfoSiblingOption.on('click','input', function(e){
                    var $optionList = $(this).parents('.option-list').siblings('div').find('span');
                    if($optionList.length > 0) {
                        $optionList.first().text($(this).siblings('label').find('span').text());
                    }
                    var $siblingOption = $(this).parents('.sibling-option');
                    var $findData = $siblingOption.find('input:checked');
                    var param = {};
                    $findData.each(function (i, o) {
                        var $o = $(o);
                        param[$o.attr('name')] = $o.attr('id');
                    });
                    self.requestSelectOption(param);
                });

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

                self.$pdpInfo.find('div.purchase-button a').on('click', function(e) {
                    if($(this).hasClass('cart')) {
                        console.log('카트');
                    } else {
                        //구매,예약,렌탈
                        console.log('goto buy');
                    }
                });
            },

            //팝업 버튼 이벤트
            bindPopupEvents: function() {
                $('#pdp-modal').on('click', 'button', function(e) {
                    var buttonLinkUrl = $(this).attr('data-link-url');
                    if(buttonLinkUrl) {
                        location.href = buttonLinkUrl;
                    }
                });
            },

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
                        //vcui.require(['ui/imageSwitch'], function () {
                            self.$popPdpVisualImage.vcImageSwitch('reload');
                            self.$popPdpVisualImage.show();
                            self.$popPdpVisualVideo.hide();
                            self.$popPdpVisualAnimation.hide();
                            self.$popPdpVisual360.hide();
                            self.$popPdpZoomArea.show();
                            self.pinchZoom.update(true);
                        //});
                        break;
                    case "video":
                        /*
                        var template = '<div class="item-box visual-box">' +
                            '<div class="video-container video-box youtube-box">' +
                                '<div class="thumnail">' +
                                    '<img data-pc-src="{{imagePC}}" data-m-src="{{imageMobile}}" alt="{{alt}}">' +
                                    '<a href="#" data-src="{{adUrl}}" class="see-video acc-video-content" title="Opens in a new layer popup" role="button" data-video-content="acc-video" data-type="youtube" data-link-area="" data-link-name="{{linkName}}" aria-describedby="{{alt}}">plays audio description video</a>' +
                                '</div>' +
                                '<div class="video-asset video-box-closeset">' +
                                    '<iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer;encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="{{videoUrl}}"></iframe>' + 
                                '</div>' +
                            '</div>' +
                        '</div>'
                        self.$popPdpVisualVideo.html(vcui.template(template,item));
                        */
                        self.$popPdpVisualVideo.find('div.thumnail img').attr({
                            'data-pc-src':item.imagePC,
                            'data-,-src':item.Mobile,
                            'alt':item.alt
                        });
                        self.$popPdpVisualVideo.find('div.thumnail a').attr({
                            'data-src':item.adUrl,
                            'data-link-name':item.linkName,
                            'aria-describedby':item.alt
                        });
                        self.$popPdpVisualVideo.find('iframe').attr('src',item.videoUrl);
                        self.$popPdpVisualVideo.vcImageSwitch('reload');
                        //vcui.require(['ui/imageSwitch','ui/youtubeBox'], function () {
                            //self.$popPdpVisualVideo.find('.youtube-box').vcYoutubeBox();
                            self.$popPdpVisualImage.hide();
                            self.$popPdpVisualVideo.show();
                            self.$popPdpVisualAnimation.hide();
                            self.$popPdpVisual360.hide();
                            self.$popPdpZoomArea.hide();
                        //});
                        break;
                    case "animation":
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area a').attr({'data-src':item.adUrl,'aria-describedby':item.alt});
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area p.hidden').text(item.alt);
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area div.animation-area video source').attr({'src':item.videoUrl,'type':('video/'+item.videoType)});
                        self.$popPdpVisualAnimation.find('div.visual-box div.visual-area div.animation-area video').attr({'src':item.videoUrl});
                        //self.$popPdpVisualAnimation.find('div.animation-box').vcVideoBox('play');
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
            /*
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
            */

            //아이템 찜하기
            requestWishItem: function(itemID, wish) {
                var self = this;
                var ajaxUrl = self.$pdpInfo.attr('data-wish-url');
                var postData = {"itemID":itemID, "wish":wish};
                lgkorUI.requestAjaxDataPost(ajaxUrl, postData, null);
            },

            //선택된 옵션으로 모델 데이타 가져오기
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
            }
        };

        KRP0008.init();
    });
})();