(function() {
    function comma(str) {
        return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
    }
    function cardNumber(str) {
        return str.replace(/(\d{4})(\d{4})(\d{4})(\d+)/gi,'$1-$2-$3-$4');
    }
    function phoneNumber(str) {
        return str.replace(/(\d{2,3})(\d{3,4})(\d{4})/gi,'$1-$2-$3');
    }
    function yyyymmdd(str) {
        return str.replace(/(\d{4})(\d{2})(\d{2})/g, '$1.$2.$3');
    }

    $(window).ready(function() {
        var myMembership = {
            init: function() {
                var ajaxUrl = '/lg5-common/data-ajax/mypage/membership/my_membership.json';
                $.ajax({
                    url: ajaxUrl
                }).done(function (d) {
                    console.log('ajax',d.data);
                    var membershipPoint = d.data.membershipPoint;

                    $('#membership_point').text(comma(membershipPoint.point)+"P");
                    $('#membership_level').text(membershipPoint.level);
                    $('#membership_purchase_year').text(comma(membershipPoint.purchasePerYear)+"원");

                    var membershipInformation = d.data.membershipInformation;
                    $('#membership_info_name').text(membershipInformation.name);
                    $('#membership_info_tel').text(phoneNumber(membershipInformation.tel));
                    $('#membership_info_card').text(cardNumber(membershipInformation.card));
                    $('#membership_info_regist_date').text(yyyymmdd(membershipInformation.registrationDate));
                    $('#membership_info_regist_store').text(membershipInformation.registrationStore);
                    $('#membership_info_favor_store').text(membershipInformation.favoriteStore);
                    $('#membership_info_address').text(membershipInformation.address);

                });
            }
        };

        myMembership.init();
    });
})();