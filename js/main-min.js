/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
"localhost"===location.hostname||"127.0.0.1"===location.hostname?baseURL=window.location.origin:baseURL=window.location.origin+"/blog";var parser=new DOMParser,Data={title:document.title,subTitle:null};function toggle(){const t=document.querySelectorAll("[data-toggle]"),e=document.querySelectorAll('[data-toggle="pop"]'),n=document.querySelectorAll("[data-tooltip]");function a(t){for(let e=0;e<t.length;e++)t[e].addEventListener("click",(function(t){!1===this.hasAttribute("data-state","active")?this.setAttribute("data-state","active"):this.removeAttribute("data-state"),t.stopPropagation()}))}function o(t,e){for(let n=0;n<t.length;n++)e.target!==t[n]&&t[n].removeAttribute("data-state")}a(t),a(n),document.addEventListener("click",(function(t){o(e,t),o(n,t)}))}const Template={_copyPasteTemplate(t,e){const n=e.content.cloneNode(!0);document.getElementById(t).appendChild(n)},_parseSource(t,e,n,a){void 0===a&&(a="text/html");const o=parser.parseFromString(t,a).getElementById(e);this._copyPasteTemplate(n,o)},getTemplate(t,e){return new Promise(((e,n)=>{null!==t?e():n()})).then((()=>{const n=document.getElementById(t);this._copyPasteTemplate(e,n),n.remove()})).catch((t=>{})),this},getString(t,e,n,a){return new Promise(((e,n)=>{"string"==typeof t?e():n(err="Error: Template source is not a String")})).then((()=>{this._parseSource(t,e,n,a)})).catch((t=>{})),this},fetchTemplate(t,e,n,a){return fetch(baseURL+t).then((t=>t.text())).then((t=>{this._parseSource(t,e,n,a)})).finally((()=>{"footerTemplate"===e&&toggle()})).catch((t=>{})),this}};document.addEventListener("DOMContentLoaded",(()=>{null===Data.subTitle?subTitle="":subTitle=`<h2 data-text="h5">${Data.subTitle}</h2>`;Template.getString(`\n    <template id="layoutTemplate">\n        <header id="header" data-section="header">\n            <div id="headerContent" data-container="fit">\n                <h1>${Data.title}</h1>\n                ${subTitle}\n            </div>\n        </header>\n\n        <main id="main" data-section="main">\n            <div id="content" data-container="fit" data-grid="main">\n            </div>\n        </main>\n\n        <footer id="footer" data-section="footer">\n            <div id="footerContent" data-container="fit">\n            </div>\n        </footer>\n    </template>\n    `,"layoutTemplate","root").getTemplate("asideTemplate","content").getTemplate("contentTemplate","content").fetchTemplate("/templates/main-min.html","navTemplate","header").fetchTemplate("/templates/main-min.html","footerTemplate","footerContent")}));
