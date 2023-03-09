/* @license
 * Rams <https://github.com/jacobxperez/rams/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
------------------------------------------------------------------------------*/
import {toggle} from './modules/toggle'
import {template} from './modules/template'

var templateURL
location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? (templateURL = window.location.origin + '/templates/index.2a86ff1c.html')
    : (templateURL =
          window.location.origin + '/blog/templates/index.6e7a5d68.html')

var subtitle
if (docData.subtitle === '') {
    subtitle = ''
} else {
    subtitle = `<h2 data-text="h5">${docData.subtitle}</h2>`
}

const layout = template
    .fromString(
        'layoutTemplate',
        'root',
        `
    <template id="layoutTemplate">
        <header id="header" data-section="header">
            <div id="headerContent" data-wrapper="fit">
                <h1>${docData.title}</h1>
                ${subtitle}
            </div>
        </header>
        <main id="main" data-section="main">
            <div id="content" data-wrapper="fit" data-grid="main">
            </div>
        </main>
        <footer id="footer" data-section="footer">
            <div id="footerContent" data-wrapper="fit">
            </div>
        </footer>
    </template>
        `
    )
    .getTemplate('asideTemplate', 'content')
    .getTemplate('contentTemplate', 'content')
    .fetchTemplate('navTemplate', 'header', templateURL)
    .fetchTemplate('footerTemplate', 'footerContent', templateURL)
