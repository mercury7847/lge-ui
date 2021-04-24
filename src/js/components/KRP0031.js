$(window).ready(function(){
    if(!document.querySelector('.KRP0031')) return false;

    $('.KRP0031').buildCommonUI();
    var register = {
        search: {
            msgTarget: '.search-error',
            minLength: 2
        }
    };

    var optionsTmpl =  '<option value="{{code}}">{{codeName}}</options>';
    var validation;

    var KRP0031 = {
        options: {
            txt: '제품 카테고리를 선택하면, 해당 제품의 모델명 확인 방법을 안내해 드립니다.',
            imageUrl: '/lg5-common/images/CS/img-model-name-example.jpg',
            imageAlt: '모델명 및 제조번호 확인 예시 이미지'
        },
        init: function() {
            var self = this;

            self.$el = $('.KRP0031');
            self.$form = self.$el.find('#searchForm');
            self.$keyword = self.$form.find('input[type="text"]');
            self.$button = self.$form.find('.btn-search');
            self.$modelButton = self.$el.find('[data-href="#modelNamePopup"]');
            self.$modelPopup = self.$el.find('#modelNamePopup');

            self.$cateSelect = self.$el.find('#cateSelect');
            self.$subCateSelect = self.$el.find('#subCateSelect');

            self.searchModelNameUrl = self.$modelPopup.data('modelUrl');

            vcui.require(['ui/validation'], function () {
                validation = new vcui.ui.Validation('#searchForm',{register:register});
                self.bindEvent();
            });
        },
        searchModel: function() {
            var self = this

            var result = validation.validate();
            if (result.success) {
                self.$form.submit();
            } 
        },
        bindEvent: function() {
            var self = this;

            self.$keyword.on('keydown', function(e) {
                if (e.keyCode == 13) {
                    e.preventDefault();
                    self.searchModel();
                }
            });

            self.$button.on('click', function() {
                self.searchModel();
            });

            self.$modelButton.on('click', function() {
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(self.searchModelNameUrl, '', function(result) {
                    var data = result.data;
                    var html = '';

                    data.forEach(function(item) {
                        var temp = {
                            code: item.superCategoryId,
                            codeName: item.superCateName
                        };

                        html += vcui.template(optionsTmpl, temp);
                    });
                    
                    self.$cateSelect.find('option:not(.placeholder)').remove();
                    self.$cateSelect.append(html);
                    self.$cateSelect.vcSelectbox('update');

                    self.$modelPopup.vcModal({opener:self.$modelButton});
                    lgkorUI.hideLoading();
                }, 'POST');
            });

            self.$cateSelect.on('change', function() {
                var param = {
                    superCategoryId: $(this).val()
                };
                
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(self.searchModelNameUrl, param, function(result) {
                    var data = result.data;
                    var html = '';

                    data.forEach(function(item) {
                        var temp = {
                            code: item.categoryId,
                            codeName: item.cateName
                        };

                        html += vcui.template(optionsTmpl, temp);
                    });

                    self.$subCateSelect.find('option:not(.placeholder)').remove();
                    self.$subCateSelect.append(html).prop('disabled', false);
                    self.$subCateSelect.vcSelectbox('update');

                    lgkorUI.hideLoading();
                }, 'POST');
            });

            self.$subCateSelect.on('change', function() {
                var param = {
                    superCategoryId: self.$cateSelect.val(),
                    categoryId: $(this).val()
                };
                
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(self.searchModelNameUrl, param, function(result) {
                    var data = result.data[0];
                    
                    $('.example-result .txt').html(data.txt);
                    $('.example-result .img img').attr('src', data.imageUrl);
                    $('.example-result .img img').attr('alt', data.imageAlt);

                    lgkorUI.hideLoading();
                }, 'POST');
            });

            self.$modelPopup.on('modalhidden', function() {
                var options = self.options;

                $('.example-result .txt').html(options.txt);
                $('.example-result .img img').attr('src', options.imageUrl);
                $('.example-result .img img').attr('alt', options.imageAlt);

                self.$cateSelect.find('option:not(.placeholder)').remove();
                self.$subCateSelect.prop('disabled', true);
                self.$subCateSelect.find('option:not(.placeholder)').remove();

                self.$cateSelect.vcSelectbox('update');
                self.$subCateSelect.vcSelectbox('update');
            });
        }
    }

    KRP0031.init();
});