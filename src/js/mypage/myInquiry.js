(function() {
    var listItemTemplate = '<li>' +
        '<div class="flag-wrap"><span class="flag">{{progress}}</span></div>' +
        '<p class="title"><a href="#{{id}}">[{{category}}] {{title}}</a>' +
        '</p>' +
        '<div class="info"><ul>' +
            '{{#if product}}<li>{{product}}</li>{{/if}}' +
            '<li>접수일 {{date}}</li>' +
            '<li>접수번호 {{regNumber}}</li>' +
        '</ul></div>' +
    '</li>';

    var serviceCountItemTemplate = '<dl><dt>{{title}}</dt><dd><ul>' +
        '{{#if data}}{{#each item in data}}<li>{{item.title}} <em>{{item.count}}</em></li>{{/each}}' +
        '{{#else}}<li>-</li>{{/if}}' +
    '</ul></dd></dl>'

    var popupDetailItemTemplate = '<li><dl><dt>{{title}}</dt><dd>{{#raw desc}}</dd></dl></li>'

    $(window).ready(function() {
        var myWrite = {
            init: function() {
                var self = this;
                self.setting();
                vcui.require(['ui/pagination'], function () {
                    self.bindEvents();
                });
                self.checkNoData();
            },

            setting: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');
                self.$lnbContents = self.$contWrap.find('div.lnb-contents');
                self.$termFilter = self.$lnbContents.find('div.term-filter');

                self.$serviceUseCount = self.$lnbContents.find('div.tit-wrap tit em');
                self.$serviceUseList = self.$lnbContents.find('div.service-use-list');

                self.$sectionInner = self.$lnbContents.find('div.section-inner');
                self.$myLists = self.$sectionInner.find('div.my-lists ul');
                self.$pagination = self.$sectionInner.find('div.pagination');
                self.$noData = self.$lnbContents.find('div.no-data');
            },

            bindEvents: function() {
                var self = this;
                self.$termFilter.on("click", "input", function(e){
                    var term = $(this).val();
                    self.requestData({"term":term});
                });

                self.$myLists.on("click", "a", function(e){
                    e.preventDefault();
                    var _id = $(this).attr('href').replace("#","");
                    self.openServiceDetailPopup(_id);
                });

                self.$pagination.vcPagination().on('page_click', function(e, data) {
                    var $input = self.$termFilter.find('input:checked');
                    var term = $input.val();
                    console.log(data);
                    self.requestData({
                        "term":term,
                        "page": data
                    });
                });

                //서비스 상세 팝업
                var $detailPopup = self.$contWrap.find('#popupServiceDetail');

                //예약취소 버튼
                $detailPopup.on('click', 'div.flt-cont button:eq(1)', function(e) {
                    var _id = $(this).parents('article').attr('data-id');
                    self.openServiceCancelPopup(_id);
                });

                //원문보기 버튼
                $detailPopup.on('click', 'footer.pop-footer button:not(.ui_modal_close)', function(e) {
                    var _id = $(this).parents('article').attr('data-id');
                    self.openDetailPopup(_id);
                });

                //팝업내 a태그 이동
                $detailPopup.on('click', 'div.gray-box a', function(e) {
                    e.preventDefault();
                    $(this).parents('article').vcModal('close');
                    var url = $(this).attr('href');
                    location.href = url;
                });

                //서비스 취소 팝업
                var $cancelPopup = self.$contWrap.find('#popupServiceCancel');

                //취소 확인 버튼
                $detailPopup.on('click', 'footer.pop-footer button:not(.ui_modal_close)', function(e) {
                    var _id = $(this).parents('article').attr('data-id');
                    self.openDetailPopup(_id);
                });

            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-list-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                    var data = result.data;
                    var param = result.param;
                    self.$pagination.vcPagination('setPageInfo',param.pagination);

                    var service = data.service;
                    self.$serviceUseCount.text(vcui.number.addComma(service.useCount));
                    self.$serviceUseList.find('>ul>li').each(function(idx, obj){
                        var $obj = $(obj);
                        $obj.find('dl').empty();
                        var data = null;
                        switch(idx) {
                            case 0:
                                data = service.inquiry;
                                break;
                            case 1:
                                data = service.trip;
                                break;
                            case 2:
                                data = service.visit;
                                break;
                            default:
                                data = null;
                                break;
                        }
                        if(data) {
                            $obj.find('strong em').text(data.count);
                            data.listData.forEach(function(item){
                                $obj.append(vcui.template(serviceCountItemTemplate, item));
                            });
                        }
                    });

                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$myLists.empty();
                    arr.forEach(function(item, index) {
                        item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                        self.$myLists.append(vcui.template(listItemTemplate, item));
                    });
                    self.checkNoData();
                });
            },

            checkNoData: function() {
                var self = this;
                if(self.$myLists.find('li').length > 0) {
                    self.$sectionInner.show();
                    self.$noData.hide();
                } else {
                    self.$sectionInner.hide();
                    self.$noData.show();
                }
            },

            openServiceDetailPopup: function(id) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-service-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":id}, function(result) {
                    var data = result.data;

                    var $detailPopup = self.$contWrap.find('#popupServiceDetail');
                    if(data.type == 'service') {
                        $detailPopup.attr('data-id',data.id);

                        //타이틀
                        var $findItem = $detailPopup.find('div.custom-step-area p.tit');
                        $findItem.text(data.title);

                        //처리레벨
                        var progressLevel = parseInt(data.progressLevel);
                        $findItem = $detailPopup.find('div.step-inner div.bar');
                        $findItem.removeClass("bar1 bar2 bar3");
                        switch(progressLevel) {
                            case 1:
                                $findItem.addClass('bar1');
                                break;
                            case 2:
                                $findItem.addClass('bar2');
                                break;
                            case 3:
                                $findItem.addClass('bar3');
                                break;
                            default:
                                break;
                        }

                        $findItem = $detailPopup.find('ul.step-txt li');
                        $findItem.each(function(idx, obj) {
                            if(idx < progressLevel) {
                                $(obj).addClass('comp').find('span').empty();
                            } else if (idx == progressLevel) {
                                $(obj).addClass('comp').find('span').text('현재 단계');
                            } else {
                                $(obj).removeClass('comp').find('span').empty();
                            }
                        });
                        
                        var $infobox = $detailPopup.find('div.info-box');
                        //엔지니어
                        $findItem = $infobox.find('img');
                        $findItem.attr({"src":data.imageUrl,"alt":data.imageAlt});
                        $findItem = $infobox.find('p:eq(0)');
                        $findItem.text(data.person);
                        //접수번호
                        $findItem = $infobox.find('p:eq(1)');
                        $findItem.text(data.regNumber);

                        //원글 내용
                        $findItem = $detailPopup.find('div.dl-infolist-wrap ul');
                        $findItem.empty();
                        var arr = data.listData instanceof Array ? data.listData : [];
                        arr.forEach(function(item, index) {
                            $findItem.append(vcui.template(popupDetailItemTemplate, item));
                        });
                    } else {
                        $detailPopup = self.$contWrap.find('#popupDetail');
                        $detailPopup.attr('data-id',data.id);
                    }
                    
                    $detailPopup.vcModal();
                    self.$currentPopup = $detailPopup;
                });
            },

            openServiceCancelPopup: function(id) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-service-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":id}, function(result) {
                    var data = result.data;

                    var $detailPopup = self.$contWrap.find('#popupServiceCancel');
                    if(data.type == 'service') {
                        $detailPopup.attr('data-id',data.id);

                        //타이틀
                        var $findItem = $detailPopup.find('div.custom-step-area p.tit');
                        $findItem.text(data.title);

                        //처리레벨
                        var progressLevel = parseInt(data.progressLevel);
                        $findItem = $detailPopup.find('div.step-inner div.bar');
                        $findItem.removeClass("bar1 bar2 bar3");
                        switch(progressLevel) {
                            case 1:
                                $findItem.addClass('bar1');
                                break;
                            case 2:
                                $findItem.addClass('bar2');
                                break;
                            case 3:
                                $findItem.addClass('bar3');
                                break;
                            default:
                                break;
                        }

                        $findItem = $detailPopup.find('ul.step-txt li');
                        $findItem.each(function(idx, obj) {
                            if(idx < progressLevel) {
                                $(obj).addClass('comp').find('span').empty();
                            } else if (idx == progressLevel) {
                                $(obj).addClass('comp').find('span').text('현재 단계');
                            } else {
                                $(obj).removeClass('comp').find('span').empty();
                            }
                        });
                        
                        var $infobox = $detailPopup.find('div.info-box');
                        //엔지니어
                        $findItem = $infobox.find('img');
                        $findItem.attr({"src":data.imageUrl,"alt":data.imageAlt});
                        $findItem = $infobox.find('p:eq(0)');
                        $findItem.text(data.person);
                        //접수번호
                        $findItem = $infobox.find('p:eq(1)');
                        $findItem.text(data.regNumber);

                    } else {
                        $detailPopup = self.$contWrap.find('#popupDetail');
                        $detailPopup.attr('data-id',data.id);
                    }
                    
                    self.$currentPopup.vcModal('close');
                    $detailPopup.vcModal();
                });
            },

            openDetailPopup: function(id) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-detail-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":id}, function(result) {
                    var data = result.data;
                    var $detailPopup = self.$contWrap.find('#popupDetail');

                    //처리레벨
                    var progressLevel = parseInt(data.progressLevel);
                    var $findItem = $detailPopup.find('div.step-inner div.bar');
                    $findItem.removeClass("bar1 bar2 bar3");
                    switch(progressLevel) {
                        case 1:
                            $findItem.addClass('bar1');
                            break;
                        case 2:
                            $findItem.addClass('bar2');
                            break;
                        case 3:
                            $findItem.addClass('bar3');
                            break;
                        default:
                            break;
                    }

                    $findItem = $detailPopup.find('ul.step-txt li');
                    $findItem.each(function(idx, obj) {
                        if(idx < progressLevel) {
                            $(obj).addClass('comp').find('span').empty();
                        } else if (idx == progressLevel) {
                            $(obj).addClass('comp').find('span').text('현재 단계');
                        } else {
                            $(obj).removeClass('comp').find('span').empty();
                        }
                    });
                    
                    //접수번호
                    $findItem = $detailPopup.find('div.info-box p span');
                    $findItem.text(data.regNumber);

                    //원글 내용
                    var $innerBox = $detailPopup.find('div.inner-box:eq(0)');
                    $findItem =$innerBox.find('div.dl-infolist-wrap ul');
                    $findItem.empty();
                    var arr = data.listData instanceof Array ? data.listData : [];
                    arr.forEach(function(item, index) {
                        $findItem.append(vcui.template(popupDetailItemTemplate, item));
                    });
                    
                    //답변내용
                    var reply = data.reply;
                    $innerBox = $detailPopup.find('div.inner-box:eq(1)');
                    if(reply) {
                        $innerBox.show();
                        $findItem = $innerBox.find('div.dl-infolist-wrap ul');
                        $findItem.empty();
                        var arr = reply instanceof Array ? reply : [];
                        arr.forEach(function(item, index) {
                            $findItem.append(vcui.template(popupDetailItemTemplate, item));
                        });
                    } else {
                        $innerBox.hide();
                    }

                    $detailPopup.vcModal();
                });
            }
        };

        myWrite.init();                
    });
})();