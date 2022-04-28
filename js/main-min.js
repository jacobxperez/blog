/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
"localhost"===location.hostname||"127.0.0.1"===location.hostname?baseURL=window.location.origin:baseURL=window.location.origin+"/blog";var Data={title:document.title,subTitle:null},parser=new DOMParser;const dropDown=()=>{const t=document.querySelectorAll("[data-toggle]"),e=document.querySelectorAll('[data-toggle="pop"]'),n=document.querySelectorAll("[data-tooltip]");function a(t){for(let e=0;e<t.length;e++)t[e].addEventListener("click",(function(t){!1===this.hasAttribute("data-state","active")?this.setAttribute("data-state","active"):this.removeAttribute("data-state"),t.stopPropagation()}))}function o(t,e){for(let n=0;n<e.length;n++)t.target!==e[n]&&e[n].removeAttribute("data-state")}a(t),a(n),document.addEventListener("click",(function(t){o(t,e),o(t,n)}))},Template={getTemplate(t,e){const n=document.getElementById(t).content,a=document.adoptNode(n);return document.getElementById(e).appendChild(a),this},getString(t,e,n,a="text/html"){const o=parser.parseFromString(t,a).getElementById(e);return document.getElementById(n).appendChild(o),this},fetchTemplate(t,e,n,a="text/html"){return fetch(baseURL+t).then((t=>t.text())).then((t=>{const o=parser.parseFromString(t,a).getElementById(e).content.cloneNode(!0);document.getElementById(n).appendChild(o)})).finally((()=>{"footerTemplate"===e&&dropDown()})).catch((t=>{})),this}};document.addEventListener("DOMContentLoaded",(()=>{if(null===Data.subTitle)var t=`\n            <div id="headerContent" data-container="fit">\n                <h1>${Data.title}</h1>\n            </div>\n            `;else t=`\n            <div id="headerContent" data-container="fit">\n                <h1>${Data.title}</h1>\n                <h2 data-text="h5">${Data.subTitle}</h2>\n            </div>\n            `;Template.getString(`\n    <div id="layout">\n        <header id="header" data-section="header">\n            ${t}\n        </header>\n\n        <main id="main" data-section="main">\n            <div id="content" data-container="fit" data-grid="main">\n            </div>\n        </main>\n\n        <footer id="footer" data-section="footer">\n            <div id="footerContent" data-container="fit">\n            </div>\n        </footer>\n    </div>\n    `,"layout","root").getTemplate("contentTemplate","content").fetchTemplate("/templates/main-min.html","navTemplate","header").fetchTemplate("/templates/main-min.html","footerTemplate","footerContent")}));