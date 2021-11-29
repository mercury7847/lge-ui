$(window).ready(function(){
	if(!document.querySelector('.KRP0041')) return false;
    var storySlider = $('.withstory-list-slide');
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
        storySlider.slick(storyOption);
    } else{
        $('.KRP0041').parent().hide();
    }
    storySlider.on('click', 'a', function(e){
        var location = document.location.href;
        var pdpLink= 'pdpLink';
        if(location){
            lgkorUI.setStorage(pdpLink,location);
        }
    });
})

