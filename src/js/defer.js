/* @license
 * Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
import {sidebar} from './modules/sidebar.js';
import {toggle} from './modules/toggle.js';

meta.title = `<h1>${meta.title}</h1>`;

if (meta.subtitle !== '') {
    meta.subtitle = `<h2 data-text="h5">${meta.subtitle}</h2>`;
}

template.header = `
    <div id="header" data-wrapper="fit">
        ${meta.title}
        ${meta.subtitle}
    </div>
    `;

template.main = `
    <div data-wrapper="fit" data-grid="main">
        <aside id="aside"></aside>
        <article id="content"></article>
    </div>
    `;
if (template.type === 'fullPage') {
    template.main = `
    <div id="content" data-wrapper="fit" data-grid="main">
    </div>
    `;
}

location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (template.fetchURL =
          window.location.origin + '/templates/index.2a86ff1c.html')
    : (template.fetchURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html');

template.body = `
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
    </footer>
    `;

template
    .fromString(template.body, 'body')
    .getAndSetTemplate('template', '#content', sidebar)
    .fetchTemplate(template.fetchURL, '#nav', toggle)
    .fetchTemplate(template.fetchURL, '#footer');
