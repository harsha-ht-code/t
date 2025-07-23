/**
 * loads only on shop: checkout page
 */
(function ($) {
    // ready
    $(function () {

        // checkout page - dispaly currency list
        if (document.querySelector('.edd-multi-currency-switcher')) {
            window.addEventListener("scroll", event_parse_scroll, false);
            function event_parse_scroll() {
                var current_position = window.pageYOffset;
                if (30 > current_position) {
                    document.querySelector(".edd-multi-currency-switcher").style.top = "0";
                } else {
                    document.querySelector(".edd-multi-currency-switcher").style.top = "-80px";
                }
            }

            if (document.querySelector('.page-id-262 .edd-multi-currency-switcher')) {
                setTimeout(() => {
                    document.querySelector('.page-id-262 .edd-multi-currency-switcher').style.display = 'inline-block';
                }, 2000);
            }

        }

    });
})(jQuery);