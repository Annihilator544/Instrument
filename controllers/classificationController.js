const { validationResult } = require('express-validator');
const Classification = require('../models/Classification');
const Instrument = require('../models/Instrument');
const asyncHandler = require('express-async-handler');

// Display list of all Classifications.
exports.classification_list = asyncHandler(async (req, res, next) => {
    const list_classifications = await Classification.find();
    res.render('classification_list', { title: 'Classification List', list_classifications });
});

// Display detail page for a specific Classification.
exports.classification_detail = asyncHandler(async (req, res, next) => {
    const classification = await Classification.findById(req.params.id);
    const instruments_of_classification = await Instrument.find({ classification: req.params.id }, 'name description');
    res.render('classification_detail', { title: 'Classification Detail', classification, instruments_of_classification });
});

// Display Classification create form on GET.
exports.classification_create_get = asyncHandler(async (req, res, next) => {
    res.render('classification_form', { title: 'Create Classification' });
});

// Handle Classification create on POST.
exports.classification_create_post = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const classification = new Classification(req.body);

    if(!errors.isEmpty()){
        res.render("classification_form",{
            title: "Create Classification",
            classification: classification,
            errors: errors.array(),
        });
        return;
    }
    else{
        const classificationExists = await Classification.findOne({ name: req.body.name}).collation({locale : "en", strength : 2});
        if(classificationExists){
            res.redirect(classificationExists.url);
        }
        else{
            await classification.save();
            res.redirect(classification.url);
        }
    }
    
});

// Display Classification delete form on GET.
exports.classification_delete_get = asyncHandler(async (req, res, next) => {
    const classification = await Classification.findById(req.params.id);
    const instruments_of_classification = await Instrument.find({ classification: req.params.id }, 'name description');

    if(classification == null){
        res.redirect('/catalog/classifications');
    }
    else{
        res.render('classification_delete', { title: 'Delete Classification', classification, instruments_of_classification });
    }
});

// Handle Classification delete on POST.
exports.classification_delete_post = asyncHandler(async (req, res, next) => {
    const classification = await Classification.findById(req.params.id);
    const instruments_of_classification = await Instrument.find({ classification: req.params.id }, 'name description');

    if(instruments_of_classification.length > 0){
        res.render('classification_delete', { title: 'Delete Classification', classification, instruments_of_classification });
        return;
    }
    else{
        await Classification.findByIdAndDelete(req.params.id);
        res.redirect('/catalog/classifications');
    }
});

// Display Classification update form on GET.
exports.classification_update_get = asyncHandler(async (req, res, next) => {
    const classification = await Classification.findById(req.params.id);
    if(classification == null){
        res.redirect('/catalog/classifications');
    }
    else{
        res.render('classification_form', { title: 'Update Classification', classification });
    }
});

// Handle Classification update on POST.
exports.classification_update_post = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const classification = new Classification({
        name: req.body.name,
        description: req.body.description,
        _id: req.params.id,
    });
    if(!errors.isEmpty()){
        res.render("classification_form", {
            title:"Update Classification",
            classification: classification,
            errors: errors.array(),
        });
        return;
    }
    else{
        await Classification.findByIdAndUpdate(req.params.id, classification);
        res.redirect(classification.url);
    }
});
