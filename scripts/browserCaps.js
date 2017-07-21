
/**
 * Browser caps needed
 * - history
 * 
 */

function checkNetworkSpeed() {

    var timer = setTimeout(function () {
        alert('Slow connection detected. This may cause detrimental effect on app experience.')
    }, 6000);

    window.onload = function () {
        clearTimeout(timer);
    };

    return timer;

}

function detectBrowser() {
    
    //https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser

    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    if (isBlink)
        return 'Blink Engine';

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE)
        return 'Internet Explorer 6-11';

    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if (isOpera)
        return 'Opera 8.0+';

    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox)
        return 'Firefox 1.0+';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
    if (isSafari)
        return 'Safari 3.0+';

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    if (isEdge)
        return 'Edge 20+';

    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    if (isChrome)
        return 'Chrome';

};

function detectCapabilities() {

    if (
        !Modernizr.json ||
        //!Modernizr.history ||
        !Modernizr.requestanimationframe ||
        !Modernizr.cssanimations ||
        !Modernizr.mediaqueries ||
        !Modernizr.csspointerevents ||
        !Modernizr.csstransforms ||
        //!Modernizr.cssvhunit ||  //due to some bugs related with modern mobile browsers.
        !Modernizr.es5 ||
        !Modernizr.strictmode ||
        !Modernizr.placeholder ||
        !Modernizr.localstorage ||
        !Modernizr.sessionstorage ||
        !Modernizr.atobbtoa

        ) {

        window.platformSupported = false;

        document.write('<div style="padding:10px;background-color:#efefef;"><b>Oops - Ordering app cannot be run on this browser.</b><p>Your browser does not support all ' +
            'the features which are required to run this application properly. Please upgrade or use a newer version of your browser.' +
            ' Using an old browser can put your security at risk and can cause detrimental effect on your experience using our services.</p>' +
            '<p>Your browser : ' + detectBrowser() + '</p>' +
            '<p>Saffron Kitchens | C3 Solutions &copy; - 2017 </p></div>');

        var se = {
            json: Modernizr.json,
            history: Modernizr.history,
            raf: Modernizr.requestanimationframe,
            cssAnim: Modernizr.cssanimations,
            mq: Modernizr.mediaqueries,
            csspointerev: Modernizr.csspointerevents,
            trans: Modernizr.csstransforms,
            vh: Modernizr.cssvhunit,
            es5: Modernizr.es5,
            sm: Modernizr.strictmode,
            placehold: Modernizr.placeholder,
            ls: Modernizr.localstorage,
            ss: Modernizr.sessionstorage,
            atob: Modernizr.atobbtoa
        };

        alert(JSON && JSON.stringify(se));

        alert(navigator.userAgent);

        if (window.stop) {
            window.stop();
        }
        //works in all browsers but IE    
        document.execCommand && document.execCommand("Stop");
    }
    else {
        window.platformSupported = true;
    }

    return window.platformSupported;



};

function startDetection() {

    var timer = checkNetworkSpeed();
    if (!detectCapabilities()) {
        clearTimeout(timer);
    }
    if (console && console.log) {
        console.log('Platform supported :', window.platformSupported);
    }

};

startDetection();







