
vcui.define('ui/svgProgress', ['jquery', 'vcui'], function ($, core) {
    "use strict";

    var SvgProgress = core.ui('SvgProgress', {
        bindjQuery: true,
        defaults: {
            mode: 'progress', //progress || indicate
            type: 'circle',
            
            width: 50,
            height: 50,
            thickness: 1,
            bgthickness: 0,
            activeColor: '#ff0000',
            bgColor: '#bbb',

            startIndex: 0,
            totalIndex: 1,

            timerSpeed: 4500,
            progressSpeed: 100
        },

        initialize: function initialize(el, options) {
            var self = this;
            
            if (self.supr(el, options) === false) {
                return;
            };

            self.bar = null;
            self.total = 0;
            self.percent = 0;
            
            self.selectIndex = self.options.startIndex;
            self.selectTotal = self.options.totalIndex;

            self.timerSpeed = self.options.timerSpeed;
            self.progressSpeed = self.options.progressSpeed;
            
            self._setting();
        },

        _setting: function(){
            var self = this,
            wid, hei, thickness, activeColor, bgthickness, bgColor, element,
            startx, starty, radiusx, radiusy, endx, maxthickness;

            wid = self.options.width;
            hei = self.options.height;
            thickness = self.options.thickness;
            activeColor = self.options.activeColor;

            bgthickness = self.options.bgthickness ? self.options.bgthickness : thickness;
            bgColor = self.options.bgColor;

            maxthickness = Math.max(bgthickness, thickness);

            element = "";
            switch(self.options.type){
                case 'circle':
                    startx = maxthickness/2;
                    starty = hei;
                    endx = wid*2 - maxthickness/2;
                    radiusx = wid - maxthickness/2;
                    radiusy = hei - maxthickness/2;

                    element += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
                    element += ' style="fill:none;width:' + (wid*2) +'px;height:' + (hei*2) + 'px;">';
                    element += '    <path d="M ' + startx + ' ' + starty;
                    element += ' A ' + radiusx + ' ' + radiusy + ' 0 0 1 ' + endx + ' ' + starty;
                    element += ' A ' + radiusx + ' ' + radiusy + ' 0 0 1 ' + startx + ' ' + starty + '" stroke=' + bgColor + ' stroke-width=' + bgthickness + ' ></path>';
                    element += '    <path d="M ' + startx + ' ' + starty;
                    element += ' A ' + radiusx + ' ' + radiusy + ' 0 0 1 ' + endx + ' ' + starty;
                    element += ' A ' + radiusx + ' ' + radiusy + ' 0 0 1 ' + startx + ' ' + starty + '" stroke=' + activeColor + ' stroke-width=' + thickness + ' ></path>';

                    self.$el.css({
                        width: wid*2,
                        height: hei*2
                    });
                    break;

                case 'line':
                    starty = maxthickness/2;
                    element += '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
                    element += ' style="fill:none;width:' + wid +'px;height:' + maxthickness + 'px;">';
                    element += '    <path d="M 0 ' + starty + ' L ' + wid + ' ' + starty + '" stroke=' + bgColor + ' stroke-width=' + bgthickness + ' ></path>';
                    element += '    <path d="M 0 ' + starty + ' L ' + wid + ' ' + starty + '" stroke=' + activeColor + ' stroke-width=' + thickness + ' ></path>';

                    self.$el.css({
                        width: wid,
                        height: maxthickness
                    });
                    break;
            }

            element += '</svg>';
            self.$el.append(element);

            self.bar = self.$el.find('svg path')[1];
            self.total = self.bar.getTotalLength();
            self.bar.style.strokeDasharray = self.total + " " + self.total;

            self.$el.find('svg').css({
                position: 'absolute',
                left: 0,
                top: 0
            });

            self._init();
        },

        _init: function(){
            var self = this,
            offset;

            offset = self.options.mode == 'indicate' ? (self.selectTotal - 1) / self.selectTotal * self.total : self.total;
            self.bar.style.strokeDashoffset = offset;
        },

        _setIndex: function(idx){
            var self = this, 
            percent;

            if(idx != self.selectIndex && idx > -1 && idx < self.selectTotal){
                self.selectIndex = idx;

                percent = (self.selectIndex+1) / self.selectTotal;
                self._setProgress(percent);
            }
        },

        _setProgress: function(percent){
            var self = this,
            per;

            if(percent > 1) per = 1;
            else if(percent < 0) per = 0;
            else per = percent;
            var offset = self.total - self.total*per;
            $(self.bar).stop().animate({strokeDashoffset: offset}, self.progressSpeed);
        },

        _reset: function(options){
            var self = this;

            self.options = $.extend(self.options, options);
        },

        /** PUBLIC METHOD**/
        setInit: function(){
            var self = this;

            self.selectIndex = 0;
            
            self._init();
        },

        setProgress: function(percent){
            var self = this;
            
            self._setProgress(percent);
        },

        setIndex: function(idx){
            var self = this;

            self._setIndex(idx);
        },

        reset: function(options){
            var self = this;

            self._reset(options);
        },

        startTimerAnimation: function(){
            var self = this;

            if(self.options.mode == "progress"){
                $(self.bar).stop().animate({strokeDashoffset: 0}, self.timerSpeed, function(){
                    self.$el.trigger("endTimerAnimation");
                });
            }
        }
    });

    return SvgProgress;
});