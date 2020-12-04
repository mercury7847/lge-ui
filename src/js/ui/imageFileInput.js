vcui.define('ui/imageFileInput', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectFiles = [],
        totalSize = 0;

    var ImageFileInput = core.ui('ImageFileInput', {
        bindjQuery: 'imageFileInput',
        defaults: {
            regex: /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,
            format: 'jpg|jpeg|png|gif',
            totalSize: '10000000',
            templateAlert: '<article id="fileAlert" class="lay-wrap"><section class="lay-conts"><h6>{{message}}</h6></section><div class="btn-wrap laypop"><button type="button" class="btn pink ui_modal_close"><span>확인</span></button></div></article>',
            message: {
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

            self._bindEvents();
        },
        getSelectFiles: function getSelectFiles() {
            return selectFiles;
        },
        _checkFileName: function _checkFileName(file) {
            var name = file.name.split('.').slice(0,-1).join('.') || file.name + '';
            return !this.options.regex.test(name);
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

            if (!self._checkFileSize(file)) {
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
        _setPreview: function _setPreview($input, file) {
            var $fileBox = $input.closest('.upload-item'),
                reader = new FileReader();
            
            reader.readAsDataURL(file);
            reader.onload = function(e){
                $fileBox.addClass('on');
                $fileBox.find('.upload-preview').css('background-image', 'url(' + e.target.result + ')' );
                $fileBox.find('.file-name').val(file.name);
            }
        },
        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.find('input[type="file"]').change(function(e) {
                if (e.currentTarget.files.length > 0) {
                    var file = e.currentTarget.files[0],
                        result = self._checkFile(file); 

                    if (result.success) {
                        totalSize += file.size;
                        selectFiles.push(file);
                        
                        self._setPreview($(this), file);
                    } else {
                        self._callAlert(result.message);
                    }
                }
            });
            
            self.$el.find('.btn-del').on('click', function() {
                var $box = $(this).closest('.upload-item');

                $box.removeClass('on');
                $box.find('.upload-preview').css('background-image', '');
                $box.find('.input[type="file"]').val('');
                $box.find('.file-name').val('');
            });
        },
    });

    return ImageFileInput;
});
