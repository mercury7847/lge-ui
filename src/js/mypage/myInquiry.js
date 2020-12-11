(function() {
    var listItemTemplate = '<li>' +
        '<div class="flag-wrap"><span class="flag">{{progress}}</span></div>' +
        '<p class="title"><a href="#{{id}}">[{{category}}] {{title}}</a>' +
        '</p>' +
        '<div class="info"><ul>' +
            '{{#if product}}<li>{{product}}</li>{{/if}}' +
            '<li>접수일 {{date}}</li>' +
            '<li>접수번호 {{regNumber}}</li>' +
            '<li>등록일 {{date}}</li>' +
        '</ul></div>' +
    '</li>';

    var serviceCountItemTemplate = '<dl><dt>{{title}}</dt><dd><ul>' +
        '{{#if data}}{{#each item in data}}<li>{{item.title}} <em>{{item.count}}</em></li>{{/each}}' +
        '{{#else}}<li>-</li>{{/if}}' +
    '</ul></dd></dl>'

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
                self.$detailPopup = self.$contWrap.find('#popupDetail');
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
                    //self.openDetailPopup(_id);
                    console.log(_id);
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
                    if(arr.length > 0) {
                        arr.forEach(function(item, index) {
                            item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                            self.$myLists.append(vcui.template(listItemTemplate, item));
                        });
                    }
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

            openDetailPopup: function(id) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-detail-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":id}, function(result) {
                    var data = result.data;

                    //처리레벨
                    var progressLevel = parseInt(data.progressLevel);
                    $findItem = self.$detailPopup.find('div.step-inner div.bar');
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

                    $findItem = self.$detailPopup.find('ul.step-txt li');
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
                    $findItem = self.$detailPopup.find('div.info-box p span');
                    $findItem.text(data.regNumber);

                    //원글 내용
                    $findItem = self.$detailPopup.find('div.dl-infolist-wrap li dd');
                    $findItem.eq(0).text(data.category);
                    $findItem.eq(1).text(data.date);
                    $findItem.eq(2).text(data.progress);
                    $findItem.eq(3).text(data.product);
                    $findItem.eq(4).text(data.productName);
                    $findItem.eq(5).text(data.title);
                    $findItem.eq(6).text(data.desc);
                    
                    //답변내용
                    var reply = data.reply;
                    var $innerBox = self.$detailPopup.find('div.inner-box:eq(1)');
                    if(reply) {
                        $innerBox.show();
                        $findItem = $innerBox.find('div.dl-infolist-wrap li dd');
                        $findItem.eq(0).text(reply.title);
                        $findItem.eq(1).text(reply.desc);
                        $findItem.eq(2).text(reply.date);
                    } else {
                        $innerBox.hide();
                    }

                    self.$detailPopup.vcModal();
                });
            }
        };

        myWrite.init();                
    });
})();