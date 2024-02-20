const mongoose = require('mongoose');

const ClassificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

ClassificationSchema.virtual('url').get(function () {
    return `/catalog/classification/${this._id}`;
});

module.exports = mongoose.model('Classification', ClassificationSchema);