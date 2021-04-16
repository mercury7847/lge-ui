/*!
 * @module vcui.ui.Validation
 * @license MIT License
 * @description Validation
 * @copyright VinylC UID Group
 * 
 * 
 * 
var validation = new vcui.ui.Validation('#wrap',{register:register});

validation.on('update', function(e){ 
    $('.ui_selectbox').vcSelectbox('update');

}).on('errors', function(e,data){
    console.log('errors', data); // 이걸 어떤식으로 쓸까?

}).on('success', function(data){
    console.log(validation.getValues());

}).on('nextfocus', function(e,target){
    // 커스텀 selectbox 포커스 이동
    if($(target).hasClass('ui_selectbox')) {
        $(target).vcSelectbox('focus');
    }
});

$('#submit').on('click', function(){
    validation.validate(); // 체크					
});

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
                if(register[item.name]){
                    required = register[item.name]['required'] || required;
                }
                
                var msgTarget = $(item).data('msgTarget');
                var errorMsg = $(item).data('errorMsg') || self.options.defaultErrorMsg;
                var patternMsg = $(item).data('patternMsg') || '';
                
                if(required && /true/i.test(required)){
                    
                    var value = $(item).data('value') || $(item).attr('value');
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

                    if($(item).is(':radio')){
                        var radioValue = self.$el.find('input[type=radio][name="'+ item.name+'"]:checked').eq(0).val();
                        if(radioValue) newObj[item.name]['value'] = radioValue;

                    }else{

                        if(value!=undefined){ 
                            newObj[item.name]['value'] = value;
                        }
                    }

                    if(pattern) newObj[item.name]['pattern'] = new RegExp(pattern);
                    if(minLength) newObj[item.name]['minLength'] = minLength;
                    if(maxLength) newObj[item.name]['maxLength'] = maxLength;
                    if(validate) newObj[item.name]['validate'] = validate;
                    if(msgTarget) newObj[item.name]['msgTarget'] = msgTarget;
                    if(patternMsg) newObj[item.name]['patternMsg'] = patternMsg;
                    newObj[item.name] = $.extend(newObj[item.name], register[item.name] || {}); 
                }else{           
                    
                    var rName = item.name;
                    if(rName){
                        var valObj = register[rName];
                        var rValue = '';
                        if(valObj){
                            if(core.isObject(valObj)){
                                rValue = valObj['value'];
                            }else if(core.isString(valObj)){
                                rValue = valObj;
                            }

                            $(item).val(rValue);
                        }
                    }

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
                    // if(self._defaultCheckFunc(val)){
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
                    // } else{
                    //     rObj[key] = isFalse? val : obj.errorMsg;
                    // }
                }
            } 

            return rObj;
        },

        getAllValues : function getAllValues(){
            var self = this;  
            var result = {};
            var $findInput = self.$el.find('input, textarea');
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

                                    if($target.is(':radio')){
                                        val = nArr[0];                                        
                                    }else{
                                        if(nArr.length==1) val = nArr[0];
                                        else val = nArr;
                                    }            
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

        _setCheckboxValue : function(key, value){

            var self = this;
            var $target = self.$el.find('[name='+ key +']');

            if(typeof value === "boolean"){
                if($target.length>0) $target.prop('checked', value);

                return;
            };

            var values = (value && value.split(',')) || [];
            if($target.length>0){
                $target.prop('checked', false);

                $.each(values, function(index, value){
                    var $item = $target.filter('[value='+ value +']');
                    if($item){ 
                        $item.prop('checked', true);
                    }
                });     

            }
                      

        },

        // setValues({name:'asdf, email:'asdfa'})
        setValues : function setValues(obj){ 
            var self = this;  
            var $target;  

            for(var key in obj){
                $target = self.$el.find('[name='+ key +']');
                
                if($target.is(':radio')){
                    //CS 제외
                    if( !$('.contents.support').length ) {
                        self._setCheckboxValue(key, obj[key]);
                    }

                } else if($target.is(':checkbox')){                    

                    //CS 제외
                    if( !$('.contents.support').length ) {
                        self._setCheckboxValue(key, obj[key]);
                    }

                }else{
                    if($target.is('select')){

                        var value = obj[key];

                        if(value==undefined || value==''){
                            value = 0;
                        }

                        if($target.find('option[value=' + value + ']')[0]){
                            $target.find('option[value=' + value + ']').prop("selected", true);
                        }else{
                            $target.find('option').eq(0).prop("selected", true);
                        }
                        
                        if($target.hasClass('ui_selectbox')) {
                            $target.vcSelectbox('update');
                        }
                        
                    } else{
                        if(vcui.isObject(obj[key])){
                            $target.val(obj[key]['value']? obj[key]['value'] : '');
                        }else{
                            $target.val(obj[key]);
                        }
                        
                    }
                }
                
            }
            setTimeout(function(){
                self.triggerHandler('update');
            },0);
        },

        /*
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
                        if(val==='on') val = '';

                    }else{
                        val = $target.val();
                    }
                    rObj = self._checkValidate(key, obj, val, rObj, flag);
                }
            }

            return rObj;

        },
        */

        _setCheckValidate : function _setCheckValidate(flag, targetArr){
            var self = this;
            var rObj = {};
            var $target, val, key, obj;
            var nameArr = targetArr ? targetArr : self.nameArr;
            
            for(var i=0;i<nameArr.length; i++){
                key = nameArr[i];
                obj = self.register[key];

                if(obj && obj.required){
                    $target = self.$el.find('[name='+ key +']');
                    if($target.is(':checkbox') || $target.is(':radio')){
                        var nArr = [];
                        $target.filter(':checked').each(function(idx, item){   
                            nArr.push($(item).val())
                        });
                        
                        val = $target.is(':radio')? nArr[0] : nArr;
                        if(val==='on') val = '';

                    }else{
                        val = $target.val();
                    }
                    rObj = self._checkValidate(key, obj, val, rObj, flag);
                }
            }

            return rObj;
        },

        validate : function validate(targetArr){
            var self = this;
            var rObj = (targetArr && targetArr.length > 0) ? self._setCheckValidate(false, targetArr) : self._setCheckValidate();;

            if(targetArr && targetArr.length > 0) {
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
                        if ($first.is(':hidden')) {
                            $first.parent().attr('tabindex', 0).focus().removeAttr('tabindex');
                        } else {
                            $first.focus();
                        }
                    }    
                    if($first.hasClass('ui_selectbox')) {
                        $first.vcSelectbox('focus');
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
                self._swicthErrorMsg(self.validItemObj, targetArr);

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
            } else {
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
                    
                    if($first.hasClass('ui_selectbox')) {
                        $first.vcSelectbox('focus');
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
            }
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
 
            // $target.on(event, function(e){  
            self.$el.on(event, '[name='+ key +']', function(e) {
                var $this = $(this);
                var val; 

                if($this.is(':radio') || $this.is(':checkbox')){
                    var nArr = [];
                    $this.filter(':checked').each(function(idx, item){
                        nArr.push($(item).val());
                    });
                    val = $this.is(':radio')? nArr[0] : nArr;
                    if(val==='on' || val == undefined) val = '';
                }else{
                    val = e.currentTarget.value.trim();
                }
                
                self.validItemObj = self._checkValidate(key, obj, val, self.validItemObj);                
                self._swicthErrorMsg(self.validItemObj, [key]);
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

        setRequireItem : function(name,require) {
            var self = this;
            if(require) {
                self.nameArr.push(name);
                self.nameArr = vcui.array.unique(self.nameArr);
            } else {
                self.nameArr = vcui.array.remove(self.nameArr, name);
            }
        }
    });
    ///////////////////////////////////////////////////////////////////////////////////////

    var CsValidation = core.ui('CsValidation', Validation, /** @lends vcui.ui.CsValidation# */{
        bindjQuery: 'csValidation',
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
                }else{
                    if(msgTarget) {
                        if(newObj[item.name]){                   
                            newObj[item.name]['msgTarget'] = msgTarget;
                        }else{
                            newObj[item.name] = {
                                msgTarget : msgTarget
                            };
                        }
                    }
                }
                // self.nameArr.push(item.name);
            });

            for (var key in register) {
                newObj[key] = $.extend(newObj[key] || {}, register[key]);
                self.nameArr.push(key);
            }

            self.register = newObj;

            self.nameArr = vcui.array.unique(self.nameArr);
            self._build();
            self._bindEvent();
            
        },
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
        _swicthErrorMsg : function _swicthErrorMsg(obj, targetArr){
            var self = this;
            var $target, msg, nobj;

            for(var key in self.register){
                if (targetArr && !vcui.array.include(targetArr, key)) continue;

                nobj = self.register[key];
                if(nobj.required){
                    $target = self.$el.find('[name='+ key +']');
                    msg = nobj['msgTarget'];
                    if(msg) {
                        var errblock = self._getMsgBlock($target, msg);
                        var errfield = self._getMsgField(errblock);
                        errblock.hide();
                        errfield.removeAttr('id');
                        $target.removeAttr('aria-describedby');
                    }
                }
            }
            console.log(obj)
            for(var prop in obj){
                if (targetArr && !vcui.array.include(targetArr, prop)) continue;

                $target = self.$el.find('[name='+ prop +']');
                nobj = self.register[prop];
                msg = nobj['msgTarget'];

                if (!$target.prop('disabled')) {
                    if(msg){ 
                        var errblock = self._getMsgBlock($target, msg);
                        errblock.show();

                        var errfield = self._getMsgField(errblock);
                        errfield.text(obj[prop]);
                        errfield.attr('id', prop + 'Error');
                        $target.attr('aria-describedby', prop + 'Error');
                    }
                }
            }
        },
        _setCheckValidate : function _setCheckValidate(flag, targetArr){
            var self = this;
            var rObj = {};
            var $target, val, key, obj;
            var nameArr = targetArr ? targetArr : self.nameArr;

            for(var i=0;i<nameArr.length; i++){
                key = nameArr[i];
                obj = self.register[key];
                if(obj && obj.required){
                    $target = self.$el.find('[name='+ key +']');
                    
                    if ($target.siblings('.ui-selectbox-wrap, .ui-rating-wrap').is(':visible')) {
                        val = $target.val();
                        rObj = self._checkValidate(key, obj, val, rObj, flag);
                    } else {
                        if (($target.is('[type=hidden]') || $target.is(':visible')) && !$target.prop('disabled')) {
                            if($target.is(':checkbox') || $target.is(':radio')){
                                var nArr = [];
                                $target.filter(':checked').each(function(idx, item){                                    
                                    nArr.push($(item).val())
                                });
                                val = $target.is(':radio')? nArr[0] : nArr;
                                if(val==='on' || val == undefined) val = '';
                            }else{
                                val = $target.val().trim();
                            }
                            rObj = self._checkValidate(key, obj, val, rObj, flag);
                        }
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
                        rObj[key] = isFalse? val : (obj['patternMsg'] || self.$el.find('[name='+key+']').data('patternMsg'));
                    }else{
                        delete rObj[key];
                    }            
                }else{       
                    if (obj.pattern) {
                        if (self._regexCheckFunc(obj.pattern, val) == isFalse) {  
                            rObj[key] = isFalse? val : (obj['patternMsg'] || self.$el.find('[name='+key+']').data('patternMsg'));
                        }else{
                            delete rObj[key];
                        }
                    }else{
                        if (obj.minLength || obj.maxLength) {
                            if(self._lenCheckFunc(val, obj.minLength? obj.minLength : 0 , obj.maxLength? obj.maxLength : self.options.maxLength) == isFalse) {
                                rObj[key] = isFalse? val : (obj['patternMsg'] || self.$el.find('[name='+key+']').data('patternMsg'));
                            }else{
                                delete rObj[key];
                            }
                        } else {
                            delete rObj[key];
                        }
                    }
                } 
            } else {
                rObj[key] = isFalse? val : (obj['errorMsg'] || self.$el.find('[name='+key+']').data('errorMsg'));
            }
            return rObj;
        },
        getAllValues : function getAllValues(){
            var self = this;  
            var result = {};
            var $findInput = self.$el.find('input, textarea');
            $findInput.each(function(i, obj) {
                var item = $(obj)
                var name = item.attr('name');
                if (name) {
                    if(item.is(':checkbox')) {
                        result[name] = item.is(":checked");
                    } else if (item.is(':file')) {
                        result[name] = item[0].files[0];
                    } else if (item.is(':radio')) {
                        if (item.is(':checked')) {
                            result[name] = item.val();
                        } else {
                            if (!result[name]) {
                                result[name] = '';
                            }
                        }
                    } else {
                        result[name] = item.val().trim();
                    }
                }
            });

            self.$el.find('select').each(function(idx, item){
                var name = $(item).attr('name');
                if(name){
                    result[name] = $(item).find('option:selected').not('[hidden]').val();
                }
            });
            return result;
        },
        reset: function reset(targetArr) {
            var self = this;
            var $target, msg, nobj;

            for(var key in self.register){
                if (targetArr && !vcui.array.include(targetArr, key)) continue;
                
                nobj = self.register[key];
                if (nobj.required){
                    $target = self.$el.find('[name='+ key +']');
                    msg = nobj['msgTarget'];
                    if(msg) {
                        var errblock = self._getMsgBlock($target, msg);
                        errblock.hide();
                        $target.removeAttr('aria-describedby');
                    }
                }
            }
        },
        validate : function validate(targetArr){
            var self = this;
            var rObj = self._setCheckValidate(false, targetArr);

            var firstName = vcui.object.keys(rObj)[0];

            self.validItemObj = rObj;
            self._swicthErrorMsg(self.validItemObj, targetArr);

            if(firstName){
                var $first = self.$el.find('[name='+ firstName +']');
                var $anchorTarget = "";

                if($first.is(':radio') || $first.is(':checkbox')){
                    var $checked =self.$el.find('[name='+ firstName +']:checked');
                    if($checked.length>0){
                        $checked.blur().focus();
                        $anchorTarget = $checked;
                    }else{
                        $first.eq(0).blur().focus();
                        $anchorTarget = $first.eq(0);
                    }
                    
                }else{
                    if ($first.is(':hidden')) {
                        $first.parent().attr('tabindex', 0).blur().focus().removeAttr('tabindex');                        
                        $anchorTarget = $first.parent();
                    } else {
                        $first.blur().focus();
                        $anchorTarget = $first;
                    }
                }    
                if($first.hasClass('ui_selectbox')) {
                    $first.vcSelectbox('focus');
                }            
                self.triggerHandler('nextfocus', [$first]);

                if( $anchorTarget.length && window.innerWidth < 768 ) {
                    var $prodSelectWrap = $('.prod-selected-wrap');

                    if( $prodSelectWrap.length && $prodSelectWrap.hasClass('fixed')) {
                        $('html, body').scrollTop($anchorTarget.offset().top - $prodSelectWrap.outerHeight() - 20);
                    } else {
                        $('html, body').scrollTop($anchorTarget.offset().top);
                    }

                }
            }

            var isSuccess = false;
            if(vcui.isEmpty(rObj)){
                isSuccess = true;
                self.triggerHandler('success');
            }else{
                self.triggerHandler('validerror', [self.validItemObj]);
            }

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
        }
    });

    
    if ($('.contents.support').length) {
        return CsValidation;
    } else {

        return Validation;
    }
});