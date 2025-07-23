(function($) {
    $(document).ready(function() {

        console.log('app.js loaded');

        // wp local variables
        var l_var = '';
        variable_l_var();

        /**
         * get ht_code_main_var and assing to l_var variable
         */
        function variable_l_var() {
            if (typeof ht_code_main_var !== "undefined") {
                l_var = ht_code_main_var;
            } else {
                // fallback values
                l_var = {};
            }
        }


        var ht_code_storage = {};

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



        /**
         * Function to activate deferred scripts.
         * 
         * data-cookie-type: will check if @var name is custom (i.e. is_cookies). (all, analytics, functional, marketing)
         * e.g. 
         *  <template class="deferred-scripts"> ... </template>  // all
         *  <template class="deferred-scripts" data-cookie-type="all"> ... </template>  // all
         *  <template class="deferred-scripts" data-cookie-type="analytics"> ... </template>  // analytics,..
         * 
         * @param {string} name The type of scripts (cookie type) to activate (all, analytics, functional, marketing).
         */
        function activateDeferredScripts(name) {
            console.log('activateDeferredScripts: ', name);
            
            
            const templates = document.querySelectorAll('.deferred-scripts');
            templates.forEach(template => {
                if (template) {
                    console.log('template: ', template);
                    // name or not set
                    if (!name || 'all' == name) {
                        console.log('all');
                        const content = template.content;
                        document.head.appendChild(content);
                    } else {
                        console.log('not all - might be (custom) analytics, functional, marketing');
                        // analytics, functional, marketing
                        var cookie_type = template.getAttribute('data-cookie-type');
                        if ( cookie_type ) {
                            console.log('cookie type exist: ', cookie_type);
                            if (name == cookie_type) {
                                console.log('name, cookie type matched:', name);
                                const content = template.content;
                                document.head.appendChild(content);
                            }
                        } else {
                            console.log('cookie type not exist');
                            // const content = template.content;
                            // document.head.appendChild(content);
                        }
                    }
                }
            });
        }


        /**
         * Function to dynamically load a JavaScript file.
         *
         * @param {string} url The URL of the script to load.
         * @param {function} [callback] The callback function to execute once the script is loaded.
         * @param {boolean} [async=true] Whether to load the script asynchronously.
         * @param {boolean} [defer=false] Whether to defer the script execution.
         */
        function loadScript(url, callback = () => {}, async = true, defer = false) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.async = async;
            script.defer = defer;
            script.onload = callback;
            document.head.appendChild(script);
        }


        /**
         * Function to load cookie.js and deferred scripts.
         */
        function cookieAndDeferredScripts() {
            if (l_var.cookies) {
                if (!getItem('is_cookies')) {
                    console.log('calling cookie.js');
                    // todo.. cookie.js/cookie.min.js
                    loadScript('/wp-content/plugins/ht-code/inc/sites/all/all-js/cookie.min.js', function() {
                        console.log('cookie.js loaded');
                    });
                } else {
                    console.log('is_cookies is set.. don\'t call cookie.js');
                    const is_cookies = getItem('is_cookies');
                    console.log('is_cookies', is_cookies);
                    // Load deferred JS files based on cookie settings
                    if (is_cookies === 'ok' || is_cookies === 'disabled') {
                        console.log('is_cookies: ', is_cookies);
                        activateDeferredScripts('all');
                    } else if (is_cookies === 'custom') {
                        if (getItem('cookie_analytics') === 'enabled') {
                            console.log('cookie_analytics');
                            activateDeferredScripts('analytics');
                        }
                        if (getItem('cookie_functional') === 'enabled') {
                            console.log('cookie_functional');
                            activateDeferredScripts('functional');
                        }
                        if (getItem('cookie_marketing') === 'enabled') {
                            console.log('cookie_marketing');
                            activateDeferredScripts('marketing');
                        }
                    }
                }
            } else {
                console.log('cookies banner is not enabled');
                // Load all deferred JS files if cookies are not enabled
                activateDeferredScripts('all');
            }
        }

        // Execute the function to load cookie.js and deferred scripts
        cookieAndDeferredScripts();
        

    });
})(jQuery);