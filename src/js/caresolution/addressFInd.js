var AddressFind = (function() {
    function AddressFind(completeCallback) {
        var self = this;
        self.completeCallback = completeCallback;

        self.isPostCode = false;
        self._loadDaumPostApiJs(function() {
            self.isPostCode = true;
        });
    }

    //public
    AddressFind.prototype = {
        open: function(completeCallback) {
            var self = this;
            if(completeCallback) {
                self.completeCallback = completeCallback;
            }
            if(self.isPostCode){
                self.daumPost.open();
            }
        },

        close: function() {
            var self = this;
            self.daumPost.close();
        },

        _importDaumPostApiJs: function() {
            var defer = $.Deferred();
            var script = document.createElement('script');
    
            script.onload = function () {
                defer.resolve();
            };
            script.onerror = function(e){ 
                defer.reject('map api를 로드할수 없습니다.');          
            }
            script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";        
            document.head.appendChild(script);  
    
            return defer.promise();
        },
        
        _loadDaumPostApiJs: function(callback){
            if(window.daum && window.daum.Postcode){
                if(callback) callback();
            } else {
                var self = this;
                self._importDaumPostApiJs().done(function(){
                    if(callback) callback();
                    self.daumPost = new daum.Postcode({
                        oncomplete: function(data){
                            if(self.completeCallback) self.completeCallback(data);
                        }
                    });
                }).fail(function(e){
                    alert(e);
                }) 
            } 
        }
    }

    return AddressFind;
})();