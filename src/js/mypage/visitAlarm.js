(function(){
    var visitAlarmItemTemplate = '<li class="{{#if type=="prev"}}off{{#elsif type=="next"}}on after{{#else}}off after{{/if}}" data-visit-target-seq="{{visitTargetSeq}}" data-manager-emp-no="{{managerEmpNo}}">' +
        '<div class="inner">' +
            '<div class="svc-info">' +
                '<p class="date">' +
                    '<small>{{#if type=="prev"}}이전{{#elsif type=="next"}}다음{{#else}}이후{{/if}} 방문 서비스</small>' +
                    '{{dateString}}' +
                '</p>' +
                '{{#if type!="prev"}}<div class="visit-icons"><p>{{when}}</p></div>{{/if}}' +
                '<div class="infos"><p class="blind">방문 서비스 해당 제품</p>' +
                    '<ul>{{#each item in serviceList}}<li>{{item.name}}</li>{{/each}}</ul>' +
                '</div>' +
            '</div>' +
            '<div class="svc-lists"><p>{{#if type=="prev"}}이전{{#elsif type=="next"}}다음{{#else}}이후{{/if}} 방문 서비스 상세 내역</p>' +
                '<div class="svc-wrap"><ul class="svc-details" data-scheduled-to-visit-flag="{{#if type=="prev"}}previous{{#elsif type=="next"}}next{{#else}}after{{/if}}">' +
                    '{{#each item in serviceList}}<li data-visit-times="{{item.visitTimes}}" data-cont-line-seq="{{item.sku}}"><a href="#n" class="btn-link">{{item.name}}({{item.sku}}){{#if item.desc}} - {{item.desc}}{{/if}}</a></li>{{/each}}' +
                '</ul></div>' +
                '{{#if serviceList.length > 5}}<div class="more-view-wrap" aria-hidden="true">' +
                    '<span class="more-view-btn">더보기</span>' +
                '</div>{{/if}}' +
                '{{#if type=="next" && changeEnable}}<button type="button" class="btn size border" data-date="{{date}}" data-time="{{time}}"><span>방문일정 변경요청</span></button>{{/if}}' +
            '</div>' +
        '</div>' +
    '</li>'

    var popUpVisitDayItemTemplate = '<tr>' +
        '{{#each item in listData}}' +
            '{{#if item.type=="disabled"}}' +
                '{{#if item.expected==true}}' +
                    '<td class="expected" data-value="{{item.value}}"><button type="button" title="{{item.dateString}}"><span>{{item.day}}</span><span class="blind">방문 예정일</span></button></td>' +
                '{{#else}}' +
                    '<td class="disabled" data-value="{{item.value}}"><button type="button" title="{{item.dateString}}" disabled><span>{{item.day}}</span><span class="blind">선택불가</span></button></td>' +
                '{{/if}}' +
            '{{#elsif item.type=="enabled"}}' +
                '<td data-value="{{item.value}}"><button type="button" title="{{item.dateString}}"><span>{{item.day}}</span></button></td>' +
            /*
                '{{#elsif item.type=="expectedDisabled"}}' +
                '<td class="expected" data-value="{{item.value}}"><button type="button" title="{{item.dateString}}" disabled><span>{{item.day}}</span><span class="blind">방문 예정일 선택불가</span></button></td>' +
                */
            '{{#else}}' +
                '<td></td>' +
            '{{/if}}' +
        '{{/each}}' +
    '</tr>';

    //$(window).ready(function() {
        var visitAlarm = {
            init: function(){
                var self = this;
                self.setting();
                self.bindEvents();
                self.bindPopupEvents();

                //03-31
                //방문 알리미 > 다음방문 서비스 상세 영역에 [방문일정 변경 요청] 버튼은 하이케어의 요청으로 파일럿 운영에 대한 추가 요구사항 분석 및 반영 이후 적용되어야 한다고 합니다.
                //때문에 현재 시점에서는 해당 버튼을 숨김 처리 해주십시오. 개발/STG/운영에 모두 숨김처리 요청드립니다.
                //임시코드
                self.$list.find('div.svc-lists button').hide();


                var hash = location.hash;
                if(hash) {
                    var index = self.$selectContract.find('option[value='+hash.replace("#","")+']').index();
                    self.$selectContract.vcSelectbox('selectedIndex',index,true);
                }
                //현재 설정된 계약 갯수 가져옴
                /*
                var $option = self.$selectContract.find('option');
                var length = !$option ? 0 : $option.length;
                if(length > 0) {
                    var selectValue = self.getSelectedContractID();
                    if(!(!selectValue) && selectValue.length > 1) {
                        self.requestData(selectValue);
                    }
                }

                var $div = self.$contents.find('>div');
                $div.each(function(idx,item){
                    var $item = $(item);
                    if(length > 0) {
                        if($item.hasClass('nodata')) {
                            $item.hide();
                        } else {
                            $item.show();
                        }
                    } else {
                        if($item.hasClass('nodata')) {
                            $item.show();
                        } else {
                            $item.hide();
                        }
                    }
                });
                */
            },

            setting: function() {
                var self = this;
                self.$contents = $('div.lnb-contents');
                self.$list = self.$contents.find('div.my-visit-schedule ul.schedule-list');
                self.$selectContract = self.$contents.find('div.form-wrap select.ui_selectbox').eq(0);
                self.$myVisitQna = self.$contents.find('div.my-visit-qna li').eq(0);
                self.$irregularCheckout = self.$contents.find('div.my-visit-qna li').eq(1);
                //
                self.$popupChangeVisitDate = $('#popupChangeVisitDate');
                self.$calendarTable = self.$popupChangeVisitDate.find('table.box-table.tb-calendar');
                self.$timeTable = self.$popupChangeVisitDate.find('table.box-table.tb-timetable');
                self.$visitDate = self.$popupChangeVisitDate.find('div.box-visit-date span.date');
                //
                self.$timeTableWrap = self.$popupChangeVisitDate.find('div.timetable-wrap:eq(0)');
                self.$timeTableWrapFirst = self.$popupChangeVisitDate.find('div.timetable-wrap:eq(1)');
                self.$timeTableWrapNoData = self.$popupChangeVisitDate.find('div.timetable-wrap:eq(2)');
                
                // BTOCSITE-13464 방문 알리미 일정 화면 서비스 내용 상세화 START
                self.$popupServiceDetail = $('#popupServiceDetail'); // 방문상세내역팝업
                self.$myVisitSchedule = self.$contents.find('div.my-visit-schedule'); // 방문일정영역
                // BTOCSITE-13464 방문 알리미 일정 화면 서비스 내용 상세화 END
            },

            bindEvents: function() {
                var self = this;

                /*
                var $myPage = $('.mypage');

                $('.mypage .svc-lists').each(function(idx, item){
                    var leng = $(item).find('ul.svc-details li').length;
                    if(leng < 6){
                        $(item).find('.more-view-btn').hide();
                    }
                });
                */

                self.$list.on('click', '.more-view-btn', function(e){
                    e.preventDefault();

                    if($(this).hasClass('open')){
                        $(this).removeClass('open');
                        $(this).text('더보기');
                        $(this).closest('.svc-lists').find('ul.svc-details').scrollTop(0);
                        $(this).closest('.svc-lists').find('ul.svc-details').removeClass('open');
                    } else{
                        $(this).addClass('open');
                        $(this).text('닫기');
                        $(this).closest('.svc-lists').find('ul.svc-details').removeClass('open').addClass('open');
                    }
                });

                self.$selectContract.on('change', function(e){
                    var selectValue = e.target.value;
                    self.requestData(selectValue);
                });

                //방문일정 변경 팝업
                self.$list.on('click', 'div.svc-lists button', function(e){
                    e.preventDefault();
                    var $li = $(this).parents('li');

                    var date = $(this).attr('data-date');
                    var time = $(this).attr('data-time');
                    self.requestEnableVisitDay($li, date, time, $(this));

                    /*
                    //선택되었던 날짜 초기화
                    var $td = self.$calendarTable.find('tr td.choice');
                    $td.find('span.blind').remove();
                    $td.removeClass('choice');

                    //선택되었던 시간 초기화
                    $td = self.$timeTable.find('tr td.choice');
                    $td.removeClass('choice');
                    self.$timeTable.find('tr th.choice').removeClass('choice');

                    var time = $(this).attr('data-time');
                    $td = self.$timeTable.find('tr td[data-value="'+ time +'"]');
                    $td.addClass('choice');
                    $td.siblings('th').addClass('choice');
                    
                    //선택 시간 정보 텍스트 수정
                    var selectedData = self.getSelectedVisitDayData();
                    self.setVisitDateText(selectedData);

                    self.$popupChangeVisitDate.vcModal();
                    */
                });
                
                // BTOCSITE-13464 방문 알리미 일정 화면 서비스 내용 상세화 START
                self.$list.on('click', '.svc-details li', function(e){
                	
                	e.preventDefault();
                	
                	var $this = $(this);
                	var scheduledToVisitFlag = $this.parent().attr('data-scheduled-to-visit-flag'); // 이전/다음/이후 방문
                	var ajaxUrl = self.$myVisitSchedule.attr('data-detail-list-url');
                	
                	var param = {
                		contLineSeq : $this.attr('data-cont-line-seq'),
                		visitTimes : $this.attr('data-visit-times'),
                		scheduledToVisitFlag : scheduledToVisitFlag
                	}
                	
                	lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result) {
                		
                		console.log(result.status);
                		
                		if (result.status == "success") {
							
                			var data = result.data;
                			var contInfo = data.contInfo;
                    		var scheduleInfo = data.scheduleInfo;
                    		
                    		console.log(data);
                    		
                    		// 상세정보 SET
                    		var $productInfo			= self.$popupServiceDetail.find('.product-info');				// 제품명(제품코드)
                    		var $contractExpirationDate	= self.$popupServiceDetail.find('.contract-expiration-date');	// 계약만료일
                    		var $managerName			= self.$popupServiceDetail.find('.manager-name');				// 매니저 이름
                    		var $managerPhone			= self.$popupServiceDetail.find('.manager-phone');				// 매니저 연락처
                    		var $timesInfo				= self.$popupServiceDetail.find('.times-info');					// 회차
                    		var $visitYn				= self.$popupServiceDetail.find('.info-list .fc_point');		// 방문예정/방문완료
                    		var $visitShedule			= self.$popupServiceDetail.find('.visit-schedule');				// 방문일정
                    		var $filterReplacementYn	= self.$popupServiceDetail.find('.filter-replacement-yn');		// 필터교체 여부
                    		
                    		var modelCode = "-";
                    		if (contInfo.MODEL_CD != undefined && contInfo.MODEL_CD != "") {
                    			modelCode = contInfo.MODEL_CD.indexOf(".") !== -1 ? contInfo.MODEL_CD.substr(0, contInfo.MODEL_CD.indexOf(".")) : contInfo.MODEL_CD; 
                    		}
                    		var productInfo =  contInfo.CATEGORY_NM_KOR + "(" + modelCode + ") 렌탈/케어";
                    		var contractExpirationDate	= contInfo.CONT_END_DATE.substr(0,4) + "년 "
                    									+ contInfo.CONT_END_DATE.substr(4,2) + "월 "
                    									+ contInfo.CONT_END_DATE.substr(6,2) + "일까지 계약"
                    									+ "(1회 / "+ contInfo.VISIT_CYCLE +"개월)"; 
                    		var managerName = scheduleInfo.VISIT_USER_NM + " 매니저";
                    		var visitUserHpNo = scheduleInfo.VISIT_USER_HP_NO ? 
                    				scheduleInfo.VISIT_USER_HP_NO.substr(0, 3) + "-" + 
                    				scheduleInfo.VISIT_USER_HP_NO.substr(3, 4) + "-" + 
                    				scheduleInfo.VISIT_USER_HP_NO.substr(7, 4) : "-";
                    		var managerPhone = "(" + visitUserHpNo + ")";
                    		var timesInfo = scheduleInfo.VISIT_TIMES + "회차" ;
                    		var visitYn = (scheduledToVisitFlag == "previous") ? "방문완료" : "방문예정";
                    		var visitSheduleDtl = "-";
                    		if (scheduleInfo.VISIT_CONFM_DATE != undefined && scheduleInfo.VISIT_CONFM_DATE != "") {
                    			var visitSheduleTemp = scheduleInfo.VISIT_CONFM_DATE.replace(/(\s*)/g, ""); // 공백제거 
                        		visitSheduleTemp = visitSheduleTemp.replaceAll("-", "");
                        		
                        		visitSheduleDtl = visitSheduleTemp.substr(0, 4) + "년 "
                        						+ visitSheduleTemp.substr(4, 2) + "월 "
                        						+ visitSheduleTemp.substr(6, 2) + "일 "
                        						+ visitSheduleTemp.substr(8, 5);
                    		}
                    		
                    		var filterReplacementYn	= scheduleInfo.FILTER_NAME.length > 0 ? "O(" + scheduleInfo.FILTER_NAME.toString() + ")" : "X";
                    		
                    		$productInfo.text(productInfo);
                    		$contractExpirationDate.text(contractExpirationDate);
                    		$managerName.text(managerName);
                    		$managerPhone.text(managerPhone);
                    		$timesInfo.text(timesInfo);
                    		$visitYn.text(visitYn);
                    		$visitShedule.text(visitSheduleDtl);
                    		$filterReplacementYn.text(filterReplacementYn);
                    		
                    		// 회차별방문내역 SET
                    		var $historyOfVisits	= self.$popupServiceDetail.find('.history-of-visits');	// 회차별방문내역
                    		var visitTimes			= "";	// 회차
                    		var progressVal			= "";	// 진행상태
                    		var visitShedule		= "-";	// 방문일정
                    		var managerInfo			= "-";	// 매니저정보
                    		var filterReplacementYn	= "X";	// 필터교체여부
                    		var html 				= "";
                    		
                    		if ( data.scheduleList.length > 0 ) {
                    			data.scheduleList.forEach(function(scheduleInfoTemp){
                        			
                        			visitTimes = scheduleInfoTemp.VISIT_TIMES;
                        			
                        			if (scheduleInfoTemp.VISIT_DATE != undefined && scheduleInfoTemp.VISIT_DATE != "") {
                        				// 매니저 방문완료일(VISIT_DATE) 이 있을경우 방문완료
                        				progressVal	= "방문완료";	
                        			} else {
                        				// 매니저 방문완료일(VISIT_DATE) 이 없을경우
                        				if (scheduleInfoTemp.NOT_VISIT_REASON_NM != undefined && scheduleInfoTemp.NOT_VISIT_REASON_NM != "") {
                        					// 방문연기 사유가 있을경우
                        					progressVal = "방문연기<br>(" + scheduleInfoTemp.NOT_VISIT_REASON_NM + ")"
                        				} else {
                        					// 방문연기 사유가 없을경우
                        					progressVal = "방문연기<br>(-)";
                        					if (scheduleInfoTemp.VISIT_CONFM_DATE != undefined && scheduleInfoTemp.VISIT_CONFM_DATE !="") {
                            					var visitDate = scheduleInfoTemp.VISIT_CONFM_DATE.replaceAll("-", "").substr(0, 8);
                            					visitDate = new Date(Number(visitDate.substr(0,4)), Number(visitDate.substr(4,2)), Number(visitDate.substr(6,2)));
                            					var today = new Date();
                            					if (visitDate > today) { // 이후 방문 서비스상세내역중 오늘 이후의 내역이 있을경우
                            						progressVal	= "방문예정";
                            					}
                            				} 
                        				}
                        			}
                        
                        			if (scheduleInfoTemp.VISIT_CONFM_DATE != undefined && scheduleInfoTemp.VISIT_CONFM_DATE != "" ||
                        					scheduleInfoTemp.VISIT_DATE != undefined && scheduleInfoTemp.VISIT_DATE != "") {
                        				
                        				// 매니저 방문완료시 VISIT_DATE 값이 존재
                        				var visitDate = scheduleInfoTemp.VISIT_DATE ? scheduleInfoTemp.VISIT_DATE : scheduleInfoTemp.VISIT_CONFM_DATE;
                        				visitShedule = visitDate.replaceAll("-", ".").substr(0, 10);
                        			}
                        			
                        			if (scheduleInfoTemp.VISIT_USER_NM != undefined && scheduleInfoTemp.VISIT_USER_NM != "") {
                        				managerInfo = scheduleInfoTemp.VISIT_USER_NM 
                        			}
                        			
                        			if (scheduleInfoTemp.VISIT_USER_HP_NO != undefined && scheduleInfoTemp.VISIT_USER_HP_NO != "") {
                        				managerInfo = managerInfo
                        							+ "<br>"
                        							+ "(" 
                        							+ scheduleInfoTemp.VISIT_USER_HP_NO.substr(0, 3) + "-"
			                        				+ scheduleInfoTemp.VISIT_USER_HP_NO.substr(3, 4) + "-"
			                        				+ scheduleInfoTemp.VISIT_USER_HP_NO.substr(7, 4) 
			                        				+ ")";
                        			}
                        			
                        			if (scheduleInfoTemp.FILTER_CNT != undefined && scheduleInfoTemp.FILTER_CNT != "") {
                        				filterReplacementYn = scheduleInfoTemp.FILTER_CNT > 0 ? "O" : "X";
                        			}
                        			
                        			html = html + 
                                		'<tr>'
                	                        + '<td class="board-tit">' + visitTimes + '회</td>'
                	                        + '<td>' + progressVal + '</td>'
                	                        + '<td>' + visitShedule + '</td>'
                	                        + '<td>' + managerInfo + '</td>'
                	                        + '<td>' + filterReplacementYn + '</td>' +
                                        '</tr>';
                        		})
                    		} else {
                    			html = '<tr class="empty-row"><td colspan="5"><div class="no-data"><p>내역이 없습니다.</p></div></td></tr>';
                    		}
                    		
                    		$historyOfVisits.empty();
                			$(html).appendTo($historyOfVisits);
                    		
                    		self.$popupServiceDetail.vcModal();
                		}
                	});
                });
                // BTOCSITE-13464 방문 알리미 일정 화면 서비스 내용 상세화 END
            },

            bindPopupEvents: function() {
                var self = this;

                //방문일정 변경 팝업 날짜 선택
                self.$popupChangeVisitDate.on('click', 'table.box-table tr td:not(.disabled):not(.expected) button', function(e){
                    e.preventDefault();
                    var $table = $(this).parents('table.box-table');
                    var $td = $table.find('tr td.choice');
                    //var $span = $td.find('span.blind');
                    $td.find('span.blind').remove();
                    $td.removeClass('choice');

                    $td = $(this).parents('td');
                    $td.addClass('choice');
                    $td.prepend('<span class="blind">변경 요청일</span>');

                    $table.find('tr th.choice').removeClass('choice');
                    $td.siblings('th').addClass('choice');

                    var selectedData = self.getSelectedVisitDayData();

                    if($table.hasClass('tb-calendar')) {
                        //방문 가능 시간 데이타 가져오기
                        self.requestEnableVisitTime(selectedData);
                    } else {
                        self.setVisitDateText(selectedData);
                    }
                });

                //방문일정 변경 팝업 확인
                self.$popupChangeVisitDate.on('click', 'footer.pop-footer button:not(.ui_modal_close)', function(e){
                    e.preventDefault();
                    var param = self.getSelectedVisitDayData();
                    param.visitQna = self.$myVisitQna.is(':visible') ? self.$myVisitQna.find('div.cont').html() : null;
                    param.irregularCheckout = self.$irregularCheckout.is(':visible') ? self.$irregularCheckout.find('div.cont').html() : null;
                    

                    // BTOCSITE-954 케어솔루션 - 방문일정, 고객접점이력 관련 기능 개발
                    $selectedDate = self.$calendarTable.find('tr td.choice').length == 1;
                    $selectedTime = self.$timeTable.find('tr td.choice').length == 1;

                    if(!$selectedDate) alert('변경할 방문일을 선택해주세요.');
                    if($selectedDate && !$selectedTime) alert('방문시간을 선택해주세요.');

                    if(param.date && param.time) {
                        self.requestChangeVisitDay(param);
                    }
                   
                });
            },

            getSelectedContractID: function() {
                var self = this;
                var selectValue = self.$selectContract.vcSelectbox('selectedOption').value;
                return selectValue;
            },

            getSelectedVisitDayData: function() {
                var self = this;
                var $td = self.$calendarTable.find('tr td.choice');
                if($td.length < 1) {
                    $td = self.$calendarTable.find('tr td.expected');
                }
                var date = $td.attr('data-value');

                $td = self.$timeTable.find('tr td.choice');
                var time = $td.attr('data-value');

                var _id = self.getSelectedContractID();

                var visitTargetSeq = self.$popupChangeVisitDate.attr('data-visit-target-Seq');
                var managerEmpNo = self.$popupChangeVisitDate.attr('data-manager-emp-no');

                return {"id":_id,
                    "date":date,
                    "time":time,
                    "visitTargetSeq":visitTargetSeq,
                    "managerEmpNo":managerEmpNo
                };
            },

            requestData: function(contract) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-list-url');
                var _id = self.getSelectedContractID();   // BTOCSITE-25 케어솔루션 - 방문일정, 고객접점이력 관련 기능 개발
                location.hash = contract;
                lgkorUI.showLoading();
                lgkorUI.requestAjaxData(ajaxUrl, {"contract":contract}, function(result) {
                    var data = result.data;

                    self.setVisitQna(data.visitQna);
                    self.setIrregularCheckout(data.irregularCheckout);

                    var arr = data.listData instanceof Array ? data.listData : [];
                    self.$list.empty();
                    arr.forEach(function(item, index) {
                        item.dateString = vcui.date.format(item.date,'yyyy.MM.dd');
                        
                        var itemMonth = parseInt(vcui.date.format(item.date,'M'));
                        var itemYear = parseInt(vcui.date.format(item.date,'yyyy'));
                        var thisMonth = new Date().getMonth() + 1;
                        var thisYear = new Date().getFullYear();

                       if(_id !== 'all' && item.changeEnable) { // BTOCSITE-954 케어솔루션 - 방문일정, 고객접점이력 관련 기능 개발 
                            if(itemYear < thisYear) {
                                item.changeEnable = true;
                            } else if(itemYear == thisYear && itemMonth <= thisMonth) {
                                item.changeEnable = true;
                            } else {
                                item.changeEnable = false;
                            }
                       }
                        self.$list.append(vcui.template(visitAlarmItemTemplate, item));
                    });

                    //BTOCSITE-7039
                    var $infoTitle = $('.service-info-txt .tit');
                    if( data.prevDateStr != undefined && data.prevDateStr != "" && data.representativeModel != undefined && data.representativeModel !="") {
                        $infoTitle.find('em').not('.red').text(data.prevDateStr + "에 매니저가 방문") 
                        $infoTitle.find('em.red').text(data.representativeModel) 
                        $infoTitle.show();
                    } else {
                        $infoTitle.hide();
                    }
                });
            },

            requestEnableVisitDay: function ($dm, date, time, opener) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-day-url');
                var $list = self.$calendarTable.find('tbody');
                var _id = self.getSelectedContractID();
                if(!_id || _id=="all" || _id.length == 0) {
                    //모아보기 팝업
                    lgkorUI.alert("계약정보 선택에서 개별 계약 정보를<br>선택 후, 방문일정 변경요청을 신청해주세요.", {title: "방문일정 변경 안내"});
                    return;
                };
                var param = {
                    "id":_id,
                    "date":date,
                    "visitTargetSeq": $dm.attr('data-visit-target-seq'),
                    "managerEmpNo": $dm.attr('data-manager-emp-no')
                }
                self.$popupChangeVisitDate.attr('data-visit-target-Seq', param.visitTargetSeq);
                self.$popupChangeVisitDate.attr('data-manager-emp-no', param.managerEmpNo);

                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                    var timeTableDraw = true;
                    var data = result.data;

                    if(lgkorUI.stringToBool(data.pendingRequest)) {
                        lgkorUI.alert("방문일정 변경요청이 정상적으로 되었습니다.<br>빠른시일 내에 확인 후 안내드리겠습니다.", {title: "변경요청 승인 대기 안내"});
                        return;
                    }
                    //날짜 새로 그리기
                    var getBasicDate = null;
                    var arr = (data.dayList && data.dayList instanceof Array) ? data.dayList : [];
                    $list.empty();
                    arr.forEach(function(obj, index) {
                        obj.expectedDate = date;
                        obj.listData.forEach(function(item, index) {
                            item.expected = false;
                            if(item.value && !getBasicDate) {
                                getBasicDate = item.value;
                            }
                            item.dateString = vcui.date.format(item.value,'yyyy년 M월.d일');
                            item.day = vcui.date.format(item.value,'d');
                            if(!(!item.value) && item.value == date) {
                                item.expected = true;
                                timeTableDraw = item.type !== 'disabled'
                                
                                // if(item.type == "disabled") {
                                //     item.type = "expectedDisabled";
                                // } else {
                                //     item.type = "expected";
                                // }
                                
                            }
                        });
                        $list.append(vcui.template(popUpVisitDayItemTemplate, obj));
                    });

                    //선택되었던 시간 초기화
                    var $td = self.$timeTable.find('tr td.choice');
                    $td.removeClass('choice');
                    self.$timeTable.find('tr th.choice').removeClass('choice');

                    //$td = self.$timeTable.find('tr td[data-value="'+ time +'"]');
                    //$td.addClass('choice');
                    //$td.siblings('th').addClass('choice');
                    
                    var $td = self.$timeTable.find('tr td');
                    $td.removeClass('choice');

                    //선택 시간 정보 텍스트 수정
                    var selectedData = self.getSelectedVisitDayData();
                    if(!selectedData.date) {
                        selectedData.date = getBasicDate;
                    }
                    self.setVisitDateText(selectedData);
                    if(timeTableDraw) self.requestEnableVisitTime(selectedData);
                    
                    self.$timeTableWrap.hide();
                    self.$timeTableWrapFirst.show();
                    self.$timeTableWrapNoData.hide();
                    self.$popupChangeVisitDate.vcModal({opener:opener});
                }); 
            },

            requestChangeVisitDay: function(param) {
                var self = this;
                var ajaxUrl = self.$contents.attr('data-change-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, param, function(result){
                    var data = result.data;
                    if(lgkorUI.stringToBool(data.success)) {
                        var toast = data.toast;
                        if(toast) {
                            $(window).trigger("toastshow", toast);
                        }
                        self.setVisitQna(data.visitQna);
                        self.setIrregularCheckout(data.irregularCheckout);
                    }
                    //reloadData
                    self.reloadData();
                }); 
                $('#popupChangeVisitDate').vcModal('close');
            },

            setVisitQna: function(reply) {
                var self = this;
                if(!reply) {
                    self.$myVisitQna.hide();
                } else {
                    self.$myVisitQna.find('div.cont').html(reply);
                    self.$myVisitQna.show();
                }
            },

            setIrregularCheckout: function(reply) {
                var self = this;
                if(!reply) {
                    self.$irregularCheckout.hide();
                } else {
                    self.$irregularCheckout.find('div.cont').html(reply);
                    self.$irregularCheckout.show();
                }
            },

            setVisitDateText: function(selectedData) {
                var self = this;
                self.$visitDate.text(vcui.date.format(selectedData.date,'yyyy.MM.dd') + " " + (!selectedData.time?"":selectedData.time));
                self.setMonthText(selectedData.date);
            },

            setMonthText: function(date) {
                var self = this;
                self.$popupChangeVisitDate.find('div.month-wrap span.month').text(vcui.date.format(date,'yyyy.MM'));
            },

            requestEnableVisitTime:function(selectedData) {
                var self = this;
                var ajaxUrl = self.$popupChangeVisitDate.attr('data-time-url');
                lgkorUI.requestAjaxDataPost(ajaxUrl, selectedData, function(result){
                    var data = result.data;
                    var arr = data instanceof Array ? data : [];
                    var isEnableDayNone = true;
                    self.$timeTable.find('tr td.choice').removeClass('choice');
                    self.$timeTable.find('tr th.choice').removeClass('choice');
                    var $td = self.$timeTable.find('tr td');
                    $td.each(function(idx, item){
                        var $item = $(item);
                        var fArr = vcui.array.filter(arr, function(target){
                            return target == $item.attr('data-value');
                        });

                        if(fArr.length > 0) {
                            $item.addClass('disabled');
                            $item.find('button').attr('disabled',true);
                        } else {
                            isEnableDayNone = false;
                            $item.removeClass('disabled');
                            $item.find('button').attr('disabled',null);
                        }
                    });

                    self.$timeTableWrapFirst.hide();
                    if(isEnableDayNone) {
                        self.$timeTableWrap.hide();
                        self.$timeTableWrapNoData.show();
                    } else {
                        self.$timeTableWrap.show();
                        self.$timeTableWrapNoData.hide();
                    }

                    var selectedData = self.getSelectedVisitDayData();
                    self.setVisitDateText(selectedData);
                }); 
            },

            reloadData:function() {
                var self = this;
                var selectValue = self.$selectContract.vcSelectbox('selectedOption').value;
                self.requestData(selectValue);
            }
        }
    $(document).ready(function() {
        visitAlarm.init();
    });
})();