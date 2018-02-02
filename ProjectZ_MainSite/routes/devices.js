const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Device = require('../models/device');

router.post('/add', (req, res, next) => {
    console.log('Add device attempt:----------------------------------------------- ');

    let newDevice = new Device({
        mac: req.body.mac,
        info: req.body.info,
        linkedTo: "None",
        name: "None"
    });
    Device.addDevice(newDevice, (err, device) => {
        if (err) {
            console.log("-------------------ERR-------------------")
            console.log(err);
            console.log("-------------------ERR-------------------")
            res.json({ success: false, msg: err });
        }
        else {
            console.log("success")
            res.json({ success: true, message: 'Device been added' });
        }
    });
});
router.get('/get', (req, res, next) => {

    console.log('Get all devices attempt:----------------------------------------------- ');

    Device.getAllDevices((err, result) => {
        if (err) {
            res.json({ success: false, msg: err });
        }
        else {
            //console.log(result);
            res.json({ success: true, answer: result });
        }
    });
});

router.post('/link', (req, res, next) => {
    console.log('Link device attempt:----------------------------------------------- ');

    Device.getDeviceByMac(req.body.mac, (err, device) => {
        if (err) throw err
        if (device)
        {
            let updatedDevice = new Device({
                _id: device._id,
                mac: device.mac,
                info: device.info,
                linkedTo: req.body.email,
                name: req.body.name
            });
            console.log(updatedDevice)
            Device.updateDevice(updatedDevice, (err, device) => {
                if (err) {
                    res.json({ success: false, msg: err });
                }
                else {
                    res.json({ success: true, msg: 'Device been linked' });
                }
            });
        }
    });
});

router.post('/getUserDevices', (req, res, next) => {
    console.log('Get user devices attempt:----------------------------------------------- ');
    console.log("email:" + req.body.email)
    Device.getDeviceByEmail(req.body.email, (err, devices) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: "Error accured" });
        }
        else {
            console.log(devices);
            res.json({ success: true, answer: devices });
        }
        
    });
});
module.exports = router;