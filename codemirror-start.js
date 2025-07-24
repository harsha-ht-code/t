(function ($) {

    // ready
    $(function () {

        var values = '';
        if (typeof ht_code_admin_var !== "undefined") {
            values = ht_code_admin_var;
        } else {
            try {
                if (document.querySelector('.ht_code_admin_var_data')) {
                    var settings = $('.ht_code_admin_var_data').attr('data-settings');
                    ctc = JSON.parse(settings);
                }
            } catch (e) {
                values = {};
            }
        }

        codemirror();
        


        // custom event listener - when new code block added
        document.addEventListener("newblockadded", function (e) {
            add_codemirror_block(e.detail);
        });

        // codemirror
        function add_codemirror_block(e) {
            CodeMirror.fromTextArea(
                e, {
                lineNumbers: true,
                mode: 'htmlmixed',
                autoCloseTags: true,
                lineWrapping: true,
                autoCloseBrackets: true,
            }
            );
        }
        // apply to existing elements
        function codemirror() {
            // var c = document.getElementsByClassName('ht_code_head_scripts');
            var c = $('.ht_code_codemirror');

            if (c) {
                for (let i = 0; i < c.length; i++) {
                    var e = c[i];
                    add_codemirror_block(e)
                }
            }

        }
        // codemirror();






    });

}) (jQuery);