(window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[]).push([[77,75],{22:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r}));const o=t=>!(t=>null===t)(t)&&t instanceof Object&&t.constructor===Object;function r(t,e){return o(t)&&e in t}},278:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));var o=function(){return(o=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var r in e=arguments[n])Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t}).apply(this,arguments)};Object.create,Object.create},279:function(t,e,n){"use strict";function o(t){return t.toLowerCase()}n.d(e,"a",(function(){return l}));var r=[/([a-z0-9])([A-Z])/g,/([A-Z])([A-Z][a-z])/g],c=/[^A-Z0-9]+/gi;function l(t,e){void 0===e&&(e={});for(var n=e.splitRegexp,l=void 0===n?r:n,i=e.stripRegexp,s=void 0===i?c:i,u=e.transform,d=void 0===u?o:u,f=e.delimiter,b=void 0===f?" ":f,v=a(a(t,l,"$1\0$2"),s,"\0"),p=0,g=v.length;"\0"===v.charAt(p);)p++;for(;"\0"===v.charAt(g-1);)g--;return v.slice(p,g).split("\0").map(d).join(b)}function a(t,e,n){return e instanceof RegExp?t.replace(e,n):e.reduce((function(t,e){return t.replace(e,n)}),t)}},284:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var o=n(278),r=n(279);function c(t,e){return void 0===e&&(e={}),function(t,e){return void 0===e&&(e={}),Object(r.a)(t,Object(o.a)({delimiter:"."},e))}(t,Object(o.a)({delimiter:"-"},e))}},286:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var o=n(5),r=n.n(o),c=n(22),l=n(28),a=n(284),i=n(129);function s(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};const e={};return Object(i.getCSSRules)(t,{selector:""}).forEach(t=>{e[t.key]=t.value}),e}function u(t,e){return t&&e?`has-${Object(a.a)(e)}-${t}`:""}const d=t=>{const e=(t=>{const e=Object(c.a)(t)?t:{style:{}};let n=e.style;return Object(l.a)(n)&&(n=JSON.parse(n)||{}),Object(c.a)(n)||(n={}),{...e,style:n}})(t),n=function(t){var e,n,o,l,a,i,d;const{backgroundColor:f,textColor:b,gradient:v,style:p}=t,g=u("background-color",f),y=u("color",b),m=function(t){if(t)return`has-${t}-gradient-background`}(v),O=m||(null==p||null===(e=p.color)||void 0===e?void 0:e.gradient);return{className:r()(y,m,{[g]:!O&&!!g,"has-text-color":b||(null==p||null===(n=p.color)||void 0===n?void 0:n.text),"has-background":f||(null==p||null===(o=p.color)||void 0===o?void 0:o.background)||v||(null==p||null===(l=p.color)||void 0===l?void 0:l.gradient),"has-link-color":Object(c.a)(null==p||null===(a=p.elements)||void 0===a?void 0:a.link)?null==p||null===(i=p.elements)||void 0===i||null===(d=i.link)||void 0===d?void 0:d.color:void 0}),style:s({color:(null==p?void 0:p.color)||{}})}}(e),o=function(t){var e;const n=(null===(e=t.style)||void 0===e?void 0:e.border)||{};return{className:function(t){var e;const{borderColor:n,style:o}=t,c=n?u("border-color",n):"";return r()({"has-border-color":n||(null==o||null===(e=o.border)||void 0===e?void 0:e.color),borderColorClass:c})}(t),style:s({border:n})}}(e),a=function(t){var e;return{className:void 0,style:s({spacing:(null===(e=t.style)||void 0===e?void 0:e.spacing)||{}})}}(e),i=(t=>{const e=Object(c.a)(t.style.typography)?t.style.typography:{},n=Object(l.a)(e.fontFamily)?e.fontFamily:"";return{className:t.fontFamily?`has-${t.fontFamily}-font-family`:n,style:{fontSize:t.fontSize?`var(--wp--preset--font-size--${t.fontSize})`:e.fontSize,fontStyle:e.fontStyle,fontWeight:e.fontWeight,letterSpacing:e.letterSpacing,lineHeight:e.lineHeight,textDecoration:e.textDecoration,textTransform:e.textTransform}}})(e);return{className:r()(i.className,n.className,o.className,a.className),style:{...i.style,...n.style,...o.style,...a.style}}}},334:function(t,e,n){"use strict";n.r(e),n.d(e,"Block",(function(){return d}));var o=n(0),r=n(1),c=n(5),l=n.n(c),a=n(20),i=n(60),s=n(286),u=n(144);n(335);const d=t=>{const{className:e,align:n}=t,c=Object(s.a)(t),{parentClassName:u}=Object(i.useInnerBlockLayoutContext)(),{product:d}=Object(i.useProductDataContext)();if(!d.id||!d.on_sale)return null;const f="string"==typeof n?"wc-block-components-product-sale-badge--align-"+n:"";return Object(o.createElement)("div",{className:l()("wc-block-components-product-sale-badge",e,f,{[u+"__product-onsale"]:u},c.className),style:c.style},Object(o.createElement)(a.a,{label:Object(r.__)("Sale","woocommerce"),screenReaderLabel:Object(r.__)("Product on sale","woocommerce")}))};e.default=Object(u.withProductDataContext)(d)},335:function(t,e){}}]);