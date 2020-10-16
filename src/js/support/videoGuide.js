$(window).ready(function() {
    var videoGuide = {
        form: document.querySelector('#form'),
        init: function() {
            this.setEventListener();
        },
        sumbitHandler: function(e) {
            e && e.preventDefault();

            var self = videoGuide,
                data;

            $.ajax({
                url: '/lg5-common/data-ajax/support/video_list.json',        //form action
                method: 'POST',     //post, get
                dataType: 'json',   //json, html etc..
                data: '',
                beforeSend: function(xhr) {
                    // loading bar start
                },
                success: function(data) {
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