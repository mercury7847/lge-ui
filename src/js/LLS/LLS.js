var lls = {
    init: function(){
        var self = this;

        self.settings();
        self.bindEvent();
        self.heroSlider();
        self.highlightSlider();
        self.onbroadProductSlider();
    },
    settings: function(){
        var self = this;
        self.$llsMain = $('.lls-main');
        self.$eventSection = self.$llsMain.find('.event-announced');
        self.$eventList = self.$eventSection.find('.event-item-list');
        self.$eventAnchor = self.$eventList.find('.item-list-anchor');
    },
    bindEvent: function(){
        var self = this;

        self.$eventAnchor.on('click', function(e){
            e.preventDefault();
            self.requestModal(this);
        });
    },
    requestModal: function(dm) {
        var _self = this;
        var ajaxUrl = $(dm).attr('href');
        window.open(ajaxUrl,'','width=912,height=760,scrollbars=yes');
        /*
        lgkorUI.requestAjaxData(ajaxUrl, null, function(result){
            _self.openModalFromHtml(result);
        }, null, "html");
        */
    },
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