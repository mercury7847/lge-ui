var tid;
var LEFT_TIME = 5*60; // 남은시간 5분
var cntTime = LEFT_TIME;
var timeout = false;
var telNo = "";

function initThisWork(){
	cntTime = LEFT_TIME;
	timeout = false;
	$('input[name="pin"]').val("");
	clearInterval(tid);
}

// 남은 시간 구현 모듈
function leftTimeInit(){
	clearInterval(tid);
	tid = setInterval("counter()", 1000);
}

function counter(){
	var leftVal = parseInt(cntTime/60)+"분 "+padZero(parseInt(cntTime%60))+"초";
	$('#leftTime').text("(남은시간 "+leftVal+")");
	cntTime--;
	if(cntTime<0){
		clearInterval(tid);
		timeout = true;		
		$('#leftTime').text("(입력시간 초과)");
		$("#pin").addClass('expired');
		$("#pin").val(" ");		
		agreeForm.element("#pin");
	}
}

function padZero(n){
	return n>9?n:"0"+n;
}

// 인증번호 받기
function doGetCertNo(url){
	//initThisWork();
	
	var p1 = $("#telName").val();
	var p2 = $("#telNo1").val() + "" + $("#telNo2").val() + "" + $("#telNo3").val();
	
	telNo = p2;
	// ajax call
	$.ajax({
		type: "POST"
		, cache : false
		, dataType: "json"
		, url: url
		, data: {clientName : p1,mobile : p2}
		, success: function(data, status) {
			//leftTimeInit(); // 남은시간 표기
			//alert("입력하신 휴대전화번호로 인증번호를 보내드렸습니다.");				
			sms.init();
			sms.succeeded();
		}
		, error: function(xhr, status, error) {
			alert("오류가 발생하였습니다.\n\n[status] " + status + "\n[error] " + error);
		}
		, complete: function(data, status) {

        }
	});
}

//확인버튼 클릭
function doConfirm(){
	// 인증번호 체크
	var userName = $("#telName").val();
	var mobilePhoneNum = $("#telNo1").val() + "" + $("#telNo2").val() + "" + $("#telNo3").val();
	var ordersign = $('input[name="pin"]').val();

	var result = false;
	var p1 = ordersign;
	
	$.ajax({
		type: "POST"
		, cache : false
		, async: false //동기 방식
		, dataType: "json"
		, url: "/support/improve/selectAuthenticationNo.lgajax"
		, data: {
					userName : userName,
					mobilePhoneNum  : mobilePhoneNum,
					ordersign : ordersign
					}
		, success: function(data, status) {
			if(data.result == "Y"){
				$("#pName").val($("#telName").val());
				$("#pTelNo1").val($("#telNo1").val());
				$("#pTelNo2").val($("#telNo2").val());
				$("#pTelNo3").val($("#telNo3").val());
				
				//alert("본인 인증이 확인되었습니다.");
				$("#authCheck").val("Y");
				result = true;
				
			}
			
		}
		, error: function(xhr, status, error) {
			initThisWork();
		}
	});
	return result; 

}