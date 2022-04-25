/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
// check if site is on local host
location.hostname === "localhost" || location.hostname === "127.0.0.1" ? baseURL = window.location.origin : baseURL = window.location.origin + '/blog';

// initialize the DOM for parsing Templates
var parser = new DOMParser();

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
    getTemplate(parseSource, targetSelector) {
        const getTemplate_ = document.getElementById(parseSource).content;
        const copyTemplate_ = document.importNode(getTemplate_, true);
        document.getElementById(targetSelector).appendChild(copyTemplate_);
    }

    getFromString(parseSource, parseSelector, targetSelector) {
        // get string and parse it
        const parseSource_ = parser.parseFromString(parseSource, 'text/html');
        // get selector from parsed string
        const parseSelector_ = parseSource_.getElementById(parseSelector);
        // append to target selector on index.html 
        const targetSelector_ = document.getElementById(targetSelector);
        targetSelector_.appendChild(parseSelector_);
    }

    fetchTemplate(parseSource, parseSelector, targetSelector) {
        fetch(baseURL + parseSource)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // get the template from template document location and parseit
                const templateDoc_ = parser.parseFromString(html, 'text/html');
                const template_ = templateDoc_.getElementById(parseSelector);
                // clone template information
                const cloneTemplate_ = template_.content.cloneNode(true);
                // append to target selector on index.html 
                const targetSelector_ = document.getElementById(targetSelector);
                targetSelector_.appendChild(cloneTemplate_);
            })
            .catch((err) => {
                console.log('Error: faild to catch template', err);
            })
            .finally(() => {
                // once the footer template is loaded start functions
                if (parseSelector === 'footerTemplate') {
                    dropDown();
                }
            })
    }
};
// end Template Class


// Generate Template when DOC Loads
document.addEventListener("DOMContentLoaded", () => {

    // check for subtitle
    if (Data.subTitle === null) {
        var headerContent = `
            <div id="headerContent" data-container="fit">
                <h1>${Data.title}</h1>
            </div>
            `;
    } else {
        var headerContent = `
            <div id="headerContent" data-container="fit">
                <h1>${Data.title}</h1>
                <h2 data-text="h5">${Data.subTitle}</h2>
            </div>
            `;
    }

    // Generate page layout
    const layout = `
    <article id="layout">
        <header id="header" data-section="header">
            ${headerContent}
        </header>

        <main id="main" data-section="main">
            <div id="content" data-container="fit" data-grid="main">
            </div>
        </main>

        <footer id="footer" data-section="footer">
            <div id="footerContent" data-container="fit">
            </div>
        </footer>
    <article>
    `;

    const PageLayout = new Template();
    PageLayout.getFromString(layout, 'layout', 'page');


    // get page content from template element
    const PageContent = new Template();
    PageContent.getTemplate('template', 'content');


    // fetch nav Template
    const NavTemplate = new Template();
    NavTemplate.fetchTemplate('/templates/main.html', 'navTemplate', 'header');


    // fetch footer Template
    // always leave footer at the end for toggles to work dropDown
    const FooterTemplate = new Template();
    FooterTemplate.fetchTemplate('/templates/main.html', 'footerTemplate', 'footerContent');

});
