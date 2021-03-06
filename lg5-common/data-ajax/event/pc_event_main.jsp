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

<!-- css js �ֽ�ȭ   -->
<jsp:useBean id="now" class="java.util.Date" />
<fmt:formatDate value="${now}" pattern="yyyyMMddHHmmss" var="nowDate" />
<!-- css js �ֽ�ȭ -->

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
	//��ȭ��ȣ ��� ����ŷó��
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
 var isType = "<%=isType %>";<%-- clientType-> W : �� , M : ����� --%>
 
 var Checkdomain = "<%=Checkdomain %>";
 var serverType = "<c:out value='${ serverType }' />";
 var mainLoginYn  =  "<c:out value='${ mainLoginYn }' />";
 var eventApplyYn =  "<c:out value='${ eventApplyYn }' />";
 // ���� : L, ���� : D, ������¡ : T, � : R
 var userIp = "${userIp}";
</script>

<script type="text/javascript"
	src="<LTag:webPath kind="js">jquery-1.11.1.min.js</LTag:webPath>"></script>
<script
	src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false"></script>
<!-- ���������ȣ ���� �̿�� �ʼ� / commonUtil.js ���� ���� ����Ǿ���� -->
<script type="text/javascript"
	src="/lgekor/asset/js/jquery.rwdImageMaps.min.js"></script>
<!-- Html Img Map �������� �����ϱ� -->
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
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_1.jpg" alt="������ PC�� �� ��ȸ! ��ī���� �佺Ƽ�� " class="responsive" usemap="#idxImg_3">
			</p>
			<p class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_1_m.jpg" alt="������ PC�� �� ��ȸ! ��ī���� �佺Ƽ�� " class="responsive" usemap="#idxImg_3">
			</p>
			<div class="hideDesc">
				<h1>LG����</h1>
				<h2>������ ����� gram�� �Բ�, ���б� gram �佺Ƽ��</h2>
				<dl>
					<dt>����</dt>
					<dd>LG PC�� ������ �� �� ��� �Ⱓ �� ����ǰ ��û�� �Ϸ��� �� (���𵨿� ����)</dd>
					<dt>���Ⱓ</dt>
					<dd>2021�� 01�� 04�� ~ 2021�� 01�� 31��</dd>
					<dt>��û�Ⱓ</dt>
					<dd>2021�� 01�� 04�� ~ 2021�� 01�� 31��</dd>
					<dt>�������</dt>
					<dd>����ǰ ��û �� 1�� �̳� (����ǰ ��û �� ��� ���� ���� : 1588-7964)</dd>
					<dt>�������</dt>
					<dd>LG���� ȸ�� �α��� �� �ø����ȣ �Է� �� ����ǰ ��û�� �����մϴ�.</dd>
				</dl>
			</div>

			<div class="onW">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_btn.jpg"	alt="" class="responsive" usemap="#idxImg_1">
				<map name="idxImg_1" id="idxImg_1">
					<area shape="rect" coords="131,0,592,74" href="javascript:eventCheck();" alt="�̺�Ʈ �����ϱ�">
					<area shape="rect" coords="608,0,1069,74" href="javascript:layerPop(&#39;#chkMy&#39;);" alt="���� ���� Ȯ���ϱ�">
				</map>
			</div>
			<div class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_btn_m.jpg" alt="" class="responsive" usemap="#idxImg_1_m">
				<map name="idxImg_1_m" id="idxImg_1_m">
					<area shape="rect" coords="38,0,349,58" href="javascript:eventCheck();" alt="�̺�Ʈ �����ϱ�">
                    <area shape="rect" coords="370,0,681,58" href="javascript:layerPop(&#39;#chkMy&#39;);" alt="���� ���� Ȯ���ϱ�">
				</map>
			</div>

			<div class="onW">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_2.jpg" alt="LG PC ���� �� ����" class="responsive">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_3.jpg" alt="LG PC ���� �� ����" class="responsive">
			</div>
			<div class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_2_m.jpg" alt="LG PC ���� �� ����" class="responsive">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_img_3_m.jpg" alt="LG PC ���� �� ����" class="responsive">
			</div>
			<div class="hideDesc">
				<dl>
					<dt>gram 16/17 17Z90P / 17Z90N / 17Z995 / 16Z90P (���� SW��Ű�� 7��,
						gram ���� �Ŀ�ġ ZD �ø��� ����)</dt>
					<dt>gram 16/17 �ø��� ���Խ�</dt>
					<dd>2021 gram ���ǽ� �����, �굹����(��Ʈ���̼���), ���Ŀ��ǽ� 2020, EzPhoto(�̹���
						����)m Hancom Space, ���� �Ŀ�ġ (ZD�ø��� ����), ������ ���콺(���� ����)</dd>

					<dt>gram 16/17 17Z90P / 17Z90N / 17Z995 / 16Z90P (gram ���� �Ŀ�ġ
						ZD �ø��� ����)</dt>
					<dt>gram 16/17 �ø��� ���Խ�</dt>
					<dd>2021 gram ���ǽ� �����, �굹����(��Ʈ���̼���), ���Ŀ��ǽ� 2020, EzPhoto(�̹���
						����), Hancom Space, ���� �Ŀ�ġ (ZD�ø��� ����), ������ ���콺(���� ����)</dd>

					<dt>gram 15/14 14Z90P / 14Z90N / 14Z995 / 15Z90N / 15Z995 (������
						���콺 ZD �ø��� ����)</dt>
					<dt>gram 15/14 ���Խ�</dt>
					<dd>2021 gram ���ǽ� �����, �굹����(��Ʈ���̼���), ���Ŀ��ǽ� 2020, EzPhoto(�̹���
						����), Hancom Space, ������ ���콺(���� ����)</dd>

					<dt>gram 2in1 14T90N (���� �Ŀ�ġ �𵨸� ���ڸ� L ����)</dt>
					<dt>gram 2in1 ���Խ�</dt>
					<dd>2021 gram ���ǽ� �����, �굹����(��Ʈ���̼���), ���Ŀ��ǽ� 2020, EzPhoto(�̹���
						����), Hancom Space, ���� AES 2.0�� &amp; ���� �Ŀ�ġ �����(�𵨸� ���ڸ� "L")����</dd>

					<dt>LG UltraGear�� ���Խ�</dt>

					<dt>17U790-P / 17U70P-F / 17U70N-P / 17U70N-F / 15U70P-F /
						15U70N-P / 15U70N-F</dt>
					<dd>2021 gram ���ǽ� ����� ���Ŀ��ǽ� 2020 + �굹����(��Ʈ���̼���) + EzPhoto(�̹���
						����) + Hancom Space, ���� ���콺 (���� ����) ������ ���콺 (���� ����) or ���̹� ���콺 (GD,
						UD �ø��� ����, ���� ����)</dd>
					<dt>27V70N-F</dt>
					<dd>2021 gram ���ǽ� ����� ���Ŀ��ǽ� 2020 + �굹����(��Ʈ���̼���)+ EzPhoto(�̹���
						����) + Hancom Space</dd>
				</dl>
			</div>
			<p class="onW">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_intel.jpg" alt="����, ���� �ΰ�, ���� �λ��̵�, ���� ��ó �� �ھ� �λ��̵�� �̱��� �ٸ� ���󿡼� ���ڻ��� ��ϻ�ǥ�Դϴ�."class="responsive">
			</p>
			<p class="onM">
				<img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_intel_m.jpg"	alt="����, ���� �ΰ�, ���� �λ��̵�, ���� ��ó �� �ھ� �λ��̵�� �̱��� �ٸ� ���󿡼� ���ڻ��� ��ϻ�ǥ�Դϴ�."class="responsive">
			</p>
			<div class="btn_wrap">
				<p class="onW">
					<img	src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_footer.jpg" alt="��! �˾Ƶμ���!" class="responsive">
				</p>
				<p class="onM">
					<img	src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/idx_footer_m.jpg"	alt="��! �˾Ƶμ���!" class="responsive">
				</p>
				<a href="https://www.lge.co.kr/lgekor/bestshop/counsel/counselMain.do?device=w&type=HE_electronics&code=1299&inflow=lgekor" class="btn_advice" target="_blank" title="��â ����"><span class="blind">���� ��� ��û</span></a>
				<a href="https://www.lge.co.kr/lgekor/bestshop/shop/retrieveShopMain.do" class="btn_findstore" target="_blank" title="��â ����"><span class="blind">����� ���� ã��</span></a>
			</div>
			<div class="hideDesc">
				<ul>
					<li>- ��ǰ �ø���� ����ǰ ��û�� 1���� ��ȿ�մϴ�. (Ÿ �̺�Ʈ �ߺ���û�� 1������ ������)</li>
					<li>- ��� ��� ����ǰ �̹����� ������ �ٸ� �� ������ ����ǰ�� ��� ������ ���� �����뺸 ���� ����� ��
						�ֽ��ϴ�.</li>
					<li>- ����ǰ�� �����Ͻ� �� ��ȯ �� ȯ���� �Ұ����մϴ�.</li>
					<li>- �߸� ����� ����� ������ ���� ��ǰ �߼� ��󿡼� ���ܵǾ��� ��� ��簡 å���� ���� �ʽ��ϴ�.</li>
					<li>- ����ǰ ��û �� ��� ���ù���: 1588-7964</li>
					<li>- ��û�Ͻ� ����ǰ�� ��û ��¥�κ��� 1�� �̳� �߼۵˴ϴ�.</li>
					<li>- B2B �� ���� ����, ���� ���Ű� �ƴ� ���(��ǰ �� �������ǰ ��)�� ��翡�� ���ܵ˴ϴ�.</li>
					<li>- 14�� �̸� ������ ���, �̺�Ʈ ������ ���ѵ˴ϴ�.</li>
					<li>- �߰� �ŷ��� ���� �������� ��翡�� å������ �ʽ��ϴ�.</li>
					<li>- ����ǰ ���� ����� �Ǹ� ä�ο� ���� ������ �� �ֽ��ϴ�.</li>
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
			<!-- 20190502 ����� ��ǰ�� �߰� -->
			<input type="hidden" id="unifyId" name="unifyId" value="<%=unifyId%>">

			<div class="w-form-wr"
				style="position: absolute; margin: 0px; left: 0px;">
				<div class="w-form" id="giftsRequest" style="display: none;">
					<div class="w-form-head">
						<h2>����ǰ ��û�ϱ�</h2>
					</div>
					<div class="w-form-cont">
						<h4>
							<span>[�ʼ�]</span> �������� ���� �̿뵿��
						</h4>

						<div class="privacyInfor">
							<div class="agreeYN">
								<ul>
									<li><input type="radio" class="i_radio" name="agree01"	id="agree01_01"><label for="agree01_01">������</label></li>
									<li><input type="radio" class="i_radio" name="agree01"	id="agree01_02"><label for="agree01_02">���� ����</label></li>
								</ul>
							</div>
							<table id="tab_privacy1">
								<caption>�������� ���� �̿뵿�� ����</caption>
								<colgroup>
									<col style="width: *">
									<col style="width: 30%">
									<col style="width: 35%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">�� ��</th>
										<th scope="col">�� ��</th>
										<th scope="col">�����Ⱓ</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td style="padding: 10px 0">�̺�Ʈ ���𳻿� Ȯ�� �� <br class="onW">
											���� Ȯ��
										</td>
										<td style="padding: 10px 0">������ �̸�, ������ ����ó,<br
											class="onW"> ������ �ּ�
										</td>
										<td rowspan="3">�̺�Ʈ �����Ϸκ��� <br>3�������� ���� �� �ı�
										</td>
									</tr>
									<tr>
										<td>��ǰ��� �� ���� Ȯ��</td>
										<td>������ �̸�, ������ ����ó</td>
									</tr>
									<tr>
										<td>��ǰ ���</td>
										<td>������ �ּ�</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="subDesc">�� ���ϲ����� �� ���Ǹ� �����Ͻ� �� �ֽ��ϴ�. ��, �����Ͻ� ��� �̺�Ʈ
							������ ���ѵ� �� �ֽ��ϴ�.</p>
						<p class="subDesc">�� 14�� �̸� ���� ���, �̺�Ʈ ������ ���ѵ˴ϴ�.</p>

						<h4 style="margin-top: 40px">
							<span>[�ʼ�]</span> �������� ó����Ź����
						</h4>
						<div class="privacyInfor">
							<div class="agreeYN">
								<ul>
									<li><input type="radio" class="i_radio" name="agree02"	id="agree02_01"><label for="agree02_01">������</label></li>
									<li><input type="radio" class="i_radio" name="agree02"	id="agree02_02"><label for="agree02_02">���� ����</label></li>
								</ul>
							</div>
							<table>
								<caption>�������� ���� �̿뵿�� ����</caption>
								<colgroup>
									<col style="width: 30%">
									<col style="width: *">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">��Ź��</th>
										<th scope="col">�� ��</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<!-- 20170124 -->
										<td>(��) LG CNS, ����</td>
										<!-- //20170124 -->
										<td rowspan="2">��ǰ ���� �� �̺�Ʈ�� ������ ����</td>
									</tr>
									<tr>
										<td>CJ�������</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="subDesc">�� ��ǰ ���� �� �̺�Ʈ ������ ���� �������� ó����Ź�� �����ϼž� �̺�Ʈ
							������ �����մϴ�.</p>

						<h4 style="margin-top: 40px">
							<span>[����]</span> �������� ���� �̿뵿��
						</h4>
						<div class="privacyInfor">
							<div class="agreeYN">
								<ul>
									<li><input type="radio" class="i_radio" name="agree03"	id="agree03_01"><label for="agree03_01">������</label></li>
									<li><input type="radio" class="i_radio" name="agree03"	id="agree03_02"><label for="agree03_02">���� ����</label></li>
								</ul>
							</div>
							<table>
								<caption>�������� ó����Ź���� ����</caption>
								<colgroup>
									<col style="width: *">
									<col style="width: 23%">
									<col style="width: 40%">
								</colgroup>
								<thead>
									<tr>
										<th scope="col">�� ��</th>
										<th scope="col">�� ��</th>
										<th scope="col">�����Ⱓ</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>������ �Ǵ� ��踦 ���� ���� �� Ȱ��</td>
										<td>����, ����</td>
										<td>�̺�Ʈ �����Ϸκ��� <br class="onW"> 3�������� ���� �� �ı�
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<p class="subDesc">�� ���ϲ����� �� ���Ǹ� �����Ͻ� �� �ֽ��ϴ�.</p>

						<hr class="divider">


						<h3>��������</h3>
						<div class="serialInfor">
							<dl>
								<dt>
									<strong>PC</strong> <br> �𵨸�, �ø��� ��ġ Ȯ��
								</dt>
								<dd>
									�����ϰ� ��� PC �ظ� �Ǵ� ���� ���ڵ� <br class="onW"> �αٿ� �𵨸�� �ø���
									��ȣ�� ����Ǿ� �ֽ��ϴ�.
								</dd>
								<dd>
									<img
										src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/pc_number.jpg"
										alt="">
								</dd>
								<dd>
									<strong class="tip">�� �ȳ�</strong><br>
									<p>
										S/N (�ø����ȣ/�Ϸù�ȣ)<br> <span class="tip">��)
											701ABCD123456</span><br>
									</p>
									<p>
										�𵨸�<br> <span class="tip">��)PC �𵨸� : 15Z980-GA70A</span><br>
									</p>
								</dd>
							</dl>
						</div>

						<div>
							<div class="inputForm" style="overflow: hidden; clear: both;">
								<dl style="width: 36%; float: left;">
									<dt>
										<span style="color: #db0d4d;">*</span>�𵨸�
									</dt>
									<dd>
										<span class="guideTxtWr"> <span class="guideTxt"
											style="font-size: 12px;">�𵨸��� �Է��� �ּ���.</span> <input
											type="text" style="width: 149px" class="pad600_wauto"
											title="�𵨸� �Է�" id="modelNo" name="modelNo" maxlength="20">
										</span>
									</dd>
								</dl>

								<dl style="width: 50%; float: left;">
									<dt>
										<span style="color: #db0d4d;">*</span>�ø��� ��ȣ
									</dt>
									<span class="guideTxtWr">
										<dd style="position: relative;">
											<span class="guideTxt" style="font-size: 12px; top: 7px;">S/N��	�Է��� �ּ���.</span> 
											<input type="text" style="width: 149px"	class="pad600_wauto" title="�ø��� ��ȣ �Է�" id="serialNo"		name="serialNo" maxlength="20"> 
											<a href="javascript:;" id="chkSerial"><img src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_SN.jpg"	alt="�ø����ȣ Ȯ��"></a>
										</dd>
									</span>
								</dl>
							</div>
						</div>

						<div class="inputForm giftSelectWr" id="giftLabel">
							<dl>
								<dt>����ǰ ����</dt>
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
										<span style="color: #db0d4d;">*</span>������ �̸�
									</dt>
									<dd class="default_txt">
										<span id="buyerName"><c:out value="<%=userName%>" /></span>

									</dd>
								</dl>
							</div>

							<div class="inputForm" id="agree03_group1">
								<dl>
									<dt>����(4�ڸ�)</dt>
									<dd>
										<select name="birthYear" id="birthYear" title="���� ����"
											style="width: 130px">
											<option value="">����</option>
											<!-- ����Ʈ �� Ȯ�ο� option 20190607-->
										</select>
									</dd>
								</dl>
							</div>

							<div class="inputForm" id="agree03_group2">
								<dl>
									<dt style="width: 45px">����</dt>
									<dd>
										<div style="padding-top: 5px">
											<input type="radio" class="i_radio" name="gender" id="male"
												value="1"><label for="male">��</label> <span
												style="padding-left: 22px"><input type="radio"
												class="i_radio" name="gender" id="female" value="2"><label
												for="female">��</label></span>
										</div>
									</dd>
								</dl>
							</div>
						</div>

						<div class="inputForm">
							<dl>
								<dt>
									<span style="color: #db0d4d;">*</span>�޴��� ��ȣ
								</dt>
								<dd class="default_txt">
									<span id="buyer_hp1"><c:out
											value="<%=CommonUtil.returnMobileNum(userTel, 0)%>" /></span> - <span
										id="buyer_hp2"><c:out
											value="<%=CommonUtil.returnMobileNum(userTel, 1)%>" /></span> - <span
										id="buyer_hp3"><c:out
											value="<%=CommonUtil.returnMobileNum(userTel, 2)%>" /></span>

									<p class="noti">�� LG���� ȸ������ �� �Է��� �޴��� ��ȣ�� ���� �˴ϴ�.</p>
								</dd>
							</dl>
						</div>
						<div class="inputForm">
							<dl>
								<dt>
									<span style="color: #db0d4d;">*</span>������ �ּ�
								</dt>
								<dd class="post_box">
									<input type="hidden" id="buyer_zipseq" name="buyer_zipseq"
										value=""> <input type="hidden"
										id="buyer_userSelectedType" name="buyer_userSelectedType"
										value=""> <input type="text" style="width: 160px"
										title="�����ȣ ã�� �� �ڵ� �Է�" id="buyer_zipcode"
										name="buyer_zipcode" readonly="readonly"> <a
										href="javascript:;" id="postBtn"><img
										src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_post.jpg"
										alt="�����ȣ ã��"></a>
									<p style="margin-top: 5px">
										<input type="text" style="width: 285px"
											title="�����ȣ ã�� �� �ڵ� �Է�" id="buyer_addr1" name="buyer_addr1"
											readonly="readonly"> <input type="text"
											style="width: 285px" title="������ �ּ� �Է�" id="buyer_addr2"
											name="buyer_addr2">
									</p>
								</dd>
								<!-- <dd>
                            <p class="noti" style="padding-left:100px; line-height:1.3; ">�� Windows 10���� �����ȣ ã�� �˾��� ���� ���� ��� '���� �� ���� �� �� �� �⺻ �� �� �� ������'�� Ŭ���Ͽ�  Internet Explorer�� ���� �� �ٽ� �̺�Ʈ�� ������ �ֽñ� �ٶ��ϴ�.</p>
                        </dd> -->
								<dd style="width: 100%;">
									<div id="postwrap"
										style="display: none; border: 1px solid; width: 96%; max-width: 500px; margin: 5px auto; position: relative">
										<img src="//t1.daumcdn.net/postcode/resource/images/close.png"
											id="btnFoldWrap"
											style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1"
											onclick="foldDaumPostcode()" alt="���� ��ư">
									</div>
								</dd>
							</dl>
						</div>

						<div id="div_deliveryInfo">
							<hr class="divider">

							<div class="same">
								<h3>����ǰ �������</h3>
								<p>
									<input type="checkbox" class="i_chk" id="writeSame"><label
										for="writeSame">������ ������ ����</label>
								</p>
							</div>
							<div class="inputForm">
								<dl>
									<dt>
										<span style="color: #db0d4d;">*</span>������ �̸�
									</dt>
									<dd>
										<input type="text" style="width: 130px" title="������ �̸� �Է�"
											id="firstName" name="firstName" maxlength="10">
									</dd>
								</dl>
							</div>
							<div class="inputForm">
								<dl>
									<dt>
										<span style="color: #db0d4d;">*</span>�޴��� ��ȣ
									</dt>
									<dd>
										<select name="hp_ddd" id="hp_ddd" title="�޴��� ��ȣ ù��° �ڸ� ����">
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
											title="�޴��� ��ȣ �߰��ڸ� �Է�" id="hp1" name="hp1" maxlength="4">
										- <input type="text" style="width: 100px"
											title="�޴��� ��ȣ ���ڸ� �Է�" id="hp2" name="hp2" maxlength="4">
									</dd>
								</dl>
							</div>
							<div class="inputForm">
								<dl>
									<dt>
										<span style="color: #db0d4d;">*</span>������ �ּ�
									</dt>
									<dd class="post_box">
										<input type="hidden" id="receieveZipSeq" name="receieveZipSeq"
											value=""> <input type="hidden" id="userSelectedType"
											name="userSelectedType" value=""> <input type="text"
											style="width: 160px" title="�����ȣ ã�� �� �ڵ� �Է�" id="postCode"
											name="postCode" readonly="readonly"> <a
											href="javascript:;" id="postBtn2"><img
											src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_post.jpg"
											alt="�����ȣ ã��"></a>
										<p style="margin-top: 5px">
											<input type="text" style="width: 285px"
												title="�����ȣ ã�� �� �ڵ� �Է�" id="customerBasAddr"
												name="customerBasAddr" readonly="readonly"> <input
												type="text" style="width: 285px" title="������ �ּ� �Է�"
												id="customerDtlAddr" name="customerDtlAddr">
										</p>
										<p class="noti">�� �Է��� ������ ��۵Ǵ� ��Ȯ�� ������� Ȯ�����ּ���.</p>
										<p class="noti">�� �ּҴ� ����ǰ �߼��� ��������, �ش� �̺�Ʈ ���������θ� �����մϴ�.</p>
									</dd>
									<!-- <dd>
                                <p class="noti" style="padding-left:100px; line-height:1.3; ">�� Windows 10���� �����ȣ ã�� �˾��� ���� ���� ��� '���� �� ���� �� �� �� �⺻ �� �� �� ������'�� Ŭ���Ͽ�  Internet Explorer�� ���� �� �ٽ� �̺�Ʈ�� ������ �ֽñ� �ٶ��ϴ�.</p>
                            </dd> -->
									<dd style="width: 100%;">
										<div id="postwrap2"
											style="display: none; border: 1px solid; width: 96%; max-width: 500px; margin: 5px auto; position: relative; overflow: hidden">
											<img
												src="//t1.daumcdn.net/postcode/resource/images/close.png"
												id="btnFoldWrap"
												style="cursor: pointer; position: absolute; right: 0px; top: -1px; z-index: 1"
												onclick="foldDaumPostcode2()" alt="���� ��ư">
										</div>
									</dd>
								</dl>

							</div>
						</div>

						<div style="text-align: center; margin-top: 50px;">
							<input type="image" id="applyPosY"
								src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_apply.jpg"
								alt="��û�ϱ�">
						</div>
						<img
							src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close_first.jpg"
							alt="�ݱ�" class="btn_close_first"
							onClick="javascript:btn_close('giftsRequest');"
							style="cursor: pointer">
					</div>
				</div>
			</div>

			<!-- �����Ϸ� :: �Է��Ͻ� �ּҷ� ����ǰ�� ��۵˴ϴ� :: -->
			<div class="layerPopup-wr">
				<div class="layerPopup" id="chkSuc" style="display: none;">
					<div class="tit">
						<span>�����Ϸ�</span>
					</div>
					<div class="layerPopupInner">

						<div class="txt1">
							<p class="desc">���� �����Ǿ����ϴ�.</p>
							<p class="desc">�����մϴ�.</p>
						</div>

						<!-- monitor -->
						<div class="txt2" id="div_deliver_pc_mon">
							<p class="desc">�� �Է��Ͻ� �ּҷ� ����ǰ�� ��۵˴ϴ�. (1�� �̳�)</p>
						</div>

						<div class="btn_center">
							<img
								src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_confirm.jpg"
								alt="Ȯ��" onclick="javascript:btn_close('chkSuc');"
								style="cursor: pointer">
						</div>
					</div>
					<img
						src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close.jpg"
						alt="�ݱ�" onclick="javascript:btn_close('chkSuc');"
						style="cursor: pointer" class="btn_close">
				</div>
			</div>
			<!-- //�����Ϸ� :: �Է��Ͻ� �ּҷ� ����ǰ�� ��۵˴ϴ� :: -->



			<!-- 2019.01.03:�߰�2 -->
			<!--2019 gram ���ǽ� ��� �� �ڼ�������-->
			<!-- <div class="layerPopup-wr" style="top: 33%; z-index: 8888;">
            <div class="layerPopup" id="layerInfo01" style="max-width: 840px; width: auto;">
                <div class="layerPopupInner">
                    <p><img style="width: 100%;" src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/popup_inter.jpg" alt=""></p>
                </div>
                <span  onclick="javascript:btn_close('layerInfo01');" class="btn_close02"></span>
            </div>
        </div> -->
			<!--//2019 gram ���ǽ� ��� �� �ڼ�������-->

			<!--20190307 ���� �ڼ�������-->
			<!-- <div class="layerPopup-wr" style="top: 72%; z-index: 8888;">
            <div class="layerPopup" id="layerInfo02" style="max-width: 840px; width: auto;">
                <div class="layerPopupInner">
                    <p><img style="width: 100%;" src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/popup_inter_game.jpg" alt=""></p>
                </div>
                <span onclick="javascript:btn_close('layerInfo02');" class="btn_close02"></span>
            </div>
        </div> -->
			<!--//20190307 ���� �ڼ�������-->
			<!-- //2019.01.03:�߰�2 -->

			<br>

			<!-- �����Ϸ� :: ���� �������� Ȯ�� �Է� :: -->
			<div class="layerPopup-wr">
				<div class="layerPopup" id="chkMy" style="display: none;">
					<div class="tit">
						<span>���� �������� Ȯ��</span>
					</div>
					<div class="layerPopupInner">
						<div class="submit_wr">
							<div class="inputForm">
								<dl>
									<dt>* ������ �̸�</dt>
									<dd>
										<input type="text" title="������ �̸� �Է�" style="width: 137px"
											id="user_name" name="user_name" maxlength="10">
									</dd>
								</dl>
							</div>

							<div class="inputForm">
								<dl>
									<dt>* �޴��� ��ȣ</dt>
									<dd style="width: 70%;">
										<select name="user_hp1" id="user_hp1" title="�޴��� ��ȣ ù��° �ڸ� ����">
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
											id="user_hp2" maxlength="4" title="�޴��� ��ȣ �߰��ڸ� �Է�"> -
										<input type="text" style="width: 32%" name="user_hp3"
											id="user_hp3" maxlength="4" title="�޴��� ��ȣ ���ڸ� �Է�">
									</dd>
								</dl>
							</div>

						</div>

						<div class="btn_center">
							<img
								src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_confirm.jpg"
								alt="Ȯ��" onClick="myJoinList();" style="cursor: pointer">
						</div>
					</div>
					<img
						src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close.jpg"
						alt="�ݱ�" class="btn_close"
						onclick="javascript:btn_close('chkMy');" style="cursor: pointer">
				</div>
			</div>
			<!-- //�����Ϸ� :: ���� �������� Ȯ�� �Է� :: -->

			<!-- �����Ϸ� :: ���� �������� Ȯ�� ����Ʈ :: -->
			<div class="layerPopup-wr">
				<div class="layerPopup" id="chkList" style="display: none;">
					<div class="tit">
						<span>���� �������� Ȯ��</span>
					</div>
					<div class="layerPopupInner">
						<div class="submit_wr">
							<p class="desc" id="myIntoText"></p>

							<div class="submitList">
								<div class="overflowTbl">
									<table style="width: 100%;">
										<caption>��������</caption>
										<colgroup>
											<col style="width: 31%; max-width: 160px">
											<col style="width: 23%; max-width: 100px">
											<col style="width: 46%; max-width: 230px">
										</colgroup>
										<thead>
											<tr>
												<th scope="col" style="width: 160px"><span>��ǰ</span></th>
												<th scope="col" style="width: 100px"><span>������</span></th>
												<th scope="col" style="width: 230px"><span>����ǰ</span></th>
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
								alt="Ȯ��" onclick="javascript:btn_close('chkList');"
								style="cursor: pointer">
						</div>
					</div>
					<img
						src="/lgekor/asset/event/pc/2021/01/04_pc/_include/images/btn_close.jpg"
						alt="�ݱ�" class="btn_close"
						onclick="javascript:btn_close('chkList');" style="cursor: pointer">
				</div>
			</div>
			<!-- //�����Ϸ� :: ���� �������� Ȯ�� ����Ʈ :: -->
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
