const request = require('request-promise-native');
const formatURL = require('../utils/user-constants');

class UserController {

    constructor(platformURL, token) {
        this.platformURL = platformURL,
        this.token = token;
    }

    createUser(user) {
        return request.post(`${this.platformURL}/auth/user`, {
            headers: { 'Authorization': `Bearer ${this.token}` },
            body: user,
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

    getUsers() {
        return request.get(`${this.platformURL}/auth/user`, formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    getOneUser(id) {
        return request.get(`${this.platformURL}/auth/user/${id}`, formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

    updateOneUser(id, newUser) {
        return request.put(`${this.platformURL}/auth/user/${id}`, {
            headers: { 'Authorization': `Bearer ${this.token}` },
            body: newUser,
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

    deleteOneUser(id) {
        return request.delete(`${this.platformURL}/auth/user/${id}`, formatURL.getHeaders(this.token))
            .then(result => {
                if (result) {
                    return result;
                } else {
                    return { status: 404 };
                }
            }).catch(err => { return { status: err.statusCode, message: err.message } });
    }

}

module.exports = UserController;