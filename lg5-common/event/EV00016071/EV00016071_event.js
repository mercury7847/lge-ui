var submitCnt = 0;
//var serial_btn_cnt = 0; 
var serialChcCnt = 0;
//var num = "{}[]()<>?|`~'!@#$%^&*-+=,.;:\"'\\/ ";
var num = "{}[]<>?|`~'!@$%^*+=,.:\"'\\/ "; //20200617 법인회원 특수문자 오류 건으로 수정 - '-', '(', ')', ';', '#', '&' 허용
var eventPath = "event/EV00016071/";
var mainUrl = eventPath + "event_main.jsp";
var submitUrl = eventPath + "event_proc.jsp";
//var currentScroll = $(window).scrollTop() + $(window).height();

$(document).ready(function() {
	$("#place_etc").hide();

	$("#place").change(function() {
		var select_val = $("#place").val();

		if(select_val === "기타"){
			$("#place_etc").show();
		}else{
			$("#place_etc").hide();
		}
	});
	
	//serial check
    $('.serialOpen').on('click', function(){
		$('.popup_serialNo').fadeIn(200);
		$(".dimmed.dim2").show();
    });

    $('.serialClose').on('click', function(){
		$('.popup_serialNo').fadeOut(200);
		$(".dimmed.dim2").hide();
    });

	$("#postCode, #postBtn").on('click', function() { // 주소 클릭시 주소검색 실행
		if("W" === isType){
			OpenpostCodePopup2();
		}else if("M" === isType){
			OpenpostCodePopup2();
		}
	});

	//서비스 요청년 변경시 (응모페이지)
	$("#purchaseYear").on("change", function() {
		
		var purchaseYear = $("#purchaseYear").val();
		
		var startMonth  = 10;
		var endMonth    = 12;
		var sMoptionStr = "<option value=''>선택</option>";
		
		//2021년 추가
		if(purchaseYear!=""){
		 	 if( purchaseYear == "2021"){
		 		  startMonth  = 1;
				  endMonth    = 4;
		 	 }		 
		 }		
		if( startMonth > 0 ){
			
			for (var i = startMonth; i<= endMonth;i++) {
				var tmp = "";
				if (i < 10) tmp = "0"+i; else tmp = ""+i;
				sMoptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
					
			}
		}
			
		$("#purchaseMonth").html(sMoptionStr);
	});

	// 구매 월 변경시
    $("#purchaseMonth").change(function() {
        var sm =  $("#purchaseMonth").val(); //월 구분 할때 사용
        var startday= 1;
        var endday= 31;
        var dOptionStr = "<option value=''>선택</option>";
        var modelSelectBox = ""; //월에 따라 모델 셀렉트 박스를 변경한다.

        if(sm!=""){
        	if( sm == "10"){
                startday = 14;
            }else if( sm == "11" || sm == "04"){
                endday = 30;
            }else if( sm == "02"){
                endday = 28;
            }

            for (var i=startday;i<=endday;i++) {
                if (i < 10) tmp = "0"+i; else tmp = ""+i;
                dOptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
            }
        }
        $("#purchaseDate").html(dOptionStr);
    });
	
	// 응모내역 확인하기
	$("#btn_check").click(function(e) {
		e.preventDefault();
		if ("W" === isType) { // 웹
			window.open(eventPath+"event_update_check.jsp", '_blank', 'width=460, height=460, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no');
		} else if ("M" === isType) { // 모바일
			window.open(eventPath+"event_update_check.jsp", '');
		}
	});

	// 각인 문구
	$(".marking").on("keyup", function(event) {
		var check = /^[a-zA-Z0-9\s]*$/;
		var val = $(this).find(".marking-test").val();
		if(!check.test(val)) {
			alert("한글 및 특수문자나 기호는 지원하지 않습니다.");
			$(this).find(".marking-test").val("");
			$(this).find(".photo .text").text("");
			event.preventDefault(); 
		} else {
			$(this).find(".photo .text").text(val);
		}
	});

	$(".marking .tab > a").on("click", function(event) {
		markigImageChange($(this));
		event.preventDefault();
	});

	$(".marking .tab").on("change", function(event) {
		markigImageChange($(this));
		event.preventDefault();
	});

	init();
	initEventHandlers();
});

/* 각인 이미지 바꾸기 */
function markigImageChange(item) {
	var index = 0;
	var val = "";
	var $marking = item.closest(".marking");

	if ($marking.find(".tab > a").length > 0) {
		$marking.find(".tab > a").removeClass("active");
		item.addClass("active");
		index = item.index();
		val = item.data("name");
	} else if ($marking.find(".tab option").length > 0) {
		index = item.children("option").index(item.children("option:selected"));
		val = item.val();
	}

	if (val !== "") {
		$marking.removeClass("top");
		(val === "top" || val === "Top Cover") ? $marking.addClass("top") : $marking.removeClass("top");

		$marking.find(".photo .view > img").attr("src","/kr/upload/admin/eventMgt/marking_" + (index + 1) + ".jpg");
	}
}

/* 각인 리셋 */
function markingReset(item) {
	$(item).find(".marking .text").text("");
	$(item).find(".marking .marking-test").val("");
	$(item).find(".marking").addClass("top");
	//$(item).find(".photo .view > img").attr("src","/lgekor/asset/event/tv/2020/10/14_signature/_include/images/marking_1.jpg");
	$(item).find(".photo .view > img").attr("src","/kr/upload/admin/eventMgt/marking_1.jpg");
	$(item).find(".marking .tab a").removeClass("active").eq(0).addClass("active");
}

function initEventHandlers() {
	//참여자 이름 특수문자 제어
	$("#myName").on("keyup", function() {
		var str = $.trim(this.value);
		var bFlag = true;
		
		for (var i=0;i<str.length;i++) {
			if (num.indexOf(str.charAt(i)) != -1) bFlag = false;

			if (!bFlag) {
				alert("특수문자는 입력하실 수 없습니다.");
				$("#myName").val("");
				$("#myName").focus();
				return false;
			}
		}
	});
		
	// 참여자 휴대전화번호는 숫자만
	$("#hp1").css('imeMode', 'disabled').keypress(function(event){
		if (event.which && (event.which < 48 || event.which > 57)) {
			event.preventDefault();  //진행중지
		}
	}).keyup(function() {
		if ($(this).val() != null && $(this).val() != '') {
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
		}
	});

	$("#hp2").css('imeMode', 'disabled').keypress(function(event){
		if (event.which && (event.which < 48 || event.which > 57)) {
			event.preventDefault(); //진행중지
		}
	}).keyup(function() {
		if ($(this).val() != null && $(this).val() != '') {
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
		}
	});

	//개인정보 동의 항목
	$("#agree01_01").click(function() {
		$("#agree01").val("1");
	});
	$("#agree01_02").click(function() {
		$("#agree01").val("0");
	});

	$("#agree02_01").click(function() {
		$("#agree02").val("1");
	});
	$("#agree02_02").click(function() {
		$("#agree02").val("0");
	});
}

//  레이어팝업 노출/비노출 제어
var layerPop = function(obj){
	$(obj).show();
}
var layerClose = function(obj){
	$(obj).hide();
}

// 이벤트 참여하기 레이어팝업 열기
function eventEntry1() {
	if(isOpen=="Y"){
		var loginStatus = eventSsoCheck();  //로그인정보다시 체크
		if(mainLoginYn == "Y" && loginStatus == 'active'){
			// 중복체크
			if(eventApplyYn == "Y"){
				alert("이미 신청하신 ID 입니다.");
				return;
			}else{
				layerPop(".event_popup");
				$(".dim1").show();
				document.getElementById("event_popup").scrollIntoView();
	
				//테스트 각인 값 리셋
				markingReset(".cont01");
			}
		}else{
			var fnLoginEventUrl = "";
			if(loginStatus == "forcelogin"){
				fnLoginEventUrl = fnForceLoginEvent(serverType);
			}else{
				fnLoginEventUrl = fnLoginEvent(serverType);
			}
			alert("본 이벤트는 LG전자 회원 로그인 후 참여 가능합니다.");
			top.location.href = fnLoginEventUrl;
		}
	}else{
		alert("이벤트 기간이 아닙니다.");
		return;
	}
}

//loginStatus 유효성 체크 
function eventSsoCheck(){
	var loginStatus = '';
	$.ajax({
		type: "POST",
		async : false,
		url:  "/lgekor/event/common/event_sso_check.jsp",
		dataType:"json",
		success: function(json) {
			mainLoginYn = json.mainLoginYn;
			loginStatus = json.loginStatus;
			//membershipLoginYn = json.membershipLoginYn; //멤버십 여부도 체크할경우 사용
			//다시 로그인 요청 unifyId값이 다를경우 다시 로그인 요청
			
			if($('#unifyId').val() != json.unifyId){
				loginStatus = "forcelogin";
			}
		},
		error: function(request, status, error) {
			alert("오류가 발생하였습니다.");
			return;
		}
	});
	return loginStatus;
}

// 이벤트 참여하기 레이어팝업 닫기
function eventEntryClose() {
	if(confirm("이벤트 응모를 취소하시겠습니까?") == true){
		layerClose(".event_popup");
		init();
		layerInit();
		$(".dim1").hide();

		//각인 값 삭제
		markingReset(".event_popup");
	}else{
		return; 
	}
}

function init(){//입력 값 초기화
	document.frm.reset();
	$("#agree01").val("");
	$("#agree02").val("");
}

// 이벤트 응모실패
function eventCmpltfail() {
	layerClose(".event_popup");
	$(".dim1").hide();
	init();
	layerInit();
	location.reload();
}

// 이벤트 응모완료 팝업 닫기
function eventSucClose() {
	layerClose(".popup_eventCmplt");
	$(".dim1").hide();
	init();
	layerInit();
	location.reload();
}

function layerInit(){//입력 값 초기화
	document.frm.reset();
	$("#agree01").val("");
	$("#agree02").val("");
}

//참여하기 프로세스
function goProc() {
	var frmCheck = true;
	var frm = document.frm;
	if (frmCheck && isOpen.value === "N") {
		alert("이벤트가 종료 되었습니다.");
		frmCheck = false;
	} //완료
	
	/*if (submitCnt > 0) {
		alert(" 처리중입니다. ");
		frmCheck = false;
	}*/
	
	//개인정보 수집이용 동의
	if(frmCheck && ($("#agree01").val() != "1" || $("#agree01_01").is(":checked") == false)){
		alert("개인정보 수집 이용동의에 동의해 주세요.");
		scroll_move("agree01_01");
		//$("#agree01_01").focus();
		frmCheck = false;
	}
	
	//개인정보 취급위탁 동의
	if(frmCheck && ($("#agree02").val() != "1" ||  $("#agree02_01").is(":checked") == false)){
		alert("개인정보 처리위탁동의에 동의해 주세요.");
		scroll_move("agree02_01");
		//$("#agree02_01").focus();
		frmCheck = false;
	}
	
	var purchaseYear = jQuery.trim($("#purchaseYear").val()); //purchaseYear 구매년
	var purchaseMonth = jQuery.trim($("#purchaseMonth").val()); //purchaseMonth 구매월
	var purchaseDate  = jQuery.trim($("#purchaseDate").val()); //구매일
	
	if (frmCheck && purchaseMonth === "") {
		alert("구매월을 선택해 주십시오.");
		$("#purchaseMonth").focus();
		frmCheck = false;
	}
		
	if (frmCheck && purchaseDate === "") {
		alert("구매일을 선택해 주세요.");
		$("#purchaseDate").focus();
		frmCheck = false;
	}
		
	var place         = jQuery.trim($("#place").val()); //구매장소
	var branch    = jQuery.trim($("#branch").val()); //지점명
		
	if (frmCheck && place === "") {
		alert("구매장소를 선택해 주세요.");
		$("#place").focus();
		frmCheck = false;
	}
	
	if (frmCheck && branch === "") {
		alert("지점명을 입력해 주세요.");
		$("#branch").focus();
		frmCheck = false;
	}
	
	// 각인 수집
	var markingText = jQuery.trim($("#event_popup .marking-test").val());
	var markingVal = jQuery.trim($("#event_popup .marking .tab").val());
	
	if (frmCheck && markingVal === "") {
		alert("각인 위치를 선택해주세요.");
		$(".tab").focus();
		frmCheck = false;
	}

	if (frmCheck && markingText === "") {
		alert("각인 문구를 입력해주세요.");
		$("#event_popup .marking-test").focus();
		frmCheck = false;
	}

	if (frmCheck && $("#text_agree").is(":checked") === false) {
		alert("상기 위치, 문구로 제품에 각인되는 것을 동의해주세요.");
		scroll_move("text_agree");
		frmCheck = false;
	}
	
	if (frmCheck) {
		
		//마지막 체크 안하고
		submitCnt++;
		//frm.target = "hid_frmame";
		//frm.action = submitUrl;
		//frm.submit();
		
		 var param = $("#frm").serialize();
         //param += '&eventId='+'<c:out value="${eventId }"/>';
         //param += '&uid='+ '<c:out value="${memberInformation.unifyId}"/>'
         //param += '&userId='+ '<c:out value="${memberInformation.userId}"/>'
         $.ajax({
         	type: 'POST',
         	url: '/evt/EV00016071_event_update.lgajax',
             data : param,
             success:function(data){
             	if(data.status == "success" && data.data.success == "Y"){
                 	alert("신청되었습니다.");
                 	self.close();
             	}else{
             		alert(data.data.alert.title);
             	}
             }
         })
		
	} else {
		return false; 
	}
}

//체크박스 라디오버튼 포커스이동
function scroll_move( id ){
    $( "#"+id ).focus();
    var objscrollTop = $("label[for='"+id+"']").offset();
    parent.$('html, body').stop().animate({scrollTop: objscrollTop.top}, 0);
}

function proc_result(resultCode, msgIndex){
	
	if (resultCode == "1") {
		alert("잘못된 경로로 접근 하셨습니다.");
		eventCmpltfail();
		
	} else if(resultCode == "2") {
		alert("종료된 이벤트 입니다.");
		eventCmpltfail();
		
	} else if(resultCode == "4") {
		alert("이미 등록된 전화번호 입니다.");
		eventCmpltfail();
		
	}else if (resultCode == "5" ) {
		alert("이미 신청하신 ID입니다");
		submitCnt = 0;
	}else if (resultCode == "6" || resultCode == "7" || resultCode == "8" || resultCode == "9" || resultCode == "10" || resultCode == "11") {
		alert("이벤트 참여 중 오류가 발생 하였습니다.\n잠시 후 다시 시도해 주십시오.("+resultCode+")");
		submitCnt = 0;
		goUrl();
	} else if(resultCode == "14" || resultCode == "15") {
		//회원 로그인여부 체크 - 회원정보 없음
		alert("로그인 정보가 없습니다. 다시 로그인해주시기 바랍니다.("+resultCode+")");
		location.reload();
	} else if(resultCode == "0") {
		if(msgIndex == "-1"){
			alert("LG전자 회원 정보가 변경 되어 회원정보 전화번호로 응모 됩니다.\n시그니처 올레드 R을 구입해주셔서 감사합니다. ") ;
		}else {
			alert("신청완료 되었습니다.\nLG 시그니처 올레드 R을 구입해주셔서 감사합니다.");
		}
		location.reload();
		
	} else {
		alert("이벤트 참여 중 오류가 발생 하였습니다.\n잠시 후 다시 시도해 주세요.("+resultCode+")");
		eventCmpltfail();
	}
}

function proc_result2(resultCode){
				
		if (resultCode == "1") {
			alert("잘못된 경로로 접근 하셨습니다.");
			submitCnt = 0;
			top.location.reload();
		} else if (resultCode == "2") {
			alert("이벤트 응모기간에만 변경 가능합니다.");
			submitCnt = 0;
			top.location.reload();
		} else if (resultCode == "3") {
			alert("잘못된 접근 입니다.\n새로고침 후 다시 시도해 주십시오.");
			submitCnt = 0;
			top.location.reload();
		}  else if (resultCode == "4" || resultCode == "6") {
			alert("오류가 발생 하였습니다.\n잠시 후 다시 시도해 주십시오.("+resultCode+")");
			submitCnt = 0;
			top.location.reload();
		}  else if (resultCode == "8") {
			alert("이벤트 참여데이터 조회 실패입니다.");
			submitCnt = 0;
			top.location.reload();
		}else if (resultCode == "0") {
			submitCnt = 0; 
			top.location.reload();
		}		
	}

function goUrl(){
	top.location.href =  Checkdomain+"/lgekor/event/eventProgressDetail.do?cSeq=1000003497&amp;eventFlag=progress&amp;innerReferrer=EventList";
}

var iframePost = 'postwrap';
function foldDaumPostcode() {
    // iframe을 넣은 element를 안보이게 한다.
    document.getElementById(iframePost).style.display = 'none';
}

function OpenpostCodePopup2(){
	daum.postcode.load(function(){
		var element_wrap = document.getElementById(iframePost);
	        new daum.Postcode({
	            oncomplete: function(data) {
	                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

	                // 각 주소의 노출 규칙에 따라 주소를 조합한다.
	                // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
	                var fullAddr = ''; // 최종 주소 변수
	                var extraAddr = ''; // 조합형 주소 변수

	                // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
	                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
	                    fullAddr = data.roadAddress;
	                } else { // 사용자가 지번 주소를 선택했을 경우(J)
	                    fullAddr = data.jibunAddress;
	                }

	                // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
	                if(data.userSelectedType === 'R'){
	                    //법정동명이 있을 경우 추가한다.
	                    if(data.bname !== ''){
	                        extraAddr += data.bname;
	                    }
	                    // 건물명이 있을 경우 추가한다.
	                    if(data.buildingName !== ''){
	                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
	                    }
	                    // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
	                    fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
	                }

	                // 우편번호와 주소 정보를 해당 필드에 넣는다.
	                document.getElementById('postCode').value = data.zonecode; //5자리 새우편번호 사용
	                document.getElementById('customerBasAddr').value = fullAddr;
	                document.getElementById('receieveZipSeq').value = data.roadnameCode;//도로명 코드값
	                document.getElementById('userSelectedType').value = data.userSelectedType;//주소 타입

	                // 커서를 상세주소 필드로 이동한다.
	                document.getElementById('customerDtlAddr').focus();
	                var wrap = $(".eventWrap").height();
	                document.body.style.height = wrap + "px";
	                // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
                	element_wrap.style.display = 'none';

	                // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
	                document.body.scrollTop = currentScroll;
	            },
	            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
            	onresize : function(size) {
                element_wrap.style.height = size.height+'px';
                var doc = $("body").height();
                var pop = $(".w-form-wr").height()+10;
                if(doc<pop){
                 $("body").height(pop);
             	};
            },
            width : '100%',
            height : '100%'
	        }).embed(element_wrap);

        // iframe을 넣은 element를 보이게 한다.
	        element_wrap.style.display = 'block';
        
	        });
}
