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
            } else if($(this).data('type') == 'ani-box'){
                var aniSrc = $(this).data('src');
                var aniAccSrc = $(this).data('accSrc');
                var aniTitle = $(this).data('title');
                console.log(aniSrc, aniAccSrc, aniTitle)

                html += '<div class="visual-area animation-box">';
                html += '   <a href="#none" role="button" data-src="' + aniAccSrc + '" aria-label="Plays audio Description Video" class="play-animaion-btn acc-btn" data-ani-text="Play the video" data-acc-ani-text="Plays audio Description Video" aria-describedby="title01">Plays audio Description Video</a>';
                html += '   <img src="' + largeImgURL + '" alt="">';
                html += '   <p class="hidden">graphic description : </p>';
                html += '   <div class="animation-area">';
                html += '       <video autoplay muted loop>';
                html += '           <source src="' + aniSrc + '" type="video/mp4">';
                html += '       </video>';
                html += '       <div class="controller-wrap wa-btn">';
                html += '           <button class="active pause" aria-label="Pause Video" name="pause" data-play-text="Play Video" data-pause-text="Pause Video" aria-describedby="title01">Pause Video</button>';
                html += '       </div>';
                html += '   </div>';
                html += '   <div class="caption">' + aniTitle + '</div>';
                html += '</div>';
                appendElement.prepend(html);
                appendElement.find('.visual-area').vcVideoBox();
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