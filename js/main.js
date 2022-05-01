/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
// Check if site is on local host
location.hostname === "localhost" || location.hostname === "127.0.0.1" ?
    baseURL = window.location.origin : baseURL = window.location.origin + '/blog';

// Initialize the DOM Parser
var parser = new DOMParser();

// Document Data
var Data = {
    title: document.title,
    subTitle: null,
    // author: document.querySelector('[name=author]').content,
};

// toggles
function toggle() {
    const getToggle = document.querySelectorAll('[data-toggle]');
    const getPop = document.querySelectorAll('[data-toggle="pop"]');
    const getToolTip = document.querySelectorAll('[data-tooltip]');

    // toggles attribute
    function toggleAttr(selector) {
        for (let i = 0; i < selector.length; i++) {
            selector[i].addEventListener("click", function (e) {
                this.hasAttribute('data-state', 'active') === false ?
                    this.setAttribute('data-state', 'active') :
                    this.removeAttribute('data-state');

                e.stopPropagation();
            });
        }
    };

    toggleAttr(getToggle);
    toggleAttr(getToolTip);

    // removes attribute
    function removeAtt(selector, e) {
        for (let i = 0; i < selector.length; i++) {
            if (e.target !== selector[i]) {
                selector[i].removeAttribute('data-state');
            }
        }
    };

    // Close dropdown and tooltips on document click
    document.addEventListener("click", function (e) {
        removeAtt(getPop, e);
        removeAtt(getToolTip, e);
    });
}

const Template = {
    _copyPasteTemplate(templateID, targetID, _source) {
        // get template ID from source
        const _getTemplateID = _source.getElementById(templateID);
        // clone template ID from source 
        const _cloneTemplate = _getTemplateID.content.cloneNode(true);
        // append template to target selector
        const _targetID = document.getElementById(targetID);
        _targetID.appendChild(_cloneTemplate);
        // delete original template from document
        _getTemplateID.remove();
    },
    _parseSource(source, templateID, targetID, mimeType) {
        if (mimeType === undefined) {
            mimeType = 'text/html'
        }
        // get source and parse it
        const _source = parser.parseFromString(source, mimeType);
        this._copyPasteTemplate(templateID, targetID, _source);
    },
    getTemplate(templateID, targetID, _source = document) {
        const _getTemplatePromise = new Promise((resolve, reject) => {
            // check if template exist
            templateID !== null ? resolve() : reject();
        });
        _getTemplatePromise
            .then(() => this._copyPasteTemplate(templateID, targetID, _source))
            .catch(err => console.error(err))

        return this;
    },
    getString(source, templateID, targetID, mimeType) {
        const _getStringPromise = new Promise((resolve, reject) => {
            // check if source is string
            typeof source === 'string' ?
                resolve() : reject(err = 'Error: Template source is not a String');
        });
        _getStringPromise
            .then(() => this._parseSource(source, templateID, targetID, mimeType))
            .catch(err => console.error(err))

        return this;
    },
    fetchTemplate(source, templateID, targetID, mimeType) {
        fetch(baseURL + source)
            // when the source is loaded
            .then(response => response.text())
            .then(html => this._parseSource(html, templateID, targetID, mimeType))
            .finally(() => {
                // once the footer is added start functions
                if (templateID === 'footerTemplate') {
                    toggle();
                }
            })
            .catch(err => console.error(err))

        return this;
    },
};

document.addEventListener("DOMContentLoaded", () => {
    // Check for subtitle then added to layout
    Data.subTitle === null ?
        subTitle = '' :
        subTitle = `<h2 data-text="h5">${Data.subTitle}</h2>`;

    // 1. generate page layout from string
    // 2. move secondary content to layout
    // 3. move page content to layout
    // 4. fetch navigation
    // 5. fetch footer
    const layout = Template.getString(`
    <template id="layoutTemplate">
        <header id="header" data-section="header">
            <div id="headerContent" data-container="fit">
                <h1>${Data.title}</h1>
                ${subTitle}
            </div>
        </header>

        <main id="main" data-section="main">
            <div id="content" data-container="fit" data-grid="main">
            </div>
        </main>

        <footer id="footer" data-section="footer">
            <div id="footerContent" data-container="fit">
            </div>
        </footer>
    </template>
    `, 'layoutTemplate', 'root')
        .getTemplate('asideTemplate', 'content')
        .getTemplate('contentTemplate', 'content')
        .fetchTemplate('/templates/main-min.html', 'navTemplate', 'header')
        .fetchTemplate('/templates/main-min.html', 'footerTemplate', 'footerContent');
    // always leave footer at the end for toggles to work
});
