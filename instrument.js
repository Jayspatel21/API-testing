const tracker = require('@middleware.io/node-apm');
tracker.track({
    serviceName: "test01",
    accessToken: "pikghrqkeylgtsrtdavcmpzoslyihcxyrriw",
    customResourceAttributes: {
      "app.version": "1.2.0",
    }
});