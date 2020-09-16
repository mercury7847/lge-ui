;(function(global){

    if(global['lgkorUI']) return;
    console.log("lgkorUI start!!!");

    $.fn.buildCommonUI = function () {
        vcui.require([        
                            'ui/selectbox',
                            'ui/calendar',
                            'ui/accordion',
                            'ui/carousel',
                            'ui/modal',
                            'ui/tab',       
                            'ui/lazyLoader',
                            "ui/videoBox",
                            "ui/youtubeBox",
                            "ui/imageSwitch",
                            "ui/dropdown"
        ], function () {    
            console.log("buildCommonUI!!!!");
            
            this.vcImageSwitch();
            this.vcLazyLoader();
    
            this.find('.ui_calendar').vcCalendar();
            this.find('.ui_accordion').vcAccordion();        
            this.find('.ui_selectbox').vcSelectbox();
            this.find('.ui_dropdown').vcDropdown();
            this.find('.ui_tab').vcTab();
            this.find('.ui_carousel').vcCarousel();
            this.find('.animation-box').vcVideoBox();
            this.find('.youtube-box').vcYoutubeBox();
        }.bind(this));
        return this;
    };

    

    /* 

    vcui.require.config({
        paths: {
            'jquery.transit': 'libs/jquery.transit'
        },
        waitSeconds: 15,
        onNodeCreated: function (node) {
            node.charset = 'euc-kr';
        }
    });
    

    // ajax 로 통신할때는 기본 케릭터셑이 utf-8 로 되어있음.
    // 따라서, euc-kr 로 설정된 서버에서 ajax 를 이용하여 한글로된 데이터를 전달하게 되면 글씨가 깨짐.
    // 이때는 아래와 같이 캐릭터셑을 euc-kr 로 설정해 주면 해결이 됩니다

    var pathname = location.pathname;
    if (pathname.indexOf('/html/') > -1) {
        console.log(pathname);
        $.ajaxSetup({
            contentType: 'application/x-www-form-urlencoded;charset=euc-kr',
            beforeSend: function (xhr) {
                xhr.overrideMimeType('application/x-www-form-urlencoded;charset=euc-kr');
            }
        });
    } 
    */
    
    $.holdReady(true);
    
    global['lgkorUI'] = {
        template: $('<div class="template"></div>'),
        templateList: null,
        init: function(){
            this._preloadComponents();
            this._addTopButtonCtrl();
        },
    
        // 주요 컴포넌트를 미리 로드
        _preloadComponents: function () {
            var self = this;

            vcui.require([  
                'common/header', 
                'common/footer',           
                'ui/selectbox',
                'ui/calendar',
                'ui/accordion',
                'ui/carousel',
                'ui/modal',
                'ui/tab',       
                'ui/lazyLoader',
                "ui/videoBox",
                "ui/youtubeBox",
                "ui/imageSwitch"
            ], function () {
                var $doc = $(document);                       

                //resize 이벤트 발생 시 등록 된 이벤트 호출...
                self.resizeCallbacks = [];
                $(window).on("addResizeCallback", function(e, callback){
                    self.resizeCallbacks.push(callback);
                }).on('resize', function(e){
                    for(var idx in self.resizeCallbacks){
                        self.resizeCallbacks[idx].call()
                    }
                });                
    
                // 모달 기초작업 //////////////////////////////////////////////////////
                // 모달 기본옵션 설정: 모달이 들때 아무런 모션도 없도록 한다.(기본은 fade)
                vcui.ui.setDefaults('Modal', {
                    effect: 'fade',         // 모달이 뜰 때 사용할 효과
                    draggable: false,       // 모달을 드래그 할 수 있게 허용할 것인가..no
                    closeByEscape: false,   // esc키 누를 때 닫히게 할 것인가
                    closeByDimmed: false,   // dim 클릭시 닫히게 할 것인가
                    events: {
                        modalshown: function (e) {
                            // 모달이 뜨면 내부 컨텐츠 영역이 포커싱되도록 tabindex를 설정
                            //this.$('.pop_contents').attr('tabindex', 0);
                            //console.log(this);
    
                            if(this.$('.ui_carousel')){
                                this.$('.ui_carousel').vcCarousel('update');
                            }
                        }
                    }
                });
    
                // 아코디언의 기본설정을 멀티오픈으로 설정해놓는다,
                vcui.ui.setDefaults('Accordion', {
                    singleOpen: false,
                    events: {
                        accordionexpand: function (e, data) {
                            data.content.attr('tabindex', '0');                                               
                            if(data.content.find('.ui_carousel')) {
                                data.content.find('.ui_carousel').vcCarousel('update');
                            }                            
                        }
                    }
                });
    
    
                // 탭의 기본설정을 설정해놓는다,
                vcui.ui.setDefaults('Tab', {
                    events: {
                        tabchange: function (e, data) {
                            if(data && data.content.find('.ui_carousel')) {
                                data.content.find('.ui_carousel').vcCarousel('update');
                            }
                        }
                    }
                });
    
                $('header').vcHeader(); //헤더 모듈 적용...
                $('footer').vcFooter(); //푸터모듈 적용...

                $('body').buildCommonUI();
    
                $.holdReady(false); // ready함수 실행을 허용(이전에 등록된건 실행해준다.)
    
                // 모달이 열렸을 때 페이지 스크롤을 막기 위함 ////////////////////////////
                $doc.on('modalfirstopen modallastclose', function (e) {
    
                }).on('modalshown', function (e) {
                    // 모달이 뜰때 모달내부에 있는 공통 컴포넌트 빌드
                    //$(e.target).buildCommonUI();
                });
                //////////////////////////////////////////////////////////////////////
    
                // 아코디온이 펼쳐지거나 닫힐 때 레이아웃 사이즈가 변하기 때문에 resize이벤트를 강제로 발생시킨다.
                $doc.on('accordionexpand accordioncollapse', vcui.delayRun(function (e) {
                    $(window).triggerHandler('resize');
                }, 200));
                ///////////////////////////////////////////////////////////////////////
            });
        },

        //top 버튼 컨틀롤...
        _addTopButtonCtrl: function(){
            $(window).scroll(function(){
                if ($(this).scrollTop() > 100) {
                    $('.floating-menu.top').removeClass('call-yet');
                } else {
                    $('.floating-menu.top').addClass('call-yet');
                }
            });
            
            $('.back-to-top button').on('click', function (e) {
                e.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 400);
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
        },
    }
    
    document.addEventListener('DOMContentLoaded', function () {
        console.log("DOMContentLoaded!!!");
        lgkorUI.init();
    });

})(window);

