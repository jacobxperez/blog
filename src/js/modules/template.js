class Template {
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
        // get source and parse it
        return this.parser.parseFromString(source, 'text/html');
    }
    #appendTemplate(templateID, targetID, source) {
        // get template ID from source
        const _getTemplateID = source.getElementById(templateID);
        // clone template ID from source
        const _cloneTemplate = _getTemplateID.content.cloneNode(true);
        // get target ID from page
        const _targetID = document.getElementById(targetID);
        // append template to target ID
        _targetID.appendChild(_cloneTemplate);
        // delete original template from document
        _getTemplateID.remove();
    }
    #parseTemplate(templateID, targetID, source) {
        // get template source and parse it
        const _parseTemplate = this.#parseSource(source);
        // append source template to target ID
        this.#appendTemplate(templateID, targetID, _parseTemplate);
    }
    getTemplate(templateID, targetID, callback) {
        new Promise((resolve, reject) => {
            // check if template exist if not reject
            templateID ? resolve() : reject();
        })
            .then(() => this.#appendTemplate(templateID, targetID, document))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err, 'Error: Template not found'));

        return this;
    }
    fromString(templateID, targetID, source, callback) {
        new Promise((resolve, reject) => {
            // check if source is string
            typeof source === 'string'
                ? resolve()
                : reject((err = 'Error: Source is not a String'));
        })
            .then(() => this.#parseTemplate(templateID, targetID, source))
            .then(() => {
                // optional: a callback function gets executed
                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch((err) => console.error(err));

        return this;
    }
    fetchTemplate(templateID, targetID, source, callback) {
        fetch(source)
            // when the source is loaded convert to text
            .then((response) => response.text())
            .then((source) => this.#parseTemplate(templateID, targetID, source))
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

export {Template};
