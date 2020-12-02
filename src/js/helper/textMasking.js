
vcui.define('helper/textMasking', ['jquery', 'vcui'], function($, core) {
    "use strict";

    /**
     * @class
     * @name vcui.helper.TextMasking
     */
    var TextMasking = core.helper.TextMasking = /** @lends  vcui.helper.TextMasking */ vcui.BaseClass.extend({
        $singleton: true,
        initialize: function(options) {
            var self = this;

            self.options = core.extend({
                matches: {}
            }, options);
        },

        _checkNull: function(str){
            if(typeof str == "undefined" || str == null || str == ""){
                return true;
            } else{
                return false;
            }
        },

        email: function(str){
            var self = this;
            var originStr = str;
            var emailStr = originStr.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
            var strLength;

            if(self._checkNull(originStr) || self._checkNull(emailStr)){
                return originStr;
            } else{
                strLength = emailStr.toString().split('@')[0].length - 3;

                return originStr.toString().replace(new RegExp('.(?=.{0,' + strLength + '}@)', 'g'), '*').replace(/.{6}$/, "******");
            }
        },
        /* ※ 휴대폰 번호 마스킹 
        ex1) 원본 데이터 : 01012345678, 변경 데이터 : 010****5678 
        ex2) 원본 데이터 : 010-1234-5678, 변경 데이터 : 010-****-5678 
        ex3) 원본 데이터 : 0111234567, 변경 데이터 : 011***4567 
        ex4) 원본 데이터 : 011-123-4567, 변경 데이터 : 011-***-4567 
        */
        phone: function(str){
            var self = this;

            var originStr = str;
            var phoneStr;
            var maskingStr;

            if(self._checkNull(originStr)){
                return originStr;
            }

            if (originStr.toString().split('-').length != 3) {
                phoneStr = originStr.length < 11 ? originStr.match(/\d{10}/gi) : originStr.match(/\d{11}/gi); 
                if(self._checkNull(phoneStr) == true) return originStr;

                if(originStr.length < 11) { 
                    // 1.1) 0110000000 
                    maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{3})(\d{3})(\d{4})/gi,'$1***$3')); 
                } else { 
                    // 1.2) 01000000000 
                    maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/(\d{3})(\d{4})(\d{4})/gi,'$1****$3')); 
                } 
            } else { 
                // 2) -가 있는 경우 
                phoneStr = originStr.match(/\d{2,3}-\d{3,4}-\d{4}/gi); 
                if(self._checkNull(phoneStr) == true) return originStr;
                
                if(/-[0-9]{3}-/.test(phoneStr)) { 
                    // 2.1) 00-000-0000 
                    maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/-[0-9]{3}-/g, "-***-")); 
                } else if(/-[0-9]{4}-/.test(phoneStr)) { 
                    // 2.2) 00-0000-0000 
                    maskingStr = originStr.toString().replace(phoneStr, phoneStr.toString().replace(/-[0-9]{4}-/g, "-****-")); 
                } 
            }

            return maskingStr;
        },

        /* ※ 카드 번호 마스킹 
        ex1) 원본 데이터 : 1234567891231234, 변경 데이터 : 1234-****-****-1234
        */
        card: function(str){
            var self = this;

            var originStr = str;
            var maskingStr;

            if(self._checkNull(originStr)){
                return originStr;
            }

            console.log("originStr :", originStr)

            maskingStr = originStr.toString().replace(originStr, originStr.toString().replace(/(\d{4})(\d{4})(\d{4})(\d{4})/gi,'$1-****-****-$4')); 

            return maskingStr;
        },
        
        /* ※ 주민등록 번호 마스킹 (Resident Registration Number, RRN Masking) 
        ex1) 원본 데이터 : 990101-1234567, 변경 데이터 : 990101-1****** 
        ex2) 원본 데이터 : 9901011234567, 변경 데이터 : 9901011****** 
        */ 
       rrn : function(str){ 
           var originStr = str; 
           var rrnStr; 
           var maskingStr; 
           var strLength; 
           
           if(self._checkNull(originStr) == true) return originStr;
           
           rrnStr = originStr.match(/(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4]{1}[0-9]{6}\b/gi); 
           if(self._checkNull(rrnStr) == false){ 
               strLength = rrnStr.toString().split('-').length; 
               maskingStr = originStr.toString().replace(rrnStr,rrnStr.toString().replace(/(-?)([1-4]{1})([0-9]{6})\b/gi,"$1$2******")); 
            } else { 
                rrnStr = originStr.match(/\d{13}/gi); 
                if(self._checkNull(rrnStr) == false){ 
                    strLength = rrnStr.toString().split('-').length; 
                    maskingStr = originStr.toString().replace(rrnStr,rrnStr.toString().replace(/([0-9]{6})$/gi,"******")); 
                } else{ 
                    return originStr; 
                } 
            } 
            
            return maskingStr; 
        },

        /* ※ 이름 마스킹 
        ex1) 원본 데이터 : 갓댐희, 변경 데이터 : 갓댐* 
        ex2) 원본 데이터 : 하늘에수, 변경 데이터 : 하늘** 
        ex3) 원본 데이터 : 갓댐, 변경 데이터 : 갓* 
        */ 
       name : function(str){ 
            var self = this;
            var originStr = str; 
            var maskingStr; 
            var strLength;
            var lastStr;

            if(self._checkNull(originStr) == true) return originStr;

            strLength = originStr.length;
            maskingStr = originStr.replace(/(?<=.{1})./gi, "*");

            if(strLength > 2){
                lastStr = originStr.substr(strLength-1, 1);
                maskingStr = maskingStr.substr(0, strLength-1) + lastStr;
            }

            return maskingStr;
        },

        substr: function(str, leng){
            var self = this;
            var originStr = str; 
            var maskingStr; 
            var strLength; 

            if(self._checkNull(originStr) == true) return originStr;

            strLength = originStr.length; 
            if(strLength < leng) return;

            maskingStr = originStr.replace(new RegExp('(?<=.{' + leng + '}).', 'gi'), "*"); 


            return maskingStr;
        }
    });

    return TextMasking;
});