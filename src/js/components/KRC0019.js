$(window).ready(function(){
    if(!document.querySelector('.KRC0019')) return false;

    $('.KRC0019').buildCommonUI();

    var $targetDrag = $('.KRC0019 .drag-area');
    $targetDrag.each(function(){
        var dragTitle = $(this).data('handle-title');
        $(this).find('.twentytwenty-handle').attr('title',dragTitle);
    });
        
    var $obj = $('.KRC0019');
    var waNumber = 0;
    $obj.each(function() {
        var $target;
        if($(this).find('.title') && !$(this).find('.title').is(':empty')) {
            $target = $(this).find('.title');
        }
        if($target) {
            $target.attr('id', 'waKRC0019_'+waNumber);
            $(this).find('a.btn').attr('aria-describedby', 'waKRC0019_'+waNumber);
            $(this).find('a.link-text').attr('aria-describedby', 'waKRC0019_'+waNumber);
            waNumber++;
        }
    });

    $('.KRC0019 .drag-area').twentytwenty({
        no_overlay: true
    });
});