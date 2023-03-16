class Vannelli {
    constructor(header, nav, main, article, section, aside, footer, layout) {
        this.header = header;
        this.nav = nav;
        this.main = main;
        this.article = article;
        this.section = section;
        this.aside = aside;
        this.footer = footer;
        this.layout = layout;
        this.parser = new DOMParser();
    }
    #parseSource(source) {
        // parse source
        return this.parser.parseFromString(source, 'text/html');
    }
    #appendString(source, targetID) {
        // get parsed source
        const _parsedSource = this.#parseSource(source);
        // get target id
        const _targetID = document.getElementById(targetID);
        // append parsed source to target id
        _targetID.appendChild(_parsedSource.body);
    }
    #appendTemplate(source, templateID, targetID) {
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
    }
    #parseTemplate(source, templateID, targetID) {
        // get template source and parse it
        const _parsedSource = this.#parseSource(source);
        // append source template to target id
        this.#appendTemplate(_parsedSource, templateID, targetID);
    }
    getTemplate(templateID, targetID, callback) {
        new Promise((resolve, reject) => {
            // check if template exist if not reject
            templateID ? resolve() : reject();
        })
            .then(() => this.#appendTemplate(document, templateID, targetID))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err, 'Error: Template not found'));

        return this;
    }
    fromString(source, targetID, callback) {
        new Promise((resolve, reject) => {
            // check if source is string
            typeof source === 'string'
                ? resolve()
                : reject((err = 'Error: Source is not a String'));
        })
            .then(() => this.#appendString(source, targetID))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err));

        return this;
    }
    fetchTemplate(source, targetID, callback) {
        fetch(source)
            // when the source is loaded convert to text
            .then((response) => response.text())
            .then((source) => this.#parseTemplate(source, targetID, targetID))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch(() => console.error('Error: Template not found'));

        return this;
    }
}

export {Vannelli};
