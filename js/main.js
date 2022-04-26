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
const Template = {
    getTemplate(source, targetID) {
        const _getTemplate = document.getElementById(source).content;
        const _importTemplate = document.importNode(_getTemplate, true);
        document.getElementById(targetID).appendChild(_importTemplate);
    },
    getString(source, parseID, targetID) {
        // get string and parse it
        const _source = parser.parseFromString(source, 'text/html');
        // get selector from parsed string
        const _getParseID = _source.getElementById(parseID);
        // append to target selector on index.html 
        const _getTargetID = document.getElementById(targetID);
        _getTargetID.appendChild(_getParseID);
    },
    fetchTemplate(source, parseID, targetID) {
        fetch(baseURL + source)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // get the template from fetch template and parseit
                const _source = parser.parseFromString(html, 'text/html');
                const _getParseID = _source.getElementById(parseID);
                // clone template information
                const _cloneparseID = _getParseID.content.cloneNode(true);
                // append to target selector on index.html 
                const _targetID = document.getElementById(targetID);
                _targetID.appendChild(_cloneparseID);
            })
            .catch((err) => {
                console.log('Error: faild to catch template', err);
            })
            .finally(() => {
                // once the footer template is loaded start functions
                if (parseID === 'footerTemplate') {
                    dropDown();
                }
            })
    },
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
    const layout = Template.getString(`
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
    `, 'layout', 'page');
    layout;


    // get page content from template element
    const pageContent = Template.getTemplate('template', 'content');
    pageContent;


    // fetch nav Template
    const nav = Template.fetchTemplate('/templates/main.html', 'navTemplate', 'header');
    nav;


    // fetch footer Template
    // always leave footer at the end for toggles to work dropDown
    const footer = Template.fetchTemplate('/templates/main.html', 'footerTemplate', 'footerContent');
    footer;

});
