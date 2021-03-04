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
                '<div class="flexbox">'+
                    '<div class="box-wrap">'+
                        '<div class="box {{contentsType}}">'+
                            '<div class="visual-area">'+
                                '{{#if contentsType == "image"}}'+
                                '<span class="image">'+
                                    '<img onload="onImgLoadEvent(this)" onerror="lgkorUI.addImgErrorEvent(this)" src="{{largeImage}}" alt="{{title}}">'+
                                '</span>'+
                                '{{#elsif contentsType == "video"}}'+
                                '<span class="image">'+
                                    '<img onload="onImgLoadEvent(this)" onerror="lgkorUI.addImgErrorEvent(this)" src="{{smallImage}}" alt="{{title}}">'+
                                '</span>'+
                                '<a href="{{storyUrl}}" class="btn-video"><span class="blind">동영상 재생</span></a>'+
                                '{{/if}}'+
                            '</div>'+
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
                        '<button type="button" class="btn gray size subscription-btn" data-mode="add" data-code="{{item.tagCode}}" data-name="{{item.tagName}}"><span>구독</span></button>'+
                    '</div>'+
                '</li>'+        
                '{{/each}}'+
            '</ul>'+
        '</div>';

    var STORY_LIST_URL;
    var IS_LOGIN;

    var listMaxLength = 12;
    var imgLoadId = 0;
    var imgLoadTotal = 0;

    var tagMngChkList;

    function init(){      
        STORY_LIST_URL = $('.contents.story-main').data("storyList");
        IS_LOGIN = $('.contents.story-main').data("loginflag");

        vcui.require(['ui/toggleCarousel', "ui/sticky"], function () {
            $('.story-review').vcToggleCarousel({
                pcOption: "unbuild",
                mobileOption: {
                    variableWidth: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            });

            bindEvent();

            loadStoryList('user_story', 1, 'UserStory');
    
            $('.new_story').hide();
            if(IS_LOGIN == "Y") loadStoryList('new_story', 1, 'NewStory');
        });
    }

    function bindEvent(){
        $(window).on('resize', function(){
            resize();
        });

        $('.story-section').on('click', '.btn-moreview', function(e){
            e.preventDefault();

            var section = $(this).closest('.story-section');
            var page = section.data("page");
            if(section.hasClass('user_story')){
                loadStoryList('user_story', page+1, "UserStory");
            } else{
                loadStoryList('new_story', page+1, 'NewStory');
            }
        }).on('click', '.subscribe-wrap button.btn-close', function(e){
            e.preventDefault();

            var section = $(this).closest('.story-section');
            if(section.hasClass('user_story')){
                loadStoryList('user_story', 1, "UserStory");
            } else{
                loadStoryList('new_story', 1, 'NewStory');
            }
        }).on('click', '.subscription-btn', function(e){
            e.preventDefault();

            sendTagList(this);
        });

        $('.floating-wrap .easy-path a').on('click', function(e){
            e.preventDefault();
            
            requestTagMngPop(this);
        });

        $('#popup-tagMnger').on('click', '.btn-group button:nth-child(1)', function(e){
            e.preventDefault();

            setTagMngINIT();
        }).on('click', '.btn-group button:nth-child(2)', function(e){
            e.preventDefault();

            var ajaxurl = $(this).data("submitUrl");
            setTagMngOK(ajaxurl);
        }).on('change', 'input[type=checkbox]', function(){
            setTagMngChecked();
        });
    }

    function setTagMngChecked(){
        $('#popup-tagMnger').find('.btn-group button').prop('disabled', false);

        setTagMngCount();
    }

    function setTagMngCount(count){
        var leng = count ? count : $('#popup-tagMnger').find('input[type=checkbox]:checked').length;
        var total = leng ? ' (' + leng + ')' : "";
        $('#popup-tagMnger .btn-group button:nth-child(2)').empty().html('<span>완료' + total + '</span>');
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
        var href = $(dm).attr('href');
        var isLogin = $(dm).data('isLogin');
        if(isLogin == "Y"){
            lgkorUI.requestAjaxData(href, null, function(result){
                $('#popup-tagMnger').empty().html(result).vcModal();
    
                addTagMngInitData();
            }, null, "html");
        } else{
            location.href = href;
        }
    }

    function sendTagList(item){
        var selectTags = {
            mode: $(item).data('mode'),
            tagCode: $(item).data('code'),
            tagName: $(item).data('name')
        }
        var section = $(item).closest('.story-section');
        if(section.hasClass('user_story')){
            loadStoryList('user_story', 1, "UserStory", selectTags);
        } else{
            loadStoryList('new_story', 1, 'NewStory', selectTags);
        }
        console.log(section.attr('class'), " [selectTags:", selectTags, ']');
    }

    function loadStoryList(sectioname, page, type, selectTag){
        lgkorUI.showLoading();

        var sendata = {
            page: page,
            type: type,
            selectTags: selectTag ? selectTag : ""
        }
        console.log("### loadStoryList ###", STORY_LIST_URL, sendata)
        lgkorUI.requestAjaxData(STORY_LIST_URL, sendata, function(result){
            console.log("### requestAjaxData ###", result);

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

            if(page == totalcnt) sectionItem.find('.btn-moreview').hide();
            else sectionItem.find('.btn-moreview').show();
            
            if(result.data.selectTags){
                sectionItem.find('.inner h2.title').hide();
                
                var stickyTag = vcui.template(stickyTagTemplate, result.data.selectTags);
                sectionItem.prepend(stickyTag);

                sectionItem.find('.ui_sticky').vcSticky({stickyContainer:sectionItem});
            } else{
                sectionItem.find('.inner h2.title').show();
            }
            
            if(result.data.storyList && result.data.storyList.length > 0){
                sectionItem.show();

                imgLoadId = 0;
                imgLoadTotal = result.data.storyList.length;
                for(var str in result.data.storyList){
                    var list = vcui.template(storyListTemplate, result.data.storyList[str]);
                    sectionItem.find('.flexbox-wrap').append(list);
                }

                if(page == 1 && result.data.recommendTags){
                    list = vcui.template(tagBoxTemplate, {tagList: result.data.recommendTags});
                    sectionItem.find('.flexbox-wrap').append(list);
                }
            } else{
                sectionItem.hide();
                lgkorUI.hideLoading();
            }
        });
    }

    function imgLoadEvent(img){
        imgLoadId++;
        if(imgLoadId == imgLoadTotal){
            console.log("### img load complete ###");

            var sectionItem = $(img).closest('.story-section');
            setRepositionTagBox(sectionItem);
            
            var scrolltop = 999999999999999;
            sectionItem.find('.flexbox-wrap .flexbox').each(function(cdx, child){
                if(!$(child).data('appearAnim')){
                    scrolltop = Math.min(scrolltop, $(child).offset().top);

                    var delay = parseInt(Math.random()*10)*15;
                    $(child).data('appearAnim', true);
                    $(child).find('.box-wrap').css({opacity:0, y:100}).delay(delay).transition({opacity:1, y:0}, 500, "easeInOutCubic");
                }
            });

            var page = sectionItem.data("page");
            if(page > 1){
                var status = getAlignStatusValues(sectionItem);
                $('html, body').animate({scrollTop: scrolltop - status.distance}, 500);
            }

            lgkorUI.hideLoading();
        }
    }
    window.onImgLoadEvent = imgLoadEvent;

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
                    lasty = lastbox.position().top + lastbox.outerHeight(true) + status.distance;
                    if(lasty < boxtop - 40){
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
            distance: distance
        }
    }

    function resize(){
        setRepositionTagBox($('.user_story'));
        setRepositionTagBox($('.new_story'));
    }

    $(window).load(function(){
        init();
    })
})();