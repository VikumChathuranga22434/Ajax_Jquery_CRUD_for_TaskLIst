import express from 'express';
import { test, getListing, createListing, updateListing, deleteListing, getListingID } from '../controllers/listing.controller.js';

const router = express.Router();

router.get("/test", test);
router.get("/get", getListing);
router.get("/get/:id", getListingID);
router.post("/create", createListing);
router.post("/update/:id", updateListing);
router.delete("/delete/:id", deleteListing);

export default router;