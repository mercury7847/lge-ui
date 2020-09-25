/*!
 * @module vcui.ui.PinchZoom
 * @license MIT License
 * @description PinchZoom 컴포넌트
 * @copyright VinylC UID Group
 * https://github.com/manuelstofer/pinchzoom
 * 
 */
  

vcui.define('ui/pinchZoom', ['jquery', 'vcui', 'libs/jquery.transit'], function ($, core) {
    "use strict";
    var $win = $(window);

    var detectGestures = function (el, target) {
        var interaction = null,
            fingers = 0,
            lastTouchStart = 0,
            lastMouseDown = 0,
            startTouches = null,
            isDragging = null,
            firstMove = true;

        function setInteraction(newInteraction, event) {
            if (interaction !== newInteraction) {
                if (interaction && !newInteraction) {
                    switch (interaction) {
                        case "zoom":
                            target._handleZoomEnd(event);
                            break;
                        case 'drag':
                            target._handleDragEnd();
                            break;
                    }
                }
                switch (newInteraction) {
                    case 'zoom':
                        target._handleZoomStart(event);
                        break;
                    case 'drag':                            
                        target._handleDragStart(event);
                        break;
                }
            }
            interaction = newInteraction;
        }

        function updateInteraction(event) {
            if (fingers === 2) {
                setInteraction('zoom');
            } else if (fingers === 1 && target._canDrag()) {
                setInteraction('drag', event);
            } else {
                setInteraction(null, event);
            }
        }

        function targetTouches(touches) {
            return core.array.map(touches, function (touch) {
                return {
                    x: touch.pageX,
                    y: touch.pageY
                };
            });
        }

        function getDistance(a, b) {
            var x, y;
            x = a.x - b.x;
            y = a.y - b.y;
            return Math.sqrt(x * x + y * y);
        }

        function calculateScale(startTouches, endTouches) {
            var startDistance = getDistance(startTouches[0], startTouches[1]),
                endDistance = getDistance(endTouches[0], endTouches[1]);
            return endDistance / startDistance;
        }

        function cancelEvent(event) {
            event.stopPropagation();
            event.preventDefault();
        }

        function detectDoubleTap(event) {
            var time = (new Date()).getTime();

            if (fingers > 1) {
                lastTouchStart = null;
            }

            if (time - lastTouchStart < 300) {

                cancelEvent(event);
                target._handleDoubleTap(event);
                switch (interaction) {
                    case "zoom":
                        target._handleZoomEnd(event);
                        break;
                    case 'drag':
                        target._handleDragEnd();
                        break;
                }
            } else {
                target.isDoubleTap = false;
            }

            if (fingers === 1) {
                lastTouchStart = time;
            }
        }      
        
        function checkDoubleTap() {
            var time = (new Date()).getTime();
            var flag = false;
            if (time - lastMouseDown < 300) {
                flag = true;
            } else {
                flag = false;
            }

            lastMouseDown = time;
            return flag;
        }   


        if(core.detect.isTouch){ // touch 

            $(el).on('touchstart.pinchzoom', function (event) {
                if(target.enabled) {
                    firstMove = true;
                    fingers = event.originalEvent.touches.length;
                    detectDoubleTap(event.originalEvent); 
                       
                }                
            });

            $(el).on('touchmove.pinchzoom', function (event) {
                if(target.enabled && !target.isDoubleTap) {
                    if (firstMove) {
                        updateInteraction(event.originalEvent);
                        if (interaction) {
                            cancelEvent(event.originalEvent);
                        }
                        startTouches = targetTouches(event.originalEvent.touches);
                    } else {
                        switch (interaction) {
                            case 'zoom':
                                if (startTouches.length == 2 && event.originalEvent.touches.length == 2) {
                                    target._handleZoom(event.originalEvent, calculateScale(startTouches, targetTouches(event.originalEvent.touches)));
                                }
                                break;
                            case 'drag':
                                target._handleDrag(event.originalEvent);
                                break;
                        }
                        if (interaction) {
                            cancelEvent(event.originalEvent);
                            target.update();
                        }
                    }
    
                    firstMove = false;
                }
            });

            $(el).on('touchend.pinchzoom', function (event) {
                if(target.enabled) {
                    fingers = event.originalEvent.touches.length;
                    updateInteraction(event.originalEvent);
                }
            });

        }else{ // mouse

            $(el).on('mousedown.pinchzoom', function (event) {
                if(target.enabled) {
                    firstMove = true;
                    if(checkDoubleTap()){
                        target._handleDoubleTap(event.originalEvent);
                    }else{
                        target.isDoubleTap = false;
                        if(!isDragging){
                            isDragging = true;
                        }

                    }
                }   
            });

            $(el).on('mousemove.pinchzoom', function (event) {   
                if(target.enabled){
                    if(isDragging) {
                        if (firstMove) {
                            target._handleDragStart(event.originalEvent); 
                        } else {
                            target._handleDrag(event.originalEvent);
                            target.update();
                        }    
                        firstMove = false;                        
                    }
                }
            });

            $(window).on('mouseup.pinchzoom', function (event) {
                if(target.enabled){
                    if(isDragging){
                        isDragging = false;
                        target._handleDragEnd(true);
                    }
                }
            });

        }       

    };

    var PinchZoom = core.ui('PinchZoom', {/**@lends vcui.ui.PinchZoom# */
        bindjQuery: 'pinchZoom',
        defaults: {
            tapZoomFactor: 2,
            zoomOutFactor: 1.3,
            animationDuration: 300,
            maxZoom: 4,
            minZoom: 0.5,
            draggableUnzoomed: false,
            lockDragAxis: false,
            setOffsetsOnce: false,
            zoomStartEventName: 'pz_zoomstart',
            zoomUpdateEventName: 'pz_zoomupdate',
            zoomEndEventName: 'pz_zoomend',
            dragStartEventName: 'pz_dragstart',
            dragUpdateEventName: 'pz_dragupdate',
            dragEndEventName: 'pz_dragend',
            doubleTapEventName: 'pz_doubletap',
            verticalPadding: 0,
            horizontalPadding: 0,
            fixedAspectRatio : true,
        },
        

        initialize: function initialize(el, options) {
            var self = this;
            if (self.supr(el, options) === false) {
                return;
            }   

            self.zoomFactor = 1;
            self.lastScale = 1;
            self.offset = {
                x: 0,
                y: 0
            };
            self.initialOffset = {
                x: 0,
                y: 0,
            };

            self._setupMarkup();
            self._bindEvents();

            // self.$$(el).find('img').onImgLoaded(function(e){
            //     // self.update(true);
            // });

            self.update(true);
            self.enable();

        },


        destroy:function destroy(){
            // console.log('destroy');
            this.$container.off('touchstart.pinchzoom');
            this.$container.off('touchmove.pinchzoom');
            this.$container.off('touchend.pinchzoom');
            this.$container.off('mousedown.pinchzoom');
            this.$container.off('mousemove.pinchzoom');
            $(window).off('mouseup.pinchzoom');
            this.supr();
        },


        /**   
         * Event handler for 'dragstart'
         * @param event
         */

        _handleDragStart: function _handleDragStart(event) {
            var self = this;
            self.triggerHandler(self.options.dragStartEventName);
            self._stopAnimation();
            self.lastDragPosition = false;
            self.hasInteraction = true;
            self._handleDrag(event);

            //console.log('_handleDragStart');
        },

        /**
         * Event handler for 'drag'
         * @param event
         */
        _handleDrag: function _handleDrag(event) {
            
            var touch = this._getTouches(event)[0];
            this._drag(touch, this.lastDragPosition);
            this.offset = this._sanitizeOffset(this.offset);
            this.lastDragPosition = touch;
        },

        _handleDragEnd: function _handleDragEnd(flag) {
            this.triggerHandler(this.options.dragEndEventName);
            this._end(flag);
        },


        /**
         * Event handler for 'zoomstart'
         * @param event
         */
        _handleZoomStart: function _handleZoomStart(event) {
            this.triggerHandler(this.options.zoomStartEventName);
            this._stopAnimation();
            this.lastScale = 1;
            this.nthZoom = 0;
            this.lastZoomCenter = false;
            this.hasInteraction = true;

            //console.log('handleZoomStart');
        },

        /**
         * Event handler for 'zoom'
         * @param event
         */
        _handleZoom: function _handleZoom(event, newScale) {
            // a relative scale factor is used

            var touchCenter = this._getTouchCenter(this._getTouches(event)),
                scale = newScale / this.lastScale;
            this.lastScale = newScale;

            // the first touch events are thrown away since they are not precise
            this.nthZoom += 1;
            if (this.nthZoom > 3) {

                this._scale(scale, touchCenter);
                this._drag(touchCenter, this.lastZoomCenter);
            }
            this.lastZoomCenter = touchCenter;
        },

        _handleZoomEnd: function _handleZoomEnd() {
            this.triggerHandler(this.options.zoomEndEventName);
            this._end();

            //console.log('handleZoomEnd');
        },

        /**
         * Event handler for 'doubletap'
         * @param event
         */
        _handleDoubleTap: function _handleDoubleTap(event) {
            var self = this;
            var center = this._getTouches(event)[0],
                zoomFactor = this.zoomFactor > 1 ? 1 : this.options.tapZoomFactor,
                startZoomFactor = this.zoomFactor;

            if (this.hasInteraction) {
                return;
            }
            this.isDoubleTap = true;

            if (startZoomFactor > zoomFactor) {
                center = this._getCurrentZoomCenter();
            }

            this._animate(this.options.animationDuration, 
                function (progress) {
                    self._scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                }
            );
            this.triggerHandler(this.options.doubleTapEventName);           
        },
    

        _setupOffsets: function _setupOffsets() {
            if (this.options.setOffsetsOnce && this._isOffsetsSet) {
              return;
            }
            this._isOffsetsSet = true;

            //Compute the initial offset
            this.initialOffset = {
                x: -Math.abs(this.$el.outerWidth() * this._getInitialZoomFactor() - this.$container.outerWidth()) / 2,
                y: -Math.abs(this.$el.outerHeight() * this._getInitialZoomFactor() - this.$container.outerHeight()) / 2,
            };

            //Reset current image offset to that of the initial offset
            this.offset.x = this.initialOffset.x;
            this.offset.y = this.initialOffset.y;
        },


        /**
         * Max / min values for the offset
         * @param offset
         * @return {Object} the sanitized offset
         */
        _sanitizeOffset: function _sanitizeOffset(offset) {
            var elWidth = this.$el.outerWidth() * this._getInitialZoomFactor() * this.zoomFactor;
            var elHeight = this.$el.outerHeight() * this._getInitialZoomFactor() * this.zoomFactor;
            var maxX = elWidth - this.$container.outerWidth() + this.options.horizontalPadding,
                maxY = elHeight - this.$container.outerHeight() + this.options.verticalPadding,
                maxOffsetX = Math.max(maxX, 0),
                maxOffsetY = Math.max(maxY, 0),
                minOffsetX = Math.min(maxX, 0) - this.options.horizontalPadding,
                minOffsetY = Math.min(maxY, 0) - this.options.verticalPadding;

            var xp = Math.min(Math.max(offset.x, minOffsetX), maxOffsetX);
            var yp = Math.min(Math.max(offset.y, minOffsetY), maxOffsetY);

            return {
                x: isNaN(xp)? 0 : xp,
                y: isNaN(yp)? 0 : yp
            };
        },

        /**
         * Scale to a specific zoom factor (not relative)
         * @param zoomFactor
         * @param center
         */
        _scaleTo: function _scaleTo(zoomFactor, center) {
            this._scale(zoomFactor / this.zoomFactor, center);
        },

        /**
         * Scales the element from specified center
         * @param scale
         * @param center
         */
        _scale: function _scale(scale, center) {
            scale = this._scaleZoomFactor(scale);
            this._addOffset({
                x: (scale - 1) * (center.x + this.offset.x),
                y: (scale - 1) * (center.y + this.offset.y)
            });
            this.triggerHandler(this.options.zoomUpdateEventName);
        },

        /**
         * Scales the zoom factor relative to current state
         * @param scale
         * @return the actual scale (can differ because of max min zoom factor)
         */
        _scaleZoomFactor: function _scaleZoomFactor(scale) {
            var originalZoomFactor = this.zoomFactor;
            this.zoomFactor *= scale;
            this.zoomFactor = Math.min(this.options.maxZoom, Math.max(this.zoomFactor, this.options.minZoom));
            return this.zoomFactor / originalZoomFactor;
        },

        /**
         * Determine if the image is in a draggable state
         *
         * When the image can be dragged, the drag event is acted upon and cancelled.
         * When not draggable, the drag event bubbles through this component.
         *
         * @return {Boolean}
         */
        _canDrag: function _canDrag() {
            return this.options.draggableUnzoomed || !(this.zoomFactor > 1 - 0.01 && this.zoomFactor < 1 + 0.01);
        },

        /**
         * Drags the element
         * @param center
         * @param lastCenter
         */
        _drag: function _drag(center, lastCenter) {
            if (lastCenter) {
              if(this.options.lockDragAxis) {
                // lock scroll to position that was changed the most
                if(Math.abs(center.x - lastCenter.x) > Math.abs(center.y - lastCenter.y)) {
                  this._addOffset({
                    x: -(center.x - lastCenter.x),
                    y: 0
                  });
                }
                else {
                  this._addOffset({
                    y: -(center.y - lastCenter.y),
                    x: 0
                  });
                }
              }
              else {
                this._addOffset({
                  y: -(center.y - lastCenter.y),
                  x: -(center.x - lastCenter.x)
                });
              }
              this.triggerHandler(this.options.dragUpdateEventName);
              //console.log(this.options.dragUpdateEventName);
            }
        },

        /**
         * Calculates the touch center of multiple touches
         * @param touches
         * @return {Object}
         */
        _getTouchCenter: function _getTouchCenter(touches) {
            return {
                x: core.array.reduce(touches, function (prev, cur) { return prev+cur.x; }, 0) / touches.length,
                y: core.array.reduce(touches, function (prev, cur) { return prev+cur.y; }, 0) / touches.length
            };

        },

        /**
         * Adds an offset
         * @param offset the offset to add
         * @return return true when the offset change was accepted
         */
        _addOffset: function _addOffset(offset) {
            this.offset = {
                x: this.offset.x + offset.x,
                y: this.offset.y + offset.y
            };
        },

        _sanitize: function _sanitize() {
            if (this.zoomFactor < this.options.zoomOutFactor) {
                this._zoomOutAnimation();
            } else if (this._isInsaneOffset(this.offset)) {
                this._sanitizeOffsetAnimation();
            }
            
        },

        /**
         * Checks if the offset is ok with the current zoom factor
         * @param offset
         * @return {Boolean}
         */
        _isInsaneOffset: function _isInsaneOffset(offset) {
            var sanitizedOffset = this._sanitizeOffset(offset);
            return sanitizedOffset.x !== offset.x || sanitizedOffset.y !== offset.y;
        },

        /**
         * Creates an animation moving to a sane offset
         */
        _sanitizeOffsetAnimation: function _sanitizeOffsetAnimation() {
            var self = this;
            var targetOffset = this._sanitizeOffset(this.offset),
                startOffset = {
                    x: this.offset.x,
                    y: this.offset.y
                };

            this._animate(
                this.options.animationDuration,
                function (progress) {
                    self.offset.x = startOffset.x + progress * (targetOffset.x - startOffset.x);
                    self.offset.y = startOffset.y + progress * (targetOffset.y - startOffset.y);
                    self.update();
                }
            );
        },

        /**
         * Zooms back to the original position,
         * (no offset and zoom factor 1)
         */
        _zoomOutAnimation: function _zoomOutAnimation() {
            var self = this;
            if (this.zoomFactor === 1) {
                //return;
            }

            var startZoomFactor = this.zoomFactor,
                zoomFactor = 1,
                center = this._getCurrentZoomCenter();

            this._animate(
                this.options.animationDuration*0.6,
                function (progress) {
                    self._scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                }
            );
        },
       
        _updateAspectRatio: function _updateAspectRatio() {

            if(this.options.fixedAspectRatio){
                this.$el.find('img').css({
                    'position': 'absolute',
                    'max-width': '100%',
                    'max-height': '100%',
                    'top' :'0',
                    'left' : '0',
                    'bottom': '0',
                    'right': '0',
                    'margin':'auto'
                })
            }else{
                this.$container.css({'height':''}).height(this.$container.parent().outerHeight());
            }
            
        },

        /**
         * Calculates the initial zoom factor (for the element to fit into the container)
         * @return {number} the initial zoom factor
         */
        _getInitialZoomFactor: function _getInitialZoomFactor() {
            var xZoomFactor = this.$container.outerWidth() / this.$el.outerWidth();
            var yZoomFactor = this.$container.outerHeight() / this.$el.outerHeight();

            return Math.min(xZoomFactor, yZoomFactor);
        },

        /**
         * Calculates the virtual zoom center for the current offset and zoom factor
         * (used for reverse zoom)
         * @return {Object} the current zoom center
         */
        _getCurrentZoomCenter: function _getCurrentZoomCenter() {
            
            var offsetLeft = this.offset.x - this.initialOffset.x;
            var centerX = -1 * this.offset.x - offsetLeft / (1 / this.zoomFactor - 1);
            var offsetTop = this.offset.y - this.initialOffset.y;
            var centerY = -1 * this.offset.y - offsetTop / (1 / this.zoomFactor - 1);

            return {
                x: isNaN(centerX)? 0 : centerX,
                y: isNaN(centerY)? 0 : centerY
            };
        },

        /**
         * Returns the touches of an event relative to the container offset
         * @param event
         * @return array touches
         */
        _getTouches: function _getTouches(event) {

            var pos = this._getContainerPos();
            if(event.type.indexOf('mouse')>-1){                
                return [{ x : event.pageX - pos.x, y : event.pageY - pos.y}];
            }else{
                return core.array.map(event.touches, function (touch) {
                    return {
                        x: touch.pageX - pos.x,
                        y: touch.pageY - pos.y,
                    };
                });

            }            
        },

        _getContainerPos: function _getContainerPos() {

            var rect = this.$container[0].getBoundingClientRect();
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

            return {
                x: rect.left + scrollLeft,
                y: rect.top + scrollTop,
            };          
        },

        _easeInOut : function _easeInOut(t){
            return t > 0.5 ? 4*Math.pow((t-1),3)+1 : 4*Math.pow(t,3);
        },

        /**
         * Animation loop
         * does not support simultaneous animations
         * @param duration
         * @param framefn
         * @param timefn // -Math.cos(p * Math.PI) / 2  + 0.5;
         * @param callback
         */
        _animate: function _animate(duration, framefn, callback) {
            var startTime = new Date().getTime();

            if(this.renderAnimate) cancelAnimationFrame(this.renderAnimate);

            var renderFrame = (function () {
                if (!this.inAnimation) { return; }
                var frameTime = new Date().getTime() - startTime,
                    progress = frameTime / duration;
                if (frameTime >= duration) {
                    framefn(1);
                    if (callback) {
                        callback();
                    }
                    this.update();
                    this._stopAnimation();
                    this.update();
                } else {
                    progress = this._easeInOut(progress)//-Math.cos(progress * Math.PI) / 2  + 0.5;                        
                    framefn(progress);
                    this.update();
                    this.renderAnimate = requestAnimationFrame(renderFrame);
                    //requestAnimationFrame(renderFrame);
                }
            }).bind(this);

            this.inAnimation = true;
            this.renderAnimate = requestAnimationFrame(renderFrame);
            //requestAnimationFrame(renderFrame);
        },

        _stopAnimation: function _stopAnimation() {
            this.inAnimation = false;
        },

        /**
         * Creates the expected html structure
         */
        _setupMarkup: function _setupMarkup() {

            this.$container = this.$el.parent();//('.pinch-zoom-container');             

            this.$container.css({
                'position' : 'relative',
                'overflow' : 'hidden',
                'transformOrigin' : '0% 0%'
            });            

            if(this.options.fixedAspectRatio){
                this.$el.css({
                    'position' :'absolute',
                    'transformOrigin' : '0% 0%',
                    'width' : '100%',
                    'height' : '100%'
                });
                
            }else{
                this.$el.css({
                    'position' :'absolute',
                    'transformOrigin' : '0% 0%'
                });
            }

            
        },

        _end: function _end(flag) {
            this.hasInteraction = false;
            if(!flag) this._sanitize();
            this.update();
        },

        /**
         * Binds all required event listeners
         */
        _bindEvents: function _bindEvents() {
            var self = this;
            detectGestures(this.$container[0], this);
            $win.on('resizeend', function(e){
                self.update(true);
            });
        },

        /**
         * Updates the css values according to the current zoom factor and offset
         */
        update: function update(isAspect) { 
            var self = this;
            if(isAspect){
                self._updateAspectRatio();                
                self._setupOffsets();
                self.zoomFactor = 1;
            }

            var zoomFactor = self._getInitialZoomFactor() * self.zoomFactor,
                offsetX = -self.offset.x / zoomFactor,
                offsetY = -self.offset.y / zoomFactor;

            var transform3d = 'scale3d('+ zoomFactor + ',' + zoomFactor + ',1) translate3d('+ offsetX + 'px,' + offsetY + 'px,0px)';
            // var transform2d = 'scale('+ zoomFactor + ', '  + zoomFactor + ') translate('+ offsetX+ 'px,' + offsetY+ 'px)';
            
            self.$el.css('transform', transform3d);
                
        },


        runZoom: function runZoom(zoom) {
            var self = this;

            var center = {x: this.$container.outerWidth()/2, y:this.$container.outerHeight()/2};
            self.offset = this._sanitizeOffset(this.offset);
            self.lastDragPosition = center;

            var zoomFactor = Math.min(self.options.maxZoom, Math.max(zoom,1));
            var startZoomFactor = this.zoomFactor;
            
            if (this.hasInteraction){
                return;
            }

            if(startZoomFactor == zoomFactor){
                return;
            }


            if (startZoomFactor > zoomFactor){
                center = this._getCurrentZoomCenter();                
            }

            this._animate(this.options.animationDuration, 
                function (progress) {
                    self._scaleTo(startZoomFactor + progress * (zoomFactor - startZoomFactor), center);
                }
            );        
        },    

        /**
         * Calculates the aspect ratio of the element
         * @return the aspect ratio
         */
        getAspectRatio: function getAspectRatio() {
            return this.$el.outerWidth() / this.$el.outerHeight();
        },



        getZoomFactor : function getZoomFactor(){
            return this.zoomFactor;
        },

        /**
         * Enables event handling for gestures
         */
        enable: function enable() {
          this.enabled = true;
        },

        /**
         * Disables event handling for gestures
         */
        disable: function disable() {
          this.enabled = false;
        }

    });

    return PinchZoom;
});