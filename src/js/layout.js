/* @license
 * <https://github.com/jacobxperez/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
import {toggle} from './modules/toggle'
import {template} from './modules/template'

var title = `<h1>${docData.title}</h1>`

var subtitle
if (docData.subtitle === '') {
    subtitle = ''
} else {
    subtitle = `<h2 data-text="h5">${docData.subtitle}</h2>`
}

var templateURL
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (templateURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (templateURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html')

const defaultLayout = `
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
        <div id="content" data-wrapper="fit" data-grid="main">
        </div>
    </main>
    <footer data-section="footer">
        <div id="footer" data-wrapper="fit">
        </div>
    </footer>
</template>
`

const layout = template
    .fromString('layoutTemplate', 'root', defaultLayout)
    .getTemplate('asideTemplate', 'content')
    .getTemplate('contentTemplate', 'content')
    .fetchTemplate('navTemplate', 'nav', templateURL)
    .fetchTemplate('footerTemplate', 'footer', templateURL)
