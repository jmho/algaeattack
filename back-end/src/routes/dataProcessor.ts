import express from "express";
import { formatResponseBody } from "../util/responseFormatter";
import {
  addData,
  getDeviceList,
  addDevice,
} from "database/build/src/deviceManager";

const router = express.Router();

router.post("/deviceData", (req, res) => {
  res.send("Hello World!");
});

router.get("/mapData", (req, res) => {
  return res.json(
    formatResponseBody({
      success: true,
      data: null,
    })
  );
});

router.post("/logEntry", async (req, res) => {
  try {
    const name = req.body.name;
    delete req.body.name;
    await addData(name, req.body);
  } catch {
    return res.json(formatResponseBody({ success: false, error: [1001] }));
  }

  return res.json(
    formatResponseBody({ success: true, data: { message: "Success!" } })
  );
});

router.get("/addUser", (req, res) => {
  const name: string = req.query.name as string;
  const lat: number = parseFloat(req.query.lat as string);
  const lng: number = parseFloat(req.query.lng as string);

  addDevice(name, lat, lng);

  return res.json(
    formatResponseBody({
      success: true,
      data: null,
    })
  );
});

router.get("/getDevices", async (req, res) => {
  return res.json(
    formatResponseBody({
      success: true,
      data: await getDeviceList(),
    })
  );
});

export default router;
