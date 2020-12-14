(function() {
    $(window).ready(function() {
        var KRP0028 = {         
            init: function() {
                var self = this;
                self.setting();     
                self.bindEvent();
            },

            setting: function() {
                var self = this;
                var $section = $('.KRP0028');
                var $pageHeader = $section.find('page-header');
                var $tabs = $pageHeader.find('div.ui_Tab');
                self.$mainTab = $tabs.eq(0);
                self.$subTab = $tabs.eq(1);
            },

            bindEvent: function() {
                var self = this;
                self.$mainTab.on('click','li a',function(e){
                    var href = $(this).attr('href').replace("#","");
                    //requestTab
                });
                self.$subTab.on('click','li a',function(e){
                    var href = $(this).attr('href').replace("#","");
                    //requestTab
                });
            },

            requestData: function(param) {
                var self = this;
            }
        }
        
        KRP0028.init();
    });
})();