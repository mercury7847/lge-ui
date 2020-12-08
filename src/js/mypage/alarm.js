(function() {
    var alarmTemplate = '<li class="list {{#if read}}read{{/if}}" data-alarm-id="{{id}}"><div class="notice-box">' +
        '<span class="icons">알림 확인 상태 : {{#if read}}<em class="on">안읽음</em>{{#else}}<em class="off">읽음</em>{{/if}}' +
            '<span class="date"><span class="blind">알림 도착 날짜 및 시간</span>{{date}}</span>' +
        '</span>' +
        '<div class="box">' +
            '<span class="blind">알림 내용</span>' +
            '<p class="tit">{{title}}</p>' +
            '<p class="desc">{{#if productName}}<em>[{{productName}}]</em> {{/if}}{{desc}}</p>' +
            '<div class="bottom-btn"><a href="{{url}}" class="btn border size">{{buttonName}}</a></div>' +
            '<button type="button" class="btn-del"><span>알림 삭제</span></button>' +
        '</div>' +
    '</div></li>';

    $(window).ready(function() {
        var myAlarm = {
            init: function() {
                var self = this;
                self.$contWrap = $('div.cont-wrap');
                self.$tabContents = self.$contWrap.find('div.tab-contents');
                self.$setting = self.$tabContents.find('ul.setting-btns');
                self.$removeRead = self.$setting.find('#alarm-remove-read');
                self.$removeAll = self.$setting.find('#alarm-remove-all');
                self.$noticeList = self.$tabContents.find('ul.notice-lists');
                self.$moreButton = self.$tabContents.find('button.btn-moreview');
                self.$noData = self.$tabContents.find('p.nodata');

                self.checkNoData();
                self.bindEvents();
            },

            bindEvents: function() {
                var self = this;

                self.$moreButton.on('click', function(e){
                    var _id = self.$noticeList.find('li:last-child').attr('data-alarm-id');
                    self.requestMoreData(_id);
                });

                //알림 개별 삭제 버튼
                self.$noticeList.on('click', 'button.btn-del', function(e){
                    var _id = $(this).parents('li').attr('data-alarm-id');
                    self.requestDeleteData([_id]);
                });

                //읽은 알람 삭제
                self.$removeRead.on('click', function(e){
                    self.$setting.attr('data-query','li.read');
                });

                //전체 알람 삭제
                self.$removeAll.on('click', function(e){
                    self.$setting.attr('data-query','li');
                });

                //모달팝업 버튼
                $('#laypop .btn-wrap button:not(.ui_modal_close)').on('click',function(e){
                    $(e.currentTarget).closest('#laypop').vcModal('hide');
                    var removeItems = [];
                    var query = self.$setting.attr('data-query');

                    if(query) {
                        var $li = self.$noticeList.find(query);
                        $li.each(function(idx, item){
                            var alarm_id = $(item).attr("data-alarm-id");
                            if(alarm_id) {
                                removeItems.push(alarm_id);
                            }
                        });
                        if(removeItems.length > 0) {
                            self.requestDeleteData(removeItems);
                        }
                    }

                    self.$setting.attr('data-query','');
                });
            },

            checkNoData: function() {
                var self = this;
                if(self.$noticeList.find('li').length > 0) {
                    self.$setting.show();
                    self.$noticeList.show();
                    self.$moreButton.show();
                    self.$noData.hide();
                } else {
                    self.$setting.hide();
                    self.$noticeList.hide();
                    self.$moreButton.hide();
                    self.$noData.show();
                }
            },

            //지울려고 하는 알람id는 array로 전달
            requestDeleteData: function(array) {
                var self = this;
                var deleteItems = array;
                var ajaxUrl = self.$tabContents.attr('data-delete-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {'id':deleteItems}, function(result){
                    deleteItems.forEach(function(item){
                        self.$noticeList.find('li[data-alarm-id="' + item + '"]').remove();
                    });
                    self.checkNoData();
                });
            },

            requestMoreData: function(_id) {
                var self = this;
                var ajaxUrl = self.$tabContents.attr('data-more-url');
                lgkorUI.requestAjaxData(ajaxUrl, {'id':_id}, function(result){
                    var data = result.data;
                    var arr = data instanceof Array ? data : [];
                    if(arr.length > 0) {
                        arr.forEach(function(item, index) {
                            item.date = vcui.date.format(item.date,'yyyy.MM.dd');
                            self.$noticeList.append(vcui.template(alarmTemplate, item));
                        });
                    }
                    self.checkNoData();
                });
            }
        };

        myAlarm.init();
    });
})();