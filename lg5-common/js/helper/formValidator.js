var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * @module vcui.helper.Geolocation
 * @license MIT License
 * @description 지오로케이션 헬퍼
 * @copyright VinylC UID Group
 */
define('helper/formValidator', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var messages = {
        required: "'[name]'항목은 필수입력 항목입니다.",
        match: "'[name]'항목은 '{targetName}'항목과 동일해야 합니다.",
        email: "'[name]'항목이 이메일 형식에 맞지 않습니다.",
        minlength: "'[name]'항목의 최소길이는 {0}입니다.",
        maxlength: "'[name]'항목의 최대길이는 {0}입니다",
        exactlength: "'[name]'항목은 {0}길이여야 합니다.",
        rangelength: "'[name]'항목의 길이가 {0}와 {1}사이여야 합니다.",
        minchecked: "'[name]'항목의 최소 {0}개 이상 체크해 주세요.",
        maxchecked: "'[name]'항목의 최대 {0}개 이하 체크해 주세요.",
        exactchecked: "'[name]'항목은 {0}개 체크해 주세요.",
        rangechecked: "'[name]'항목은 {0}개에서 {1}개 사이에만 체크해 주세요.",
        alpha: "'[name]'항목은 영문자만 유효합니다.",
        alnum: "'[name]'항목은 영문자와 숫자만 유효합니다.",
        numeric: "'[name]'항목은 숫자, ., -만 유효합니다.",
        integer: "'[name]'항목은 -, 숫자만 유효합니다.",
        decimal: "'[name]'항목은 -, ., 숫자만 유효합니다.",
        nozero: "'[name]'항목은 0으로 시작하면 안됩니다.",
        file: "'[name]'항목은 {0}확장자만 유효합니다.",
        url: "url주소 형식이 잘못 되었습니다.",
        tel: "전화번호가 잘못 되었습니다.",
        mobile: "휴대폰번호 형식이 잘못 되었습니다.",
        gt_date: "'[name]'날짜는 '{targetName}'날짜보다 이후여야 합니다.",
        lt_date: "'[name]'날짜는 '{targetName}'날짜보다 이전이어야 합니다.",
        eqgt_date: "'[name]'날짜는 '{targetName}'날짜와 같거나 이후여야 합니다.",
        eqlt_date: "'[name]'날짜는 '{targetName}'날짜와 같거나 이전이어야 합니다.",
        regexp: "[data-pattern] 정규식에 안맞습니다."
    };

    var ruleRegex = /^(.+?)\((.+)\)$/,
        numericRegex = /^[0-9]+$/,
        integerRegex = /^\-?[0-9]+$/,
        decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
        emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        alphaRegex = /^[a-z]+$/i,
        alphaNumericRegex = /^[a-z0-9]+$/i,
        naturalNoZeroRegex = /^[1-9][0-9]*$/i,
        ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
        base64Regex = /[^a-zA-Z0-9\/\+=]/i,
        numericDashRegex = /^[\d\-\s]+$/,
        telRegex = /^\d{2,3}-\d{3,4}-\d{4}$/,
        mobileRegex = /^(010|011|17|018|019)-\d{3,4}-\d{4}$/,
        urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
        dateRegex = /^\d{4}-\d{1,2}-\d{1,2}/;

    function typeName(el) {
        return (el.type || '').toLowerCase();
    }

    function tagName(el) {
        return (el.tagName || '').toLowerCase();
    }

    function getValue(el) {
        if (typeof el === 'string') {
            return el;
        }

        var type = typeName(el),
            items;
        if (type === 'checkbox' || type === 'radio') {
            items = [].slice.call(el.form.elements[el.name]);
            for (var i = -1, item; item = items[++i];) {
                if (item.checked === true) {
                    return item.value;
                }
            }
            return '';
        }
        return el.value.trim();
    }

    function getCheckedCount(el) {
        var items = [].slice.call(el.form.elements[el.name]),
            cnt = 0;

        for (var i = -1, item; item = items[++i];) {
            if (item.checked) {
                cnt += 1;
            }
        }
        return cnt;
    }

    function parseDate(date) {
        if (!date.match('today') && !date.match(dateRegex)) {
            return false;
        }

        var validDate = new Date(),
            validDateArray;

        if (!date.match('today')) {
            validDateArray = date.split('-');
            validDate.setFullYear(validDateArray[0]);
            validDate.setMonth(validDateArray[1] - 1);
            validDate.setDate(validDateArray[2]);
        }
        return validDate;
    }

    function getInputName(el) {
        var label;
        if (el.length) {
            el = el[0];
        }

        if (label = el.getAttribute('data-name')) {
            return label;
        }
        if (label = el.getAttribute('id')) {
            if (label = $('label[for=' + label + ']')[0]) {
                return label.innerText;
            }
            if ((label = $(el).closest('label')).length) {
                return label[0].innerText;
            }
        }
        return el.name;
    }

    function byteLength(value) {
        var l = 0;
        for (var i = 0, len = value.length; i < len; i++) {
            l += value.charCodeAt(i) > 255 ? 2 : 1;
        }
        return l;
    }

    var FormValidator = function FormValidator(el, options) {
        var self = this;
        self.errors = [];
        self.$form = $(el);
        self.form = self.$form.get(0);
        self.messages = messages;
        self.befores = {};
        self.afters = {};
        var opt = self.options = core.extend({
            showAlert: true,
            autoCheck: true,
            onSuccess: function onSuccess() {},
            onFailure: function onFailure() {},
            onInvalid: function onInvalid() {}
        }, options);

        core.each(opt.validBefore || {}, function (v, k) {
            self.addValidBefore(k, v);
        });

        core.each(opt.validAfter || {}, function (v, k) {
            self.addValidAfter(k, v);
        });

        if (opt.autoCheck) {
            self.$form.on('submit', function (e) {
                if (!self.run()) {
                    e.preventDefault();
                    opt.onFailure.call(self.form, e);
                    return false;
                }
                opt.onSuccess.call(self.form, e);
            });
        }
    };

    core.extend(FormValidator, {
        messages: messages,
        rules: {
            required: {
                fn: function fn(element) {
                    var value = getValue(element);
                    return !!value;
                }
            },
            match: {
                fn: function fn(element, matchName) {
                    var el = this.form[matchName];
                    this.currentData.targetName = getInputName(el) || matchName;

                    if (el) {
                        return element.value === getValue(el);
                    }

                    return false;
                }
            },
            email: {
                fn: function fn(element, other) {
                    var val = getValue(element),
                        domain;
                    if (other && (domain = element.form.elements[other])) {
                        val += '@' + getValue(domain);
                    }
                    return emailRegex.test(val);
                }
            },
            tel: {
                fn: function fn(element, tel2name, tel3name) {
                    var val = getValue(element);
                    if (arguments.length > 1) {
                        val += '-' + getValue(element.form[tel2name]) + '-' + getValue(element.form[tel3name]);
                    }
                    return telRegex.test(val);
                }
            },
            mobile: {
                fn: function fn(element, tel2name, tel3name) {
                    var val = getValue(element);
                    if (arguments.length > 1) {
                        val += '-' + getValue(element.form[tel2name]) + '-' + getValue(element.form[tel3name]);
                    }
                    return mobileRegex.test(val);
                }
            },
            minlength: {
                fn: function fn(element, length) {
                    return getValue(element).length >= parseInt(length, 10);
                }
            },
            maxlength: {
                fn: function fn(element, length) {
                    return getValue(element).length <= parseInt(length, 10);
                }
            },
            exactlength: {
                fn: function fn(element, length) {
                    return getValue(element).length === length | 0;
                }
            },
            rangelength: {
                fn: function fn(element, min, max) {
                    var len = getValue(element).length;
                    return len >= min && len <= max;
                }
            },
            minbyte: {
                fn: function fn(element, length) {
                    return byteLength(getValue(element)) >= parseInt(length, 10);
                }
            },
            maxbyte: {
                fn: function fn(element, length) {
                    return byteLength(getValue(element)) <= parseInt(length, 10);
                }
            },
            exactbyte: {
                fn: function fn(element, length) {
                    return byteLength(getValue(element)) === length | 0;
                }
            },
            minchecked: {
                fn: function fn(element, min) {
                    return getCheckedCount(element) >= min | 0;
                }
            },
            maxchecked: {
                fn: function fn(element, max) {
                    return getCheckedCount(element) <= max | 0;
                }
            },
            exactchecked: {
                fn: function fn(element, cnt) {
                    return getCheckedCount(element) === cnt | 0;
                }
            },
            rangechecked: {
                fn: function fn(element, min, max) {
                    var cnt = getCheckedCount(element);
                    if (typeof max === 'undefined') {
                        max = min;
                    }
                    return cnt >= min && cnt <= max;
                }
            },
            lt: {
                fn: function fn(element, param) {
                    if (!decimalRegex.test(getValue(element))) {
                        return false;
                    }

                    return parseFloat(element.value) > parseFloat(param);
                }
            },
            gt: {
                fn: function fn(element, param) {
                    if (!decimalRegex.test(getValue(element))) {
                        return false;
                    }

                    return parseFloat(getValue(element)) < parseFloat(param);
                }
            },
            alpha: {
                fn: function fn(element) {
                    return alphaRegex.test(getValue(element));
                }
            },
            alnum: {
                fn: function fn(element) {
                    return alphaNumericRegex.test(getValue(element));
                }
            },
            numeric: {
                fn: function fn(element) {
                    return numericRegex.test(getValue(element));
                }
            },
            integer: {
                fn: function fn(element) {
                    return integerRegex.test(getValue(element));
                }
            },
            decimal: {
                fn: function fn(element) {
                    return decimalRegex.test(getValue(element));
                }
            },
            nozero: {
                fn: function fn(element) {
                    return naturalNoZeroRegex.test(getValue(element));
                }
            },
            url: {
                fn: function fn(element) {
                    return urlRegex.test(getValue(element));
                }
            },
            file: {
                fn: function fn(element, type) {
                    if (element.type !== 'file') {
                        return true;
                    }

                    var ext = element.value.substr(getValue(element).lastIndexOf('.') + 1),
                        typeArray = type.split(';'),
                        inArray = false,
                        i = 0,
                        len = typeArray.length;

                    for (i; i < len; i++) {
                        if (ext == typeArray[i]) {
                            inArray = true;
                            break;
                        }
                    }

                    return inArray;
                }
            },
            date: {
                fn: function fn(element, format) {
                    return dateRegex.test(getValue(element));
                }
            },
            gt_date: {
                fn: function fn(element, date) {
                    var enteredDate = parseDate(getValue(element)),
                        validDate = parseDate(element.form[date] ? getValue(element.form[date]) : date);

                    if (!validDate || !enteredDate) {
                        return false;
                    }
                    if (enteredDate > validDate) {
                        return true;
                    } else {
                        element.form[date] && (this.currentTarget = element.form[date]);
                        return false;
                    }
                }
            },
            lt_date: {
                fn: function fn(element, date) {
                    var enteredDate = parseDate(getValue(element)),
                        validDate = parseDate(element.form[date] ? getValue(element.form[date]) : date);

                    if (!validDate || !enteredDate) {
                        return false;
                    }

                    if (enteredDate < validDate) {
                        return true;
                    } else {
                        element.form[date] && (this.currentTarget = element.form[date]);
                        return false;
                    }
                }
            },
            eqgt_date: {
                fn: function fn(element, date) {
                    var enteredDate = parseDate(getValue(element)),
                        validDate = parseDate(element.form[date] ? getValue(element.form[date]) : date);

                    if (!validDate || !enteredDate) {
                        return false;
                    }

                    if (enteredDate >= validDate) {
                        return true;
                    } else {
                        element.form[date] && (this.currentTarget = element.form[date]);
                        return false;
                    }
                }
            },
            eqlt_date: {
                fn: function fn(element, date) {
                    var enteredDate = parseDate(getValue(element)),
                        validDate = parseDate(element.form[date] ? getValue(element.form[date]) : date);

                    if (!validDate || !enteredDate) {
                        return false;
                    }

                    if (enteredDate <= validDate) {
                        return true;
                    } else {
                        element.form[date] && (this.currentTarget = element.form[date]);
                        return false;
                    }
                }
            },
            regexp: {
                fn: function fn(element) {
                    var regstr = element.getAttribute('data-pattern');
                    var regexp = new RegExp(regstr);
                    return regexp.test(getValue(element));
                }
            }
        },
        addRule: function addRule(name, handler) {
            this.rules[name] = handler;
        }
    });

    FormValidator.prototype = {
        constructor: FormValidator,
        setMessage: function setMessage(rule, message) {
            this.messages[rule] = message;

            return this;
        },
        addValidBefore: function addValidBefore(name, handler) {
            if (name && _typeof(this.form[name]) && handler && typeof handler === 'function') {
                this.befores[name] = handler;
            }
        },
        addValidAfter: function addValidAfter(name, handler) {
            if (name && _typeof(this.form[name]) && handler && typeof handler === 'function') {
                this.afters[name] = handler;
            }
        },
        run: function run() {
            var self = this,
                opt = self.options;

            if (!self._validateForm()) {
                opt.onInvalid.call(self.form, self._getLastError());
                if (opt.showAlert) {
                    self._showError();
                }
                return false;
            }
            return true;
        },
        _normalizeMessage: function _normalizeMessage(el, msg, params, data) {
            data = data || {};

            return msg && msg.replace(/\[name\]/ig, function (v, s) {
                return getInputName(el);
            }).replace(/\{([a-z0-9-]+)\}/ig, function (v, s) {
                if (/[0-9]+/.test(s)) {
                    return params[s] || '';
                } else {
                    return el.getAttribute('data-' + s) || data[s] || 'unknown';
                }
            }).replace(/\[([a-z0-9-]+)\]/ig, function (v, s) {
                return el.getAttribute(s) || '';
            }) || 'unknown msg';
        },
        _getLastError: function _getLastError() {
            return this.errors[this.errors.length - 1];
        },
        _showError: function _showError() {
            var error = this._getLastError();

            alert(this._normalizeMessage(error.el, error.msg || messages[error.rule], error.params, error.data));
            error.el.focus();
            error.el.select();
        },
        _validateForm: function _validateForm() {
            var self = this,
                elements = self.form.elements,
                success = true,
                fn;

            self.errors = [];
            if (!elements.length) {
                return true;
            }

            try {
                for (var i = -1, element; element = elements[++i];) {
                    if ((fn = self.befores[element.name]) && fn.call(self, element) === false) {
                        success = false;
                        break;
                    }
                    if (success && self._validateField(element)) {
                        if (fn = self.afters[element.name]) {
                            if (fn.call(self, element) === false) {
                                success = false;
                                break;
                            }
                        }
                    } else {
                        success = false;
                        break;
                    }
                }
            } catch (ex) {
                alert(ex);
                return false;
            }

            return success;
        },
        _parseRules: function () {
            var paramRegex = /^([a-z]+)(?:\((.+)\)$)*/;
            return function (element) {
                var rules = (element.getAttribute('data-valid') || '').split('|'),
                    matches,
                    result = {};

                if (element.hasAttribute('required')) {
                    result['required'] = true;
                    element.removeAttribute('required');
                }
                for (var i = -1, rule; (rule = rules[++i]) && (matches = rule.match(paramRegex));) {
                    result[matches[1]] = {
                        params: matches[2] ? (matches[2] || '').split(/,\s*/g).map(function (val) {
                            return typeof val == 'number' ? val | 0 : val;
                        }) : []
                    };
                }
                return result;
            };
        }(),
        _validateField: function _validateField(element) {
            var self = this,
                rules = self._parseRules(element),
                rule;

            for (var name in rules) {
                if (!rules.hasOwnProperty(name)) {
                    continue;
                }
                if (!rules['required'] && !element.value.trim()) {
                    continue;
                }
                if (rule = FormValidator.rules[name]) {
                    delete self['currentTarget'];
                    self.currentData = {};
                    if (!rule.fn.apply(self, [element].concat(rules[name].params))) {
                        self.errors.push({
                            rule: name,
                            el: element,
                            target: self.currentTarget,
                            params: rules[name].params,
                            data: self.currentData
                        });
                        return false;
                    }
                } else {
                    throw new Error('[Validator] ' + name + '는 지원하지 않는 규칙입니다.');
                }
            }

            return true;
        }
    };

    //window.FormValidator = FormValidator;
    /*$.fn.validator = function(options){
        return this.each(function() {
            new FormValidator(this, options);
        });
    };*/
    return FormValidator;
});