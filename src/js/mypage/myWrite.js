(function() {
    var listItemTemplate = '<li>' +
        '<div class="flag-wrap"><span class="flag">{{progress}}</span></div>' +
        '<p class="title"><a href="#{{id}}">{{title}}</a>' +
        '</p>' +
        '<div class="info"><ul>' +
            '<li>접수번호 {{regNumber}}</li>' +
            '<li>등록일 {{date}}</li>' +
        '</ul></div>' +
    '</li>';

    var popupDetailItemTemplate = '<li><dl><dt>{{title}}</dt><dd>{{#raw desc}}</dd></dl></li>'

    $(window).ready(function() {
        var myWrite = {
            init: function() {
                var self = this;
                vcui.require(['ui/pagination'], function () {
                    self.setting();
                    self.bindEvents();
                    
                    var $a = self.$mySort.find('li.on a');
                    var category = $a.attr('href').replace("#","");
                    self.requestData({
                        "category":category,
                        "page": "1"
                    });

                    //self.checkNoData();
                });
            },

            setting: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');
                self.$lnbContents = self.$contWrap.find('div.lnb-contents');
                self.$mySort = self.$lnbContents.find('div.my-sort');
                self.$sectionInner = self.$lnbContents.find('div.section-inner');
                self.$listCount = self.$sectionInner.find('p.list-count em');
                self.$myLists = self.$sectionInner.find('div.my-lists ul');
                self.$pagination = self.$sectionInner.find('div.pagination').vcPagination();
                self.$noData = self.$lnbContents.find('div.no-data');
                self.$detailPopup = self.$contWrap.find('#popupDetail');
            },

            bindEvents: function() {
                var self = this;
                self.$mySort.on("click", "a", function(e){
                    e.preventDefault();
                    if(!$(this).parent().hasClass('on')) {
                        var category = $(this).attr('href').replace("#","");
                        self.$mySort.find('li').removeClass('on');
                        $(this).parent().addClass('on');
                        self.requestData({
                            "category":category,
                            "page": "1"
                        });
                    }
                });

                self.$myLists.on("click", "a", function(e){
                    e.preventDefault();
                    var ajaxUrl = self.$lnbContents.attr('data-detail-url');
                    var _id = $(this).attr('href').replace("#","");
                    if(ajaxUrl) {
                        var url = ajaxUrl + "?id=" + _id;
                        self.requestModal(url, this);
                    }
                    /*
                    var _id = $(this).attr('href').replace("#","");
                    self.openDetailPopup(_id);
                    */
                });

                self.$pagination.on('page_click', function(e, data) {
                    var $a = self.$mySort.find('li.on a');
                    var category = $a.attr('href').replace("#","");
                    self.requestData({
                        "category":category,
                        "page": data
                    });
                });
            },

            requestData: function(param) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-list-url');
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, param, function(result) {
                    var data = result.data;
                    var param = result.param;
                    self.$pagination.vcPagination('setPageInfo',param.pagination);
                    self.$listCount.text(vcui.number.addComma(data.totalCount));
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
                    //self.$sectionInner.show();
                    self.$pagination.show();
                    self.$noData.hide();
                } else {
                    //self.$sectionInner.hide();
                    self.$pagination.hide();
                    self.$noData.show();
                }
            },

            requestModal: function(url, eventTarget) {
                var self = this;
                if(url) {
                    lgkorUI.requestAjaxData(url, null, function(result){
                        self.openModalFromHtml(result, eventTarget);
                    }, null, "html");
                }
            },

            openModalFromHtml: function(html, eventTarget) {
                /*
                $('#event-modal').off('.modal-link-event').on('click.modal-link-event','button.modal-link',function(e){
                    var title = $(this).data('title');
                    var url = $(this).data('src');
                    if(url) {
                        var obj = {title:title +'<br>화면으로 이동합니다.', cancelBtnName:'아니오', okBtnName:'네', ok: function (){
                            var form = $('<form action="' + url + '" method="post"></form>');
                            $('body').append(form);
                            form.submit();
                        }};
                        //var desc = title +'<br>화면으로 이동합니다.';
                        lgkorUI.confirm(null, obj);
                    }
                }).on('click.modal-link-event','a.modal-link',function(e){
                    e.preventDefault();
                    var url = $(this).attr('href');
                    if(url) {
                        window.open(url, '_blank', 'width=800, height=800');
                    }
                });
                */
                $('#event-modal').html(html).vcModal({opener:eventTarget});
            },

            openDetailPopup: function(id) {
                var self = this;
                var ajaxUrl = self.$lnbContents.attr('data-detail-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"id":id}, function(result) {
                    var data = result.data;

                    //처리레벨
                    var progressLevel = parseInt(data.progressLevel);
                    var $findItem = self.$detailPopup.find('div.step-inner div.bar');
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
                    var $innerBox = self.$detailPopup.find('div.inner-box:eq(0)');
                    $findItem =$innerBox.find('div.dl-infolist-wrap ul');
                    $findItem.empty();
                    var arr = data.listData instanceof Array ? data.listData : [];
                    arr.forEach(function(item, index) {
                        item.desc = vcui.string.replaceAll(item.desc, '\n', '<br>');
                        $findItem.append(vcui.template(popupDetailItemTemplate, item));
                    });

                    //답변내용
                    var reply = data.reply;
                    $innerBox = self.$detailPopup.find('div.inner-box:eq(1)');
                    if(reply) {
                        $innerBox.show();
                        $findItem = $innerBox.find('div.dl-infolist-wrap ul');
                        $findItem.empty();
                        var arr = reply instanceof Array ? reply : [];
                        arr.forEach(function(item, index) {
                            item.desc = vcui.string.replaceAll(item.desc, '\n', '<br>');
                            $findItem.append(vcui.template(popupDetailItemTemplate, item));
                        });
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