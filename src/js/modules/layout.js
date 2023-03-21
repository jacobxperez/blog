/* @license
 * Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
import {sidebar} from './sidebar.js';
import {toggle} from './toggle';

if (template.title === '') {
    template.title = `<h1>Jacob Perez</h1>`;
} else {
    template.title = `<h1>${template.title}</h1>`;
}

if (template.subtitle !== '') {
    template.subtitle = `<h2 data-text="h5">${template.subtitle}</h2>`;
}

// template header
template.header = `
    <div id="header" data-wrapper="fit">
        ${template.title}
        ${template.subtitle}
    </div>`;

// check for layout type
template.main = `
    <div data-wrapper="fit" data-grid="main">
        <aside id="aside"></aside>
        <article id="content"></article>
    </div>`;
if (template.type === 'full') {
    template.main = `
    <div id="content" data-wrapper="fit" data-grid="main">
    </div>`;
}

// check and set template url for localhost or for public url
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (template.fetchURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (template.fetchURL =
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
    .fetchTemplate(template.fetchURL, 'nav', toggle)
    .fetchTemplate(template.fetchURL, 'footer');
