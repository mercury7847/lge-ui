$(window).ready(function(){
    if(!document.querySelector('.KRC0025')) return false;

    $('.KRC0025').buildCommonUI();


    $('.KRC0025').each(function(idx, item){
        //console.log("ssss", item)
        //console.log("ssss", $(item).find('.unit-box .title').attr('id'));
    });


    /* BTOCSITE-9207 : 디스클라이머 컴포넌트 추가 */
    var infoDisclaimer = $('.KRC0025').find('.unit-box');

    infoDisclaimer.each(function(cdx, item){
        //console.log("11111", $(item).find('.title').attr('id'));
        var titleAttr = $(item).find('.title').attr('id');

        $(item).find('.drop-info .dropInfo_openBtn').on('click', function(e){
            var mybtnAttr = $(this).attr('aria-describedby');

            //console.log("콘텐츠의 아이디", titleAttr);
            //console.log("내가 찍힌", mybtnAttr);
            //console.log("sssss", titleAttr == mybtnAttr);
            if(titleAttr == mybtnAttr) {
                //console.log("111");
                $(item).find('.dropContent').addClass('on');
                $(this).hide();
            }
        });

        $(item).find('.drop-info .dropInfo_closeBtn').on('click', function(e){
            var mybtnAttr = $(this).attr('aria-describedby');
 
            if(titleAttr == mybtnAttr) {
                //console.log("111");
                $(item).find('.dropContent').removeClass('on');
                $(item).find('.drop-info .dropInfo_openBtn').show();
            }
        });
        
    });
    /* //BTOCSITE-9207 : 디스클라이머 컴포넌트 추가 */
})