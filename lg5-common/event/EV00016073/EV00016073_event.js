var submitCnt = 0;
var serial_btn_cnt = 0; 
var num = "{}[]()<>?|`~'!@#$%^&*-+=,.;:\"'\\/ ";
var eventPath = "/YYYY_2021/MM_04/airCompensatorySale/";
var mainUrl = eventPath + "event_main.jsp";
var submitUrl = eventPath + "event_proc.jsp";

$(document).ready(function() {

	//��� �� �ڼ��� ����
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
	
	//������ȣ
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

	//�ŷ�������
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

	// �̸��� �ּ� ���� �� 
    $("#email3").change(function() {
        var email =  $("#email3").val(); 
        var email1 = $("#email1").val();
        if(email != ""){
        	$("#email2").val(email);
        	$("#email2").attr("readonly", true);
        		if(email1 != "") {
				setTimeout(function() {
					alert("�̸��� �ּҸ�  ��Ȯ�ϰ� �Է��Ͽ����� �ٽ� �ѹ�  Ȯ�����ּ���.");
				}, 300);
        	}
        }else{
        	$("#email2").val("");
        	$("#email2").removeAttr("readonly");
        }
    });

    //�̸��� �ۼ� Ȯ�� �˾�
	$("#email2").on("blur", function() {
		alert("�̸��� �ּҸ�  ��Ȯ�ϰ� �Է��Ͽ����� �ٽ� �ѹ�  Ȯ�����ּ���.");
	});
    
	//����ǰ�𵨸�,����ǰ������ȣ ����/���ڸ� ����
    $("#oldModelName, #serialNo").keyup(function(event){
		if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
			var inputVal = $(this).val();
			$(this).val(inputVal.replace(/[��-����-�Ӱ�-��]/gi,''));
		}
    });
     
	$("#myName, #branch, #serialNo,#oldModelName").keyup(function() {
        var str = jQuery.trim(this.value);
        var bFlag = true;
        for (var i=0;i<str.length;i++) {
            if (num.indexOf(str.charAt(i)) != -1) bFlag = false;

            if (!bFlag) {
                alert("Ư������ �� ����� �Է��Ͻ� �� �����ϴ�.");
                $(this).val("");
                $(this).focus();
                return false;
            }
        }
    });
		
	
    
    //�ø����ȣ �빮�ڷ� ��ȯ
    $("#serialNo").bind('keyup', function() {
        $(this).val($(this).val().toUpperCase());   
        if ($("#serialNo").val().length > 12)  {
            $("#serialNo").val($("#serialNo").val().substr(0,12));
        }
    });
    
       //����ǰ�𵨸� �빮�ڷ� ��ȯ
    $("#oldModelName").bind('keyup', function() {
        $(this).val($(this).val().toUpperCase());   

    });
  
  
	
	// ���� ��
    $("#purchaseYear").change(function() {
        var sel_year =  $("#purchaseYear").val();
        
        /*��¥ ���ϱ�*/
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1.
		var day = date.getDate();
		/*��¥ ���ϱ�*/
        
        var startM = 1;
        var endM   = 4;
        
        
        
        var mOptionStr = "<option value=''>����</option>";

        if(sel_year!=""){

            for (var i=startM;i<=endM;i++) {
                var tmp = "";
                if (i < 10) tmp = "0"+i; else tmp = ""+i;
                 mOptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
            }
        }

        $("#purchaseMonth").html(mOptionStr);
        $("#purchaseDate").html("<option value=''>����</option>");

    });


    // ���� ��
    $("#purchaseMonth").change(function() {
        var sm =  $("#purchaseMonth").val(); //�� ���� �Ҷ� ���
        var startday= 1;
        var endday= 31;

        var dOptionStr = "<option value=''>����</option>";

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

    // ��ġ ��
    $("#producInstallYear").change(function() {
        var sel_year =  $("#producInstallYear").val();
        
        /*��¥ ���ϱ�*/
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1.
		var day = date.getDate();
		/*��¥ ���ϱ�*/
        
        var startM = 1;
        var endM   = 4;
        
        
        
        var mOptionStr = "<option value=''>����</option>";

        if(sel_year!=""){

            for (var i=startM;i<=endM;i++) {
                var tmp = "";
                if (i < 10) tmp = "0"+i; else tmp = ""+i;
                 mOptionStr += "<option value='"+tmp+"'>"+tmp+"</option>";
            }
        }

        $("#producInstallMonth").html(mOptionStr);
        $("#producInstallDate").html("<option value=''>����</option>");

    });


    // ��ġ ��
    $("#producInstallMonth").change(function() {
        var sm =  $("#producInstallMonth").val(); //�� ���� �Ҷ� ���
        var startday= 1;
        var endday= 31;

        var dOptionStr = "<option value=''>����</option>";

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
        var dOptionStr = "<option value=''>����</option>";

        if( $(this).val() == "��������" ){
			dOptionStr += "<option value='LG����Ʈ��'>LG����Ʈ��</option>";
			dOptionStr += "<option value='���̸�Ʈ'>���̸�Ʈ</option>";
			dOptionStr += "<option value='���ڷ���'>���ڷ���</option>";
			dOptionStr += "<option value='�̸�Ʈ Ʈ���̴���'>�̸�Ʈ Ʈ���̴���</option>";
			dOptionStr += "<option value='�̸�Ʈ'>�̸�Ʈ</option>";
			dOptionStr += "<option value='Ȩ�÷���'>Ȩ�÷���</option>";
			dOptionStr += "<option value='�ڽ�Ʈ��'>�ڽ�Ʈ��</option>";			
			dOptionStr += "<option value='��ȭ��_�Ե�'>��ȭ��_�Ե�</option>";
			dOptionStr += "<option value='��ȭ��_�ż���'>��ȭ��_�ż���</option>";
			dOptionStr += "<option value='��ȭ��_����'>��ȭ��_����</option>";
			dOptionStr += "<option value='��ȭ��_AK'>��ȭ��_AK</option>";
			dOptionStr += "<option value='��ȭ��_��������'>��ȭ��_��������</option>";
			dOptionStr += "<option value='��ȭ��_�뱸'>��ȭ��_�뱸</option>";
			dOptionStr += "<option value='��Ÿ'>��Ÿ</option>";
        }else if( $(this).val() == "�¶���" ){
        	dOptionStr += "<option value='���̸�Ʈ��'>���̸�Ʈ��</option>";
			dOptionStr += "<option value='11����'>11����</option>";
			dOptionStr += "<option value='G����'>G����</option>";
			dOptionStr += "<option value='����'>����</option>";
			dOptionStr += "<option value='������'>������</option>";
			dOptionStr += "<option value='����'>����</option>";
			dOptionStr += "<option value='G9'>G9</option>";
			dOptionStr += "<option value='�߿�����������'>�߿�����������</option>";
			dOptionStr += "<option value='������ũ'>������ũ</option>";
			dOptionStr += "<option value='CJ Mall'>CJ Mall</option>";
			dOptionStr += "<option value='�ż����'>�ż����</option>";
			dOptionStr += "<option value='�Ե���'>�Ե���</option>";
			dOptionStr += "<option value='GS SHOP'>GS SHOP</option>";
			dOptionStr += "<option value='���ڷ����'>���ڷ����</option>";
			dOptionStr += "<option value='��Ÿ'>��Ÿ</option>";
        }else if( $(this).val() == "Ȩ����" ){
        	dOptionStr += "<option value='CJȨ����'>CJȨ����</option>";
			dOptionStr += "<option value='H��'>H��</option>";
			dOptionStr += "<option value='�Ե�Ȩ����'>�Ե�Ȩ����</option>";
			dOptionStr += "<option value='����Ȩ����'>����Ȩ����</option>";
			dOptionStr += "<option value='GSȨ����'>GSȨ����</option>";
			dOptionStr += "<option value='NHȨ����'>NHȨ����</option>";
			dOptionStr += "<option value='��Ÿ'>��Ÿ</option>";
        }

         $("#channel").html(dOptionStr);
    });
      
    
	 $('#model1').on('change', function(e){
    	
    	var dOptionStr = "<option value=''>����</option>";
    	    	
        if( $(this).val() == "LG�ּ���󿡾���" ){
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
			//20210118�߰����� FQ17SADWEN.AKOR �Ʒ�
			dOptionStr += "<option value='FQ20SADWRN.AKOR'>FQ20SADWRN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWRZ.AKOR'>FQ20SADWRZ.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWSN.AKOR'>FQ20SADWSN.AKOR</option>";
			dOptionStr += "<option value='FQ20SADWSZ.AKOR'>FQ20SADWSZ.AKOR</option>";
			//20210118�߰���
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
			//2021�Ÿ��߰� 20210122�ݿ�
			dOptionStr += "<option value='FQ18SBDWGN.AKOR'>FQ18SBDWGN.AKOR</option>";	//��� �����
			dOptionStr += "<option value='FQ18SBDWHN.AKOR'>FQ18SBDWHN.AKOR</option>";	//��� �����
			dOptionStr += "<option value='FQ17SBDWCN.AKOR'>FQ17SBDWCN.AKOR</option>";	//��� �����
			dOptionStr += "<option value='FQ18SBDWAN.AKOR'>FQ18SBDWAN.AKOR</option>";	//��� �����
			dOptionStr += "<option value='FQ18SBDWBN.AKOR'>FQ18SBDWBN.AKOR</option>";	//��� �����
			dOptionStr += "<option value='FQ18SBDWGZ.AKOR'>FQ18SBDWGZ.AKOR</option>";	//��� �����(2021.04.12 �Ÿ� �߰�)
			dOptionStr += "<option value='FQ18HBDWAN.AKOR'>FQ18HBDWAN.AKOR</option>";	//��� ��Ʈ
			dOptionStr += "<option value='FQ18HBDWBN.AKOR'>FQ18HBDWBN.AKOR</option>";	//��� ��Ʈ
			// 2021�Ÿ��߰� 20210322 �߰� ��û			 
			dOptionStr += "<option value='FQ20DBDWAN.AKOR'>FQ20DBDWAN.AKOR</option>";//��� �𷰽�
			dOptionStr += "<option value='FQ18DBDWAN.AKOR'>FQ18DBDWAN.AKOR</option>";//��� �𷰽�
			dOptionStr += "<option value='FQ17DBDWCN.AKOR'>FQ17DBDWCN.AKOR</option>";//��� �𷰽�
			dOptionStr += "<option value='FQ18VBDWEN.AKOR'>FQ18VBDWEN.AKOR</option>";//��� ���丮
			dOptionStr += "<option value='FQ18VBDWFN.AKOR'>FQ18VBDWFN.AKOR</option>";//��� ���丮
			dOptionStr += "<option value='FQ23VBDWAN.AKOR'>FQ23VBDWAN.AKOR</option>";//��� ���丮
			dOptionStr += "<option value='FQ18VBDWAN.AKOR'>FQ18VBDWAN.AKOR</option>";//��� ���丮
			dOptionStr += "<option value='FQ23VBDWBN.AKOR'>FQ23VBDWBN.AKOR</option>";//��� ���丮
			dOptionStr += "<option value='FQ18VBDWBN.AKOR'>FQ18VBDWBN.AKOR</option>";//��� ���丮
			dOptionStr += "<option value='FQ19VBDWCN.AKOR'>FQ19VBDWCN.AKOR</option>";//��� ���丮
			dOptionStr += "<option value='FQ17VBDWCN.AKOR'>FQ17VBDWCN.AKOR</option>";//��� ���丮
			
        } else if( $(this).val() == "��Ÿ" ){
        	dOptionStr += "<option value='FQ27GASMAZ.AKOR'>FQ27GASMAZ.AKOR</option>";// �ñ״�ó
			dOptionStr += "<option value='FQ27GASMAN.AKOR'>FQ27GASMAN.AKOR</option>";// �ñ״�ó
			dOptionStr += "<option value='FW23GASMAZ.AKOR'>FW23GASMAZ.AKOR</option>";// �ñ״�ó
			dOptionStr += "<option value='FW23GASMAN.AKOR'>FW23GASMAN.AKOR</option>";// �ñ״�ó
			dOptionStr += "<option value='FQ27SACCAN.AKOR'>FQ27SACCAN.AKOR</option>";//ũ���
			dOptionStr += "<option value='FQ25SACCAN.AKOR'>FQ25SACCAN.AKOR</option>";//ũ���
			dOptionStr += "<option value='FQ27SACCAZ.AKOR'>FQ27SACCAZ.AKOR</option>";//ũ���
			dOptionStr += "<option value='FQ20VAWWTN.AKOR'>FQ20VAWWTN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ20VAWWAN.AKOR'>FQ20VAWWAN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ20VAKWUN.AKOR'>FQ20VAKWUN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ20VAKWAN.AKOR'>FQ20VAKWAN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VAWWTN.AKOR'>FQ18VAWWTN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VAWWAZ.AKOR'>FQ18VAWWAZ.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VAWWAN.AKOR'>FQ18VAWWAN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VAKWUN.AKOR'>FQ18VAKWUN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VAKWLN.AKOR'>FQ18VAKWLN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VAKWAZ.AKOR'>FQ18VAKWAZ.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VAKWAN.AKOR'>FQ18VAKWAN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ17VAWWCN.AKOR'>FQ17VAWWCN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ17VAKWCN.AKOR'>FQ17VAKWCN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ17V9WWCN.AKOR'>FQ17V9WWCN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ17V9KWCN.AKOR'>FQ17V9KWCN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ17V9KWAN.AKOR'>FQ17V9KWAN.AKOR</option>";//����/ĭ
			//2021�Ÿ��߰� 20210322 �߰� ��û
			dOptionStr += "<option value='FQ20VBWWAN.AKOR'>FQ20VBWWAN.AKOR</option>";//����/ĭ
			dOptionStr += "<option value='FQ18VBWWAN.AKOR'>FQ18VBWWAN.AKOR</option>";	//����/ĭ
			dOptionStr += "<option value='FQ20VBKWAN.AKOR'>FQ20VBKWAN.AKOR</option>";	//����/ĭ
			dOptionStr += "<option value='FQ18VBKWAN.AKOR'>FQ18VBKWAN.AKOR</option>";	//����/ĭ
			dOptionStr += "<option value='FQ17VBWWCN.AKOR'>FQ17VBWWCN.AKOR</option>";	//����/ĭ
			dOptionStr += "<option value='FQ17VBKWCN.AKOR'>FQ17VBKWCN.AKOR</option>";	//����/ĭ
        }else if( $(this).val() == "LG�ּ�Ÿ��������" ){ //2021 �Ÿ��߰�
        	dOptionStr += "<option value='FQ25LBNRAN.AKOR'>FQ25LBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20LBNRAN.AKOR'>FQ20LBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ25LBNBPN.AKOR'>FQ25LBNBPN.AKOR</option>";
			dOptionStr += "<option value='FQ25LBNRAZ.AKOR'>FQ25LBNRAZ.AKOR</option>";//�ּ� Ÿ�� ���Ÿ�(2021.04.12 �Ÿ� �߰�)
			dOptionStr += "<option value='FQ25SBNWGN.AKOR'>FQ25SBNWGN.AKOR</option>";
			dOptionStr += "<option value='FQ20SBNWGN.AKOR'>FQ20SBNWGN.AKOR</option>";
			dOptionStr += "<option value='FQ18SBNWGN.AKOR'>FQ18SBNWGN.AKOR</option>";
			dOptionStr += "<option value='FQ25SBNWHN.AKOR'>FQ25SBNWHN.AKOR</option>";
			dOptionStr += "<option value='FQ20SBNWHN.AKOR'>FQ20SBNWHN.AKOR</option>";
			dOptionStr += "<option value='FQ18SBNWHN.AKOR'>FQ18SBNWHN.AKOR</option>";
			dOptionStr += "<option value='FQ18SBNWGZ.AKOR'>FQ18SBNWGZ.AKOR</option>";//�ּ� Ÿ�� �����(2021.04.12 �Ÿ� �߰�)
			dOptionStr += "<option value='FQ18SBNWAN.AKOR'>FQ18SBNWAN.AKOR</option>";//�ּ� Ÿ�� �����(2021.04.23 �Ÿ� �߰�)
			dOptionStr += "<option value='FQ18SBNWBN.AKOR'>FQ18SBNWBN.AKOR</option>";//�ּ� Ÿ�� �����(2021.04.23 �Ÿ� �߰�)
			dOptionStr += "<option value='FQ18SBNWAZ.AKOR'>FQ18SBNWAZ.AKOR</option>";//�ּ� Ÿ�� �����(2021.04.23 �Ÿ� �߰�)
			dOptionStr += "<option value='FQ18SBNWBZ.AKOR'>FQ18SBNWBZ.AKOR</option>";//�ּ� Ÿ�� �����(2021.04.23 �Ÿ� �߰�)
			dOptionStr += "<option value='FQ25PBNRAN.AKOR'>FQ25PBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20PBNRAN.AKOR'>FQ20PBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ18PBNRAN.AKOR'>FQ18PBNRAN.AKOR</option>";
			dOptionStr += "<option value='FQ20PBNBPN.AKOR'>FQ20PBNBPN.AKOR</option>";
			dOptionStr += "<option value='FQ18PBNBPN.AKOR'>FQ18PBNBPN.AKOR</option>";
			dOptionStr += "<option value='FQ18PBNRAZ.AKOR'>FQ18PBNRAZ.AKOR</option>";//�ּ� Ÿ�� �����̾�(2021.04.12 �Ÿ� �߰�)
        }else if( $(this).val() == "LG�������÷��ǿ�����" ){ //2021 �Ÿ��߰�
        	dOptionStr += "<option value='FQ25LBNBAN.AKOR'>FQ25LBNBAN.AKOR</option>";
        	dOptionStr += "<option value='FQ25LBNBAZ.AKOR'>FQ25LBNBAZ.AKOR</option>";// ������ ���Ÿ� (2021.04.12 �Ÿ� �߰�)
        	dOptionStr += "<option value='FQ20PBNBAN.AKOR'>FQ20PBNBAN.AKOR</option>";
        	dOptionStr += "<option value='FQ18PBNBAN.AKOR'>FQ18PBNBAN.AKOR</option>";
			dOptionStr += "<option value='FQ18PBNBAZ.AKOR'>FQ18PBNBAZ.AKOR</option>";// ������ �����̾�(2021.04.12 �Ÿ� �߰�)
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
			$(this).val() == "FQ20VBWWAN.AKOR" ||  //2021�Ÿ��߰� 20210322 �߰� ��û
			$(this).val() == "FQ18VBWWAN.AKOR" ||
			$(this).val() == "FQ20VBKWAN.AKOR" ||
			$(this).val() == "FQ18VBKWAN.AKOR" ||
			$(this).val() == "FQ17VBWWCN.AKOR" ||
			$(this).val() == "FQ17VBKWCN.AKOR"	
		){
    		$("#priceVal").html(" 50,000��");
    		$("#giftVal").val("50,000��");
    		
    	} else if( $(this).val() == "" ) {
    		$(".price").hide();
    		$("#priceVal").html(" 0��");
    		$("#giftVal").val("0��");
    	}  else {
    		$("#priceVal").html(" 100,000��");
    		$("#giftVal").val("100,000��");
    	}
    	
        
    });
    
    //������ȣȮ��-�����ʿ� (������ȣ ��ȿ��, �ߺ� üũ)
	$("#btn_product").click(function() {
		
		var snCnt = 0;
		$("#prdChk").val('N');

		if ( !validatePrd() ) {
			$("#prdChk").val('N');
		}else{			
			eventModelChk(); //������ȣ ��ȿ��, �ߺ� üũ
		}
	});	
	
	init();
	initEventHandlers();
});

//��������, ��޵���, ��������, �������� ��
function gocheck(str1,str2){
    $("#"+str1).val(str2);
}

//�ø����ȣ ��ȿ�� �� �ߺ� üũ
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

//��, �ø��� ��ȣ ���� üũ
function validatePrd(){
     var prdCheck = true;
     
	  if (prdCheck && $.trim($("#model1").val()) === "") {
        alert("���� ��ǰ���� �������ּ���.");
        $("#model1").focus();
        prdCheck = false;
    }
    
    if (prdCheck && $.trim($("#model2").val()) === "") {
        alert("���� �𵨸��� �������ּ���.");
        $("#model2").focus();
        prdCheck = false;
    }

    if (prdCheck && $.trim($("#serialNo").val()).length != 12 ) {
        alert("������ȣ Ȯ���� ���ּ���.");
        $("#serialNo").focus();
        prdCheck = false;
    }
    return prdCheck;
}



function initEventHandlers() {
	//������ �̸� Ư������ ����
	$("#firstName").on("keyup", function() {
		var str = $.trim(this.value);
		var bFlag = true;
		
		for (var i=0;i<str.length;i++) {
			if (num.indexOf(str.charAt(i)) != -1) bFlag = false;

			if (!bFlag) {
				alert("Ư�����ڴ� �Է��Ͻ� �� �����ϴ�.");
				$("#firstName").val("");
				$("#firstName").focus();
				return false;
			}
		}
	});
	
	// ������ �޴���ȭ��ȣ�� ���ڸ�
	$("#hp1").css('imeMode', 'disabled').keypress(function(event){
		if (event.which && (event.which < 48 || event.which > 57)) {
			event.preventDefault();  //��������
			
		}
		
	}).keyup(function() {
		if ($(this).val() != null && $(this).val() != '') {
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
			
		}
		
	});

	$("#hp2").css('imeMode', 'disabled').keypress(function(event){
		if (event.which && (event.which < 48 || event.which > 57)) {
			event.preventDefault(); //��������
			
		}
		
	}).keyup(function() {
		if ($(this).val() != null && $(this).val() != '') {
			$(this).val($(this).val().replace(/[^0-9]/g, ''));
			
		}
		
	});
	
	//�������� ���� �׸�
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

//  ���̾��˾� ����/����� ����
var layerPop = function(obj){
	$(obj).show();
}
var layerClose = function(obj){
	$(obj).hide();
}

//loginStatus ��ȿ�� üũ 

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
			//�ٽ� �α��� ��û unifyId���� �ٸ���� �ٽ� �α��� ��û
			if($('#unifyId').val() != json.unifyId){
				loginStatus = "forcelogin";
			}
		},
		error: function(request, status, error) {
			alert("������ �߻��Ͽ����ϴ�.");
			return;
		}
	});	
	return loginStatus;
}


// �̺�Ʈ �����ϱ� ���̾��˾� ����
function eventEntry1() {
	var loginStatus = eventSsoCheck();
	/* ����ȸ�� �׽�Ʈ�Ⱓ ���� �켱 �������� �ٲ�� �ݿ��� ���� 
	isOpen = "Y" ;//�׽�Ʈ
	mainLoginYn = "Y" ;//�׽�Ʈ
	loginStatus = "active";//�׽�Ʈ
	*/
	/* ����ȸ�� �׽�Ʈ�Ⱓ ���� �켱 �������� �ٲ�� �ݿ��� ���� */
	
	if(isOpen==="Y"){
		//var fnLoginEventUrl = fnLoginEvent(serverType);
		
		if(mainLoginYn == "Y" && loginStatus == "active"){
			layerPop(".event_popup");
			$(".dim1").show();
			document.getElementById("event_popup").scrollIntoView();
		}else{
			var fnLoginEventUrl = "";
			if(loginStatus == "forcelogin"){
				fnLoginEventUrl = fnForceLoginEvent(serverType);
			}else{
				fnLoginEventUrl = fnLoginEvent(serverType);
			}
			
			alert("�� �̺�Ʈ�� LG���� ȸ�� �α��� �� ���� �����մϴ�.");
			top.location.href = fnLoginEventUrl;
		}
	}else{
		alert("�̺�Ʈ �Ⱓ�� �ƴմϴ�.");
	}
}

// �̺�Ʈ �����ϱ� ���̾��˾� �ݱ�
function eventEntryClose() {
	if(confirm("�̺�Ʈ ���� ����Ͻðڽ��ϱ�?") == true){
		layerClose(".event_popup");
		init();
		layerInit();
		self.close();
		
	}else{
		
		return; 
		
	}
	
}
function init(){//�Է� �� �ʱ�ȭ

	document.frm.reset();
	$("#agree01").val("");
	$("#agree02").val("");
	
	$("#serialNo").attr("readonly",false);

}

// �̺�Ʈ �������
function eventCmpltfail() {
	layerClose(".event_popup");
	$(".dim1").hide();
	init();
	layerInit();
	location.reload();
	
}

// �̺�Ʈ ����Ϸ� �˾� �ݱ�
function eventSucClose() {
	layerClose(".popup_eventCmplt");
	$(".dim1").hide();
	init();
	layerInit();
	location.reload();
	
}

function layerInit(){//�Է� �� �ʱ�ȭ
	document.frm.reset();
	$("#agree01").val("");
	$("#agree02").val("");
	$("#serialNo").attr("readonly",false);

}


//�����ϱ� ���μ���
function goProc() {
	var frmCheck = true;
	var frm = document.frm;
	
	if (frmCheck && isOpen === "N") {
		alert("�̺�Ʈ�� ���� �Ǿ����ϴ�.");
		frmCheck = false;
		
	}
	
	if (submitCnt > 0) {
		alert(" ó�����Դϴ�. ");
		frmCheck = false;
		
	}
    
    if (frmCheck && !$("input[id='agree01_01']").is(":checked")) {
        alert("[�ʼ�]�������� ���� �̿� ���Ǹ� üũ�� �ֽʽÿ�.");
        //üũ,���� ��Ŀ�� �̵�
        scroll_move( "agree01_01" );
        frmCheck = false;
    }

    if (frmCheck && !$("input[id='agree02_01']").is(":checked")) {
        alert("[�ʼ�]�������� ó�� ��Ź ���Ǹ� üũ�� �ֽʽÿ�.");
        //üũ,���� ��Ŀ�� �̵�
        scroll_move( "agree02_01" );
        frmCheck = false;
    }
    if (frmCheck && submitCnt > 0) {
        alert("ó���� �Դϴ�.");
        frmCheck = false;
    }
    
    //1.������
    if(frmCheck && $.trim($("#email1").val()) === ""){
		alert("�̸��� �ּҸ� �Է����ּ���.");
		$("#email1").focus();
		frmCheck = false;
	}
	
	if(frmCheck && $.trim($("#email2").val()) === ""){
		alert("�̸��� �ּҸ� �Է����ּ���.");
		$("#email3").focus();
		frmCheck = false;
	}
	
	var fullEmail = $("#email1").val() + "@" + $("#email2").val(); 
	
	if(frmCheck && !chkEmail(fullEmail)){//�̸��� üũ
		alert("��ȿ���� ���� �̸��� �Դϴ�.");
		$("#email3").focus();
		frmCheck = false;
	}
	//2. ������ǰ����
	 if (frmCheck && $.trim($("#productType").val()) === "") {
		alert("��ǰ Ÿ���� �Է����ּ���.");
		$("#productType").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#manufactureYear").val()) === "") {
		alert("���� �⵵�� �Է����ּ���.");
		$("#manufactureYear").focus();
		frmCheck = false;
	}
	
	if (frmCheck && $.trim($("#manufactureCompany").val()) === "") {
		alert("�����縦 �Է����ּ���.");
		$("#manufactureCompany").focus();
		frmCheck = false;
	}
	
	if (frmCheck && $.trim($("#oldModelName").val()) === "") {
		alert("�𵨸��� �Է����ּ���.");
		$("#oldModelName").focus();
		frmCheck = false;
	}
	if ( frmCheck && $.trim($("#ptUpload1").val()) === "") {
		alert("��ǰ������ ����� �ֽʽÿ�.");
		$("#ptUpload1").val("");
		$("#oldProduct").val("");
		$("#oldProduct").focus();
		frmCheck = false;
	}
	
	 
	 
	//3.�Ÿ�����
	if (frmCheck && $.trim($("#purchaseYear").val()) === "") {
		alert("���ų⵵�� �������ּ���.");
		$("#purchaseYear").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#purchaseMonth").val()) === "") {
		alert("���ſ��� �������ּ���.");
		$("#purchaseMonth").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#purchaseDate").val()) === "") {
		alert("�������� �������ּ���.");
		$("#purchaseDate").focus();
		frmCheck = false;
	}
    if (frmCheck && $("#place").val() === "") {
        alert("���� ��Ҹ� �������ּ���.");
        $("#place").focus();
        frmCheck = false;
    }
     if (frmCheck && $("#channel").val() === "") {
        alert("����ä���� �������ּ���.");
        $("#channel").focus();
        frmCheck = false;
    }
    
    if (frmCheck && $.trim($("#branch").val()) === "") {
        alert("�������� �Է����ּ���.");
        $("#branch").focus();
        frmCheck = false;
    }

     if (frmCheck && $.trim($("#newProductType").val()) === "") {
		alert("��ǰ Ÿ���� �Է����ּ���.");
		$("#newProductType").focus();
		frmCheck = false;
	}
     
   	if ( frmCheck && !validatePrd() ) {
        frmCheck = false;
    }
   	
   	//üũ �� ��ǰ��
	if (frmCheck && $("#prdChk").val() != "Y"  ) {
		alert("������ȣ Ȯ���� ���ּ���.");
		$("#btn_product").focus();
		frmCheck = false;
	}
    
    if ( frmCheck && $.trim($("#ptUpload2").val()) === "") {
		alert("������ȣ������ ����� �ֽʽÿ�.");
		$("#ptUpload2").val("");
		$("#productPic").val("");
		$("#productPic").focus();
		frmCheck = false;
	}
    
	if ( frmCheck && $.trim($("#ptUpload3").val()) === "") {
		alert("�ŷ������� ����� �ֽʽÿ�.");
		$("#ptUpload3").val("");
		$("#receipt").val("");
		$("#receipt").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#producInstallYear").val()) === "") {
		alert("��ǰ��ġ �⵵�� �������ּ���.");
		$("#producInstallYear").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#producInstallMonth").val()) === "") {
		alert("��ǰ��ġ���� �������ּ���.");
		$("#producInstallMonth").focus();
		frmCheck = false;
	}
	if (frmCheck && $.trim($("#producInstallDate").val()) === "") {
		alert("��ǰ��ġ���� �������ּ���.");
		$("#producInstallDate").focus();
		frmCheck = false;
	}
	
	//4.��ǰ������
	if (frmCheck && $.trim($("#giftCard").val()) === "") {
        alert("����� ��ǰ���� �������ּ���.");
        $("#giftCard").focus();
        frmCheck = false;
    }
    
	   
	if (frmCheck) {
		var confirmTxt = "���� ������ �Ұ��մϴ�. �ٽ� �� �� Ȯ�����ּ���!\n"
						+ "�Է��Ͻ� �������� �����Ͻðڽ��ϱ�?\n"
		var ck = confirm(confirmTxt);

		if(ck == true){//Ȯ��

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
					dataLayer.push({				
        			  'event': 'customEvent',				
        			  'customEventCategory': '�̺�Ʈ',				
        			  'customEventAction': '�̺�Ʈ - ��û �Ϸ�',				
        			  'customEventLabel': '������ : '+'${eventTitle}'
					});		
					self.close();
				},
				error: function(request, status, error) {
					alert("������ �߻��߽��ϴ�.\n�����ڿ��� �����ϼ���.");
					return;
				}
			});
	    }
	    
	} else {
		return false; 
		
	}
	
}

function proc_result(resultCode){

    if (resultCode == "1") {
        alert("���� �� �̺�Ʈ �Դϴ�.");
        submitCnt = 0;//�ߺ�Ŭ�� ����
        eventCmpltfail();
        goUrl();
    } else if (resultCode == "2") {
        alert("�߸��� ���� �Դϴ�.\n���ΰ�ħ �� �ٽ� �õ��� �ּ���.("+resultCode+")");
        submitCnt = 0;
        eventCmpltfail();
        goUrl();

    } else if(resultCode == "14" || resultCode == "15") {
		//ȸ�� �α��ο��� üũ - ȸ������ ����
		alert("�α��� ������ �����ϴ�. �ٽ� �α������ֽñ� �ٶ��ϴ�.");
		goUrl();
    } else if (resultCode == "3") {
        alert("�̹� ������ ��ȭ��ȣ �Դϴ�.");
        submitCnt = 0;
        eventCmpltfail();
        goUrl();

    } else if (resultCode == "4") {
        alert("�̹� ������ �ø����ȣ �Դϴ�.");
        submitCnt = 0;
        eventCmpltfail();
        goUrl();

    } else if (resultCode == "5" || resultCode == "6" || resultCode == "7"|| resultCode == "8"|| resultCode == "9"|| resultCode == "10") {
        alert("�̺�Ʈ ���� �� ������ �߻� �Ͽ����ϴ�.\n��� �� �ٽ� �õ��� �ֽʽÿ�.("+resultCode+")");
        submitCnt = 0;
        eventCmpltfail();
        goUrl();

    } else if (resultCode == "13-1" || resultCode == "13-2" || resultCode == "13-3"|| resultCode == "13-4"|| resultCode == "13-5"|| resultCode == "13-6") {
        alert("�̺�Ʈ ���� �� ���ϵ�� ������ �߻��Ͽ����ϴ�.\n ������ Ȯ���Ͻþ� �õ��� �ֽʽÿ�.("+resultCode+")");
        submitCnt = 0;
        return false;
        //eventCmpltfail();
        //goUrl();

    } else {
        submitCnt = 0;
        document.frm.target = "";
        document.frm.action = "";
        //eventCmpltfail();
        $('.mobile body').css({'height':'auto'});

        alert("������ �ּż� �����մϴ�.");
        goUrl();
    }
}

function goUrl(){
	top.location.href = location.href;
}

function fnChgFile(obj,target){
	var $target = $(target);
	var fileValue = $(obj).val().split("\\");
	var fileName = fileValue[fileValue.length-1];
	$target.val(fileName);
	
	checkFile(obj,target);
	
}
//���Ͼ��ε� üũ
function checkFile(obj,target){
	var $id = $(target);
	//ie10 ���� ���������ϸ� ie9�� ������ �߻��Ѵ�.
	if ($(obj).get(0).files[0].size > 1024 * 1024 * 5 ) {
		alert('5MB ���� ���ϸ� ����� �� �ֽ��ϴ�.\n\n' + '�������� �뷮 : ' + ( Math.round($(obj).get(0).files[0].size / 1024 / 1024 * 100) / 100) + 'MB');
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
          alert('�̹��� ����(jpg, png, gif, jpeg)�� ��� �����մϴ�.\n(�ҹ��� Ȯ���ڸ� ���)');
          $id.val("");
          $id.focus();
          return false;
    }
	
	if( $id.attr("id") == "receipt" ) {
		var confirmTxt = "������ ����, �𵨸�, ǰ��, ��ȣ, ����(����)�� ���Ե� �ŷ������� ������ ÷�� �ϼ̽��ϱ�?\n"
							+ "�ŷ����������� ��Ȯ�� ���� Ȯ���� �Ұ����� ��� , \n"
							+ "��÷ ��󿡼� ���ܵ� �� �ֽ��ϴ�.\n"
							+ "�̹��� ���ε� �Ͻðڽ��ϱ�?";
		
		var ck = confirm(confirmTxt);
	
		if(ck != true){//Ȯ��
	    	$("#receipt").val("");
	        $("#ptUpload3").val("");
	        return false;
		}
	}
	
	return true;
}
//�̸��� üũ ���Խ�
function chkEmail(str)
{
	var reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
	if(!reg_email.test(str))
	{
		return false;
	}
	return true;
}

//üũ�ڽ� ������ư ��Ŀ���̵�
function scroll_move( id ){
    $( "#"+id ).focus();
    var objscrollTop = $("label[for='"+id+"']").offset();
    parent.$('html, body').stop().animate({scrollTop: objscrollTop.top}, 0);
}