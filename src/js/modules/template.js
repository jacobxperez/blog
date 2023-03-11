import {toggle} from './toggle'

class Template {
    constructor(title, subtitle, content, templateURL) {
        this.title = title
        this.subtitle = subtitle
        this.content = content
        this.templateURL = templateURL
        this.parser = new DOMParser()
    }
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
    }
    _parseSource(templateID, targetID, source, mimeType) {
        if (mimeType === undefined) mimeType = 'text/html'
        // get source and parse it
        const parseSource = this.parser.parseFromString(source, mimeType)
        // copy paste parse source from template to target
        this._copyPasteTemplate(templateID, targetID, parseSource)
    }
    getTemplate(templateID, targetID) {
        new Promise((resolve, reject) => {
            // check if template exist if not reject
            templateID ? resolve() : reject()
        })
            .then(() => this._copyPasteTemplate(templateID, targetID, document))
            .catch((err) => console.error(err, 'Error: Template not found'))

        return this
    }
    fromString(templateID, targetID, source) {
        new Promise((resolve, reject) => {
            // check if source is string
            typeof source === 'string'
                ? resolve()
                : reject((err = 'Error: Source is not a String'))
        })
            .then(() => this._parseSource(templateID, targetID, source))
            .catch((err) => console.error(err))

        return this
    }
    fetchTemplate(templateID, targetID, source, mimeType) {
        fetch(source)
            // when the source is loaded convert to text
            .then((response) => response.text())
            .then((source) =>
                this._parseSource(templateID, targetID, source, mimeType)
            )
            .catch((err) => console.error((err = 'Error: Template not found')))
            .finally(() => {
                // loaded toggle after navigation
                if (templateID === 'navTemplate') toggle()
            })

        return this
    }
}

export {Template}
