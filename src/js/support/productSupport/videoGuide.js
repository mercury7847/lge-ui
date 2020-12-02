(function() {
    var listDataTmpl = 
        '<li>' +
            '<a href="#">' +
                '<div class="video-thumb">' +
                    '<img src="//img.youtube.com/vi/{{videoId}}/default.jpg" alt="">' +
                '</div>' +
                '<div class="video-cont">' +
                    '<div class="flag-wrap bar-type">' +
                        '<span class="flag">{{category}}</span>' +
                        '<span class="flag gray">{{topic}}</span>' +
                    '</div>' +
                    '<h4 class="tit">{{title}}</h4>' +
                '</div>' +
            '</a>' +
        '</li>';

    $(window).ready(function() {
        var videoGuide = {
            form: document.querySelector('#submitForm'),
            init: function() {
                this.$form = $(this.form);
                this.setEventListener();
                this.sumbitHandler(); // 삭제 예정
            
                $('.pagination').pagination();
            },
            sumbitHandler: function(param) {
                var self = this;

                $.ajax({
                    url: self.$form.data('ajax'),
                    method: 'POST',
                    dataType: 'json',
                    data: param,
                    beforeSend: function(xhr) {
                        lgkorUI.showLoading();
                    },
                    success: function(d) {
                        if (!d.status) return;
                        
                        var data = d.data,
                            html = '';

                        var popular = data.popular,
                            newest = data.newest;

                        if (popular.listData) {
                            popular.listData.forEach(function(item) {
                                html += vcui.template(listDataTmpl, item);
                            });

                            $('#popular .video-list').html(html);
                            $('#popular .pagination').pagination('update', popular.listPage);
                            $('#popular .count').html(popular.listPage.totalCount);
                            html = '';
                        }

                        if (newest.listData) {
                            newest.listData.forEach(function(item) {
                                html += vcui.template(listDataTmpl, item);
                            });
                            $('#newest .video-list').html(html);
                            $('#newest .pagination').pagination('update', newest.listPage);
                            $('#newest .count').html(newest.listPage.totalCount);
                        }
                    },
                    error: function(err){
                        console.log(err);
                    },
                    complete: function() {
                        lgkorUI.hideLoading();
                    }
                });
            },
            setEventListener: function() {
                var self = this;
                
                self.$form.on('submit', function(e) {
                    e.preventDefault();

                    var data = {
                        page: 1
                    }
                    
                    self.sumbitHandler(data);
                });

                $('.pagination').on('pageClick', function(e) {
                    var data = {
                        page: e.page
                    };

                    self.sumbitHandler(data);
                });

                $('#btnReset').on('click', function() {
                    var data = {
                        page: 1
                    }

                    self.sumbitHandler(data);
                });
            }
        }
        
        videoGuide.init();
    });
})();