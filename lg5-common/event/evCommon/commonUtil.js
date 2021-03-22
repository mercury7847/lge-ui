	/**
	 * commonUtil.js
	 * 공통 함수 js
	 */


	/** 이미지 path 자르기
	 * @param reqStr : 이미지 full path
	 * @param filNm : 이미지 name
	 * @param subStr : full path에서 자를 기준이 될 string (ex./upload/)
	 */
	function fnImageUrl(reqStr, filNm, subStr){

		var orgStr = reqStr;

		if(orgStr != null && orgStr.length > 0){

			orgStr = orgStr.replace(/\\/g,"/");

			if(subStr != null && subStr.length > 0 && orgStr.indexOf(subStr) > -1){
				var subIdx = orgStr.indexOf(subStr);
				retUrl = orgStr.substring(subIdx).replace(filNm,"")+ filNm;
			}
		}

		return retUrl;
	}


	/** 우편번호 팝업 호출
	 * @param zipcode : 우편번호가 리턴 될 객체 id
	 * @param addr1 : 주소가 리턴 될 객체 id
	 * @param addr2 : 살세 주소가 리턴 될 객체 id
	 * @param seq : 주소 seq가 리턴 될 객체 id
	 */
	function openZipcodePopup(zipcode, addr1, addr2, seq){

		var param = "zipcode="+zipcode+"&addr1="+addr1 +"&addr2="+addr2+"&seq="+seq;

		window.open("/lgekor/common/commonZipcode.do?" + param ,"pop","width=480,height=646,scrollbars=no,resizable=no,copyhistory=no,toolbar=no");

	}
	
	/**다음 우편번호 팝업 서비스 호출
	 * 2017.03.30 심미정 추가
	 * @param postCode : 우편번호가 리턴 될 객체 id (5자리 새우편번호 사용)
	 * @param customerBasAddr : 주소가 리턴 될 객체 id
	 * @param receieveZipSeq : 주소 seq가 리턴 될 객체 id (도로명 코드값) 
	 * @param customerDtlAddr : 상세 주소 입력필드_사용자가 직접입력
	 * @param userSelectedType : 사용자가 선택한 주소 타입
	 */
	function OpenpostCodePopup() {
		daum.postcode.load(function(){
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
	                document.getElementById('receieveZipSeq').value = data.zonecode;//우편번호로 저장
	                document.getElementById('userSelectedType').value = data.userSelectedType;//주소 타입
	
	                // 커서를 상세주소 필드로 이동한다.
	                document.getElementById('customerDtlAddr').focus();
	            }
	        }).open();
	        });
	    }

	/**
	 * 카테고리 ID를 기준으로 메뉴의 url을 가져오기. 이 함수를 사용하기 위해서는 메뉴정보를 json형태로 변환한 것을 이용한다.
	 * jsp단에서 <script>var frontMenuJson = ${HpTag:getMenuJson(menuInfo, "")};   fnGetMenuUrlByCateId(frontMenuJson, 'cateId');</script> 형태로 사용하시면 된다.
	 * @param frontMenuJson : 메뉴 정보 json 객체
	 * @param cateId : 조회할 제품 카테고리 코드
	 */
	function fnGetMenuUrlByCateId(frontMenuJson, cateId){
		var menuUrl = "";
		if(typeof frontMenuJson !== 'undefined' && typeof cateId !== 'undefined'){
			for(menuCode in frontMenuJson){
				if(typeof frontMenuJson[menuCode] !== 'undefined' ){
					if(typeof frontMenuJson[menuCode]['menuKeyword'] !== 'undefined'){
						if($.trim(frontMenuJson[menuCode]['menuKeyword']) == $.trim(cateId)){
							menuUrl = frontMenuJson[menuCode]['url'];
							return menuUrl;
						}
					}
				}
			}
		}
		return menuUrl;
	}

	/**
	 * 이용약관/개인정보전문 보기 새창
	 * @param part
	 * @param fsite
	 * @param category
	 * @param usearea
	 */
	function openAgreementPopup(part, fsite, category, usearea){
		var width = 770;
		var height = 810;
		var xpos = (screen.availWidth - width)/2;
		var ypos = (screen.availHeight - height)/2;

		var url = "/lgekor/common/commonAgreementDetailPopup.do?part=" + part + "&fsite=" + fsite + "&category=" + category + "&usearea=" + usearea;
		window.open(url, '', 'width='+width+',height='+height+',left='+xpos+',top='+ypos+',menubar=no,resizable=no,directories=no,location=no');
	}

	/**
	 * 필수위탁고지/전문보기
	 * @param part
	 * @param fsite
	 * @param category
	 * @param usearea
	 */
	function openConsignmentPopup( part, fsite, category, usearea){
		var width = 454;
		var height = 404;
		var xpos = (screen.availWidth - width)/2;
		var ypos = (screen.availHeight - height)/2;

		var url = "/lgekor/common/commonConsignmentDetail.do?part=" + part + "&fsite=" + fsite + "&category=" + category + "&usearea=" + usearea;

		window.open(url,'','width='+width+',height='+height+',left='+xpos+',top='+ypos+',menubar=no,resizable=no,directories=no,location=no');
	}

	/**
	 * 팝업창 화면 중앙에 띄우기
	 * @param url
	 * @param winName
	 * @param width
	 * @param height
	 */
	function openPopupCenter( url, winName, width, height){
		var xpos = (screen.availWidth - width)/2;
		var ypos = (screen.availHeight - height)/2;

		if(typeof url === 'undefined'){
			return;
		}
		if(typeof winName === 'undefined'){
			winName = '';
		}
		var option = 'width='+width+',height='+height+',left='+xpos+',top='+ypos+',menubar=no,resizable=no,directories=no,location=no';

		var win = window.open(url, winName, option);
		win.focus();
	}

	function amountFormat(n) {
		var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
		n += "";                          // 숫자를 문자열로 변환

		while (reg.test(n)) {
			n = n.replace(reg, "$1" + "," + "$2");
		}

	  return n;
	}

	/**
	 * 페이지 이동
	 * @param url	이동할 페이지의 url
	 */
	function fnMovePage(url){
		location.href=url;
	}

	//쿠키값 세팅
	function fnSetCookie(cName, cValue, cDay){
		var expire = new Date();
		expire.setDate(expire.getDate() + cDay);
		document.cookie = cName + "=" + escape(cValue) + "; path=/; expires=" + expire.toGMTString() + ";";
	}

	//쿠키값 출력
	function fnGetCookie(cName){
		cName = cName + "=";
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cName);
		var cValue = "";

		if(start != -1){
			start += cName.length;
			var end = cookieData.indexOf(";", start);

			if(end == -1){
				end = cookieData.length;
			}

			cValue = cookieData.substring(start, end);
		}
		return unescape(cValue);
	}

	//쿠키 삭제
	function fnDelCookie(cName) {
		var expire = new Date();
		expire.setDate(expire.getDate() - 1); //-1: 쿠키 삭제
		document.cookie = cName + "=; path=/; expires=" + expire.toGMTString() + ";";
	}
	
	/**
	 * 로그인
	 * @param serverType
	 * @returns 로그인 url
	 */
	function fnLoginEvent(serverType)  {
		var forceLoginPageTemp = "";
		var url = "/lgekor/sso/RetrieveForceLoginPageAjax.do?clientId=lge-main";
		$.ajax({
			type : "POST",
			url : url,
			async : false,
			cache : false,
			dataType : "json",
			success : function(data){
				forceLoginPageTemp = data.forceLoginPage;
			},
			error:function(e,status,se){
				forceLoginPageTemp = "false";
			}
		});
			
		var defaultUrl= "";
		var fixUrl=""; 
		
		if (serverType=="L") {
			// 테스트
			defaultUrl="http://devlogin.lge.co.kr/oauth/authorize";
			fixUrl = "http://"+userIp+":8080/lgekor/sso/LogInComplete.do";
		} else if (serverType=="T") {
	    	// 스테이징 
			defaultUrl="http://devlogin.lge.co.kr/oauth/authorize";
			fixUrl = "http://165.244.60.202:6120/lgekor/sso/LogInComplete.do";
		} else if (serverType=="R") {
	    	// 운영 
	    	defaultUrl="https://login.lge.co.kr/oauth/authorize";
			fixUrl = "https://www.lge.co.kr/lgekor/sso/LogInComplete.do";
		} else {
			defaultUrl="http://devlogin.lge.co.kr/oauth/authorize";
			fixUrl = "http://"+userIp+":8080/lgekor/sso/LogInComplete.do";
		}
	    var url= top.location.href + "," + "lge-main";
	    var totUrl=encodeURIComponent(url);
		var client_id="?client_id=lge-main";
		var response_type="&response_type=code";
		var scope="&scope=member-read";
		var forceLogin="&forceLogin=false";
		var state="&state="+totUrl;
		var redirect_uri="&redirect_uri="+fixUrl;
		var forceLoginPage = "&forceLoginPage="+forceLoginPageTemp;
		var allUrl=defaultUrl+client_id+response_type+scope+forceLogin+state+forceLoginPage+redirect_uri;
	    //console.log(allUrl);
	    return allUrl;
	}
	/**
	 * 회원가입
	 * @param serverType
	 * @returns 회원가입 url
	 */
	function fnMemInfoJoinEvent(serverType, clientId)  {
		var defaultUrl="";
		if (serverType=="R") {
			// 운영
	        defaultUrl="https://member.lge.co.kr/auth/comnInfo.do";
		} else {
	    	defaultUrl="http://devmember.lge.co.kr:6080/auth/comnInfo.do";
		}
	
		if(clientId === 'undefined' || clientId === undefined){
			clientId = "lge-main";
			console.log("clientId "+"undefined");
		}
		var fixUrl=top.location.href;
	    var url=top.location.href + "," + clientId;
	    //console.log(url);
	    var totUrl=encodeURIComponent(url);
	    //console.log(totUrl);
	    var client_id="?client_id="+clientId;
		var state="&state="+totUrl;
		var redirect_uri="&redirect_uri="+encodeURIComponent(fixUrl);
		var allUrl=defaultUrl+client_id+state+redirect_uri;
		return allUrl;
	}
	
	
	/**
	 * 회원정보 수정
	 * @param serverType
	 * @returns 회원가입 url
	 */
	function fnMemInfoChangeEvent(serverType)  {
		var defaultUrl="";
		if (serverType=="R") {
	    	defaultUrl="https://member.lge.co.kr/auth/changeInfo.do";
		} else {
			// 개발 
	        defaultUrl="http://devmember.lge.co.kr:6080/auth/changeInfo.do";
		}

		var fixUrl=""
		if (serverType=="L") {
		    fixUrl = "http://"+userIp+":8080/lgekor/sso/LogInComplete.do";
		} else if (serverType1=="T") {
		    fixUrl = "http://165.244.60.202:6120/lgekor/sso/LogInComplete.do";
		} else if (serverType1=="R") {
		    fixUrl = "https://www.lge.co.kr/lgekor/sso/LogInComplete.do";
		} else {
		    fixUrl = "http://"+userIp+":8080/lgekor/sso/LogInComplete.do";
		}
	    var url=location.href + "," + "lge-main";
	    //console.log(url);
	    var totUrl=encodeURIComponent(url);
	    //console.log(totUrl);
		var client_id="?client_id=lge-main";
		var state="&state="+totUrl;
		var redirect_uri="&redirect_uri="+fixUrl;
		var allUrl=defaultUrl+client_id+state+redirect_uri;
		return allUrl;
	}
	
	/**
	 *세션 처리 및 쿠키 삭제
	*/
	function eventSessionOut(){
		$.ajax({
	        async: false,
	        cache: false,		
	        type: "POST",
	        url : '/lgekor/event/common/event_sso_session.jsp',
	        success: function(response, status, error) {
	        	console.log("outSession success");
	        }
		});
	}
	
	/**
	 * ForceLogin true 로그인
	 * @param serverType
	 * @returns 로그인 url
	 */
	function fnForceLoginEvent(serverType)  {
		//세션 및 쿠키 삭제 
		eventSessionOut();
		
		var forceLoginPageTemp = true;
		
		var defaultUrl= "";
		var fixUrl=""; 
		
		if (serverType=="L") {
			// 테스트
			defaultUrl="http://devlogin.lge.co.kr/oauth/authorize";
			fixUrl = "http://"+userIp+":8080/lgekor/sso/LogInComplete.do";
		} else if (serverType=="T") {
	    	// 스테이징 
			defaultUrl="http://devlogin.lge.co.kr/oauth/authorize";
			fixUrl = "http://165.244.60.202:6120/lgekor/sso/LogInComplete.do";
		} else if (serverType=="R") {
	    	// 운영 
	    	defaultUrl="https://login.lge.co.kr/oauth/authorize";
			fixUrl = "https://www.lge.co.kr/lgekor/sso/LogInComplete.do";
		} else {
			defaultUrl="http://devlogin.lge.co.kr/oauth/authorize";
			fixUrl = "http://"+userIp+":8080/lgekor/sso/LogInComplete.do";
		}
	    var url= top.location.href + "," + "lge-main";
	    var totUrl=encodeURIComponent(url);
		var client_id="?client_id=lge-main";
		var response_type="&response_type=code";
		var scope="&scope=member-read";
		var forceLogin="&forceLogin=false";
		var state="&state="+totUrl;
		var redirect_uri="&redirect_uri="+fixUrl;
		var forceLoginPage = "&forceLoginPage="+forceLoginPageTemp;
		var allUrl=defaultUrl+client_id+response_type+scope+forceLogin+state+forceLoginPage+redirect_uri;
	    //console.log(allUrl);
	    return allUrl;
	}
	
