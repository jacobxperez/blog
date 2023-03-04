import {toggle} from './toggle'

const template = {
    parser: new DOMParser(),
    _copyPasteTemplate(templateID, targetID, _source) {
        // get template ID from source
        const _getTemplateID = _source.getElementById(templateID)
        // clone template ID from source
        const _cloneTemplate = _getTemplateID.content.cloneNode(true)
        // get target ID from page
        const _targetID = document.getElementById(targetID)
        // append template to target ID
        _targetID.appendChild(_cloneTemplate)
        // delete original template from document
        _getTemplateID.remove()
    },
    _parseSource(source, templateID, targetID, mimeType) {
        if (mimeType === undefined) mimeType = 'text/html'
        // get source and parse it
        const _source = this.parser.parseFromString(source, mimeType)
        this._copyPasteTemplate(templateID, targetID, _source)
    },
    getTemplate(templateID, targetID, _source = document) {
        new Promise((resolve, reject) => {
            // check if template exist if not reject
            templateID ? resolve() : reject()
        })
            .then(() => this._copyPasteTemplate(templateID, targetID, _source))
            .catch((err) => console.error(err))

        return this
    },
    fromString(source, templateID, targetID, mimeType) {
        new Promise((resolve, reject) => {
            // check if source is string
            typeof source === 'string'
                ? resolve()
                : reject((err = 'Error: Source is not a String'))
        })
            .then(() =>
                this._parseSource(source, templateID, targetID, mimeType)
            )
            .catch((err) => console.error(err))

        return this
    },
    fetchTemplate(source, templateID, targetID, mimeType) {
        fetch(source)
            // when the source is loaded convert to text
            .then((response) => response.text())
            .then((text) =>
                this._parseSource(text, templateID, targetID, mimeType)
            )
            .catch((err) => console.error(err))
            .finally(() => {
                // once the footer is loaded start toggles
                if (templateID === 'footerTemplate') toggle()
            })

        return this
    },
}

export {template}
