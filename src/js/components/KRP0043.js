// ★ 공지사항 관련 게시글은 별도의 어드민 api개발이 완료된 이 후 , 따로 api로 그린다고함. cms에서 붙임
(function (){
    var noticeListTmpl = 
    '<li class="lists notice" data-noticeid="{{ noticeId }}" data-noticetype="{{ noticeType }}">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn ui_accord_toggle" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="badge active notice">공지</span>' + 
                '<span class="title line1">{{ noticeTitle }}</span>' +
                '<span class="writer"> {{ creationName }} </span>' +
                '<span class="date"> {{ creationDate }} </span>' +
                '<span class="blind ui_accord_text">내용 더 보기</span>' +
            '</a>' +
        '</div>' +
        '<div class="accord-cont ui_accord_content" style="display:none;">' +
            '<div class="que-box notice">' +
                '<div>' +
                    '<p class="desc">' +
                        '{{ noticeContent }}' +
                    '</p>' +
                    '<div class="img-wrap">' +
                        '<img src="{{ noticeImagePath }}" alt="">' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</li>';

    var qnaListTmpl = 
    '<li class="lists" data-que-no="{{ questionNo }}" {{#if (secret == "Y") }}data-secret-flag="{{secret}}"{{/if}} data-enabled="{{enabled}}">' +
        '<div class="head">' +
            '<a href="#n" class="accord-btn {{#if (enabled == true) }}ui_accord_toggle{{/if}}" data-open-text="내용 더 보기" data-close-text="내용 닫기">' +
                '<span class="badge {{#if (answered == "Y") }}active{{/if}}">{{#if (answered == "Y") }}답변완료{{/if}}{{#if (answered == "N") }}답변대기{{/if}}</span>' + 
                '<span class="title line1{{#if (secret == "Y") }} on{{/if}}">{{ questionTitle }}</span>' +
                '<span class="writer"> {{ creationUserName }} </span>' +
                '<span class="date"> {{ creationDate }} </span>' +
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

            vcui.require(['ui/pagination', 'ui/validation'], function (){
                self.settings();
                self.bindEvents();
 
                self.validation = new vcui.ui.Validation('#submitForm', { 
                
                });
                self.requestQnaListData({"questionTypeCode":"ALL","listTypeName":"문의유형 전체","page": 1});
            });
        },
        settings : function (){
            var self = this;            
            
            self.$pdpQna = $('#pdp_qna');
            
            // QnA 리스트 상단 영역
            self.$totalCount = self.$pdpQna.find('.count');
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
            self.$writePopup = $('#popupWrite');
            self.$writeForm = self.$writePopup.find("#submitForm");

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
                var excludePrivate  = self.$sortSecChk.find('input[type=checkbox]:checked').val(); // on , undefined(not-checked)
                if(excludePrivate === "on" ) {
                    excludePrivate = "Y";
                } else {
                    excludePrivate = "N";
                }
                self.requestQnaListData({"questionTypeCode":questionTypeCode,"excludePrivate":excludePrivate ,"page": data});
            });
            
            // QnA 리스트 : selectbox 선택
            self.$sortSelect.off('change').on('change', function(e){
                var questionTypeCode = self.$sortSelect.vcSelectbox('value');
                var questionTypeName = self.$sortSelect.vcSelectbox('text');
                var excludePrivate = self.$sortSecChk.find('input[type=checkbox]:checked').val(); // on , undefined
                if(excludePrivate === "on" ) {
                    excludePrivate = "Y";
                } else {
                    excludePrivate = "N";
                }
                self.requestQnaListData({"questionTypeCode":questionTypeCode,"listTypeName":questionTypeName,"excludePrivate":excludePrivate ,"page": 1});
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
            self.$qnaList.on('click', 'li', function(){
                var queNo = $(this).data("secretFlag");
                var enabled = $(this).data("enabled");

                if(queNo == "Y" && enabled != true) {
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
                console.log(mode);
                self.requestQnaReadPop({"mode":mode});
                
            });

            //수정하기
            $('.qna-result-lists').on('click', '.modi-btn', function(){
                var mode = self.$modifyBtn.attr('data-name');
                var modelId = self.$dataModelId;
                var queNo = $(this).closest('li.lists').attr("data-que-no");
                self.requestQnaReadPop({"mode":mode,"selector":this, "modelId":modelId, "queNo":queNo}); //qna read popup
            });

            self.$writePopup.find('.underline').off('click').on('click', function(){
                window.open('/my-page/email-inquiry');
            });

            self.$qnaType.find('#secretSort').off('click').on('click', function(){
                //var chkVal = self.$sortSecChk.find('input[type=checkbox]:checked').val();
                // if (chkVal == "on") {
                //     $('ul.qna-result-lists > li').each(function(idx,item){
                //         if($(this).data('secretFlag') == "Y"){
                //             $(this).hide();
                //         }
                //     });
                // } else {
                //     $('ul.qna-result-lists > li').show();
                // }

                var questionTypeCode = self.$sortSelect.vcSelectbox('value');
                var excludePrivate  = self.$sortSecChk.find('input[type=checkbox]:checked').val(); // on , undefined(not-checked)
                var questionTypeName = self.$sortSelect.vcSelectbox('text');
                if(excludePrivate === "on" ) {
                    excludePrivate = "Y";
                } else {
                    excludePrivate = "N";
                }
                self.requestQnaListData({"questionTypeCode":questionTypeCode,"listTypeName":questionTypeName,"excludePrivate":excludePrivate ,"page": 1});
            });
        },
        // qna-list - get
        requestQnaListData : function(param){
            console.log("QnA List - API request !!");
            console.log(param);
            
            var typeSelText = $('.KRP0043 .ui-selectbox-wrap .ui-selectbox-view').find('.ui-select-text');
            var self = this;
            var ajaxUrl = self.$qnaType.data('ajax') + "?modelId=" + self.$dataModelId + "&page=" + param.page ;
            var selectedQTypeName = param.listTypeName;
            typeSelText.html(selectedQTypeName);

            lgkorUI.showLoading();
            lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                    var data = result.data.qnaList;
                    var noticeData = result.data.qnaNoticeList;//공지사항
                    var html = ""; // 공지사항용
                    var innerHTML = ""; //qna list용
                    
                    var pagination = result.data.pagination;
                    var totalCount = result.data.qnaTotalCount;
                    var selectedQTypeVal = param.questionTypeCode;

                    if(result.status == "success"){
                        if( (noticeData.length > 0 && data.length > 0) || data.length > 0) {
                            noticeData.forEach(function(item){
                                html += vcui.template(noticeListTmpl, item);
                            });
                            //self.$qnaList.empty().append(html);
                            self.$qnaList.empty();
                            self.$qnaList.append(html);

                            //self.$qnaType.find('.qna-result-lists').empty();
                            // qna 리스트 문의 건수, 999건 초과시 999+
                            if(totalCount > 999 ){
                                self.$totalCount.text("999+");
                            } else {
                                self.$totalCount.text(totalCount);
                            }
    
                            //리스트 페이지 노출
                            // select-box 문의유형 선택값 필터처리
                            if(selectedQTypeVal == 'ALL'){
                                data.forEach(function(item){
                                    item.enabled = false;
                                    if( item.blocked == "N") {
                                        if(item.sameId == "Y" || (item.sameId == "N" && item.secret == "N")) {
                                            item.enabled = true    
                                        } 
                                    } 
                                    innerHTML += vcui.template(qnaListTmpl, item);
                                });
                            } else {
                                //let selArr = data.filter(key => key.questionTypeCode == selectedQTypeVal);
                                var selArr = data.filter(function(key){
                                    return key.questionTypeCode == selectedQTypeVal;
                                });
    
                                selArr.forEach(function(item){
                                    item.enabled = false;
                                    if( item.blocked == "N") {
                                        if(item.sameId == "Y" || (item.sameId == "N" && item.secret == "N")) {
                                            item.enabled = true    
                                        } 
                                    } 
                                    innerHTML += vcui.template(qnaListTmpl, item);
                                });
    
                            }
                            self.$qnaList.append(innerHTML);
                            self.$pagination.vcPagination('setPageInfo', pagination);
                  
                            lgkorUI.hideLoading();
                        } else {
                            self.$qnaType.find('.qna-result-lists').hide();
                            self.$nodata.show();
                            lgkorUI.hideLoading();
                        }
                    } else {
                        self.$qnaType.find('.qna-result-lists').hide();
                        self.$nodata.show();
                        lgkorUI.hideLoading();
                    }
                    //success end
            });
            
        },
        // qna-read-popup - get
        requestQnaReadPop : function(param) {
            console.log("QnA 조회 팝업 - API request !!");
            var self = this;
            
            //수정하기용, 문의하기일땐 READ API거칠 필요 없음
            var ajaxUrl = self.$qnaType.data('readAjax') + "?modelId=" + param.modelId +"&questionNo="+ param.queNo;
            console.log(ajaxUrl);

            //일반 case
            if(lgkorUI.stringToBool(loginFlag)) {

                var qTypeList = self.$writeQnaType.find('option');
                var qTypeBtnSelectedText = $("#type_desc .ui-selectbox-wrap").find('.ui-selectbox-view > a > .ui-select-text');
                var imageInputFiles = $('.ui_imageinput').find('input[type="file"]');

                if(param.mode == 'write') {
                    // write
                    self.$writeTitle.val('');
                    self.$writeDesc.val('');
                    self.$secretChkBtn.attr("checked",false);

                    if($('.file-item').hasClass="on"){
                        $('.file-item').removeClass("on");
                        $('.file-item').find('.file-preview').empty();
                        $('.file-item').find('.file-name input').prop('placeholder','');
                        $('.file-item').find('.file-name').text('');
                    }
                    
                    $('#popupWrite').find('.pop-header > .tit > span').html("문의하기");
                    qTypeBtnSelectedText.html("문의 유형을 선택해주세요");
                    //qTypeList.eq(0).addClass("on");

                    if($('#popupWrite').hasClass='modify') {
                        $('#popupWrite').removeClass('modify');
                    }
                    $('#popupWrite').addClass(param.mode);
                    
                    $('.ico-req').attr('data-href','#popupWrite');

                } else {
                    // modify
                    console.log("modify");
                    
                    if($('.file-item').hasClass="on"){
                        $('.file-item').removeClass("on");
                        $('.file-item').find('.file-preview').empty();
                        $('.file-item').find('.file-name input').prop('placeholder','');
                        //$('.file-item').find('.file-name').text('');
                    }

                    if($('#popupWrite').hasClass='write') {
                        $('#popupWrite').removeClass('write');
                    }
                    $('#popupWrite').addClass(param.mode);
                    $('#popupWrite').find('.pop-header > .tit > span').html("수정하기");

                    $(param.selector).attr('data-href','#popupWrite');

                    lgkorUI.requestAjaxData(ajaxUrl,{},function(result){
                        
                        var data = result.data;
                        
                        if(result.status === "success") {
                            var qTitle = data.questionTitle;
                            var qContent = data.questionContent;
                            var secretFlag = data.secret;
                            var qTypeCode = data.questionTypeCode;
                            var imgfiles = data.files;
                            

                            console.log(imgfiles);

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
                                    //var $fileBoxInputfile = imageInputFiles[i].closest('input[type=file]');
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
                                            console.log("data %o",data)
                                            reader.readAsDataURL(data);
                                            reader.onload = function(e){
                                        
                                                var imgTag = "<img src='"+e.target.result+"' alt='첨부파일 썸네일'>";
                                                $fileBox.classList.add('on');
                                                imageInputFiles[k].dataset.fileFlag = "delete"; //추가 1201
                                                $filePreview.innerHTML = imgTag;
                                                //$fileName.value = imgfiles[i].fileName;
                                                $fileName.value = imgfiles[i].fileName;
                                             
                                                
                                            }

                                            }
                                        });
                                    }
                                })(i);
                            }
                        } else {
                            console.log("fail");
                        }
                    },"POST");
                }
                $('#popupWrite').data("param",param);
                self.uploadFileChk(); //파일업로드 이벤트실행
            } else {
                lgkorUI.confirm('', {
                    title:'로그인 후 등록이 가능합니다.<br>로그인 하시겠습니까?', 
                    cancelBtnName: '아니오', okBtnName: '예', 
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

            console.log("QnA 등록하기 - API request !!" + ajaxUrl);

            if(ajaxUrl) {
                var param = self.validation.getAllValues();
                var formData = new FormData();

                // data modelId 값 추가
                formData.append('modelId', self.$dataModelId);
        
                for (var key in param) {
                    if(key == 'privateFlag'){
                        param[key]  = param[key] == true ? "Y" : "N";
                    }
                    formData.append(key, param[key]);

                    if(key.indexOf('imageFile') > -1) {

                        //var changeFile = key.replace('image','change');

                        //신규 업로드시 삭제된 파일 체크
                        var $file = $("#"+key);
                        if(!param[key] &&  $file.data('fileFlag') === 'insert') {
                            $file.removeData('fileFlag')
                        } 

                        //글작성 ,수정시 fileFlag 보내줌
                        //formData.append(changeFile, $file.data('fileFlag') );
                    }
                }

                lgkorUI.showLoading();

                lgkorUI.requestAjaxFileData(ajaxUrl, formData, function(result) {
                    if (result.status == 'success') {
                        lgkorUI.hideLoading();
                        lgkorUI.alert("", {
                            title: "게시물이 등록되었습니다.",
                            ok : function(){
                                $('#popupWrite').vcModal('hide');
                            }
                        });
                        location.reload();
                        //location.href = "#pdp_qna"; //새로고침 후 pdp_qna 탭으로 이동시키는 방법 알아보기
                    } else {
                        lgkorUI.hideLoading();
                        
                        if (result.message) {
                            lgkorUI.alert("", {
                                title: result.message,
                                ok : function(){
                                    $('#popupWrite').vcModal('hide');
                                }
                            });
                        }
                        
                    }
                }, 'POST', 'json',true);
            }
        },
        // qna-modify-popup - post
        requestQnaModify :function(el) {
            var self = this;
            var queNo = el.queNo;
            ajaxUrl = self.$writeForm.data('updateAjax');
            console.log("QnA 수정하기 - API request !!" + ajaxUrl);

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
                                $('#popupWrite').vcModal('hide');
                            }
                        });
                        //location.reload();
                    } else {
                        lgkorUI.hideLoading();
                        $('#popupWrite').vcModal('hide');
                        if (result.message) {
                            lgkorUI.alert("", {
                                title: result.message,
                            });
                        }
                    }
                }, 'POST', 'json',true);
            }
        },
        // qna-delete-popup - post
        requestQnaDelete :function(param) {
            console.log("QnA 삭제하기 - API request !!");
            var self = this;
            var ajaxUrl = self.$qnaType.data('deleteAjax') + "?modelId=" + param.modelId +"&questionNo="+ param.queNo;
            if(lgkorUI.stringToBool(loginFlag)) {
                lgkorUI.requestAjaxData(ajaxUrl,param, function(result) {
                    if(result.status === 'success') {
                        //if(result.returnUrl) location.href = result.returnUrl;
                        lgkorUI.alert("", {
                            title: "게시물이 삭제되었습니다."
                            
                        });
                        location.reload();
                    } else {
                        lgkorUI.alert("", {
                            title: result.message
                        });
                    }
                },"POST");
            } else {
                //비로그인
                lgkorUI.confirm('', {
                    title:'로그인 후 등록이 가능합니다.<br>로그인 하시겠습니까?', 
                    cancelBtnName: '아니오', okBtnName: '예', 
                    ok : function (){ 
                        window.location.href = "/sso/api/Login";
                    }
                });
            }
            
        },
        //파일업로드 체크
        uploadFileChk : function(param){
            var self = this;

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
            });
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