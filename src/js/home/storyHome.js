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
                            '{{#if contentsType == "image"}}'+
                            '<span class="image">'+
                                '<img src="{{largeImage}}" alt="{{title}}">'+
                            '</span>'+
                            '{{#elsif contentsType == "video"}}'+
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
                            '<a href="#" class="card-title"><span>{{#raw title}}</span></a>'+            
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

        bindEvent();

        loadUserStoryList();
        loadNewStoryList();
    }

    function bindEvent(){
        $(window).on('resize', function(){
            resize();
        })
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
                    var template = result.data.storyList[str].contentsType == "tag" ? tagBoxTemplate : storyListTemplate;
                    var list = vcui.template(template, result.data.storyList[str]);
                    $('.user_story .flexbox-wrap').append(list);
                }
                setRepositionTagBox($('.user_story'));
            } else{
                $('.user_story').hide();
            }

            lgkorUI.hideLoading();
        });
    }

    function setRepositionTagBox(item){
        var maxBottom = 0;
        var status = getAlignStatusValues(item);

        var raw = 0;
        var col = 0;
        var boxmap = [];
        for(var i=0;i<status.rawnum;i++) boxmap.push([]);

        item.find('.flexbox').each(function(idx, box){
            var boxtop = 0, raw = idx, lastbox, leng, lasty, lastbottom;
            if(idx >= status.rawnum){
                boxtop = 1000000000;
                for(i=0;i<status.rawnum;i++){
                    leng = boxmap[i].length;
                    lastbox = boxmap[i][leng-1];
                    lasty = lastbox.position().top + lastbox.outerHeight(true) + 12;
                    if(lasty < boxtop){
                        raw = i;
                        col = leng-1;
                        boxtop = lasty;
                    }
                }
            }
            var boxleft = raw * (status.boxwidth + status.distance);

            $(box).css({
                position:'absolute',
                width: status.boxwidth,
                left: boxleft,
                top: boxtop
            });
            boxmap[raw][col] = $(box);

            var bottom = $(box).position().top + $(box).outerHeight(true);
            maxBottom = Math.max(maxBottom, bottom);
        });

        item.find('.flexbox-wrap').height(maxBottom)
    }

    function getAlignStatusValues(item){
        var rawnum = 4;
        var wrapwidth = item.find('.inner').width();
        var boxwidth = parseInt(wrapwidth/rawnum);
        
        while(boxwidth < 330){
            rawnum--;
            boxwidth = parseInt(wrapwidth/rawnum);
        }

        if(rawnum < 1){
            rawnum = 1;
            boxwidth = wrapwidth;
        }

        var distance = (wrapwidth - (boxwidth*rawnum))/(rawnum-1);
console.log(distance)
        return {
            rawnum: rawnum,
            boxwidth: boxwidth,
            distance: distance
        }
    }

    function loadNewStoryList(){

    }

    function resize(){
        setRepositionTagBox($('.user_story'));
    }

    $(window).load(function(){
        init();
    })
})();