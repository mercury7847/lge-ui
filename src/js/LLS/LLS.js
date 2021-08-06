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
        var $heroSwiper = $('.hero-slider');
        var $playControl = $heroSwiper.find('.swiper-play-controls');
        var $btnPlay = $playControl.find('.btn-play');

        var heroSwiper = new Swiper('.hero-slider', {
            loop:true,
            slidesPerView:1,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function(){
                    $btnPlay.addClass('stop');
                }
            }
        });

        $btnPlay.on('click', function(e){
            var $this = $(this);
            var $alt = $this.find('.blind');
            var playTxt = $alt.data('playText');
            var stopTxt = $alt.data('stopText');

            e.preventDefault();

            if( $heroSwiper.hasClass('swiper-container-initialized') ) {
                if( $this.hasClass('stop')) {
                    $this.removeClass('stop')
                    heroSwiper.autoplay.stop();
                    $alt.text(playTxt);
                } else {
                    $this.addClass('stop')
                    heroSwiper.autoplay.start();
                    $alt.text(stopTxt);
                }
            }
        })
    },
    highlightSlider: function(){
        var highlightSwiper = new Swiper('.recently-highlight-slider', {
            slidesPerView: "auto",
            slidesPerGroup:2, 
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.recently-highlight .swiper-button-next',
                prevEl: '.recently-highlight .swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: "auto",
                  slidesPerGroup:2, 
                },
                // when window width is >= 640px
                768: {
                  slidesPerView: 3,
                  slidesPerGroup:3,
                },
                1025: {
                    slidesPerView:5,
                    slidesPerGroup:5, 
                }
            }
        })
    },
    onbroadProductSlider: function(){
        var productSwiper = new Swiper('.onbroad-product-slider', {
            slidesPerView: "auto",
            slidesPerGroup:1, 
            observer: true,
            observeParents: true,
            navigation: {
                nextEl: '.onbroad-product .swiper-button-next',
                prevEl: '.onbroad-product .swiper-button-prev',
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                  slidesPerView: "auto",
                  slidesPerGroup:1, 
                },
                // when window width is >= 640px
                768: {
                  slidesPerView: 3,
                  slidesPerGroup:3,
                },
                1025: {
                    slidesPerView:5,
                    slidesPerGroup:5, 
                }
            }
        })
    }
}

$(function(){
    lls.init();
    console.log(111)
});