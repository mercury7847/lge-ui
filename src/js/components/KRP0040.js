(function (){
    var qnaListTmpl = 
    '<li class="lists">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="badge active">{{ statusBadge }}</span>' + 
                '<span class="title line1">{{ title }}</span>' +
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
                        '{{#each imgItem in qnaimg }}' +
                        '<img src="{{ imgItem.url }}" alt="img">' +
                        '{{/each}}'+
                    '</div>' +
                '</div>' +
            '</div>' +
            '{{# if(statusBadge == "답변완료") }} ' +
            '<div class="ans-box">' +
                '<div>' +
                    '<span class="ans tit">A</span>' +
                    '<p class="desc">' +
                        '{{ descAText }}' + 
                    '</p>' +
                '</div>' +
                '<div class="ans-date-wrap">' +
                    '답변일 <span class="ans-date">{{ ansDate }}</span>' +
                '</div>' +
            '</div>' +
            '{{/if}}' +
            '<div class="btn-wrap">' +
                '{{# if(statusBadge == "답변대기") }} ' + 
                '<button class="modi-btn" type="button" data-href="#popupWrite" data-control="modal">수정</button>' +
                '{{/if}}' +
                '<button class="del-btn" type="button" >삭제</button>' +
            '</div>' +
        '</div>' +
    '</li>';

    var qnaPdp = {
        init : function (){
            var self = this;

            vcui.require(['ui/pagination'], function (){
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
            self.$myPageLink = self.$writeForm.find('.underline');

            self.$completeBtn = self.$writeForm.find('.btn-group');
            self.$fileDelBtn = self.$writeForm.find('.btn-file-del'); //출처 확인
            
            self.$secretChkBtn = self.$writePopup.find('#secretQna');
            self.$confirmBtn = self.$writePopup.find('.btn-confirm');
        },
        bindEvents : function() {
            var self = this;
            
            // 에러나는 원인 찾기 - 설근
            //self.mode = self.url.indexOf('updateQnaAjax') > -1 ? 'modify' : 'write';
            self.mode = 'write';

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
            
            self.$completeBtn.find('.btn-confirm,.btn-modify').on('click', function() {
                var result = self.validation.validate();
                if (result.success == true) {    
                    lgkorUI.confirm('', {
                        title:self.mode === 'write' ? '저장 하시겠습니까?' : '게시물을 수정하시겠습니까?',
                        okBtnName:self.mode === 'write' ? '확인' : '예',
                        cancelBtnName: self.mode === 'write' ? '취소' :'아니오',
                        ok: function() {
                            self.requestQnaWritePop();
                        }
                    });       
                }
            });
            //문의하기 
            self.$reqBtn.on('click', function(){
                var loginChk = self.$qnaType.attr("data-login-flag");
                console.log("loginChk 초기값 " + loginChk)
                if(loginChk == 'Y'){
                    var location = self.$reqBtn.attr('data-href','#popupWrite');
                    location.href = location;
                } else {
                    console.log("로그인 체크값 : " + loginChk);
                    lgkorUI.confirm('', {
                        title:'로그인 후 등록이 가능합니다.<br>로그인 하시겠습니까?', 
                        cancelBtnName: '아니오', okBtnName: '예', 
                        ok : function (){ 
                            window.location.href = "/sso/api/Login";
                        }
                    });
                    
                }
            });

            //파일삭제하기 - 문의글 수정시
            self.$fileDelBtn.on('click',function(){
                var el = this;
                lgkorUI.confirm('', {
                    title:'삭제하시겠습니까?', 
                    cancelBtnName: '아니오', okBtnName: '예', 
                    ok : function (e,data){ 
                        self.uploadFileDelete();
                    }
                });
            });
            //삭제하기
            self.$deleteBtn.on('click', function(){
                var el = this;
                lgkorUI.confirm('', {
                    title:'게시물을 삭제하시겠습니까? <br> 답변이 작성된 경우 답변도 같이 삭제됩니다.', 
                    cancelBtnName: '아니오', okBtnName: '예', 
                    ok : function (){ 
                        self.requestQnaDelete();
                    }
                }); 
            });

            //수정하기
            self.$modifyBtn.on('click', function(){
                var el = this;
                self.requestQnaReadPop(); //qna read popup
            });
        },
        // qna-list - get
        requestQnaListData : function(param){
            console.log("QnA List - API request !!");
            console.log(param);
            var self = this;
            var ajaxUrl = self.$qnaType.data('ajax');

            lgkorUI.showLoading();
            lgkorUI.requestAjaxData(ajaxUrl, param, function(result){
                if(result.status == "success") {
                    var data = result.data;

                    if(data.listData.length > 0) {
                        //리스트 페이지 노출
                        var html = "";

                        data.listData.forEach(function(item){
                            html += vcui.template(qnaListTmpl, item);
                        });

                        // qna 리스트 문의 건수 999건 초과시 999+
                        if(data.listPage.listCount > 999 ){
                            self.$totalCount.text("999+");
                        } else {
                            self.$totalCount.text(data.listPage.listCount);
                        }
                        self.$qnaList.empty().append(html);
                        self.$pagination.vcPagination('setPageInfo', data.listPage)
                    } else {
                        self.$qnaType.find('.qna-result-lists').hide();
                        self.$nodata.show();
                    }
                    lgkorUI.hideLoading();
                } else {
                    self.$qnaType.find('.qna-result-lists').hide();
                    self.$nodata.show();
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
            var self = this;            
            self.url = self.$writeForm.data('ajax');            

            vcui.require(['ui/validation'], function () {
                self.validation = new vcui.ui.CsValidation('#submitForm', { 
                    register: {
                        orderType : {
                            required: true,
                            msgTarget: '.err-block',
                            errorMsg:'문의유형을 선택해주세요.'
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

                self.$writeForm.find('.ui_imageinput').vcImageFileInput({
                    individualFlag:true,
                    totalSize: 40 * 1024 * 1024,
                    message: {
                        name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
                        format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                        size: '첨부파일 용량은 10mb 이내로 등록 가능합니다.'
                    }
                });

                self.$writeForm.find('.ui_imageinput input[type="file"]').on('change',function(e) {
                    // 업로드 파일변경시 delete FLAG 가 없고 , 파일이 있는경우 신규 업로드로 간주
                    if($(this).val() !== '' && $(this).data('fileFlag') !== 'delete') {
                        $(this).data('fileFlag','insert');
                    }
                })
            });

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
                        if(result.returnUrl) location.href = result.returnUrl; // popup창 닫히고 
                        lgkorUI.hideLoading();
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
        // qna-modify-popup - post
        requestQnaModify :function(param) {
            console.log("QnA 수정하기 팝업 - API request !!");
            var self = this;
            self.url = self.$writeForm.data('updateAjax');
        },
        // qna-delete-popup - post
        requestQnaDelete :function(param) {
            console.log("QnA 삭제하기 - API request !!");
            var self = this;
            self.url = self.$writeForm.data('deleteAjax');
            
            

            lgkorUI.requestAjaxDataPost(self.url)


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

    qnaPdp.init();
})();