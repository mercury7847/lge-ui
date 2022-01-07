(function() {
    var listTmpl = 
    '<tr>' +
        '<td class="board-tit">' +
            '<a href="{{url}}">' +
                '{{#if newFlag == "Y" }}' +
                '<div class="flag-wrap bar-type">' +
                    '<span class="flag"><span class="blind">최신 게시글</span>NEW</span>' +
                '</div>' +
                '{{/if}}' +

                // -S- BTOCSITE-8824 스탠바이미 클럽 Q&A게시판 공지  기능 요청
                '{{#if noticeFlag == "Y" }}' +
                '<div class="flag-wrap bar-type">' +
                    '<span class="notice"><span class="blind">공지</span>공지</span>' +
                '</div>' +
                '{{/if}}' +
                // -E- BTOCSITE-8824 스탠바이미 클럽 Q&A게시판 공지  기능 요청

                '<p>{{title}}</p>' +
                '{{#if clubDCount > 0 }}' +
                    '<span class="count">{{clubDCount}}</span>' +
                '{{/if}}' +
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

    $(document).ready(function() {
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

                    // BTOCSITE-8824 스탠바이미 클럽 Q&A게시판 공지 기능 요청 : 비로그인시 URL 이동
                    self.loginFlag = digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.unifyId ? "Y" : "N";
                    if(self.loginFlag == 'N') {
                        lgkorUI.confirm("로그인 후 등록이 가능합니다.<br>로그인 하시겠습니까? ", {
                            title: "",
                            cancelBtnName: "아니오",
                            okBtnName: "네",
                            ok: function(){
                                location.href = "/sso/api/Login";
                            },
                            cancel: function() {
                                location.href = "/story/stanbyme-club/stanbyme-club-list?tab=prod2";
                            }
                        });   
                    }

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
                            individualFlag:true,
                            totalSize: 40 * 1024 * 1024,
                            fileNameSize : 50, // 파일명 최대 50자 이내(.확장자 포함)
                            message: {
                                name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
                                format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                                size: '첨부파일 용량은 10mb 이내로 등록 가능합니다.'
                            }
                        });

                        self.$contents.find('.ui_imageinput input[type="file"]').on('change',function(e) {
                            // 업로드 파일변경시 delete FLAG 가 없고 , 파일이 있는경우 신규 업로드로 간주
                            if($(this).val() !== '' && $(this).data('fileFlag') !== 'delete') {
                                $(this).data('fileFlag','insert');
                            }
                        })
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
                            self.uploadFileDelete(el);
                        }
                    });
                });

            },
            requestWrite: function() {
                var self = this;
                if(self.url) {
                    var param = self.validation.getAllValues();
                    var formData = new FormData();
            
                    for (var key in param) {
                        formData.append(key, param[key]);

                        if(key.indexOf('imageFile') > -1) {
                            var changeFile = key.replace('image','change');

                            // 신규 업로드시 삭제된 파일 체크
                            var $file = $("#"+key);
                            if(!param[key] &&  $file.data('fileFlag') === 'insert') {
                                $file.removeData('fileFlag')
                            } 

                            // 글작서 ,수정시 fileFlag 보내줌
                            formData.append(changeFile, $file.data('fileFlag') );
                        }
                    }

                    lgkorUI.showLoading();
                    lgkorUI.requestAjaxFileData(self.url, formData, function(result) {
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
            uploadFileDelete: function(el) {
                var self = this;
                var $fileItem = $(el).closest('.file-item');
                $fileItem.find("input[type='file']").data('fileFlag','delete');
                $fileItem.find('.file-preview').empty();
                $fileItem.find('.file-name input').prop('placeholder','');
                $fileItem.removeClass('modify');
            }
        };

        var stanbymeList = {
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.stanbyme');

                    self.$tab = $('.ui_tab');
                    self.tabList = ['prod1','prod2'];

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
                        // tab default 처리
                        self.$tab.vcTab('select', lgkorUI.getParameterByName('tab') === 'prod2' ? 1 : 0);
                        
                        // TAB 변경시 마다 URL CHANGE
                        self.$tab.on('tabchange', function(e, data) {
                            var loc = lgkorUI.parseUrl(location.href);
                            var params = $.extend(loc.searchParams.getAll(), {
                                tab : self.tabList[data.selectedIndex]
                            });

                            history.replaceState(null, null, loc.pathname +'?'+ $.param(params));
                        });
                    });

            },
            renderList: function() {
                var self = this,
                    url = self.$qnaTab.data('ajax');

                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                    var html = '',
                        noticeList = d.noticeList, // BTOCSITE-8824 스탠바이미 클럽 Q&A게시판 공지  기능 요청
                        data = d.data,
                        page = d.pagination;

                    self.$sortTotal.html(page.dataCount);

                    self.$listWrap.find('tbody').find('tr').not( self.$noData).remove();

                    // BTOCSITE-8824 스탠바이미 클럽 Q&A게시판 공지  기능 요청
                    if (data.length || noticeList.length) {
                        noticeList.forEach(function(item) {
                            if(!item.clubDCount) item.clubDCount = 0;
                            item.newFlag = "N";
                            item.hitCnt = "" + item.hitCnt;
                            html += vcui.template(listTmpl, item);
                        });
                        data.forEach(function(item) {
                            item.hitCnt = "" + item.hitCnt;
                            html += vcui.template(listTmpl, item);
                        });
                        self.$listWrap.find('tbody').prepend(html);
                        self.$noData.hide();
                    } else {
                        self.$noData.show();
                    }

                    self.$pagination.vcPagination('setPageInfo', page);
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
                    self.renderList();
                });

                self.$pagination.on('page_click', function(e,page) {
                    self.params = $.extend({}, self.params, {
                        'page': page
                    });
                    self.renderList();
                });
            }
        };

        var stanbymeDetail = {
            params: {},
            init: function() {
                var self = this,
                    $contents = $('.contents.stanbyme');
                 // 삭제된글 일경우 처리
                 if($contents.find("input[name='detailDeleteFlag']").length > 0 && $contents.find("input[name='detailDeleteFlag']").val() === 'Y'){
                    self.goList();
                    return;
                 } else {
                    // 글 존재할경우
                    vcui.require(['ui/pagination'], function () {
                        self.$commentWrap = $contents.find('.comment-wrap');
                        
                        self.$delPopup =  $('#delPopup');
                        self.$btnDel =  $('[data-href="#delPopup"]');
    
                        self.$btnCancel = $('.btn-cancel');
                        self.$btnConfirm = $('.btn-confirm');
                        self.$listWrap = self.$commentWrap.find('.comment-list ul');
                        self.$pagination = self.$commentWrap.find('.pagination').vcPagination({scrollTop : 'noUse' });
                        var isNoComment = self.$listWrap.find('>li>div').hasClass('no-comment')
    
                        if(isNoComment) self.$pagination.hide();
    
                        self.params = {
                            'page': 1
                        };
    
                        self.bindEvent();
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
                self.params = $.extend({}, self.params, {
                    'page': page
                });
                self.requestCmtList();
            },

            // 코멘트 리스트 
            requestCmtList: function() {
                var self = this,
                    url = self.$commentWrap.data('ajax');

                    if(url) {
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

                            $('.comment-head .count').text(d.dataCount);

                            self.$pagination.vcPagination('setPageInfo', page);                            
                            if(d.dataCount !== 0) self.$pagination.show();
                            else  self.$pagination.hide();

                            self.bindEvent();
                            lgkorUI.hideLoading();
                        });
                    }
            },
            // 코멘트 등록/수정 비동기 호출
            requestCmtWrite : function(el){
                var self = this;
                var $commentWrite = $(el).closest('.comment-write');
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
                            'clubMId' : lgkorUI.getParameterByName('clubMId') ,
                            'clubDId' : clubId,
                            'contents' : $commentWrite.find('textarea').val()
                        }
                    }

                    if(url && !!params.contents.replace(/\s/g, "")) {
                        lgkorUI.requestAjaxDataPost(url, params, function(data) {
                            if(data.status === 'success') {
                                if(mode == 'write') self.params.page = 1;

                                self.requestCmtList();
                                $commentWrite.closest('form')[0].reset();
                                self.$btnCancel.trigger('click');
                            } else {

                                // 삭제된 게시물인경우 게시판 리스트 이동
                                if(data.message === '삭제된 게시물 입니다.') {
                                    self.goList();
                                } else {
                                    // 로그인 오류인경우 로그인 url  이동
                                    lgkorUI.confirm('', {
                                        title:data.message, 
                                        cancelBtnName: '아니오', okBtnName: '예', 
                                        ok : function (){ 
                                            location.href = "/sso/api/Login";
                                        }
                                    });
                                }
      
                            }
                        },'POST','json',true);
                    } else {
                        $commentWrite.find('textarea').val('');
                        $commentWrite.find('textarea').focus();
                    }
            },

            // 댓글 쓰기폼 취소 함수
            requestCmtCancel: function(el) {
                var self = this;
                var isCmtModify = $(el).closest('.comment-write').data('ajax') === '/mkt/api/stanbyMe/updateStanbyMeDAjax' ;

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

                lgkorUI.requestAjaxDataPost("/mkt/api/stanbyMe/deleteStanbyMeDAjax", { 'clubDId' : clubDId }, function(data) {
                    if(data.status === 'success') {
                        self.requestCmtList();
                        $commentWrite.closest('form')[0].reset();
                        self.$btnCancel.trigger('click');
                    } else {
                        lgkorUI.alert("", {
                            title: data.message
                        });
                    }
                });
            },
            goList: function() {
                lgkorUI.alert('', {
                    title:'삭제된 게시물 입니다.', 
                    ok : function (){ 
                        location.href = "/story/stanbyme-club/stanbyme-club-list?tab=prod2";
                    }
                });
            }
        };

        if($('.contents.stanbyme .visual-wrap').length > 0){ // 리스트
            stanbymeList.init();
        }else if($('.contents.stanbyme .stanbyme-detail').length > 0){  // 상세 
            stanbymeDetail.init();
        } else {
            stanbymeWrite.init();
        }
    });
})();
