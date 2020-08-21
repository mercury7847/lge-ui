

$(window).ready(function(){
    console.log("### ready ###");

    vcui.require(['common/header', 'common/footer', 'ui/tab', 'ui/accordion', 'ui/carousel', 'ui/dropdown', 'ui/selectbox', 'ui/calendar', 'ui/textControl', 'ui/scrollview'], function () {
        $('header').vcHeader(); //헤더 모듈 적용...
        $('footer').vcFooter(); //푸터모듈 적용...

        //공통 UI 모듈 적용...
        $('body').find('.ui_tab').vcTab();
        $('body').find('.ui_accordion').vcAccordion();
        $('body').find('.ui_carousel').vcCarousel();
        $('body').find('.ui_dropdown').vcDropdown();
        $('body').find('.ui_selectbox').vcSelectbox();
        $('body').find('.ui_calendar').vcCalendar();
        $('body').find('.ui_textcontrol').vcTextControl();
        $('body').find('.ui_scrollview').vcScrollview();
    });
})