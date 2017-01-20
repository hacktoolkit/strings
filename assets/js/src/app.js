const $ = require('jquery');
const _ = require('lodash');
const marked = require('marked');
const juice = require('juice');

$(function() {
    const ALERT_TEMPLATE = _.template('<div class="alert alert-<%- level %> alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><%= msg %></div>');

    function showAlert(msg, level) {
        // http://getbootstrap.com/components/#alerts
        // level: success, info, warning, danger
        $('.page-alerts').append(
            ALERT_TEMPLATE({
                msg: msg,
                level: level
            })
        );
    }

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

    function doGenerateHTMLFromMarkdown(e) {
        e.preventDefault();
        var markdownContent = $('#markdown_content').val();
        var generatedHTML = marked(markdownContent);
        $('#markdown_output').html(generatedHTML);
    }

    var GRAMMARLY_CHECK_INTERVAL = null;
    var GRAMMARLY_CHECK_ATTEMPTS = 0;
    var GRAMMARLY_CHECK_MAX_ATTEMPTS = 20;
    function detectGrammarly() {
        if (GRAMMARLY_CHECK_ATTEMPTS > GRAMMARLY_CHECK_MAX_ATTEMPTS) {
            clearInterval(GRAMMARLY_CHECK_INTERVAL);
        } else {
            var hasGrammarlyExtension = $('body').attr('data-gr-c-s-loaded') === 'true';
            var hasTextarea = !!$('textarea');
            if (hasGrammarlyExtension && hasTextarea) {
                showAlert('<b>Heads up!</b> The Grammarly extension has been detected for your browser. You may want to disable it to prevent unintended changes to your text.', 'info');
                clearInterval(GRAMMARLY_CHECK_INTERVAL);
            }
            ++GRAMMARLY_CHECK_ATTEMPTS;
        }
    }

    function initEventHandlers() {
        $('.btn-join').on('click', doJoin);
        $('.btn-inline-css').on('click', doCssInline);
        $('.btn-convert-md').on('click', doGenerateHTMLFromMarkdown);
    }

    function init() {
        GRAMMARLY_CHECK_INTERVAL = setInterval(detectGrammarly, 1000);
    }

    initEventHandlers();
    init();
});
