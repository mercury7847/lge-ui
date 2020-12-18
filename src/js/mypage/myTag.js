(function() {
    $(window).ready(function() {

        var myTag = {         
            init: function() {
                var self = this;
                self.setting();
                self.bindEvents();
            },

            setting: function() {
                var self = this;
                self.checkdTagList = [];
                self.$contents = $('div.lnb-contents');
                self.$tagLists = self.$contents.find('ul.tag-lists');
                var $btnGroup = self.$contents.find('div.btn-group');
                self.$resetButton = $btnGroup.find('button:eq(0)');
                self.$submitButton = $btnGroup.find('button:eq(1)'); 
            },

            bindEvents: function() {
                var self = this;

                self.$tagLists.on('click','li.tags input[type=checkbox]', function(e) {
                    self.changedSelectTagCheck();
                });

                self.$resetButton.on('click', function(e) {
                    self.resetSelectTag();
                });

                self.$submitButton.on('click', function(e) {
                    self.requestData();
                });
            },

            //선택된 태그 저장하기
            requestData: function() {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-submit-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, {"tag":self.checkdTagList}, function(result) {
                    var data = result.data;
                    var success = data.success.toLowerCase();
                    if (success == 'y' || data.success == 'yes') {
                        self.resetNewDefaultChecked();
                    } else {
                        self.resetSelectTag();
                    }
                });
            },

            //태그버튼 체크
            changedSelectTagCheck: function() {
                var self = this;
                var $tags = self.$tagLists.find('li.tags input[type=checkbox]');
                var count = 0;
                var changed = 0;
                self.checkdTagList = [];
                $tags.each(function(i, o) {
                    var $o = $(o);
                    var defaultChecked = ($o.attr('data-default') == 'checked') ? true : false;
                    var checked = $o.is(':checked');

                    if(checked) {
                        ++count;
                        self.checkdTagList.push($o.attr('id'));
                    }

                    if(defaultChecked != checked) {
                        ++changed; 
                    }
                });
                self.buttonDisableBySelectedTag(count,(changed > 0));
            },

            //최초 세팅된 디폴트 값으로 체크를 수정한다
            resetSelectTag: function() {
                var self = this;
                var $tags = self.$tagLists.find('li.tags input[type=checkbox]');
                var count = 0;
                self.checkdTagList = [];
                $tags.each(function(i, o) {
                    var $o = $(o);
                    var defaultChecked = ($o.attr('data-default') == 'checked') ? true : false;
                    if(defaultChecked) {
                        ++count;
                        $o.prop('checked',true);
                    } else {
                        $o.prop('checked',false);
                    }
                });
                self.buttonDisableBySelectedTag(count,false);
            },

            //현재 화면에 세팅 된 값으로 디폴트 값을 수정한다
            resetNewDefaultChecked: function() {
                var self = this;
                var $tags = self.$tagLists.find('li.tags input[type=checkbox]');
                var count = 0;
                self.checkdTagList = [];
                $tags.each(function(i, o) {
                    var $o = $(o);
                    var checked = $o.is(':checked');
                    if(checked) {
                        ++count;
                        $o.attr('data-default','checked');
                    } else {
                        $o.removeAttr('data-default');
                    }
                });
                self.buttonDisableBySelectedTag(count,false);
            },

            //초기화, 저장 버튼 상태 변경
            buttonDisableBySelectedTag: function(selectCount, isChangeSelectedTag) {
                var self = this;
                if(isChangeSelectedTag) {
                    self.$resetButton.removeAttr('disabled');
                    self.$submitButton.removeAttr('disabled');
                } else {
                    self.$resetButton.attr('disabled',true);
                    self.$submitButton.attr('disabled',true);
                }
                self.$submitButton.find('em.count').text('('+selectCount+')');
            }
        }
        
        myTag.init();
    });
})();