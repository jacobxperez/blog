/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
// Check if site is on local host
location.hostname === "localhost" || location.hostname === "127.0.0.1" ? baseURL = window.location.origin : baseURL = window.location.origin + '/blog';

// Page Data
var Data = {
    title: document.title,
    subTitle: null,
    // author: document.querySelector('[name=author]').content,
};

// Initialize the DOM for parsing Templates
var parser = new DOMParser();

// toggles
const dropDown = () => {
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
            })
        }
    };

    toggleAttr(getToggle);
    toggleAttr(getToolTip);

    // removes attribute
    function removeAtt(event, selector) {
        for (let i = 0; i < selector.length; i++) {
            if (event.target !== selector[i]) {
                selector[i].removeAttribute('data-state');
            }
        }
    };

    // Close dropdown and tooltips on document click
    document.addEventListener("click", function (e) {
        removeAtt(e, getPop);
        removeAtt(e, getToolTip);
    });
};

const Template = {
    getTemplate(source, targetId) {
        // get template source
        const _getTemplate = document.getElementById(source).content;
        // copy template
        const _importTemplate = document.adoptNode(_getTemplate);
        // append template to target ID
        document.getElementById(targetId).appendChild(_importTemplate);

        return this;
    },
    getString(source, templateId, targetId, mimeType = 'text/html') {
        // get string and parse it
        const _source = parser.parseFromString(source, mimeType);
        // get selector from parsed string
        const _getTemplateId = _source.getElementById(templateId);
        // append to target selector on index.html 
        const _getTargetId = document.getElementById(targetId);
        _getTargetId.appendChild(_getTemplateId);

        return this;
    },
    fetchTemplate(source, templateId, targetId, mimeType = 'text/html') {
        fetch(baseURL + source)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // get the template and parseit
                const _source = parser.parseFromString(html, mimeType);
                const _getTemplateId = _source.getElementById(templateId);
                // clone template from source 
                const _cloneTemplate = _getTemplateId.content.cloneNode(true);
                // append to target selector on index.html 
                const _targetId = document.getElementById(targetId);
                _targetId.appendChild(_cloneTemplate);
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
    <div id="layout">
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
    </div>
    `, 'layout', 'root')
        .getTemplate('contentTemplate', 'content')
        .fetchTemplate('/templates/main-min.html', 'navTemplate', 'header')
        .fetchTemplate('/templates/main-min.html', 'footerTemplate', 'footerContent');
    // always leave footer at the end for toggles to work

});
