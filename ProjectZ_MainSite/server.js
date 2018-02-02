const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const wifi = require('node-wifi');

// Connect to Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err);
});

const app = express();
const users = require('./routes/users');
const families = require('./routes/families');
const plants = require('./routes/plants');
const profiles = require('./routes/profiles');
const devices = require('./routes/devices');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.resolve('uploads')));

// Body Praser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Import routes
app.use('/users', users);
app.use('/families', families);
app.use('/plants', plants);
app.use('/profiles', profiles);
app.use('/devices', devices);

app.get('/', (req, res) => {
    res.send('Invalid asd');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server 
app.listen(port, () => {
    //wifi.init({
    //    iface: null // network interface, choose a random wifi interface if set to null
    //});
    //setTimeout(() => {
    //    wifi.scan(function (err, networks) {
    //        if (err) {
    //            console.log(err);
    //        } else {
    //            console.log(networks);
    //            /*
    //            networks = [
    //                {
    //                  ssid: '...',
    //                  bssid: '...',
    //                  mac: '...', // equals to bssid (for retrocompatibility)
    //                  channel: <number>,
    //                  frequency: <number>, // in MHz
    //                  signal_level: <number>, // in dB
    //                  security: 'WPA WPA2' // format depending on locale for open networks in Windows
    //                  security_flags: '...' // encryption protocols (format currently depending of the OS)
    //                  mode: '...' // network mode like Infra (format currently depending of the OS)
    //                },
    //                ...
    //            ];
    //            */
    //        }
    //    });
    //}, 1000);
    
    console.log('server Started on port ' + port);
});