var LGEAPPHostName = window.location.hostname;
var LGEAPPsetArBarcode, LGEAPPreturnArBarcode, LGEcomfirmAPPInstall;

/*
IOS:        /ipod|iphone|ipad/.test(navigator.userAgent.toLowerCase()),
IPHONE:     /iphone/.test(navigator.userAgent.toLowerCase()),
IPAD:       /ipad/.test(navigator.userAgent.toLowerCase()),
ANDROID:    /android/.test(navigator.userAgent.toLowerCase()),
WINDOWS:    /windows/.test(navigator.userAgent.toLowerCase()),
MOBILE:     /mobile/.test(ua)
*/

$(document).ready(function() {
    if (LGEAPPHostName != "cmsdev50.lge.co.kr" && LGEAPPHostName != "cms50.lge.co.kr") {
        if (isApp()) {
            //헤더 앱 설정 버튼
            $('.mapExclusive').addClass('active');
            $('.mapExclusiveDss').hide();
            $(".app-settings-button").on({
                click : function() {
                    document.location.href="/mobile-app/option";
                }
            });
            //Quick메뉴, Easy-path 삭제
            $('.KRP0005,.KRP0032,.quick-menu-list,.easy-path').remove();

            if($(".main-wrap").length > 0){
                //Quick메뉴 AR 버튼 추가
                $(".KRP0004").before('<div class="floating-menu cs-cst btn-app-ar"><div class="app-ar"><a href="javascript:void(0);"><span>AR</span></a></div></div>');
                //$("#quickMenu").prepend('<div class="floating-menu cs-cst btn-app-ar"><div class="app-ar"><a href="javascript:void(0);"><span>AR</span></a></div></div>');
                //Quick메뉴 AR 버튼 이벤트
                $(".btn-app-ar a").off("click").on({
                    click : function() {
                        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                            var obj = new Object();
                            obj.command = "showAR";
                            var jsonString= JSON.stringify(obj);
                            webkit.messageHandlers.callbackHandler.postMessage(jsonString);
                        } else {
                            void android.openAR(null);
                        }
                    }
                });
            }
        }

        LGEAPPsetArBarcode = function() {
            if (window.breakpoint.isMobile) {
                //제조번호 카메라 버튼 노출
                $('#appType').addClass("app-type");
                //제조번호 카메라 버튼 이벤트
                $(".app-exec").off("click").on({
                    click : function() {
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

                            obj = $.extend(obj, {title:'', cancelBtnName:'취소', okBtnName:'설치', ok: LGEcomfirmAPPInstall});
                            var desc = '바코드로 편리하게 제품등록<br>하기위해 APP을 설치하시겠습니까?';

                            lgkorUI.confirm(desc, obj);
                        }
                    }
                });
            } else {
                //제조번호 카메라 버튼 비노출
                $('#appType').removeClass("app-type");
            }
        }

        //리턴 된 바코드 값 입력
        LGEAPPreturnArBarcode = function(barcode) {
            if (barcode != null && barcode != "" && barcode != undefined) {
                $("#inp02").val(barcode);
            }
        }

        //iOS, Android 앱 설치 여부 확인
        LGEcomfirmAPPInstall = function() {
            var agent = navigator.userAgent;

            /*
            if (agent.indexOf("Android") != -1) {
                location.href = "intent://mybenefit/main?cate1=001&caller=mobileweb&acctid=#Intent;scheme=hyundaicardappcard;package=com.hyundaicard.appcard;end";
                setTimeout(function() {
                    //location.href = "https://play.google.com/store/apps/details?id=com.hyundaicard.appcard";
                    window.open("https://play.google.com/store/apps/details?id=com.hyundaicard.appcard", "_blank");
                }, 500);
            } else if (agent.indexOf("iPhone") != -1) {
                setTimeout(function() {
                    if (!document.webkitHidden) {
                        //location.href = "http://itunes.apple.com/kr/app/id702653088?mt=8";
                        window.open("http://itunes.apple.com/kr/app/id702653088?mt=8", "_blank");
                    }
                }, 25);
                location.href = "hyundaicardappcard://mybenefit/main?cate1=001&caller=mobileweb";
            }
            */
        }

        LGEAPPsetArBarcode();
        $(window).on({
            resize : function() {
                LGEAPPsetArBarcode();
            }
        });
    }
});