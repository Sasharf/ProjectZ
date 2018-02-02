const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const config = require('../config/database');

// User Schema
const DeviceSchema = mongoose.Schema({
    mac: {
        type: String,
        required: true
    },
    info: {
        type: String
    },
    linkedTo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
});

const Device = module.exports = mongoose.model('Device', DeviceSchema);

module.exports.getDeviceById = function (id, callback) {
    Device.findById(id, callback);
}
module.exports.getDeviceByMac = function (mac, callback) {
    query = {mac: mac};
    Device.findOne(query, callback);
}
module.exports.addDevice = function (newDevice, callback) {
    newDevice.save(callback);
}
module.exports.getAllDevices = function (callback) {
    Device.find(callback);
}
module.exports.getDeviceByEmail = function (email, callback) {
    query = { linkedTo: email };
    Device.find(query, callback).populate('profile');
}
module.exports.updateDevice = function (updatedDevice, callback) {
    Device.findByIdAndUpdate(updatedDevice._id, updatedDevice, callback);
}