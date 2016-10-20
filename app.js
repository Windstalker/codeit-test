const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const {
  OUTPUT_DIR,
  DEPLOY_DIR,
} = require('./package.json').buildConfig;

const frontendDir = (process.env.NODE_ENV !== 'development') ? DEPLOY_DIR : OUTPUT_DIR;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, `${frontendDir}/index.html`));
});

app.use('/api', api);

// Placed here to prevent blocking /api/ calls via vreating folder `api` in ./public
app.use(express.static(path.join(__dirname, frontendDir)));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});


module.exports = app;
