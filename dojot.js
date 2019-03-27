const authCtrl = require('./controllers/authentication-controller');
const templateCtrl = require('./controllers/template-controller');
const deviceCtrl = require('./controllers/device-controller');
const userCtrl = require('./controllers/user-controller');

class Dojot {

    constructor(config) {
        this.platformURL = config.platformURL;
        this.username = config.credentials.username;
        this.passwd = config.credentials.passwd;
    }

    init() {
        this.authentication = new authCtrl(this.platformURL, this.username, this.passwd);
        return this.authentication.getToken()
            .then(token => {
                this.templates = new templateCtrl(this.platformURL, token);
                this.devices = new deviceCtrl(this.platformURL, token);
                this.users = new userCtrl(this.platformURL, token);
                return this;
            }).catch(err => console.log(err));
    }

}

module.exports = Dojot;