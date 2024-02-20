const mongoose = require('mongoose');

const InstrumentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    classification: { type: mongoose.Schema.Types.ObjectId, ref: 'Classification', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

InstrumentSchema.virtual('url').get(function () {
    return `/catalog/instrument/${this._id}`;
});

module.exports = mongoose.model('Instrument', InstrumentSchema);