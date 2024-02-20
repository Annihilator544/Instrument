const express = require ("express");
const router = express.Router();

const classification_controller = require("../controllers/classificationController");
const company_controller = require("../controllers/companyController");
const Instrument_controller = require("../controllers/instrumentController");

router.get("/", Instrument_controller.index);

router.get("/instrument/create", Instrument_controller.instrument_create_get);

router.post("/instrument/create", Instrument_controller.instrument_create_post);

router.get("/instrument/:id/delete", Instrument_controller.instrument_delete_get);

router.post("/instrument/:id/delete", Instrument_controller.instrument_delete_post);

router.get("/instrument/:id/update", Instrument_controller.instrument_update_get);

router.post("/instrument/:id/update", Instrument_controller.instrument_update_post);

router.get("/instrument/:id", Instrument_controller.instrument_detail);

router.get("/instruments", Instrument_controller.instrument_list);

router.get("/classification/create", classification_controller.classification_create_get);

router.post("/classification/create", classification_controller.classification_create_post);

router.get("/classification/:id/delete", classification_controller.classification_delete_get);

router.post("/classification/:id/delete", classification_controller.classification_delete_post);

router.get("/classification/:id/update", classification_controller.classification_update_get);

router.post("/classification/:id/update", classification_controller.classification_update_post);

router.get("/classification/:id", classification_controller.classification_detail);

router.get("/classifications", classification_controller.classification_list);

router.get("/company/create", company_controller.company_create_get);

router.post("/company/create", company_controller.company_create_post);

router.get("/company/:id/delete", company_controller.company_delete_get);

router.post("/company/:id/delete", company_controller.company_delete_post);

router.get("/company/:id/update", company_controller.company_update_get);

router.post("/company/:id/update", company_controller.company_update_post);

router.get("/company/:id", company_controller.company_detail);

router.get("/companies", company_controller.company_list);

module.exports = router;
