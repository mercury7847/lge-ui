$(window).ready(function(){
    if(!document.querySelector('.KRC0014')) return false;

    $('.KRC0014').buildCommonUI();

    $('.KRC0014').each(function(idx, item){

        $(item).find('.hidden-xs .text-thumb-area .thumbnail-area-box ul li').eq(0).addClass('on').attr('aria-selected', true);
        $(item).find('.hidden-xs .text-thumb-area .thumbnail-area-box ul li a').on('click', function(e){
            e.preventDefault();

            //var appendElement = $(item).find('.hidden-xs');
            var appendElement = $(this).parents('div.hidden-xs');

            var text = $(this).siblings('.text-area-default').html();
            //$(item).find('.text-area').html(text);
            appendElement.find('.text-area').html(text);
   
            var largeImgURL = $(this).find('img').data('large');
            var ariaDesc = $(this).attr('aria-describedby');
            var alt = $(this).find('img').attr('alt').replace(/\&quot\;/gi, '\'\'').replace(/"/g, '\'\'');
            var accDesc = $(this).data('acc-desc') || "";
            console.log("acc",accDesc);
            appendElement.find('.visual-area').remove();
    
            var html = "";
            if($(this).data('type') == 'youtube'){
                var videoID = $(this).data('video-id');
                var videoAccID = $(this).data('videoAccId');
                var videoTitle = $(this).data('video-title');
                var videoTitleColor = $(this).data('title-color') || "";
                var videoTarget = $(this).data('target') || "modal";
                
                html += '<div class="visual-area video youtube-box">';
                //html += '   <a href="#none" role="button" data-src="';
                //html += videoAccID + '" class="see-video acc-video-content" title="Opens in a new layer popup" data-type="youtube" data-player="default" data-target="' + videoTarget + '" aria-describedby="' + ariaDesc + '">plays audio description video</a>'
                html += '   <a href="#none" data-src="';
                html += videoID + '" class="see-video" data-type="youtube" data-target="' + videoTarget + '" aria-describedby="' + ariaDesc + '">';
                html += '       <img src="' + largeImgURL + '" alt="' + alt + '">';
                html += '       <p class="hidden">' + accDesc + '</p>';
                html += '   </a>';
                // html += '   <div class="caption ' + videoTitleColor +'">' + videoTitle + '</div>';
                html += '</div>';
                appendElement.prepend(html);
                appendElement.find('.visual-area').vcYoutubeBox();
            } else if($(this).data('type') == 'ani-box'){
                var aniSrc = $(this).data('src');
                var aniAccSrc = $(this).data('accSrc');
                var aniTitle = $(this).data('title');
                var videoTitleColor = $(this).data('title-color') || "";

                html += '<div class="visual-area animation-box size-type">';
                //html += '   <a href="#none" role="button" data-src="' + aniAccSrc + '" aria-label="Plays audio Description Video" class="play-animaion-btn acc-btn" data-ani-text="Play the video" data-acc-ani-text="Plays audio Description Video" aria-describedby="title01">Plays audio Description Video</a>';
                html += '   <img src="' + largeImgURL + '" alt="" aria-hidden="true">';
                // html += '   <p class="hidden">' + accDesc + '</p>';
                html += '   <div class="animation-area">';
                html += '       <video loop' +  ($(this).attr('data-autoplay')=="true"?' muted autoplay':'')  /*+ ($(this).attr(' data-muted')=="true"?'muted':'')*/ + '>';
                html += '           <source src="' + aniSrc + '" type="video/mp4">';
                html += '       </video>';
                html += '       <div class="controller-wrap wa-btn">';
                html += '           <button class="active pause" aria-label="Pause Video" name="pause" data-play-text="Play Video" data-pause-text="Pause Video" aria-describedby="title01">Pause Video</button>';
                html += '       </div>';
                html += '   </div>';
                // html += '   <div class="caption ' + videoTitleColor +'">' + aniTitle + '</div>';
                html += '</div>';

                appendElement.prepend(html);
                appendElement.find('.visual-area').vcVideoBox();
            } else{
                html += '<div class="visual-area">'
                html += '   <img src="' + largeImgURL + '" alt="' + alt + '"/>';
                html += '   <p class="hidden">' + accDesc + '</p>';
                html += '</div>';
                appendElement.prepend(html);
            }      
    
            var buttonClone = $(this).siblings('div.button-box-default').children().clone();
            appendElement.find('.btn-type-box').html(buttonClone);

            buttonClone = $(this).siblings('div.button-text-default').children().clone();
            appendElement.find('.btn-type-text').html(buttonClone);

            $(this).closest('li').siblings().removeClass('on').attr('aria-selected', false);
            $(this).closest('li').addClass('on').attr('aria-selected', true);
        });
    });

    vcui.require(['ui/carousel'], function () {
        $('.KRC0014').find('.ui_carousel_slider').vcCarousel({
            infinite: false,
            swipeToSlide: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:'.btn-arrow.prev',
            nextArrow:'.btn-arrow.next',
        });
    });   

    function indiTop() {
        var indi = $('.KRC0014').find(".indi-wrap");
        var btns = $('.KRC0014').find(".btn-arrow");
        indi.each(function(){
            var visualArea = $(this).parent(".visual-m-area").find('.visual-m-box');
            var iH = visualArea.outerHeight();

            $(this).css('top', iH+24);
        });
        btns.each(function(){
            var visualArea = $(this).parent(".visual-m-area").find('.visual-m-box');
            var iH = visualArea.outerHeight() / 2;

            $(this).css('top', iH);
        });
    }

    $(window).resize(function(){
        indiTop();
    });
    indiTop();
})