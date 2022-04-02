import express from 'express';

const router = express.Router();

router.post("/deviceData", (req, res) => {
    res.send("Hello World!");
});

router.get("/mapData", (req, res) => {
    res.send("Hello World!");
});

export default router;