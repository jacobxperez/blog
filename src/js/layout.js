/* @license
 * <https://github.com/jacobxperez/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
import {toggle} from './modules/toggle'
import {Template} from './modules/template'

const Page = new Template()

Page.title = `<h1>${Meta.title}</h1>`

Meta.subtitle === ''
    ? (Page.subtitle = '')
    : (Page.subtitle = `<h2 data-text="h5">${Meta.subtitle}</h2>`)

location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (Page.templateURL =
          window.location.origin + '/templates/index.2a86ff1c.html')
    : (Page.templateURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html')

if (Meta.layout === '') {
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

Page.layout = `
<template id="layoutTemplate">
    <nav data-navbar="top">
        <div id="nav"></div>
    </nav>
    <header data-section="header">
        <div id="header" data-wrapper="fit">
            ${Page.title}
            ${Page.subtitle}
        </div>
    </header>
    <main data-section="main">
        ${Page.content}
    </main>
    <footer data-section="footer">
        <div id="footer" data-wrapper="fit">
        </div>
    </footer>
</template>`

Page.fromString('layoutTemplate', 'root', Page.layout)
    .getTemplate('asideTemplate', 'sidebar')
    .getTemplate('contentTemplate', 'content')
    .fetchTemplate('navTemplate', 'nav', Page.templateURL)
    .fetchTemplate('footerTemplate', 'footer', Page.templateURL)
