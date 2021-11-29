vcui.define('ui/fileInput', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectFiles = [],
        totalSize = 0;

    // var message = {
    //     length: '첨부 파일은 최대 3개까지 가능합니다.',
    //     name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
    //     format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
    //     size: '첨부파일 전체 용량은 10MB 이내로 등록 가능합니다'
    // }

    var FileInput = core.ui('FileInput', {
        bindjQuery: 'fileInput',
        defaults: {
            regex: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
            format: 'jpg|jpeg|png|gif',
            totalSize: '10000000',
            maxLength: 3,
            templateFileListItem : '<li><span class="file-name">{{name}}</span><button type="button" class="btn-del"><span class="blind">삭제</span></button></li>',
            templateAlert: '<article id="fileAlert" class="lay-wrap"><section class="lay-conts"><h6>{{message}}</h6></section><div class="btn-wrap laypop"><button type="button" class="btn pink ui_modal_close"><span>확인</span></button></div></article>',
            message: {
                length: '첨부 파일은 최대 3개까지 가능합니다.',
                name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
                format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                size: '첨부파일 전체 용량은 10MB 이내로 등록 가능합니다'
            }
        },
        initialize: function initialize(el, options) {
            var self = this;

            if (self.supr(el, options) === false) {
                return;
            };

            selectFiles = [];
            self.$el.closest(".file-box").find(".file-lists").empty();
            self._bindEvents();
        },
        getSelectFiles: function getSelectFiles() {
            return selectFiles;
        },
        _checkFileLength: function _checkFileLength() {
            return selectFiles.length < this.options.maxLength;
        },
        _checkFileName: function _checkFileName(file) {
            var name = file.name.split('.').slice(0,-1).join('.') || file.name + '';
            //return this.options.regex.test(name);
            return name.match(this.options.regex) !== null;
        },
        _checkFileSize: function _checkFileSize(file) {
            return totalSize + file.size <= this.options.totalSize
        },
        _checkFileFormat: function _checkFileFormat(file) {
            var optArr = this.options.format.split('|'),
                formatArr = file.name.split('.'),
                format = formatArr[formatArr.length - 1].toLowerCase();
            
            if (!vcui.array.has(optArr, format)) {
                return false;
            }

            return true; 
        },
        _checkFile: function _checkFile(file) {
            var self = this,
                success = true,
                msgType;

            if (!self._checkFileLength()) {
                success = false;
                msgType = 'length';
            } else if (!self._checkFileSize(file)) {
                success = false;
                msgType = 'size';
            } else if (!self._checkFileFormat(file)) {
                success = false;
                msgType = 'format';
            } else if (!self._checkFileName(file)) {
                success = false;
                msgType = 'name';
            }

            return {
                success: success,
                message: msgType
            };
        },
        _callAlert: function _callError(msg) {
            var self = this,
                tmpl;

            tmpl = vcui.template(self.options.templateAlert, {
                message: self.options.message[msg]
            });

            $('body').append(tmpl);
            $('#fileAlert').vcModal({
                removeOnClose: true
            });
        },
        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on("change",function(e) {
                if(e.currentTarget.files.length > 0) {
                    var file = e.currentTarget.files[0],
                        result = self._checkFile(file); 

                    if (result.success) {
                        $(this).closest(".file-box").find(".file-lists").append(core.template(self.options.templateFileListItem, file));
                        
                        totalSize += file.size;
                        selectFiles.push(file);
                        
                        $(this).closest(".file-box").find(".file-lists li:nth-child(" + selectFiles.length +") .btn-del").on("click",function(e) {
                            var index = $(this).closest(".file-lists").find('.btn-del').index($(this));
                            selectFiles.splice(index,1);
                            $(this).closest(".file-lists").find("li:nth-child(" + (index+1) +")").remove();
                        });
                    } else {
                        self._callAlert(result.message);
                    }

                    $(this).val("");
                }
            })
        },
    });

    return FileInput;
});
