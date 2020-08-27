$(window).ready(function(){
    if(!document.querySelector('.KRC0020')) return false;

    var $targetDrag = $('.KRC0020 .drag-area');
    $targetDrag.each(function(){
        var dragTitle = $(this).data('handle-title');
        $(this).find('.twentytwenty-handle').attr('title',dragTitle);
    });

    var $obj = $('.KRC0020');
    var waNumber = 0;
    $obj.each(function() {
        var $target;
        if($(this).find('.title') && !$(this).find('.title').is(':empty')) {
            $target = $(this).find('.title');
        }
        if($target) {
            $target.attr('id', 'waKRC0020_'+waNumber);
            $(this).find('a.btn').attr('aria-describedby', 'waKRC0020_'+waNumber);
            $(this).find('a.link-text').attr('aria-describedby', 'waKRC0020_'+waNumber);
            waNumber++;
        }
    });
});

$(window).load(function(){
    $('.KRC0020 .drag-area').twentytwenty({
        no_overlay: true
    });
});
$(window).ready(function(){
    if(!document.querySelector('.KRC0019')) return false;

    var KRC0019 = {
        init: function(){
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
        }
    }
    KRC0019.init();
});

$(window).load(function(){
    $('.KRC0019 .drag-area').twentytwenty({
        no_overlay: true
    });
});