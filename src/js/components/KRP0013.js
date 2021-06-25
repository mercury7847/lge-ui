(function() {
        var KRP0013 = {
            init: function() {
                var self = this;
                self.setting();
                self.bindPopupEvents();
            },

            setting: function() {
                var self = this;
                //콤포넌트
                self.$component = $('section.component.KRP0013');
                self.$packageButton = self.$component.find('.item-manual.package');
                self.$selectPopup = $('#packageProductSelectPopup_01');
            },
            //팝업 버튼 이벤트
            bindPopupEvents: function() {
                var self = this;
                //BTOCSITE-1376 사용설명서 팝업 열기
                self.$packageButton.on('click', function(e){
                    e.preventDefault();
                    self.$selectPopup.vcModal({opener: this});
                })
                
                //BTOCSITE-1376 사용설명서 팝업 푸터 닫기버튼
                self.$selectPopup.find('.pop-footer .btn').on('click', function(e){
                    var _self = this;
                    self.packageSelect(_self)
                })
            },
            packageSelect: function(alertTarget){
                //BTOCSITE-1376 사용설명서 팝업 푸터 닫기버튼 클릭시 실행 이벤트
                var self = this;
                var $radio = self.$selectPopup.find('.model-list input:radio');

                if( !$radio.filter(':checked').length ) {
                    var msgTxt = '제품을 선택해주세요';
                    lgkorUI.alert("", {title: msgTxt}, alertTarget);
                } else {
                    location.href = $radio.filter(':checked').data('model-path');
                }
            }
        };

    $(document).ready(function(){
        if(!document.querySelector('.KRP0013')) return false;
        $('.KRP0013').buildCommonUI();
        KRP0013.init();
    });
})();