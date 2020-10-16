(function() {
    var inputSearchListItemTemplate = '<li><a href="#{{input}}">{{#raw text}}</a></li>';
    var categoryItemTemplate = '<li><a href="{{url}}" class="rounded"><span class="text">{{#raw text}}</span></a></li>';
    var previewItemTemplate = '<li><a href="{{url}}" class="item">' +
        '<div class="image"><img data-pc-src="{{image_pc_url}}" data-m-src="{{image_m_url}}" alt="{{image_alt}}"></div>' +
        '<div class="info">' +
            '<span class="name">{{#raw title}}</span><span class="sku">{{sku}}</span><span class="price">{{price}}원</span>' +
        '</div></a></li>';
    var minLength = 2;
    var searchDelay = 2000;
    var searchTimer = null;
    var serchMouseOverTimer = null;
    var searchedValue = null;

    $(window).ready(function() {
        var intergratedSearch = {
            init: function() {
                self.$searchLayer = $('#layerSearch');
                self.$inputSearch = self.$searchLayer.find('div.input-sch input.txt');
                self.$buttonSearch = self.$searchLayer.find('div.input-sch button.btn-search');
                self.$buttonClearSearch = self.$searchLayer.find('div.input-sch button.btn-delete');
                self.$search_result_area = self.$searchLayer.find('div.search-result-area');
                self.$inputSearchList = self.$search_result_area.find('div.input-result-list');
                self.$resultCount = self.$search_result_area.find('span.result-title');
                self.$resultCategory = self.$search_result_area.find('div.result-category');
                self.$resultPreview = self.$search_result_area.find('div.result-preview-list');

                self.$inputSearchList.hide();

                var _self = this;
                _self.bindEvents();
            },

            bindEvents: function() {
                var _self = this;

                //통합검색 노출
                $('div.contents.search div.cont-wrap a').on("click", function(e) {
                    _self.showAnimation(self.$searchLayer);
                });

                //통합검색 닫음
                self.$searchLayer.find('button.btn-close').on("click", function(e) {
                    clearTimeout(searchTimer);
                    clearTimeout(serchMouseOverTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    _self.hideAnimation(self.$searchLayer);
                });

                //검색버튼
                self.$buttonSearch.on('click', function(e){
                    clearTimeout(searchTimer);
                    clearTimeout(serchMouseOverTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    var searchVal = self.$inputSearch.val();
                    _self.requestSearch(searchVal);
                });

                //검색 타이머
                self.$inputSearch.on("input", function(e) {
                    clearTimeout(searchTimer);
                    _self.hideAnimation(self.$inputSearchList);
                  
                    var searchVal = this.value;
                    if (searchVal.length < minLength) {
                        return;
                    }  
                  
                    searchTimer = setTimeout(function() {
                        _self.requestTimerSearch(searchVal);
                    }, searchDelay);
                });

                //검색타이머 마우스 오버
                var searchItemTarget = 'ul li a';
                self.$inputSearchList.on('mouseover', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                    var searchVal = $(this).attr('href').replaceAll("#", "");
                    serchMouseOverTimer = setTimeout(function() {
                        _self.requestSearch(searchVal);
                    }, searchDelay);
                }).on('mouseout', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                }).on('click', searchItemTarget, function(e){
                    e.preventDefault();
                    clearTimeout(serchMouseOverTimer);
                    _self.hideAnimation(self.$inputSearchList);
                    var searchVal = $(this).attr('href').replaceAll("#", "");
                    if(searchedValue != searchVal) {
                        //새로운 값 선택
                        _self.requestSearch(searchVal);
                    }
                })
            },

            showAnimation:function($item) {
                $item.css({'opacity':0});
                $item.show();
                $item.animate({opacity:1},100);
            },

            hideAnimation:function($item) {
                $item.animate({opacity:0},100,function() {
                    $item.hide();
                });
            },

            requestTimerSearch:function(searchValue) {
                var _self = this;
                var ajaxUrl = self.$searchLayer.attr('data-url-timer');

                $.ajax({
                    url: ajaxUrl,
                    data: {"search":searchValue}
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    var searchInput = d.param.input;
                    var replaceText = '<span class="search-word">' + searchInput + '</span>';

                    var data = d.data;

                    var arr = data instanceof Array ? data : [];

                    if(arr.length > 0) {
                        var $list_ul = self.$inputSearchList.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(inputSearchListItemTemplate, {"input":item, "text":item.replaceAll(searchInput,replaceText)}));
                        });

                        _self.showAnimation(self.$inputSearchList);
                    } else {
                        _self.hideAnimation(self.$inputSearchList);
                    }
                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            },

            requestSearch:function(searchValue) {
                var _self = this;
                var ajaxUrl = self.$searchLayer.attr('data-url-search');
                console.log(ajaxUrl,searchValue);

                $.ajax({
                    url: ajaxUrl,
                    data: {"search":searchValue}
                }).done(function (d) {
                    if(d.status != 'success') {
                        alert(d.message ? d.message : '오류발생');
                        return;
                    }
        
                    searchedValue = d.param.input;
                    var replaceText = '<span class="search-word">' + searchedValue + '</span>';
                    
                    var data = d.data;
                    var showResult = false;
                    var arr = data.category instanceof Array ? data.category : [];
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultCategory.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            $list_ul.append(vcui.template(categoryItemTemplate, {"url":item.url,"text":item.text.replaceAll(searchedValue,replaceText)}));
                        });
                        self.$resultCategory.show();
                    } else {
                        self.$resultCategory.hide();
                    }

                    arr = data.preview instanceof Array ? data.preview : [];
                    if(arr.length > 0) {
                        showResult = true;
                        var $list_ul = self.$resultPreview.find('ul');
                        $list_ul.empty();
                        arr.forEach(function(item, index) {
                            item.title = item.title.replaceAll(searchedValue,replaceText);
                            item.price = vcui.number.addComma(item.price);
                            console.log(vcui.template(previewItemTemplate, item));
                            $list_ul.append(vcui.template(previewItemTemplate, item));
                        });
                        self.$resultPreview.vcImageSwitch('reload');
                        self.$resultPreview.show();
                    } else {
                        self.$resultPreview.hide();
                    }

                    if(showResult) {
                        self.$resultCount.text('검색 결과 (' + vcui.number.addComma(data.resultCount) + ')');
                        self.$resultCount.show();
                    } else {
                        self.$resultCount.hide();
                    }


                }).fail(function(d){
                    alert(d.status + '\n' + d.statusText);
                });
            }
        }

        intergratedSearch.init();
    });
})();