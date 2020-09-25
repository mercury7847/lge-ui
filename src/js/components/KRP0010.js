$(window).ready(function(){
    if(!document.querySelector('.KRP0010')) return false;

    $('.KRP0010').buildCommonUI();

    /*
    vcui.require(['ui/carousel'], function () {
        $('.KRP0010').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
            swipeToSlide: true,
            slidesToShow: 6,
            slidesToScroll: 1,
            
        });
    });
*/

    var KRP0010 = {
        init: function() {
            //self = this;
            self.$pdpVisual = $('#desktop_summary_gallery div.pdp-visual').first();
            self.$detailInfo =  $('div.pdp-wrap div.pdp-info-area div.product-detail-info').first();
            self.$detailOption = self.$detailInfo.find('div.product-detail-option').first();
            //self.$priceInfo = self.$detailInfo.find('div.product-detail-option div.price-info').first();
            //self.$sibilingInfo = self.$priceInfo.siblings('div.sibling-info').first();

            //this.bindEvents();
            this.requestDetailData();
        },

        bindEvents: function() {
            //탭 이벤트
            self.$mypage.find('.ui_tab').on('tabchange', function(e, data) {
                if(firstLoad) {
                    //처음 변경되는 탭을 무시한다 화면에 최초 진입시
                    //탭을 통한 데이타 갱신이 아니라 따로 데이타를 전달할 경우 사용
                    firstLoad = false;
                    return;
                }
                var href = $(data.button).attr('href');
                this.requestData({'type': href.replace("#", "")});
            });

            //모달팝업 버튼
            $('#laypop .btn-wrap button:not(.ui_modal_close)').on('click',function(e){
                $(e.currentTarget).closest('#laypop').vcModal('hide');
                //모두 삭제
                var removeItems = [];
                self.$mypage.find('ul.notice-lists').find('li.list div.notice-box button.btn-del').each(
                    function () {
                        removeItems.push($(this).data('id'))
                    }
                );
                requestDeleteData({'id': removeItems});
            });

            self.$setting.on('click',function(e){
                //설정
                e.preventDefault();
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
                console.log(data);
    
                //뱃지
                var contentHtml = "";
                var arr = data.product_badge;
                var target = self.$pdpVisual.find('div.pdp-visual-image div.badge');
                arr.forEach(function(item, index) {
                    contentHtml += ('<img src="' + item.imageUrl + '" alt="' + item.imageAlt +'">');
                });
                target.html(contentHtml);
    
                //플래그
                contentHtml = "";
                arr = data.product_flag;
                target = self.$detailInfo.find('div.promotion-badge');
                arr.forEach(function(item, index) {
                    contentHtml += (' <span class="' + item.class + '">' + item.text +'</span>');
                });
                target.html(contentHtml);

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

                //가격
                /*
                target = self.$priceInfo.find('div.discount-rate span.price');
                target.html(data.product_sales_count +'<em>%</em>');
                target = self.$priceInfo.find('div.purchase-price span.price');
                target.html(vcui.number.addComma(data.product_master_price) +'<em>원</em>');
                target = self.$priceInfo.find('div.reduced-price span.price');
                target.html(vcui.number.addComma(data.product_price) +'<em>원</em>');
                */

                //tab check
                //self.$detailOption.children('div:not(.option-tabs)').remove();
                var tabArr = data.product_tab instanceof Array ? data.product_tab : [(Object.keys(data.product_info)[0])];
                if(tabArr.length > 1) {
                    var tabs = self.$detailOption.find('.option-tabs').show();
                    //탭영역 만들기
                    contentHtml = '';
                    var optionContents = '';
                    tabArr.forEach(function(item, index) {               
                        var tabData = data.product_info[item];
                        contentHtml += '<li role="presentation"><a href="#' + item +'" role="tab" aria-controls="' + item + '">' + tabData.text + (tabData.checked ? '<em class="blind">선택됨</em>':'') +'</a></li>';
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

                //혜택정보
                /*
                self.$priceInfo.children("div:not(.price-area)").remove();
                var arr = data.price_info instanceof Array ? data.price_info : [];
                //var itemHtml, itemArr;
                var itemArr;
                arr.forEach(function(item, index) {
                    itemArr = item.type_option instanceof Array ? item.type_option : [];

                    switch(item.type) {
                        case "product-benefit-none":
                            contentHtml = '<div class="product-benefit"><div class="title">'+ item.type_text + '</div><ul>';
                            break;
                        case "product-benefit-popup":
                            contentHtml = '<div class="product-benefit"><div class="title">'+ item.type_text +
                            '<a href="#' + item.type_popup_url +'" class="btn-modal"><span class="blind">' + item.type_popup_text + '</span></a></div><ul>';
                            break;
                        default:
                            break;
                    }
                    itemArr.forEach(function(item, index) {
                        contentHtml += ('<li>' + item + '</li>');
                    });
                    contentHtml += '</ul></div>';
                    self.$priceInfo.append(contentHtml);

                    //contentHtml += itemHtml;
                });
                */

                //self.$priceInfo.children("div:not(.price-area)").remove();
                //self.$priceInfo.append(contentHtml);
                
                //옵션
                /*
                self.$sibilingInfo.empty();
                arr = data.sibling_info instanceof Array ? data.sibling_info : [];
                arr.forEach(function(item, index) {
                    itemArr = item.type_option instanceof Array ? item.type_option : [];
                    switch(item.type) {
                        case "sibling-color":
                            contentHtml = '<div class="sibling-color">' +
                                '<div class="text">' + item.type_text + '</div>' +
                                '<div class="select-option radio color"><div class="option-list" role="radiogroup">';
                            itemArr.forEach(function(option_item, index) {
                                contentHtml += ('<div role="radio" class="chk-wrap-colorchip ' + option_item.class + '" title="' + option_item.text + '">' +
                                    '<input type="radio" id="' + item.type_name + index + '" name="' + item.type_name + '" value="' + option_item.value +'"'+ (option_item.checked?' checked':'') + '>' +
                                    '<label for="' + item.type_name + index +'"><span class="blind">' + option_item.text  + '</span></label></div>');
                            });
                            contentHtml += '</div></div></div>';
                            self.$sibilingInfo.append(contentHtml);                    
                            break;
                        case "sibling-size":
                            contentHtml = '<div class="sibling-size">' +
                                '<div class="text">' + item.type_text + '</div>' +
                                '<div class="select-option select size"><div class="select-wrap">' +
                                '<select class="ui_selectbox ' + item.type_name + '" id="' + item.type_name + '" title="' + item.type_text + '">';
                            itemArr.forEach(function(option_item, index) {
                                contentHtml += ('<option value="' + option_item.value + '" class="' + (option_item.class?option_item.class:'') + '">' + option_item.text + '</option>');
                            });
                            contentHtml += '</select></div></div></div>';
                            self.$sibilingInfo.append(contentHtml);
                            self.$sibilingInfo.find('.'+ item.type_name).vcSelectbox('update');
                            break;
                        case "sibling-service":
                            contentHtml = '<div class="sibling-service">' +
                                '<div class="text"><span>'+ item.type_text + '</span>' +
                                '<div class="tooltip-wrap"><span class="tooltip-icon ui_tooltip-target">자세히 보기</span>' +
                                '<span class="tooltip-box">' + item.type_popup_html + '</span></div></div>' + 
                                '<div class="select-option radio service"><div class="option-list" role="radiogroup">';
                            itemArr.forEach(function(option_item, index) {
                                contentHtml += ('<div role="radio" class="rdo-wrap">' +
                                    '<input type="radio" id="' + item.type_name + index + '" name="' + item.type_name + '" value="' + option_item.value +'"'+ (option_item.checked?' checked':'') + '>' +
                                    '<label for="' + item.type_name + index +'">' + option_item.text  + '</label></div>');
                            });
                            contentHtml += ('</div></div><div class="service-desc">' + item.type_popup_text + '</div></div>');
                            self.$sibilingInfo.append(contentHtml);
                            break;
                        case "is-kit":
                            contentHtml = '<div class="is-kit"><div class="text">'+ item.type_text + '</div><ul class="kit-list">'
                            itemArr.forEach(function(option_item, index) {
                                contentHtml += ('<li>' + option_item.text + '</li>');
                            });
                            contentHtml += '</ul</div></div>';
                            self.$sibilingInfo.append(contentHtml);
                            break;
                        default:
                            break;
                    }
                    
                    //contentHtml += itemHtml;
                    //self.$sibilingInfo.append(itemHtml);
                    //$('.'+ item.type_name).vcSelectbox();
                });
                */

                /*
                vcui.require(["ui/tooltipTarget"], function () {
                    var tooltip = self.$sibilingInfo.find('div.sibling-service').find('.ui_tooltip-target');
                    tooltip.vcTooltipTarget({"type":"click","tooltip":".tooltip-box"});
                });
*/

                //$("input:radio[name='sibling-info-color']:radio[value='GR']").prop('checked', true); 
                //self.$sibilingInfo.append(contentHtml);

    
            }).fail(function(d){
                alert(d.status + '\n' + d.statusText);
            });
        },

        makeContentOptionHtml: function(dataArry, idPrefix) {
            console.log(idPrefix);
            var returnHtml = '', contentHtml = '';
            var itemArr;
            var arr = dataArry instanceof Array ? dataArry : [];
            arr.forEach(function(item, index) {
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
                    case "product-benefit-none":
                        contentHtml = '<div class="product-benefit"><div class="title">'+ item.type_text + '</div><ul>';
                        itemArr.forEach(function(item, index) {
                            contentHtml += ('<li>' + item + '</li>');
                        });
                        contentHtml += '</ul></div>';
                        break;
                    case "product-benefit-popup":
                        contentHtml = '<div class="product-benefit"><div class="title">'+ item.type_text +
                        '<a href="#' + item.type_popup_url +'" class="btn-modal"><span class="blind">' + item.type_popup_text + '</span></a></div><ul>';
                        itemArr.forEach(function(item, index) {
                            contentHtml += ('<li>' + item + '</li>');
                        });
                        contentHtml += '</ul></div>';
                        break;
                    case "sibling-color":
                        contentHtml = '<div class="sibling-color">' +
                            '<div class="text">' + item.type_text + '</div>' +
                            '<div class="select-option radio color"><div class="option-list" role="radiogroup">';
                        itemArr.forEach(function(option_item, index) {
                            contentHtml += ('<div role="radio" class="chk-wrap-colorchip ' + option_item.class + '" title="' + option_item.text + '">' +
                                '<input type="radio" id="' + idPrefix + item.type_name + index + '" name="' + idPrefix + item.type_name + '" value="' + option_item.value +'"'+ (option_item.checked?' checked':'') + '>' +
                                '<label for="' + idPrefix + item.type_name + index +'"><span class="blind">' + option_item.text  + '</span></label></div>');
                        });
                        contentHtml += '</div></div></div>';
                        break;
                    case "sibling-size":
                        contentHtml = '<div class="sibling-size">' +
                            '<div class="text">' + item.type_text + '</div>' +
                            '<div class="select-option select size"><div class="select-wrap">' +
                            '<select class="ui_selectbox ' + item.type_name + '" id="' + idPrefix + item.type_name + '" title="' + item.type_text + '">';
                        itemArr.forEach(function(option_item, index) {
                            contentHtml += ('<option value="' + option_item.value + '">' + option_item.text + '</option>');
                        });
                        contentHtml += '</select></div></div></div>';
                        //self.$sibilingInfo.append(contentHtml);
                        //self.$sibilingInfo.find('.'+ item.type_name).vcSelectbox('update');
                        break;
                    case "sibling-service":
                        contentHtml = '<div class="sibling-service">' +
                            '<div class="text"><span>'+ item.type_text + '</span>' +
                            '<div class="tooltip-wrap"><span class="tooltip-icon ui_tooltip-target">자세히 보기</span>' +
                            '<span class="tooltip-box">' + item.type_popup_html + '</span></div></div>' + 
                            '<div class="select-option radio service"><div class="option-list" role="radiogroup">';
                        itemArr.forEach(function(option_item, index) {
                            contentHtml += ('<div role="radio" class="rdo-wrap">' +
                                '<input type="radio" id="' + idPrefix + item.type_name + index + '" name="' + idPrefix + item.type_name + '" value="' + option_item.value +'"'+ (option_item.checked?' checked':'') + '>' +
                                '<label for="' + idPrefix + item.type_name + index +'">' + option_item.text  + '</label></div>');
                        });
                        contentHtml += ('</div></div><div class="service-desc">' + item.type_popup_text + '</div></div>');
                        //self.$sibilingInfo.append(contentHtml);
                        break;
                    case "is-kit":
                        contentHtml = '<div class="is-kit"><div class="text">'+ item.type_text + '</div><ul class="kit-list">'
                        itemArr.forEach(function(option_item, index) {
                            contentHtml += ('<li>' + option_item.text + '</li>');
                        });
                        contentHtml += '</ul</div></div>';
                        //self.$sibilingInfo.append(contentHtml);
                        break;
                    default:
                        break;
                }
                
                returnHtml += contentHtml;
            });
            return returnHtml;
        }
    };

    KRP0010.init();
})