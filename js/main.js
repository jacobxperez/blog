/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
// check to see if it is local host
if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    // set url to local host
    var baseURL = window.location.origin;
} else {
    // set url to live
    var baseURL = window.location.origin + '/blog';
}

// initialize the DOM parser
var parser = new DOMParser();

// Page data
var Data = {
    title: 'Jacob Perez',
    subTitle: null,
};


// Dropdown function 
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


// Smooth Scroll
const smoothScroll = () => {
    const intLinks = document.querySelectorAll("a[href^='#']");

    for (let i = 0; i < intLinks.length; i++) {
        intLinks[i].addEventListener("click", function (e) {

            e.preventDefault();

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            })

        })
    }
};
// end Smooth Scroll


// Template Class
class Template {
    constructor(templatePath, templateId, templateSelector) {
        // get template path
        this._templatePath = templatePath;
        // template name id
        this._templateId = templateId;
        // selector for setting the clone templateId on index.html
        this._templateSelector = templateSelector;
    }

    fetchTemplate() {
        fetch(baseURL + this._templatePath)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // where to paste template on index.html
                let getTemplateSelector = document.querySelector(this._templateSelector);
                // get the template from templates folder and parseit
                let doc = parser.parseFromString(html, 'text/html');
                let template = doc.getElementById(this._templateId);
                // clone template footer
                let cloneTemplate = template.content.cloneNode(true);
                // append the template on index.html 
                getTemplateSelector.appendChild(cloneTemplate);
            })
            .catch((err) => {
                console.log('Error: faild to catch template', err);
            })
            .finally(() => {
                // if is footer template start functions
                if (this._templateId === 'footerTemplate') {
                    dropDown();
                    smoothScroll();
                }
            })
    }
};


// Run code when document loads 
document.addEventListener("DOMContentLoaded", () => {

    // Generate page header
    (function () {
        // check for subtitle
        if (Data.subTitle === null) {
            // generate from string
            var parseHeader = parser.parseFromString(`
            <div data-container="fit">
            <h1>${Data.title}</h1>
            </div>
            `, 'text/html');
        } else {
            // generate from string
            var parseHeader = parser.parseFromString(`
            <div data-container="fit">
            <h1>${Data.title}</h1>
            <h2 data-text="h5">${Data.subTitle}</h2>
            </div>
            `, 'text/html');
        }

        // get html from parsed string
        const getParsedHeader = parseHeader.querySelector('div');
        // get page header for appending parsed html
        const getHeader = document.querySelector('header');
        getHeader.appendChild(getParsedHeader);
    })();


    // create nav template
    const NavTemplate = new Template('/templates/nav.html', 'navTemplate', '[data-section="header"]');
    NavTemplate.fetchTemplate();

    // create footer template
    const FooterTemplate = new Template('/templates/footer.html', 'footerTemplate', '[data-section="footer"]');
    FooterTemplate.fetchTemplate();

});
