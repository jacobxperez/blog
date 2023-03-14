/* @license
 * <https://github.com/jacobxperez/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
import {toggle} from './modules/toggle'
import {aside} from './partials/aside'
import {Template} from './modules/template'

let Page = new Template()

let {header, content, layout} = Page

let subtitle
Meta.subtitle === null
    ? (subtitle = '')
    : (subtitle = `<h2 data-text="h5">${Meta.subtitle}</h2>`)

// page header
header = `
    <div id="header" data-wrapper="fit">
        <h1>${Meta.title}</h1>
        ${subtitle}
    </div> 
    `

// check for layout type
if (Meta.layout === null) {
    content = `
    <div id="content" data-wrapper="fit" data-grid="main">
    </div>
    `
} else if (Meta.layout === 'post') {
    content = `
    <div data-wrapper="fit" data-grid="main">
        <aside id="sidebar"></aside>
        <article id="content"></article>
    </div>
    `
} else if (Meta.layout === 'default') {
    content = `
    <div data-wrapper="fit" data-grid="main">
        <aside id="sidebar">${aside}</aside>
        <article id="content"></article>
    </div>
    `
}

// check and sets url for localhost or for public url
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (fetchURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (fetchURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html')

// create main layout
layout = `
    <template id="layoutTemplate">
        <nav data-navbar="top">
            <div id="nav"></div>
        </nav>
        <header data-section="header">
            ${header}
        </header>
        <main data-section="main">
            ${content}
        </main>
        <footer data-section="footer">
            <div id="footer" data-wrapper="fit">
            </div>
        </footer>
    </template>
    `

// parse everything together
Page.fromString('layoutTemplate', 'root', layout)
    .getTemplate('asideTemplate', 'sidebar')
    .getTemplate('contentTemplate', 'content')
    .fetchTemplate('navTemplate', 'nav', fetchURL, toggle)
    .fetchTemplate('footerTemplate', 'footer', fetchURL)
