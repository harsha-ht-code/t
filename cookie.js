(function($) {
    $(document).ready(function() {
        console.log('cookie.js loaded');

        // localStorage
        var ht_code_storage = {};

        /**
         * Store cookies as "ht_code_cookies" (COOKIE_NAME = l_var.cookie_name)
         * 
         * The allCookies object holds the state of various cookie settings.
         * 
         * Properties:
         * - is_cookies: Indicates the overall cookie consent status ('ok', 'no', 'custom', 'disabled').
         *              - ok: All cookies are accepted.
         *              - no: All cookies are rejected.
         *              - custom: Custom cookie settings are applied. ( cookie_analytics, cookie_functional, cookie_marketing )
         *              - disabled: Cookies are disabled(browser).
         * - cookie_consent: Indicates how the cookie consent was obtained ('user', 'auto', 'browser').
         * - cookie_consent_time: The timestamp when the cookie consent was obtained.
         * - cookie_analytics: Indicates the status of analytics cookies ('enabled', 'disabled').
         * - cookie_functional: Indicates the status of functional cookies ('enabled', 'disabled').
         * - cookie_marketing: Indicates the status of marketing cookies ('enabled', 'disabled').
         */
        var allCookies = {
            'is_cookies': 'ok',
            'cookie_consent': 'user',
            'cookie_consent_time': new Date().getTime(),
            'cookie_analytics': 'enabled',
            'cookie_functional': 'enabled',
            'cookie_marketing': 'enabled'
        };

        // wp local variables
        var l_var = '';
        getWPLocalVars();

        /**
         * get ht_code_main_var and assign to l_var variable
         */
        function getWPLocalVars() {
            if (typeof ht_code_main_var !== 'undefined') {
                l_var = ht_code_main_var;
            } else {
                // fallback values
                l_var = {};
            }
        }

        /**
         * Get ht_code_storage from local storage and if available set to ht_code_storage variable.
         */
        function getStorageData() {
            if (localStorage.getItem('ht_code_storage')) {
                ht_code_storage = JSON.parse(localStorage.getItem('ht_code_storage'));
                console.log(ht_code_storage);
            }
        }
        getStorageData();
        
        /**
         * Get an item from local storage.
         *
         * @param {string} item The key of the item to retrieve.
         * @return {string|boolean} The value of the item or false if not found.
         */
        function getItem(item) {
            return (ht_code_storage[item]) ? ht_code_storage[item] : false;
        }
        
        /**
         * Set an item in local storage.
         *
         * @param {string} name  The key under which the value is stored.
         * @param {string} value The value to store.
         */
        function setItem(name, value) {
            getStorageData();
            ht_code_storage[name] = value;
            localStorage.setItem('ht_code_storage', JSON.stringify(ht_code_storage));
        }

        // ht_is_cookies_ok
        const COOKIE_NAME = l_var.cookie_name ? l_var.cookie_name : 'ht_is_cookies_ok';
        console.log('COOKIE_NAME: ' + COOKIE_NAME);

        const COOKIE_BUTTON_TEXT = l_var.cookie_button_text ? l_var.cookie_button_text : 'Ok, Got it';
        const COOKIE_PRIVACY_LINK = l_var.cookie_privacy_link ? l_var.cookie_privacy_link : 'https://holithemes.com/privacy/';
        const COOKIE_PRIVACY_LINK_TEXT = l_var.cookie_privacy_link_text ? l_var.cookie_privacy_link_text : 'Cookie Policy';

        var cookie_text = '';
        if (l_var.cookie_text) {
            cookie_text = l_var.cookie_text;
        } else {
            cookie_text = `By clicking '${COOKIE_BUTTON_TEXT}', you agree to the use of cookies and similar technologies, including third-party cookies, to enhance site navigation, analyze site usage, and deliver personalized content and advertisements. For more information, please review our <a target="_blank" href="${COOKIE_PRIVACY_LINK}">${COOKIE_PRIVACY_LINK_TEXT}</a>.`;
        }

        function areCookiesEnabled() {
            console.log('areCookiesEnabled()');
            document.cookie = 'testcookie=1; SameSite=Lax';
            const cookiesEnabled = document.cookie.indexOf('testcookie=') !== -1;
            document.cookie = 'testcookie=1; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
            return cookiesEnabled;
        }

        // todo: make code .. to display cookie for all countries for first time.. then set cookies to ok - auto if not consent not required. (mightbe auto close.. if not required)
        function getCountriesList() {
            console.log('getCountriesList()');
            var list = [
                'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB'
            ];

            // todo: comment.
            // list.push('test1', 'IN');

            return list;
        }

        /**
         * Set a single cookie with encoding.
         *
         * @param {string} name  The name of the cookie.
         * @param {string} value The value of the cookie.
         * @param {number} days  The number of days until the cookie expires.
         */
        function setCookie(name, value, days) {
            var expires = '';
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = '; expires=' + date.toUTCString();
            }
            document.cookie = name + '=' + encodeURIComponent(value || '') + expires + '; path=/';
        }
        // Example usage
        // setCookie('ht_code_cookies', JSON.stringify(allCookies), 365);

        /**
         * Get a cookie by name with decoding.
         *
         * @param {string} name The name of the cookie.
         * @return {string|null} The value of the cookie or null if not found.
         */
        function getCookie(name) {
            var nameEQ = name + '=';
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
                }
            }
            return null;
        }

        /**
         * Check if a cookie exists and parse it.
         *
         * @param {string} name The name of the cookie.
         * @return {Object} The parsed cookie object.
         */
        function getCookieObject(name) {
            var retrievedCookie = getCookie(name);
            console.log('retrievedCookie: ' + retrievedCookie);
            console.log('typeof retrievedCookie: ' + typeof retrievedCookie);

            var cookieObject = {};

            if (retrievedCookie) {
                try {
                    cookieObject = JSON.parse(retrievedCookie);
                    console.log('parsed cookieObject');
                } catch (e) {
                    cookieObject = { value: retrievedCookie };
                    console.log('not parsed cookieObject - might be a string');
                }
            }

            console.log(cookieObject);
            console.log('typeof cookieObject: ' + typeof cookieObject);

            return cookieObject;
        }
        // Example usage to retrieve and parse the cookie
        // var parsedCookie = getCookieObject('ht_code_cookies');

        /**
         * Display cookie banner
         * Event listeners
         */
        function displayCookieBanner() {
            console.log('displayCookieBanner()');
            
            if (getCookie(COOKIE_NAME)) {
                console.log('Cookie already set..');
                return;
            }

            addInternalCSS();

            /**
             * Create cookie banner
             * - cookie_text: The text to display in the cookie banner.
             * - COOKIE_BUTTON_TEXT: The text to display on the cookie button.
             * - COOKIE_PRIVACY_LINK: The URL of the privacy policy.
             * - COOKIE_PRIVACY_LINK_TEXT: The text to display for the privacy policy link.
             * 
             */

            const cookieBanner = document.createElement('div');
            cookieBanner.className = 'ht_code_cookie';
            cookieBanner.innerHTML = `
                <div class="ht_code_cookie_txt" style="margin: 0; color: #333; font-weight: 500;">
                    <p> ${cookie_text} </p>
                </div>
                <div class="ht_code_cookie_preferences" style="display: none;">
                    <h3>Cookie Preferences</h3>
                    <label>
                        <input type="checkbox" class="ht_code_cookie_essential" checked disabled>
                        Essential Cookies (Always Enabled)
                    </label>
                    <label>
                        <input type="checkbox" class="ht_code_cookie_analytics" checked>
                        Analytics Cookies
                    </label>
                    <label>
                        <input type="checkbox" class="ht_code_cookie_functional" checked>
                        Functional Cookies
                    </label>
                    <label>
                        <input type="checkbox" class="ht_code_cookie_marketing" checked>
                        Marketing Cookies
                    </label>
                    <div class="ht_code_pref_btns">
                        <p class="ht_code_cookie_save_preferences_btn">Save Preferences</p>
                    </div>
                </div>
                <div class="ht_code_action_btns" style="display: flex; gap: 10px;">
                    <p class="ht_code_cookie_btn_no">
                        Reject
                    </p>
                    <p class="ht_code_cookie_btn_customize">
                        Customize
                    </p>
                    <p class="ht_code_cookie_btn_all">
                        ${COOKIE_BUTTON_TEXT}
                    </p>
                </div>
            `;

            document.body.appendChild(cookieBanner);

            const okBtn = document.querySelector('.ht_code_cookie_btn_all');
            if (okBtn) {
                okBtn.addEventListener('click', acceptAllCookies);
            }

            const noBtn = document.querySelector('.ht_code_cookie_btn_no');
            if (noBtn) {
                noBtn.addEventListener('click', rejectAllCookies);
            }

            const savePrefBtn = document.querySelector('.ht_code_cookie_save_preferences_btn');
            if (savePrefBtn) {
                savePrefBtn.addEventListener('click', customCookies);
            }

            const customizeButton = document.querySelector('.ht_code_cookie_btn_customize');
            const customizePreferences = document.querySelector('.ht_code_cookie_preferences');
            const cookieTxt = document.querySelector('.ht_code_cookie_txt');
            
            if (customizeButton && customizePreferences && cookieTxt) {
                console.log('customizeButton');
                customizeButton.addEventListener('click', function() {
                    console.log('customizeButton click');
                    if (customizePreferences.style.display === 'none' || !customizePreferences.style.display) {
                        console.log('customizeButton click - show');
                        customizePreferences.style.display = 'block';
                        cookieTxt.style.display = 'none';
                    } else {
                        console.log('customizeButton click - hide');
                        customizePreferences.style.display = 'none';
                        cookieTxt.style.display = 'block';
                    }
                });
            }

            /**
             * Adds internal CSS styles to the document head.
             * 
             * - :root variables:
             * --ht-code-cookie-secondary-color and --ht-code-cookie-background-color : this variable is used for the primary and secondary colors of the buttons
             * --ht-code-cookie-primary-color : this variable is used for the border gradient of the buttons
             * --ht-code-cookie-border-color : this variable is used for the border color of the buttons
             * --ht-code-cookie-text-color: this variable is used for text color in the banner
             */
            function addInternalCSS() {
                const style = document.createElement('style');
                style.innerHTML = `
                    :root {
                        --ht-code-cookie-secondary-color: purple;
                        --ht-code-cookie-background-color: #ffffff;
                        --ht-code-cookie-primary-color: linear-gradient(90deg, #f92c8b 0%, #b02cd6 100%);
                        --ht-code-cookie-border-color: --ht-code-cookie-primary-color;
                        --ht-code-cookie-text-color: #333;
                        --ht-code-cookie-margin : 20px;
                    }
                    .ht_code_pref_btns * {
                        box-sizing: border-box;
                        padding: 0;
                        margin: 0;
                    }
                    .ht_code_cookie {
                        width: clamp(200px, calc(100% - 2 * var(--ht-code-cookie-margin)), 400px);
                        position: fixed;
                        margin: var(--ht-code-cookie-margin);
                        bottom: 0;
                        left: 0;
                        line-height: 1.6;
                        font-size: 14px;
                        background-color: var(--ht-code-cookie-background-color);
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                        z-index: 9999;
                    }
                    .ht_code_cookie_txt,
                    .ht_code_cookie_preferences {
                        font-size: 14px;
                        line-height: 1.5;
                        align-items: center;
                        padding: 10px;
                        width: 100%;
                        color: var(--text-color);
                    }
                    .ht_code_action_btns,
                    .ht_code_cookie_preferences {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        flex-wrap: wrap;
                    }
                    .ht_code_action_btns p {
                        padding: 8px;
                        cursor: pointer;
                        text-align: center;
                        border: 2px solid;
                        border-image: var(--ht-code-cookie-primary-color);
                        border-image-slice: 1;
                        font-weight: 500;
                        display: flex;
                        flex: auto;
                        max-width: 100%;
                        justify-content: center;
                        border-radius: 3px;
                        cursor: pointer;
                    }
                    .ht_code_cookie_btn_all {
                        background-image: var(--ht-code-cookie-primary-color);
                        color: var(--ht-code-cookie-background-color);
                        border: 2px solid;
                        border-image: var(--ht-code-cookie-primary-color);
                        border-image-slice: 1;
                    }
                    .ht_code_cookie_btn_customize,
                    .ht_code_cookie_btn_no {
                        color: var(--ht-code-cookie-secondary-color);
                        background-color: transparent;
                    }

                    .ht_code_cookie_save_preferences_btn {
                        background-color: #c4c4c4;
                        color: #333;
                        font-weight: bolder;
                        display: flex;
                        flex: auto;
                        max-width: 100%;
                        justify-content: center;
                        border-radius: 3px;
                        cursor: pointer;
                        padding: 8px;
                    }
                    .ht_code_cookie_preferences h3 {
                        color: var(--ht-code-cookie-secondary-color);
                        text-align: center;
                    }
                    .ht_code_cookie_preferences label {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin: 10px 0px;
                        }

                        @media (max-width: 426px) {
                           .ht_code_action_btns p {
                                width: 100%;
                                margin-bottom: 10px;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                
                // accept all cookies
                function acceptAllCookies() {
                    console.log('acceptAllCookies()');
                    allCookies.is_cookies = 'ok';
                    allCookies.cookie_consent = 'user';
                    allCookies.cookie_consent_time = new Date().getTime();
                    setCookie( COOKIE_NAME, JSON.stringify(allCookies), 365)

                    update_ls();
                    document.body.removeChild(cookieBanner);
                }

                // reject all cookies
                function rejectAllCookies() {
                    console.log('rejectAllCookies()');
                    allCookies.is_cookies = 'no';
                    allCookies.cookie_consent = 'user';
                    allCookies.cookie_consent_time = new Date().getTime();
                    setCookie( COOKIE_NAME, JSON.stringify(allCookies), 365 )
                    update_ls();
                    document.body.removeChild(cookieBanner);
                }

                // click on custom cookies. show preferences
                function showPreferences() {
                    console.log('showPreferences()');
                }

                // custom cookies
                function customCookies() {
                    console.log('clicked on save preferences - customCookies()');
                    allCookies.is_cookies = 'custom';
                    allCookies.cookie_consent = 'user';
                    allCookies.cookie_consent_time = new Date().getTime();

                    const analyticsCheckbox = document.querySelector('.ht_code_cookie_analytics');
                    allCookies.cookie_analytics = analyticsCheckbox && analyticsCheckbox.checked ? 'enabled' : 'disabled';

                    const functionalCheckbox = document.querySelector('.ht_code_cookie_functional');
                    allCookies.cookie_functional = functionalCheckbox && functionalCheckbox.checked ? 'enabled' : 'disabled';

                    const marketingCheckbox = document.querySelector('.ht_code_cookie_marketing');
                    allCookies.cookie_marketing = marketingCheckbox && marketingCheckbox.checked ? 'enabled' : 'disabled';

                    setCookie( COOKIE_NAME, JSON.stringify(allCookies), 365 )
                    update_ls();
                    document.body.removeChild(cookieBanner);
                }
        }


        // update local storage with cookies values
        function update_ls() {
            console.log('update_ls()');
            setItem('is_cookies', allCookies.is_cookies);
            setItem('coookie_consent', allCookies.cookie_consent);
            setItem('cookie_consent_time' + '_time', allCookies.cookie_consent_time);
            setItem('cookie_analytics', allCookies.cookie_analytics);
            setItem('cookie_functional', allCookies.cookie_functional);
            setItem('cookie_marketing', allCookies.cookie_marketing);
        }


        /**
         * Check the country and display the cookie banner if necessary.
         *
         * @param {string} loc The location data.
         */
        function countrycheck(loc) {
            console.log('countrycheck(): ' + loc);
            const countriesList = getCountriesList();
            if (countriesList.includes(loc)) {
                console.log("Location is in the list..");
                displayCookieBanner();
            } else {
                console.log("Location is not in the list..");
                // Set cookies to ok - auto
                allCookies.is_cookies = 'ok';
                allCookies.cookie_consent = 'auto';
                allCookies.cookie_consent_time = new Date().getTime();
                setCookie('ht_code_cookies', JSON.stringify(allCookies), 365);
                update_ls();
                console.log("Cookies are ok. Auto.");

                // // display cookie banner.. only for the first time.
                // displayCookieBanner();

            }
        }


        /**
         * Get location data.
         *
         * @return {Promise} A promise that resolves with the location data.
         */
        function getLocation() {
            return new Promise((resolve, reject) => {
                $.get("https://www.cloudflare.com/cdn-cgi/trace")
                    .done(function(data) {
                        if (data && data.length > 1) {
                            const locMatch = data.match(/loc=(.*)\n/);
                            const location = locMatch ? locMatch[1] : '';
                            setItem('loc', location);
                            resolve(location);
                        } else {
                            console.log("data issue.");
                            reject("data issue - reject");
                        }
                    })
                    .fail(function(error) {
                        console.error('Failed to fetch:', error);
                        reject('Failed to fetch - reject', error);
                    });
            });
        }

        /**
         * Check if cookies should be displayed.
         *
         * checks if cookies are enabled, 
         * check if the cookie consent has already been set
         * and if not then retrieves the location data to determine whether to display the cookie banner.
         *
         * @return {Promise<void>} A promise that resolves when the check is complete.
         */
        async function isCookiesToDisplay() {
            console.log('isCookiesToDisplay()');
        
            if (!areCookiesEnabled()) {
                console.log("Cookies are disabled.");
                setItem('is_cookies', 'disabled');
                setItem('cookie_consent', 'browser');
                return Promise.resolve();
            }
        
            // if cookies are set, but localstorage is not set..  (if localstorage is set this function itself will not call)
            if (getCookie(COOKIE_NAME)) {
                console.log(getCookie(COOKIE_NAME));
                update_ls();
                console.log("Cookie consent already set.. no need to display cookie banner.");
                return Promise.resolve();
            }
        
            let loc = getItem('loc');
            if (loc) {
                console.log("Location data already set: " + loc);
                countrycheck(loc);
                return Promise.resolve();
            } else {
                console.log("Checking location data..");
                try {
                    loc = await getLocation();
                    console.log("Location data set: " + loc);
                    countrycheck(loc);
                } catch (error) {
                    // if issue in getting location, then display banner.
                    displayCookieBanner();
                    console.error('Failed to retrieve location data:', error);
                }
            }
        }

        // Initialize the cookie display check
        isCookiesToDisplay();


    });
})(jQuery);