const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true },
});

CompanySchema.virtual('url').get(function () {
    return `/catalog/company/${this._id}`;
});

module.exports = mongoose.model('Company', CompanySchema);