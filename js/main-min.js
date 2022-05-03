/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
"localhost"===location.hostname||"127.0.0.1"===location.hostname?baseURL=window.location.origin:baseURL=window.location.origin+"/blog";var parser=new DOMParser,Data={title:document.title,subTitle:null};function toggle(){const t=document.querySelectorAll("[data-toggle]"),e=document.querySelectorAll('[data-toggle="pop"]'),a=document.querySelectorAll("[data-tooltip]");function n(t){t.addEventListener("click",(function(t){!1===this.hasAttribute("data-state","active")?this.setAttribute("data-state","active"):this.removeAttribute("data-state"),t.stopPropagation()}))}function o(t,e){e.target!==t&&t.removeAttribute("data-state")}t.forEach(n),a.forEach(n),document.addEventListener("click",(function(t){e.forEach(o),a.forEach(o)}))}const Template={_copyPasteTemplate(t,e,a){const n=a.getElementById(t),o=n.content.cloneNode(!0);document.getElementById(e).appendChild(o),n.remove()},_parseSource(t,e,a,n){void 0===n&&(n="text/html");const o=parser.parseFromString(t,n);this._copyPasteTemplate(e,a,o)},getTemplate(t,e,a=document){return new Promise(((e,a)=>{null!==t?e():a()})).then((()=>this._copyPasteTemplate(t,e,a))).catch((t=>{})),this},fromString(t,e,a,n){return new Promise(((e,a)=>{"string"==typeof t?e():a(err="Error: Template source is not a String")})).then((()=>this._parseSource(t,e,a,n))).catch((t=>{})),this},fetchSource(t,e,a,n){return fetch(baseURL+t).then((t=>t.text())).then((t=>this._parseSource(t,e,a,n))).finally((()=>{"footerTemplate"===e&&toggle()})).catch((t=>{})),this}};document.addEventListener("DOMContentLoaded",(()=>{null===Data.subTitle?subTitle="":subTitle=`<h2 data-text="h5">${Data.subTitle}</h2>`;Template.fromString(`\n    <template id="layoutTemplate">\n        <header id="header" data-section="header">\n            <div id="headerContent" data-container="fit">\n                <h1>${Data.title}</h1>\n                ${subTitle}\n            </div>\n        </header>\n\n        <main id="main" data-section="main">\n            <div id="content" data-container="fit" data-grid="main">\n            </div>\n        </main>\n\n        <footer id="footer" data-section="footer">\n            <div id="footerContent" data-container="fit">\n            </div>\n        </footer>\n    </template>\n    `,"layoutTemplate","root").getTemplate("asideTemplate","content").getTemplate("contentTemplate","content").fetchSource("/templates/main-min.html","navTemplate","header").fetchSource("/templates/main-min.html","footerTemplate","footerContent")}));
