const request = require('request-promise-native');
const formatURL = require('../utils/device-constants');

class DeviceController {

    constructor(platformURL, token) {
        this.platformURL = platformURL;
        this.token = token;
    }

    createDevice(device) {
        return request.post(`${this.platformURL}/device`, {
            headers: { 'Authorization': `Bearer ${this.token}` },
            body: device,
            json: true
        })
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getOneDevice(id) {
        return request.get(`${this.platformURL}/template/${id}`, formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getDevices() {
        return request.get(`${this.platformURL}/device`, formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getDeviceByTemplate(template_id) {
        return request.get(`${this.platformURL}/device/template/${template_id}`, formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getDeviceData(id, attribute, lastN) {
        return request.get(formatURL.deviceData(this.platformURL, id, attribute, lastN), formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getDeviceHistory(id, attribute, dateFrom, dateTo, lastN) {
        return request.get(formatURL.deviceHistory(this.platformURL, id, attribute, dateFrom, dateTo, lastN), formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

}

module.exports = DeviceController;