var lgkorUI = {
    template: $('<div class="template"></div>'),
    templateList: null,
    init: function(){
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
            $('header').vcHeader(); //헤더 모듈 적용...
            $('footer').vcFooter(); //푸터모듈 적용...
            $('body').vcLazyLoader();

            //공통 UI 모듈 적용...
            $('body').find('.ui_tab').vcTab();
            $('body').find('.ui_accordion').vcAccordion();
            $('body').find('.ui_carousel').vcCarousel();
            $('body').find('.ui_dropdown').vcDropdown();
            $('body').find('.ui_selectbox').vcSelectbox();
            $('body').find('.ui_calendar').vcCalendar();
            $('body').find('.ui_textcontrol').vcTextControl();
            $('body').find('.ui_scrollview').vcScrollview();
            $('body').find('.animation-box').vcVideoBox();
            $('body').find('.youtube-box').vcYoutubeBox();
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

var parentDocument = $(parent.document);
console.log(parentDocument);
var myDocument = $(document);
console.log(myDocument);
var isEdit = $('body').hasClass("iw-fullscreen-edit");
console.log("isEdit : " + isEdit);
if(isEdit){
    $('body.iw-fullscreen-edit').load(function(){
        lgkorUI.init();
    });
} else{
    document.addEventListener('DOMContentLoaded', function () {
        lgkorUI.init();
    });
}
