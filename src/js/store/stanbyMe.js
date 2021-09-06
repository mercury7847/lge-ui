(function() {
    var listTmpl = 
    '<tr>' +
        '<td class="board-tit">' +
            '<a href="{{clubMId}}">' +
                '{{# if (newFlag == "Y") { #}}' +
                '<div class="flag-wrap bar-type">' +
                    '<span class="flag"><span class="blind">최신 게시글</span>NEW</span>' +
                '</div>' +
                '{{# } #}}' +
                '<p>{{title}}</p>' +
                '{{# if (clubDCount > 0) { #}}' +
                    '<span class="count">{{clubDCount}}</span>' +
                '{{# } #}}' +
            '</a>' +
        '</td>' +
        '<td>{{creationUserName}}</td>' +
        '<td>{{creationDate}}</td>' +
        '<td><span class="txt-cnt">조회수</span>{{hitCnt}}</td>' +
    '</tr>';

    var commentList =
    '<li>'+
         '{{# if (admin == "N") { #}}' +
          '<div class="comment-content">' +
           '{{# } #}}' +
           '{{# if (admin == "Y") { #}}' +
            '<div class="comment-content admin-comment">' +
           '{{# } #}}' +
            '<div class="info-name"><span class="blind">작성자</span>{{creationUserName}}</div>' +
            '<div class="comment-text-wrap">' +
                '<div class="comment-text">' +
                    '<p>{{contents}}</p>' +
                '</div>' +
            '</div>' +
            '<div class="info-date"><span class="blind">작성일시</span>{{creationDate}}<span class="time">{{creationTime}}</span></div>' +
            '{{# if (mine == "Y") { #}}' +
            '<div class="comment-btn-box">' +
                '<button type="button" class="btn-text">수정</button>' +
                '<button type="button" class="btn-text btn-comment-del" data-id="#commentDeleteConfirm" data-control="modal">삭제</button>' +
            '</div>' +
            '{{# } #}}' +
        '</div>' +
    '</li>';

    $(window).ready(function() {

        var stanbymeList = {
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.stanbyme');

                    vcui.require(['ui/pagination'], function () {
                        self.$qnaTab = $contents.find('#prod1');
                        self.$pagination = $contents.find('.pagination').vcPagination();
                        self.$sortsWrap = $contents.find('.sorting-wrap');
                        self.$sortTotal = self.$sortsWrap.find('#count');
                        self.$sortSelectWrap = $contents.find('.sort-select-wrap');
                        self.$sortSelect = $contents.find('.ui_selectbox');
                        self.$listWrap = $contents.find('.tb_row');
                        self.$noData = $contents.find('.empty-row');

                        self.params = {
                            'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                            'page': 1
                        };
                        self.bindEvent();
                    });

            },
            settingList: function() {
                var self = this,
                    url = self.$qnaTab.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                    var html = '',
                        data = d.data,
                        page = d.pagination;

                    self.$sortTotal.html(page.dataCount);

                    self.$listWrap.find('tbody').find('tr').not( self.$noData).remove();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(listTmpl, item);
                        });
                        self.$listWrap.find('tbody').prepend(html);
                        self.$noData.hide();
                    } else {
                        self.$noData.show();
                    }
                    self.$pagination.vcPagination('setPageInfo', page);
                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var self = this;

                self.$listWrap.on('click', '.board-tit a', function() {
                    lgkorUI.historyBack(this);
                });

                self.$sortSelect.filter('#orderType').on('change', function() {
                    self.params = $.extend({}, self.params, {
                        'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                        'page': 1
                    });
                    self.settingList();
                });

                self.$pagination.on('page_click', function(e,page) {
                    self.params = $.extend({}, self.params, {
                        'page': page
                    });
                    self.settingList();
                });
            }
        };

        var stanbymeCommentList = {
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.stanbyme');

                vcui.require(['ui/pagination'], function () {
                    self.$commentWrap = $contents.find('.comment-wrap');
                    self.$pagination = self.$commentWrap.find('.pagination').vcPagination();
                    self.$listWrap = self.$commentWrap.find('.comment-list ul');

                    self.params = {
                        'page': 1
                    };
                    self.bindEvent();
                });

            },
            settingList: function() {
                var self = this,
                    url = self.$commentWrap.data('ajax');

                lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {

                    var html = '',
                        data = d.data,
                        page = d.pagination;

                    self.$listWrap.empty();

                    if (data.length) {
                        data.forEach(function(item) {
                            html += vcui.template(commentList, item);
                        });
                        self.$listWrap.prepend(html);
                    }
                    self.$pagination.vcPagination('setPageInfo', page);
                    self.bindEvent();
                    lgkorUI.hideLoading();
                });
            },
            bindEvent: function() {
                var self = this;

                self.$pagination.on('page_click', function(e,page) {
                    e.preventDefault();
                    self.params = $.extend({}, self.params, {
                        'page': page
                    });
                    self.settingList();
                });

                //댓글 등록 버튼 클릭시 
                var btnWriteFunc = function(){
                    $('.comment-write .btn-confirm').on('click', function(e){
                        var $commentWrite = $('.comment-write'),
                            url = $commentWrite.data('ajax');

                        var commentParam = {};
                        commentParam.value = $('textarea').val();

                        lgkorUI.requestAjaxDataPost(url, commentParam, function(d) {
                            if(d.status == 'success'){
                                commentParam = $.extend({}, params, {
                                    'testSucFlag': "Y"
                                });
                            }else{
                                commentParam = $.extend({}, commentParam, {
                                    'testSucFlag': "N"
                                });
                                lgkorUI.alert("",{title:d.message});
                            }
                            self.bindEvent();
                            lgkorUI.hideLoading();
                        },true);
                    });
                };
                btnWriteFunc();

                //댓글 삭제 버튼 클릭시
                $('.btn-comment-del').on('click', function(e){
                    var id = $(e.currentTarget).data('id');
                    var obj ={title:'', typeClass:'', ok : function (){ }};
                    var desc = '';

                    if(id=="#commentDeleteConfirm"){
                        obj = $.extend(obj,{title: '댓글을 삭제하시겠습니까?', cancelBtnName: '아니오', okBtnName: '예', });
                        desc = '';
                    }
                    lgkorUI.confirm(desc, obj);
                });
                //댓글 수정 버튼 클릭시
                $('.btn-modify').on('click', function(e){
                    var id = $(e.currentTarget).data('id');
                    var obj ={title:'', typeClass:'', ok : function (){ }};
                    var desc = '';

                    if(id=="#modifyConfirm"){
                        obj = $.extend(obj,{title: '게시물을 수정하시겠습니까?', cancelBtnName: '아니오', okBtnName: '예', });
                        desc = '';
                    }
                    lgkorUI.confirm(desc, obj);
                });
                // 댓글 작성중일 경우 valid 클래스 추가
                var inp = $('.input-wrap textarea');
                var btnCancel = $('.btn-cancel');
                inp.each(function(){
                    var me = $(this);
                    var inpValLen = me.val().length;

                    valid();

                    me.on('change keyup paste', function(){
                        inpValLen = me.val().length;
                        valid();
                    });

                    function valid(){
                        if(inpValLen > 0) {
                            me.addClass('valid');
                        } else{
                            me.removeClass('valid');
                        }
                    }
                    btnCancel.on('click', function(){
                        var meInp = $(this).parents('.input-wrap');
                        meInp.find('textarea').removeClass('valid');
                        meInp.find('.inner-text em').text('0');
                    });
                });
            }
        };

        if($('.contents.stanbyme .visual-wrap').length > 0){
            stanbymeList.init();
        }else if($('.contents.stanbyme .stanbyme-detail').length > 0){
            stanbymeCommentList.init();
        }
    });
})();
