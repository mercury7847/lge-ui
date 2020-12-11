$(window).ready(function(){
    if(!document.querySelector('.KRP0014')) return false;
    
    $('.KRP0014 .btn_collapse_more').on('click', 'a', function(e){
        e.preventDefault();

        var idx = $(this).index() ? 0 : 1;
        var wrap = $(this).closest('.prod-spec-wrap');
        var spec = wrap.find('.prod-spec-detail');
        if(idx){
            spec.slideDown();

            var offsetop = $(this).parent().offset().top;
            $('html, body').stop().animate({scrollTop:offsetop}, 300);
        } else{
            spec.slideUp();
        }
        $(this).parent().children().hide().eq(idx).show();
    })
})