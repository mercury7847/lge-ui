$(window).ready(function(){
    if(!document.querySelector('.KRP0006')) return false;
    
    $('.KRP0006').on('click', '.inner button', function(e){
        e.preventDefault();

        $(this).closest('.inner').slideUp(200);
    })
})