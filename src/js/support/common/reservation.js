vcui.define('support/common/reservation.min', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var topicTmpl = 
    '{{#each (item, index) in topicList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}">' +
            '{{# } #}}' +
            '<label for="topic{{index}}"><span>{{item.name}}</span></label>' +
        '</span>' +
    '</li>' + 
    '{{/each}}';
    var subTopicTmpl = 
    '{{#each (item, index) in subTopicList}}' +
    '<li>' +
        '<span class="rdo-wrap">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}" data-error-msg="정확한 세부증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}" data-sub-topic-name="{{item.name}}">' +
            '{{# } #}}' +
            '<label for="subTopic{{index}}">{{item.name}}</label>' +
        '</span>' +
    '</li>' +
    '{{/each}}';
    var engineerTmpl =
    '{{#each (item, index) in engineerList}}' +
    '<div class="slide-conts ui_carousel_slide">' +
        '<div class="engineer-box">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}" checked>' +
            '{{# } else { #}}' +
            '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code="{{item.engineerCode}}" data-center-name="{{item.centerName}}" data-center-code="{{item.centerCode}}" data-image="{{item.image}}" data-resrv-seq="{{item.resrvSeq}}" value="{{index}}">' +
            '{{# } #}}' +
            '<label for="engineer{{index}}">' +
                '<div class="img">' +
                    '<img src="{{item.image}}" alt="" aria-hidden="true">' +
                '</div>' +
                '<p class="tit">{{item.engineerName}}</p>' +
                '<p class="desc">{{item.centerName}}</p>' +
            '</label>' +
        '</div>' +  
    '</div>' +
    '{{/each}}';

    var dateUtil = vcui.date;
    var detectUtil = vcui.detect;
    var isMobile = detectUtil.isMobile; 
    var isLogin = lgkorUI.isLogin;

    var commonResrv = {
        initialize: function initialize() {
            var self = this;
            
            self.$contents = $('.contents.support');
            
            self._bindEvent();
        },
        _bindEvent: function _bindEvent() {
            var self = this;
            
        },
        setWarranty: function(data) {
            var self = this;
            var $warranty = self.$contents.find('[name=buyingdate]');

            if (isLogin) {
                if (data.warrantyText && data.warrantValue) {
                    $warranty.closest('.conts').append('<p class="form-text">'+data.warrantyText+'</p>');
                    $warranty.filter('[value='+data.warrantValue+']').prop('checked', true);
                    
                    $warranty.closest('.rdo-list-wrap').hide();
                } else {
                    $warranty.closest('.rdo-list-wrap').show();
                }
            }
        },
        setTopic: function(data) {
            var self = this;
            var $topicBox = self.$contents.find('#topicBox'),
                $topicWrap = $topicBox.find('#topicList'),
                $topicList = $topicBox.find('.rdo-list');
            var success = (data.topicList instanceof Array && data.topicList.length) ? true : false;
            
            if (success) {
                $topicList.html(vcui.template(topicTmpl, data));
            }
        },
        setSubTopic: function(data) {
            var self = this;
            var $subTopicBox = self.$contents.find('#subTopicBox'),
                $subTopicWrap = $subTopicBox.find('#subTopicList'),
                $subTopicList = $subTopicBox.find('.rdo-list');
            var success = (data.subTopicList instanceof Array && data.subTopicList.length) ? true : false;

            if (success) {
                $subTopicList.html(vcui.template(subTopicTmpl, data));
                $subTopicBox.show();
            } else {
                $subTopicBox.hide();
                $subTopicList.empty();
            }
        },
        reqeustSolutions: function(param) {
            var self = this;
            lgkorUI.requestAjaxData(self.solutionsUrl, param, function(result) {
                self.$solutionsBanner[result.data.resultFlag == 'Y' ? 'show' : 'hide']();
            });
        },
        setSolutions: function(param, isShown) {
            var self = this;
            var $solutionsPopup = $('#solutionsPopup');
            var url = $solutionsPopup.data('listUrl');

            lgkorUI.requestAjaxData(url, param, function(result){
                $solutionsPopup.find('.pop-conts').html(result);
                $solutionsPopup.find('.pagination').pagination();
                
                if (isShown) {
                    $solutionsPopup.find('.ui_accordion').vcAccordion();
                } else {
                    $solutionsPopup.vcModal();
                }

                $solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    var param = {
                            topic : $('input[name=topic]:checked').val(),
                            subToic : $('input[name=subTopic]:checked').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(param, true);
                });
            }, null, "html", true);
        },
        setDateTable: function() {
            var self = this;
            var success = (data.dateList instanceof Array && data.dateList.length) ? true : false;
                fastDate = dateUtil.format(data.fastDate + '' + data.fastTime + '00', 'yyyy.MM.dd hh:mm');

            if (success) {
                self.$calendarWrap.find('.calendar-info .date').html(fastDate);
                self.$calendarDate.calendar('update', data.dateList);
            }
        },
        setTimeTable: function() {
            var self = this;
            
        },
        setEngineer: function() {
            var self = this;
        }
    };

    return commonResrv;
});