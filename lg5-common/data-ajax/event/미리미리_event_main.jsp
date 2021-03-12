<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR" errorPage="/lgekr/common/error/error.jsp" %>
<%@ page import = "laf.support.collection.LData" %>
<%@ page import = "com.ipartners.common.util.CommonUtil" %>
<%@ page import = "com.ipartners.front.board.control.EventCommonJoinControl" %>
<%@ include file="/lgekr/membership/include/server_time.jsp" %>
<%
	LData paramData = CommonUtil.convertXSSGetData(request);
	paramData.setNullToInitialize(true);
	
	boolean tmpClose = false;
	String isOpen = "N";	// 이벤트 진행 여부 N:종료된 이벤트, Y:진행중인 이벤트
	
	int event_id = 6418;	//운영
	
	EventCommonJoinControl eventJoinControl = new EventCommonJoinControl();
	LData eventMasterData = new LData();
	eventMasterData.setInt("event_id", event_id);
	eventMasterData = eventJoinControl.selectEventMasterDetail(eventMasterData);
	
	String nowDate = eventMasterData.getString("nowDate");	// 현재 날짜 시간
	String eventStartTime = eventMasterData.getString("eventStartTime");	// 이벤트 시작 날짜 시간
	String eventEndTime = eventMasterData.getString("eventEndTime");
	String delDate = eventMasterData.getString("cDelDate");		// 이벤트 개인정보 삭제일
	
	if (Long.parseLong(nowDate) <= Long.parseLong(eventEndTime)) isOpen = "Y";	// 이벤트 진행 기간일 경우
	
	//뉴베서버점검 추가할자리- 정기점검 아닐 때 추가
	
	String strTime = nowDate;
		
		//2019. 08. 20 (화)  23:00 ~ 2019. 08. 21 (수) 09:00
		//String t1 = "20200609090000";//점검시작 -- test
		
		String t1 = "20200611230000";//점검시작
        String t2 = "20200612090000";//점검종료
         
		if (Long.parseLong(strTime) >= Long.parseLong(t1) && Long.parseLong(strTime) <= Long.parseLong(t2)) {
			%>
			<script type="text/javascript">
			    var txt = "멤버십 서비스 일시 점검으로 인해 현재 서비스 이용이 어렵습니다."
			            +"\n"
			            +"점검 시간 이후에 다시 시도 부탁드립니다."
			            +"\n"
			            +"\n"
			            +"점검 시간: 목요일 23:00 ~ 금요일 09:00";
			    //alert(txt);
				
		    	if(top){
			    	//top.location.href = "https://www.lge.co.kr/lgekor/main.do";
		    		top.location.href = "/lgekr/membership/include/main_system.jsp";
			    }else{
			    	//location.href = "https://www.lge.co.kr/lgekor/main.do";
			    	location.href = "/lgekr/membership/include/main_system.jsp";
			    }
			 
			</script>
			<%
		}		

	String channel = "lge_promo";
	if(!CommonUtil.checkNull(paramData.getString("channel")).equals("")) {
		channel = CommonUtil.checkNull(paramData.getString("channel"));
	}
	String kw = "01DA58";
	if(!CommonUtil.checkNull(paramData.getString("kw")).equals("")) {
		kw = CommonUtil.checkNull(paramData.getString("kw"));
	}
	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<title>LG전자</title>
<link rel="stylesheet" href="/lgekr/event/membership/2014/08/13_promo/css/style.css" type="text/css" />
<!-- Google Tag Manager 2018.1.10-->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P2BNJLN');</script>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P2BNJLN"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager -->
<!-- Google Tag Manager 2019.11.14 -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5RM2386');</script>
<!-- End Google Tag Manager -->

<script type="text/javascript" src="/lgekr/asset/js/loginside_mainscript.js"></script>
<script type="text/javascript" src="/lgekr/asset/js/jquery-1.7.2.js"></script>
<script type="text/javascript" src="/lgekr/asset/js/new_js/common_new.js"></script>
<script type="text/javascript" src="/lgekr/event/membership/2014/08/13_promo/js/common.js"></script>
</head>

<body>
<!-- Google Tag Manager (noscript)  2019.11.14 -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RM2386"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<!-- event_wr -->
<div class="event_wr">
	<div class="hidden_txt">
		<h1>LG전자</h1>
		<h2>2018 LG전자 EVENT</h2>
		<h3>고객님! 더 필요하신 제품 없으세요? 미리미리 페스티벌!</h3>
		<dl>
			<dt>응모기간</dt>
			<dd>매월 1일 ~ 말일까지</dd>
			<dt>발표일</dt>
			<dd>매월 15일 추첨 (대표사이트 공지/개별연락)</dd>
		</dl>
		<p>구입 희망 제품에 체크만 하면 매월 푸짐한 선물이 팡팡!</p>		
		<p>이벤트 참여하기를 통해 구입 희망 제품을 선택하시면 매월 추첨을 통해 멤버십 포인트를 적립해 드립니다 </p>
		<dl>
			<dt>1등(1명)</dt>
			<dd>멤버십 포인트 50만 증정!</dd> 
			<dt>2등(3명)</dt>
			<dd>멤버십 포인트 30만 증정!</dd> 
			<dt>3등(30명)</dt>
			<dd>멤버십 포인트 5만 증정!</dd>
		</dl>
		<h4>미리미리 페스티벌 참여방법</h4>
		<ol>
			<li>STEP 01. 본인인증/멤버십 가입</li>
			<li>STEP 02. 구입희망 제품 선택</li>
			<li>STEP 03. 응모완료!</li>
		</ol>
		<p>아래 버튼을 누르시면 이벤트 참여를 위한 본인인증 및 구입희망 제품선택 페이지로 이동합니다. </p>		
	</div>
<% if(isOpen.equals("Y")) { %>
	<a href="#none" onclick="pop_type('1','/lgekr/event/membership/2014/08/13_promo/membership_promotion.jsp?event_id=<%=event_id %>&amp;kw=<%=kw %>&amp;channel=<%=channel %>','690','900')" class="btn_blank btn_participation">이벤트 참여하기</a>
<% } %>

<!-- 2018년 미리미리 이벤트 경로연결 Start 20181218 삭제
<a href="/lgekr/event/bestshop/2017/11/17_festival_2018/event_main.html" class="btn_link" target="_blank">자세히보기</a>
2018년 미리미리 이벤트 경로연결 End-->

	<div class="hidden_txt">
		<dl>
			<dt>잠깐! 멤버십고객이 아니시라면?</dt>
			<dd>본 행사는 LG bestshop 멤버십 가입자 대상 이벤트로, 멤버십 가입 고객이 아니실 경우 멤버십 가입 (동의절차 추가진행) 과 함께 이벤트에 참여 하실 수 있습니다.</dd>
		</dl>
		<h4>꼭 알아두세요!</h4>
		<ul>
			<li>당첨자 발표 후 7일간 연락이 되지 않는 경우 당첨이 취소됩니다. </li>
			<li>LG전자 베스트샵 멤버십 고객에 한하여 당첨 시 멤버십 포인트가 적립됩니다.</li>
			<li>상기 멤버십 포인트는 당사 사정에 따라 변경될 수 있습니다. </li>
			<li>멤버십 포인트는 양도가 불가능합니다. </li>
			<li>멤버십 포인트는 이벤트 응모 시 작성된 참여자 정보를 기준으로 지급됩니다. </li>
		</ul>
	</div>
</div>
<!-- //event_wr -->	
</body>
</html>
