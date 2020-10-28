vcui.define('ui/fileInput', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectFiles = [],
        totalSize = 0;

    var message = {
        fileLength: '첨부 파일은 최대 {{length}}개까지 가능합니다.',
        fileName: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
        fileExtension: '{{extension}} 파일만 첨부 가능합니다.',
        fileSize: '첨부파일 전체 용량은 {{size}} 이내로 등록 가능합니다'
    }

    var FileInput = core.ui('FileInput', {
        bindjQuery: 'fileinput',
        defaults: {
            templateFileErrorAlert : '<article id="laypop" class="lay-wrap" style="display:block;"><section class="lay-conts"><h6>{{message}}</h6></section><div class="btn-wrap laypop"><button type="button" class="btn pink ui_modal_close"><span>확인</span></button></div></article>',
            templateFileListItem : '<li><span class="file-name">{{name}}</span><button type="button" class="btn-del"><span class="blind">삭제</span></button></li>'
        },

        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            };
            
            if (self.options.size) {
                if (self.options.size.indexOf('MB') != -1) {
                    self.options.size = parseInt(self.options.size.split('MB')[0]) * 1024 * 1024;
                }
            }

            selectFiles = [];
            self.$el.closest(".file-box").find(".file-lists").empty();
            self._bindEvents();
        },
        _setMessage: function() {

        },
        getSelectFiles: function getSelectFiles() {
            return selectFiles;
        },
        getTotalSize: function getTotalSize() {
            return totlaSize;
        },
        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on("change",function(e) {
                if(e.currentTarget.files.length > 0) {

                    var file = e.currentTarget.files[0],
                        extension = file.name.split('.')[file.name.split('.').length - 1].toLowerCase(),
                        size = file.size;
                    
                    if ($.inArray(extension, self.options.format.split('|')) == -1 || totalSize + size > self.options.size) {
                        $(this).val("");

                        

                        return false;
                    }

                    $(this).closest(".file-box").find(".file-lists").append(core.template(self.options.templateFileListItem, file));
                    
                    selectFiles.push(file);
                    totalSize += file.size;
                    
                    $(this).closest(".file-box").find(".file-lists li:nth-child(" + selectFiles.length +") .btn-del").on("click",function(e) {
                        var index = $(this).closest(".file-lists").find('.btn-del').index($(this));
                        selectFiles.splice(index,1);
                        $(this).closest(".file-lists").find("li:nth-child(" + (index+1) +")").remove();
                    });

                    $(this).val("");
                }
            })
        },
    });

    return FileInput;
});