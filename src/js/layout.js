/* @license
 * <https://github.com/jacobxperez/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
import {toggle} from './modules/toggle'
import {Template} from './modules/template'

var title = `<h1>${docData.title}</h1>`

var subtitle
docData.subtitle === ''
    ? (subtitle = '')
    : (subtitle = `<h2 data-text="h5">${docData.subtitle}</h2>`)

var templateURL
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (templateURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (templateURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html')

var contentLayout
if (docData.page === 'default') {
    contentLayout = `
    <div id="content" data-wrapper="fit" data-grid="main">
    </div>`
} else if (docData.page === 'post') {
    contentLayout = `
    <div data-wrapper="fit" data-grid="main">
        <aside id="sidebar"></aside>
        <article id="content"></article>
    </div>`
}

const layout = `
<template id="layoutTemplate">
    <nav data-navbar="top">
        <div id="nav"></div>
    </nav>
    <header data-section="header">
        <div id="header" data-wrapper="fit">
            ${title}
            ${subtitle}
        </div>
    </header>
    <main data-section="main">
        ${contentLayout}
    </main>
    <footer data-section="footer">
        <div id="footer" data-wrapper="fit">
        </div>
    </footer>
</template>`

const makeLayout = Template.fromString('layoutTemplate', 'root', layout)
    .getTemplate('asideTemplate', 'sidebar')
    .getTemplate('contentTemplate', 'content')
    .fetchTemplate('navTemplate', 'nav', templateURL)
    .fetchTemplate('footerTemplate', 'footer', templateURL)
