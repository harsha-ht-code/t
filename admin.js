(function ($) {
    $(function () {
        
        function add_code() {

            // Add code
            // head
            var head_snippet = $('.ht_code_head_snippet .ht_code_head_add_code');
            $('.ht_code_add_head_code_link').on('click', function (e) {
                var head_block = head_snippet.clone();
                var head_text_area = $(head_block).find('.ht_code_head_scripts');
                $(head_text_area).attr('name', 'ht_code_options_scripts[head][]');
                $(head_text_area).addClass('ht_code_textarea ht_code_codemirror');
                $('.ht_code_head_code_block').append(head_block);
                // add_codemirror(head_text_area[0]);

                // Dispatch/Trigger/Fire the event
                document.dispatchEvent(
                    new CustomEvent("newblockadded", { "detail": head_text_area[0] })
                );

            });
            // body
            var body_snippet = $('.ht_code_body_snippet .ht_code_body_add_code');
            $('.ht_code_add_body_code_link').on('click', function (e) {
                var body_block = body_snippet.clone();
                var body_text_area = $(body_block).find('.ht_code_body_scripts');
                $(body_text_area).attr('name', 'ht_code_options_scripts[body][]');
                $(body_text_area).addClass('ht_code_textarea ht_code_codemirror');
                $('.ht_code_body_code_block').append(body_block);
                // add_codemirror(body_text_area[0]);
                document.dispatchEvent(
                    new CustomEvent("newblockadded", { "detail": body_text_area[0] })
                );
            });
            // admin
            var admin_snippet = $('.ht_code_admin_snippet .ht_code_admin_add_code');
            $('.ht_code_add_admin_code_link').on('click', function (e) {
                var admin_block = admin_snippet.clone();
                var admin_text_area = $(admin_block).find('.ht_code_admin_scripts');
                $(admin_text_area).attr('name', 'ht_code_options_scripts[admin][]');
                $(admin_text_area).addClass('ht_code_textarea ht_code_codemirror');
                $('.ht_code_admin_code_block').append(admin_block);
                // add_codemirror(admin_text_area[0]);
                document.dispatchEvent(
                    new CustomEvent("newblockadded", { "detail": admin_text_area[0] })
                );
            });
            // notes
            var notes_snippet = $('.ht_code_notes_snippet .ht_code_notes_add_code');
            $('.ht_code_add_notes_code_link').on('click', function (e) {
                var notes_block = notes_snippet.clone();
                var notes_text_area = $(notes_block).find('.ht_code_notes_scripts');
                $(notes_text_area).attr('name', 'ht_code_options_scripts[notes][]');
                $(notes_text_area).addClass('ht_code_textarea ht_code_codemirror');
                $('.ht_code_notes_code_block').append(notes_block);
                // add_codemirror(notes_text_area[0]);
                document.dispatchEvent(
                    new CustomEvent("newblockadded", { "detail": notes_text_area[0] })
                );
            });



            // Remove code
            // head
            $('.ht_code_head_code').on('click', '.ht_code_remove_head_code_link', function (e) {
                e.preventDefault();
                $(this).closest('.ht_code_head_add_code').hide(400, function (e) {
                    $(this).remove();
                });
            });
            // body
            $('.ht_code_body_code').on('click', '.ht_code_remove_body_code_link', function (e) {
                e.preventDefault();
                $(this).closest('.ht_code_body_add_code').hide(400, function (e) {
                    $(this).remove();
                });
            });
            // admin
            $('.ht_code_admin_code').on('click', '.ht_code_remove_admin_code_link', function (e) {
                e.preventDefault();
                $(this).closest('.ht_code_admin_add_code').hide(400, function (e) {
                    $(this).remove();
                });
            });
            // notes
            $('.ht_code_notes_code').on('click', '.ht_code_remove_notes_code_link', function (e) {
                e.preventDefault();
                $(this).closest('.ht_code_notes_add_code').hide(400, function (e) {
                    $(this).remove();
                });
            });


            // expand textarea filed on click..
            // $('.ht_code_codes').on('click', '.textarea_adjust_height', function (e) {
            //     $(this).css('height', $(this).prop('scrollHeight') + 100);
            //     $(this).removeClass('textarea_adjust_height');
            // });
        }
        add_code();


        function plugins_load() {

            // var pluginlist = $('.ht_code_add_plugin_code').attr('data-pluginlist');
            // pluginlist = JSON.parse(pluginlist);
            // // var avail_plugins = pluginlist;

            // Add plugin
            var add_plugin_code = $('.ht_code_add_plugin_code .ht_ctc_add_plugin');

            $('.ht_code_add_plugin_link').on('click', function (e) {
                var plugin = add_plugin_code.clone();
                var plugin_select = $(plugin).children('.ht_ctc_add_plugin_select');
                // for (let i in pluginlist) {
                //     
                //     var k = i;
                //     var v = pluginlist[i];
                //     var options = `<option value="${k}">${v}</option>`;
                //     $(plugin_select).append(options)
                // }
                $(plugin_select).attr('name', 'ht_code_options[added_plugins][]');
                $('.ht_code_plugins_load').append(plugin);
            });


            // Add page
            var add_page_code = $('.ht_code_add_page_code .ht_code_add_page');

            $('.ht_c_deativate_plugin_page_level').on('click', '.ht_code_add_page_link', function (e) {
                var page = add_page_code.clone();
                var get_select_value = $(this).closest('.ht_ctc_add_plugin').find(":selected").val();
                var page_input_name = `ht_code_options[${get_select_value}][]`;
                $(page).children('.ht_code_add_page .ht_code_add_page_input').attr('name', page_input_name);
                $(this).siblings('.ht_code_pages').append(page);
            });

            // on plugin select changed: change enable_plugin, page name
            $('.ht_c_deativate_plugin_page_level').on("change", '.ht_ctc_add_plugin_select', function (e) {
                var get_select_value = e.target.value;
                
                var page_input_name = `ht_code_options[${get_select_value}][]`;
                var input_field = $(this).closest('.ht_ctc_add_plugin').find('.ht_code_add_page .ht_code_add_page_input');
                $(input_field).attr('name', page_input_name);
                
                var checkbox_input_name = `ht_code_options[checked_plugins][${get_select_value}]`;
                var checkbox_field = $(this).closest('.ht_ctc_add_plugin').find('.ht_code_enable_plugin');
                $(checkbox_field).attr('name', checkbox_input_name);

                // 
                // delete avail_plugins[get_select_value];
                // 
            });


            // Remove page
            $('.ht_c_deativate_plugin_page_level').on('click', '.ht_code_remove_page_link', function (e) {
                e.preventDefault();
                $(this).closest('.ht_code_add_page').hide(400, function (e) {
                    $(this).remove();
                });
            });

            // Remove plugin
            $('.ht_c_deativate_plugin_page_level').on('click', '.ht_code_remove_plugin_link', function (e) {
                e.preventDefault();
                $(this).closest('.ht_ctc_add_plugin').hide(400, function (e) {
                    $(this).remove();
                });
            });


        }
        plugins_load();


        function software_license() {

            $(document).on('click', '#code_license_button', function (e) {

                e.preventDefault();

                var keyfield = $('#code_license_key');
                messagebox = $('.code_license_message');
                btn = $('#code_license_button');
                btn_name = btn.attr('name');
                btnval = btn.val();
                getlicense = $('.code_get_license');
                nonce = $('#ht_code_nonce').val();

                messagebox.hide();

                var key = keyfield.val();

                if ('' == key) {
                    messagebox.html('Please Enter the License key!');
                    messagebox.show(100);
                    return;
                }
                key = key.replace(/[^a-z0-9]/gi, '');


                var action = 'code_activate_license';
                if ('code_activate_btn' == btn_name) {
                    action = 'code_activate_license';
                    btn.val('Activating...');
                } else if ('code_deactivate_btn' == btn_name) {
                    action = 'code_deactivate_license';
                    btn.val('Deactivating...');
                }

                $.ajax({
                    url: ajaxurl,
                    data: {
                        action: action,
                        key: key,
                        ht_code_nonce: nonce,
                    },
                    type: "POST",
                    success: function (response) {
                        output(response);
                    },
                    error: function () {
                        btn.val(btnval);
                        messagebox.css('color', 'red');
                        messagebox.html('Error: some thing wrong: please try again or please contact Us');
                        messagebox.show(100);
                    }
                });

                function output(response) {

                    data = response.data;
                    message = response.data.message;

                    if ('Activated' == message) {
                        $('#code_activated').show();
                        keyfield.hide();
                        // activated - change btn content things to deactivate
                        // btn.html('Deactivate');
                        btn.val('Deactivate License');
                        btn.attr('name', 'code_deactivate_btn');
                        btn.removeClass('code_activate_btn').addClass('code_deactivate_btn');
                        messagebox.css('color', 'green');
                        getlicense.hide();
                    } else if ('Deactivated' == message) {
                        $('#code_activated').hide();
                        keyfield.show();
                        // btn.html('Activate');
                        btn.val('Activate License');
                        btn.attr('name', 'code_activate_btn');
                        btn.removeClass('code_deactivate_btn').addClass('code_activate_btn');
                        messagebox.css('color', 'yellowgreen');
                        getlicense.show(500);
                    } else {
                        // something wrong
                        btn.val(btnval);
                        messagebox.css('color', 'red');
                        messagebox.html(message);
                        messagebox.show(100);
                        getlicense.show(500);
                    }
                }
            });
        }
        software_license();



    });
})(jQuery);