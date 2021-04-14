var submitCnt = 0;
var serial_btn_cnt = 0; 
var num = "{}[]()<>?|`~'!@#$%^&*-+=,.;:\"'\\/ ";
var eventPath = "/WEB-INF/jsp/event/EV00016073/";
var mainUrl = eventPath + "event_main.jsp";

$(document).ready(function() {
	
	//행사 모델 자세히 보기
    $('.eventModel').on('click', function(){
    	//if( $.trim( $("#myName").val() ) != "" ){
	        $('.popup_eventModel').fadeIn(200);
	        $(".dimmed.dim3").show();
    	//}
    });

    $('.eventModelClose').on('click', function(){
    	//if( $.trim( $("#myName").val() ) != "" ){
	        $('.popup_eventModel').fadeOut(200);
	        $(".dimmed.dim3").hide();
    	//}
    });
	
	//제조번호
    $('.serialOpen').on('click', function(){
    	//if( $.trim( $("#myName").val() ) != "" ){
	        $('.popup_serialNo').fadeIn(200);
	        $(".dimmed.dim2").show();
    	//}
    });

    $('.serialClose').on('click', function(){
    	//if( $.trim( $("#myName").val() ) != "" ){
	        $('.popup_serialNo').fadeOut(200);
	        $(".dimmed.dim2").hide();
    	//}
    });

	//거래내역서
    $('.receiptOpen').on('click', function(){
    	//if( $.trim( $("#myName").val() ) != "" ){
	        $('.popup_serialNo2').fadeIn(200);
	        $(".dimmed.dim2").show();
    	//}
    });

    $('.receiptClose').on('click', function(){
    	//if( $.trim( $("#myName").val() ) != "" ){
	        $('.popup_serialNo2').fadeOut(200);
	        $(".dimmed.dim2").hide();
    	//}
    });

	// 이메일 주소 변경 시 
    $("#email3").change(function() {
        var email =  $("#email3").val(); 
        var email1 = $("#email1").val();
        if(email != ""){
        	$("#email2").val(email);
        	$("#email2").attr("readonly", true);
        		if(email1 != "") {
				setTimeout(function() {
					alert("이메일 주소를  정확하게 입력하였는지 다시 한번  확인해주세요.");
				}, 300);
        	}
        }else{
        	$("#email2").val("");
        	$("#email2").removeAttr("readonly");
        }
    });

    //이메일 작성 확인 팝업
	$("#email2").on("blur", function() {
		alert("이메일 주소를  정확하게 입력하였는지 다시 한번  확인해주세요.");
	});
    
	//구제품모델명,신제품제조번호 영문/숫자만 가능
    $("#oldModelName, #serialNo").keyup(function(event){
		if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[ㄱ-ㅎㅏ-ㅣ가-힝]/gi,''));
		}
    });
     
	$("#myName, #branch, #serialNo,#oldModelName").keyup(function() {
        var str = jQuery.trim(this.value);
        var bFlag = true;
        for (var i=0;i<str.length;i++) {
            if (num.indexOf(str.charAt(i)) != -1) bFlag = false;

            if (!bFlag) {
                alert("특수문자 및 공백는 입력하실 수 없습니다.");
                $(this).val("");
                $(this).focus();
                return false;
            }
        }
    });
    
    //시리얼번호 대문자로 전환
    $("#serialNo").bind('keyup', function() {
        $(this).val($(this).val().toUpperCase());   
        if ($("#serialNo").val().length > 12)  {
            $("#serialNo").val($("#serialNo").val().substr(0,12));
        }
    });
    
       //구제품모델명 대문자로 전환
    $("#oldModelName").bind('keyup', function() {
        $(this).val($(this).val().toUpperCase());   
    });
	
	// 구매 연
    $("#purchaseYear").change(function() {
        var sel_year =  $("#purchaseYear").val();
        
        /*날짜 구하기*/
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1.
		var day = date.getDate();
		/*날짜 구하기*/
        
        var startM = 1;
        var endM   = 3;
        var mOptionStr = "<option value=''>선택</option>";

        if(sel_year!=""){
            for (var i=startM;i<=endM;i++) {
                var tmp = "";
                if (i < 10) tmp = "0"+i; else tmp = ""+i;
                 mOptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
            }
        }
        $("#purchaseMonth").html(mOptionStr);
        $("#purchaseDate").html("<option value=''>선택</option>");
    });

    // 구매 월
    $("#purchaseMonth").change(function() {
        var sm =  $("#purchaseMonth").val(); //월 구분 할때 사용
        var startday= 1;
        var endday= 31;
        var dOptionStr = "<option value=''>선택</option>";

        if(sm!=""){
            if( sm == "04" || sm == "06" || sm == "09" || sm == "11" ){
                endday = 30;
            }else if(sm == "02"){
                endday = 28;
            }else if(sm == "01"){
                 startday= 14;
            }

            for (var i=startday;i<=endday;i++) {
                var tmp = "";
                if (i < 10) tmp = "0"+i; else tmp = ""+i;
                dOptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
            }
        }

        $("#purchaseDate").html(dOptionStr);
    });

    // 설치 연
    $("#producInstallYear").change(function() {
        var sel_year =  $("#producInstallYear").val();
        
        /*날짜 구하기*/
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1.
		var day = date.getDate();
		/*날짜 구하기*/
        
        var startM = 1;
        var endM   = 4;
        var mOptionStr = "<option value=''>선택</option>";

        if(sel_year!=""){

            for (var i=startM;i<=endM;i++) {
                var tmp = "";
                if (i < 10) tmp = "0"+i; else tmp = ""+i;
                 mOptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
            }
        }

        $("#producInstallMonth").html(mOptionStr);
        $("#producInstallDate").html("<option value=''>선택</option>");
    });

    // 설치 월
    $("#producInstallMonth").change(function() {
        var sm =  $("#producInstallMonth").val(); //월 구분 할때 사용
        var startday= 1;
        var endday= 31;
        var dOptionStr = "<option value=''>선택</option>";

        if(sm!=""){
            if( sm == "04" || sm == "06" || sm == "09" || sm == "11" ){
                endday = 30;
            }else if(sm == "02"){
                endday = 28;
            }else if(sm == "01"){
                 startday= 14;
            }

            for (var i=startday;i<=endday;i++) {
                var tmp = "";
                if (i < 10) tmp = "0"+i; else tmp = ""+i;
                dOptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
            }
        }

        $("#producInstallDate").html(dOptionStr);
    });

    
      $("#place").change(function() {
        var dOptionStr = "<option value=''>선택</option>";

        if( $(this).val() == "오프라인" ){
			dOptionStr += "<option value='LG베스트샵'>LG베스트샵</option>";
			dOptionStr += "<option value='하이마트'>하이마트</option>";
			dOptionStr += "<option value='전자랜드'>전자랜드</option>";
			dOptionStr += "<option value='이마트 트레이더스'>이마트 트레이더스</option>";
			dOptionStr += "<option value='이마트'>이마트</option>";
			dOptionStr += "<option value='홈플러스'>홈플러스</option>";
			dOptionStr += "<option value='코스트코'>코스트코</option>";			
			dOptionStr += "<option value='백화점_롯데'>백화점_롯데</option>";
			dOptionStr += "<option value='백화점_신세계'>백화점_신세계</option>";
			dOptionStr += "<option value='백화점_현대'>백화점_현대</option>";
			dOptionStr += "<option value='백화점_AK'>백화점_AK</option>";
			dOptionStr += "<option value='백화점_갤러리아'>백화점_갤러리아</option>";
			dOptionStr += "<option value='백화점_대구'>백화점_대구</option>";
			dOptionStr += "<option value='기타'>기타</option>";
        }else if( $(this).val() == "온라인" ){
        	dOptionStr += "<option value='하이마트몰'>하이마트몰</option>";
			dOptionStr += "<option value='11번가'>11번가</option>";
			dOptionStr += "<option value='G마켓'>G마켓</option>";
			dOptionStr += "<option value='옥션'>옥션</option>";
			dOptionStr += "<option value='위메프'>위메프</option>";
			dOptionStr += "<option value='쿠팡'>쿠팡</option>";
			dOptionStr += "<option value='G9'>G9</option>";
			dOptionStr += "<option value='㈜엘지씨엔에스'>㈜엘지씨엔에스</option>";
			dOptionStr += "<option value='인터파크'>인터파크</option>";
			dOptionStr += "<option value='CJ Mall'>CJ Mall</option>";
			dOptionStr += "<option value='신세계몰'>신세계몰</option>";
			dOptionStr += "<option value='롯데몰'>롯데몰</option>";
			dOptionStr += "<option value='GS SHOP'>GS SHOP</option>";
			dOptionStr += "<option value='전자랜드몰'>전자랜드몰</option>";
			dOptionStr += "<option value='기타'>기타</option>";
        }else if( $(this).val() == "홈쇼핑" ){
        	dOptionStr += "<option value='CJ홈쇼핑'>CJ홈쇼핑</option>";
			dOptionStr += "<option value='H몰'>H몰</option>";
			dOptionStr += "<option value='롯데홈쇼핑'>롯데홈쇼핑</option>";
			dOptionStr += "<option value='현대홈쇼핑'>현대홈쇼핑</option>";
			dOptionStr += "<option value='GS홈쇼핑'>GS홈쇼핑</option>";
			dOptionStr += "<option value='NH홈쇼핑'>NH홈쇼핑</option>";
			dOptionStr += "<option value='기타'>기타</option>";
        }

         $("#channel").html(dOptionStr);
    });
    
	 $('#model1').on('change', function(e){
    	var dOptionStr = "<option value=''>선택</option>";
        if( $(this).val() == "LG휘센듀얼에어컨" ){
			dOptionStr += "<option value='FQ23LADRBZ.AKOR'>FQ23LADRBZ.AKOR</option>";
			dOptionStr += "<option value='FQ23LADRBN.AKOR'>FQ23LADRBN.AKOR</option>";
			dOptionStr += "<option value='FQ23LADRAZ.AKOR'>FQ23LADRAZ.AKOR</option>";
			dOptionStr += "<option value='FQ23LADRAN.AKOR'>FQ23LADRAN.AKOR</option>";
			dOptionStr += "<option value='FQ23LADNBN.AKOR'>FQ23LADNBN.AKOR</option>";
			dOptionStr += "<option value='FQ23LADNAN.AKOR'>FQ23LADNAN.AKOR</option>";
			dOptionStr += "<option value='FQ20LADRBN.AKOR'>FQ20LADRBN.AKOR</option>";
			dOptionStr += "<option value='FQ20LADRAN.AKOR'>FQ20LADRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20LADNBZ.AKOR'>FQ20LADNBZ.AKOR</option>";
			dOptionStr += "<option value='FQ20LADNBN.AKOR'>FQ20LADNBN.AKOR</option>";
			dOptionStr += "<option value='FQ20LADNAZ.AKOR'>FQ20LADNAZ.AKOR</option>";
			dOptionStr += "<option value='FQ20LADNAN.AKOR'>FQ20LADNAN.AKOR</option>";
			dOptionStr += "<option value='FQ18LADREZ.AKOR'>FQ18LADREZ.AKOR</option>";
			dOptionStr += "<option value='FQ18LADREN.AKOR'>FQ18LADREN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADRQZ.AKOR'>FQ20PADRQZ.AKOR</option>";
			dOptionStr += "<option value='FQ20PADRQN.AKOR'>FQ20PADRQN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADRPN.AKOR'>FQ20PADRPN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADRBN.AKOR'>FQ20PADRBN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADRAN.AKOR'>FQ20PADRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADNQZ.AKOR'>FQ20PADNQZ.AKOR</option>";
			dOptionStr += "<option value='FQ20PADNQN.AKOR'>FQ20PADNQN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADNPN.AKOR'>FQ20PADNPN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADNBN.AKOR'>FQ20PADNBN.AKOR</option>";
			dOptionStr += "<option value='FQ20PADNAN.AKOR'>FQ20PADNAN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADRQN.AKOR'>FQ18PADRQN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADRPZ.AKOR'>FQ18PADRPZ.AKOR</option>";
			dOptionStr += "<option value='FQ18PADRPN.AKOR'>FQ18PADRPN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADRBN.AKOR'>FQ18PADRBN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADRAN.AKOR'>FQ18PADRAN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADNQN.AKOR'>FQ18PADNQN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADNPZ.AKOR'>FQ18PADNPZ.AKOR</option>";
			dOptionStr += "<option value='FQ18PADNPN.AKOR'>FQ18PADNPN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADNBN.AKOR'>FQ18PADNBN.AKOR</option>";
			dOptionStr += "<option value='FQ18PADNAN.AKOR'>FQ18PADNAN.AKOR</option>";
			dOptionStr += "<option value='FQ17PADREZ.AKOR'>FQ17PADREZ.AKOR</option>";
			dOptionStr += "<option value='FQ17PADREN.AKOR'>FQ17PADREN.AKOR</option>";
			dOptionStr += "<option value='FQ17PADNEN.AKOR'>FQ17PADNEN.AKOR</option>";
			dOptionStr += "<option value='FW17SADWAN.AKOR'>FW17SADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWQN.AKOR'>FQ20SADWQN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWPN.AKOR'>FQ20SADWPN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWBN.AKOR'>FQ20SADWBN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWAN.AKOR'>FQ20SADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWQZ.AKOR'>FQ18SADWQZ.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWQN.AKOR'>FQ18SADWQN.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWPZ.AKOR'>FQ18SADWPZ.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWPN.AKOR'>FQ18SADWPN.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWKN.AKOR'>FQ18SADWKN.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWHZ.AKOR'>FQ18SADWHZ.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWHN.AKOR'>FQ18SADWHN.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWGZ.AKOR'>FQ18SADWGZ.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWGN.AKOR'>FQ18SADWGN.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWBN.AKOR'>FQ18SADWBN.AKOR</option>";
			dOptionStr += "<option value='FQ18SADWAN.AKOR'>FQ18SADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ17SADWPN.AKOR'>FQ17SADWPN.AKOR</option>";
			dOptionStr += "<option value='FQ17SADWFZ.AKOR'>FQ17SADWFZ.AKOR</option>";
			dOptionStr += "<option value='FQ17SADWFN.AKOR'>FQ17SADWFN.AKOR</option>";
			dOptionStr += "<option value='FQ17SADWEZ.AKOR'>FQ17SADWEZ.AKOR</option>";
			dOptionStr += "<option value='FQ17SADWEN.AKOR'>FQ17SADWEN.AKOR</option>";
			//20210118추가시작 FQ17SADWEN.AKOR 아래
			dOptionStr += "<option value='FQ20SADWRN.AKOR'>FQ20SADWRN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWRZ.AKOR'>FQ20SADWRZ.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWSN.AKOR'>FQ20SADWSN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWSZ.AKOR'>FQ20SADWSZ.AKOR</option>";
			//20210118추가끝
			dOptionStr += "<option value='FW17DADWAN.AKOR'>FW17DADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ23DADWLN.AKOR'>FQ23DADWLN.AKOR</option>";
			dOptionStr += "<option value='FQ23DADWBZ.AKOR'>FQ23DADWBZ.AKOR</option>";
			dOptionStr += "<option value='FQ23DADWBN.AKOR'>FQ23DADWBN.AKOR</option>";
			dOptionStr += "<option value='FQ23DADWAN.AKOR'>FQ23DADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ20DADWAN.AKOR'>FQ20DADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ18DADWAZ.AKOR'>FQ18DADWAZ.AKOR</option>";
			dOptionStr += "<option value='FQ18DADWAN.AKOR'>FQ18DADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ18DADRAZ.AKOR'>FQ18DADRAZ.AKOR</option>";
			dOptionStr += "<option value='FQ18DADRAN.AKOR'>FQ18DADRAN.AKOR</option>";
			dOptionStr += "<option value='FQ18DADNAZ.AKOR'>FQ18DADNAZ.AKOR</option>";
			dOptionStr += "<option value='FQ18DADNAN.AKOR'>FQ18DADNAN.AKOR</option>";
			dOptionStr += "<option value='FQ17DADWCN.AKOR'>FQ17DADWCN.AKOR</option>";
			dOptionStr += "<option value='FW17VADWAN.AKOR'>FW17VADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ19VADWCN.AKOR'>FQ19VADWCN.AKOR</option>";
			dOptionStr += "<option value='FQ18VADWBZ.AKOR'>FQ18VADWBZ.AKOR</option>";
			dOptionStr += "<option value='FQ18VADWBN.AKOR'>FQ18VADWBN.AKOR</option>";
			dOptionStr += "<option value='FQ18VADWAZ.AKOR'>FQ18VADWAZ.AKOR</option>";
			dOptionStr += "<option value='FQ18VADWAN.AKOR'>FQ18VADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ17VADWJN.AKOR'>FQ17VADWJN.AKOR</option>";
			dOptionStr += "<option value='FQ17VADWFN.AKOR'>FQ17VADWFN.AKOR</option>";
			dOptionStr += "<option value='FQ17VADWEN.AKOR'>FQ17VADWEN.AKOR</option>";
			dOptionStr += "<option value='FQ17VADWDN.AKOR'>FQ17VADWDN.AKOR</option>";
			dOptionStr += "<option value='FQ17VADWCN.AKOR'>FQ17VADWCN.AKOR</option>";
			dOptionStr += "<option value='FQ20HADWBN.AKOR'>FQ20HADWBN.AKOR</option>";
			dOptionStr += "<option value='FQ20HADWAN.AKOR'>FQ20HADWAN.AKOR</option>";
			dOptionStr += "<option value='FQ18HADWBZ.AKOR'>FQ18HADWBZ.AKOR</option>";
			dOptionStr += "<option value='FQ18HADWBN.AKOR'>FQ18HADWBN.AKOR</option>";
			dOptionStr += "<option value='FQ18HADWAZ.AKOR'>FQ18HADWAZ.AKOR</option>";
			dOptionStr += "<option value='FQ18HADWAN.AKOR'>FQ18HADWAN.AKOR</option>";
			//2021신모델추가 20210122반영
			dOptionStr += "<option value='FQ18SBDWGN.AKOR'>FQ18SBDWGN.AKOR</option>";	//듀얼 스페셜
			dOptionStr += "<option value='FQ18SBDWHN.AKOR'>FQ18SBDWHN.AKOR</option>";	//듀얼 스페셜
			dOptionStr += "<option value='FQ17SBDWCN.AKOR'>FQ17SBDWCN.AKOR</option>";	//듀얼 스페셜
			dOptionStr += "<option value='FQ18SBDWAN.AKOR'>FQ18SBDWAN.AKOR</option>";	//듀얼 스페셜
			dOptionStr += "<option value='FQ18SBDWBN.AKOR'>FQ18SBDWBN.AKOR</option>";	//듀얼 스페셜
			dOptionStr += "<option value='FQ18HBDWAN.AKOR'>FQ18HBDWAN.AKOR</option>";	//듀얼 히트
			dOptionStr += "<option value='FQ18HBDWBN.AKOR'>FQ18HBDWBN.AKOR</option>";	//듀얼 히트
			//20210210반영예정
			/* 
			dOptionStr += "<option value='FQ20DBDWAN.AKOR'>FQ20DBDWAN.AKOR</option>";//듀얼 디럭스
			dOptionStr += "<option value='FQ18DBDWAN.AKOR'>FQ18DBDWAN.AKOR</option>";//듀얼 디럭스
			dOptionStr += "<option value='FQ17DBDWCN.AKOR'>FQ17DBDWCN.AKOR</option>";//듀얼 디럭스
			dOptionStr += "<option value='FQ18VBDWEN.AKOR'>FQ18VBDWEN.AKOR</option>";//듀얼 빅토리
			dOptionStr += "<option value='FQ18VBDWFN.AKOR'>FQ18VBDWFN.AKOR</option>";//듀얼 빅토리
			dOptionStr += "<option value='FQ23VBDWAN.AKOR'>FQ23VBDWAN.AKOR</option>";//듀얼 빅토리
			dOptionStr += "<option value='FQ18VBDWAN.AKOR'>FQ18VBDWAN.AKOR</option>";//듀얼 빅토리
			dOptionStr += "<option value='FQ23VBDWBN.AKOR'>FQ23VBDWBN.AKOR</option>";//듀얼 빅토리
			dOptionStr += "<option value='FQ18VBDWBN.AKOR'>FQ18VBDWBN.AKOR</option>";//듀얼 빅토리
			dOptionStr += "<option value='FQ19VBDWCN.AKOR'>FQ19VBDWCN.AKOR</option>";//듀얼 빅토리
			dOptionStr += "<option value='FQ17VBDWCN.AKOR'>FQ17VBDWCN.AKOR</option>";//듀얼 빅토리
			*/
        } else if( $(this).val() == "기타" ){
        	dOptionStr += "<option value='FQ27GASMAZ.AKOR'>FQ27GASMAZ.AKOR</option>";// 시그니처
			dOptionStr += "<option value='FQ27GASMAN.AKOR'>FQ27GASMAN.AKOR</option>";// 시그니처
			dOptionStr += "<option value='FW23GASMAZ.AKOR'>FW23GASMAZ.AKOR</option>";// 시그니처
			dOptionStr += "<option value='FW23GASMAN.AKOR'>FW23GASMAN.AKOR</option>";// 시그니처
			dOptionStr += "<option value='FQ27SACCAN.AKOR'>FQ27SACCAN.AKOR</option>";//크라운
			dOptionStr += "<option value='FQ25SACCAN.AKOR'>FQ25SACCAN.AKOR</option>";//크라운
			dOptionStr += "<option value='FQ27SACCAZ.AKOR'>FQ27SACCAZ.AKOR</option>";//크라운
			dOptionStr += "<option value='FQ20VAWWTN.AKOR'>FQ20VAWWTN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ20VAWWAN.AKOR'>FQ20VAWWAN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ20VAKWUN.AKOR'>FQ20VAKWUN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ20VAKWAN.AKOR'>FQ20VAKWAN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VAWWTN.AKOR'>FQ18VAWWTN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VAWWAZ.AKOR'>FQ18VAWWAZ.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VAWWAN.AKOR'>FQ18VAWWAN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VAKWUN.AKOR'>FQ18VAKWUN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VAKWLN.AKOR'>FQ18VAKWLN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VAKWAZ.AKOR'>FQ18VAKWAZ.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VAKWAN.AKOR'>FQ18VAKWAN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ17VAWWCN.AKOR'>FQ17VAWWCN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ17VAKWCN.AKOR'>FQ17VAKWCN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ17V9WWCN.AKOR'>FQ17V9WWCN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ17V9KWCN.AKOR'>FQ17V9KWCN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ17V9KWAN.AKOR'>FQ17V9KWAN.AKOR</option>";//위너/칸
			//2021신모델추가 20210210반영예정
			/*
			dOptionStr += "<option value='FQ20VBWWAN.AKOR'>FQ20VBWWAN.AKOR</option>";//위너/칸
			dOptionStr += "<option value='FQ18VBWWAN.AKOR'>FQ18VBWWAN.AKOR</option>";	//위너/칸
			dOptionStr += "<option value='FQ20VBKWAN.AKOR'>FQ20VBKWAN.AKOR</option>";	//위너/칸
			dOptionStr += "<option value='FQ18VBKWAN.AKOR'>FQ18VBKWAN.AKOR</option>";	//위너/칸
			dOptionStr += "<option value='FQ17VBWWCN.AKOR'>FQ17VBWWCN.AKOR</option>";	//위너/칸
			dOptionStr += "<option value='FQ17VBKWCN.AKOR'>FQ17VBKWCN.AKOR</option>";	//위너/칸
			*/
        }else if( $(this).val() == "LG휘센타워에어컨" ){ //2021 신모델추가
        	dOptionStr += "<option value='FQ25LBNRAN.AKOR'>FQ25LBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20LBNRAN.AKOR'>FQ20LBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ25LBNBPN.AKOR'>FQ25LBNBPN.AKOR</option>";
			dOptionStr += "<option value='FQ25SBNWGN.AKOR'>FQ25SBNWGN.AKOR</option>";
			dOptionStr += "<option value='FQ20SBNWGN.AKOR'>FQ20SBNWGN.AKOR</option>";
			dOptionStr += "<option value='FQ18SBNWGN.AKOR'>FQ18SBNWGN.AKOR</option>";
			dOptionStr += "<option value='FQ25SBNWHN.AKOR'>FQ25SBNWHN.AKOR</option>";
			dOptionStr += "<option value='FQ20SBNWHN.AKOR'>FQ20SBNWHN.AKOR</option>";
			dOptionStr += "<option value='FQ18SBNWHN.AKOR'>FQ18SBNWHN.AKOR</option>";
			dOptionStr += "<option value='FQ25PBNRAN.AKOR'>FQ25PBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20PBNRAN.AKOR'>FQ20PBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ18PBNRAN.AKOR'>FQ18PBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20PBNBPN.AKOR'>FQ20PBNBPN.AKOR</option>";
			dOptionStr += "<option value='FQ18PBNBPN.AKOR'>FQ18PBNBPN.AKOR</option>";
        }else if( $(this).val() == "LG오브제컬렉션에어컨" ){ //2021 신모델추가
        	dOptionStr += "<option value='FQ25LBNBAN.AKOR'>FQ25LBNBAN.AKOR</option>";
        	dOptionStr += "<option value='FQ20PBNBAN.AKOR'>FQ20PBNBAN.AKOR</option>";
        	dOptionStr += "<option value='FQ18PBNBAN.AKOR'>FQ18PBNBAN.AKOR</option>";
        }
        
        $("#model2").html(dOptionStr);
    });
    
    $('#model2').on('change', function(e){
    	$(".price").show();
    	if( 
    		$(this).val() == "FQ20VAWWTN.AKOR" ||
			$(this).val() == "FQ20VAWWAN.AKOR" ||
			$(this).val() == "FQ20VAKWUN.AKOR" ||
			$(this).val() == "FQ20VAKWAN.AKOR" ||
			$(this).val() == "FQ18VAWWTN.AKOR" ||
			$(this).val() == "FQ18VAWWAZ.AKOR" ||
			$(this).val() == "FQ18VAWWAN.AKOR" ||
			$(this).val() == "FQ18VAKWUN.AKOR" ||
			$(this).val() == "FQ18VAKWLN.AKOR" ||
			$(this).val() == "FQ18VAKWAZ.AKOR" ||
			$(this).val() == "FQ18VAKWAN.AKOR" ||
			$(this).val() == "FQ17VAWWCN.AKOR" ||
			$(this).val() == "FQ17VAKWCN.AKOR" ||
			$(this).val() == "FQ17V9WWCN.AKOR" ||
			$(this).val() == "FQ17V9KWCN.AKOR" ||
			$(this).val() == "FQ17V9KWAN.AKOR" ||
			$(this).val() == "FQ20VBWWAN.AKOR" ||  //2021신모델추가
			$(this).val() == "FQ18VBWWAN.AKOR" ||
			$(this).val() == "FQ20VBKWAN.AKOR" ||
			$(this).val() == "FQ18VBKWAN.AKOR" ||
			$(this).val() == "FQ17VBWWCN.AKOR" ||
			$(this).val() == "FQ17VBKWCN.AKOR"	
		){
    		$("#priceVal").html(" 50,000원");
    		$("#giftVal").val("50,000원");
    		
    	} else if( $(this).val() == "" ) {
    		$(".price").hide();
    		$("#priceVal").html(" 0원");
    		$("#giftVal").val("0원");
    	}  else {
    		$("#priceVal").html(" 100,000원");
    		$("#giftVal").val("100,000원");
    	}

    });
    
    //제조번호확인-수정필요 (제조번호 유효성, 중복 체크)
	$("#btn_product").click(function() {
		
		var snCnt = 0;
		$("#prdChk").val('N');

		if ( !validatePrd() ) {
			$("#prdChk").val('N');
		}else{			
			eventModelChk(); //제조번호 유효성, 중복 체크
		}
	});	
	
	init();
	initEventHandlers();
});

//정보동의, 취급동의, 수집동의, 설문응답 값
function gocheck(str1,str2){
    $("#"+str1).val(str2);
}

//시리얼번호 유효성 및 중복 체크
function eventModelChk(){
	$.ajax({
		type: "POST",
		url: "/evt/ManufactureChk.lgajax",
		dataType:"json",
		data: jQuery("form[name=frm]").serialize(),
		success: function(json) {
			var result = json.resultCode;
			
			if(result == "0"){
				$("#prdChk").val("Y");
				alert(json.msg);
				$("#serialNo").attr("readonly","readonly");
			}else{
				$("#prdChk").val("N");
					alert(json.msg);
					frm.serialNo.focus();
			}
		},
		error: function(request, status, error) {
			alert(error);
			return;
		}
	});
	
}

//모델, 시리얼 번호 길이 체크
function validatePrd(){
     var prdCheck = true;
     
	  if (prdCheck && $.trim($("#model1").val()) === "") {
        alert("구매 제품명을 선택해주세요.");
        $("#model1").focus();
        prdCheck = false;
    }
    
    if (prdCheck && $.trim($("#model2").val()) === "") {
        alert("구매 모델명을 선택해주세요.");
        $("#model2").focus();
        prdCheck = false;
    }

    if (prdCheck && $.trim($("#serialNo").val()).length != 12 ) {
        alert("제조번호 확인을 해주세요.");
        $("#serialNo").focus();
        prdCheck = false;
    }
    return prdCheck;
}

function initEventHandlers() {
	//참여자 이름 특수문자 제어
	$("#firstName").on("keyup", function() {
		var str = $.trim(this.value);
		var bFlag = true;
		
		for (var i=0;i<str.length;i++) {
			if (num.indexOf(str.charAt(i)) != -1) bFlag = false;

			if (!bFlag) {
				alert("특수문자는 입력하실 수 없습니다.");
				$("#firstName").val("");
				$("#firstName").focus();
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

function init(){//입력 값 초기화
	document.frm.reset();
	$("#agree01").val("");
	$("#agree02").val("");
	$("#serialNo").attr("readonly",false);
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
	$("#serialNo").attr("readonly",false);

}


//참여하기 프로세스
function goProc() {
	var frmCheck = true;
	var frm = document.frm;
	
	if (frmCheck && isOpen === "N") {
		alert("이벤트가 종료 되었습니다.");
		frmCheck = false;
	}
	if (submitCnt > 0) {
		alert(" 처리중입니다. ");
		frmCheck = false;
	}
    if (frmCheck && !$("input[id='agree01_01']").is(":checked")) {
        alert("[필수]개인정보 수집 이용 동의를 체크해 주십시오.");
        //체크,라디오 포커스 이동
        scroll_move( "agree01_01" );
        frmCheck = false;
    }
    if (frmCheck && !$("input[id='agree02_01']").is(":checked")) {
        alert("[필수]개인정보 처리 위탁 동의를 체크해 주십시오.");
        //체크,라디오 포커스 이동
        scroll_move( "agree02_01" );
        frmCheck = false;
    }
    if (frmCheck && submitCnt > 0) {
        alert("처리중 입니다.");
        frmCheck = false;
    }
    
    //1.고객정보
    if(frmCheck && $.trim($("#email1").val()) === ""){
		alert("이메일 주소를 입력해주세요.");
		$("#email1").focus();
		frmCheck = false;
	}
	if(frmCheck && $.trim($("#email2").val()) === ""){
		alert("이메일 주소를 입력해주세요.");
		$("#email3").focus();
		frmCheck = false;
	}
	var fullEmail = $("#email1").val() + "@" + $("#email2").val(); 
	
	if(frmCheck && !chkEmail(fullEmail)){//이메일 체크
		alert("유효하지 않은 이메일 입니다.");
		$("#email3").focus();
		frmCheck = false;
	}
	//2. 구모델제품정보
	 if (frmCheck && $.trim($("#productType").val()) === "") {
		alert("제품 타입을 입력해주세요.");
		$("#productType").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#manufactureYear").val()) === "") {
		alert("제조 년도를 입력해주세요.");
		$("#manufactureYear").focus();
		frmCheck = false;
	}
	
	if (frmCheck && $.trim($("#manufactureCompany").val()) === "") {
		alert("제조사를 입력해주세요.");
		$("#manufactureCompany").focus();
		frmCheck = false;
	}
	
	if (frmCheck && $.trim($("#oldModelName").val()) === "") {
		alert("모델명을 입력해주세요.");
		$("#oldModelName").focus();
		frmCheck = false;
	}
	if ( frmCheck && $.trim($("#ptUpload1").val()) === "") {
		alert("제품사진을 등록해 주십시오.");
		$("#ptUpload1").val("");
		$("#oldProduct").val("");
		$("#oldProduct").focus();
		frmCheck = false;
	}
	 
	//3.신모델정보
	if (frmCheck && $.trim($("#purchaseYear").val()) === "") {
		alert("구매년도를 선택해주세요.");
		$("#purchaseYear").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#purchaseMonth").val()) === "") {
		alert("구매월을 선택해주세요.");
		$("#purchaseMonth").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#purchaseDate").val()) === "") {
		alert("구매일을 선택해주세요.");
		$("#purchaseDate").focus();
		frmCheck = false;
	}
    if (frmCheck && $("#place").val() === "") {
        alert("구매 장소를 선택해주세요.");
        $("#place").focus();
        frmCheck = false;
    }
     if (frmCheck && $("#channel").val() === "") {
        alert("유통채널을 선택해주세요.");
        $("#channel").focus();
        frmCheck = false;
    }
    
    if (frmCheck && $.trim($("#branch").val()) === "") {
        alert("지점명을 입력해주세요.");
        $("#branch").focus();
        frmCheck = false;
    }
    
    if (frmCheck && $.trim($("#newProductType").val()) === "") {
		alert("제품 타입을 입력해주세요.");
		$("#newProductType").focus();
		frmCheck = false;
	}
     
   	if ( frmCheck && !validatePrd() ) {
        frmCheck = false;
    }
   	
   	//체크 된 제품만
	if (frmCheck && $("#prdChk").val() != "Y"  ) {
		alert("제조번호 확인을 해주세요.");
		$("#btn_product").focus();
		frmCheck = false;
	}
    if ( frmCheck && $.trim($("#ptUpload2").val()) === "") {
		alert("제조번호사진을 등록해 주십시오.");
		$("#ptUpload2").val("");
		$("#productPic").val("");
		$("#productPic").focus();
		frmCheck = false;
	}
	if ( frmCheck && $.trim($("#ptUpload3").val()) === "") {
		alert("거래내역서 등록해 주십시오.");
		$("#ptUpload3").val("");
		$("#receipt").val("");
		$("#receipt").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#producInstallYear").val()) === "") {
		alert("제품설치 년도를 선택해주세요.");
		$("#producInstallYear").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#producInstallMonth").val()) === "") {
		alert("제품설치월을 선택해주세요.");
		$("#producInstallMonth").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#producInstallDate").val()) === "") {
		alert("제품설치일을 선택해주세요.");
		$("#producInstallDate").focus();
		frmCheck = false;
	}
	
	//4.상품권정보
	if (frmCheck && $.trim($("#giftCard").val()) === "") {
        alert("모바일 상품권을 선택해주세요.");
        $("#giftCard").focus();
        frmCheck = false;
    }
	if (frmCheck) {
		var confirmTxt = "정보 수정이 불가합니다. 다시 한 번 확인해주세요!\n"
						+ "입력하신 내용으로 응모하시겠습니까?\n"
		var ck = confirm(confirmTxt);

		if(ck == true){//확인

			var formData = new FormData(document.getElementById('frm'));
			
			$.ajax({
				type: "POST",
				url: "/evt/EV00016073Submit.lgajax",
				data:formData,
				processData: false,
				contentType: false,
				success: function(json) {
					var result = json.data.alert.title;
					alert(result);
					self.close();
				},
				error: function(request, status, error) {
					alert(error);
					return;
				}
			});
	    }
	} else {
		return false; 
	}
}

function fnChgFile(obj,target){
	var $target = $(target);
	var fileValue = $(obj).val().split("\\");
	var fileName = fileValue[fileValue.length-1];
	$target.val(fileName);

	checkFile(obj,target);
}

//파일업로드 체크
function checkFile(obj,target){
	var $id = $(target);
	//ie10 까지 지원가능하며 ie9는 에러가 발생한다.
	if ($(obj).get(0).files[0].size > 1024 * 1024 * 5 ) {
		alert('5MB 이하 파일만 등록할 수 있습니다.\n\n' + '현재파일 용량 : ' + ( Math.round($(obj).get(0).files[0].size / 1024 / 1024 * 100) / 100) + 'MB');
		$id.val("");
		obj.outerHTML = obj.outerHTML;
		$id.focus();
		return false;
    }
	
	var thumbext = "";
    if(typeof $id == "object"){
          thumbext = $id.val();
    } else {
          thumbext = $id.val();
    }
    thumbext = thumbext.slice(thumbext.lastIndexOf(".") + 1);
	
	if(thumbext != "jpg" && thumbext != "png" &&  thumbext != "gif" &&  thumbext != "jpeg"){
          alert('이미지 파일(jpg, png, gif, jpeg)만 등록 가능합니다.(소문자 확장자만 허용)');
          $id.val("");
          $id.focus();
          return false;
    }
	
	if( $id.attr("id") == "receipt" ) {
		var confirmTxt = "구매자 성명, 모델명, 품목, 상호, 직인(서명)이 포함된 거래내역서 사진을 첨부 하셨습니까?\n"
							+ "거래내역서에서 정확한 내역 확인이 불가능한 경우 , \n"
							+ "당첨 대상에서 제외될 수 있습니다.\n"
							+ "이미지 업로드 하시겠습니까?";
		
		var ck = confirm(confirmTxt);
	
		if(ck != true){//확인
	    	$("#receipt").val("");
	        $("#ptUpload3").val("");
	        return false;
		}
	}
	
	return true;
}

//이메일 체크 정규식
function chkEmail(str)
{
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(!reg_email.test(str))
	{
		return false;
	}
	return true;
}

//체크박스 라디오버튼 포커스이동
function scroll_move( id ){
    $( "#"+id ).focus();
    var objscrollTop = $("label[for='"+id+"']").offset();
    parent.$('html, body').stop().animate({scrollTop: objscrollTop.top}, 0);
}