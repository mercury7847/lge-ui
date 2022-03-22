(function () {
  "use strict";

  // prettier-ignore
  var reservationItem = '<li class="{{#if cancelFlag}}li_cancel{{/if}}">' +
    '<div class="li_tit">' +
        '<div class="tit_txt">' +
          '{{_title}} {{_method}} 예약</div>' +
        '{{#if (!_today && !_isOverTime) && !cancelFlag}}<a href="#n" data-id="{{counselEventNo}}" class="tit_link">{{_method}}예약취소</a>{{/if}}' +
    '</div>' +
    '<dl class="li_page">' +
        '<dt>신청페이지</dt>' +
        '<dd>{{mainTitle}}' +
          '{{#if _type == "0"}}' +
            '<a href="{{counselEventUrl}}" target="_blank" class="linkbtn">상세페이지이동</a>' +
          '{{/if}}' +
        '</dd>' +
    '</dl>' +
    '<dl class="li_date">' +
        '<dt>등록일자</dt>' +
        '<dd>{{_regDate}}</dd>' +
    '</dl>' +
    '<div class="li_box{{#if _type == "2"}} booking{{/if}}">' +
      '{{#if _type != "2"}}' +
        '<dl>' +
            '<dt>상담제품</dt>' +
            '<dd>{{_category}}' +
              '{{#if _type == "1" && _prdId}}' +
                '<a href="#n" class="linkbtn product" data-prd-id="{{_prdId}}">제품정보팝업호출</a>' +
              '{{/if}}' +
            '</dd>' +
            '{{#if selectVisitCycleId}}<dt>방문주기</dt>' +
            '<dd>{{selectVisitCycleId}}개월/1회</dd>{{/if}}' +
        '</dl>' +
      '{{#else}}' +
        '<dl>' +
          '<dt>구매예약제품</dt>' +
          '<dd>' +
            '{{#each item in _category}} <div class="li_categ">' +
              '{{#each cate in item}}<span>{{cate}}' + 
                '{{#if $index!=0}} <span class="gap"></span> {{/if}}</span>' +
              '{{/each}}' +
            '</div> {{/each}}' +
          '</dd>' +
        '</dl>' +
      '{{/if}}' +
        '<dl>' +
            '<dt>{{_loc}}매장</dt>' +
            '<dd>{{requestOrgcodeName}}' + 
            '{{#if _storeId}}<a href="#n" data-url="/support/store-finder-{{_storeId}}" class="linkbtn store">매장상세정보이동</a>{{/if}}' +
            '</dd>' +
            '<dt>예약일시</dt>' +
            '<dd>{{_visitDate}}</dd>' +
        '</dl>' +
        '<dl>' +
            '<dt>신청자</dt>' +
            '<dd>{{_name}}</dd>' +
            '<dt>휴대폰번호</dt>' +
            '<dd>{{visitorTelno}}</dd>' +
        '</dl>' +
    '</div>' +
  '</li>';

  // prettier-ignore
  var productItem = '<div class="prd_img">' +
      '<img src="{{_img}}" alt="{{userFriendlyName}}">' + 
    '</div>' + 
    '<p class="prd_name">{{userFriendlyName}}</p>' + 
    '<p class="prd_model">{{modelName}}</p>' + 
    '<dl class="prd_visit">' + 
      '<dt>방문주기</dt>' + 
      '<dd>{{selectVisitCycleId}}개월</dd>' + 
    '</dl>' + 
    '<dl class="prd_pay">' + 
      '<dt>이용요금</dt>' + 
      '<dd>월 {{_price}}원</dd>' + 
    '</dl>';

  var linkHost =
    window.LGEAPPHostName === "localhost" ? "https://www.lge.co.kr" : "";

  // var SESSION_TAB_INDEX = "bestshop_counsel_tabindex"; // hash 활성화로 변경하여 사용 안함
  var SYSTEM_DOWN_TIME_PLAN = "SYSTEM_DOWN_TIME_PLAN"; // 서버 점검
  var NOT_LOG_IN = "NOT_LOG_IN"; //

  var module = {
    variable: {
      store: null,
      tabActIndex: 0, // 탭 활성화 index
      tabLabelKeys: ["매장상담", "케어십", "소모품"], // 탭별 json 데이터 filter 를 위한
      listData: [], // json 데이터 담을 팝업
      showListLen: 0, // 리스트 노출된 갯수
      showListCount: 13, // 리스트 더보기 시 추가 노출할 갯수
      dateRegex: /^(\d{4}-\d{2}-\d{2}).+/, // yyyy-mm-dd 형만 추출
      revType: null, // 상담 | 예약
    },
    el: {
      $container: null, // 컨테이너

      $tabContainer: null, // 탭 컨테이너
      $listContainer: null, // 리스트 컨테이너
      $moreBtn: null, // 더보기 버튼
      $noData: null, // 내역 없음 문구
      $error: null, // 에러 문구
      $notice: null, // 유의사항 항목

      $popCancelTodayAlert: null, // 취소 불가 팝업
      $popCancelComplete: null, // 취소 완료 팝업
      $popProduct: null, // 제품 팝업
      // $popCancelConfirm: null, // 취소 컨펌 팝업
    },
    selector: {
      tabContainer: ".tabs-wrap",
      listContainer: ".cv_list",
      moreBtn: ".readmore > a",
      noData: ".no-data",
      error: ".cv_error",
      notice: ".cv_note",

      popCancelTodayAlert: "#laypop2",
      popCancelComplete: "#popup1",
      popProduct: "#popup2",
      // popCancelConfirm: "#laypop1",
    },
    setProperty: function () {
      var container = this.el.$container;

      this.el.$tabContainer = container.find(this.selector.tabContainer);
      this.el.$listContainer = container.find(this.selector.listContainer);
      this.el.$moreBtn = container.find(this.selector.moreBtn);
      this.el.$noData = container.find(this.selector.noData);
      this.el.$error = container.find(this.selector.error);
      this.el.$notice = container.find(this.selector.notice);

      this.el.$popCancelTodayAlert = $(this.selector.popCancelTodayAlert);
      this.el.$popCancelComplete = $(this.selector.popCancelComplete);
      this.el.$popProduct = $(this.selector.popProduct);
      // this.el.$popCancelConfirm = $(this.selector.popCancelConfirm);

      this.variable.store = window.sessionStorage;
    },
    bind: function () {
      this.el.$container.on(
        "click",
        "a.linkbtn.product",
        this.handler.clickProduct.bind(this)
      );

      // 상담매장 클릭
      this.el.$container.on(
        "click",
        "a.linkbtn.store",
        this.handler.clickStorePopup.bind(this)
      );

      // 상담 취소
      this.el.$container.on(
        "click",
        "a.tit_link",
        this.handler.clickCancel.bind(this)
      );

      // 더보기
      this.el.$moreBtn.on("click", this.handler.clickMore.bind(this));
    },
    handler: {
      /**
       * 탭 변경 이벤트
       * @param {Event} e
       * @param {Object} data 탭 상태 정보
       */
      changeTab: function (e, data) {
        this.variable.tabActIndex = parseInt(data.selectedIndex);

        /* this.variable.store.setItem(
          SESSION_TAB_INDEX,
          this.variable.tabActIndex
        ); */

        // hash 강제 변경
        var id = data.button.attr("href");
        history.replaceState(
          null,
          null,
          location.origin + location.pathname + location.search + id
        );

        // 에러인 경우 탭 클릭 방지
        if (this.el.$error.is(":hidden")) {
          this.createList();
        }
      },
      /**
       * 더보기 클릭
       */
      clickMore: function () {
        this.variable.showListLen = Math.min(
          this.variable.showListLen + this.variable.showListCount,
          this.variable.listData.length
        );

        this.addList();
      },
      /**
       * 상담 제품 클릭
       * @param {*} e
       */
      clickProduct: function (e) {
        e.preventDefault();

        var prdId = $(e.currentTarget).data("prd-id");

        this.openProduct({ target: e.currentTarget, id: prdId });
      },
      /**
       * 상담 매장 클릭
       * @param {*} e
       */
      clickStorePopup: function (e) {
        e.preventDefault();

        var url = $(e.currentTarget).data("url");
        this.openWindowPop(url);
      },
      /**
       * 상담 예약 취소
       * @param {*} e
       */
      clickCancel: function (e) {
        e.preventDefault();

        var target = $(e.currentTarget);
        var revDate = target.closest("li").data("rev-date");
        this.variable.revType = target.closest("li").data("rev-type");

        if (revDate && this.getIsToday(revDate)) {
          // 당일 예약 불가

          this.el.$popCancelTodayAlert.vcModal({ opener: target });

          /* lgkorUI.alert(
            "<h6>예약일 당일에는 취소가 불가 합니다.</h6>",
            {},
            target
          ); */
        } else {
          //  예약 취소 컴펌

          /*  var $popCancelConfirm = this.el.$popCancelConfirm;

          $popCancelConfirm.find(".btn:not(.gray)").attr("data-role", "ok");
          $popCancelConfirm
            .off("modalok")
            .on("modalok", this.callCheckLogin.bind(this));

          $popCancelConfirm.vcModal({ opener: target, title: vcui.template('') }); */

          lgkorUI.confirm(
            "<h6>접수하신 " +
              this.variable.revType +
              "예약을 취소하시겠습니까?</h6>",
            {
              ok: function () {
                // this.callCheckLogin();
                this.callCancel(target);
                //console.log("ok");
              }.bind(this),
              cancel: function () {
                this.variable.revType = null;
                // console.log("cancel");
              }.bind(this),
            },
            target
          );
        }
      },
    },
    init: function (el) {
      this.el.$container = $(el);

      // console.log("상담 예약 조회 :: init");

      if (!this.el.$container.length > 0) {
        return;
      }

      this.setProperty();
      this.bind();

      // 탭 초기화 완료 후 list ajax 호출
      this.el.$tabContainer.on("tabinit", this.initedTab.bind(this));

      this.inited = this.el.$container !== null;

      // console.log("상담 예약 조회 :: init - complete");
    },
    /**
     * 탭 초기화 완료
     * @param {Event} e
     * @param {Object} data 탭 상태 정보
     */
    initedTab: function (e, data) {
      // index 세션 존재 시 활성화 변경 (클릭 리스너 등록 전 선행)
      /* if (this.variable.store.getItem(SESSION_TAB_INDEX)) {
        this.variable.tabActIndex =
          this.variable.store.getItem(SESSION_TAB_INDEX);

        this.el.$tabContainer.vcTab("select", this.variable.tabActIndex);
      } */

      // hash 활성화로 변경
      if (location.hash) {
        this.el.$tabContainer.vcTab("selectByName", location.hash);
        this.variable.tabActIndex = this.el.$tabContainer.vcTab("getSelectIdx");
      }

      // 클릭 이벤트 등록
      this.el.$tabContainer.on("tabchange", this.handler.changeTab.bind(this));

      // 리스트 요청
      this.callList();
    },
    error: function (result) {
      var errorMsg = "";

      if (result.message === "SYSTEM_DOWN_TIME_PLAN") {
        errorMsg = result.downTimeStart + " ~ " + result.downTimeEnd;
      }

      this.el.$error.show().find(".msg_annex > dd").html(errorMsg);
      this.el.$noData.hide();
      this.el.$notice.hide();
    },
    /**
     * 리스트 요청
     */
    callList: function () {
      var ajaxUrl = this.el.$container.data("reservation-list");
      /* var postData = this.el.$container.data("id")
        ? { request_id: this.el.$container.data("id") } // 회원 아이디 ??
        : null; */

      lgkorUI.showLoading();
      lgkorUI.requestAjaxDataPost(
        ajaxUrl,
        {},
        function (result) {
          if (result.status === "error") {
            if (result.message === SYSTEM_DOWN_TIME_PLAN) {
              this.error(result);
            } else if (result.message === NOT_LOG_IN) {
              this.goLogin();
            }

            return;
          }

          this.variable.listData = result.data.counselOrderList || [];

          this.createCount();
          this.createList();

          this.el.$notice.show();
        }.bind(this),
        true
      );
    },
    /**
     * 예약 취소 요청
     */
    callCancel: function (opener) {
      var id = opener ? opener.data("id") : null;
      var ajaxUrl = this.el.$container.data("reservation-cancel");
      var postData = { counselRequestId: id };

      lgkorUI.showLoading();

      lgkorUI.requestAjaxDataPost(
        ajaxUrl,
        postData,
        function (result) {
          var status = result.status.toLocaleLowerCase();

          if (status === "error") {
            if (result.message === NOT_LOG_IN) {
              this.goLogin();
            } else {
              lgkorUI.alert("취소 신청이 정상적으로 처리되지 않았습니다.", {
                ok: function () {
                  location.reload();
                },
              });
            }
          } else if (status === "fail02") {
            // 이미 취소된 처리
            lgkorUI.alert(result.message, {
              ok: function () {
                location.reload();
              },
            });
          } else {
            this.cancelComplete();
          }
        }.bind(this),
        true
      );
    },
    /**
     * 로그인 체크
     */
    /* callCheckLogin: function (callback) {
      var ajaxUrl = $("header").data("login-info");

      if (!ajaxUrl) {
        return;
      }

      lgkorUI.requestAjaxDataPost(
        ajaxUrl,
        {},
        function (result) {
          if (!result.data.isLogin) {
            this.goLogin();
          } else {
            if (callback) callback();
          }
        }.bind(this)
      );
    }, */
    /**
     * 리스트 정렬
     */
    sortList: function () {
      var listData = this.variable.listData;
      var oldRevArr = []; // 예약일 기준 지난 건
      var revArr = []; // 예약일 기준 이후 건

      listData.forEach(
        function (data) {
          if (
            data.hasOwnProperty("storeVisitDateTime") &&
            data.hasOwnProperty("requestDate")
          ) {
            // 예약일
            var visitDateData = data.storeVisitDateTime;
            var visitDateStr = visitDateData.replace(
              this.variable.dateRegex,
              "$1"
            );

            // 등록일
            var regDateData = data.requestDate.replace(/\./g, "-");
            var regDateStr = regDateData.replace(this.variable.dateRegex, "$1");

            // 유효성 체크
            if (
              vcui.date.isValid(visitDateStr) &&
              vcui.date.isValid(regDateStr)
            ) {
              // 예약일시 시간만 추출
              var hours = visitDateData.replace(
                /\d{4}-\d{2}-\d{2}\s(\d+)./,
                "$1"
              );

              // 방문 일시 date 객체 정의
              var visitDate = vcui.date.add(
                vcui.date.parse(visitDateStr),
                "h",
                hours
              );

              // "storeVisitDateTime" 바인딩 format 수정
              data._visitDate = vcui.date.format(
                visitDate,
                "yyyy년 MM월 dd일, hh시"
              );
              data._visitDateStr = visitDateStr; // yyyy-mm-dd 형태의 예약일

              // "reg_date" 바인딩 format 수정
              data._regDate = vcui.date.format(regDateStr, "yyyy년 MM월 dd일");
              // 정렬을 위한 등록일시 타임형태로 저장
              data._sort = vcui.date.parse(regDateStr).getTime();
              // today
              data._today = this.getIsToday(visitDateStr) || false;
              // 지난 시간
              data._isOverTime = vcui.date.compare(visitDate, new Date()) === 1;

              // 조회시점과 예약일 비교 (시간까지 비교위해 getTime)
              if (this.variable.date.getTime() > visitDate.getTime()) {
                // 오늘 지난 예약건 저장
                oldRevArr.push(data);
              } else {
                // 오늘 이후 예약건 저장
                revArr.push(data);
              }
            }
          }
        }.bind(this)
      );

      // 지난건 내림 차순 정렬
      revArr.sort(function (a, b) {
        return b._sort - a._sort;
      });
      // 이후건 오름 차순 정렬
      oldRevArr.sort(function (a, b) {
        return a._sort - b._sort;
      });

      // 정렬된 데이터 override
      this.variable.listData = revArr.concat(oldRevArr);
    },
    /**
     * 탭 카운팅 정의
     */
    createCount: function () {
      var listData = this.variable.listData;

      // 히든 처리
      this.el.$tabContainer.find("a > span").html("");

      // 카운트 노출
      this.variable.tabLabelKeys.forEach(
        function (label, idx) {
          var group =
            listData.filter(function (item) {
              return item.counselEventType === label;
            }) || [];

          if (group.length) {
            this.el.$tabContainer
              .find("a")
              .eq(idx)
              .find("> span")
              .html(group.length);
          }
        }.bind(this)
      );
    },
    /**
     * 리스트 ajax 완료 & 탭 클릭 시 호출 함수
     */
    createList: function () {
      this.variable.date = new Date(); // 현재 date 저장
      this.variable.showListLen = this.variable.showListCount; // 리스트 노출 len

      this.removeList(); // 비움
      this.el.$moreBtn.hide(); // 더보기 숨김

      this.sortList(); // 리스트 소팅
      this.addList(); // 리스트 추가

      this.scrollToActTab(); // 탭 활성화 스크롤 이동
    },
    /**
     * 예약정보 리스트 추가 함수
     */
    addList: function () {
      var listData = this.variable.listData;
      var start = this.el.$listContainer.children().length;

      // 탭 활성화에 맞게 리스트 filter
      listData = listData.filter(
        function (item) {
          return (
            item.counselEventType ===
            this.variable.tabLabelKeys[this.variable.tabActIndex]
          );
        }.bind(this)
      );

      // 탭 활성화에 맞는 리스트 기반으로 노출
      if (listData.length > 0) {
        var addListData = listData.slice(start, this.variable.showListLen);
        addListData.forEach(this.addItem.bind(this)); // 추가

        var isEnd = this.el.$listContainer.children().length >= listData.length;
        this.el.$moreBtn.toggle(!isEnd);
      }

      this.el.$noData.toggle(!listData.length); // nodata 유무
    },
    /**
     * 예약정보 추가 함수
     * @param {Object} item 예약 정보 데이터 1건
     */
    addItem: function (item) {
      item = $.extend({}, item);

      item._type = parseInt(this.variable.tabActIndex);

      // 매장 코드
      if (item.hasOwnProperty("storeUrl")) {
        item._storeId = null;

        var stRegex = /.+\/detail-(\w+)/i;
        if (item.storeUrl.match(stRegex)) {
          item._storeId = item.storeUrl.replace(stRegex, "$1");
        }
      }

      // 신청자
      if (item.hasOwnProperty("visitorName")) {
        item._name = this.middleMaskingText(item.visitorName);
      }

      // 상담제품
      if (
        item.hasOwnProperty("requestCategory") ||
        item.hasOwnProperty("modelDisplayName")
      ) {
        item._prdId = null;
        item._category = null;

        var categorys;

        if (item._type === 0) {
          // 방문상담/화상상담
          if (
            item.hasOwnProperty("requestCategory") &&
            item.requestCategory.match(/\,/g)
          ) {
            categorys = item.requestCategory.split(",").map(function (item) {
              return item.trim();
            });

            item._category =
              categorys[0] + " 외 " + (categorys.length - 1) + "개";
          }
        } else {
          if (item.hasOwnProperty("modelDisplayName")) {
            if (item._type === 1) {
              // 케어십
              var prdRegex = /.+\((.+)\)/i;
              if (item.modelDisplayName.match(prdRegex)) {
                item._prdId = item.modelDisplayName.replace(prdRegex, "$1");
              }

              item._category = item.modelDisplayName;
            } else {
              // 소모품
              if (item.modelDisplayName.match(/\,/g)) {
                categorys = item.modelDisplayName
                  .split(",")
                  .map(function (item) {
                    return item.trim();
                  });

                item._category = categorys.map(function (item) {
                  return item
                    .replace(/\>/g, ",")
                    .split(",")
                    .map(function (label) {
                      return label.trim();
                    });
                });
              }
            }
          }
        }
      }

      // 각 탭 마크업 특수
      if (item.hasOwnProperty("counselEventType")) {
        item._method = item._type !== 2 ? "상담" : "구매";
        item._loc = item._type !== 2 ? "상담" : "예약";
        item._title =
          item._type === 0 ? "" : this.variable.tabLabelKeys[item._type];
      }

      this.el.$listContainer.append(vcui.template(reservationItem, item));

      var li = this.el.$listContainer.find("li:last");
      li.data("rev-date", item._visitDateStr);
      li.data("rev-type", item._method);
    },
    /**
     * 리스트 전부 제거
     */
    removeList: function () {
      this.el.$listContainer.empty();
    },
    /**
     * 인자가 오늘날짜인지 비교
     * @param {String} dateStr yyyy-MM-dd
     * @returns true | false
     */
    getIsToday: function (dateStr) {
      return (
        vcui.date.compare(
          dateStr,
          vcui.date.format(new Date(), "yyyy-MM-dd")
        ) === 0
      );
    },
    /**
     * 예약 취소 완료
     */
    cancelComplete: function () {
      var $popCancelComplete = this.el.$popCancelComplete;
      $popCancelComplete.off("modalhidden").on("modalhidden", function () {
        // 팝업 닫히면 새로고침
        location.reload();
      });

      $popCancelComplete.vcModal({
        title: this.variable.revType + " 예약 취소 완료",
      });
    },
    /**
     * 제품 정보 열기
     * @param {Object} data
     * @param {*} data.target 팝업 여는 버튼 element
     * @param {*} data.id 조회할 제품 id
     */
    openProduct: function (data) {
      var target = data.target;
      var id = data.id;
      var ajaxUrl = this.el.$container.data("reservation-product-info");

      lgkorUI.requestAjaxDataPost(
        ajaxUrl,
        { modelName: id },
        function (result) {
          this.el.$popProduct
            .off("modalshow")
            .on("modalshow", this.createProduct.bind(this, result.data));
          this.el.$popProduct.vcModal({ opener: target });
        }.bind(this),
        true
      );
    },
    /**
     * 제품 정보 내부 마크업 생성
     * @param {Object} item 제품 json 데이터
     */
    createProduct: function (item) {
      // 이미지
      if (item.hasOwnProperty("modelImg")) {
        item._img = linkHost + item.modelImg;
      }

      // 월 이용요
      if (item.hasOwnProperty("monthlyPrice")) {
        item._price = vcui.number.addComma(item.monthlyPrice);
      }

      this.el.$popProduct
        .find(".consult_view-prdpop")
        .html(vcui.template(productItem, item));
    },
    /**
     * 문자 중앙 마스킹
     * @param {String} str
     * @returns
     * @example 홍*동 | 홍**동 | ho******ng
     */
    middleMaskingText: function (str) {
      var maskRegex;
      var regex;

      if (str.match(/^[\u3131-\u318E\uAC00-\uD7A3]/)) {
        // 한글
        maskRegex = /^.(.+).$/;
        regex = /(^.).+(.$)/;
      } else {
        // 영문
        maskRegex = /^.{2}(.+).{2}$/;
        regex = /(^.{2}).+(.{2}$)/;
      }

      var masking = str.replace(maskRegex, "$1");
      masking = vcui.string.replaceAll(masking, /./, "*");

      return str.replace(regex, "$1" + masking + "$2");
    },
    /**
     * 모바일 탭 활성화 스크롤 이동
     */
    scrollToActTab: function () {
      var tabUL = this.el.$tabContainer.find("> ul");
      var onBtn = tabUL.find("li.on");

      if (onBtn.length > 0) {
        var onBtnElm = onBtn.get(0);
        var left = onBtnElm.offsetLeft;

        tabUL.get(0).scrollTo({ left: left });
      }
    },
    /**
     * 매장 정보 윈도우 팜업
     * @param {String} url 새창 띄울 url
     */
    openWindowPop: function (url) {
      var windowWidth = $(window).width();
      var windowHeight = $(window).height();
      var width = windowWidth < 1070 ? windowWidth : 1070;

      if (isApp() && vcui.detect.isIOS) {
        var jsonString = JSON.stringify({
          url: "https://" + window.LGEAPPHostName + url,
          command: "openInAppBrowser",
        });
        webkit.messageHandlers.callbackHandler.postMessage(jsonString);
      } else {
        void window.open(
          linkHost + url,
          "_blank",
          "width=" +
            width +
            ", height=" +
            windowHeight +
            ", scrollbars=yes, location=no, menubar=no, status=no, toolbar=no"
        );
      }
    },
    goLogin: function () {
      location.href =
        linkHost +
        "/sso/api/emp/Login?state=" +
        encodeURIComponent(location.href.replace(location.origin, ""));
    },
  };

  $(document).ready(function () {
    module.init(".consult_view-wrap");
  });
})();
