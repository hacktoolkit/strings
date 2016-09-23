const $ = require('jquery');
const _ = require('lodash');
const marked = require('marked');
var juice = require('juice/client');

$(function() {
    function doJoin(e) {
        e.preventDefault();
        var content = $('#join_content').val();
        var joinChar = $('#join_char').val();
        var parts = content.split('\n');
        var joined = parts.join(joinChar);
        $('#join_output').val(joined);
    }

    function doCssInline(e) {
        e.preventDefault();
        var html = $('#inline_content').val();
        var preserveStyles = $('#preserve_styles').prop('checked');
        var juiceOpts = {
            removeStyleTags: !preserveStyles,
            preserveImportant: true
        };
        var inlinedHTML = juice(html, juiceOpts);
        $('#inline_output').val(inlinedHTML);
    }

    function doGenerateHTMLFromMarkdown() {
        var markdownContent = $('#markdown_content').value();
        var generatedHTML = marked(markdownContent);
        $('#markdown_output').html(generatedHTML);
    }

    $('.btn-join').on('click', doJoin);
    $('.btn-inline-css').on('click', doCssInline);
    $('.btn-generate-md').on('click', doGenerateHTMLFromMarkdown);
});
