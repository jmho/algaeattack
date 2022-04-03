import express from "express";
import { formatResponseBody } from "../util/responseFormatter";
import {
  addData,
  getDeviceList,
  addDevice,
  getDeviceData,
  getLastEntry,
} from "database/build/src/deviceManager";

const router = express.Router();

router.post("/deviceData", (req, res) => {
  res.send("Hello World!");
});

router.get("/mapData", async (req, res) => {
  const deviceList = await getDeviceList();
  let devicesArr = [];
  for (let i = 0; i < deviceList.length; i++) {
    devicesArr.push(await getDeviceData(deviceList[i]));
  }
  return res.json(
    formatResponseBody({
      success: true,
      data: devicesArr,
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

router.get("/getLastEntry", async (req, res) => {
  const name: string = req.query.name as string;
  const entries = await getLastEntry(name);
  if (entries != null) {
    const entry = entries[entries.length - 1];
    return res.json(
      formatResponseBody({
        success: true,
        data: entry,
      })
    );
  }
  return res.json(formatResponseBody({ success: false, error: [100] }));
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
