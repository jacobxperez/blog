/* Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
// Check if site is on local host
location.hostname === "localhost" || location.hostname === "127.0.0.1" ? baseURL = window.location.origin : baseURL = window.location.origin + '/blog';

// Initialize the DOM for parsing Templates
var parser = new DOMParser();

// Page Data
var Data = {
    title: document.title,
    subTitle: null,
    author: document.querySelector('[name=author]').content,
};

const dropDown = () => {
    const getToggle = document.querySelectorAll('[data-toggle]');
    const getPop = document.querySelectorAll('[data-toggle="pop"]');
    const getToolTip = document.querySelectorAll('[data-tooltip]');

    function toggle(trigger) {
        trigger.hasAttribute('data-state', 'active') === false ?
            trigger.setAttribute('data-state', 'active') :
            trigger.removeAttribute('data-state');
    }

    // toggle dropdwon
    for (let i = 0; i < getToggle.length; i++) {
        getToggle[i].addEventListener("click", function (e) {
            toggle(this);
            e.stopPropagation();
        })
    };

    // toggle tooltip
    for (let i = 0; i < getToolTip.length; i++) {
        getToolTip[i].addEventListener("click", function (e) {
            toggle(this);
            e.stopPropagation();
        })
    };

    // Close dropdown and tooltips on document click
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
    fromString(source, templateId, targetId) {
        // get string and parse it
        const _source = parser.parseFromString(source, 'text/html');
        // get selector from parsed string
        const _getTemplateId = _source.getElementById(templateId);
        // append to target selector on index.html 
        const _getTargetId = document.getElementById(targetId);
        _getTargetId.appendChild(_getTemplateId);

        return this;
    },
    fetchTemplate(source, templateId, targetId) {
        fetch(baseURL + source)
            .then((response) => {
                // when the template is loaded
                return response.text();
            })
            .then((html) => {
                // get the template and parseit
                const _source = parser.parseFromString(html, 'text/html');
                const _getTemplateId = _source.getElementById(templateId);
                // clone template from source 
                const _cloneTemplate = _getTemplateId.content.cloneNode(true);
                // append to target selector on index.html 
                const _targetId = document.getElementById(targetId);
                _targetId.appendChild(_cloneTemplate);
            })
            .catch((err) => {
                // error messege 
                console.log('Error: faild to catch template', err);
            })
            .finally(() => {
                // once the footer is loaded start functions
                if (templateId === 'footerTemplate') {
                    dropDown();
                }
            })

        return this;
    },
};

document.addEventListener("DOMContentLoaded", () => {

    // Check for subtitle
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
    const layout = Template.fromString(`
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
    `, 'layout', 'root')
        .getTemplate('contentTemplate', 'content');

    // fetch navigation and footer
    const elements = Template.fetchTemplate('/templates/main-min.html', 'navTemplate', 'header')
        .fetchTemplate('/templates/main-min.html', 'footerTemplate', 'footerContent');
    // always leave footer at the end for toggles to work

});
