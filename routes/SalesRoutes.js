import { Router } from "express";
import { getSale, getUpdatedData, updateSale } from "../controllers/SalesController.js";

const router = Router();

router.get('/getSale', getSale);
router.post('/updateSale', updateSale);
router.get('/getUpdatedData', getUpdatedData);

export default router;