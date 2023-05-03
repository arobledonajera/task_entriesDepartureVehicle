const queryGenerator = require('../utils/queryGenerator');
const moment = require("moment");

const getTestSubtraction = async (devicesIds, date) => {
    try {
        const query = "select subtraction_by_device(:devicesIds, :date)"
        const result = await queryGenerator.executePostgresQuery(
            query,
            {
                devicesIds: devicesIds,
                date
            },
            false
        )
        return result;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const addDurationEntriesDepartures = async (_device_id, _duration, _date)  => {
    try{
        const query = `select duration_entries_departures_ins(:_device_id, :_duration, :_date)`
        const result = await queryGenerator.executePostgresQuery(
            query,
            {
                _device_id,
                _duration,
                _date
            },
            true
        )
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getTestSubtraction,
    addDurationEntriesDepartures
}