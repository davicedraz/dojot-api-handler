const request = require('request-promise-native');

class AuthenticationController {

    constructor(platformUrl, username, passwd) {
        this.platformUrl = platformUrl;
        this.username = username;
        this.passwd = passwd;
    }

    getToken() {
        return this.login(this.username, this.passwd)
            .then((result) => {
                if (result.jwt) {
                    return result.jwt;
                }
            }).catch(err => err);
    };

    async login(username, passwd) {
        const options = {
            method: 'POST',
            url: `${this.platformUrl}/auth`,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: {
                username,
                passwd
            },
            json: true
        };
        return await request(options).then(response => {
            if (response) {
                return response;
            }
            return { code: 500 };
        }).catch(err => { throw err });
    };

}

module.exports = AuthenticationController;