/*!
 * @module vcui.helper.Sharer
 * @license MIT License
 * @description Sharer 컴포넌트
 * @copyright VinylC UID Group
 */
define('helper/sharer', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var $doc = core.$doc,
        win = window,
        enc = encodeURIComponent;

    var detect = {
        PC: 1,
        MOBILE: 2,
        APP: 4
    };

    var Sharer = /** @lends axl.module.Sharer */{
        support: detect,
        services: /** @lends axl.module.Sharer.services */{ //['facebook', 'twitter', 'kakaotalk', 'kakaostory'/* , 'googleplus'*/],
            'facebook': /** @lends axl.module.Sharer.services.facebook */{
                name: '페이스북',
                support: detect.PC | detect.MOBILE,
                size: [500, 300],
                url: 'https://www.facebook.com/sharer.php?',
                makeParam: function makeParam(data) {
                    data.url = core.uri.addParam(data.url, {
                        '_t': +new Date()
                    });
                    return { u: data.url, t: data.title || '' };
                }
            },
            'twitter': /** @lends axl.module.Sharer.services.twitter */{
                name: '트위터',
                support: detect.PC | detect.MOBILE,
                size: [550, 300],
                url: 'https://twitter.com/intent/tweet?',
                makeParam: function makeParam(data) {
                    data.desc = data.desc || '';

                    var length = 140 - data.url.length - 6,

                    // ... 갯수
                    txt = data.title + ' - ' + data.desc;

                    txt = txt.length > length ? txt.substr(0, length) + '...' : txt;
                    return { text: txt + ' ' + data.url };
                }
            },
            'googleplus': /** @lends axl.module.Sharer.services.googleplus */{
                name: '구글플러스',
                support: detect.PC | detect.MOBILE,
                size: [500, 400],
                url: 'https://plus.google.com/share?',
                makeParam: function makeParam(data) {
                    return { url: data.title + ' ' + data.url };
                }
            },
            'pinterest': /** @lends axl.module.Sharer.services.pinterest */{
                name: '핀터레스트',
                support: detect.PC | detect.MOBILE,
                size: [740, 300],
                url: 'https://www.pinterest.com/pin/create/button/?',
                makeParam: function makeParam(data) {
                    return {
                        url: data.url,
                        media: data.image,
                        description: data.desc
                    };
                }
            },
            'linkedin': {
                name: '링크드인',
                support: detect.PC | detect.MOBILE,
                url: 'https://www.linkedin.com/shareArticle',
                makeParam: function makeParam(data) {
                    return {
                        url: data.url,
                        mini: true
                    };
                }
            },
            'kakaotalk': /** @lends axl.module.Sharer.services.kakaotalk */{
                name: '카카오톡',
                support: detect.APP | detect.MOBILE,
                makeParam: function makeParam(data) {
                    return {
                        msg: data.title + "\n" + (data.desc || ''),
                        url: data.url,
                        appid: "common store",
                        appver: "0.1",
                        type: "link",
                        appname: data.title
                    };
                }
            },
            'kakaostory': /** @lends axl.module.Sharer.services.kakaostory */{
                name: '카카오스토리',
                support: detect.APP | detect.MOBILE,
                makeParam: function makeParam(data) {
                    return {
                        post: data.title + "\n" + (data.desc || '') + "\n" + data.url,
                        appid: "axl.com",
                        appver: "1.0",
                        apiver: "1.0",
                        appname: data.title
                    };
                }
            },
            'line': /** @lends axl.module.Sharer.services.line */{
                name: '라인',
                support: detect.APP | detect.MOBILE,
                appUrl: 'http://line.me/R/msg/text/',
                url: 'line://msg/text/',
                store: {
                    android: {
                        intentPrefix: "intent://msg/text/",
                        intentSuffix: "#Intent;scheme=line;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=jp.naver.line.android;end"
                    },
                    ios: "http://itunes.apple.com/jp/app/line/id443904275"
                },
                makeParam: function makeParam(data) {
                    return {};
                }
            }
        },
        addService: function addService(name, options) {
            this.services[name] = options;
        },

        /**
         * 전송
         * @param {string} type facebook|twitter|line|kakaotalk|kakaostory|googleplus|pinterest
         * @param {Object} params
         * @param {string} params.url url 주소
         * @param {string} params.title 타이틀
         * @param {string} params.image 이미지
         * @param {string} params.desc 설명
         */
        share: function share(type, params) {
            var service = this.services[type];
            var sizeFeature = '';
            if (!service) {
                return;
            }

            params.url = (params.url + '').replace(/#$/g, '');
            params.url = params.url || location.href.replace(/#$/g, '');
            params.title = params.title || document.title;

            if (service.support & (detect.PC | detect.MOBILE)) {
                if (service.size) {
                    sizeFeature + ', height=' + service.size[1] + ', width=' + service.size[0];
                }
                window.open(service.url + core.json.toQueryString(service.makeParam(params)), type, 'menubar=no' + sizeFeature);
            } else if (service.support & detect.APP) {}
        },

        /**
         * 공유하기 실행
         * @param {jQuery|Element|string} el 버튼
         * @param {string} type sns벤더명
         */
        _share: function _share(el, type) {
            var $el = $(el),
                url = ($el.attr('href') || '').replace(/^#/, '') || $el.attr('data-url') || location.href,
                title = $el.attr('data-title') || $('head meta[property$=title]').attr('content') || document.title,
                desc = $el.attr('data-desc') || $('head meta[property$=description]').attr('content') || $('head meta[name=description]').attr('content') || '',
                image = $el.attr('data-image') || $('head meta[property$=image]').attr('content') || '';

            type || (type = $el.attr('data-sns'));

            if (!type) {
                alert('공유할 SNS타입을 지정해주세요.');
                return;
            }

            this.share(type, {
                url: url,
                title: title,
                desc: desc,
                image: image
            });
        },

        init: function init() {
            var self = this,
                services = core.object.keys(this.services);

            function hasClass($el) {
                var service;
                core.each(self.services, function (item, svc) {
                    if ($el.hasClass(svc)) {
                        service = svc;
                        return false;
                    }
                });
                return service;
            }

            $(document).on('click.sharer', '.ui-sharer', function (e) {
                e.preventDefault();

                var $el = $(this),
                    service = $el.attr('data-service');

                !service && (service = hasClass($el));

                if (!service || !core.array.include(services, service)) {
                    alert('공유할 SNS타입을 지정해주세요.');
                    return;
                }

                self._share($el.get(0), service);
            });
        }
    };

    return Sharer;
});