(function() {
    var topicTmpl = 
    '{{#each (item, index) in topicList}}' +
    '<li>' +
        '<span class="rdo-wrap btn-type3">' +
            '{{# if (index == 0) { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}" data-topic-name="{{item.name}}" data-error-msg="정확한 제품증상을 선택해주세요." data-required="true" required>' +
            '{{# } else { #}}' +
            '<input type="radio" name="topic" id="topic{{index}}" value="{{item.value}}">' +
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
            '<input type="radio" name="subTopic" id="subTopic{{index}}" value="{{item.value}}">' +
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
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" value="{{index}}" checked>' +
                '{{# } else { #}}' +
                '<input type="radio" name="engineer" id="engineer{{index}}" data-engineer-name="{{item.engineerName}}" data-engineer-code={{item.engineerCode}} data-center-name="{{item.centerName}}" data-center-code={{item.centerCode}} data-image="{{item.image}}" value="{{index}}">' +
                '{{# } #}}' +
                '<label for="engineer{{index}}">' +
                    '<div class="img">' +
                        '<img src="{{item.image}}" alt="" aria-hidden="true">' +
                    '</div>' +
                    '<p class="tit">{{item.engineerNm}}</p>' +
                    '<p class="desc">{{item.centerNm}}</p>' +
                '</label>' +
            '</div>' +  
        '</div>' +
        '{{/each}}';

    var addressFinder;
    var authManager;

    var reservation = {
        init: function() {
            var self = this;

            self.$cont = $('.contents');

            
            self.$topicBox = self.$cont.find('#topicBox');
            self.$topicListWrap = self.$cont.find('#topicList');
            self.$topicList = self.$topicListWrap.find('.rdo-list');

            self.$subTopicBox = self.$cont.find('#subTopicBox');
            self.$subTopicListWrap = self.$cont.find('#subTopicList');
            self.$subTopicList = self.$subTopicListWrap.find('.rdo-list');

            self.$solutionsBanner = self.$cont.find('#solutionBanner');
            self.$solutionsPopup = $('#solutionsPopup');

            self.bindEvent();    
        },
        requestSubTopic: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data,
                    html;
                    
                html = vcui.template(subTopicTmpl, data);

                self.$subTopicList.html(html);
                self.$subTopicBox.show();
            });
        },
        reqeustSolutions: function(url, param) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result) {
                var data = result.data;
                
                if (data.resultFlag == 'Y') {
                    if (data.solutionFlag) {
                        self.$solutionsBanner.show();
                    } else {
                        self.$solutionsBanner.hide();
                    }
                }
            });
        },
        setSolutions: function(url, param, isShown) {
            var self = this;

            lgkorUI.requestAjaxData(url, param, function(result){
                self.$solutionsPopup.find('.pop-conts').html(result);
                self.$solutionsPopup.find('.pagination').pagination();
                if (isShown) {
                    self.$solutionsPopup.find('.ui_accordion').vcAccordion();
                } else {
                    self.$solutionsPopup.vcModal();
                }

                self.$solutionsPopup.find('.pagination').on('pageClick', function(e) {
                    var url = self.$solutionsPopup.data('listUrl'),
                        param = {
                            topic : $('#topic').val(),
                            subToic : $('#subTopic').val(),
                            productCode : $('#productCode').val(),
                            page: e.page
                        };

                    self.setSolutions(url, param, true);
                });
            }, null, "html");
        },
        bindEvent: function() {
            var self = this;

            // 증상 선택
            self.$topicList.on('change', '[name=topic]', function() {
                var url = self.$topicListWrap.data('ajax'),
                    param = {
                        topic : $(this).val(),
                        serviceType: $('#serviceType').val(),
                        productCode: $('#productCode').val()
                    };
                    
                self.requestSubTopic(url, param);
            });

            // 세부 증상 선택
            self.$subTopicList.on('change', '[name=subTopic]', function() {
                var $this = $(this),
                    url = self.$subTopicListWrap.data('ajax'),
                    param = {
                        topic : $('input[name=topic]').val(),
                        subTopic: $this.val(),
                        productCode: $('#productCode').val()
                    };
                    
                self.reqeustSolutions(url, param);

                if (self.autoFlag) self.requestDate();
            });


        }
    }

    $(window).ready(function() {
        reservation.init();
    });
})();