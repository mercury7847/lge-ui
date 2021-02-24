//var AppUserAgent = navigator.userAgent || navigator.vendor || window.opera;
var oldStartValue = "";
var oldEndValue = "";
var appDate = new Date();
var appFullYear = appDate.getFullYear();
var appMonth = (appDate.getMonth() + 1) < 10 ? "0" + (appDate.getMonth() + 1) : (appDate.getMonth() + 1);
var appDay = appDate.getDate() < 10 ? "0" + appDate.getDate() : appDate.getDate();
var appToday = appMonth + "/" + appDay + "/" + appFullYear + " ";
var events = false;

var beforeFocusEle = "";
var beforeFocusEleToast = "";
var optModal = {
    open: function(id, role, txt, confirm, cancel){
        var valId = id;
        if(id == null || id == "" || id == undefined){
            varId = "lyr-modal";
        }
        var valRole = role;
        if(role == null || role == "" || role == undefined){
            valRole = "alertdialog";
        }
        var valConfirm = confirm;
        if(confirm == null || confirm == "" || confirm == undefined){
            valConfirm = "확인";
        }
        var html = '<div class="lyr-modal" id="'+valId+'">';
            html += '   <div class="lyr-modal-dt">';
            html += '        <div class="lyr-modal-dc">';
            html += '            <div class="lyr-modal-inner" role="'+valRole+'" aria-modal="true" tabindex="0" aria-describedby="modal-cont" aria-labelledby="modal-cont">';
            html += '                <div id="modal-cont">';
            html +=                     txt;
            html += '                </div>';
            html += '                <div class="btn-box">';
                if(cancel != null && cancel != "" && cancel != undefined){
                    html += '                    <button type="button" class="btn-modal-cancel"><span>'+cancel+'</span></button>';
                    html += '                    <button type="button" class="btn-modal-confirm"><span>'+valConfirm+'</span></button>';
                }else{
                    html += '                    <button type="button" class="btn-modal-confirm"><span>'+valConfirm+'</span></button>';
                }
            html += '                </div>';
            html += '            </div>';
            html += '        </div>';
            html += '    </div>';
            html += '</div>';

        $body = $("body");
        $body.append(html);
        $("#"+id).fadeIn(200, function(){
            //접근성
            $(this).find(".lyr-modal-inner").attr("tabindex", 0);
            $(this).find(".lyr-modal-inner").attr("tabindex", 0).focus();
            $(".lyr-opt-panel").attr("aria-hidden", true);
        });
        modalControl();
    },
    close: function(){
        $(document).find(".lyr-modal").fadeOut(200, function(){
            //접근성
            $(".lyr-opt-panel").attr("aria-hidden", false);
            $(beforeFocusEle).focus();
            beforeFocusEle = "";
            $(this).remove();
        });
    }
}
var appCnt = 15;
var toastMessage = {
    init: function(txt, type, timesetIdx){
        if(!type){
            type = "";
        }
        if(!timesetIdx){
            timesetIdx = 0;
        }
        var id = "toast"+appCnt;
        var $type = type;
        var $timesetIdx = timesetIdx;
        var $body = $("body");

        var html = '<div class="toast-message-app" role="alertdialog" aria-modal="true" id="'+id+'" aria-describedby="toast-message-cont" aria-labelledby="toast-message-cont" tabindex="0">';
            html += '    <div>';
            html += '        <div class="txt-message ' + $type + '" id="toast-message-cont">' + txt + '</div>';
            html += '        <button type="button" class="btn-toast-close"><span>닫기</span></button>';
            html += '    </div>';
            html += '</div>';

        /*
        var html = '<div class="toast-message" role="alertdialog" aria-modal="true" id="'+id+'" aria-describedby="toast-message-cont" aria-labelledby="toast-message-cont" tabindex="0">';
            html += '    <div class="toast-message-box">';
            html += '        <div class="inner">';
            html += '            <p class="toast-text" id="toast-message-cont">' + txt + '</p>';
            html += '            <a href="#" role="button" class="btn-area"><span class="blind">확인</span></a>';
            html += '        </div>';
            html += '    </div>';
            html += '</div>';
        */

        $body.append(html);
        this.open("#"+id, $timesetIdx);
    },
    open: function(id, timesetIdx){
        appCnt++;
        var $id = $(id);

        $("html").css("overflow-y","hidden");
        $id.css({
            "z-index" : (appCnt + 500),
            "display" : "block"
        }).stop().animate({'bottom':'50px'}, 200, function(){
            $(this).attr("tabindex", 0).focus();
        });
        setTimeout(function(){
            toastMessage.close($id, timesetIdx);
        }, 5000);
        $id.find(".btn-toast-close").on({
            click : function(){
                toastMessage.close($id, timesetIdx);
            }
        });
    },
    close: function(id, timesetIdx){
        var $id = $(id);
        $id.css("z-index", appCnt).stop().animate({'bottom':'-60px'}, 200, function(){
            $("html").css("overflow-y","scroll");
            $(beforeFocusEleToast).focus();
            //if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                if(timesetIdx != null && timesetIdx != "" && timesetIdx != undefined){
                    if(events){
                        $(".time-setting .inner div").eq(timesetIdx).find("label:not([class*=rst-time])").attr("tabindex", 0).focus().trigger("click");
                    }
                }
            //}
            $(this).remove();
        });
    }
}

var modalControl = function(){
    //Modal Close
    $(".lyr-modal .btn-modal-cancel").on({
        click : function(){
            var $id = $(this).closest(".lyr-modal").attr("id");

            switch($id){
                case "modalShopInfo" :

                break;
                default:

                break;
            }
            optModal.close();
        }
    });
    $(".lyr-modal .btn-modal-confirm").on({
        click : function(){
            var $id = $(this).closest(".lyr-modal").attr("id");

            switch($id){
                case "modalLocationInfo1" :
                    $("#locInfo").prop("checked", true).trigger("change");
                break;
                case "modalLocationInfo2" :
                    $("#locInfo").prop("checked", false).trigger("change");
                break;
                case "modalPushAlarm" :
                    $("#pushAlarm").prop("checked", false).trigger("change");
                    if($("#badgeAlarm").prop("checked")){
                        $("#badgeAlarm").trigger("click");
                    }
                    $("#badgeAlarm").attr("disabled", true).closest(".opt-switch").parent().addClass("disabled");

                    //접근성
                    $("#pushAlarm").attr("aria-expanded", false);
                break;
                case "modalAlarmAgree" :
                    $("#pushAlarm").prop("checked", true).trigger("change");
                    $("#badgeAlarm").attr("disabled", false).closest(".opt-switch").parent().removeClass("disabled");
                break;
                case "modalShopInfo" :

                break;
                default:
                break;
            }
            optModal.close();
        }
    });
}

$(document).ready(function(){
    //로그아웃
    $("#btn-opt-logout").off("click").on({
        click : function(){
            beforeFocusEle = "#btn-opt-logout";
            optModal.open("modalLogin", "alertdialog", "<p>로그아웃 하시겠습니까?</p>", "확인", "취소");
        }
    });
    //위치정보 이용동의
    $("#locInfo").off("click").on({
        click : function(){
            beforeFocusEle = "#locInfo";
            var checked = $(this).prop("checked");
            if(checked){
                optModal.open("modalLocationInfo1", "alertdialog", "<p>사용자 위치정보를 수집하는데 <br>동의하시겠습니까?</p>", "확인", "취소");
            }else{
                optModal.open("modalLocationInfo2", "alertdialog", "<p>위치정보 수집에 대한 <br>동의를 철회하시겠습니까?</p>", "확인", "취소");
            }
            return false;
        }
    });
    //푸시 알림 받기
    $("#pushAlarm").off("click").on({
        click : function(){
            beforeFocusEle = "#pushAlarm";
            var checked = $(this).prop("checked");
            if(checked){
                optModal.open("modalAlarmAgree", "alert", "<p>알림 수신을 동의하셨습니다.</p>", "확인");
                //접근성
                $(this).attr("aria-expanded", true);
            }else{
                optModal.open("modalPushAlarm", "alertdialog", "<p>푸시 알림을 해제하시는 경우 <br><strong>서비스 이벤트 혜택 알림을</strong> <br>받을 수 없게 됩니다.<br>알림을 해제 하시겠습니까?</p>", "확인", "취소");
                return false;
            }
        }
    });

    //마케팅 푸시 알림 받기
    $("#mktPushAlarmChk").off("click").on({
        click : function(){
            var checked = $(this).prop("checked");
            beforeFocusEleToast = "#mktPushAlarmChk";
            var hours = appDate.getHours();
            var txtDate = appFullYear + "년" + appMonth + "월" + appDay + "일 " + hours + "시 ";
            if(checked){
                toastMessage.init(txtDate + "<br>알림 허용 처리가 완료되었습니다.", "type2");
            }else{
                toastMessage.init(txtDate + "<br>알림 거부 처리가 완료되었습니다.", "type2");
            }
        }
    });

    //옵션창 열기
    $("#btn-opt-open").off("click").on({
        click : function(){
            $(".lyr-opt-panel, .main-panel").stop().attr("aria-hidden", false).animate({"left":"0"}, 250, function(){
                //접근성
                $(".main-panel").attr("aria-hidden", false);
                $(".main-panel").attr("tabindex", 0).focus();
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                }else{
                    $(".main-panel").find("h1").focus();
                }
            });
        }
    });
    //옵션창 닫기
    $(".btn-opt-close").off("click").on({
        click : function(){
            $(".lyr-opt-panel, .main-panel").stop().attr("aria-hidden", true).animate({"left":"100%"}, 250, function(){
                //접근성
                $(".main-panel").attr("aria-hidden", true).removeAttr("tabindex");
                $("#btn-opt-open").focus();
            });
        }
    });
    //알림설정, 오픈소스 라이센스 창 열기
    $(".btn-ctrl-panel").off("click").on({
        click : function(e){
            var data = $(this).data("panel");
            $(".main-panel").stop().animate({"left":"-100%"}, 250);
            $(data).stop().attr("aria-hidden", false).animate({"left":"0"}, 250, function(){
                //접근성
                $(this).attr("aria-hidden", false);
                $(this).attr("tabindex", 0).focus();
                $(this).siblings("div").attr("aria-hidden", true).removeAttr("tabindex");
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                }else{
                    $(this).find("h1").focus();
                }
            });
        }
    });
    //알림설정, 오픈소스 라이센스 창 닫기
    $(".sub-panel .btn-opt-prev").off("click").on({
        click : function(){
            var data = $(this).data("panel");
            $(".main-panel").stop().attr("aria-hidden", false).animate({"left":"0"}, 250, function(){
                //접근성
                $(this).attr("aria-hidden", false);
                $(this).attr("tabindex", 0).focus();
                $(this).siblings("div").attr("aria-hidden", true).removeAttr("tabindex");
                if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                }else{
                    $(this).find("h1").focus();
                }
            });
            $(data).stop().animate({"left":"100%"}, 250);
        }
    });

    $("#btn-mkt").off("click").on({
        click : function(){
            beforeFocusEle = "#btn-mkt";
            optModal.open("modalShopInfo", "alertdialog", "<em>쇼핑정보가 필요하신가요?</em><p>마케팅 수신동의하고 <br>다양한 이벤트 및 혜택을 받아보세요!</p>", "동의", "동의안함");
        }
    });

    $("#btn-barcode").off("click").on({
        click : function(){
            beforeFocusEle = "#btn-barcode";
            optModal.open("modalPrdReg", "alertdialog", "<p>바코드로 편리하게 제품등록 하기위해 <br>APP을 설치하시겠습니까?</p>", "확인", "취소");
        }
    });
});