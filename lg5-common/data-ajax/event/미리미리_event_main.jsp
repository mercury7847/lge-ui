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
	String isOpen = "N";	// �̺�Ʈ ���� ���� N:����� �̺�Ʈ, Y:�������� �̺�Ʈ
	
	int event_id = 6418;	//�
	
	EventCommonJoinControl eventJoinControl = new EventCommonJoinControl();
	LData eventMasterData = new LData();
	eventMasterData.setInt("event_id", event_id);
	eventMasterData = eventJoinControl.selectEventMasterDetail(eventMasterData);
	
	String nowDate = eventMasterData.getString("nowDate");	// ���� ��¥ �ð�
	String eventStartTime = eventMasterData.getString("eventStartTime");	// �̺�Ʈ ���� ��¥ �ð�
	String eventEndTime = eventMasterData.getString("eventEndTime");
	String delDate = eventMasterData.getString("cDelDate");		// �̺�Ʈ �������� ������
	
	if (Long.parseLong(nowDate) <= Long.parseLong(eventEndTime)) isOpen = "Y";	// �̺�Ʈ ���� �Ⱓ�� ���
	
	//������������ �߰����ڸ�- �������� �ƴ� �� �߰�
	
	String strTime = nowDate;
		
		//2019. 08. 20 (ȭ)  23:00 ~ 2019. 08. 21 (��) 09:00
		//String t1 = "20200609090000";//���˽��� -- test
		
		String t1 = "20200611230000";//���˽���
        String t2 = "20200612090000";//��������
         
		if (Long.parseLong(strTime) >= Long.parseLong(t1) && Long.parseLong(strTime) <= Long.parseLong(t2)) {
			%>
			<script type="text/javascript">
			    var txt = "����� ���� �Ͻ� �������� ���� ���� ���� �̿��� ��ƽ��ϴ�."
			            +"\n"
			            +"���� �ð� ���Ŀ� �ٽ� �õ� ��Ź�帳�ϴ�."
			            +"\n"
			            +"\n"
			            +"���� �ð�: ����� 23:00 ~ �ݿ��� 09:00";
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
<title>LG����</title>
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
		<h1>LG����</h1>
		<h2>2018 LG���� EVENT</h2>
		<h3>����! �� �ʿ��Ͻ� ��ǰ ��������? �̸��̸� �佺Ƽ��!</h3>
		<dl>
			<dt>����Ⱓ</dt>
			<dd>�ſ� 1�� ~ ���ϱ���</dd>
			<dt>��ǥ��</dt>
			<dd>�ſ� 15�� ��÷ (��ǥ����Ʈ ����/��������)</dd>
		</dl>
		<p>���� ��� ��ǰ�� üũ�� �ϸ� �ſ� Ǫ���� ������ ����!</p>		
		<p>�̺�Ʈ �����ϱ⸦ ���� ���� ��� ��ǰ�� �����Ͻø� �ſ� ��÷�� ���� ����� ����Ʈ�� ������ �帳�ϴ� </p>
		<dl>
			<dt>1��(1��)</dt>
			<dd>����� ����Ʈ 50�� ����!</dd> 
			<dt>2��(3��)</dt>
			<dd>����� ����Ʈ 30�� ����!</dd> 
			<dt>3��(30��)</dt>
			<dd>����� ����Ʈ 5�� ����!</dd>
		</dl>
		<h4>�̸��̸� �佺Ƽ�� �������</h4>
		<ol>
			<li>STEP 01. ��������/����� ����</li>
			<li>STEP 02. ������� ��ǰ ����</li>
			<li>STEP 03. ����Ϸ�!</li>
		</ol>
		<p>�Ʒ� ��ư�� �����ø� �̺�Ʈ ������ ���� �������� �� ������� ��ǰ���� �������� �̵��մϴ�. </p>		
	</div>
<% if(isOpen.equals("Y")) { %>
	<a href="#none" onclick="pop_type('1','/lgekr/event/membership/2014/08/13_promo/membership_promotion.jsp?event_id=<%=event_id %>&amp;kw=<%=kw %>&amp;channel=<%=channel %>','690','900')" class="btn_blank btn_participation">�̺�Ʈ �����ϱ�</a>
<% } %>

<!-- 2018�� �̸��̸� �̺�Ʈ ��ο��� Start 20181218 ����
<a href="/lgekr/event/bestshop/2017/11/17_festival_2018/event_main.html" class="btn_link" target="_blank">�ڼ�������</a>
2018�� �̸��̸� �̺�Ʈ ��ο��� End-->

	<div class="hidden_txt">
		<dl>
			<dt>���! ����ʰ��� �ƴϽö��?</dt>
			<dd>�� ���� LG bestshop ����� ������ ��� �̺�Ʈ��, ����� ���� ���� �ƴϽ� ��� ����� ���� (�������� �߰�����) �� �Բ� �̺�Ʈ�� ���� �Ͻ� �� �ֽ��ϴ�.</dd>
		</dl>
		<h4>�� �˾Ƶμ���!</h4>
		<ul>
			<li>��÷�� ��ǥ �� 7�ϰ� ������ ���� �ʴ� ��� ��÷�� ��ҵ˴ϴ�. </li>
			<li>LG���� ����Ʈ�� ����� ���� ���Ͽ� ��÷ �� ����� ����Ʈ�� �����˴ϴ�.</li>
			<li>��� ����� ����Ʈ�� ��� ������ ���� ����� �� �ֽ��ϴ�. </li>
			<li>����� ����Ʈ�� �絵�� �Ұ����մϴ�. </li>
			<li>����� ����Ʈ�� �̺�Ʈ ���� �� �ۼ��� ������ ������ �������� ���޵˴ϴ�. </li>
		</ul>
	</div>
</div>
<!-- //event_wr -->	
</body>
</html>
