const express = require('express');
const bodyParser = require('body-parser');

const webRoutes = require('./routes/web-routes');
const apiRoutes = require('./routes/api-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

//Routes
app.use('/', webRoutes);
app.use('/api', apiRoutes);

//Errors Handling for Unsupported Routes
app.use((req, res, next) => {
    const error = new HttpError('could not find this route.', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknow eror occurred!'});
});

app.listen(5000);