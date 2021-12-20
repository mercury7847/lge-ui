vcui.define('support/consumables.min', ['jquery', 'vcui'], function ($, core) {
    var txtMasking;
    var pageData;

    var consumables = {
        init: function(data) {
            var self = this;

            //PDP 인포
            self.$pdpInfo = $('div.pdp-info-area');

            //가격정보
            self.$pdpInfoPaymentAmount = self.$pdpInfo.find('.payment-amount');

            //PDP 모달
            self.$pushApplyPopup = $('#pushApplyPopup');  // 알림신청 입력 팝업
            self.$pushApplyLoginPopup = $('#pushApplyLoginPopup'); // 알림신청 로그인 팝업
            self.$pushApplyErrorPopup = $('#pushApplyErrorPopup'); // 알람신청 에러 팝업
            self.$pushApplyCompletePopup = $('#pushApplyCompletePopup'); // 알람신청 완료 팝업

            self.pushApplyUrl = self.$pushApplyPopup.data('pushApplyUrl');

            var $pushApplyInput = self.$pushApplyPopup.find('input.quantity');
            self.$pushApplyPopup.data('quantity', $pushApplyInput.val());

            vcui.require(['helper/textMasking'], function () {             
                self.setting(data);
                self.bindEvent();
            });
        },
        setting: function(data) {
            var self = this;

            txtMasking = new vcui.helper.TextMasking();
            pageData = data;

            self.loginFlag = pageData.loginFlag == 'Y' ? true : false;
            self.obsBtnRule = pageData.obsBtnRule == 'restocked' ? true : false;
            self.setRestock();
        },
        setRestock: function() {
            var self = this;

            if (self.loginFlag) {
                if (self.obsBtnRule) {
                    self.$pdpInfo.find('.purchase-button.pre-order .btn:first-child').remove();
                    self.$pdpInfo.find('.purchase-button.pre-order .btn').prop('disabled', true).attr('class', 'btn disabled').find('span').text('알림신청 완료');
                } else {
                    self.$pushApplyPopup.find('.push-apply-info:eq(1)').find('dd:eq(0)').html(txtMasking.name(pageData.name));
                    self.$pushApplyPopup.find('.push-apply-info:eq(1)').find('dd:eq(1)').html(txtMasking.phone(pageData.mobileNo));
                }
            }
        },
        pushApply: function() {
            var self = this;
            var param = {
                unifyId: pageData.unifyId,
                partNo: pageData.modelName,
                divCode: pageData.hqAccountingUnitCode,
                modelId: pageData.modelId,
                reqQty: self.$pushApplyPopup.data('quantity'),
                name: pageData.name,
                mobileNo: pageData.mobileNo
            };
            
            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(self.pushApplyUrl, param, function(result){
                lgkorUI.hideLoading();

                var data = result.data;
                data.quantity = self.$pushApplyPopup.data('quantity');
                
                self.$pushApplyPopup.vcModal('hide');
                if (data.success == 'Y') {
                    self.completePushApply(data);    
                } else {           
                    self.$pushApplyErrorPopup.vcModal();
                }
            });
        },
        completePushApply: function(data) {
            var self = this;
            var $number = self.$pushApplyCompletePopup.find('.number'),
                $product = self.$pushApplyCompletePopup.find('.product'),
                $quantity = self.$pushApplyCompletePopup.find('.quantity');

            $number.html(data.unifyId);
            $product.html(pageData.modelDisplayName);
            $quantity.html(data.quantity);

            self.$pdpInfo.find('.purchase-button.pre-order .btn:first-child').remove();
            self.$pdpInfo.find('.purchase-button.pre-order .btn').prop('disabled', true).attr('class', 'btn disabled').find('span').text('알림신청 완료');

            self.$pushApplyCompletePopup.vcModal();
        },
        bindEvent: function() {
            var self = this;

            self.$pdpInfo.find('div.purchase-button.pre-order button').on('click', function() {
                self.loginFlag ? self.$pushApplyPopup.vcModal() : self.$pushApplyLoginPopup.vcModal();
            });

            self.$pushApplyPopup.on('modalhide', function() {
                self.$pushApplyPopup.find('.quantity').val(1);
                self.$pushApplyPopup.find('button.minus').attr('disabled',true);
                self.$pushApplyPopup.find('button.plus').removeAttr('disabled');
                self.$pushApplyPopup.data('quantity', 1);
            });

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

                    $(this).siblings('button.plus').removeAttr('disabled');
                } else if($(this).hasClass('plus')) {
                    var max = $(this).data('max');  
                    ++quantity;
                    if (max && quantity >= max) {
                        quantity = max;
                        $(this).attr('disabled',true);
                    }

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
                var $list = $(this).parents('.model-infomation').find('.model-infomation-list');
                var $listItem = $list.find('li');
                var $nodata = $('.no-data');

                $(this).siblings("#keyword").val('');
                $list.show();
                $listItem.show();
                $nodata.hide();
            });

            //소모품 대체, 공유 모델명 검색
            $("#keyword").on("input", function() {
                var keyword = $(this).val().toUpperCase().trim();
                // BTOCSITE-9665 고객지원 모델명 검색창 한글 입력 허용
                // var regex = /[^a-zA-Z0-9.\-]/g;
                var regex =/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9.\-]/g;

                if (regex.test(keyword)) {
                    $(this).val(keyword.replace(regex,""));
                    return;
                }

                var $list = $(this).parents('.model-infomation').find('.model-infomation-list');
                var $listItem = $list.find('li');
                var $nodata = $('.no-data');

                $listItem.hide();
                $list.find("li:contains('" + keyword + "')").show();

                if (keyword == '') {
                    $list.show();
                    $nodata.hide();
                } else {
                    if (!$list.find("li:contains('" + keyword + "')").length) {
                        $list.hide();
                        $nodata.show();
                    } else { 
                        $list.show()
                        $nodata.hide();
                    }
                }
            });
        }
    }

    return consumables;
});