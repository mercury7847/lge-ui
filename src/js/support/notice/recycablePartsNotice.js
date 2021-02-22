(function() {
    var noDataDefaultTxt =  '모델명을 검색하세요.'
    var noDataTxt = '검색된 결과가 없습니다.';
    var listTmpl = 
        '<tr>' +
            '<td rowspan="2">{{sort}}</td>' +
            '<td rowspan="2">{{partName}}</td>' +
            '<td>신품</td>' +
            '<td>{{partNew.number}}</td>' +
            '<td>{{partNew.price}}</td>' +
            '<td>{{partModel}}</td>' +
        '</tr>' +
        '<tr>' +
            '<td>부품</td>' +
            '<td>{{partOld.number}}</td>' +
            '<td>{{partOld.price}}</td>' +
            '<td>{{partModel}}</td>' +
        '</tr>';

    var recycablePars = {
        init: function() {
            var self = this;

            self.$cont = $('.contents.recycable-parts');
            self.$searchWrap = self.$cont.find('.search-wrap');
            self.$searchSelect = self.$searchWrap.find('select');
            self.$searchInput = self.$searchWrap.find('input[type=text]');
            self.$searchButton = self.$searchWrap.find('.btn-search');
            self.$sortingWrap = self.$cont.find('.sorting-wrap');
            self.$sortingCount = self.$sortingWrap.find('.count');

            self.$resultTable = self.$cont.find('.tb_row');
            self.$resultNoData = self.$resultTable.find('.empty-row');
            self.$resultPaging = self.$cont.find('.pagination');

            self.listUrl = self.$cont.data('listUrl');
            self.defaults = {
                sort:'',
                keyword: '',
                page:1
            };

            self.param = $.extend({}, self.defaults);

            self.bindEvent();

            self.$resultPaging.pagination({
                pageCount: 15
            });
        },
        requestData : function() {
            var self = this;

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(self.listUrl, self.param, function(result) {
                var $tableBody = self.$resultTable.find('tbody');
                var data = result.data,
                    listArr = data.listData instanceof Array ? data.listData : [],
                    page = data.listPage,
                    html = '';

                $tableBody.find('tr').not('.empty-row').remove();
                self.$sortingCount.html(page.totalCount);

                if (listArr.length) {
                    listArr.forEach(function(item) {
                        html += vcui.template(listTmpl, item);
                    });
                    $tableBody.append(html);
                    self.$resultNoData.hide();
                    self.$resultPaging.pagination('update', page);
                    self.$resultPaging.show();
                } else {
                    self.$resultNoData.find('p').html(noDataTxt);
                    self.$resultNoData.show();
                    self.$resultPaging.hide();
                }

                self.$searchSelect.find('option[value="'+self.param.sort+'"]').prop('selected', true);
                self.$searchSelect.vcSelectbox('update');
                self.$searchInput.val(self.param.keyword);

                lgkorUI.hideLoading();
            });
        },
        bindEvent: function() {
            var self = this;

            self.$searchInput.on('keyup', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.$searchButton.trigger('click');
                }
            });

            self.$searchButton.on('click', function() {
                var sortVal = self.$searchSelect.val(),
                    keywordVal = self.$searchInput.val(),
                    errorTxt = '', flag = false;

                if (!sortVal) errorTxt = '제품을 선택 해 주세요.';
                else if (!keywordVal) errorTxt = '모델명을 입력 해주세요.';
                else if (keywordVal.length < 3) errorTxt = '모델명을 3글자 이상 입력 해주세요.';
                else flag = true;
                
                if (flag) {
                    self.param = $.extend(self.param, {
                        sort: sortVal,
                        keyword: keywordVal,
                        page:1
                    });
                    self.requestData();   
                } else {
                    lgkorUI.alert('', {
                        title: errorTxt
                    });
                }
            });

            self.$resultPaging.on('pageClick', function(e) {
                self.param = $.extend(self.param, {
                    page: e.page
                });
                self.requestData();
            });
        }
    }

    $( function(){
        recycablePars.init();
    });
})();