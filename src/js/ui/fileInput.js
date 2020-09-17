vcui.define('ui/fileInput', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var selectFiles = [];

    var FileInput = core.ui('FileInput', {
        bindjQuery: 'fileinput',
        defaults: {
            templateFileListItem : '<li><span class="file-name">{{name}}</span><button type="button" class="btn-del"><span class="blind">삭제</span></button></li>'
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

        _bindEvents: function _bindEvents() {
            var self = this;

            self.$el.on("change",function(e) {
                if(e.currentTarget.files.length > 0) {

                    var file = e.currentTarget.files[0];
                    
                    $(this).closest(".file-box").find(".file-lists").append(core.template(self.options.templateFileListItem, file));
                    
                    selectFiles.push(file);
                    
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