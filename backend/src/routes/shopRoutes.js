import express from "express";

import {
    getShop,
    updateShopStatus
} from "../controllers/shopController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getShop);

router.patch(
    "/status",
    authMiddleware,
    updateShopStatus
);

export default router;