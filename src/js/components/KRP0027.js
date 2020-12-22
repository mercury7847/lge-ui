$(window).ready(function(){
    if(!document.querySelector('.KRP0027')) return false;

    $('.KRP0027').buildCommonUI();

    ;(function(){
        var VIDEO_LIST_URL;
        var VIEWER_DATA_URL;

        //var mainTab, superCateTab, subCateTab, subCateList;
        var superCategoryTab, categoryTab, yearTab, contList;

        var scrollAbled = true;

        var viewerTemplate = 
            '<div class="video-inner">'+
				'{{#if videoType == "youtube"}}'+
				'<div class="visual-area">'+
					'<div class="visual-box">'+
						'<div class="box-inner">'+
							'<img src="{{storyMainThumbnailPat}}{{storyMainThumbnailServerName}}" alt="{{storyMainThumbnailAltText}}">'+
							'<p class="hidden pc">{{storyTitle}}</p>'+
							'<p class="hidden mobile">{{storyTitle}}</p>'+
							'<iframe src="{{storyMovieUrl}}" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="{{storyTitle}}"></iframe>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'{{#else}}'+
				'<div class="visual-area animation-box">'+
					'<img src="{{storyMainThumbnailPath}}{{storyMainThumbnailServerName}}" alt="{{storyMainThumbnailAltText}}">'+
					'<p class="hidden pc">{{storyTitle}}</p>'+
					'<p class="hidden mobile">{{storyTitle}}</p>'+
					'<div class="animation-area">'+
						'<video autoplay muted loop>'+
							'<source src="{{storyMovieUrl}}" type="video/mp4">'+
						'</video>'+
						'<div class="controller-wrap wa-btn">'+
							'<button class="active pause" aria-label="Pause Video" name="pause" data-play-text="Play Video" data-pause-text="Pause Video" data-link-area="side_image_text-animation_play" data-link-name="" aria-describedby="title01">Pause Video</button>'+
						'</div>'+
					'</div>'+
					'<div class="caption">{{storyTitle}}</div>'+
				'</div>'+
				'{{/if}}'+
			'</div>'+
			'<div class="video-info">'+
				'{{#if modelList && modelList.length > 0}}'+
				'<div class="btn-area">'+
					'<div class="btn-wrap">'+
						'<a href="#n" class="btn-text btn-modelName">{{modelList[0].models[0].modelDisplayName}}</a>'+
						'{{#if isMoreModel}}'+
						'<button type="button" class="btn-more btn-moreModel"><span class="hidden">수상내역 더보기</span></button>'+
						'{{/if}}'+
					'</div>'+
				'</div>'+
				'{{/if}}'+
				'<div class="tit-area">'+
					'<p class="tit">{{storyTitle}}</p>'+
					'<p class="date">{{baseDate}}</p>'+
					'<div class="share-area">'+
						'<div class="tooltip-wrap share">'+
							'<a href="#n" class="tooltip-icon ui_tooltip-target" data-fixed="fixed-right" ui-modules="TooltipTarget"><span class="blind">제품 공유하기</span></a>'+
							'<div class="tooltip-box fixed-right" aria-hidden="true" style="display: none;">'+
								'<span class="title">공유</span>'+
								'<div class="sns-wrap">'+
									'<ul class="sns-list">'+
										'<li><a href="#none" data-url="" class="ico-btn fb" title="페이스북에 공유하기, 새창열림" data-link-name="facebook"><span class="blind">페이스북으로 페이지 공유하기</span></a></li>'+
										'<li><a href="#none" data-url="" class="ico-btn tw" title="트위터에 공유하기, 새창열림" data-link-name="twitter"><span class="blind">트위터로 페이지 공유하기</span></a></li>'+
										'<li><a href="#none" data-url="" class="ico-btn kk" title="카카오톡에 공유하기, 새창열림" data-link-name="kakaotalk"><span class="blind">카카오톡으로 페이지 공유하기</span></a></li>'+
										'<li><a href="#none" data-url="" class="ico-btn url" data-link-name="copy_url"><span class="blind">URL 복사하기</span></a></li>'+
									'</ul>'+
								'</div>'+
								'<button type="button" class="btn-close"><span class="blind">닫기</span></button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="desc">'+
					'<div class="inner">'+
						'{{#raw stroyDesc}}'+
					'</div>'+
					'<button class="more-btn"><span class="hidden">열기</span></button>'+
				'</div>'+
				'{{#if tagList && tagList.length > 0}}'+
				'<div class="hashtag-area">'+
					'<div class="tag-list">'+
						'{{#each hash in tagList}}'+
						'<a href="{{tagUrlPath}}{{hash.tagId}}" class="hashtag"><span>#</span>{{hash.tagName}}</a>'+
						'{{/each}}'+
					'</div>'+
				'</div>'+
				'{{/if}}'+
            '</div>';
            
        var matchModelPopTemplate = 
            '<p class="com-pop-tit">{{categoryName}}</p>'+
            '<ul class="com-pop-list">'+
                '{{#each model in models}}'+         
                '<li>'+
                    '<a href="{{model.modelUrlPath}}">{{model.modelDisplayName}}</a>'+
                '</li>'+
                '{{/each}}'+             
            '</ul>';

        var contListTemplate =
            '<li>'+
				'<a href="#n" data-story-id="{{storyId}}">'+
					'<span class="thumb">'+
						'<img src="{{storyMainThumbnailPath}}{{storyMainThumbnailServerName}}" alt="{{storyMainThumbnailAltText}}">'+
					'</span>'+
					'<span class="tit"><span>{{storyTitle}}</span></span>'+
				'</a>'+
			'</li>';

        function init(){
            vcui.require(['ui/tab'], function () {
                setting();
                bindEvents();
            });
        }

        function setting(){
            VIDEO_LIST_URL = $('.KRP0027').data("videoListUrl");
            VIEWER_DATA_URL = $('.KRP0027').data("viewerDataUrl");

            superCategoryTab = $('.ui_supercategory_tab');
            categoryTab = $('.ui_category_tab');
            yearTab = $('.ui_year_tab');
            contList = $('.cont_list');
        }

        function bindEvents(){
            superCategoryTab.on('tabchange', function(e, data){
                var cateID = $(data.relatedTarget).data("cateId");

                console.log("cateID :", cateID);
            });

            categoryTab.find('.ui_tab').on('tabchange', function(e, data){
                var cateID = $(data.relatedTarget).data("cateId");

                console.log("cateID :", cateID);
            });

            contList.scroll(function(e){
                setContListScrolled();
            })

            $('.video-wrap').on('click', '.btn-modelName, .btn-moreModel', function(e){
                e.preventDefault();

                $('#match-models').vcModal();
            });
            $('.video-list-wrap').on('click', '.video-list li a', function(e){
                e.preventDefault();
                
                var storyID = $(this).data('storyId');
                setViewContents(storyID);
            });
        }

        function setViewContents(sid){
            lgkorUI.showLoading();
            
            var sendata = {
                storyId: sid
            }
            lgkorUI.requestAjaxData(VIEWER_DATA_URL, sendata, function(result){    
                $('.video-wrap').empty();

                var isMoreModel = false;
                var modelist = result.data.modelList;
                if(modelist.length > 1 || modelist[0].models.length > 1){
                    isMoreModel = true;
                }
                result.data.isMoreModel = isMoreModel;

                var templateList = vcui.template(viewerTemplate, result.data);
                $('.video-wrap').append(templateList);

                $('#match-models .pop-conts').empty();
                for(var key in result.data.modelList){
                    var poptemplate = vcui.template(matchModelPopTemplate, result.data.modelList[key]);
                    $('#match-models .pop-conts').append(poptemplate);
                }

                lgkorUI.hideLoading();
            });
        }

        function setContListScrolled(){
            if(scrollAbled){
                var page = contList.data('page');
                var totalpage = contList.data('totalpage');
                if(page < totalpage){
                    var scrolltop = contList.scrollTop();
                    var wrapheight = contList.height();
                    var listheight = contList.find('.video-list').outerHeight(true);
                    var scrolldist = listheight - wrapheight - 10;
                    if(scrolltop >= scrolldist){
                        console.log("setContListScrolled();");
                        setContentsList(page+1);
                    }
                }
            }
        }

        function setContentsList(page){
            lgkorUI.showLoading();

            scrollAbled = false;

            var idxs = getTabCateIDs();
            var sendata = {
                page: page,
                superCategoryId: idxs.mainCateID,
                categoryId: idxs.superCateID,
                year: idxs.subCateID
            }
            
            lgkorUI.requestAjaxData(VIDEO_LIST_URL, sendata, function(result){
                var page = result.data.pagination.page;
                var totalpage = result.data.pagination.totalCount;
                contList.data('page', page);
                contList.data('totalpage', totalpage);

                if(page == 1) contList.find('.video-list').empty();
                for(var key in result.data.storyList){
                    var contlistemplate = vcui.template(contListTemplate, result.data.storyList[key]);
                    contList.find('.video-list').append(contlistemplate);
                }


                scrollAbled = true;

                lgkorUI.hideLoading();
            });
        }

        function getTabCateIDs(){
            var superCategoryTabIndex = superCategoryTab.vcTab('getSelectIdx');
            var superTabIndex = categoryTab.find('.ui_tab').vcTab("getSelectIdx");
            var subTabIndex = yearTab.vcTab("getSelectIdx");

            var mainCateID = superCategoryTab.find('li[data-cate-id]').eq(superCategoryTabIndex).data('cateId');
            var superCateID = categoryTab.find('li[data-cate-id]').eq(superTabIndex).data('cateId');
            var subCateID = yearTab.find('li[data-cate-id]').eq(subTabIndex).data('cateId');

            return{
                mainCateID: mainCateID,
                superCateID: superCateID,
                subCateID: subCateID
            }
        }

        init();
    })();
})