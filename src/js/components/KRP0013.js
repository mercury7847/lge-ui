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
            self.$packageButton = self.$component.find('.support-box .list-box a');
        },
        //팝업 버튼 이벤트
        bindPopupEvents: function() {
            var self = this;
            //BTOCSITE-1376 사용설명서 팝업 열기
            self.$packageButton.on('click', function(e){
                var $this = $(this);
                if( $this.hasClass('package')) {
                    e.preventDefault();
                    var popupId = $this.attr('href');
                    $(popupId).vcModal({opener: this});
                } 
            })
            //BTOCSITE-5938-250 [모니터링] KRP0008.js 렌탈 전화상담 예약 팝업과 중복 호출 오류로 닫기 기능 삭제
        }
    };

$(document).ready(function(){
    if(!document.querySelector('.KRP0013')) return false;
    $('.KRP0013').buildCommonUI();
    KRP0013.init();
});
})();