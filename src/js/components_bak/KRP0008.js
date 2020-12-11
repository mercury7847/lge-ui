$(window).ready(function(){
    if(!document.querySelector('.KRP0008')) return false;
    
    $('.KRP0008').on('click', '.inner button', function(e){
        e.preventDefault();

        $(this).closest('.inner').slideUp(200);
    })
})