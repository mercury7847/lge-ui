(function () {
  "use strict";

  // prettier-ignore
  var reservationItem = '<li class="{{#if cancel_flag}}li_cancel{{/if}}">' +
    '<div class="li_tit">' +
        '<div class="tit_txt{{#if _customerCancel}} customer{{/if}}">' +
          '{{_title}} {{_method}} 예약</div>' +
        '{{#if !_today && !cancel_flag}}<a href="#n" class="tit_link">{{_method}}예약취소</a>{{/if}}' +
    '</div>' +
    '<dl class="li_page">' +
        '<dt>신청페이지</dt>' +
        '<dd>{{main_title}}' +
          '{{#if _type == "0"}}' +
            '<a href="{{_reservationPage}}" class="linkbtn">상세페이지이동</a>' +
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
              '{{#if _type == "1"}}' +
                '<a href="#n" class="linkbtn product">제품정보팝업호출</a>' +
              '{{/if}}' +
            '</dd>' +
            '{{#if visit_cycle}}<dt>방문주기</dt>' +
            '<dd>{{visit_cycle}}</dd>{{/if}}' +
        '</dl>' +
      '{{#else}}' +
        '<dl>' +
          '<dt>구매예약제품</dt>' +
          '<dd>' +
            '<div class="li_categ">' +
              '<span>프라엘</span>' +
              '<span class="gap"></span>' +
              '<span>딥클렌징</span>' +
          '</div>' +
          '<div class="li_categ">' +
              '<span>주방가전</span>' +
              '<span class="gap"></span>' +
              '<span>광파오븐/전자레인지</span>' +
          '</div>' +
          '<div class="li_categ">' +
              '<span>에어컨/에어케어</span>' +
              '<span class="gap"></span>' +
              '<span>휴대용 공기청정기</span>' +
          '</div>' +
          '</dd>' +
        '</dl>' +
      '{{/if}}' +
        '<dl>' +
            '<dt>{{_loc}}매장</dt>' +
            '<dd>{{request_orgcode_name}}<a href="#n" data-url="/support/store-finder-ST00005604" class="linkbtn store">매장상세정보이동</a></dd>' +
            '<dt>예약일시</dt>' +
            '<dd>{{_visitDate}}</dd>' +
        '</dl>' +
        '<dl>' +
            '<dt>신청자</dt>' +
            '<dd>{{_name}}</dd>' +
            '<dt>휴대폰번호</dt>' +
            '<dd>{{visitor_telno}}</dd>' +
        '</dl>' +
    '</div>' +
  '</li>';

  var linkHost =
    window.LGEAPPHostName === "localhost" ? "https://www.lge.co.kr" : "";

  var SESSION_TAB_INDEX = "bestshop_counsel_tabindex";

  var module = {
    variable: {
      store: null,
      tabActIndex: 0, // 탭 활성화 index
      tabLabelKeys: ["매장상담", "케어십", "소모품"], // 탭별 json 데이터 filter 를 위한
      listData: [], // json 데이터 담을 팝업
      showListLen: 0, // 리스트 노출된 갯수
      showListCount: 13, // 리스트 더보기 시 추가 노출할 갯수
      products: [], // gnb 기준 제품 리스트
      dateRegex: /^(\d{4}-\d{2}-\d{2}).+/, // yyyy-mm-dd 형만 추출
    },
    el: {
      $container: null, // 컨테이너

      $tabContainer: null, // 탭 컨테이너
      $listContainer: null, // 리스트 컨테이너
      $moreBtn: null, // 더보기 버튼
      $noData: null, // 내역 없음 문구
      $error: null, // 에러 문구
      $notice: null, // 유의사항 항목

      $popCancelAlert: null, // 취소 불가 팝업
      $popCancelConfirm: null, // 취소 컨펌 팝업
      $popCancelComplete: null, // 취소 완료 팝업
      $popProduct: null, // 제품 팝업
    },
    selector: {
      tabContainer: ".tabs-wrap",
      listContainer: ".cv_list",
      moreBtn: ".readmore > a",
      noData: ".no-data",
      error: ".cv_error",
      notice: ".cv_note",

      popCancelAlert: "#laypop2",
      popCancelConfirm: "#laypop1",
      popCancelComplete: "#popup1",
      popProduct: "#popup2",
    },
    setProperty: function () {
      var container = this.el.$container;

      this.el.$tabContainer = container.find(this.selector.tabContainer);
      this.el.$listContainer = container.find(this.selector.listContainer);
      this.el.$moreBtn = container.find(this.selector.moreBtn);
      this.el.$noData = container.find(this.selector.noData);
      this.el.$error = container.find(this.selector.error);
      this.el.$notice = container.find(this.selector.notice);

      this.el.$popCancelAlert = $(this.selector.popCancelAlert);
      this.el.$popCancelConfirm = $(this.selector.popCancelConfirm);
      this.el.$popCancelComplete = $(this.selector.popCancelComplete);
      this.el.$popProduct = $(this.selector.popProduct);

      this.variable.store = window.sessionStorage;
    },
    bind: function () {
      // 탭 변경
      this.el.$tabContainer.on("tabchange", this.handler.changeTab.bind(this));
      this.el.$tabContainer.on("tabinit", this.handler.initedTab.bind(this));

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
        this.variable.store.setItem(
          SESSION_TAB_INDEX,
          this.variable.tabActIndex
        );

        this.createList();
      },
      /**
       * 탭 초기화 완료
       * @param {Event} e
       * @param {Object} data 탭 상태 정보
       */
      initedTab: function (e, data) {
        if (this.variable.store.getItem(SESSION_TAB_INDEX)) {
          this.variable.tabActIndex =
            this.variable.store.getItem(SESSION_TAB_INDEX);

          this.el.$tabContainer.vcTab("select", this.variable.tabActIndex);
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

        this.el.$popProduct.vcModal({ opener: e.currentTarget });
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

        if (revDate && this.getIsToday(revDate)) {
          // 당일 예약 불가

          this.el.$popCancelAlert.vcModal({ opener: target });

          /* lgkorUI.alert(
            "<h6>예약일 당일에는 취소가 불가 합니다.</h6>",
            {},
            target
          ); */
        } else {
          //  예약 취소 컴펌

          var $popCancelConfirm = this.el.$popCancelConfirm;

          $popCancelConfirm.find(".btn:not(.gray)").attr("data-role", "ok");
          $popCancelConfirm
            .off("modalok")
            .on("modalok", this.callCheckLogin.bind(this));

          $popCancelConfirm.vcModal({ opener: target });

          /* lgkorUI.confirm(
            "<h6>접수하신 상담예약을 취소하시겠습니까?.</h6>",
            {
              ok: function () {
                console.log("ok");
              },
              cancel: function () {
                // console.log("cancel");
              },
            },
            target
          ); */
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

      //this.setProductCategory();
      this.callList();

      this.inited = this.el.$container !== null;

      // console.log("상담 예약 조회 :: init - complete");
    },
    /* setProductCategory() {
      $(".nav > li:eq(0) .nav-category-wrap").each((idx, item) => {
        //console.log(item);
      });
    }, */
    error: function (err) {
      if (err.status === 404) {
        // err.status : 404
        // console.log(404);
      } else {
        // status !== "success"
        // console.log("alert message");
      }

      this.el.$error.show();
      this.el.$noData.hide();
      this.el.$notice.hide();
    },
    /**
     * list 요청
     */
    callList: function () {
      var ajaxUrl = this.el.$container.data("reservation-list");
      var postData = this.el.$container.data("id")
        ? { request_id: this.el.$container.data("id") } // 회원 아이디 ??
        : null;

      lgkorUI.showLoading();
      lgkorUI.requestAjaxData(
        ajaxUrl,
        postData,
        function (result) {
          if (result.status !== "success") {
            this.error(result);
            return;
          }

          this.variable.listData = result.data.listData || [];

          this.createCount();
          this.createList();

          this.el.$notice.show();
        }.bind(this),
        "POST",
        null,
        true,
        null,
        null,
        this.error.bind(this)
      );
    },
    /**
     * cancel 요청
     */
    callCancel: function () {
      var ajaxUrl = this.el.$container.data("reservation-cancel");
      var postData = { counsel_event_no: "" };

      lgkorUI.showLoading();

      lgkorUI.requestAjaxDataPost(
        ajaxUrl,
        postData,
        function (result) {
          if (result.status !== "success") {
            lgkorUI.alert(result.message);
            return;
          }

          if (result.data.cancel_yn == "N") {
            lgkorUI.alert(result.data.cancel_message);
          } else {
            this.cancelComplete();
          }
        }.bind(this)
      );
    },
    /**
     * cancel 요청 전 로그인 체크
     */
    callCheckLogin: function () {
      var ajaxUrl = $("header").data("login-info");

      if (!ajaxUrl) {
        return;
      }

      lgkorUI.requestAjaxDataPost(
        ajaxUrl,
        {},
        function (result) {
          if (!result.data.isLogin) {
            location.href = linkHost + "/sso/api/emp/Login";
          } else {
            this.callCancel();
          }
        }.bind(this)
      );
    },
    /**
     * 리스트 정렬
     */
    sortList: function () {
      var listData = this.variable.listData;
      var oldRevArr = []; // 예약일 기준 지난 건
      var revArr = []; // 예약일 기준 이후 건

      listData.forEach(
        function (data) {
          var keys = vcui.object.keys(data) || [];

          if (
            vcui.array.has(keys, "store_visit_date_time") &&
            vcui.array.has(keys, "reg_date")
          ) {
            // 예약일
            var visitDateData = data.store_visit_date_time;
            var visitDateStr = visitDateData.replace(
              this.variable.dateRegex,
              "$1"
            );

            // 등록일
            var regDateData = data.reg_date;
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

              // "store_visit_date_time" 바인딩 format 수정
              data._visitDate = vcui.date.format(
                visitDate,
                "yyyy년 MM월 dd일, hh시"
              );
              // "reg_date" 바인딩 format 수정
              data._regDate = vcui.date.format(regDateStr, "yyyy년 MM월 dd일");
              // 정렬을 위한 등록일시 타임형태로 저장
              data._sort = vcui.date.parse(regDateStr).getTime();
              // today
              data._today = this.getIsToday(visitDateStr) || false;

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
            vcui.array.filter(listData, function (item) {
              return item.cousel_event_type === label;
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
    },
    /**
     * 예약정보 리스트 추가 함수
     */
    addList: function () {
      var listData = this.variable.listData;
      var start = this.el.$listContainer.children().length;

      // 탭 활성화에 맞게 리스트 filter
      listData = vcui.array.filter(
        listData,
        function (item) {
          return (
            item.cousel_event_type ===
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
      var revDate; // yyyy-mm-dd 형태의 예약일
      var keys = vcui.object.keys(item) || [];
      item = $.extend({}, item);

      item._type = this.variable.tabActIndex;

      // 신청페이지
      item._reservationPage =
        linkHost +
        "/support/visit-store-reservation?orgCode=" +
        item.request_orgcode;

      // 신청자
      if (vcui.array.has(keys, "visitor_name")) {
        item._name = this.middleMaskingText(item.visitor_name);
      }

      // 상담제품
      if (vcui.array.has(keys, "request_category")) {
        // 방문/화상 상담탭 && 공백 없는 '문자/문자' 인 경우
        if (!item._type && item.request_category.match(/[^\s]\/[^\s]/g)) {
          var categorys = item.request_category.split("/");

          item._category =
            categorys[0] + " 외 " + (categorys.length - 1) + "개";
        } else {
          item._category = item.request_category;
        }
      }

      // 각 탭 마크업 특수
      if (vcui.array.has(keys, "cousel_event_type")) {
        item._method = item._type !== 2 ? "상담" : "구매";
        item._loc = item._type !== 2 ? "상담" : "예약";
        item._title =
          item._type === 0 ? "" : this.variable.tabLabelKeys[item._type];
      }

      // 고객취소 | 매장취소
      if (vcui.array.has(keys, "cancel_flag")) {
        item._customerCancel = item.cancel_flag === "고객취소";
      }

      this.el.$listContainer.append(vcui.template(reservationItem, item));

      var li = this.el.$listContainer.find("li:last");
      li.data("rev-date", revDate); // 자정 넘기고 예약취소 노출 된 상태 클릭 시 비교를 위한 저장
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

      $popCancelComplete.vcModal();
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
  };

  $(document).ready(function () {
    module.init(".consult_view-wrap");
  });
})();
