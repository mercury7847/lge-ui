$(window).ready(function() {

    var videoGuide = {
        form: document.querySelector('#form'),
        init: function() {
            CS.MD.setPagination($('.pagination'), {}, this.sumbitHandler);
            this.setEventListener();
        },
        sumbitHandler: function() {
            $.ajax({
                url: '/lg5-common/data-ajax/support/video-guide-list.json',        //form action
                method: 'POST',     //post, get
                dataType: 'json',   //json, html etc..
                data: '',
                beforeSend: function() {
    
                },
                success: function(data) {
                    var html = '';
                    
                    if (data.list) {
                        data.list.each(function(item) {
                            html += '<li><a href="'+ item.url +'">';
                            html += '<p class="notice-category-wrap">';
                            html += '<span class="notice-category-A">'+ item.type +'</span>';
                            html += '<span class="notice-category-B">'+ item.category +'</span>';
                            html += '</p>';
                            html += '<h4 class="notice-list-title-A">'+ item.title +'</h4>';
                            html += '</a>';
                            html += '</li>';
                        });

                        $('.pagination').data('plugin_pagination').reset();
                    }
                },
                error: function(request, status, error) {
    
                },
                complete: function() {
    
                }
            });
        },
        setEventListener: function() {
            $(this.form).on('submit', this.submitHandler);
        }
    }

    videoGuide.init();
});