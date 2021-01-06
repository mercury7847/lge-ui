
;(function(){
    var resultTabs;

    function init(){
        console.log("compare result start~~!!!");

        vcui.require(['ui/sticky', 'ui/smoothScrollTab'], function () {
            setting();
            bindEvents();
        });
    }

    function setting(){
        var self = this;

        self.tabClones = [];
        $('.tabs-scroll-wrap .tabs li').each(function(idx, item){
            self.tabClones.push($(item).clone())
        });
    }

    function bindEvents(){
        $('.result-tabs').on('change', 'input[name=differentCompare]', function(e){
            var chker = $(this).prop('checked');
            if(chker) setDifferentView();
            else setAllView();
        })
    }

    function setDifferentView(){
        var differentIDs = [];
        $('.compare-result-contents .section').each(function(idx, item){
            var lists = $(item).find('.lists .list');
            var leng = lists.length;
            var cleng = lists.eq(0).children().length;

            var differents = [];
            for(var j=0;j<cleng;j++){
                var diff = 0;
                var matchValue = "";
                for(var i=0;i<leng;i++){
                    var value = lists.eq(i).children().eq(j).find('dl dd').text();                    
                    if(matchValue != value){
                        diff++;
                        matchValue = value;
                    }
                }
                
                if(diff < 2) differents.push(j);
            }

            differentIDs.push(differents);
        });

        leng = differentIDs.length;
        for(i=0;i<leng;i++){
            var section = $('.compare-result-contents .section').eq(i);

            cleng = differentIDs[i].length;
            for(j=0;j<cleng;j++){
                var idx = differentIDs[i][j]+1;
                section.find('.lists > .list > li:nth-child(' + idx + ')').hide();
            }

            if(cleng == section.find('.lists > .list:first-child > li').length){
                section.hide();

                $('.tabs-scroll-wrap .tabs li').eq(i).addClass("delete");
            }
        }

        $('.tabs-scroll-wrap .tabs li.delete').remove();

        //$('.tabs-scroll-wrap .tabs li').removeClass('on');
        //$('.tabs-scroll-wrap .tabs li').eq(0).addClass('on');

        $('.compare-result.ui_sticky').vcSticky('update');
    }

    function setAllView(){
        var self = this;

        $('.tabs-scroll-wrap .tabs li').remove();
        for(var idx in self.tabClones) $('.tabs-scroll-wrap .tabs').append(self.tabClones[idx]);


        //$('.tabs-scroll-wrap .tabs li').eq(0).addClass('on');

        $('.compare-result-contents .section').show();
        $('.compare-result-contents .section .lists > .list > lI').show();
        $('.compare-result.ui_sticky').vcSticky('update');
    }

    $(window).load(function(){
        init();
    })
})();