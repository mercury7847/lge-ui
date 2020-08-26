
define('components/KRC0013', ['jquery', 'vcui', 'ui/modal'], function ($, core) {
    "use strict";

    var KRC0013 = core.ui('KRC0013', {
        bindjQuery: true,
        defaults: {
            
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };
            
            console.log("KRC0013 start")
        }
    });

    return KRC0013;
});
vcui.require(['components/KRC0013'], function () {
    $('body').find('.KRC0013').vcKRC0013();
});
/*
    <!-- 비디오 모달 팝업 --> 
    <!-- 모달 오픈 시 body 에 .modal-open 추가 -->
    <div class="video-modal video-box-closeset youtube">
        <div class="modal-video-asset">
            <div class="video-asset">
                <iframe id="videoPlayerCode" frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="640" height="360" src="https://www.youtube.com/embed/PetoQo1eUww"></iframe>
            </div>
        </div>
        <button class="close-video">동영상 닫기</button>
    </div>
    <!-- // 비디오 모달 팝업 -->
*/
