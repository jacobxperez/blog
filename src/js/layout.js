/* @license
 * <https://github.com/jacobxperez/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
import {toggle} from './modules/toggle'
import {Template} from './modules/template'

const Page = new Template()

let subtitle
Meta.subtitle === null
    ? (subtitle = '')
    : (subtitle = `<h2 data-text="h5">${Meta.subtitle}</h2>`)

// page header
Page.header = `
    <div id="header" data-wrapper="fit">
        <h1>${Meta.title}</h1>
        ${subtitle}
    </div>`

// page navigation
Page.nav = `<div id="nav"></div>`

// check for layout type
if (Meta.layout === null) {
    Page.content = `
    <div id="content" data-wrapper="fit" data-grid="main">
    </div>`
} else if (Meta.layout === 'post') {
    Page.content = `
    <div data-wrapper="fit" data-grid="main">
        <aside id="sidebar"></aside>
        <article id="content"></article>
    </div>`
}

// page footer
Page.footer = `<div id="footer" data-wrapper="fit"></div>`

// check and sets url for localhost or for public url
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (Page.fetchURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (Page.fetchURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html')

// create main layout
Page.layout = `
    <template id="layoutTemplate">
        <nav data-navbar="top">
            ${Page.nav}
        </nav>
        <header data-section="header">
            ${Page.header}
        </header>
        <main data-section="main">
            ${Page.content}
        </main>
        <footer data-section="footer">
            ${Page.footer}
        </footer>
    </template>`

// parse everything together
Page.fromString('layoutTemplate', 'root', Page.layout)
    .getTemplate('asideTemplate', 'sidebar')
    .getTemplate('contentTemplate', 'content')
    .fetchTemplate('navTemplate', 'nav', Page.fetchURL)
    .fetchTemplate('footerTemplate', 'footer', Page.fetchURL)
