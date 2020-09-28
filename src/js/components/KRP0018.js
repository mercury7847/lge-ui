$(window).ready(function(){
    if(!document.querySelector('.KRP0018')) return false;

    $('.KRP0018').buildCommonUI();
    /*
    $('.KRP0018 .compare-title .btn-more').on('click', function(){
        $(this).toggleClass('active')
            .closest('.compare-title').siblings('.compare-content').slideToggle(500);
    }); */
});
