const request = require('request-promise-native');

const format = require('../util/_functions');

//// #region GET

//Example: http://localhost:3001/template{?page_size,page_num,attr_format}
//Example: http://localhost:3001/template/{template_id}
module.exports.getTemplate = (req, res) => {
    format._getResponse(req, res, format._getTemplateUrl(req.originalUrl), req.headers.jwt);
};

//Example: http://localhost:3001/device{?page_size,page_num,idsOnly,attr,label}
//Example: http://localhost:3001/device/{device_id}
module.exports.getDevice = (req, res) => {
    format._getResponse(req, res, format._getDeviceUrl(req.originalUrl), req.headers.jwt);
};

//Example: http://localhost:3001/device/template/{template_id}{?page_size,page_num}
module.exports.getDeviceTemplate = (req, res) => {
    format._getResponse(req, res, format._getDeviceUrl(req.originalUrl), req.headers.jwt);
};

//Example: http://localhost:3001/socket/
module.exports.connectSocket = (req, res) => {
    const requestOptions = format._createRequestOptions(format._getTokenUrl(), req.headers, req.headers.jwt);
     request(requestOptions)
        .then(response => {
            res.json({ token: response.token, url: process.env.PLATFORM_URL });
        })
        .catch(error => {
            res.send(error);
        });
};

//Example: http://localhost:8000/history/device/{device_id}/history?lastN={lastN}&attr={attr}
module.exports.getHistory = (req, res) => {
    format._getResponse(req, res, format._getHistoryUrl(req.originalUrl), req.headers.jwt);
};

//Example: http://localhost:8000/STH/v1/contextEntities/type/{device_type}/id/{device_id}/attributes/{attr}?hLimit={hLimit}&dateFrom={dateFrom}&dateTo={dateTo}
//Example: http://localhost:8000/STH/v1/contextEntities/type/{device_type}/id/{device_id}/attributes/{attr}?lastN={lastN}&dateFrom={dateFrom}&dateTo={dateTo}
module.exports.getSth = (req, res) => {
    format._getResponse(req, res, format._getSthUrl(req.originalUrl), req.headers.jwt);
};

//#endregion


//// #region POST

//Register a new template
//Example: http://localhost:3001/template?/?*
module.exports.newTemplate = (req, res) => {
    const requestOptions = format._createRequestOptions(format._getTemplateUrl(req.originalUrl), req.headers);
    requestOptions.method = 'POST';
    requestOptions.body = {
        label: req.body.label,
        attrs: req.body.attrs
    };
    request(requestOptions)
        .then(response => {
            res.json({ id: response.template.id })
        })
        .catch(error => res.send(error));
};


//Register a new device
//Example: http://localhost:3001/device{?count,verbose}
module.exports.newDevice = (req, res) => {
    const requestOptions = format._createRequestOptions(format._getDeviceUrl(req.originalUrl), req.headers);
    requestOptions.method = 'POST';
    requestOptions.body = {
        label: req.body.label,
        templates: req.body.templates,
    };
    request(requestOptions)
        .then(response => {
            res.json({ id: response.devices[0].id })
        })
        .catch(error => res.status(500).send(error));
};

module.exports.flow = (req, res) => {
    console.log(req);
    console.log(req.body);
};

module.exports.setNotifications = (req, res) => {
    const element = req.body.contextResponses[0].contextElement[0];
    const topic = `/device/${element.id}`;
    const data = element.attributes.map(attr => {
        return { name: attr.name, value: attr.value };
    });
    io.emit(topic, {
        data: JSON.stringify(data)
    });
    res.send('ok');
};

module.exports.setSubscribe = (req, res) => {
    const requestOptions = format._createRequestOptions(`${process.env.PLATFORM_URL}/subscription`, req.headers);
    requestOptions.method = 'POST';
    requestOptions.body = {
        subject: {
            entities: {
                id: req.body.id,
            },
            condition: {
                attrs: req.body.attributes
            }
        },
        notification: {
            attrs: req.body.attributes,
            receiver: `${process.env.PLATFORM_URL}/notifications`,
            topic: "device-notification"
        }
    };
    request(requestOptions)
        .then(response => res.json(response))
        .catch(error => { res.send(error) });
};

//#endregion


//// #region PUT

//Replaces all attributes from a specific template
//Example: http://localhost:3001/template/{template_id}
module.exports.updateTemplate = (req, res) => {
    const requestOptions = format._createRequestOptions(format._getTemplateUrl(req.originalUrl), req.headers);
    requestOptions.method = 'PUT';
    requestOptions.body = {
        label: req.body.label,
        attrs: req.body.attrs
    };
    request(requestOptions)
        .then(response => res.json(response))
        .catch(error => res.status(500).send(error))
};

//Updates a devices configuration
//Example: http://localhost:3001/device/{deviceid}
//Example: http://localhost:3001/device/{deviceid}/actuate
module.exports.updateDevice = (req, res) => {
    const requestOptions = format._createRequestOptions(format._getDeviceUrl(req.originalUrl), req.headers);
    requestOptions.method = 'PUT';
    requestOptions.body = {
        label: req.body.label,
        templates: req.body.templates,
    };
    request(requestOptions)
        .then(response => res.json(response))
        .catch(error => res.status(500).send(error));
};

//#endregion


//// #region DELETE

//Example: http://localhost:3001/template/{template_id}
module.exports.deleteTemplate = (req, res) => {
    format._getResponse(req, res, format._getTemplateUrl(req.originalUrl), req.headers.jwt);
};

//     //Example: http://localhost:3001/device/{device_id}
module.exports.deleteDevice = (req, res) => {
    format._getResponse(req, res, format._getDeviceUrl(req.originalUrl), req.headers.jwt);
};

//#endregion