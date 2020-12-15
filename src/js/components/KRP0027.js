$(window).ready(function(){
    if(!document.querySelector('.KRP0027')) return false;

    $('.KRP0027').buildCommonUI();

    ;(function(){
        var VIDEO_LIST_URL;
        var VIEWR_DATA_URL;

        var mainTab, superCateTab, subCateTab, subCateList;

        var scrollAbled = true;

        function init(){
            vcui.require(['ui/tab', 'libs/jquery-tmpl-1.0.0.min'], function () {
                setting();
                bindEvents();
            });
        }

        function setting(){
            VIDEO_LIST_URL = $('.KRP0027').data("videoListUrl");
            VIEWR_DATA_URL = $('.KRP0027').data("viewerDataUrl");

            mainTab = $('.ui_main_tab');
            superCateTab = $('.ui_supercate_tab');
            subCateTab = $('.ui_subcate_tab');
            subCateList = $('.sub_cate_list');
        }

        function bindEvents(){
            mainTab.on('tabchange', function(e, data){
                var cateID = $(data.relatedTarget).data("cateId");

                console.log("cateID :", cateID);
            });

            superCateTab.find('.ui_tab').on('tabchange', function(e, data){
                var cateID = $(data.relatedTarget).data("cateId");

                console.log("cateID :", cateID);
            });

            subCateList.scroll(function(e){
                setSubCateListScrolled();
            })

            $('.video-wrap').on('click', '.btn-modelName, .btn-moreModel', function(e){
                e.preventDefault();

                var modeiID = $(this).closest('.video-wrap').data('modelId');
                console.log("modeiID :", modeiID)
            });
            $('.video-list-wrap').on('click', '.video-list li a', function(e){
                e.preventDefault();

                var videoID = $(this).data('videoId');
                setViewContents(videoID);
            });
        }

        function setViewContents(vid){
            lgkorUI.showLoading();
            
            var sendata = {
                videoID: vid
            }
            lgkorUI.requestAjaxData(VIEWR_DATA_URL, sendata, function(result){    
                if(result.data.success == "Y"){
                    $('.video-wrap').empty();

                    if(breakpoint.isMobile) result.data.imgSrc = result.data.pcImage;
                    else result.data.imgSrc = result.data.mobileImage;
                    var templateList = $.tmpl( $('#tmpl-view-wrap').html(), result.data);
                    $('.video-wrap').append(templateList)
                } 

                lgkorUI.hideLoading();
            });
        }

        function setSubCateListScrolled(){
            if(scrollAbled){
                var page = subCateList.data('page');
                var totalpage = subCateList.data('totalpage');
                if(page < totalpage){
                    var scrolltop = subCateList.scrollTop();
                    var wrapheight = subCateList.height();
                    var listheight = subCateList.find('.video-list').outerHeight(true);
                    var scrolldist = listheight - wrapheight - 10;
                    if(scrolltop >= scrolldist){
                        console.log("setSubCateListScrolled();");
                        //scrollAbled = false;

                        setNextList(page+1);
                    }
                }
            }
        }

        function setNextList(page){
            var idxs = getTabCateIDs();
            console.log(idxs)   
        }

        function getTabCateIDs(){
            var mainTabIndex = mainTab.vcTab('getSelectIdx');
            var superTabIndex = superCateTab.find('.ui_tab').vcTab("getSelectIdx");
            var subTabIndex = subCateTab.vcTab("getSelectIdx");

            var mainCateID = mainTab.find('li[data-cate-id]').eq(mainTabIndex).data('cateId');
            var superCateID = superCateTab.find('li[data-cate-id]').eq(superTabIndex).data('cateId');
            var subCateID = subCateTab.find('li[data-cate-id]').eq(subTabIndex).data('cateId');

            return{
                mainCateID: mainCateID,
                superCateID: superCateID,
                subCateID: subCateID
            }
        }

        init();
    })();
})