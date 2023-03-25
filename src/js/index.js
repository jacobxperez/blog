/* @license
 * Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
const meta = {
    title: document.title,
    subtitle: '',
    author: {
        name: '',
        url: '',
    },
    date: {
        published: '',
        revised: '',
    },
    set authorName(name) {
        this.author.name = name;
    },
    get authorName() {
        return this.author.name;
    },
    set authorUrl(url) {
        this.author.url = url;
    },
    get authorUrl() {
        return this.author.url;
    },
    set datePublished(date) {
        this.date.published = date;
    },
    get datePublished() {
        return this.date.published;
    },
    set dateRevised(date) {
        this.date.revised = date;
    },
    get dateRevised() {
        return this.date.revised;
    },
};

const template = {
    type: '',
    body: '',
    header: '',
    nav: '',
    main: '',
    article: '',
    section: '',
    aside: '',
    footer: '',
    fetchURL: '',
    _parseSource(source) {
        const parser = new DOMParser();
        return parser.parseFromString(source, 'text/html');
    },
    _appendString(source, targetSelector) {
        // get target id
        const _targetSelector = document.querySelector(targetSelector);
        // append source to target id
        _targetSelector.insertAdjacentHTML('beforeend', source);
    },
    _appendTemplate(source, templateSelector, targetSelector) {
        // get source from template id
        const _getTemplateSelector = source.querySelector(templateSelector);
        // clone template id from source
        const _cloneTemplate = _getTemplateSelector.content.cloneNode(true);
        // get target id from document
        const _targetSelector = document.querySelector(targetSelector);
        // append template to target id
        _targetSelector.appendChild(_cloneTemplate);
        // delete original template from document
        _getTemplateSelector.remove();
    },
    _parseTemplate(source, templateSelector, targetSelector) {
        // get template source and parse it
        const _parsedSource = this._parseSource(source);
        // append source template to target id
        this._appendTemplate(_parsedSource, templateSelector, targetSelector);
    },
    getAndSetTemplate(templateSelector, targetSelector, callback) {
        new Promise((resolve, reject) => {
            // check if template exist if not reject
            templateSelector ? resolve() : reject();
        })
            .then(() =>
                this._appendTemplate(document, templateSelector, targetSelector)
            )
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err, 'Error: Template not found'));

        return this;
    },
    fromString(string, targetSelector, callback) {
        new Promise((resolve, reject) => {
            // check if source is string
            typeof string === 'string'
                ? resolve()
                : reject((err = 'Error: Source is not a String'));
        })
            .then(() => this._appendString(string, targetSelector))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err));

        return this;
    },
    fetchTemplate(url, targetSelector, callback) {
        (async () => {
            try {
                // fetch url
                let response = await fetch(url);
                // check if response is ok
                let okay = await response.text();
                this._parseTemplate(okay, targetSelector, targetSelector);
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            } catch (err) {
                console.error(err, 'Error: Template not found');
            }
        })();

        return this;
    },
};
