;(function(){

    var stickyTagTemplate = 
        '<div class="subscribe-wrap ui_sticky">'+
            '<div class="inner">'+
                '<div class="subscribe-tag">'+
                    '<div class="tag-box">'+
                        '<strong class="tag-name">#가을</strong>'+
                        '<button type="button" class="btn gray size"><span>구독하기</span></button>'+
                        '<button type="button" class="btn-close"><span class="blind">닫기</span></button>'+
                    '</div>'+
                    '<div class="tag-box subscribed">'+
                        '<strong class="tag-name">#가을</strong>'+
                        '<button type="button" class="btn gray size"><span>구독중</span></button>'+
                        '<button type="button" class="btn-close"><span class="blind">닫기</span></button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';

        var storyListTemplate = 
            '<div class="flexbox">'+
                '<div class="box {{contentsType}}">'+
                    '<div class="visual-area">'+
                    '</div>'+
                    '<div class="text-area">'+
                    '</div>'+        
                    '<div class="date">{{regDate}}</div>'+
                '</div>'+
            '</div>';

            var storyListTemplatessss = 
                '<div class="flexbox">'+
                    '<div class="box {{contentsType}}">'+
                        '<div class="visual-area">'+
                            '{{#if contentsType == "image"}}'+
                            '<span class="image">'+
                                '<img src="{{largeImage}}" alt="{{title}}">'+
                            '</span>'+
                            '{{#elseif contentsType == "video"}}'+
                            '<span class="image">'+
                                '<img src="{{smallImage}}" alt="{{title}}">'+
                            '</span>'+
                            '<a href="#n" class="btn-video"><span class="blind">동영상 재생</span></a>'+
                            '{{/if}}'+
                        '</div>'+
                        '<div class="text-area">'+
                            '<div class="flag-wrap box-type">'+
                                '<span class="flag">{{contentsName}}</span>'+
                            '</div>'+
                            '<a href="#" class="card-title"><span>{{html title}}</span></a>'+            
                            '<div class="tag-wrap">'+
                                '<ul class="tags">'+
                                    '{{#each item in tagList}}'+           
                                    '<li class="tag"><a href="#">#{{item.tagName}}</a></li>'+
                                    '{{/each}}'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+        
                        '<div class="date">{{regDate}}</div>'+
                    '</div>'+
                '</div>';

    var tagBoxTemplate = 
        '<div class="flexbox tag-area">'+
            '<span class="title">이런 태그는 어떠세요?</span>'+
            '<ul class="tag-lists">'+
                '{{#each item in tagList}}'+         
                '<li>'+
                    '<div class="tag">'+
                        '<span class="text">#{{item.tagName}}</span>'+
                        '<button type="button" class="btn gray size"><span>구독</span></button>'+
                    '</div>'+
                '</li>'+        
                '{{/each}}'+
            '</ul>'+
        '</div>';

    var STORY_LIST_URL;

    function init(){        
        vcui.require(['ui/toggleCarousel'], function () {
            $('.ui_carousel_slider').vcToggleCarousel({
                pcOption: "unbuild",
                mobileOption: {
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            });
        });

        STORY_LIST_URL = $('.contents.story-main').data("storyList");

        loadUserStoryList();
        loadNewStoryList();
    }

    function loadUserStoryList(){
        lgkorUI.showLoading();

        var sendata = {
            selectTag:""
        }
        lgkorUI.requestAjaxData(STORY_LIST_URL, sendata, function(result){
            $('.user_story .flexbox-wrap').empty();

            if(result.data.storyList && result.data.storyList.length > 0){
                $('.user_story').show();

                for(var str in result.data.storyList){
                    console.log("result.data.storyList[str]:",result.data.storyList[str], result.data.storyList[str].regDate)
                    var list = vcui.template(storyListTemplate, result.data.storyList[str]);
                    $('.user_story .flexbox-wrap').append(list);
                }
            } else{
                $('.user_story').hide();
            }

            lgkorUI.hideLoading();
        });
    }

    function loadNewStoryList(){

    }

    $(window).load(function(){
        init();
    })
})();