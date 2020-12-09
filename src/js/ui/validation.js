/*!
 * @module vcui.ui.Validation
 * @license MIT License
 * @description Validation
 * @copyright VinylC UID Group
 * 
 * validation.setValues({name:'박종민', years:2018}); 필드값을 입력
 * validation.getValues('name'); 이름이 같은 필드값만 반환
 * validation.getValues(); 모든 값을 반환
 * validation.getValues(true); 성공한 값만 반환
 * 
 */
vcui.define('ui/validation', ['jquery', 'vcui', 'ui/selectbox'], function ($, core) {
    "use strict";

    /**
     * @class
     * @description .
     * @name vcui.ui.Validation
     * @extends vcui.ui.View
     */

    var Validation = core.ui('Validation', /** @lends vcui.ui.Validation# */{
        bindjQuery: 'validation',
        defaults: {
            defaultErrorMsg : '입력하세요', 
            register : null,
            maxLength : 10000     
        },
        selectors: {
        },

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }
            self.validItemObj = {};
            self.nameArr = [];

            var register = self.options.register || {};
            var newObj = {};

            self.$el.find('[name]').each(function(index,item){

                var required = $(item).data('required'); 
                var msgTarget = $(item).data('msgTarget'); 
                var errorMsg = $(item).data('errorMsg') || self.options.defaultErrorMsg;
                var patternMsg = $(item).data('patternMsg') || '';
                
                if(required && /true/i.test(required)){
                    
                    var value = $(item).data('value');
                    var pattern = $(item).data('pattern');
                    var minLength = $(item).data('minLength');
                    var maxLength = $(item).data('maxLength');
                    var validate = $(item).data('validate');

                    if(validate && core.isFunction(window[validate])){
                        validate = window[validate];
                    }else{
                        validate = null;
                    }

                    newObj[item.name] = {
                        required : true,
                        errorMsg : errorMsg
                    }

                    if(value) newObj[item.name]['value'] = value;
                    if(pattern) newObj[item.name]['pattern'] = new RegExp(pattern);
                    if(minLength) newObj[item.name]['minLength'] = minLength;
                    if(maxLength) newObj[item.name]['maxLength'] = maxLength;
                    if(validate) newObj[item.name]['validate'] = validate;
                    if(msgTarget) newObj[item.name]['msgTarget'] = msgTarget;
                    if(patternMsg) newObj[item.name]['patternMsg'] = patternMsg;
                    newObj[item.name] = $.extend(newObj[item.name], register[item.name] || {}); 
                }else{

                    if(msgTarget) {
                        if(newObj[item.name]){                   
                            newObj[item.name]['msgTarget'] = msgTarget;
                        }else{
                            newObj[item.name] = {
                                msgTarget : msgTarget
                            };
                        }
                        newObj[item.name] = $.extend(newObj[item.name], register[item.name] || {});
                    }
                }

                self.nameArr.push(item.name);
            });
            self.register = newObj;

            self.nameArr = vcui.array.unique(self.nameArr);
            self._build();
            self._bindEvent();
            
        },

        _build: function _build() {
            var self = this;
            var nObj = {};
            var $target;
            var msg;

            for(var key in self.register){
                msg = "";

                var obj = self.register[key];
                if(obj.value) nObj[key] = obj.value;
                if(obj.msgTarget) msg = obj.msgTarget;
                $target = self.$el.find('[name='+ key +']');
                
                if(msg) {
                    var errblock = self._getMsgBlock($target, msg);
                    errblock.hide();
                };

                if($target.is('[type=number]') && $target.prop('maxlength') > 0){
                    $target.on('input', function(){
                        var maxleng = $(this).prop('maxlength');
                        var str = $(this).val();
                        if(str.length > maxleng){
                            $(this).val(str.slice(0, maxleng));
                        }
                    })
                }
            }

            self.setValues(nObj);
        },

        _getMsgBlock: function _getMsgBlock(item, msg){
            var block = item.siblings(msg);
            if(block.length) return block;

            block = item.parent().siblings(msg);
            if(block.length) return block;

            block = item.parent().parent().siblings(msg);
            if(block.length) return block;

            return $(msg);
        },

        _getMsgField: function _getMsgField(block){
            if(block.children().length){
                return block.children().eq(0);
            } else{
                return block;
            }
        },

        _defaultCheckFunc : function _defaultCheckFunc(val){
            return val && val.length > 0;
        },

        _regexCheckFunc : function _regexCheckFunc(pattern, val){
            return val && pattern.test(val);
        },

        _lenCheckFunc : function _regexCheckFunc(val, min, max){
            return val.length >= min && val.length <= max;
        },

        _checkValidate : function _checkValidate(key, obj, val, newObj, flag){
            var self = this;
            var rObj = newObj;
            var isFalse = flag? flag : false;

            if(obj.validate){
                if(obj.validate(val) == isFalse){
                    rObj[key] = isFalse? val : obj.errorMsg ;
                }else{
                    delete rObj[key];
                }            
            }else{       
                if(obj.pattern){
                    if(self._regexCheckFunc(obj.pattern, val) == isFalse){  
                        rObj[key] = isFalse? val : obj.errorMsg;
                    }else{
                        delete rObj[key];
                    }
                }else{
                    if(obj.minLength || obj.maxLength){
                        if(self._lenCheckFunc(val, obj.minLength? obj.minLength : 0 , obj.maxLength? obj.maxLength : self.options.maxLength) == isFalse){
                            rObj[key] = isFalse? val : obj.errorMsg;
                        }else{
                            delete rObj[key];
                        }
                    }else{

                        if(self._defaultCheckFunc(val) == isFalse){
                            rObj[key] = isFalse? val : obj.errorMsg;
                        }else{
                            delete rObj[key];
                        }
                    }
                }
            } 

            return rObj;
        },

        getAllValues : function getAllValues(){
            var self = this;  
            var result = {};
            var $findInput = self.$el.find('input');
            $findInput.each(function(i, obj) {
                var item = $(obj)
                var name = item.attr('name');
                if(name) {
                    if(item.is(':checkbox')) {
                        result[name] = item.is(":checked");
                    } else if (item.is(':file')) {
                        result[name] = item[0].files[0];
                    } else {
                        result[name] = item.val();
                    }
                }
            });

            self.$el.find('select').each(function(idx, item){
                var name = $(item).attr('name');
                if(name){
                    result[name] = $(item).find('option:selected').val();
                }
            });
            return result;
        },

        // getValues('name'), getValues(['name','email']); -> result : {name:'', email:''}
        getValues : function getValues(str){
            var self = this;  
            var result = {};

            if(vcui.isArray(str)){                
                for(var i=0; i<str.length; i++){
                    result[str[i]] = self.$el.find('[name='+ str[i] +']').val();
                }
                return result;
            }else{
                if(vcui.isString(str)){
                    return self.$el.find('[name='+ str +']').val();
                }else{
                    if(typeof str === "boolean" && str){

                        result = self._setCheckValidate(true);
                        
                    }else{
                        for(var key in self.register){
                            var obj = self.register[key];
                            if(obj.required){
                                var $target = self.$el.find('[name='+ key +']');
                                var val;

                                if($target.is(':checkbox') || $target.is(':radio')){    
                                    var nArr = [];
                                    $target.filter(':checked').each(function(idx, item){
                                        nArr.push($(item).val())
                                    });
                                    val = $target.is(':radio')? nArr[0] : nArr;

                                }else{
                                    val = $target.val();
                                }
                                result[key] = val;                                
                            }
                        }
                    }
                    
                    return result;
                }
            }
            return null;
        },

        // setValues({name:'asdf, email:'asdfa'})
        setValues : function setValues(obj){ 
            var self = this;  
            var $target;  
            for(var key in obj){
                $target = self.$el.find('[name='+ key +']');
                
                if($target.is(':radio') || $target.is(':checkbox')){
                    $target.filter('[value='+ obj[key] +']').prop('checked', true);
                }else{
                    if($target.is('select')){
                        $target.find('option[value=' + obj[key] + ']').prop("selected", true);
                        $($target).vcSelectbox('update');
                    } else{
                        $target.val(obj[key]);
                    }
                }
                
            }
            setTimeout(function(){
                self.triggerHandler('update');
            },0);
        },

        _setCheckValidate : function _setCheckValidate(flag){

            var self = this;
            var rObj = {};
            var $target, val, key, obj;

            for(var i=0;i<self.nameArr.length; i++){
                key = self.nameArr[i];
                obj = self.register[key];
                if(obj && obj.required){
                    $target = self.$el.find('[name='+ key +']');
                    if($target.is(':checkbox') || $target.is(':radio')){
                        var nArr = [];
                        $target.filter(':checked').each(function(idx, item){
                            nArr.push($(item).val())
                        });
                        val = $target.is(':radio')? nArr[0] : nArr;
                        if(val=='on') val = '';

                    }else{
                        val = $target.val();
                    }
                    rObj = self._checkValidate(key, obj, val, rObj, flag);
                }
            }

            return rObj;

        },

        validate : function validate(){
            var self = this;
            var rObj = self._setCheckValidate();

            var firstName = vcui.object.keys(rObj)[0];
            if(firstName){
                var $first = self.$el.find('[name='+ firstName +']');

                if($first.is(':radio') || $first.is(':checkbox')){
                    var $checked =self.$el.find('[name='+ firstName +']:checked');
                    if($checked.length>0){
                        $checked.focus();
                    }else{
                        $first.eq(0).focus();
                    }
                    
                }else{
                    $first.focus();
                }                
                self.triggerHandler('nextfocus', [$first]);
            }

            self.validItemObj = rObj;

            var isSuccess = false;
            if(vcui.isEmpty(rObj)){
                isSuccess = true;
                self.triggerHandler('success');
            }else{
                self.triggerHandler('validerror', [self.validItemObj]);
            }
            self._swicthErrorMsg(self.validItemObj);

            var arr = [];
            for(var key in rObj) arr.push({key: key, errmsg: rObj[key]});
            arr.sort(function(a, b){
                var ipta = self.$el.find('[name='+a.key+']').parent().offset().top;
                var iptb = self.$el.find('[name='+b.key+']').parent().offset().top;

                return ipta - iptb;
            });
            
            return {
                success: isSuccess,
                validItem: self.validItemObj,
                validArray: arr
            };
        },

        _swicthErrorMsg : function _swicthErrorMsg(obj){
            var self = this;
            var $target, msg, nobj;

            for(var key in self.register){
                nobj = self.register[key];
                if(nobj.required){
                    $target = self.$el.find('[name='+ key +']');
                    msg = nobj['msgTarget'];
                    if(msg) {
                        var errblock = self._getMsgBlock($target, msg);
                        errblock.hide();
                    }
                }
            }
            
            for(var prop in obj){
                $target = self.$el.find('[name='+ prop +']');
                nobj = self.register[prop];
                msg = nobj['msgTarget'];
                if(msg){ 
                    var errblock = self._getMsgBlock($target, msg);
                    errblock.show();

                    var errfield = self._getMsgField(errblock);
                    errfield.text(nobj.errorMsg);
                }
            }
        },

        _validateEvent : function _validateEvent(key){

            var self = this;
            var obj = self.register[key];
            var $target = self.$el.find('[name='+ key +']');
            var event  = '';

            if($target.is('select') || $target.is(':radio') || $target.is(':checkbox') || $target.is(':file')){
                event = 'change';
            }else{
                event = 'blur';
            }

            $target.on(event, function(e){  

                var val; 

                if($target.is(':radio') || $target.is(':checkbox')){
                    var nArr = [];
                    $target.filter(':checked').each(function(idx, item){
                        nArr.push($(item).val())
                    });
                    val = $target.is(':radio')? nArr[0] : nArr;
                    if(val=='on') val = '';

                }else{
                    val = e.currentTarget.value;
                }
                
                self.validItemObj = self._checkValidate(key, obj, val, self.validItemObj);                
                self._swicthErrorMsg(self.validItemObj);
                if(!vcui.isEmpty(self.validItemObj)){                    
                    self.triggerHandler('errors', [self.validItemObj]);
                } 
            });
        },


        _bindEvent  : function _bindEvent() {
            var self = this;
            for(var key in self.register){
                var obj = self.register[key];
                if(obj.required){
                    self._validateEvent(key);
                }
            }
        },
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    var CsValidation = core.ui('CsValidation', Validation, /** @lends vcui.ui.CsValidation# */{
        bindjQuery: 'csValidation',
        _build: function _build() {
            var self = this;
            var nObj = {};
            var $target;
            var $msgTarget;
            var msg;

            for (var key in self.register) {
                var obj = self.register[key];
                if(obj.value) nObj[key] = obj.value;
                if(obj.msgTarget) msg = obj.msgTarget;
                $target = self.$el.find('[name='+ key +']');

                if (msg) {
                    $msgTarget = self._getMsgBlock($target, msg),
                    $msgTarget.hide();
                };
            }

            self.setValues(nObj);
        },
        _swicthErrorMsg : function _swicthErrorMsg(obj){
            var self = this;
            var $target, msg;
            
            for(var key in self.register){
                var nobj = self.register[key];
                if(nobj.required){
                    $target = self.$el.find('[name='+ key +']');
                    if (!$target.prop('disabled')) {
                        msg = nobj['msgTarget'];
                        if(msg) {
                            var msgBlock = self._getMsgBlock($target, msg),
                                msgField = self._getMsgField(msgBlock);
                            
                            if (vcui.hasOwn(obj, key)) {
                                msgField.text(obj[key]).attr('id', key + 'Error');;
                                msgBlock.show();
                                
                                $target.attr('aria-describedby', key + 'Error');
                            } else {
                                msgField.text('').removeAttr('id');
                                msgBlock.hide()
                                
                                $target.removeAttr('aria-describedby');
                            }
                        }
                    }
                }
            }
        },
        _setCheckValidate : function _setCheckValidate(flag){
            var self = this;
            var rObj = {};
            var $target, val, key, obj;

            for(var i=0;i<self.nameArr.length; i++){
                key = self.nameArr[i];
                obj = self.register[key];
                if(obj && obj.required){
                    $target = self.$el.find('[name='+ key +']');
                    if (!$target.prop('disabled')) {
                        if($target.is(':checkbox') || $target.is(':radio')){
                            var nArr = [];
                            $target.filter(':checked').each(function(idx, item){
                                nArr.push($(item).val())
                            });
                            val = $target.is(':radio')? nArr[0] : nArr;
                            if(val=='on') val = '';

                        }else{
                            val = $target.val();
                        }
                        rObj = self._checkValidate(key, obj, val, rObj, flag);
                    }
                }
            }

            return rObj;

        },
        _checkValidate : function _checkValidate(key, obj, val, newObj, flag) {
            var self = this;
            var rObj = newObj;
            var isFalse = flag? flag : false;

            if (self._defaultCheckFunc(val) != isFalse) {
                if(obj.validate){
                    if(obj.validate(val) == isFalse){
                        rObj[key] = isFalse? val : obj['patternMsg'];
                    }else{
                        delete rObj[key];
                    }            
                }else{       
                    if (obj.pattern) {
                        if (self._regexCheckFunc(obj.pattern, val) == isFalse) {  
                            rObj[key] = isFalse? val : obj['patternMsg'];
                        }else{
                            delete rObj[key];
                        }
                    }else{
                        if (obj.minLength || obj.maxLength) {
                            if(self._lenCheckFunc(val, obj.minLength? obj.minLength : 0 , obj.maxLength? obj.maxLength : self.options.maxLength) == isFalse) {
                                rObj[key] = isFalse? val : obj['patternMsg'];
                            }else{
                                delete rObj[key];
                            }
                        } else {
                            delete rObj[key];
                        }
                    }
                } 
            } else {
                rObj[key] = isFalse? val : obj.errorMsg;
            }

            return rObj;
        },
    });

    if ($('.contents.support').length) {
        return CsValidation;
    } else {
        return Validation;
    }
});