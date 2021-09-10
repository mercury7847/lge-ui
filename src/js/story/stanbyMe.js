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
        var stanbymeWrite = {
            params: {},
            init: function() {
                var self = this;
                    self.$contents = $('.contents.stanbyme');
                    self.$submitForm = self.$contents.find('#submitForm');
                    self.$completeBtns = self.$contents.find('.btn-group');
                    self.$fileDelBtn = self.$contents.find('.btn-file-del'); 

                    self.url = self.$submitForm.data('ajax');
                    self.mode = self.url.indexOf('updateStanbyMeAjax') > -1 ? 'modify' : 'write';


                    vcui.require(['ui/validation'], function () {
                        self.validation = new vcui.ui.CsValidation('#submitForm', { 
                            register: {
                                title: {
                                    required: true,
                                    msgTarget: '.err-block',
                                    errorMsg: '제목을 입력해주세요.'
                                },
                                content: {
                                    required: true,
                                    msgTarget: '.err-block',
                                    errorMsg: '내용을 입력해주세요.'
                                }
                            }
                        });

                        self.$contents.find('.ui_imageinput').vcImageFileInput({
                            message: {
                                name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
                                format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                                size: '첨부파일 용량은 10mb 이내로 등록 가능합니다.'
                            }
                        });

                        self.bindEvent();
                    });
            },
            bindEvent: function() {
                var self = this;
                self.$completeBtns.find('.btn-confirm,.btn-modify').on('click', function() {
                    var result = self.validation.validate();
    
                    if (result.success == true) {    
                        lgkorUI.confirm('', {
                            title:self.mode === 'write' ? '저장 하시겠습니까?' : '게시물을 수정하시겠습니까?',
                            okBtnName:self.mode === 'write' ? '확인' : '예',
                            cancelBtnName: self.mode === 'write' ? '취소' :'아니오',
                            ok: function() {
                                self.requestWrite();
                            }
                        });       
                    }
                });

                self.$fileDelBtn.on('click',function(){
                    var el = this;
                    lgkorUI.confirm('', {
                        title:'삭제하시겠습니까?', 
                        cancelBtnName: '아니오', okBtnName: '예', 
                        ok : function (e,data){ 
                            self.requestFileDelete(el);
                        }
                    });
                });

            },
            requestWrite: function() {
                var self = this;
                if(self.url) {

                    console.log("mode %o",self.mode);


                    var param = self.validation.getAllValues();
                    var formData = new FormData();
           
                    for (var key in param) {
                        formData.append(key, param[key]);
                    }
        
                    lgkorUI.showLoading();

                    lgkorUI.requestAjaxFileData(self.url, formData, function(result) {


                        console.log("write %o",result);
        
                        if (result.status == 'success') {
                            if(result.returnUrl) location.href = result.returnUrl;
                        } else {
                            lgkorUI.hideLoading();
                            if (result.message) {
                                lgkorUI.alert("", {
                                    title: result.message,
                                    ok: function(){
                                        location.href = "/sso/api/Login";
                                    }
                                });
                            }
                        }
                    }, 'POST', 'json',true);
                }
            },
            // 글 수정시 파일 삭제 함수
            requestFileDelete: function(el) {
                var self = this;

                console.log("삭제 버튼 테스트 %o",this);
                    
                var url = $(el).data('href');
                if(url){
                    console.log("url %o ",url);
                    lgkorUI.requestAjaxData(url,'', function(result) {
                        if(result.status === 'success') {
                            $(el).closest('.file-image').find('.file-preview').empty();
                            $(el).closest('.file-item').removeClass('modify');
                        } else {
                            lgkorUI.alert("", {
                                title: result.message
                            });
                        }
                    });
                }
            }
        };



        var stanbymeList = {
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.stanbyme');

                    self.$tab = $('.ui_tab');
                    self.tabList = ['#prod1','#prod2'];

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

                        //  Q&A 탭으로 이동
                        self.$tab.on('tabchange', function(e, data) {
                            e.preventDefault();
                            location.hash = self.tabList[data.selectedIndex];
                        })

                        $(window).on('hashchange', function () {
                            if(location.hash) {
                                self.$tab.vcTab('select', self.tabList.indexOf(location.hash));
                            }
                        });

                        if(!location.hash) { location.hash = self.tabList[0]; }
                        if(location.hash === '#prod2') {
                            $(window).trigger('hashchange');
                        }

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
                    
                    self.$delPopup =  $('#delPopup');
                    self.$btnDel =  $('[data-href="#delPopup"]');

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
                            } 

                            $('.comment-head .count').text(d.dataCount);


                            console.log("count %o %o",d.dataCount,typeof d.dataCount);

                            self.$pagination.vcPagination('setPageInfo', page);                            
                            if(d.dataCount !== 0) self.$pagination.show();
                            else  self.$pagination.hide();

                            self.bindEvent();
                            lgkorUI.hideLoading();
                        });
                    }

  
            },
            bindEvent: function() {
                var self = this;

                // 글 삭제 버튼
                self.$btnDel.off().on('click',function() {
                    self.$delPopup.vcModal();
                });

                // 글 삭제 팝업 "예" 버튼
                self.$delPopup.find('[data-role="ok"]').on('click',function(e) {
                    var url = $(this).data('href');
                    if(url){
                        console.log("url %o ",url);
                        lgkorUI.requestAjaxData(url,'', function(result) {
                            if(result.status === 'success') {
                                if(result.returnUrl) location.href = result.returnUrl;
                            } else {
                                lgkorUI.alert("", {
                                    title: result.message
                                });
                            }
                        });
                    }
                });

                // pagination click event
                self.$pagination.off('page_click').on('page_click', function(e,page) {
                    self.pageClick(this,page);
                });

                 // 댓글 쓰기폼 등록/수정 버튼
                self.$btnConfirm.off().on('click', function() {
                    console.log('댓글 스기');
                    self.requestCmtWrite(this);
                });


                // 댓글 쓰기폼 취소 버튼
                self.$btnCancel.off().on('click', function(){
                    self.requestCmtCancel(this)
                });


                // 댓글 쓰기폼 등록 / 수정 인풋 입력 체크
                $('.input-wrap textarea').off('change.cmtList keyup.cmtList paste.cmtList').on('change.cmtList keyup.cmtList paste.cmtList', function(){
                    inpValLen = $(this).val().length;
                    if(inpValLen > 0) {
                        $(this).addClass('valid');
                    } else{
                        $(this).removeClass('valid');
                    }
                });



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
                            self.requestCmtCancel(this);
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
                                $commentWrite.closest('form')[0].reset();
                            } else {

                                lgkorUI.confirm('', {
                                    title:data.message, 
                                    cancelBtnName: '아니오', okBtnName: '예', 
                                    ok : function (){ 
                                        location.href = "/sso/api/Login";
                                    }
                                });
                            }
                        },'POST','json',true);
                    }

            },

            // 댓글 쓰기폼 취소 함수
            requestCmtCancel: function(el) {
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
                        $commentWrite.closest('form')[0].reset();
        
                    } else {
                        lgkorUI.alert("", {
                            title: data.message
                        });
                    }
                });
            }
    
        };

        if($('.contents.stanbyme .visual-wrap').length > 0){ // 리스트
            console.log('sdfsdfsd');
            stanbymeList.init();
        }else if($('.contents.stanbyme .stanbyme-detail').length > 0){  // 상세 
            stanbymeCommentList.init();
        } else {
            stanbymeWrite.init();

        }
    });
})();
