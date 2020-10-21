const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
var bodyParser = require('body-parser')

/** Inicializations */
const app = express();
app.use(cors());
app.options('*', cors());

/** Settings */
app.set('port', process.env.PORT || 4000);

/** Middelwears */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** Routes */
app.use('/pie', require('./routes/pie'));
app.use('/deletepies', require('./routes/deletePies'))

/** Public (Not used yet)*/
app.use(express.static(path.join(__dirname, 'public')));

/** Starting server */
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
})