$(function() {
    function doJoin(e) {
        e.preventDefault();
        var content = $('#join_content').val();
        var joinChar = $('#join_char').val();
        var parts = content.split('\n');
        var joined = parts.join(joinChar);
        $('#join_output').html(joined);
    }

    $('.btn-join').on('click', doJoin);
});
