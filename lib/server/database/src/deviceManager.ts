import Device, { EnvironmentVarEntry } from "./models/Device";

export async function addData(
  name: string,
  environmentVarEntry: EnvironmentVarEntry
) {
  try {
    const device = await Device.findOne({
      name: name,
    });

    if (!device) {
      throw new Error("Device not found");
    }
    await device.environmentVarList.push(environmentVarEntry);
    device.save();
  } catch (e) {
    throw new Error("Device could not be added to");
  }
}

export async function getDeviceList() {
  const devices = await Device.find().select("name");
  const deviceNames = devices.map((device) => device.name);
  return deviceNames;
}

export async function addDevice(name: string, lat: number, lng: number) {
  try {
    const isFound = (await Device.countDocuments({ name: name }).exec()) > 0;

    if (isFound) {
      throw new Error("Device name already exists.");
    }

    await Device.create({
      name: name,
      lat: lat,
      lng: lng,
      environmentVarList: [],
    });
  } catch (e) {
    throw new Error("Device could not be created!");
  }
}
