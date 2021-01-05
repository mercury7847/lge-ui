
;(function(){
    var resultTabs;

    function init(){
        console.log("compare result start~~!!!");

        vcui.require(['ui/tab', 'ui/smoothScrollTab'], function () {
            setting();
            bindEvents();
        });
    }

    function setting(){
    }

    function bindEvents(){
        $('.result-tabs').on('change', 'input[name=differentCompare]', function(e){
            var chker = $(this).prop('checked');
            if(chker) setDifferentView();
            else setAllView();
        })
    }

    function setDifferentView(){
        // $('.result-contents .section').each(function(idx, item){
        //     var lists = $(item).find('.lists .list');
        //     var leng = lists.length;
        //     var cleng = lists.eq(0).children().length;

        //     for(var i=0;i<leng;i++){

        //         for(var j=0;j<cleng)
        //     }



        //     lists.eq(0).find('> li').each(function(cdx, child){
        //         var equal = true;
        //         var value = $(child).find('dl > dd').text();
        //         for(var i=1;i<cleng;i++){
        //             var other = lists.eq(i).find()
        //         }
        //     });
        // })
    }

    function setAllView(){

    }

    $(window).load(function(){
        init();
    })
})();