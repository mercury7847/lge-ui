(function (){
    // 변수 선언 / 템플릿 처리 / api 스크립트 구현

    var qnaListTmpl =
    '<li class="lists">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="badge active">{{ statusBadge }}</span>' + // active 클래스 답변완료일때,
                '<span class="title line2">{{ title }}</span>' +
                '<span class="writer"> {{ writer }} </span>' +
                '<span class="date"> {{ date }} </span>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="accord-cont ui_accord_content" style="display:none;">' +
            '<div class="que-box">' +
                '<div>' +
                    '<span class="que tit">Q</span>' +
                    '<p class="desc">' +
                        '{{ descQText }}' +
                    '</p>' +
                    '<div class="img-wrap">' +
                        //img 최대 4개까지 등록 가능 - s
                        '<img src="{{ qnaimg1 }}" alt="">' +
                        '<img src="{{ qnaimg2 }}" alt="">' +
                        '<img src="{{ qnaimg3 }}" alt="">' +
                        '<img src="{{ qnaimg4 }}" alt="">' +
                        //img 최대 4개까지 등록 가능 - e
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="ans-box">' +
                '<div>' +
                    '<span class="ans tit">A</span>' +
                    '<p class="desc">' +
                        '{{ descAText }}'
                    '</p>' +
                '</div>' +
                '<div class="ans-date-wrap">' +
                    '답변일 <span class="ans-date">{{ ansDate }}</span>' +
                '</div>' +
            '</div>' +
            '<div class="btn-wrap">' +
                // 삭제버튼은 답변대기/완료 모두 화면에 활성화, 답변완료 상태되면 삭제버튼만 활성화 되도록 구현! - S
                '<a class="btn-modify" href="javascript:;">수정</a>' +
                '<a class="btn-delete" href="javascript:;">삭제</a>' +
            '</div>' +
        '</div>' +
    '</li>';

    var qnaModifyPopTmpl =
    '<article id="popup-modify" class="popup-wrap">' +
        '<header class="pop-header">' +
            '<h1 class="tit">' +
                '<span>문의하기</span>' +
            '</h1>' +
        '</header>' +
        '<section class="pop-conts contents qna">' +
            '<div class="inner">' +
                '<div class="qna-write">' +
                    '<form action="" method="post" id="submitForm" data-ajax="" novalidate>' +
                        '<div class="section">' +
                            '<div class="section-box">' +
                                '<div class="form-wrap">' +
                                    '<div class="forms">' +
                                        '<div class="conts">' +
                                            '<div class="sect-wrap" id="type_desc">' +
                                                '<div class="form-wrap">' + 
                                                    '<dl class="forms">' +
                                                        '<dd class="conts">' +
                                                            '<div class="select-wrap half">' +
                                                                '<select class="ui_selectbox" id="qnaType">' +
                                                                    '<option value="" class="placeholder">문의 유형을 선택해주세요</option>' +
                                                                    '<option value="1">1</option>' +
                                                                    '<option value="2">2</option>' +
                                                                    '<option value="3">3</option>' +
                                                                    '<option value="4">4</option>' +
                                                                    '<option value="5">5</option>' +
                                                                '</select>' +
                                                            '</div>' +
                                                        '</dd>' +
                                                    '</dl>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="text-form">' +
                                                '<div class="input-wrap">' +
                                                    '<input type="text" name="title" id="title" class="ui_textcontrol" placeholder="문의 제목을 입력해주세요. " maxlength="50" data-limit="50" data-count-target="#txt-count1" data-error-msg="제목을 입력해주세요." data-required="true" required>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="btm-more err-block">' +
                                                '<p class="err-msg"></p>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="forms">' +
                                        '<div class="conts">' +
                                            '<div class="text-form">' +
                                                '<div class="input-wrap">' +
                                                    '<textarea name="content" id="content" class="ui_textcontrol" placeholder="개인정보 보호를 위해 연락처, 이메일 등 개인정보는 남기지 말아주세요. 욕설, 비방, 홍보 등 제품과 무관한 내용은 별도 통보 없이 삭제될 수 있습니다." maxlength="200" data-limit="200" data-count-target="#txt-count2" data-error-msg="내용을 입력해주세요." data-required="true" required></textarea>' +
                                                    '<span id="txt-count2" class="inner-text"><em>0</em>/200자</span>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="btm-more err-block">' +
                                                '<p class="err-msg"></p>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="forms">' +
                                        '<div class="conts">' +
                                            '<div class="image-file-wrap ui_imageinput">' +
                                                '<div class="file-scroll-wrap">' +
                                                    '<div class="file-item">' +
                                                        '<div class="file-image">' +
                                                            '<div class="file-preview"></div>' +
                                                            '<div class="file-btns">' +
                                                                '<input type="file" name="imageFile1" id="imageFile1" accept="image/*">' +
                                                                '<label for="imageFile1" class="btn-upload"><span class="blind">업로드</span></label>' +
                                                                '<button type="button" class="btn-del"><span class="blind">삭제</span></button>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="file-name">' +
                                                            '<input type="text" class="name" placeholder="파일선택" disabled>' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="file-item">' +
                                                        '<div class="file-image">' +
                                                            '<div class="file-preview"></div>' +
                                                            '<div class="file-btns">' +
                                                                '<input type="file" name="imageFile2" id="imageFile2" accept="image/*">' +
                                                                '<label for="imageFile2" class="btn-upload"><span class="blind">업로드</span></label>' +
                                                                '<button type="button" class="btn-del"><span class="blind">삭제</span></button>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="file-name">' +
                                                            '<input type="text" class="name" placeholder="파일선택" disabled>' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="file-item">' +
                                                        '<div class="file-image">' +
                                                            '<div class="file-preview"></div>' +
                                                            '<div class="file-btns">' +
                                                                '<input type="file" name="imageFile3" id="imageFile3" accept="image/*">' +
                                                                '<label for="imageFile3" class="btn-upload"><span class="blind">업로드</span></label>' +
                                                                '<button type="button" class="btn-del"><span class="blind">삭제</span></button>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="file-name">' +
                                                            '<input type="text" class="name" placeholder="파일선택" disabled>' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="file-item">' +
                                                        '<div class="file-image">' +
                                                            '<div class="file-preview"></div>' +
                                                            '<div class="file-btns">' +
                                                                '<input type="file" name="imageFile4" id="imageFile4" accept="image/*">' +
                                                                '<label for="imageFile4" class="btn-upload"><span class="blind">업로드</span></label>' +
                                                                '<button type="button" class="btn-del"><span class="blind">삭제</span></button>' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="file-name">' +
                                                            '<input type="text" class="name" placeholder="파일선택" disabled>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<ul class="bullet-list">' +
                                                '<li class="b-txt">이미지는 최대 4개까지 등록 가능하며, 파일별 용량은 10MB 이하까지 업로드 가능합니다.</li>' +
                                                '<li class="b-txt">이미지명은 특수기호(? ! , . & ^ ~ )를 제외해주세요. (첨부 가능 확장자 jpg, jpeg, png, gif)</li>' +
                                            '</ul>' +
                                        '</div>' +
                                    '</div>' +
                                    '<ul class="bullet-list top-border">' +
                                        '<li class="b-txt">문의하신 내역과 답변은 <span class="underline">마이페이지 > 고객지원 관리 > 나의 글 보기</span>에서 확인 가능합니다.</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</div>' +
            '</div>' +
        '</section>' +
        '<footer class="pop-footer">' +
            '<div class="btn-group">' +
                '<div class="sq-area">' +
                    '<div class="sq-list">' +
                        '<span class="chk-wrap">' +
                            '<input type="checkbox" id="secretQna" name="secret">' +
                            '<label for="secretQna">비밀 글로 문의하기</label>' +
                        '</span>' +
                    '</div>' +
                '</div>' +
                '<button type="button" class="btn pink btn-confirm"><span>등록</span></button>' +
                // 수정 버튼 - 답변 등록되기 전 생성가능 - s
                // <button type="button" class="btn btn-modify" data-id="#modifyConfirm" data-control="modal">등록</button>
                // 수정 버튼 - 답변 등록되기 전 생성가능 - e 
            '</div>' +
        '</footer>' +
        '<button type="button" class="btn-close ui_modal_close"><span class="blind">닫기</span></button>' +
    '</article>';


    

    var qnaPdp = {
        init : function (){
            var self = this;

            vcui.require('ui/pagination', function (){
                self.settings();
                self.bindEvents();

            });
        },
        settings : function (){
            var self = this;
            self.$pdpQna = $('#pdpQna');            

            // QnA 리스트 상단 영역
            self.$totalCount = self.$pdpQna.find('.count');            
            self.$sortingWrap = self.$pdpQna.find('.sorting-wrap');
            self.$sortSelect = self.$sortingWrap.find('.ui_selectbox'); //문의유형 select 정렬
            self.$sortSecChk = self.$sortingWrap.find('.chk-wrap'); //비밀글 제외 체크            
            self.$reqBtn = self.$sortingWrap.find('.ico-req'); //문의하기 버튼

            //Qna LIst
            self.$qnaType = self.$pdpQna.find('.KRP0040');
            self.$qnaList = self.$qnaType.find('ul.qna-result-lists');

            self.$qnaListBadge = self.$qnaType.find('.badge');
            self.$qnaListTitle = self.$qnaType.find('.title');
            self.$qnaListWriter = self.$qnaType.find('.writer');
            self.$qnaListDate = self.$qnaType.find('.date');
            
            self.$queBox = self.$qnaType.find('.que-box');
            self.$queTit = self.$queBox.find('.tit');
            self.$queDesc = self.$queBox.find('.desc');
            self.$queImgWrap = self.$queBox.find('.img-wrap');
            self.$ansBox = self.$qnaType.find('.ans-box');
            self.$ansTit = self.$ansBox.find('.tit');
            self.$ansDesc = self.$ansBox.find('.desc');
            self.$ansDateWrap = self.$ansBox.find('.ans-date-wrap');
            self.$ansDate = self.$ansDateWrap.find('.ans-date');

            self.$modifyBtn = self.$qnaType.find('.modi-btn');
            self.$deleteBtn = self.$qnaType.find('.del-btn');
            
            self.$nodata = self.$pdpQna.find('.no-data-message');
            self.$pagination = self.$pdpQna.find('.pagination').vcPagination();

            //등록하기 팝업
            self.$writePopup = $('#popupWrite');
            self.$writeForm = self.$writePopup.find('#submitForm');
            self.$writeQnaType = self.$writeForm.find('#qnaType');
            self.$writeTitle = self.$writeForm.find('#title');
            self.$writeDesc = self.$writeForm.find('#content');
            self.$imgFileWrap = self.$writeForm.find('.image-file-wrap');
            self.$imgFileAdd1 = self.$imgFileWrap.find('#imageFile1');
            self.$imgFileAdd2 = self.$imgFileWrap.find('#imageFile2');
            self.$imgFileAdd3 = self.$imgFileWrap.find('#imageFile3');
            self.$imgFileAdd4 = self.$imgFileWrap.find('#imageFile4');
            self.$imgFileDel = self.$imgFileWrap.find('.btn-del');
            self.$writeBullet = self.$writeForm.find('.bullet-area');
            self.$myPageLink = self.$writeForm.find('.underline');

            self.$secretChkBtn = self.$writePopup.find('#secretQna');
            self.$confirmBtn = self.$writePopup.find('.btn-confirm');
        },
        bindEvents : function() {
            var self = this;

            // QnA 리스트 : 페이징 선택
            self.$pagination.on('page_click', function(e, data) {
                var categoryId = self.$sortSelect.vcSelectbox('value');
                var secretExcept = self.$sortSecChk.find('input[type=checkbox]:checked').val(); // on , undefined
                self.requestQnaListData({"categoryId":categoryId,"secretExcept":secretExcept,"page": 1});
            });
            
            // QnA 리스트 : selectbox 선택
            self.$sortSelect.on('change', function(e){
                var categoryId = self.$sortSelect.vcSelectbox('value');
                var secretExcept = self.$sortSecChk.find('input[type=checkbox]:checked').val(); // on , undefined
                self.requestQnaListData({"categoryId":categoryId,"secretExcept":secretExcept,"page": 1});
            });

            // QnA 문의하기 : 파일삭제 버튼
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
        // qna-list - get
        requestQnaListData : function(param){
            console.log("QnA List - API request !!");
            var self = this;
            var ajaxUrl = self.$qnaType.data('ajaxUrl');

            lgkorUI.showLoading();
            lgekorUI.requestAjaxData(ajaxUrl, param, function(result){
                if(result.status == "success") {
                    var data = result.data;

                    if(data.listData.length > 0) {
                        //리스트 페이지 노출
                        var html = "";

                        data.listData.forEach(function(item){
                            html += vcui.template(qnaListTmpl, item);
                        })

                        // qna 리스트 문의 건수 999건 초과시 999+
                        if(data.listPage.listCount > 999 ){
                            self.$totalCount.text("999+");
                        } else {
                            self.$totalCount.text(data.listPage.listCount);
                        }
                        self.$qnaList.empty().append(html);
                        self.$pagination.vcPagination('setPageInfo', data.listPage)
                    } else {
                        self.$qnaType.find('.qna-type').hide();
                        self.$qnaType.find('.no-data-message').show();
                    }
                    lgkorUI.hideLoading();
                } else {
                    self.$qnaType.find('.qna-type').hide();
                    self.$qnaType.find('.no-data-message').show();
                    lgkorUI.hideLoading();
                }
            });
        },
        // qna-read-popup - get
        requestQnaReadPop : function(param) {
            console.log("QnA 조회 팝업 - API request !!");
        },
        // qna-write-popup - post
        requestQnaWritePop : function(el) {
            console.log("QnA 문의하기 팝업 - API request !!");
            var self = this;
            var result = self.validation.validate([self.$writeQnaType, self.$writeTitle, self.$wirteDesc]);
                
            var ajaxUrl = self.$writeForm.data('ajaxUrl');

            if(result.success) {
                var param = self.validation.getValues([self.$writeQnaType, self.$writeTitle, self.$wirteDesc]);

                lgkorUI.showLoading();
                lgekorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                    var resultData = result.data;

                    if(resultData) {
                        // ????? 무엇을 넣어야할까 ? data결과값? 정보를 보내고 메시지창만 띄워주면 되는건데,,
                    }
                    
                    lgekorUI.alert("", {
                        title: resultData.resultMessage
                    }, el);

                });
            }


            var dataArray = {

            }

            
        },
        // qna-modify-popup - post
        requestQnaModify :function(param) {
            console.log("QnA 수정하기 팝업 - API request !!");
        },
        // qna-delete-popup - post
        requestQnaDelete :function(param) {
            console.log("QnA 삭제하기 - API request !!");
        },
        
    }


    $(document).ready(function(){
        var qnaWrite = {
            params : {},
            init: function (){
                var self = this;
                self.$writeQnaPopup = $('#popupWrite');
                self.$submitForm = self.$writeQnaPopup.find('#submitForm');
                self.$completeBtn = self.$contents.find('.btn-group');
                self.$fileDelBtn = self.$contents.find('.btn-file-del'); //출처 확인
                self.$secretChkBtn = self.$writePopup.find('#secretQna'); // 비밀글 Chk

                self.url = self.$submitForm.data('ajax');
                self.mode = self.url.indexOf('updateQnaAjax') > -1 ? 'modify' : 'write';

                vcui.require(['ui/validation'], function () {
                    self.validation = new vcui.ui.CsValidation('#submitForm', { 
                        register: {
                            ui_selectbox : {
                                required: true,
                                msgTarget: '.err-block',
                                errorMsg:'문의유형을 선택해주세요'
                            },
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
            bindEvent : function() {
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

                            // 글작성 ,수정시 fileFlag 보내줌
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

        var qnaList = {
            param: {},
            init : function() {
                var self = this;
                self.$pdpQna = $('#pdpQna');
                vcui.require(['ui/pagination'], function () {
                    // QnA 리스트 상단 영역
                    self.$sortsWrap = self.$pdpQna.find('.sorting-wrap');
                    self.$sortTotal = self.$sortsWrap.find('#count');
                    self.$sortSelect = self.$sortsWrap.find('.ui_selectbox'); //문의유형 select 정렬
                    self.$sortSecChk = self.$sortsWrap.find('.chk-wrap'); //비밀글 제외 체크            
                    self.$reqBtn = self.$sortsWrap.find('.ico-req'); //문의하기 버튼

                    self.$qnaType = self.$pdpQna.find('.KRP0040');
                    self.$qnaList = self.$qnaType.find('ul.qna-result-lists');
                    self.$qnaListBadge = self.$qnaType.find('.badge');
                    self.$qnaListTitle = self.$qnaType.find('.title');
                    self.$qnaListWriter = self.$qnaType.find('.writer');
                    self.$qnaListDate = self.$qnaType.find('.date');
                    self.$queBox = self.$qnaType.find('.que-box');
                    self.$queTit = self.$queBox.find('.tit');
                    self.$queDesc = self.$queBox.find('.desc');
                    self.$queImgWrap = self.$queBox.find('.img-wrap');
                    self.$ansBox = self.$qnaType.find('.ans-box');
                    self.$ansTit = self.$ansBox.find('.tit');
                    self.$ansDesc = self.$ansBox.find('.desc');
                    self.$ansDateWrap = self.$ansBox.find('.ans-date-wrap');
                    self.$ansDate = self.$ansDateWrap.find('.ans-date');

                    self.$modifyBtn = self.$qnaType.find('.modi-btn');
                    self.$deleteBtn = self.$qnaType.find('.del-btn');
                    
                    self.$nodata = self.$pdpQna.find('.no-data-message');
                    self.$pagination = self.$pdpQna.find('.pagination').vcPagination();
                    
                    self.params = {
                        'orderType': self.$sortSelect.filter('#orderType').vcSelectbox('value'),
                        'page': 1
                    };

                    self.bindEvent();
                    
                });

            },
            bindEvent: function() {
                var self = this;
                
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
            },
            renderList: function() {
                var self = this,
                    url = self.$qnaType.data('ajax');

                lgkorUI.requestAjaxDataPost(url, self.params, function(d) {
                    var html = '',
                        data = d.data,
                        page = d.pagination;

                    self.$sortTotal.html(page.dataCount);

                    self.$qnaList.find('tbody').find('tr').not( self.$noData).remove();

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

                    self.$pagination.vcPagination('setPageInfo', page);
                });
            }
        }
    })

})();