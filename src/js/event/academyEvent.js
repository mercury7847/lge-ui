$(document).ready(function() {
    //$('#academyPopup01').vcModal('show');
    $('#academyPopup02').vcModal('show'); 
    goList();
});

function goList() {
    $('.btn-list').on('click', function(e) {
        e.preventDefault();
        $('#academyPopup01').vcModal('hide'); 
        location.href = "/benefits/exhibitions";
    });
}