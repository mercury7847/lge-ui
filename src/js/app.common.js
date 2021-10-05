var LGEAPPHostName = window.location.hostname;
var LGEAPPsetArBarcode, LGEAPPreturnArBarcode, LGEcomfirmAPPInstall, LGEquickMenuPosCover, LGEquickMenuPosPush, LGEAPPcomfirmAPPOpen, LGEAPPalarmCount, LGEAPPsetQrCode; // LGEAPPsetQrCode 추가 BTOCSITE-4086
var LGEAPPclickCNT = 0;

/*
IOS:        /ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase()),
IPHONE:     /iphone/.test(navigator.userAgent.toLowerCase()),
IPAD:       /ipad/.test(navigator.userAgent.toLowerCase()),
ANDROID:    /android/.test(navigator.userAgent.toLowerCase()),
WINDOWS:    /windows/.test(navigator.userAgent.toLowerCase()),
MOBILE:     /mobile/.test(ua)
*/
var appInit = function() {
    var agent = navigator.userAgent;
    //console.log('앱 스크립트 시작');
    if (LGEAPPHostName != "cmsdev50.lge.co.kr" && LGEAPPHostName != "cms50.lge.co.kr") {
        if (isApp()) {
            if ($("#floatBox .btn-app-ar").length > 0){
                return;
            }
            //console.log('앱 확인');
            //헤더 앱 설정 버튼
            $('.mapExclusive').addClass('active');
            $('.mapExclusiveDss').hide();
            $('.app-alarm-button').css('right','30px'); // 210621 앱 알림함 아이콘 추가 원복처리 
            $(".app-settings-button").on({
                click : function() {
                    document.location.href="/mobile-app/option";
                }
            });
            //Quick메뉴, Easy-path 삭제
            $('#floatBox .KRP0005,#floatBox .KRP0032,#floatBox .quick-menu-list,#floatBox .easy-path').remove();

            //앱 개인정보 수정 링크 변경
            $(".mod-link").each(function(){ 
               this.href = this.href.replace("changeInfo.do", "changeInfo_app.do");
            });

            if($(".main-wrap").length > 0){
                //console.log('AR 버튼 추가');
                //Quick메뉴 AR 버튼 추가
                $("#floatBox .KRP0004").before('<div class="floating-menu cs-cst btn-app-ar"><div class="app-ar"><button href="javascript:void(0);"><span>AR</span><span class="app-ar-txt"><i></i>제품을 가상으로 배치해보세요</span></button></div></div>');

                //Quick메뉴 AR 버튼 이벤트
                $("#floatBox .btn-app-ar a, #floatBox .btn-app-ar button").off("click").on({
                    click : function() {
                        $(this).addClass("active");

                        if(LGEAPPclickCNT > 0){
                            if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                                var obj = new Object();
                                obj.command = "showAR";
                                var jsonString= JSON.stringify(obj);
                                webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                            } else {
                                void android.openAR(null);
                            }
                        }
                        LGEAPPclickCNT++;
                    },
                    focusin : function(){
                        setTimeout(function(){
                            $("#floatBox .btn-app-ar a, #floatBox .btn-app-ar button").addClass("active");
                            LGEAPPclickCNT = 1;
                        }, 150);
                    },
                    focusout : function(){
                        $("#floatBox .btn-app-ar a, #floatBox .btn-app-ar button").removeClass("active");
                        LGEAPPclickCNT = 0;
                    }
                });

                //스크롤 시 AR 버튼 default 상태로 변경
                /*
                $("body").scroll(function(){
                    if ($(this).scrollTop() > 100) {
                        $("#floatBox .btn-app-ar a, #floatBox .btn-app-ar button").removeClass("active");
                        LGEAPPclickCNT = 0;
                    }
                });
                $(".section-cover").scroll(function(){
                    if ($(this).scrollTop() > 100) {
                        $("#floatBox .btn-app-ar a, #floatBox .btn-app-ar button").removeClass("active");
                        LGEAPPclickCNT = 0;
                    }
                });
                */
            }

            if($(".main-wrap").length > 0 || $(".signature-main").length > 0 || $(".thinq-main").length > 0) {
                if(agent.indexOf("LGEAPP-in") != -1) {
                    //노치 있음
                    $("#floatBox .floating-wrap").addClass("app-LGEAPP-in");
                }else if(agent.indexOf("LGEAPP-io") != -1) {
                    //노치 없음
                    $("#floatBox .floating-wrap").addClass("app-LGEAPP-io");
                }else if(agent.indexOf("LGEAPP") != -1) {
                    //안드로이드
                    $("#floatBox .floating-wrap").addClass("app-LGEAPP");
                }

                /*
                덮는 경우 : app-chng-pos
                미는 경우 : app-chng-push-pos
                */
                //하단 탭바 덮는 경우
                LGEquickMenuPosCover = function(bool){
                    if(bool == "Y"){
                        $('#floatBox .floating-wrap').removeClass('app-chng-push-pos').addClass('app-chng-pos');
                    }else{
                        $('#floatBox .floating-wrap').removeClass('app-chng-push-pos').removeClass('app-chng-pos');
                    }
                }
                //하단 탭바 미는 경우
                LGEquickMenuPosPush = function(bool){
                    $('#floatBox .floating-wrap').removeClass('app-chng-pos').addClass('app-chng-push-pos');
                }
            }            

            //알림함 Count 표시
            /* 210621 알람아이콘 롤백처리 -> 추후 오픈 예정 */
            if (/iPhone|iPad|iPod/i.test(agent)) {
                var obj = new Object();
                obj.command = "getUncheckedPushCount";
                obj.callback ="LGEAPPalarmCount";
                var jsonString= JSON.stringify(obj);
                webkit.messageHandlers.callbackHandler.postMessage(jsonString);
            }else if(/Android/i.test(agent)) {
                android.getUncheckedPushCount("LGEAPPalarmCount");
            }else{
                //console.log("Count Update");
            }

            //알림함 버튼 이벤트  
            $(".app-alarm-button").on({
                click : function(){
                    if (/iPhone|iPad|iPod/i.test(agent)) {
                        var obj = new Object();
                        obj.command = "openPushBox";
                        var jsonString= JSON.stringify(obj);
                        webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                    }else if(/Android/i.test(agent)) {
                        android.openPushBox();
                    }else{
                        //console.log("not iPhone/Android");
                    }
                }
            });
        }

        //BTOCSITE-4086 210928 - S
        //제품등록 페이지 탭
        LGEAPPsetArBarcode = function() {
            //직접입력 이벤트
            $(".app-direct").off("click").on({
                click : function() {
                    $(this).addClass("on").siblings("button").removeClass("on");
                    $(this).closest(".appType-tab").next(".box").find("input").focus();
                }
            });

            //제조번호 카메라 버튼 이벤트
            $(".app-exec").off("click").on({
                click : function() {
                    $(this).addClass("on").siblings("button").removeClass("on");
                    if (isApp()) {
                        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            var obj = new Object();
                            obj.command = "scanBarcode";
                            obj.callback ="LGEAPPreturnArBarcode";
                            var jsonString= JSON.stringify(obj);
                            webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                        } else {
                            void android.openBarcodeScanner("LGEAPPreturnArBarcode");
                        }
                    } else {
                        var obj = {title:'', typeClass:'', cancelBtnName:'', okBtnName:'', ok : function (){}};

                        obj = $.extend(obj, {title:'', cancelBtnName:'취소', okBtnName:'확인', ok: LGEcomfirmAPPInstall});
                        //var desc = '바코드로 편리하게 제품등록<br>하기위해 APP을 설치하시겠습니까?';
                        var desc = '바코드로 편리하게 제품등록<br>하기위해 APP을 실행하시겠습니까?';

                        lgkorUI.confirm(desc, obj);
                    }
                }
            });
        }

        LGEAPPsetQrCode = function() {
            //QR 스캔 버튼 이벤트
            $(".btn-qrscan").off("click").on({
                click : function() {
                    // BTOCSITE-4086 210928 QR 스캔 클릭시 이벤트 제어 속성 추가 - s
                    $('.btn-direct').removeClass('active');
                    $('.app-exec').removeClass('active');
                    $(this).addClass('active');
                    $('#inp01').attr('readonly','readonly');
                    $('#inp02').attr('readonly','readonly');
                    $('.cell button').attr('disabled', true);
                    $('.info-req-box .qr-active').hide();
                    $('.info-req-box .qr').show();
                    $('p.comp').hide();
                    // BTOCSITE-4086 210928 QR 스캔 클릭시 이벤트 제어 속성 추가 - e
                    //$(this).addClass("on").siblings("button").removeClass("on");
                    if (isApp()) {
                        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            var obj = new Object();
                            obj.command = "scanBarcode";
                            obj.callback ="LGEAPPreturnArBarcode";
                            var jsonString= JSON.stringify(obj);
                            webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                        } else {
                            void android.openBarcodeScanner("LGEAPPreturnArBarcode");
                        }
                    } else {
                        var obj = {title:'', typeClass:'', cancelBtnName:'', okBtnName:'', ok : function (){}};

                        obj = $.extend(obj, {title:'', cancelBtnName:'취소', okBtnName:'확인', ok: LGEcomfirmAPPInstall});
                        //var desc = '바코드로 편리하게 제품등록<br>하기위해 APP을 설치하시겠습니까?';
                        var desc = 'LGE.COM APP을 통해 이용 가능합니다.<br>APP을 실행하시겠습니까?';

                        lgkorUI.confirm(desc, obj);
                    }
                }
            });
        }

        //리턴 된 바코드 값 입력
        LGEAPPreturnArBarcode = function(barcode) {
            // BTOCSITE-4086 210924 - S
            //console.log("바코드 리턴값 : " + barcode);
            if (barcode != null && barcode != "" && barcode != undefined) {
                $('.info-req-box .qr').hide();
                $('.info-req-box .qr-active').show();
                var urlChk = isURL(barcode); //QR형식 URL로 들어오는지 값 체크!해서 QR코드,바코드 구분
                if(urlChk){
                    // QR코드
                    var param = getParams(barcode);
                    var salesModel = param.m;
                    //salesModel = salesModel.replace('.AKOR',''); BTOCSITE-4086 파라미터값 자르는 부분 제거 (barcode 값으로 전달된 url의 salesModel값 그대로 화면 노출되어도 이상 없음 - db 테이블에서 따로 체크함 )
                    var serialNum =  param.s;
                    //console.log("salesModel 값 : "+salesModel);
                    //console.log("S/N 값 : "+serialNum);
                    
                    // 각 객체값별로 쪼개진 내용을 입력 form에 넣음! id로 체킹하기! 모델명, 제조번호(S/N)
                    $("#inp01").val(salesModel); // salesModel명
                    $("#inp02").val(serialNum); // 제조번호(S/N)
                }else{
                    // 바코드
                    $("#inp02").val(barcode); 
                }
                $('.cell button').attr('disabled', false); // 확인 버튼 활성화
                //$('.btn-prod-reg').attr('disabled', false); // 바코드,QR 리턴값 자동 입력 데이터 있을 경우, 등록 버튼 활성화 (disabled 해제)
                // BTOCSITE-4086 210924 - E
            }
        }

        // URL 형식 체크[정규식] - BTOCSITE-4086 210923 QR용
        function isURL(barcode) {
            var expUrl = /^http[s]?\:\/\//i;
            return expUrl.test(barcode);
        }

        // 파라미터 자르기 - BTOCSITE-4086 210923 QR용
        function getParams(barcode) {
            // 파라미터가 담길 배열
            var param = new Array();
        
            // 현재 페이지의 url
            var url = decodeURIComponent(barcode);
            // url이 encodeURIComponent 로 인코딩 되었을때는 다시 디코딩 해준다.
            url = decodeURIComponent(url);
        
            var params;
            // url에서 '?' 문자 이후의 파라미터 문자열까지 자르기
            params = url.substring( url.indexOf('?')+1, url.length );
            // 파라미터 구분자("&") 로 분리
            params = params.split("&");
        
            // params 배열을 다시 "=" 구분자로 분리하여 param 배열에 key = value 로 담는다.
            var size = params.length;
            var key, value;
            for(var i=0 ; i < size ; i++) {
                key = params[i].split("=")[0];
                value = params[i].split("=")[1];
        
                param[key] = value;
            }
        
            return param;
        }
        //BTOCSITE-4086 210928 - E
        
        //iOS, Android 앱 설치 여부 확인
        LGEcomfirmAPPInstall = function() {
            var agent = navigator.userAgent;

            if (agent.indexOf("Android") != -1) {
                location.href = "Intent://goto#Intent;scheme=lgeapp;package=kr.co.lge.android;end";
                setTimeout(function() {
                    //location.href = "https://play.google.com/store/apps/details?id=kr.co.lge.android";
                    window.open("https://play.google.com/store/apps/details?id=kr.co.lge.android", "_blank");
                }, 500);
            } else if (/iPhone|iPad|iPod/i.test(agent)) {
                setTimeout(function() {
                    if (!document.webkitHidden) {
                        location.href = "https://itunes.apple.com/app/id1561079401?mt=8";
                    }
                }, 25);
                location.href = "lgeapp://";
            }
        }

        //알림함 Count 표시
        // 210701 알람체크 N뱃지 아이콘
        LGEAPPalarmCount = function(cnt){
            // 숫자 아닌경우 타입 예외 처리 2021-07-14
            var count = cnt || 0;

            if(typeof cnt !== 'number') {
                count = /^\d+$/.test(cnt) ? Number(cnt) : 0;
            }
            
            var $target = $(".app-alarm-button .app-alarm-count");

            if($target.length > 0){
                $target.removeClass("active");
                
                if(count > 0){
                    $target.addClass("active");
                }

                $target.html(count > 99 ? '99+' : count);
            }

            // 210701 알람체크 N뱃지 아이콘
            var $mobNavBtn = $(".mobile-nav-button");
            if(count > 0 && !$mobNavBtn.find('.count').length) $mobNavBtn.append("<span class='count'><span class='blind'>알림메시지 카운트 존재시</span>N<span>");
            else  $mobNavBtn.find('.count').remove();
        }

        LGEAPPsetArBarcode();
        LGEAPPsetQrCode();
        $(window).on({
            resize : function() {
                LGEAPPsetArBarcode();
                LGEAPPsetQrCode();
            }
        });
    }
};


function ChatbotAppClose(type) {
    // 앱에서 호출될경우
    if(isApp()) {
        if(vcui.detect.isIOS){ 
           var jsonString = JSON.stringify({'command':'closeInAppBrowser'});
           webkit.messageHandlers.callbackHandler.postMessage(jsonString);
        }else{
            android.closeNewWebview(); 
        }
    } else {
        if(type == 'native') {
            history.back();
        } else {
            //웹에서 호출될경우
            historyBack();
        }
    }
}
// 스와이프 적용일때 분기 처리
$(document).ready(function(){
    var isSwipe = !!$('#sw_con').length;
    if ( isSwipe && isApp() ){
        $(document).one('appInit', appInit);
    } else {
        appInit();
    }
});