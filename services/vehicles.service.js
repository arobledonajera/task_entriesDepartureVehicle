const { entDepVehiclesRepository } = require("../repositories/index.repository");

const getTestSubtraction = async(devices, date) => {
    try {
        const data = await entDepVehiclesRepository.getTestSubtraction(devices, date);
        return data;
    } catch(err) {
        throw err;
    }
} 

const addDurationEntriesDepartures = async(_device_id, _economic, _vin, _plate, _entrie_zone_date, _departure_zone_date, _duration, _date) => {
    try {
        const data = await entDepVehiclesRepository.addDurationEntriesDepartures(_device_id, _economic, _vin, _plate, _entrie_zone_date, _departure_zone_date, _duration, _date)
        return data;
    } catch (error) {
        throw error;
    }
}

module.exports =  {
    getTestSubtraction,
    addDurationEntriesDepartures
}