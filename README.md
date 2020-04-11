[![npm version](https://badge.fury.io/js/dojot-api-handler.svg)](https://badge.fury.io/js/dojot-api-handler) 
![Maintenance](https://img.shields.io/maintenance/no/2018)


# dojot-api-handler

This is a usefull library to support any Nodejs application that intends to communicate with dojot platform. The library component maps the Dojot endpoints and lets you add the entire Dojot public API to your application. Take a look at http://www.dojot.com.br/ for more.

## How to setup

First of all, you should have a instance of Dojot platform running locally or has access to one. check the installation guide [here](https://dojotdocs.readthedocs.io/en/latest/installation-guide.html) if you don't have yet. 

1. Create a json config file and set, at least, the following variables:

    * platformURL (has to be the URL where the Dojot platform runs on port :8000)
    * credentials (has to be the username and password registered on platform)

    ```JSON
    {
        "platformURL": "http://localhost:8000",
        "credentials": {
            "username": "admin",
            "passwd": "admin"
        }
    }
    ```

2. Import the dojot-api-handler in main of your application.

3. Set your configurations to let the library know how to operate with your Dojot instance.

    ```Javascript
    const dojot = require('dojot-api-handler');
    const config = require('./config.json');

    const dojotRouter = dojot.routes;
    const dojotApi = dojot.api;

    const apiComponents = new dojotApi(config);
    ```

Then you can build your IoT's application with your favorite tools and third-party packages and accessing the Dojot platform [endpoints](https://dojotdocs.readthedocs.io/en/latest/components-and-apis.html#exposed-apis)

```Javascript
const dojot = require('dojot-api-handler');
const config = require('./config.json');

const dojotRouter = dojot.routes;

const dojotApi = dojot.api;
const apiComponents = new dojotApi(config);

const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dojotRouter(app);

const http = require('http').Server(app);

dojotApi.init()
    .then((api => {
        http.listen(3000, () => {
            console.log('Dojot application server listening on port 3000');
        });
    }));
```

Now your application is ready to receive and passes the requests to the instance of the Dojot platform it is running. Feel free to add endpoints, database and other features to your app!
