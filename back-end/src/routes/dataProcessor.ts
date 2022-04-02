import express from 'express';
import { formatResponseBody } from '../util/responseFormatter';

const router = express.Router();

router.post("/deviceData", (req, res) => {
    res.send("Hello World!");
});

router.get("/mapData", (req, res) => {
    return res.json(formatResponseBody({
        success: true,
        data: null
    }));
});

export default router;