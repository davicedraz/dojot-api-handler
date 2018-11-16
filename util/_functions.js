const config = require('../config.json');
const request = require('request-promise-native');

module.exports._getTemplateUrl = originalUrl => {
    return `${process.env.PLATFORM_URL}/template${originalUrl.replace('/template', '')}`;
};

module.exports._getDeviceUrl = originalUrl => {
    return `${process.env.PLATFORM_URL}/device${originalUrl.replace('/device', '')}`;
};

module.exports._getSthUrl = originalUrl => {
    return `${process.env.PLATFORM_URL}/history/STH/v1/contextEntities${originalUrl.replace('/sth', '')}`;
}

module.exports._getHistoryUrl = originalUrl => {
    return `${process.env.PLATFORM_URL}/history${originalUrl.replace('/history', '')}`;
}

module.exports._getTokenUrl = () => {
    return `${process.env.PLATFORM_URL}/stream/socketio`;
}

module.exports._getSocketQuerry = (token) => {
    return {
        query: {
            token,
        },
        transports: ["polling"],
    }
}

module.exports._createRequestOptions = (url, headers) => {
    return {
        url,
        headers: {
            'fiware-service': headers['fiware-service'] || config.headers['fiware-service'],
            'fiware-servicepath': headers['fiware-servicepath'] || config.headers['fiware-servicepath'],
            'authorization': `Bearer ${headers.jwt}`
        },
        json: true
    }
}

module.exports._getResponse = (req, res, url, authKey) => {
    const requestOptions = this._createRequestOptions(url, req.headers, authKey);
    request(requestOptions)
        .then(response => res.json(response))
        .catch(error => {
            res.send(error);
        });
}