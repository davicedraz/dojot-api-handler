const request = require('request-promise-native');

module.exports.login = async (req, res) => {
    const result = await authorization(req, res);
    if (result) {
        res.json(result);
    }
};

authorization = async (req, res, next) => {
    const options = {
        method: 'POST',
        url: `${process.env.PLATFORM_URL}/auth`,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: {
            username: req.body.username,
            passwd: req.body.passwd
        },
        json: true
    };
    return await request(options).then(response => {
        return response;
    }).catch(err => { return err });
};


