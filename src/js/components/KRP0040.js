$(window).ready(function(){
	if(!document.querySelector('.KRP0040')) return false;

    var storySlider = $('.withstory-list-slide');
    var storySliderNum = storySlider.find('.slide-item').length;

    var storyOpt = {
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite:false,
                    variableWidth:true,
                    outerEdgeLimit: true
                }
            }
        ]
    }
    if(storySlider.hasClass('slick-slider')){
        storySlider.not('.slick-initialized').slick(storyOpt);
        alert(1);
    } else {
        if(storySliderNum > 1){
            storySlider.slick(storyOpt);
        }
    }
})