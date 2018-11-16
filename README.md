# dojot-api-handler

This is a component that maps and lets you add the entire Dojot public API to your application.

## How to Setup

First, create a .env file and set following variables:
* PLATFORM_URL (has to be the URL where the Dojot platform runs)
* SERVER_PORT (has to be the URL where this server runs)

Just need to import it in main of your application:

```Javascript
const dojotRouter = require('dojot-api-handler');
```


Then you can build your application with your favorite tools

```Javascript
const dojotRouter = require('dojot-api-handler');

let express = require('express');

let bodyParser = require('body-parser');
var cors = require('cors');

require('dotenv').config()

let app = express();
const http = require('http').Server(app);

const context = {
  port: process.env.SERVER_PORT,
  platform_url: process.env.PLATFORM_URL,
  http: http,
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

dojotRouter(app);

http.listen(context.port, () => {
  console.log('Express server listening on port ' + context.port);
});

```
Now your application is ready to receive and passes the requests to the instance of the Dojot platform it is running. Feel free to add endpoints, database and other features to your API!