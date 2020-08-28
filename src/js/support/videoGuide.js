$(window).ready(function() {
    var videoGuide = {
        form: document.querySelector('#form'),
        templateID: "tmpl-video-guide",
        init: function() {
            CS.MD.setPagination($('.pagination'), {}, this.sumbitHandler);
            this.setEventListener();

            lgkorUI.getTemplate(this.templateID);
        },
        sumbitHandler: function(e) {
            e && e.preventDefault();

            var self = videoGuide,
                data;

            $.ajax({
                url: '/lg5-common/data-ajax/support/video-guide-list.json',        //form action
                method: 'POST',     //post, get
                dataType: 'json',   //json, html etc..
                data: '',
                beforeSend: function(xhr) {
                    // loading bar start
                },
                success: function(data) {
                    if (data.listModel) {
                        $.each(data.listModel, function(index, value) {
                            var html = '';
                            var $section = $('#'+value.type);

                            $.each(value.list, function(i, v) {
                                var list = vcui.template($('#'+self.templateID).html(), {
                                    type: v.type,
                                    category: v.category,
                                    title: v.title,
                                    url: v.url
                                });
                                html += list;
                            });

                            $section.find('.notice-list').html($(html));
                            $section.find('.results-stat em').html(value.total);
                        });

                        // $('.pagination').data('plugin_pagination').reset();
                    }
                },
                error: function(err){
                    console.log(err);
                },
                complete: function() {
                    // loading bar end
                }
            });
        },
        setEventListener: function() {
            $(this.form).on('submit', this.submitHandler);
        }
    }

    videoGuide.init();
});