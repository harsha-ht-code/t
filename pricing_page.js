/**
 * loads only on ctc: pricing page ( /click-to-chat/pricing - enqueued from: ctc-pricing-page.php )
 * 
 * Note: at cache page level settings: disabled 'defer' js file. to load jquery, this file early. (but its like blocking.. so better to plain js and just not deffer this page alone)
 */
(function ($) {

    var url = window.location.href;
    

    // check if url have /pricing/ in it.
    if (url.indexOf('click-to-chat/pricing') > -1) {
        pricing_page();
    }


    function pricing_page() {

        var ht_code_storage = {};

        if (localStorage.getItem('ht_code_storage')) {
            ht_code_storage = localStorage.getItem('ht_code_storage');
            ht_code_storage = JSON.parse(ht_code_storage);
        }

        // get items from ht_code_storage
        function getItem(item) {
            return (ht_code_storage[item]) ? ht_code_storage[item] : false;
        }

        // set items to ht_code_storage storage
        function setItem(name, value) {
            ht_code_storage[name] = value;
            var newValues = JSON.stringify(ht_code_storage);
            localStorage.setItem('ht_code_storage', newValues);
        }


        function number_format(value) {
            var v = Math.round(value);
            if (v.toString().length > 3) {
                value = Math.ceil(value);
            } else {
                var total = value.toFixed(2);
                var value1 = total.split('.')[0];
                var value2 = total.substring(total.indexOf("."));
                value = value1 + '<span class="et_pb_cents" style="position: relative; top: -2.7rem; font-size: 0.3em; font-weight:lighter;">' + value2 + '</span>';
            }
            return value;
        }

        function currency_changed(e, t) {

            var change_val = e.target.value;

            setItem('currency', change_val);

            var symbol = $(t).find(':selected').attr("data-symbol");

            // ht_code_pricing_var
            var pricing = ht_code_pricing_var;

            if (ht_code_currency_var[change_val]) {
                var currency = ht_code_currency_var[change_val];

                var table_0 = ('USD' == change_val) ? pricing[0] : number_format(pricing[0] * currency);
                var table_1 = ('USD' == change_val) ? pricing[1] : number_format(pricing[1] * currency);
                var table_2 = ('USD' == change_val) ? pricing[2] : number_format(pricing[2] * currency);
                var table_3 = ('USD' == change_val) ? pricing[3] : number_format(pricing[3] * currency);
                var table_4 = ('USD' == change_val) ? pricing[4] : number_format(pricing[4] * currency);
                var table_5 = ('USD' == change_val) ? pricing[5] : number_format(pricing[5] * currency);
                var table_6 = ('USD' == change_val) ? pricing[0] : number_format(pricing[0] * currency);
                var table_7 = ('USD' == change_val) ? pricing[1] : number_format(pricing[1] * currency);
                var table_8 = ('USD' == change_val) ? pricing[2] : number_format(pricing[2] * currency);
                var table_9 = ('USD' == change_val) ? pricing[3] : number_format(pricing[3] * currency);
                var table_10 = ('USD' == change_val) ? pricing[4] : number_format(pricing[4] * currency);
                var table_11 = ('USD' == change_val) ? pricing[5] : number_format(pricing[5] * currency);

                var base_href = "https://holithemes.com/shop/checkout?edd_action=add_to_cart&download_id=5502&edd_options[price_id]=";


                // for safe action will add pricing table manually instead of loop (for later easy modifcation)

                // p = 1;
                // for (let i = 0; i < 11; i++) {
                //     $('.et_pb_pricing_table_'+ i + ' .et_pb_et_price span').text(symbol);
                //     $('.et_pb_pricing_table_0 .et_pb_et_price .et_pb_sum').text(table_0);
                //     $('.et_pb_pricing_table_0 .et_pb_pricing_table_button').attr('href', base_href + '' + p + '&currency=' + change_val);
                //     p = (6 == p) ? 1 : p++;
                // }

                $('.et_pb_pricing_table_0 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_0 .et_pb_et_price .et_pb_sum').html(table_0);
                $('.et_pb_pricing_table_0 .et_pb_pricing_table_button').attr('href', base_href + '1&currency=' + change_val);

                $('.et_pb_pricing_table_1 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_1 .et_pb_et_price .et_pb_sum').html(table_1);
                $('.et_pb_pricing_table_1 .et_pb_pricing_table_button').attr('href', base_href + '2&currency=' + change_val);

                $('.et_pb_pricing_table_2 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_2 .et_pb_et_price .et_pb_sum').html(table_2);
                $('.et_pb_pricing_table_2 .et_pb_pricing_table_button').attr('href', base_href + '3&currency=' + change_val);

                $('.et_pb_pricing_table_3 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_3 .et_pb_et_price .et_pb_sum').html(table_3);
                $('.et_pb_pricing_table_3 .et_pb_pricing_table_button').attr('href', base_href + '4&currency=' + change_val);

                $('.et_pb_pricing_table_4 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_4 .et_pb_et_price .et_pb_sum').html(table_4);
                $('.et_pb_pricing_table_4 .et_pb_pricing_table_button').attr('href', base_href + '5&currency=' + change_val);

                $('.et_pb_pricing_table_5 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_5 .et_pb_et_price .et_pb_sum').html(table_5);
                $('.et_pb_pricing_table_5 .et_pb_pricing_table_button').attr('href', base_href + '6&currency=' + change_val);

                $('.et_pb_pricing_table_6 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_6 .et_pb_et_price .et_pb_sum').html(table_6);
                $('.et_pb_pricing_table_6 .et_pb_pricing_table_button').attr('href', base_href + '1&currency=' + change_val);

                $('.et_pb_pricing_table_7 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_7 .et_pb_et_price .et_pb_sum').html(table_7);
                $('.et_pb_pricing_table_7 .et_pb_pricing_table_button').attr('href', base_href + '2&currency=' + change_val);

                $('.et_pb_pricing_table_8 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_8 .et_pb_et_price .et_pb_sum').html(table_8);
                $('.et_pb_pricing_table_8 .et_pb_pricing_table_button').attr('href', base_href + '3&currency=' + change_val);

                $('.et_pb_pricing_table_9 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_9 .et_pb_et_price .et_pb_sum').html(table_9);
                $('.et_pb_pricing_table_9 .et_pb_pricing_table_button').attr('href', base_href + '4&currency=' + change_val);

                $('.et_pb_pricing_table_10 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_10 .et_pb_et_price .et_pb_sum').html(table_10);
                $('.et_pb_pricing_table_10 .et_pb_pricing_table_button').attr('href', base_href + '5&currency=' + change_val);

                $('.et_pb_pricing_table_11 .et_pb_et_price span').text(symbol);
                $('.et_pb_pricing_table_11 .et_pb_et_price .et_pb_sum').html(table_11);
                $('.et_pb_pricing_table_11 .et_pb_pricing_table_button').attr('href', base_href + '6&currency=' + change_val);

            }

        }


        // if (getItem('currency')) {
        //     var local = getItem('currency');
        //     // $('.ctc_demo_pricing select').val(local).change();
        // }

        // loop untill page ready.
        var i = 1;
        var limit = 100;
        var interval = setInterval(function () {
            
            if (document.querySelector('.ctc_demo_pricing')) {
                // length
                // todo have to fix: sometime out of two tables one table is identified
                
                clearInterval(interval);
                pricing_content_ready();
            } else {
                i++;
                if (i > limit) {
                    clearInterval(interval);
                }
            }
        }, 1);


        function pricing_content_ready() {

            // on change
            $(".ctc_demo_pricing select").on("change", function (e) {
                var change_val = e.target.value;

                // // update all selects. (dont add onchange)
                // $('.ctc_demo_pricing select').val(change_val);

                // safe action.to avoid loop in any way..
                if ($('.ctc_demo_pricing.table-1 select').val() !== change_val) {
                    $('.ctc_demo_pricing.table-1 select').val(change_val);
                }
                if ($('.ctc_demo_pricing.table-2 select').val() !== change_val) {
                    $('.ctc_demo_pricing.table-2 select').val(change_val);
                }

                var t = $(this);
                currency_changed(e, t)
            });


            // pricing update.
            if (getItem('currency')) {
                var local = getItem('currency');
                // on change - triggers currency_changed function
                $('.ctc_demo_pricing select').val(local).change();
            }
            // else {
            //     // get country code and set currency
            //     $.get("https://www.cloudflare.com/cdn-cgi/trace", function (data) {
            //         if (data.length > 1) {
            //             const [, loc] = data.match(new RegExp("loc=" + "(.*)" + "\n"));

            //             var eur_list = [
            //                 'IT',   //Italy
            //                 'DE',   //Germany
            //                 'FR',   //France
            //                 'ES',   //Spain
            //                 'NL',   //Netherlands
            //                 'PT',   //Portugal
            //                 'AT',   //Austria
            //                 'BE',   //Belgium
            //                 'HR',   //Croatia
            //                 'CY',   //Cyprus
            //                 'EE',   //Estonia
            //                 'FI',   //Finland
            //                 'GR',   //Greece
            //                 'IE',   //Ireland
            //                 'LV',   //Latvia
            //                 'LT',   //Lithuania
            //                 'LU',   //Luxembourg
            //                 'MT',   //Malta
            //                 'SK',   //Slovakia
            //                 'SI'    //Slovenia
            //             ];


            //             var local = 'USD';

            //             if ('IN' == loc) {
            //                 local = 'INR';
            //             } else if ('GB' == loc) {
            //                 local = 'GBP';
            //             } else if ('AU' == loc) {
            //                 local = 'AUD';
            //             } else if ('CA' == loc) {
            //                 local = 'CAD';
            //             } else if ('IL' == loc) {
            //                 local = 'ILS';
            //             } else if ('JP' == loc) {
            //                 local = 'JPY';
            //             } else if ('MX' == loc) {
            //                 local = 'MXN';
            //             } else if ('PH' == loc) {
            //                 local = 'PHP';
            //             } else if ('RU' == loc) {
            //                 local = 'RUB';
            //             } else if ('SG' == loc) {
            //                 local = 'SGD';
            //             } else if ('TW' == loc) {
            //                 local = 'TWD';
            //             } else if (eur_list.includes(loc)) {
            //                 local = 'EUR';
            //             }

            //             $('.ctc_demo_pricing select').val(local).change();

            //         }
            //     });
            // }


        }


    }

    // // ready
    // $(function () {
    // });


})(jQuery);