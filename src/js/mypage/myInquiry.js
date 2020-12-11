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
                self.$mySort = self.$lnbContents.find('div.my-sort');

                self.$sectionInner = self.$lnbContents.find('div.section-inner');
                self.$myLists = self.$sectionInner.find('div.my-lists ul');
                self.$pagination = self.$sectionInner.find('div.pagination');
                self.$noData = self.$lnbContents.find('div.no-data');
                self.$detailPopup = self.$contWrap.find('#popupDetail');
            },

            bindEvents: function() {
                var self = this;
                self.$mySort.on("click", "a", function(e){
                    e.preventDefault();
                    if(!$(this).parent().hasClass('on')) {
                        var term = $(this).attr('href').replace("#","");
                        self.$mySort.find('li').removeClass('on');
                        $(this).parent().addClass('on');
                        self.requestData({"term":term});
                    }
                });

                self.$myLists.on("click", "a", function(e){
                    e.preventDefault();
                    var _id = $(this).attr('href').replace("#","");
                    //self.openDetailPopup(_id);
                    console.log(_id);
                });

                self.$pagination.vcPagination().on('page_click', function(e) {
                    var $a = self.$mySort.find('li.on a');
                    var category = $a.attr('href').replace("#","");
                    self.requestData({
                        "term":term,
                        "page": e.page
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
                    self.$listCount.text(vcui.number.addComma(data.totalCount));
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
                    self.$mySort.show();
                    self.$sectionInner.show();
                    self.$noData.hide();
                } else {
                    self.$mySort.hide();
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