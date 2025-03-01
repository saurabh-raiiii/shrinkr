import express from "express";
import { addUrl, openUrl } from "../controller/urlController.js";

const router = express.Router();

// API endpoint to shorten URLs
router.post(`/api/shorten`, addUrl);

// Public route to redirect shortened URLs
router.get(`/:code`, openUrl);

export default router;
