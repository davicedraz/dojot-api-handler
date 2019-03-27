const request = require('request-promise-native');
const formatURL = require('../utils/template-constants');

class TemplateController {

    constructor(platformURL, token) {
        this.platformURL = platformURL,
        this.token = token;
    }

    createTemplate(template) {
        return request.post(`${this.baseUrl}/template`, {
            headers: { 'Authorization': `Bearer ${this.token}` },
            body: template,
            json: true
        })
            .then(result => {
                if (result.result === 'ok') {
                    return result.template;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getTemplates(label) {
        return request.get(formatURL.templates(this.platformURL, label), formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getOneTemplate(id) {
        return request.get(`${this.baseUrl}/template/${id}?attr_format=split`, formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

}

module.exports = TemplateController;