$(document).ready(function() {
    if(!document.querySelector('.KRC0013')) return false;

    $('.KRC0013').buildCommonUI();

    var youtubeTemplate =     
        '<div class="visual-area video youtube-box">'+
        //'   <a href="#none" role="button" data-src="{{videoAccID}}"'+
        //' class="see-video acc-video-content" title="Opens in a new layer popup" data-type="youtube" data-player="default" data-target="{{videoTarget}}" aria-describedby="{{ariaDesc}}">plays audio description video</a>'+
        '   <a href="#none" data-src="{{videoID}}"'+
        ' class="see-video" data-type="youtube" data-target="{{videoTarget}}" aria-describedby="{{ariaDesc}}">'+
        '       <img src="{{largeImgURL}}" alt="{{alt}}">'+
        '   </a>'+
        '   <p class="hidden">{{accDesc}}</p>'+
        '</div>';

    var aniboxTemplate = 
         '<div class="visual-area animation-box">'+
         '   <div class="animation-area">'+
         '       <video loop{{#if videoAutoplay}} muted autoplay{{/if}}>'+
         '           <source src="{{aniSrc}}" type="video/mp4">'+
         '       </video>'+
         '       <div class="controller-wrap wa-btn">'+
         '           <button class="active pause" aria-label="Pause Video" name="pause" data-play-text="Play Video" data-pause-text="Pause Video" aria-describedby="{{ariaDesc}}">Pause Video</button>'+
         '       </div>'+
         '   </div>'+
         '</div>';

    var defaultTemplate =
         '<div class="visual-area">'+
         '   <img src="{{largeImgURL}}" alt="{{alt}}"/>'+
         '   <p class="hidden">{{accDesc}}</p>'+
         '</div>';

    $('.KRC0013').each(function(idx, item){
        $(item).find('.visual-set .visual-thumbnail-set .thumb-obj > a').on('click', function(e){
            e.preventDefault();
    
            var text = $(this).siblings('.text-set-default').html();
            $(item).find('.text-set').html(text);
    
            var largeImgURL = $(this).find('img').data('large');
            var ariaDesc = $(this).attr('aria-describedby');
            var alt = $(this).find('img').attr('alt').replace(/\&quot\;/gi, '\'\'').replace(/"/g, '\'\'');
            
            var accDesc = $(this).data('acc-desc') || "";
            console.log("acc2",accDesc);
            
            var appendElement = $(item).find('.visual-set');
            appendElement.find('.visual-area').remove();
    
            var html;
            if($(this).data('type') == 'youtube'){
                var videoID = $(this).data('video-id');
                var videoTitle = $(this).data('video-title');
                var videoTitleColor = $(this).data('title-color');
                var videoAccID = $(this).data('videoAccId');
                var videoTarget = $(this).data('target') || "modal";

                html = vcui.template(youtubeTemplate, {
                    videoID: videoID,
                    videoAccID: videoAccID,
                    videoTitle: videoTitle,
                    videoTitleColor: videoTitleColor,
                    videoTarget: videoTarget,
                    largeImgURL: largeImgURL,
                    ariaDesc: ariaDesc,
                    alt: alt,
                    accDesc: accDesc
                });

                appendElement.prepend(html);
                appendElement.find('.visual-area').vcYoutubeBox();
            } else if($(this).data('type') == 'ani-box'){
                var aniSrc = $(this).data('src');
                var aniAccSrc = $(this).data('accSrc');
                var aniTitle = $(this).data('title');
                var videoTitleColor = $(this).data('title-color');
                var videoAutoplay = ($(this).attr("data-autoplay") == "true");
                //var videoMuted = ($(this).attr("data-muted")  == "true");

                html = vcui.template(aniboxTemplate, {
                    aniSrc: aniSrc,
                    aniAccSrc: aniAccSrc,
                    aniTitle: aniTitle,
                    videoTitleColor: videoTitleColor,
                    largeImgURL: largeImgURL,
                    videoAutoplay: videoAutoplay,
                    //videoMuted: videoMuted,
                    ariaDesc: ariaDesc,
                    alt: alt,
                    accDesc: accDesc
                });

                appendElement.prepend(html);
                appendElement.find('.visual-area').vcVideoBox();
            } else{

                html = vcui.template(defaultTemplate, {
                    largeImgURL: largeImgURL,
                    alt: alt,
                    accDesc: accDesc
                });
                
                appendElement.prepend(html);
            }      
    
            $(item).find('.visual-thumbnail-set').find('.thumb-obj > a').removeClass('active').attr('aria-selected', false);
            $(this).addClass('active').attr('aria-selected', true);
        });
    });
});