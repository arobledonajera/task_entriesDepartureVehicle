//Start coding
const cron = require("node-cron");
const fs = require("fs");
const postgresHelper = require("./helpers/postgresDB.helper");
const entriesDepartures = require("./controllers/vehicles.controller");
const sendEmail = require("./services/sendEmail.service");

async function start() {
  postgresHelper.sequelize
    .authenticate()
    .then(() => {
      cron.schedule(
        `00 6 * * *`,
        async () => {
          let flag = fs.readFileSync("./band.json", "utf-8");
          if (flag === "true") {
            console.log("Starting Task");
            await entriesDepartures.taskEntriesDepartures();
            await sendEmail(
              "Task Entries and Departures of Vehicles executed successfully!"
            );
          }
          console.log("Tarea terminada");
        },
        {
          scheduled: true,
          timezone: "America/Mexico_City",
        }
      );
    })
    .catch((err) => {
      sendEmail(`Error executing the task; ${err.message}`);
    });
}

//Iniciamos la Tarea
start();
