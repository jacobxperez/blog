/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
// check if site is on local host
location.hostname === "localhost" || location.hostname === "127.0.0.1" ? baseURL = window.location.origin : baseURL = window.location.origin + '/blog';

// initialize the DOM for parsing Templates
var parser = new DOMParser();
// appends parsed content to selector
var contentTarget = 'content';

// Page Data
var Data = {
    title: document.title,
    subTitle: null,
    author: document.querySelector('[name=author]').content,
};


// Dropdown toggle function 
const dropDown = () => {
    const getToggle = document.querySelectorAll('[data-toggle]');
    const getPop = document.querySelectorAll('[data-toggle="pop"]');
    const getToolTip = document.querySelectorAll('[data-tooltip]');

    // toggle class active
    for (let i = 0; i < getToggle.length; i++) {
        getToggle[i].addEventListener("click", function (e) {

            if (this.hasAttribute('data-state', 'active') === false) {

                this.setAttribute('data-state', 'active');

            } else if (this.hasAttribute('data-state', 'active') === true) {

                this.removeAttribute('data-state');

            }

            e.stopPropagation();
        })
    };

    // toggle class active on tooltip
    for (let i = 0; i < getToolTip.length; i++) {
        getToolTip[i].addEventListener("click", function (e) {

            if (this.hasAttribute('data-state', 'active') === false) {

                this.setAttribute('data-state', 'active');

            } else if (this.hasAttribute('data-state', 'active') === true) {

                this.removeAttribute('data-state');

            }

            e.stopPropagation();
        })
    };

    // Close dropdown on document click
    document.addEventListener("click", function (e) {
        for (let i = 0; i < getPop.length; i++) {
            if (e.target !== getPop[i]) {

                getPop[i].removeAttribute('data-state');

            }
        }

        for (let i = 0; i < getToolTip.length; i++) {
            if (e.target !== getToolTip[i]) {

                getToolTip[i].removeAttribute('data-state');

            }
        }
    });
};
// end Dropdwon


// Template Class
class Template {
    constructor(parseSource, parseSelector, targetSelector) {
        // get source or path
        this._parseSource = parseSource;
        // template selector name
        this._parseSelector = parseSelector;
        // selector for appending the clone parseSelector on index.html
        this._targetSelector = targetSelector;
    }

    generateFromString() {
        // get html from parsed string
        const parseSelector_ = this._parseSource.getElementById(this._parseSelector);
        // get page header for appending parsed html string
        const targetSelector_ = document.getElementById(this._targetSelector);
        // append string template on index.html 
        targetSelector_.appendChild(parseSelector_);
    }

    fetchTemplate() {
        fetch(baseURL + this._parseSource)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // get the template from template document location and parseit
                const templateDoc = parser.parseFromString(html, 'text/html');
                const template = templateDoc.getElementById(this._parseSelector);
                // clone template information
                const cloneTemplate = template.content.cloneNode(true);
                // where to paste template on index.html
                const targetSelector_ = document.getElementById(this._targetSelector);
                // append template on index.html 
                targetSelector_.appendChild(cloneTemplate);
            })
            .catch((err) => {
                console.log('Error: faild to catch template', err);
            })
            .finally(() => {
                // once the footer template is loaded start functions
                if (this._parseSelector === 'footerTemplate') {
                    dropDown();
                }
            })
    }
};
// end Template Class


// Run code when document loads 
document.addEventListener("DOMContentLoaded", () => {

    // check for subtitle
    if (Data.subTitle === null) {
        // generate from string
        var parseHeader = parser.parseFromString(`
            <div id="headerContent" data-container="fit">
                <h1>${Data.title}</h1>
            </div>
            `, 'text/html');
    } else {
        // generate from string
        var parseHeader = parser.parseFromString(`
            <div id="headerContent" data-container="fit">
                <h1>${Data.title}</h1>
                <h2 data-text="h5">${Data.subTitle}</h2>
            </div>
            `, 'text/html');
    }

    // Generate page header
    let HeaderTemplate = new Template(parseHeader, 'headerContent', 'header');
    HeaderTemplate.generateFromString();


    // // Generate main layout
    // let parseMain = parser.parseFromString(`
    //     <div id="content" data-container="fit" data-grid="main">
    //     </div>`, 'text/html');
    // let MainTemplate = new Template(parseMain, 'content', 'main');
    // MainTemplate.generateFromString();

    // fetch nav Template
    let NavTemplate = new Template('/templates/nav.html', 'navTemplate', 'header');
    NavTemplate.fetchTemplate();


    // fetch footer Template
    // always leave footer at the end for toggles to work dropDown
    let FooterTemplate = new Template('/templates/footer.html', 'footerTemplate', 'footer');
    FooterTemplate.fetchTemplate();

});
