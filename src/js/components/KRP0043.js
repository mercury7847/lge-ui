(function (){
    var noticeListTmpl = 
    '<li class="lists notice" data-noticeid="{{ noticeId }}" data-noticetype="{{ noticeType }}">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="badge active notice">공지</span>' + 
                '<span class="title line1">{{ noticeTitle }}</span>' +
                '<div class="info-wrap">' +
                    '<span class="writer"> {{ creationName }} </span>' +
                    '<span class="date"> {{ creationDate }} </span>' +
                '</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="accord-cont ui_accord_content" style="display:none;">' +
            '<div class="que-box notice">' +
                '<div>' +
                    '<p class="desc">' +
                        '{{ noticeContent }}' +
                    '</p>' +
                    '{{#if !!noticeImagePath}}' +
                    '<div class="img-wrap">' +
                        '<img src="{{ noticeImagePath }}" alt="">' +
                    '</div>' +
                    '{{/if}}'
                '</div>' +
            '</div>' +
        '</div>' +
    '</li>';

    var qnaListTmpl = 
    '<li class="lists" data-que-no="{{ questionNo }}" data-secret-flag="{{secret}}" data-current-flag="{{currentSecret}}" data-blocked="{{blocked}}">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn {{#if (enabled == "Y")}}ui_accord_toggle{{/if}}" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="badge {{#if (answered == "Y") }}active{{/if}}">{{#if (answered == "Y") }}답변완료{{/if}}{{#if (answered == "N") }}답변대기{{/if}}</span>' + 
                '<span class="title line1{{#if (secret == "Y") && (blocked == "N") }} on{{/if}}{{#if (blocked == "Y") }} hide{{/if}}">' +
                '{{#if (secret == "Y") && (blocked == "N") }}비밀글입니다{{#else}}{{ questionTitle }}{{/if}}' +
                '</span>' +
                '<div class="info-wrap">' + 
                    '<span class="writer">{{ creationUserName }}</span>' +
                    '<span class="date">{{ creationDate }}</span>' +
                '</div>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="accord-cont ui_accord_content" style="display:none;">' +
            '<div class="que-box">' +
                '<div>' +
                    '<span class="que tit">Q</span>' +
                    '<p class="desc">' +
                        '{{ questionContent }}' +
                    '</p>' +
                    '{{#if files.length > 0}}' +
                    '<div class="img-wrap">' +
                        '{{#each item in files }}' +
                        '<img src="{{ item.filePath }}" alt="{{ item.fileName }}">' +
                        '{{/each}}'+
                    '</div>' +
                    '{{/if}}' +
                '</div>' +
            '</div>' +
            '{{#if (answered == "Y") }} ' +
            '<div class="ans-box">' +
                '<div>' +
                    '<span class="ans tit">A</span>' +
                    '<p class="desc">' +
                        '{{ answerContent }}' + 
                    '</p>' +
                '</div>' +
                '<div class="ans-date-wrap">' +
                    '답변일 <span class="ans-date">{{ answerDate }}</span>' +
                '</div>' +
            '</div>' +
            '{{/if}}' +
            '<div class="btn-wrap">' +
                '{{#if (editable == "Y") }} ' + 
                '<button class="modi-btn" type="button" data-href="" data-control="modal" data-name="modify">수정</button>' + 
                '{{/if}}' +
                '{{#if (deletable == "Y") }} ' + 
                '<button class="del-btn" type="button" data-name="delete">삭제</button>' +
                '{{/if}}'
            '</div>' +
        '</div>' +
    '</li>';




    var qnaPdp = {
        init : function (){
            loginFlag = digitalData.hasOwnProperty("userInfo") && digitalData.userInfo.unifyId ? "Y" : "N";
            
            var self = this;
            var isUrl = document.location.search;
            var componentChk = document.getElementById("pdp_qna"); //BTOCSITE-11299 추가
            
            vcui.require(['ui/pagination', 'ui/validation'], function (){
                self.settings();
                self.bindEvents();
                self.validation = new vcui.ui.Validation('#submitForm', { 
                
                });

                //BTOCSITE-11299 componentChk 분기처리 추가 - Q&A component 존재할 경우에만 API 실행
                if(!componentChk) {
                    console.log("not found QnA component!")
                } else {
                    if(loginFlag == "Y"){
                        if(isUrl){
                            self.requestQnaListData({"questionTypeCode":"ALL","excludePrivate":"N","myQna":"Y","page": "1"});
                            $('#myWriteView').prop("checked", true);
                            history.replaceState({}, null, location.pathname); //파라미터 url 삭제
                        } else {
                            self.requestQnaListData({"questionTypeCode":"ALL","excludePrivate":"N","myQna":"N","page": "1"});
                        }
                    } else {
                        self.requestQnaListData({"questionTypeCode":"ALL","excludePrivate":"N","myQna":"N","page": "1"});
                    }
                }
            });
        },
        settings : function (){
            var self = this;

            self.$pdpQna = $('#pdp_qna');
            
            // QnA 리스트 상단 영역
            //self.$totalCount = self.$pdpQna.find('.count');
            self.$sortingWrap = self.$pdpQna.find('.sorting-wrap');
            self.$sortSelect = self.$sortingWrap.find('.ui_selectbox'); //문의유형 select 정렬
            self.$sortSecChk = self.$sortingWrap.find('.chk-wrap'); //비밀글 제외 체크 
            self.$reqBtn = self.$sortingWrap.find('.ico-req'); //문의하기 버튼

            //Qna LIst
            self.$qnaType = self.$pdpQna.find('.KRP0043');
            self.$dataModelId = self.$qnaType.attr('data-model-id');
            self.$qnaList = self.$qnaType.find('ul.qna-result-lists');

            self.$modifyBtn = self.$qnaType.find('.modi-btn');
            self.$deleteBtn = self.$qnaType.find('.del-btn');
            
            self.$nodata = self.$pdpQna.find('.no-data-message');
            self.$pagination = self.$pdpQna.find('.pagination').vcPagination({scrollTop : 'noUse'});

            //등록하기 팝업
            self.$writePopup = $('#popupWrite')
            self.$writeForm = self.$writePopup.find("#submitForm");
            self.$writeFormFileItem = self.$writeForm.find(".file-item");

            self.$writeQnaType = self.$writePopup.find('#qnaType');
            self.$writeTitle = self.$writePopup.find('#title');
            self.$writeDesc = self.$writePopup.find('#content');

            self.$secretChkBtn = self.$writePopup.find('#privateFlag');
        },
        bindEvents : function() {
            var self = this;

            // QnA 리스트 : 페이징 선택
            self.$pagination.off('page_click.page').on('page_click.page',  function(e, data) {
                var questionTypeCode = self.$sortSelect.vcSelectbox('value');
                var excludePrivate = $('#secretSort').closest(".chk-wrap").find('input[type=checkbox]:checked').val(); // on , undefined(not-checked) 
                var myQna = $('#myWriteView').closest(".chk-wrap").find('input[type=checkbox]:checked').val();// on , undefined(not-checked) 
                if(excludePrivate === "on" ) {
                    excludePrivate = "Y";
                } else {
                    excludePrivate = "N";
                }
                if(myQna === "on" ) {
                    myQna = "Y";
                } else {
                    myQna = "N";
                }
                self.requestQnaListData({"questionTypeCode":questionTypeCode,"excludePrivate":excludePrivate ,"myQna":myQna,"page": data});
            });
            
            // QnA 리스트 : selectbox 선택
            self.$sortSelect.off('change').on('change', function(e){
                var questionTypeCode = self.$sortSelect.vcSelectbox('value');
                var excludePrivate = $('#secretSort').closest(".chk-wrap").find('input[type=checkbox]:checked').val(); // on , undefined(not-checked) 
                var myQna = $('#myWriteView').closest(".chk-wrap").find('input[type=checkbox]:checked').val();// on , undefined(not-checked) 
                if(excludePrivate === "on" ) {
                    excludePrivate = "Y";
                } else {
                    excludePrivate = "N";
                }
                if(myQna === "on" ) {
                    myQna = "Y";
                } else {
                    myQna = "N";
                }
                self.requestQnaListData({"questionTypeCode":questionTypeCode,"excludePrivate":excludePrivate ,"myQna":myQna,"page": "1"});
            });

            // 닫기 버튼 클릭 시 form 전체 입력 값 초기화
            self.$writePopup.on('click', '.btn-close', function(){
               $("#submitForm")[0].reset();
            });

            // 비밀글 제외 체크
            self.$qnaType.find('#secretSort').on('click', function(){
                var questionTypeCode = self.$sortSelect.vcSelectbox('value');
                var excludePrivate = $('#secretSort').closest(".chk-wrap").find('input[type=checkbox]:checked').val(); // on , undefined(not-checked)
                var myQna = $('#myWriteView').closest(".chk-wrap").find('input[type=checkbox]:checked').val();// on , undefined(not-checked) 
                if(excludePrivate === "on" ) {
                    excludePrivate = "Y";
                } else {
                    excludePrivate = "N";
                }
                if(myQna === "on" ) {
                    myQna = "Y";
                } else {
                    myQna = "N";
                }
                self.requestQnaListData({"questionTypeCode":questionTypeCode,"excludePrivate":excludePrivate ,"myQna":myQna,"page": "1"});
            });

            // 내 문의 보기 체크
            self.$qnaType.find('#myWriteView').on('click', function(){
                if(lgkorUI.stringToBool(loginFlag)) {
                    var questionTypeCode = self.$sortSelect.vcSelectbox('value');
                    var excludePrivate = $('#secretSort').closest(".chk-wrap").find('input[type=checkbox]:checked').val(); // on , undefined(not-checked)
                    var myQna = $('#myWriteView').closest(".chk-wrap").find('input[type=checkbox]:checked').val();// on , undefined(not-checked) 
                    if(excludePrivate === "on" ) {
                        excludePrivate = "Y";
                    } else {
                        excludePrivate = "N";
                    }
                    if(myQna === "on" ) {
                        myQna = "Y";
                    } else {
                        myQna = "N";
                    }
                    self.requestQnaListData({"questionTypeCode":questionTypeCode,"excludePrivate":excludePrivate ,"myQna":myQna,"page": "1"});
                } else {
                    $('#myWriteView').prop("checked", false);
                    lgkorUI.confirm('', {
                        title:'로그인 후 등록이 가능합니다.<br>로그인 하시겠습니까?', 
                        okBtnName: '예', 
                        cancelBtnName: '아니오', 
                        ok : function (){ 
                            window.location.href = "/sso/api/Login";
                        }
                    });
                }
            });

            self.$writePopup.find('.btn-confirm').on('click', function() {
                
                var param = $(this).closest("#popupWrite").data('param');
                var valChk = self.formValidationChk(param);
                if(valChk){
                    lgkorUI.confirm('', {
                        title:param.mode === 'write' ? '저장 하시겠습니까?' : '게시물을 수정하시겠습니까?',
                        okBtnName:param.mode === 'write' ? '확인' : '예',
                        cancelBtnName:param.mode === 'write' ? '취소' :'아니오',
                        ok: function() {
                            if(param.mode === 'write'){
                                self.requestQnaWrite(param);
                            }else{
                                self.requestQnaModify(param);
                            }
                        }
                    }); 
                }
            });

            // qna 리스트 선택시, 비밀글 alert 처리
            self.$qnaList.on('click', '.accord-btn', function(){
                var $list = $(this).closest('li');
                var secretFlag = $list.data("secretFlag");
                var currentFlag = $list.data("currentFlag");
                var blocked = $list.data("blocked");

                if(secretFlag == "Y" && blocked == "N" && currentFlag == "N") {
                    lgkorUI.alert("", {
                        title: '비밀글은 작성자만 조회할  수 있습니다.',
                        okBtnName : '확인'
                    });
                    
                    return;
                }
            })
            //삭제하기
            self.$qnaList.on('click', '.del-btn', function(){
                var modelId = $('.KRP0043').attr('data-model-id');
                var queNo = $(this).closest('li.lists').attr("data-que-no");
                lgkorUI.confirm('', {
                    title:'게시물을 삭제하시겠습니까? <br> 답변이 작성된 경우 답변도 같이 삭제됩니다.', 
                    cancelBtnName: '아니오', okBtnName: '예', 
                    ok : function (){ 
                        self.requestQnaDelete({"modelId":modelId, "queNo":queNo});
                    }
                }); 
            })
            //문의하기 
            self.$reqBtn.on('click', function(){
                var mode = self.$reqBtn.attr('data-name');
                //console.log(mode);
                self.requestQnaReadPop({"mode":mode});
                
            });

            //수정하기
            $('.qna-result-lists').on('click', '.modi-btn', function(){
                var mode = $(this).attr('data-name');
                var modelId = self.$dataModelId;
                var queNo = $(this).closest('li.lists').attr("data-que-no");
                self.requestQnaReadPop({"mode":mode,"selector":this, "modelId":modelId, "queNo":queNo}); //qna read popup
            });
        }, 
        itemAccordionEnabledChk: function(item){
            if( item.blocked == "Y" ) {
                this.enabled = "N";
            } else {
                this.enabled = "Y";
                if( item.secret == "Y" ) {
                    this.enabled = item.sameId == "Y" ? "Y" : "N"
                } else {
                    this.enabled = "Y"
                }
            }

            return this.enabled
        },
        itemCurrentSecretCheck: function(item){
            if(item.sameId == "Y" && item.secret == "Y") {
                this.currentSecret = "Y"    
            } else {
                this.currentSecret = "N";
            } 
            
            return this.currentSecret;
        },
        // qna-list - get
        requestQnaListData : function(param){
            //console.log("QnA List - API request !!");
            //console.log(param);
        
            var self = this;
            var ajaxUrl = self.$qnaType.data('ajax') + "?modelId=" + self.$dataModelId + "&page=" + param.page ;
            var selectedQTypeVal = param.questionTypeCode;
            
            $('#orderType').val(selectedQTypeVal).vcSelectbox('update')


            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                    var listData = result.data.qnaList;
                    var noticeData = result.data.qnaNoticeList;
                    var innerHTML = "";
                    
                    var pagination = result.data.pagination;
                    // var totalCount = result.data.qnaTotalCount;
                    var $pdpTab = $('.tab-menu [data-link-name=qna]');

                    if(result.status == "success"){

                        if( (noticeData.length > 0 && listData.length > 0) || listData.length > 0 || noticeData.length > 0) {
                            // var currentCount = totalCount > 999 ? "999+" : totalCount;
                            noticeData.forEach(function(item){
                                innerHTML += vcui.template(noticeListTmpl, item);
                            });
                            listData.forEach(function(item){
                                item.enabled = self.itemAccordionEnabledChk(item);
                                item.currentSecret = self.itemCurrentSecretCheck(item);
                                innerHTML += vcui.template(qnaListTmpl, item);
                            });
                            
                            // 211206 추가 - 필터. no-data일경우에,비노출 처리 건, 다시 데이터 조회될 경우, 초기화 
                            self.$qnaList.empty().append(innerHTML);
                            //self.$totalCount.text(currentCount);
                            //$pdpTab.text("Q&A (" + currentCount +")");
                            self.$qnaType.find('.qna-result-lists').show();
                            self.$nodata.hide();
                            self.$pagination.vcPagination('setPageInfo', pagination);
                            lgkorUI.hideLoading();
                        } else {                            
                            //$pdpTab.text("Q&A (" + totalCount +")");
                            //self.$totalCount.text(totalCount);
                            self.requestNoData();
                            self.$pagination.vcPagination('setPageInfo', pagination);
                            
                        }
                    } else {                        
                        //$pdpTab.text("Q&A (" + totalCount +")");
                        //self.$totalCount.text(totalCount);
                        self.requestNoData();
                        self.$pagination.vcPagination('setPageInfo', pagination);

                    }
                    //success end
            });
            
        },
        // qna-read-popup - get
        requestQnaReadPop : function(param) {
            //console.log("QnA 조회 팝업 - API request !!");
            var self = this;
            
            //수정하기용, 문의하기일땐 READ API거칠 필요 없음
            //console.log("param.mode", param.mode)
            var paramCheck = param.mode == "write" ?  "" : "?modelId=" + param.modelId +"&questionNo="+ param.queNo;
            var ajaxUrl = self.$qnaType.data('readAjax') + paramCheck;

            //일반 case
            if(lgkorUI.stringToBool(loginFlag)) {

                var qTypeList = self.$writeQnaType.find('option');
                var qTypeBtnSelectedText = $("#type_desc .ui-selectbox-wrap").find('.ui-selectbox-view > a > .ui-select-text');
                var imageInputFiles = $('.ui_imageinput').find('input[type="file"]');
                $('input[type=file]').removeData('fileFlag');

                if(param.mode == 'write') {
                    // write
                    self.$writeTitle.val('');
                    self.$writeDesc.val('');
                    self.$secretChkBtn.attr("checked",false);

                    // 함수 추가 - 211207 
                    self.fileHideCheck();

                    self.$writePopup.find('.pop-header > .tit > span').html("문의하기");
                    qTypeBtnSelectedText.html("문의 유형을 선택해주세요");
                    //qTypeList.eq(0).addClass("on");

                    if(self.$writePopup.hasClass='modify') {
                        self.$writePopup.removeClass('modify');
                    }
                    self.$writePopup.addClass(param.mode);
                    
                    self.$reqBtn.attr('data-href','#popupWrite');

                } else {
                    // modify
                    //console.log("modify");

                    // 함수 추가 - 211207 
                    self.fileHideCheck();

                    if(self.$writePopup.hasClass='write') {
                        self.$writePopup.removeClass('write');
                    }
                    
                    self.$writePopup.addClass(param.mode);
                    self.$writePopup.find('.pop-header > .tit > span').html("수정하기");

                    $(param.selector).attr('data-href','#popupWrite');

                    lgkorUI.requestAjaxData(ajaxUrl,{},function(result){
                        
                        var data = result.data;
                        
                        if(result.status === "success") {
                            var qTitle = data.questionTitle;
                            var qContent = data.questionContent;
                            var secretFlag = data.secret;
                            var qTypeCode = data.questionTypeCode;
                            var imgfiles = data.files;
                            

                            //console.log(imgfiles);

                            self.$writeTitle.val(qTitle);
                            self.$writeDesc.val(qContent);

                            if(secretFlag === "Y") {
                                self.$secretChkBtn.attr("checked", true);
                            }

                            for(var i=0 ; i < qTypeList.length; i++){
                                if(qTypeList[i].value === qTypeCode) {
                                    qTypeList[i].selected = true;
                                    qTypeBtnSelectedText.html(qTypeList[i].textContent);
                                }
                            }
                            // imageFiles read.

                            for (var i in imgfiles){ 
                                (function(i) {
                                    var k = imgfiles[i].fileNo -1;

                                    var $fileBox = imageInputFiles[k].closest('.file-item')
                                    var $filePreview = $fileBox.querySelector('.file-preview');
                                    var $fileName = $fileBox.querySelector('input.name');
                                    var reader = new FileReader();
                                    if(imgfiles[i]) {
                                        $.ajax({
                                            url: imgfiles[i].filePath,
                                            xhrFields:{
                                                responseType: 'blob'
                                            },
                                            success: function(data){
                                            reader.readAsDataURL(data);
                                            reader.onload = function(e){                               
                                                var imgTag = "<img src='"+e.target.result+"' alt='첨부파일 썸네일'>";
                                                $fileBox.classList.add('on');
                                                $filePreview.innerHTML = imgTag;
                                                $($fileName).val(imgfiles[i].fileName);
                                            }

                                            }
                                        });
                                    }
                                })(i);
                            }
                        } else {                    
                            lgkorUI.alert("", {
                                title: "게시물 확인이 불가합니다. 관리자에게 문의해주세요. ",
                                ok : function(){
                                    self.$writePopup.vcModal('hide');
                                    location.reload();
                                }
                            });
                        }
                    },"POST");
                }
                self.$writePopup.data("param", param);
                self.uploadFileChk(); //파일업로드 이벤트실행
            } else {
                lgkorUI.confirm('', {
                    title:'로그인 후 등록이 가능합니다.<br>로그인 하시겠습니까?', 
                    okBtnName: '예', 
                    cancelBtnName: '아니오', 
                    ok : function (){ 
                        window.location.href = "/sso/api/Login";
                    }
                });
            }
            

        },
        // qna-write - post
        requestQnaWrite : function(el) {
            self = this;
            ajaxUrl = self.$writeForm.data('createAjax');

            //console.log("QnA 등록하기 - API request !!" + ajaxUrl);

            if(ajaxUrl) {
                var param = self.validation.getAllValues();
                var formData = new FormData();

                formData.append('modelId', self.$dataModelId);
        
                for (var key in param) {
                    if(key == 'privateFlag'){
                        param[key]  = param[key] == true ? "Y" : "N";
                    }
                    formData.append(key, param[key]);

                    if(key.indexOf('imageFile') > -1) {                        

                        //신규 업로드시 삭제된 파일 체크
                        var $file = $("#"+key);
                        if(!param[key] &&  $file.data('fileFlag') === 'insert') {
                            $file.removeData('fileFlag')
                        }
                    }
                }

                lgkorUI.showLoading();

                lgkorUI.requestAjaxFileData(ajaxUrl, formData, function(result) {
                    if (result.status == 'success') {
                        lgkorUI.hideLoading();
                        lgkorUI.alert("", {
                            title: "게시물이 등록되었습니다.",
                            ok : function(){
                                self.$writePopup.vcModal('hide');
                                location.reload();
                            }
                        });
                        
                    } else {    
                        lgkorUI.hideLoading();                    
                        lgkorUI.alert("", {
                            title: "게시물 등록에 실패하였습니다. 입력한 내용을 확인해 주세요.",
                            ok : function(){
                                
                            }
                        });
                        
                    }
                }, 'POST', 'json',true, function(){
                    lgkorUI.hideLoading();
                    lgkorUI.alert("", {
                        title: "게시물 등록에 실패하였습니다.",
                        ok : function(){
                
                        }
                    });
                });
            }
        },
        // qna-modify-popup - post
        requestQnaModify :function(el) {
            var self = this;
            var queNo = el.queNo;
            ajaxUrl = self.$writeForm.data('updateAjax');
            //console.log("QnA 수정하기 - API request !!" + ajaxUrl);

            if(ajaxUrl) {
                var param = self.validation.getAllValues(); 
                var formData = new FormData();

                // data modelId / data questionNo 값 추가
                formData.append('modelId', self.$dataModelId);
                formData.append('questionNo', queNo);

        
                for (var key in param) {
                    if(key == 'privateFlag'){
                        param[key]  = param[key] == true ? "Y" : "N";
                    }
                    formData.append(key, param[key]);

                    if(key.indexOf('imageFile') > -1) {

                        var changeFile = key.replace('image','change');

                        //신규 업로드시 삭제된 파일 체크
                        var $file = $("#"+key);
                        if(!param[key] &&  $file.data('fileFlag') === 'insert') {
                            $file.removeData('fileFlag');
                        } 

                        //글작성 ,수정시 fileFlag 보내줌
                        formData.append(changeFile, $file.data('fileFlag') );
                    } 
                }

                //lgkorUI.showLoading();
                lgkorUI.requestAjaxFileData(ajaxUrl, formData, function(result) {
                    if (result.status == 'success') {
                        lgkorUI.hideLoading();                        
                        lgkorUI.alert("", {
                            title: "게시물이 수정되었습니다.",
                            ok: function(){
                                self.$writePopup.vcModal('hide');
                                location.reload();
                            }
                        });                    
                    } else {
                        lgkorUI.hideLoading();
                        lgkorUI.alert("", {
                            title: "게시물 수정에 실패하였습니다. 입력한 내용을 확인해 주세요.",
                            ok : function(){
                    
                            }
                        });
                    }
                }, 'POST', 'json', true, function(){
                    lgkorUI.hideLoading();
                    lgkorUI.alert("", {
                        title: "게시물 수정에 실패하였습니다.",
                        ok : function(){
                
                        }
                    });
                });
            }
        },
        // qna-delete-popup - post
        requestQnaDelete :function(param) {
            //console.log("QnA 삭제하기 - API request !!");
            var self = this;
            var ajaxUrl = self.$qnaType.data('deleteAjax') + "?modelId=" + param.modelId +"&questionNo="+ param.queNo;
            if(lgkorUI.stringToBool(loginFlag)) {
                lgkorUI.requestAjaxData(ajaxUrl,param, function(result) {
                    if(result.status === 'success') {
                        lgkorUI.alert("", {
                            title: "게시물이 삭제되었습니다.",
                            ok: function(){
                                location.reload();
                            }
                        });
                    } else {
                        lgkorUI.alert("", {
                            title: "게시물 삭제에 실패하였습니다.",
                            ok : function(){
                                
                            }
                        });
                    }
                },"POST");
            } else {
                //비로그인
                lgkorUI.confirm('', {
                    title:'로그인 후 등록이 가능합니다.<br>로그인 하시겠습니까?', 
                    okBtnName: '예', 
                    cancelBtnName: '아니오',                     
                    ok : function (){ 
                        window.location.href = "/sso/api/Login";
                    }
                });
            }
            
        },
        requestNoData : function() {
            var self = this;
            self.$qnaType.find('.qna-result-lists').hide();
            self.$nodata.show();
            lgkorUI.hideLoading();
        },
        //파일업로드 체크
        uploadFileChk : function(param){
            var self = this;

            self.$writeForm.find('.ui_imageinput').vcImageFileInput({
                individualFlag:true,
                totalSize: 40 * 1024 * 1024, //  전체 파일 토탈 용량 값 : 4 * 1024 * 1024(4MB):dev test용 / 40 * 1024 * 1024 (40MB):stg,prd
                fileNameSize : 50, // 파일명 최대 50자 이내(.확장자 포함)
                individual: {
                    size: 10 * 1024 * 1024 // 개인 파일 업로드 시 용량 값 : 1 * 1024 * 1024(1MB):dev / 10 * 1024 * 1024 (10MB)
                },
                message: {
                    name: '파일 명에 특수기호(? ! , . & ^ ~ )를 제거해 주시기 바랍니다.',
                    format: 'jpg, jpeg, png, gif 파일만 첨부 가능합니다.',
                    size: '첨부파일 용량은 10mb 이내로 등록 가능합니다.',
                    nameLength : '첨부파일 이름은 확장자 포함 50자 이내로 등록 가능합니다.'
                },
                delCompleted: function(target){
                    //BTOCSITE-6032 추가
                    if( $(target).is('[data-btn="delete"]')) {
                        var $fileItem = $(target).closest('[data-role="file-item"]');
                        $fileItem.find("input[type='file']").data('fileFlag','delete');
                        $fileItem.find('.file-preview').empty();
                        $fileItem.find('.file-name input').prop('placeholder','파일선택');
                    }
                }
            });
        },
        fileHideCheck : function() {
            var self = this;
            if(self.$writeFormFileItem.hasClass="on"){
                self.$writeFormFileItem.removeClass("on");
                self.$writeFormFileItem.find('.file-preview').empty();
                self.$writeFormFileItem.find('.file-name input').prop('placeholder','파일선택');
                self.$writeFormFileItem.find('.file-name input').val('');
            }
            
        },
        formValidationChk : function(param) {
            var self = this;
            var qnaTypeVal = self.$writePopup.find('.ui_selectbox').vcSelectbox('value'); 
            var titleVal = self.$writeTitle.val();
            var descVal = self.$writeDesc.val();
            
            if(!qnaTypeVal){
                lgkorUI.alert("", {
                    title: "문의 유형을 선택해주세요."
                });
    
                return false;
            }

            if(!titleVal){
                lgkorUI.alert("", {
                    title: "문의 제목을 작성해주세요."
                });
    
                return false;
            }
                
            if(!descVal){
                lgkorUI.alert("", {
                    title: "문의 내용을 작성해주세요."
                });
    
                return false;
            }

            return true;
        }
    };

$(document).ready(function(){
        qnaPdp.init();
})

})();