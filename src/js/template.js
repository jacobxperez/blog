/* @license
 * Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2022 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
import {sidebar} from './modules/sidebar.js';
import {toggle} from './modules/toggle';
import {Vannelli} from './modules/vannelli';

const template = new Vannelli();

if (meta.title === '') {
    meta.title = `<h1>Jacob Perez</h1>`;
} else {
    meta.title = `<h1>${meta.title}</h1>`;
}

if (meta.subtitle !== '') {
    meta.subtitle = `<h2 data-text="h5">${meta.subtitle}</h2>`;
}

// template header
template.header = `
    <div id="header" data-wrapper="fit">
        ${meta.title}
        ${meta.subtitle}
    </div>`;

// check for layout type
template.main = `
    <div data-wrapper="fit" data-grid="main">
        <aside id="aside"></aside>
        <article id="content"></article>
    </div>`;
if (meta.layout === 'full') {
    template.main = `
    <div id="content" data-wrapper="fit" data-grid="main">
    </div>`;
}

// check and set template url for localhost or for public url
let templateURL;
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (templateURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (templateURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html');

// create main layout
template.layout = `
    <nav data-navbar="top">
        <div id="nav"></div>
    </nav>
    <header data-section="header">
        ${template.header}
    </header>
    <main data-section="main">
        ${template.main}
    </main>
    <footer data-section="footer">
        <div id="footer" data-wrapper="fit">
        </div>
    </footer>`;

// parse everything together
template
    .fromString(template.layout, 'root')
    .getAndSetTemplate('contentTemplate', 'content', sidebar)
    .fetchTemplate(templateURL, 'nav', toggle)
    .fetchTemplate(templateURL, 'footer');
