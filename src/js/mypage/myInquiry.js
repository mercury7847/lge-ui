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
                vcui.require(['ui/pagination','ui/validation'], function () {
                    self.setting();
                    self.bindEvents();
                    self.checkNoData();
                });
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
                self.$pagination = self.$sectionInner.find('div.pagination').vcPagination();
                self.$noData = self.$lnbContents.find('div.no-data');

                var register = {
                    selectReason:{
                        required: true,
                        errorMsg: "예약 취소 사유를 선택해 주세요.",
                        msgTarget: '.err-msg'
                    }
                };

                self.serviceCancelValidation = new vcui.ui.Validation('article[id="popupServiceDetail"] .section-wrap',{register:register});
                self.serviceCancelProductionValidation = new vcui.ui.Validation('article[id="popupServiceProductDetail"] .section-wrap',{register:register});
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

                self.$pagination.on('page_click', function(e, data) {
                    var $input = self.$termFilter.find('input:checked');
                    var term = $input.val();
                    self.requestData({
                        "term":term,
                        "page": data
                    });
                });

                //서비스 상세 팝업
                var $detailPopup = self.$contWrap.find('article.popup-wrap');

                //예약취소/변경 버튼
                $detailPopup.on('click', 'div.flt-cont button', function(e) {
                    var index = $(this).index();
                    if(index == 0) {
                        var $popup = $(this).parents('article');
                        self.selectPopupConfirmType($popup, 'change');
                    } else {
                        var $popup = $(this).parents('article');
                        self.selectPopupConfirmType($popup, 'cancel');
                    }
                });

                //원문보기/확인 버튼
                $detailPopup.on('click', 'footer.pop-footer button:not(.ui_modal_close)', function(e) {
                    var $popup = $(this).parents('article');
                    var _type = $popup.attr('data-type');
                    var _id = $(this).parents('article').attr('data-id');
                    switch(_type) {
                        case 'detail':
                            self.openDetailPopup(_id);
                            break;
                        case 'change':
                            break;
                        case 'cancel':
                            var articleID = $popup.attr('id');
                            var result = (articleID == 'popupServiceDetail') ? self.serviceCancelValidation.validate() : self.serviceCancelProductionValidation.validate();
                            if(result.success){
                                var ajaxUrl = self.$lnbContents.attr('data-cancel-url');
                                var $sectionWrap = $popup.find('div.section-wrap.cancel');
                                var selected = $sectionWrap.find('.ui_selectbox').vcSelectbox('value');
                                var param = {
                                    "id":_id,
                                    "select":selected,
                                    "desc": $sectionWrap.find('.ui_textcontrol').val()
                                }
                                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                                    $popup.vcModal('close');
                                    location.reload();
                                });
                            }
                            break;
                        default:
                            break;
                    }
                });

                //팝업내 a태그 이동
                $detailPopup.on('click', 'div.gray-box.solv a', function(e) {
                    e.preventDefault();
                    $(this).parents('article').vcModal('close');
                    var url = $(this).attr('href');
                    location.href = url;
                });
            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-list-url');
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
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
                //ajaxUrl = "/lg5-common/data-ajax/mypage/customer/myInquiryDetailProduct.json";
                lgkorUI.requestAjaxData(ajaxUrl, {"id":id}, function(result) {
                    var data = result.data;

                    var $popup;
                    if(data.type == 'service') {
                        $popup = self.$contWrap.find('#popupServiceDetail');

                        $popup.attr('data-id',data.id);
                        var $sectionWrap = self.selectPopupConfirmType($popup, 'detail');

                        //타이틀
                        var $findItem = $popup.find('div.custom-step-area p.tit');
                        $findItem.text(data.title);

                        //처리레벨
                        var progressLevel = parseInt(data.progressLevel);
                        $findItem = $popup.find('div.step-inner div.bar');
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

                        $findItem = $popup.find('ul.step-txt li');
                        $findItem.each(function(idx, obj) {
                            if(idx < progressLevel) {
                                $(obj).addClass('comp').find('span').empty();
                            } else if (idx == progressLevel) {
                                $(obj).addClass('comp').find('span').text('현재 단계');
                            } else {
                                $(obj).removeClass('comp').find('span').empty();
                            }
                        });
                        
                        var $infobox = $popup.find('div.info-box');
                        //엔지니어
                        $findItem = $infobox.find('img');
                        $findItem.attr({"src":data.imageUrl,"alt":data.imageAlt});
                        $findItem = $infobox.find('p:eq(0)');
                        $findItem.text(data.person);
                        //접수번호
                        $findItem = $infobox.find('p:eq(1)');
                        $findItem.text(data.regNumber);

                        //원글 내용
                        $findItem = $sectionWrap.find('div.dl-infolist-wrap ul');
                        $findItem.empty();
                        var arr = data.listData instanceof Array ? data.listData : [];
                        arr.forEach(function(item, index) {
                            $findItem.append(vcui.template(popupDetailItemTemplate, item));
                        });
                    } else {
                        $popup = self.$contWrap.find('#popupServiceProductDetail');

                        $popup.attr('data-id',data.id);
                        var $sectionWrap = self.selectPopupConfirmType($popup, 'detail');

                        //타이틀
                        var $findItem = $popup.find('div.custom-step-area p.tit');
                        $findItem.text(data.title);

                        //처리레벨
                        var progressLevel = parseInt(data.progressLevel);
                        //pc
                        $findItem = $popup.find('div.pc-only div.step-inner div.bar');
                        $findItem.removeClass("bar1 bar2 bar3 bar4 bar5 bar6 bar7");
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
                            case 4:
                                $findItem.addClass('bar4');
                                break;
                            case 5:
                                $findItem.addClass('bar5');
                                break;
                            case 6:
                                $findItem.addClass('bar6');
                                break;
                            case 7:
                                $findItem.addClass('bar7');
                                break;
                            default:
                                break;
                        }

                        $findItem = $popup.find('div.pc-only ul.step-txt li');
                        $findItem.each(function(idx, obj) {
                            if(idx < progressLevel) {
                                $(obj).addClass('comp').find('span').empty();
                            } else if (idx == progressLevel) {
                                $(obj).addClass('comp').find('span').text('현재 단계');
                            } else {
                                $(obj).removeClass('comp').find('span').empty();
                            }
                        });

                        //mobile
                        $findItem = $popup.find('div.mob-only div.step-inner div.bar');
                        $findItem.removeClass("bar1 bar2 bar3 bar4");
                        switch(progressLevel) {
                            case 1:
                                $findItem.eq(0).addClass('bar1');
                                break;
                            case 2:
                                $findItem.eq(0).addClass('bar2');
                                break;
                            case 3:
                                $findItem.eq(0).addClass('bar3');
                                break;
                            case 4:
                                break;
                            case 5:
                                $findItem.eq(0).addClass('bar3');
                                $findItem.eq(1).addClass('bar1');
                                break;
                            case 6:
                                $findItem.eq(0).addClass('bar3');
                                $findItem.eq(1).addClass('bar2');
                                break;
                            case 7:
                                $findItem.eq(0).addClass('bar3');
                                $findItem.eq(1).addClass('bar3');
                                break;
                            default:
                                break;
                        }

                        $findItem = $popup.find('div.mob-only ul.step-txt li');
                        $findItem.each(function(idx, obj) {
                            if(idx < progressLevel) {
                                $(obj).addClass('comp').find('span').empty();
                            } else if (idx == progressLevel) {
                                $(obj).addClass('comp').find('span').text('현재 단계');
                            } else {
                                $(obj).removeClass('comp').find('span').empty();
                            }
                        });

                        var $infobox = $popup.find('div.info-box');
                        //엔지니어
                        $findItem = $infobox.find('img');
                        $findItem.attr({"src":data.imageUrl,"alt":data.imageAlt});
                        $findItem = $infobox.find('p:eq(0)');
                        $findItem.text(data.person);
                        //접수번호
                        $findItem = $infobox.find('p:eq(1)');
                        $findItem.text(data.regNumber);

                        //원글 내용
                        $findItem = $sectionWrap.find('div.dl-infolist-wrap ul');
                        $findItem.empty();
                        var arr = data.listData instanceof Array ? data.listData : [];
                        arr.forEach(function(item, index) {
                            $findItem.append(vcui.template(popupDetailItemTemplate, item));
                        });
                    }
                    
                    $popup.vcModal();
                });
            },

            selectPopupConfirmType: function($popup, type) {
                $popup.attr('data-type', type);
                var $sectionWrap;
                $popup.find('div.section-wrap').each(function(idx,obj){
                    var $obj = $(obj);
                    if($obj.hasClass(type)) {
                        $obj.show();
                        $sectionWrap = $obj;
                    } else {
                        $obj.hide();
                    }
                });

                switch(type) {
                    case 'detail':
                        $popup.find('footer.pop-footer button:not(.ui_modal_close) span').text('원문보기');
                        break;
                    case 'change':
                        $popup.find('footer.pop-footer button:not(.ui_modal_close) span').text('변경');
                        break;
                    case 'cancel':
                        $popup.find('footer.pop-footer button:not(.ui_modal_close) span').text('확인');
                        $sectionWrap.find('.ui_selectbox').vcSelectbox('selectedIndex',0,false);
                        $sectionWrap.find('.ui_textcontrol').val('');
                        break;
                    default:
                        break;
                }
                return $sectionWrap;
            },

            openDetailPopup: function(id) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-detail-url');
                lgkorUI.requestAjaxData(ajaxUrl, {"id":id}, function(result) {
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