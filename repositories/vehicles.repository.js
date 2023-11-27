const queryGenerator = require("../utils/queryGenerator");
const moment = require("moment");
require("dotenv").config();

const getTestSubtraction = async (devicesIds, date) => {
  try {
    const query =
      process.env.IS_GRUPOBIMBO === "true"
        ? "select subtraction_by_device_v3(:devicesIds, :date)"
        : "select subtraction_by_device_v2(:devicesIds, :date)";
    const result = await queryGenerator.executePostgresQuery(
      query,
      {
        devicesIds: devicesIds,
        date,
      },
      false
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const addDurationEntriesDepartures = async (
  _device_id,
  _economic,
  _vin,
  _plate,
  _entrie_zone_date,
  _departure_zone_date,
  _duration,
  _date
) => {
  try {
    const query =
      process.env.IS_GRUPOBIMBO === "true"
        ? `select duration_entries_departures_ins_v3(:_device_id, :_economic, :_vin, :_plate, :_entrie_zone_date, :_departure_zone_date, :_duration, :_date)`
        : `select duration_entries_departures_ins_v2(:_device_id, :_economic, :_vin, :_plate, :_entrie_zone_date, :_departure_zone_date, :_duration, :_date)`;
    const result = await queryGenerator.executePostgresQuery(
      query,
      {
        _device_id,
        _economic,
        _vin,
        _plate,
        _entrie_zone_date,
        _departure_zone_date,
        _duration,
        _date,
      },
      true
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTestSubtraction,
  addDurationEntriesDepartures,
};
