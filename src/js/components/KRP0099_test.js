$(window).ready(function(){
    if(!document.querySelector('.KRP0099')) return false;

    $('.KRP0099').buildCommonUI();

    var KRP0099 = {
        init: function(){
            //var self = KRP0099;

            vcui.require(['ui/validation', 'ui/selectbox', 'ui/formatter'], function () {
                // $('.KRP0099').find('input[name="email"]').vcFormatter({
				// 	format:function(val){
				// 		return false;
				// 	}
				// });

				console.log('adfsdfsf');


                $('.KRP0099').find('.ui_selectbox').vcSelectbox();
                
                var register = {
					email:{
						required: true,
						//value:'aaa@aaa.aaa',
						pattern : /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,						
						errorMsg:'이메일형식 이상'
					},
					mynumber:{
						required: true,
						//value:'801212-2000000',
						validate : function(val){
							var reg = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/
							return reg.test(val);
						}
					},
					pwd:{
						required: true,
						pattern : /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
						errorMsg:'영문,숫자,특수문자 조합 8-16자리'
					}
                }

                var validation = new vcui.ui.Validation('#wrap',{register:register});
                
				validation.on('update', function(e){ 
					$('.ui_selectbox').vcSelectbox('update');

				}).on('errors', function(e,data){
					console.log('errors', data); // 이걸 어떤식으로 쓸까?

				}).on('success', function(data){

					console.log(validation.getValues());
					console.log('success');

				}).on('nextfocus', function(e,target){
					// 커스텀 selectbox 포커스 이동
					if($(target).hasClass('ui_selectbox')) {
						$(target).vcSelectbox('focus');
					}

				});

				$('#submit').on('click', function(){
					validation.validate(); // 체크					
				});
            });
            
        }
    }
    KRP0099.init();

    /*
    var $scroll = $('.ui_tab .overmenus_scroll');

    $scroll.vcSmoothScroll({
        autoCenterScroll: true,
        center: true,
        scrollY: false,
        preventDefault: true
    });

    $('.ui_tab').on('tabchange', function (e, data) {
        $scroll.vcSmoothScroll('scrollToActive', 300);
    });
    */
});