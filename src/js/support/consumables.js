(function() {

    var consumables = {
        init: function() {
            var self = this;

            //PDP 인포
            self.$pdpInfo = $('div.pdp-info-area');

            //PDP 모달
            self.$pushApplyPopup = $('#pushApplyPopup');  // 알림신청 입력 팝업
            self.$pushApplyErrorPopup = $('#pushApplyErrorPopup'); // 알람신청 에러 팝업
            self.$pushApplyCompletePopup = $('#pushApplyCompletePopup'); // 알람신청 완료 팝업

            self.pushApplyUrl = self.$pushApplyPopup.data('pushApplyUrl');

            var $pushApplyInput = self.$pushApplyPopup.find('input.quantity');
            self.$pushApplyPopup.data('quantity', $pushApplyInput.val());

            self.bindEvent();
        },
        pushApply: function() {
            var self = this;
            var param = $.extend({}, sendData);

            param.quantity = self.$pushApplyPopup.data('quantity');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.pushApplyUrl, param, function(result){
                var data = result.data;
                
                self.$pushApplyPopup.vcModal('hide');
                if (data.success == 'Y') {
                    self.completePushApply(data);    
                } else {           
                    self.$pushApplyErrorPopup.vcModal();
                }
                lgkorUI.hideLoading();
            });
        },
        completePushApply: function(data) {
            var self = this;
            var $number = self.$pushApplyCompletePopup.find('.number'),
                $product = self.$pushApplyCompletePopup.find('.product'),
                $quantity = self.$pushApplyCompletePopup.find('.quantity');

            $number.html(data.pushNo);
            $product.html(data.partName);
            $quantity.html(data.quantity);

            self.$pdpInfo.find('.purchase-button .btn:first-child').remove();
            self.$pdpInfo.find('.purchase-button .btn').prop('disabled', true).attr('class', 'btn disabled');

            self.$pushApplyCompletePopup.vcModal();
        },
        bindEvent: function() {
            var self = this;

            self.$pushApplyCompletePopup.on('modalhide', function() {
                self.$pushApplyCompletePopup.find('.number').html('');
                self.$pushApplyCompletePopup.find('.product').html('');
                self.$pushApplyCompletePopup.find('.quantity').html('');
            });

            self.$pushApplyPopup.on('click', 'button.minus,button.plus',function (e) {
                var $input = $(this).siblings('input');
                var quantity = $input.val();
                if($(this).hasClass('minus')) {
                    --quantity;
                    if(quantity < 1) {
                        quantity = 1;
                    }
                    
                    if(quantity == 1) {
                        $(this).attr('disabled',true);
                    } else {
                        $(this).removeAttr('disabled');
                    }
                } else if($(this).hasClass('plus')) {
                    ++quantity;

                    if(quantity > 1) {
                        $(this).siblings('button.minus').removeAttr('disabled');
                    }
                }
                $input.val(quantity);

                self.$pushApplyPopup.data('quantity',quantity);
            }).on('click', '.btn-group .btn', function() {
                self.pushApply();
            });

            //검색어 초기화
            $(".search-input .btn-delete").click(function() {
                var temp_ul = $(this).parents('.model-infomation').find('.model-infomation-list');
                var temp_li = $(temp_ul).find('li');
                var $nodata = $('.no-data');

                $(this).siblings("#keyword").val("");
                temp_ul.show();
                temp_li.show();
                $nodata.hide();
            });

            //소모품 대체, 공유 모델명 검색
            $("#keyword").on("input", function() {
                var k = $(this).val();

                var temp_ul = $(this).parents('.model-infomation').find('.model-infomation-list');
                var temp_li = $(temp_ul).find('li');
                // var temp_visible = $(temp_ul).find('li:visible');
                var $nodata = $('.no-data');

                $(temp_li).hide();
                $(temp_ul).find("li:contains('" + k + "')").show();

                if( k == "") {
                    temp_ul.show();
                    $nodata.hide();
                } else {
                    if( !$(temp_ul).find("li:contains('" + k + "')").length) {
                        temp_ul.hide();
                        $nodata.show();
                    } else { 
                        temp_ul.show()
                        $nodata.hide();
                    }
                }
            });
        }
    }

    $(window).ready(function() {
        consumables.init();
    });
})();