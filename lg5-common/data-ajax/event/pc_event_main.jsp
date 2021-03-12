<%@ page language="java" contentType="text/html; charset=EUC-KR"
	pageEncoding="EUC-KR"%>
<%@ page import="kor.hp.common.code.MemberInfoCommonCodes"%>
<!doctype html>
<html lang="ko">
<head>
<%@ include file="/WEB-INF/jsp/front/include/common_inc.jsp"%>
<%@ include
	file="/lgekor/event/pc/2021/01/04_pc/_include/include_thisEventCode.jsp"%>

<meta http-equiv="Content-Type" content="text/html; charset=euc-kr" />

<!-- css js 최신화   -->
<jsp:useBean id="now" class="java.util.Date" />
<fmt:formatDate value="${now}" pattern="yyyyMMddHHmmss" var="nowDate" />
<!-- css js 최신화 -->

<title>LG Electronics</title>
<meta name="viewport"
	content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=3.0" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<link rel="stylesheet"
	href="/lgekor/asset/event/pc/2021/01/04_pc/_include/css/style.css?dt=<c:out value="${nowDate}"></c:out>">

<%=googleCode%>
<%=googleGTM%>

<c:set var="mainLoginYn" value="<%=mainLoginYn%>"></c:set>
<c:set var="eventApplyYn" value="<%=eventApplyYn%>"></c:set>
<c:set var="serverType" value="<%=serverType%>"></c:set>
<c:set var="userName" value="<%=userName%>"></c:set>
<c:set var="mobileDdd"
	value="<%=CommonUtil.returnMobileNum(userTel, 0)%>"></c:set>
<c:set var="mobileNo1"
	value="<%=CommonUtil.returnMobileNum(userTel, 1)%>"></c:set>
<c:set var="mobileNo2"
	value="<%=CommonUtil.returnMobileNum(userTel, 2)%>"></c:set>

<c:set var="userIp" value="<%=MemberInfoCommonCodes.LOCAL_IP%>" />

<%
	//전화번호 가운데 마스킹처리
	String mobileDdd = CommonUtil.returnMobileNum(userTel, 0);
	String mobileNo1 = CommonUtil.returnMobileNum(userTel, 1);
	String mobileNo2 = CommonUtil.returnMobileNum(userTel, 2);

	String masksecond = "";
	if (mobileNo1 != null && !"".equals(mobileNo1)) {
		for (int i = 1; i <= mobileNo1.length(); i++) {
			masksecond += "*";
		}
	}
%>
<script type="text/javascript">
 var isOpen = "<%=isOpen %>";
 var isType = "<%=isType %>";<%-- clientType-> W : 웹 , M : 모바일 --%>
 
 var Checkdomain = "<%=Checkdomain %>";
 var serverType = "<c:out value='${ serverType }' />";
 var mainLoginYn  =  "<c:out value='${ mainLoginYn }' />";
 var eventApplyYn =  "<c:out value='${ eventApplyYn }' />";
 // 로컬 : L, 개발 : D, 스테이징 : T, 운영 : R
 var userIp = "${userIp}";
</script>

<script type="text/javascript"
	src="<LTag:webPath kind="js">jquery-1.11.1.min.js</LTag:webPath>"></script>
<script
	src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"></script>
<!-- 다음우편번호 서비스 이용시 필수 / commonUtil.js 보다 먼저 선언되어야함 -->
<script type="text/javascript"
	src="/lgekor/asset/js/jquery.rwdImageMaps.min.js"></script>
<!-- Html Img Map 동적으로 적용하기 -->
<script type="text/javascript"	src="/lgekor/asset/js/common/commonUtil.js?dt=<c:out value="${nowDate}"></c:out>"></script>
<script type="text/javascript"	src="/lgekor/asset/event/pc/2021/01/04_pc/_include/js/event.js?dt=<c:out value="${nowDate}"></c:out>"></script>
</head>

<body>
	<!-- Google Tag Manager (noscript) -->
	<noscript>
		<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5RM2386"
			height="0" width="0" style="display: none; visibility: hidden"></iframe>
	</noscript>
	<!-- End Google Tag Manager (noscript) -->

	<div class="eventWrap">
		<div class="indexVisual">
			<p class="onW">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_1.jpg" alt="지금이 PC를 살 기회! 아카데미 페스티벌 " class="responsive" usemap="#idxImg_3">
			</p>
			<p class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_1_m.jpg" alt="지금이 PC를 살 기회! 아카데미 페스티벌 " class="responsive" usemap="#idxImg_3">
			</p>
			<div class="hideDesc">
				<h1>LG전자</h1>
				<h2>새마음 새출발 gram과 함께, 신학기 gram 페스티벌</h2>
				<dl>
					<dt>대상고객</dt>
					<dd>LG PC를 구매한 고객 중 행사 기간 내 사은품 신청을 완료한 고객 (행사모델에 한함)</dd>
					<dt>행사기간</dt>
					<dd>2021년 01월 04일 ~ 2021년 01월 31일</dd>
					<dt>신청기간</dt>
					<dd>2021년 01월 04일 ~ 2021년 01월 31일</dd>
					<dt>배송일정</dt>
					<dd>사은품 신청 후 1주 이내 (사은품 신청 및 배송 관련 문의 : 1588-7964)</dd>
					<dt>참여방법</dt>
					<dd>LG전자 회원 로그인 및 시리얼번호 입력 후 사은품 신청이 가능합니다.</dd>
				</dl>
			</div>

			<div class="onW">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_btn.jpg"	alt="" class="responsive" usemap="#idxImg_1">
				<map name="idxImg_1" id="idxImg_1">
					<area shape="rect" coords="131,0,592,74" href="javascript:eventCheck();" alt="이벤트 참여하기">
					<area shape="rect" coords="608,0,1069,74" href="javascript:layerPop(&#39;#chkMy&#39;);" alt="참여 내역 확인하기">
				</map>
			</div>
			<div class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_btn_m.jpg" alt="" class="responsive" usemap="#idxImg_1_m">
				<map name="idxImg_1_m" id="idxImg_1_m">
					<area shape="rect" coords="38,0,349,58" href="javascript:eventCheck();" alt="이벤트 참여하기">
                    <area shape="rect" coords="370,0,681,58" href="javascript:layerPop(&#39;#chkMy&#39;);" alt="참여 내역 확인하기">
				</map>
			</div>

			<div class="onW">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_2.jpg" alt="LG PC 구매 시 혜택" class="responsive">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_3.jpg" alt="LG PC 구매 시 혜택" class="responsive">
			</div>
			<div class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_2_m.jpg" alt="LG PC 구매 시 혜택" class="responsive">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_3_m.jpg" alt="LG PC 구매 시 혜택" class="responsive">
			</div>
			<div class="hideDesc">
				<dl>
					<dt>gram 16/17 17Z90P / 17Z90N / 17Z995 / 16Z90P (인텔 SW패키지 7종,
						gram 전용 파우치 ZD 시리즈 제외)</dt>
					<dt>gram 16/17 시리즈 구입시</dt>
					<dd>2021 gram 오피스 밸류팩, 산돌구름(폰트라이선스), 한컴오피스 2020, EzPhoto(이미지
						편집)m Hancom Space, 전용 파우치 (ZD시리즈 제외), 무소음 마우스(색상 랜덤)</dd>

					<dt>gram 16/17 17Z90P / 17Z90N / 17Z995 / 16Z90P (gram 전용 파우치
						ZD 시리즈 제외)</dt>
					<dt>gram 16/17 시리즈 구입시</dt>
					<dd>2021 gram 오피스 밸류팩, 산돌구름(폰트라이선스), 한컴오피스 2020, EzPhoto(이미지
						편집), Hancom Space, 전용 파우치 (ZD시리즈 제외), 무소음 마우스(색상 랜덤)</dd>

					<dt>gram 15/14 14Z90P / 14Z90N / 14Z995 / 15Z90N / 15Z995 (무소음
						마우스 ZD 시리즈 제외)</dt>
					<dt>gram 15/14 구입시</dt>
					<dd>2021 gram 오피스 밸류팩, 산돌구름(폰트라이선스), 한컴오피스 2020, EzPhoto(이미지
						편집), Hancom Space, 무소음 마우스(색상 랜덤)</dd>

					<dt>gram 2in1 14T90N (전용 파우치 모델명 끝자리 L 제외)</dt>
					<dt>gram 2in1 구입시</dt>
					<dd>2021 gram 오피스 밸류팩, 산돌구름(폰트라이선스), 한컴오피스 2020, EzPhoto(이미지
						편집), Hancom Space, 와콤 AES 2.0펜 &amp; 전용 파우치 기업모델(모델명 끝자리 "L")제외</dd>

					<dt>LG UltraGear을 구입시</dt>

					<dt>17U790-P / 17U70P-F / 17U70N-P / 17U70N-F / 15U70P-F /
						15U70N-P / 15U70N-F</dt>
					<dd>2021 gram 오피스 밸류팩 한컴오피스 2020 + 산돌구름(폰트라이선스) + EzPhoto(이미지
						편집) + Hancom Space, 무선 마우스 (색상 랜덤) 무소음 마우스 (색상 랜덤) or 게이밍 마우스 (GD,
						UD 시리즈 제외, 색상 랜덤)</dd>
					<dt>27V70N-F</dt>
					<dd>2021 gram 오피스 밸류팩 한컴오피스 2020 + 산돌구름(폰트라이선스)+ EzPhoto(이미지
						편집) + Hancom Space</dd>
				</dl>
			</div>
			<p class="onW">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_intel.jpg" alt="인텔, 인텔 로고, 인텔 인사이드, 인텔 코처 및 코어 인사이드는 미국과 다른 나라에서 인텔사의 등록상표입니다."class="responsive">
			</p>
			<p class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_intel_m.jpg"	alt="인텔, 인텔 로고, 인텔 인사이드, 인텔 코처 및 코어 인사이드는 미국과 다른 나라에서 인텔사의 등록상표입니다."class="responsive">
			</p>
			<div class="btn_wrap">
				<p class="onW">
					<img	src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_footer.jpg" alt="꼭! 알아두세요!" class="responsive">
				</p>
				<p class="onM">
					<img	src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_footer_m.jpg"	alt="꼭! 알아두세요!" class="responsive">
				</p>
				<a href="https://www.lge.co.kr/lgekor/bestshop/counsel/counselMain.do?device=w&type=HE_electronics&code=1299&inflow=lgekor" class="btn_advice" target="_blank" title="새창 열림"><span class="blind">매장 상담 신청</span></a>
				<a href="https://www.lge.co.kr/lgekor/bestshop/shop/retrieveShopMain.do" class="btn_findstore" target="_blank" title="새창 열림"><span class="blind">가까운 매장 찾기</span></a>
			</div>
			<div class="hideDesc">
				<ul>
					<li>- 제품 시리얼당 사은품 신청은 1번만 유효합니다. (타 이벤트 중복신청도 1번으로 간주함)</li>
					<li>- 상기 모든 사은품 이미지는 실제와 다를 수 있으며 사은품은 당사 사정에 의해 사전통보 없이 변경될 수
						있습니다.</li>
					<li>- 사은품은 수령하신 후 교환 및 환불이 불가능합니다.</li>
					<li>- 잘못 등록한 배송지 정보로 인해 경품 발송 대상에서 제외되었을 경우 당사가 책임을 지지 않습니다.</li>
					<li>- 사은품 신청 및 배송 관련문의: 1588-7964</li>
					<li>- 신청하신 사은품은 신청 날짜로부터 1주 이내 발송됩니다.</li>
					<li>- B2B 및 조달 구매, 직접 구매가 아닌 경우(경품 및 기업증정품 등)는 행사에서 제외됩니다.</li>
					<li>- 14세 미만 고객님의 경우, 이벤트 참여가 제한됩니다.</li>
					<li>- 중고 거래로 인한 불이익은 당사에서 책임지지 않습니다.</li>
					<li>- 사은품 제공 방식은 판매 채널에 따라 상이할 수 있습니다.</li>
				</ul>
			</div>
		</div>

		<form name="f" id="f" method="post" onsubmit="goProc(); return false;"	action="">
			<input type="hidden" name="isOpen" id="isOpen" value="<%=isOpen%>" />
			<input type="hidden" name="event_id" id="event_id"	value="<%=event_id%>" /> 
			<input type="hidden" name="giftChoice" id="giftChoice" value="" />
			<input type="hidden" name="agree1" id="agree1" value="" /> 
			<input type="hidden" name="agree2" id="agree2" value="" /> 
			<input type="hidden" name="agree3" id="agree3" value="" />
			<input type="hidden" name="layer1OpenChk" id="layer1OpenChk" value="0" />
			<input type="hidden" 	name="prdselect" id="prdselect" value="" />
			<!-- 20190502 모니터 제품군 추가 -->
			<input type="hidden" id="unifyId" name="unifyId" value="<%=unifyId%>">

			<div class="w-form-wr"
				style="position: absolute; margin: 0px; left: 0px;">
				<div class="w-form" id="giftsRequest" style="display: none;">
					<div class="w-form-head">
						<h2>사은품 신청하기</h2>
					</div>
					<div class="w-form-cont">
						<h4>
							<span>[필수]</span> 개인정보 수집 이용동의
						</h4>

						<div class="privacyInfor">
							<div class="agreeYN">
								<ul>
									<li><input type="radio" class="i_radio" name="agree01"	id="agree01_01"><label for="agree01_01">동의함</label></li>
									<li><input type="radio" class="i_radio" name="agree01"	id="agree01_02"><label for="agree01_02">동의 안함</label></li>
								</ul>
							</div>
							<table id="tab_privacy1">
								<caption>개인정보 수집 이용동의 내용</caption>
								<colgroup>
									<col style="width: *">
									<col style="width: 30%">
									<col style="width: 35%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">목 적</th>
										<th scope="col">항 목</th>
										<th scope="col">보유기간</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td style="padding: 10px 0">이벤트 응모내역 확인 시 <br class="onW">
											본인 확인
										</td>
										<td style="padding: 10px 0">구매자 이름, 구매자 연락처,<br
											class="onW"> 구매자 주소
										</td>
										<td rowspan="3">이벤트 종료일로부터 <br>3개월까지 보유 후 파기
										</td>
									</tr>
									<tr>
										<td>경품배송 시 본인 확인</td>
										<td>수령자 이름, 수령자 연락처</td>
									</tr>
									<tr>
										<td>경품 배송</td>
										<td>수령자 주소</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="subDesc">※ 귀하께서는 본 동의를 거절하실 수 있습니다. 단, 거절하신 경우 이벤트
							참여가 제한될 수 있습니다.</p>
						<p class="subDesc">※ 14세 미만 고객의 경우, 이벤트 참여가 제한됩니다.</p>

						<h4 style="margin-top: 40px">
							<span>[필수]</span> 개인정보 처리위탁동의
						</h4>
						<div class="privacyInfor">
							<div class="agreeYN">
								<ul>
									<li><input type="radio" class="i_radio" name="agree02"	id="agree02_01"><label for="agree02_01">동의함</label></li>
									<li><input type="radio" class="i_radio" name="agree02"	id="agree02_02"><label for="agree02_02">동의 안함</label></li>
								</ul>
							</div>
							<table>
								<caption>개인정보 수집 이용동의 내용</caption>
								<colgroup>
									<col style="width: 30%">
									<col style="width: *">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">수탁자</th>
										<th scope="col">목 적</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<!-- 20170124 -->
										<td>(주) LG CNS, 원은</td>
										<!-- //20170124 -->
										<td rowspan="2">경품 제공 등 이벤트와 관련한 업무</td>
									</tr>
									<tr>
										<td>CJ대한통운</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="subDesc">※ 경품 제공 등 이벤트 수행을 위해 개인정보 처리위탁에 동의하셔야 이벤트
							참여가 가능합니다.</p>

						<h4 style="margin-top: 40px">
							<span>[선택]</span> 개인정보 수집 이용동의
						</h4>
						<div class="privacyInfor">
							<div class="agreeYN">
								<ul>
									<li><input type="radio" class="i_radio" name="agree03"	id="agree03_01"><label for="agree03_01">동의함</label></li>
									<li><input type="radio" class="i_radio" name="agree03"	id="agree03_02"><label for="agree03_02">동의 안함</label></li>
								</ul>
							</div>
							<table>
								<caption>개인정보 처리위탁동의 내용</caption>
								<colgroup>
									<col style="width: *">
									<col style="width: 23%">
									<col style="width: 40%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">목 적</th>
										<th scope="col">항 목</th>
										<th scope="col">보유기간</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>마케팅 또는 통계를 위한 참고 및 활용</td>
										<td>생년, 성별</td>
										<td>이벤트 종료일로부터 <br class="onW"> 3개월까지 보유 후 파기
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="subDesc">※ 귀하께서는 본 동의를 거절하실 수 있습니다.</p>

						<hr class="divider">


						<h3>구매정보</h3>
						<div class="serialInfor">
							<dl>
								<dt>
									<strong>PC</strong> <br> 모델명, 시리얼 위치 확인
								</dt>
								<dd>
									소지하고 계신 PC 밑면 또는 측면 바코드 <br class="onW"> 부근에 모델명과 시리얼
									번호가 기재되어 있습니다.
								</dd>
								<dd>
									<img
										src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/pc_number.jpg"
										alt="">
								</dd>
								<dd>
									<strong class="tip">※ 안내</strong><br>
									<p>
										S/N (시리얼번호/일련번호)<br> <span class="tip">예)
											701ABCD123456</span><br>
									</p>
									<p>
										모델명<br> <span class="tip">예)PC 모델명 : 15Z980-GA70A</span><br>
									</p>
								</dd>
							</dl>
						</div>

						<div>
							<div class="inputForm" style="overflow: hidden; clear: both;">
								<dl style="width: 36%; float: left;">
									<dt>
										<span style="color: #db0d4d;">*</span>모델명
									</dt>
									<dd>
										<span class="guideTxtWr"> <span class="guideTxt"
											style="font-size: 12px;">모델명을 입력해 주세요.</span> <input
											type="text" style="width: 149px" class="pad600_wauto"
											title="모델명 입력" id="modelNo" name="modelNo" maxlength="20">
										</span>
									</dd>
								</dl>

								<dl style="width: 50%; float: left;">
									<dt>
										<span style="color: #db0d4d;">*</span>시리얼 번호
									</dt>
									<span class="guideTxtWr">
										<dd style="position: relative;">
											<span class="guideTxt" style="font-size: 12px; top: 7px;">S/N를	입력해 주세요.</span> 
											<input type="text" style="width: 149px"	class="pad600_wauto" title="시리얼 번호 입력" id="serialNo"		name="serialNo" maxlength="20"> 
											<a href="javascript:;" id="chkSerial"><img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_SN.jpg"	alt="시리얼번호 확인"></a>
										</dd>
									</span>
								</dl>
							</div>
						</div>

						<div class="inputForm giftSelectWr" id="giftLabel">
							<dl>
								<dt>사은품 선택</dt>
								<dd>
									<div class="gift_select">
										<div id="giftDiv" class="inpImgSec">
											<ul class="gift_area two"></ul>
										</div>
									</div>
								</dd>
							</dl>
						</div>

						<div class="float-left">
							<div class="inputForm">
								<dl>
									<dt>
										<span style="color: #db0d4d;">*</span>구매자 이름
									</dt>
									<dd class="default_txt">
										<span id="buyerName"><c:out value="<%=userName%>" /></span>

									</dd>
								</dl>
							</div>

							<div class="inputForm" id="agree03_group1">
								<dl>
									<dt>생년(4자리)</dt>
									<dd>
										<select name="birthYear" id="birthYear" title="생년 선택"
											style="width: 130px">
											<option value="">선택</option>
											<!-- 디폴트 값 확인용 option 20190607-->
										</select>
									</dd>
								</dl>
							</div>

							<div class="inputForm" id="agree03_group2">
								<dl>
									<dt style="width: 45px">성별</dt>
									<dd>
										<div style="padding-top: 5px">
											<input type="radio" class="i_radio" name="gender" id="male"
												value="1"><label for="male">남</label> <span
												style="padding-left: 22px"><input type="radio"
												class="i_radio" name="gender" id="female" value="2"><label
												for="female">여</label></span>
										</div>
									</dd>
								</dl>
							</div>
						</div>

						<div class="inputForm">
							<dl>
								<dt>
									<span style="color: #db0d4d;">*</span>휴대폰 번호
								</dt>
								<dd class="default_txt">
									<span id="buyer_hp1"><c:out
											value="<%=CommonUtil.returnMobileNum(userTel, 0)%>" /></span> - <span
										id="buyer_hp2"><c:out
											value="<%=CommonUtil.returnMobileNum(userTel, 1)%>" /></span> - <span
										id="buyer_hp3"><c:out
											value="<%=CommonUtil.returnMobileNum(userTel, 2)%>" /></span>

									<p class="noti">※ LG전자 회원가입 시 입력한 휴대폰 번호로 응모 됩니다.</p>
								</dd>
							</dl>
						</div>
						<div class="inputForm">
							<dl>
								<dt>
									<span style="color: #db0d4d;">*</span>구매자 주소
								</dt>
								<dd class="post_box">
									<input type="hidden" id="buyer_zipseq" name="buyer_zipseq"
										value=""> <input type="hidden"
										id="buyer_userSelectedType" name="buyer_userSelectedType"
										value=""> <input type="text" style="width: 160px"
										title="우편번호 찾기 후 자동 입력" id="buyer_zipcode"
										name="buyer_zipcode" readonly="readonly"> <a
										href="javascript:;" id="postBtn"><img
										src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_post.jpg"
										alt="우편번호 찾기"></a>
									<p style="margin-top: 5px">
										<input type="text" style="width: 285px"
											title="우편번호 찾기 후 자동 입력" id="buyer_addr1" name="buyer_addr1"
											readonly="readonly"> <input type="text"
											style="width: 285px" title="나머지 주소 입력" id="buyer_addr2"
											name="buyer_addr2">
									</p>
								</dd>
								<!-- <dd>
                            <p class="noti" style="padding-left:100px; line-height:1.3; ">※ Windows 10에서 우편번호 찾기 팝업이 뜨지 않을 경우 '시작 → 설정 → 앱 → 기본 앱 → 웹 브라우저'를 클릭하여  Internet Explorer로 변경 후 다시 이벤트에 참여해 주시기 바랍니다.</p>
                        </dd> -->
								<dd style="width: 100%;">
									<div id="postwrap"
										style="display: none; border: 1px solid; width: 96%; max-width: 500px; margin: 5px auto; position: relative">
										<img src="//t1.daumcdn.net/postcode/resource/images/close.png"
											id="btnFoldWrap"
											style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1"
											onclick="foldDaumPostcode()" alt="접기 버튼">
									</div>
								</dd>
							</dl>
						</div>

						<div id="div_deliveryInfo">
							<hr class="divider">

							<div class="same">
								<h3>사은품 배송정보</h3>
								<p>
									<input type="checkbox" class="i_chk" id="writeSame"><label
										for="writeSame">구매자 정보와 같음</label>
								</p>
							</div>
							<div class="inputForm">
								<dl>
									<dt>
										<span style="color: #db0d4d;">*</span>수령자 이름
									</dt>
									<dd>
										<input type="text" style="width: 130px" title="수령자 이름 입력"
											id="firstName" name="firstName" maxlength="10">
									</dd>
								</dl>
							</div>
							<div class="inputForm">
								<dl>
									<dt>
										<span style="color: #db0d4d;">*</span>휴대폰 번호
									</dt>
									<dd>
										<select name="hp_ddd" id="hp_ddd" title="휴대폰 번호 첫번째 자리 선택">
											<%
												for (int i = 0; i < hp_Arr.length; i++) {
											%>
											<option value="<%=hp_Arr[i]%>">
												<%=hp_Arr[i]%>
											</option>
											<%
												}
											%>
										</select> - <input type="text" style="width: 100px"
											title="휴대폰 번호 중간자리 입력" id="hp1" name="hp1" maxlength="4">
										- <input type="text" style="width: 100px"
											title="휴대폰 번호 끝자리 입력" id="hp2" name="hp2" maxlength="4">
									</dd>
								</dl>
							</div>
							<div class="inputForm">
								<dl>
									<dt>
										<span style="color: #db0d4d;">*</span>수령자 주소
									</dt>
									<dd class="post_box">
										<input type="hidden" id="receieveZipSeq" name="receieveZipSeq"
											value=""> <input type="hidden" id="userSelectedType"
											name="userSelectedType" value=""> <input type="text"
											style="width: 160px" title="우편번호 찾기 후 자동 입력" id="postCode"
											name="postCode" readonly="readonly"> <a
											href="javascript:;" id="postBtn2"><img
											src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_post.jpg"
											alt="우편번호 찾기"></a>
										<p style="margin-top: 5px">
											<input type="text" style="width: 285px"
												title="우편번호 찾기 후 자동 입력" id="customerBasAddr"
												name="customerBasAddr" readonly="readonly"> <input
												type="text" style="width: 285px" title="나머지 주소 입력"
												id="customerDtlAddr" name="customerDtlAddr">
										</p>
										<p class="noti">※ 입력한 정보로 배송되니 정확한 배송지를 확인해주세요.</p>
										<p class="noti">※ 주소는 사은품 발송의 목적으로, 해당 이벤트 참여용으로만 수집합니다.</p>
									</dd>
									<!-- <dd>
                                <p class="noti" style="padding-left:100px; line-height:1.3; ">※ Windows 10에서 우편번호 찾기 팝업이 뜨지 않을 경우 '시작 → 설정 → 앱 → 기본 앱 → 웹 브라우저'를 클릭하여  Internet Explorer로 변경 후 다시 이벤트에 참여해 주시기 바랍니다.</p>
                            </dd> -->
									<dd style="width: 100%;">
										<div id="postwrap2"
											style="display: none; border: 1px solid; width: 96%; max-width: 500px; margin: 5px auto; position: relative; overflow: hidden">
											<img
												src="//t1.daumcdn.net/postcode/resource/images/close.png"
												id="btnFoldWrap"
												style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1"
												onclick="foldDaumPostcode2()" alt="접기 버튼">
										</div>
									</dd>
								</dl>

							</div>
						</div>

						<div style="text-align: center; margin-top: 50px;">
							<input type="image" id="applyPosY"
								src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_apply.jpg"
								alt="신청하기">
						</div>
						<img
							src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close_first.jpg"
							alt="닫기" class="btn_close_first"
							onClick="javascript:btn_close('giftsRequest');"
							style="cursor: pointer">
					</div>
				</div>
			</div>

			<!-- 참여완료 :: 입력하신 주소로 사은품이 배송됩니다 :: -->
			<div class="layerPopup-wr">
				<div class="layerPopup" id="chkSuc" style="display: none;">
					<div class="tit">
						<span>참여완료</span>
					</div>
					<div class="layerPopupInner">

						<div class="txt1">
							<p class="desc">정상 참여되었습니다.</p>
							<p class="desc">감사합니다.</p>
						</div>

						<!-- monitor -->
						<div class="txt2" id="div_deliver_pc_mon">
							<p class="desc">※ 입력하신 주소로 사은품이 배송됩니다. (1주 이내)</p>
						</div>

						<div class="btn_center">
							<img
								src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_confirm.jpg"
								alt="확인" onclick="javascript:btn_close('chkSuc');"
								style="cursor: pointer">
						</div>
					</div>
					<img
						src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close.jpg"
						alt="닫기" onclick="javascript:btn_close('chkSuc');"
						style="cursor: pointer" class="btn_close">
				</div>
			</div>
			<!-- //참여완료 :: 입력하신 주소로 사은품이 배송됩니다 :: -->



			<!-- 2019.01.03:추가2 -->
			<!--2019 gram 오피스 밸류 팩 자세히보기-->
			<!-- <div class="layerPopup-wr" style="top: 33%; z-index: 8888;">
            <div class="layerPopup" id="layerInfo01" style="max-width: 840px; width: auto;">
                <div class="layerPopupInner">
                    <p><img style="width: 100%;" src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/popup_inter.jpg" alt=""></p>
                </div>
                <span  onclick="javascript:btn_close('layerInfo01');" class="btn_close02"></span>
            </div>
        </div> -->
			<!--//2019 gram 오피스 밸류 팩 자세히보기-->

			<!--20190307 인텔 자세히보기-->
			<!-- <div class="layerPopup-wr" style="top: 72%; z-index: 8888;">
            <div class="layerPopup" id="layerInfo02" style="max-width: 840px; width: auto;">
                <div class="layerPopupInner">
                    <p><img style="width: 100%;" src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/popup_inter_game.jpg" alt=""></p>
                </div>
                <span onclick="javascript:btn_close('layerInfo02');" class="btn_close02"></span>
            </div>
        </div> -->
			<!--//20190307 인텔 자세히보기-->
			<!-- //2019.01.03:추가2 -->

			<br>

			<!-- 참여완료 :: 나의 참여내역 확인 입력 :: -->
			<div class="layerPopup-wr">
				<div class="layerPopup" id="chkMy" style="display: none;">
					<div class="tit">
						<span>나의 참여내역 확인</span>
					</div>
					<div class="layerPopupInner">
						<div class="submit_wr">
							<div class="inputForm">
								<dl>
									<dt>* 구매자 이름</dt>
									<dd>
										<input type="text" title="구매자 이름 입력" style="width: 137px"
											id="user_name" name="user_name" maxlength="10">
									</dd>
								</dl>
							</div>

							<div class="inputForm">
								<dl>
									<dt>* 휴대폰 번호</dt>
									<dd style="width: 70%;">
										<select name="user_hp1" id="user_hp1" title="휴대폰 번호 첫번째 자리 선택">
											<%
												for (int i = 0; i < hp_Arr.length; i++) {
											%>
											<option value="<%=hp_Arr[i]%>">
												<%=hp_Arr[i]%>
											</option>
											<%
												}
											%>
										</select> - <input type="text" style="width: 32%" name="user_hp2"
											id="user_hp2" maxlength="4" title="휴대폰 번호 중간자리 입력"> -
										<input type="text" style="width: 32%" name="user_hp3"
											id="user_hp3" maxlength="4" title="휴대폰 번호 끝자리 입력">
									</dd>
								</dl>
							</div>

						</div>

						<div class="btn_center">
							<img
								src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_confirm.jpg"
								alt="확인" onClick="myJoinList();" style="cursor: pointer">
						</div>
					</div>
					<img
						src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close.jpg"
						alt="닫기" class="btn_close"
						onclick="javascript:btn_close('chkMy');" style="cursor: pointer">
				</div>
			</div>
			<!-- //참여완료 :: 나의 참여내역 확인 입력 :: -->

			<!-- 참여완료 :: 나의 참여내역 확인 리스트 :: -->
			<div class="layerPopup-wr">
				<div class="layerPopup" id="chkList" style="display: none;">
					<div class="tit">
						<span>나의 참여내역 확인</span>
					</div>
					<div class="layerPopupInner">
						<div class="submit_wr">
							<p class="desc" id="myIntoText"></p>

							<div class="submitList">
								<div class="overflowTbl">
									<table style="width: 100%;">
										<caption>참여내역</caption>
										<colgroup>
											<col style="width: 31%; max-width: 160px">
											<col style="width: 23%; max-width: 100px">
											<col style="width: 46%; max-width: 230px">
										</colgroup>
										<thead>
											<tr>
												<th scope="col" style="width: 160px"><span>제품</span></th>
												<th scope="col" style="width: 100px"><span>참여일</span></th>
												<th scope="col" style="width: 230px"><span>사은품</span></th>
											</tr>
										</thead>
										<tbody id="joinList">
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div class="btn_center">
							<img
								src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_confirm.jpg"
								alt="확인" onclick="javascript:btn_close('chkList');"
								style="cursor: pointer">
						</div>
					</div>
					<img
						src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close.jpg"
						alt="닫기" class="btn_close"
						onclick="javascript:btn_close('chkList');" style="cursor: pointer">
				</div>
			</div>
			<!-- //참여완료 :: 나의 참여내역 확인 리스트 :: -->
		</form>
		<div class="dimmed"></div>
	</div>
	<script>
		(function($) {
			$.fn.extend({
				center : function() {
					return this.each(function() {
						// var top = ($(window).height() - $(this).outerHeight()) / 2;
						var left = ($(".event-template").width() - $(this)
								.outerWidth()) / 2;
						$(this).css({
							position : 'absolute',
							margin : 0,
							left : (left > 0 ? left : 0) + 'px'
						});
					});
				}
			});
			$('.layerPopup-wr').center();
			$('.w-form-wr').center();
		})(jQuery);
	</script>

	<iframe id="hid_frmame" name="hid_frmame" frameborder="0"
		scrolling="no" width="0" height="0"></iframe>
</body>
</html>
