(function(){
    //케어십 - 14개월 미만
    var lb_careShip = '<div class="sects lb-pdlr lb-careShip">' +
        '<div class="latter-benefits_detail">' +
            '<div class="lb-cont">' +
                '<div class="lb-cont_top">' +
                    '<div class="lb-head_cont">' +
                        '<h3>케이십 가입 기념 특별 혜택</h3>' +
                        '<p class="lb-term">혜택 유효 기간 : <span>{{ contStartDate }}</span> ~ <span>{{ contEndDate }}</span></p>' +
                    '</div>' +

                    '<p class="lb-top_text">' +
                        '고객님, 안녕하세요!<br>' +
                        '고객님과 LG전자 케어십이 함께하는 최소 1년동안 <span>케어솔루션 제품 추가 결합 시 모바일 상품권</span>을 드립니다.<br>' +
                        '물, 공기 뿐만 아니라 라이프 스타일까지 한번에 케어솔루션 하시고 추가 혜택까지 받아보세요!' +
                    '</p>' +
                '</div>' +

                '<div class="lb-cont_bottom">' +
                    '<div class="lb-icon">' +
                        '<i>' +
                            '<img src="/lg5-common/images/MYC/care/gift_20000_pc.png" class="pc" alt="상품권 아이콘">' +
                            '<img src="/lg5-common/images/MYC/care/gift_20000_mobile.png" class="mobile" alt="상품권 아이콘">' +
                        '</i>' +
                    '</div>' +
                    '<div class="lb-bottom_text">' +
                        '<p class="lb-TTxt">이 메시지를 받으신 고객님께서 <span><br class="mob-only">케어솔루션 추가 결합 시 혜택</span></p>' +

                        '<h5>모바일 상품권 관련 상세 기준</h5>' +

                        '<ul>' +
                            '<li>' +
                                '<p class="dt">- 지급조건 :</p>' +
                                '<p class="dd">혜택 유효기간 내 베스트샵에서 1백만원 이상 구매조건</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 지급일정 :</p>' +
                                '<p class="dd">추가 결합 제품 설치 익월말 계약자 휴대폰번호로 증정</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 사용방법 :</p>' +
                                '<p class="dd">문자메세지 내 인증번호로 상품권교환처에서 상품권 교환(유효기간 1년)</p>' +
                            '</li>' +
                        '</ul>' +

                        '<span class="lb-bTxt">공급사 사정에 따라 타브랜드로 변경될 수 있습니다.</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';



    //1년 차 케어솔루션
    var lb_careSolution_1 = '<div class="sects lb-pdlr lb-careSolution_1">' +
        '<div class="latter-benefits_detail">' +
            '<div class="lb-cont">' +
                '<div class="lb-cont_top">' +
                    '<div class="lb-head_cont">' +
                        '<h3>케어솔루션 1년 사용 기념 특별 혜택</h3>' +
                        '<p class="lb-term">혜택 유효 기간 : <span>{{ contStartDate }}</span> ~ <span>{{ contEndDate }}</span></p>' +
                    '</div>' +

                    '<p class="lb-top_text">' +
                        '고객님, 안녕하세요!<br>' +
                        '고객님과 LG전자 케어솔루션이 함께한 1년을 기념하여 <span>케어솔루션 제품 추가 결합 시 모바일 상품권</span>을 드립니다.<br>' +
                        '물, 공기 뿐만 아니라 라이프 스타일까지 한번에 케어솔루션 하시고 추가 혜택까지 받아보세요!' +
                    '</p>' +
                '</div>' +

                '<div class="lb-cont_bottom">' +
                    '<div class="lb-icon">' +
                        '<i>' +
                            '<img src="/lg5-common/images/MYC/care/gift_20000_pc.png" class="pc" alt="상품권 아이콘">' +
                            '<img src="/lg5-common/images/MYC/care/gift_20000_mobile.png" class="mobile" alt="상품권 아이콘">' +
                        '</i>' +
                    '</div>' +
                    '<div class="lb-bottom_text">' +
                        '<p class="lb-TTxt">이 메시지를 받으신 고객님께서 <span><br class="mob-only">케어솔루션 추가 결합 시 혜택</span></p>' +

                        '<h5>모바일 상품권 관련 상세 기준</h5>' +

                        '<ul>' +
                            '<li>' +
                                '<p class="dt">- 지급조건 :</p>' +
                                '<p class="dd">혜택 유효기간 내 베스트샵에서 1백만원 이상 구매조건</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 지급일정 :</p>' +
                                '<p class="dd">추가 결합 제품 설치 익월말 계약자 휴대폰번호로 증정</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 사용방법 :</p>' +
                                '<p class="dd">문자메세지 내 인증번호로 상품권교환처에서 상품권 교환(유효기간 1년)</p>' +
                            '</li>' +
                        '</ul>' +

                        '<span class="lb-bTxt">공급사 사정에 따라 타브랜드로 변경될 수 있습니다.</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    //2년 차 케어솔루션
    var lb_careSolution_2 = '<div class="sects lb-pdlr lb-careSolution_2">' +
        '<div class="latter-benefits_detail">' +
            '<div class="lb-cont">' +
                '<div class="lb-cont_top">' +
                    '<div class="lb-head_cont">' +
                        '<h3>케어솔루션 / 케어십  2년 사용 기념 특별 혜택</h3>' +
                        '<p class="lb-term">혜택 유효 기간 : <span>{{ contStartDate }}</span> ~ <span>{{ contEndDate }}</span></p>' +
                    '</div>' +

                    '<p class="lb-top_text">' +
                        '고객님, 안녕하세요!<br>' +
                        'LG전자 케어솔루션/케어십과 함께 즐거운 날들 보내고 계신가요?<br class="pc-only">' +
                        '2년간 케어솔루션을 사랑해주신 성원에 보답하고자 <span>LG전자 제품 구매 시 멤버십포인트 적립 혜택</span>을 드립니다.<br class="pc-only">' +
                        '갖고싶던 전자제품, 케어솔루션 매니저와 상담하시고 바로 지금 장만하세요!' +
                    '</p>' +
                '</div>' +

                '<div class="lb-cont_bottom">' +
                    '<div class="lb-icon">' +
                        '<i>' +
                            '<img src="/lg5-common/images/MYC/care/gift_30000_pc.png" class="pc" alt="상품권 아이콘">' +
                            '<img src="/lg5-common/images/MYC/care/gift_30000_mobile.png" class="mobile" alt="상품권 아이콘">' +
                        '</i>' +
                    '</div>' +
                    '<div class="lb-bottom_text">' +
                        '<p class="lb-TTxt">이 메시지를 받으신 고객님께서 <span><br class="mob-only">베스트샵에서 LG전자 제품 구매 시 혜택</span></p>' +

                        '<h5>추가 3만 포인트 적립 관련 상세 기준</h5>' +

                        '<ul>' +
                            '<li>' +
                                '<p class="dt">- 지급조건 :</p>' +
                                '<p class="dd">혜택 유효기간 내 베스트샵에서 1백만원 이상 구매조건</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 지급일정 :</p>' +
                                '<p class="dd">구매제품 배송완료 익월말 적립</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt dt-custom">-&nbsp;</p>' +
                                '<p class="dd dd-custom">' +
                                    '적립포인트는 전국 LG전자 베스트샵 또는 케어솔루션 월요금으로 차감 가능합니다.<br class="pc-only">' +
                                    '(월요금 차감 신청 : 1577-4090 / 월 5천원씩 차감)' +
                                '</p>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    //3년 차 케어솔루션
    var lb_careSolution_3 = '<div class="sects lb-pdlr lb-careSolution_3">' +
        '<div class="latter-benefits_detail">' +
            '<div class="lb-cont">' +
                '<div class="lb-cont_top">' +
                    '<div class="lb-head_cont">' +
                        '<h3>케어솔루션 / 케어십  3년 사용 기념 특별 혜택</h3>' +
                        '<p class="lb-term">혜택 유효 기간 : <span>{{ contStartDate }}</span> ~ <span>{{ contEndDate }}</span></p>' +
                    '</div>' +

                    '<p class="lb-top_text">' +
                        '고객님, 안녕하세요!<br>' +
                        '고객님은 LG전자 케어솔루션/케어십 이달의 우수 고객으로 선정되셨습니다.<br><br>' +

                        '<span>우수고객님께는 포인트 적립신청만 하시면 2만 멤버십포인트를 적립</span>해드립니다. <br class="pc-only">' +
                        '{{#if !vcui.detect.isMobileDevice}}'+
                            '지금 바로 아래 "LG전자 멤버십 APP"을 설치하시어 포인트 적립을 신청하세요!' +
                            '{{#else}}' + 
                            '지금 바로 아래 "LG전자 멤버십 바로가기"버튼을 선택하시어 포인트 적립을 신청하세요!' +
                        '{{/if}}'+
                    '</p>' +
                '</div>' +

                '{{#if !vcui.detect.isMobileDevice}}'+
                    '<div class="lb-pcAppDown">' + 
                        '<div class="tit-wrap type-sub align-center">' + 
                            '<h3 class="tit">LG전자 멤버십 APP 다운</h3>' + 
                        '</div>' + 
                        '<div class="section-inner">' + 
                            '<div class="app-down">' + 
                                '<div class="inner">' + 
                                    '<span class="txt-btn">' + 
                                        '<strong>안드로이드 앱 설치하기</strong>' + 
                                        '<a href="https://play.google.com/store/apps/details?id=com.lge.lgemembership" class="btn-app-down">' + 
                                            '<img src="/lg5-common/images/BMC/img-btn-googleplay.png" alt="Google Play"/>' + 
                                        '</a>' + 
                                    '</span>' + 
                                    '<span class="img-qr">' + 
                                        '<img src="/lg5-common/images/BMC/img-qr-googleplay.png" alt="Google Play Qr코드"/>' + 
                                    '</span>' + 
                                '</div>' + 
                                '<div class="inner">' + 
                                    '<span class="txt-btn">' + 
                                        '<strong>iOS 앱 설치하기</strong>' + 
                                        '<a href="https://apps.apple.com/kr/app/id1406622899" class="btn-app-down">' + 
                                            '<img src="/lg5-common/images/BMC/img-btn-appstore.png" alt="App Store"/>' + 
                                        '</a>' + 
                                    '</span>' + 
                                    '<span class="img-qr">' + 
                                        '<img src="/lg5-common/images/BMC/img-qr-appstore.png" alt="App Store Qr코드"/>' + 
                                    '</span>' + 
                                '</div>' + 
                            '</div>' + 
                        '</div>' + 
                    '</div>' + 

                '{{#else}}' + 

                    '<div class="lb-btn">' +
                        '<button type="button" class="btn"><span>LG전자 멤버십 바로가기</span></button>' +
                    '</div>' +
                '{{/if}}'+

                '<div class="lb-cont_bottom cont_bottom-custom">' +
                    '<div class="lb-bottom_text">' +
                        '<h5>포인트 적립 상세 기준</h5>' +
                        '<ul>' +
                            '<li>' +
                                '<p class="dt">- 지급조건 :</p>' +
                                '<p class="dd">혜택 유효기간 내 멤버십 앱에서 포인트 적립 신청 조건</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 지급일정 :</p>' +
                                '<p class="dd">적립 신청 익월말 적립</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 지급일정 :</p>' +
                                '<p class="dd">전국 LG전자 베스트샵 또는 케어솔루션 월요금으로 차감 가능합니다.(월요금 차감 신청 : 1577-4090/월 5천원씩 차감)</p>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    //4년 차 케어솔루션
    var lb_careSolution_4 = '<div class="sects lb-pdlr lb-careSolution_4">' +
        '<div class="latter-benefits_detail">' +
            '<div class="lb-cont">' +
                '<div class="lb-cont_top">' +
                    '<div class="lb-head_cont">' +
                        '<h3>케어솔루션 / 케어십  4년 사용<br class="mob-only"> 기념 특별 혜택</h3>' +
                        '<p class="lb-term">혜택 유효 기간 : <span>{{ contStartDate }}</span> ~ <span>{{ contEndDate }}</span></p>' +
                    '</div>' +

                    '<p class="lb-top_text">' +
                        '고객님, 안녕하세요!<br>' +
                        'LG전자 케어솔루션/케어십과 함께 즐거운 날들 보내고 계신가요?<br>' +
                        '4년간 케어솔루션을 사랑해주신 성원에 보답하고자 <span>LG전자 제품 구매 시 멤버십포인트 적립 혜택</span>을 드립니다.<br class="pc-only">' +
                        '갖고싶던 전자제품, 케어솔루션 매니저와 상담하시고 바로 지금 장만하세요!' +
                    '</p>' +
                '</div>' +

                '<div class="lb-cont_bottom">' +
                    '<div class="lb-icon">' +
                        '<i>' +
                            '<img src="/lg5-common/images/MYC/care/gift_50000_pc.png" class="pc" alt="상품권 아이콘">' +
                            '<img src="/lg5-common/images/MYC/care/gift_50000_mobile.png" class="mobile" alt="상품권 아이콘">' +
                        '</i>' +
                    '</div>' +
                    '<div class="lb-bottom_text">' +
                        '<p class="lb-TTxt">이 메시지를 받으신 고객님께서 <span><br class="mob-only">베스트샵에서 LG전자 제품 구매 시 혜택</span></p>' +

                        '<h5>추가 5만 포인트 적립 관련 상세 기준</h5>' +

                        '<ul>' +
                            '<li>' +
                                '<p class="dt">- 지급조건 :</p>' +
                                '<p class="dd">혜택 유효기간 내 베스트샵에서 1백만원 이상 구매조건</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt">- 지급일정 :</p>' +
                                '<p class="dd">구매제품 배송완료 익월말 적립</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt dt-custom">-&nbsp;</p>' +
                                '<p class="dd dd-custom">' +
                                    '적립포인트는 전국 LG전자 베스트샵 또는 케어솔루션 월요금으로 차감 가능합니다.<br>' +
                                    '(월요금 차감 신청 : 1577-4090 / 월 5천원씩 차감)' +
                                '</p>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    //5년 차 케어솔루션
    var lb_careSolution_5 = '<div class="sects lb-pdlr lb-careSolution_5">' +
        '<div class="latter-benefits_detail lb-5year">' +
            '<div class="lb-cont">' +
                '<div class="lb-cont_top cont_top-custom">' +
                    '<div class="lb-head_cont">' +
                        '<h3>케어솔루션/케어십 5년 사용 <br class="mob-only">기념 특별 혜택</h3>' +
                        '<p class="lb-term">혜택 유효 기간 : <span>{{ contStartDate }}</span> ~ <span>{{ contEndDate }}</span></p>' +
                    '</div>' +

                    '<p class="lb-top_text">' +
                        '고객님, 안녕하세요!<br>' +
                        '5년간 LG전자 케어솔루션/케어십을 <br class="mob-only">이용해주셔서 감사합니다.<br><br>' +

                        '<span>고객님의 정수기/공기청정기 케어 솔루션 계약 및 케어 서비스가 곧 종료</span>되어 안내드립니다.<br>' +
                        '정수기/공기청정기는 전문가의 주기적 점검 및 관리와 필터교체가 필요한 제품입니다.' +
                    '</p>' +
                '</div>' +

                '<div class="lb-cont_img">' +
                    '<div class="lb-img-cotent">' +
                        '<div class="lb-cont-i_text pdr-custom">' +
                            '<h3>' +
                                '새 정수기/공기청정기로 바꿔보고 싶다면?<br>' +
                                '‘케어솔루션 재계약’ 하세요!' +
                            '</h3>' +
                            '<p>5년 사용 고객 재계약 시 월요금 할인!</p>' +
                        '</div>' +
                        '<div class="lb-cont-i_img">' +
                            '<ul>' +
                                '<li><img src="/lg5-common/images/MYC/care/benefit_img_1.jpg" alt="공기청정기 이미지"></li>' +
                                '<li><img src="/lg5-common/images/MYC/care/benefit_img_2.jpg" alt="식기세척기 이미지"></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +

                    '<div class="lb-img-cotent">' +
                        '<div class="lb-cont-i_text pdl-custom fl-r">' +
                            '<h3>' +
                                '내 정수기/공기청정기,<br>' +
                                '지금처럼 안심하고 사용하고 싶다면?<br>' +
                                '‘케어십’에 가입하세요!' +
                            '</h3>' +
                        '</div>' +
                        '<div class="lb-cont-i_img fl-l">' +
                            '<ul>' +
                                '<li><img src="/lg5-common/images/MYC/care/benefit_img_3.jpg" alt="정수기 케어 이미지"></li>' +
                                '<li><img src="/lg5-common/images/MYC/care/benefit_img_4.jpg" alt="공기청정기 상담 이미지"></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                '</div>' +

                '<div class="lb-cont_bottom cont_bottom-custom">' +
                    '<div class="lb-bottom_text">' +
                        '<ul>' +
                            '<li>' +
                                '<p class="dt dt-custom">-&nbsp;</p>' +
                                '<p class="dd dd-custom">' +
                                    '정기적인 세척관리와 필터교체를 하지 않으면 정수기의 수질이 저하되어 위생상 문제가 발생할 수 있습니다.' +
                                '</p>' +
                            '</li>' +
                            '<li>' +
                                '<p class="dt dt-custom">-&nbsp;</p>' +
                                '<p class="dd dd-custom">' +
                                    '서비스 종료 이후 케어십 가입시에는 필터초기화 비용이 발생할 수 있습니다.' +
                                '</p>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';




    
    var MODE_USER = "USER";
    var MODE_PAYMENT = "PAYMENT";
    var METHOD_CARD = "CARD";
    var METHOD_BANK = "BANK";
    var PAYMENT_METHOD_CODE = "C"; // BTOCSITE-11586 납부방법이 모두 동일하게 '계좌이체'로 출력되는 현상

    var CONTRACT_INFO;

    var CONTRACT_CARE; //BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성

    var INFO_MODIFY_CONFIRM;
    var INFO_MODIFY_SAVE;
    var PAYMENT_METHOD_CONFIRM;
    var PAYMENT_SAVE_URL;
    var ARS_AGREE_URL;
    var ARS_AGREE_CHECK_URL;
    var REQUEST_CONTRACT_URL;
    var MEMPOINT_DEDUCT_URL;
    var REQUSET_CARD_URL;

    var mypage;
    var userInfoBlock, userModifyBlock;
    var paymentInfoBlock, paymentModifyBlock;

    var userInfo = {};
    var cardInfo = {};
    var bankInfo = {};
    var paymentMode;

    var sendPaymentMethod;

    var paymentInfo = {};

    var userInfoValidation;

    var cardValidation, bankValidation;

    var txtMasking;

    var ajaxMethod = "POST";

    var requestPartnerCardYn = "";

    var CERTI_ID, BATCH_KEY, CTI_REQUEST_KEY;

    var arsAgree = 'N';
    var arsAgreeConfirm = 'N';
    var isClickedarsAgreeConfirmBtn = false;
    var isClickedarsAgreeConfirmCheckBtn = false;
    
    var careApplyCardCnt, associCardType, associCardStatus; // 제휴카드 신청 현황(DB), 제휴카드명, 제휴카드 신청 현황(API) BTOCSITE-11663 마이페이지에서 제휴카드 신청 시 오류 발생 add

    function init(){
        CONTRACT_INFO = $('.contents.mypage').data('contractInfoUrl');

        CONTRACT_CARE = $('.contents.mypage').data('contractCareUrl'); //BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성

        INFO_MODIFY_CONFIRM = $('.contents.mypage').data('modifyConfirmUrl');
        INFO_MODIFY_SAVE = $('.contents.mypage').data('modifySaveUrl');
        PAYMENT_METHOD_CONFIRM = $('.contents.mypage').data('paymentMethodUrl');
        PAYMENT_SAVE_URL = $('.contents.mypage').data('paymentSaveUrl');
        ARS_AGREE_URL = $('.contents.mypage').data('arsAgreeUrl');
        ARS_AGREE_CHECK_URL = $('.contents.mypage').data('arsAgreeCheckUrl');
        REQUEST_CONTRACT_URL = $('.contents.mypage').data('requestContractUrl');
        MEMPOINT_DEDUCT_URL = $('.contents.mypage').data('mempointDeductUrl');
        REQUSET_CARD_URL = $('.contents.mypage').data('requestCardUrl');
    
        vcui.require(['ui/modal', 'ui/validation', 'ui/formatter', 'ui/tab', 'helper/textMasking'], function () {             
            setting();
            bindEvents();

            var firstData = $('select[name=contractInfo]').find('option:nth-child(1)').val();
            if(firstData) changeContractInfo();
            else{
                if(requestPartnerCardYn == "Y"){
                    var nodata = mypage.find('.no-data').text();
                    mypage.find('.no-data').html("<p>" + nodata + "<br>케어솔루션 계약시 제휴카드를 신청하시면 더욱 편리한 이용이 가능합니다.</p>");
                }
                requestPartnerCardYn = ""
            }
            /* BTOCSITE-98 add */
            if (vcui.detect.isIOS){
                $('.arsAgreeRequestCheck').attr('disabled', true).show();
                $('#iostxt').show();
            }

   
        });
        
    }

    function setting(){
        mypage = $('.contents.mypage');

        userInfoBlock = mypage.find(".section-wrap .sects.user.viewer");
        userModifyBlock = mypage.find(".section-wrap .sects.user.modify");

        paymentInfoBlock = mypage.find(".section-wrap .sects.payment.viewer");
        paymentModifyBlock = mypage.find(".section-wrap .sects.payment.modify");
        
        var register = {
            userTelephone: {
                required: true,
                errorMsg: "전화번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            userEmail:{
                required: true,
                errorMsg: "이메일 주소를 다시 확인해주세요.",
                msgTarget: '.err-block',
                pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            },
            actualUserName: {
                required: true,
                errorMsg: "이름을 입력해주세요.",
                msgTarget: '.err-block'
            },
            actualUserPhone: {
                required: true,
                errorMsg: "휴대폰 번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            actualUserTelephone: {
                required: true,
                errorMsg: "전화번호를 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        userInfoValidation = new vcui.ui.Validation('.mypage .section-wrap .sects.user.modify',{register:register});
        userInfo = userInfoValidation.getAllValues();

        register = {
            paymentCard:{
                required: true,
                errorMsg: "신용카드의 카드사를 선택해주세요.",
                msgTarget: '.err-block'
            },
            paymentCardNumber: {
                required: true,
                pattern: /^[0-9]+$/,
                errorMsg: "신용카드의 카드번호를 입력해주세요.",
                msgTarget: '.err-block'
            },
            paymentCardPeriod: {
                required: true,
                errorMsg: "신용카드의 유효기간을 정확히 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        cardValidation = new vcui.ui.Validation('.mypage .section-wrap .sects.payment.modify .by-card',{register:register});
        cardInfo = cardValidation.getAllValues();

        register = {
            paymentBank: {
                required: true,
                errorMsg: "계좌이체할 은행명을 선택해주세요.",
                msgTarget: '.err-block'
            },
            paymentBankNumber: {
                required: true,
                pattern: /^[0-9]+$/,
                errorMsg: "계좌번호를 정확히 입력해주세요.",
                msgTarget: '.err-block'
            }
        }
        bankValidation = new vcui.ui.Validation('.mypage .section-wrap .sects.payment.modify .by-bank',{register:register});
        bankInfo = bankValidation.getAllValues();

        txtMasking = new vcui.helper.TextMasking();

        requestPartnerCardYn = getHiddenData("requestPartnerCardYn");
    }

    function bindEvents(){
        mypage.find(".section-wrap .sects.viewer").on('click', '.tit-wrap button', function(e){
            e.preventDefault();

            sendChangeConfirm(this)
        });
        
        userModifyBlock.on('click', '.cancel-btn', function(e){
            e.preventDefault();

            saveUserInfoCancel();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            saveUserInfoOk()
        });

        paymentModifyBlock.on('click', '.paymentCardConfirm, .paymentBankConfirm', function(e){
            e.preventDefault();

            setPaymentMethodAbled(this);
        }).on('click', '.arsAgreeRequest', function(e){
            e.preventDefault();

            setArsAgreeConfirm();
        }).on('click', '.arsAgreeRequestCheck', function(e){
            e.preventDefault();
            arsAgreeConfirmCheck();
        }).on('change', 'input[name=selfClearingAgree]', function(e){
            var chk = $(this).prop('checked');
            if(chk){
                $(this).prop('checked', false);
                $('#popup-selfClearing').vcModal({opener:$(this)});
            }
        }).on('click', '.selfClearingAgree', function(e){
            e.preventDefault();
            $('#popup-selfClearing').vcModal({opener:$(this)});
        }).on('click', '.cancel-btn', function(e){
            e.preventDefault();

            savePaymentInfoCancel();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            savePaymentInfoOk();
        });

        $('.mypage').on('click', '.contract-btn', function(e){
            e.preventDefault();
            
            if(userInfo.userEmail){
                $('#popup-contractIssue').find('.pop-conts .gray-txt-box p em').text(userInfo.userEmail);
    
                $('#popup-contractIssue').vcModal({opener:$(this)});
            } else{
                lgkorUI.alert("", {
                    title: "계약서를 받을 이메일 정보가 없습니다.<br>계약자 정보를 수정해주세요.",
                    ok: function(){
                        var movetop = $('.sects.user.viewer').offset().top - 80;
                        $('html, body').animate({scrollTop:movetop}, 120)
                    }
                });
            }
        }).on('click', '.requestCard-btn', function(e){
            e.preventDefault();

            setRequestCard();
        })
        // .on('click', '.paymenyList-btn', function(e){
        //     e.preventDefault();

        //     console.log("납부내역 조회");
        // }).on('click', '.cancelConsult-btn', function(e){
        //     e.preventDefault();

        //     console.log("해지상담 신청");
        // });

        $('.mempoint-btn').on('click', function(e){
            e.preventDefault();

            showMempointModify();
        });
        $('.mempoint-info').on('click', '.cancel-btn', function(e){
            e.preventDefault();

            cancelMempointModify();
        }).on('click', '.ok-btn', function(e){
            e.preventDefault();

            okMempointModify();
        }).on('change', 'input[name=point-cancel]', function(e){
            e.preventDefault();
            
            $(this).prop('checked', true);
        });

        $('#popup-contractIssue').on('click', '.btn-group button.pink', function(e){
            e.preventDefault();

            sendRequestContract();
        })

        $('#popup-cardIssue').on('click', '.requestIssue-btn', function(e){
            e.preventDefault();

            requestCardIssue();
        });

        $('#popup-selfClearing').on('click', '.btn-group button.btn', function(e){
            e.preventDefault();

            var chk = $(this).index() ? true : false;
            paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked', chk);

            if(chk) $('#popup-selfClearing').vcModal('close');
        });

        $('select[name="contractInfo"]').on('change', function(e){
            changeContractInfo();
        });


     
    }

    

    //계약서 발급 신청
    function sendRequestContract(){
        var sendata = {
            userEmail:userInfo.userEmail,
            contractID: $('select[name=contractInfo]').find('option:selected').val()
        }
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(REQUEST_CONTRACT_URL, sendata, function(result){
            if(result.data.success == "Y"){
                $('#popup-contractIssue').vcModal('close');

                if(result.data.alert && result.data.alert.title){
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                }
            } else{
                if(result.data.alert && result.data.alert.title){
                    lgkorUI.alert("", {
                        title: result.data.alert.title
                    });
                }
            }
        }, ajaxMethod);
    }

    //정보변경 확인...
    function sendChangeConfirm(item){

        var alertitle, alertmsg, sendata;
        var section = $(item).closest('.sects');
        if(section.hasClass('user')){
            alertitle = "계약자 정보 변경";
            alertmsg = "계약자 및 실사용자 정보 변경을 위해 고객님의 본인인증이 필요합니다. 진행하시겠습니까 ?";
            sendata = {confirmType: MODE_USER}
        } else{
            alertitle = "납부정보 변경";
            alertmsg = "납부정보 변경을 위해 고객님의 본인인증이 필요합니다. 진행하시겠습니까 ?";
            sendata = {confirmType: MODE_PAYMENT}
        }
        sendata["contractID"] = $('select[name=contractInfo]').find('option:selected').val();
        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(INFO_MODIFY_CONFIRM, sendata, function(result){
            lgkorUI.confirm(alertmsg, {
                title: alertitle,
                cancelBtnName: "취소",
                okBtnName: "본인인증",
                ok: function(){
                    void(window.open("", "popupChk", "width=390, height=640, scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"));   
                    document.form_chk.action = result.data.niceAntionUrl;
                    document.form_chk.m.value = result.data.m;
                    document.form_chk.EncodeData.value = result.data.sEncData;
                    document.form_chk.auth_type.value = result.data.auth_type;
                    document.form_chk.param_r1.value = result.data.param_r1;
                    document.form_chk.param_r2.value = result.data.param_r2;
                    document.form_chk.param_r3.value = result.data.param_r3;
                    document.form_chk.target = "popupChk";
                    document.form_chk.submit();

                    // editBasicInfomation();
                    //editPaymentInfomation();
                }
            });
        }, ajaxMethod);
    }

    //나이스 콜백 -정보변경
    function editBasicInfomation(){
        userInfoBlock.hide();
        userModifyBlock.show();
    }
    //나이스 콜백 -납부정보변경
    function editPaymentInfomation(){
        paymentInfoBlock.hide();
        paymentModifyBlock.show();
        paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked', false);

        setHiddenData('paymentMethodConfirm', "N");
        setHiddenData('arsAgree', "N");
    }
    //나이스 콜백 -인증실패
    function fnNiceFail(msg){
        if(msg){
            lgkorUI.alert("", {
                title: msg
            })
        }
    }
    window.editBasicInfomation = editBasicInfomation;
    window.editPaymentInfomation = editPaymentInfomation;
    window.fnNiceFail = fnNiceFail;

    //사용자 정보변경 취소...
    function saveUserInfoCancel(){
        userInfoValidation.setValues(userInfo);
        userModifyBlock.find('.err-block').hide();
        userModifyBlock.hide();
        userInfoBlock.show();
    }
    //사용자 정보변경 저장...
    function saveUserInfoOk(){
        var result = userInfoValidation.validate();
        if(!result.success) return;

        lgkorUI.showLoading();

        var sendata = userInfoValidation.getAllValues();
        sendata.confirmType = MODE_USER;
        sendata.contractID = $('select[name=contractInfo]').find('option:selected').val();
        lgkorUI.requestAjaxData(INFO_MODIFY_SAVE, sendata, function(result){
            if(lgkorUI.stringToBool(result.data.success)){
                changeContractInfo();
            }

            lgkorUI.hideLoading();
        }, ajaxMethod);
    }

    //제휴카드 신청
    function setRequestCard(){
    	// BTOCSITE-11663 마이페이지에서 제휴카드 신청 시 오류 발생, DB에서 제휴카드 신청현황의 내역이 있을경우 alert START
    	var bPopupOpenFlag	= false; // 발급 프로세스가 모두 완료된 계약에서 사용(Y : 발급성공, // E : 발급실패)
    	var alertitle		= "제휴카드 발급 신청";
    	var alertmsg		= "";
    	
    	if(associCardType) {
        	if (associCardStatus == "Y") { // 제휴카드신청현황 BTOCSITE-11663 마이페이지에서 제휴카드 신청 시 오류 발생 [D:고객정보 다름 / Y : 발급성공 / E : 발급실패 / R : 카드사신청완료 / N : 카드사신청이전]
        		
        		// Y : 발급성공
        		alertmsg = "이미 제휴카드를 이용 중입니다.\n다른 카드를 신청하시겠습니까?";
        		bPopupOpenFlag = true;
        	} else if (associCardStatus == "N" || associCardStatus == "R") {
        		
        		// N : 카드사신청이전 / R : 카드사신청완료
        		$(window).trigger("toastshow", "이미 신청된 상태입니다.");
        	} else if (associCardStatus == "E") {
        		
        		// E : 발급실패
        		alertmsg = "신청했던 제휴카드가 정상적으로 발급되지 않았습니다.\n다시 신청하시겠습니까?";
        		bPopupOpenFlag = true;
        	}
        } else {
        	// 신청내역 없음
        	if (careApplyCardCnt > 0) {
    			
        		$(window).trigger("toastshow", "이미 신청된 상태입니다.");
        		return;
        	}
    		
    		var contractInfoText = $('select[name=contractInfo]').find('option:selected').text();
            $('#popup-cardIssue').find('input[name=reqcard-contractInfo]').val(contractInfoText);
            $('#popup-cardIssue').vcModal({opener:$('.mypage .requestCard-btn')});
        }
    	
    	if (bPopupOpenFlag) {
    		lgkorUI.confirm(alertmsg, {
                title: alertitle,
                cancelBtnName: "취소",
                okBtnName: "확인",
                ok: function(){
                	var contractInfoText = $('select[name=contractInfo]').find('option:selected').text();
                    $('#popup-cardIssue').find('input[name=reqcard-contractInfo]').val(contractInfoText);
                    $('#popup-cardIssue').vcModal({opener:$('.mypage .requestCard-btn')});
                }
            });
    	}
    	// BTOCSITE-11663 마이페이지에서 제휴카드 신청 시 오류 발생, DB에서 제휴카드 신청현황의 내역이 있을경우 alert END
    }

    //제휴카드 
    function setIssueCardList(data){
        var select = $('#popup-cardIssue').find('select[name=concertedCard]');
        select.empty();
        select.append('<option value="" class="placeholder">선택</option>');
        for(var idx in data){
            var opt = "<option value='" + data[idx].cardValue + "'>" + data[idx].cardName + "</option>";
            select.append(opt);
        }
        select.vcSelectbox('update');
    }

    //제휴카드 발급신청
    function requestCardIssue(){
        var val = $('#popup-cardIssue').find('input[name=cardIssueAllchker_1]').prop('checked');
        if(!val){
            lgkorUI.alert("", {
                title: "개인정보 수집/이용 동의해주세요."
            });
            return;
        }

        val = $('#popup-cardIssue').find('input[name=cardIssueAllchker_2]').prop('checked');
        if(!val){
            lgkorUI.alert("", {
                title: "개인정보 제3자 제공 동의 해주세요."
            });
            return;
        }

        val = $('#popup-cardIssue').find('select[name=concertedCard]').find('option:selected').val();
        if(!val){
            lgkorUI.alert("", {
                title: "제휴카드를 선택하세요."
            });
            return;
        }

        lgkorUI.showLoading();

        var sendata = {
            contractID: $('select[name=contractInfo]').find('option:selected').val(),
            selectCardValue: val
        }
        
        lgkorUI.requestAjaxData(REQUSET_CARD_URL, sendata, function(result){
        	
            $('#popup-cardIssue').vcModal('close');

            lgkorUI.hideLoading();
        	
            if(result.data.status == "success"){ 
        		careApplyCardCnt++; // 제휴카드 신청 현황(DB) BTOCSITE-11663 마이페이지에서 제휴카드 신청 시 오류 발생 add
        		$(window).trigger("toastshow", "신청이 완료되었습니다.");
            } else { // fail
            	$(window).trigger("toastshow", "신청이 실패하였습니다. 다시 시도해주세요.");
            }
        	
        }, ajaxMethod);
    }

    //납부정보 input 밸리데이션...
    function paymentFieldValidation(){
        var paymentMethodIndex = $('.mypage .section-wrap .sects.payment.modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        var result = paymentMethodIndex ? bankValidation.validate() : cardValidation.validate();
        
        return result.success;
    }
    //납부정보 입력 데이터 비교...
    function compareInputData(){
        var paymentMethodIndex = $('.mypage .section-wrap .sects.payment.modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        var values = paymentMethodIndex ? bankValidation.getAllValues() : cardValidation.getAllValues();
        var chk = true;
        for(var str in values){
            if(paymentInfo[str] !== values[str]){
                chk = false;

                break;
            }
        }

        return chk;
    }
    //납부정보 확인 유무...
    function paymentConfirmYN(){
        var paymentMethodAbled = getHiddenData("paymentMethodConfirm");
        if(paymentMethodAbled == "N"){
            paymentErrorAlert();
            return false;
        }

        return true;
    }
    //납부 확인 오류창...
    function paymentErrorAlert(){
        var paymentMethodIndex = $('.mypage .section-wrap .sects.payment.modify input[name=method-pay]:checked').data("visibleTarget") == ".by-bank";
        lgkorUI.alert("",{
            title: paymentMethodIndex ? "납부 계좌 확인이 필요합니다." : "납부 카드 확인이 필요합니다."
        });
        setHiddenData('arsAgree', "N");
    }
    //납부카드/계좌 확인...
    function setPaymentMethodAbled(item){
        var chk = paymentFieldValidation();
        if(!chk) return false;

        paymentInfo = {};

        CERTI_ID = BATCH_KEY = "";

        var sendata;
        if($(item).hasClass('paymentCardConfirm')){
            sendata = cardValidation.getValues();
            sendata.confirmType = METHOD_CARD;
        } else{
            sendata = bankValidation.getValues();
            sendata.confirmType = METHOD_BANK;
        }
        sendata.contractID = $('select[name=contractInfo]').find('option:selected').val()
        lgkorUI.requestAjaxData(PAYMENT_METHOD_CONFIRM, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            if(result.data.CERTI_ID) CERTI_ID = result.data.CERTI_ID;
            if(result.data.BATCH_KEY) BATCH_KEY = result.data.BATCH_KEY;

            if(lgkorUI.stringToBool(result.data.success)){
                paymentInfo = sendata.confirmType == METHOD_CARD ? cardValidation.getAllValues() : bankValidation.getAllValues();
                paymentInfo.confirmType = sendata.confirmType;
            }

            sendPaymentMethod = sendata.confirmType;

            setHiddenData('paymentMethodConfirm', result.data.success);

            /* BTOSCITE-98 add */
            if (vcui.detect.isIOS){
                setHiddenData('arsAgree', "N");
                arsAgreeConfirm = "N";
                $('.arsAgreeRequestCheck').attr('disabled', true);
            }
            /* //BTOSCITE-98 add */


        }, ajaxMethod);
    }

    //ARS출금동의 신청...
    var arsCallingInterval = null;
    var iosAgreeCallCheck = false;
    function setArsAgreeConfirm(){
        /* BTOCSITE-98 add */
        if (vcui.detect.isIOS){
            lgkorUI.showLoading();
        }

        isClickedarsAgreeConfirmBtn = true;
        $('.arsAgreeRequest').attr('disabled', true);
        clearTimeout(arsCallingInterval);
        arsCallingInterval = setTimeout(function(){
            $('.arsAgreeRequest').attr('disabled', false);
            if (vcui.detect.isIOS){
                lgkorUI.hideLoading();
            }
        }, 5000);
        /* //BTOCSITE-98 add */

        var chk = paymentConfirmYN();
        if(!chk) return;

        chk = compareInputData();
        if(!chk){
            paymentErrorAlert();
            return;
        }

        lgkorUI.showLoading();
        
        CTI_REQUEST_KEY = "";

        var sendata = sendPaymentMethod == METHOD_CARD ? cardValidation.getValues() : bankValidation.getValues();
        sendata.contractID = $('select[name=contractInfo]').find('option:selected').val();
        sendata.confirmType = sendPaymentMethod;

        setHiddenData('arsAgree', "N");

        // BTOCSITE-98 add
        if (vcui.detect.isIOS){
            $('.arsAgreeRequestCheck').attr('disabled', false);            
            arsAgreeConfirm = "N";
            //CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
        } else {
            //CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;                    
        }
        /*
        lgkorUI.requestAjaxDataAddTimeout(ARS_AGREE_URL, 180000, sendata, function(result){
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;

            setHiddenData('arsAgree', result.data.success);
        }, ajaxMethod, null, true);
        */
        if(vcui.detect.isIOS) {
            if(!iosAgreeCallCheck ) {
                iosAgreeCallCheck = true;
                setTimeout(function (){
                    $.ajax({
                        method : ajaxMethod,
                        url : ARS_AGREE_URL,
                        data : sendata,
                        async : false,
                        success : function(result){         
                            if (!vcui.detect.isIOS){
                                lgkorUI.alert(result.data.alert.desc, {
                                    title: result.data.alert.title
                                });
                            }
            
                            // BTOCSITE-98 add
                            if (vcui.detect.isIOS){
                                //$('.arsAgreeRequestCheck').attr('disabled', false);
                                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                            } else {
                                CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;                    
                            }
                            
                            setHiddenData('arsAgree', result.data.success);                
                            // //BTOCSITE-98 add
                            iosAgreeCallCheck = false;
                        },
                        error : function(error){
                            //alert('error');
                            iosAgreeCallCheck = false;
                        },
                        complete : function(){
                            //alert('complete');
                            lgkorUI.hideLoading();
                            iosAgreeCallCheck = false;
                        }
                    });
                },1000);
            }
        } else {
            $.ajax({
                method : ajaxMethod,
                url : ARS_AGREE_URL,
                data : sendata,
                async : false,
                success : function(result){         
                    if (!vcui.detect.isIOS){
                        lgkorUI.alert(result.data.alert.desc, {
                            title: result.data.alert.title
                        });
                    }
    
                    // BTOCSITE-98 add
                    if (vcui.detect.isIOS){
                        //$('.arsAgreeRequestCheck').attr('disabled', false);
                        CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
                    } else {
                        CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;                    
                    }
                    
                    setHiddenData('arsAgree', result.data.success);                
                    // //BTOCSITE-98 add
                },
                error : function(error){
                    //alert('error');
                },
                complete : function(){
                    //alert('complete');
                    lgkorUI.hideLoading();
                }
            });
        }

    }
    // ARS 출금동의요청 체크 :: BTOCSITE-98 add
    var arsConfirmCallingInterval = null;
    function arsAgreeConfirmCheck(){
        isClickedarsAgreeConfirmCheckBtn = true;
        $('.arsAgreeRequestCheck').attr('disabled', true);
        clearTimeout(arsConfirmCallingInterval);
        arsConfirmCallingInterval = setTimeout(function(){
            $('.arsAgreeRequestCheck').attr('disabled', false);
        }, 3000);

        lgkorUI.showLoading();

        //CTI_REQUEST_KEY = "";
        arsAgreeConfirm = "N";

        lgkorUI.requestAjaxDataAddTimeout(ARS_AGREE_CHECK_URL, 180000, {}, function(result){
            //console.log('출금동의요청 체크 결과', result);
            lgkorUI.alert(result.data.alert.desc, {
                title: result.data.alert.title
            });

            CTI_REQUEST_KEY = result.data.CTI_REQUEST_KEY;
            arsAgreeConfirm = result.data.success;

            if (arsAgreeConfirm !== "Y"){
                setHiddenData('arsAgree' , 'N');                
            }            
            
        }, ajaxMethod, null, true);
        
    }

    //납부 정보변경 취소...
    function savePaymentInfoCancel(){
        try{
            cardValidation.setValues(cardInfo);
            //$('.ui_card_number').vcFormatter('update');
    
            bankValidation.setValues(bankInfo);
            setHiddenData('paymentMethodConfirm', "N");
            setHiddenData('arsAgree', "N");
            paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked', false);
            paymentModifyBlock.find('input[name=pointUseAgree]').prop('checked', false);
    
            setPaymentModeCont();
    
            paymentInfoBlock.show();
            paymentModifyBlock.hide();
        } catch(err){
            console.log(err);
        }
    }

    //납부 정보변경 저장...
    function savePaymentInfoOk(){
        var chk = paymentInfoValidation();
        if(chk){
            lgkorUI.showLoading();

            var sendata = {
                contractID: $('select[name=contractInfo]').find('option:selected').val(),
                CERTI_ID: CERTI_ID,
                BATCH_KEY: BATCH_KEY,
                CTI_REQUEST_KEY: CTI_REQUEST_KEY
            }
            for(var key in paymentInfo) sendata[key] = paymentInfo[key];
            
            lgkorUI.requestAjaxData(PAYMENT_SAVE_URL, sendata, function(result){
                if(lgkorUI.stringToBool(result.data.success)){
                    changeContractInfo();
                }

                lgkorUI.hideLoading();
            }, ajaxMethod);
        } 
    }

    //납부 정보 유효성 체크
    function paymentInfoValidation(){
        var chk = paymentConfirmYN();
        if(!chk) return false;

        chk = compareInputData();
        if(!chk){
            paymentErrorAlert();
            return false;
        }

        if(getHiddenData("arsAgree") == "N" && !vcui.detect.isIOS){
            lgkorUI.alert("",{
                title: "자동결제를 위해 ARS 출금동의 신청해주세요."
            });
            
            return false;
        }

        /* BTOCSITE-98 add */
        if(arsAgreeConfirm !== "Y" && vcui.detect.isIOS){

            if (getHiddenData("arsAgree") !== "Y"){
                lgkorUI.alert("",{
                    title: "자동결제를 위해 ARS 출금동의 신청해주세요"
                });
                return false;
            }

            if (arsAgreeConfirm !== "Y"){
                lgkorUI.alert("",{
                    title: "자동결제를 위해 ARS 출금동의 확인 버튼을 클릭해 주세요"
                });
                return false;
            }
            
        }
        /* //BTOCSITE-98 add */

        if(!paymentModifyBlock.find('input[name=selfClearingAgree]').prop('checked')){
            lgkorUI.alert("",{
                title: "자동결제를 위해 정기결제 신청을 동의해주세요."
            });
            return false;
        }
        
        return true;
    }

    function showMempointModify(){
        $('.mempoint-btn').prop('disabled', true);

        $('.mempoint-info').find('input[name=point-cancel]').prop('checked', true);

        $('.mempoint-info .viewer').hide();

        $('.mempoint-info .modify').show();
        $('.mempoint-info .btn-group').show();
    }
    function cancelMempointModify(){
        $('.mempoint-btn').prop('disabled', false);

        $('.mempoint-info .viewer').show();

        $('.mempoint-info .modify').hide();
        $('.mempoint-info .btn-group').hide();
    }
    //멤버십 포인트 차감동의 저장
    function okMempointModify(){
        var sendata = {
            isAgree: $('.mempoint-info').data('isAgree'),
            deductType: $('.mempoint-info').data('deductType'),
            userPoint: $('.mempoint-info').data('userPoint'),
            deductPoint: $('.mempoint-info').data('deductPoint'),
            contractID: $('select[name=contractInfo]').find('option:selected').val()
        }
        
        if(sendata.isAgree){
            var chk = $('.mempoint-info').find('input[name=point-cancel]').prop('checked');
            sendata.isAgree = !chk;
        } else{
            sendata.deductType = $('.mempoint-info').find('input[name=point-ded]:checked').val();

            if(sendata.deductType == undefined || sendata.deductType == null){
                lgkorUI.alert("", {title:"차감 포인트를 선택해 주세요."});
                return;
            }
            sendata.isAgree = true;
        }
        
        lgkorUI.showLoading();

        lgkorUI.requestAjaxData(MEMPOINT_DEDUCT_URL, sendata, function(result){
            if(lgkorUI.stringToBool(result.data.success)){
                changeContractInfo();
            }

            lgkorUI.hideLoading();
        }, ajaxMethod);
    }

    function changeFieldValue(gname, data){
        for(var key in data){
            $("."+gname).find('ul li[class=' + key + '] dd').empty().html(data[key]);
        }
    }

    
    // 20210721 BTOCSITE-2537 케어솔루션 > 금융리스 상품 판매, 자가관리 상품판매를 위한 개발
    function setContractInfo(data){
        mypage.find(".no-data").remove();
        if(data != undefined && data != "" && data != null){
            var info;
            
            mypage.find(".section-wrap").show();
            
            info = getMaskingData(data.userInfo.user);
            changeFieldValue('user-info', info);
    
            info = getMaskingData(data.userInfo.actualUser);
            changeFieldValue('actual-info', info);

            careApplyCardCnt = data.paymentInfo.careApplyCardCnt; // 제휴카드 신청 현황(DB) BTOCSITE-11663 마이페이지에서 제휴카드 신청 시 오류 발생 add

            ///BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성 : 파라미터 값 보내는 버튼
            var clParm = data.contractInfo.contractID;

            if( $('.cl_listBtn > a').attr('data-current-href') == undefined) {
                $('.cl_listBtn > a').attr('data-current-href', $('.cl_listBtn > a').attr('href'))
            }
            $('.cl_listBtn > a').attr('href', $('.cl_listBtn > a').attr('data-current-href') + '?contractID=' + clParm);


            data.contractInfo.contractID = "<span>" + data.contractInfo.contractID + "</span>";
            if(data.contractInfo.cancelRequestYn == "Y") data.contractInfo.contractID += "<a href='" + data.contractInfo.cancelResultUrl + "' class='btn-link cancelConsult-btn'>해지요청 조회</a>";
            // else data.contractInfo.contractID += "<a href='" + data.contractInfo.cancelConsultUrl + "' class='btn-link cancelConsult-btn'>해지상담 신청</a>";

            // BTOCSITE-175 케어솔루션 > 무상케어십 정보 추가 노출 요청            
            // contractType - R :케어솔루션 C : 케어십 
            // contDtlType - C00 : 무상케어십
            // 무상케어십일때 해지상담 신청 버튼 비노출 
            if(data.contractInfo.contDtlType != 'C00'){
                data.contractInfo.contractID += "<a href='" + data.contractInfo.cancelConsultUrl + "' class='btn-link cancelConsult-btn'>해지상담 신청</a>";
            } 
            if(data.contractInfo.contractType === 'C' || data.contractInfo.contDtlType === 'C00' ) {
                // 케어십, 무상케어십 - 의무사용기간 숨김
                $('.contract-info .dutyPeriod').hide();
                
                // 케어십 - 계약기간 표시형식 변경
                if(data.contractInfo.contractType === 'C' && data.contractInfo.contDtlType != 'C00'){
                    data.contractInfo.period =  '<div>'+data.contractInfo.period +' ~ </div>' + 
                    '<dl class="bullet-list nomargin-top">' +
                    '<dd class="b-txt">케어십 계약기간은 1년이며, 계약기간 만료 시점에 계약 해지 의사가 없을 시 최초 계약 기간만큼 자동 연장됩니다.</dd>' +
                    '</dl>';
                } 
                // 계약기간 노출형식 : 년수(시작일 ~ 종료일)
                else {
                    var startArry = data.contractInfo.contStartDate.split('.');
                    var endArry = data.contractInfo.contEndDate.split('.');
                    var periodYear = endArry[0] - startArry[0];
                    data.contractInfo.period =  '<div>'+ periodYear +'년 ('+data.contractInfo.contStartDate  +' ~ ' + data.contractInfo.contEndDate +')</div>';
                }
            }
             // BTOCSITE-175 케어솔루션 > 무상케어십 정보 추가 노출 요청  : 비노출처리 : 계약서 발급신청버튼, 납부정보, 멤버십포인트 , 무상할인회차
            if( data.contractInfo.contDtlType === 'C00' ) {
                $('.contract-btn').hide();
                $('.sects.payment.viewer').hide();
                $('.member-point-info').hide();
                $('.tooltip-wrap').hide();
                $('.saleTurn').hide();
            } else {
                $('.contract-btn').show();
                $('.sects.payment.viewer').show();
                $('.member-point-info').show();
                $('.tooltip-wrap').show();
                $('.saleTurn').show();
            }

            // 렌탈케어 - 의무 사용기간 포맷 변경
            if(data.contractInfo.dutyPeriod && data.contractInfo.contractType === 'R') {
                $('.contract-info .dutyPeriod').show();
                var dutyPeriod = data.contractInfo.dutyPeriod.split(" ");
                    dutyPeriod.push(vcui.date.calcDate(dutyPeriod[1].replace(/\./g,'-'), '+'+(365*Number(dutyPeriod[0].replace('년','')))+'d', 'yyyy.MM.dd'));
                    data.contractInfo.dutyPeriod = dutyPeriod[0]+'('+dutyPeriod[1]+' ~ '+dutyPeriod[2]+')';
            }

            changeFieldValue('contract-info', data.contractInfo);
    
            info = {
                monthlyPrice: "<span>" + data.paymentInfo.monthlyPrice + "</span><a href='" + data.paymentInfo.paymentListUrl  + "' class='btn-link paymenyList-btn'>납부내역 조회</a>",
                withdrawDate: data.paymentInfo.withdrawDate
            }

            if (data.paymentInfo.paymentMethodCode == PAYMENT_METHOD_CODE) { // BTOCSITE-11586 납부방법이 모두 동일하게 '계좌이체'로 출력되는 현상
                paymentMode = "card";
    
                info.paymentMethod = "신용카드"
                info.methodName =  "<span>" + data.paymentInfo.cardInfo.cardComName + "</span><a href='" + data.paymentInfo.requestCardUrl  + "' class='btn-link requestCard-btn'>제휴카드 신청</a>";
                info.methodNumber = txtMasking.card(data.paymentInfo.cardInfo.cardNumber);
            } else {
                paymentMode = "bank";
    
                info.paymentMethod = "계좌이체";
                info.methodName =  "<span>" + data.paymentInfo.bankInfo.bankName + "</span><a href='" + data.paymentInfo.requestCardUrl  + "' class='btn-link requestCard-btn'>제휴카드 신청</a>";
                info.methodNumber = txtMasking.substr(data.paymentInfo.bankInfo.bankNumber, 4);
            }
            changeFieldValue('payment-info', info);
            if(data.paymentInfo.isGrouping || data.contractInfo.contStatus != "S"){
                $('.payment-info .requestCard-btn, .changePayment-btn').hide();
            } else{
                $('.payment-info .requestCard-btn, .changePayment-btn').show();
            }
            associCardType = data.paymentInfo.associCardType;
            associCardStatus = data.paymentInfo.associCardStatus; // 제휴카드신청현황 BTOCSITE-11663 마이페이지에서 제휴카드 신청 시 오류 발생

            var isAgreeText = "";
            var isAgree = data.memberPointInfo.isAgree;
            var deductype = data.memberPointInfo.deductType;
            var userpoint = data.memberPointInfo.userPoint;
            var deductpoint = data.memberPointInfo.deductPoint;
            var userpointComma = vcui.number.addComma(userpoint);
            var deductpointComma = vcui.number.addComma(deductpoint);
            if(isAgree){
                isAgreeText = "동의 ("+data.memberPointInfo.memPointPayLimit+")";
                if(deductype == "deduct"){
                    $('.mempoint-info input[value=deduct]').prop('checked', true);
                } else{
                    $('.mempoint-info input[value=all]').prop('checked', true);
                }
                $('.mempoint-info .agreeBox').show();
                $('.mempoint-info .noneAgreeBox').hide();
            } else{
                isAgreeText = "미동의";
                $('.mempoint-info .agreeBox').hide();
                $('.mempoint-info .noneAgreeBox').show();
            }
            $('.mempoint-info').find('.userPoint').text(userpointComma);
            $('.mempoint-info').find('.deductPoint').text(deductpointComma);
            $('.mempoint-info').find('.viewer').text(isAgreeText);
            $('.mempoint-info').data('isAgree', isAgree);
            $('.mempoint-info').data('deductType', deductype);
            $('.mempoint-info').data('userPoint', userpoint);
            $('.mempoint-info').data('deductPoint', deductpoint);
            cancelMempointModify();

            changeFieldValue('manager-info', data.managerInfo);
                  
            userInfo = {
                userName: data.userInfo.user.name,
                userPhone: data.userInfo.user.phoneNumber,
                userTelephone: data.userInfo.user.telephoneNumber,
                userEmail: data.userInfo.user.email,
                userAdress: data.userInfo.user.adress,
                actualUserName: data.userInfo.actualUser.name,
                actualUserPhone: data.userInfo.actualUser.phoneNumber,
                actualUserTelephone: data.userInfo.actualUser.telephoneNumber,
                rcvPostCode: data.userInfo.actualUser.rcvPostCode,
                rcvBasAddr: data.userInfo.actualUser.rcvBasAddr,
                rcvDtlAddr: data.userInfo.actualUser.rcvDtlAddr
            }
            userInfoValidation.setValues(userInfo);
    
            cardInfo = {
                paymentCard: data.paymentInfo.cardInfo.cardComValue,
                paymentCardNumber: data.paymentInfo.cardInfo.cardNumber,
                paymentCardPeriod: data.paymentInfo.cardInfo.cardPeriod
            }
            cardValidation.setValues(cardInfo);
    
            bankInfo = {
                paymentBank: data.paymentInfo.bankInfo.bankValue,
                paymentBankNumber: data.paymentInfo.bankInfo.bankNumber,
                paymentUserName: data.paymentInfo.bankInfo.bankUser
            }
            bankValidation.setValues(bankInfo);

            setPaymentModeCont();
           
        } else{
            mypage.find(".section-wrap").hide();

            mypage.find(".section-wrap").before('<div class="no-data"><p>보유하신 케어솔루션 계약 정보가 없습니다.</p></div>');
        }
    }


    /* BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성 */
    function setContractCare(data){
        mypage.find(".no-data").remove();

        var $lc_select = $('select[name=contractInfo]').find('option:selected').val();
        var $lc_cont = $('.lb-container');

        //console.log("setContractInfo_의 데이터 %o",data);
        //console.log("셀렉", $lc_select);
        //mypage.find(".section-wrap").hide();
        //console.log("sssss", mypage.find(".section-wrap"))


        if(data != undefined && data != "" && data != null && $lc_select != ""){
            var info;
    
            mypage.find(".section-wrap").show();
            mypage.find(".lb-common").show();
        

            //날짜 데이터
            var $contract_startDate = data.contStartDate;
            var $contract_endDate = data.contEndDate;

            //날짜 데이터 형태 변환
            var $st_date = $contract_startDate.replace(/\./g, '/');
            var $ed_date = $contract_endDate.replace(/\./g, '/');
            

            //날짜 출력
            var $lc_StartDate1 = new Date($st_date);
            var $lc_EndDate2 = new Date($ed_date);


            //가입 한 데이터
            var $lc_join = new Date($st_date);

            //케어십
            //년
            var $lc_careShip_Year = new Date($st_date);
            //개월
            var $lc_careShip_Month = new Date($st_date);


            //케어솔루션 
            //년
            var $lc_Year_1 = new Date($st_date);
            var $lc_Year_2 = new Date($st_date);
            var $lc_Year_3 = new Date($st_date);
            var $lc_Year_4 = new Date($st_date);
            var $lc_Year_5 = new Date($st_date);
            //개월
            var $lc_Month_1 = new Date($st_date);
            var $lc_Month_2 = new Date($st_date);
            var $lc_Month_3 = new Date($st_date);
            var $lc_Month_4 = new Date($st_date);
            var $lc_Month_5 = new Date($st_date);

            //console.log("----------------");

            //케어십
            //1년 후
            //var CareShip_YearLater = new Date($lc_careShip_Year.setFullYear($lc_careShip_Year.getFullYear() + 1));
            //2개월 차 말일 까지
            var CareShip_MonthLater = new Date($lc_careShip_Month.setFullYear($lc_careShip_Month.getFullYear() + 1, $lc_careShip_Month.getMonth() + 3, 0));


            //케어솔루션 
            //년 후
            var YearLater1 = new Date($lc_Year_1.setFullYear($lc_Year_1.getFullYear() + 1, $lc_Year_1.getMonth(), 1));
            var YearLater2 = new Date($lc_Year_2.setFullYear($lc_Year_2.getFullYear() + 2, $lc_Year_2.getMonth(), 1));
            var YearLater3 = new Date($lc_Year_3.setFullYear($lc_Year_3.getFullYear() + 3, $lc_Year_3.getMonth(), 1));
            var YearLater4 = new Date($lc_Year_4.setFullYear($lc_Year_4.getFullYear() + 4, $lc_Year_4.getMonth(), 1));
            var YearLater5 = new Date($lc_Year_5.setFullYear($lc_Year_5.getFullYear() + 5, $lc_Year_5.getMonth(), 1));
            //3개월 차 첫쨋날 까지
            var MonthLater1 = new Date($lc_Month_1.setFullYear($lc_Month_1.getFullYear() + 1, $lc_Month_1.getMonth() + 4, 1));
            var MonthLater2 = new Date($lc_Month_2.setFullYear($lc_Month_2.getFullYear() + 2, $lc_Month_2.getMonth() + 4, 1));
            var MonthLater3 = new Date($lc_Month_3.setFullYear($lc_Month_3.getFullYear() + 3, $lc_Month_3.getMonth() + 4, 1));
            var MonthLater4 = new Date($lc_Month_4.setFullYear($lc_Month_4.getFullYear() + 4, $lc_Month_4.getMonth() + 4, 1));
            var MonthLater5 = new Date($lc_Month_5.setFullYear($lc_Month_5.getFullYear() + 5, $lc_Month_5.getMonth() + 4, 1));
            
            console.log("가입:", $lc_join)
            //console.log("1년후", CareShip_YearLater);
            console.log("1년 2개월", CareShip_MonthLater);
            console.log("1년차 첫날", YearLater1);

            //케어십 조건
            if(data.contractType === 'C') {
                if(Date.now() >= (+$lc_join) && Date.now() <= (+CareShip_MonthLater)) {
                    console.log("------케어십 가입 14개월 이전!!!------")
                    //console.log("---가입시점부터 14개월 말일 까지 노출---")
                    return $lc_cont.html(vcui.template(lb_careShip, data));
                } else {
                    console.log("----케어십 14개월이 훨신 지난 조건----");
                    mypage.find(".lb-container").empty();
                }
            } else {
                console.log("------no------")
                mypage.find(".lb-container").empty();
            }

            //케어솔루션 조건
            if(data.contractType === 'R') {
                if(Date.now() >= (+YearLater1) && Date.now() <= (+YearLater2)) {
                    console.log("------1년차!!!------")
                    //console.log("mmm", MonthLater1);
                    if (Date.now() >= (+$lc_join) && Date.now() <= (+MonthLater1)) {
                        console.log("---1년차 - 3개월 까지만 노출---")
                        return $lc_cont.html(vcui.template(lb_careSolution_1, data));
                    }
                } else {
                    console.log("------1년차 조건에 해당하지 않음------")
                    mypage.find(".lb-container").empty();
                }

                if(Date.now() >= (+YearLater2) && Date.now() <= (+YearLater3)) {
                    console.log("------2년차!!!------")
                    if (Date.now() >= (+$lc_join) && Date.now() <= (+MonthLater2)) {
                        console.log("---2년차 - 3개월 까지만 노출---")
                        return $lc_cont.html(vcui.template(lb_careSolution_2, data));
                    }
                } else {
                    console.log("------2년차 조건에 해당하지 않음------")
                    mypage.find(".lb-container").empty();
                }

                if(Date.now() >= (+YearLater3) && Date.now() <= (+YearLater4)) {
                    console.log("------3년차!!!------")
                    if (Date.now() >= (+$lc_join) && Date.now() <= (+MonthLater3)) {
                        console.log("---3년차 - 3개월 까지만 노출---")
                        return $lc_cont.html(vcui.template(lb_careSolution_3, data));
                    }
                } else {
                    console.log("------3년차 조건에 해당하지 않음------")
                    mypage.find(".lb-container").empty();
                }

                if(Date.now() >= (+YearLater4) && Date.now() <= (+YearLater5)) {
                    console.log("------4년차!!!------")
                    if (Date.now() >= (+$lc_join) && Date.now() <= (+MonthLater4)) {
                        console.log("---4년차 - 3개월 까지만 노출---")
                        return $lc_cont.html(vcui.template(lb_careSolution_4, data));
                    }
                } else {
                    console.log("------4년차 조건에 해당하지 않음------")
                    mypage.find(".lb-container").empty();
                }

                if(Date.now() >= (+YearLater5)) {
                    console.log("------5년차!!!------")
                    if (Date.now() >= (+$lc_join) && Date.now() <= (+MonthLater5)) {
                        console.log("---5년차 - 3개월 까지만 노출---")
                        return $lc_cont.html(vcui.template(lb_careSolution_5, data));
                    }
                } else {
                    mypage.find(".lb-container").empty();
                    console.log("------5년차 조건에 해당하지 않음------")
                }
            }
           
            //setPaymentModeCont();

        } else{
            mypage.find(".section-wrap").hide();
            mypage.find(".lb-container").empty();
            //mypage.find(".lb-common").hide();

            mypage.find(".section-wrap").before('<div class="no-data"><p>보유하신 케어솔루션 계약 정보가 없습니다.</p></div>');
        }
    }
    /* //BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성 */

    function setPaymentModeCont(){
        $('.mypage .section-wrap .sects.payment.modify input[data-visible-target]').prop("checked", false);
        $('.mypage .section-wrap .sects.payment.modify input[data-visible-target=".by-' + paymentMode + '"]').prop("checked", true);

        $('.mypage .section-wrap .sects.payment.modify').find('.tab-panel').hide();
        $('.mypage .section-wrap .sects.payment.modify').find('.tab-panel.by-' + paymentMode).show();
    }

    function getMaskingData(data){
        var newdata = {};
        for(var key in data){
            if(key == "name") newdata[key] = data[key];
            else if(key == "email") newdata[key] = data[key];
            else if(key == "adress") newdata[key] = data[key], 20;
            else newdata[key] = data[key];
        }

        return newdata;
    }

    function changeContractInfo(){
        lgkorUI.showLoading();

        var info = $('select[name=contractInfo]').find('option:selected').val();

        saveUserInfoCancel();

        paymentInfoBlock.show();
        paymentModifyBlock.hide();

        var sendata = {
            contractInfo: info
        }
        
        lgkorUI.requestAjaxData(CONTRACT_INFO, sendata, function(result){

            // console.log("result_1111111 %o",result);
            // console.log("test", lb_careShip);
            // console.log("changeContractInfo의 select", sendata);

            setContractInfo(result.data);       

            lgkorUI.hideLoading();

            if(requestPartnerCardYn == "Y"){
                requestPartnerCardYn = "";

                var viewertop = $('.sects.payment.viewer').offset().top;
                $('html, body').animate({scrollTop:viewertop}, 200, function(){
                    setTimeout(function(){
                        setRequestCard();
                    }, 100);
                });
            } else {
                // BTOCSITE-2838 : 고객혜택에서 왔을때  매니저 정보로 이동 s
                var managerInfoLink= 'managerInfoLink';
                    if (lgkorUI.getStorage('managerInfoLink') == true){ 
                        if ($('.section-inner').hasClass('manager-info') == true) {
                            var managerInfoPosition = document.querySelector('.manager-info').offsetTop;
                            $('html, body').animate({scrollTop:managerInfoPosition - 70}, 0);
                        }       
                        lgkorUI.removeStorage(managerInfoLink);
                    } else {
                        lgkorUI.removeStorage(managerInfoLink);
                        $('html, body').animate({scrollTop:0}, 220);
                    }
                // BTOCSITE-2838 :고객혜택에서 왔을때  매니저 정보로 이동 e
            }
        }, ajaxMethod);

        /* BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성 */
        lgkorUI.requestAjaxData(CONTRACT_CARE, sendata, function(result){

            // console.log("result_1111111 %o",result);
            // console.log("test", lb_careShip);
            // console.log("changeContractInfo의 select", sendata);

            setContractCare(result.data);

            lgkorUI.hideLoading();

            //BTOCSITE-3407 삭제
            // if(requestPartnerCardYn == "Y"){
            //     requestPartnerCardYn = "";

            //     var viewertop = $('.sects.payment.viewer').offset().top;
            //     $('html, body').animate({scrollTop:viewertop}, 200, function(){
            //         setTimeout(function(){
            //             setRequestCard();
            //         }, 100);
            //     });
            // } else {
            //     // BTOCSITE-2838 : 고객혜택에서 왔을때  매니저 정보로 이동 s
            //     var managerInfoLink= 'managerInfoLink';
            //         if (lgkorUI.getStorage('managerInfoLink') == true){ 
            //             if ($('.section-inner').hasClass('manager-info') == true) {
            //                 var managerInfoPosition = document.querySelector('.manager-info').offsetTop;
            //                 $('html, body').animate({scrollTop:managerInfoPosition - 70}, 0);
            //             }       
            //             lgkorUI.removeStorage(managerInfoLink);
            //         } else {
            //             lgkorUI.removeStorage(managerInfoLink);
            //             $('html, body').animate({scrollTop:0}, 220);
            //         }
            //     // BTOCSITE-2838 :고객혜택에서 왔을때  매니저 정보로 이동 e
            // }
        }, ajaxMethod);
        /* //BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성 */
    }

    function setHiddenData(iptname, value){
        var ipt = $('.hidden-input-group').find('input[name=' + iptname + ']');
        ipt.val(value);
    }
    function getHiddenData(iptname){
        var ipt = $('.hidden-input-group').find('input[name=' + iptname + ']');
        return ipt.val();
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });

    /* BTOCSITE-5138 210906 마이페이지>렌탈/케어>고객 실사용자 주소 변경 기능 추가 */
    $(function () {

        /* BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성 - 링크 경로로 해당 스크립트 돌도록 삭제 */
        var cl_benefisLocation = $(location).attr('href');

        //오류가 있다면 indexOf URL 경로를 확인 해야함
        if (cl_benefisLocation.indexOf('benefits') == -1) {
            var addressFinder = new AddressFind();

            $('#addrBtn').on('click', function(e){
                addressFinder.open(function(data){
                    $('input[name=rcvPostCode]').val(data.zonecode);
                    $('input[name=rcvBasAddr]').val(data.roadAddress);
                    
                    // 상세정보로 포커스 이동
                    $('input[name=rcvDtlAddr]').focus();
                    $('input[name=rcvDtlAddr]').val('');
                });
            });
        } 

        //분기 태움
        // var addressFinder = new AddressFind();

        // $('#addrBtn').on('click', function(e){
        //     addressFinder.open(function(data){
        //         $('input[name=rcvPostCode]').val(data.zonecode);
        //         $('input[name=rcvBasAddr]').val(data.roadAddress);
                
        //         // 상세정보로 포커스 이동
        //         $('input[name=rcvDtlAddr]').focus();
        //         $('input[name=rcvDtlAddr]').val('');
        //     });
        // });
    });
    /* //BTOCSITE-5138 210906 마이페이지>렌탈/케어>고객 실사용자 주소 변경 기능 추가 */

    /* //BTOCSITE-3407 케어솔루션 레터 및 연차별 혜택 메뉴(페이지)생성 - 링크 경로로 해당 스크립트 돌도록 삭제 */
})();
