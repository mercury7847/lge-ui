(function() {
    
    
    
    $(window).ready(function() {
        var psp = {
            init: function() {
                var self = this;

                $('.ui_anchor_sticky').vcSticky({
                    usedAnchor: "true",
                    actClass: "on"
                });

                CS.MD.survey($('#submitForm').serializeObject());
            }
        }
        
        psp.init();
    });
})();