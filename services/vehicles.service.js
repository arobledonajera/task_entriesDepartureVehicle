const _ = require("lodash");
const { vehicles } = require("../repositories/index.repository");
const moment = require("moment");


const devicesId = [
    "b621",
    "b60A",
    "b609",
    "b60B",
    "bA43",
    "bA45",
    "bA40",
    "bA42",
    "b9B0",
    "bA48",
    "bA4C",
    "bA3F",
    "bA3C",
    "bA3B",
    "bA05",
    "bA4A",
    "bA08",
    "bA4B",
    "bA36",
    "b9B8",
    "bA49",
    "bA09",
    "b9B9",
    "b9B7",
    "bA0B",
    "bA06",
    "bA0A",
    "bA07",
    "bA35",
    "bA47",
    "bA46",
    "bA44",
    "b608",
];

// let info = "";
let dateEntrie = "";
let dateDeparture = "";
let identifier = "";
let duration = "";
let subtraction = "";
const fecha = moment();
let deviceId= "";

const date = fecha.subtract(1, 'days');
const fecha_consulta = date.format('YYYY-MM-DD');

const data = {
    DeviceId: "",
    duration: "",
    date: "",
};
const deviceArray = [];


async function taskEntriesDepartures() {
for (const devices of devicesId) {
    let info = await vehicles.getTestSubtraction(devices, fecha_consulta);
    let array = info[0].subtraction_by_device;

    if (array.data) {
        for (let res of array.data) {
        if (res.type == "entrie") {
            dateEntrie = moment(res.ActiveFrom);
            identifier = res.identifier;
            deviceId = res.DeviceId;
        } else {
            if (dateEntrie != "" && identifier != "" && deviceId == res.DeviceId) {
                if (res.identifier == identifier) {
                    dateDeparture = moment(res.ActiveFrom);
                    duration = moment.duration(dateDeparture.diff(dateEntrie));
                    subtraction = moment.utc(duration.asMilliseconds()).format('HH:mm:ss.SSS');
                    const insert = await vehicles.addDurationEntriesDepartures(res.DeviceId, subtraction, fecha_consulta);
                    data.DeviceId = res.DeviceId;
                    data.duration = subtraction;
                    data.date = moment(res.ActiveFrom).format("YYYY-MM-DD");
                    const resume = { ...data };
                    deviceArray.push(resume);
                    identifier = "";
                    dateEntrie = "";
                    dateDeparture = "";
                    duration = "";
                    subtraction = "";
                }
            }
        }
        }
    }
    }

    console.log('Tarea terminada');
    return deviceArray;
};
module.exports = {
    taskEntriesDepartures,
};
