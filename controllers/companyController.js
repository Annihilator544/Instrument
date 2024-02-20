const Company = require('../models/Company');
const Instrument = require('../models/Instrument');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require("express-validator");

// Display list of all Companies.
exports.company_list = asyncHandler(async (req, res, next) => {
    const list_companies = await Company.find();
    res.render('company_list', { title: 'Company List', list_companies });
});

// Display detail page for a specific Company.
exports.company_detail = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    const instruments_of_company = await Instrument.find({ company: req.params.id }, 'name description');
    console.log(instruments_of_company);
    res.render('company_detail', { title: company.name, company, instruments_of_company });
});

// Display Company create form on GET.
exports.company_create_get = asyncHandler(async (req, res, next) => {
    res.render('company_form', { title: "Create Company"});
});

// Handle Company create on POST.
exports.company_create_post = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    const company = new Company({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
    });
    if(!errors.isEmpty()){
        res.render("company_form", {
            title:"Create Company",
            company: company,
            errors: errors.array(),
        });
        return;
    }else{
        await company.save();
        res.redirect(company.url);
    }

});

// Display Company delete form on GET.
exports.company_delete_get = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    const instruments_of_company = await Instrument.find({ company: req.params.id }, 'name description');
    if(company == null){
        res.redirect('/catalog/companies');
    }
    res.render('company_delete', { title: 'Delete Company', company, instruments_of_company });
});

// Handle Company delete on POST.
exports.company_delete_post = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    const instruments_of_company = await Instrument.find({ company: req.params.id }, 'name description');
    if(instruments_of_company.length > 0){
        res.render('company_delete', { title: 'Delete Company', company, instruments_of_company });
        return;
    }
    else{
        await Company.findByIdAndDelete(req.params.id);
        res.redirect('/catalog/companies');
    }
});

// Display Company update form on GET.
exports.company_update_get = asyncHandler(async (req, res, next) => {
    const company = await Company.findById(req.params.id);
    if(company == null){
        res.redirect('/catalog/companies');
        return;
    }
    res.render('company_form', { title: 'Update Company', company});
});

// Handle Company update on POST.
exports.company_update_post = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const company = new Company({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        _id: req.params.id,
    });
    if(!errors.isEmpty()){
        res.render("company_form", {
            title:"Update Company",
            company: company,
            errors: errors.array(),
        });
        return;
    }else{
        await Company.findByIdAndUpdate(req.params.id, company);
        res.redirect(company.url);
    }
});
