// 주소창 자동 닫힘
// 2012.02.01 Cross Browsing 분기 추가 by박동근
if(window.attachEvent){
	window.attachEvent("onload", function(){ setTimeout(loaded, 100);} );
}else if(window.addEventListener){
	window.addEventListener("load", function(){ setTimeout(loaded, 100);}, false);
}else if(document.addEventListener){
	document.addEventListener("load", function(){ setTimeout(loaded, 100);}, false);
}

function loaded(){
	window.scrollTo(0,1);
}

/**
 * 기능 : 이메일 발송
 * 작성일(자) : 2011.07.04(mira.ahn)
 * @param cCode : 이메일 발송테이블 키
 * @param cAcademyCode: 이메일 발송테이블 키
 */
function sendEmail(cCode, cAcademyCode){
	var frm = document.emailFrm;
	frm.cCode.value = cCode;
	frm.cAcademyCode.value = cAcademyCode;
	frm.target = "emailFrame";
	frm.action = "";
	frm.submit;
}

/**
 * 기능 : 제품카테고리 오픈 팝업
 * 작성일(자) : 2011.07.05(eunsook.kim)
 * @param svcType : 호출하는 메뉴에 따라 분기
 *               = 1 : 출장
 *               = 2 : 방문
 *               = PRDSELF : 제품자가진단
 */

function categoryLayer(svcType) {
	location.hash = "";
	var theURL = "SelectCategoryListCmd.laf?svcType=" + svcType;
	document.getElementById("popupLayerFrame").src = theURL;
	document.getElementById("mainDiv").style.display = "none";
	document.getElementById("popupLayer").style.display = "block";
}

function categoryLayerNoHash(svcType) {
	var theURL = "SelectCategoryListCmd.laf?hash=nouse&svcType=" + svcType;
	document.getElementById("popupLayerFrame").src = theURL;
	document.getElementById("mainDiv").style.display = "none";
	document.getElementById("popupLayer").style.display = "block";
}

function closePopupLayer(hashName) {
	(document.getElementsByTagName("body"))[0].innerHTML = "";
	parent.document.getElementById("mainDiv").style.display = "block";
	parent.document.getElementById("popupLayer").style.display = "none";
	if(hashName != "nouse") {
		if(hashName != null && hashName != "")
			parent.location.hash = hashName;
		else
			parent.location.hash = "categoryReturnPoint";
	}
}

function historyBack() {
	if(qrid != null && qrid != undefined && qrid != ""){
		location.href = "/mobile/SmartCareMainCmd.laf?qrid="+qrid;
	}else if(modelName != null && modelName != undefined && modelName != ""){
		location.href = "/mobile/AdviceAppMainCmd.laf?modelName=" + modelName;
	}else{
		location.href = "/mobile/MobileMainCmd.laf";
	}

}

function historyBack(tabno) {
	if(qrid != null && qrid != undefined && qrid != ""){
		location.href = "/mobile/SmartCareMainCmd.laf?qrid="+qrid;
	}else if(modelName != null && modelName != undefined && modelName != ""){
		location.href = "/mobile/AdviceAppMainCmd.laf?modelName=" + modelName;
	}else{
		location.href = "/mobile/MobileMainCmd.laf?tabno=" + tabno;
	}
}

/**
 * 기능 : Cookie를 설정한다.
 * 작성일(자) : 2011.07.15(sungjin.ong)
 * @param name : Cookie명
 * @param value : Cookie 값
 * @param expiredDay : Cookie 유지 기간
 */
function setCookie(name, value, expiredDay)
{
	// web Storage
	if (window.localStorage){
		localStorage.setItem ( name, value );
	// cookie
	} else {
		var toDayDate = new Date();
		toDayDate.setDate(toDayDate.getDate() + expiredDay);
		document.cookie = name + "=" + escape(value) + "; path/; expires=" + toDayDate.toGMTString() + ";";
	}
}

/**
 * 기능 : Cookie를 설정된 값을 가져온다.
 * 작성일(자) : 2011.07.15(sungjin.ong)
 * @param name : Cookie명
 */
function getCookie(name)
{
	var retValue = "";

	if (name == "" || name == "null")
		retValue;

	// web Storage
	if (window.localStorage){
		retValue = localStorage.getItem(name);
	// cookie
	} else {
		var cookieObj = document.cookie;
		var cookieList = unescape(cookieObj).split(";");

		for(var i = 0; i < cookieList.length; i++)
		{
			var cookieFull  = cookieList[i].split("=");
			var cookieName  = cookieFull[0].replace(" ", "");
			var cookieValue = cookieFull[1];

			if (name == cookieName) {
				retValue = cookieValue;
				break;
			}
		}
	}
	if(!retValue){ //"null"이면
		retValue ="";
	}

	return retValue;
}

/**
 * 기능 : Cookie를 삭제한다.
 * 작성일(자) : 2011.07.15(sungjin.ong)
 * @param name : Cookie명
 */
function deleteCookie(name)
{
	// web Storage
	if (window.localStorage){
		localStorage.removeItem(name);
	// cookie
	} else {
		var toDayDate = new Date();
		toDayDate.setDate(toDayDate.getDate() - 1);
		document.cookie = name + "=" + escape("") + "; path/; expires=" + toDayDate.toGMTString() + ";";
	}
}
//숫자만 입력되도록 2012-07-23 hyunseok.woo
function onlyNumber(obj) {
	$(obj).val($(obj).val().replace(/\D/g,""));
    //obj.value = obj.value.replace(/\D/g,"");

}//영어와 숫자만 입력되도록 2012-07-23 hyunseok.woo 2015-03-24 jys(공백제거)
function onlyKorEng(obj){
	 if(event.keyCode < 65 || (event.keyCode > 122 && event.keyCode <= 127) || (event.keyCode > 90 && event.keyCode <= 96)){
		 return false;
	 } else {
		 return true;
	 }
}
//성명 입력값 체크 2012-07-24 hyunseok.woo 2015-03-24 jys(공백제거)
function userNameConfirm(obj) {
	var namePattern = /[^(가-힝a-zA-Z)]/;
    if (namePattern.test($(obj).val())) {
    	alert("이름은 한글, 영문만 가능합니다.");
    	$(obj).focus();
    	return false;
    } else {
    	return true;
    }
}
//이메일 입력값1 체크 2012-07-24 hyunseok.woo
function emailFirstTextConfirm(obj) {
	 if (!(event.keyCode >=37 && event.keyCode<=40)) {
         var inputVal = $(obj).val();
         $(obj).val(inputVal.replace(/[^a-z0-9_.\\-]/gi,''));
     }
}
//이메일 입력값2 체크 2012-07-24 hyunseok.woo
function emailSecondTextConfirm(obj) {
	 if (!(event.keyCode >=37 && event.keyCode<=40)) {
         var inputVal = $(obj).val();
         $(obj).val(inputVal.replace(/[^a-z0-9.]/gi,''));
     }
}
/**
 * 기능 : 본문 텍스트 크기 크게 작게 조정
 * 작성일(자) : 2011.07.19(mira.ahn)
 * @param name : 크게('zoomin'), 작게('zoomout')
 */
function setZoom(flag){
	if(flag=="zoomin"){//크게를 누르면
		$("#zoomin").hide();//크게 버튼 hidden
		$("#zoomout").show();//작게 버튼 show
		$("#content").removeClass("txtZoomout");//본문내용 크게
		$("#content").addClass("txtZoomin");//본문내용 크게
	}else{//작게를 누르면
		$("#zoomout").hide();//작게 버튼 hidden
		$("#zoomin").show(); //크게 버튼 show
		$("#content").removeClass("txtZoomin");//본문내용 크게
		$("#content").addClass("txtZoomout");//본문내용 작게
	}
}

/**
 * 기능 : twit에 짧은 메세지와 링크 URL 보내기
 * 작성일(자) : 2011.07.20(sungjin.ong)
 * 수정자(자) : 2011.09.02(mira.ahn) [LG전자서비스센터] prefix 적용
 * @param msg : twit할 짧은 메세지
 * @param linkURL : 링크 URL (예 : 서비스센터 페이지 URL)
 */
function twitInit(msg, linkURL) {
	msg = "[LG전자서비스센터] " + msg;
//	var twitURL = "http://twitter.com/home?status=" + encodeURI(msg) + " " + linkURL;
	var twitURL = "http://twitter.com/share?url=" + encodeURI(linkURL) + "&text=" + encodeURI(msg)
	//	window.open(twitURL ,"_TWIT","");
	location.href = twitURL;
}

/**
 * 기능 : facebook에 링크 URL 보내기
 * 작성일(자) : 2011.07.20(sungjin.ong)
 * 수정일(자) : 2011.09.05(mira.ahn) -- 타이틀 추가
 * @param linkURL : 링크 URL (예 : 서비스센터 페이지 URL)
 */
//encodeURI(
function facebookInit(title, url) {
	title = "[LG전자서비스센터]" + title;
	//페이지북이 유효한 페이지 인지 체크 함.
	var facebookURL = "http://m.facebook.com/sharer.php?u="+encodeURIComponent(url)+"&title="+title;
	// window.open(facebookURL , "_FB", "");
	location.href = facebookURL;
}

/**
 * 기능 : 텍스트 입력 글자수 제한
 * 작성일(자) : 2011.07.28(eunsook.kim)
 * @param  obj       : 호출되는 object
 *         maxLength : 입력 가능한 최대 길이
 *	       descYn    : 입력 글자수 표시 여부
 *	       descId    : 입력 글자수 표시되는 곳의 id
 *         txt       : alert창 표시내용
 */
function charCheck(obj, maxLength, descYn, descId, txt) {
	var str = obj.value;
	var tmpLen = 0;			// 입력된 문장의 length
	var strLen = 0;			// 화면상 표시될 length
	var maxLen = maxLength; // 입력 가능한 최대 length

	for( var i = 0; i < str.length ; i++ ) {
		temp = str.charAt(i);
		tmpLen++; //한글/영문 모두 1자로 처리

		if( tmpLen > maxLen ) {
			alert(txt + "은(는) 최대 " + maxLen + "자까지 입력 가능합니다.");
			obj.value = str.substring(0, i);
			return;
		}else strLen = tmpLen;
	}
	if (descYn == 'Y') $("#"+descId).text(strLen);  //글자수 증가 표시
}

/**
 * 기능 : 로그인을 필요로하는 메뉴에 대한 제어
 * 작성일(자) : 2011.08.05(sungjin.ong)
 * @param name : 메뉴ID
 */
function goMyPage(menu) {
	var returnUrl = "";
	var loginId = globalLoginId;
	if (menu == "myQna"){//묻고답하기내역조회
		returnUrl = "/mobile/SelectMyQnaListCmd.laf";
	}else if (menu == "myProduct"){//구입내역조회
		returnUrl = "/mobile/SelectProductListCmd.laf";
	}else if (menu == "createMyProduct"){//제품등록
		returnUrl = "/mobile/CreateProductFormCmd.laf";
	}else if (menu == "modifyMember"){//회워정보수정
		returnUrl = "/mobile/ModifyMemberFormCmd.laf";
	} else if (menu == "modifyPassword"){//비밀번호변경
		returnUrl = "/mobile/ModifyMemberPasswordFormCmd.laf";
	}else if (menu == "deleteMember"){//사용안함 - 탈퇴
		returnUrl = "/mobile/DeleteMemberFormCmd.laf";
	}else if (menu == "createQna"){//묻고답하기 등록
		returnUrl = "/mobile/CreateQnaFormEmptyCmd.laf";
	}
	if (loginId != ""){
		location.href = returnUrl;

	} else {
		alert("로그인 후 이용할 수 있는 서비스입니다.");
		location.href = "/mobile/MemberLoginFormCmd.laf?returnUrl="+returnUrl;
	}
}
/**
 * 기능 : QR을 통해 저장된 ModelNo를 각 페이지에 맞게 파라미터로 전달
 * 작성일(자) : 2011.07.25(mira.ahn)
 * @param name : 메뉴ID
 */
function goQrPage(menu) {
	var returnUrl = "";
	var modelNo = getCookie("qrModelNo");

	if(modelNo != ""){
		if (menu == "prdSelf"){
			returnUrl = "/mobile/SelectPrdSelfSearchListEmptyCmd.laf?subkeyword=" + modelNo;
		}else if (menu == "qna"){
			returnUrl = "/mobile/SelectQnaSearchListEmptyCmd.laf?subkeyword=" + modelNo;
		}else if (menu == "faq"){
			returnUrl = "/mobile/SelectFaqSearchListEmptyCmd.laf?subkeyword=" + modelNo;
		}else if (menu == "prdUse"){
			returnUrl = "/mobile/SelectPrdUseModelNoListCmd.laf?model=" + modelNo;
		}else if (menu == "driver"){
			returnUrl = "/mobile/SelectDriverModelNoListCmd.laf?model=" + modelNo;
		}else if (menu == "shop"){
			returnUrl = "/mobile/SelectShopSearchListEmptyCmd.laf?subkeyword=" + modelNo;
		}
	}else{
		if (menu == "prdSelf"){
			returnUrl = "/mobile/SelectPrdSelfListCmd.laf";
		}else if (menu == "qna"){
			returnUrl = "/mobile/SelectQnaListCmd.laf";
		}else if (menu == "faq"){
			returnUrl = "/mobile/SelectFaqListCmd.laf";
		}else if (menu == "prdUse"){
			returnUrl = "/mobile/SelectPrdUseIndexCmd.laf";
		}else if (menu == "driver"){
			returnUrl = "/mobile/SelectDriverIndexCmd.laf";
		}else if (menu == "shop"){
			returnUrl = "/mobile/SelectShopProductListCmd.laf";
		}
	}

	location.href = returnUrl;
}

/**
 * 기능 : 로딩이미지를 클릭한 객체 높이에 띄우기
 * 작성일(자) : 2011.08.08(mira.ahn)
 * @param name : 클릭객체아이디ID
**/
function showLoading(id){
//	var top = jQuery("#" + id).offset().top ;
//jquery 1.8에서 작동안해 강제로 0으로 설정 hyunseok.woo 2013-07-11
	var top = 0;
	$("#"+id).css({"position":"absolute", "top" : top+"px", "z-index":"10000", "display" : "block"});
}

/**
 * 기능 : 이용약과, 개인정보취급방침 팝업
 * 작성일(자) : 2011.08.17(mira.ahn)
 * @param name : seq
**/
function fullTermsPop(cSeq) {
	location.href = "/mobile/SelectTermsFullCmd.laf?cSeq="+cSeq;
	//window.open(src,"fullPop","toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=no");
}

/**
 * 기능 : 모든 팝업레이어를 띄울 경우 페이지 상단이 보이도록 수정
 * 작성일(자) : 2012.05.31(agger.lim)
 * @param name :
**/
var jq=jQuery;
jq("#popupLayerFrame").load(function(e){
	if(jq('#popupLayerFrame').attr('src') != '') {
		jq('html, body',parent.document).animate({scrollTop:0}, 'fast');
	}
});

function twitInitMobile(msg, linkURL) {
//	msg = "[LG전자서비스센터] " + msg;
//	msg = msg.replace("@n", "\n");
	msg = msg.split("@n").join("\n");
//	var twitURL = "http://twitter.com/home?status=" + encodeURI(msg) + " " + encodeURIComponent(linkURL);
	var twitURL = "http://twitter.com/share?url=" + encodeURI(linkURL) + "&text=" + encodeURI(msg);
	location.href = twitURL;
	return false;
}

function facebookInitMobile(title, url) {
//	title = "[LG전자서비스센터]" + title;
	//페이지북이 유효한 페이지 인지 체크 함.
//	var facebookURL = "http://m.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url)+"&title="+encodeURI(title);
//	var facebookURL = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(location.href);
//	var facebookURL = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(url);
//	title = title.replace("@n", "\n");
	title = title.split("@n").join("\n");
	var facebookURL = "http://www.facebook.com/sharer.php?u="+encodeURIComponent(url)+"&t="+encodeURIComponent(title);
	location.href = facebookURL;
	return false;
}

function metodayInitMobile(title, url) {
	title = "[LG전자서비스센터]" + title;
	//var metodayURL = 'http://me2day.net/posts/new'
	//				    + '?new_post[body]="'+encodeURI(title)+'":'+encodeURIComponent(url)
	//				    + '&new_post[tags]='+encodeURI("LG전자서비스센터");
	var metodayURL = 'http://me2day.net/plugins/mobile_post/new'
	    + '?new_post[body]="'+encodeURI(title)+'":'+encodeURIComponent(url)
	    + '&new_post[tags]='+encodeURI("LG전자서비스센터");
	location.href = metodayURL;
	return false;
}
/**
 * 기능 : kakaotalk에 링크 URL 보내기
 * 작성일(자) : 2013.12.17(hyunseok.woo)
 * 수정일(자) :
 * @param linkURL : 링크 URL (예 : 서비스센터 페이지 URL)
 */
//encodeURI(
function kakaotalkInitMobile(title, url) {
//	var appid = "LGSERVICE"; // 아무거나 uniq한 것으로 적어주세요.
//	var appver = "2.0"; // 아무 버전이나 적어주세요.
//	var appname = "LG전자 서비스"; // 아무거나 적어주세요.
//	var link = new com.kakao.talk.KakaoLink(title, url, appid, appver, appname);
//	link.execute();
//-------신 버전 20150504 hyunseok.woo-------
//    Kakao.init("76d7fe50ea31a67f8798e0e877b27738"); //네이티브 앱키
//    Kakao.init("f87d505d3bbcdfe51b67ac2ac04a9ba7"); //REST API 키
   Kakao.init("37b59682d50ffa3f40a7d8ad6a78604e"); //Javascript 키
//    Kakao.init("28bd74660101a7fda5c067ec04e82eec"); //Admin 키
   var msg = (title.replace("@n", "\n") + "\n\n" + url);
	Kakao.Link.sendTalkLink({
	    label: msg
	});
}

function yozmInitMobile(title, url) {
	title = "[LG전자서비스센터]" + title +" "+ url;
	var yozmURL = 'http://m.yozm.daum.net/user/message/post'
					    + '?prefix='+encodeURI(title);
	location.href = yozmURL;
	return false;
}

//모바일 리뉴얼 공통 시작//////////////////////////////
/**
 * 기능 : 불필요한 리스트 감춤
 * 작성일(자) : 2012.10-09(hyunseok.woo)
 * @param name :
**/
function forEachHide() {
	$(this).hide();
}
/**
 * 기능 : 불필요한 리스트 보이기
 * 작성일(자) : 2012.10-09(hyunseok.woo)
 * @param name :
**/
function forEachShow() {
	$(this).show();
}

/**
 * 기능 : 레이어 팝업 닫기
 * 주의 : 아이디를 맞춰줘야함
 * 작성일(자) : 2012.10-09(hyunseok.woo)
 * @param name :
**/
/*
function closePopupLayer() {
	$("#popupLayer").hide();
	$("#mainDiv").show();
}
*/
/**
 * 기능 : 제품선택 레이어 팝업 open
 * 주의 : 카테고리 선택 레이어 팝업 시 사용
 * 작성일(자) : 2012.10-09(hyunseok.woo)
 * @param name :
**/
//카테고리 레이어 닫기
function closeCategoryLayer() {
	$("#mainDiv").show();
	$("#popupLayer").hide();
	$("footer").show();
}

function mobileDriverModelSearch() {
	var searchText = $("#searchText").val();
	if(searchText.length >= 2) {
		mobileDriverModel(searchText);
	} else {
		alert("모델명을 3글자 이상 입력해 주세요.");
		$("#modelName").focus();
	}
}
//페이지 이동
function goMovePage(pId, pAction) {

	var f = document.getElementById(pId);

  	f.action = pAction;
  	f.submit();
}

//쿠키 생성
function setCookie(cName, cValue, cDay){
     var expire = new Date();
     expire.setDate(expire.getDate() + cDay);
     cookies = cName + '=' + escape(cValue) + '; path=/ '; // 한글 깨짐을 막기위해 escape(cValue)를 합니다.
     if(typeof cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';
     document.cookie = cookies;
}

// 쿠키 가져오기
function getCookie(cName) {
     cName = cName + '=';
     var cookieData = document.cookie;
     var start = cookieData.indexOf(cName);
     var cValue = '';
     if(start != -1){
          start += cName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          cValue = cookieData.substring(start, end);
     }
     return unescape(cValue);
}

//대문자변환
function toUpperCase(obj){

	obj.value = obj.value.toUpperCase();
}

//한글검색불가
function checkText(obj){

	if(is_han(obj.value)){
		alert('한글을 입력할 수 없습니다.');
		return false;
	}
	return true;
}

//한글여부
function is_han(val) { //한글이 하나라도 섞여 있으면 true를 반환
	var judge = false;
	for(var i = 0; i < val.length; i++) {
		var chr = val.substr(i,1);

		chr = escape(chr);
		if (chr.charAt(1) == "u") {
			chr = chr.substr(2, (chr.length - 1));
			if((chr >= "3131" && chr <= "3163") || (chr >= "AC00" && chr <= "D7A3")) {
				judge = true;
				break;
			}
		}
		else judge = false;
	}
	return judge;
}

//메인페이지 이동
function goMainPage() {
	location.href = "/mobile/MobileMainCmd.laf";
}
//페이지 이동
function movePage(lafName) {
	var f = document.f;
	f.action = lafName;
	f.submit();
}
function cancelMovePage(lafName, searchType) {
	$("#searchType").val(searchType);
	movePage(lafName);
}
function goHistoryParent(prevAcptNo, prevAcptYyyy) {
	$("#acptNo").val(prevAcptNo);
	$("#rcptYyyy").val(prevAcptYyyy);
	$("#searchType").val("");
	$("#searchGubun").val("");
	$("#history").val("N");
	$("#prevAcptNo").val("");
	$("#prevAcptYyyy").val("");

	movePage('/mobile/SelectAsDetailCmd.laf');
}

//공통 레이어 닫기
function closeLayerPopup() {
	$("#mainDiv").show();
	$("#popupLayer").hide();
	$("footer").show();
}
//체크박스 클릭 이벤트
function clickEvent(id) {
	$(id).next().trigger("click");
}
