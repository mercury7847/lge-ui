var lgkorUI = {
    template: $('<div class="template"></div>'),
    templateList: null,
    init: function(){
        console.log("lgkorUI.init();")
        vcui.require([
            'common/header', 
            'common/footer', 
            'ui/tab', 
            'ui/accordion', 
            'ui/carousel', 
            'ui/dropdown', 
            'ui/selectbox', 
            'ui/calendar',
            'ui/textControl',
            'ui/scrollview', 
            'ui/lazyLoader',
            "ui/videoBox",
            "ui/youtubeBox",
            "ui/modal",
        ], function (header, footer, tab, accordion, carousel, dropdown, selectbox, calendar, textControl, scollview, lazyLoader, videoBox, youtubeBox, modal) {
            console.log("loaded: ",lazyLoader);
            $('body').vcLazyLoader();
            console.log("loaded: ", header);
            $('header').vcHeader(); //헤더 모듈 적용...
            console.log("loaded: ", footer);
            $('footer').vcFooter(); //푸터모듈 적용...

            //공통 UI 모듈 적용...
            console.log("loaded: ", tab);
            $('body').find('.ui_tab').vcTab();
            console.log("loaded: ", accordion);
            $('body').find('.ui_accordion').vcAccordion();
            console.log("loaded: ", carousel);
            $('body').find('.ui_carousel').vcCarousel();
            console.log("loaded: ", dropdown);
            $('body').find('.ui_dropdown').vcDropdown();
            console.log("loaded: ", selectbox);
            $('body').find('.ui_selectbox').vcSelectbox();
            console.log("loaded: ", calendar);
            $('body').find('.ui_calendar').vcCalendar();
            console.log("loaded: ", textControl);
            $('body').find('.ui_textcontrol').vcTextControl();
            console.log("loaded: ", scollview);
            $('body').find('.ui_scrollview').vcScrollview();
            console.log("loaded: ", videoBox);
            $('body').find('.animation-box').vcVideoBox();
            console.log("loaded: ", youtubeBox);
            $('body').find('.youtube-box').vcYoutubeBox();
            console.log("loaded: ", modal);
        });
    },

    //template html 리스트 파일 로드...
    loadTemplateList: function(tmplID, callback){
        var self = lgkorUI;

        $.ajax({
            dataType: "json",
            url: "/lg5-common/template/template_list.json",
            success: function(data){
                self.templateList = data;
                self.getTemplate(tmplID, callback);
            },
            error: function(err){
                console.log(err);
            }
        });
    },

    //template html 내보내기...
    getTemplate: function(tmplID, callback){
        var self = lgkorUI;

        if(self.templateList == null){
            //template list  로드를 한번 도 안했다면...
            self.loadTemplateList(tmplID, callback);
        } else{
            //template list 로드가 됐다면...
            var tmpltag = $('#'+tmplID);
            if(tmpltag.length){
                //template list 를 document에 적용해 봤다면...
                if(callback != undefined && typeof callback == "function") callback();
            } else{
                //template list 를 document 에 적용하기 전이라면...
                var tmplurl = self.templateList[tmplID].url;
                self.template.load(tmplurl, function(html){
                    tmpltag = $('#'+tmplID);
                    if(!tmpltag.length) $(html).insertAfter($('body')); //중복 등록 체크...

                    if(callback != undefined && typeof callback == "function") callback();
                });
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded !!!")
    //lgkorUI.init();
});