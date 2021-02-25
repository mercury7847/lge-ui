(function() {
    $(window).ready(function() {
        $('.my-status-info').find('a').on('click', function(e) {
            e.preventDefault();

            var type = $(this).data('type'),
                length = parseInt($(this).find('em').text());

            $('#count').html(length);

            if (length != 0) {
                if (type == 'all') {
                    $('.my-status-list').find('tbody tr:not(.empty-row)').show();
                    $('.my-status-list-m').find('>ul>li').show();
                } else {
                    $('.my-status-list').find(type).show();
                    $('.my-status-list').find('tbody tr:not('+type+')').hide();
                    
                    $('.my-status-list-m').find('>ul').show();
                    $('.my-status-list-m').find(type).show();
                    $('.my-status-list-m').find('>ul>li:not('+type+')').hide();
                }
            } else {
                $('.my-status-list').find('tbody tr:not(.empty-row)').hide();
                $('.my-status-list').find('tbody tr.empty-row').show();

                $('.my-status-list-m').find('>ul').hide();
                $('.my-status-list-m').find('.no-data').show();
            }
        });
    });
})();