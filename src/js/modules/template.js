import {toggle} from './toggle'

class Template {
    constructor(title, subtitle, content, templateURL) {
        this.title = title
        this.subtitle = subtitle
        this.content = content
        this.templateURL = templateURL
        this.parser = new DOMParser()
    }
    #copyPasteTemplate(templateID, targetID, _source) {
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
    #parseTemplate(templateID, targetID, source, mimeType = 'text/html') {
        // get template source and parse it
        const parseTemplate = this.parser.parseFromString(source, mimeType)
        // copy paste parse source from template to target
        this.#copyPasteTemplate(templateID, targetID, parseTemplate)
    }
    getTemplate(templateID, targetID) {
        new Promise((resolve, reject) => {
            // check if template exist if not reject
            templateID ? resolve() : reject()
        })
            .then(() => this.#copyPasteTemplate(templateID, targetID, document))
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
            .then(() => this.#parseTemplate(templateID, targetID, source))
            .catch((err) => console.error(err))

        return this
    }
    fetchTemplate(templateID, targetID, source, mimeType) {
        fetch(source)
            // when the source is loaded convert to text
            .then((response) => response.text())
            .then((source) =>
                this.#parseTemplate(templateID, targetID, source, mimeType)
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
