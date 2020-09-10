$(window).ready(function(){
    if(!document.querySelector('.KRP0099')) return false;

    $('.KRP0099').buildCommonUI();

	var KRP0099 = {
		/*
		frun_onchange : function(e, elem){
  
			console.log( e, elem );
			
			var pat = new RegExp( '\\B(?=(\d{3})+(?!\d))' , 'g');
			console.log( pat );
			alert( pat );
			
		},
		*/

        init: function(){
            //var self = KRP0099;

            vcui.require(['ui/validation', 'ui/selectbox', 'ui/formatter', 'ui/calendar'], function () {
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
					console.log('calendar3',$('#endDate').val(),$('#uiCalendarEnd').vcCalendar('getCurrentDate'));				
				});
				
				$('.ui_calendar').vcCalendar({ 'holidays': ['2017-09-06', '2017-09-07', '2017-09-08'] }); // hoildays:휴일등록

                $('#startDate').on('calendarinsertdate', function (e, data) {
					console.log('calendar1',data.date,data.date.getMonth());
                    $('#uiCalendarEnd').vcCalendar('setMinDate', data.date); //시작일을 선택시 종료일의 시작날짜를 변경한다.
                });

                $('#endDate').on('calendarinsertdate', function (e, data) {
					//data.date 종료일의 값을 반환한다.
					console.log('calendar2',data.date);
				});
				
				/*
				$("#tst1").on("propertychange change keyup paste input",function(){
					var cardMatchValue = $(this).val().replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
					console.log(cardMatchValue);
				});
				*/
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