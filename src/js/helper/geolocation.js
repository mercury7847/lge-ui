/*!
 * @module vcui.helper.Geolocation
 * @license MIT License
 * @description 지오로케이션 헬퍼
 * @copyright VinylC UID Group
 */
vcui.define('ui/geolocation', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var geo = navigator.geolocation;

    /**
     * 네이티브 지오로케이션를 좀더 사용하기 쉽도록 작성된 Wrapper 클래스
     * @class
     * @name vcui.helper.Geolocation
     * @example
     * var geo = vcui.helper.Geolocation.getInstance();
     * geo.getCurrentPosition({
     *    timeout: 20000
     * }).done(function(position) {
     *     // position.coords.latitude;
     *     // position.coords.longitude;
     * });
     */
    var Geolocation = core.helper('Geolocation', core.Class( /**@lends vcui.helper.Geolocation# */{
        $singleton: true, // 싱글톤
        /**
         * 생성자
         * @param {Object} options
         */
        initialize: function initialize(options) {
            var self = this;

            self.options = $.extend({}, {
                maximumAge: 600000, // 최대 유지 시간
                timeout: 60000, // 타임아웃
                enableHighAccuracy: false //
            }, options);
        },

        /**
         * 에러코드에 해당하는 한글메세지 반환
         * @param {Object} err err.code, err.message
         * @return {string} 한글 에러메세지
         */
        _getTransKorMessage: function _getTransKorMessage(err) {
            /*
             err.code는 다음을 의미함. - error.UNKNOWN_ERROR
             0 : 알 수 없는 오류 - error.PERMISSION_DENIED
             1 : 권한 거부 - error.PERMISSION_DENIED
             2 : 위치를 사용할 수 없음 (이 오류는 위치 정보 공급자가 응답) - error.POSITION_UNAVAILABLE
             3 : 시간 초과 - error.TIMEOUT
             */
            var message = '';
            if (err.code == 0) {
                //alert("Error: An unknown error occurred");
                message = "알 수 없는 오류입니다. \n다시 시도해 주세요.";
            } else if (err.code == 1) {
                //alert("Error: User denied the request for Geolocation!");
                message = "권한이 거부되었습니다! \n설정에서 위치서비스가 켜져있는지 확인해주세요.";
            } else if (err.code == 2) {
                //alert("Error: Location information is unavailable!");
                message = "위치를 사용할 수 없습니다!";
            } else if (err.code == 3) {
                //alert("Error: The request to get user location timed out!");
                message = "시간 초과되었습니다. \n다시 시도해 주세요.";
            }
            return message;
        },

        /**
         * 현재 위치 가져옴
         * @returns {*}
         */
        getCurrentPosition: function getCurrentPosition(options) {
            var self = this,
                defer = $.Deferred();

            options = $.extend({}, self.options, options);

            if (geo) {
                geo.getCurrentPosition(function (position) {
                    defer.resolve(position);
                }, function (err) {
                    defer.reject({ code: err.code, message: self._getTransKorMessage(err) });
                }, options);
            } else {
                defer.reject({ code: 101, message: "죄송합니다. 브라우저가 위치서비스를 제공하지 않습니다!" });
            }

            return defer.promise();
        },

        /**
         * 실시간으로 감시(움직일 때 마다 success 실행)
         * @returns {*}
         */
        watchPosition: function watchPosition(successCallback, failCallback, options) {
            var self = this,
                defer = $.Deferred();

            if (geo) {
                defer.resolve('사용 가능합니다.');
                geo.watchPosition(successCallback, failCallback, options || self.options);
            } else {
                defer.reject({ code: 101, message: "죄송합니다. 브라우저가 위치서비스를 제공하지 않습니다!" });
            }

            return defer.promise();
        },

        /**
         * 다음맵의 api를 이용하여 현재 위치를 주소로 변환하여 반환
         * @returns {*}
         */
        getCurrentAddress: function getCurrentAddress() {
            var self = this,
                defer = $.Deferred();

            self.getCurrentPosition().done(function (position) {
                self._getCoord2Addr(position).done(function () {
                    defer.resolve.apply(defer, arguments);
                }).fail(function () {
                    defer.reject.apply(defer, arguments);
                });
            }).fail(function (err) {
                defer.reject({ code: err.code, message: self._getTransKorMessage(err) });
            });

            return defer.promise();
        }
    }));

    return Geolocation;
});