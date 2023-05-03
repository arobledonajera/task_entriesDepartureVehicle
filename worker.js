const cron = require("node-cron"); // Instancio el paquete 'node-cron'
const express = require("express"); // Instancio el paquete 'express'
const fs = require('fs');
const postgresHelper = require("./helpers/postgresDB.helper");
const entriesDepartures = require("./services/vehicles.service");
const vehiclesRepository = require("./repositories/vehicles.repository");
const moment = require('moment');


const intervalDataMinute = process.env.TIMEMINUTE_GETDATA;
const intervalDataHour = process.env.TIMEHOUR_GETDATA;
start();
async function start(){
  postgresHelper.sequelize.authenticate().then(() =>{
    cron.schedule(`30 11 * * *`, function () {
      let flag = fs.readFileSync('./band.json', 'utf-8')
      if(flag === "true"){
        entriesDepartures.taskEntriesDepartures();
          }
    },{
      scheduled: true,
      timezone: "America/Mexico_City"
    });

  }).catch((err) => {
    console.log(err.message),
    //(`Error ocurred in method initial, check now; ${err.message}`),
    logger.errorLoggerBD.error(err.message)});
}