const express = require('express');
const Instrument = require('../models/Instrument');
const Classification = require('../models/Classification');
const Company = require('../models/Company');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    const instrument_count = await Instrument.countDocuments({});
    const classification_count = await Classification.countDocuments({});
    const company_count = await Company.countDocuments({});
    res.render('index', { title: 'Inventory Home', instrument_count, classification_count, company_count });
});
// Display list of all Instruments.
exports.instrument_list = asyncHandler(async (req, res, next) => {
    const list_instruments = await Instrument.find().populate('classification').populate('company');
    res.render('instrument_list', { title: 'Instrument List', list_instruments });
});

// Display detail page for a specific Instrument.
exports.instrument_detail = asyncHandler(async (req, res, next) => {
    const instrument = await Instrument.findById(req.params.id).populate('classification').populate('company');
    res.render('instrument_detail', { title: instrument.name, instrument });
});

// Display Instrument create form on GET.
exports.instrument_create_get = asyncHandler(async (req, res, next) => {
    const classifications = await Classification.find().sort({ name: 1 });
    const companies = await Company.find().sort({ name: 1 });
    res.render('instrument_form', { title: 'Create Instrument', classifications, companies,});
});

// Handle Instrument create on POST.
exports.instrument_create_post = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    const instrument = new Instrument(
        {
            name: req.body?.name,
            classification: req.body?.classification,
            company: req.body?.company,
            price: req.body?.price,
            stock: req.body?.stock,
        }
    );
    if(!errors.isEmpty()){
        const classifications = await Classification.find().sort({ name: 1 });
        const companies = await Company.find().sort({ name: 1 });
        res.render("instrument_form",{
            title: "Create Instrument",
            instrument: instrument,
            classifications,
            companies,
            errors: errors.array(),
        });
        return;
    }
    else{
        await instrument.save();
        res.redirect(instrument.url);
    }
});

// Display Instrument delete form on GET.
exports.instrument_delete_get = asyncHandler(async (req, res, next) => {
    const instrument = await Instrument.findById(req.params.id).populate('classification').populate('company');
    console.log(instrument);
    if(instrument == null){
        res.redirect('/catalog/instruments');
    }
    else{
        res.render('instrument_delete', { title: 'Delete Instrument', instrument });
    }
});

// Handle Instrument delete on POST.
exports.instrument_delete_post = asyncHandler(async (req, res, next) => {
    const instrument = await Instrument.findById(req.params.id).populate('classification').populate('company');
    console.log(instrument);
    if(instrument == null){
        res.redirect('/catalog/instruments');
    }
    else{
        await Instrument.findByIdAndDelete(req.params.id);
        res.redirect('/catalog/instruments');
    }
});

// Display Instrument update form on GET.
exports.instrument_update_get = asyncHandler(async (req, res, next) => {
    const instrument = await Instrument.findById(req.params.id).populate('classification').populate('company');
    const classifications = await Classification.find().sort({ name: 1 });
    const companies = await Company.find().sort({ name: 1 });
    if(instrument == null){
        const err = new Error("Book not found");
        err.status = 404;
        return next(err);
    }
    else{
        res.render('instrument_form', { title: 'Update Instrument', instrument, classifications, companies });
    }    
});

// Handle Instrument update on POST.
exports.instrument_update_post = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const instrument = new Instrument(
        {
            _id: req.params.id,
            name: req.body?.name,
            classification: req.body?.classification,
            company: req.body?.company,
            price: req.body?.price,
            stock: req.body?.stock,
        }
    );
    if(!errors.isEmpty()){
        const classifications = await Classification.find().sort({ name: 1 });
        const companies = await Company.find().sort({ name: 1 });
        res.render("instrument_form",{
            title: "Create Instrument",
            instrument: instrument,
            classifications,
            companies,
            errors: errors.array(),
        });
        return;
    }
    else{
        await Instrument.findByIdAndUpdate(req.params.id, instrument);
        res.redirect(instrument.url);
    }
});