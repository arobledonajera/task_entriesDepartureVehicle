const cron = require("node-cron"); // Instancio el paquete 'node-cron' // Instancio el paquete 'express'
const fs = require('fs');
const postgresHelper = require("./helpers/postgresDB.helper");
const entriesDepartures = require("./controllers/vehicles.controller");
const sendEmail = require("./services/sendEmail.service");
const { CRON_TIME } = process.env;
start();
async function start(){
  postgresHelper.sequelize.authenticate().then(() =>{
    cron.schedule(CRON_TIME, async () => {
      let flag = fs.readFileSync('./band.json', 'utf-8')
      if(flag === "true"){
        console.log("Tarea comenzada");
        await entriesDepartures.taskEntriesDepartures();
        await sendEmail("Task Entries and Departures of Vehicles executed successfully!")
          }
    },{
      scheduled: true,
      timezone: "America/Mexico_City"
    });

  }).catch((err) => {
    sendEmail(`Error executing the task; ${err.message}`);
  });
}