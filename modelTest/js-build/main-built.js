
/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define('domReady',[],function () {
    

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

/*! jQuery v1.7.1 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cv(a){if(!ck[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){cl||(cl=c.createElement("iframe"),cl.frameBorder=cl.width=cl.height=0),b.appendChild(cl);if(!cm||!cl.createElement)cm=(cl.contentWindow||cl.contentDocument).document,cm.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),cm.close();d=cm.createElement(a),cm.body.appendChild(d),e=f.css(d,"display"),b.removeChild(cl)}ck[a]=e}return ck[a]}function cu(a,b){var c={};f.each(cq.concat.apply([],cq.slice(0,b)),function(){c[this]=a});return c}function ct(){cr=b}function cs(){setTimeout(ct,0);return cr=f.now()}function cj(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ci(){try{return new a.XMLHttpRequest}catch(b){}}function cc(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function cb(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function ca(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bE.test(a)?d(a,e):ca(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)ca(a+"["+e+"]",b[e],c,d);else d(a,b)}function b_(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function b$(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bT,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=b$(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=b$(a,c,d,e,"*",g));return l}function bZ(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bP),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bC(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bx:by,g=0,h=e.length;if(d>0){if(c!=="border")for(;g<h;g++)c||(d-=parseFloat(f.css(a,"padding"+e[g]))||0),c==="margin"?d+=parseFloat(f.css(a,c+e[g]))||0:d-=parseFloat(f.css(a,"border"+e[g]+"Width"))||0;return d+"px"}d=bz(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0;if(c)for(;g<h;g++)d+=parseFloat(f.css(a,"padding"+e[g]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+e[g]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+e[g]))||0);return d+"px"}function bp(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c+(i[c][d].namespace?".":"")+i[c][d].namespace,i[c][d],i[c][d].data)}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?parseFloat(d):j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.1",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?m(g):h==="function"&&(!a.unique||!o.has(g))&&c.push(g)},n=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,l=j||0,j=0,k=c.length;for(;c&&l<k;l++)if(c[l].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}i=!1,c&&(a.once?e===!0?o.disable():c=[]:d&&d.length&&(e=d.shift(),o.fireWith(e[0],e[1])))},o={add:function(){if(c){var a=c.length;m(arguments),i?k=c.length:e&&e!==!0&&(j=a,n(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){i&&f<=k&&(k--,f<=l&&l--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&o.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(i?a.once||d.push([b,c]):(!a.once||!e)&&n(b,c));return this},fire:function(){o.fireWith(this,arguments);return this},fired:function(){return!!e}};return o};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p,q=c.createElement("div"),r=c.documentElement;q.setAttribute("className","t"),q.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=q.getElementsByTagName("*"),e=q.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=q.getElementsByTagName("input")[0],b={leadingWhitespace:q.firstChild.nodeType===3,tbody:!q.getElementsByTagName("tbody").length,htmlSerialize:!!q.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:q.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete q.test}catch(s){b.deleteExpando=!1}!q.addEventListener&&q.attachEvent&&q.fireEvent&&(q.attachEvent("onclick",function(){b.noCloneEvent=!1}),q.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),q.appendChild(i),k=c.createDocumentFragment(),k.appendChild(q.lastChild),b.checkClone=k.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,k.removeChild(i),k.appendChild(q),q.innerHTML="",a.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",q.style.width="2px",q.appendChild(j),b.reliableMarginRight=(parseInt((a.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0);if(q.attachEvent)for(o in{submit:1,change:1,focusin:1})n="on"+o,p=n in q,p||(q.setAttribute(n,"return;"),p=typeof q[n]=="function"),b[o+"Bubbles"]=p;k.removeChild(q),k=g=h=j=q=i=null,f(function(){var a,d,e,g,h,i,j,k,m,n,o,r=c.getElementsByTagName("body")[0];!r||(j=1,k="position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",m="visibility:hidden;border:0;",n="style='"+k+"border:5px solid #000;padding:0;'",o="<div "+n+"><div></div></div>"+"<table "+n+" cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",a=c.createElement("div"),a.style.cssText=m+"width:0;height:0;position:static;top:0;margin-top:"+j+"px",r.insertBefore(a,r.firstChild),q=c.createElement("div"),a.appendChild(q),q.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",l=q.getElementsByTagName("td"),p=l[0].offsetHeight===0,l[0].style.display="",l[1].style.display="none",b.reliableHiddenOffsets=p&&l[0].offsetHeight===0,q.innerHTML="",q.style.width=q.style.paddingLeft="1px",f.boxModel=b.boxModel=q.offsetWidth===2,typeof q.style.zoom!="undefined"&&(q.style.display="inline",q.style.zoom=1,b.inlineBlockNeedsLayout=q.offsetWidth===2,q.style.display="",q.innerHTML="<div style='width:4px;'></div>",b.shrinkWrapBlocks=q.offsetWidth!==2),q.style.cssText=k+m,q.innerHTML=o,d=q.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,i={doesNotAddBorder:e.offsetTop!==5,doesAddBorderForTableAndCells:h.offsetTop===5},e.style.position="fixed",e.style.top="20px",i.fixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",i.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,i.doesNotIncludeMarginInBodyOffset=r.offsetTop!==j,r.removeChild(a),q=a=null,f.extend(b,i))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h=null;if(typeof a=="undefined"){if(this.length){h=f.data(this[0]);if(this[0].nodeType===1&&!f._data(this[0],"parsedAttrs")){e=this[0].attributes;for(var i=0,j=e.length;i<j;i++)g=e[i].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),l(this[0],g,h[g]));f._data(this[0],"parsedAttrs",!0)}}return h}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split("."),d[1]=d[1]?"."+d[1]:"";if(c===b){h=this.triggerHandler("getData"+d[1]+"!",[d[0]]),h===b&&this.length&&(h=f.data(this[0],a),h=l(this[0],a,h));return h===b&&d[1]?this.data(d[0]):h}return this.each(function(){var b=f(this),e=[d[0],c];b.triggerHandler("setData"+d[1]+"!",e),f.data(this,a,c),b.triggerHandler("changeData"+d[1]+"!",e)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise()}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.nodeName.toLowerCase()]||f.valHooks[g.type];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;h<g;h++)e=d[h],e&&(c=f.propFix[e]||e,f.attr(a,e,""),a.removeAttribute(v?e:c),u.test(e)&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/\bhover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};
f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=[],j,k,l,m,n,o,p,q,r,s,t;g[0]=c,c.delegateTarget=this;if(e&&!c.target.disabled&&(!c.button||c.type!=="click")){m=f(this),m.context=this.ownerDocument||this;for(l=c.target;l!=this;l=l.parentNode||this){o={},q=[],m[0]=l;for(j=0;j<e;j++)r=d[j],s=r.selector,o[s]===b&&(o[s]=r.quick?H(l,r.quick):m.is(s)),o[s]&&q.push(r);q.length&&i.push({elem:l,matches:q})}}d.length>e&&i.push({elem:this,matches:d.slice(e)});for(j=0;j<i.length&&!c.isPropagationStopped();j++){p=i[j],c.currentTarget=p.elem;for(k=0;k<p.matches.length&&!c.isImmediatePropagationStopped();k++){r=p.matches[k];if(h||!c.namespace&&!r.namespace||c.namespace_re&&c.namespace_re.test(r.namespace))c.data=r.data,c.handleObj=r,n=((f.event.special[r.origType]||{}).handle||r.handler).apply(p.elem,g),n!==b&&(c.result=n,n===!1&&(c.preventDefault(),c.stopPropagation()))}}return c.result},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0)}),d._submit_attached=!0)})},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on.call(this,a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.type+"."+e.namespace:e.type,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.POS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function()
{for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bp)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||!bc.test("<"+a.nodeName)?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=bg[l]||bg._default,n=m[0],o=b.createElement("div");b===c?bh.appendChild(o):U(b).appendChild(o),o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bn(k[i]);else bn(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||be.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bq=/alpha\([^)]*\)/i,br=/opacity=([^)]*)/,bs=/([A-Z]|^ms)/g,bt=/^-?\d+(?:px)?$/i,bu=/^-?\d/,bv=/^([\-+])=([\-+.\de]+)/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Left","Right"],by=["Top","Bottom"],bz,bA,bB;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bz(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bv.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bz)return bz(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return bC(a,b,d);f.swap(a,bw,function(){e=bC(a,b,d)});return e}},set:function(a,b){if(!bt.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return br.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bq,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bq.test(g)?g.replace(bq,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bz(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bA=function(a,b){var c,d,e;b=b.replace(bs,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b)));return c}),c.documentElement.currentStyle&&(bB=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f===null&&g&&(e=g[b])&&(f=e),!bt.test(f)&&bu.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f||0,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),bz=bA||bB,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bD=/%20/g,bE=/\[\]$/,bF=/\r?\n/g,bG=/#.*$/,bH=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bI=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bJ=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bK=/^(?:GET|HEAD)$/,bL=/^\/\//,bM=/\?/,bN=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bO=/^(?:select|textarea)/i,bP=/\s+/,bQ=/([?&])_=[^&]*/,bR=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bS=f.fn.load,bT={},bU={},bV,bW,bX=["*/"]+["*"];try{bV=e.href}catch(bY){bV=c.createElement("a"),bV.href="",bV=bV.href}bW=bR.exec(bV.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bS)return bS.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bN,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bO.test(this.nodeName)||bI.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bF,"\r\n")}}):{name:b.name,value:c.replace(bF,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b_(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b_(a,b);return a},ajaxSettings:{url:bV,isLocal:bJ.test(bW[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bX},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bZ(bT),ajaxTransport:bZ(bU),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?cb(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cc(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bH.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bG,"").replace(bL,bW[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bP),d.crossDomain==null&&(r=bR.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bW[1]&&r[2]==bW[2]&&(r[3]||(r[1]==="http:"?80:443))==(bW[3]||(bW[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),b$(bT,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bK.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bM.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bQ,"$1_="+x);d.url=y+(y===d.url?(bM.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bX+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=b$(bU,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)ca(g,a[g],c,e);return d.join("&").replace(bD,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cd=f.now(),ce=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cd++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ce.test(b.url)||e&&ce.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ce,l),b.url===j&&(e&&(k=k.replace(ce,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cf=a.ActiveXObject?function(){for(var a in ch)ch[a](0,1)}:!1,cg=0,ch;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ci()||cj()}:ci,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cf&&delete ch[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cg,cf&&(ch||(ch={},f(a).unload(cf)),ch[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var ck={},cl,cm,cn=/^(?:toggle|show|hide)$/,co=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cp,cq=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cr;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cu("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cv(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cu("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cu("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cv(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cn.test(h)?(o=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),o?(f._data(this,"toggle"+i,o==="show"?"hide":"show"),j[o]()):j[h]()):(k=co.exec(h),l=j.cur(),k?(m=parseFloat(k[2]),n=k[3]||(f.cssNumber[i]?"":"px"),n!=="px"&&(f.style(this,i,(m||1)+n),l=(m||1)/j.cur()*l,f.style(this,i,l+n)),k[1]&&(m=(k[1]==="-="?-1:1)*m+l),j.custom(l,m,n)):j.custom(l,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:cu("show",1),slideUp:cu("hide",1),slideToggle:cu("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cr||cs(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){e.options.hide&&f._data(e.elem,"fxshow"+e.prop)===b&&f._data(e.elem,"fxshow"+e.prop,e.start)},h()&&f.timers.push(h)&&!cp&&(cp=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cr||cs(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cp),cp=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(["width","height"],function(a,b){f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cy(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.support.fixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.support.fixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cy(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cy(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,d,"padding")):this[d]():null},f.fn["outer"+c]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,d,a?"margin":"border")):this[d]():null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNumeric(j)?j:i}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);
define("jQuery", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$;
    };
}(this)));

define('template',[], function() {
    /*!
     * artTemplate - Template Engine
     * https://github.com/aui/artTemplate
     * Released under the MIT, BSD, and GPL Licenses
     * Email: 1987.tangbin@gmail.com
     */


    /**
     * 模板引擎路由函数
     * 若第二个参数类型为 Object 则执行 render 方法, 否则 compile 方法
     * @name    template
     * @param   {String}            模板ID (可选)
     * @param   {Object, String}    数据或者模板字符串
     * @return  {String, Function}  渲染好的HTML字符串或者渲染方法
     */
    var template = function(id, content) {
        return template[
            typeof content === 'object' ? 'render' : 'compile'
        ].apply(template, arguments);
    };




    (function(exports, global) {


        
        exports.version = '2.0.0';
        exports.openTag = '<%'; // 设置逻辑语法开始标签
        exports.closeTag = '%>'; // 设置逻辑语法结束标签
        exports.isEscape = true; // HTML字符编码输出开关
        exports.parser = null; // 自定义语法插件接口



        /**
         * 渲染模板
         * @name    template.render
         * @param   {String}    模板ID
         * @param   {Object}    数据
         * @return  {String}    渲染好的HTML字符串
         */
        exports.render = function(id, data) {

            var cache = _getCache(id);

            if (cache === undefined) {

                return _debug({
                    id: id,
                    name: 'Render Error',
                    message: 'No Template'
                });

            }

            return cache(data);
        };



        /**
         * 编译模板
         * 2012-6-6:
         * define 方法名改为 compile,
         * 与 Node Express 保持一致,
         * 感谢 TooBug 提供帮助!
         * @name    template.compile
         * @param   {String}    模板ID (可选)
         * @param   {String}    模板字符串
         * @return  {Function}  渲染方法
         */
        exports.compile = function(id, source) {

            var params = arguments;
            var isDebug = params[2];
            var anonymous = 'anonymous';

            if (typeof source !== 'string') {
                isDebug = params[1];
                source = params[0];
                id = anonymous;
            }


            try {

                var Render = _compile(source, isDebug);

            } catch (e) {

                e.id = id || source;
                e.name = 'Syntax Error';

                return _debug(e);

            }


            function render(data) {

                try {

                    return new Render(data) + '';

                } catch (e) {

                    if (!isDebug) {
                        return exports.compile(id, source, true)(data);
                    }

                    e.id = id || source;
                    e.name = 'Render Error';
                    e.source = source;

                    return _debug(e);

                };

            };


            render.prototype = Render.prototype;
            render.toString = function() {
                return Render.toString();
            };


            if (id !== anonymous) {
                _cache[id] = render;
            }


            return render;

        };




        /**
         * 添加模板辅助方法
         * @name    template.helper
         * @param   {String}    名称
         * @param   {Function}  方法
         */
        exports.helper = function(name, helper) {
            exports.prototype[name] = helper;
        };




        /**
         * 模板错误事件
         * @name    template.onerror
         * @event
         */
        exports.onerror = function(e) {
            var content = '[template]:\n' + e.id + '\n\n[name]:\n' + e.name;

            if (e.message) {
                content += '\n\n[message]:\n' + e.message;
            }

            if (e.line) {
                content += '\n\n[line]:\n' + e.line;
                content += '\n\n[source]:\n' + e.source.split(/\n/)[e.line - 1].replace(/^[\s\t]+/, '');
            }

            if (e.temp) {
                content += '\n\n[temp]:\n' + e.temp;
            }

            if (global.console) {
                console.error(content);
            }
        };



        // 编译好的函数缓存
        var _cache = {};



        // 获取模板缓存
        var _getCache = function(id) {

            var cache = _cache[id];

            if (cache === undefined && 'document' in global) {
                var elem = document.getElementById(id);

                if (elem) {
                    var source = elem.value || elem.innerHTML;
                    return exports.compile(id, source.replace(/^\s*|\s*$/g, ''));
                }

            } else if (_cache.hasOwnProperty(id)) {

                return cache;
            }
        };



        // 模板调试器
        var _debug = function(e) {

            exports.onerror(e);

            function error() {
                return error + '';
            };

            error.toString = function() {
                return '{Template Error}';
            };

            return error;
        };



        // 模板编译器
        var _compile = (function() {


            // 辅助方法集合
            exports.prototype = {
                $render: exports.render,
                $escapeHTML: function(content) {

                    return typeof content === 'string' ? content.replace(/&(?![\w#]+;)|[<>"']/g, function(s) {
                        return {
                            "<": "&#60;",
                            ">": "&#62;",
                            '"': "&#34;",
                            "'": "&#39;",
                            "&": "&#38;"
                        }[s];
                    }) : content;
                },
                $getValue: function(value) {

                    if (typeof value === 'string' || typeof value === 'number') {

                        return value;

                    } else if (typeof value === 'function') {

                        return value();

                    } else {

                        return '';

                    }

                }
            };


            var arrayforEach = Array.prototype.forEach || function(block, thisObject) {
                var len = this.length >>> 0;

                for (var i = 0; i < len; i++) {
                    if (i in this) {
                        block.call(thisObject, this[i], i, this);
                    }
                }

            };


            // 数组迭代
            var forEach = function(array, callback) {
                arrayforEach.call(array, callback);
            };


            var keyWords =
                // 关键字
                'break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if' + ',in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with'

            // 保留字
            +',abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto' + ',implements,import,int,interface,long,native,package,private,protected,public,short' + ',static,super,synchronized,throws,transient,volatile'

            // ECMA 5 - use strict
            + ',arguments,let,yield'

            + ',undefined';

            var filter = new RegExp([

                // 注释
                "/\\*(.|\n)*?\\*/|//[^\n]*\n|//[^\n]*$",

                // 字符串
                "'[^']*'|\"[^\"]*\"",

                // 方法
                "\\.[\s\t\n]*[\\$\\w]+",

                // 关键字
                "\\b" + keyWords.replace(/,/g, '\\b|\\b') + "\\b"


            ].join('|'), 'g');



            // 提取js源码中所有变量
            var _getVariable = function(code) {

                code = code
                    .replace(filter, ',')
                    .replace(/[^\w\$]+/g, ',')
                    .replace(/^,|^\d+|,\d+|,$/g, '');

                return code ? code.split(',') : [];
            };


            return function(source, isDebug) {

                var openTag = exports.openTag;
                var closeTag = exports.closeTag;
                var parser = exports.parser;


                var code = source;
                var tempCode = '';
                var line = 1;
                var uniq = {
                    $data: true,
                    $helpers: true,
                    $out: true,
                    $line: true
                };
                var helpers = exports.prototype;
                var prototype = {};


                var variables = "var $helpers=this," + (isDebug ? "$line=0," : "");

                var isNewEngine = ''.trim; // '__proto__' in {}
                var replaces = isNewEngine ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"];

                var concat = isNewEngine ? "if(content!==undefined){$out+=content;return content}" : "$out.push(content);";

                var print = "function(content){" + concat + "}";

                var include = "function(id,data){" + "if(data===undefined){data=$data}" + "var content=$helpers.$render(id,data);" + concat + "}";


                // html与逻辑语法分离
                forEach(code.split(openTag), function(code, i) {
                    code = code.split(closeTag);

                    var $0 = code[0];
                    var $1 = code[1];

                    // code: [html]
                    if (code.length === 1) {

                        tempCode += html($0);

                        // code: [logic, html]
                    } else {

                        tempCode += logic($0);

                        if ($1) {
                            tempCode += html($1);
                        }
                    }


                });



                code = tempCode;


                // 调试语句
                if (isDebug) {
                    code = 'try{' + code + '}catch(e){' + 'e.line=$line;' + 'throw e' + '}';
                }


                code = "" + variables + replaces[0] + code + 'return new String(' + replaces[3] + ')';


                try {

                    var Render = new Function('$data', code);
                    Render.prototype = prototype;

                    return Render;

                } catch (e) {
                    e.temp = 'function anonymous($data) {' + code + '}';
                    throw e;
                };




                // 处理 HTML 语句
                function html(code) {

                    // 记录行号
                    line += code.split(/\n/).length - 1;

                    code = code
                        // 单双引号与反斜杠转义
                        .replace(/('|"|\\)/g, '\\$1')
                        // 换行符转义(windows + linux)
                        .replace(/\r/g, '\\r')
                        .replace(/\n/g, '\\n');

                    code = replaces[1] + "'" + code + "'" + replaces[2];

                    return code + '\n';
                };


                // 处理逻辑语句
                function logic(code) {

                    var thisLine = line;

                    if (parser) {

                        // 语法转换插件钩子
                        code = parser(code);

                    } else if (isDebug) {

                        // 记录行号
                        code = code.replace(/\n/g, function() {
                            line++;
                            return '$line=' + line + ';';
                        });

                    }


                    // 输出语句. 转义: <%=value%> 不转义:<%==value%>
                    if (code.indexOf('=') === 0) {

                        var isEscape = code.indexOf('==') !== 0;

                        code = code.replace(/^=*|[\s;]*$/g, '');

                        if (isEscape && exports.isEscape) {

                            // 转义处理，但排除辅助方法
                            var name = code.replace(/\s*\([^\)]+\)/, '');
                            if (!helpers.hasOwnProperty(name) && !/^(include|print)$/.test(name)) {
                                code = '$escapeHTML($getValue(' + code + '))';
                            }

                        } else {
                            code = '$getValue(' + code + ')';
                        }


                        code = replaces[1] + code + replaces[2];

                    }

                    if (isDebug) {
                        code = '$line=' + thisLine + ';' + code;
                    }

                    getKey(code);

                    return code + '\n';
                };


                // 提取模板中的变量名
                function getKey(code) {

                    code = _getVariable(code);

                    // 分词
                    forEach(code, function(name) {

                        // 除重
                        if (!uniq.hasOwnProperty(name)) {
                            setValue(name);
                            uniq[name] = true;
                        }

                    });

                };


                // 声明模板变量
                // 赋值优先级:
                // 内置特权方法(include, print) > 私有模板辅助方法 > 数据 > 公用模板辅助方法
                function setValue(name) {

                    var value;

                    if (name === 'print') {

                        value = print;

                    } else if (name === 'include') {

                        prototype['$render'] = helpers['$render'];
                        value = include;

                    } else {

                        value = '$data.' + name;

                        if (helpers.hasOwnProperty(name)) {

                            prototype[name] = helpers[name];

                            if (name.indexOf('$') === 0) {
                                value = '$helpers.' + name;
                            } else {
                                value = value + '===undefined?$helpers.' + name + ':' + value;
                            }
                        }


                    }

                    variables += name + '=' + value + ',';
                };


            };
        })();




    })(template, this);


    if (typeof module !== 'undefined' && module.exports) {
        module.exports = template;
    };

    return template;

})
;
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define('jquery.cookie',['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));

define('getCookie',["jquery.cookie"], function() {

    return {
        "depCity": "北京",
        "arrCity": "上海",
        "depData": "2014-01-13"
    }
})
;
/**
 * @license RequireJS text 2.0.12 Copyright (c) 2010-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */
/*jslint regexp: true */
/*global require, XMLHttpRequest, ActiveXObject,
  define, window, process, Packages,
  java, location, Components, FileUtils */

define('text',['module'], function (module) {
    

    var text, fs, Cc, Ci, xpcIsWindows,
        progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
        xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        hasLocation = typeof location !== 'undefined' && location.href,
        defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''),
        defaultHostName = hasLocation && location.hostname,
        defaultPort = hasLocation && (location.port || undefined),
        buildMap = {},
        masterConfig = (module.config && module.config()) || {};

    text = {
        version: '2.0.12',

        strip: function (content) {
            //Strips <?xml ...?> declarations so that external SVG and XML
            //documents can be added to a document without worry. Also, if the string
            //is an HTML document, only the part inside the body tag is returned.
            if (content) {
                content = content.replace(xmlRegExp, "");
                var matches = content.match(bodyRegExp);
                if (matches) {
                    content = matches[1];
                }
            } else {
                content = "";
            }
            return content;
        },

        jsEscape: function (content) {
            return content.replace(/(['\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r")
                .replace(/[\u2028]/g, "\\u2028")
                .replace(/[\u2029]/g, "\\u2029");
        },

        createXhr: masterConfig.createXhr || function () {
            //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
            var xhr, i, progId;
            if (typeof XMLHttpRequest !== "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject !== "undefined") {
                for (i = 0; i < 3; i += 1) {
                    progId = progIds[i];
                    try {
                        xhr = new ActiveXObject(progId);
                    } catch (e) {}

                    if (xhr) {
                        progIds = [progId];  // so faster next time
                        break;
                    }
                }
            }

            return xhr;
        },

        /**
         * Parses a resource name into its component parts. Resource names
         * look like: module/name.ext!strip, where the !strip part is
         * optional.
         * @param {String} name the resource name
         * @returns {Object} with properties "moduleName", "ext" and "strip"
         * where strip is a boolean.
         */
        parseName: function (name) {
            var modName, ext, temp,
                strip = false,
                index = name.indexOf("."),
                isRelative = name.indexOf('./') === 0 ||
                             name.indexOf('../') === 0;

            if (index !== -1 && (!isRelative || index > 1)) {
                modName = name.substring(0, index);
                ext = name.substring(index + 1, name.length);
            } else {
                modName = name;
            }

            temp = ext || modName;
            index = temp.indexOf("!");
            if (index !== -1) {
                //Pull off the strip arg.
                strip = temp.substring(index + 1) === "strip";
                temp = temp.substring(0, index);
                if (ext) {
                    ext = temp;
                } else {
                    modName = temp;
                }
            }

            return {
                moduleName: modName,
                ext: ext,
                strip: strip
            };
        },

        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,

        /**
         * Is an URL on another domain. Only works for browser use, returns
         * false in non-browser environments. Only used to know if an
         * optimized .js version of a text resource should be loaded
         * instead.
         * @param {String} url
         * @returns Boolean
         */
        useXhr: function (url, protocol, hostname, port) {
            var uProtocol, uHostName, uPort,
                match = text.xdRegExp.exec(url);
            if (!match) {
                return true;
            }
            uProtocol = match[2];
            uHostName = match[3];

            uHostName = uHostName.split(':');
            uPort = uHostName[1];
            uHostName = uHostName[0];

            return (!uProtocol || uProtocol === protocol) &&
                   (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) &&
                   ((!uPort && !uHostName) || uPort === port);
        },

        finishLoad: function (name, strip, content, onLoad) {
            content = strip ? text.strip(content) : content;
            if (masterConfig.isBuild) {
                buildMap[name] = content;
            }
            onLoad(content);
        },

        load: function (name, req, onLoad, config) {
            //Name has format: some.module.filext!strip
            //The strip part is optional.
            //if strip is present, then that means only get the string contents
            //inside a body tag in an HTML string. For XML/SVG content it means
            //removing the <?xml ...?> declarations so the content can be inserted
            //into the current doc without problems.

            // Do not bother with the work if a build and text will
            // not be inlined.
            if (config && config.isBuild && !config.inlineText) {
                onLoad();
                return;
            }

            masterConfig.isBuild = config && config.isBuild;

            var parsed = text.parseName(name),
                nonStripName = parsed.moduleName +
                    (parsed.ext ? '.' + parsed.ext : ''),
                url = req.toUrl(nonStripName),
                useXhr = (masterConfig.useXhr) ||
                         text.useXhr;

            // Do not load if it is an empty: url
            if (url.indexOf('empty:') === 0) {
                onLoad();
                return;
            }

            //Load the text. Use XHR if possible and in a browser.
            if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
                text.get(url, function (content) {
                    text.finishLoad(name, parsed.strip, content, onLoad);
                }, function (err) {
                    if (onLoad.error) {
                        onLoad.error(err);
                    }
                });
            } else {
                //Need to fetch the resource across domains. Assume
                //the resource has been optimized into a JS module. Fetch
                //by the module name + extension, but do not include the
                //!strip part to avoid file system issues.
                req([nonStripName], function (content) {
                    text.finishLoad(parsed.moduleName + '.' + parsed.ext,
                                    parsed.strip, content, onLoad);
                });
            }
        },

        write: function (pluginName, moduleName, write, config) {
            if (buildMap.hasOwnProperty(moduleName)) {
                var content = text.jsEscape(buildMap[moduleName]);
                write.asModule(pluginName + "!" + moduleName,
                               "define(function () { return '" +
                                   content +
                               "';});\n");
            }
        },

        writeFile: function (pluginName, moduleName, req, write, config) {
            var parsed = text.parseName(moduleName),
                extPart = parsed.ext ? '.' + parsed.ext : '',
                nonStripName = parsed.moduleName + extPart,
                //Use a '.js' file name so that it indicates it is a
                //script that can be loaded across domains.
                fileName = req.toUrl(parsed.moduleName + extPart) + '.js';

            //Leverage own load() method to load plugin value, but only
            //write out values that do not have the strip argument,
            //to avoid any potential issues with ! in file names.
            text.load(nonStripName, req, function (value) {
                //Use own write() method to construct full module value.
                //But need to create shell that translates writeFile's
                //write() to the right interface.
                var textWrite = function (contents) {
                    return write(fileName, contents);
                };
                textWrite.asModule = function (moduleName, contents) {
                    return write.asModule(moduleName, fileName, contents);
                };

                text.write(pluginName, nonStripName, textWrite, config);
            }, config);
        }
    };

    if (masterConfig.env === 'node' || (!masterConfig.env &&
            typeof process !== "undefined" &&
            process.versions &&
            !!process.versions.node &&
            !process.versions['node-webkit'])) {
        //Using special require.nodeRequire, something added by r.js.
        fs = require.nodeRequire('fs');

        text.get = function (url, callback, errback) {
            try {
                var file = fs.readFileSync(url, 'utf8');
                //Remove BOM (Byte Mark Order) from utf8 files if it is there.
                if (file.indexOf('\uFEFF') === 0) {
                    file = file.substring(1);
                }
                callback(file);
            } catch (e) {
                if (errback) {
                    errback(e);
                }
            }
        };
    } else if (masterConfig.env === 'xhr' || (!masterConfig.env &&
            text.createXhr())) {
        text.get = function (url, callback, errback, headers) {
            var xhr = text.createXhr(), header;
            xhr.open('GET', url, true);

            //Allow plugins direct access to xhr headers
            if (headers) {
                for (header in headers) {
                    if (headers.hasOwnProperty(header)) {
                        xhr.setRequestHeader(header.toLowerCase(), headers[header]);
                    }
                }
            }

            //Allow overrides specified in config
            if (masterConfig.onXhr) {
                masterConfig.onXhr(xhr, url);
            }

            xhr.onreadystatechange = function (evt) {
                var status, err;
                //Do not explicitly handle errors, those should be
                //visible via console output in the browser.
                if (xhr.readyState === 4) {
                    status = xhr.status || 0;
                    if (status > 399 && status < 600) {
                        //An http 4xx or 5xx error. Signal an error.
                        err = new Error(url + ' HTTP status: ' + status);
                        err.xhr = xhr;
                        if (errback) {
                            errback(err);
                        }
                    } else {
                        callback(xhr.responseText);
                    }

                    if (masterConfig.onXhrComplete) {
                        masterConfig.onXhrComplete(xhr, url);
                    }
                }
            };
            xhr.send(null);
        };
    } else if (masterConfig.env === 'rhino' || (!masterConfig.env &&
            typeof Packages !== 'undefined' && typeof java !== 'undefined')) {
        //Why Java, why is this so awkward?
        text.get = function (url, callback) {
            var stringBuffer, line,
                encoding = "utf-8",
                file = new java.io.File(url),
                lineSeparator = java.lang.System.getProperty("line.separator"),
                input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)),
                content = '';
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }

                if (line !== null) {
                    stringBuffer.append(line);
                }

                while ((line = input.readLine()) !== null) {
                    stringBuffer.append(lineSeparator);
                    stringBuffer.append(line);
                }
                //Make sure we return a JavaScript string and not a Java string.
                content = String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
            callback(content);
        };
    } else if (masterConfig.env === 'xpconnect' || (!masterConfig.env &&
            typeof Components !== 'undefined' && Components.classes &&
            Components.interfaces)) {
        //Avert your gaze!
        Cc = Components.classes;
        Ci = Components.interfaces;
        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        xpcIsWindows = ('@mozilla.org/windows-registry-key;1' in Cc);

        text.get = function (url, callback) {
            var inStream, convertStream, fileObj,
                readData = {};

            if (xpcIsWindows) {
                url = url.replace(/\//g, '\\');
            }

            fileObj = new FileUtils.File(url);

            //XPCOM, you so crazy
            try {
                inStream = Cc['@mozilla.org/network/file-input-stream;1']
                           .createInstance(Ci.nsIFileInputStream);
                inStream.init(fileObj, 1, 0, false);

                convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                .createInstance(Ci.nsIConverterInputStream);
                convertStream.init(inStream, "utf-8", inStream.available(),
                Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                convertStream.readString(inStream.available(), readData);
                convertStream.close();
                inStream.close();
                callback(readData.value);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            }
        };
    }
    return text;
});

define('text!view/search.html',[],function () { return '<form action="" class="clearfix">\r\n    <div class="select_box fl">\r\n        <div class="select_value" id="select_value" isarr="d" arr="d"> <b>单程</b><span class="icon"></span> </div>\r\n        <ul class="select_list hide" style="display: none;">\r\n            <li arr="d"><a href="javascript:;">单程</a>\r\n            </li>\r\n            <li arr="f"><a href="javascript:;">往返</a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <div class="fl search_cont1">\r\n        <dl class="fl">\r\n            <dt class="fl search_label ml40">出发</dt>\r\n            <dd class="por_box fl">\r\n                <input type="text" types="city" id="leaveText" class="nText1 city_text" value="<%=data.depCity%>" citycode="BJS" values="北京" citycodes="BJS" autocomplete="on">\r\n            </dd>\r\n        </dl>\r\n        <div class="change fl" id="btn_change"> <a href="javascript:;">换</a> </div>\r\n        <dl class="fl">\r\n            <dt class="fl search_label">到达</dt>\r\n            <dd class="por_box fl">\r\n                <input type="text" types="city" id="arriveText" class="nText1 city_text" value="<%=data.arrCity%>" citycode="SHH" values="上海" citycodes="SHH" autocomplete="on">\r\n            </dd>\r\n        </dl>\r\n        <div id="gome-dcBox" class="gome-dcBox fl">\r\n            <div class="fl gome-dpbox-l gome-dpbox" style="position: static;"> <span class="gdp-tit">出发日期</span>\r\n                <div class="gome-info"> <span class="dp-w"></span>\r\n                    <input type="text" readonly="readonly" id="g_d_cf" class="gome-set g-dc" placeholder="" value="<%=data.depData%>" values="2015-01-05"> </div>\r\n            </div>\r\n            <div class="fl dp-f"> <span class="gdp-tit">返程日期</span>\r\n                <div class="gome-info"> <span class="dp-w"></span>\r\n                    <input type="text" id="fc_click" readonly="readonly" class="set-f g-dc disabled" placeholder=""> </div>\r\n            </div>\r\n        </div>\r\n        <div id="gome-fcBox" class="gome-dcBox fl" style="display: none;">\r\n            <div class="fl gome-dpbox-l gome-dpbox" id="gome_cf" style="position: static;"> <span class="gdp-tit">出发日期</span>\r\n                <div class="gome-info"> <span class="dp-w"></span>\r\n                    <input type="text" readonly="readonly" id="g_cf" class="gome-set g-cf" placeholder="" value="2015-01-05" values="2015-01-05"> </div>\r\n            </div>\r\n            <div class="fl gome-dpbox" id="gome_fc" style="position: static;"> <span class="gdp-tit">返程日期</span>\r\n                <div class="gome-info"> <span class="dp-w"></span>\r\n                    <input type="text" readonly="readonly" id="g_fc" class="gome-set g-fc" placeholder="" value="" values=""> </div>\r\n            </div>\r\n        </div>\r\n        <a class="fl btn_search btn_search1" href="javascript:void(0)" title="重新搜索">重新搜索</a>\r\n        <a class="fl btn_search btn_search2" href="javascript:void(0)" title="重新搜索">重新搜索</a>\r\n    </div>\r\n</form>\r\n';});

define('renderSearch',["jQuery", "template", "getCookie", "text!./view/search.html"],
    function($, template, getCookie, searchHtml) {
        var render = template.compile(searchHtml);
        $("#search_box").html(render({
            data: getCookie
        }));

       // require(["controller/searchCtrl"]);
    })
;
define('text!view/lists.html',[],function () { return '<%var jixing = {S:"小型","M":"中型","L":"大型"}%>\r\n<%var c = {Y:"经济舱","C":"头等舱","F":"商务舱"}%>\r\n\t<div class="noresults_box" <%if(hb.length>0){%>style="display: none;"<%}else{%>style="display: block;"<%}%>>\r\n\t\t<div class="mesg" id="mesg"></div>\r\n\t\t<div class="clearfix error_box">\r\n\t\t\t<span class="fl error_icon"></span>\r\n\t\t\t<div class="fl error_word">\r\n\t\t\t\t<p>很抱歉，没有找到符合筛选条件的航班。</p>\r\n\t\t\t\t<p>您还可以：<a class="c_blue" id="c_blue" title="清空筛选条件" href="javascript:void(0);">清空筛选条件</a></p>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n<%for(var i=0;i<hb.length;i++){%>\r\n\t<%var hbRach = hb[i]%>\r\n\t\t<div class="search_result_content" hkgs = <%=hbRach.hkgs%> qfjc=<%=hbRach.qfjc%> >\r\n\t\t\t<table cellpadding="0" cellspacing="0" width="100%" class="result_table" qfjc= <%=hbRach.qfjc%> ddjc= <%=hbRach.ddjc%> flightNo="<%=hbRach.hbh%>" airline="<%=hbRach.hkgs%>">\r\n\t\t\t\t<thead>\r\n\t\t\t\t\t<th width="79" align="center">\r\n\t\t\t\t\t\t<div class="flight_logo pubFlights_<%=hbRach.hkgs%>"></div>\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th width="135" align="left">\r\n\t\t\t\t\t\t<div class="airline_name"><%=hkgszd[hbRach.hkgs]%> <%=hbRach.hbh%></div>\r\n\t\t\t\t\t\t<div class="model">\r\n\t\t\t\t\t\t\t机型：<span ><%=hbRach.jxdm%> <%=jixing[hbRach.jxdx]%></span> \r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th width="102" align="center">\r\n\t\t\t\t\t\t<div class="time"><%=hbRach.qfsj%></div>\r\n\t\t\t\t\t\t<div class="city"><%=qfjczd[hbRach.qfjc]%></div>\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th width="90" align="center">\r\n\t\t\t\t\t\t<div class="stopcity" <%if(hbRach.jtcs == 0){%>style="display: none;"<%}%>>\r\n\t\t\t\t\t\t\t<span class="help" rquestEd="0" data="<%=hbRach.hbh%>,<%=hbRach.qfjc%>,<%=hbRach.ddjc%>,<%=cfrq.split("T")[0]%> <%=hbRach.qfsj%>:00">经停</span>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<div class="arrow"></div>\r\n\t\t\t\t\t\t<%var xcls = hbRach.xcls.replace(/(\\\\d+)(h)/,function ($0,$1,$2){\r\n\t\t\t\t\t\t\treturn ($1<10 ? $1.slice(1,2) : $1 )+"小时"\r\n\t\t\t\t\t\t}).replace("m","分钟")%>\r\n\t\t\t\t\t\t<div class="stoptime"><%=xcls%></span> </div>\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th width="95" align="center">\r\n\t\t\t\t\t\t<div class="time"><%=hbRach.ddsj%>\r\n\t\t\t\t\t\t\t<i <%if(hbRach.ddsj.split(":")[0] > hbRach.qfsj.split(":")[0]){%>style="display: none;"<%}%> class="sub_icon secondTime" times = "<%=hbRach.ddsj.split(" ")[0].replace(/-/g,"/")%>|<%=hbRach.qfsj.split(" ")[0].replace(/-/g,"/")%>" >\r\n\t\t\t\t\t\t\t\t次日\r\n\t\t\t\t\t\t\t</i>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t<%var didian = ddjczd[hbRach.ddjc];%>\r\n\t\t\t\t\t\t<div class="city" title="<%=didian%>"> <%if(didian.length>6){%><%=didian.slice(0,6)%><%}else{%><%=didian%><%}%> </div>\r\n\t\t\t\t\t</th>\r\n\t\t\t\t\t<th width="130" align="center"><span class="startprice">¥ <%=hbRach.hbzdj%><i>起</i></span></th>\r\n\t\t\t\t\t<th width="80" align="center"><span class=ontime>准点率<i><%=hbRach.zdl%>%</i></span></th>\r\n\t\t\t\t\t<th width="85" align="center"><span class="meals"><%if(hbRach.cs){%>有<%}else{%>无<%}%>餐食</span></th>\r\n\t\t\t\t\t<th>机建+燃油 ¥<%=hbRach.jjf%> + ¥<%=hbRach.ryf%></th>\r\n\t\t\t\t</thead>\r\n\t\t\t</table>\r\n\t\t\t<table cellpadding="0" cellspacing="0" width="100%" class="result_table mt10">\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t<%for(var k=0,leng = hbRach.cwlb.length;k<leng;k++){%>\r\n\t\t\t\t\t\t<%var cwlbEach = hbRach.cwlb[k]%>\r\n\t\t\t\t\t\t<tr <%if(k>=3){%>style="display: none;"<%}%>>\r\n\t\t\t\t\t\t\t<td width="205" align="right">\r\n\t\t\t\t\t\t\t\t<div class="cabintype"><span style="display: none;" class="direction"><%if(k==0){%><!--高端经济舱--><%}%></span></div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td width="75" align="center"><%=c[cwlbEach.c]%></td>\r\n\t\t\t\t\t\t\t<td width="140" align="left"><%if(cwlbEach.zk<100){%><%=cwlbEach.zk/10%>折<%}%></td>\r\n\t\t\t\t\t\t\t<td width="68" align="center">\r\n\t\t\t\t\t\t\t\t<div class="change" data={beginAirPort:"<%=hbRach.qfjc%>",endAirPort:"<%=hbRach.ddjc%>",depDate:"<%=cfrq.split("T")[0]%>",cabin:"<%=cwlbEach.c%>",flightNo:"<%=hbRach.hbh%>",specialPolicyId:"<%=cwlbEach.gys%>"}>\r\n\t\t\t\t\t\t\t\t\t<span class="c_blue help">退改签说明</span>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td width="55" align="center">\r\n\t\t\t\t\t\t\t\t<%if(cwlbEach.yh){%>\r\n\t\t\t\t\t\t\t\t\t<%for(var ki=0;ki<cwlbEach.yh.length;ki++){%>\r\n\t\t\t\t\t\t\t\t\t\t<%if(cwlbEach.yh[ki].l == 1){%>\r\n\t\t\t\t\t\t\t\t\t\t\t<span class="original_price">¥ <%=cwlbEach.crj%></span>\r\n\t\t\t\t\t\t\t\t\t\t<%}%>\r\n\t\t\t\t\t\t\t\t\t<%}%>\r\n\t\t\t\t\t\t\t\t<%}%>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td width="90" align="left"><span class="startprice1">¥ <%=cwlbEach.adFareGome%><i class="sub_icon" style="display: none;">特价</i></span></td>\r\n\t\t\t\t\t\t\t\t<td width="160">\r\n\t\t\t\t\t\t\t\t\t<%if(cwlbEach.yh){%>\r\n\t\t\t\t\t\t\t\t\t\t<%for(var ik=0;ik<cwlbEach.yh.length;ik++){%>\r\n\t\t\t\t\t\t\t\t\t\t\t<%var yh = cwlbEach.yh[ik];%>\r\n\t\t\t\t\t\t\t\t\t\t\t<%if(yh.l == 1){%>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="block_green" title="已降 ¥<%=yh.z%>">降 ¥<%=yh.z%></span>\r\n\t\t\t\t\t\t\t\t\t\t\t<%}else if(yh.l == 2){%>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="block_orange" title="返 ¥<%=yh.z%>">返 ¥<%=yh.z%></span>\r\n\t\t\t\t\t\t\t\t\t\t\t<%}else{%>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<span class="block_blue" title="送保险">送保险</span>\r\n\t\t\t\t\t\t\t\t\t\t\t<%}%>\r\n\t\t\t\t\t\t\t\t\t\t<%}%>\r\n\t\t\t\t\t\t\t\t\t<%}%>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td width="80" align="left">\r\n\t\t\t\t\t\t\t\t<a href="javascript:void(0);" cabin="<%=cwlbEach.c%>" subCabin="<%=cwlbEach.zc%>" crj="<%=cwlbEach.crj%>" gys="<%=cwlbEach.gys%>" class="btn_book"><%if(cheng){%><%=cheng%><%}else{%>预订<%}%></a>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td align="center"><span class="c_red"><span><%if(cwlbEach.sy<5){%>仅剩<%=cwlbEach.sy%>张<%}else{%> &nbsp;&nbsp; <%}%></span></td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t<%}%>\r\n\t\t\t\t</tbody>\r\n\t\t\t</table>\r\n\t\t\t<div class="additional_info">\r\n\t\t\t\t<span style="display: none;" >最高返券30元</span>\r\n\t\t\t\t<%if(hbRach.cwlb.length>3){%><span class="btn_allprice">所有价格<i></i></span><%}%>\r\n\t\t\t</div>\r\n\t\t</div>\r\n<%}%>\'';});

define('lists',["jQuery", "template", "text!./view/lists.html"], function($, template, listsHtml) {
	    var listRender = template.compile(listsHtml);
	    function renderList(data) {
	        $("#lists").html(listRender(data));
	    };

	    return {
	        renderList: renderList
	    };
});

define('data',[],function (){
    var str = {
  "isSuccess": "Y",
  "failReason": "",
  "data": {
    "cfcs": "WUH",
    "ddcs": "SHH",
    "cfrq": "2015-01-06T00:00:00",
    "hkgszd": {
      "CZ": "南方航空",
      "MU": "东方航空",
      "FM": "上海航空"
    },
    "qfjczd": {
      "WUH": "武汉天河机场"
    },
    "ddjczd": {
      "SHA": "上海虹桥机场",
      "PVG": "上海浦东机场"
    },
    "hb": [
      {
        "hkgs": "CZ",
        "hbh": "CZ6197",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "11:10",
        "ddjc": "PVG",
        "ddhzl": "T2",
        "ddsj": "12:30",
        "xcls": "01h20m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 90,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 290.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "23243010",
            "c": "Y",
            "zc": "T",
            "sy": 6,
            "zk": 24,
            "zkkz": 24,
            "crj": 290.0,
            "adFareGome": 290.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Z",
            "sy": 10,
            "zk": 40,
            "zkkz": 40,
            "crj": 430.0,
            "adFareGome": 430.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 50,
            "zkkz": 50,
            "crj": 600.0,
            "adFareGome": 600.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "U",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "W",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "D",
            "sy": 6,
            "zk": 160,
            "zkkz": 73,
            "crj": 1730.0,
            "adFareGome": 1730.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "C",
            "sy": 7,
            "zk": 200,
            "zkkz": 100,
            "crj": 2380.0,
            "adFareGome": 2380.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "J",
            "sy": 8,
            "zk": 250,
            "zkkz": 125,
            "crj": 2980.0,
            "adFareGome": 2980.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1490.0,
            "yej": 300.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "CZ",
        "hbh": "CZ3823",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "08:10",
        "ddjc": "PVG",
        "ddhzl": "T2",
        "ddsj": "09:40",
        "xcls": "01h30m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 96,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 430.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Z",
            "sy": 10,
            "zk": 40,
            "zkkz": 40,
            "crj": 430.0,
            "adFareGome": 430.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "V",
            "sy": 10,
            "zk": 45,
            "zkkz": 45,
            "crj": 540.0,
            "adFareGome": 540.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 50,
            "zkkz": 50,
            "crj": 600.0,
            "adFareGome": 600.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "U",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "W",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "D",
            "sy": 6,
            "zk": 160,
            "zkkz": 73,
            "crj": 1730.0,
            "adFareGome": 1730.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "C",
            "sy": 7,
            "zk": 200,
            "zkkz": 100,
            "crj": 2380.0,
            "adFareGome": 2380.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "J",
            "sy": 8,
            "zk": 250,
            "zkkz": 125,
            "crj": 2980.0,
            "adFareGome": 2980.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1490.0,
            "yej": 300.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU517",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "07:45",
        "ddjc": "PVG",
        "ddhzl": "T1",
        "ddsj": "09:15",
        "xcls": "01h30m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 100,
        "jxdm": "73C",
        "jxdx": "",
        "jtcs": 0,
        "hbzdj": 710.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "R",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "N",
            "sy": 10,
            "zk": 65,
            "zkkz": 65,
            "crj": 770.0,
            "adFareGome": 770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "K",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 85,
            "zkkz": 85,
            "crj": 1010.0,
            "adFareGome": 1010.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "J",
            "sy": 8,
            "zk": 190,
            "zkkz": 0,
            "crj": 2260.0,
            "adFareGome": 2260.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1130.0,
            "yej": 230.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2543",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "13:40",
        "ddjc": "PVG",
        "ddhzl": "T1",
        "ddsj": "14:45",
        "xcls": "01h05m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 73,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 710.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "R",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "N",
            "sy": 10,
            "zk": 65,
            "zkkz": 65,
            "crj": 770.0,
            "adFareGome": 770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "K",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 85,
            "zkkz": 85,
            "crj": 1010.0,
            "adFareGome": 1010.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "J",
            "sy": 8,
            "zk": 190,
            "zkkz": 0,
            "crj": 2260.0,
            "adFareGome": 2260.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1130.0,
            "yej": 230.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "CZ",
        "hbh": "CZ3579",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "14:20",
        "ddjc": "PVG",
        "ddhzl": "T2",
        "ddsj": "15:45",
        "xcls": "01h25m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 96,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 710.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "U",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "W",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "D",
            "sy": 1,
            "zk": 160,
            "zkkz": 73,
            "crj": 1730.0,
            "adFareGome": 1730.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "C",
            "sy": 3,
            "zk": 200,
            "zkkz": 100,
            "crj": 2380.0,
            "adFareGome": 2380.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "J",
            "sy": 4,
            "zk": 250,
            "zkkz": 125,
            "crj": 2980.0,
            "adFareGome": 2980.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1490.0,
            "yej": 300.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2691",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "14:50",
        "ddjc": "PVG",
        "ddhzl": "T1",
        "ddsj": "16:15",
        "xcls": "01h25m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 75,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 710.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "R",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "N",
            "sy": 10,
            "zk": 65,
            "zkkz": 65,
            "crj": 770.0,
            "adFareGome": 770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "K",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 85,
            "zkkz": 85,
            "crj": 1010.0,
            "adFareGome": 1010.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "J",
            "sy": 4,
            "zk": 190,
            "zkkz": 0,
            "crj": 2260.0,
            "adFareGome": 2260.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1130.0,
            "yej": 230.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2509",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "15:15",
        "ddjc": "PVG",
        "ddhzl": "T1",
        "ddsj": "17:10",
        "xcls": "01h55m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 96,
        "jxdm": "319",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 710.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "R",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "N",
            "sy": 10,
            "zk": 65,
            "zkkz": 65,
            "crj": 770.0,
            "adFareGome": 770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "K",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 85,
            "zkkz": 85,
            "crj": 1010.0,
            "adFareGome": 1010.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 8,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2513",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "17:25",
        "ddjc": "PVG",
        "ddhzl": "T1",
        "ddsj": "19:05",
        "xcls": "01h40m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 65,
        "jxdm": "320",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 710.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "R",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "N",
            "sy": 10,
            "zk": 65,
            "zkkz": 65,
            "crj": 770.0,
            "adFareGome": 770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "K",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 85,
            "zkkz": 85,
            "crj": 1010.0,
            "adFareGome": 1010.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "19299985",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "19612689",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "20838950",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "21480599",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286287",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 181,
            "zkkz": 56,
            "crj": 2150.0,
            "adFareGome": 2150.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22772265",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 181,
            "zkkz": 56,
            "crj": 2150.0,
            "adFareGome": 2150.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 7,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "CZ",
        "hbh": "CZ3543",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "18:55",
        "ddjc": "PVG",
        "ddhzl": "T2",
        "ddsj": "20:25",
        "xcls": "01h30m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 76,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 710.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "L",
            "sy": 10,
            "zk": 60,
            "zkkz": 60,
            "crj": 710.0,
            "adFareGome": 710.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "U",
            "sy": 10,
            "zk": 70,
            "zkkz": 70,
            "crj": 830.0,
            "adFareGome": 830.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 75,
            "zkkz": 75,
            "crj": 890.0,
            "adFareGome": 890.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "W",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "D",
            "sy": 6,
            "zk": 160,
            "zkkz": 73,
            "crj": 1730.0,
            "adFareGome": 1730.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "C",
            "sy": 7,
            "zk": 200,
            "zkkz": 100,
            "crj": 2380.0,
            "adFareGome": 2380.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1190.0,
            "yej": 240.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "C",
            "zc": "J",
            "sy": 8,
            "zk": 250,
            "zkkz": 125,
            "crj": 2980.0,
            "adFareGome": 2980.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1490.0,
            "yej": 300.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "FM",
        "hbh": "FM9364",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "22:00",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "23:25",
        "xcls": "01h25m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 56,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 950.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "H",
            "sy": 10,
            "zk": 80,
            "zkkz": 80,
            "crj": 950.0,
            "adFareGome": 950.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "E",
            "sy": 10,
            "zk": 85,
            "zkkz": 85,
            "crj": 1010.0,
            "adFareGome": 1010.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286811",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23489366",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "18066061",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "18968289",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "19613921",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "20840220",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "21481877",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22773549",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 136,
            "zkkz": 43,
            "crj": 1620.0,
            "adFareGome": 1620.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "17860119",
            "c": "F",
            "zc": "P",
            "sy": 4,
            "zk": 204,
            "zkkz": 64,
            "crj": 2430.0,
            "adFareGome": 2430.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 8,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2501",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "08:30",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "10:00",
        "xcls": "01h30m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 92,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 1070.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286288",
            "c": "F",
            "zc": "P",
            "sy": 2,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22772266",
            "c": "F",
            "zc": "P",
            "sy": 2,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 8,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2505",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "11:00",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "12:25",
        "xcls": "01h25m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 84,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 1070.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286288",
            "c": "F",
            "zc": "P",
            "sy": 2,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22772266",
            "c": "F",
            "zc": "P",
            "sy": 2,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 8,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2515",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "18:30",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "20:10",
        "xcls": "01h40m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 69,
        "jxdm": "733",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 1070.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 8,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2470",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "19:50",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "21:15",
        "xcls": "01h25m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 96,
        "jxdm": "733",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 1070.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "M",
            "sy": 10,
            "zk": 90,
            "zkkz": 90,
            "crj": 1070.0,
            "adFareGome": 1070.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286288",
            "c": "F",
            "zc": "P",
            "sy": 2,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22772266",
            "c": "F",
            "zc": "P",
            "sy": 2,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 8,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2503",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "10:25",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "11:55",
        "xcls": "01h30m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 95,
        "jxdm": "323",
        "jxdx": "m",
        "jtcs": 0,
        "hbzdj": 1180.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286288",
            "c": "F",
            "zc": "P",
            "sy": 3,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22772266",
            "c": "F",
            "zc": "P",
            "sy": 3,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 10,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2507",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "12:30",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "14:05",
        "xcls": "01h35m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 89,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 1180.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286288",
            "c": "F",
            "zc": "P",
            "sy": 1,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22772266",
            "c": "F",
            "zc": "P",
            "sy": 1,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 7,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "FM",
        "hbh": "FM9564",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "15:50",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "17:20",
        "xcls": "01h30m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": false,
        "zdl": 20,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 1180.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 8,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      },
      {
        "hkgs": "MU",
        "hbh": "MU2511",
        "gx": false,
        "qfjc": "WUH",
        "qfhzl": "T2",
        "qfsj": "16:25",
        "ddjc": "SHA",
        "ddhzl": "T2",
        "ddsj": "17:50",
        "xcls": "01h25m",
        "jjf": 50,
        "ryf": 30,
        "jcyj": 1190,
        "cs": true,
        "zdl": 89,
        "jxdm": "738",
        "jxdx": "M",
        "jtcs": 0,
        "hbzdj": 1180.0,
        "cwlb": [
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "B",
            "sy": 10,
            "zk": 99,
            "zkkz": 99,
            "crj": 1180.0,
            "adFareGome": 1180.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "Y",
            "zc": "Y",
            "sy": 10,
            "zk": 100,
            "zkkz": 100,
            "crj": 1190.0,
            "adFareGome": 1190.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 600.0,
            "yej": 120.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "23286288",
            "c": "F",
            "zc": "P",
            "sy": 1,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "22772266",
            "c": "F",
            "zc": "P",
            "sy": 1,
            "zk": 317,
            "zkkz": 99,
            "crj": 3770.0,
            "adFareGome": 3770.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          },
          {
            "gys": "80006715",
            "gyh": "-1",
            "c": "F",
            "zc": "F",
            "sy": 6,
            "zk": 320,
            "zkkz": 100,
            "crj": 3810.0,
            "adFareGome": 3810.0,
            "adGomeCode": "",
            "chFareGome": 0.0,
            "etj": 1910.0,
            "yej": 380.0,
            "yh": [
              
            ]
          }
        ]
      }
    ]
  }
}

return {
    data:str
}    
});
define('httpServer',["jQuery","data"],function ($,data){

	var datas = data.data;

	//模拟的数据
	var arr = [
        ["a", "b", "c"],
        [1, "a", "b"],
        ["wang", "haozi", "lala"],
        ["123", "4444444", "555555555"],
        ["6666", "888", "999"]
    ];

	var httpServer = function (){
			
	};

	httpServer.prototype.listServer = function (data,callBack){
		 setTimeout(function() {
            if(callBack) callBack(datas);
        }, 1000);
	};


	return {
		httpServer: new httpServer()
	}


});
require.config({
    baseUrl: "./js/lib",
    paths: {
        "jQuery": "jquery-1.7.1",
        "jquery.cookie": "jquery.cookie",
        "domReady": "domReady",
        "text": "text",
        "template": "template",

        "getCookie": "../getCookie",
        "renderSearch": "../renderSearch",

        "lists": "../lists",

        "httpServer":"../tools/httpServer"
    },
    shim: {
        "jQuery": {
            "exports": "$"
        },
        "jquery.cookie": {
            "deps": ["jQuery"],
            "exports": "$.cookie"
        }

    }
});


require(["domReady!", "jQuery", "renderSearch", "lists","httpServer"],
    function(dom, jQuery, renderSearch, lists,httpServer) {
        
       httpServer.httpServer.listServer([],function (respones){
            lists.renderList(respones.data);
            $("#loading").hide();
       });


    });
define("config", function(){});
