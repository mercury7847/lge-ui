(function getdigitalData(){
	$.ajax({
	    url: "/mkt/ajax/commonmodule/memberInfo",
	    type: "POST",
	    dataType: "json",
	    data : {
	    	requestPath : window.location.pathname
	    },
	    async: false,
	    success: function(data){
	    	if(data.memberInfo != null){
	    	digitalData.userInfo = {
	    			"unifyId": data.memberInfo.unifyId,
	    			"preferStoreArea1": data.memberInfo.preferStoreArea1,
	    			"preferStoreArea2": data.memberInfo.preferStoreArea2,
	    			"preferStore": data.memberInfo.preferStore,
	    			"birthYY" :data.memberInfo.birthYY,
	    			"sexCd": data.memberInfo.sexCd,
	    			"region": data.memberInfo.region,
	    			"lastUseDt": data.memberInfo.lastUseDt,
	    			"dorDt": data.memberInfo.dorDt,
	    			"model": data.memberInfo.model,
	    			"empNo": data.memberInfo.empNo,
	    			"bestNo": data.memberInfo.bestNo,
	    			"memberUseYn":data.memberInfo.memberUseYn,
	    			"emailYn": data.memberInfo.emailYn,
	    			"smsYn": data.memberInfo.smsYn,
	    			"appPushYn": data.memberInfo.appPushYn,
	    			"cacaoYn": data.memberInfo.cacaoYn,
	    			"model_code": data.memberInfo.modelCode,
	    			"sales_dt": data.memberInfo.salesDt,
	    			"source_gubun": data.memberInfo.sourceGubun,
	    			"pur_chnl_code": data.memberInfo.purChnlCode,
	    			"owner_flag": data.memberInfo.ownerFlag
	    		};
	    	}
	    },
	    error: function (request, status, error){
	        var msg = "ERROR : " + request.status + "<br>" ;
	      console.log(msg);
	    }
	  });
	}
)()