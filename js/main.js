/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
// Check if site is on local host
location.hostname === "localhost" || location.hostname === "127.0.0.1" ? baseURL = window.location.origin : baseURL = window.location.origin + '/blog';

// Document Data
var Data = {
    title: document.title,
    subTitle: null,
    // author: document.querySelector('[name=author]').content,
};

// Initialize the DOM Parser
var parser = new DOMParser();

// toggles
function dropDown() {
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
    getTemplate(templateId, targetId) {
        // get template Id
        const _getTemplate = document.getElementById(templateId).content;
        // copy template
        const _importTemplate = document.adoptNode(_getTemplate);
        // append template to target ID
        document.getElementById(targetId).appendChild(_importTemplate);

        return this;
    },
    parseSource(source, templateId, targetId, mimeType) {
        if (mimeType === undefined) {
            mimeType = 'text/html'
        }
        // get source and parse it
        const _source = parser.parseFromString(source, mimeType);
        // get template Id 
        const _getTemplateId = _source.getElementById(templateId);
        // clone template Id
        const _cloneTemplate = _getTemplateId.content.cloneNode(true);
        // append template to target selector on index.html 
        const _targetId = document.getElementById(targetId);
        _targetId.appendChild(_cloneTemplate);
    },
    getString(source, templateId, targetId, mimeType) {
        // get the template string and parseit
        this.parseSource(source, templateId, targetId, mimeType);

        return this;
    },
    fetchTemplate(source, templateId, targetId, mimeType) {
        fetch(baseURL + source)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // get the template and parseit
                this.parseSource(html, templateId, targetId, mimeType);
            })
            .finally(() => {
                // once the footer is loaded start functions
                if (templateId === 'footerTemplate') {
                    dropDown();
                }
            })
            .catch((err) => {
                // log error
                console.log('catch error:', err);
            })

        return this;
    },
};

document.addEventListener("DOMContentLoaded", () => {

    // Check for subtitle then added to layout
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

    // 1. generate page layout from string
    // 2. move page content to layout
    // 3. fetch navigation
    // 4. fetch footer
    const layout = Template.getString(`
    <template id="layoutTemplate">
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
    </template>
    `, 'layoutTemplate', 'root')
        .getTemplate('contentTemplate', 'content')
        .fetchTemplate('/templates/main-min.html', 'navTemplate', 'header')
        .fetchTemplate('/templates/main-min.html', 'footerTemplate', 'footerContent');
    // always leave footer at the end for toggles to work

});
