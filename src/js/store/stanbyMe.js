(function() {
    var listTmpl = 
    '<tr>' +
        '<td class="board-tit">' +
            '<a href="{{url}}">' +
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
        '<div class="comment-content {{# if (adminFlag == "Y") { #}}admin-comment{{# } #}}" data-club-id="{{clubDId}}">' +
            '<div class="info-name"><span class="blind">작성자</span>{{creationUserName}}</div>' +
            '<div class="comment-text-wrap">' +
                '<div class="comment-text">' +
                    '<p>{{subContents}}</p>' +
                '</div>' +
            '</div>' +
            '<div class="info-date"><span class="blind">작성일시</span>{{creationDate}}<span class="time">{{creationTime}}</span></div>' +
            '{{# if (editableFlag == "Y" || deletableFlag == "Y" ) { #}}' +
            '<div class="comment-btn-box">' +
                '{{# if (editableFlag == "Y" ) { #}} <button type="button" class="btn-text btn-comment-modify">수정</button> {{# } #}}' +
                '{{# if (deletableFlag == "Y" ) { #}} <button type="button" class="btn-text btn-comment-del" data-control="modal">삭제</button> {{# } #}}' +
            '</div>' +
            '{{# } #}}' +
        '</div>' +
    '</li>';
    
    var commentModifyForm =
        '<form>' +
            '<div class="comment-write" data-ajax="/mkt/api/stanbyMe/updateStanbyMeDAjax">' +
                '<div class="form-wrap">' +
                    '<div class="forms">' +
                        '<div class="conts">' +
                            '<div class="text-form">' +
                                '<div class="input-wrap">' +
                                    '<textarea title="댓글내용" name="comment" id="comment" class="ui_textcontrol valid" placeholder="댓글을 작성해 주세요.&#13;&#10;- 작성된 글은 저작권/초상권, 음란성/홍보성, 욕설/비방 등의 성격에 따라 관리자에 의해 통보 없이 임의 삭제 될 수 있습니다." maxLength="500" data-limit="500" data-count-target="#txa_comment" data-error-msg="댓글을 입력해주세요." data-required="true" required="" ui-modules="TextControl" aria-describedby="commentError">{{writeCont}}</textarea>' +
                                    '<div class="txt-count-box">' +
                                        '<span id="txa_comment" class="inner-text"><em>0</em> / 500자</span>' +
                                        '<div class="comment-write-btn-box">' +
                                            '<button type="reset" class="btn gray size btn-cancel">취소</button>' +
                                            '<button type="button" class="btn dark-gray size btn-confirm">수정</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="btm-more err-block">' +
                            '<p class="err-msg" id="commentError">댓글을 입력해주세요.</p>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</form>'

    $(window).ready(function() {

        var stanbymeList = {
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.stanbyme');

                    vcui.require(['ui/pagination'], function () {
                        self.$qnaTab = $contents.find('#prod1');
                        self.$pagination = $contents.find('.pagination').vcPagination({scrollTop : 'noUse' });
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

                // lgkorUI.showLoading();
                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                    var html = '',
                        data = d.data,
                        page = d.pagination;

                        // page = $.extend(page , {
                        //     scrollTarget : self.$pagination 
                        // })

                    self.$sortTotal.html(page.dataCount);

                    self.$listWrap.find('tbody').find('tr').not( self.$noData).remove();

                    if (data.length) {
                        data.forEach(function(item) {
                            item.hitCnt = "" + item.hitCnt;
                            html += vcui.template(listTmpl, item);
                        });
                        self.$listWrap.find('tbody').prepend(html);
                        self.$noData.hide();
                    } else {
                        self.$noData.show();
                    }


                    console.log("페이지네이션 %o",page);
                    self.$pagination.vcPagination('setPageInfo', page);
                    // lgkorUI.hideLoading();
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

                    self.$btnCancel = $('.btn-cancel');
                    self.$btnConfirm = $('.btn-confirm');
                    self.$listWrap = self.$commentWrap.find('.comment-list ul');
                    self.$pagination = self.$commentWrap.find('.pagination').vcPagination({scrollTop : 'noUse' });
                    var isNoComment = self.$listWrap.find('>li>div').hasClass('no-comment')

                    if(isNoComment) {
                        self.$pagination.hide();

                    }


                    self.$pagination = self.$commentWrap.find('.pagination').vcPagination();

                    var isNoComment = self.$listWrap.find('>li>div').hasClass('no-comment')

                    if(isNoComment) {
                        self.$pagination.hide();

                    }


                    self.params = {
                        'page': 1
                    };

                    self.bindEvent();




                });

            },
            settingList: function() {
                var self = this,
                    url = self.$commentWrap.data('ajax');

                    if(url) {
                        lgkorUI.showLoading();
                        lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                            var html = '',
                                data = d.data,
                                page = d.pagination;


                                console.log("d %o",d);
        
                            self.$listWrap.empty();
        
                            if (data.length) {
                                data.forEach(function(item) {
                                    html += vcui.template(commentList, item);
                                });
                                self.$listWrap.prepend(html);
                                $('.comment-head .count').text(d.dataCount);
                            }

                            self.$pagination.vcPagination('setPageInfo', page);
                            self.$pagination.off('page_click').on('page_click', function(e,page) {
                                self.pageClick(this,page);
                            });


                            self.bindEvent();
                            lgkorUI.hideLoading();
                        });
                    }

  
            },
            bindEvent: function() {
                var self = this;

                // pagination click event
                self.$pagination.off('page_click').on('page_click', function(e,page) {
                    self.pageClick(this,page);
                });

                 // 댓글 쓰기폼 등록/수정 버튼
                self.$btnConfirm.off().on('click', function() {
                    self.requestCmtWrite(this);
                });


                // 댓글 쓰기폼 취소 버튼
                self.$btnCancel.off().on('click', function(){
                    self.cmtCancel(this)
                });


                // 댓글 쓰기폼 등록 / 수정 인풋 입력 체크
                // $('.input-wrap textarea').off().on('change keyup paste', function(){
                //     inpValLen = $(this).val().length;
                //     if(inpValLen > 0) {
                //         $(this).addClass('valid');
                //     } else{
                //         $(this).removeClass('valid');
                //     }
                // });



                // 댓글 수정 버튼
                $('.btn-comment-modify').on('click', function(e){
                    var $self = $(this),
                        $parent = $self.closest('.comment-content'),
                        $commentTextWrap = $parent.find('.comment-text-wrap'),
                        $infoData = $parent.find('.info-date'),
                        $commentBtnBox = $parent.find('.comment-btn-box'),
                        $writeCont = $commentTextWrap.find('.comment-text p').text();

                        $commentTextWrap.hide();
                        $infoData.hide();
                        $commentBtnBox.hide();
                        $parent.append(
                            vcui.template(commentModifyForm, {
                                'writeCont' : $writeCont
                            })
                        );
                        
                        $parent.find('.btn-confirm').off().on('click', function() {
                            self.requestCmtWrite(this);
                        });


                        $parent.find('.btn-cancel').off().on('click', function() {
                            self.cmtCancel(this);
                        });


                        $parent.find('.ui_textcontrol').vcTextcontrol();


                });


                //댓글 삭제 버튼 클릭시
                $('.btn-comment-del').off().on('click', function(e){
                    var el = this;
         
                    lgkorUI.confirm('', {
                        title:'댓글을 삭제하시겠습니까?', 
                        cancelBtnName: '아니오', okBtnName: '예', 
                        ok : function (){ 

                            self.requestCmtDelete(el);
                        }
                    });
                });
            },


            // 페이지네이션 클릭 실행 함수

            pageClick: function(el,page) {
                var self = this;


                console.log("pageClick %o %o",el,page)
    
                self.params = $.extend({}, self.params, {
                    'page': page
                });
                self.settingList();


            },

            // 코멘트 등록/수정 비동기 호출
            requestCmtWrite : function(el){
                var self = this;
                var $commentWrite = $(el).closest('.comment-write');

                // var url = $commentWrite.data('ajax');

                var clubId = $(el).closest('.comment-content').data('clubId'); 

                var mode = clubId ? 'modify' : 'write';

                    if(mode == 'write') {
                        var url = '/mkt/api/stanbyMe/insertStanbyMeDAjax';
                        var params = {
                            'clubMId' : lgkorUI.getParameterByName('clubMId') ,
                            'contents' : $commentWrite.find('textarea').val()
                        }

                    } else {
                        var url = '/mkt/api/stanbyMe/updateStanbyMeDAjax';

                        var params = {
                            'clubDId' : clubId,
                            'contents' : $commentWrite.find('textarea').val()
                        }

                    }
              
                    if(url) {
                        // lgkorUI.showLoading();
                        lgkorUI.requestAjaxDataPost(url, params, function(data) {
    
                            console.log("res %o %o",url,data);
    
                            if(data.status === 'success') {
                                if(mode == 'write') {
                                    console.log('댓글 등록 성공')
                                    self.params.page = 1;
                                    self.settingList();
                                } else {
                                    console.log('댓글 수정 성공')
                                    // self.params.page = 1;
                                    self.settingList();
                                }
                            } else {
                                lgkorUI.alert("", {
                                    title: data.message
                                });
                            }
                        });
                    }

            },

            // 댓글 쓰기폼 취소 함수
            cmtCancel: function(el) {
                var self = this;


                var isCmtModify = $(el).closest('.comment-write').data('ajax') === '/mkt/api/stanbyMe/updateStanbyMeDAjax' ;

                console.log("cancel %o",self.$btnCancel);

                var meInp = $(el).parents('.input-wrap');
                    meInp.find('textarea').removeClass('valid');
                    meInp.find('.inner-text em').text('0');

                    $parent = $(el).closest('.comment-content'),
                    $commentTextWrap = $parent.find('.comment-text-wrap'),
                    $infoData = $parent.find('.info-date'),
                    $commentBtnBox = $parent.find('.comment-btn-box'),

                    $commentTextWrap.show();
                    $infoData.show();
                    $commentBtnBox.show();


                if(isCmtModify) {
                    // 코멘트 수정 박스 삭제
                    $parent.find('form').remove();
                    $parent.find('.ui_textcontrol').vcTextcontrol('destroy');
                }
            },

            // 댓글 삭제 비동기 호출
            requestCmtDelete: function(el) {
                var self = this;
                var clubDId  = $(el).closest('.comment-content').data('clubId');

                console.log("res %o %o",$(el),clubDId);

                lgkorUI.requestAjaxDataPost("/mkt/api/stanbyMe/deleteStanbyMeDAjax", { 'clubDId' : clubDId }, function(data) {

                    console.log("res %o ",data);

                    if(data.status === 'success') {
         
                        console.log('댓글 삭제 성공')
        
                        self.settingList();
        
                    } else {
                        lgkorUI.alert("", {
                            title: data.message
                        });
                    }
                });
            }
    
        };

        if($('.contents.stanbyme .visual-wrap').length > 0){
            stanbymeList.init();
        }else if($('.contents.stanbyme .stanbyme-detail').length > 0){
            stanbymeCommentList.init();
        }

        //리스트 수정완료 버튼 클릭시
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

        //댓글 수정 버튼 클릭시
        // var commentModify = function(){
        //     $('.btn-comment-modify').on('click', function(e){
        //         var $self = $(this),
        //             $parent = $self.closest('.comment-content'),
        //             $commentTextWrap = $parent.find('.comment-text-wrap'),
        //             $infoData = $parent.find('.info-date'),
        //             $commentBtnBox = $parent.find('.comment-btn-box'),
        //             $writeCont = $commentTextWrap.find('.comment-text p').text();

        //         $commentTextWrap.remove();
        //         $infoData.remove();
        //         $commentBtnBox.remove();
        //         $parent.append(commentModifyForm).closest('.comment-content .textarea').text($writeCont);
        //     });
        // };
        // commentModify();

        //댓글 등록 버튼 클릭시
        // var btnWriteFunc = function(){
        //     $('.comment-write .btn-confirm').on('click', function(e){
        //         var $commentWrite = $('.comment-write'),
        //             url = $commentWrite.data('ajax');

        //         var commentParam = {};
        //         commentParam.value = $('textarea').val();

        //         lgkorUI.requestAjaxDataPost(url, commentParam, function(d) {
        //             if(d.status == 'success'){
        //                 commentParam = $.extend({}, params, {
        //                     'testSucFlag': "Y"
        //                 });
        //             }else{
        //                 commentParam = $.extend({}, commentParam, {
        //                     'testSucFlag': "N"
        //                 });
        //                 lgkorUI.alert("",{title:d.message});
        //             }
        //             self.bindEvent();
        //             lgkorUI.hideLoading();
        //         },true);
        //     });
        // };
        // btnWriteFunc();



      

    });
})();
