const _ = require("lodash");

const { entDepVehiclesServices } = require("../services/index.service");
const moment = require("moment");
const geotabApi = require("../services/geotab.service");
require("dotenv").config();

//let today = moment();
const taskEntriesDepartures = async () => {
  //Validamos credenciales de Geotab
  const isValid = await geotabApi.validateCredentials({
    userName: process.env.GEOTAB_USER,
    password: process.env.GEOTAB_PASSWORD,
    database: process.env.GEOTAB_DATABASE,
    server: process.env.GEOTAB_SERVER,
    sessionId: process.env.GEOTAB_SESSIONID,
  });
  //Obtenemos los devices directo de Geotab
  const geotabDevices = await geotabApi.getDevices(process.env.GEOTAB_GROUPID);
  console.log(`Devices Length: ${geotabDevices.length}`);

  let info = "",
    dateEntrie = "",
    dateDeparture = "";
  (identifier = ""), (duration = ""), (subtraction = "");
  let deviceId = "";
  const today = moment();
  const date = today.subtract(1, "days");
  const date_query = date.format("YYYY-MM-DD");

  for (const devices of geotabDevices) {
    info = await entDepVehiclesServices.getTestSubtraction(devices, date_query);
    let array = process.env.IS_GRUPOBIMBO === "true" ? info[0].subtraction_by_device_v3 : info[0].subtraction_by_device_v2;

    if (array.data) {
      for (let res of array.data) {
        if (res.type == "entrie") {
          deviceId = res.DeviceId;
          dateEntrie = moment(res.ActiveFrom);
          identifier = res.identifier;
        } else {
          if (
            dateEntrie != "" &&
            identifier != "" &&
            res.DeviceId == deviceId
          ) {
            if (res.identifier == identifier) {
              dateDeparture = moment(res.ActiveFrom);
              duration = moment.duration(dateDeparture.diff(dateEntrie));
              subtraction = moment
                .utc(duration.asMilliseconds())
                .format("HH:mm:ss.SSS");
              const insert =
                await entDepVehiclesServices.addDurationEntriesDepartures(
                  res.DeviceId,
                  res.economic,
                  res.vin,
                  res.plate,
                  moment(dateEntrie).format("YYYY-MM-DD HH:mm:ss.SSS"),
                  moment(dateDeparture).format("YYYY-MM-DD HH:mm:ss.SSS"),
                  subtraction,
                  date_query
                );
              (identifier = ""),
                (dateEntrie = ""),
                (dateDeparture = ""),
                (duration = ""),
                (subtraction = "");
            }
          }
        }
      }
    }
  }
  return;
};
module.exports = {
  taskEntriesDepartures,
};
