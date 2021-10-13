/*!
 * @module vcui.helper.Sharer
 * @license MIT License
 * @description Sharer 컴포넌트
 * @copyright VinylC UID Group
 */
vcui.define('helper/sharer', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var detect = {
        PC: 1,
        MOBILE: 2,
        APP: 4
    };

    var defaultOption = {
        appKey : 'ba072a14b79cfe820b96a13b10e9bb27',
        selector: '.ui-sharer',
        attr: 'data-service',
        metas: {
            url:{},
            title: {},
            description: {},
            image: {}
        },
        onBeforeShare: function (el, data) {
            if (data.service == 'copy_url') {
                // url 복사하기 인 경우
                var url = $(el).attr('data-url');
                vcui.dom.copyToClipboard((!url?location.href:url), {
                    onSuccess: function () {
                        alert('URL을 복사했습니다.');
                    }
                });

                // false를 반환하면 공유를 위한 팝업을 안띄운다.
                return false;
            }
        },
        onShrered: function () {
        }
    };

    
    var Sharer = /** @lends axl.module.Sharer */{
        support: detect,
        services: /** @lends axl.module.Sharer.services */{ //['facebook', 'twitter', 'kakaotalk'],
            'facebook': /** @lends axl.module.Sharer.services.facebook */{
                name: 'facebook',
                support: detect.PC | detect.MOBILE,
                size: [500, 300],
                url: 'https://www.facebook.com/sharer.php?',
                makeParam: function makeParam(data) {
                    data.url = core.uri.addParam(data.url, {
                        '_t': +new Date()
                    });
                    return {u: data.url, t: data.title || ''};
                }
            },
            'twitter': /** @lends axl.module.Sharer.services.twitter */{
                name: 'twitter',
                support: detect.PC | detect.MOBILE,
                size: [550, 300],
                url: 'https://twitter.com/intent/tweet?',
                makeParam: function makeParam(data) {
                    data.desc = data.desc || '';

                    var length = 140 - data.url.length - 6,
                        // ... 갯수
                        txt = data.title + ' - ' + data.desc;

                    txt = txt.length > length ? txt.substr(0, length) + '...' : txt;
                    return {text: txt + ' ' + data.url};
                }
            },            
            'pinterest': /** @lends axl.module.Sharer.services.pinterest */{
                name: 'pinterest',
                support: detect.PC | detect.MOBILE,
                size: [740, 740],
                url: 'https://www.pinterest.com/pin/create/button/?',
                makeParam: function makeParam(data) {
                    return {
                        url: data.url,
                        media: data.image,
                        description: data.desc
                    };
                }
            },
            'kakaotalk': /** @lends axl.module.Sharer.services.kakaotalk */{
                name: 'kakaotalk',
                support: detect.PC | detect.MOBILE,
                makeParam: function makeParam(data) {
                    return {     
                        installTalk:true,
                        objectType : 'feed',
                        content : {
                            title : data.title,
                            description: data.desc,
                            imageUrl : data.image,
                            link : {
                                mobileWebUrl : data.url,
                                webUrl : data.url
                            }
                        }
                    };
                }
            },
            'copy_url': {
                support: detect.PC | detect.MOBILE,
                run: function(data) {
                    /* 
                    core.dom.copyToClipboard(data.url, {
                        onSuccess: function () {
                            alert('Copied!');
                        }
                    });
                    */
                }
            }
        },
        addService: function (name, options) {
            this.services[name] = options;
        },

        /**
         * 전송
         * @param {string} type facebook|twitter|kakaotalk|pinterest
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

            if (service.support & (detect.PC | detect.MOBILE)) {
                if (core.isFunction(service.run)) {
                    service.run(params);
                } else {

                    if(type === 'kakaotalk'){
                        Kakao.Link.sendDefault(service.makeParam(params));
                    }else{
                        if (service.size) {
                            sizeFeature += ', height=' + service.size[1] + ', width=' + service.size[0];
                        }
                        window.open(service.url + core.json.toQueryString(service.makeParam(params)), type,'menubar=no' + sizeFeature);
                    }
                }
            } else if (service.support & detect.APP) {

            }
        },

        _getMetaInfo: function (type, service) {
            var metas = this.options.metas;
            var name = metas[type][service] || type;

            if (core.isFunction(name)) {
                return name(type, service);
            } else {
                //Attribute Ends With Selector [name$=”value”]

                var $meta = $('head meta').filter('[name$="' + name + '"], [property$="' + name + '"]');
                var content = '';
                $meta.each(function(idx, item){
                    if($(item).attr('content') !==""){
                        content = $(item).attr('content');
                        return;
                    }
                });

                return content;
            }

            return '';
            /*
            switch (type) {
                case 'title':
                case 'description':
                case 'image':
                    if (core.isFunction(name)) {
                        return name(type, service);
                    } else {
                        return $('head meta').filter('[name$="' + name + '"], ' +
                            '[property$="' + name + '"]').eq(0).attr('content') || '';
                    }
            }
            return '';
            */
        },

        /**
         * 공유하기 실행
         * @param {jQuery|Element|string} el 버튼
         * @param {string} service sns벤더명
         */
        _share: function _share(el, service) {
            var $el = $(el),
                url = $el.attr('data-url') || this._getMetaInfo('url', service) || location.href, //$el.attr('href') || 
                title = $el.attr('data-title') || this._getMetaInfo('title', service) || document.title,
                desc = $el.attr('data-desc') || this._getMetaInfo('description', service) || '',
                image = $el.attr('data-image') || this._getMetaInfo('image', service) || '',
                data;

            url = url.split('#')[0];

            this.share(service, data = {
                target: el,
                url: url,
                title: title,
                desc: desc,
                image: image
            });
            
            data.service = service;
            this.options.onShrered($el, data);
        },

        init: function init(options) {
            var self = this,
                services = core.object.keys(this.services);

            self.options = core.extend(true, defaultOption, options);

            if(Kakao && Kakao.isInitialized() === false) {
                try{
                     Kakao.init(self.options.appKey);
                } catch(e) { }
            }


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


            $(document).on('click.sharer', self.options.selector, function (e) {

                e.preventDefault();

                var $el = $(this),
                    service = '';

                if (self.options.attr === 'class') {
                    service = hasClass($el);
                } else {
                    service = $el.attr(self.options.attr);
                }

                if (self.options.onBeforeShare($el, {service: service}) === false) {
                    return;
                }
                
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