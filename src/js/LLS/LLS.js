var lls = {
    init: function(){
        var self = this;
        self.heroSlider();
        self.highlightSlider();
        self.onbroadProductSlider();
    },
    bindEvent: function(){},
    heroSlider: function(){
        var heroSwiper = new Swiper('.hero-slider', {
            loop:true,
            slidesPerView:1,
            observer: true,
            observeParents: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    },
    highlightSlider: function(){
        var highlightSwiper = new Swiper('.recently-highlight-slider', {
            loop:true,
            slidesPerView:5,
            slidesPerGroup:5, 
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    },
    onbroadProductSlider: function(){
        var productSwiper = new Swiper('.onbroad-product-slider', {
            loop:true,
            slidesPerView:5,
            slidesPerGroup:5, 
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    }
}

$(function(){
    lls.init();
    console.log(111)
});