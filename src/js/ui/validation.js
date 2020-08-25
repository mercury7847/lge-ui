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
define('ui/validation', ['jquery', 'vcui'], function ($, core) {
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
            register:null,
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
            self.register = self.options.register;
            self.nameArr = [];
            self.$el.find('[name]').each(function(index,item){
                self.nameArr.push(item.name);
            });
            self.nameArr = vcui.array.unique(self.nameArr);
            self._build();
            self._bindEvent();   
            
        },

        _build: function _build() {
            var self = this;
            var nObj = {};
            var $target;
            var msg;
            var defaultErrorMsg = self.options.defaultErrorMsg;

            for(var key in self.register){
                var obj = self.register[key];
                if(obj.value) nObj[key] = obj.value;

                // errorMsg를 찾아서 입력한다.
                $target = self.$el.find('[name='+ key +']');
                msg = $target.data('msgTarget');
                if(msg) {
                    if($target.siblings(msg).length > 0){
                        $target.siblings(msg).text(obj.errorMsg || defaultErrorMsg);
                    }else{
                        $target.parent().siblings(msg).text(obj.errorMsg || defaultErrorMsg);
                    }
                };
                
            }
            self.setValues(nObj);
        },

        _defaultCheckFunc : function _defaultCheckFunc(val){
            // console.log(val, !!(val && val.length > 0));
            return !!(val && val.length > 0);
        },

        _regexCheckFunc : function _regexCheckFunc(pattern, val){
            return pattern.test(val);
        },

        _lenCheckFunc : function _regexCheckFunc(val, min, max){
            return !!(val.length >= min && val.length <= max);
        },

        _checkValidate : function _checkValidate(key, obj, val, newObj, flag){
            var self = this;
            var rObj = newObj;
            var isFalse = flag ? flag : false;
            var defaultErrorMsg = self.options.defaultErrorMsg;

            if(obj.validate){
                if(obj.validate(val) == isFalse){
                    rObj[key] = isFalse? val : obj.errorMsg || defaultErrorMsg;
                }else{
                    delete rObj[key];
                }            
            }else{       
                if(obj.pattern){
                    if(self._regexCheckFunc(obj.pattern, val) == isFalse){  
                        rObj[key] = isFalse? val : obj.errorMsg || defaultErrorMsg;
                    }else{
                        delete rObj[key];
                    }
                }else{
                    if(obj.minLength || obj.maxLength){
                        if(self._lenCheckFunc(val, obj.minLength? obj.minLength : 0 , obj.maxLength? obj.maxLength : self.options.maxLength) == isFalse){
                            rObj[key] = isFalse? val : obj.errorMsg || defaultErrorMsg;
                        }else{
                            delete rObj[key];
                        }
                    }else{
                        if(self._defaultCheckFunc(val) == isFalse){
                            rObj[key] = isFalse? val : obj.errorMsg || defaultErrorMsg;
                        }else{
                            delete rObj[key];
                        }
                    }
                }
            } 
            return rObj;
        },
        /*

        */
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
                                result[key] = self.$el.find('[name='+ key +']').val();
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
                    $target.val(obj[key]);
                }
                
            }
            setTimeout(function(){
                self.triggerHandler('update');
            });
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

                    if($target.is(':radio') || $target.is(':checkbox')){
                        val = self.$el.find('[name='+ key +']:checked').val();
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

            if(vcui.isEmpty(rObj)){
                self.triggerHandler('success');
            }else{
                self._swicthErrorMsg(self.validItemObj);
                self.triggerHandler('errors', [self.validItemObj]);
            }
            
        },

        _swicthErrorMsg : function _swicthErrorMsg(obj){
            var self = this;
            var $target, msg;

            for(var key in self.register){
                var nobj = self.register[key];
                if(nobj.required){
                    $target = self.$el.find('[name='+ key +']');
                    msg = $target.data('msgTarget');
                    if(msg) {
                        if($target.siblings(msg).length>0){
                            $target.siblings(msg).hide();
                        }else{
                            $target.parent().siblings(msg).hide();
                        }
                    }
                }
            }
            for(var prop in obj){

                $target = self.$el.find('[name='+ prop +']');
                msg = $target.data('msgTarget');
                if(msg){ 
                    if($target.siblings(msg).length>0){
                        $target.siblings(msg).show();
                    }else{
                        $target.parent().siblings(msg).show();
                    }
                }
            }
        },

        _validateEvent : function _validateEvent(key){

            var self = this;
            var obj = self.register[key];
            var $target = self.$el.find('[name='+ key +']');
            var event  = '';

            if($target.is('select') || $target.is(':radio') || $target.is(':checkbox')){
                event = 'change';
            }else{
                event = 'blur';
            }

            $target.on(event, function(e){   
                var val; 
                if($target.is(':radio') || $target.is(':checkbox')){
                    val = self.$el.find('[name='+ key +']:checked').val();
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

    return Validation;
});