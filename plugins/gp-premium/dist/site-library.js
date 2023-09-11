!function(){var e={703:function(e,t,n){"use strict";var r=n(414);function i(){}function s(){}s.resetWarningCache=i,e.exports=function(){function e(e,t,n,i,s,a){if(a!==r){var o=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw o.name="Invariant Violation",o}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:s,resetWarningCache:i};return n.PropTypes=n,n}},697:function(e,t,n){e.exports=n(703)()},414:function(e){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},216:function(e,t,n){"use strict";t.be=void 0;var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(196),s=c(i),a=c(n(697)),o=n(81),l=c(n(315)),p=c(n(282)),u=c(n(821));function c(e){return e&&e.__esModule?e:{default:e}}var m="data-lazyload-listened",g=[],h=[],d=!1;try{var f=Object.defineProperty({},"passive",{get:function(){d=!0}});window.addEventListener("test",null,f)}catch(e){}var b=!!d&&{capture:!1,passive:!0},v=function(e){var t=e.ref;if(t instanceof HTMLElement){var n=(0,l.default)(t),r=e.props.overflow&&n!==t.ownerDocument&&n!==document&&n!==document.documentElement?function(e,t){var n=e.ref,r=void 0,i=void 0,s=void 0,a=void 0;try{var o=t.getBoundingClientRect();r=o.top,i=o.left,s=o.height,a=o.width}catch(e){r=0,i=0,s=0,a=0}var l=window.innerHeight||document.documentElement.clientHeight,p=window.innerWidth||document.documentElement.clientWidth,u=Math.max(r,0),c=Math.max(i,0),m=Math.min(l,r+s)-u,g=Math.min(p,i+a)-c,h=void 0,d=void 0,f=void 0,b=void 0;try{var v=n.getBoundingClientRect();h=v.top,d=v.left,f=v.height,b=v.width}catch(e){h=0,d=0,f=0,b=0}var y=h-u,_=d-c,E=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return y-E[0]<=m&&y+f+E[1]>=0&&_-E[0]<=g&&_+b+E[1]>=0}(e,n):function(e){var t=e.ref;if(!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))return!1;var n=void 0,r=void 0;try{var i=t.getBoundingClientRect();n=i.top,r=i.height}catch(e){n=0,r=0}var s=window.innerHeight||document.documentElement.clientHeight,a=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return n-a[0]<=s&&n+r+a[1]>=0}(e);r?e.visible||(e.props.once&&h.push(e),e.visible=!0,e.forceUpdate()):e.props.once&&e.visible||(e.visible=!1,e.props.unmountIfInvisible&&e.forceUpdate())}},y=function(){for(var e=0;e<g.length;++e){var t=g[e];v(t)}h.forEach((function(e){var t=g.indexOf(e);-1!==t&&g.splice(t,1)})),h=[]},_=void 0,E=null,w=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.visible=!1,n.setRef=n.setRef.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),r(t,[{key:"componentDidMount",value:function(){var e=window,t=this.props.scrollContainer;t&&"string"==typeof t&&(e=e.document.querySelector(t));var n=void 0!==this.props.debounce&&"throttle"===_||"debounce"===_&&void 0===this.props.debounce;if(n&&((0,o.off)(e,"scroll",E,b),(0,o.off)(window,"resize",E,b),E=null),E||(void 0!==this.props.debounce?(E=(0,p.default)(y,"number"==typeof this.props.debounce?this.props.debounce:300),_="debounce"):void 0!==this.props.throttle?(E=(0,u.default)(y,"number"==typeof this.props.throttle?this.props.throttle:300),_="throttle"):E=y),this.props.overflow){var r=(0,l.default)(this.ref);if(r&&"function"==typeof r.getAttribute){var i=+r.getAttribute(m)+1;1===i&&r.addEventListener("scroll",E,b),r.setAttribute(m,i)}}else if(0===g.length||n){var s=this.props,a=s.scroll,c=s.resize;a&&(0,o.on)(e,"scroll",E,b),c&&(0,o.on)(window,"resize",E,b)}g.push(this),v(this)}},{key:"shouldComponentUpdate",value:function(){return this.visible}},{key:"componentWillUnmount",value:function(){if(this.props.overflow){var e=(0,l.default)(this.ref);if(e&&"function"==typeof e.getAttribute){var t=+e.getAttribute(m)-1;0===t?(e.removeEventListener("scroll",E,b),e.removeAttribute(m)):e.setAttribute(m,t)}}var n=g.indexOf(this);-1!==n&&g.splice(n,1),0===g.length&&"undefined"!=typeof window&&((0,o.off)(window,"resize",E,b),(0,o.off)(window,"scroll",E,b))}},{key:"setRef",value:function(e){e&&(this.ref=e)}},{key:"render",value:function(){var e=this.props,t=e.height,n=e.children,r=e.placeholder,i=e.className,a=e.classNamePrefix,o=e.style;return s.default.createElement("div",{className:a+"-wrapper "+i,ref:this.setRef,style:o},this.visible?n:r||s.default.createElement("div",{style:{height:t},className:a+"-placeholder"}))}}]),t}(i.Component);w.propTypes={className:a.default.string,classNamePrefix:a.default.string,once:a.default.bool,height:a.default.oneOfType([a.default.number,a.default.string]),offset:a.default.oneOfType([a.default.number,a.default.arrayOf(a.default.number)]),overflow:a.default.bool,resize:a.default.bool,scroll:a.default.bool,children:a.default.node,throttle:a.default.oneOfType([a.default.number,a.default.bool]),debounce:a.default.oneOfType([a.default.number,a.default.bool]),placeholder:a.default.node,scrollContainer:a.default.oneOfType([a.default.string,a.default.object]),unmountIfInvisible:a.default.bool,style:a.default.object},w.defaultProps={className:"",classNamePrefix:"lazyload",once:!1,offset:0,overflow:!1,resize:!1,scroll:!0,unmountIfInvisible:!1},t.ZP=w,t.be=y},282:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var r=void 0,i=void 0,s=void 0,a=void 0,o=void 0,l=function l(){var p=+new Date-a;p<t&&p>=0?r=setTimeout(l,t-p):(r=null,n||(o=e.apply(s,i),r||(s=null,i=null)))};return function(){s=this,i=arguments,a=+new Date;var p=n&&!r;return r||(r=setTimeout(l,t)),p&&(o=e.apply(s,i),s=null,i=null),o}}},81:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.on=function(e,t,n,r){r=r||!1,e.addEventListener?e.addEventListener(t,n,r):e.attachEvent&&e.attachEvent("on"+t,(function(t){n.call(e,t||window.event)}))},t.off=function(e,t,n,r){r=r||!1,e.removeEventListener?e.removeEventListener(t,n,r):e.detachEvent&&e.detachEvent("on"+t,n)}},315:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(!(e instanceof HTMLElement))return document.documentElement;for(var t="absolute"===e.style.position,n=/(scroll|auto)/,r=e;r;){if(!r.parentNode)return e.ownerDocument||document.documentElement;var i=window.getComputedStyle(r),s=i.position,a=i.overflow,o=i["overflow-x"],l=i["overflow-y"];if("static"===s&&t)r=r.parentNode;else{if(n.test(a)&&n.test(o)&&n.test(l))return r;r=r.parentNode}}return e.ownerDocument||e.documentElement||document.documentElement}},821:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n){var r,i;return t||(t=250),function(){var s=n||this,a=+new Date,o=arguments;r&&a<r+t?(clearTimeout(i),i=setTimeout((function(){r=a,e.apply(s,o)}),t)):(r=a,e.apply(s,o))}}},196:function(e){"use strict";e.exports=window.React}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";function e(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function t(t,n){return function(e){if(Array.isArray(e))return e}(t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,_x,s,a=[],_n=!0,o=!1;try{if(_x=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;_n=!1}else for(;!(_n=(r=_x.call(n)).done)&&(a.push(r.value),a.length!==t);_n=!0);}catch(e){o=!0,i=e}finally{try{if(!_n&&null!=n.return&&(s=n.return(),Object(s)!==s))return}finally{if(o)throw i}}return a}}(t,n)||function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,(s=i.key,a=void 0,a=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var i=n.call(e,"string");if("object"!==r(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(s),"symbol"===r(a)?a:String(a)),i)}var s,a}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function a(e,t){return a=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},a(e,t)}function o(e){return o=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},o(e)}var l=window.wp.element,p=n(216);function u(e,t,n){var r=n&&n.lexicographical,i=n&&n.zeroExtend,s=e.split("."),a=t.split(".");function o(e){return(r?/^\d+[A-Za-z]*$/:/^\d+$/).test(e)}if(!s.every(o)||!a.every(o))return NaN;if(i){for(;s.length<a.length;)s.push("0");for(;a.length<s.length;)a.push("0")}r||(s=s.map(Number),a=a.map(Number));for(var l=0;l<s.length;++l){if(a.length===l)return 1;if(s[l]!==a[l])return s[l]>a[l]?1:-1}return s.length!==a.length?-1:0}var c=window.wp.i18n,m=window.wp.components,g=window.wp.htmlEntities,h=window.wp.apiFetch,d=n.n(h);var f=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&a(e,t)}(y,e);var n,h,f,b,v=(f=y,b=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=o(f);if(b){var n=o(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return function(e,t){if(t&&("object"===r(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return s(e)}(this,e)});function y(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,y),(e=v.apply(this,arguments)).state={allSites:{},isAPIWorking:!1,siteOpened:!1,siteData:{},siteSlug:"",sitePlugins:{},hasData:{},hasWidgets:!1,importOptions:!0,importContent:!0,confirmImport:!1,importComplete:!1,installablePlugins:[],activePlugins:[],manualPlugins:[],refreshingSites:!1,hasBackup:gppSiteLibrary.hasBackup,pageBuilder:"No Page Builder",category:"",device:"desktop"},e.importThemeOptions=e.importThemeOptions.bind(s(e)),e.installPlugins=e.installPlugins.bind(s(e)),e.activatePlugins=e.activatePlugins.bind(s(e)),e.importContent=e.importContent.bind(s(e)),e.importSiteOptions=e.importSiteOptions.bind(s(e)),e.importWidgets=e.importWidgets.bind(s(e)),e}return n=y,(h=[{key:"componentDidMount",value:function(){var e=this;d()({path:"/generatepress-site-library/v1/get_sites",method:"POST",data:{forceRefresh:!1}}).then((function(t){e.setState({isAPILoaded:!0,allSites:t.response})}))}},{key:"importThemeOptions",value:function(e){var t=this,n=e.target.nextElementSibling;n.classList.add("gpp-library-action-message--show"),n.textContent=(0,c.__)("Importing theme options","gp-premium"),d()({path:"/generatepress-site-library/v1/import_theme_options",method:"POST",data:{siteData:this.state.siteData,siteSlug:this.state.siteData.name.replace(/\s+/g,"_").toLowerCase(),importOptions:this.state.importOptions,importContent:this.state.importContent}}).then((function(e){n.textContent=e.response,e.success&&e.response||n.classList.add("gblocks-action-message--error"),setTimeout((function(){t.state.importContent?Object.keys(t.state.hasData.plugin_data).length>0?t.installPlugins(n):t.importContent(n):(n.textContent=(0,c.__)("Import Complete","gp-premium"),t.setState({isAPIWorking:!1,importComplete:!0,hasBackup:!0}))}),2e3)}))}},{key:"installPlugins",value:function(e){var n=this;void 0!==e.target&&(e=e.target.nextElementSibling),e.classList.add("gpp-library-action-message--show"),e.textContent=(0,c.__)("Installing plugins","gp-premium"),Object.entries(this.state.hasData.plugin_data).forEach((function(r){var i=t(r,2),s=i[0],a=i[1],o=a.slug.split("/")[0],l=a.name;a.installed?(delete n.state.hasData.plugin_data[s],0===Object.keys(n.state.hasData.plugin_data).length&&n.activatePlugins(e)):("bb-plugin"===o&&(o="beaver-builder-lite-version",l="Beaver Builder Lite"),e.textContent=(0,c.sprintf)(/* translators: Installing "Plugin Name" */
(0,c.__)("Installing %s","gp-premium"),l),wp.updates.installPlugin({slug:o,success:function(t){console.log(t),delete n.state.hasData.plugin_data[s],0===Object.keys(n.state.hasData.plugin_data).length&&n.activatePlugins(e)},error:function(t){console.log(t),delete n.state.hasData.plugin_data[s],0===Object.keys(n.state.hasData.plugin_data).length&&n.activatePlugins(e)}}))}))}},{key:"activatePlugins",value:function(e){var t=this;e.classList.add("gpp-library-action-message--show"),e.textContent=(0,c.__)("Activating plugins","gp-premium"),d()({path:"/generatepress-site-library/v1/activate_plugins",method:"POST",data:{siteData:this.state.siteData,siteSlug:this.state.siteData.name.replace(/\s+/g,"_").toLowerCase(),importOptions:this.state.importOptions,importContent:this.state.importContent}}).then((function(n){e.textContent=n.response,n.success&&n.response||e.classList.add("gblocks-action-message--error"),setTimeout((function(){t.importContent(e)}),2e3)}))}},{key:"importContent",value:function(e){var t=this;e.classList.add("gpp-library-action-message--show"),e.textContent=(0,c.__)("Importing content","gp-premium"),d()({path:"/generatepress-site-library/v1/import_content",method:"POST",data:{siteData:this.state.siteData,siteSlug:this.state.siteData.name.replace(/\s+/g,"_").toLowerCase(),importOptions:this.state.importOptions,importContent:this.state.importContent}}).then((function(n){e.textContent=n.response,n.success&&n.response||e.classList.add("gblocks-action-message--error"),setTimeout((function(){t.importSiteOptions(e)}),2e3)}))}},{key:"importSiteOptions",value:function(e){var t=this;e.classList.add("gpp-library-action-message--show"),e.textContent=(0,c.__)("Importing site options","gp-premium"),d()({path:"/generatepress-site-library/v1/import_site_options",method:"POST",data:{siteData:this.state.siteData,siteSlug:this.state.siteData.name.replace(/\s+/g,"_").toLowerCase(),importOptions:this.state.importOptions,importContent:this.state.importContent}}).then((function(n){e.textContent=n.response,n.success&&n.response||e.classList.add("gblocks-action-message--error"),setTimeout((function(){t.state.hasWidgets?t.importWidgets(e):(e.textContent=(0,c.__)("Import Complete","gp-premium"),t.setState({isAPIWorking:!1,importComplete:!0,hasBackup:!0}))}),2e3)}))}},{key:"importWidgets",value:function(e){var t=this;e.classList.add("gpp-library-action-message--show"),e.textContent=(0,c.__)("Importing widgets","gp-premium"),d()({path:"/generatepress-site-library/v1/import_widgets",method:"POST",data:{siteData:this.state.siteData,siteSlug:this.state.siteData.name.replace(/\s+/g,"_").toLowerCase(),importOptions:this.state.importOptions,importContent:this.state.importContent}}).then((function(n){e.textContent=n.response,n.success&&n.response||e.classList.add("gblocks-action-message--error"),setTimeout((function(){e.textContent=(0,c.__)("Import Complete","gp-premium"),t.setState({isAPIWorking:!1,importComplete:!0,hasBackup:!0})}),2e3)}))}},{key:"restoreBackup",value:function(e){var t=this,n=e.target.nextElementSibling;n.classList.add("gpp-library-action-message--show"),n.textContent=(0,c.__)("Restoring theme options","gp-premium"),d()({path:"/generatepress-site-library/v1/restore_theme_options",method:"POST"}).then((function(e){n.textContent=e.response,e.success&&e.response||n.classList.add("gblocks-action-message--error"),setTimeout((function(){n.textContent=(0,c.__)("Restoring content","gp-premium"),d()({path:"/generatepress-site-library/v1/restore_content",method:"POST"}).then((function(e){n.textContent=e.response,e.success&&e.response||n.classList.add("gblocks-action-message--error"),t.setState({isAPIWorking:!1,hasBackup:!1})}))}),2e3)}))}},{key:"render",value:function(){var e=this;if(!this.state.isAPILoaded)return(0,l.createElement)(m.Placeholder,{className:"gpp-library-placeholder"},(0,l.createElement)(m.Spinner,null));var n=this.state.allSites;if(!n||"no results"===n)return(0,l.createElement)("div",{className:"generatepress-site-library-no-results"},(0,l.createElement)("p",null,(0,c.__)("No sites were found.","gp-premium")," ",(0,l.createElement)("a",{href:"https://docs.generatepress.com/article/site-library-unavailable/",target:"_blank",rel:"noreferrer noopener"},(0,c.__)("Why?","gp-premium"))),(0,l.createElement)(m.Button,{isPrimary:!0,onClick:function(){e.setState({refreshingSites:!0}),d()({path:"/generatepress-site-library/v1/get_sites",method:"POST",data:{forceRefresh:!0}}).then((function(t){e.setState({isAPILoaded:!0,allSites:t.response,refreshingSites:!1})}))}},this.state.refreshingSites&&(0,l.createElement)(m.Spinner,null),!this.state.refreshingSites&&(0,c.__)("Try again","gp-premium")));var r=[{label:(0,c.__)("None","gp-premium"),value:""}],i=[];n&&Object.keys(n).forEach((function(e){n[e].page_builder.forEach((function(e){if(!i.includes(e)){if("No Page Builder"===e)return;r.push({label:e,value:e}),i.push(e)}}))}));var s=[{label:(0,c.__)("All","gp-premium"),value:""}],a=[];n&&Object.keys(n).forEach((function(e){n[e].category.forEach((function(e){a.includes(e)||(s.push({label:e,value:e}),a.push(e))}))}));var o="";"tablet"===this.state.device&&(o="768px"),"mobile"===this.state.device&&(o="480px");var h=this.state.siteData.author_name&&this.state.siteData.author_url&&"GeneratePress"!==this.state.siteData.author_name;return(0,l.createElement)(l.Fragment,null,(0,l.createElement)("div",{className:"generatepress-site-library"},!!this.state.hasBackup&&(0,l.createElement)("div",{className:"generatepress-site-library-restore"},(0,l.createElement)("h2",null,(0,c.__)("Existing Site Import Detected","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("It is highly recommended that you remove the last site you imported before importing a new one.","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("This process restores your previous options, widgets and active plugins. It will also remove your imported content and CSS.","gp-premium")),(0,l.createElement)("div",{className:"gpp-library-action-button"},(0,l.createElement)(m.Button,{isPrimary:!0,onClick:function(t){window.confirm((0,c.__)("This process makes changes to your website. If it contains important data, we suggest backing it up before proceeding.","gp-premium"))&&(e.setState({isAPIWorking:!0}),e.restoreBackup(t))}},this.state.isAPIWorking&&(0,l.createElement)(m.Spinner,null),!this.state.isAPIWorking&&(0,c.__)("Remove imported site","gp-premium")),(0,l.createElement)("span",{className:"gpp-library-action-message"}),!this.state.isAPIWorking&&(0,l.createElement)(m.Button,{onClick:function(){e.setState({hasBackup:!1})}},(0,c.__)("No thanks","gp-premium")))),!this.state.siteOpened&&!this.state.hasBackup&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("div",{className:"generatepress-site-library-filter"},"No Page Builder"===this.state.pageBuilder&&(0,l.createElement)(m.SelectControl,{label:(0,c.__)("Category","gp-premium"),options:s,value:this.state.category,onChange:function(t){e.setState({category:t,pageBuilder:"No Page Builder"}),setTimeout((function(){(0,p.be)()}),100)}}),""===this.state.category&&(0,l.createElement)(m.SelectControl,{label:(0,c.__)("Page Builder","gp-premium"),options:r,value:this.state.pageBuilder,onChange:function(t){""===t&&(t="No Page Builder"),e.setState({pageBuilder:t,category:""}),setTimeout((function(){(0,p.be)()}),100)}})),(0,l.createElement)("ul",{className:"generatepress-site-library-list"},Object.keys(n).map((function(t){if(!n[t].page_builder.includes(e.state.pageBuilder))return null;if(""!==e.state.category&&!n[t].category.includes(e.state.category))return null;var r=n[t].directory+"/screenshot.png",i=n[t].name,s=(0,g.decodeEntities)(i),a=gppSiteLibrary.gppVersion.split("-")[0],o=n[t].min_version.split("-")[0],m=gppSiteLibrary.gpVersion.split("-")[0],h=gppSiteLibrary.generateblocksVersion.split("-")[0],d=n[t].min_theme_version?n[t].min_theme_version.split("-")[0]:m,f=n[t].min_generateblocks_version?n[t].min_generateblocks_version.split("-")[0]:h,b=n[t].image_width,v=n[t].image_height,y=u(o,a)>0||u(d,m)>0||h&&u(f,h)>0;return(0,l.createElement)("li",{className:"generatepress-site-library-list-item",key:i+":"+t},(0,l.createElement)("button",{disabled:y,onClick:function(){e.setState({siteOpened:!0,siteData:n[t],sitePlugins:JSON.parse(n[t].plugins)})}},(0,l.createElement)("div",{className:"generatepress-site-library-list-item-image"},(0,l.createElement)(p.ZP,{offset:100,once:!0},(0,l.createElement)("img",{src:r,alt:i,width:b,height:v}))),(0,l.createElement)("div",{className:"generatepress-site-library-list-item-title"},s,!!y&&u(o,a)>0&&(0,l.createElement)("span",{className:"generatepress-site-library-required-version"},(0,c.sprintf)(/* translators: Version number */
(0,c.__)("Requires GP Premium %s.","gp-premium"),o)),!!y&&u(d,m)>0&&(0,l.createElement)("span",{className:"generatepress-site-library-required-version"},(0,c.sprintf)(/* translators: Version number */
(0,c.__)("Requires GeneratePress %s.","gp-premium"),d)),!!y&&h&&u(f,h)>0&&(0,l.createElement)("span",{className:"generatepress-site-library-required-version"},(0,c.sprintf)(/* translators: Version number */
(0,c.__)("Requires GenerateBlocks %s.","gp-premium"),f)))))}))),(0,l.createElement)("div",{className:"generatepress-site-library-refresh"},(0,l.createElement)(m.Button,{isPrimary:!0,onClick:function(){e.setState({refreshingSites:!0}),d()({path:"/generatepress-site-library/v1/get_sites",method:"POST",data:{forceRefresh:!0}}).then((function(t){e.setState({isAPILoaded:!0,allSites:t.response,refreshingSites:!1})}))}},this.state.refreshingSites&&(0,l.createElement)(m.Spinner,null),!this.state.refreshingSites&&(0,c.__)("Refresh sites","gp-premium")))),this.state.siteOpened&&(0,l.createElement)("div",{className:"generatepress-site-library-opened"},(0,l.createElement)("div",{className:"generatepress-site-library-iframe"},(0,l.createElement)("iframe",{title:"gpp-site-library-frame",src:this.state.siteData.preview_url,style:{width:o}})),(0,l.createElement)("div",{className:"generatepress-site-library-info"},(0,l.createElement)("div",{className:"generatepress-site-library-header"},(0,l.createElement)("div",{className:"generatepress-site-library-header__title"},(0,l.createElement)("h2",{className:h?"has-author":""},(0,g.decodeEntities)(this.state.siteData.name)),h&&(0,l.createElement)("span",{className:"site-library-author"},/* translators: Site library site built by "author name" */
(0,c.__)("Built by","gp-premium")+" ",(0,l.createElement)("a",{href:this.state.siteData.author_url,target:"_blank",rel:"noreferrer noopener"},this.state.siteData.author_name))),(0,l.createElement)(m.Button,{onClick:function(){e.setState({isAPIWorking:!1,siteOpened:!1,siteData:{},siteSlug:"",sitePlugins:{},hasData:{},hasWidgets:!1,importOptions:!0,importContent:!0,confirmImport:!1,importComplete:!1,installablePlugins:[],activePlugins:[],manualPlugins:[]})}},(0,l.createElement)("svg",{width:"35",height:"35",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",role:"img","aria-hidden":"true",focusable:"false"},(0,l.createElement)("path",{d:"M13 11.9l3.3-3.4-1.1-1-3.2 3.3-3.2-3.3-1.1 1 3.3 3.4-3.5 3.6 1 1L12 13l3.5 3.5 1-1z"})))),(0,l.createElement)("div",{className:"generatepress-site-library-content"},!!this.state.siteData.description&&(0,l.createElement)("p",null,(0,g.decodeEntities)(this.state.siteData.description)),!this.state.importComplete&&(0,l.createElement)(l.Fragment,null,0===Object.keys(this.state.hasData).length&&(0,l.createElement)(l.Fragment,null,gppSiteLibrary.isDebugEnabled&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("h3",null,(0,c.__)("Debug Mode Enabled","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("WordPress debug mode is currently enabled. With this, any errors from third-party plugins might affect the import process.","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("To disable it, find WP_DEBUG in your wp-config.php file and set it to false like the below.","gp-premium")),(0,l.createElement)("code",null,"define( 'WP_DEBUG', false );"),(0,l.createElement)("p",null,(0,l.createElement)("a",{href:"https://docs.generatepress.com/article/debug-mode-enabled/",target:"_blank",rel:"noreferrer noopener"},(0,c.__)("Learn more here","gp-premium")))),Object.keys(this.state.sitePlugins).length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("h3",null,(0,c.__)("Plugins","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("This site uses the following plugins.","gp-premium")),(0,l.createElement)("ul",{className:"generatepress-site-library-plugins"},Object.entries(this.state.sitePlugins).map((function(e){var n=t(e,1)[0];return(0,l.createElement)("li",{key:n},n)})))),(0,l.createElement)("div",{className:"gpp-library-action-button"},(0,l.createElement)(m.Button,{isPrimary:!0,disabled:this.state.isAPIWorking,onClick:function(n){e.setState({isAPIWorking:!0});var r=n.target.nextElementSibling;r.textContent=(0,c.__)("Gathering information","gp-premium"),d()({path:"/generatepress-site-library/v1/get_site_data",method:"POST",data:{siteData:e.state.siteData}}).then((function(n){var i=[],s=[],a=[];Object.entries(n.response.plugin_data).forEach((function(e){var r=t(e,1)[0],o=n.response.plugin_data[r];o.repo&&!o.installed?i.push(o.name):o.installed||o.active?s.push(o.name):a.push(o.name)})),e.setState({isAPIWorking:!1,hasData:n.response,sitePlugins:n.response.plugins,hasWidgets:n.response.widgets,installablePlugins:i,activePlugins:s,manualPlugins:a}),r.classList.add("gpp-library-action-message--show"),r.textContent=n.response,n.success&&n.response?setTimeout((function(){r.classList.remove("gpp-library-action-message--show")}),3e3):r.classList.add("gpp-library-action-message--error")}))}},this.state.isAPIWorking&&(0,l.createElement)(m.Spinner,null),!this.state.isAPIWorking&&(0,c.__)("Get Started","gp-premium")),(0,l.createElement)("span",{className:"gpp-library-action-message"}))),Object.keys(this.state.hasData).length>0&&Object.keys(this.state.sitePlugins).length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("h3",null,(0,c.__)("Plugins","gp-premium")),this.state.installablePlugins.length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("p",null,(0,c.__)("These plugins can be installed automatically.","gp-premium")),(0,l.createElement)("ul",{className:"generatepress-site-library-plugins"},this.state.installablePlugins.map((function(e){return(0,l.createElement)("li",{key:e},e)})))),this.state.activePlugins.length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("p",null,(0,c.__)("These plugins are already installed.","gp-premium")),(0,l.createElement)("ul",{className:"generatepress-site-library-plugins"},this.state.activePlugins.map((function(e){return(0,l.createElement)("li",{key:e},e)})))),this.state.manualPlugins.length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("p",null,(0,c.__)("These plugins need to be installed manually.","gp-premium")),(0,l.createElement)("ul",{className:"generatepress-site-library-plugins"},this.state.manualPlugins.map((function(e){return(0,l.createElement)("li",{key:e},e)}))))),Object.keys(this.state.hasData).length>0&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("h3",null,(0,c.__)("Import","gp-premium")),this.state.hasData.options&&!this.state.isAPIWorking&&(0,l.createElement)(m.Tooltip,{text:(0,c.__)("This will import the options from the Customizer.","gp-premium")},(0,l.createElement)(m.ToggleControl,{checked:!!this.state.importOptions,label:(0,c.__)("Import Theme Options","gp-premium"),onChange:function(t){e.setState({importOptions:t})}})),this.state.hasData.content&&!this.state.isAPIWorking&&(0,l.createElement)(m.Tooltip,{text:(0,c.__)("This will install and activate needed plugins, import demo content, and import site options.","gp-premium")},(0,l.createElement)(m.ToggleControl,{checked:!!this.state.importContent,label:(0,c.__)("Import Demo Content","gp-premium"),onChange:function(t){e.setState({importContent:t})}})),(!!this.state.importOptions||!!this.state.importContent)&&(0,l.createElement)(l.Fragment,null,!this.state.isAPIWorking&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("h3",null,(0,c.__)("Confirm Import","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("This process makes changes to your website. If it contains important data, we suggest backing it up before proceeding.","gp-premium")),(0,l.createElement)(m.ToggleControl,{checked:!!this.state.confirmImport,label:(0,c.__)("I understand","gp-premium"),onChange:function(t){e.setState({confirmImport:t})}})),!!this.state.confirmImport&&!this.state.importComplete&&(0,l.createElement)("div",{className:"gpp-library-action-button"},(0,l.createElement)(m.Button,{isPrimary:!0,disabled:this.state.isAPIWorking,onClick:function(t){e.setState({isAPIWorking:!0}),e.state.importOptions?e.importThemeOptions(t):e.state.importContent&&e.installPlugins(t)}},this.state.isAPIWorking&&(0,l.createElement)(m.Spinner,null),!this.state.isAPIWorking&&(0,c.__)("Begin Import","gp-premium")),(0,l.createElement)("span",{className:"gpp-library-action-message"}))))),!!this.state.importComplete&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("h3",null,(0,c.__)("Import Complete","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("Check out your new site and start making it yours!","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("Note: We do our best to ensure all imported images are licensed for open use. However, image licenses can change, so we strongly advise that you replace all imported images with your own.","gp-premium")),(0,l.createElement)("a",{className:"components-button is-primary",href:gppSiteLibrary.homeUrl},(0,c.__)("View Site","gp-premium")),this.state.siteData.uploads_url&&Object.values(this.state.sitePlugins).includes("elementor/elementor.php")&&(0,l.createElement)(l.Fragment,null,(0,l.createElement)("h3",null,(0,c.__)("Additional Cleanup","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("This site is using Elementor which means you will want to replace the imported image URLs.","gp-premium")),(0,l.createElement)("p",null,(0,c.__)("Take note of the old and new URLs below, then head over to the Elementor Tools area to replace them.","gp-premium")),(0,l.createElement)(m.TextControl,{label:(0,c.__)("Old URL","gp-premium"),readOnly:!0,value:this.state.siteData.uploads_url}),(0,l.createElement)(m.TextControl,{label:(0,c.__)("New URL","gp-premium"),readOnly:!0,value:gppSiteLibrary.uploadsUrl}),(0,l.createElement)("a",{href:gppSiteLibrary.elementorReplaceUrls,className:"components-button is-primary",target:"_blank",rel:"noopener noreferrer"},(0,c.__)("Elementor Tools","gp-premium")))),(0,l.createElement)("div",{className:"generatepress-site-library-footer"},(0,l.createElement)(m.Tooltip,{text:(0,c.__)("Preview desktop","gp-premium")},(0,l.createElement)(m.Button,{isPrimary:"desktop"===this.state.device,onClick:function(){e.setState({device:"desktop"})}},(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",width:"1em",height:"1em",viewBox:"0 0 24 24"},(0,l.createElement)("path",{d:"M21 14H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 002 2h7l-2 3v1h8v-1l-2-3h7a2 2 0 002-2V4a2 2 0 00-2-2z",fill:"currentColor"})))),(0,l.createElement)(m.Tooltip,{text:(0,c.__)("Preview tablet","gp-premium")},(0,l.createElement)(m.Button,{isPrimary:"tablet"===this.state.device,onClick:function(){e.setState({device:"tablet"})}},(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",width:"1em",height:"1em",viewBox:"0 0 24 24"},(0,l.createElement)("path",{d:"M19 19H4V3h15m-7.5 20a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m7-23h-14A2.5 2.5 0 002 2.5v19A2.5 2.5 0 004.5 24h14a2.5 2.5 0 002.5-2.5v-19A2.5 2.5 0 0018.5 0z",fill:"currentColor"})))),(0,l.createElement)(m.Tooltip,{text:(0,c.__)("Preview mobile","gp-premium")},(0,l.createElement)(m.Button,{isPrimary:"mobile"===this.state.device,onClick:function(){e.setState({device:"mobile"})}},(0,l.createElement)("svg",{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",width:"1em",height:"1em",viewBox:"0 0 24 24"},(0,l.createElement)("path",{d:"M17 19H7V5h10m0-4H7c-1.11 0-2 .89-2 2v18a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2z",fill:"currentColor"}))))))))))}}])&&i(n.prototype,h),Object.defineProperty(n,"prototype",{writable:!1}),y}(l.Component);(0,l.render)((0,l.createElement)(f,null),document.getElementById("gpp-site-library"))}()}();