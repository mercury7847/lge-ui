var llc = {
    init: function(){
        var self = this;

        self.settings();
        self.bindEvents();
    },
    settings: function(){
        var self = this;

        self.$frameContainer= $('.lls-frame-container');
        self.$frameContent = self.$frameContainer.find('.lls-frame-content');
        self.$btnClose = self.$frameContainer.find('.lls-frame-close');
        self.homeUrl = "/livecommerce";
    },
    bindEvents: function(){
        var self = this;

        // self.$btnClose.on('click', function(e){
        //     e.preventDefault();
        //     location.href = self.homeUrl
        // });
    },
}


$(function(){
    llc.init();

    /* BTOCSITE-3372 라이브커머스 공유하기 기능 추가 */
    $(window).on('load', function(){
        window.addEventListener(
            "message", function(e) { 
                if(typeof e.data == 'string'){ 				
                    var obj = JSON.parse(e.data);

                    //console.log("check", obj);
                    
                    if(obj["key"] == "sauceflexMoveLogin"){
                        location.href="/sso/api/Login";
                    } else if(obj["key"] == "sauceflexMoveProduct"){
                        //location.href=obj["params"].linkUrl;

                        if(!vcui.detect.isMobileDevice){
                            window.open(obj["params"].linkUrl);
                        }else{
                            location.href=obj["params"].linkUrl;
                        }
                    } else if(obj["key"] == "sauceflexOnShare"){ 		    	

                        var dummy = document.createElement("input");

                    //   console.log("check 1", dummy);

                    //   document.body.appendChild(dummy);
                    //   dummy.value = window.location.href;
                    //   dummy.select();	 		       
                    //   document.execCommand("copy");	 		        
                    //   document.body.removeChild(dummy);
                    //   alert("URL을 복사했습니다.");	 		       

                    //$('.tooltip-wrap.share .tooltip-icon').trigger('click');

                    //console.log("sssss");
                    $('.tooltip-box').toggle();
                    $('.lls-frame-head').find('.btn-close').on('click', function(){
                        $('.tooltip-box').hide();
                    });

                    }else if(obj["key"] == "sauceflexMoveExit"){ 		    	
                        location.href="/livecommerce";
                    }
                }
            }, false
        );
    })
    /* //BTOCSITE-3372 라이브커머스 공유하기 기능 추가 */
});



