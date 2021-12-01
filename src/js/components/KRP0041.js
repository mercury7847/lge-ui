$(window).ready(function(){
	if(!document.querySelector('.KRP0041')) return false;
    $('.KRP0041 .withstory-list-slide').on('click', 'a', function(e){
        var location = document.location.href;
        var pdpLink= 'pdpLink';
        if(location){
            lgkorUI.setStorage(pdpLink,location);
        }
    });
})
$(window).on('breakpointchange', function(e){
    var data = window.breakpoint;
    var storySlider = $('.KRP0041 .withstory-list-slide');
    var storySliderNum = storySlider.find('.slide-item').length;
    var storyOption = {
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite:false,
        variableWidth:false,
        outerEdgeLimit: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    arrows:false,
                    variableWidth:true,
                    outerEdgeLimit: true,
                    slidesToShow: 1
                }
            }
        ]
    }
    if(storySliderNum > 0){
        if(data.name == 'mobile'){
            storySlider.removeClass('unslick');
            if(storySlider.hasClass('slick-slider')){
                storySlider.not('.slick-initialized').slick(storyOption);
            } else {
                if(storySliderNum > 0){
                    storySlider.slick(storyOption);
                } 
            }
        }else if(data.name == 'pc'){
            if(storySlider.hasClass('slick-slider')){
                if(storySliderNum > 2){
                storySlider.not('.slick-initialized').slick(storyOption);
                } else {
                    storySlider.addClass('unslick');
                    storySlider.slick('unslick');
                    
                }
            } else {
                if(storySliderNum > 2){
                    storySlider.slick(storyOption);
                } 
            }
        }
    }else{
        $('.KRP0041').parent().hide();
    }
}); 




