$(function() {
    function doJoin() {
        var content = $('#join_content').value();
        var joinChar = $('#join_char').value();
        var parts = content.split('\n');
        var joined = parts.join(joinChar);
        $('#join_output').html(joined);
    }

    $('.btn-join').on('click', doJoin);
});
