$(window).ready(function(){
    if(!document.querySelector('.KRC0011')) return false;

    $('.KRC0011').buildCommonUI();
    
    $('.KRC0011 .drag-area').twentytwenty({
        no_overlay: true
    });

    var $targetDrag = $('.KRC0011 .drag-area');
    $targetDrag.each(function(){
        var dragTitle = $(this).data('handle-title');
        $(this).find('.twentytwenty-handle').attr('title',dragTitle);
    });

    var $obj = $('.KRC0011');
    var waNumber = 0;
    $obj.each(function() {
        var $target;
        if($(this).find('.title') && !$(this).find('.title').is(':empty')) {
            $target = $(this).find('.title');
        }
        if($target) {
            $target.attr('id', 'waKRC0011_'+waNumber);
            $(this).find('a.btn').attr('aria-describedby', 'waKRC0011_'+waNumber);
            $(this).find('a.link-text').attr('aria-describedby', 'waKRC0011_'+waNumber);
            waNumber++;
        }
    });
});