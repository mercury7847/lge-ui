$(window).ready(function(){
    if(!document.querySelector('.KRC0010')) return false;

    $('.KRC0010').buildCommonUI();

    $('.KRC0010 .drag-area').twentytwenty({
        no_overlay: true
    });

    var $targetDrag = $('.KRC0010 .drag-area');
    $targetDrag.each(function(){
        var dragTitle = $(this).data('handle-title');
        $(this).find('.twentytwenty-handle').attr('title',dragTitle);
    });
        
    var $obj = $('.KRC0010');
    var waNumber = 0;
    $obj.each(function() {
        var $target;
        if($(this).find('.title') && !$(this).find('.title').is(':empty')) {
            $target = $(this).find('.title');
        }
        if($target) {
            $target.attr('id', 'waKRC0010_'+waNumber);
            $(this).find('a.btn').attr('aria-describedby', 'waKRC0010_'+waNumber);
            $(this).find('a.link-text').attr('aria-describedby', 'waKRC0010_'+waNumber);
            waNumber++;
        }
    });
});