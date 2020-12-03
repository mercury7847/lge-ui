
(function(){

    function init(){
        console.log("Visit Alarm start!!");

        $('.mypage .svc-lists').each(function(idx, item){
            var leng = $(item).find('ul.svc-details li').length;
            if(leng < 6){
                $(item).find('.more-view-btn').hide();
            }
        });

        $('.mypage').on('click', '.more-view-btn', function(e){
            e.preventDefault();

            if($(this).hasClass('open')){
                $(this).removeClass('open');
                $(this).text('더보기');
                $(this).closest('.svc-lists').find('ul.svc-details').scrollTop(0);
                $(this).closest('.svc-lists').find('ul.svc-details').removeClass('open');
            } else{
                $(this).addClass('open');
                $(this).text('닫기');
                $(this).closest('.svc-lists').find('ul.svc-details').removeClass('open').addClass('open');
            }
        })
    }

    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
})();