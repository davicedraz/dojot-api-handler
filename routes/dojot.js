const auth = require('../controllers/auth');
const controller = require('../controllers/dojot');

module.exports = (app) => {
    app.post('/auth', auth.login);

    app.get('/template?/?*', controller.getTemplate);
    app.get('/device?/?*', controller.getDevice);
    app.get('/device/template/*', controller.getDeviceTemplate);
    app.get('/socket', controller.connectSocket);
    app.get('/history/*', controller.getHistory);
    app.get('/sth/*', controller.getSth);

    app.post('/template?/?*', controller.newTemplate);
    app.post('/device?/?*', controller.newDevice);
    app.post('/flow', controller.flow);
    app.post('/notifications', controller.setNotifications);
    app.post('/subscribe', controller.setSubscribe);

    app.put('/template/*', controller.updateTemplate);
    app.put('/device/*', controller.updateDevice);

    app.delete('/template/*', controller.deleteTemplate);
    app.delete('/device/*', controller.deleteDevice);
}