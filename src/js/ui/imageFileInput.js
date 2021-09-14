vcui.define('ui/imageFileInput', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectFiles = [],
        totalSize = 0;

    var ImageFileInput = core.ui('ImageFileInput', {
        bindjQuery: 'imageFileInput',
        defaults: {
            regex: /[?!,.&^~]/,
            format: 'jpg|jpeg|png|gif',
            totalSize: 10 * 1024 * 1024,
            individualFlag: false,
            individual: {
                size: 10 *  1024 * 1024
            },
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
        removeAll:function() {
            var self = this;

            self.$el.find('input[type="file"]').val('');
            self.$el.find('.file-item').removeClass('on');
            self.$el.find('.file-preview').html('');
            self.$el.find('.name').val('');

            totalSize = 0;
            selectFiles = [];
        },
        getSelectFiles: function getSelectFiles() {
            return selectFiles;
        },
        _checkFileName: function _checkFileName(file) {
            var name = file.name.split('.').slice(0,-1).join('.') || file.name + '';
            return this.options.regex.test(name);
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
        _checkIndividualFileSize: function _checkIndividual(file) {
            return file.size <= this.options.individual.size
        },
        _checkFile: function _checkFile(file) {
            var self = this,
                success = true,
                msgType;


            if (self.options.individualFlag) {
                if (!self._checkIndividualFileSize(file)) {
                    success = false;
                    msgType = 'size';

                    return {
                        success: success,
                        message: msgType
                    };
                }
            } 
            
            if (!self._checkFileSize(file)) {
                success = false;
                msgType = 'size';
            } else if (!self._checkFileFormat(file)) {
                success = false;
                msgType = 'format';
            } else if (self._checkFileName(file)) {
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
            var $fileBox = $input.closest('.file-item'),
                reader = new FileReader();
            
            reader.readAsDataURL(file);
            reader.onload = function(e){
                $fileBox.addClass('on');
                $fileBox.find('.file-preview').html('<img src="'+e.target.result+'" alt="첨부파일 썸네일">')
                $fileBox.find('.name').val(file.name);
            }
        },

        // S: 20210914 BTOCSITE-5616 스탠바이미 추가 수정 
        _bindEvents: function _bindEvents() {
            var self = this;

            var $inputFile = self.$el.find('input[type="file"]');
            var $btnDel =  self.$el.find('.btn-del');

            $inputFile.change(function(e) {
                var $this = $(e.currentTarget);
                var index = $inputFile.index(this);

                console.log("$this %o %o",$this,self.$el);
                console.log("index %o",$inputFile.index(this));
                
                if ($this[0].files.length > 0) {
                    var file = e.currentTarget.files[0],
                        result = self._checkFile(file); 

                    if (result.success) {
                        totalSize += file.size;
                        selectFiles[index] = file;

                        console.log("selectFiles %o",selectFiles);
                        
                        self._setPreview($(this), file);
                    } else {
                        $this[0].value = '';
                        self._callAlert(result.message);
                    }
                }
            });

            $btnDel.on('click', function() {
                var $this = $(this);
                var index = $btnDel.index(this);

                lgkorUI.confirm('', {
                    title:'삭제하시겠습니까?',
                    okBtnName: '예',
                    cancelBtnName: '아니오',
                    ok: function() {
                        var $box = $this.closest('.file-item');
    
                        $this[0].value = '';
                        $box.removeClass('on');
                        $box.find('.file-preview').html('');
                        $box.find('.name').val('');

                    //    var index = $btn.closest('.image-file-wrap').find('.btn-del').index($btn);
                        totalSize -= selectFiles[index].size;
                        selectFiles.splice(index,1);

                        
                        console.log("selectFiles %o",selectFiles);

                        $(this).vcModal('hide');
                    }
                });
            });   
            // E: 20210914 BTOCSITE-5616 스탠바이미 추가 수정 
        },
    });

    return ImageFileInput;
});
