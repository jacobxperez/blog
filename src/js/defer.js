/* @license
 * Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
import {rams} from './rams/rams.js';
import {sidebar} from './modules/sidebar.js';

// start the toggles
rams.toggle();

meta.title = `<h1>${meta.title}</h1>`;

if (meta.subtitle !== '') {
    meta.subtitle = `<h2 data-text="h4">${meta.subtitle}</h2>`;
}

let header = `
    <div id="header" data-container="fit">
        ${meta.title}
        ${meta.subtitle}
    </div>
    `;

let main = `
    <div data-container="fit" data-grid="main">
        <aside id="aside" data-column="large-3 medium-3 small-4"></aside>
        <article id="content" data-column="large-9 medium-9 small-4"></article>
    </div>
    `;
if (template.type === 'fullPage') {
    main = `
    <div id="content" data-container="fit" data-grid="main">
    </div>
    `;
}

let fetchURL;
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (fetchURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (fetchURL =
          window.location.origin + '/blog/templates/index.aea2e540.html');

let layout = `
    <nav data-navbar="top">
        <div id="nav"></div>
    </nav>
    <header data-section="header">
        ${header}
    </header>
    <main data-section="main">
        ${main}
    </main>
    <footer data-section="footer">
        <div id="footer" data-container="fit">
        </div>
    </footer>
    `;

template
    .fromString(layout, 'body')
    .getAndSetTemplate('template', '#content', sidebar)
    .fetchTemplate(fetchURL, '#nav')
    .fetchTemplate(fetchURL, '#footer');
