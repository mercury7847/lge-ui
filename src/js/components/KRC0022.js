$(document).ready(function() {
    if(!document.querySelector('.KRC0022')) return false;

    $('.KRC0022').buildCommonUI();

    $('.KRC0022').each(function(idx, item){
        $(item).find('.visual-set .visual-thumbnail-set a').on('click', function(e){
            e.preventDefault();
    
            var text = $(item).find('.thumb-obj .text-set-default').html();
            $(item).find('.text-set').html(text);
    
            var largeImgURL = $(this).find('img').data('large');
            var ariaDesc = $(this).attr('aria-describedby');
            var alt = $(this).find('img').attr('alt').replace(/\&quot\;/gi, '\'\'').replace(/"/g, '\'\'');
            
            var appendElement = $(item).find('.visual-set');
            appendElement.find('.visual-area').remove();
    
            var html = "";
            if($(this).data('type') == 'youtube'){
                var videoID = $(this).data('video-id');
                var videoTitle = $(this).data('video-title');
    
                html += '<div class="visual-area video youtube-box">';
                html += '   <a href="#none" role="button" data-src="https://www.youtube.com/embed/';
                html += videoID + '" class="see-video acc-video-content" title="Opens in a new layer popup" data-type="youtube" data-player="default" data-target="modal" aria-describedby="' + ariaDesc + '">plays audio description video</a>'
                html += '   <a href="#none" data-src="https://www.youtube.com/embed/';
                html += videoID + '" class="see-video" data-type="youtube" data-target="modal" aria-describedby="' + ariaDesc + '">';
                html += '       <img src="' + largeImgURL + '" alt="' + alt + '">';
                html += '   </a>';
                html += '   <p class="hidden">' + videoTitle + '</p>';
                html += '   <div class="caption">' + videoTitle + '</div>';
                html += '</div>';
                appendElement.prepend(html);
                appendElement.find('.visual-area').vcYoutubeBox();
            } else{
                html += '<div class="visual-area">'
                html += '   <img src="' + largeImgURL + '" alt="' + alt + '"/>';
                html += '   <p class="hidden">graphic description : </p>';
                html += '</div>';
                appendElement.prepend(html);
            }      
    
            $(item).find('.visual-thumbnail-set').find('.thumb-obj > a').removeClass('active').attr('aria-selected', false);
            $(this).addClass('active').attr('aria-selected', true);
        });
    });
});