/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
"localhost"===location.hostname||"127.0.0.1"===location.hostname?baseURL=window.location.origin:baseURL=window.location.origin+"/blog";var parser=new DOMParser,Data={title:document.title,subTitle:null};const dropDown=()=>{const t=document.querySelectorAll("[data-toggle]"),e=document.querySelectorAll('[data-toggle="pop"]'),n=document.querySelectorAll("[data-tooltip]");function a(t){!1===t.hasAttribute("data-state","active")?t.setAttribute("data-state","active"):t.removeAttribute("data-state")}for(let e=0;e<t.length;e++)t[e].addEventListener("click",(function(t){a(this),t.stopPropagation()}));for(let t=0;t<n.length;t++)n[t].addEventListener("click",(function(t){a(this),t.stopPropagation()}));function o(t,e){for(let n=0;n<e.length;n++)t.target!==e[n]&&e[n].removeAttribute("data-state")}document.addEventListener("click",(function(t){o(t,e),o(t,n)}))},Template={getTemplate(t,e){const n=document.getElementById(t).content,a=document.adoptNode(n);return document.getElementById(e).appendChild(a),this},getString(t,e,n,a="text/html"){const o=parser.parseFromString(t,a).getElementById(e);return document.getElementById(n).appendChild(o),this},fetchTemplate(t,e,n,a="text/html"){return fetch(baseURL+t).then((t=>t.text())).then((t=>{const o=parser.parseFromString(t,a).getElementById(e).content.cloneNode(!0);document.getElementById(n).appendChild(o)})).catch((t=>{})).finally((()=>{"footerTemplate"===e&&dropDown()})),this}};document.addEventListener("DOMContentLoaded",(()=>{if(null===Data.subTitle)var t=`\n            <div id="headerContent" data-container="fit">\n                <h1>${Data.title}</h1>\n            </div>\n            `;else t=`\n            <div id="headerContent" data-container="fit">\n                <h1>${Data.title}</h1>\n                <h2 data-text="h5">${Data.subTitle}</h2>\n            </div>\n            `;Template.getString(`\n    <article id="layout">\n        <header id="header" data-section="header">\n            ${t}\n        </header>\n\n        <main id="main" data-section="main">\n            <div id="content" data-container="fit" data-grid="main">\n            </div>\n        </main>\n\n        <footer id="footer" data-section="footer">\n            <div id="footerContent" data-container="fit">\n            </div>\n        </footer>\n    <article>\n    `,"layout","root").getTemplate("contentTemplate","content"),Template.fetchTemplate("/templates/main-min.html","navTemplate","header").fetchTemplate("/templates/main-min.html","footerTemplate","footerContent")}));
