/* @license
 * Jacob Perez <https://jacobxperez.github.io/blog/>
 * Copyright (C) 2023 Jacob Perez <jacobxperez@gmx.com>
 * Licensed under the Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0
-----------------------------------------------------------------------------*/
const template = {
    type: '',
    header: '',
    nav: '',
    main: '',
    article: '',
    section: '',
    aside: '',
    footer: '',
    layout: '',
    fetchURL: '',
    title: '',
    subtitle: '',
    author: '',
    date: {
        published: '',
        revised: '',
    },
    getTitle() {
        return (this.title = document.title);
    },
    getAuthor() {
        return (this.author =
            document.head.querySelector('[name="author"]').content);
    },
    _parseSource(source) {
        const parser = new DOMParser();
        return parser.parseFromString(source, 'text/html');
    },
    _appendString(source, targetID) {
        // get target id
        const _targetID = document.getElementById(targetID);
        // append source to target id
        _targetID.insertAdjacentHTML('beforeend', source);
    },
    _appendTemplate(source, templateID, targetID) {
        // get source from template id
        const _getTemplateID = source.getElementById(templateID);
        // clone template id from source
        const _cloneTemplate = _getTemplateID.content.cloneNode(true);
        // get target id from document
        const _targetID = document.getElementById(targetID);
        // append template to target id
        _targetID.appendChild(_cloneTemplate);
        // delete original template from document
        _getTemplateID.remove();
    },
    _parseTemplate(source, templateID, targetID) {
        // get template source and parse it
        const _parsedSource = this._parseSource(source);
        // append source template to target id
        this._appendTemplate(_parsedSource, templateID, targetID);
    },
    getAndSetTemplate(templateID, targetID, callback) {
        new Promise((resolve, reject) => {
            // check if template exist if not reject
            templateID ? resolve() : reject();
        })
            .then(() => this._appendTemplate(document, templateID, targetID))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err, 'Error: Template not found'));

        return this;
    },
    fromString(string, targetID, callback) {
        new Promise((resolve, reject) => {
            // check if source is string
            typeof string === 'string'
                ? resolve()
                : reject((err = 'Error: Source is not a String'));
        })
            .then(() => this._appendString(string, targetID))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err));

        return this;
    },
    fetchTemplate(url, targetID, callback) {
        (async () => {
            try {
                // fetch url
                let response = await fetch(url);
                // check if response is ok
                let okay = await response.text();
                this._parseTemplate(okay, targetID, targetID);
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
