;(function(){
    var stickyTagTemplate = 
        '<div class="subscribe-wrap ui_sticky">'+
            '<div class="inner">'+
                '<div class="subscribe-tag">'+
                    '{{#if isSubscription}}'+
                    '<div class="tag-box subscribed">'+
                        '<strong class="tag-name">#{{tagName}}</strong>'+
                        '<button type="button" class="btn gray size subscription-btn" data-mode="remove" data-code="{{tagCode}}" data-name="{{tagName}}"><span>구독중</span></button>'+
                        '<button type="button" class="btn-close"><span class="blind">닫기</span></button>'+
                    '</div>'+
                    '{{#else}}'+
                    '<div class="tag-box">'+
                        '<strong class="tag-name">#{{tagName}}</strong>'+
                        '<button type="button" class="btn gray size subscription-btn" data-mode="add" data-code="{{tagCode}}" data-name="{{tagName}}"><span>구독하기</span></button>'+
                        '<button type="button" class="btn-close"><span class="blind">닫기</span></button>'+
                    '</div>'+
                    '{{/if}}'+
                '</div>'+
            '</div>'+
        '</div>';

            var storyListTemplate = 
                '<div class="flexbox" data-contents-type="{{contentsType}}">'+
                    //'<div class="box-wrap">'+
                        '<div class="box {{contentsType}}">'+
                            '<a href="{{storyUrl}}" class="visual-area">'+
                                '{{#if contentsType == "image"}}'+
                                '<span class="image">'+
                                    '<img aria-hidden="true" onerror="lgkorUI.addImgErrorEvent(this)" src="{{largeImage}}" alt="{{title}}">'+
                                '</span>'+
                                '{{#elsif contentsType == "video"}}'+
                                '<span class="image">'+
                                    '<img aria-hidden="true" onerror="lgkorUI.addImgErrorEvent(this)" src="{{smallImage}}" alt="{{title}}">'+
                                '</span>'+
                                '<a href="{{storyUrl}}" class="btn-video"><span class="blind">동영상 재생</span></a>'+
                                '{{/if}}'+
                            '</a>'+
                            '<div class="text-area">'+
                                '{{#if contentsName}}'+
                                '<div class="flag-wrap box-type">'+
                                    '<span class="flag">{{contentsName}}</span>'+
                                '</div>'+
                                '{{/if}}'+
                                '<a href="{{storyUrl}}" class="card-title"><span>{{#raw title}}</span></a>'+            
                                '<div class="tag-wrap">'+
                                    '<ul class="tags">'+
                                        '{{#each item in tagList}}'+           
                                        '<li class="tag"><a href="#" class="subscription-btn" data-mode="search" data-code="{{item.tagCode}}" data-name="{{item.tagName}}">#{{item.tagName}}</a></li>'+
                                        '{{/each}}'+
                                    '</ul>'+
                                '</div>'+
                            '</div>'+        
                            '<div class="date">{{regDate}}</div>'+
                        '</div>'+
                    //'</div>'+
                '</div>';

    var tagBoxTemplate = 
        '<div class="flexbox tag-area">'+
            '<span class="title">이런 태그는 어떠세요?</span>'+
            '<ul class="tag-lists">'+
                '{{#each item in tagList}}'+         
                '<li>'+
                    '<div class="tag">'+
                        '<span class="text">#{{item.tagName}}</span>'+
                        '<button type="button" class="btn gray size subscription-btn" data-mode="add" data-code="{{item.tagCode}}" data-name="{{item.tagName}}"><span>구독</span></button>'+
                    '</div>'+
                '</li>'+        
                '{{/each}}'+
            '</ul>'+
        '</div>';

    var recommendTagTemplate = 
        '<div class="flexbox-wrap">'+
            '<div class="flexbox tag-area">'+
                '<div class="title-area">'+
                    '<span class="title">취향에 맞는 <em>#태그</em>를 <br class="mo-only ">구독해보세요</span>'+
                    '<a href="#" class="btn-link tagmnger-btn"><span>다른 태그도 구독</span></a>'+
                '</div>'+
                '<div class="tag-lists-wrap ui_tag_smooth_scrolltab">'+
                    '<div class="ui_smooth_tab">'+
                        '<ul class="tag-lists">'+
                            '{{#each item in tagList}}'+                
                            '<li>'+
                                '<div class="tag">'+
                                    '<span class="text">#{{item.tagName}}</span>'+
                                    '<button type="button" class="btn gray size subscription-btn" data-mode="add" data-code="{{item.tagCode}}" data-name="{{item.tagName}}"><span>구독</span></button>'+
                                '</div>'+
                            '</li>'+  
                            '{{/each}}'+                      
                        '</ul>'+
                    '</div>'+
                    '<div class="scroll-controls ui_smooth_controls">'+
                        '<button type="button" class="btn-arrow prev ui_smooth_prev"><span class="blind">이전</span></button>'+
                        '<button type="button" class="btn-arrow next ui_smooth_next"><span class="blind">다음</span></button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>';

    var STORY_LIST_URL;
    var IS_LOGIN;
    var STORY_URL;
    var TAG_MANAGER_URL;
    var LOGIN_URL;

    var tagMngChkList;

    var imgScale = 1.25;    //640 * 800
    var videoScale = 0.56;  //240 * 136

    history.scrollRestoration = 'manual';

    function init(){      
        STORY_LIST_URL = $('.contents.story-main').data("storyList");
        IS_LOGIN = $('.contents.story-main').data("loginflag");
        STORY_URL = $('.contents.story-main').data("storyUrl");
        TAG_MANAGER_URL = $('.contents.story-main').data("tagMngUrl");
        LOGIN_URL = $('.contents.story-main').data("loginUrl");

        vcui.require(['ui/carousel', "ui/sticky"], function () {
            $('.story-review .slide-controls').hide();
            console.log($('.story-review .indi-wrap'))
            $(window).on('breakpointchange', function(e){
                var breakpoint = window.breakpoint;    
                if(breakpoint.name == 'mobile'){ 
                    $('.story-review').find('.indi-wrap').show();
                    $('.story-review').vcCarousel({
                        variableWidth: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    });
                }else if(breakpoint.name == 'pc'){   
                    $('.story-review').find('.indi-wrap').hide();
                    $('.story-review').vcCarousel('destroy');
                }    
            });
            $(window).trigger('breakpointchange');
            bindEvent();

            var moveScrollTop = 0;
            if(window.sessionStorage){                
                var storyUserHeight = sessionStorage.getItem('storyUserHeight');
                var storyNewHeight = sessionStorage.getItem('storyNewHeight');
                var storyHomeScrollTop = sessionStorage.getItem('storyHomeScrollTop');
                if(storyUserHeight){
                    $('#content').find('.user_story > .inner > .flexbox-wrap').height(storyUserHeight);
                }
                if(storyNewHeight){
                    $('#content').find('.new_story > .inner > .flexbox-wrap').height(storyNewHeight);
                }

                if(storyHomeScrollTop) {
                    moveScrollTop = storyHomeScrollTop;        
                }
            }

            loadStoryList('new_story', 1, 'NewStory');

            $('.user_story').hide();
            if(IS_LOGIN == "Y"){
                loadStoryList('user_story', 1, 'UserStory');
            } 

            setTimeout(function(){
                $('html, body').animate({scrollTop:moveScrollTop}, 120);
            }, 10);
        });
    }

    var userHeight = 0;
    var newsHeight = 0;

    function bindEvent(){
        $(window).on('resize', function(){
            resize();
        });

        $('.story-section').on('click', '.btn-moreview', function(e){
            e.preventDefault();

            var section = $(this).closest('.story-section');
            var page = section.data("page");

            if(section.hasClass('user_story')){
                if(page == 1){
                    userHeight = $('#content').find('.user_story > .inner > .flexbox-wrap').height();
                }
                loadStoryList('user_story', page+1, "UserStory");
            } else{
                if(page == 1){
                    newsHeight = $('#content').find('.new_story > .inner > .flexbox-wrap').height();
                }
                loadStoryList('new_story', page+1, 'NewStory');
            }
        }).on('click', '.subscribe-wrap button.btn-close', function(e){
            e.preventDefault();

            if(IS_LOGIN == "Y"){
                var userlistbox = $('.user_story').find('.flexbox-wrap');
                if(userlistbox.children().length > 0){
                    $('.user_story').find('.story-title-area').show();
                    $('.user_story').show();
                    setRepositionTagBox($('.user_story'));
                } else{
                    $('.tag-subscribe-story').show();
                }
            }
            
            var section = $(this).closest('.story-section');
            if(section.hasClass('new_story')){
                loadStoryList('new_story', 1, 'NewStory');
            } else{
                loadStoryList('user_story', 1, 'UserStory');

                $('.new_story').show();
                setRepositionTagBox($('.new_story'));
            }
        }).on('click', '.subscription-btn', function(e){
            e.preventDefault();
            
            sendTagList(this);
        }).on('click', '.tagmnger-btn', function(e){
            e.preventDefault();
            
            requestTagMngPop(this);
        });

        $('#popup-tagMnger').on('click', '.btn-group button', function(e){
            e.preventDefault();

            var ajaxurl = $(this).data("submitUrl");
            setTagMngOK(ajaxurl);
        }).on('change', 'input[type=checkbox]', function(){
            setTagMngChecked();
        });

        $(window).on('floatingTopHide', function(e){
            $('.floating-wrap .easy-path').removeClass('scroll');
        }); 

        $(window).on('floatingTopShow', function(e){
            $('.floating-wrap .easy-path').addClass('scroll');
        }); 

        $(document).on('click', 'a', function(e){

            var href = $(e.currentTarget).attr('href').replace(/ /gi, "");
            if(href == '#' || href == '#n'){
                e.preventDefault();
            }else{
                if (href && /^(#|\.)\w+/.test(href)) {    
                    e.preventDefault();
                }else{

                    if(window.sessionStorage){  
                        var user = userHeight>0? userHeight : $('#content').find('.user_story > .inner > .flexbox-wrap').height();
                        var news = newsHeight>0? newsHeight : $('#content').find('.new_story > .inner > .flexbox-wrap').height();
                        var scrollTop = $('html,body').scrollTop();

                        if(scrollTop > parseInt(user)+parseInt(news)){
                            scrollTop =  parseInt(user)+parseInt(news);
                        }

                        sessionStorage.setItem('storyUserHeight', user);
                        sessionStorage.setItem('storyNewHeight', news);                        
                        sessionStorage.setItem('storyHomeScrollTop', scrollTop);                        
                    }
                }
            }
        });
    }

    function setTagMngChecked(){
        $('#popup-tagMnger').find('.btn-group button').prop('disabled', false);

        setTagMngCount();
    }

    function setTagMngCount(count){
        var leng = count ? count : $('#popup-tagMnger').find('input[type=checkbox]:checked').length;
        var total = leng ? ' (' + leng + ')' : "";
        $('#popup-tagMnger .btn-group button').empty().html('<span>저장' + total + '</span>');
    }

    function setTagMngINIT(){
        for(var idx in tagMngChkList){
            $('#popup-tagMnger').find('input[id=' + tagMngChkList[idx].id + ']').prop("checked", tagMngChkList[idx].chk);
        }

        $('#popup-tagMnger').find('.btn-group button').prop('disabled', true);
        setTagMngCount(0);
    }

    function setTagMngOK(ajaxurl){
        lgkorUI.showLoading();

        var sendata = {tag:[]}
        $('#popup-tagMnger').find('input[type=checkbox]:checked').each(function(idx, item){
            var id = $(item).attr('id');
            sendata.tag.push(id);
        });

        lgkorUI.requestAjaxDataIgnoreCommonSuccessCheck(ajaxurl, sendata, function(result){
            lgkorUI.hideLoading();

            $('#popup-tagMnger').vcModal('close');

            loadStoryList('user_story', 1, "UserStory");
        });
    }

    function addTagMngInitData(){
        tagMngChkList = [];
        $('#popup-tagMnger').find('input[type=checkbox]').each(function(idx, item){
            var id = $(item).attr('id');
            var chk = $(item).prop('checked');
            tagMngChkList.push({id: id, chk: chk});
        });

        setTagMngCount();
    }

    function requestTagMngPop(dm){
        if(IS_LOGIN == "Y"){
            lgkorUI.requestAjaxData(TAG_MANAGER_URL, null, function(result){
                $('#popup-tagMnger').empty().html(result).vcModal({opener:$(dm)});
    
                addTagMngInitData();
            }, null, "html");
        } else{
            location.href = LOGIN_URL;
        }
    }

    function sendTagList(item){
        var section = $(item).closest('.story-section');
        var selectTags = {
            mode: $(item).data('mode'),
            tagCode: $(item).data('code'),
            tagName: $(item).data('name')
        }
        
        if(selectTags.mode == "add" || selectTags.mode == "remove"){
            if(IS_LOGIN == "Y"){
                loadStoryList('user_story', 1, "UserStory", selectTags);
                loadStoryList('new_story', 1, 'NewStory');
            } else{
                location.href = LOGIN_URL;
            }
        } else{
            if(section.hasClass('new_story')){
                loadStoryList('new_story', 1, 'NewStory', selectTags);
            } else{
                if(IS_LOGIN == "Y"){
                    if(selectTags.mode == "search"){
                        $('.new_story').hide();
                    }
                    loadStoryList('user_story', 1, "UserStory", selectTags);
                } else{
                    location.href = LOGIN_URL;
                }
            }
        }

        $('html, body').animate({scrollTop:0}, 180);
    }

    var firstPageHeight = 0;

    function loadStoryList(sectioname, page, type, selectTag){
        //lgkorUI.showLoading();

        var sendata = {
            page: page,
            type: type,
            selectTags: selectTag ? selectTag : ""
        }
        // console.log("### loadStoryList ###", STORY_LIST_URL, sendata)
        // var sendUrl = sectioname == "user_story" ? STORY_LIST_URL : "/lg5-common/data-ajax/home/storyList_new.json";
        // lgkorUI.requestAjaxData(sendUrl, sendata, function(result){
        lgkorUI.requestAjaxData(STORY_LIST_URL, sendata, function(result){
            if(result.data.loginUrl){
                location.href = result.data.loginUrl;

                return;
            }

            var sectionItem = $('.' + sectioname)
            var page = parseInt(result.param.pagination.page);
            var totalcnt = parseInt(result.param.pagination.totalCount);
            sectionItem.data("page", page);

            if(page == 1){
                sectionItem.find('.flexbox-wrap').empty();
                sectionItem.find('.ui_sticky').parent().remove();
            }

            if(page == totalcnt) sectionItem.find('.btn-moreview').css('display','none');
            else sectionItem.find('.btn-moreview').css('display','block');
            
            // console.log("result.data.selectTags:", result.data.selectTags);
            var viewMode;
            if(result.data.selectTags){

                viewMode = "selectTagMode";
                
                sectionItem.find('.inner h2.title').hide();
                
                var stickyTag = vcui.template(stickyTagTemplate, result.data.selectTags);
                sectionItem.prepend(stickyTag);

                sectionItem.find('.ui_sticky').vcSticky({stickyContainer:sectionItem});

                $('.user_story').find('.story-title-area').hide();
            } else{
                viewMode = "listMode";

                sectionItem.find('.inner h2.title').show();

                $('.user_story').find('.story-title-area').show();
            }
            
            if(result.data.storyList && result.data.storyList.length > 0){
                sectionItem.show();

                sectionItem.data("imgLoadId", 0);
                sectionItem.data("imgLoadTotal", result.data.storyList.length);
                for(var str in result.data.storyList){
                    var contentsType = result.data.storyList[str].contentsType;
                    if(contentsType == "video"){
                        var storyId = result.data.storyList[str].storyId;
                        result.data.storyList[str].storyUrl = STORY_URL + "?storyId="+storyId;                 
                    }
                    var list = vcui.template(storyListTemplate, result.data.storyList[str]);
                    sectionItem.find('.flexbox-wrap').append(list);
                }

                if(page == 1){
                    if(IS_LOGIN == "Y"){
                        if(viewMode == "listMode" && sectioname == "user_story"){
                            $('.tag-subscribe-story').empty().hide();

                            var putIdx = result.data.storyList.length < 10 ? result.data.storyList.length-1 : 9; 
                            list = vcui.template(tagBoxTemplate, {tagList: result.data.recommendTags});
                            sectionItem.show().find('.flexbox-wrap').children().eq(putIdx).after(list);
                        }
                    } else{
                        if(sectioname == "new_story"){
                            //$('.tag-subscribe-story').empty().show().append(vcui.template(recommendTagTemplate, {tagList:result.data.recommendTags}));
                            /* 20210518 추가 */
                            $('.tag-subscribe-story2').empty().show().append(vcui.template(recommendTagTemplate, {tagList:result.data.recommendTags}));
                            /* //20210518 추가 */
                            $('.ui_tag_smooth_scrolltab').vcSmoothScrollTab();
                        }
                    }

                    if(viewMode == "selectTagMode"){
                        if(sectioname == "new_story"){
                            $('.user_story').hide();
                        } else $('.new_story').hide();

                        $('.tag-subscribe-story').hide();
                    }
                }

                if(sectioname == "new_story"){
                    if(IS_LOGIN == "Y"){
                        var userlistbox = $('.user_story').find('.flexbox-wrap');
                        if(userlistbox.children().length > 0){
                            if(viewMode == "selectTagMode") sectionItem.find('.inner h2.title').hide();
                            else sectionItem.find('.inner h2.title').show();
                        }else sectionItem.find('.inner h2.title').hide();
                    } else{
                        sectionItem.find('.inner h2.title').hide();
                    }
                } else{

                    $('.new_story').find('.inner h2.title').show();
                }
                
                setRepositionTagBox(sectionItem);
            } else{
                if(sectioname == "user_story"){
                    // $('.tag-subscribe-story').empty().show().append(vcui.template(recommendTagTemplate, {tagList:result.data.recommendTags}));
                    /* 20210518 추가 */
                    $('.tag-subscribe-story2').empty().show().append(vcui.template(recommendTagTemplate, {tagList:result.data.recommendTags}));
                    /* //20210518 추가 */
                    $('.ui_tag_smooth_scrolltab').vcSmoothScrollTab();

                    $('.new_story').find('.inner h2.title').hide();
                }
                sectionItem.hide();
            }
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
            var boxtop = 0, raw = idx, lastbox, leng, lasty, boxheight, contype, txtheight, titleheight, tagheight, overflow;
            if(idx >= status.rawnum){
                boxtop = 1000000000;
                for(i=0;i<status.rawnum;i++){
                    leng = boxmap[i].length;
                    lastbox = boxmap[i][leng-1];

                    contype = lastbox.data('contentsType');
                    if(contype == 'image') boxheight = status.imgheight;
                    else if(contype == "video"){
                        txtheight = lastbox.find('.text-area').outerHeight(true);
                        boxheight = status.videoheight + txtheight;
                    } else{
                        titleheight = lastbox.find('.title').outerHeight(true);
                        tagheight = lastbox.find('.tag-lists').outerHeight(true);
                        boxheight = titleheight + tagheight;
                    }

                    lasty = lastbox.position().top + boxheight + status.distance;
                    if(lasty < boxtop - 40){
                        raw = i;
                        col = leng-1;
                        boxtop = lasty;
                    }
                }
            }

            overflow = "auto";
            contype = $(box).data('contentsType');
            if(contype == 'image') boxheight = status.imgheight;
            else if(contype == "video"){
                txtheight = $(box).find('.text-area').outerHeight(true);
                boxheight = status.videoheight + txtheight;
            } else{
                titleheight = $(box).find('.title').outerHeight(true);
                tagheight = $(box).find('.tag-lists').outerHeight(true);
                boxheight = titleheight + tagheight;       
                overflow = "visible";         
            }
            var boxleft = raw * (status.boxwidth + status.distance);
            $(box).css({
                position:'absolute',
                width: status.boxwidth,
                height: boxheight,
                left: boxleft,
                top: boxtop
            });
            boxmap[raw][col] = $(box);

            var bottom = $(box).position().top + boxheight;
            maxBottom = Math.max(maxBottom, bottom);
        });

        item.find('.flexbox-wrap').height(maxBottom);
    }
    
    function getAlignStatusValues(item){
        var rawnum = 4;
        var distance = 24;
        var distances = distance * (rawnum-1);
        var wrapwidth = item.find('.inner').width();
        var boxwidth = parseInt((wrapwidth-distances)/rawnum);

        while(boxwidth < 310){
            rawnum--;
            distances = distance * (rawnum-1);
            boxwidth = parseInt((wrapwidth-distances)/rawnum);
        }

        if(rawnum < 1){
            rawnum = 1;
            boxwidth = wrapwidth;
        }
        
        return {
            rawnum: rawnum,
            boxwidth: boxwidth,
            distance: distance,
            imgheight: boxwidth * imgScale,
            videoheight: boxwidth * videoScale
        }
    }

    function resize(){
        setRepositionTagBox($('.user_story'));
        setRepositionTagBox($('.new_story'));
    }

    $(document).ready(function(){
        init();
    })
})();